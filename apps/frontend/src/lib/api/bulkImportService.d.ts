import { BulkOperationError, PartialFailureResult } from '../errors/bulk-operation-errors';
export declare enum ImportJobStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
export interface ImportOptions {
    skipDuplicates?: boolean;
    updateExisting?: boolean;
    validateEmails?: boolean;
    assignToGroups?: string[];
    customFields?: Record<string, any>;
    batchSize?: number;
    notifyOnCompletion?: boolean;
}
export interface ImportJob {
    id: string;
    userId: string;
    fileName: string;
    status: ImportJobStatus;
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    duplicateRecords: number;
    riskyRecords: number;
    errorCount: number;
    progressPercentage: number;
    originalFileName?: string;
    filePath?: string;
    columnMapping?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    options: ImportOptions;
    errors?: BulkOperationError[];
}
export interface ImportResult {
    jobId: string;
    status: ImportJobStatus;
    totalRecords: number;
    processedRecords: number;
    validRecords: number;
    invalidRecords: number;
    duplicateRecords: number;
    errorCount: number;
    errors: BulkOperationError[];
    duration: number;
    throughput: number;
}
export interface UploadImportFileRequest {
    file: File;
    options: ImportOptions;
}
export interface ImportStatusResponse extends ImportJob {
}
export interface ImportResultsResponse {
    results: ImportResult[];
    total: number;
    page: number;
    limit: number;
}
declare class BulkImportService {
    private baseUrl;
    private fetchBaseUrl;
    /**
     * Upload CSV file and start import job with comprehensive error handling
     */
    uploadFile(request: UploadImportFileRequest): Promise<ImportJob>;
    /**
     * Validate file before upload to catch issues early
     */
    private validateFileBeforeUpload;
    /**
     * Get import job status and progress with retry logic
     */
    getImportStatus(jobId: string): Promise<ImportStatusResponse>;
    /**
     * Get detailed import results with error handling
     */
    getImportResults(jobId: string, page?: number, limit?: number): Promise<ImportResultsResponse>;
    /**
     * Download detailed import report with retry logic
     */
    downloadReport(jobId: string): Promise<Blob>;
    /**
     * Cancel import job with error handling
     */
    cancelImport(jobId: string): Promise<void>;
    /**
     * Get all import jobs for current user with error handling
     */
    getImportJobs(page?: number, limit?: number): Promise<{
        jobs: ImportJob[];
        total: number;
    }>;
    /**
     * Validate CSV structure before upload with comprehensive error handling
     */
    validateCsvStructure(file: File): Promise<{
        headers: string[];
        rowCount: number;
        sampleRows: string[][];
        isValid: boolean;
        errors: string[];
    }>;
    /**
     * Process import with partial failure handling
     */
    processImportWithPartialFailureHandling(jobId: string, batchSize?: number): Promise<PartialFailureResult<ImportResult>>;
    /**
     * Get user-friendly error message for import operations
     */
    getUserFriendlyErrorMessage(error: any): string;
}
export declare const bulkImportService: BulkImportService;
export default bulkImportService;
//# sourceMappingURL=bulkImportService.d.ts.map