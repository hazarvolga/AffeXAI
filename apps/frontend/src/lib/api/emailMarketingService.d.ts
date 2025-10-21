import { BaseApiService } from './base-service';
import type { EmailCampaign, CreateCampaignDto, UpdateCampaignDto, Subscriber, CreateSubscriberDto, UpdateSubscriberDto, EmailTemplate, CreateTemplateDto, UpdateTemplateDto } from '@affexai/shared-types';
export type { EmailCampaign as Campaign, CreateCampaignDto, UpdateCampaignDto, Subscriber, CreateSubscriberDto, UpdateSubscriberDto, EmailTemplate, CreateTemplateDto as CreateEmailTemplateDto, UpdateTemplateDto as UpdateEmailTemplateDto, };
/**
 * Email Marketing Service
 * Handles campaigns, subscribers, and email templates
 */
declare class EmailMarketingService extends BaseApiService<EmailCampaign, CreateCampaignDto, UpdateCampaignDto> {
    constructor();
    /**
     * Get all campaigns
     */
    getCampaigns(): Promise<EmailCampaign[]>;
    /**
     * Send a campaign
     */
    sendCampaign(campaignId: string): Promise<EmailCampaign>;
    /**
     * Schedule a campaign
     */
    scheduleCampaign(campaignId: string, scheduledDate: string): Promise<EmailCampaign>;
    /**
     * Get campaign analytics
     */
    getCampaignAnalytics(campaignId: string): Promise<any>;
    getSubscribers(): Promise<Subscriber[]>;
    createSubscriber(data: CreateSubscriberDto): Promise<Subscriber>;
    updateSubscriber(id: string, data: UpdateSubscriberDto): Promise<Subscriber>;
    deleteSubscriber(id: string): Promise<void>;
    getTemplates(): Promise<EmailTemplate[]>;
    getTemplateById(id: string): Promise<EmailTemplate>;
    createTemplate(data: CreateTemplateDto): Promise<EmailTemplate>;
    updateTemplate(id: string, data: UpdateTemplateDto): Promise<EmailTemplate>;
    deleteTemplate(id: string): Promise<void>;
}
export declare const emailMarketingService: EmailMarketingService;
export default emailMarketingService;
//# sourceMappingURL=emailMarketingService.d.ts.map