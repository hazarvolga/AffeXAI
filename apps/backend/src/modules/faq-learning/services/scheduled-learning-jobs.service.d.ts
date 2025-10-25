import { SchedulerRegistry } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { FaqLearningService } from './faq-learning.service';
import { ReviewQueueService } from './review-queue.service';
import { KnowledgeBaseIntegratorService } from './knowledge-base-integrator.service';
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
export declare class ScheduledLearningJobsService {
    private configRepository;
    private faqLearningService;
    private reviewQueueService;
    private kbIntegrator;
    private schedulerRegistry;
    private readonly logger;
    private jobStatuses;
    private jobHistory;
    private readonly MAX_HISTORY;
    constructor(configRepository: Repository<FaqLearningConfig>, faqLearningService: FaqLearningService, reviewQueueService: ReviewQueueService, kbIntegrator: KnowledgeBaseIntegratorService, schedulerRegistry: SchedulerRegistry);
    processHourlyData(): Promise<void>;
    autoPublishHighConfidenceFaqs(): Promise<void>;
    syncWithKnowledgeBase(): Promise<void>;
    weeklyComprehensiveProcessing(): Promise<void>;
    cleanupOldData(): Promise<void>;
    updatePatternFrequencies(): Promise<void>;
    getJobStatuses(): Promise<JobSchedule[]>;
    getJobHistory(jobName?: string, limit?: number): Promise<JobExecutionResult[]>;
    enableJob(jobName: string): Promise<boolean>;
    disableJob(jobName: string): Promise<boolean>;
    triggerJobManually(jobName: string): Promise<JobExecutionResult>;
    updateJobSchedule(jobName: string, cronExpression: string): Promise<boolean>;
    private executeJob;
    private initializeJobStatuses;
    private addToHistory;
    private getJobConfig;
    getJobMetrics(): Promise<{
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        averageDuration: number;
        totalItemsProcessed: number;
        lastExecution?: Date;
    }>;
}
//# sourceMappingURL=scheduled-learning-jobs.service.d.ts.map