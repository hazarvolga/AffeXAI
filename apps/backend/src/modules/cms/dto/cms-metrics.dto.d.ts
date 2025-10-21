import { MetricType } from '../entities/cms-metric.entity';
export declare class TrackPageViewDto {
    pageId: string;
    pageTitle: string;
    category?: string;
    visitorId?: string;
}
export declare class TrackLinkClickDto {
    linkUrl: string;
    linkText?: string;
    pageId?: string;
    visitorId?: string;
}
export declare class TrackActivityDto {
    activityType: MetricType;
    pageId: string;
    pageTitle?: string;
    category?: string;
}
export declare class GetMetricsQueryDto {
    period?: 'day' | 'week' | 'month';
}
export declare class PageViewMetric {
    pageId: string;
    pageTitle: string;
    viewCount: number;
    uniqueVisitors: number;
}
export declare class LinkClickMetric {
    linkUrl: string;
    linkText: string;
    clickCount: number;
    uniqueVisitors: number;
}
export declare class CategoryEngagementMetric {
    category: string;
    views: number;
    clicks: number;
}
export declare class MetricsSummary {
    totalViews: number;
    uniqueVisitors: number;
    totalClicks: number;
    uniqueLinks: number;
    edits: number;
    publishes: number;
}
export declare class CmsMetricsResponseDto {
    summary: MetricsSummary;
    topPages: PageViewMetric[];
    topLinks: LinkClickMetric[];
    categoryEngagement: CategoryEngagementMetric[];
}
//# sourceMappingURL=cms-metrics.dto.d.ts.map