"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePerformanceMonitoring = usePerformanceMonitoring;
/**
 * Performance Monitoring Hook
 *
 * React hook for monitoring and optimizing bulk operation performance including:
 * - Real-time performance metrics
 * - Resource usage tracking
 * - Automatic optimization suggestions
 * - Performance alerts
 */
const react_1 = require("react");
const bulk_operation_logger_1 = require("@/lib/logging/bulk-operation-logger");
// ============================================================================
// Hook Implementation
// ============================================================================
function usePerformanceMonitoring(options = {}) {
    const { enableRealTimeMonitoring = true, monitoringInterval = 5000, alertThresholds = {
        memoryUsage: 85,
        cpuUsage: 90,
        errorRate: 10,
        throughputMin: 100
    }, autoOptimize = false } = options;
    // State
    const [currentMetrics, setCurrentMetrics] = (0, react_1.useState)(null);
    const [resourceUsage, setResourceUsage] = (0, react_1.useState)(null);
    const [metricsHistory, setMetricsHistory] = (0, react_1.useState)([]);
    const [resourceHistory, setResourceHistory] = (0, react_1.useState)([]);
    const [activeAlerts, setActiveAlerts] = (0, react_1.useState)([]);
    const [optimizationSuggestions, setOptimizationSuggestions] = (0, react_1.useState)([]);
    const [currentProfile, setCurrentProfile] = (0, react_1.useState)(null);
    const [isMonitoring, setIsMonitoring] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    // Refs
    const monitoringIntervalRef = (0, react_1.useRef)(null);
    const currentOperationType = (0, react_1.useRef)(null);
    // ============================================================================
    // Monitoring Functions
    // ============================================================================
    const collectResourceMetrics = (0, react_1.useCallback)(async () => {
        try {
            // In a real implementation, this would collect actual system metrics
            // For now, we'll simulate the metrics
            const memoryUsage = performance.memory ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                percentage: (performance.memory.usedJSHeapSize / performance.memory.totalJSHeapSize) * 100
            } : {
                used: Math.random() * 1024 * 1024 * 1024, // Random value for demo
                total: 4 * 1024 * 1024 * 1024, // 4GB
                percentage: Math.random() * 100
            };
            return {
                timestamp: new Date(),
                memoryUsed: memoryUsage.used,
                memoryTotal: memoryUsage.total,
                memoryPercentage: memoryUsage.percentage,
                cpuUsage: Math.random() * 100, // Simulated CPU usage
                activeConnections: Math.floor(Math.random() * 50) + 10,
                queueSize: Math.floor(Math.random() * 20)
            };
        }
        catch (err) {
            console.error('Failed to collect resource metrics:', err);
            throw err;
        }
    }, []);
    const checkAlertThresholds = (0, react_1.useCallback)((metrics, resources) => {
        const newAlerts = [];
        if (resources) {
            // Memory usage alert
            if (resources.memoryPercentage > alertThresholds.memoryUsage) {
                newAlerts.push({
                    id: `memory_${Date.now()}`,
                    timestamp: new Date(),
                    type: 'memory',
                    severity: resources.memoryPercentage > 95 ? 'critical' : 'high',
                    message: `Memory usage is ${resources.memoryPercentage.toFixed(1)}%`,
                    currentValue: resources.memoryPercentage,
                    threshold: alertThresholds.memoryUsage,
                    suggestion: 'Consider reducing batch size or enabling streaming processing'
                });
            }
            // CPU usage alert
            if (resources.cpuUsage > alertThresholds.cpuUsage) {
                newAlerts.push({
                    id: `cpu_${Date.now()}`,
                    timestamp: new Date(),
                    type: 'cpu',
                    severity: resources.cpuUsage > 95 ? 'critical' : 'high',
                    message: `CPU usage is ${resources.cpuUsage.toFixed(1)}%`,
                    currentValue: resources.cpuUsage,
                    threshold: alertThresholds.cpuUsage,
                    suggestion: 'Consider reducing parallelism or adding delays between operations'
                });
            }
        }
        if (metrics) {
            // Error rate alert
            const errorRate = (metrics.errorCount / metrics.recordsProcessed) * 100;
            if (errorRate > alertThresholds.errorRate) {
                newAlerts.push({
                    id: `error_rate_${Date.now()}`,
                    timestamp: new Date(),
                    type: 'error_rate',
                    severity: errorRate > 25 ? 'critical' : 'medium',
                    message: `Error rate is ${errorRate.toFixed(1)}%`,
                    currentValue: errorRate,
                    threshold: alertThresholds.errorRate,
                    suggestion: 'Review data quality and validation rules'
                });
            }
            // Throughput alert
            if (metrics.throughput < alertThresholds.throughputMin) {
                newAlerts.push({
                    id: `throughput_${Date.now()}`,
                    timestamp: new Date(),
                    type: 'throughput',
                    severity: 'medium',
                    message: `Throughput is ${metrics.throughput.toFixed(1)} records/sec`,
                    currentValue: metrics.throughput,
                    threshold: alertThresholds.throughputMin,
                    suggestion: 'Consider increasing batch size or optimizing queries'
                });
            }
        }
        if (newAlerts.length > 0) {
            setActiveAlerts(prev => [...prev, ...newAlerts]);
            // Log alerts
            newAlerts.forEach(alert => {
                bulk_operation_logger_1.bulkOperationLogger.log(alert.severity === 'critical' ? bulk_operation_logger_1.LogLevel.FATAL : bulk_operation_logger_1.LogLevel.WARN, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Performance alert: ${alert.message}`, { userId: 'system', operation: 'performance_alert' }, { alertType: alert.type, severity: alert.severity, suggestion: alert.suggestion });
            });
        }
    }, [alertThresholds]);
    const generateOptimizationSuggestions = (0, react_1.useCallback)((metrics, resources) => {
        const suggestions = [];
        if (metrics.length === 0 || resources.length === 0)
            return;
        const recentMetrics = metrics.slice(-10);
        const recentResources = resources.slice(-10);
        // Analyze average performance
        const avgThroughput = recentMetrics.reduce((sum, m) => sum + m.throughput, 0) / recentMetrics.length;
        const avgMemoryUsage = recentResources.reduce((sum, r) => sum + r.memoryPercentage, 0) / recentResources.length;
        const avgErrorRate = recentMetrics.reduce((sum, m) => sum + (m.errorCount / m.recordsProcessed * 100), 0) / recentMetrics.length;
        // Batch size optimization
        if (avgThroughput < 500 && avgMemoryUsage < 60) {
            suggestions.push({
                id: 'batch_size_increase',
                type: 'batch_size',
                title: 'Increase Batch Size',
                description: 'Low memory usage suggests you can process larger batches for better throughput',
                currentValue: 1000,
                suggestedValue: 2000,
                expectedImprovement: '30-50% throughput increase',
                priority: 'medium'
            });
        }
        if (avgMemoryUsage > 80) {
            suggestions.push({
                id: 'batch_size_decrease',
                type: 'batch_size',
                title: 'Reduce Batch Size',
                description: 'High memory usage suggests smaller batches would be more efficient',
                currentValue: 2000,
                suggestedValue: 1000,
                expectedImprovement: '20-30% memory reduction',
                priority: 'high'
            });
        }
        // Caching optimization
        if (avgErrorRate < 5 && currentOperationType.current === 'validation') {
            suggestions.push({
                id: 'enable_caching',
                type: 'caching',
                title: 'Enable Validation Caching',
                description: 'Low error rate suggests validation results can be cached safely',
                currentValue: false,
                suggestedValue: true,
                expectedImprovement: '40-60% validation speed increase',
                priority: 'high'
            });
        }
        // Parallelism optimization
        const avgCpuUsage = recentResources.reduce((sum, r) => sum + r.cpuUsage, 0) / recentResources.length;
        if (avgCpuUsage < 50 && avgThroughput < 1000) {
            suggestions.push({
                id: 'increase_parallelism',
                type: 'parallelism',
                title: 'Increase Parallelism',
                description: 'Low CPU usage suggests you can process more operations in parallel',
                currentValue: 2,
                suggestedValue: 4,
                expectedImprovement: '50-80% throughput increase',
                priority: 'medium'
            });
        }
        setOptimizationSuggestions(suggestions);
    }, []);
    // ============================================================================
    // Control Functions
    // ============================================================================
    const startMonitoring = (0, react_1.useCallback)((operationType) => {
        if (isMonitoring)
            return;
        currentOperationType.current = operationType;
        setIsMonitoring(true);
        setError(null);
        // Get performance profile for operation
        const profile = getOptimalSettings(1000, operationType); // Default to medium size
        setCurrentProfile(profile);
        if (enableRealTimeMonitoring) {
            monitoringIntervalRef.current = setInterval(async () => {
                try {
                    const resources = await collectResourceMetrics();
                    setResourceUsage(resources);
                    // Add to history
                    setResourceHistory(prev => {
                        const updated = [...prev, resources];
                        // Keep only last 100 entries
                        return updated.slice(-100);
                    });
                    // Check for alerts
                    checkAlertThresholds(currentMetrics, resources);
                }
                catch (err) {
                    console.error('Monitoring error:', err);
                    setError(err instanceof Error ? err.message : 'Monitoring failed');
                }
            }, monitoringInterval);
        }
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Performance monitoring started for ${operationType}`, { userId: 'system', operation: 'start_monitoring' }, { operationType, monitoringInterval });
    }, [isMonitoring, enableRealTimeMonitoring, monitoringInterval, collectResourceMetrics, checkAlertThresholds, currentMetrics]);
    const stopMonitoring = (0, react_1.useCallback)(() => {
        if (!isMonitoring)
            return;
        if (monitoringIntervalRef.current) {
            clearInterval(monitoringIntervalRef.current);
            monitoringIntervalRef.current = null;
        }
        setIsMonitoring(false);
        currentOperationType.current = null;
        // Generate optimization suggestions based on collected data
        generateOptimizationSuggestions(metricsHistory, resourceHistory);
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.PERFORMANCE, 'Performance monitoring stopped', { userId: 'system', operation: 'stop_monitoring' });
    }, [isMonitoring, generateOptimizationSuggestions, metricsHistory, resourceHistory]);
    const recordOperation = (0, react_1.useCallback)((metrics) => {
        const fullMetrics = {
            timestamp: new Date(),
            operationType: currentOperationType.current || 'import',
            duration: 0,
            recordsProcessed: 0,
            throughput: 0,
            memoryUsage: 0,
            cpuUsage: 0,
            errorCount: 0,
            successRate: 100,
            ...metrics
        };
        // Calculate derived metrics
        if (fullMetrics.duration > 0 && fullMetrics.recordsProcessed > 0) {
            fullMetrics.throughput = fullMetrics.recordsProcessed / (fullMetrics.duration / 1000);
        }
        if (fullMetrics.recordsProcessed > 0) {
            fullMetrics.successRate = ((fullMetrics.recordsProcessed - fullMetrics.errorCount) / fullMetrics.recordsProcessed) * 100;
        }
        setCurrentMetrics(fullMetrics);
        // Add to history
        setMetricsHistory(prev => {
            const updated = [...prev, fullMetrics];
            // Keep only last 100 entries
            return updated.slice(-100);
        });
        // Check for alerts
        checkAlertThresholds(fullMetrics, resourceUsage);
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.DEBUG, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Operation metrics recorded`, { userId: 'system', operation: 'record_metrics' }, {
            operationType: fullMetrics.operationType,
            duration: fullMetrics.duration,
            recordsProcessed: fullMetrics.recordsProcessed,
            throughput: Math.round(fullMetrics.throughput * 100) / 100,
            successRate: Math.round(fullMetrics.successRate * 100) / 100
        });
    }, [checkAlertThresholds, resourceUsage]);
    const acknowledgeAlert = (0, react_1.useCallback)((alertId) => {
        setActiveAlerts(prev => prev.filter(alert => alert.id !== alertId));
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Performance alert acknowledged`, { userId: 'system', operation: 'acknowledge_alert' }, { alertId });
    }, []);
    const applyOptimization = (0, react_1.useCallback)((suggestionId) => {
        const suggestion = optimizationSuggestions.find(s => s.id === suggestionId);
        if (!suggestion)
            return;
        // In a real implementation, this would apply the optimization
        // For now, we'll just remove the suggestion and log it
        setOptimizationSuggestions(prev => prev.filter(s => s.id !== suggestionId));
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.PERFORMANCE, `Optimization applied: ${suggestion.title}`, { userId: 'system', operation: 'apply_optimization' }, {
            suggestionId,
            type: suggestion.type,
            currentValue: suggestion.currentValue,
            suggestedValue: suggestion.suggestedValue
        });
    }, [optimizationSuggestions]);
    const getOptimalSettings = (0, react_1.useCallback)((recordCount, operationType) => {
        // Categorize data size
        let dataSize;
        if (recordCount > 100000)
            dataSize = 'xlarge';
        else if (recordCount > 10000)
            dataSize = 'large';
        else if (recordCount > 1000)
            dataSize = 'medium';
        else
            dataSize = 'small';
        // Base profile
        let profile = {
            operationType,
            dataSize,
            recommendedBatchSize: 1000,
            recommendedChunkSize: 1000,
            recommendedParallelism: 2,
            memoryLimit: 256 * 1024 * 1024, // 256MB
            estimatedDuration: 60000 // 1 minute
        };
        // Adjust based on data size
        switch (dataSize) {
            case 'xlarge':
                profile = {
                    ...profile,
                    recommendedBatchSize: 5000,
                    recommendedChunkSize: 2000,
                    recommendedParallelism: 4,
                    memoryLimit: 1024 * 1024 * 1024, // 1GB
                    estimatedDuration: 1800000 // 30 minutes
                };
                break;
            case 'large':
                profile = {
                    ...profile,
                    recommendedBatchSize: 2000,
                    recommendedChunkSize: 1500,
                    recommendedParallelism: 3,
                    memoryLimit: 512 * 1024 * 1024, // 512MB
                    estimatedDuration: 600000 // 10 minutes
                };
                break;
            case 'medium':
                profile = {
                    ...profile,
                    recommendedBatchSize: 1000,
                    recommendedChunkSize: 1000,
                    recommendedParallelism: 2,
                    memoryLimit: 256 * 1024 * 1024, // 256MB
                    estimatedDuration: 120000 // 2 minutes
                };
                break;
        }
        // Adjust based on operation type
        if (operationType === 'validation') {
            profile.recommendedBatchSize = Math.floor(profile.recommendedBatchSize * 0.5);
            profile.estimatedDuration = Math.floor(profile.estimatedDuration * 1.5);
        }
        else if (operationType === 'export') {
            profile.recommendedBatchSize = Math.floor(profile.recommendedBatchSize * 1.5);
            profile.estimatedDuration = Math.floor(profile.estimatedDuration * 0.8);
        }
        return profile;
    }, []);
    // ============================================================================
    // Cleanup
    // ============================================================================
    (0, react_1.useEffect)(() => {
        return () => {
            if (monitoringIntervalRef.current) {
                clearInterval(monitoringIntervalRef.current);
            }
        };
    }, []);
    // Auto-generate suggestions periodically
    (0, react_1.useEffect)(() => {
        if (autoOptimize && metricsHistory.length > 5 && resourceHistory.length > 5) {
            generateOptimizationSuggestions(metricsHistory, resourceHistory);
        }
    }, [autoOptimize, metricsHistory, resourceHistory, generateOptimizationSuggestions]);
    return {
        // Current metrics
        currentMetrics,
        resourceUsage,
        // Historical data
        metricsHistory,
        resourceHistory,
        // Alerts and suggestions
        activeAlerts,
        optimizationSuggestions,
        // Performance profile
        currentProfile,
        // Control functions
        startMonitoring,
        stopMonitoring,
        recordOperation,
        acknowledgeAlert,
        applyOptimization,
        getOptimalSettings,
        // State
        isMonitoring,
        isLoading,
        error
    };
}
//# sourceMappingURL=usePerformanceMonitoring.js.map