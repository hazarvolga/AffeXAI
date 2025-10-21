import { BaseEntity } from '../../../database/entities/base.entity';
import { Segment } from './segment.entity';
import { AutomationTrigger } from './automation-trigger.entity';
import { AutomationExecution } from './automation-execution.entity';
import { AutomationSchedule } from './automation-schedule.entity';
/**
 * Automation Status
 */
export declare enum AutomationStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    PAUSED = "paused",
    COMPLETED = "completed",
    ARCHIVED = "archived"
}
/**
 * Trigger Types
 */
export declare enum TriggerType {
    EVENT = "event",// User event (subscribe, purchase, etc.)
    BEHAVIOR = "behavior",// User behavior (cart_abandonment, browsing, etc.)
    TIME_BASED = "time_based",// Scheduled (birthday, anniversary, etc.)
    ATTRIBUTE = "attribute"
}
/**
 * Workflow Step Types
 */
export interface WorkflowStep {
    id: string;
    type: 'send_email' | 'delay' | 'condition' | 'split' | 'exit';
    config: Record<string, any>;
    nextStepId?: string;
    conditionalPaths?: {
        condition: string;
        nextStepId: string;
    }[];
}
/**
 * Email Automation Entity
 * Manages automated email workflows with triggers and multi-step flows
 */
export declare class EmailAutomation extends BaseEntity {
    name: string;
    description?: string;
    status: AutomationStatus;
    triggerType: TriggerType;
    triggerConfig: Record<string, any>;
    workflowSteps: WorkflowStep[];
    isActive: boolean;
    segmentId?: string;
    segment?: Segment;
    subscriberCount: number;
    executionCount: number;
    successRate: number;
    avgExecutionTime: number;
    lastExecutedAt?: Date;
    triggers: AutomationTrigger[];
    executions: AutomationExecution[];
    schedules: AutomationSchedule[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    validateWorkflow(): void;
    isRunning(): boolean;
    canBeActivated(): boolean;
    pause(): void;
    activate(): void;
    archive(): void;
    updateStatistics(execution: AutomationExecution): void;
    getFirstStep(): WorkflowStep | null;
    getStepById(stepId: string): WorkflowStep | null;
    getNextStep(currentStepId: string, conditionResult?: boolean): WorkflowStep | null;
}
//# sourceMappingURL=email-automation.entity.d.ts.map