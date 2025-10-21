/**
 * Ticket Assignment Rule Entity
 *
 * Defines rules for automatic ticket assignment to support agents
 *
 * Example:
 * - When category = "billing" → Assign to billing team
 * - When priority = "urgent" → Assign to senior support
 * - When company = "enterprise" → Assign to account manager
 */
export declare class TicketAssignmentRule {
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
     * - { "categoryId": "billing-category-id" } - Only if category is billing
     * - { "priority": "urgent" } - Only if priority is urgent
     * - { "companyName": "Enterprise Corp" } - Only if company is Enterprise Corp
     * - { "metadata.customerTier": "premium" } - Only if customer tier is premium
     */
    conditions: Record<string, any>;
    /**
     * Assignment target (user ID to assign tickets to)
     */
    assignToId: string;
    /**
     * Priority (higher = executed first)
     */
    priority: number;
    /**
     * Should skip assignment if ticket is already assigned?
     */
    skipIfAssigned: boolean;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Check if rule should trigger for given ticket
     */
    shouldTrigger(ticket: any): boolean;
    /**
     * Check if ticket matches conditions
     */
    private matchesConditions;
    /**
     * Get nested property value using dot notation
     */
    private getNestedProperty;
}
//# sourceMappingURL=ticket-assignment-rule.entity.d.ts.map