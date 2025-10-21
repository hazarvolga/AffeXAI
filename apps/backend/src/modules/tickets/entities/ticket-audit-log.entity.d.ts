import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';
/**
 * TicketAuditLog Entity
 * Tracks all changes made to tickets and messages for compliance and debugging
 */
export declare class TicketAuditLog {
    id: string;
    ticketId: string;
    ticket: Ticket;
    userId: string;
    user: User;
    action: string;
    entityType: string;
    entityId: string;
    oldValues: Record<string, any>;
    newValues: Record<string, any>;
    description: string;
    ipAddress: string;
    userAgent: string;
    metadata: Record<string, any>;
    createdAt: Date;
}
//# sourceMappingURL=ticket-audit-log.entity.d.ts.map