import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiService } from '../../ai/ai.service';
import { AiModule } from '../../user-ai-preferences/entities/user-ai-preference.entity';
import { KnowledgeBaseService } from './knowledge-base.service';
import { AiFaqLearningService } from './ai-faq-learning.service';
import { ChatSession } from '../entities/chat-session.entity';
import { ChatMessage, MessageType } from '../entities/chat-message.entity';

export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: {
    currentPage?: string;
    userAgent?: string;
    previousMessages?: Array<{
      content: string;
      isBot: boolean;
    }>;
  };
}

export interface ChatResponse {
  content: string;
  confidence: number;
  responseTime: number;
  tokensUsed?: number;
  sources?: Array<{
    type: 'kb' | 'faq' | 'document';
    id: string;
    title: string;
    excerpt?: string;
    relevanceScore?: number;
  }>;
  suggestedActions?: string[];
  sessionId: string;
  messageId: string;
}

@Injectable()
export class ChatAiService {
  private readonly logger = new Logger(ChatAiService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly knowledgeBaseService: KnowledgeBaseService,
    private readonly faqLearningService: AiFaqLearningService,
    @InjectRepository(ChatSession)
    private readonly sessionRepository: Repository<ChatSession>,
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
  ) {}

  /**
   * Process chat message and generate AI response
   */
  async processMessage(
    userId: string,
    request: ChatRequest,
  ): Promise<ChatResponse> {
    const startTime = Date.now();
    this.logger.log(`Processing chat message for user ${userId}: ${request.message.substring(0, 50)}...`);

    try {
      // 1. Get or create chat session
      const session = await this.getOrCreateSession(userId, request);

      // 2. Save user message
      const userMessage = await this.saveUserMessage(session.id, userId, request.message);

      // 3. Generate AI response
      const aiResponse = await this.generateAiResponse(userId, request, session);

      // 4. Save AI message
      const botMessage = await this.saveBotMessage(
        session.id,
        aiResponse.content,
        aiResponse.confidence,
        aiResponse.responseTime,
        aiResponse.tokensUsed,
        aiResponse.sources,
        aiResponse.suggestedActions,
      );

      // 5. Update session stats
      await this.updateSessionStats(session, aiResponse.responseTime);

      return {
        ...aiResponse,
        sessionId: session.id,
        messageId: botMessage.id,
      };
    } catch (error) {
      this.logger.error(`Chat processing failed for user ${userId}: ${error.message}`);
      
      // Return fallback response
      return {
        content: 'Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin veya destek talebi oluşturun.',
        confidence: 0,
        responseTime: Date.now() - startTime,
        sessionId: request.sessionId || 'error',
        messageId: 'error',
        suggestedActions: ['Destek talebi oluştur', 'Bilgi bankasını incele'],
      };
    }
  }

  /**
   * Get or create chat session
   */
  private async getOrCreateSession(
    userId: string,
    request: ChatRequest,
  ): Promise<ChatSession> {
    if (request.sessionId) {
      const existingSession = await this.sessionRepository.findOne({
        where: { id: request.sessionId, userId },
        relations: ['messages'],
      });

      if (existingSession && existingSession.isActive) {
        return existingSession;
      }
    }

    // Create new session
    const session = this.sessionRepository.create({
      userId,
      startPage: request.context?.currentPage,
      userAgent: request.context?.userAgent,
    });

    return await this.sessionRepository.save(session);
  }

  /**
   * Save user message
   */
  private async saveUserMessage(
    sessionId: string,
    userId: string,
    content: string,
  ): Promise<ChatMessage> {
    const message = this.messageRepository.create({
      sessionId,
      userId,
      messageType: MessageType.USER,
      content,
    });

    return await this.messageRepository.save(message);
  }

  /**
   * Generate AI response
   */
  private async generateAiResponse(
    userId: string,
    request: ChatRequest,
    session: ChatSession,
  ): Promise<Omit<ChatResponse, 'sessionId' | 'messageId'>> {
    const startTime = Date.now();

    // 1. Search knowledge base
    const kbResults = await this.searchKnowledgeBase(request.message);

    // 2. Search FAQ
    const faqResults = await this.searchFaq(request.message);

    // 3. Build context
    const context = this.buildAiContext(request, session, kbResults, faqResults);

    // 4. Generate AI response
    const aiResult = await this.aiService.generateCompletionForUser(
      userId,
      AiModule.SUPPORT_CHATBOT,
      context,
      {
        temperature: 0.7,
        maxTokens: 500,
      },
    );

    const responseTime = Date.now() - startTime;

    // 5. Parse response and extract suggestions
    const { content, suggestedActions } = this.parseAiResponse(aiResult.content);

    // 6. Combine sources
    const sources = [
      ...kbResults.map(kb => ({
        type: 'kb' as const,
        id: kb.id,
        title: kb.title,
        excerpt: kb.summary || kb.content.substring(0, 150),
        relevanceScore: 85,
      })),
      ...faqResults.slice(0, 2).map(faq => ({
        type: 'faq' as const,
        id: faq.entry.id,
        title: faq.entry.question,
        excerpt: faq.entry.answer.substring(0, 150),
        relevanceScore: faq.relevanceScore,
      })),
    ];

    return {
      content,
      confidence: this.calculateConfidence(kbResults, faqResults, aiResult.content),
      responseTime,
      tokensUsed: aiResult.tokensUsed,
      sources: sources.slice(0, 3), // Top 3 sources
      suggestedActions,
    };
  }

