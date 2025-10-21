/**
 * Bulk Operation Error Handling
 *
 * Comprehensive error handling for bulk import/export operations including:
 * - Retry mechanisms with exponential backoff
 * - Partial failure handling for batch operations
 * - Graceful degradation for validation service failures
 * - Error categorization and recovery strategies
 */
export declare enum BulkOperationErrorType {
    FILE_INVALID_FORMAT = "FILE_INVALID_FORMAT",
    FILE_TOO_LARGE = "FILE_TOO_LARGE",
    FILE_CORRUPTED = "FILE_CORRUPTED",
    FILE_MALWARE_DETECTED = "FILE_MALWARE_DETECTED",
    VALIDATION_SERVICE_UNAVAILABLE = "VALIDATION_SERVICE_UNAVAILABLE",
    VALIDATION_RATE_LIMIT_EXCEEDED = "VALIDATION_RATE_LIMIT_EXCEEDED",
    VALIDATION_TIMEOUT = "VALIDATION_TIMEOUT",
    VALIDATION_PARTIAL_FAILURE = "VALIDATION_PARTIAL_FAILURE",
    BATCH_PROCESSING_FAILED = "BATCH_PROCESSING_FAILED",
    QUEUE_PROCESSING_FAILED = "QUEUE_PROCESSING_FAILED",
    DATABASE_CONNECTION_FAILED = "DATABASE_CONNECTION_FAILED",
    MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
    NETWORK_ERROR = "NETWORK_ERROR",
    TIMEOUT_ERROR = "TIMEOUT_ERROR",
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    DUPLICATE_HANDLING_FAILED = "DUPLICATE_HANDLING_FAILED",
    SUBSCRIBER_CREATION_FAILED = "SUBSCRIBER_CREATION_FAILED",
    GROUP_ASSIGNMENT_FAILED = "GROUP_ASSIGNMENT_FAILED",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
export interface BulkOperationError {
    type: BulkOperationErrorType;
    message: string;
    details?: any;
    timestamp: Date;
    retryable: boolean;
    recoverable: boolean;
    batchIndex?: number;
    recordIndex?: number;
    email?: string;
}
export interface RetryConfig {
    maxAttempts: number;
    baseDelay: number;
    maxDelay: number;
    backoffMultiplier: number;
    retryableErrors: BulkOperationErrorType[];
}
export interface PartialFailureResult<T> {
    successful: T[];
    failed: Array<{
        item: any;
        error: BulkOperationError;
        index: number;
    }>;
    totalProcessed: number;
    successCount: number;
    failureCount: number;
}
export interface RecoveryStrategy {
    canRecover: (error: BulkOperationError) => boolean;
    recover: (error: BulkOperationError, context: any) => Promise<any>;
    fallback?: (error: BulkOperationError, context: any) => Promise<any>;
}
export declare class BulkOperationErrorHandler {
    private static readonly DEFAULT_RETRY_CONFIG;
    private retryConfig;
    private recoveryStrategies;
    constructor(retryConfig?: Partial<RetryConfig>);
    /**
     * Classify error from various sources (API errors, exceptions, etc.)
     */
    classifyError(error: any, context?: any): BulkOperationError;
    /**
     * Execute operation with retry logic and exponential backoff
     */
    executeWithRetry<T>(operation: () => Promise<T>, context?: any, customRetryConfig?: Partial<RetryConfig>): Promise<T>;
    /**
     * Handle partial failures in batch operations
     */
    handlePartialFailure<T, U>(items: T[], processor: (item: T, index: number) => Promise<U>, context?: any): Promise<PartialFailureResult<U>>;
    /**
     * Attempt graceful degradation for validation service failures
     */
    gracefulValidationDegradation(email: string, originalError: BulkOperationError): Promise<{
        isValid: boolean;
        confidence: number;
        degraded: true;
    }>;
    /**
     * Register custom recovery strategy
     */
    registerRecoveryStrategy(errorType: BulkOperationErrorType, strategy: RecoveryStrategy): void;
    /**
     * Get user-friendly error message
     */
    getUserFriendlyMessage(error: BulkOperationError): string;
    private classifyApiError;
    private classifyValidationError;
    private classifyJavaScriptError;
    private classifyObjectError;
    private setupDefaultRecoveryStrategies;
    private sleep;
}
export declare const bulkOperationErrorHandler: BulkOperationErrorHandler;
export default bulkOperationErrorHandler;
//# sourceMappingURL=bulk-operation-errors.d.ts.map