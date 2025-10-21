import { Queue } from 'bullmq';
export declare class EmailMarketingService {
    private emailQueue;
    private readonly logger;
    constructor(emailQueue: Queue);
    sendEmail(to: string, subject: string, body: string): Promise<void>;
    sendCampaignEmail(to: string, subject: string, body: string, campaignId: string, recipientId: string): Promise<void>;
    getQueueStatus(): Promise<any>;
}
//# sourceMappingURL=email-marketing.service.d.ts.map