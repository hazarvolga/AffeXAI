/**
 * Error Logger Service
 *
 * Centralized error logging and tracking.
 * Integrates with error monitoring services (Sentry, LogRocket, etc.)
 */
import type { ApiError } from '@/lib/api/http-client';
export declare enum ErrorSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export interface ErrorContext {
    component?: string;
    action?: string;
    userId?: string;
    metadata?: Record<string, any>;
}
export interface LoggedError {
    message: string;
    stack?: string;
    severity: ErrorSeverity;
    timestamp: Date;
    context?: ErrorContext;
    originalError?: Error | ApiError;
}
/**
 * Error Logger
 *
 * Centralized error logging service.
 */
export declare class ErrorLogger {
    private errors;
    private maxStoredErrors;
    /**
     * Log error with context
     */
    log(error: Error | ApiError | string, severity?: ErrorSeverity, context?: ErrorContext): void;
    /**
     * Log API error
     */
    logApiError(error: ApiError, context?: ErrorContext): void;
    /**
     * Log network error
     */
    logNetworkError(error: Error, context?: ErrorContext): void;
    /**
     * Log validation error
     */
    logValidationError(message: string, context?: ErrorContext): void;
    /**
     * Log critical error
     */
    logCritical(error: Error | string, context?: ErrorContext): void;
    /**
     * Store error in memory
     */
    private storeError;
    /**
     * Get all stored errors
     */
    getErrors(): LoggedError[];
    /**
     * Get errors by severity
     */
    getErrorsBySeverity(severity: ErrorSeverity): LoggedError[];
    /**
     * Clear all stored errors
     */
    clearErrors(): void;
    /**
     * Send error to tracking service (Sentry, LogRocket, etc.)
     */
    private sendToTrackingService;
    /**
     * Determine severity based on API error status
     */
    private determineApiErrorSeverity;
    /**
     * Console log error with formatting
     */
    private consoleLog;
    /**
     * Get console style for severity
     */
    private getConsoleStyle;
    /**
     * Get icon for severity
     */
    private getSeverityIcon;
    /**
     * Map severity to Sentry level
     */
    private mapSeverityToSentryLevel;
}
/**
 * Default error logger instance
 */
export declare const errorLogger: ErrorLogger;
/**
 * Export as default for convenience
 */
export default errorLogger;
//# sourceMappingURL=error-logger.d.ts.map