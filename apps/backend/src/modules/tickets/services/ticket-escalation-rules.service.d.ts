import { Repository } from 'typeorm';
import { TicketEscalationRule } from '../entities/ticket-escalation-rule.entity';
import { Ticket } from '../entities/ticket.entity';
/**
 * Ticket Escalation Rules Service
 *
 * Manages ticket escalation rules and executes automatic escalations
 */
export declare class TicketEscalationRulesService {
    private readonly ruleRepository;
    private readonly logger;
    constructor(ruleRepository: Repository<TicketEscalationRule>);
    /**
     * Get all active escalation rules ordered by priority
     */
    getActiveRules(): Promise<TicketEscalationRule[]>;
    /**
     * Get escalation rule by ID
     */
    findOne(id: string): Promise<TicketEscalationRule>;
    /**
     * Create new escalation rule
     */
    create(data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule>;
    /**
     * Update escalation rule
     */
    update(id: string, data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule>;
    /**
     * Delete escalation rule
     */
    delete(id: string): Promise<void>;
    /**
     * Toggle rule active status
     */
    toggle(id: string): Promise<TicketEscalationRule>;
    /**
     * Get all escalation rules
     */
    findAll(): Promise<TicketEscalationRule[]>;
    /**
     * Check if rule has already been applied to ticket max times
     */
    hasReachedMaxApplications(rule: TicketEscalationRule, ticket: Ticket): boolean;
}
//# sourceMappingURL=ticket-escalation-rules.service.d.ts.map