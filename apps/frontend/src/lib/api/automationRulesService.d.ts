export interface AutomationRule {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    triggerEventType: string;
    triggerConditions: Record<string, any>;
    actions: Array<{
        type: string;
        config: Record<string, any>;
    }>;
    priority: number;
    requiresApproval: boolean;
    impactLevel: 'low' | 'medium' | 'high' | 'critical';
    autoApprovalConditions?: Record<string, any>;
    authorizedApprovers?: Array<{
        userId: string;
        userName: string;
        email: string;
    }>;
    executionCount: number;
    lastExecutedAt?: string;
    lastExecutionResult?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}
export declare const automationRulesService: {
    /**
     * Get all automation rules
     */
    getAll(): Promise<AutomationRule[]>;
    /**
     * Get active automation rules
     */
    getActive(): Promise<AutomationRule[]>;
    /**
     * Get a single automation rule
     */
    getOne(id: string): Promise<AutomationRule>;
    /**
     * Create a new automation rule
     */
    create(data: Partial<AutomationRule>): Promise<AutomationRule>;
    /**
     * Update an automation rule
     */
    update(id: string, data: Partial<AutomationRule>): Promise<AutomationRule>;
    /**
     * Delete an automation rule
     */
    delete(id: string): Promise<void>;
    /**
     * Toggle automation rule active status
     */
    toggle(id: string): Promise<AutomationRule>;
};
//# sourceMappingURL=automationRulesService.d.ts.map