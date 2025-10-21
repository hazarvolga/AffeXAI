export interface EmailCampaign {
    id: string;
    name: string;
    subject: string;
    content: string;
    status: 'draft' | 'scheduled' | 'sending' | 'sent';
    scheduledAt?: string;
    sentAt?: string;
    totalRecipients: number;
    sentCount: number;
    openedCount: number;
    clickedCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface CreateCampaignDto {
    name: string;
    subject: string;
    content: string;
    status?: 'draft' | 'scheduled';
    scheduledAt?: string;
}
export interface UpdateCampaignDto {
    name?: string;
    subject?: string;
    content?: string;
    status?: 'draft' | 'scheduled';
    scheduledAt?: string;
}
declare class EmailCampaignsService {
    getAllCampaigns(): Promise<EmailCampaign[]>;
    getCampaignById(id: string): Promise<EmailCampaign>;
    createCampaign(campaignData: CreateCampaignDto): Promise<EmailCampaign>;
    updateCampaign(id: string, campaignData: UpdateCampaignDto): Promise<EmailCampaign>;
    deleteCampaign(id: string): Promise<void>;
    sendCampaign(id: string): Promise<void>;
    getCampaignStats(id: string): Promise<any>;
}
declare const _default: EmailCampaignsService;
export default _default;
//# sourceMappingURL=emailCampaignsService.d.ts.map