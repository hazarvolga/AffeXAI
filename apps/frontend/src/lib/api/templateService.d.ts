import type { PageTemplate } from '@/types/cms-template';
export interface TemplateQueryOptions {
    category?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}
export interface TemplateStats {
    total: number;
    byCategory: Record<string, number>;
    featured: number;
    totalUsage: number;
}
export interface ImportTemplateRequest {
    templateData: string;
    authorId?: string;
}
export interface ExportTemplateResponse {
    id: string;
    name: string;
    data: PageTemplate;
    exportedAt: Date;
}
/**
 * Template API Service
 * Handles all template-related API calls
 */
export declare const templateService: {
    /**
     * Get all templates with optional filtering
     */
    getAll(options?: TemplateQueryOptions): Promise<PageTemplate[]>;
    /**
     * Get a single template by ID
     */
    getById(id: string): Promise<PageTemplate>;
    /**
     * Create a new template
     */
    create(template: Partial<PageTemplate>): Promise<PageTemplate>;
    /**
     * Update a template
     */
    update(id: string, template: Partial<PageTemplate>): Promise<PageTemplate>;
    /**
     * Delete a template (soft delete)
     */
    delete(id: string): Promise<void>;
    /**
     * Get template statistics
     */
    getStats(): Promise<TemplateStats>;
    /**
     * Increment template usage count
     */
    incrementUsage(id: string): Promise<{
        message: string;
    }>;
    /**
     * Import template from JSON
     */
    import(request: ImportTemplateRequest): Promise<PageTemplate>;
    /**
     * Export template as JSON
     */
    export(id: string): Promise<ExportTemplateResponse>;
    /**
     * Duplicate a template
     */
    duplicate(id: string, newName?: string): Promise<PageTemplate>;
    /**
     * Import template from file
     */
    importFromFile(file: File, authorId?: string): Promise<PageTemplate>;
    /**
     * Export template to file (download)
     */
    exportToFile(id: string, filename?: string): Promise<void>;
};
//# sourceMappingURL=templateService.d.ts.map