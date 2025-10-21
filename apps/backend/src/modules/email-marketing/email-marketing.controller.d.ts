import { EmailMarketingService } from './email-marketing.service';
export declare class EmailMarketingController {
    private readonly emailService;
    constructor(emailService: EmailMarketingService);
    sendEmail(emailData: {
        to: string;
        subject: string;
        body: string;
    }): Promise<{
        message: string;
    }>;
    sendCampaignEmail(campaignData: {
        to: string;
        subject: string;
        body: string;
        campaignId: string;
        recipientId: string;
    }): Promise<{
        message: string;
    }>;
    getQueueStatus(): Promise<any>;
}
//# sourceMappingURL=email-marketing.controller.d.ts.map