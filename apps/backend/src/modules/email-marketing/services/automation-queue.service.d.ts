import { Queue } from 'bullmq';
import { AutomationJobPriority, ExecuteAutomationJobData, ProcessScheduledStepJobData, RetryFailedStepJobData, ProcessTriggerJobData } from '../queues/automation.queue';
/**
 * Automation Queue Service
 * Manages automation job queue operations
 */
export declare class AutomationQueueService {
    private automationQueue;
    private readonly logger;
    constructor(automationQueue: Queue);
    /**
     * Add execute automation job
     */
    addExecuteAutomationJob(data: ExecuteAutomationJobData, priority?: AutomationJobPriority, delayMs?: number): Promise<void>;
    /**
     * Add process scheduled step job
     */
    addProcessScheduledStepJob(data: ProcessScheduledStepJobData, scheduledFor: Date): Promise<void>;
    /**
     * Add retry failed step job
     */
    addRetryFailedStepJob(data: RetryFailedStepJobData, delayMs?: number): Promise<void>;
    /**
     * Add process trigger job
     */
    addProcessTriggerJob(data: ProcessTriggerJobData, priority?: AutomationJobPriority): Promise<void>;
    /**
     * Get queue metrics
     */
    getQueueMetrics(): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
        paused: number;
    }>;
    /**
     * Get queue jobs
     */
    getQueueJobs(status: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed', start?: number, end?: number): Promise<import("bullmq").Job<any, any, string>[]>;
    /**
     * Pause queue
     */
    pauseQueue(): Promise<void>;
    /**
     * Resume queue
     */
    resumeQueue(): Promise<void>;
    /**
     * Clean queue
     */
    cleanQueue(grace?: number, // 24 hours in milliseconds
    status?: 'completed' | 'failed'): Promise<number>;
    /**
     * Drain queue (remove all jobs)
     */
    drainQueue(): Promise<void>;
    /**
     * Obliterate queue (remove all jobs and keys)
     */
    obliterateQueue(): Promise<void>;
}
//# sourceMappingURL=automation-queue.service.d.ts.map