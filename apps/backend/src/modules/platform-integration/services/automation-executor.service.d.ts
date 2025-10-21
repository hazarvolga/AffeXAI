import { Repository } from 'typeorm';
import { AutomationRule } from '../entities/automation-rule.entity';
import { AutomationApproval } from '../entities/automation-approval.entity';
import { PlatformEvent } from '../entities/platform-event.entity';
/**
 * AutomationExecutor Service
 *
 * Executes automation actions when rules are triggered.
 * Handles approval workflow integration.
 *
 * Features:
 * - Action execution with approval checks
 * - Multi-action sequencing
 * - Error handling and retry logic
 * - Execution logging
 * - Auto-approval based on conditions
 */
export declare class AutomationExecutorService {
    private readonly ruleRepository;
    private readonly approvalRepository;
    private readonly logger;
    constructor(ruleRepository: Repository<AutomationRule>, approvalRepository: Repository<AutomationApproval>);
    /**
     * Listen to automation trigger events from EventBus
     */
    handleAutomationTrigger(data: {
        rule: AutomationRule;
        event: PlatformEvent;
    }): Promise<void>;
    /**
     * Create approval request for automation
     */
    private createApprovalRequest;
    /**
     * Check if auto-approval conditions are met
     */
    private shouldAutoApprove;
    /**
     * Get priority from impact level
     */
    private getPriorityFromImpactLevel;
    /**
     * Estimate impact of an action
     */
    private estimateActionImpact;
    /**
     * Execute automation rule
     */
    executeRule(rule: AutomationRule, event: PlatformEvent): Promise<void>;
    /**
     * Execute a single action
     */
    private executeAction;
    /**
     * Execute approved automation
     * Called when approval is granted
     */
    executeApprovedAutomation(approvalId: string): Promise<void>;
    /**
     * Check and process expired approvals (cron job)
     */
    processExpiredApprovals(): Promise<void>;
}
//# sourceMappingURL=automation-executor.service.d.ts.map