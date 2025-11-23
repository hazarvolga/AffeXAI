import { Injectable, Logger } from '@nestjs/common';
import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';
import { DataNormalizerService } from './data-normalizer.service';

/**
 * Ticket Data Extractor Service
 * Extracts learning data from resolved tickets
 * Currently simplified - will be enhanced when ticket system is fully integrated
 */
@Injectable()
export class TicketDataExtractorService implements DataExtractor {
  private readonly logger = new Logger(TicketDataExtractorService.name);

  constructor(
    private dataNormalizer: DataNormalizerService,
  ) {}

  /**
   * Extract learning data from resolved tickets
   * Currently returns mock data - will be implemented when ticket system is ready
   */
  async extract(criteria: ExtractionCriteria): Promise<ExtractedData[]> {
    this.logger.log('Extracting data from tickets (mock implementation)');
    
    // Mock implementation for now
    const mockData: ExtractedData[] = [
      {
        id: 'ticket-1',
        source: 'ticket',
        sourceId: 'ticket-123',
        question: 'How do I reset my password?',
        answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
        context: 'User was unable to login and needed password reset instructions.',
        confidence: 85,
        keywords: ['password', 'reset', 'login', 'forgot'],
        category: 'Authentication',
        extractedAt: new Date(),
        sessionDuration: 1800,
        satisfactionScore: 5,
        metadata: {
          timestamp: new Date(),
          ticketId: 'ticket-123',
          resolutionTime: 1800, // 30 minutes
          satisfactionScore: 5,
          agentId: 'agent-1',
          createdAt: new Date().toISOString(),
          resolvedAt: new Date().toISOString(),
          category: 'Authentication'
        }
      },
      {
        id: 'ticket-2',
        source: 'ticket',
        sourceId: 'ticket-124',
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile and click Edit to update your information.',
        context: 'User wanted to change their email address and phone number.',
        confidence: 90,
        keywords: ['profile', 'update', 'settings', 'edit'],
        category: 'Account Management',
        extractedAt: new Date(),
        sessionDuration: 900,
        satisfactionScore: 4,
        metadata: {
          timestamp: new Date(),
          ticketId: 'ticket-124',
          resolutionTime: 900, // 15 minutes
          satisfactionScore: 4,
          agentId: 'agent-2',
          createdAt: new Date().toISOString(),
          resolvedAt: new Date().toISOString(),
          category: 'Account Management'
        }
      }
    ];

    // Apply criteria filtering
    let filteredData = mockData;

    if (criteria.minResolutionTime) {
      filteredData = filteredData.filter(
        data => (data.metadata?.resolutionTime || 0) >= criteria.minResolutionTime!
      );
    }

    if (criteria.requiredSatisfactionScore) {
      filteredData = filteredData.filter(
        data => data.satisfactionScore >= criteria.requiredSatisfactionScore!
      );
    }

    if (criteria.excludedCategories?.length) {
      filteredData = filteredData.filter(
        data => !criteria.excludedCategories!.includes(data.category)
      );
    }

    if (criteria.maxResults) {
      filteredData = filteredData.slice(0, criteria.maxResults);
    }

    this.logger.log(`Extracted ${filteredData.length} ticket data entries`);
    return filteredData;
  }

  /**
   * Validate extracted data
   */
  validateData(data: ExtractedData): boolean {
    return !!(
      data.id &&
      data.sourceId &&
      data.source &&
      data.question &&
      data.answer &&
      data.confidence >= 0 &&
      data.confidence <= 100 &&
      data.metadata?.timestamp
    );
  }

  /**
   * Extract data from specific ticket IDs
   */
  async extractFromIds(ticketIds: string[], criteria: ExtractionCriteria): Promise<ExtractedData[]> {
    this.logger.log(`Extracting data from specific tickets: ${ticketIds.join(', ')}`);
    
    // For now, filter mock data by IDs - will be implemented when ticket system is ready
    const allData = await this.extract(criteria);
    return allData.filter(data => ticketIds.includes(data.sourceId));
  }

  /**
   * Get extraction statistics
   */
  async getExtractionStats(): Promise<{
    totalTickets: number;
    resolvedTickets: number;
    extractableTickets: number;
    lastExtraction: Date | null;
  }> {
    // Mock stats for now
    return {
      totalTickets: 150,
      resolvedTickets: 120,
      extractableTickets: 85,
      lastExtraction: new Date()
    };
  }
}