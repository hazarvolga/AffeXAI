import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailCampaignService } from '../email-campaign.service';
import { MailService } from '../../mail/mail.service';
export interface EmailJobData {
    to: string;
    subject: string;
    body: string;
    campaignId?: string;
    recipientId?: string;
}
export declare class EmailProcessor extends WorkerHost {
    private readonly campaignService;
    private readonly mailService;
    private readonly logger;
    constructor(campaignService: EmailCampaignService, mailService: MailService);
    process(job: Job<EmailJobData, any, string>): Promise<any>;
    private updateCampaignStats;
}
//# sourceMappingURL=email.processor.d.ts.map