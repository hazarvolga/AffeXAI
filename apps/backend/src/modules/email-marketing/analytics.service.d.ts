import { Repository } from 'typeorm';
import { AnalyticsDashboardData, OverviewMetrics, CampaignAnalytics, SubscriberGrowth, EmailEngagement, RevenueMetrics, TopPerformingCampaigns, AbTestSummary } from './dto/analytics.dto';
import { EmailCampaign } from './entities/email-campaign.entity';
import { Subscriber } from './entities/subscriber.entity';
import { EmailLog } from './entities/email-log.entity';
export declare class AnalyticsService {
    private campaignRepository;
    private subscriberRepository;
    private emailLogRepository;
    constructor(campaignRepository: Repository<EmailCampaign>, subscriberRepository: Repository<Subscriber>, emailLogRepository: Repository<EmailLog>);
    getDashboardData(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<AnalyticsDashboardData>;
    getOverviewMetrics(startDate?: string, endDate?: string): Promise<OverviewMetrics>;
    getCampaignAnalytics(startDate?: string, endDate?: string, limit?: number): Promise<CampaignAnalytics[]>;
    getSubscriberGrowth(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<SubscriberGrowth[]>;
    getEmailEngagement(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<EmailEngagement[]>;
    getRevenueMetrics(startDate?: string, endDate?: string, period?: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<RevenueMetrics[]>;
    getTopCampaigns(startDate?: string, endDate?: string, limit?: number, sortBy?: 'openRate' | 'clickRate' | 'conversionRate' | 'revenue' | 'score'): Promise<TopPerformingCampaigns[]>;
    getAbTestSummary(startDate?: string, endDate?: string, limit?: number): Promise<AbTestSummary[]>;
    compareCampaigns(campaignIds: string[], metrics: string[]): Promise<{
        campaigns: CampaignAnalytics[];
        comparison: Record<string, any>;
    }>;
    getDataStatus(): Promise<{
        campaigns: number;
        subscribers: number;
        emailLogs: number;
        recentCampaigns: any[];
    }>;
    exportData(type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue', format?: 'csv' | 'excel', startDate?: string, endDate?: string): Promise<string>;
    private getDateRange;
    private generateDateIntervals;
}
//# sourceMappingURL=analytics.service.d.ts.map