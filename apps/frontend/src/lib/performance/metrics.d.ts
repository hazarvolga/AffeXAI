/**
 * Performance Metrics Collector
 *
 * Collects and aggregates performance metrics for monitoring and analysis.
 */
import type { MetricName, MetricRating } from './web-vitals';
/**
 * Performance Metric Entry
 */
interface MetricEntry {
    name: MetricName;
    value: number;
    rating: MetricRating;
    timestamp: number;
    url: string;
    userAgent?: string;
}
/**
 * Aggregated Performance Stats
 */
interface PerformanceStats {
    metric: MetricName;
    count: number;
    average: number;
    median: number;
    p75: number;
    p95: number;
    min: number;
    max: number;
    goodCount: number;
    needsImprovementCount: number;
    poorCount: number;
}
/**
 * Performance Metrics Store
 */
declare class MetricsStore {
    private metrics;
    private readonly maxEntries;
    /**
     * Add a metric entry
     */
    add(name: MetricName, value: number): void;
    /**
     * Get all metrics for a specific type
     */
    getMetrics(name: MetricName): MetricEntry[];
    /**
     * Get all metrics
     */
    getAllMetrics(): MetricEntry[];
    /**
     * Calculate statistics for a metric
     */
    getStats(name: MetricName): PerformanceStats | null;
    /**
     * Get summary of all metrics
     */
    getSummary(): Record<MetricName, PerformanceStats | null>;
    /**
     * Check if metrics meet performance budgets
     */
    checkBudgets(): {
        metric: MetricName;
        status: 'pass' | 'fail';
        average: number;
        budget: number;
    }[];
    /**
     * Clear all metrics
     */
    clear(): void;
    /**
     * Persist to localStorage
     */
    private persist;
    /**
     * Load from localStorage
     */
    load(): void;
    /**
     * Export metrics as JSON
     */
    export(): string;
}
/**
 * Global metrics store instance
 */
export declare const metricsStore: MetricsStore;
/**
 * Performance Dashboard Data
 */
export interface DashboardData {
    summary: Record<MetricName, PerformanceStats | null>;
    budgetStatus: {
        metric: MetricName;
        status: 'pass' | 'fail';
        average: number;
        budget: number;
    }[];
    recentMetrics: MetricEntry[];
    timestamp: string;
}
/**
 * Get performance dashboard data
 */
export declare function getDashboardData(): DashboardData;
/**
 * Log performance summary to console
 */
export declare function logPerformanceSummary(): void;
/**
 * Resource Timing Analysis
 */
export interface ResourceTiming {
    name: string;
    type: string;
    duration: number;
    size: number;
    cached: boolean;
}
/**
 * Get resource timing data
 */
export declare function getResourceTimings(): ResourceTiming[];
/**
 * Get resource summary by type
 */
export declare function getResourceSummary(): Record<string, {
    count: number;
    totalSize: number;
    totalDuration: number;
    cached: number;
}>;
/**
 * Performance Report
 */
export declare function generatePerformanceReport(): string;
export {};
//# sourceMappingURL=metrics.d.ts.map