import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ChatSession, ChatSessionStatus } from '../../tickets/entities/chat-session.entity';
import { ChatMessage, MessageType } from '../../tickets/entities/chat-message.entity';
import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';

@Injectable()
export class ChatDataExtractorService implements DataExtractor {
  private readonly logger = new Logger(ChatDataExtractorService.name);

  constructor(
    @InjectRepository(ChatSession)
    private chatSessionRepository: Repository<ChatSession>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async extract(criteria: ExtractionCriteria): Promise<ExtractedData[]> {
    this.logger.log('Starting chat data extraction with criteria:', criteria);
    
    try {
      // Build query conditions
      const whereConditions: any = {};
      
      if (criteria.minSessionDuration) {
        whereConditions.duration = { $gte: criteria.minSessionDuration };
      }
      
      if (criteria.requiredSatisfactionScore) {
        whereConditions.satisfactionScore = { $gte: criteria.requiredSatisfactionScore };
      }
      
      if (criteria.dateRange) {
        whereConditions.createdAt = Between(criteria.dateRange.from, criteria.dateRange.to);
      }

      // Get chat sessions that meet criteria
      const sessions = await this.chatSessionRepository.find({
        where: whereConditions,
        relations: ['messages', 'user'],
        take: criteria.maxResults || 1000,
        order: { createdAt: 'DESC' }
      });

      this.logger.log(`Found ${sessions.length} chat sessions matching criteria`);

      const extractedData: ExtractedData[] = [];

      for (const session of sessions) {
        try {
          const sessionData = await this.extractFromSession(session);
          if (sessionData && this.validateData(sessionData)) {
            extractedData.push(sessionData);
          }
        } catch (error) {
          this.logger.warn(`Failed to extract data from session ${session.id}:`, error);
        }
      }

      this.logger.log(`Successfully extracted ${extractedData.length} data points from chat sessions`);
      return extractedData;

    } catch (error) {
      this.logger.error('Failed to extract chat data:', error);
      throw new Error(`Chat data extraction failed: ${error.message}`);
    }
  }

  private async extractFromSession(session: ChatSession): Promise<ExtractedData | null> {
    if (!session.messages || session.messages.length < 2) {
      return null;
    }

    // Sort messages by timestamp
    const messages = session.messages.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Find question-answer pairs
    const userMessages = messages.filter(m => m.messageType === MessageType.USER);
    const agentMessages = messages.filter(m => m.messageType === MessageType.BOT);

    if (userMessages.length === 0 || agentMessages.length === 0) {
      return null;
    }

    // Get the main question (usually the first user message)
    const mainQuestion = userMessages[0];
    
    // Find the best answer (agent message that follows the question)
    const relevantAnswer = agentMessages.find(msg => 
      new Date(msg.createdAt) > new Date(mainQuestion.createdAt)
    );

    if (!relevantAnswer) {
      return null;
    }

    // Build context from conversation
    const context = messages
      .slice(0, 5) // Take first 5 messages for context
      .map(m => `${m.messageType}: ${m.content}`)
      .join('\n');

    return {
      id: `chat-${session.id}`,
      sourceId: session.id,
      type: 'chat',
      sourceType: 'chat',
      question: this.cleanText(mainQuestion.content),
      answer: this.cleanText(relevantAnswer.content),
      context,
      confidence: 60,
      metadata: {
        timestamp: session.createdAt,
        userId: session.userId,
        sessionDuration: session.durationSeconds || 0,
        satisfactionScore: session.satisfactionRating,
        category: 'general',
        messageCount: messages.length,
        userMessageCount: userMessages.length,
        agentMessageCount: agentMessages.length,
        isResolved: session.status === ChatSessionStatus.ENDED,
        tags: session.metadata?.tags || []
      }
    };
  }

  validateData(data: ExtractedData): boolean {
    // Basic validation rules
    if (!data.question || !data.answer) {
      return false;
    }

    // Question should be at least 10 characters
    if (data.question.length < 10) {
      return false;
    }

    // Answer should be at least 20 characters
    if (data.answer.length < 20) {
      return false;
    }

    // Question should not be too long (avoid spam)
    if (data.question.length > 500) {
      return false;
    }

    // Answer should not be too long
    if (data.answer.length > 2000) {
      return false;
    }

    // Should contain actual words, not just symbols
    const questionWords = data.question.match(/\b\w+\b/g);
    const answerWords = data.answer.match(/\b\w+\b/g);
    
    if (!questionWords || questionWords.length < 3) {
      return false;
    }
    
    if (!answerWords || answerWords.length < 5) {
      return false;
    }

    // Avoid common non-helpful patterns
    const unhelpfulPatterns = [
      /^(hi|hello|hey|thanks|thank you|ok|okay|yes|no)$/i,
      /^(please wait|one moment|let me check)$/i,
      /^(sorry|apologize)$/i
    ];

    for (const pattern of unhelpfulPatterns) {
      if (pattern.test(data.question.trim()) || pattern.test(data.answer.trim())) {
        return false;
      }
    }

    return true;
  }

  private cleanText(text: string): string {
    if (!text) return '';
    
    return text
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s\.\?\!\,\-\:]/g, '') // Remove special characters except basic punctuation
      .substring(0, 1000); // Limit length
  }

}
