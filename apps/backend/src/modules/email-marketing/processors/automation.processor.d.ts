import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WorkflowExecutorService } from '../services/workflow-executor.service';
import { Repository } from 'typeorm';
import { AutomationExecution } from '../entities/automation-execution.entity';
import { AutomationSchedule } from '../entities/automation-schedule.entity';
/**
 * Automation Queue Processor
 * Processes automation jobs from the queue
 */
export declare class AutomationProcessor extends WorkerHost {
    private workflowExecutor;
    private executionRepo;
    private scheduleRepo;
    private readonly logger;
    constructor(workflowExecutor: WorkflowExecutorService, executionRepo: Repository<AutomationExecution>, scheduleRepo: Repository<AutomationSchedule>);
    /**
     * Main process method - routes to specific handlers
     */
    process(job: Job): Promise<any>;
    /**
     * Handle execute automation job
     */
    private handleExecuteAutomation;
    /**
     * Handle process scheduled step job
     */
    private handleProcessScheduledStep;
    /**
     * Handle retry failed step job
     */
    private handleRetryFailedStep;
    /**
     * Handle process trigger job
     */
    private handleProcessTrigger;
    /**
     * Wait for execution to complete
     */
    private waitForExecution;
    /**
     * Handle job completion
     */
    onCompleted(job: Job): void;
    /**
     * Handle job failure
     */
    onFailed(job: Job, error: Error): void;
    /**
     * Handle job progress
     */
    onProgress(job: Job, progress: number): void;
    /**
     * Handle job active
     */
    onActive(job: Job): void;
}
//# sourceMappingURL=automation.processor.d.ts.map