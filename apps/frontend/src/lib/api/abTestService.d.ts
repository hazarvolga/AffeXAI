export interface AbTestVariant {
    id: string;
    label: string;
    subject?: string;
    content?: string;
    fromName?: string;
    sendTimeOffset?: number;
    splitPercentage: number;
    status: 'draft' | 'testing' | 'winner' | 'loser';
    sentCount: number;
    openedCount: number;
    clickedCount: number;
    conversionCount: number;
    revenue: number;
    bounceCount: number;
    unsubscribeCount: number;
    openRate?: number;
    clickRate?: number;
    conversionRate?: number;
}
export interface AbTestCampaign {
    id: string;
    name: string;
    testType: 'subject' | 'content' | 'send_time' | 'from_name' | 'combined';
    winnerCriteria: 'open_rate' | 'click_rate' | 'conversion_rate' | 'revenue';
    testStatus: 'draft' | 'testing' | 'completed';
    autoSelectWinner: boolean;
    testDuration: number;
    confidenceLevel: number;
    minSampleSize: number;
    winnerSelectionDate?: string;
    selectedWinnerId?: string;
    sentAt?: string;
    variants: AbTestVariant[];
}
export interface CreateAbTestDto {
    campaignId: string;
    testType: 'subject' | 'content' | 'send_time' | 'from_name' | 'combined';
    winnerCriteria: 'open_rate' | 'click_rate' | 'conversion_rate' | 'revenue';
    autoSelectWinner: boolean;
    testDuration: number;
    confidenceLevel: number;
    minSampleSize: number;
    variants: Array<{
        label: string;
        subject?: string;
        content?: string;
        fromName?: string;
        sendTimeOffset?: number;
        splitPercentage: number;
    }>;
}
export interface UpdateVariantDto {
    subject?: string;
    content?: string;
    fromName?: string;
    splitPercentage?: number;
}
export interface SendAbTestDto {
    campaignId: string;
    subscriberIds?: string[];
    segmentIds?: string[];
}
export interface AbTestResults {
    campaign: {
        id: string;
        name: string;
        testType: string;
        winnerCriteria: string;
        testStatus: string;
        autoSelectWinner: boolean;
        winnerSelectionDate?: string;
        selectedWinnerId?: string;
        testDuration: number;
        confidenceLevel: number;
        minSampleSize: number;
        sentAt?: string;
    };
    variants: Array<{
        id: string;
        label: string;
        status: string;
        sentCount: number;
        openedCount: number;
        clickedCount: number;
        conversionCount: number;
        revenue: number;
        openRate: number;
        clickRate: number;
        conversionRate: number;
    }>;
    statistics: {
        isSignificant: boolean;
        pValue: number;
        confidenceLevel: number;
        chiSquare: number;
        winner?: string;
        message: string;
        hasMinimumSample: boolean;
        canDeclareWinner: boolean;
        testDurationElapsed: boolean;
    };
    confidenceIntervals?: Array<{
        label: string;
        interval: {
            lower: number;
            upper: number;
            margin: number;
        };
    }>;
}
/**
 * A/B Test Service
 * Handles A/B testing operations for email campaigns
 */
declare class AbTestService {
    private readonly endpoint;
    /**
     * Create a new A/B test for a campaign
     */
    createAbTest(data: CreateAbTestDto): Promise<AbTestCampaign>;
    /**
     * Get A/B test results with statistical analysis
     */
    getResults(campaignId: string): Promise<AbTestResults>;
    /**
     * Get A/B test summary
     */
    getSummary(campaignId: string): Promise<AbTestCampaign>;
    /**
     * Update a variant's content
     */
    updateVariant(campaignId: string, variantId: string, data: UpdateVariantDto): Promise<AbTestVariant>;
    /**
     * Send A/B test (start the test)
     */
    sendAbTest(data: SendAbTestDto): Promise<{
        message: string;
        totalRecipients: number;
        distributions: Array<{
            variantLabel: string;
            variantId: string;
            recipientCount: number;
            splitPercentage: number;
        }>;
        campaign: {
            id: string;
            name: string;
            testStatus: string;
            sentAt: string;
        };
    }>;
    /**
     * Manually select winner
     */
    selectWinner(campaignId: string, variantId: string): Promise<AbTestCampaign>;
    /**
     * Delete A/B test
     */
    deleteAbTest(campaignId: string): Promise<void>;
}
export declare const abTestService: AbTestService;
export default abTestService;
//# sourceMappingURL=abTestService.d.ts.map