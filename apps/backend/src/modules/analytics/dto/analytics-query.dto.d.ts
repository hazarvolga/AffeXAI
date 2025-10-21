export declare enum AnalyticsTimeRange {
    TODAY = "today",
    YESTERDAY = "yesterday",
    LAST_7_DAYS = "last7days",
    LAST_30_DAYS = "last30days",
    LAST_90_DAYS = "last90days",
    CUSTOM = "custom"
}
export declare class AnalyticsQueryDto {
    timeRange: AnalyticsTimeRange;
    customStartDate?: string;
    customEndDate?: string;
    pageUrl?: string;
    componentType?: string;
    deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
    userSegment?: string;
}
export declare class HeatmapQueryDto {
    componentId: string;
    pageUrl?: string;
    timeRange: AnalyticsTimeRange;
    customStartDate?: string;
    customEndDate?: string;
}
//# sourceMappingURL=analytics-query.dto.d.ts.map