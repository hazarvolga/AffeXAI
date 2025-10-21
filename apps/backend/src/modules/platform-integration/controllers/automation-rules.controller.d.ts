import { Repository } from 'typeorm';
import { AutomationRule } from '../entities/automation-rule.entity';
/**
 * Automation Rules Controller
 *
 * CRUD operations for automation rules.
 */
export declare class AutomationRulesController {
    private readonly ruleRepository;
    constructor(ruleRepository: Repository<AutomationRule>);
    /**
     * Get all automation rules
     */
    findAll(): Promise<AutomationRule[]>;
    /**
     * Get active automation rules
     */
    findActive(): Promise<AutomationRule[]>;
    /**
     * Get automation rule by ID
     */
    findOne(id: string): Promise<AutomationRule | null>;
    /**
     * Create new automation rule
     */
    create(data: Partial<AutomationRule>): Promise<AutomationRule>;
    /**
     * Update automation rule
     */
    update(id: string, data: Partial<AutomationRule>): Promise<AutomationRule | null>;
    /**
     * Delete automation rule (soft delete)
     */
    delete(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Toggle rule active status
     */
    toggle(id: string): Promise<AutomationRule>;
}
//# sourceMappingURL=automation-rules.controller.d.ts.map