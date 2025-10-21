import { TicketPriority } from '../enums/ticket-priority.enum';
/**
 * DTO for creating a new support ticket
 */
export declare class CreateTicketDto {
    subject: string;
    description: string;
    categoryId?: string;
    priority?: TicketPriority;
    companyName?: string;
    metadata?: Record<string, any>;
    tags?: string[];
    customFields?: Record<string, any>;
}
//# sourceMappingURL=create-ticket.dto.d.ts.map