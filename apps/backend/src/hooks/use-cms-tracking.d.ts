interface UsePageViewTrackingOptions {
    pageId: string;
    pageTitle: string;
    category?: string;
}
/**
 * Hook to track page views automatically
 */
export declare const usePageViewTracking: ({ pageId, pageTitle, category, }: UsePageViewTrackingOptions) => void;
/**
 * Hook to track link clicks
 */
export declare const useLinkClickTracking: (pageId?: string) => any;
/**
 * Hook to track CMS activities (edit, publish)
 */
export declare const useActivityTracking: () => any;
export {};
//# sourceMappingURL=use-cms-tracking.d.ts.map