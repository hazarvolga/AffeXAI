import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketMessage } from './entities/ticket-message.entity';
import { TicketCategory } from './entities/ticket-category.entity';
import { TicketAuditLog } from './entities/ticket-audit-log.entity';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketFiltersDto } from './dto/ticket-filters.dto';
import { AddMessageDto } from './dto/add-message.dto';
import { TicketStatus } from './enums/ticket-status.enum';
import { MailService } from '../mail/mail.service';
import { SlaService } from './services/sla.service';
import { TicketEmailService } from './services/ticket-email.service';
import { TicketAutoTaggingService } from './services/ticket-auto-tagging.service';
import { TicketNotificationsGateway } from './gateways/ticket-notifications.gateway';
/**
 * Tickets Service
 * Business logic for ticket management
 */
export declare class TicketsService {
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly categoryRepository;
    private readonly auditLogRepository;
    private readonly userRepository;
    private readonly mailService;
    private readonly slaService;
    private readonly ticketEmailService;
    private readonly autoTaggingService;
    private readonly notificationsGateway;
    private readonly logger;
    constructor(ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>, categoryRepository: Repository<TicketCategory>, auditLogRepository: Repository<TicketAuditLog>, userRepository: Repository<User>, mailService: MailService, slaService: SlaService, ticketEmailService: TicketEmailService, autoTaggingService: TicketAutoTaggingService, notificationsGateway: TicketNotificationsGateway);
    /**
     * Create a new support ticket
     * @param userId - ID of the user creating the ticket (from @CurrentUser)
     * @param dto - Ticket creation data
     */
    create(userId: string, dto: CreateTicketDto): Promise<Ticket>;
    /**
     * Find all tickets with filters
     * @param filters - Filter criteria
     */
    findAll(filters: TicketFiltersDto): Promise<Ticket[]>;
    /**
     * Find a single ticket by ID
     * @param id - Ticket ID
     */
    findOne(id: string): Promise<Ticket>;
    /**
     * Update ticket status
     * @param id - Ticket ID
     * @param status - New status
     * @param userId - ID of user making the change
     */
    updateStatus(id: string, status: TicketStatus, userId: string): Promise<Ticket>;
    /**
     * Assign ticket to a support agent
     * @param id - Ticket ID
     * @param assignedToId - Support agent user ID
     */
    assignTo(id: string, assignedToId: string, assignerId: string): Promise<Ticket>;
    /**
     * Add a message to a ticket
     * @param ticketId - Ticket ID
     * @param userId - Author user ID
     * @param dto - Message data
     */
    addMessage(ticketId: string, userId: string, dto: AddMessageDto): Promise<TicketMessage>;
    /**
     * Get ticket statistics (basic)
     */
    getStats(): Promise<{
        total: number;
        byStatus: {
            new: number;
            open: number;
            resolved: number;
            closed: number;
        };
    }>;
    /**
     * Find all ticket categories
     */
    findAllCategories(): Promise<TicketCategory[]>;
    /**
     * Manually escalate a ticket
     * Increases priority and sends escalation notifications
     */
    escalateTicket(ticketId: string, escalatedById: string, reason?: string, escalateTo?: string): Promise<Ticket>;
    /**
     * Create audit log entry
     * @private
     */
    private createAuditLog;
    /**
     * Edit a message
     * @param ticketId - Ticket ID
     * @param messageId - Message ID to edit
     * @param userId - ID of user editing the message
     * @param newContent - New message content
     */
    editMessage(ticketId: string, messageId: string, userId: string, newContent: string): Promise<TicketMessage>;
    /**
     * Delete a message (soft delete)
     * @param ticketId - Ticket ID
     * @param messageId - Message ID to delete
     * @param userId - ID of user deleting the message
     */
    deleteMessage(ticketId: string, messageId: string, userId: string): Promise<void>;
    /**
     * Merge multiple tickets into one target ticket
     * All messages from source tickets are moved to target ticket
     * Source tickets are closed with reference to target ticket
     */
    mergeTickets(ticketIds: string[], targetTicketId: string, userId: string, mergeNote?: string): Promise<Ticket>;
    /**
     * Split a ticket into two separate tickets
     * Moves selected messages to a new ticket
     */
    splitTicket(originalTicketId: string, splitData: {
        newTicketSubject: string;
        newTicketDescription: string;
        newTicketPriority: string;
        newTicketCategoryId?: string;
        messageIds: string[];
        splitNote?: string;
    }, userId: string): Promise<{
        originalTicket: Ticket;
        newTicket: Ticket;
    }>;
    /**
     * DEPRECATED - Use TicketEmailService instead
     * Send ticket created email notification
     * @private
     */
    private sendTicketCreatedEmail;
    /**
     * Send ticket assigned email notification
     * @private
     */
    private sendTicketAssignedEmail;
    /**
     * Send new message email notification
     * @private
     */
    private sendNewMessageEmail;
    /**
     * Send ticket resolved email notification
     * @private
     */
    private sendTicketResolvedEmail;
}
//# sourceMappingURL=tickets.service.d.ts.map