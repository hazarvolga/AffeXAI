export declare enum JobType {
    IMPORT = "IMPORT",
    EXPORT = "EXPORT"
}
export declare enum JobStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
export declare class ImportJobSummaryDto {
    id: string;
    fileName: string;
    status: JobStatus;
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    progressPercentage: number;
    createdAt: Date;
    completedAt?: Date;
    error?: string;
}
export declare class ExportJobSummaryDto {
    id: string;
    fileName: string;
    status: JobStatus;
    totalRecords: number;
    processedRecords: number;
    progressPercentage: number;
    createdAt: Date;
    completedAt?: Date;
    error?: string;
}
export declare class JobSummaryDto {
    id: string;
    type: JobType;
    fileName: string;
    status: JobStatus;
    totalRecords: number;
    processedRecords: number;
    progressPercentage: number;
    createdAt: Date;
    completedAt?: Date;
}
export declare class JobStatisticsDto {
    totalJobs: number;
    totalImportJobs: number;
    activeImportJobs: number;
    completedImportJobs: number;
    failedImportJobs: number;
    totalExportJobs: number;
    activeExportJobs: number;
    completedExportJobs: number;
    failedExportJobs: number;
    totalRecordsProcessed: number;
    completedJobs?: number;
    failedJobs?: number;
    processingJobs?: number;
    pendingJobs?: number;
    averageProcessingTime?: number;
}
export declare class CleanupResultDto {
    importJobsCleaned: number;
    exportJobsCleaned: number;
    totalJobsCleaned: number;
    cleanedAt: Date;
}
export declare class JobListResponseDto {
    jobs: JobSummaryDto[];
    total: number;
    page: number;
    limit: number;
}
export declare class JobCleanupResponseDto {
    cleanedCount: number;
    cleanedJobs?: number;
    cleanedAt: Date;
    error?: string;
}
//# sourceMappingURL=job-management.dto.d.ts.map