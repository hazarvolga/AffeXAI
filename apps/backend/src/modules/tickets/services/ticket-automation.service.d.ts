import { TicketsService } from '../tickets.service';
import { Ticket } from '../entities/ticket.entity';
import { TicketEscalationRulesService } from './ticket-escalation-rules.service';
import { Repository } from 'typeorm';
import { TicketMessage } from '../entities/ticket-message.entity';
/**
 * Ticket Automation Service
 * Handles automatic ticket processing and status transitions
 */
export declare class TicketAutomationService {
    private readonly ticketsService;
    private readonly escalationRulesService;
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly logger;
    constructor(ticketsService: TicketsService, escalationRulesService: TicketEscalationRulesService, ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>);
    /**
     * Check for tickets that need auto-closing (resolved for 72+ hours)
     */
    checkForAutoClose(): Promise<void>;
    /**
     * Check for tickets that need auto-transition from pending third party
     */
    checkForPendingThirdPartyTransition(): Promise<void>;
    /**
     * Check for tickets that need escalation
     */
    checkForEscalation(): Promise<void>;
    /**
     * Calculate hours between two dates
     * @private
     */
    private getHoursSinceDate;
    /**
     * Apply escalation actions to a ticket based on rule
     * @private
     */
    private applyEscalationActions;
    /**
     * Escalate ticket by notifying supervisors
     * @private
     */
    private escalateTicket;
}
//# sourceMappingURL=ticket-automation.service.d.ts.map