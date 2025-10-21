import { BaseEntity } from '../../../database/entities/base.entity';
export declare enum ImportJobStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export interface ImportOptions {
    groupIds?: string[];
    segmentIds?: string[];
    duplicateHandling: 'skip' | 'update' | 'replace';
    validationThreshold: number;
    batchSize: number;
    columnMapping: Record<string, string>;
}
export interface ValidationSummary {
    totalProcessed: number;
    validEmails: number;
    invalidEmails: number;
    riskyEmails: number;
    duplicates: number;
    averageConfidenceScore: number;
    processingTimeMs: number;
}
export declare class ImportJob extends BaseEntity {
    fileName: string;
    originalFileName: string;
    filePath: string;
    status: ImportJobStatus;
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    riskyRecords: number;
    duplicateRecords: number;
    options: ImportOptions;
    columnMapping: Record<string, string>;
    validationSummary: ValidationSummary;
    error: string;
    completedAt: Date;
    userId: string;
    progressPercentage: number;
}
//# sourceMappingURL=import-job.entity.d.ts.map