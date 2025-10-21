/**
 * Ticket Escalation Rule Entity
 *
 * Defines rules for automatic ticket escalation based on various conditions
 *
 * Example:
 * - When priority = "urgent" and no response in 2 hours → Escalate to Tier 2
 * - When category = "billing" and open for 24 hours → Escalate to Billing Manager
 */
export declare class TicketEscalationRule {
    id: string;
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
     * Conditions that must be met for rule to trigger
     *
     * Examples:
     * - { "priority": "urgent" } - Only if priority is urgent
     * - { "status": "new" } - Only if status is new
     * - { "hoursSinceCreation": { "$gte": 2 } } - Only if open for 2+ hours
     * - { "categoryId": "billing-category-id" } - Only if category is billing
     * - { "escalationLevel": 0 } - Only if not yet escalated
     */
    conditions: Record<string, any>;
    /**
     * Escalation actions to take when rule triggers
     *
     * Example:
     * {
     *   "assignToId": "manager-user-id",
     *   "setPriority": "high",
     *   "addNote": "Automatically escalated due to SLA breach",
     *   "notifySupervisors": true,
     *   "increaseEscalationLevel": true
     * }
     */
    actions: Record<string, any>;
    /**
     * Priority (higher = executed first)
     */
    priority: number;
    /**
     * Maximum number of times this rule can be applied to a ticket
     */
    maxApplications: number;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Check if rule should trigger for given ticket and context
     */
    shouldTrigger(ticket: any, context: {
        hoursSinceCreation: number;
        hoursSinceUpdate: number;
        escalationLevel: number;
    }): boolean;
    /**
     * Check if ticket and context match conditions
     */
    private matchesConditions;
    /**
     * Get nested property value using dot notation
     */
    private getNestedProperty;
}
//# sourceMappingURL=ticket-escalation-rule.entity.d.ts.map