import { Repository } from 'typeorm';
import { AnalyticsEvent, AnalyticsSession, ABTest } from '../entities';
import { AnalyticsQueryDto } from '../dto';
export interface DashboardOverview {
    totalViews: number;
    totalInteractions: number;
    averageEngagementTime: number;
    conversionRate: number;
    changeFromPrevious: {
        views: number;
        interactions: number;
        engagementTime: number;
        conversionRate: number;
    };
}
export interface TopComponent {
    componentId: string;
    componentType: string;
    pageUrl: string;
    interactionRate: number;
    conversions: number;
}
export interface TimelinePoint {
    timestamp: Date;
    views: number;
    interactions: number;
    conversions: number;
}
export interface DashboardData {
    overview: DashboardOverview;
    topComponents: TopComponent[];
    timeline: TimelinePoint[];
    deviceDistribution: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    recentSessions: any[];
}
export declare class AnalyticsDashboardService {
    private readonly eventRepository;
    private readonly sessionRepository;
    private readonly abTestRepository;
    constructor(eventRepository: Repository<AnalyticsEvent>, sessionRepository: Repository<AnalyticsSession>, abTestRepository: Repository<ABTest>);
    /**
     * Get dashboard data
     */
    getDashboardData(query: AnalyticsQueryDto): Promise<DashboardData>;
    /**
     * Get overview metrics with comparison
     */
    private getOverview;
    /**
     * Get top performing components
     */
    private getTopComponents;
    /**
     * Get timeline data
     */
    private getTimeline;
    /**
     * Get device distribution
     */
    private getDeviceDistribution;
    /**
     * Get recent sessions
     */
    private getRecentSessions;
    /**
     * Helper: Count events
     */
    private countEvents;
    /**
     * Helper: Get average engagement time
     */
    private getAverageEngagement;
    /**
     * Helper: Get conversion rate
     */
    private getConversionRate;
    /**
     * Helper: Calculate percentage change
     */
    private calculatePercentageChange;
    /**
     * Helper: Get date range from time range enum
     */
    private getDateRange;
    /**
     * Helper: Get previous period dates
     */
    private getPreviousPeriod;
}
//# sourceMappingURL=analytics-dashboard.service.d.ts.map