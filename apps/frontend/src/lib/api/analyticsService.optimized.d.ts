export interface CampaignAnalytics {
    campaignId: string;
    campaignName: string;
    sentCount: number;
    openedCount: number;
    clickedCount: number;
    conversionCount: number;
    revenue: number;
    bounceCount: number;
    unsubscribeCount: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    bounceRate: number;
    unsubscribeRate: number;
    sentAt: string;
    status: string;
}
export interface SubscriberGrowth {
    date: string;
    totalSubscribers: number;
    newSubscribers: number;
    unsubscribes: number;
    netGrowth: number;
    growthRate: number;
}
export interface EmailEngagement {
    date: string;
    emailsSent: number;
    uniqueOpens: number;
    uniqueClicks: number;
    openRate: number;
    clickRate: number;
    avgTimeToOpen: number;
    avgTimeToClick: number;
}
export interface RevenueMetrics {
    date: string;
    revenue: number;
    conversions: number;
    averageOrderValue: number;
    revenuePerEmail: number;
    conversionRate: number;
}
export interface TopPerformingCampaigns {
    campaignId: string;
    campaignName: string;
    sentAt: string;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    revenue: number;
    score: number;
}
export interface AbTestSummary {
    testId: string;
    campaignName: string;
    testType: 'subject' | 'content' | 'send_time';
    status: 'running' | 'completed' | 'paused';
    winnerVariant?: 'A' | 'B';
    improvementPercentage?: number;
    confidenceLevel: number;
    createdAt: string;
    completedAt?: string;
}
export interface OverviewMetrics {
    totalCampaigns: number;
    totalSubscribers: number;
    totalEmailsSent: number;
    averageOpenRate: number;
    averageClickRate: number;
    totalRevenue: number;
    activeCampaigns: number;
    activeAbTests: number;
    subscriberGrowthRate: number;
    engagementTrend: 'up' | 'down' | 'stable';
}
export interface AnalyticsDateRange {
    startDate: string;
    endDate: string;
    period: 'day' | 'week' | 'month' | 'quarter' | 'year';
}
export interface AnalyticsDashboardData {
    overview: OverviewMetrics;
    campaignAnalytics: CampaignAnalytics[];
    subscriberGrowth: SubscriberGrowth[];
    emailEngagement: EmailEngagement[];
    revenueMetrics: RevenueMetrics[];
    topCampaigns: TopPerformingCampaigns[];
    abTestSummary: AbTestSummary[];
    dateRange: AnalyticsDateRange;
}
export interface ComparisonResult {
    campaigns: CampaignAnalytics[];
    comparison: Record<string, {
        average: number;
        min: number;
        max: number;
    }>;
}
/**
 * Analytics Service
 * Handles all analytics and reporting API calls with caching and retry logic
 */
declare class AnalyticsService {
    private readonly endpoint;
    private cache;
    /**
     * ✅ OPTIMIZATION: Retry logic for failed requests
     */
    private fetchWithRetry;
    /**
     * ✅ OPTIMIZATION: Generic cached fetch method
     */
    private cachedFetch;
    /**
     * Get complete dashboard data
     */
    getDashboardData(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year', skipCache?: boolean): Promise<AnalyticsDashboardData>;
    /**
     * Get overview metrics
     */
    getOverviewMetrics(startDate?: string, endDate?: string, skipCache?: boolean): Promise<OverviewMetrics>;
    /**
     * Get campaign analytics
     */
    getCampaignAnalytics(startDate?: string, endDate?: string, limit?: number, skipCache?: boolean): Promise<CampaignAnalytics[]>;
    /**
     * Get subscriber growth data
     */
    getSubscriberGrowth(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month', skipCache?: boolean): Promise<SubscriberGrowth[]>;
    /**
     * Get email engagement data
     */
    getEmailEngagement(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month', skipCache?: boolean): Promise<EmailEngagement[]>;
    /**
     * Get revenue metrics
     */
    getRevenueMetrics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month', skipCache?: boolean): Promise<RevenueMetrics[]>;
    /**
     * Get top performing campaigns
     */
    getTopCampaigns(startDate?: string, endDate?: string, limit?: number, sortBy?: 'openRate' | 'clickRate' | 'conversionRate' | 'revenue' | 'score', skipCache?: boolean): Promise<TopPerformingCampaigns[]>;
    /**
     * Get A/B test summary
     */
    getAbTestSummary(startDate?: string, endDate?: string, limit?: number, skipCache?: boolean): Promise<AbTestSummary[]>;
    /**
     * Compare multiple campaigns
     */
    compareCampaigns(campaignIds: string[], metrics: string[]): Promise<ComparisonResult>;
    /**
     * Export analytics data
     */
    exportData(type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue', format?: 'csv' | 'excel', startDate?: string, endDate?: string): Promise<Blob>;
    /**
     * ✅ OPTIMIZATION: Download exported data
     */
    downloadExport(type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue', format?: 'csv' | 'excel', startDate?: string, endDate?: string): Promise<void>;
    /**
     * Clear cache
     */
    clearCache(): void;
    /**
     * Get debug data status
     */
    getDataStatus(): Promise<{
        campaigns: number;
        subscribers: number;
        emailLogs: number;
        recentCampaigns: any[];
    }>;
}
export declare const analyticsService: AnalyticsService;
export {};
//# sourceMappingURL=analyticsService.optimized.d.ts.map