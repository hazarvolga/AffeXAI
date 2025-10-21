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
import { DataProcessingLegalBasis } from '../audit/bulk-operation-audit';
export interface BulkOperationContext {
    userId: string;
    jobId: string;
    jobType: 'import' | 'export';
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
    fileName?: string;
    recordCount?: number;
    legalBasis?: DataProcessingLegalBasis;
    consentId?: string;
}
export interface MonitoringConfiguration {
    enableRealTimeMetrics: boolean;
    enableAuditLogging: boolean;
    enablePerformanceOptimization: boolean;
    enableAlerts: boolean;
    metricsCollectionInterval: number;
    alertThresholds: {
        memoryUsage: number;
        cpuUsage: number;
        errorRate: number;
        throughputMin: number;
    };
    cacheSettings: {
        validationCacheTtl: number;
        queryCacheEnabled: boolean;
        maxCacheSize: number;
    };
}
export interface BulkOperationResult {
    success: boolean;
    recordsProcessed: number;
    validRecords: number;
    invalidRecords: number;
    errorCount: number;
    duration: number;
    throughput: number;
    memoryUsed: number;
    optimizationApplied: string[];
    alertsTriggered: string[];
    auditEventIds: string[];
}
export declare class BulkOperationMonitoringIntegration {
    private config;
    private activeOperations;
    constructor(config?: Partial<MonitoringConfiguration>);
    /**
     * Initialize monitoring systems
     */
    private initialize;
    /**
     * Start monitoring a bulk operation
     */
    startOperation(context: BulkOperationContext): Promise<void>;
    /**
     * Complete monitoring for a bulk operation
     */
    completeOperation(jobId: string, result: Partial<BulkOperationResult>): Promise<BulkOperationResult>;
    /**
     * Handle operation error
     */
    handleOperationError(jobId: string, error: Error, context?: Partial<BulkOperationContext>): Promise<void>;
    /**
     * Get comprehensive monitoring report
     */
    getMonitoringReport(timeRange: {
        start: Date;
        end: Date;
    }): Promise<{
        performanceSummary: any;
        auditSummary: any;
        alertSummary: any;
        optimizationRecommendations: any[];
    }>;
    /**
     * Generate GDPR compliance report
     */
    generateGDPRReport(timeRange: {
        start: Date;
        end: Date;
    }, requestedBy: string): Promise<any>;
    /**
     * Apply data retention policy
     */
    applyDataRetentionPolicy(): Promise<{
        logsDeleted: number;
        auditRecordsDeleted: number;
    }>;
    /**
     * Get system health status
     */
    getSystemHealth(): Promise<{
        status: 'healthy' | 'warning' | 'critical';
        metrics: any;
        alerts: any[];
        recommendations: string[];
    }>;
    private contextToLogContext;
    private generateOptimizationRecommendations;
    /**
     * Shutdown monitoring systems
     */
    shutdown(): void;
}
export declare const bulkOperationMonitoring: BulkOperationMonitoringIntegration;
export default bulkOperationMonitoring;
//# sourceMappingURL=monitoring-integration.d.ts.map