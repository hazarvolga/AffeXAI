import { AbTestService } from '../services/ab-test.service';
import { CreateAbTestDto, UpdateVariantDto, SendAbTestDto, SelectWinnerDto } from '../dto/ab-test.dto';
/**
 * A/B Test Controller
 * Handles all A/B testing operations for email campaigns
 */
export declare class AbTestController {
    private readonly abTestService;
    constructor(abTestService: AbTestService);
    /**
     * Create a new A/B test for a campaign
     */
    createAbTest(dto: CreateAbTestDto): Promise<import("../entities/email-campaign.entity").EmailCampaign>;
    /**
     * Get A/B test results with statistical analysis
     */
    getResults(campaignId: string): Promise<{
        campaign: {
            id: string;
            name: string;
            testType: string;
            winnerCriteria: string;
            testStatus: string;
            autoSelectWinner: boolean;
            winnerSelectionDate: Date;
            selectedWinnerId: string;
            testDuration: number;
            confidenceLevel: number;
            minSampleSize: number;
            sentAt: Date;
        };
        variants: {
            id: string;
            label: string;
            status: import("../entities/email-campaign-variant.entity").VariantStatus;
            subject: string;
            content: string;
            fromName: string;
            splitPercentage: number;
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
        }[];
        statistics: {
            hasMinimumSample: boolean;
            testDurationElapsed: boolean;
            canDeclareWinner: boolean;
            isSignificant: boolean;
            pValue: number;
            confidenceLevel: number;
            chiSquare: number;
            degreesOfFreedom: number;
            winner?: string;
            message: string;
            details: {
                sampleSizes: Record<string, number>;
                successRates: Record<string, number>;
                expectedValues: Record<string, number>;
                observedValues: Record<string, number>;
            };
        };
        confidenceIntervals: {
            label: string;
            interval: import("../services/ab-test-statistics.service").ConfidenceInterval;
        }[];
    }>;
    /**
     * Get A/B test summary
     */
    getSummary(campaignId: string): Promise<{
        id: string;
        name: string;
        testType: string;
        winnerCriteria: string;
        testStatus: string;
        variantCount: number;
        hasWinner: boolean;
        winner: {
            id: string;
            label: string;
            subject: string;
        } | null;
        winnerSelectionDate: Date;
        sentAt: Date;
        testDuration: number;
    }>;
    /**
     * Update a variant's content
     */
    updateVariant(campaignId: string, variantId: string, dto: UpdateVariantDto): Promise<import("../entities/email-campaign-variant.entity").EmailCampaignVariant>;
    /**
     * Send A/B test (start the test)
     */
    sendAbTest(campaignId: string, dto: SendAbTestDto): Promise<{
        message: string;
        totalRecipients: number;
        distributions: {
            variantLabel: string;
            variantId: string;
            recipientCount: number;
            splitPercentage: number;
        }[];
        campaign: {
            id: string;
            name: string;
            testStatus: string;
            sentAt: Date;
        };
    }>;
    /**
     * Manually select winner
     */
    selectWinner(campaignId: string, dto: SelectWinnerDto): Promise<import("../entities/email-campaign.entity").EmailCampaign>;
    /**
     * Delete A/B test
     */
    deleteAbTest(campaignId: string): Promise<void>;
}
//# sourceMappingURL=ab-test.controller.d.ts.map