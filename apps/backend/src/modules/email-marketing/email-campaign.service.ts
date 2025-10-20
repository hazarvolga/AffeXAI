import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailCampaign } from './entities/email-campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { CacheService } from '../../shared/services/cache.service';
import { EventBusService } from '../platform-integration/services/event-bus.service';

@Injectable()
export class EmailCampaignService {
  private readonly logger = new Logger(EmailCampaignService.name);

  constructor(
    @InjectRepository(EmailCampaign)
    private campaignRepository: Repository<EmailCampaign>,
    @InjectQueue('email') private emailQueue: Queue,
    private cacheService: CacheService,
    private eventBusService: EventBusService,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<EmailCampaign> {
    const campaign = this.campaignRepository.create(createCampaignDto);
    const savedCampaign = await this.campaignRepository.save(campaign);
    
    // Clear cache for findAll
    await this.cacheService.del('email-campaigns:all');
    
    return savedCampaign;
  }

  async findAll(): Promise<EmailCampaign[]> {
    const cached = await this.cacheService.get<EmailCampaign[]>('email-campaigns:all');
    if (cached) {
      return cached;
    }
    
    const campaigns = await this.campaignRepository.find({
      order: { createdAt: 'DESC' },
    });
    await this.cacheService.set('email-campaigns:all', campaigns, 30); // 30 seconds TTL
    return campaigns;
  }

  async findOne(id: string): Promise<EmailCampaign> {
    const cached = await this.cacheService.get<EmailCampaign>(`email-campaigns:${id}`);
    if (cached) {
      return cached;
    }
    
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    await this.cacheService.set(`email-campaigns:${id}`, campaign, 60); // 60 seconds TTL
    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<EmailCampaign> {
    await this.campaignRepository.update(id, updateCampaignDto);
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    // Clear cache for this campaign and all campaigns
    await this.cacheService.del(`email-campaigns:${id}`);
    await this.cacheService.del('email-campaigns:all');
    
    return campaign;
  }

  async remove(id: string): Promise<void> {
    await this.campaignRepository.delete(id);
    
    // Clear cache for this campaign and all campaigns
    await this.cacheService.del(`email-campaigns:${id}`);
    await this.cacheService.del('email-campaigns:all');
  }

  async sendCampaign(id: string): Promise<void> {
    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Update campaign status
    campaign.status = 'sending';
    campaign.sentAt = new Date();
    await this.campaignRepository.save(campaign);
    
    // Clear cache for this campaign
    await this.cacheService.del(`email-campaigns:${id}`);

    // Add job to queue for each recipient
    // For demo purposes, we'll simulate some recipients
    const recipients = [
      'user1@example.com',
      'user2@example.com',
      'user3@example.com',
    ];

    campaign.totalRecipients = recipients.length;
    await this.campaignRepository.save(campaign);

    for (const recipient of recipients) {
      await this.emailQueue.add('sendCampaignEmail', {
        to: recipient,
        subject: campaign.subject,
        body: campaign.content,
        campaignId: campaign.id,
        recipientId: recipient,
      });
    }

    // Publish platform event
    await this.eventBusService.publishCampaignSent(
      campaign.id,
      recipients.length,
      'system', // TODO: Get from auth context
    );

    this.logger.log(`Campaign ${id} queued for sending to ${recipients.length} recipients`);
  }

  async incrementSentCount(campaignId: string): Promise<void> {
    await this.campaignRepository.increment({ id: campaignId }, 'sentCount', 1);
    // Clear cache for this campaign
    await this.cacheService.del(`email-campaigns:${campaignId}`);
  }

  async incrementOpenedCount(campaignId: string): Promise<void> {
    await this.campaignRepository.increment({ id: campaignId }, 'openedCount', 1);
    // Clear cache for this campaign
    await this.cacheService.del(`email-campaigns:${campaignId}`);
  }

  async incrementClickedCount(campaignId: string): Promise<void> {
    await this.campaignRepository.increment({ id: campaignId }, 'clickedCount', 1);
    // Clear cache for this campaign
    await this.cacheService.del(`email-campaigns:${campaignId}`);
  }

  async getCampaignStats(id: string): Promise<any> {
    const campaign = await this.findOne(id);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      totalRecipients: campaign.totalRecipients,
      sentCount: campaign.sentCount,
      openedCount: campaign.openedCount,
      clickedCount: campaign.clickedCount,
      completionRate: campaign.totalRecipients > 0 
        ? Math.round((campaign.sentCount / campaign.totalRecipients) * 100) 
        : 0,
    };
  }
}