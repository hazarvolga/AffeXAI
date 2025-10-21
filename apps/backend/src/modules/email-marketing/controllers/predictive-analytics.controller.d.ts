import { PredictiveAnalyticsService } from '../services/predictive-analytics.service';
export declare class PredictiveAnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: PredictiveAnalyticsService);
    /**
     * Get campaign performance prediction
     */
    predictCampaignPerformance(body: {
        campaignId: string;
        subscriberIds: string[];
    }): Promise<{
        prediction: import("../services/predictive-analytics.service").CampaignPrediction;
        summary: {
            expectedReach: number;
            expectedOpens: number;
            expectedClicks: number;
            performanceLevel: string;
        };
        visualization: {
            openRateChart: {
                current: number;
                industry: number;
            };
            clickRateChart: {
                current: number;
                industry: number;
            };
        };
    }>;
    /**
     * Get subscriber engagement score
     */
    getSubscriberEngagement(subscriberId: string): Promise<{
        visual: {
            scoreColor: string;
            categoryIcon: string;
            trend: string;
        };
        recommendations: string[];
        subscriberId: string;
        score: number;
        category: "highly-engaged" | "moderately-engaged" | "at-risk" | "inactive";
        lastEngagement: Date | null;
        totalInteractions: number;
    }>;
    /**
     * Get churn risk analysis
     */
    getChurnRisk(subscriberId: string): Promise<{
        visual: {
            riskColor: string;
            daysUntilChurn: number;
        };
        urgency: string;
        subscriberId: string;
        riskScore: number;
        riskLevel: "low" | "medium" | "high" | "critical";
        daysInactive: number;
        predictedChurnDate: Date;
        retentionActions: string[];
    }>;
    /**
     * Get AI-powered insights
     */
    getAIInsights(campaignId?: string): Promise<{
        insights: import("../services/predictive-analytics.service").AIInsight[];
        summary: {
            totalInsights: number;
            actionableInsights: number;
            highImpactInsights: number;
        };
        categories: {
            trends: import("../services/predictive-analytics.service").AIInsight[];
            warnings: import("../services/predictive-analytics.service").AIInsight[];
            opportunities: import("../services/predictive-analytics.service").AIInsight[];
            anomalies: import("../services/predictive-analytics.service").AIInsight[];
        };
    }>;
    /**
     * Get dashboard metrics
     */
    getDashboardMetrics(): Promise<{
        visual: {
            engagementGauge: {
                value: number;
                color: string;
                label: string;
            };
            riskAlert: {
                show: boolean;
                message: string;
                severity: string;
            };
            growthIndicator: {
                value: number;
                isPositive: boolean;
                percentage: number;
            };
        };
        recommendations: string[];
        averageEngagementScore: number;
        atRiskSubscribers: number;
        predictedMonthlyGrowth: number;
        topPerformingSegments: Array<{
            name: string;
            score: number;
        }>;
        insights: import("../services/predictive-analytics.service").AIInsight[];
    }>;
    /**
     * Helper methods
     */
    private getPerformanceLevel;
    private getScoreColor;
    private getCategoryIcon;
    private getEngagementTrend;
    private getEngagementRecommendations;
    private getRiskColor;
    private getUrgencyLevel;
    private getEngagementLabel;
    private getDashboardRecommendations;
}
//# sourceMappingURL=predictive-analytics.controller.d.ts.map