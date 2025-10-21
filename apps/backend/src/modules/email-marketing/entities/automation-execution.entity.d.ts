import { BaseEntity } from '../../../database/entities/base.entity';
import { EmailAutomation } from './email-automation.entity';
import { AutomationTrigger } from './automation-trigger.entity';
import { Subscriber } from './subscriber.entity';
/**
 * Execution Status
 */
export declare enum ExecutionStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
/**
 * Step Result
 */
export interface StepResult {
    stepId: string;
    stepType: string;
    status: 'completed' | 'failed' | 'skipped';
    startedAt: Date;
    completedAt: Date;
    executionTime: number;
    data?: Record<string, any>;
    error?: string;
}
/**
 * Automation Execution Entity
 * Tracks the execution of an automation workflow for a specific subscriber
 */
export declare class AutomationExecution extends BaseEntity {
    automationId: string;
    automation: EmailAutomation;
    triggerId?: string;
    trigger?: AutomationTrigger;
    subscriberId: string;
    subscriber: Subscriber;
    status: ExecutionStatus;
    currentStepIndex: number;
    stepResults: StepResult[];
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
    executionTime?: number;
    createdAt: Date;
    updatedAt: Date;
    calculateExecutionTime(): void;
    start(): void;
    complete(): void;
    fail(error: string): void;
    cancel(): void;
    addStepResult(result: StepResult): void;
    getLastStepResult(): StepResult | null;
    getStepResult(stepId: string): StepResult | null;
    hasCompletedStep(stepId: string): boolean;
    getTotalExecutionTime(): number;
    getSuccessfulSteps(): number;
    getFailedSteps(): number;
    getProgress(): number;
}
//# sourceMappingURL=automation-execution.entity.d.ts.map