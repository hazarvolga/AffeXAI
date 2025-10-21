import { EmailLog } from './email-log.entity';
import { EmailCampaignVariant } from './email-campaign-variant.entity';
import { CampaignStatus } from '@affexai/shared-types';
export declare class EmailCampaign {
    id: string;
    name: string;
    subject: string;
    content: string;
    status: CampaignStatus | string;
    scheduledAt: Date;
    sentAt: Date;
    totalRecipients: number;
    sentCount: number;
    openedCount: number;
    clickedCount: number;
    bounceCount: number;
    isAbTest: boolean;
    testType: string;
    winnerCriteria: string;
    autoSelectWinner: boolean;
    winnerSelectionDate: Date;
    selectedWinnerId: string;
    selectedWinner: EmailCampaignVariant;
    testDuration: number;
    confidenceLevel: number;
    minSampleSize: number;
    testStatus: string;
    variants: EmailCampaignVariant[];
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    logs: EmailLog[];
    /**
     * Check if campaign is an A/B test
     */
    isAbTestCampaign(): boolean;
    /**
     * Check if A/B test has a winner
     */
    hasWinner(): boolean;
    /**
     * Check if A/B test is completed
     */
    isTestCompleted(): boolean;
    /**
     * Get the winning variant
     */
    getWinner(): EmailCampaignVariant | null;
}
//# sourceMappingURL=email-campaign.entity.d.ts.map