import { Repository } from 'typeorm';
import { EmailAutomation } from '../entities/email-automation.entity';
import { AutomationTrigger } from '../entities/automation-trigger.entity';
import { Subscriber } from '../entities/subscriber.entity';
import { Segment } from '../entities/segment.entity';
import { AutomationQueueService } from './automation-queue.service';
/**
 * Trigger Event Types
 */
export declare enum TriggerEvent {
    SUBSCRIBER_CREATED = "subscriber.created",
    SUBSCRIBER_UPDATED = "subscriber.updated",
    SUBSCRIBER_SEGMENT_ADDED = "subscriber.segment_added",
    SUBSCRIBER_SEGMENT_REMOVED = "subscriber.segment_removed",
    EMAIL_OPENED = "email.opened",
    EMAIL_CLICKED = "email.clicked",
    PURCHASE_MADE = "purchase.made",
    CART_ABANDONED = "cart.abandoned",
    PRODUCT_VIEWED = "product.viewed"
}
/**
 * Trigger Evaluator Service
 * Evaluates automation triggers and registers subscribers
 */
export declare class TriggerEvaluatorService {
    private automationRepo;
    private triggerRepo;
    private subscriberRepo;
    private segmentRepo;
    private queueService;
    private readonly logger;
    constructor(automationRepo: Repository<EmailAutomation>, triggerRepo: Repository<AutomationTrigger>, subscriberRepo: Repository<Subscriber>, segmentRepo: Repository<Segment>, queueService: AutomationQueueService);
    /**
     * Evaluate event-based triggers
     */
    evaluateEventTrigger(event: TriggerEvent, subscriberId: string, eventData?: Record<string, any>): Promise<void>;
    /**
     * Evaluate behavior-based triggers (runs on cron)
     */
    evaluateBehaviorTriggers(): Promise<void>;
    /**
     * Evaluate time-based triggers (runs daily)
     */
    evaluateTimeBasedTriggers(): Promise<void>;
    /**
     * Evaluate attribute change triggers
     */
    evaluateAttributeTrigger(subscriberId: string, attribute: string, oldValue: any, newValue: any): Promise<void>;
    /**
     * Private: Create trigger
     */
    private createTrigger;
    /**
     * Private: Evaluate conditions
     */
    private evaluateConditions;
    /**
     * Private: Evaluate cart abandonment
     */
    private evaluateCartAbandonment;
    /**
     * Private: Evaluate inactive subscribers
     */
    private evaluateInactiveSubscribers;
    /**
     * Private: Evaluate browsing pattern
     */
    private evaluateBrowsingPattern;
    /**
     * Private: Evaluate daily triggers
     */
    private evaluateDailyTriggers;
    /**
     * Private: Evaluate weekly triggers
     */
    private evaluateWeeklyTriggers;
    /**
     * Private: Evaluate monthly triggers
     */
    private evaluateMonthlyTriggers;
    /**
     * Private: Evaluate birthday triggers
     */
    private evaluateBirthdayTriggers;
    /**
     * Private: Evaluate anniversary triggers
     */
    private evaluateAnniversaryTriggers;
    /**
     * Private: Get target subscribers for automation
     */
    private getTargetSubscribers;
    /**
     * Private: Create scheduled trigger
     */
    private createScheduledTrigger;
    /**
     * Private: Calculate schedule time
     */
    private calculateScheduleTime;
}
//# sourceMappingURL=trigger-evaluator.service.d.ts.map