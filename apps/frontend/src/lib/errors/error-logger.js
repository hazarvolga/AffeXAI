"use strict";
/**
 * Error Logger Service
 *
 * Centralized error logging and tracking.
 * Integrates with error monitoring services (Sentry, LogRocket, etc.)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.ErrorLogger = exports.ErrorSeverity = void 0;
// ============================================================================
// Types
// ============================================================================
var ErrorSeverity;
(function (ErrorSeverity) {
    ErrorSeverity["LOW"] = "low";
    ErrorSeverity["MEDIUM"] = "medium";
    ErrorSeverity["HIGH"] = "high";
    ErrorSeverity["CRITICAL"] = "critical";
})(ErrorSeverity || (exports.ErrorSeverity = ErrorSeverity = {}));
// ============================================================================
// Error Logger Class
// ============================================================================
/**
 * Error Logger
 *
 * Centralized error logging service.
 */
class ErrorLogger {
    errors = [];
    maxStoredErrors = 100;
    // ==========================================================================
    // Logging Methods
    // ==========================================================================
    /**
     * Log error with context
     */
    log(error, severity = ErrorSeverity.MEDIUM, context) {
        const loggedError = {
            message: typeof error === 'string' ? error : error.message,
            stack: error instanceof Error ? error.stack : undefined,
            severity,
            timestamp: new Date(),
            context,
            originalError: typeof error === 'object' ? error : undefined,
        };
        // Store error
        this.storeError(loggedError);
        // Console log in development
        if (process.env.NODE_ENV === 'development') {
            this.consoleLog(loggedError);
        }
        // Send to error tracking service
        this.sendToTrackingService(loggedError);
    }
    /**
     * Log API error
     */
    logApiError(error, context) {
        const severity = this.determineApiErrorSeverity(error);
        this.log(error, severity, context);
    }
    /**
     * Log network error
     */
    logNetworkError(error, context) {
        this.log(error, ErrorSeverity.HIGH, {
            ...context,
            action: 'network_request',
        });
    }
    /**
     * Log validation error
     */
    logValidationError(message, context) {
        this.log(message, ErrorSeverity.LOW, {
            ...context,
            action: 'validation',
        });
    }
    /**
     * Log critical error
     */
    logCritical(error, context) {
        this.log(error, ErrorSeverity.CRITICAL, context);
    }
    // ==========================================================================
    // Storage Methods
    // ==========================================================================
    /**
     * Store error in memory
     */
    storeError(error) {
        this.errors.push(error);
        // Keep only last N errors
        if (this.errors.length > this.maxStoredErrors) {
            this.errors.shift();
        }
    }
    /**
     * Get all stored errors
     */
    getErrors() {
        return [...this.errors];
    }
    /**
     * Get errors by severity
     */
    getErrorsBySeverity(severity) {
        return this.errors.filter((error) => error.severity === severity);
    }
    /**
     * Clear all stored errors
     */
    clearErrors() {
        this.errors = [];
    }
    // ==========================================================================
    // Tracking Service Integration
    // ==========================================================================
    /**
     * Send error to tracking service (Sentry, LogRocket, etc.)
     */
    sendToTrackingService(error) {
        // Skip in development
        if (process.env.NODE_ENV === 'development') {
            return;
        }
        try {
            // TODO: Integrate with Sentry
            // if (window.Sentry) {
            //   window.Sentry.captureException(error.originalError || new Error(error.message), {
            //     level: this.mapSeverityToSentryLevel(error.severity),
            //     contexts: {
            //       custom: error.context,
            //     },
            //   });
            // }
            // TODO: Integrate with LogRocket
            // if (window.LogRocket) {
            //   window.LogRocket.captureException(error.originalError || new Error(error.message));
            // }
            // Placeholder: Send to backend logging endpoint
            // fetch('/api/logs/errors', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(error),
            // }).catch(() => {
            //   // Silently fail to avoid infinite error loops
            // });
        }
        catch (err) {
            // Silently fail - don't throw errors from error logger
            console.error('Failed to send error to tracking service:', err);
        }
    }
    // ==========================================================================
    // Helper Methods
    // ==========================================================================
    /**
     * Determine severity based on API error status
     */
    determineApiErrorSeverity(error) {
        const status = error.status;
        if (status >= 500)
            return ErrorSeverity.CRITICAL;
        if (status === 401 || status === 403)
            return ErrorSeverity.HIGH;
        if (status === 404)
            return ErrorSeverity.MEDIUM;
        if (status >= 400)
            return ErrorSeverity.LOW;
        return ErrorSeverity.MEDIUM;
    }
    /**
     * Console log error with formatting
     */
    consoleLog(error) {
        const style = this.getConsoleStyle(error.severity);
        const icon = this.getSeverityIcon(error.severity);
        console.group(`${icon} ${error.severity.toUpperCase()}: ${error.message}`);
        console.log('%c Timestamp:', 'font-weight: bold', error.timestamp.toISOString());
        if (error.context) {
            console.log('%c Context:', 'font-weight: bold', error.context);
        }
        if (error.stack) {
            console.log('%c Stack:', 'font-weight: bold');
            console.log(error.stack);
        }
        if (error.originalError) {
            console.log('%c Original Error:', 'font-weight: bold', error.originalError);
        }
        console.groupEnd();
    }
    /**
     * Get console style for severity
     */
    getConsoleStyle(severity) {
        const styles = {
            [ErrorSeverity.LOW]: 'color: #3b82f6',
            [ErrorSeverity.MEDIUM]: 'color: #f59e0b',
            [ErrorSeverity.HIGH]: 'color: #ef4444',
            [ErrorSeverity.CRITICAL]: 'color: #dc2626; font-weight: bold',
        };
        return styles[severity];
    }
    /**
     * Get icon for severity
     */
    getSeverityIcon(severity) {
        const icons = {
            [ErrorSeverity.LOW]: 'ℹ️',
            [ErrorSeverity.MEDIUM]: '⚠️',
            [ErrorSeverity.HIGH]: '🔴',
            [ErrorSeverity.CRITICAL]: '🚨',
        };
        return icons[severity];
    }
    /**
     * Map severity to Sentry level
     */
    mapSeverityToSentryLevel(severity) {
        const mapping = {
            [ErrorSeverity.LOW]: 'info',
            [ErrorSeverity.MEDIUM]: 'warning',
            [ErrorSeverity.HIGH]: 'error',
            [ErrorSeverity.CRITICAL]: 'fatal',
        };
        return mapping[severity];
    }
}
exports.ErrorLogger = ErrorLogger;
// ============================================================================
// Singleton Instance
// ============================================================================
/**
 * Default error logger instance
 */
exports.errorLogger = new ErrorLogger();
/**
 * Export as default for convenience
 */
exports.default = exports.errorLogger;
//# sourceMappingURL=error-logger.js.map