import { AutomationService } from '../services/automation.service';
import { AutomationQueueService } from '../services/automation-queue.service';
import { CreateAutomationDto, UpdateAutomationDto, TestAutomationDto, GetExecutionsQueryDto, AutomationResponseDto, AnalyticsResponseDto } from '../dto/automation.dto';
/**
 * Automation Controller
 * REST API for email marketing automation
 */
export declare class AutomationController {
    private readonly automationService;
    private readonly queueService;
    constructor(automationService: AutomationService, queueService: AutomationQueueService);
    /**
     * Create automation
     */
    create(dto: CreateAutomationDto): Promise<AutomationResponseDto>;
    /**
     * Get all automations
     */
    findAll(): Promise<AutomationResponseDto[]>;
    /**
     * Get automation by ID
     */
    findOne(id: string): Promise<AutomationResponseDto>;
    /**
     * Update automation
     */
    update(id: string, dto: UpdateAutomationDto): Promise<AutomationResponseDto>;
    /**
     * Delete automation
     */
    remove(id: string): Promise<void>;
    /**
     * Activate automation
     */
    activate(id: string, registerExisting?: boolean): Promise<AutomationResponseDto>;
    /**
     * Pause automation
     */
    pause(id: string, cancelPending?: boolean): Promise<AutomationResponseDto>;
    /**
     * Get executions
     */
    getExecutions(query: GetExecutionsQueryDto): Promise<{
        executions: import("../entities/automation-execution.entity").AutomationExecution[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    /**
     * Get automation analytics
     */
    getAnalytics(id: string, startDate?: string, endDate?: string): Promise<AnalyticsResponseDto>;
    /**
     * Test automation
     */
    test(id: string, dto: TestAutomationDto): Promise<any>;
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
}
//# sourceMappingURL=automation.controller.d.ts.map