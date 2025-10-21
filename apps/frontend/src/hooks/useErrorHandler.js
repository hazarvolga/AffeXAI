"use strict";
/**
 * useErrorHandler Hook
 *
 * React hook for handling errors with toast notifications and logging.
 */
'use client';
/**
 * useErrorHandler Hook
 *
 * React hook for handling errors with toast notifications and logging.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useErrorHandler = useErrorHandler;
exports.useApiErrorHandler = useApiErrorHandler;
exports.useFormErrorHandler = useFormErrorHandler;
exports.useNetworkErrorHandler = useNetworkErrorHandler;
const react_1 = require("react");
const use_toast_1 = require("@/components/ui/use-toast");
const error_logger_1 = require("@/lib/errors/error-logger");
const error_messages_1 = require("@/lib/errors/error-messages");
const navigation_1 = require("next/navigation");
// ============================================================================
// Hook
// ============================================================================
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
function useErrorHandler(options = {}) {
    const { toast } = (0, use_toast_1.useToast)();
    const router = (0, navigation_1.useRouter)();
    const handleError = (0, react_1.useCallback)((error, customOptions) => {
        const mergedOptions = { ...options, ...customOptions };
        const { showToast = true, toastTitle = 'Hata', logError = true, severity = error_logger_1.ErrorSeverity.MEDIUM, redirectOnAuthError = true, onError, component, } = mergedOptions;
        // Convert string to Error
        const errorObj = typeof error === 'string' ? new Error(error) : error;
        // Get user-friendly message
        const errorCode = errorObj.code;
        const statusCode = errorObj.status || errorObj.statusCode;
        const message = (0, error_messages_1.getErrorMessage)(errorCode, statusCode);
        // Show toast notification
        if (showToast) {
            toast({
                variant: 'destructive',
                title: toastTitle,
                description: message,
            });
        }
        // Log error
        if (logError) {
            error_logger_1.errorLogger.log(errorObj, severity, {
                component,
                action: 'error_handler',
            });
        }
        // Redirect to login on auth errors
        if (redirectOnAuthError && (0, error_messages_1.isAuthError)(errorObj)) {
            const currentPath = window.location.pathname;
            const returnUrl = encodeURIComponent(currentPath);
            router.push(`/login?returnUrl=${returnUrl}`);
        }
        // Call custom error handler
        if (onError) {
            onError(errorObj);
        }
    }, [options, toast, router]);
    return handleError;
}
// ============================================================================
// Specialized Hooks
// ============================================================================
/**
 * Hook for handling API errors
 */
function useApiErrorHandler(options = {}) {
    return useErrorHandler({
        ...options,
        component: options.component || 'API',
    });
}
/**
 * Hook for handling form errors
 */
function useFormErrorHandler(options = {}) {
    return useErrorHandler({
        ...options,
        toastTitle: options.toastTitle || 'Form Hatası',
        severity: error_logger_1.ErrorSeverity.LOW,
        component: options.component || 'Form',
    });
}
/**
 * Hook for handling network errors
 */
function useNetworkErrorHandler(options = {}) {
    return useErrorHandler({
        ...options,
        toastTitle: options.toastTitle || 'Bağlantı Hatası',
        severity: error_logger_1.ErrorSeverity.HIGH,
        component: options.component || 'Network',
    });
}
// ============================================================================
// Exports
// ============================================================================
exports.default = useErrorHandler;
//# sourceMappingURL=useErrorHandler.js.map