/**
 * Bulk Operation Metrics Collection and Monitoring System
 *
 * Provides comprehensive metrics collection, aggregation, and monitoring
 * for bulk import/export operations including:
 * - Real-time performance metrics
 * - System resource monitoring
 * - Business metrics tracking
 * - Alert thresholds and notifications
 */
export interface SystemMetrics {
    timestamp: Date;
    memoryUsage: {
        used: number;
        free: number;
        total: number;
        percentage: number;
    };
    cpuUsage: number;
    activeConnections: number;
    queueSize: number;
    diskUsage?: {
        used: number;
        free: number;
        total: number;
        percentage: number;
    };
}
export interface BusinessMetrics {
    timestamp: Date;
    totalImportsToday: number;
    totalExportsToday: number;
    totalRecordsProcessed: number;
    averageValidationRate: number;
    averageProcessingTime: number;
    errorRate: number;
    userSatisfactionScore?: number;
    activeUsers: number;
}
export interface AlertThreshold {
    metric: string;
    operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
    value: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    enabled: boolean;
    cooldownMinutes: number;
    lastTriggered?: Date;
}
export interface MetricAlert {
    id: string;
    timestamp: Date;
    threshold: AlertThreshold;
    currentValue: number;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    acknowledged: boolean;
    resolvedAt?: Date;
}
export interface MetricsSummary {
    timeRange: {
        start: Date;
        end: Date;
    };
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    averageThroughput: number;
    peakThroughput: number;
    averageMemoryUsage: number;
    peakMemoryUsage: number;
    totalErrorCount: number;
    mostCommonErrors: Array<{
        type: string;
        count: number;
    }>;
    performanceTrends: {
        throughputTrend: 'improving' | 'stable' | 'declining';
        errorRateTrend: 'improving' | 'stable' | 'declining';
        memoryUsageTrend: 'improving' | 'stable' | 'declining';
    };
}
export declare class BulkOperationMetricsCollector {
    private systemMetrics;
    private businessMetrics;
    private alerts;
    private alertThresholds;
    private collectionInterval;
    private isCollecting;
    constructor();
    /**
     * Start metrics collection
     */
    startCollection(intervalMs?: number): void;
    /**
     * Stop metrics collection
     */
    stopCollection(): void;
    /**
     * Collect current system and business metrics
     */
    collectMetrics(): Promise<void>;
    /**
     * Record operation metrics
     */
    recordOperationMetrics(operationType: 'import' | 'export', metrics: {
        duration: number;
        recordsProcessed: number;
        errorCount: number;
        memoryUsed?: number;
        success: boolean;
    }): void;
    /**
     * Get system metrics for a time range
     */
    getSystemMetrics(startTime: Date, endTime: Date): SystemMetrics[];
    /**
     * Get business metrics for a time range
     */
    getBusinessMetrics(startTime: Date, endTime: Date): BusinessMetrics[];
    /**
     * Get metrics summary for a time range
     */
    getMetricsSummary(startTime: Date, endTime: Date): MetricsSummary;
    /**
     * Get active alerts
     */
    getActiveAlerts(): MetricAlert[];
    /**
     * Acknowledge an alert
     */
    acknowledgeAlert(alertId: string): boolean;
    /**
     * Add or update alert threshold
     */
    setAlertThreshold(name: string, threshold: AlertThreshold): void;
    /**
     * Remove alert threshold
     */
    removeAlertThreshold(name: string): boolean;
    private collectSystemMetrics;
    private collectBusinessMetrics;
    private checkAlertThresholds;
    private checkThresholdCondition;
    private triggerAlert;
    private updateBusinessMetrics;
    private cleanupOldMetrics;
    private initializeDefaultThresholds;
}
export declare const bulkOperationMetrics: BulkOperationMetricsCollector;
export default bulkOperationMetrics;
//# sourceMappingURL=bulk-operation-metrics.d.ts.map