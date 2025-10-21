"use strict";
/**
 * Bulk Operation Error Management Hook
 *
 * React hook for managing bulk operation errors, notifications, and recovery
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBulkOperationErrors = void 0;
const react_1 = require("react");
const bulk_operation_errors_1 = require("@/lib/errors/bulk-operation-errors");
const bulk_operation_notifications_1 = require("@/lib/notifications/bulk-operation-notifications");
const bulk_operation_logger_1 = require("@/lib/logging/bulk-operation-logger");
// ============================================================================
// Hook Implementation
// ============================================================================
const useBulkOperationErrors = (userId, jobId, jobType, options = {}) => {
    const { maxRetries = 3, enableNotifications = true, enableLogging = true, onError, onRetry, onRecover } = options;
    // State
    const [errorState, setErrorState] = (0, react_1.useState)({
        error: null,
        isRetrying: false,
        retryCount: 0,
        canRetry: false,
        suggestions: [],
        userMessage: ''
    });
    // Handle error classification and state update
    const handleError = (0, react_1.useCallback)((error, context) => {
        const bulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(error, {
            userId,
            jobId,
            jobType,
            ...context
        });
        const suggestions = bulk_operation_notifications_1.bulkOperationNotificationService.getErrorSuggestions(bulkError);
        const userMessage = bulk_operation_notifications_1.bulkOperationNotificationService.getUserFriendlyMessage(bulkError);
        setErrorState({
            error: bulkError,
            isRetrying: false,
            retryCount: 0,
            canRetry: bulkError.retryable,
            suggestions,
            userMessage
        });
        // Log the error
        if (enableLogging) {
            bulk_operation_logger_1.bulkOperationLogger.logError(bulkError, {
                userId,
                jobId,
                jobType,
                operation: context?.operation || 'unknown',
                ...context
            });
        }
        // Send notification for system errors
        if (enableNotifications && shouldNotifyForError(bulkError)) {
            const notificationContext = {
                userId,
                jobId: jobId || 'unknown',
                jobType: jobType || 'import',
                error: bulkError
            };
            bulk_operation_notifications_1.bulkOperationNotificationService.notifySystemError(bulkError, notificationContext);
        }
        // Call custom error handler
        if (onError) {
            onError(bulkError);
        }
    }, [userId, jobId, jobType, enableLogging, enableNotifications, onError]);
    // Retry operation with exponential backoff
    const retryOperation = (0, react_1.useCallback)(async (operation) => {
        if (!errorState.error || !errorState.canRetry || errorState.retryCount >= maxRetries) {
            throw errorState.error || new Error('Cannot retry operation');
        }
        setErrorState(prev => ({
            ...prev,
            isRetrying: true,
            retryCount: prev.retryCount + 1
        }));
        try {
            // Call custom retry handler
            if (onRetry) {
                onRetry(errorState.error, errorState.retryCount + 1);
            }
            // Execute the operation with retry logic
            const result = await bulk_operation_errors_1.bulkOperationErrorHandler.executeWithRetry(operation, { userId, jobId, jobType, retryAttempt: errorState.retryCount + 1 }, { maxAttempts: 1 } // Single attempt since we're managing retries here
            );
            // Success - clear error state
            setErrorState({
                error: null,
                isRetrying: false,
                retryCount: 0,
                canRetry: false,
                suggestions: [],
                userMessage: ''
            });
            // Call recovery handler
            if (onRecover) {
                onRecover(errorState.error);
            }
            // Log successful recovery
            if (enableLogging) {
                bulk_operation_logger_1.bulkOperationLogger.log('info', 'operation', `Operation recovered after ${errorState.retryCount + 1} retries`, { userId, jobId, jobType }, {
                    originalError: errorState.error.type,
                    retryCount: errorState.retryCount + 1
                });
            }
            return result;
        }
        catch (retryError) {
            const newBulkError = bulk_operation_errors_1.bulkOperationErrorHandler.classifyError(retryError, {
                userId,
                jobId,
                jobType,
                retryAttempt: errorState.retryCount + 1
            });
            setErrorState(prev => ({
                ...prev,
                error: newBulkError,
                isRetrying: false,
                canRetry: newBulkError.retryable && prev.retryCount + 1 < maxRetries,
                suggestions: bulk_operation_notifications_1.bulkOperationNotificationService.getErrorSuggestions(newBulkError),
                userMessage: bulk_operation_notifications_1.bulkOperationNotificationService.getUserFriendlyMessage(newBulkError)
            }));
            throw newBulkError;
        }
    }, [errorState, maxRetries, userId, jobId, jobType, onRetry, onRecover, enableLogging]);
    // Clear error state
    const clearError = (0, react_1.useCallback)(() => {
        setErrorState({
            error: null,
            isRetrying: false,
            retryCount: 0,
            canRetry: false,
            suggestions: [],
            userMessage: ''
        });
    }, []);
    // Dismiss error (same as clear but with logging)
    const dismissError = (0, react_1.useCallback)(() => {
        if (errorState.error && enableLogging) {
            bulk_operation_logger_1.bulkOperationLogger.log('info', 'operation', 'Error dismissed by user', { userId, jobId, jobType }, {
                dismissedError: errorState.error.type,
                retryCount: errorState.retryCount
            });
        }
        clearError();
    }, [errorState.error, errorState.retryCount, enableLogging, userId, jobId, jobType, clearError]);
    // Report error to support
    const reportError = (0, react_1.useCallback)(async (description) => {
        if (!errorState.error)
            return;
        try {
            // Create error report
            const notificationContext = {
                userId,
                jobId: jobId || 'unknown',
                jobType: jobType || 'import',
                error: errorState.error
            };
            await bulk_operation_notifications_1.bulkOperationNotificationService.createErrorReport(errorState.error, notificationContext);
            // Log the report
            if (enableLogging) {
                bulk_operation_logger_1.bulkOperationLogger.log('info', 'audit', 'Error reported by user', { userId, jobId, jobType }, {
                    errorType: errorState.error.type,
                    userDescription: description,
                    retryCount: errorState.retryCount
                });
            }
            console.log('[useBulkOperationErrors] Error reported successfully');
        }
        catch (reportingError) {
            console.error('[useBulkOperationErrors] Failed to report error:', reportingError);
            throw new Error('Failed to report error. Please try again or contact support directly.');
        }
    }, [errorState.error, errorState.retryCount, userId, jobId, jobType, enableLogging]);
    // Auto-clear errors after a certain time for non-critical errors
    (0, react_1.useEffect)(() => {
        if (!errorState.error || errorState.error.type === 'AUTHENTICATION_FAILED') {
            return;
        }
        // Auto-clear retryable errors after 30 seconds
        if (errorState.error.retryable && !errorState.isRetrying) {
            const timer = setTimeout(() => {
                clearError();
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [errorState.error, errorState.isRetrying, clearError]);
    return {
        errorState,
        handleError,
        retryOperation,
        clearError,
        dismissError,
        reportError
    };
};
exports.useBulkOperationErrors = useBulkOperationErrors;
// ============================================================================
// Helper Functions
// ============================================================================
const shouldNotifyForError = (error) => {
    // Always notify for critical errors
    const criticalErrors = [
        'AUTHENTICATION_FAILED',
        'PERMISSION_DENIED',
        'FILE_MALWARE_DETECTED',
        'DATABASE_CONNECTION_FAILED'
    ];
    if (criticalErrors.includes(error.type)) {
        return true;
    }
    // Notify for system errors that aren't user-caused
    const systemErrors = [
        'VALIDATION_SERVICE_UNAVAILABLE',
        'QUEUE_PROCESSING_FAILED',
        'MEMORY_LIMIT_EXCEEDED'
    ];
    return systemErrors.includes(error.type);
};
exports.default = exports.useBulkOperationErrors;
//# sourceMappingURL=useBulkOperationErrors.js.map