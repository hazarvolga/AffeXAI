import { EmailCampaignService } from './email-campaign.service';
import { CampaignSchedulerService } from './campaign-scheduler.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { EmailCampaign } from './entities/email-campaign.entity';
export declare class EmailCampaignController {
    private readonly campaignService;
    private readonly schedulerService;
    constructor(campaignService: EmailCampaignService, schedulerService: CampaignSchedulerService);
    create(createCampaignDto: CreateCampaignDto): Promise<EmailCampaign>;
    findAll(): Promise<EmailCampaign[]>;
    findOne(id: string): Promise<EmailCampaign>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<EmailCampaign>;
    remove(id: string): Promise<void>;
    sendCampaign(id: string): Promise<{
        message: string;
    }>;
    getCampaignStats(id: string): Promise<any>;
    scheduleCampaign(id: string, body: {
        scheduledAt: string;
    }): Promise<EmailCampaign>;
    cancelSchedule(id: string): Promise<EmailCampaign>;
    rescheduleCampaign(id: string, body: {
        scheduledAt: string;
    }): Promise<EmailCampaign>;
    getScheduledCampaigns(): Promise<EmailCampaign[]>;
    getSchedulingStats(): Promise<{
        totalScheduled: number;
        readyToSend: number;
        upcomingToday: number;
        upcomingThisWeek: number;
    }>;
}
//# sourceMappingURL=email-campaign.controller.d.ts.map