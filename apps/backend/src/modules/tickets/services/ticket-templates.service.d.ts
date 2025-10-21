import { Repository } from 'typeorm';
import { TicketTemplate } from '../entities/ticket-template.entity';
/**
 * Ticket Templates Service
 * Manages pre-defined ticket templates for common issues
 */
export declare class TicketTemplatesService {
    private readonly templateRepository;
    private readonly logger;
    constructor(templateRepository: Repository<TicketTemplate>);
    /**
     * Get all active templates
     */
    findAll(isPublic?: boolean): Promise<TicketTemplate[]>;
    /**
     * Get template by ID
     */
    findOne(id: string): Promise<TicketTemplate>;
    /**
     * Create new template
     */
    create(data: Partial<TicketTemplate>): Promise<TicketTemplate>;
    /**
     * Update template
     */
    update(id: string, data: Partial<TicketTemplate>): Promise<TicketTemplate>;
    /**
     * Delete template (soft delete by marking inactive)
     */
    delete(id: string): Promise<void>;
    /**
     * Toggle template active status
     */
    toggle(id: string): Promise<TicketTemplate>;
    /**
     * Increment template usage count
     */
    incrementUsage(id: string): Promise<void>;
    /**
     * Get templates by category
     */
    findByCategory(categoryId: string): Promise<TicketTemplate[]>;
    /**
     * Get user's private templates
     */
    findByUser(userId: string): Promise<TicketTemplate[]>;
    /**
     * Get popular templates (top 10 by usage)
     */
    getPopular(limit?: number): Promise<TicketTemplate[]>;
    /**
     * Search templates by name or content
     */
    search(query: string): Promise<TicketTemplate[]>;
}
//# sourceMappingURL=ticket-templates.service.d.ts.map