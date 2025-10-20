import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { EmailJobData } from './processors/email.processor';

@Injectable()
export class EmailMarketingService {
  private readonly logger = new Logger(EmailMarketingService.name);

  constructor(
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const job = await this.emailQueue.add('sendEmail', {
      to,
      subject,
      body,
    });

    this.logger.log(`Email job added to queue with ID: ${job.id}`);
  }

  async sendCampaignEmail(to: string, subject: string, body: string, campaignId: string, recipientId: string): Promise<void> {
    const job = await this.emailQueue.add('sendCampaignEmail', {
      to,
      subject,
      body,
      campaignId,
      recipientId,
    });

    this.logger.log(`Campaign email job added to queue with ID: ${job.id}`);
  }

  async getQueueStatus(): Promise<any> {
    const waiting = await this.emailQueue.getWaiting();
    const active = await this.emailQueue.getActive();
    const completed = await this.emailQueue.getCompleted();
    const failed = await this.emailQueue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
    };
  }
}
