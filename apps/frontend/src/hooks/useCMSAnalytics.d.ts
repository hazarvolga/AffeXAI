/**
 * CMS Analytics React Hooks
 *
 * Easy-to-use hooks for component analytics tracking:
 * - useAnalyticsTracker: Track interactions
 * - useComponentView: Auto-track views
 * - useHeatmap: Track click heatmaps
 * - useABTest: A/B test variant selection
 */
import type { InteractionType, ABTestVariant } from '@/types/cms-analytics';
/**
 * Hook to track component interactions
 */
export declare function useAnalyticsTracker(componentId: string, componentType: string): {
    trackInteraction: (interactionType: InteractionType, metadata?: Record<string, any>) => void;
    trackClick: (event: MouseEvent, metadata?: Record<string, any>) => void;
    trackView: () => void;
    trackHover: (event: MouseEvent) => void;
    trackScroll: (scrollDepth: number) => void;
    trackConversion: (conversionGoal: string, value?: number) => void;
};
/**
 * Hook to auto-track component views using IntersectionObserver
 */
export declare function useComponentView(componentId: string, componentType: string, options?: IntersectionObserverInit): import("react").RefObject<HTMLElement>;
/**
 * Hook to track click heatmap
 */
export declare function useHeatmap(componentId: string, componentType: string): import("react").RefObject<HTMLElement>;
/**
 * Hook for A/B test variant selection
 */
export declare function useABTest(testId: string, componentId: string): {
    variant: ABTestVariant | null;
    isLoading: boolean;
    trackImpression: () => void;
    trackConversion: (value?: number) => void;
};
/**
 * Hook to track scroll depth
 */
export declare function useScrollDepth(componentId: string, componentType: string): import("react").RefObject<HTMLElement>;
/**
 * Hook to track time on component
 */
export declare function useEngagementTime(componentId: string, componentType: string): void;
/**
 * Hook to track form interactions
 */
export declare function useFormAnalytics(formId: string, fields: string[]): {
    trackFieldFocus: (fieldName: string) => void;
    trackFieldBlur: (fieldName: string) => void;
    trackFieldChange: (fieldName: string, value: any) => void;
    trackSubmit: (success: boolean, errors?: Record<string, string>) => void;
};
/**
 * Hook to track performance metrics
 */
export declare function usePerformanceTracking(componentId: string, componentType: string): {
    measureRender: (renderName: string) => void;
};
//# sourceMappingURL=useCMSAnalytics.d.ts.map