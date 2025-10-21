"use strict";
/**
 * Bulk Operations Monitoring Integration
 *
 * Central integration point for all monitoring, logging, and performance optimization
 * components. Provides a unified interface for:
 * - Comprehensive logging and audit trails
 * - Real-time performance metrics
 * - Automatic performance optimization
 * - Alert management and notifications
 * - Compliance reporting
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkOperationMonitoring = exports.BulkOperationMonitoringIntegration = void 0;
const bulk_operation_logger_1 = require("../logging/bulk-operation-logger");
const bulk_operation_metrics_1 = require("../monitoring/bulk-operation-metrics");
const bulk_operation_audit_1 = require("../audit/bulk-operation-audit");
const bulk_operation_optimizer_1 = require("../performance/bulk-operation-optimizer");
// ============================================================================
// Monitoring Integration Class
// ============================================================================
class BulkOperationMonitoringIntegration {
    config;
    activeOperations = new Map();
    constructor(config = {}) {
        this.config = {
            enableRealTimeMetrics: true,
            enableAuditLogging: true,
            enablePerformanceOptimization: true,
            enableAlerts: true,
            metricsCollectionInterval: 30000, // 30 seconds
            alertThresholds: {
                memoryUsage: 85,
                cpuUsage: 90,
                errorRate: 10,
                throughputMin: 100
            },
            cacheSettings: {
                validationCacheTtl: 3600, // 1 hour
                queryCacheEnabled: true,
                maxCacheSize: 10000
            },
            ...config
        };
        this.initialize();
    }
    /**
     * Initialize monitoring systems
     */
    initialize() {
        if (this.config.enableRealTimeMetrics) {
            bulk_operation_metrics_1.bulkOperationMetrics.startCollection(this.config.metricsCollectionInterval);
        }
        if (this.config.enablePerformanceOptimization) {
            bulk_operation_optimizer_1.resourceMonitor.startMonitoring(5000); // 5 seconds
        }
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.OPERATION, 'Bulk operation monitoring integration initialized', { userId: 'system' }, { config: this.config });
    }
    /**
     * Start monitoring a bulk operation
     */
    async startOperation(context) {
        const operationId = context.jobId;
        // Store operation context
        this.activeOperations.set(operationId, {
            startTime: new Date(),
            context
        });
        // Start operation tracking in logger
        bulk_operation_logger_1.bulkOperationLogger.startOperation(operationId, `bulk_${context.jobType}`, this.contextToLogContext(context));
        // Log audit event for operation start
        if (this.config.enableAuditLogging) {
            const auditEventId = bulk_operation_audit_1.bulkOperationAudit.logEvent(context.jobType === 'import' ? bulk_operation_audit_1.AuditEventType.DATA_IMPORT_STARTED : bulk_operation_audit_1.AuditEventType.DATA_EXPORT_STARTED, context.userId, `bulk_${context.jobType}`, context.jobId, `start_${context.jobType}`, {
                fileName: context.fileName,
                recordCount: context.recordCount,
                sessionId: context.sessionId
            }, {
                sessionId: context.sessionId,
                ipAddress: context.ipAddress,
                userAgent: context.userAgent,
                dataCategories: [bulk_operation_audit_1.DataCategory.CONTACT_INFORMATION, bulk_operation_audit_1.DataCategory.PERSONAL_IDENTIFIERS],
                legalBasis: context.legalBasis || bulk_operation_audit_1.DataProcessingLegalBasis.LEGITIMATE_INTERESTS,
                consentId: context.consentId,
                riskLevel: (context.recordCount || 0) > 10000 ? 'high' : 'medium'
            });
            bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.AUDIT, `Audit event created for operation start`, this.contextToLogContext(context), { auditEventId });
        }
        // Get performance profile and log recommendations
        if (this.config.enablePerformanceOptimization && context.recordCount) {
            const profile = bulk_operation_optimizer_1.performanceProfileManager.getProfile(context.jobType, context.recordCount);
            bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Performance profile applied`, this.contextToLogContext(context), {
                dataSize: profile.dataSize,
                recommendedBatchSize: profile.recommendedBatchSize,
                estimatedDuration: profile.estimatedDuration,
                memoryLimit: profile.memoryLimit
            });
        }
    }
    /**
     * Complete monitoring for a bulk operation
     */
    async completeOperation(jobId, result) {
        const operation = this.activeOperations.get(jobId);
        if (!operation) {
            throw new Error(`Operation ${jobId} not found in monitoring`);
        }
        const endTime = new Date();
        const duration = endTime.getTime() - operation.startTime.getTime();
        const context = operation.context;
        // Complete operation tracking in logger
        const performanceMetrics = bulk_operation_logger_1.bulkOperationLogger.endOperation(jobId, `bulk_${context.jobType}`, result.recordsProcessed || 0, result.errorCount || 0, 0 // retry count - would be tracked separately
        );
        // Calculate final metrics
        const finalResult = {
            success: (result.errorCount || 0) === 0,
            recordsProcessed: result.recordsProcessed || 0,
            validRecords: result.validRecords || 0,
            invalidRecords: result.invalidRecords || 0,
            errorCount: result.errorCount || 0,
            duration,
            throughput: performanceMetrics?.throughput || 0,
            memoryUsed: result.memoryUsed || 0,
            optimizationApplied: result.optimizationApplied || [],
            alertsTriggered: result.alertsTriggered || [],
            auditEventIds: result.auditEventIds || [],
            ...result
        };
        // Record metrics
        if (this.config.enableRealTimeMetrics) {
            bulk_operation_metrics_1.bulkOperationMetrics.recordOperationMetrics(context.jobType, {
                duration,
                recordsProcessed: finalResult.recordsProcessed,
                errorCount: finalResult.errorCount,
                memoryUsed: finalResult.memoryUsed,
                success: finalResult.success
            });
        }
        // Update performance profile
        if (this.config.enablePerformanceOptimization && context.recordCount) {
            bulk_operation_optimizer_1.performanceProfileManager.updateProfile(context.jobType, context.recordCount, duration, finalResult.memoryUsed);
        }
        // Log audit event for operation completion
        if (this.config.enableAuditLogging) {
            const auditEventId = context.jobType === 'import'
                ? bulk_operation_audit_1.bulkOperationAudit.logBulkImportAudit(context.userId, context.jobId, context.fileName || 'unknown', finalResult.recordsProcessed, finalResult.validRecords, finalResult.invalidRecords, {
                    sessionId: context.sessionId,
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    legalBasis: context.legalBasis,
                    consentId: context.consentId
                })
                : bulk_operation_audit_1.bulkOperationAudit.logBulkExportAudit(context.userId, context.jobId, finalResult.recordsProcessed, { recordCount: finalResult.recordsProcessed }, {
                    sessionId: context.sessionId,
                    ipAddress: context.ipAddress,
                    userAgent: context.userAgent,
                    legalBasis: context.legalBasis
                });
            finalResult.auditEventIds.push(auditEventId);
        }
        // Clean up operation tracking
        this.activeOperations.delete(jobId);
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.OPERATION, `Bulk operation completed: ${context.jobType}`, this.contextToLogContext(context), {
            success: finalResult.success,
            duration,
            recordsProcessed: finalResult.recordsProcessed,
            throughput: Math.round(finalResult.throughput * 100) / 100,
            errorCount: finalResult.errorCount
        });
        return finalResult;
    }
    /**
     * Handle operation error
     */
    async handleOperationError(jobId, error, context) {
        const operation = this.activeOperations.get(jobId);
        const operationContext = operation?.context;
        if (!operationContext && !context?.userId) {
            bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.ERROR, bulk_operation_logger_1.LogCategory.ERROR, `Operation error without context: ${error.message}`, { userId: 'unknown' }, { jobId, error: error.message });
            return;
        }
        const finalContext = operationContext || {
            userId: context?.userId || 'unknown',
            jobId: context?.jobId || jobId,
            jobType: context?.jobType || 'import'
        };
        // Log error
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.ERROR, bulk_operation_logger_1.LogCategory.ERROR, `Bulk operation failed: ${error.message}`, this.contextToLogContext(finalContext), { jobId, error: error.message, stack: error.stack });
        // Log audit event for failure
        if (this.config.enableAuditLogging) {
            bulk_operation_audit_1.bulkOperationAudit.logEvent(finalContext.jobType === 'import' ? bulk_operation_audit_1.AuditEventType.DATA_IMPORT_COMPLETED : bulk_operation_audit_1.AuditEventType.DATA_EXPORT_COMPLETED, finalContext.userId, `bulk_${finalContext.jobType}`, jobId, `failed_${finalContext.jobType}`, {
                error: error.message,
                fileName: finalContext.fileName
            }, {
                sessionId: finalContext.sessionId,
                ipAddress: finalContext.ipAddress,
                userAgent: finalContext.userAgent,
                success: false,
                error: error.message,
                riskLevel: 'high'
            });
        }
        // Clean up operation tracking
        this.activeOperations.delete(jobId);
    }
    /**
     * Get comprehensive monitoring report
     */
    async getMonitoringReport(timeRange) {
        const performanceSummary = bulk_operation_metrics_1.bulkOperationMetrics.getMetricsSummary(timeRange.start, timeRange.end);
        const auditSummary = bulk_operation_audit_1.bulkOperationAudit.generateComplianceReport('audit_trail', timeRange, 'system');
        const alertSummary = {
            activeAlerts: bulk_operation_metrics_1.bulkOperationMetrics.getActiveAlerts(),
            totalAlerts: bulk_operation_metrics_1.bulkOperationMetrics.getActiveAlerts().length
        };
        // Generate optimization recommendations based on recent performance
        const optimizationRecommendations = this.generateOptimizationRecommendations(performanceSummary);
        return {
            performanceSummary,
            auditSummary,
            alertSummary,
            optimizationRecommendations
        };
    }
    /**
     * Generate GDPR compliance report
     */
    async generateGDPRReport(timeRange, requestedBy) {
        return bulk_operation_audit_1.bulkOperationAudit.generateComplianceReport('gdpr', timeRange, requestedBy);
    }
    /**
     * Apply data retention policy
     */
    async applyDataRetentionPolicy() {
        const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
        const logsDeleted = bulk_operation_logger_1.bulkOperationLogger.clearOldLogs(cutoffDate);
        const auditRecordsDeleted = bulk_operation_audit_1.bulkOperationAudit.applyDataRetentionPolicy();
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.OPERATION, 'Data retention policy applied', { userId: 'system' }, { logsDeleted, auditRecordsDeleted, cutoffDate });
        return { logsDeleted, auditRecordsDeleted };
    }
    /**
     * Get system health status
     */
    async getSystemHealth() {
        const activeAlerts = bulk_operation_metrics_1.bulkOperationMetrics.getActiveAlerts();
        const systemMetrics = bulk_operation_metrics_1.bulkOperationMetrics.getSystemMetrics(new Date(Date.now() - 60 * 60 * 1000), // Last hour
        new Date());
        let status = 'healthy';
        const recommendations = [];
        // Determine system status based on alerts
        const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
        const highAlerts = activeAlerts.filter(a => a.severity === 'high');
        if (criticalAlerts.length > 0) {
            status = 'critical';
            recommendations.push('Immediate attention required for critical alerts');
        }
        else if (highAlerts.length > 0 || activeAlerts.length > 5) {
            status = 'warning';
            recommendations.push('Review and address active alerts');
        }
        // Check recent performance
        if (systemMetrics.length > 0) {
            const latestMetrics = systemMetrics[systemMetrics.length - 1];
            if (latestMetrics.memoryUsage.percentage > 90) {
                status = status === 'healthy' ? 'warning' : status;
                recommendations.push('Memory usage is very high - consider reducing batch sizes');
            }
            if (latestMetrics.queueSize > 50) {
                status = status === 'healthy' ? 'warning' : status;
                recommendations.push('Queue backlog is high - consider scaling processing capacity');
            }
        }
        return {
            status,
            metrics: systemMetrics.length > 0 ? systemMetrics[systemMetrics.length - 1] : null,
            alerts: activeAlerts,
            recommendations
        };
    }
    // ============================================================================
    // Private Helper Methods
    // ============================================================================
    contextToLogContext(context) {
        return {
            userId: context.userId,
            jobId: context.jobId,
            jobType: context.jobType,
            sessionId: context.sessionId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            fileName: context.fileName
        };
    }
    generateOptimizationRecommendations(performanceSummary) {
        const recommendations = [];
        // Throughput optimization
        if (performanceSummary.averageThroughput < 500) {
            recommendations.push({
                type: 'throughput',
                title: 'Increase Batch Size',
                description: 'Current throughput is below optimal. Consider increasing batch sizes.',
                priority: 'medium',
                expectedImprovement: '30-50% throughput increase'
            });
        }
        // Memory optimization
        if (performanceSummary.peakMemoryUsage > 85) {
            recommendations.push({
                type: 'memory',
                title: 'Enable Streaming Processing',
                description: 'High memory usage detected. Enable streaming for large datasets.',
                priority: 'high',
                expectedImprovement: '40-60% memory reduction'
            });
        }
        // Error rate optimization
        if (performanceSummary.totalErrorCount > 0) {
            const errorRate = (performanceSummary.totalErrorCount / performanceSummary.totalOperations) * 100;
            if (errorRate > 5) {
                recommendations.push({
                    type: 'reliability',
                    title: 'Improve Data Validation',
                    description: 'High error rate detected. Review validation rules and data quality.',
                    priority: 'high',
                    expectedImprovement: `Reduce error rate from ${errorRate.toFixed(1)}%`
                });
            }
        }
        return recommendations;
    }
    /**
     * Shutdown monitoring systems
     */
    shutdown() {
        bulk_operation_metrics_1.bulkOperationMetrics.stopCollection();
        bulk_operation_optimizer_1.resourceMonitor.stopMonitoring();
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.OPERATION, 'Bulk operation monitoring integration shutdown', { userId: 'system' });
    }
}
exports.BulkOperationMonitoringIntegration = BulkOperationMonitoringIntegration;
// ============================================================================
// Singleton Instance
// ============================================================================
exports.bulkOperationMonitoring = new BulkOperationMonitoringIntegration();
exports.default = exports.bulkOperationMonitoring;
//# sourceMappingURL=monitoring-integration.js.map