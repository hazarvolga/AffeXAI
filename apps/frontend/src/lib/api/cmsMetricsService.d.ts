export interface PageView {
    pageId: string;
    pageTitle: string;
    viewCount: number;
    uniqueVisitors: number;
}
export interface LinkClick {
    linkUrl: string;
    linkText: string;
    clickCount: number;
    pageId?: string;
}
export interface CategoryEngagement {
    category: string;
    pageCount: number;
    totalViews: number;
    avgViewsPerPage: number;
}
export interface MetricsSummary {
    totalViews: number;
    uniqueVisitors: number;
    totalClicks: number;
    uniqueLinks: number;
    edits: number;
    publishes: number;
}
export interface CmsMetrics {
    summary: MetricsSummary;
    topPages: PageView[];
    topLinks: LinkClick[];
    categoryEngagement: CategoryEngagement[];
}
/**
 * CMS Metrics Service
 * Tracks page views, link clicks, and content activity
 */
declare class CmsMetricsService {
    private readonly endpoint;
    getMetrics(period?: 'day' | 'week' | 'month'): Promise<CmsMetrics>;
    trackPageView(pageId: string, pageTitle: string): Promise<void>;
    trackLinkClick(linkUrl: string, linkText: string, pageId?: string): Promise<void>;
    trackActivity(action: 'edit' | 'publish' | 'draft' | 'unpublish', pageId: string): Promise<void>;
}
export declare const cmsMetricsService: CmsMetricsService;
export {};
//# sourceMappingURL=cmsMetricsService.d.ts.map