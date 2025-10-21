"use strict";
/**
 * Error Handling Module
 *
 * Barrel export for all error-related exports.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerError = exports.isNotFoundError = exports.isValidationError = exports.isPermissionError = exports.isAuthError = exports.isTimeoutError = exports.isNetworkError = exports.getErrorMessage = exports.getErrorCodeMessage = exports.getHttpErrorMessage = exports.ERROR_CODE_MESSAGES = exports.HTTP_ERROR_MESSAGES = exports.ErrorSeverity = exports.ErrorLogger = exports.errorLogger = void 0;
// Error Logger
var error_logger_1 = require("./error-logger");
Object.defineProperty(exports, "errorLogger", { enumerable: true, get: function () { return error_logger_1.errorLogger; } });
Object.defineProperty(exports, "ErrorLogger", { enumerable: true, get: function () { return error_logger_1.ErrorLogger; } });
Object.defineProperty(exports, "ErrorSeverity", { enumerable: true, get: function () { return error_logger_1.ErrorSeverity; } });
// Error Messages
var error_messages_1 = require("./error-messages");
Object.defineProperty(exports, "HTTP_ERROR_MESSAGES", { enumerable: true, get: function () { return error_messages_1.HTTP_ERROR_MESSAGES; } });
Object.defineProperty(exports, "ERROR_CODE_MESSAGES", { enumerable: true, get: function () { return error_messages_1.ERROR_CODE_MESSAGES; } });
Object.defineProperty(exports, "getHttpErrorMessage", { enumerable: true, get: function () { return error_messages_1.getHttpErrorMessage; } });
Object.defineProperty(exports, "getErrorCodeMessage", { enumerable: true, get: function () { return error_messages_1.getErrorCodeMessage; } });
Object.defineProperty(exports, "getErrorMessage", { enumerable: true, get: function () { return error_messages_1.getErrorMessage; } });
Object.defineProperty(exports, "isNetworkError", { enumerable: true, get: function () { return error_messages_1.isNetworkError; } });
Object.defineProperty(exports, "isTimeoutError", { enumerable: true, get: function () { return error_messages_1.isTimeoutError; } });
Object.defineProperty(exports, "isAuthError", { enumerable: true, get: function () { return error_messages_1.isAuthError; } });
Object.defineProperty(exports, "isPermissionError", { enumerable: true, get: function () { return error_messages_1.isPermissionError; } });
Object.defineProperty(exports, "isValidationError", { enumerable: true, get: function () { return error_messages_1.isValidationError; } });
Object.defineProperty(exports, "isNotFoundError", { enumerable: true, get: function () { return error_messages_1.isNotFoundError; } });
Object.defineProperty(exports, "isServerError", { enumerable: true, get: function () { return error_messages_1.isServerError; } });
// Re-export for convenience
exports.default = {
    errorLogger,
    ErrorSeverity,
};
//# sourceMappingURL=index.js.map