"use strict";
/**
 * CMS Analytics React Hooks
 *
 * Easy-to-use hooks for component analytics tracking:
 * - useAnalyticsTracker: Track interactions
 * - useComponentView: Auto-track views
 * - useHeatmap: Track click heatmaps
 * - useABTest: A/B test variant selection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnalyticsTracker = useAnalyticsTracker;
exports.useComponentView = useComponentView;
exports.useHeatmap = useHeatmap;
exports.useABTest = useABTest;
exports.useScrollDepth = useScrollDepth;
exports.useEngagementTime = useEngagementTime;
exports.useFormAnalytics = useFormAnalytics;
exports.usePerformanceTracking = usePerformanceTracking;
const react_1 = require("react");
const analytics_tracker_1 = require("@/lib/cms/analytics-tracker");
/**
 * Hook to track component interactions
 */
function useAnalyticsTracker(componentId, componentType) {
    const tracker = (0, analytics_tracker_1.getAnalytics)();
    const trackInteraction = (0, react_1.useCallback)((interactionType, metadata) => {
        if (!tracker)
            return;
        tracker.trackInteraction(componentId, componentType, interactionType, metadata);
    }, [tracker, componentId, componentType]);
    const trackClick = (0, react_1.useCallback)((event, metadata) => {
        if (!tracker)
            return;
        tracker.trackClick(componentId, componentType, event, metadata);
    }, [tracker, componentId, componentType]);
    const trackView = (0, react_1.useCallback)(() => {
        if (!tracker)
            return;
        tracker.trackView(componentId, componentType);
    }, [tracker, componentId, componentType]);
    const trackHover = (0, react_1.useCallback)((event) => {
        if (!tracker)
            return;
        tracker.trackHover(componentId, componentType, event);
    }, [tracker, componentId, componentType]);
    const trackScroll = (0, react_1.useCallback)((scrollDepth) => {
        if (!tracker)
            return;
        tracker.trackScroll(componentId, componentType, scrollDepth);
    }, [tracker, componentId, componentType]);
    const trackConversion = (0, react_1.useCallback)((conversionGoal, value) => {
        if (!tracker)
            return;
        tracker.trackConversion(componentId, componentType, conversionGoal, value);
    }, [tracker, componentId, componentType]);
    return {
        trackInteraction,
        trackClick,
        trackView,
        trackHover,
        trackScroll,
        trackConversion,
    };
}
/**
 * Hook to auto-track component views using IntersectionObserver
 */
function useComponentView(componentId, componentType, options) {
    const elementRef = (0, react_1.useRef)(null);
    const hasTrackedRef = (0, react_1.useRef)(false);
    const { trackView } = useAnalyticsTracker(componentId, componentType);
    (0, react_1.useEffect)(() => {
        const element = elementRef.current;
        if (!element)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasTrackedRef.current) {
                    trackView();
                    hasTrackedRef.current = true;
                }
            });
        }, {
            threshold: 0.5, // Track when 50% visible
            ...options,
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [trackView, options]);
    return elementRef;
}
/**
 * Hook to track click heatmap
 */
function useHeatmap(componentId, componentType) {
    const elementRef = (0, react_1.useRef)(null);
    const { trackClick } = useAnalyticsTracker(componentId, componentType);
    (0, react_1.useEffect)(() => {
        const element = elementRef.current;
        if (!element)
            return;
        const handleClick = (event) => {
            trackClick(event);
        };
        element.addEventListener('click', handleClick);
        return () => {
            element.removeEventListener('click', handleClick);
        };
    }, [trackClick]);
    return elementRef;
}
/**
 * Hook for A/B test variant selection
 */
function useABTest(testId, componentId) {
    const variantRef = (0, react_1.useRef)(null);
    const hasTrackedImpressionRef = (0, react_1.useRef)(false);
    const tracker = (0, analytics_tracker_1.getAnalytics)();
    // In a real implementation, this would fetch the test from API
    // For now, we'll return a mock variant
    const variant = variantRef.current;
    const isLoading = false;
    const trackImpression = (0, react_1.useCallback)(() => {
        if (!tracker || !variant || hasTrackedImpressionRef.current)
            return;
        tracker.trackView(componentId, 'ab-test-variant');
        hasTrackedImpressionRef.current = true;
    }, [tracker, variant, componentId]);
    const trackConversion = (0, react_1.useCallback)((value) => {
        if (!tracker || !variant)
            return;
        tracker.trackConversion(componentId, 'ab-test-variant', testId, value);
    }, [tracker, variant, componentId, testId]);
    // Track impression on mount
    (0, react_1.useEffect)(() => {
        if (variant) {
            trackImpression();
        }
    }, [variant, trackImpression]);
    return {
        variant,
        isLoading,
        trackImpression,
        trackConversion,
    };
}
/**
 * Hook to track scroll depth
 */
