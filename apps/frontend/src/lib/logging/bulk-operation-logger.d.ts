/**
 * Bulk Operation Logging System
 *
 * Comprehensive logging for bulk import/export operations including:
 * - Detailed operation logging with context
 * - Error tracking and categorization
 * - Performance metrics and monitoring
 * - Audit trail for compliance
 */
import { BulkOperationError, BulkOperationErrorType } from '../errors/bulk-operation-errors';
export declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal"
}
export declare enum LogCategory {
    OPERATION = "operation",
    VALIDATION = "validation",
    PROCESSING = "processing",
    PERFORMANCE = "performance",
    SECURITY = "security",
    AUDIT = "audit",
    ERROR = "error"
}
export interface LogEntry {
    id: string;
    timestamp: Date;
    level: LogLevel;
    category: LogCategory;
    message: string;
    context: LogContext;
    metadata?: Record<string, any>;
    duration?: number;
    error?: BulkOperationError;
}
export interface LogContext {
    userId: string;
    jobId?: string;
    jobType?: 'import' | 'export';
    operation?: string;
    batchIndex?: number;
    recordIndex?: number;
    fileName?: string;
    sessionId?: string;
    requestId?: string;
    ipAddress?: string;
    userAgent?: string;
}
export interface PerformanceMetrics {
    operationName: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    recordsProcessed: number;
    throughput: number;
    memoryUsage?: number;
    cpuUsage?: number;
    errorCount: number;
    retryCount: number;
}
export interface AuditLogEntry {
    id: string;
    timestamp: Date;
    userId: string;
    action: string;
    resource: string;
    resourceId: string;
    details: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    success: boolean;
    error?: string;
}
export declare class BulkOperationLogger {
    private logs;
    private performanceMetrics;
    private auditLogs;
    private activeOperations;
    /**
     * Start tracking an operation
     */
    startOperation(operationId: string, operationName: string, context: LogContext): void;
    /**
     * End tracking an operation
     */
    endOperation(operationId: string, operationName: string, recordsProcessed?: number, errorCount?: number, retryCount?: number): PerformanceMetrics | null;
    /**
     * Log a general message
     */
    log(level: LogLevel, category: LogCategory, message: string, context: LogContext, metadata?: Record<string, any>, error?: BulkOperationError): void;
    /**
     * Log an error with full context
     */
    logError(error: BulkOperationError, context: LogContext, additionalInfo?: Record<string, any>): void;
    /**
     * Log validation results
     */
    logValidation(context: LogContext, totalRecords: number, validRecords: number, invalidRecords: number, riskyRecords: number, duration: number): void;
    /**
     * Log batch processing results
     */
    logBatchProcessing(context: LogContext, batchIndex: number, batchSize: number, successCount: number, failureCount: number, duration: number): void;
    /**
     * Log audit event
     */
    logAudit(userId: string, action: string, resource: string, resourceId: string, details: Record<string, any>, ipAddress?: string, userAgent?: string, success?: boolean, error?: string): void;
    /**
     * Get logs by criteria
     */
    getLogs(criteria: {
        level?: LogLevel;
        category?: LogCategory;
        userId?: string;
        jobId?: string;
        startTime?: Date;
        endTime?: Date;
        limit?: number;
    }): LogEntry[];
    /**
     * Get performance metrics
     */
    getPerformanceMetrics(operationName?: string): PerformanceMetrics[];
    /**
     * Get audit logs
     */
    getAuditLogs(criteria: {
        userId?: string;
        action?: string;
        resource?: string;
        startTime?: Date;
        endTime?: Date;
        success?: boolean;
        limit?: number;
    }): AuditLogEntry[];
    /**
     * Get error statistics
     */
    getErrorStatistics(timeRange?: {
        start: Date;
        end: Date;
    }): {
        totalErrors: number;
        errorsByType: Record<BulkOperationErrorType, number>;
        errorsByCategory: Record<LogCategory, number>;
        retryableErrors: number;
        recoverableErrors: number;
    };
    /**
     * Clear old logs (for memory management)
     */
    clearOldLogs(olderThan: Date): number;
    private generateLogId;
    private outputToConsole;
    private sendToExternalLogger;
    private isSecurityError;
}
export declare const bulkOperationLogger: BulkOperationLogger;
export default bulkOperationLogger;
//# sourceMappingURL=bulk-operation-logger.d.ts.map