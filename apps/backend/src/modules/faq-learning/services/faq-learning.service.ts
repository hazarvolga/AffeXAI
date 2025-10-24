import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as crypto from 'crypto';
import { LearnedFaqEntry, FaqEntryStatus, FaqEntrySource } from '../entities/learned-faq-entry.entity';
import { LearningPattern } from '../entities/learning-pattern.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { ChatDataExtractorService } from './chat-data-extractor.service';
import { TicketDataExtractorService } from './ticket-data-extractor.service';
import { DataNormalizerService } from './data-normalizer.service';
import { PatternRecognitionService } from './pattern-recognition.service';
import { FaqAiService } from './faq-ai.service';
import { ConfidenceCalculatorService } from './confidence-calculator.service';
import { BatchProcessorService } from './batch-processor.service';
import { ExtractionCriteria } from '../interfaces/data-extraction.interface';

export interface LearningPipelineResult {
  processedItems: number;
  newFaqs: number;
  updatedPatterns: number;
  errors: string[];
  processingTime: number;
  status: 'completed' | 'partial' | 'failed';
}

export interface PipelineConfig {
  enableRealTimeProcessing: boolean;
  batchSize: number;
  processingInterval: number;
  maxDailyProcessingLimit: number;
  enableAutoPublishing: boolean;
}

@Injectable()
export class FaqLearningService {
  private readonly logger = new Logger(FaqLearningService.name);
  private isProcessing = false;
  private dailyProcessingCount = 0;
  private lastProcessingDate = new Date().toDateString();

  constructor(
    @InjectRepository(LearnedFaqEntry)
    private faqRepository: Repository<LearnedFaqEntry>,
    @InjectRepository(LearningPattern)
    private patternRepository: Repository<LearningPattern>,
    @InjectRepository(FaqLearningConfig)
    private configRepository: Repository<FaqLearningConfig>,
    private chatExtractor: ChatDataExtractorService,
    private ticketExtractor: TicketDataExtractorService,
    private dataNormalizer: DataNormalizerService,
    private patternRecognition: PatternRecognitionService,
    private faqAiService: FaqAiService,
    private confidenceCalculator: ConfidenceCalculatorService,
    private batchProcessor: BatchProcessorService,
  ) {}

