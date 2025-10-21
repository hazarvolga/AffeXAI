import { Repository } from 'typeorm';
import { EmailCampaign } from './entities/email-campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Queue } from 'bullmq';
import { CacheService } from '../../shared/services/cache.service';
import { EventBusService } from '../platform-integration/services/event-bus.service';
export declare class EmailCampaignService {
    private campaignRepository;
    private emailQueue;
    private cacheService;
    private eventBusService;
    private readonly logger;
    constructor(campaignRepository: Repository<EmailCampaign>, emailQueue: Queue, cacheService: CacheService, eventBusService: EventBusService);
    create(createCampaignDto: CreateCampaignDto): Promise<EmailCampaign>;
    findAll(): Promise<EmailCampaign[]>;
    findOne(id: string): Promise<EmailCampaign>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<EmailCampaign>;
    remove(id: string): Promise<void>;
    sendCampaign(id: string): Promise<void>;
    incrementSentCount(campaignId: string): Promise<void>;
    incrementOpenedCount(campaignId: string): Promise<void>;
    incrementClickedCount(campaignId: string): Promise<void>;
    getCampaignStats(id: string): Promise<any>;
}
//# sourceMappingURL=email-campaign.service.d.ts.map