import { ImportJobStatus } from '../entities/import-job.entity';
export declare class ImportOptionsDto {
    groupIds?: string[];
    segmentIds?: string[];
    duplicateHandling: 'skip' | 'update' | 'replace';
    validationThreshold: number;
    batchSize: number;
    columnMapping: Record<string, string>;
}
export declare class CreateImportJobDto {
    options: ImportOptionsDto;
    userId?: string;
}
export declare class ImportJobSummaryDto {
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
export declare class ImportJobDetailsDto extends ImportJobSummaryDto {
    options: ImportOptionsDto;
    columnMapping: Record<string, string>;
    validationSummary?: {
        totalProcessed: number;
        validEmails: number;
        invalidEmails: number;
        riskyEmails: number;
        duplicates: number;
        averageConfidenceScore: number;
        processingTimeMs: number;
    };
    filePath: string;
}
export declare class ImportJobListDto {
    jobs: ImportJobSummaryDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class ImportResultDto {
    id: string;
    email: string;
    status: string;
    confidenceScore: number;
    validationDetails?: {
        syntaxValid: boolean;
        domainExists: boolean;
        mxRecordExists: boolean;
        isDisposable: boolean;
        isRoleAccount: boolean;
        hasTypos: boolean;
        ipReputation: 'good' | 'poor' | 'unknown';
        confidenceScore: number;
        validationProvider: string;
        validatedAt: Date;
    };
    issues?: string[];
    suggestions?: string[];
    imported: boolean;
    error?: string;
    rowNumber: number;
    subscriberId?: string;
}
export declare class ImportResultListDto {
    results: ImportResultDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class CsvValidationDto {
    isValid: boolean;
    headers: string[];
    sampleData: any[];
    suggestions: Array<{
        csvColumn: string;
        suggestedField: string;
        confidence: number;
        reason: string;
    }>;
    errors: string[];
}
export declare class ImportStatisticsDto {
    totalJobs: number;
    completedJobs: number;
    failedJobs: number;
    totalRecordsProcessed: number;
    totalValidRecords: number;
    averageSuccessRate: number;
}
export declare class ImportJobQueryDto {
    userId?: string;
    status?: ImportJobStatus;
    page?: number;
    limit?: number;
}
export declare class ImportResultQueryDto {
    status?: string;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=bulk-import.dto.d.ts.map