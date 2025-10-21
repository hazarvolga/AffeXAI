import { Repository } from 'typeorm';
import { EmailAutomation } from '../entities/email-automation.entity';
import { AutomationExecution } from '../entities/automation-execution.entity';
import { AutomationTrigger } from '../entities/automation-trigger.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { CreateAutomationDto, UpdateAutomationDto, GetExecutionsQueryDto } from '../dto/automation.dto';
import { TriggerEvaluatorService } from './trigger-evaluator.service';
/**
 * Automation Service
 * Manages email automation workflows
 */
export declare class AutomationService {
    private automationRepo;
    private executionRepo;
    private triggerRepo;
    private subscriberRepo;
    private triggerEvaluator;
    private readonly logger;
    constructor(automationRepo: Repository<EmailAutomation>, executionRepo: Repository<AutomationExecution>, triggerRepo: Repository<AutomationTrigger>, subscriberRepo: Repository<Subscriber>, triggerEvaluator: TriggerEvaluatorService);
    /**
     * Create automation
     */
    create(dto: CreateAutomationDto): Promise<EmailAutomation>;
    /**
     * Find all automations
     */
    findAll(): Promise<EmailAutomation[]>;
    /**
     * Find automation by ID
     */
    findOne(id: string): Promise<EmailAutomation>;
    /**
     * Update automation
     */
    update(id: string, dto: UpdateAutomationDto): Promise<EmailAutomation>;
    /**
     * Delete automation
     */
    remove(id: string): Promise<void>;
    /**
     * Activate automation
     */
    activate(id: string, registerExisting?: boolean): Promise<EmailAutomation>;
    /**
     * Pause automation
     */
    pause(id: string, cancelPending?: boolean): Promise<EmailAutomation>;
    /**
     * Get executions with pagination
     */
    getExecutions(query: GetExecutionsQueryDto): Promise<{
        executions: AutomationExecution[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Get automation analytics
     */
    getAnalytics(automationId: string, startDate?: Date, endDate?: Date): Promise<any>;
    /**
     * Test automation with a subscriber
     */
    test(automationId: string, subscriberId: string, dryRun?: boolean): Promise<any>;
    /**
     * Private: Validate workflow steps
     */
    private validateWorkflowSteps;
    /**
     * Private: Validate step configuration
     */
    private validateStepConfig;
    /**
     * Private: Register existing subscribers
     */
    private registerExistingSubscribers;
    /**
     * Private: Calculate step performance
     */
    private calculateStepPerformance;
    /**
     * Private: Calculate timeline
     */
    private calculateTimeline;
    /**
     * Private: Get active subscriber count
     */
    private getActiveSubscriberCount;
}
//# sourceMappingURL=automation.service.d.ts.map