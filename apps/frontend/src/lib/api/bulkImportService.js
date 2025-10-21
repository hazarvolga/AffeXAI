"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkImportService = exports.ImportJobStatus = void 0;
const http_client_1 = require("./http-client");
const bulk_operation_errors_1 = require("../errors/bulk-operation-errors");
// ============================================================================
// Type Definitions (normally from @affexai/shared-types)
// ============================================================================
var ImportJobStatus;
(function (ImportJobStatus) {
    ImportJobStatus["PENDING"] = "PENDING";
    ImportJobStatus["PROCESSING"] = "PROCESSING";
    ImportJobStatus["COMPLETED"] = "COMPLETED";
    ImportJobStatus["FAILED"] = "FAILED";
    ImportJobStatus["CANCELLED"] = "CANCELLED";
})(ImportJobStatus || (exports.ImportJobStatus = ImportJobStatus = {}));
class BulkImportService {
    // Base URL without /api prefix (httpClient adds it automatically)
    // For fetch calls, we'll use the full path with /api
    baseUrl = '/email-marketing/import';
    fetchBaseUrl = '/api/email-marketing/import';
    /**
     * Upload CSV file and start import job with comprehensive error handling
     */
    async uploadFile(request) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(async () => {
            // Validate file before upload
            this.validateFileBeforeUpload(request.file);
            const formData = new FormData();
            formData.append('file', request.file);
            formData.append('options', JSON.stringify(request.options));
            // Get authentication token from localStorage
            const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch(`${this.fetchBaseUrl}/upload`, {
                method: 'POST',
                headers,
                body: formData,
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Upload failed' }));
                throw new Error(error.message || 'Failed to upload file');
            }
            const result = await response.json();
            console.log('[BulkImportService] Upload response:', result);
            // Backend returns wrapped response: { success: true, data: ImportJob, meta: {...} }
            if (result.success && result.data) {
                console.log('[BulkImportService] Extracted job data:', result.data);
                return result.data;
            }
            // Fallback: return as-is if not wrapped
            return result;
        }, { operation: 'file_upload', fileName: request.file.name });
    }
    /**
     * Validate file before upload to catch issues early
     */
    validateFileBeforeUpload(file) {
        // Check file size (50MB limit)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            const error = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(new Error('File size exceeds maximum limit of 50MB'), { fileName: file.name, fileSize: file.size });
            error.type = bulk_operation_errors_1.BulkOperationErrorType.FILE_TOO_LARGE;
            throw error;
        }
        // Check file type
        const allowedTypes = ['text/csv', 'application/csv', 'text/plain'];
        const allowedExtensions = ['.csv', '.txt'];
        const hasValidType = allowedTypes.includes(file.type);
        const hasValidExtension = allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
        if (!hasValidType && !hasValidExtension) {
            const error = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(new Error('Invalid file format. Please upload a CSV file.'), { fileName: file.name, fileType: file.type });
            error.type = bulk_operation_errors_1.BulkOperationErrorType.FILE_INVALID_FORMAT;
            throw error;
        }
    }
    /**
     * Get import job status and progress with retry logic
     */
    async getImportStatus(jobId) {
        const result = await bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/${jobId}/status`), { operation: 'get_import_status', jobId });
        // httpClient wraps responses as { success, data, meta }
        // We need to extract the actual job data
        console.log('[BulkImportService] getImportStatus raw result:', result);
        if (result && typeof result === 'object' && 'data' in result) {
            console.log('[BulkImportService] Unwrapping response.data:', result.data);
            return result.data;
        }
        // Fallback if already unwrapped
        return result;
    }
    /**
     * Get detailed import results with error handling
     */
    async getImportResults(jobId, page = 1, limit = 100) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/${jobId}/results`, {
            params: { page, limit }
        }), { operation: 'get_import_results', jobId, page, limit });
    }
    /**
     * Download detailed import report with retry logic
     */
    async downloadReport(jobId) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(async () => {
            const response = await fetch(`${this.baseUrl}/${jobId}/report`, {
                method: 'GET',
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to download report' }));
                throw new Error(error.message || 'Failed to download report');
            }
            return response.blob();
        }, { operation: 'download_report', jobId });
    }
    /**
     * Cancel import job with error handling
     */
    async cancelImport(jobId) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.delete(`${this.baseUrl}/${jobId}`), { operation: 'cancel_import', jobId });
    }
    /**
     * Get all import jobs for current user with error handling
     */
    async getImportJobs(page = 1, limit = 20) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(() => http_client_1.httpClient.get(`${this.baseUrl}/jobs`, {
            params: { page, limit }
        }), { operation: 'get_import_jobs', page, limit });
    }
    /**
     * Validate CSV structure before upload with comprehensive error handling
     */
    async validateCsvStructure(file) {
        return bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(async () => {
            // Pre-validate file
            this.validateFileBeforeUpload(file);
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${this.baseUrl}/validate-csv`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Validation failed' }));
                throw new Error(error.message || 'Failed to validate CSV');
            }
            return response.json();
        }, { operation: 'validate_csv', fileName: file.name });
    }
    /**
     * Process import with partial failure handling
     */
    async processImportWithPartialFailureHandling(jobId, batchSize = 1000) {
        try {
            // Get all results for the job
            const allResults = [];
            let page = 1;
            let hasMore = true;
            while (hasMore) {
                const response = await this.getImportResults(jobId, page, batchSize);
                allResults.push(...response.results);
                hasMore = response.results.length === batchSize;
                page++;
            }
            // Process results in batches with partial failure handling
            return await bulk_operation_errors_1.bulkOperationErrorHandler.handlePartialFailure(allResults, async (result, index) => {
                // Simulate processing each result
                if (result.status === ImportJobStatus.FAILED || result.errors.length > 0) {
                    throw new Error(result.errors[0]?.message || 'Processing failed');
                }
                return result;
            }, { operation: 'process_import_results', jobId });
        }
        catch (error) {
            const bulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(error, {
                operation: 'process_import_with_partial_failure',
                jobId
            });
            throw bulkError;
        }
    }
    /**
     * Get user-friendly error message for import operations
     */
    getUserFriendlyErrorMessage(error) {
        // Check if error is already a BulkOperationError by checking for required properties
        if (error && typeof error === 'object' && error.type && error.message && error.timestamp) {
            return bulk_operation_errors_1.bulkOperationErrorHandler.getUserFriendlyMessage(error);
        }
        const bulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(error);
        return bulk_operation_errors_1.bulkOperationErrorHandler.getUserFriendlyMessage(bulkError);
    }
}
exports.bulkImportService = new BulkImportService();
exports.default = exports.bulkImportService;
//# sourceMappingURL=bulkImportService.js.map