/**
 * Error Handling Module
 *
 * Barrel export for all error-related exports.
 */
export { errorLogger, ErrorLogger, ErrorSeverity } from './error-logger';
export type { ErrorContext, LoggedError } from './error-logger';
export { HTTP_ERROR_MESSAGES, ERROR_CODE_MESSAGES, getHttpErrorMessage, getErrorCodeMessage, getErrorMessage, isNetworkError, isTimeoutError, isAuthError, isPermissionError, isValidationError, isNotFoundError, isServerError, } from './error-messages';
declare const _default: {
    errorLogger: any;
    ErrorSeverity: any;
};
export default _default;
//# sourceMappingURL=index.d.ts.map