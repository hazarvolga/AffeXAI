import { User } from '../../users/entities/user.entity';
import { TicketCategory } from './ticket-category.entity';
import { TicketPriority } from '../enums/ticket-priority.enum';
/**
 * Ticket Template Entity
 * Pre-defined ticket templates for common issues
 */
export declare class TicketTemplate {
    id: string;
    name: string;
    description: string;
    subject: string;
    content: string;
    priority: TicketPriority;
    categoryId: string;
    category: TicketCategory;
    defaultTags: string[];
    customFields: Record<string, any>;
    isActive: boolean;
    isPublic: boolean;
    createdById: string;
    createdBy: User;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ticket-template.entity.d.ts.map