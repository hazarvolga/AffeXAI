import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';
/**
 * DTO for filtering tickets
 */
export declare class TicketFiltersDto {
    status?: TicketStatus;
    priority?: TicketPriority;
    userId?: string;
    assignedToId?: string;
    categoryId?: string;
    search?: string;
    tags?: string[];
}
//# sourceMappingURL=ticket-filters.dto.d.ts.map