function useScrollDepth(componentId, componentType) {
    const elementRef = (0, react_1.useRef)(null);
    const maxScrollDepthRef = (0, react_1.useRef)(0);
    const { trackScroll } = useAnalyticsTracker(componentId, componentType);
    (0, react_1.useEffect)(() => {
        const element = elementRef.current;
        if (!element)
            return;
        const handleScroll = () => {
            const scrollTop = element.scrollTop;
            const scrollHeight = element.scrollHeight - element.clientHeight;
            const scrollDepth = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            if (scrollDepth > maxScrollDepthRef.current) {
                maxScrollDepthRef.current = scrollDepth;
                // Track at 25%, 50%, 75%, 100% milestones
                const milestones = [0.25, 0.5, 0.75, 1.0];
                for (const milestone of milestones) {
                    if (scrollDepth >= milestone &&
                        maxScrollDepthRef.current >= milestone) {
                        trackScroll(milestone);
                        break;
                    }
                }
            }
        };
        element.addEventListener('scroll', handleScroll);
        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [trackScroll]);
    return elementRef;
}
/**
 * Hook to track time on component
 */
function useEngagementTime(componentId, componentType) {
    const startTimeRef = (0, react_1.useRef)(Date.now());
    const { trackInteraction } = useAnalyticsTracker(componentId, componentType);
    (0, react_1.useEffect)(() => {
        return () => {
            // Track total engagement time on unmount
            const engagementTime = Date.now() - startTimeRef.current;
            trackInteraction('view', { engagementTime });
        };
    }, [trackInteraction]);
}
/**
 * Hook to track form interactions
 */
function useFormAnalytics(formId, fields) {
    const { trackInteraction } = useAnalyticsTracker(formId, 'form');
    const fieldInteractionsRef = (0, react_1.useRef)({});
    const trackFieldFocus = (0, react_1.useCallback)((fieldName) => {
        trackInteraction('focus', { field: fieldName });
        fieldInteractionsRef.current[fieldName] =
            (fieldInteractionsRef.current[fieldName] || 0) + 1;
    }, [trackInteraction]);
    const trackFieldBlur = (0, react_1.useCallback)((fieldName) => {
        trackInteraction('input', { field: fieldName, action: 'blur' });
    }, [trackInteraction]);
    const trackFieldChange = (0, react_1.useCallback)((fieldName, value) => {
        trackInteraction('input', {
            field: fieldName,
            hasValue: Boolean(value),
            valueLength: typeof value === 'string' ? value.length : undefined,
        });
    }, [trackInteraction]);
    const trackSubmit = (0, react_1.useCallback)((success, errors) => {
        trackInteraction('submit', {
            success,
            errorCount: errors ? Object.keys(errors).length : 0,
            fieldInteractions: fieldInteractionsRef.current,
        });
    }, [trackInteraction]);
    return {
        trackFieldFocus,
        trackFieldBlur,
        trackFieldChange,
        trackSubmit,
    };
}
/**
 * Hook to track performance metrics
 */
function usePerformanceTracking(componentId, componentType) {
    const { trackInteraction } = useAnalyticsTracker(componentId, componentType);
    const mountTimeRef = (0, react_1.useRef)(Date.now());
    (0, react_1.useEffect)(() => {
        // Track component mount time
        const mountDuration = Date.now() - mountTimeRef.current;
        // Use performance API if available
        if (window.performance && window.performance.mark) {
            const markName = `component-mount-${componentId}`;
            performance.mark(markName);
            trackInteraction('view', {
                performanceMetric: {
                    type: 'mount',
                    duration: mountDuration,
                    timestamp: Date.now(),
                },
            });
        }
    }, [componentId, trackInteraction]);
    const measureRender = (0, react_1.useCallback)((renderName) => {
        if (!window.performance)
            return;
        const markName = `component-render-${componentId}-${renderName}`;
        performance.mark(markName);
        // Measure from previous mark if exists
        try {
            const measure = performance.measure(markName, `component-mount-${componentId}`, markName);
            trackInteraction('view', {
                performanceMetric: {
                    type: 'render',
                    name: renderName,
                    duration: measure.duration,
                    timestamp: Date.now(),
                },
            });
        }
        catch (error) {
            // Previous mark doesn't exist, ignore
        }
    }, [componentId, trackInteraction]);
    return { measureRender };
}
//# sourceMappingURL=useCMSAnalytics.js.map