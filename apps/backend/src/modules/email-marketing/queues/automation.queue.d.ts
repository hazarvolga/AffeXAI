/**
 * Automation Queue Definitions
 * Job types and data interfaces for automation queue
 */
/**
 * Job types for automation queue
 */
export declare enum AutomationJobType {
    EXECUTE_AUTOMATION = "execute-automation",
    PROCESS_SCHEDULED_STEP = "process-scheduled-step",
    RETRY_FAILED_STEP = "retry-failed-step",
    PROCESS_TRIGGER = "process-trigger"
}
/**
 * Execute automation job data
 */
export interface ExecuteAutomationJobData {
    automationId: string;
    subscriberId: string;
    triggerId?: string;
    metadata?: Record<string, any>;
}
/**
 * Process scheduled step job data
 */
export interface ProcessScheduledStepJobData {
    scheduleId: string;
    automationId: string;
    subscriberId: string;
    stepIndex: number;
    metadata?: Record<string, any>;
}
/**
 * Retry failed step job data
 */
export interface RetryFailedStepJobData {
    executionId: string;
    stepId: string;
    attemptNumber: number;
    error?: string;
    metadata?: Record<string, any>;
}
/**
 * Process trigger job data
 */
export interface ProcessTriggerJobData {
    triggerId: string;
    automationId: string;
    subscriberId: string;
    triggerType: string;
    triggerData?: Record<string, any>;
}
/**
 * Queue name constant
 */
export declare const AUTOMATION_QUEUE_NAME = "automation";
/**
 * Job options
 */
export declare const AUTOMATION_JOB_OPTIONS: {
    attempts: number;
    backoff: {
        type: string;
        delay: number;
    };
    removeOnComplete: {
        age: number;
        count: number;
    };
    removeOnFail: {
        age: number;
        count: number;
    };
};
/**
 * Priority levels
 */
export declare enum AutomationJobPriority {
    CRITICAL = 1,
    HIGH = 2,
    NORMAL = 3,
    LOW = 4
}
//# sourceMappingURL=automation.queue.d.ts.map