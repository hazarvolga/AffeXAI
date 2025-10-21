import { TriggerType, AutomationStatus, WorkflowStep } from '../entities/email-automation.entity';
/**
 * Create Automation DTO
 */
export declare class CreateAutomationDto {
    name: string;
    description?: string;
    triggerType: TriggerType;
    triggerConfig: Record<string, any>;
    workflowSteps: WorkflowStepDto[];
    segmentId?: string;
}
/**
 * Update Automation DTO
 */
export declare class UpdateAutomationDto {
    name?: string;
    description?: string;
    status?: AutomationStatus;
    triggerConfig?: Record<string, any>;
    workflowSteps?: WorkflowStepDto[];
    segmentId?: string;
    isActive?: boolean;
}
/**
 * Workflow Step DTO
 */
export declare class WorkflowStepDto implements WorkflowStep {
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
 * Activate Automation DTO
 */
export declare class ActivateAutomationDto {
    automationId: string;
    registerExistingSubscribers?: boolean;
}
/**
 * Pause Automation DTO
 */
export declare class PauseAutomationDto {
    automationId: string;
    cancelPendingExecutions?: boolean;
}
/**
 * Test Automation DTO
 */
export declare class TestAutomationDto {
    automationId: string;
    subscriberId: string;
    dryRun?: boolean;
}
/**
 * Get Executions Query DTO
 */
export declare class GetExecutionsQueryDto {
    automationId?: string;
    subscriberId?: string;
    status?: string;
    page?: number;
    limit?: number;
}
/**
 * Automation Analytics DTO
 */
export declare class AutomationAnalyticsDto {
    automationId: string;
    startDate?: string;
    endDate?: string;
}
/**
 * Automation Response DTO
 */
export declare class AutomationResponseDto {
    id: string;
    name: string;
    description?: string;
    status: AutomationStatus;
    triggerType: TriggerType;
    triggerConfig: Record<string, any>;
    workflowSteps: WorkflowStep[];
    isActive: boolean;
    segmentId?: string;
    subscriberCount: number;
    executionCount: number;
    successRate: number;
    avgExecutionTime: number;
    lastExecutedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Execution Response DTO
 */
export declare class ExecutionResponseDto {
    id: string;
    automationId: string;
    subscriberId: string;
    status: string;
    currentStepIndex: number;
    stepResults: any[];
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
    executionTime?: number;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Analytics Response DTO
 */
export declare class AnalyticsResponseDto {
    automationId: string;
    automationName: string;
    totalExecutions: number;
    completedExecutions: number;
    failedExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    totalSubscribers: number;
    activeSubscribers: number;
    stepPerformance: {
        stepId: string;
        stepType: string;
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        avgExecutionTime: number;
    }[];
    timeline: {
        date: string;
        executions: number;
        completed: number;
        failed: number;
    }[];
}
//# sourceMappingURL=automation.dto.d.ts.map