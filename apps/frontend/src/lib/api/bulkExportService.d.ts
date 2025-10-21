import { PartialFailureResult } from '../errors/bulk-operation-errors';
export declare enum ExportJobStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}
export interface ExportFilters {
    groups?: string[];
    tags?: string[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    status?: string[];
    customFields?: Record<string, any>;
}
export interface ExportOptions {
    format?: 'csv' | 'xlsx' | 'json';
    fields?: string[];
    includeHeaders?: boolean;
    compression?: boolean;
    notifyOnCompletion?: boolean;
}
export interface ExportJob {
    id: string;
    userId: string;
    status: ExportJobStatus;
    totalRecords: number;
    processedRecords: number;
    filters: ExportFilters;
    options: ExportOptions;
    downloadUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    error?: string;
}
export interface CreateExportJobRequest {
    filters: ExportFilters;
    options: ExportOptions;
}
export interface ExportStatusResponse extends ExportJob {
}
export interface ExportJobsResponse {
    jobs: ExportJob[];
    total: number;
    page: number;
    limit: number;
}
declare class BulkExportService {
    private baseUrl;
    /**
     * Create export job with filters and options with error handling
     */
    createExportJob(request: CreateExportJobRequest): Promise<ExportJob>;
    /**
     * Validate export request to catch issues early
     */
    private validateExportRequest;
    /**
     * Get export job status and progress with retry logic
     */
    getExportStatus(jobId: string): Promise<ExportStatusResponse>;
    /**
     * Download export file with comprehensive error handling
     */
    downloadExport(jobId: string): Promise<Blob>;
    /**
     * Cancel export job with error handling
     */
    cancelExport(jobId: string): Promise<void>;
    /**
     * Get all export jobs for current user with error handling
     */
    getExportJobs(page?: number, limit?: number): Promise<ExportJobsResponse>;
    /**
     * Get export preview with error handling
     */
    getExportPreview(filters: ExportFilters): Promise<{
        totalRecords: number;
        sampleRecords: any[];
        estimatedFileSize: string;
    }>;
    /**
     * Get available export fields with error handling
     */
    getAvailableFields(): Promise<{
        key: string;
        label: string;
        type: string;
        required: boolean;
    }[]>;
    /**
     * Process export with partial failure handling
     */
    processExportWithPartialFailureHandling(filters: ExportFilters, options: ExportOptions): Promise<PartialFailureResult<any>>;
    /**
     * Get user-friendly error message for export operations
     */
    getUserFriendlyErrorMessage(error: any): string;
}
export declare const bulkExportService: BulkExportService;
export default bulkExportService;
//# sourceMappingURL=bulkExportService.d.ts.map