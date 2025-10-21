import { BaseEntity } from '../../../database/entities/base.entity';
import { EmailAutomation, TriggerType } from './email-automation.entity';
import { Subscriber } from './subscriber.entity';
/**
 * Trigger Status
 */
export declare enum TriggerStatus {
    PENDING = "pending",
    SCHEDULED = "scheduled",
    FIRED = "fired",
    SKIPPED = "skipped",
    FAILED = "failed"
}
/**
 * Automation Trigger Entity
 * Records when automation triggers fire for specific subscribers
 */
export declare class AutomationTrigger extends BaseEntity {
    automationId: string;
    automation: EmailAutomation;
    subscriberId: string;
    subscriber: Subscriber;
    triggerType: TriggerType;
    triggerData: Record<string, any>;
    status: TriggerStatus;
    scheduledFor?: Date;
    firedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    fire(): void;
    skip(reason?: string): void;
    fail(error: string): void;
    schedule(date: Date): void;
    isReady(): boolean;
}
//# sourceMappingURL=automation-trigger.entity.d.ts.map