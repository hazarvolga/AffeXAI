"use strict";
/**
 * Bulk Operation Logging System
 *
 * Comprehensive logging for bulk import/export operations including:
 * - Detailed operation logging with context
 * - Error tracking and categorization
 * - Performance metrics and monitoring
 * - Audit trail for compliance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkOperationLogger = exports.BulkOperationLogger = exports.LogCategory = exports.LogLevel = void 0;
const bulk_operation_errors_1 = require("../errors/bulk-operation-errors");
// ============================================================================
// Types and Interfaces
// ============================================================================
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["FATAL"] = "fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogCategory;
(function (LogCategory) {
    LogCategory["OPERATION"] = "operation";
    LogCategory["VALIDATION"] = "validation";
    LogCategory["PROCESSING"] = "processing";
    LogCategory["PERFORMANCE"] = "performance";
    LogCategory["SECURITY"] = "security";
    LogCategory["AUDIT"] = "audit";
    LogCategory["ERROR"] = "error";
})(LogCategory || (exports.LogCategory = LogCategory = {}));
// ============================================================================
// Logger Implementation
// ============================================================================
class BulkOperationLogger {
    logs = new Map();
    performanceMetrics = new Map();
    auditLogs = new Map();
    activeOperations = new Map();
    /**
     * Start tracking an operation
     */
    startOperation(operationId, operationName, context) {
        this.activeOperations.set(operationId, {
            startTime: new Date(),
            context
        });
        this.log(LogLevel.INFO, LogCategory.OPERATION, `Started operation: ${operationName}`, context, {
            operationId,
            operationName
        });
    }
    /**
     * End tracking an operation
     */
    endOperation(operationId, operationName, recordsProcessed = 0, errorCount = 0, retryCount = 0) {
        const operation = this.activeOperations.get(operationId);
        if (!operation) {
            this.log(LogLevel.WARN, LogCategory.OPERATION, `Attempted to end unknown operation: ${operationName}`, {
                userId: 'system'
            }, { operationId });
            return null;
        }
        const endTime = new Date();
        const duration = endTime.getTime() - operation.startTime.getTime();
        const throughput = recordsProcessed > 0 ? (recordsProcessed / (duration / 1000)) : 0;
        const metrics = {
            operationName,
            startTime: operation.startTime,
            endTime,
            duration,
            recordsProcessed,
            throughput,
            errorCount,
            retryCount
        };
        this.performanceMetrics.set(operationId, metrics);
        this.activeOperations.delete(operationId);
        this.log(LogLevel.INFO, LogCategory.PERFORMANCE, `Completed operation: ${operationName}`, operation.context, {
            operationId,
            duration,
            recordsProcessed,
            throughput: Math.round(throughput * 100) / 100,
            errorCount,
            retryCount
        });
        return metrics;
    }
    /**
     * Log a general message
     */
    log(level, category, message, context, metadata, error) {
        const logEntry = {
            id: this.generateLogId(),
            timestamp: new Date(),
            level,
            category,
            message,
            context,
            metadata,
            error
        };
        this.logs.set(logEntry.id, logEntry);
        // Output to console based on level
        this.outputToConsole(logEntry);
        // Send to external logging service if configured
        this.sendToExternalLogger(logEntry);
    }
    /**
     * Log an error with full context
     */
    logError(error, context, additionalInfo) {
        this.log(LogLevel.ERROR, LogCategory.ERROR, `Error occurred: ${error.message}`, context, {
            errorType: error.type,
            retryable: error.retryable,
            recoverable: error.recoverable,
            details: error.details,
            ...additionalInfo
        }, error);
        // Create audit log for security-related errors
        if (this.isSecurityError(error)) {
            this.logAudit(context.userId, 'SECURITY_ERROR', 'bulk_operation', context.jobId || 'unknown', {
                errorType: error.type,
                message: error.message,
                operation: context.operation
            }, context.ipAddress, context.userAgent, false, error.message);
        }
    }
    /**
     * Log validation results
     */
    logValidation(context, totalRecords, validRecords, invalidRecords, riskyRecords, duration) {
        const validationRate = totalRecords > 0 ? (validRecords / totalRecords) * 100 : 0;
        this.log(LogLevel.INFO, LogCategory.VALIDATION, `Validation completed for ${totalRecords} records`, context, {
            totalRecords,
            validRecords,
            invalidRecords,
            riskyRecords,
            validationRate: Math.round(validationRate * 100) / 100,
            duration,
            throughput: Math.round((totalRecords / (duration / 1000)) * 100) / 100
        });
    }
    /**
     * Log batch processing results
     */
    logBatchProcessing(context, batchIndex, batchSize, successCount, failureCount, duration) {
        const successRate = batchSize > 0 ? (successCount / batchSize) * 100 : 0;
        this.log(LogLevel.INFO, LogCategory.PROCESSING, `Batch ${batchIndex} processed: ${successCount}/${batchSize} successful`, { ...context, batchIndex }, {
            batchSize,
            successCount,
            failureCount,
            successRate: Math.round(successRate * 100) / 100,
            duration,
            throughput: Math.round((batchSize / (duration / 1000)) * 100) / 100
        });
    }
    /**
     * Log audit event
     */
    logAudit(userId, action, resource, resourceId, details, ipAddress, userAgent, success = true, error) {
        const auditEntry = {
            id: this.generateLogId(),
            timestamp: new Date(),
            userId,
            action,
            resource,
            resourceId,
            details,
            ipAddress,
            userAgent,
            success,
            error
        };
        this.auditLogs.set(auditEntry.id, auditEntry);
        this.log(success ? LogLevel.INFO : LogLevel.WARN, LogCategory.AUDIT, `Audit: ${action} on ${resource}/${resourceId}`, { userId, operation: action }, {
            resource,
            resourceId,
            success,
            error,
            details
        });
    }
    /**
     * Get logs by criteria
     */
    getLogs(criteria) {
        let filteredLogs = Array.from(this.logs.values());
        // Apply filters
        if (criteria.level) {
            filteredLogs = filteredLogs.filter(log => log.level === criteria.level);
        }
        if (criteria.category) {
            filteredLogs = filteredLogs.filter(log => log.category === criteria.category);
        }
        if (criteria.userId) {
            filteredLogs = filteredLogs.filter(log => log.context.userId === criteria.userId);
        }
        if (criteria.jobId) {
            filteredLogs = filteredLogs.filter(log => log.context.jobId === criteria.jobId);
        }
        if (criteria.startTime) {
            filteredLogs = filteredLogs.filter(log => log.timestamp >= criteria.startTime);
        }
        if (criteria.endTime) {
            filteredLogs = filteredLogs.filter(log => log.timestamp <= criteria.endTime);
        }
        // Sort by timestamp (newest first)
        filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        // Apply limit
        if (criteria.limit) {
            filteredLogs = filteredLogs.slice(0, criteria.limit);
        }
        return filteredLogs;
    }
    /**
     * Get performance metrics
     */
    getPerformanceMetrics(operationName) {
        let metrics = Array.from(this.performanceMetrics.values());
        if (operationName) {
            metrics = metrics.filter(m => m.operationName === operationName);
        }
        return metrics.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    }
    /**
     * Get audit logs
     */
    getAuditLogs(criteria) {
        let filteredLogs = Array.from(this.auditLogs.values());
        // Apply filters
        if (criteria.userId) {
            filteredLogs = filteredLogs.filter(log => log.userId === criteria.userId);
        }
        if (criteria.action) {
            filteredLogs = filteredLogs.filter(log => log.action === criteria.action);
        }
        if (criteria.resource) {
            filteredLogs = filteredLogs.filter(log => log.resource === criteria.resource);
        }
        if (criteria.startTime) {
            filteredLogs = filteredLogs.filter(log => log.timestamp >= criteria.startTime);
        }
        if (criteria.endTime) {
            filteredLogs = filteredLogs.filter(log => log.timestamp <= criteria.endTime);
        }
        if (criteria.success !== undefined) {
            filteredLogs = filteredLogs.filter(log => log.success === criteria.success);
        }
        // Sort by timestamp (newest first)
        filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        // Apply limit
        if (criteria.limit) {
            filteredLogs = filteredLogs.slice(0, criteria.limit);
        }
        return filteredLogs;
    }
    /**
     * Get error statistics
     */
    getErrorStatistics(timeRange) {
        let errorLogs = this.getLogs({ level: LogLevel.ERROR });
        if (timeRange) {
            errorLogs = errorLogs.filter(log => log.timestamp >= timeRange.start && log.timestamp <= timeRange.end);
        }
        const errorsByType = {};
        const errorsByCategory = {};
        let retryableErrors = 0;
        let recoverableErrors = 0;
        errorLogs.forEach(log => {
            if (log.error) {
                errorsByType[log.error.type] = (errorsByType[log.error.type] || 0) + 1;
                if (log.error.retryable)
                    retryableErrors++;
                if (log.error.recoverable)
                    recoverableErrors++;
            }
            errorsByCategory[log.category] = (errorsByCategory[log.category] || 0) + 1;
        });
        return {
            totalErrors: errorLogs.length,
            errorsByType,
            errorsByCategory,
            retryableErrors,
            recoverableErrors
        };
    }
    /**
     * Clear old logs (for memory management)
     */
    clearOldLogs(olderThan) {
        const initialSize = this.logs.size;
        for (const [id, log] of this.logs.entries()) {
            if (log.timestamp < olderThan) {
                this.logs.delete(id);
            }
        }
        for (const [id, metrics] of this.performanceMetrics.entries()) {
            if (metrics.startTime < olderThan) {
                this.performanceMetrics.delete(id);
            }
        }
        for (const [id, audit] of this.auditLogs.entries()) {
            if (audit.timestamp < olderThan) {
                this.auditLogs.delete(id);
            }
        }
        const clearedCount = initialSize - this.logs.size;
        if (clearedCount > 0) {
            this.log(LogLevel.INFO, LogCategory.OPERATION, `Cleared ${clearedCount} old log entries`, {
                userId: 'system'
            }, { olderThan, clearedCount });
        }
        return clearedCount;
    }
    // ============================================================================
    // Private Methods
    // ============================================================================
    generateLogId() {
        return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    outputToConsole(logEntry) {
        const timestamp = logEntry.timestamp.toISOString();
        const prefix = `[${timestamp}] [${logEntry.level.toUpperCase()}] [${logEntry.category.toUpperCase()}]`;
        const context = `[User: ${logEntry.context.userId}${logEntry.context.jobId ? `, Job: ${logEntry.context.jobId}` : ''}]`;
        const message = `${prefix} ${context} ${logEntry.message}`;
        switch (logEntry.level) {
            case LogLevel.DEBUG:
                console.debug(message, logEntry.metadata);
                break;
            case LogLevel.INFO:
                console.log(message, logEntry.metadata);
                break;
            case LogLevel.WARN:
                console.warn(message, logEntry.metadata);
                break;
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                console.error(message, logEntry.metadata, logEntry.error);
                break;
        }
    }
    async sendToExternalLogger(logEntry) {
        try {
            // This would integrate with external logging service like Winston, Pino, or cloud logging
            // Example: await externalLogger.log(logEntry);
            // For now, just indicate that we would send to external service
            if (logEntry.level === LogLevel.ERROR || logEntry.level === LogLevel.FATAL) {
                console.log(`[BulkOperationLogger] Would send error log to external service:`, {
                    id: logEntry.id,
                    level: logEntry.level,
                    category: logEntry.category,
                    userId: logEntry.context.userId,
                    jobId: logEntry.context.jobId
                });
            }
        }
        catch (error) {
            console.error('[BulkOperationLogger] Failed to send log to external service:', error);
        }
    }
    isSecurityError(error) {
        const securityErrorTypes = [
            bulk_operation_errors_1.BulkOperationErrorType.AUTHENTICATION_FAILED,
            bulk_operation_errors_1.BulkOperationErrorType.PERMISSION_DENIED,
            bulk_operation_errors_1.BulkOperationErrorType.FILE_MALWARE_DETECTED
        ];
        return securityErrorTypes.includes(error.type);
    }
}
exports.BulkOperationLogger = BulkOperationLogger;
// ============================================================================
// Singleton Instance
// ============================================================================
exports.bulkOperationLogger = new BulkOperationLogger();
exports.default = exports.bulkOperationLogger;
//# sourceMappingURL=bulk-operation-logger.js.map