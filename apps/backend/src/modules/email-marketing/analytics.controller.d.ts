import type { Response } from 'express';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDashboardData, OverviewMetrics, CampaignAnalytics, SubscriberGrowth, EmailEngagement, RevenueMetrics, TopPerformingCampaigns, AbTestSummary } from './dto/analytics.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboardData(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<AnalyticsDashboardData>;
    getOverviewMetrics(startDate?: string, endDate?: string): Promise<OverviewMetrics>;
    getCampaignAnalytics(startDate?: string, endDate?: string, limit?: number): Promise<CampaignAnalytics[]>;
    getSubscriberGrowth(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<SubscriberGrowth[]>;
    getEmailEngagement(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<EmailEngagement[]>;
    getRevenueMetrics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month'): Promise<RevenueMetrics[]>;
    getTopCampaigns(startDate?: string, endDate?: string, limit?: number, sortBy?: 'openRate' | 'clickRate' | 'conversionRate' | 'revenue' | 'score'): Promise<TopPerformingCampaigns[]>;
    getAbTestSummary(startDate?: string, endDate?: string, limit?: number): Promise<AbTestSummary[]>;
    compareCampaigns(body: {
        campaignIds: string[];
        metrics: string[];
    }): Promise<{
        campaigns: CampaignAnalytics[];
        comparison: Record<string, any>;
    }>;
    getDataStatus(): Promise<{
        campaigns: number;
        subscribers: number;
        emailLogs: number;
        recentCampaigns: any[];
    }>;
    exportData(type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue', format: "csv" | "excel" | undefined, startDate: string | undefined, endDate: string | undefined, res: Response): Promise<void>;
}
//# sourceMappingURL=analytics.controller.d.ts.map