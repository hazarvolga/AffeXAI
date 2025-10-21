"use strict";
/**
 * Web Vitals Tracking
 *
 * Tracks Core Web Vitals and sends them to analytics.
 * Supports multiple analytics providers (console, Google Analytics, custom).
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceMonitor = exports.PerformanceMonitor = exports.PERFORMANCE_BUDGETS = void 0;
exports.getMetricRating = getMetricRating;
exports.formatMetricValue = formatMetricValue;
exports.reportWebVitals = reportWebVitals;
exports.getAllWebVitals = getAllWebVitals;
/**
 * Performance Budget Thresholds
 * Based on Core Web Vitals recommendations
 */
exports.PERFORMANCE_BUDGETS = {
    FCP: {
        good: 1800, // < 1.8s
        poor: 3000, // > 3.0s
    },
    LCP: {
        good: 2500, // < 2.5s
        poor: 4000, // > 4.0s
    },
    FID: {
        good: 100, // < 100ms
        poor: 300, // > 300ms
    },
    INP: {
        good: 200, // < 200ms
        poor: 500, // > 500ms
    },
    CLS: {
        good: 0.1, // < 0.1
        poor: 0.25, // > 0.25
    },
    TTFB: {
        good: 800, // < 800ms
        poor: 1800, // > 1800ms
    },
};
/**
 * Get metric rating based on value
 */
function getMetricRating(name, value) {
    const budget = exports.PERFORMANCE_BUDGETS[name];
    if (value <= budget.good) {
        return 'good';
    }
    else if (value <= budget.poor) {
        return 'needs-improvement';
    }
    else {
        return 'poor';
    }
}
/**
 * Format metric value for display
 */
function formatMetricValue(name, value) {
    if (name === 'CLS') {
        return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
}
/**
 * Console Logger (Development)
 */
const consoleProvider = {
    name: 'console',
    send: (metric) => {
        const rating = getMetricRating(metric.name, metric.value);
        const formatted = formatMetricValue(metric.name, metric.value);
        console.group(`📊 Web Vital: ${metric.name}`);
        console.log('Value:', formatted);
        console.log('Rating:', rating);
        console.log('ID:', metric.id);
        console.log('Navigation Type:', metric.navigationType);
        console.groupEnd();
    },
};
/**
 * Google Analytics Provider
 */
const googleAnalyticsProvider = {
    name: 'google-analytics',
    send: (metric) => {
        // Send to Google Analytics 4
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                metric_id: metric.id,
                metric_value: metric.value,
                metric_delta: metric.delta,
                metric_rating: getMetricRating(metric.name, metric.value),
            });
        }
    },
};
/**
 * Custom Analytics Provider
 * Send to your own analytics endpoint
 */
const customProvider = {
    name: 'custom',
    send: async (metric) => {
        try {
            await fetch('/api/analytics/web-vitals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: metric.name,
                    value: metric.value,
                    rating: getMetricRating(metric.name, metric.value),
                    id: metric.id,
                    delta: metric.delta,
                    navigationType: metric.navigationType,
                    timestamp: Date.now(),
                }),
            });
        }
        catch (error) {
            console.error('Failed to send metric:', error);
        }
    },
};
/**
 * Active Providers
 * Configure which providers to use based on environment
 */
const activeProviders = [
    // Always use console in development
    ...(process.env.NODE_ENV === 'development' ? [consoleProvider] : []),
    // Use Google Analytics in production if available
    ...(process.env.NEXT_PUBLIC_GA_ID ? [googleAnalyticsProvider] : []),
    // Use custom analytics if endpoint is configured
    ...(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ? [customProvider] : []),
];
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
function reportWebVitals(metric) {
    // Send to all active providers
    activeProviders.forEach(provider => {
        try {
            provider.send(metric);
        }
        catch (error) {
            console.error(`Failed to send metric to ${provider.name}:`, error);
        }
    });
    // Check if metric exceeds budget
    const rating = getMetricRating(metric.name, metric.value);
    if (rating === 'poor') {
        console.warn(`⚠️ Performance Budget Exceeded: ${metric.name} = ${formatMetricValue(metric.name, metric.value)} (${rating})`);
    }
}
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
async function getAllWebVitals() {
    const metrics = {
        FCP: null,
        LCP: null,
        FID: null,
        CLS: null,
        TTFB: null,
        INP: null,
    };
    if (typeof window === 'undefined') {
        return metrics;
    }
    try {
        const { onFCP, onLCP, onCLS, onTTFB, onINP } = await Promise.resolve().then(() => __importStar(require('web-vitals')));
        await Promise.all([
            new Promise(resolve => onFCP((m) => { metrics.FCP = m.value; resolve(); })),
            new Promise(resolve => onLCP((m) => { metrics.LCP = m.value; resolve(); })),
            new Promise(resolve => onCLS((m) => { metrics.CLS = m.value; resolve(); })),
            new Promise(resolve => onTTFB((m) => { metrics.TTFB = m.value; resolve(); })),
            new Promise(resolve => onINP((m) => { metrics.INP = m.value; resolve(); })),
        ]);
    }
    catch (error) {
        console.error('Failed to collect web vitals:', error);
    }
    return metrics;
}
/**
 * Performance Observer for Custom Metrics
 * Track custom performance marks and measures
 */
class PerformanceMonitor {
    marks = new Map();
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
    mark(name) {
        this.marks.set(name, performance.now());
        performance.mark(name);
    }
    /**
     * Measure duration between two marks
     */
    measure(name, startMark, endMark) {
        const start = this.marks.get(startMark);
        const end = this.marks.get(endMark);
        if (start === undefined || end === undefined) {
            console.warn(`Missing marks for measurement: ${name}`);
            return 0;
        }
        const duration = end - start;
        performance.measure(name, startMark, endMark);
        return duration;
    }
    /**
     * Get all measurements
     */
    getMeasures() {
        return performance.getEntriesByType('measure');
    }
    /**
     * Clear all marks and measures
     */
    clear() {
        this.marks.clear();
        performance.clearMarks();
        performance.clearMeasures();
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
/**
 * Global performance monitor instance
 */
exports.performanceMonitor = new PerformanceMonitor();
//# sourceMappingURL=web-vitals.js.map