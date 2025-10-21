/**
 * Automation API Client
 * API methods for marketing automation
 */
import type { Automation, CreateAutomationDto, UpdateAutomationDto, GetExecutionsQuery, ExecutionsResponse, AutomationAnalytics, AnalyticsQuery, QueueMetrics } from '@/types/automation';
export declare const automationApi: {
    /**
     * Get all automations
     */
    getAll(): Promise<Automation[]>;
    /**
     * Get automation by ID
     */
    getById(id: string): Promise<Automation>;
    /**
     * Create automation
     */
    create(dto: CreateAutomationDto): Promise<Automation>;
    /**
     * Update automation
     */
    update(id: string, dto: UpdateAutomationDto): Promise<Automation>;
    /**
     * Delete automation
     */
    delete(id: string): Promise<void>;
    /**
     * Activate automation
     */
    activate(id: string, registerExisting?: boolean): Promise<Automation>;
    /**
     * Pause automation
     */
    pause(id: string, cancelPending?: boolean): Promise<Automation>;
    /**
     * Get executions
     */
    getExecutions(query: GetExecutionsQuery): Promise<ExecutionsResponse>;
    /**
     * Get analytics
     */
    getAnalytics(id: string, query?: AnalyticsQuery): Promise<AutomationAnalytics>;
    /**
     * Test automation
     */
    test(id: string, subscriberId: string, dryRun?: boolean): Promise<{
        automation: Automation;
        subscriber: any;
        steps: any[];
        message: string;
    }>;
    /**
     * Get queue metrics
     */
    getQueueMetrics(): Promise<QueueMetrics>;
    /**
     * Get queue jobs
     */
    getQueueJobs(status: "waiting" | "active" | "completed" | "failed" | "delayed", start?: number, end?: number): Promise<any[]>;
};
//# sourceMappingURL=automation.d.ts.map