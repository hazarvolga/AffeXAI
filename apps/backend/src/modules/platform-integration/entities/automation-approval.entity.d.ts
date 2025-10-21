import { BaseEntity } from '../../../common/entities/base.entity';
import { AutomationRule } from './automation-rule.entity';
import { PlatformEvent } from './platform-event.entity';
/**
 * Approval Status for Automation Actions
 * Tracks the lifecycle of an automation that requires approval
 */
export declare enum ApprovalStatus {
    PENDING = "pending",// Waiting for approval
    APPROVED = "approved",// Approved and executed
    REJECTED = "rejected",// Rejected by approver
    AUTO_APPROVED = "auto_approved",// Auto-approved by system rules
    EXPIRED = "expired"
}
/**
 * Approval Priority
 * Determines urgency of approval request
 */
export declare enum ApprovalPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
/**
 * Action Type Categories
 * Groups actions by their impact level
 */
export declare enum ActionImpactLevel {
    LOW = "low",// Safe to auto-approve (e.g., internal notifications)
    MEDIUM = "medium",// Requires single approval
    HIGH = "high",// Requires multiple approvals
    CRITICAL = "critical"
}
/**
 * Automation Approval Entity
 *
 * Manages approval workflow for automation actions.
 * Prevents accidental/unwanted content publication.
 *
 * Use Cases:
 * - Email campaign sending (prevent wrong content to wrong audience)
 * - Event publishing (prevent draft events going live)
 * - CMS page publishing (prevent unreviewed content)
 * - Certificate sending (prevent wrong certificates to wrong users)
 * - Webhook triggers to external systems
 *
 * Features:
 * - Multi-level approval (single, double, senior)
 * - Auto-approval rules based on conditions
 * - Approval expiration (timeout)
 * - Approval history and audit trail
 * - Notification to approvers
 */
export declare class AutomationApproval extends BaseEntity {
    ruleId: string;
    rule: AutomationRule;
    eventId?: string;
    event?: PlatformEvent;
    status: ApprovalStatus;
    priority: ApprovalPriority;
    impactLevel: ActionImpactLevel;
    pendingActions: Array<{
        type: string;
        config: any;
        order: number;
        estimatedImpact?: {
            affectedUsers?: number;
            affectedRecords?: number;
            externalCalls?: number;
        };
    }>;
    requestedBy: string;
    requestReason?: string;
    requestContext?: Record<string, any>;
    approvedBy?: string;
    approvedAt?: Date;
    approvalComment?: string;
    approvalChain?: Array<{
        userId: string;
        userName: string;
        action: 'approved' | 'rejected';
        comment?: string;
        timestamp: Date;
        ipAddress?: string;
    }>;
    requiredApprovals: number;
    currentApprovals: number;
    expiresAt?: Date;
    isExpired: boolean;
    isExecuted: boolean;
    executedAt?: Date;
    executionResult?: {
        success: boolean;
        actionsExecuted: number;
        errors?: string[];
        timestamp: Date;
    };
    approversNotified: boolean;
    notifiedUsers?: string[];
    /**
     * Check if approval can be granted
     */
    canApprove(): boolean;
    /**
     * Check if approval has expired
     */
    checkExpiration(): boolean;
    /**
     * Add approval to chain
     */
    addApproval(userId: string, userName: string, action: 'approved' | 'rejected', comment?: string, ipAddress?: string): void;
    /**
     * Calculate remaining time until expiration
     */
    getRemainingTime(): number | null;
    /**
     * Get approval summary
     */
    getSummary(): {
        status: string;
        progress: string;
        isUrgent: boolean;
        timeRemaining: string | null;
    };
    /**
     * Determine if action requires approval based on impact level
     */
    static requiresApproval(impactLevel: ActionImpactLevel): boolean;
    /**
     * Get required approval count based on impact level
     */
    static getRequiredApprovalCount(impactLevel: ActionImpactLevel): number;
    /**
     * Calculate expiration time based on priority
     */
    static getExpirationTime(priority: ApprovalPriority): Date;
}
//# sourceMappingURL=automation-approval.entity.d.ts.map