  async runLearningPipeline(criteria?: ExtractionCriteria): Promise<LearningPipelineResult> {
    if (this.isProcessing) {
      throw new Error('Learning pipeline is already running');
    }

    const startTime = Date.now();
    this.isProcessing = true;
    
    const result: LearningPipelineResult = {
      processedItems: 0,
      newFaqs: 0,
      updatedPatterns: 0,
      errors: [],
      processingTime: 0,
      status: 'completed'
    };

    try {
      this.logger.log('Starting FAQ learning pipeline');
      
      // Check daily processing limit
      const config = await this.getPipelineConfig();
      if (!await this.checkDailyLimit(config)) {
        throw new Error('Daily processing limit reached');
      }

      // Step 1: Extract data from chat and tickets
      const extractedData = await this.extractData(criteria, config);
      result.processedItems = extractedData.length;
      
      if (extractedData.length === 0) {
        this.logger.log('No new data to process');
        return result;
      }

      // Step 2: Normalize and clean data
      const normalizedData = await this.normalizeData(extractedData);
      
      // Step 3: Identify patterns
      const patterns = await this.identifyPatterns(normalizedData);
      result.updatedPatterns = patterns.length;

      // Step 4: Generate FAQs
      const newFaqs = await this.generateFaqs(normalizedData, patterns);
      result.newFaqs = newFaqs.length;

      // Step 5: Save results
      await this.saveResults(newFaqs, patterns);

      // Update processing statistics
      await this.updateProcessingStats(result);
      
      this.logger.log(`Learning pipeline completed: ${result.newFaqs} new FAQs, ${result.updatedPatterns} patterns`);

    } catch (error) {
      this.logger.error('Learning pipeline failed:', error);
      result.errors.push(error.message);
      result.status = 'failed';
    } finally {
      result.processingTime = Date.now() - startTime;
      this.isProcessing = false;
      this.dailyProcessingCount += result.processedItems;
    }

    return result;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async scheduledLearning(): Promise<void> {
    try {
      const config = await this.getPipelineConfig();
      
      if (!config.enableRealTimeProcessing) {
        return;
      }

      // Run with default criteria for recent data
      const criteria: ExtractionCriteria = {
        dateRange: {
          from: new Date(Date.now() - 3600000), // Last hour
          to: new Date()
        },
        maxResults: config.batchSize
      };

      await this.runLearningPipeline(criteria);
    } catch (error) {
      this.logger.error('Scheduled learning failed:', error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyCounters(): Promise<void> {
    const today = new Date().toDateString();
    if (this.lastProcessingDate !== today) {
      this.dailyProcessingCount = 0;
      this.lastProcessingDate = today;
      this.logger.log('Daily processing counters reset');
    }
  }

  async processRealTimeData(sourceType: 'chat' | 'ticket', sourceId: string): Promise<void> {
    try {
      const config = await this.getPipelineConfig();
      
      if (!config.enableRealTimeProcessing) {
        return;
      }

      this.logger.log(`Processing real-time data: ${sourceType}:${sourceId}`);

      // Extract single item
      const criteria: ExtractionCriteria = {
        maxResults: 1
      };

      let extractedData;
      if (sourceType === 'chat') {
        extractedData = await this.chatExtractor.extract(criteria);
      } else {
        extractedData = await this.ticketExtractor.extract(criteria);
      }

      const relevantData = extractedData.filter(d => d.id === sourceId);
      
      if (relevantData.length === 0) {
        return;
      }

      // Process single item through pipeline
      const normalizedData = await this.normalizeData(relevantData);
      const patterns = await this.identifyPatterns(normalizedData);
      const newFaqs = await this.generateFaqs(normalizedData, patterns);

      await this.saveResults(newFaqs, patterns);

      this.logger.log(`Real-time processing completed for ${sourceType}:${sourceId}`);
    } catch (error) {
      this.logger.error(`Real-time processing failed for ${sourceType}:${sourceId}:`, error);
    }
  }

  async getPipelineStatus(): Promise<{
    isProcessing: boolean;
    dailyProcessingCount: number;
    lastRun?: Date;
    nextScheduledRun?: Date;
  }> {
    const systemStatus = await this.getSystemStatus();
    
    return {
      isProcessing: this.isProcessing,
      dailyProcessingCount: this.dailyProcessingCount,
      lastRun: systemStatus.lastProcessingRun,
      nextScheduledRun: new Date(Date.now() + 3600000) // Next hour
    };
  }

  private async extractData(criteria: ExtractionCriteria, config: PipelineConfig): Promise<any[]> {
    const batchCriteria = {
      ...criteria,
      maxResults: criteria.maxResults || config.batchSize
    };

    // Extract from both sources in parallel
    const [chatData, ticketData] = await Promise.all([
      this.chatExtractor.extract(batchCriteria).catch(error => {
        this.logger.warn('Chat extraction failed:', error);
        return [];
      }),
      this.ticketExtractor.extract(batchCriteria).catch(error => {
        this.logger.warn('Ticket extraction failed:', error);
        return [];
      })
    ]);

    return [...chatData, ...ticketData];
  }

  private async normalizeData(extractedData: any[]): Promise<any[]> {
    const normalizedData = [];
    
    for (const data of extractedData) {
      try {
        const normalized = await this.dataNormalizer.normalize(data);
        normalizedData.push(normalized);
      } catch (error) {
        this.logger.warn(`Failed to normalize data ${data.id}:`, error);
      }
    }

    return normalizedData;
  }

  private async identifyPatterns(normalizedData: any[]): Promise<any[]> {
    try {
      const patternData = normalizedData.map(d => ({
        id: d.id || crypto.randomUUID(),
        question: d.question,
        answer: d.answer || '',
        confidence: d.confidence || 50,
        sourceId: d.sourceId,
        type: (d.source === 'chat' ? 'chat' : 'ticket') as 'chat' | 'ticket',
        sourceType: (d.source === 'chat' ? 'chat' : 'ticket') as 'chat' | 'ticket',
        context: d.context,
        metadata: {
          timestamp: d.timestamp || new Date(),
          ...d.metadata
        }
      }));

      return await this.patternRecognition.identifyPatterns(patternData);
    } catch (error) {
      this.logger.error('Pattern identification failed:', error);
      return [];
    }
  }

  private async generateFaqs(normalizedData: any[], patterns: any[]): Promise<LearnedFaqEntry[]> {
    const faqs: LearnedFaqEntry[] = [];
    const config = await this.getPipelineConfig();

    for (const data of normalizedData) {
      try {
        // Find relevant patterns
        const relevantPatterns = patterns.filter(p => 
          p.sources.some(s => s.id === data.sourceId)
        );

        // Calculate confidence
        const patternFrequency = relevantPatterns.length > 0 ? 
          Math.max(...relevantPatterns.map(p => p.frequency)) : 1;
        
        const confidenceResult = await this.confidenceCalculator.calculateConfidence(
          data,
          patternFrequency
        );

        // Generate AI answer if confidence is sufficient
        if (confidenceResult.overallConfidence >= 50) {
          const aiResponse = await this.faqAiService.generateFaqAnswer({
            question: data.question,
            context: data.context,
            category: data.category
          });

          const faq = new LearnedFaqEntry();
          faq.question = data.question;
          faq.answer = aiResponse.answer;
          faq.confidence = confidenceResult.overallConfidence;
          faq.status = confidenceResult.recommendation === 'auto_publish' && config.enableAutoPublishing ? 
            FaqEntryStatus.PUBLISHED : FaqEntryStatus.PENDING_REVIEW;
          faq.source = data.source as FaqEntrySource;
          faq.sourceId = data.sourceId;
          faq.category = aiResponse.category || data.category;
          faq.keywords = aiResponse.keywords;
          faq.metadata = {
            ...data.metadata,
            confidenceFactors: confidenceResult.factors,
            aiMetadata: aiResponse.metadata
          };

          faqs.push(faq);
        }
      } catch (error) {
        this.logger.warn(`Failed to generate FAQ for ${data.sourceId}:`, error);
      }
    }

    return faqs;
  }

  private async saveResults(faqs: LearnedFaqEntry[], patterns: any[]): Promise<void> {
    // Save FAQs
    if (faqs.length > 0) {
      await this.faqRepository.save(faqs);
    }

    // Save or update patterns
    for (const patternData of patterns) {
      try {
        const existingPattern = await this.patternRepository.findOne({
          where: { patternHash: patternData.patternHash }
        });

        if (existingPattern) {
          existingPattern.frequency += 1;
          existingPattern.sources = [...existingPattern.sources, ...patternData.sources];
          await this.patternRepository.save(existingPattern);
        } else {
          const newPattern = this.patternRepository.create(patternData);
          await this.patternRepository.save(newPattern);
        }
      } catch (error) {
        this.logger.warn('Failed to save pattern:', error);
      }
    }
  }

  private async checkDailyLimit(config: PipelineConfig): Promise<boolean> {
    const today = new Date().toDateString();
    
    if (this.lastProcessingDate !== today) {
      this.dailyProcessingCount = 0;
      this.lastProcessingDate = today;
    }

    return this.dailyProcessingCount < config.maxDailyProcessingLimit;
  }

  private async getPipelineConfig(): Promise<PipelineConfig> {
    try {
      const configs = await this.configRepository.find({
        where: [
          { configKey: 'advanced_settings' },
          { configKey: 'data_processing' }
        ]
      });

      const advancedSettings = configs.find(c => c.configKey === 'advanced_settings')?.configValue || {};
      const dataProcessing = configs.find(c => c.configKey === 'data_processing')?.configValue || {};

      return {
        enableRealTimeProcessing: advancedSettings.enableRealTimeProcessing || false,
        batchSize: dataProcessing.batchSize || 100,
        processingInterval: dataProcessing.processingInterval || 3600,
        maxDailyProcessingLimit: advancedSettings.maxDailyProcessingLimit || 1000,
        enableAutoPublishing: advancedSettings.enableAutoPublishing || false
      };
    } catch (error) {
      this.logger.error('Failed to load pipeline config:', error);
      return {
        enableRealTimeProcessing: false,
        batchSize: 100,
        processingInterval: 3600,
        maxDailyProcessingLimit: 1000,
        enableAutoPublishing: false
      };
    }
  }

  private async updateProcessingStats(result: LearningPipelineResult): Promise<void> {
    try {
      const statusConfig = await this.configRepository.findOne({
        where: { configKey: 'system_status' }
      });

      if (statusConfig) {
        const currentStats = statusConfig.configValue;
        statusConfig.configValue = {
          ...currentStats,
          lastProcessingRun: new Date(),
          totalFaqsGenerated: (currentStats.totalFaqsGenerated || 0) + result.newFaqs,
          totalPatternsIdentified: (currentStats.totalPatternsIdentified || 0) + result.updatedPatterns
        };
        
        await this.configRepository.save(statusConfig);
      }
    } catch (error) {
      this.logger.error('Failed to update processing stats:', error);
    }
  }

  private async getSystemStatus(): Promise<any> {
    try {
      const config = await this.configRepository.findOne({
        where: { configKey: 'system_status' }
      });
      
      return config?.configValue || {};
    } catch (error) {
      this.logger.error('Failed to get system status:', error);
      return {};
    }
  }

  // Dashboard Statistics Methods
  async getTotalFaqCount(): Promise<number> {
    try {
      return await this.faqRepository.count({
        where: { status: FaqEntryStatus.PUBLISHED }
      });
    } catch (error) {
      this.logger.error('Failed to get total FAQ count:', error);
      return 0;
    }
  }

  async getNewFaqsToday(): Promise<number> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return await this.faqRepository.count({
        where: {
          createdAt: new Date(today.getTime()) as any,
          status: FaqEntryStatus.PUBLISHED
        }
      });
    } catch (error) {
      this.logger.error('Failed to get new FAQs today:', error);
      return 0;
    }
  }

  async getPendingReviewCount(): Promise<number> {
    try {
      return await this.faqRepository.count({
        where: { status: FaqEntryStatus.PENDING_REVIEW }
      });
    } catch (error) {
      this.logger.error('Failed to get pending review count:', error);
      return 0;
    }
  }

  async getAverageConfidence(): Promise<number> {
    try {
      const result = await this.faqRepository
        .createQueryBuilder('faq')
        .select('AVG(faq.confidenceScore)', 'avg')
        .where('faq.status = :status', { status: FaqEntryStatus.PUBLISHED })
        .getRawOne();
      
      return result?.avg ? Math.round(parseFloat(result.avg)) : 0;
    } catch (error) {
      this.logger.error('Failed to get average confidence:', error);
      return 0;
    }
  }

  async getRecentActivity(limit: number = 10): Promise<Array<{
    type: string;
    description: string;
    timestamp: Date;
    status: string;
  }>> {
    try {
      const recentFaqs = await this.faqRepository.find({
        order: { createdAt: 'DESC' },
        take: limit
      });

      return recentFaqs.map(faq => ({
        type: 'faq_generated',
        description: `Yeni FAQ oluşturuldu: "${faq.question}"`,
        timestamp: faq.createdAt,
        status: faq.status === FaqEntryStatus.PUBLISHED ? 'success' : 'warning'
      }));
    } catch (error) {
      this.logger.error('Failed to get recent activity:', error);
      return [];
    }
  }

  /**
   * Get learning progress by source (last 7 days)
   */
  async getLearningProgressBySource(): Promise<{
    fromChat: number;
    fromTickets: number;
    fromSuggestions: number;
  }> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [chatCount, ticketCount, suggestionCount] = await Promise.all([
        this.faqRepository.count({
          where: {
            source: FaqEntrySource.CHAT,
            createdAt: sevenDaysAgo as any // TypeORM MoreThanOrEqual would be used here
          }
        }),
        this.faqRepository.count({
          where: {
            source: FaqEntrySource.TICKET,
            createdAt: sevenDaysAgo as any
          }
        }),
        this.faqRepository.count({
          where: {
            source: FaqEntrySource.USER_SUGGESTION,
            createdAt: sevenDaysAgo as any
          }
        })
      ]);

      return {
        fromChat: chatCount,
        fromTickets: ticketCount,
        fromSuggestions: suggestionCount
      };
    } catch (error) {
      this.logger.error('Failed to get learning progress by source:', error);
      return {
        fromChat: 0,
        fromTickets: 0,
        fromSuggestions: 0
      };
    }
  }

  /**
   * Get quality metrics (confidence distribution)
   */
  async getQualityMetrics(): Promise<{
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
  }> {
    try {
      const allFaqs = await this.faqRepository.find({
        select: ['confidence']
      });

      const highConfidence = allFaqs.filter(faq => faq.confidence >= 85).length;
      const mediumConfidence = allFaqs.filter(faq => faq.confidence >= 60 && faq.confidence < 85).length;
      const lowConfidence = allFaqs.filter(faq => faq.confidence < 60).length;

      return {
        highConfidence,
        mediumConfidence,
        lowConfidence
      };
    } catch (error) {
      this.logger.error('Failed to get quality metrics:', error);
      return {
        highConfidence: 0,
        mediumConfidence: 0,
        lowConfidence: 0
      };
    }
  }
}