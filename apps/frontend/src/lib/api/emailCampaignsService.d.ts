import { BaseApiService } from './base-service';
import type { EmailCampaign, CreateCampaignDto, UpdateCampaignDto, CampaignStats } from '@affexai/shared-types';
export type { EmailCampaign, CreateCampaignDto, UpdateCampaignDto, CampaignStats, };
/**
 * Email Campaigns Service
 * Handles email campaign operations extending BaseApiService
 */
declare class EmailCampaignsService extends BaseApiService<EmailCampaign, CreateCampaignDto, UpdateCampaignDto> {
    constructor();
    /**
     * Send campaign to recipients
     */
    sendCampaign(id: string): Promise<void>;
    /**
     * Get campaign statistics
     */
    getCampaignStats(id: string): Promise<CampaignStats>;
    /**
     * Schedule a campaign for future sending
     */
    scheduleCampaign(id: string, scheduledAt: string): Promise<EmailCampaign>;
    /**
     * Cancel a scheduled campaign
     */
    cancelSchedule(id: string): Promise<EmailCampaign>;
    /**
     * Reschedule a campaign
     */
    rescheduleCampaign(id: string, scheduledAt: string): Promise<EmailCampaign>;
    /**
     * Get all scheduled campaigns
     */
    getScheduledCampaigns(): Promise<EmailCampaign[]>;
    /**
     * Get scheduling statistics
     */
    getSchedulingStats(): Promise<{
        totalScheduled: number;
        readyToSend: number;
        upcomingToday: number;
        upcomingThisWeek: number;
    }>;
}
export declare const emailCampaignsService: EmailCampaignsService;
export default emailCampaignsService;
//# sourceMappingURL=emailCampaignsService.d.ts.map