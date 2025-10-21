import { EmailCampaign } from './email-campaign.entity';
export declare class EmailLog {
    id: string;
    campaignId: string;
    recipientEmail: string;
    status: string;
    sentAt: Date | null;
    openedAt: Date | null;
    clickedAt: Date | null;
    error: string | null;
    metadata: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
    campaign: EmailCampaign;
}
//# sourceMappingURL=email-log.entity.d.ts.map