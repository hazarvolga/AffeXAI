import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AiService } from '../../ai/ai.service';
import { AiModule } from '../../user-ai-preferences/entities/user-ai-preference.entity';
import { KnowledgeBaseService } from './knowledge-base.service';
import { AiFaqLearningService } from './ai-faq-learning.service';

export interface TicketAnalysisRequest {
  title: string;
  description: string;
  category?: string;
  priority?: string;
}

export interface TicketAnalysisResult {
  summary: string;
  suggestedPriority: string;
  suggestedCategory?: string;
  aiSuggestion: string;
  confidence: number;
  relatedArticles?: Array<{
    id: string;
    title: string;
    excerpt: string;
    relevanceScore: number;
  }>;
  suggestedFaqs?: Array<{
    id: string;
    question: string;
    answer: string;
    confidence: number;
    matchType: string;
  }>;
}

@Injectable()
export class TicketAiAnalysisService {
  private readonly logger = new Logger(TicketAiAnalysisService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly knowledgeBaseService: KnowledgeBaseService,
    private readonly faqLearningService: AiFaqLearningService,
  ) {}

  /**
   * Analyze ticket content using AI and knowledge base
   */
  async analyzeTicket(
    userId: string,
    request: TicketAnalysisRequest,
  ): Promise<TicketAnalysisResult> {
    this.logger.log(`Analyzing ticket for user ${userId}: ${request.title}`);

    try {
      // 1. Search knowledge base for related articles
      const relatedArticles = await this.findRelatedArticles(request);

      // 2. Search FAQ entries
      const suggestedFaqs = await this.findRelatedFaqs(request);

      // 3. Generate AI analysis with all context
      const aiAnalysis = await this.generateAiAnalysis(userId, request, relatedArticles, suggestedFaqs);

      // 4. Combine results
      return {
        ...aiAnalysis,
        relatedArticles: relatedArticles.slice(0, 3), // Top 3 most relevant
        suggestedFaqs: suggestedFaqs.slice(0, 2), // Top 2 FAQ suggestions
      };
    } catch (error) {
      this.logger.error(`Ticket analysis failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if AI service is available for user
   */
  async isAiAvailable(userId: string): Promise<boolean> {
    try {
      // Check if user has AI preferences configured for support module
      const hasPreference = await this.aiService.generateCompletionForUser(
        userId,
        AiModule.SUPPORT_AGENT,
        'test', // Minimal test prompt
        { maxTokens: 1 },
      );
      return true;
    } catch (error) {
      this.logger.warn(`AI not available for user ${userId}: ${error.message}`);
      return false;
    }
  }

  /**
   * Find related FAQ entries
   */
  private async findRelatedFaqs(request: TicketAnalysisRequest) {
    const searchQuery = `${request.title} ${request.description}`;
    
    const faqResults = await this.faqLearningService.searchFaq(
      searchQuery,
      request.category,
      3
    );

    return faqResults.map(result => ({
      id: result.entry.id,
      question: result.entry.question,
      answer: result.entry.answer,
      confidence: result.entry.confidence,
      matchType: result.matchType,
    }));
  }

  /**
   * Find related knowledge base articles
   */
  private async findRelatedArticles(request: TicketAnalysisRequest) {
    const searchQuery = `${request.title} ${request.description}`.substring(0, 200);
    
    const searchResult = await this.knowledgeBaseService.searchArticles({
      query: searchQuery,
      limit: 5,
    });

    return searchResult.articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.summary || article.content.substring(0, 150) + '...',
      relevanceScore: this.calculateRelevanceScore(request, article),
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Generate AI analysis with context
   */
  private async generateAiAnalysis(
    userId: string,
    request: TicketAnalysisRequest,
    relatedArticles: any[],
    suggestedFaqs: any[],
  ) {
    const knowledgeContext = relatedArticles.length > 0 
      ? `\n\nİlgili bilgi bankası makaleleri:\n${relatedArticles.map(a => 
          `- ${a.title}: ${a.excerpt}`
        ).join('\n')}`
      : '';

    const faqContext = suggestedFaqs.length > 0
      ? `\n\nBenzer sorular ve cevaplar:\n${suggestedFaqs.map(faq => 
          `S: ${faq.question}\nC: ${faq.answer}`
        ).join('\n\n')}`
      : '';

    const prompt = `
Bir destek talebi analiz et ve Türkçe yanıt ver:

BAŞLIK: ${request.title}
AÇIKLAMA: ${request.description}
KATEGORİ: ${request.category || 'Belirtilmemiş'}
ÖNCELİK: ${request.priority || 'Belirtilmemiş'}
${knowledgeContext}${faqContext}

Lütfen şunları sağla:
1. ÖZET: Sorunun kısa özeti (1-2 cümle)
2. ÖNERİLEN_ÖNCELİK: low, medium, high, urgent (gerekçesiyle)
3. AI_ÖNERİSİ: Kullanıcıya yardımcı olabilecek çözüm önerisi
4. GÜVENİLİRLİK: 1-100 arası güvenilirlik skoru

Format:
ÖZET: [özet]
ÖNERİLEN_ÖNCELİK: [öncelik] - [gerekçe]
AI_ÖNERİSİ: [detaylı çözüm önerisi]
GÜVENİLİRLİK: [skor]
`;

    const result = await this.aiService.generateCompletionForUser(
      userId,
      AiModule.SUPPORT_AGENT,
      prompt,
      {
        temperature: 0.3, // More deterministic for analysis
        maxTokens: 800,
      },
    );

    return this.parseAiResponse(result.content);
  }

  /**
   * Parse AI response into structured data
   */
  private parseAiResponse(content: string): Omit<TicketAnalysisResult, 'relatedArticles'> {
    const lines = content.split('\n').filter(line => line.trim());
    
    let summary = '';
    let suggestedPriority = 'medium';
    let aiSuggestion = '';
    let confidence = 70;

    for (const line of lines) {
      if (line.startsWith('ÖZET:')) {
        summary = line.replace('ÖZET:', '').trim();
      } else if (line.startsWith('ÖNERİLEN_ÖNCELİK:')) {
        const priorityLine = line.replace('ÖNERİLEN_ÖNCELİK:', '').trim();
        const priorityMatch = priorityLine.match(/(low|medium|high|urgent)/i);
        if (priorityMatch) {
          suggestedPriority = priorityMatch[1].toLowerCase();
        }
      } else if (line.startsWith('AI_ÖNERİSİ:')) {
        aiSuggestion = line.replace('AI_ÖNERİSİ:', '').trim();
      } else if (line.startsWith('GÜVENİLİRLİK:')) {
        const confidenceMatch = line.match(/(\d+)/);
        if (confidenceMatch) {
          confidence = parseInt(confidenceMatch[1], 10);
        }
      }
    }

    // Fallback values
    if (!summary) summary = 'Destek talebi analiz edildi.';
    if (!aiSuggestion) aiSuggestion = 'Lütfen daha fazla detay sağlayın veya destek ekibimizle iletişime geçin.';

    return {
      summary,
      suggestedPriority,
      aiSuggestion,
      confidence: Math.min(Math.max(confidence, 1), 100),
    };
  }

  /**
   * Calculate relevance score between ticket and article
   */
  private calculateRelevanceScore(request: TicketAnalysisRequest, article: any): number {
    const ticketText = `${request.title} ${request.description}`.toLowerCase();
    const articleText = `${article.title} ${article.content || article.summary || ''}`.toLowerCase();
    
    // Simple keyword matching - could be enhanced with more sophisticated NLP
    const ticketWords = ticketText.split(/\s+/).filter(word => word.length > 3);
    const articleWords = new Set(articleText.split(/\s+/));
    
    const matches = ticketWords.filter(word => articleWords.has(word)).length;
    const score = Math.min((matches / ticketWords.length) * 100, 100);
    
    return Math.round(score);
  }
}