import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';
/**
 * TicketMessage Entity
 * Represents a message/comment in a ticket conversation
 */
export declare class TicketMessage {
    id: string;
    ticketId: string;
    ticket: Ticket;
    authorId: string;
    author: User;
    content: string;
    htmlContent: string;
    isInternal: boolean;
    attachmentIds: string[];
    metadata: Record<string, any>;
    emailMessageId: string;
    contentType: 'plain' | 'html';
    isEdited: boolean;
    editedAt: Date;
    editedById: string;
    editedBy: User;
    originalContent: string;
    isDeleted: boolean;
    deletedAt: Date;
    deletedById: string;
    deletedBy: User;
    createdAt: Date;
}
//# sourceMappingURL=ticket-message.entity.d.ts.map