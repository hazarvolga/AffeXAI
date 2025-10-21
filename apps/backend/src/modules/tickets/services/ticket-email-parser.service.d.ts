import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
import { TicketsService } from '../tickets.service';
/**
 * Email Parser Service
 * Parses inbound emails and creates/updates tickets
 */
export interface ParsedEmail {
    from: string;
    fromName?: string;
    to: string;
    subject: string;
    textBody: string;
    htmlBody?: string;
    inReplyTo?: string;
    references?: string[];
    messageId: string;
    receivedAt: Date;
    attachments?: ParsedAttachment[];
}
export interface ParsedAttachment {
    filename: string;
    contentType: string;
    content: Buffer;
    size: number;
}
export declare class TicketEmailParserService {
    private readonly ticketRepository;
    private readonly messageRepository;
    private readonly ticketsService;
    private readonly logger;
    constructor(ticketRepository: Repository<Ticket>, messageRepository: Repository<TicketMessage>, ticketsService: TicketsService);
    /**
     * Parse and process inbound email
     */
    processInboundEmail(email: ParsedEmail): Promise<Ticket>;
    /**
     * Find ticket by email threading headers or subject
     */
    private findTicketByEmail;
    /**
     * Find ticket by message ID stored in metadata
     */
    private findTicketByMessageId;
    /**
     * Extract ticket ID from subject line
     * Supports formats: [#TICKET-123], Ticket #123, Re: #123, etc.
     */
    private extractTicketIdFromSubject;
    /**
     * Create new ticket from email
     */
    private createTicketFromEmail;
    /**
     * Add message to existing ticket
     */
    private addMessageToTicket;
    /**
     * Detect priority from email content
     */
    private detectPriority;
    /**
     * Clean email subject (remove Re:, Fwd:, etc.)
     */
    private cleanSubject;
    /**
     * Extract description from email
     */
    private extractDescription;
    /**
     * Remove email signature
     */
    private removeEmailSignature;
    /**
     * Remove quoted replies (> lines)
     */
    private removeQuotedReplies;
    /**
     * Extract tags from subject/body
     */
    private extractTags;
    /**
     * Validate email format
     */
    validateEmail(email: string): boolean;
}
//# sourceMappingURL=ticket-email-parser.service.d.ts.map