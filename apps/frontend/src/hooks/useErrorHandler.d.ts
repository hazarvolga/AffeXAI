/**
 * useErrorHandler Hook
 *
 * React hook for handling errors with toast notifications and logging.
 */
import { ErrorSeverity } from '@/lib/errors/error-logger';
import type { ApiError } from '@/lib/api/http-client';
export interface ErrorHandlerOptions {
    /** Show toast notification */
    showToast?: boolean;
    /** Toast title */
    toastTitle?: string;
    /** Log error to error logger */
    logError?: boolean;
    /** Error severity for logging */
    severity?: ErrorSeverity;
    /** Redirect to login on auth errors */
    redirectOnAuthError?: boolean;
    /** Custom error handler */
    onError?: (error: Error | ApiError) => void;
    /** Component context for logging */
    component?: string;
}
/**
 * Hook for handling errors with toast notifications and logging
 *
 * @example
 * ```tsx
 * function UserList() {
 *   const handleError = useErrorHandler({ component: 'UserList' });
 *
 *   const loadUsers = async () => {
 *     try {
 *       const users = await userService.getAll();
 *     } catch (error) {
 *       handleError(error);
 *     }
 *   };
 * }
 *
 * // With custom options
 * const handleError = useErrorHandler({
 *   component: 'UserForm',
 *   toastTitle: 'Kayıt Hatası',
 *   severity: ErrorSeverity.HIGH,
 * });
 * ```
 */
export declare function useErrorHandler(options?: ErrorHandlerOptions): (error: Error | ApiError | string, customOptions?: ErrorHandlerOptions) => void;
/**
 * Hook for handling API errors
 */
export declare function useApiErrorHandler(options?: ErrorHandlerOptions): (error: Error | ApiError | string, customOptions?: ErrorHandlerOptions) => void;
/**
 * Hook for handling form errors
 */
export declare function useFormErrorHandler(options?: ErrorHandlerOptions): (error: Error | ApiError | string, customOptions?: ErrorHandlerOptions) => void;
/**
 * Hook for handling network errors
 */
export declare function useNetworkErrorHandler(options?: ErrorHandlerOptions): (error: Error | ApiError | string, customOptions?: ErrorHandlerOptions) => void;
export default useErrorHandler;
//# sourceMappingURL=useErrorHandler.d.ts.map