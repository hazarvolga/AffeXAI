/**
 * HTTP Error Messages
 *
 * User-friendly error messages for HTTP status codes and error codes.
 */
export declare const HTTP_ERROR_MESSAGES: Record<number, string>;
export declare const ERROR_CODE_MESSAGES: Record<string, string>;
/**
 * Get user-friendly error message from HTTP status code
 */
export declare function getHttpErrorMessage(statusCode: number): string;
/**
 * Get user-friendly error message from error code
 */
export declare function getErrorCodeMessage(errorCode: string): string;
/**
 * Get combined error message (tries error code first, then status code)
 */
export declare function getErrorMessage(errorCode?: string, statusCode?: number): string;
/**
 * Check if error is a network error
 */
export declare function isNetworkError(error: any): boolean;
/**
 * Check if error is a timeout error
 */
export declare function isTimeoutError(error: any): boolean;
/**
 * Check if error is an authentication error
 */
export declare function isAuthError(error: any): boolean;
/**
 * Check if error is a permission error
 */
export declare function isPermissionError(error: any): boolean;
/**
 * Check if error is a validation error
 */
export declare function isValidationError(error: any): boolean;
/**
 * Check if error is a not found error
 */
export declare function isNotFoundError(error: any): boolean;
/**
 * Check if error is a server error
 */
export declare function isServerError(error: any): boolean;
declare const _default: {
    HTTP_ERROR_MESSAGES: Record<number, string>;
    ERROR_CODE_MESSAGES: Record<string, string>;
    getHttpErrorMessage: typeof getHttpErrorMessage;
    getErrorCodeMessage: typeof getErrorCodeMessage;
    getErrorMessage: typeof getErrorMessage;
    isNetworkError: typeof isNetworkError;
    isTimeoutError: typeof isTimeoutError;
    isAuthError: typeof isAuthError;
    isPermissionError: typeof isPermissionError;
    isValidationError: typeof isValidationError;
    isNotFoundError: typeof isNotFoundError;
    isServerError: typeof isServerError;
};
export default _default;
//# sourceMappingURL=error-messages.d.ts.map