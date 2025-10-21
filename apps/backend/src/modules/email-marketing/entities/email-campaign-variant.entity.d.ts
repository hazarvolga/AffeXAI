import { EmailCampaign } from './email-campaign.entity';
export declare enum VariantStatus {
    DRAFT = "draft",
    TESTING = "testing",
    WINNER = "winner",
    LOSER = "loser"
}
/**
 * Email Campaign Variant Entity
 * Represents different versions of an email campaign for A/B testing
 */
export declare class EmailCampaignVariant {
    id: string;
    campaignId: string;
    campaign: EmailCampaign;
    variantLabel: string;
    subject: string;
    content: string;
    fromName: string;
    sendTimeOffset: number;
    splitPercentage: number;
    status: VariantStatus;
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
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    calculateRates(): void;
    /**
     * Get the rate for a specific metric
     */
    getRate(metric: 'open' | 'click' | 'conversion'): number;
    /**
     * Increment a metric count
     */
    incrementMetric(metric: 'sent' | 'opened' | 'clicked' | 'conversion' | 'bounce' | 'unsubscribe'): void;
    /**
     * Check if variant is the winner
     */
    isWinner(): boolean;
    /**
     * Check if variant has minimum sample size
     */
    hasMinimumSample(minSize: number): boolean;
}
//# sourceMappingURL=email-campaign-variant.entity.d.ts.map