import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AdvancedEmailValidationService } from '../services/advanced-email-validation.service';
import { ImportResult, ImportResultStatus } from '../entities/import-result.entity';
import { Repository } from 'typeorm';
export interface ValidationJobData {
    jobId: string;
    resultIds: string[];
    options: {
        validationThreshold: number;
        batchSize: number;
    };
}
export interface BatchValidationResult {
    resultId: string;
    email: string;
    isValid: boolean;
    confidenceScore: number;
    details: any;
    issues: string[];
    suggestions: string[];
    status: ImportResultStatus;
}
export declare class ValidationJobProcessor extends WorkerHost {
    private readonly emailValidationService;
    private readonly importResultRepository;
    private readonly logger;
    constructor(emailValidationService: AdvancedEmailValidationService, importResultRepository: Repository<ImportResult>);
    process(job: Job<ValidationJobData>): Promise<void>;
    /**
     * Validate a batch of import results
     */
    private validateBatch;
    /**
     * Validate a single email address
     */
    private validateSingleEmail;
    /**
     * Update import results with validation data
     */
    private updateImportResults;
    /**
     * Extract issues from validation result
     */
    private extractIssues;
    /**
     * Extract suggestions from validation result
     */
    private extractSuggestions;
    onCompleted(job: Job<ValidationJobData>): void;
    onFailed(job: Job<ValidationJobData>, error: Error): void;
    onProgress(job: Job<ValidationJobData>, progress: number): void;
}
//# sourceMappingURL=validation-job.processor.d.ts.map