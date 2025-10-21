/**
 * Bulk Operation Performance Optimizer
 *
 * Comprehensive performance optimization for bulk operations including:
 * - Memory-efficient streaming for large files
 * - Database query optimization for exports
 * - Caching strategies for validation results
 * - Resource management and monitoring
 * - Adaptive batch sizing
 */
export interface StreamingOptions {
    chunkSize: number;
    maxMemoryUsage: number;
    enableCompression: boolean;
    bufferSize: number;
    parallelStreams: number;
}
export interface CacheOptions {
    ttl: number;
    maxSize: number;
    compressionEnabled: boolean;
    persistToDisk: boolean;
}
export interface QueryOptimizationOptions {
    batchSize: number;
    indexHints: string[];
    selectFields: string[];
    useReadReplica: boolean;
    enableQueryCache: boolean;
}
export interface PerformanceProfile {
    operationType: 'import' | 'export' | 'validation';
    dataSize: 'small' | 'medium' | 'large' | 'xlarge';
    recommendedBatchSize: number;
    recommendedChunkSize: number;
    recommendedParallelism: number;
    memoryLimit: number;
    estimatedDuration: number;
}
export interface ResourceUsage {
    timestamp: Date;
    memoryUsed: number;
    cpuUsage: number;
    diskIO: number;
    networkIO: number;
    activeConnections: number;
}
export interface OptimizationResult {
    originalDuration: number;
    optimizedDuration: number;
    improvementPercentage: number;
    memoryReduction: number;
    resourceSavings: {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    };
}
export declare class StreamingProcessor {
    private options;
    private activeStreams;
    private resourceMonitor;
    constructor(options?: Partial<StreamingOptions>);
    /**
     * Process large CSV file with memory-efficient streaming
     */
    processLargeCSV(filePath: string, processor: (chunk: any[]) => Promise<any[]>): AsyncGenerator<any[], void, unknown>;
    /**
     * Stream large dataset export with memory optimization
     */
    streamExportData(query: () => AsyncGenerator<any[], void, unknown>, formatter: (data: any[]) => string): AsyncGenerator<string, void, unknown>;
    private generateStreamId;
    private createOptimizedStream;
    private readLines;
    private parseCSVLine;
    private processChunkWithResourceMonitoring;
    private checkMemoryUsage;
}
export declare class QueryOptimizer {
    private options;
    private queryCache;
    constructor(options?: Partial<QueryOptimizationOptions>);
    /**
     * Optimize export query for large datasets
     */
    optimizedExportQuery(baseQuery: string, filters: Record<string, any>, totalEstimatedRows: number): AsyncGenerator<any[], void, unknown>;
    /**
     * Optimize import queries for batch inserts
     */
    optimizedBatchInsert(tableName: string, records: any[], options?: {
        upsert?: boolean;
        conflictFields?: string[];
    }): Promise<{
        inserted: number;
        updated: number;
        errors: number;
    }>;
    private generateQueryId;
    private simpleHash;
    private calculateOptimalBatchSize;
    private buildOptimizedBatchQuery;
    private executeBatchQuery;
    private executeBatchInsert;
    private splitIntoBatches;
    private getCachedQuery;
    private cacheQuery;
    private cleanupCache;
}
export declare class ValidationCache {
    private cache;
    private options;
    constructor(options?: Partial<CacheOptions>);
    /**
     * Get cached validation result
     */
    get(email: string): any | null;
    /**
     * Set validation result in cache
     */
    set(email: string, result: any, customTtl?: number): void;
    /**
     * Clear expired cache entries
     */
    cleanup(): number;
    /**
     * Get cache statistics
     */
    getStats(): {
        size: number;
        hitRate: number;
        memoryUsage: number;
        oldestEntry: Date | null;
    };
    private generateCacheKey;
    private simpleHash;
    private maskEmail;
    private compress;
    private evictOldest;
}
export declare class ResourceMonitor {
    private resourceHistory;
    private monitoringInterval;
    /**
     * Start resource monitoring
     */
    startMonitoring(intervalMs?: number): void;
    /**
     * Stop resource monitoring
     */
    stopMonitoring(): void;
    /**
     * Get current resource usage
     */
    getCurrentUsage(): ResourceUsage;
    /**
     * Get resource usage history
     */
    getUsageHistory(minutes?: number): ResourceUsage[];
    private recordResourceUsage;
}
export declare class PerformanceProfileManager {
    private profiles;
    constructor();
    /**
     * Get performance profile for operation
     */
    getProfile(operationType: 'import' | 'export' | 'validation', recordCount: number): PerformanceProfile;
    /**
     * Update performance profile based on actual results
     */
    updateProfile(operationType: 'import' | 'export' | 'validation', recordCount: number, actualDuration: number, actualMemoryUsage: number): void;
    private categorizeDataSize;
    private getDefaultProfile;
    private initializeDefaultProfiles;
}
export declare const streamingProcessor: StreamingProcessor;
export declare const queryOptimizer: QueryOptimizer;
export declare const validationCache: ValidationCache;
export declare const resourceMonitor: ResourceMonitor;
export declare const performanceProfileManager: PerformanceProfileManager;
declare const _default: {
    streamingProcessor: StreamingProcessor;
    queryOptimizer: QueryOptimizer;
    validationCache: ValidationCache;
    resourceMonitor: ResourceMonitor;
    performanceProfileManager: PerformanceProfileManager;
};
export default _default;
//# sourceMappingURL=bulk-operation-optimizer.d.ts.map