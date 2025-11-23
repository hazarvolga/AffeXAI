import { TicketPriority } from '../enums/ticket-priority.enum';
/**
 * DTO for creating a ticket template
 */
export declare class CreateTicketTemplateDto {
    name: string;
    description?: string;
    subject: string;
    content: string;
    priority?: TicketPriority;
    categoryId?: string;
    defaultTags?: string[];
    customFields?: Record<string, any>;
    isPublic?: boolean;
}
//# sourceMappingURL=create-template.dto.d.ts.map