  /**
   * Search knowledge base for relevant articles
   */
  private async searchKnowledgeBase(query: string) {
    try {
      const result = await this.knowledgeBaseService.searchArticles({
        query,
        limit: 3,
      });
      return result.articles;
    } catch (error) {
      this.logger.warn(`KB search failed: ${error.message}`);
      return [];
    }
  }

  /**
   * Search FAQ for relevant entries
   */
  private async searchFaq(query: string) {
    try {
      return await this.faqLearningService.searchFaq(query, undefined, 3);
    } catch (error) {
      this.logger.warn(`FAQ search failed: ${error.message}`);
      return [];
    }
  }

  /**
   * Build AI context prompt
   */
  private buildAiContext(
    request: ChatRequest,
    session: ChatSession,
    kbResults: any[],
    faqResults: any[],
  ): string {
    const kbContext = kbResults.length > 0
      ? `\n\nİlgili Bilgi Bankası Makaleleri:\n${kbResults.map(kb => 
          `- ${kb.title}: ${kb.summary || kb.content.substring(0, 100)}`
        ).join('\n')}`
      : '';

    const faqContext = faqResults.length > 0
      ? `\n\nBenzer Sorular:\n${faqResults.map(faq => 
          `S: ${faq.entry.question}\nC: ${faq.entry.answer.substring(0, 100)}`
        ).join('\n\n')}`
      : '';

    const conversationHistory = session.messages && session.messages.length > 0
      ? `\n\nKonuşma Geçmişi:\n${session.messages.slice(-4).map(msg => 
          `${msg.messageType === MessageType.USER ? 'Kullanıcı' : 'AI'}: ${msg.content}`
        ).join('\n')}`
      : '';

    return `Sen bir AI destek asistanısın. Kullanıcının sorusunu Türkçe yanıtla.

KULLANICI SORUSU: ${request.message}
${kbContext}${faqContext}${conversationHistory}

Yanıt kuralları:
1. Kısa ve net yanıt ver (maksimum 3-4 cümle)
2. Mevcut bilgi bankası ve FAQ'lardan yararlan
3. Emin olmadığın konularda "destek talebi oluşturmanızı öneririm" de
4. Yanıtın sonuna 2-3 önerilen eylem ekle (EYLEMLER: formatında)

Örnek format:
[Yanıt metni]

EYLEMLER: Destek talebi oluştur, Bilgi bankasını incele, Canlı destek`;
  }

  /**
   * Parse AI response and extract suggested actions
   */
  private parseAiResponse(content: string): {
    content: string;
    suggestedActions: string[];
  } {
    const parts = content.split('EYLEMLER:');
    const mainContent = parts[0].trim();
    
    let suggestedActions: string[] = [];
    if (parts.length > 1) {
      suggestedActions = parts[1]
        .split(',')
        .map(action => action.trim())
        .filter(action => action.length > 0)
        .slice(0, 3); // Max 3 actions
    }

    // Default actions if none provided
    if (suggestedActions.length === 0) {
      suggestedActions = [
        'Destek talebi oluştur',
        'Bilgi bankasını incele',
      ];
    }

    return {
      content: mainContent,
      suggestedActions,
    };
  }

  /**
   * Calculate confidence score based on available sources
   */
  private calculateConfidence(
    kbResults: any[],
    faqResults: any[],
    aiContent: string,
  ): number {
    let confidence = 50; // Base confidence

    // Boost confidence based on sources
    if (kbResults.length > 0) confidence += 20;
    if (faqResults.length > 0) confidence += 15;
    
    // Boost if FAQ has high confidence match
    const highConfidenceFaq = faqResults.find(faq => faq.entry.confidence > 80);
    if (highConfidenceFaq) confidence += 10;

    // Reduce confidence for uncertain language
    const uncertainPhrases = ['emin değilim', 'sanırım', 'muhtemelen', 'belki'];
    const hasUncertainty = uncertainPhrases.some(phrase => 
      aiContent.toLowerCase().includes(phrase)
    );
    if (hasUncertainty) confidence -= 15;

    return Math.min(Math.max(confidence, 10), 95); // Clamp between 10-95
  }

  /**
   * Save bot message
   */
  private async saveBotMessage(
    sessionId: string,
    content: string,
    confidence: number,
    responseTime: number,
    tokensUsed?: number,
    sources?: any[],
    suggestedActions?: string[],
  ): Promise<ChatMessage> {
    const message = this.messageRepository.create({
      sessionId,
      messageType: MessageType.BOT,
      content,
      confidenceScore: confidence,
      responseTimeMs: responseTime,
      tokensUsed,
      metadata: {
        sources,
        suggestedActions,
      },
    });

    return await this.messageRepository.save(message);
  }

  /**
   * Update session statistics
   */
  private async updateSessionStats(
    session: ChatSession,
    responseTime: number,
  ): Promise<void> {
    session.incrementMessageCount();
    
    // Update average response time
    if (!session.metadata) session.metadata = {};
    
    const currentAvg = session.metadata.avgResponseTime || 0;
    const messageCount = session.messageCount;
    session.metadata.avgResponseTime = Math.round(
      (currentAvg * (messageCount - 1) + responseTime) / messageCount
    );

    await this.sessionRepository.save(session);
  }

  /**
   * End chat session
   */
  async endSession(sessionId: string, userId: string): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId, userId },
    });

    if (session) {
      session.endSession();
      await this.sessionRepository.save(session);
    }
  }

  /**
   * Provide feedback on message
   */
  async provideFeedback(
    messageId: string,
    isHelpful: boolean,
    comment?: string,
  ): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (message) {
      if (isHelpful) {
        message.markHelpful(comment);
      } else {
        message.markNotHelpful(comment);
      }
      
      await this.messageRepository.save(message);
    }
  }
}