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
    testType: string;
    status: string;
    winnerVariant?: string;
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
/**
 * Analytics Service
 * Handles email marketing analytics and reporting
 */
declare class AnalyticsService {
    private readonly endpoint;
    private readonly useMockData;
    /**
     * Generate mock dashboard data
     */
    private generateMockDashboardData;
    /**
     * Get complete dashboard data
     */
    getDashboardData(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<AnalyticsDashboardData>;
    /**
     * Get overview metrics
     */
    getOverviewMetrics(startDate?: string, endDate?: string): Promise<OverviewMetrics>;
    /**
     * Get campaign analytics
     */
    getCampaignAnalytics(startDate?: string, endDate?: string, limit?: number): Promise<CampaignAnalytics[]>;
    /**
     * Get subscriber growth data
     */
    getSubscriberGrowth(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<SubscriberGrowth[]>;
    /**
     * Get email engagement metrics
     */
    getEmailEngagement(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<EmailEngagement[]>;
    /**
     * Get revenue metrics
     */
    getRevenueMetrics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<RevenueMetrics[]>;
    /**
     * Get top performing campaigns
     */
    getTopCampaigns(startDate?: string, endDate?: string, limit?: number, sortBy?: 'openRate' | 'clickRate' | 'conversionRate' | 'revenue' | 'score'): Promise<TopPerformingCampaigns[]>;
    /**
     * Get A/B test summary
     */
    getAbTestSummary(startDate?: string, endDate?: string, limit?: number): Promise<AbTestSummary[]>;
    /**
     * Get campaign performance comparison
     */
    compareCampaigns(campaignIds: string[], metrics?: string[]): Promise<{
        campaigns: CampaignAnalytics[];
        comparison: Record<string, any>;
    }>;
    /**
     * Export analytics data
     */
    exportData(type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue', format?: 'csv' | 'excel', startDate?: string, endDate?: string): Promise<Blob>;
}
export declare const analyticsService: AnalyticsService;
export default analyticsService;
//# sourceMappingURL=analyticsService.d.ts.map