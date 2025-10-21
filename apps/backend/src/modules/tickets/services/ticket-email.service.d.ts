import { MailService } from '../../mail/mail.service';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
import { User } from '../../users/entities/user.entity';
/**
 * Ticket Email Service
 * Handles all email notifications for ticket-related events
 */
export declare class TicketEmailService {
    private readonly mailService;
    private readonly logger;
    private readonly baseUrl;
    constructor(mailService: MailService);
    /**
     * Send email when a new ticket is created
     */
    sendTicketCreatedEmail(ticket: Ticket, customer: User): Promise<void>;
    /**
     * Send email when a ticket is assigned to an agent
     */
    sendTicketAssignedEmail(ticket: Ticket, assignedTo: User, assignedBy: User): Promise<void>;
    /**
     * Send email when a new message is added to a ticket
     */
    sendNewMessageEmail(ticket: Ticket, message: TicketMessage, recipient: User, isCustomerMessage: boolean): Promise<void>;
    /**
     * Send email when a ticket is resolved (with CSAT survey)
     */
    sendTicketResolved(ticket: Ticket, surveyToken?: string): Promise<void>;
    /**
     * DEPRECATED: Use sendTicketResolved instead
     * Send email when a ticket is resolved
     */
    sendTicketResolvedEmail(ticket: Ticket, customer: User, resolvedBy: User): Promise<void>;
    /**
     * Send SLA breach alert to support team
     */
    sendSLABreachAlert(ticket: Ticket, breachType: 'first_response' | 'resolution'): Promise<void>;
    /**
     * Send SLA approaching alert (proactive notification)
     */
    sendSLAApproachingAlert(ticket: Ticket, remainingHours: number): Promise<void>;
    /**
     * Send email when ticket is escalated
     */
    sendTicketEscalatedEmail(ticket: Ticket, escalatedTo: User, escalationLevel: number, reason: string): Promise<void>;
}
//# sourceMappingURL=ticket-email.service.d.ts.map