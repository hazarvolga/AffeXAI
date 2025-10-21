import { Repository } from 'typeorm';
import { EmailCampaign } from '../entities/email-campaign.entity';
import { EmailCampaignVariant, VariantStatus } from '../entities/email-campaign-variant.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { CreateAbTestDto, SendAbTestDto, UpdateVariantDto } from '../dto/ab-test.dto';
import { AbTestStatisticsService } from './ab-test-statistics.service';
/**
 * A/B Test Service
 * Manages creation, execution, and analysis of email campaign A/B tests
 */
export declare class AbTestService {
    private campaignRepo;
    private variantRepo;
    private subscriberRepo;
    private statsService;
    private readonly logger;
    constructor(campaignRepo: Repository<EmailCampaign>, variantRepo: Repository<EmailCampaignVariant>, subscriberRepo: Repository<Subscriber>, statsService: AbTestStatisticsService);
    /**
     * Create a new A/B test for a campaign
     */
    createAbTest(dto: CreateAbTestDto): Promise<EmailCampaign>;
    /**
     * Update a variant's content
     */
    updateVariant(campaignId: string, variantId: string, dto: UpdateVariantDto): Promise<EmailCampaignVariant>;
    /**
     * Get A/B test results with statistical analysis
     */
    getAbTestResults(campaignId: string): Promise<{
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
            status: VariantStatus;
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
            interval: import("./ab-test-statistics.service").ConfidenceInterval;
        }[];
    }>;
    /**
     * Manually select a winner for the A/B test
     */
    selectWinner(campaignId: string, variantId: string): Promise<EmailCampaign>;
    /**
     * Send A/B test - distribute variants to subscribers
     */
    sendAbTest(dto: SendAbTestDto): Promise<{
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
     * Auto-select winner based on statistical significance
     * Runs as a cron job every hour
     */
    autoSelectWinners(): Promise<void>;
    /**
     * Get A/B test summary for a campaign
     */
    getAbTestSummary(campaignId: string): Promise<{
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
     * Delete an A/B test (and all its variants)
     */
    deleteAbTest(campaignId: string): Promise<void>;
    /**
     * Distribute subscribers to variants based on split percentages
     */
    private distributeToVariants;
    /**
     * Fisher-Yates shuffle algorithm for randomization
     */
    private shuffleArray;
}
//# sourceMappingURL=ab-test.service.d.ts.map