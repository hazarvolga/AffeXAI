import { BaseApiService } from './base-service';
/**
 * Ticket Priority Enum
 */
export declare enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
/**
 * Ticket Status Enum
 */
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    WAITING_CUSTOMER = "waiting_customer",
    PENDING_THIRD_PARTY = "pending_third_party",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
/**
 * Ticket Category Interface
 */
export interface TicketCategory {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    parent?: TicketCategory;
    children?: TicketCategory[];
    ticketCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Ticket Message Interface
 */
export interface TicketMessage {
    id: string;
    ticketId: string;
    userId: string;
    content: string;
    isInternal: boolean;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    attachments?: TicketAttachment[];
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Ticket Attachment Interface
 */
export interface TicketAttachment {
    id: string;
    ticketId: string;
    messageId?: string;
    userId: string;
    filename: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    createdAt: Date;
}
/**
 * Ticket Interface
 */
export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    categoryId: string;
    userId: string;
    assignedToId?: string;
    category?: TicketCategory;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    assignedTo?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    messages?: TicketMessage[];
    attachments?: TicketAttachment[];
    slaFirstResponseDueAt?: Date;
    slaResolutionDueAt?: Date;
    isSLABreached?: boolean;
    responseTimeHours?: number;
    resolutionTimeHours?: number;
    firstResponseAt?: Date;
    resolvedAt?: Date;
    closedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Create Ticket DTO
 */
export interface CreateTicketDto {
    title: string;
    description: string;
    priority: TicketPriority;
    categoryId: string;
}
/**
 * Update Ticket DTO
 */
export interface UpdateTicketDto {
    title?: string;
    description?: string;
    priority?: TicketPriority;
    categoryId?: string;
}
/**
 * Update Ticket Status DTO
 */
export interface UpdateTicketStatusDto {
    status: TicketStatus;
    notes?: string;
}
/**
 * Assign Ticket DTO
 */
export interface AssignTicketDto {
    assignedToId: string;
}
/**
 * Add Ticket Message DTO
 */
export interface AddTicketMessageDto {
    content: string;
    isInternal?: boolean;
}
/**
 * Filter Tickets DTO
 */
export interface FilterTicketsDto {
    status?: TicketStatus;
    priority?: TicketPriority;
    categoryId?: string;
    userId?: string;
    assignedToId?: string;
    search?: string;
    page?: number;
    limit?: number;
}
/**
 * Ticket Statistics
 */
export interface TicketStats {
    byStatus: Record<TicketStatus, number>;
    byPriority: Record<TicketPriority, number>;
    byCategory: Record<string, number>;
    total: number;
    openTickets: number;
    resolvedToday: number;
    averageResponseTime: number;
    sla: {
        breached: number;
        breachRate: number;
        averageResponseTimeHours: number;
        averageResolutionTimeHours: number;
    };
}
/**
 * Tickets Service
 * Handles all ticket-related API operations with type safety
 */
declare class TicketsService extends BaseApiService<Ticket, CreateTicketDto, UpdateTicketDto> {
    constructor();
    /**
     * Get all tickets with optional filters
     */
    getTickets(filters?: FilterTicketsDto): Promise<Ticket[]>;
    /**
     * Get ticket by ID with full details (messages, attachments, etc.)
     */
    getTicketById(id: string): Promise<Ticket>;
    /**
     * Create new ticket
     */
    createTicket(data: CreateTicketDto): Promise<Ticket>;
    /**
     * Update ticket
     */
    updateTicket(id: string, data: UpdateTicketDto): Promise<Ticket>;
    /**
     * Update ticket status
     */
    updateTicketStatus(id: string, data: UpdateTicketStatusDto): Promise<Ticket>;
    /**
     * Assign ticket to user
     */
    assignTicket(id: string, data: AssignTicketDto): Promise<Ticket>;
    /**
     * Add message to ticket
     */
    addMessage(id: string, data: AddTicketMessageDto): Promise<TicketMessage>;
    /**
     * Get all ticket categories (hierarchical)
     */
    getCategories(): Promise<TicketCategory[]>;
    /**
     * Get ticket statistics
     */
    getStats(): Promise<TicketStats>;
    /**
     * Close ticket (convenience method)
     */
    closeTicket(id: string, notes?: string): Promise<Ticket>;
    /**
     * Resolve ticket (convenience method)
     */
    resolveTicket(id: string, notes?: string): Promise<Ticket>;
    /**
     * Reopen ticket (convenience method)
     */
    reopenTicket(id: string, notes?: string): Promise<Ticket>;
    /**
     * Merge tickets
     */
    mergeTickets(ticketIds: string[], targetTicketId: string, mergeNote?: string): Promise<Ticket>;
    /**
     * Split ticket
     */
    splitTicket(originalTicketId: string, splitData: {
        newTicketSubject: string;
        newTicketDescription: string;
        newTicketPriority?: string;
        newTicketCategoryId?: string;
        messageIds?: string[];
        splitNote?: string;
    }): Promise<{
        originalTicket: Ticket;
        newTicket: Ticket;
    }>;
    /**
     * Get my tickets (current user's tickets)
     */
    getMyTickets(filters?: Omit<FilterTicketsDto, 'userId'>): Promise<Ticket[]>;
    /**
     * Get priority label in Turkish
     */
    getPriorityLabel(priority: TicketPriority): string;
    /**
     * Get status label in Turkish
     */
    getStatusLabel(status: TicketStatus): string;
    /**
     * Get priority color for UI
     */
    getPriorityColor(priority: TicketPriority): string;
    /**
     * Get status color for UI
     */
    getStatusColor(status: TicketStatus): string;
}
export declare const ticketsService: TicketsService;
export default ticketsService;
//# sourceMappingURL=ticketsService.d.ts.map