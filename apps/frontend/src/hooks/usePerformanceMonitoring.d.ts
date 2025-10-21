interface PerformanceMetrics {
    timestamp: Date;
    operationType: 'import' | 'export' | 'validation';
    duration: number;
    recordsProcessed: number;
    throughput: number;
    memoryUsage: number;
    cpuUsage: number;
    errorCount: number;
    successRate: number;
}
interface ResourceUsage {
    timestamp: Date;
    memoryUsed: number;
    memoryTotal: number;
    memoryPercentage: number;
    cpuUsage: number;
    activeConnections: number;
    queueSize: number;
}
interface PerformanceAlert {
    id: string;
    timestamp: Date;
    type: 'memory' | 'cpu' | 'throughput' | 'error_rate';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    currentValue: number;
    threshold: number;
    suggestion?: string;
}
interface OptimizationSuggestion {
    id: string;
    type: 'batch_size' | 'memory_limit' | 'parallelism' | 'caching';
    title: string;
    description: string;
    currentValue: any;
    suggestedValue: any;
    expectedImprovement: string;
    priority: 'low' | 'medium' | 'high';
}
interface PerformanceProfile {
    operationType: 'import' | 'export' | 'validation';
    dataSize: 'small' | 'medium' | 'large' | 'xlarge';
    recommendedBatchSize: number;
    recommendedChunkSize: number;
    recommendedParallelism: number;
    memoryLimit: number;
    estimatedDuration: number;
}
interface UsePerformanceMonitoringOptions {
    enableRealTimeMonitoring?: boolean;
    monitoringInterval?: number;
    alertThresholds?: {
        memoryUsage?: number;
        cpuUsage?: number;
        errorRate?: number;
        throughputMin?: number;
    };
    autoOptimize?: boolean;
}
interface UsePerformanceMonitoringReturn {
    currentMetrics: PerformanceMetrics | null;
    resourceUsage: ResourceUsage | null;
    metricsHistory: PerformanceMetrics[];
    resourceHistory: ResourceUsage[];
    activeAlerts: PerformanceAlert[];
    optimizationSuggestions: OptimizationSuggestion[];
    currentProfile: PerformanceProfile | null;
    startMonitoring: (operationType: 'import' | 'export' | 'validation') => void;
    stopMonitoring: () => void;
    recordOperation: (metrics: Partial<PerformanceMetrics>) => void;
    acknowledgeAlert: (alertId: string) => void;
    applyOptimization: (suggestionId: string) => void;
    getOptimalSettings: (recordCount: number, operationType: 'import' | 'export' | 'validation') => PerformanceProfile;
    isMonitoring: boolean;
    isLoading: boolean;
    error: string | null;
}
export declare function usePerformanceMonitoring(options?: UsePerformanceMonitoringOptions): UsePerformanceMonitoringReturn;
export {};
//# sourceMappingURL=usePerformanceMonitoring.d.ts.map