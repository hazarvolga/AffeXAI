import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { FaqLearningService } from './faq-learning.service';
import { ReviewQueueService } from './review-queue.service';
import { KnowledgeBaseIntegratorService } from './knowledge-base-integrator.service';
import { CronJob } from 'cron';

export interface JobSchedule {
  name: string;
  cronExpression: string;
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  status: 'idle' | 'running' | 'error';
  errorMessage?: string;
}

export interface JobExecutionResult {
  jobName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  success: boolean;
  itemsProcessed: number;
  errors: string[];
}

@Injectable()
export class ScheduledLearningJobsService {
  private readonly logger = new Logger(ScheduledLearningJobsService.name);
  private jobStatuses: Map<string, JobSchedule> = new Map();
  private jobHistory: JobExecutionResult[] = [];
  private readonly MAX_HISTORY = 100;

  constructor(
    @InjectRepository(FaqLearningConfig)
    private configRepository: Repository<FaqLearningConfig>,
    private faqLearningService: FaqLearningService,
    private reviewQueueService: ReviewQueueService,
    private kbIntegrator: KnowledgeBaseIntegratorService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.initializeJobStatuses();
  }

  // Hourly: Process new chat and ticket data
  @Cron(CronExpression.EVERY_HOUR, { name: 'hourly-data-processing' })
  async processHourlyData(): Promise<void> {
    const jobName = 'hourly-data-processing';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting hourly data processing');

      const config = await this.getJobConfig();
      if (!config.enableRealTimeProcessing) {
        this.logger.log('Real-time processing disabled, skipping');
        return { itemsProcessed: 0 };
      }

      // Process last hour's data
      const result = await this.faqLearningService.runLearningPipeline({
        dateRange: {
          from: new Date(Date.now() - 3600000), // Last hour
          to: new Date()
        },
        maxResults: config.batchSize
      });

      return {
        itemsProcessed: result.processedItems,
        errors: result.errors
      };
    });
  }

  // Daily: Auto-publish high confidence FAQs
  @Cron(CronExpression.EVERY_DAY_AT_2AM, { name: 'daily-auto-publish' })
  async autoPublishHighConfidenceFaqs(): Promise<void> {
    const jobName = 'daily-auto-publish';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting daily auto-publish job');

      const config = await this.getJobConfig();
      if (!config.enableAutoPublishing) {
        this.logger.log('Auto-publishing disabled, skipping');
        return { itemsProcessed: 0 };
      }

      const publishedCount = await this.reviewQueueService.autoPublishHighConfidenceFaqs();

      return {
        itemsProcessed: publishedCount,
        errors: []
      };
    });
  }

  // Daily: Sync FAQs with Knowledge Base
  @Cron(CronExpression.EVERY_DAY_AT_3AM, { name: 'daily-kb-sync' })
  async syncWithKnowledgeBase(): Promise<void> {
    const jobName = 'daily-kb-sync';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting daily KB sync job');

      const result = await this.kbIntegrator.syncFaqUpdates();

      return {
        itemsProcessed: result.updated,
        errors: result.errors.map(e => e.error)
      };
    });
  }

  // Weekly: Comprehensive data processing
  @Cron(CronExpression.EVERY_WEEK, { name: 'weekly-comprehensive-processing' })
  async weeklyComprehensiveProcessing(): Promise<void> {
    const jobName = 'weekly-comprehensive-processing';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting weekly comprehensive processing');

      const config = await this.getJobConfig();

      // Process last week's data
      const result = await this.faqLearningService.runLearningPipeline({
        dateRange: {
          from: new Date(Date.now() - 7 * 24 * 3600000), // Last week
          to: new Date()
        },
        maxResults: config.batchSize * 10 // Larger batch for weekly
      });

      return {
        itemsProcessed: result.processedItems,
        errors: result.errors
      };
    });
  }

  // Daily: Cleanup old data
  @Cron(CronExpression.EVERY_DAY_AT_4AM, { name: 'daily-cleanup' })
  async cleanupOldData(): Promise<void> {
    const jobName = 'daily-cleanup';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting daily cleanup job');

      const config = await this.getJobConfig();
      const retentionDate = new Date(Date.now() - config.retentionPeriodDays * 24 * 3600000);

      // This would delete old rejected FAQs, expired patterns, etc.
      // For now, just log
      this.logger.log(`Cleanup would remove data older than ${retentionDate.toISOString()}`);

      return {
        itemsProcessed: 0,
        errors: []
      };
    });
  }

  // Every 6 hours: Update pattern frequencies
  @Cron('0 */6 * * *', { name: 'pattern-frequency-update' })
  async updatePatternFrequencies(): Promise<void> {
    const jobName = 'pattern-frequency-update';
    await this.executeJob(jobName, async () => {
      this.logger.log('Starting pattern frequency update');

      // This would recalculate pattern frequencies based on recent data
      // For now, just log
      this.logger.log('Pattern frequencies would be updated');

      return {
        itemsProcessed: 0,
        errors: []
      };
    });
  }

  async getJobStatuses(): Promise<JobSchedule[]> {
    const statuses: JobSchedule[] = [];

    for (const [name, status] of this.jobStatuses) {
      try {
        const job = this.schedulerRegistry.getCronJob(name);
        status.nextRun = job.nextDate()?.toJSDate();
      } catch (error) {
        // Job might not be registered yet
      }

      statuses.push(status);
    }

    return statuses;
  }

  async getJobHistory(jobName?: string, limit: number = 20): Promise<JobExecutionResult[]> {
    let history = this.jobHistory;

    if (jobName) {
      history = history.filter(h => h.jobName === jobName);
    }

    return history.slice(-limit).reverse();
  }

  async enableJob(jobName: string): Promise<boolean> {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      job.start();

      const status = this.jobStatuses.get(jobName);
      if (status) {
        status.enabled = true;
      }

      this.logger.log(`Job ${jobName} enabled`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to enable job ${jobName}:`, error);
      return false;
    }
  }

  async disableJob(jobName: string): Promise<boolean> {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      job.stop();

      const status = this.jobStatuses.get(jobName);
      if (status) {
        status.enabled = false;
      }

      this.logger.log(`Job ${jobName} disabled`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to disable job ${jobName}:`, error);
      return false;
    }
  }

  async triggerJobManually(jobName: string): Promise<JobExecutionResult> {
    this.logger.log(`Manually triggering job: ${jobName}`);

    const startTime = new Date();
    let result: JobExecutionResult;

    try {
      let jobResult: any;

      switch (jobName) {
        case 'hourly-data-processing':
          await this.processHourlyData();
          jobResult = { itemsProcessed: 0, errors: [] };
          break;
        case 'daily-auto-publish':
          await this.autoPublishHighConfidenceFaqs();
          jobResult = { itemsProcessed: 0, errors: [] };
          break;
        case 'daily-kb-sync':
          await this.syncWithKnowledgeBase();
          jobResult = { itemsProcessed: 0, errors: [] };
          break;
        case 'weekly-comprehensive-processing':
          await this.weeklyComprehensiveProcessing();
          jobResult = { itemsProcessed: 0, errors: [] };
          break;
        case 'daily-cleanup':
          await this.cleanupOldData();
          jobResult = { itemsProcessed: 0, errors: [] };
          break;
        default:
          throw new Error(`Unknown job: ${jobName}`);
      }

      result = {
        jobName,
        startTime,
        endTime: new Date(),
        duration: Date.now() - startTime.getTime(),
        success: true,
        itemsProcessed: jobResult.itemsProcessed || 0,
        errors: jobResult.errors || []
      };

    } catch (error) {
      result = {
        jobName,
        startTime,
        endTime: new Date(),
        duration: Date.now() - startTime.getTime(),
        success: false,
        itemsProcessed: 0,
        errors: [error.message]
      };
    }

    this.addToHistory(result);
    return result;
  }

  async updateJobSchedule(jobName: string, cronExpression: string): Promise<boolean> {
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      
      // Delete old job
      this.schedulerRegistry.deleteCronJob(jobName);

      // Create new job with updated schedule
      const newJob = new CronJob(cronExpression, () => {
        this.logger.log(`Executing scheduled job: ${jobName}`);
      });

      this.schedulerRegistry.addCronJob(jobName, newJob);
      newJob.start();

      const status = this.jobStatuses.get(jobName);
      if (status) {
        status.cronExpression = cronExpression;
      }

      this.logger.log(`Job ${jobName} schedule updated to: ${cronExpression}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to update job schedule for ${jobName}:`, error);
      return false;
    }
  }

  private async executeJob(
    jobName: string,
    jobFunction: () => Promise<{ itemsProcessed: number; errors?: string[] }>
  ): Promise<void> {
    
    const startTime = new Date();
    const status = this.jobStatuses.get(jobName);

    if (status) {
      status.status = 'running';
      status.lastRun = startTime;
    }

    try {
      const result = await jobFunction();

      const executionResult: JobExecutionResult = {
        jobName,
        startTime,
        endTime: new Date(),
        duration: Date.now() - startTime.getTime(),
        success: true,
        itemsProcessed: result.itemsProcessed,
        errors: result.errors || []
      };

      this.addToHistory(executionResult);

      if (status) {
        status.status = 'idle';
        status.errorMessage = undefined;
      }

      this.logger.log(`Job ${jobName} completed: ${result.itemsProcessed} items processed`);

    } catch (error) {
      this.logger.error(`Job ${jobName} failed:`, error);

      const executionResult: JobExecutionResult = {
        jobName,
        startTime,
        endTime: new Date(),
        duration: Date.now() - startTime.getTime(),
        success: false,
        itemsProcessed: 0,
        errors: [error.message]
      };

      this.addToHistory(executionResult);

      if (status) {
        status.status = 'error';
        status.errorMessage = error.message;
      }
    }
  }

  private initializeJobStatuses(): void {
    const jobs: JobSchedule[] = [
      {
        name: 'hourly-data-processing',
        cronExpression: CronExpression.EVERY_HOUR,
        enabled: true,
        status: 'idle'
      },
      {
        name: 'daily-auto-publish',
        cronExpression: CronExpression.EVERY_DAY_AT_2AM,
        enabled: true,
        status: 'idle'
      },
      {
        name: 'daily-kb-sync',
        cronExpression: CronExpression.EVERY_DAY_AT_3AM,
        enabled: true,
        status: 'idle'
      },
      {
        name: 'weekly-comprehensive-processing',
        cronExpression: CronExpression.EVERY_WEEK,
        enabled: true,
        status: 'idle'
      },
      {
        name: 'daily-cleanup',
        cronExpression: CronExpression.EVERY_DAY_AT_4AM,
        enabled: true,
        status: 'idle'
      },
      {
        name: 'pattern-frequency-update',
        cronExpression: '0 */6 * * *',
        enabled: true,
        status: 'idle'
      }
    ];

    jobs.forEach(job => {
      this.jobStatuses.set(job.name, job);
    });

    this.logger.log(`Initialized ${jobs.length} scheduled jobs`);
  }

  private addToHistory(result: JobExecutionResult): void {
    this.jobHistory.push(result);

    // Keep only last MAX_HISTORY entries
    if (this.jobHistory.length > this.MAX_HISTORY) {
      this.jobHistory = this.jobHistory.slice(-this.MAX_HISTORY);
    }
  }

  private async getJobConfig(): Promise<any> {
    try {
      const configs = await this.configRepository.find({
        where: [
          { configKey: 'advanced_settings' },
          { configKey: 'data_processing' }
        ]
      });

      const advancedSettings = configs.find(c => c.configKey === 'advanced_settings')?.configValue || {};
      const dataProcessing = configs.find(c => c.configKey === 'data_processing')?.configValue || {};

      return {
        enableRealTimeProcessing: advancedSettings.enableRealTimeProcessing || false,
        enableAutoPublishing: advancedSettings.enableAutoPublishing || false,
        batchSize: dataProcessing.batchSize || 100,
        retentionPeriodDays: advancedSettings.retentionPeriodDays || 365
      };
    } catch (error) {
      this.logger.error('Failed to load job config:', error);
      return {
        enableRealTimeProcessing: false,
        enableAutoPublishing: false,
        batchSize: 100,
        retentionPeriodDays: 365
      };
    }
  }

  async getJobMetrics(): Promise<{
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageDuration: number;
    totalItemsProcessed: number;
    lastExecution?: Date;
  }> {
    
    const totalExecutions = this.jobHistory.length;
    const successfulExecutions = this.jobHistory.filter(h => h.success).length;
    const failedExecutions = this.jobHistory.filter(h => !h.success).length;
    
    const totalDuration = this.jobHistory.reduce((sum, h) => sum + h.duration, 0);
    const averageDuration = totalExecutions > 0 ? totalDuration / totalExecutions : 0;
    
    const totalItemsProcessed = this.jobHistory.reduce((sum, h) => sum + h.itemsProcessed, 0);
    
    const lastExecution = this.jobHistory.length > 0 ? 
      this.jobHistory[this.jobHistory.length - 1].endTime : undefined;

    return {
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      averageDuration: Math.round(averageDuration),
      totalItemsProcessed,
      lastExecution
    };
  }
}