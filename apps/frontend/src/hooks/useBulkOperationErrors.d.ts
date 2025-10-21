/**
 * Bulk Operation Error Management Hook
 *
 * React hook for managing bulk operation errors, notifications, and recovery
 */
import { BulkOperationError } from '@/lib/errors/bulk-operation-errors';
export interface ErrorState {
    error: BulkOperationError | null;
    isRetrying: boolean;
    retryCount: number;
    canRetry: boolean;
    suggestions: string[];
    userMessage: string;
}
export interface ErrorHandlerOptions {
    maxRetries?: number;
    enableNotifications?: boolean;
    enableLogging?: boolean;
    onError?: (error: BulkOperationError) => void;
    onRetry?: (error: BulkOperationError, attempt: number) => void;
    onRecover?: (error: BulkOperationError) => void;
}
export interface UseBulkOperationErrorsReturn {
    errorState: ErrorState;
    handleError: (error: any, context?: any) => void;
    retryOperation: (operation: () => Promise<any>) => Promise<any>;
    clearError: () => void;
    dismissError: () => void;
    reportError: (description: string) => Promise<void>;
}
export declare const useBulkOperationErrors: (userId: string, jobId?: string, jobType?: "import" | "export", options?: ErrorHandlerOptions) => UseBulkOperationErrorsReturn;
export default useBulkOperationErrors;
//# sourceMappingURL=useBulkOperationErrors.d.ts.map