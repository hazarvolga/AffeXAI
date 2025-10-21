import { User } from '../../users/entities/user.entity';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketMessage } from './ticket-message.entity';
import { TicketCategory } from './ticket-category.entity';
/**
 * Ticket Entity
 * Represents a support ticket in the system
 */
export declare class Ticket {
    id: string;
    subject: string;
    description: string;
    categoryId: string;
    category: TicketCategory;
    status: TicketStatus;
    priority: TicketPriority;
    userId: string;
    user: User;
    assignedToId: string;
    assignedTo: User;
    companyName: string;
    metadata: Record<string, any>;
    tags: string[];
    customFields: Record<string, any>;
    firstResponseAt: Date;
    resolvedAt: Date;
    closedAt: Date;
    slaFirstResponseDueAt: Date;
    slaResolutionDueAt: Date;
    isSLABreached: boolean;
    responseTimeHours: number;
    resolutionTimeHours: number;
    escalationLevel: number;
    lastEscalatedAt: Date;
    escalationHistory: Array<{
        level: number;
        escalatedAt: Date;
        escalatedBy: string;
        reason: string;
        assignedToId?: string;
    }>;
    mergedTicketIds: string[];
    messages: TicketMessage[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ticket.entity.d.ts.map