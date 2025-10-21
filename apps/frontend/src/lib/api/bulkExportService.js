"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkExportService = exports.ExportJobStatus = void 0;
const http_client_1 = require("./http-client");
const bulk_operation_errors_1 = require("../errors/bulk-operation-errors");
// ============================================================================
// Type Definitions (normally from @affexai/shared-types)
// ============================================================================
var ExportJobStatus;
(function (ExportJobStatus) {
    ExportJobStatus["PENDING"] = "PENDING";
    ExportJobStatus["PROCESSING"] = "PROCESSING";
    ExportJobStatus["COMPLETED"] = "COMPLETED";
    ExportJobStatus["FAILED"] = "FAILED";
    ExportJobStatus["CANCELLED"] = "CANCELLED";
})(ExportJobStatus || (exports.ExportJobStatus = ExportJobStatus = {}));
class BulkExportService {
    baseUrl = '/api/email-marketing/export';
    /**
     * Create export job with filters and options with error handling
     */
    async createExportJob(request) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => {
            // Validate request before sending
            this.validateExportRequest(request);
            return http_client_1.httpClient.post(`${this.baseUrl}`, request);
        }, { operation: 'create_export_job', filters: request.filters });
    }
    /**
     * Validate export request to catch issues early
     */
    validateExportRequest(request) {
        if (!request.filters && !request.options) {
            const error = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(new Error('Export request must include filters or options'), { request });
            error.type = bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_PARTIAL_FAILURE;
            throw error;
        }
        // Validate field selection
        if (request.options?.fields && request.options.fields.length === 0) {
            const error = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(new Error('At least one field must be selected for export'), { request });
            error.type = bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_PARTIAL_FAILURE;
            throw error;
        }
        // Validate date range if provided
        if (request.filters?.dateRange) {
            const { start, end } = request.filters.dateRange;
            if (start && end && start > end) {
                const error = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(new Error('Start date must be before end date'), { request });
                error.type = bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_PARTIAL_FAILURE;
                throw error;
            }
        }
    }
    /**
     * Get export job status and progress with retry logic
     */
    async getExportStatus(jobId) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/${jobId}/status`), { operation: 'get_export_status', jobId });
    }
    /**
     * Download export file with comprehensive error handling
     */
    async downloadExport(jobId) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(async () => {
            const response = await fetch(`${this.baseUrl}/${jobId}/download`, {
                method: 'GET',
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to download export file' }));
                // Handle specific download errors
                if (response.status === 404) {
                    throw new Error('Export file not found or has expired');
                }
                if (response.status === 410) {
                    throw new Error('Export file has expired and is no longer available');
                }
                throw new Error(error.message || 'Failed to download export file');
            }
            // Validate that we received a valid blob
            const blob = await response.blob();
            if (blob.size === 0) {
                throw new Error('Downloaded file is empty');
            }
            return blob;
        }, { operation: 'download_export', jobId });
    }
    /**
     * Cancel export job with error handling
     */
    async cancelExport(jobId) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.delete(`${this.baseUrl}/${jobId}`), { operation: 'cancel_export', jobId });
    }
    /**
     * Get all export jobs for current user with error handling
     */
    async getExportJobs(page = 1, limit = 20) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/jobs`, {
            params: { page, limit }
        }), { operation: 'get_export_jobs', page, limit });
    }
    /**
     * Get export preview with error handling
     */
    async getExportPreview(filters) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.post(`${this.baseUrl}/preview`, { filters }), { operation: 'get_export_preview', filters });
    }
    /**
     * Get available export fields with error handling
     */
    async getAvailableFields() {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/fields`), { operation: 'get_available_fields' });
    }
    /**
     * Process export with partial failure handling
     */
    async processExportWithPartialFailureHandling(filters, options) {
        try {
            // First get preview to understand the scope
            const preview = await this.getExportPreview(filters);
            // If too many records, suggest chunking
            if (preview.totalRecords > 100000) {
                console.warn(`[BulkExportService] Large export detected: ${preview.totalRecords} records`);
            }
            // Create the export job
            const job = await this.createExportJob({ filters, options });
            // Monitor the job and handle partial failures
            return await bulk_operation_errors_1.bulkOperationErrorHandler.handlePartialFailure([{ filters, options, jobId: job.id }], async (item, index) => {
                // Poll for completion
                let status = await this.getExportStatus(item.jobId);
                while (status.status === ExportJobStatus.PROCESSING || status.status === ExportJobStatus.PENDING) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    status = await this.getExportStatus(item.jobId);
                }
                if (status.status === ExportJobStatus.FAILED) {
                    throw new Error(status.error || 'Export job failed');
                }
                return status;
            }, { operation: 'process_export_with_partial_failure', filters });
        }
        catch (error) {
            const bulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(error, {
                operation: 'process_export_with_partial_failure',
                filters
            });
            throw bulkError;
        }
    }
    /**
     * Get user-friendly error message for export operations
     */
    getUserFriendlyErrorMessage(error) {
        if (error && typeof error === 'object' && error.type) {
            return bulk_operation_errors_1.bulkOperationErrorHandler.getUserFriendlyMessage(error);
        }
        const bulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(error);
        return bulk_operation_errors_1.bulkOperationErrorHandler.getUserFriendlyMessage(bulkError);
    }
}
exports.bulkExportService = new BulkExportService();
exports.default = exports.bulkExportService;
//# sourceMappingURL=bulkExportService.js.map