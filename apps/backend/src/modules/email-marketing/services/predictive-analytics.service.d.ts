import { Repository } from 'typeorm';
import { EmailCampaign } from '../entities/email-campaign.entity';
import { EmailLog } from '../entities/email-log.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { EmailOpenHistory } from '../entities/email-open-history.entity';
export interface CampaignPrediction {
    expectedOpenRate: number;
    expectedClickRate: number;
    expectedConversionRate: number;
    confidenceScore: number;
    riskFactors: string[];
    recommendations: string[];
    performanceScore: number;
}
export interface EngagementScore {
    subscriberId: string;
    score: number;
    category: 'highly-engaged' | 'moderately-engaged' | 'at-risk' | 'inactive';
    lastEngagement: Date | null;
    totalInteractions: number;
}
export interface ChurnRisk {
    subscriberId: string;
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    daysInactive: number;
    predictedChurnDate: Date;
    retentionActions: string[];
}
export interface AIInsight {
    type: 'trend' | 'anomaly' | 'opportunity' | 'warning';
    title: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
    actionable: boolean;
    suggestedAction?: string;
}
export declare class PredictiveAnalyticsService {
    private readonly campaignRepository;
    private readonly emailLogRepository;
    private readonly subscriberRepository;
    private readonly openHistoryRepository;
    constructor(campaignRepository: Repository<EmailCampaign>, emailLogRepository: Repository<EmailLog>, subscriberRepository: Repository<Subscriber>, openHistoryRepository: Repository<EmailOpenHistory>);
    /**
     * Kampanya performansını tahmin et
     */
    predictCampaignPerformance(campaignId: string, subscriberIds: string[]): Promise<CampaignPrediction>;
    /**
     * Abone engagement skorunu hesapla
     */
    calculateEngagementScore(subscriberId: string): Promise<EngagementScore>;
    /**
     * Churn (kayıp) riskini hesapla
     */
    calculateChurnRisk(subscriberId: string): Promise<ChurnRisk>;
    /**
     * AI destekli içgörüler oluştur
     */
    generateAIInsights(campaignId?: string): Promise<AIInsight[]>;
    /**
     * Dashboard için özet metrikleri al
     */
    getDashboardMetrics(): Promise<{
        averageEngagementScore: number;
        atRiskSubscribers: number;
        predictedMonthlyGrowth: number;
        topPerformingSegments: Array<{
            name: string;
            score: number;
        }>;
        insights: AIInsight[];
    }>;
}
//# sourceMappingURL=predictive-analytics.service.d.ts.map