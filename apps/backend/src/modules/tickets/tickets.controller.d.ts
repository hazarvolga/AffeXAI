import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { AddMessageDto } from './dto/add-message.dto';
import { TicketFiltersDto } from './dto/ticket-filters.dto';
import { MergeTicketsDto } from './dto/merge-tickets.dto';
import { SplitTicketDto } from './dto/split-ticket.dto';
/**
 * Tickets Controller
 * RESTful API endpoints for ticket management
 * Protected with JWT authentication
 */
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    /**
     * Create a new support ticket
     * Available to: CUSTOMER role and above
     */
    create(createTicketDto: CreateTicketDto, userId: string): Promise<import("./entities").Ticket>;
    /**
     * Get all tickets with filters
     * Role-based access:
     * - CUSTOMER: Only their own tickets
     * - ADMIN/EDITOR: All tickets
     */
    findAll(filters: TicketFiltersDto, user: any): Promise<import("./entities").Ticket[]>;
    /**
     * Get a single ticket by ID
     * Customers can only view their own tickets
     */
    findOne(id: string, user: any): Promise<import("./entities").Ticket>;
    /**
     * Update ticket status
     * Available to: ADMIN and EDITOR roles only
     */
    updateStatus(id: string, updateStatusDto: UpdateStatusDto, userId: string): Promise<import("./entities").Ticket>;
    /**
     * Assign ticket to a support agent
     * Available to: ADMIN and EDITOR roles only
     */
    assign(id: string, assignTicketDto: AssignTicketDto, req: any): Promise<import("./entities").Ticket>;
    /**
     * Add a message to a ticket
     * All authenticated users can add messages to tickets they have access to
     */
    addMessage(id: string, addMessageDto: AddMessageDto, user: any): Promise<import("./entities").TicketMessage>;
    /**
     * Get ticket statistics
     * Available to: ADMIN and EDITOR roles only
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
     * Manually escalate a ticket
     * Available to: ADMIN and EDITOR roles only
     */
    escalateTicket(id: string, body: {
        reason?: string;
        escalateTo?: string;
    }, req: any): Promise<import("./entities").Ticket>;
    /**
     * Get all ticket categories
     */
    getCategories(): Promise<import("./entities").TicketCategory[]>;
    /**
     * Merge tickets
     * Available to: ADMIN and EDITOR roles only
     */
    mergeTickets(mergeTicketsDto: MergeTicketsDto, userId: string): Promise<import("./entities").Ticket>;
    /**
     * Split ticket
     * Available to: ADMIN and EDITOR roles only
     */
    splitTicket(splitTicketDto: SplitTicketDto, userId: string): Promise<{
        originalTicket: import("./entities").Ticket;
        newTicket: import("./entities").Ticket;
    }>;
}
//# sourceMappingURL=tickets.controller.d.ts.map