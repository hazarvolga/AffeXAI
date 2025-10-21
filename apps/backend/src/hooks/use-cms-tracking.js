"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActivityTracking = exports.useLinkClickTracking = exports.usePageViewTracking = void 0;
const react_1 = require("react");
const cmsMetricsService_1 = require("@/lib/api/cmsMetricsService");
// Generate a visitor ID and store in localStorage
const getVisitorId = () => {
    if (typeof window === 'undefined')
        return '';
    let visitorId = localStorage.getItem('cms_visitor_id');
    if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cms_visitor_id', visitorId);
    }
    return visitorId;
};
/**
 * Hook to track page views automatically
 */
const usePageViewTracking = ({ pageId, pageTitle, category, }) => {
    (0, react_1.useEffect)(() => {
        if (!pageId)
            return;
        const trackPageView = async () => {
            try {
                await cmsMetricsService_1.cmsMetricsService.trackPageView({
                    pageId,
                    pageTitle,
                    category,
                    visitorId: getVisitorId(),
                });
            }
            catch (error) {
                console.error('Failed to track page view:', error);
            }
        };
        trackPageView();
    }, [pageId, pageTitle, category]);
};
exports.usePageViewTracking = usePageViewTracking;
/**
 * Hook to track link clicks
 */
const useLinkClickTracking = (pageId) => {
    const trackLinkClick = (0, react_1.useCallback)(async (linkUrl, linkText) => {
        try {
            await cmsMetricsService_1.cmsMetricsService.trackLinkClick({
                linkUrl,
                linkText,
                pageId,
                visitorId: getVisitorId(),
            });
        }
        catch (error) {
            console.error('Failed to track link click:', error);
        }
    }, [pageId]);
    return trackLinkClick;
};
exports.useLinkClickTracking = useLinkClickTracking;
/**
 * Hook to track CMS activities (edit, publish)
 */
const useActivityTracking = () => {
    const trackActivity = (0, react_1.useCallback)(async (activityType, pageId, pageTitle, category) => {
        try {
            await cmsMetricsService_1.cmsMetricsService.trackActivity({
                activityType,
                pageId,
                pageTitle,
                category,
            });
        }
        catch (error) {
            console.error('Failed to track activity:', error);
        }
    }, []);
    return trackActivity;
};
exports.useActivityTracking = useActivityTracking;
//# sourceMappingURL=use-cms-tracking.js.map