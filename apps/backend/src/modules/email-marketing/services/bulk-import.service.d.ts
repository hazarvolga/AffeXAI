import { Repository } from 'typeorm';
import { ImportJob, ImportJobStatus, ImportOptions, ValidationSummary } from '../entities/import-job.entity';
import { ImportResult, ImportResultStatus } from '../entities/import-result.entity';
import { FileProcessingService } from './file-processing.service';
import { FileUploadService } from './file-upload.service';
import { BulkOperationsComplianceService, BulkImportComplianceOptions } from './bulk-operations-compliance.service';
import { Queue } from 'bullmq';
export interface CreateImportJobDto {
    file: any;
    options: ImportOptions & {
        gdprCompliance?: BulkImportComplianceOptions;
    };
    userId?: string;
}
export interface ImportJobSummary {
    id: string;
    fileName: string;
    status: ImportJobStatus;
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    riskyRecords: number;
    duplicateRecords: number;
    progressPercentage: number;
    createdAt: Date;
    completedAt?: Date;
    error?: string;
}
export interface ImportJobDetails extends ImportJobSummary {
    options: ImportOptions;
    columnMapping: Record<string, string>;
    validationSummary?: ValidationSummary;
    filePath: string;
}
export interface DuplicateCheckResult {
    isDuplicate: boolean;
    existingSubscriberId?: string;
    duplicateType: 'exact' | 'email_only' | 'none';
}
export declare class BulkImportService {
    private readonly importJobRepository;
    private readonly importResultRepository;
    private readonly fileProcessingService;
    private readonly fileUploadService;
    private readonly complianceService;
    private readonly importQueue;
    private readonly logger;
    constructor(importJobRepository: Repository<ImportJob>, importResultRepository: Repository<ImportResult>, fileProcessingService: FileProcessingService, fileUploadService: FileUploadService, complianceService: BulkOperationsComplianceService, importQueue: Queue);
    /**
     * Create a new import job from uploaded file
     */
    createImportJob(createDto: CreateImportJobDto): Promise<ImportJobDetails>;
    /**
     * Get import job by ID
     */
    getImportJob(jobId: string): Promise<ImportJobDetails>;
    /**
     * Get import job summary (lighter version)
     */
    getImportJobSummary(jobId: string): Promise<ImportJobSummary>;
    /**
     * List import jobs with pagination and filtering
     */
    listImportJobs(options?: {
        userId?: string;
        status?: ImportJobStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        jobs: ImportJobSummary[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Update import job status and progress
     */
    updateJobProgress(jobId: string, updates: {
        status?: ImportJobStatus;
        processedRecords?: number;
        validRecords?: number;
        invalidRecords?: number;
        riskyRecords?: number;
        duplicateRecords?: number;
        progressPercentage?: number;
        error?: string;
        validationSummary?: ValidationSummary;
    }): Promise<void>;
    /**
     * Cancel import job
     */
    cancelImportJob(jobId: string): Promise<void>;
    /**
     * Get import results for a job with pagination
     */
    getImportResults(jobId: string, options?: {
        status?: ImportResultStatus;
        page?: number;
        limit?: number;
    }): Promise<{
        results: ImportResult[];
        total: number;
        page: number;
        limit: number;
    }>;
    /**
     * Check for duplicate subscribers
     */
    checkDuplicates(emails: string[], duplicateHandling: 'skip' | 'update' | 'replace'): Promise<Map<string, DuplicateCheckResult>>;
    /**
     * Validate CSV structure and suggest column mappings
     */
    validateCsvStructure(filePath: string): Promise<{
        isValid: boolean;
        headers: string[];
        sampleData: any[];
        suggestions: any[];
        errors: string[];
    }>;
    /**
     * Get import statistics for dashboard
     */
    getImportStatistics(userId?: string): Promise<{
        totalJobs: number;
        completedJobs: number;
        failedJobs: number;
        totalRecordsProcessed: number;
        totalValidRecords: number;
        averageSuccessRate: number;
    }>;
    /**
     * Clean up old import jobs and files
     */
    cleanupOldJobs(olderThanDays?: number): Promise<number>;
    /**
     * Map ImportJob entity to JobDetails DTO
     */
    private mapToJobDetails;
    /**
     * Map ImportJob entity to JobSummary DTO
     */
    private mapToJobSummary;
    /**
     * Process import with GDPR compliance
     */
    processImportWithGdprCompliance(jobId: string, subscriberData: any[], complianceOptions: BulkImportComplianceOptions): Promise<void>;
}
//# sourceMappingURL=bulk-import.service.d.ts.map