import { Repository } from 'typeorm';
import { TicketAssignmentRule } from '../entities/ticket-assignment-rule.entity';
import { Ticket } from '../entities/ticket.entity';
/**
 * Ticket Assignment Rules Service
 *
 * Manages ticket assignment rules and executes automatic assignments
 */
export declare class TicketAssignmentRulesService {
    private readonly ruleRepository;
    private readonly logger;
    constructor(ruleRepository: Repository<TicketAssignmentRule>);
    /**
     * Get all active assignment rules ordered by priority
     */
    getActiveRules(): Promise<TicketAssignmentRule[]>;
    /**
     * Get assignment rule by ID
     */
    findOne(id: string): Promise<TicketAssignmentRule>;
    /**
     * Create new assignment rule
     */
    create(data: Partial<TicketAssignmentRule>): Promise<TicketAssignmentRule>;
    /**
     * Update assignment rule
     */
    update(id: string, data: Partial<TicketAssignmentRule>): Promise<TicketAssignmentRule>;
    /**
     * Delete assignment rule
     */
    delete(id: string): Promise<void>;
    /**
     * Toggle rule active status
     */
    toggle(id: string): Promise<TicketAssignmentRule>;
    /**
     * Automatically assign ticket based on rules
     * Returns the assigned user ID or null if no rule matched
     */
    autoAssignTicket(ticket: Ticket): Promise<string | null>;
    /**
     * Get all assignment rules
     */
    findAll(): Promise<TicketAssignmentRule[]>;
}
//# sourceMappingURL=ticket-assignment-rules.service.d.ts.map