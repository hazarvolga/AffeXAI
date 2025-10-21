import { Repository } from 'typeorm';
import { EmailCampaign } from './entities/email-campaign.entity';
import { EmailCampaignService } from './email-campaign.service';
/**
 * Campaign Scheduler Service
 * Handles scheduled campaign execution using cron jobs
 */
export declare class CampaignSchedulerService {
    private campaignRepository;
    private emailCampaignService;
    private readonly logger;
    constructor(campaignRepository: Repository<EmailCampaign>, emailCampaignService: EmailCampaignService);
    /**
     * Schedule a campaign for future sending
     */
    scheduleCampaign(campaignId: string, scheduledAt: Date): Promise<EmailCampaign>;
    /**
     * Cancel a scheduled campaign
     */
    cancelScheduledCampaign(campaignId: string): Promise<EmailCampaign>;
    /**
     * Reschedule a campaign
     */
    rescheduleCampaign(campaignId: string, newScheduledAt: Date): Promise<EmailCampaign>;
    /**
     * Get all scheduled campaigns
     */
    getScheduledCampaigns(): Promise<EmailCampaign[]>;
    /**
     * Get campaigns ready to be sent (scheduled time has passed)
     */
    getCampaignsReadyToSend(): Promise<EmailCampaign[]>;
    /**
     * Cron job to check and send scheduled campaigns
     * Runs every minute to check for campaigns ready to send
     */
    processScheduledCampaigns(): Promise<void>;
    /**
     * Get campaign scheduling statistics
     */
    getSchedulingStats(): Promise<{
        totalScheduled: number;
        readyToSend: number;
        upcomingToday: number;
        upcomingThisWeek: number;
    }>;
    /**
     * Validate scheduling time
     */
    validateScheduleTime(scheduledAt: Date): {
        valid: boolean;
        error?: string;
    };
}
//# sourceMappingURL=campaign-scheduler.service.d.ts.map