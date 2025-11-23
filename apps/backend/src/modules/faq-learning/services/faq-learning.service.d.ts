import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
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
export declare class FaqLearningService {
    private faqRepository;
    private patternRepository;
    private configRepository;
    private chatExtractor;
    private ticketExtractor;
    private dataNormalizer;
    private patternRecognition;
    private faqAiService;
    private confidenceCalculator;
    private batchProcessor;
    private readonly logger;
    private isProcessing;
    private dailyProcessingCount;
    private lastProcessingDate;
    constructor(faqRepository: Repository<LearnedFaqEntry>, patternRepository: Repository<LearningPattern>, configRepository: Repository<FaqLearningConfig>, chatExtractor: ChatDataExtractorService, ticketExtractor: TicketDataExtractorService, dataNormalizer: DataNormalizerService, patternRecognition: PatternRecognitionService, faqAiService: FaqAiService, confidenceCalculator: ConfidenceCalculatorService, batchProcessor: BatchProcessorService);
    runLearningPipeline(criteria?: ExtractionCriteria): Promise<LearningPipelineResult>;
    scheduledLearning(): Promise<void>;
    resetDailyCounters(): Promise<void>;
    processRealTimeData(sourceType: 'chat' | 'ticket', sourceId: string): Promise<void>;
    getPipelineStatus(): Promise<{
        isProcessing: boolean;
        dailyProcessingCount: number;
        lastRun?: Date;
        nextScheduledRun?: Date;
    }>;
    private extractData;
    private normalizeData;
    private identifyPatterns;
    private generateFaqs;
    private saveResults;
    private checkDailyLimit;
    private getPipelineConfig;
    private updateProcessingStats;
    private getSystemStatus;
    getTotalFaqCount(): Promise<number>;
    getNewFaqsToday(): Promise<number>;
    getPendingReviewCount(): Promise<number>;
    getAverageConfidence(): Promise<number>;
    getRecentActivity(limit?: number): Promise<Array<{
        type: string;
        description: string;
        timestamp: Date;
        status: string;
    }>>;
    /**
     * Get learning progress by source (last 7 days)
     */
    getLearningProgressBySource(): Promise<{
        fromChat: number;
        fromTickets: number;
        fromSuggestions: number;
    }>;
    /**
     * Get quality metrics (confidence distribution)
     */
    getQualityMetrics(): Promise<{
        highConfidence: number;
        mediumConfidence: number;
        lowConfidence: number;
    }>;
}
//# sourceMappingURL=faq-learning.service.d.ts.map