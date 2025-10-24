import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { TicketMessage } from '../../tickets/entities/ticket-message.entity';
import { TicketStatus } from '../../tickets/enums/ticket-status.enum';
import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';
import { DataNormalizerService } from './data-normalizer.service';

@Injectable()
export class TicketDataExtractorService implements DataExtractor {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketMessage)
    private ticketMessageRepository: Repository<TicketMessage>,
    private dataNormalizer: DataNormalizerService,
  ) {}

  /**
   * Extract learning data from resolved tickets
   */
  async extract(criteria: ExtractionCriteria = {}): Promise<ExtractedData[]> {
    const tickets = await this.findEligibleTickets(criteria);
    const extractedData: ExtractedData[] = [];

    for (const ticket of tickets) {
      const ticketData = await this.extractFromTicket(ticket, criteria);
      extractedData.push(...ticketData);
    }

    return this.dataNormalizer.normalize(extractedData);
  }

  /**
   * Extract data from specific ticket IDs
   */
  async extractFromIds(ticketIds: string[], criteria: ExtractionCriteria = {}): Promise<ExtractedData[]> {
    const tickets = await this.ticketRepository.find({
      where: { id: ticketIds as any },
      relations: ['messages', 'messages.author', 'category', 'user', 'assignedTo'],
    });

    const extractedData: ExtractedData[] = [];
    for (const ticket of tickets) {
      if (await this.validateTicket(ticket, criteria)) {
        const ticketData = await this.extractFromTicket(ticket, criteria);
        extractedData.push(...ticketData);
      }
    }

    return this.dataNormalizer.normalize(extractedData);
  }

  /**
   * Validate if ticket meets learning criteria
   */
  async validateSource(ticketId: string, criteria: ExtractionCriteria = {}): Promise<boolean> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['messages'],
    });

    return ticket ? this.validateTicket(ticket, criteria) : false;
  }

  /**
   * Get extraction statistics
   */
  async getExtractionStats(): Promise<{
    totalProcessed: number;
    totalExtracted: number;
    averageConfidence: number;
    successRate: number;
  }> {
    const totalTickets = await this.ticketRepository.count({
      where: { status: TicketStatus.RESOLVED }
    });

    const eligibleTickets = await this.findEligibleTickets();
    const extractedData = await this.extract();

    const averageConfidence = extractedData.length > 0 
      ? extractedData.reduce((sum, item) => sum + item.confidence, 0) / extractedData.length
      : 0;

    return {
      totalProcessed: totalTickets,
      totalExtracted: extractedData.length,
      averageConfidence: Math.round(averageConfidence),
      successRate: totalTickets > 0 ? (extractedData.length / totalTickets) * 100 : 0,
    };
  }

  /**
   * Find tickets that meet extraction criteria
   */
  private async findEligibleTickets(criteria: ExtractionCriteria = {}): Promise<Ticket[]> {
    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.messages', 'messages')
      .leftJoinAndSelect('messages.author', 'author')
      .leftJoinAndSelect('ticket.category', 'category')
      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
      .where('ticket.status IN (:...statuses)', { 
        statuses: [TicketStatus.RESOLVED, TicketStatus.CLOSED] 
      });

    // Apply criteria filters
    if (criteria.minResolutionTime) {
      queryBuilder.andWhere('ticket.resolutionTimeHours >= :minResolutionHours', {
        minResolutionHours: criteria.minResolutionTime / 3600
      });
    }

    if (criteria.excludedCategories && criteria.excludedCategories.length > 0) {
      queryBuilder.andWhere('category.name NOT IN (:...excludedCategories)', {
        excludedCategories: criteria.excludedCategories
      });
    }

    if (criteria.includeCategories && criteria.includeCategories.length > 0) {
      queryBuilder.andWhere('category.name IN (:...includedCategories)', {
        includedCategories: criteria.includeCategories
      });
    }

    if (criteria.maxAge) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - criteria.maxAge);
      queryBuilder.andWhere('ticket.createdAt >= :cutoffDate', { cutoffDate });
    }

    return queryBuilder.getMany();
  }

  /**
   * Extract learning data from a single ticket
   */
  private async extractFromTicket(ticket: Ticket, criteria: ExtractionCriteria): Promise<ExtractedData[]> {
    if (!await this.validateTicket(ticket, criteria)) {
      return [];
    }

    const messages = ticket.messages || await this.ticketMessageRepository.find({
      where: { ticketId: ticket.id },
      order: { createdAt: 'ASC' },
      relations: ['author'],
    });

    const extractedData: ExtractedData[] = [];

    // Extract initial problem and final resolution
    const initialProblem = this.extractInitialProblem(ticket, messages);
    const finalResolution = this.extractFinalResolution(messages);

    if (initialProblem && finalResolution) {
      const data: ExtractedData = {
        id: `ticket-${ticket.id}-main`,
        sourceId: ticket.id,
        type: 'ticket',
        sourceType: 'ticket',
        question: initialProblem,
        answer: finalResolution.content,
        context: this.buildTicketContext(ticket, messages),
        confidence: 50, // Will be calculated by normalizer
        metadata: {
          timestamp: ticket.createdAt,
          resolutionTime: ticket.resolutionTimeHours * 3600,
          isResolved: ticket.status === TicketStatus.RESOLVED,
          tags: ticket.tags || [],
          category: ticket.category?.name || 'general',
          messageCount: messages.length,
        },
      };

      extractedData.push(data);
    }

    // Extract additional Q&A pairs from conversation
    const conversationPairs = this.extractConversationPairs(messages);
    let pairIndex = 0;
    for (const pair of conversationPairs) {
      const data: ExtractedData = {
        id: `ticket-${ticket.id}-pair-${pairIndex++}`,
        sourceId: ticket.id,
        type: 'ticket',
        sourceType: 'ticket',
        question: pair.question,
        answer: pair.answer,
        context: this.buildTicketContext(ticket, messages),
        confidence: 40, // Lower confidence for conversation pairs
        metadata: {
          timestamp: ticket.createdAt,
          resolutionTime: ticket.resolutionTimeHours * 3600,
          isResolved: ticket.status === TicketStatus.RESOLVED,
          tags: ticket.tags || [],
          category: ticket.category?.name || 'general',
          messageCount: messages.length,
        },
      };

      extractedData.push(data);
    }

    return extractedData;
  }

  /**
   * Validate if ticket meets criteria
   */
  private async validateTicket(ticket: Ticket, criteria: ExtractionCriteria): Promise<boolean> {
    // Must be resolved or closed
    if (![TicketStatus.RESOLVED, TicketStatus.CLOSED].includes(ticket.status)) {
      return false;
    }

    // Check minimum resolution time
    if (criteria.minResolutionTime && 
        ticket.resolutionTimeHours * 3600 < criteria.minResolutionTime) {
      return false;
    }

    // Check category exclusions
    if (criteria.excludedCategories && 
        criteria.excludedCategories.includes(ticket.category?.name)) {
      return false;
    }

    // Check category inclusions
    if (criteria.includeCategories && 
        !criteria.includeCategories.includes(ticket.category?.name)) {
      return false;
    }

    // Check age limit
    if (criteria.maxAge) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - criteria.maxAge);
      if (ticket.createdAt < cutoffDate) return false;
    }

    return true;
  }

  /**
   * Extract the initial problem description
   */
  private extractInitialProblem(ticket: Ticket, messages: TicketMessage[]): string {
    // Start with ticket description
    let problem = ticket.description;

    // If description is too short, look at first user message
    if (problem.length < 20 && messages.length > 0) {
      const firstUserMessage = messages.find(msg => 
        !msg.isInternal && 
        msg.authorId === ticket.userId
      );
      
      if (firstUserMessage) {
        problem = firstUserMessage.content;
      }
    }

    // Combine subject and description for better context
    if (ticket.subject && ticket.subject !== problem) {
      problem = `${ticket.subject}: ${problem}`;
    }

    return problem;
  }

  /**
   * Extract the final resolution from messages
   */
  private extractFinalResolution(messages: TicketMessage[]): TicketMessage | null {
    // Look for the last non-internal message from support staff
    const supportMessages = messages
      .filter(msg => !msg.isInternal && msg.content.length > 20)
      .reverse(); // Start from the end

    // Find resolution indicators
    const resolutionKeywords = [
      'resolved', 'fixed', 'solution', 'try this', 'follow these steps',
      'here\'s how', 'to resolve', 'should work now', 'problem solved'
    ];

    for (const message of supportMessages) {
      const lowerContent = message.content.toLowerCase();
      if (resolutionKeywords.some(keyword => lowerContent.includes(keyword))) {
        return message;
      }
    }

    // If no clear resolution found, return the last support message
    return supportMessages[0] || null;
  }

  /**
   * Extract additional Q&A pairs from ticket conversation
   */
  private extractConversationPairs(messages: TicketMessage[]): Array<{
    question: string;
    answer: string;
  }> {
    const pairs: Array<{ question: string; answer: string }> = [];
    
    for (let i = 0; i < messages.length - 1; i++) {
      const currentMsg = messages[i];
      const nextMsg = messages[i + 1];

      // Skip internal messages
      if (currentMsg.isInternal || nextMsg.isInternal) continue;

      // Look for user question followed by support answer
      if (currentMsg.authorId !== nextMsg.authorId && // Different authors
          this.isQuestion(currentMsg.content) &&
          this.isAnswer(nextMsg.content)) {
        
        pairs.push({
          question: currentMsg.content,
          answer: nextMsg.content,
        });
      }
    }

    return pairs;
  }

  /**
   * Check if message content is a question
   */
  private isQuestion(content: string): boolean {
    if (!content || content.length < 10) return false;

    const lowerContent = content.toLowerCase();
    
    // Question indicators
    const questionPatterns = [
      /\?/,
      /^(how|what|when|where|why|who|which|can|could|would|should|is|are|do|does|did)\s/,
      /(help|problem|issue|trouble|error|not working|doesn't work)/,
    ];

    return questionPatterns.some(pattern => pattern.test(lowerContent));
  }

  /**
   * Check if message content is a helpful answer
   */
  private isAnswer(content: string): boolean {
    if (!content || content.length < 20) return false;

    const lowerContent = content.toLowerCase();
    
    // Answer indicators
    const answerPatterns = [
      /(you can|try|here's how|to do this|follow these|solution|resolve)/,
      /(step|first|then|next|finally)/,
      /(should|will|need to|have to)/,
    ];

    return answerPatterns.some(pattern => pattern.test(lowerContent));
  }

  /**
   * Build context from ticket metadata and conversation
   */
  private buildTicketContext(ticket: Ticket, messages: TicketMessage[]): string {
    const contextParts = [];

    // Add ticket metadata
    if (ticket.category?.name) {
      contextParts.push(`Category: ${ticket.category.name}`);
    }

    if (ticket.tags && ticket.tags.length > 0) {
      contextParts.push(`Tags: ${ticket.tags.join(', ')}`);
    }

    if (ticket.priority) {
      contextParts.push(`Priority: ${ticket.priority}`);
    }

    // Add conversation summary
    const messageCount = messages.filter(msg => !msg.isInternal).length;
    contextParts.push(`Messages: ${messageCount}`);

    if (ticket.resolutionTimeHours) {
      contextParts.push(`Resolution time: ${ticket.resolutionTimeHours}h`);
    }

    return contextParts.join(' | ');
  }

  /**
   * Validate extracted data quality
   */
  validateData(data: ExtractedData): boolean {
    if (!data.question || data.question.trim().length < 10) {
      return false;
    }
    if (!data.answer || data.answer.trim().length < 20) {
      return false;
    }
    if (data.confidence < 30) {
      return false;
    }
    return true;
  }
}
