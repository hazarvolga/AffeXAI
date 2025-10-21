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
exports.useImportProgress = useImportProgress;
const react_1 = require("react");
const bulkImportService_1 = __importStar(require("@/lib/api/bulkImportService"));
const useBulkOperationErrors_1 = require("./useBulkOperationErrors");
function useImportProgress({ jobId, userId, enabled = true, interval = 2000, onComplete, onError }) {
    const [state, setState] = (0, react_1.useState)({
        job: null,
        isLoading: false,
        error: null,
        isPolling: false
    });
    const intervalRef = (0, react_1.useRef)(null);
    const mountedRef = (0, react_1.useRef)(false); // Will be set to true on mount
    const onCompleteRef = (0, react_1.useRef)(onComplete);
    const onErrorRef = (0, react_1.useRef)(onError);
    // Set mounted flag on mount
    (0, react_1.useEffect)(() => {
        mountedRef.current = true;
        console.log('[useImportProgress] Component mounted');
        return () => {
            mountedRef.current = false;
            console.log('[useImportProgress] Component unmounting');
        };
    }, []);
    // Enhanced error handling
    const { errorState, handleError, retryOperation, clearError } = (0, useBulkOperationErrors_1.useBulkOperationErrors)(userId, jobId || undefined, 'import', {
        maxRetries: 3,
        enableNotifications: true,
        enableLogging: true,
        onError: (error) => {
            setState(prev => ({ ...prev, error: error.message }));
            onErrorRef.current?.(error.message);
        }
    });
    // Update refs when callbacks change
    (0, react_1.useEffect)(() => {
        onCompleteRef.current = onComplete;
        onErrorRef.current = onError;
    }, [onComplete, onError]);
    const clearPolling = (0, react_1.useCallback)(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setState(prev => ({ ...prev, isPolling: false }));
    }, []);
    const fetchProgress = (0, react_1.useCallback)(async () => {
        if (!jobId || !enabled || !mountedRef.current) {
            console.log('[useImportProgress] fetchProgress skipped:', { jobId, enabled, mounted: mountedRef.current });
            return;
        }
        try {
            console.log('[useImportProgress] Fetching progress for job:', jobId);
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            clearError(); // Clear any previous errors
            // Direct call to bulkImportService (it has its own retry logic)
            const job = await bulkImportService_1.default.getImportStatus(jobId);
            console.log('[useImportProgress] Job fetched:', {
                id: job.id,
                status: job.status,
                processed: job.processedRecords,
                total: job.totalRecords,
                valid: job.validRecords
            });
            if (!mountedRef.current)
                return;
            setState(prev => ({ ...prev, job, isLoading: false }));
            // Check if job is completed or failed
            if (job.status === bulkImportService_1.ImportJobStatus.COMPLETED) {
                console.log('[useImportProgress] Job completed, stopping polling');
                clearPolling();
                onCompleteRef.current?.(job);
            }
            else if (job.status === bulkImportService_1.ImportJobStatus.FAILED) {
                console.log('[useImportProgress] Job failed, stopping polling');
                clearPolling();
                const errorMessage = (job.errors && job.errors.length > 0)
                    ? job.errors[0].message
                    : 'Import işlemi başarısız oldu';
                handleError(new Error(errorMessage), {
                    operation: 'import_status_check',
                    jobStatus: job.status
                });
            }
        }
        catch (error) {
            console.error('[useImportProgress] Error fetching progress:', error);
            if (!mountedRef.current)
                return;
            handleError(error, {
                operation: 'import_progress_fetch',
                jobId
            });
            clearPolling();
        }
    }, [jobId, enabled, clearPolling, handleError, clearError]);
    const startPolling = (0, react_1.useCallback)(() => {
        if (!jobId || !enabled || intervalRef.current) {
            console.log('[useImportProgress] startPolling skipped:', { jobId, enabled, hasInterval: !!intervalRef.current });
            return;
        }
        console.log('[useImportProgress] Starting polling for job:', jobId, 'interval:', interval);
        setState(prev => ({ ...prev, isPolling: true }));
        // Initial fetch
        fetchProgress();
        // Start polling
        intervalRef.current = setInterval(fetchProgress, interval);
    }, [jobId, enabled, interval, fetchProgress]);
    const stopPolling = (0, react_1.useCallback)(() => {
        clearPolling();
    }, [clearPolling]);
    // Start polling when jobId changes or enabled becomes true
    (0, react_1.useEffect)(() => {
        if (jobId && enabled) {
            startPolling();
        }
        else {
            clearPolling();
        }
        return () => {
            clearPolling();
        };
    }, [jobId, enabled]); // Removed startPolling and clearPolling from dependencies
    // Cleanup polling on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            clearPolling();
        };
    }, [clearPolling]);
    return {
        job: state.job,
        isLoading: state.isLoading,
        error: state.error,
        isPolling: state.isPolling,
        startPolling,
        stopPolling,
        refetch: fetchProgress,
        // Enhanced error handling
        errorState,
        retryProgress: () => retryOperation(fetchProgress),
        clearError,
        canRetry: errorState.canRetry
    };
}
//# sourceMappingURL=useImportProgress.js.map