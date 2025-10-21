/**
 * Web Vitals Tracking
 *
 * Tracks Core Web Vitals and sends them to analytics.
 * Supports multiple analytics providers (console, Google Analytics, custom).
 */
import type { Metric } from 'web-vitals';
/**
 * Performance Metric Types
 */
export type MetricName = 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
/**
 * Metric Rating (Good, Needs Improvement, Poor)
 */
export type MetricRating = 'good' | 'needs-improvement' | 'poor';
/**
 * Performance Budget Thresholds
 * Based on Core Web Vitals recommendations
 */
export declare const PERFORMANCE_BUDGETS: {
    readonly FCP: {
        readonly good: 1800;
        readonly poor: 3000;
    };
    readonly LCP: {
        readonly good: 2500;
        readonly poor: 4000;
    };
    readonly FID: {
        readonly good: 100;
        readonly poor: 300;
    };
    readonly INP: {
        readonly good: 200;
        readonly poor: 500;
    };
    readonly CLS: {
        readonly good: 0.1;
        readonly poor: 0.25;
    };
    readonly TTFB: {
        readonly good: 800;
        readonly poor: 1800;
    };
};
/**
 * Get metric rating based on value
 */
export declare function getMetricRating(name: MetricName, value: number): MetricRating;
/**
 * Format metric value for display
 */
export declare function formatMetricValue(name: MetricName, value: number): string;
/**
 * Report Web Vitals
 *
 * This function is called by Next.js for each web vital metric.
 * It sends the metrics to all configured analytics providers.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx (App Router) or pages/_app.tsx (Pages Router)
 * export { reportWebVitals } from '@/lib/performance/web-vitals';
 * ```
 */
export declare function reportWebVitals(metric: Metric): void;
/**
 * Get all Web Vitals
 * Manually trigger collection of all metrics
 *
 * @example
 * ```ts
 * import { getAllWebVitals } from '@/lib/performance/web-vitals';
 *
 * const metrics = await getAllWebVitals();
 * console.log('Current metrics:', metrics);
 * ```
 */
export declare function getAllWebVitals(): Promise<Record<MetricName, number | null>>;
/**
 * Performance Observer for Custom Metrics
 * Track custom performance marks and measures
 */
export declare class PerformanceMonitor {
    private marks;
    /**
     * Mark a performance point
     *
     * @example
     * ```ts
     * const monitor = new PerformanceMonitor();
     * monitor.mark('data-fetch-start');
     * // ... fetch data
     * monitor.mark('data-fetch-end');
     * const duration = monitor.measure('data-fetch', 'data-fetch-start', 'data-fetch-end');
     * ```
     */
    mark(name: string): void;
    /**
     * Measure duration between two marks
     */
    measure(name: string, startMark: string, endMark: string): number;
    /**
     * Get all measurements
     */
    getMeasures(): PerformanceMeasure[];
    /**
     * Clear all marks and measures
     */
    clear(): void;
}
/**
 * Global performance monitor instance
 */
export declare const performanceMonitor: PerformanceMonitor;
//# sourceMappingURL=web-vitals.d.ts.map