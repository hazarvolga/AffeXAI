import { TemplateService } from '../services/template.service';
import { CreateCmsTemplateDto } from '../dto/create-template.dto';
import { UpdateCmsTemplateDto } from '../dto/update-template.dto';
import { ImportTemplateDto } from '../dto/import-template.dto';
import { PageTemplate } from '../entities/page-template.entity';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    /**
     * Create a new template
     */
    create(createTemplateDto: CreateCmsTemplateDto): Promise<PageTemplate>;
    /**
     * Get all templates
     */
    findAll(category?: string, isFeatured?: string, isActive?: string): Promise<PageTemplate[]>;
    /**
     * Get template statistics
     */
    getStats(): Promise<any>;
    /**
     * Get a single template
     */
    findOne(id: string): Promise<PageTemplate>;
    /**
     * Update a template
     */
    update(id: string, updateTemplateDto: UpdateCmsTemplateDto): Promise<PageTemplate>;
    /**
     * Delete a template (soft delete)
     */
    remove(id: string): Promise<void>;
    /**
     * Increment template usage count
     */
    incrementUsage(id: string): Promise<{
        message: string;
    }>;
    /**
     * Import template from JSON
     */
    import(importTemplateDto: ImportTemplateDto): Promise<PageTemplate>;
    /**
     * Export template as JSON
     */
    export(id: string): Promise<any>;
    /**
     * Duplicate a template
     */
    duplicate(id: string, newName?: string): Promise<PageTemplate>;
}
//# sourceMappingURL=template.controller.d.ts.map