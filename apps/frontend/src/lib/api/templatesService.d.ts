import { BaseApiService } from './base-service';
import type { EmailTemplate, CreateTemplateDto, UpdateTemplateDto } from '@affexai/shared-types';
export type { EmailTemplate, CreateTemplateDto, UpdateTemplateDto, };
export interface FileTemplate {
    id: string;
    name: string;
    fileName: string;
}
export interface TemplateResponse {
    dbTemplates: EmailTemplate[];
    fileTemplates: FileTemplate[];
    total: number;
}
/**
 * Email Templates Service
 * Handles email template operations extending BaseApiService
 */
declare class TemplatesService extends BaseApiService<EmailTemplate, CreateTemplateDto, UpdateTemplateDto> {
    constructor();
    /**
     * Get all templates (override to return custom response type)
     */
    getAll(): Promise<EmailTemplate[]>;
    /**
     * Get all templates with file templates included
     */
    getAllTemplates(): Promise<TemplateResponse>;
    /**
     * Create template from file
     */
    createTemplateFromFile(fileTemplateName: string, name?: string): Promise<EmailTemplate>;
}
export declare const templatesService: TemplatesService;
export default templatesService;
//# sourceMappingURL=templatesService.d.ts.map