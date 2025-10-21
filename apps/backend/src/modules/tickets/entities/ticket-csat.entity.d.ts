import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';
/**
 * TicketCSAT Entity
 * Customer Satisfaction survey responses for resolved tickets
 */
export declare class TicketCSAT {
    id: string;
    ticketId: string;
    ticket: Ticket;
    customerId: string;
    customer: User;
    rating: number;
    feedback: string;
    surveyToken: string;
    surveyRequestedAt: Date;
    surveyCompletedAt: Date;
    ipAddress: string;
    userAgent: string;
    responses: Record<string, any>;
    createdAt: Date;
}
//# sourceMappingURL=ticket-csat.entity.d.ts.map