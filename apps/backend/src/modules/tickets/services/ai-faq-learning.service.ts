import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiFaqEntry } from '../entities/ai-faq-entry.entity';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
import { AiService } from '../../ai/ai.service';
import { AiModule } from '../../user-ai-preferences/entities/user-ai-preference.entity';
import * as crypto from 'crypto';

export interface FaqLearningResult {
  question: string;
  answer: string;
  confidence: number;
  keywords: string[];
  category?: string;
}

export interface FaqSearchResult {
  entry: AiFaqEntry;
  relevanceScore: number;
  matchType: 'exact' | 'keyword' | 'semantic';
}

@Injectable()
export class AiFaqLearningService {
  private readonly logger = new Logger(AiFaqLearningService.name);

  constructor(
    @InjectRepository(AiFaqEntry)
    private readonly faqRepository: Repository<AiFaqEntry>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketMessage)
    private readonly messageRepository: Repository<TicketMessage>,
    private readonly aiService: AiService,
  ) {}

  /**
   * Learn from resolved ticket and create FAQ entry
   */
  async learnFromTicket(ticketId: string, adminUserId?: string): Promise<AiFaqEntry | null> {
    this.logger.log(`Learning from ticket: ${ticketId}`);

    try {
      // Get ticket with messages
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
        relations: ['messages', 'messages.author', 'messages.author.roleEntity', 'category'],
      });

      if (!ticket || ticket.status !== 'resolved') {
        this.logger.warn(`Ticket ${ticketId} not found or not resolved`);
        return null;
      }

      // Extract question and answer from messages
      const learningResult = await this.extractQuestionAnswer(ticket);
      if (!learningResult) {
        this.logger.warn(`Could not extract Q&A from ticket ${ticketId}`);
        return null;
      }

      // Check if similar FAQ already exists
      const questionHash = this.generateQuestionHash(learningResult.question);
      const existingFaq = await this.faqRepository.findOne({
        where: { questionHash },
      });

      if (existingFaq) {
        // Update existing FAQ with new information
        existingFaq.usageCount++;
        existingFaq.updateConfidence();
        await this.faqRepository.save(existingFaq);
        this.logger.log(`Updated existing FAQ entry: ${existingFaq.id}`);
        return existingFaq;
      }

      // Create new FAQ entry
      const faqEntry = this.faqRepository.create({
        question: learningResult.question,
        answer: learningResult.answer,
        questionHash,
        category: learningResult.category || ticket.category?.name,
        keywords: learningResult.keywords,
        confidence: learningResult.confidence,
        sourceTicketId: ticketId,
        createdByUserId: adminUserId,
        metadata: {
          originalTicketTitle: ticket.subject,
          resolutionTime: this.calculateResolutionTime(ticket),
          tags: ticket.tags || [],
        },
      });

      await this.faqRepository.save(faqEntry);
      this.logger.log(`Created new FAQ entry: ${faqEntry.id}`);

      return faqEntry;
    } catch (error) {
      this.logger.error(`Failed to learn from ticket ${ticketId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Search FAQ entries for a question
   */
  async searchFaq(
    question: string,
    category?: string,
    limit: number = 5,
  ): Promise<FaqSearchResult[]> {
    const results: FaqSearchResult[] = [];

    // 1. Exact hash match
    const questionHash = this.generateQuestionHash(question);
    const exactMatch = await this.faqRepository.findOne({
      where: { questionHash, isActive: true },
    });

    if (exactMatch) {
      results.push({
        entry: exactMatch,
        relevanceScore: 100,
        matchType: 'exact',
      });
    }

    // 2. Keyword-based search
    const keywords = this.extractKeywords(question);
    if (keywords.length > 0) {
      const keywordMatches = await this.faqRepository
        .createQueryBuilder('faq')
        .where('faq.isActive = :isActive', { isActive: true })
        .andWhere('faq.keywords && :keywords', { keywords })
        .andWhere('faq.id != :excludeId', { excludeId: exactMatch?.id || '00000000-0000-0000-0000-000000000000' })
        .orderBy('faq.confidence', 'DESC')
        .addOrderBy('faq.usageCount', 'DESC')
        .take(limit - results.length)
        .getMany();

      for (const match of keywordMatches) {
        const score = this.calculateKeywordRelevance(keywords, match.keywords);
        if (score > 30) { // Minimum relevance threshold
          results.push({
            entry: match,
            relevanceScore: score,
            matchType: 'keyword',
          });
        }
      }
    }

    // 3. Category-based fallback
    if (results.length < limit && category) {
      const categoryMatches = await this.faqRepository.find({
        where: { 
          category, 
          isActive: true,
        },
        order: { confidence: 'DESC', usageCount: 'DESC' },
        take: limit - results.length,
      });

      for (const match of categoryMatches) {
        if (!results.find(r => r.entry.id === match.id)) {
          results.push({
            entry: match,
            relevanceScore: 20, // Low relevance for category-only match
            matchType: 'semantic',
          });
        }
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Mark FAQ as helpful or not helpful
   */
  async provideFeedback(faqId: string, isHelpful: boolean): Promise<void> {
    const faq = await this.faqRepository.findOne({ where: { id: faqId } });
    if (!faq) return;

    if (isHelpful) {
      faq.helpfulCount++;
    } else {
      faq.notHelpfulCount++;
    }

    faq.updateConfidence();
    await this.faqRepository.save(faq);

    this.logger.log(`FAQ ${faqId} feedback: ${isHelpful ? 'helpful' : 'not helpful'}`);
  }

  /**
   * Get FAQ statistics
   */
  async getStatistics(): Promise<{
    total: number;
    active: number;
    verified: number;
    avgConfidence: number;
    totalUsage: number;
    topCategories: Array<{ category: string; count: number }>;
  }> {
    const [total, active, verified] = await Promise.all([
      this.faqRepository.count(),
      this.faqRepository.count({ where: { isActive: true } }),
      this.faqRepository.count({ where: { isVerified: true } }),
    ]);

    const allFaqs = await this.faqRepository.find();
    const avgConfidence = allFaqs.length > 0 
      ? Math.round(allFaqs.reduce((sum, faq) => sum + faq.confidence, 0) / allFaqs.length)
      : 0;

    const totalUsage = allFaqs.reduce((sum, faq) => sum + faq.usageCount, 0);

    // Top categories
    const categoryMap = new Map<string, number>();
    allFaqs.forEach(faq => {
      if (faq.category) {
        categoryMap.set(faq.category, (categoryMap.get(faq.category) || 0) + 1);
      }
    });

    const topCategories = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      total,
      active,
      verified,
      avgConfidence,
      totalUsage,
      topCategories,
    };
  }

  /**
   * Extract question and answer from ticket messages using AI
   */
  private async extractQuestionAnswer(ticket: Ticket): Promise<FaqLearningResult | null> {
    const messages = ticket.messages || [];
    if (messages.length < 2) return null;

    // Get customer messages (questions) and support messages (answers)
    const customerMessages = messages.filter(m => !m.isInternal && m.author?.roleEntity?.name === 'customer');
    const supportMessages = messages.filter(m => !m.isInternal && m.author?.roleEntity?.name !== 'customer');

    if (customerMessages.length === 0 || supportMessages.length === 0) return null;

    const conversationText = messages
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map(m => `${m.author?.roleEntity?.name === 'customer' ? 'MÜŞTERI' : 'DESTEK'}: ${m.content}`)
      .join('\n\n');

    try {
      // Use AI to extract structured Q&A
      const prompt = `
Aşağıdaki destek talebi konuşmasından bir FAQ girişi oluştur:

${conversationText}

Lütfen şu formatta yanıt ver:
SORU: [Müşterinin ana sorusu - kısa ve net]
CEVAP: [Destek ekibinin çözümü - detaylı ve kullanışlı]
ANAHTAR_KELİMELER: [virgülle ayrılmış anahtar kelimeler]
KATEGORİ: [uygun kategori adı]
GÜVENİLİRLİK: [1-100 arası skor]

Sadece net çözümü olan sorular için FAQ oluştur.
`;

      // Use a fallback admin user ID for AI service
      const result = await this.aiService.generateCompletionForUser(
        ticket.userId, // Use ticket creator as fallback
        AiModule.FAQ_AUTO_RESPONSE,
        prompt,
        { temperature: 0.2, maxTokens: 500 },
      );

      return this.parseAiFaqResponse(result.content);
    } catch (error) {
      this.logger.warn(`AI extraction failed for ticket ${ticket.id}: ${error.message}`);
      return null;
    }
  }

  /**
   * Parse AI response into structured FAQ data
   */
  private parseAiFaqResponse(content: string): FaqLearningResult | null {
    const lines = content.split('\n').filter(line => line.trim());
    
    let question = '';
    let answer = '';
    let keywords: string[] = [];
    let category = '';
    let confidence = 70;

    for (const line of lines) {
      if (line.startsWith('SORU:')) {
        question = line.replace('SORU:', '').trim();
      } else if (line.startsWith('CEVAP:')) {
        answer = line.replace('CEVAP:', '').trim();
      } else if (line.startsWith('ANAHTAR_KELİMELER:')) {
        const keywordStr = line.replace('ANAHTAR_KELİMELER:', '').trim();
        keywords = keywordStr.split(',').map(k => k.trim()).filter(k => k.length > 0);
      } else if (line.startsWith('KATEGORİ:')) {
        category = line.replace('KATEGORİ:', '').trim();
      } else if (line.startsWith('GÜVENİLİRLİK:')) {
        const confidenceMatch = line.match(/(\d+)/);
        if (confidenceMatch) {
          confidence = parseInt(confidenceMatch[1], 10);
        }
      }
    }

    if (!question || !answer) return null;

    return {
      question,
      answer,
      keywords,
      category,
      confidence: Math.min(Math.max(confidence, 1), 100),
    };
  }

  /**
   * Generate hash for question deduplication
   */
  private generateQuestionHash(question: string): string {
    const normalized = question
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return crypto.createHash('md5').update(normalized).digest('hex');
  }

  /**
   * Extract keywords from text
   */
  private extractKeywords(text: string): string[] {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    // Remove common Turkish stop words
    const stopWords = new Set([
      'için', 'olan', 'olan', 'olarak', 'oldu', 'olur', 'olmuş', 'olacak',
      'bir', 'bu', 'şu', 'o', 've', 'ile', 'de', 'da', 'den', 'dan',
      'ne', 'nasıl', 'neden', 'niçin', 'kim', 'hangi', 'nerede', 'ne zaman',
    ]);

    return [...new Set(words.filter(word => !stopWords.has(word)))];
  }

  /**
   * Calculate keyword relevance score
   */
  private calculateKeywordRelevance(queryKeywords: string[], faqKeywords: string[]): number {
    if (queryKeywords.length === 0 || faqKeywords.length === 0) return 0;

    const matches = queryKeywords.filter(qk => 
      faqKeywords.some(fk => fk.includes(qk) || qk.includes(fk))
    ).length;

    return Math.round((matches / queryKeywords.length) * 100);
  }

  /**
   * Calculate ticket resolution time in minutes
   */
  private calculateResolutionTime(ticket: Ticket): number {
    if (!ticket.resolvedAt) return 0;
    
    const created = new Date(ticket.createdAt).getTime();
    const resolved = new Date(ticket.resolvedAt).getTime();
    
    return Math.round((resolved - created) / (1000 * 60)); // minutes
  }
}