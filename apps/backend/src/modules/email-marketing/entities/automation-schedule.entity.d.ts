import { BaseEntity } from '../../../database/entities/base.entity';
import { EmailAutomation } from './email-automation.entity';
import { Subscriber } from './subscriber.entity';
/**
 * Schedule Status
 */
export declare enum ScheduleStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
/**
 * Automation Schedule Entity
 * Manages scheduled execution of automation steps (for delays and time-based triggers)
 */
export declare class AutomationSchedule extends BaseEntity {
    automationId: string;
    automation: EmailAutomation;
    subscriberId: string;
    subscriber: Subscriber;
    stepIndex: number;
    scheduledFor: Date;
    status: ScheduleStatus;
    executedAt?: Date;
    error?: string;
    createdAt: Date;
    updatedAt: Date;
    isReady(): boolean;
    markAsProcessing(): void;
    markAsCompleted(): void;
    markAsFailed(error: string): void;
    cancel(): void;
    getDelayInMinutes(): number;
    isOverdue(): boolean;
}
//# sourceMappingURL=automation-schedule.entity.d.ts.map