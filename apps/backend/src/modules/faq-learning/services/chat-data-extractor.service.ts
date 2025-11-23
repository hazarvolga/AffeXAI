import { Injectable, Logger } from '@nestjs/common';
import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';
import { DataNormalizerService } from './data-normalizer.service';

/**
 * Chat Data Extractor Service
 * Extracts learning data from successful chat sessions
 * Currently simplified - will be enhanced when chat system is fully integrated
 */
@Injectable()
export class ChatDataExtractorService implements DataExtractor {
  private readonly logger = new Logger(ChatDataExtractorService.name);

  constructor(
    private dataNormalizer: DataNormalizerService,
  ) {}

  /**
   * Extract learning data from successful chat sessions
   * Currently returns mock data - will be implemented when chat system is ready
   */
  async extract(criteria: ExtractionCriteria): Promise<ExtractedData[]> {
    this.logger.log('Extracting data from chat sessions (mock implementation)');
    
    // Mock implementation for now
    const mockData: ExtractedData[] = [
      {
        id: 'chat-1',
        source: 'chat',
        sourceId: 'session-456',
        question: 'How do I export my data?',
        answer: 'You can export your data by going to Settings > Data Export and selecting the format you need.',
        context: 'User wanted to download their account data in CSV format.',
        confidence: 88,
        keywords: ['export', 'data', 'download', 'csv'],
        category: 'Data Management',
        extractedAt: new Date(),
        sessionDuration: 1200, // 20 minutes
        satisfactionScore: 5,
        metadata: {
          timestamp: new Date(),
          sessionId: 'session-456',
          messageCount: 8,
          agentId: 'agent-3',
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          sessionDuration: 1200,
          satisfactionScore: 5,
          category: 'Data Management'
        }
      },
      {
        id: 'chat-2',
        source: 'chat',
        sourceId: 'session-457',
        question: 'Can I change my subscription plan?',
        answer: 'Yes, you can upgrade or downgrade your plan anytime from the Billing section in your account.',
        context: 'User wanted to upgrade from basic to premium plan.',
        confidence: 92,
        keywords: ['subscription', 'plan', 'upgrade', 'billing'],
        category: 'Billing',
        extractedAt: new Date(),
        sessionDuration: 800, // 13 minutes
        satisfactionScore: 4,
        metadata: {
          timestamp: new Date(),
          sessionId: 'session-457',
          messageCount: 6,
          agentId: 'agent-1',
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          sessionDuration: 800,
          satisfactionScore: 4,
          category: 'Billing'
        }
      }
    ];

    // Apply criteria filtering
    let filteredData = mockData;

    if (criteria.minSessionDuration) {
      filteredData = filteredData.filter(
        data => data.sessionDuration >= criteria.minSessionDuration!
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

    this.logger.log(`Extracted ${filteredData.length} chat data entries`);
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
   * Get extraction statistics
   */
  async getExtractionStats(): Promise<{
    totalSessions: number;
    successfulSessions: number;
    extractableSessions: number;
    lastExtraction: Date | null;
  }> {
    // Mock stats for now
    return {
      totalSessions: 200,
      successfulSessions: 165,
      extractableSessions: 120,
      lastExtraction: new Date()
    };
  }
}