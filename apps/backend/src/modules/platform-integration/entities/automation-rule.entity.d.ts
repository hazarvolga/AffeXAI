import { BaseEntity } from '../../../common/entities/base.entity';
import { PlatformEventType } from './platform-event.entity';
import { ActionImpactLevel } from './automation-approval.entity';
/**
 * Automation Action Types
 */
export declare enum AutomationActionType {
    CREATE_CAMPAIGN = "email.create_campaign",
    SEND_EMAIL = "email.send",
    ADD_TO_SEGMENT = "email.add_to_segment",
    REMOVE_FROM_SEGMENT = "email.remove_from_segment",
    SEND_NOTIFICATION = "notification.send",
    SEND_SMS = "notification.sms",
    TRIGGER_WEBHOOK = "webhook.trigger",
    CREATE_PAGE_DRAFT = "cms.create_draft",
    PUBLISH_PAGE = "cms.publish",
    ARCHIVE_PAGE = "cms.archive"
}
/**
 * Automation Action Interface
 */
export interface AutomationAction {
    type: AutomationActionType;
    config: Record<string, any>;
    order: number;
}
/**
 * Automation Rule Entity
 *
 * Defines rules for automatic actions when platform events occur
 *
 * Example:
 * - When event.created → Create email campaign
 * - When certificate.issued → Send congratulations email
 * - When page.published → Add to email newsletter segment
 */
export declare class AutomationRule extends BaseEntity {
    /**
     * Rule name
     */
    name: string;
    /**
     * Rule description
     */
    description?: string;
    /**
     * Is rule active?
     */
    isActive: boolean;
    /**
     * Event type that triggers this rule
     */
    triggerEventType: PlatformEventType;
    /**
     * Conditions that must be met for rule to trigger
     *
     * Examples:
     * - { "status": "published" } - Only if event status is published
     * - { "category": "blog" } - Only if page category is blog
     * - { "attendeeCount": { "$gt": 50 } } - Only if attendee count > 50
     */
    triggerConditions: Record<string, any>;
    /**
     * Actions to execute when rule triggers
     *
     * Example:
     * [
     *   {
     *     type: 'email.create_campaign',
     *     config: { templateId: 'xxx', segmentId: 'yyy' },
     *     order: 1
     *   },
     *   {
     *     type: 'notification.send',
     *     config: { recipients: ['admin'], message: 'New campaign created' },
     *     order: 2
     *   }
     * ]
     */
    actions: AutomationAction[];
    /**
     * Priority (higher = executed first)
     */
    priority: number;
    /**
     * APPROVAL SETTINGS
     * Controls if and how this automation requires approval
     */
    /**
     * Does this rule require approval before execution?
     */
    requiresApproval: boolean;
    /**
     * Impact level of this automation's actions
     * Determines approval requirements
     */
    impactLevel: ActionImpactLevel;
    /**
     * Auto-approval conditions
     * If these conditions are met, approval can be skipped
     *
     * Examples:
     * - { "eventSource": "admin" } - Auto-approve if triggered by admin
     * - { "userRole": "manager" } - Auto-approve if user is manager
     * - { "affectedUsers": { "$lt": 10 } } - Auto-approve if < 10 users affected
     */
    autoApprovalConditions?: Record<string, any>;
    /**
     * List of user IDs who can approve this automation
     * Empty array = any admin can approve
     */
    authorizedApprovers: string[];
    /**
     * Total number of times this rule has been executed
     */
    executionCount: number;
    /**
     * Last time this rule was executed
     */
    lastExecutedAt?: Date;
    /**
     * Last execution result
     */
    lastExecutionResult?: {
        success: boolean;
        error?: string;
        actionsExecuted: number;
        timestamp: Date;
    };
    /**
     * Check if rule should trigger for given event
     */
    shouldTrigger(event: any): boolean;
    /**
     * Check if event payload matches trigger conditions
     */
    private matchesConditions;
    /**
     * Record execution
     */
    recordExecution(success: boolean, error?: string, actionsExecuted?: number): void;
}
//# sourceMappingURL=automation-rule.entity.d.ts.map