"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExportProgress = useExportProgress;
const react_1 = require("react");
const bulkExportService_1 = __importStar(require("@/lib/api/bulkExportService"));
const useBulkOperationErrors_1 = require("./useBulkOperationErrors");
function useExportProgress({ jobId, userId, enabled = true, onComplete, onError, pollInterval = 2000 }) {
    const [job, setJob] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [isPolling, setIsPolling] = (0, react_1.useState)(false);
    // Enhanced error handling
    const { errorState, handleError, retryOperation, clearError } = (0, useBulkOperationErrors_1.useBulkOperationErrors)(userId, jobId || undefined, 'export', {
        maxRetries: 3,
        enableNotifications: true,
        enableLogging: true,
        onError: (error) => {
            setError(error.message);
            onError?.(error.message);
        }
    });
    const fetchJobStatus = (0, react_1.useCallback)(async () => {
        if (!jobId || !enabled)
            return;
        try {
            setIsLoading(true);
            setError(null);
            clearError(); // Clear any previous errors
            const jobData = await retryOperation(async () => {
                return await bulkExportService_1.default.getExportStatus(jobId);
            });
            setJob(jobData);
            // Check if job is complete or failed
            if (jobData.status === bulkExportService_1.ExportJobStatus.COMPLETED) {
                setIsPolling(false);
                onComplete?.(jobData);
            }
            else if (jobData.status === bulkExportService_1.ExportJobStatus.FAILED) {
                setIsPolling(false);
                const errorMessage = jobData.error || 'Export failed';
                handleError(new Error(errorMessage), {
                    operation: 'export_status_check',
                    jobStatus: jobData.status
                });
            }
        }
        catch (err) {
            handleError(err, {
                operation: 'export_progress_fetch',
                jobId
            });
            setIsPolling(false);
        }
        finally {
            setIsLoading(false);
        }
    }, [jobId, enabled, onComplete, retryOperation, handleError, clearError]);
    // Start polling when job is processing
    (0, react_1.useEffect)(() => {
        if (!jobId || !enabled) {
            setIsPolling(false);
            return;
        }
        // Initial fetch
        fetchJobStatus();
        // Start polling if job is processing
        if (job?.status === bulkExportService_1.ExportJobStatus.PROCESSING || job?.status === bulkExportService_1.ExportJobStatus.PENDING) {
            setIsPolling(true);
            const interval = setInterval(fetchJobStatus, pollInterval);
            return () => {
                clearInterval(interval);
                setIsPolling(false);
            };
        }
    }, [jobId, enabled, job?.status, fetchJobStatus, pollInterval]);
    return {
        job,
        isLoading,
        error,
        isPolling,
        refetch: fetchJobStatus,
        // Enhanced error handling
        errorState,
        retryProgress: () => retryOperation(fetchJobStatus),
        clearError,
        canRetry: errorState.canRetry
    };
}
//# sourceMappingURL=useExportProgress.js.map