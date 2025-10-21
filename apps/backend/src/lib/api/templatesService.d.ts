export interface EmailTemplate {
    id: string;
    name: string;
    description?: string;
    content: string;
    thumbnailUrl?: string;
    isDefault: boolean;
    type: 'file_based' | 'custom';
    fileTemplateName?: string;
    variables?: Record<string, any>;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
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
export interface CreateTemplateDto {
    name: string;
    description?: string;
    content: string;
    thumbnailUrl?: string;
    isDefault?: boolean;
    type?: 'file_based' | 'custom';
    fileTemplateName?: string;
    variables?: Record<string, any>;
    isActive?: boolean;
}
export interface UpdateTemplateDto {
    name?: string;
    description?: string;
    content?: string;
    thumbnailUrl?: string;
    isDefault?: boolean;
    type?: 'file_based' | 'custom';
    fileTemplateName?: string;
    variables?: Record<string, any>;
    isActive?: boolean;
}
declare class TemplatesService {
    getAllTemplates(): Promise<TemplateResponse>;
    getTemplateById(id: string): Promise<EmailTemplate>;
    createTemplate(templateData: CreateTemplateDto): Promise<EmailTemplate>;
    createTemplateFromFile(fileTemplateName: string, name?: string): Promise<EmailTemplate>;
    updateTemplate(id: string, templateData: UpdateTemplateDto): Promise<EmailTemplate>;
    deleteTemplate(id: string): Promise<void>;
}
declare const _default: TemplatesService;
export default _default;
//# sourceMappingURL=templatesService.d.ts.map