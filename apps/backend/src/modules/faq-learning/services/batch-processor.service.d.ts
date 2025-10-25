import { Repository } from 'typeorm';
import { ChatDataExtractorService } from './chat-data-extractor.service';
import { TicketDataExtractorService } from './ticket-data-extractor.service';
import { DataNormalizerService } from './data-normalizer.service';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { ExtractionCriteria } from '../interfaces/data-extraction.interface';
export interface BatchProcessingResult {
    totalProcessed: number;
    chatDataExtracted: number;
    ticketDataExtracted: number;
    totalExtracted: number;
    averageConfidence: number;
    processingTimeMs: number;
    errors: string[];
}
export interface BatchProcessingOptions {
    batchSize?: number;
    includeChat?: boolean;
    includeTickets?: boolean;
    criteria?: ExtractionCriteria;
    maxConcurrency?: number;
}
export declare class BatchProcessorService {
    private configRepository;
    private chatExtractor;
    private ticketExtractor;
    private dataNormalizer;
    private readonly logger;
    constructor(configRepository: Repository<FaqLearningConfig>, chatExtractor: ChatDataExtractorService, ticketExtractor: TicketDataExtractorService, dataNormalizer: DataNormalizerService);
    /**
     * Process data in batches for learning
     */
    processBatch(options?: BatchProcessingOptions): Promise<BatchProcessingResult>;
    /**
     * Process specific source IDs in batch
     */
    processSpecificSources(chatSessionIds?: string[], ticketIds?: string[], criteria?: ExtractionCriteria): Promise<BatchProcessingResult>;
    /**
     * Get processing configuration
     */
    private getProcessingConfig;
    /**
     * Build extraction criteria from config and options
     */
    private buildExtractionCriteria;
    /**
     * Process chat data in batches with concurrency control
     */
    private processChatDataInBatches;
    /**
     * Process ticket data in batches with concurrency control
     */
    private processTicketDataInBatches;
    /**
     * Update processing statistics in config
     */
    private updateProcessingStats;
    /**
     * Get processing status and statistics
     */
    getProcessingStatus(): Promise<{
        isEnabled: boolean;
        lastRun: Date | null;
        totalProcessed: number;
        lastResult: any;
    }>;
}
//# sourceMappingURL=batch-processor.service.d.ts.map