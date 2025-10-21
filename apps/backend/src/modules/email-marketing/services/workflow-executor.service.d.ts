import { Repository } from 'typeorm';
import { EmailAutomation } from '../entities/email-automation.entity';
import { AutomationExecution } from '../entities/automation-execution.entity';
import { AutomationSchedule } from '../entities/automation-schedule.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { EmailCampaignService } from '../email-campaign.service';
/**
 * Workflow Executor Service
 * Executes automation workflow steps
 */
export declare class WorkflowExecutorService {
    private automationRepo;
    private executionRepo;
    private scheduleRepo;
    private subscriberRepo;
    private emailCampaignService;
    private readonly logger;
    constructor(automationRepo: Repository<EmailAutomation>, executionRepo: Repository<AutomationExecution>, scheduleRepo: Repository<AutomationSchedule>, subscriberRepo: Repository<Subscriber>, emailCampaignService: EmailCampaignService);
    /**
     * Execute automation workflow for a subscriber
     */
    executeWorkflow(automationId: string, subscriberId: string, triggerId?: string): Promise<AutomationExecution>;
    /**
     * Process execution (main workflow loop)
     */
    processExecution(executionId: string): Promise<void>;
    /**
     * Execute single workflow step
     */
    private executeStep;
    /**
     * Execute send_email step
     */
    private executeSendEmail;
    /**
     * Execute delay step
     */
    private executeDelay;
    /**
     * Execute condition step
     */
    private executeCondition;
    /**
     * Execute split step (A/B variant selection)
     */
    private executeSplit;
    /**
     * Evaluate condition expression
     */
    private evaluateCondition;
    /**
     * Resume execution after delay
     */
    resumeExecution(scheduleId: string): Promise<void>;
    /**
     * Process pending schedules (cron job)
     */
    processPendingSchedules(): Promise<void>;
}
//# sourceMappingURL=workflow-executor.service.d.ts.map