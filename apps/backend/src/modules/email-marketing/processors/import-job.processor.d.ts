import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BulkImportService } from '../services/bulk-import.service';
import { FileProcessingService } from '../services/file-processing.service';
import { AdvancedEmailValidationService } from '../services/advanced-email-validation.service';
import { ImportIntegrationService } from '../services/import-integration.service';
import { ImportResult } from '../entities/import-result.entity';
import { Repository } from 'typeorm';
export interface ImportJobData {
    jobId: string;
    filePath: string;
    options: {
        groupIds?: string[];
        segmentIds?: string[];
        duplicateHandling: 'skip' | 'update' | 'replace';
        validationThreshold: number;
        batchSize: number;
        columnMapping: Record<string, string>;
    };
}
export interface ValidationJobData {
    jobId: string;
    batch: Array<{
        email: string;
        rowNumber: number;
        originalData: Record<string, any>;
    }>;
    options: ImportJobData['options'];
}
export declare class ImportJobProcessor extends WorkerHost {
    private readonly bulkImportService;
    private readonly fileProcessingService;
    private readonly emailValidationService;
    private readonly importIntegrationService;
    private readonly importResultRepository;
    private readonly logger;
    constructor(bulkImportService: BulkImportService, fileProcessingService: FileProcessingService, emailValidationService: AdvancedEmailValidationService, importIntegrationService: ImportIntegrationService, importResultRepository: Repository<ImportResult>);
    process(job: Job<ImportJobData>): Promise<void>;
    /**
     * Process a batch of records
     */
    private processBatch;
    /**
     * Process a single record
     */
    private processRecord;
    /**
     * Create and save import result
     */
    private createImportResult;
    /**
     * Extract issues from validation result
     */
    private extractIssues;
    /**
     * Extract suggestions from validation result
     */
    private extractSuggestions;
    /**
     * Calculate average confidence score for the job
     */
    private calculateAverageConfidence;
    onCompleted(job: Job<ImportJobData>): void;
    onFailed(job: Job<ImportJobData>, error: Error): void;
    onProgress(job: Job<ImportJobData>, progress: number): void;
}
//# sourceMappingURL=import-job.processor.d.ts.map