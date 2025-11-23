import { TicketTemplatesService } from '../services/ticket-templates.service';
import { CreateTicketTemplateDto } from '../dto/create-template.dto';
import { UpdateTicketTemplateDto } from '../dto/update-template.dto';
/**
 * Ticket Templates Controller
 * RESTful API endpoints for ticket template management
 */
export declare class TicketTemplatesController {
    private readonly templatesService;
    constructor(templatesService: TicketTemplatesService);
    /**
     * Get all active templates
     */
    findAll(isPublic?: string): Promise<import("../entities/ticket-template.entity").TicketTemplate[]>;
    /**
     * Get popular templates
     */
    getPopular(limit?: number): Promise<import("../entities/ticket-template.entity").TicketTemplate[]>;
    /**
     * Search templates
     */
    search(query: string): Promise<import("../entities/ticket-template.entity").TicketTemplate[]>;
    /**
     * Get user's private templates
     */
    getMyTemplates(userId: string): Promise<import("../entities/ticket-template.entity").TicketTemplate[]>;
    /**
     * Get template by ID
     */
    findOne(id: string): Promise<import("../entities/ticket-template.entity").TicketTemplate>;
    /**
     * Get templates by category
     */
    findByCategory(categoryId: string): Promise<import("../entities/ticket-template.entity").TicketTemplate[]>;
    /**
     * Create new template
     */
    create(createTemplateDto: CreateTicketTemplateDto, userId: string): Promise<import("../entities/ticket-template.entity").TicketTemplate>;
    /**
     * Update template
     */
    update(id: string, updateTemplateDto: UpdateTicketTemplateDto): Promise<import("../entities/ticket-template.entity").TicketTemplate>;
    /**
     * Toggle template active status
     */
    toggle(id: string): Promise<import("../entities/ticket-template.entity").TicketTemplate>;
    /**
     * Increment template usage
     */
    incrementUsage(id: string): Promise<{
        success: boolean;
    }>;
    /**
     * Delete template
     */
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ticket-templates.controller.d.ts.map