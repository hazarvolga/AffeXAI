import { WorkflowExecutorService } from './workflow-executor.service';
/**
 * Automation Scheduler Service
 * Handles scheduled workflow execution
 */
export declare class AutomationSchedulerService {
    private workflowExecutor;
    private readonly logger;
    constructor(workflowExecutor: WorkflowExecutorService);
    /**
     * Process pending schedules every 5 minutes
     */
    handlePendingSchedules(): Promise<void>;
}
//# sourceMappingURL=automation-scheduler.service.d.ts.map