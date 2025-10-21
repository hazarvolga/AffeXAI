import { Repository } from 'typeorm';
import { PageTemplate } from '../entities/page-template.entity';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { UpdateTemplateDto } from '../dto/update-template.dto';
import { ImportTemplateDto, ExportTemplateResponseDto } from '../dto/import-template.dto';
export declare class TemplateService {
    private readonly templateRepository;
    constructor(templateRepository: Repository<PageTemplate>);
    /**
     * Create a new template
     */
    create(createTemplateDto: CreateTemplateDto): Promise<PageTemplate>;
    /**
     * Find all templates with optional filtering
     */
    findAll(options?: {
        category?: string;
        isFeatured?: boolean;
        isActive?: boolean;
    }): Promise<PageTemplate[]>;
    /**
     * Find one template by ID
     */
    findOne(id: string): Promise<PageTemplate>;
    /**
     * Update a template
     */
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<PageTemplate>;
    /**
     * Delete a template (soft delete by setting isActive = false)
     */
    remove(id: string): Promise<void>;
    /**
     * Hard delete a template
     */
    hardDelete(id: string): Promise<void>;
    /**
     * Increment usage count
     */
    incrementUsage(id: string): Promise<void>;
    /**
     * Import template from JSON
     */
    import(importTemplateDto: ImportTemplateDto): Promise<PageTemplate>;
    /**
     * Export template as JSON
     */
    export(id: string): Promise<ExportTemplateResponseDto>;
    /**
     * Get template statistics
     */
    getStats(): Promise<{
        total: number;
        byCategory: Record<string, number>;
        featured: number;
        totalUsage: number;
    }>;
    /**
     * Duplicate a template
     */
    duplicate(id: string, newName?: string): Promise<PageTemplate>;
}
//# sourceMappingURL=template.service.d.ts.map