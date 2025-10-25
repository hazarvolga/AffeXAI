import { TemplateService } from './template.service';
import { CreateEmailTemplateDto } from './dto/create-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-template.dto';
import { EmailTemplate } from './entities/email-template.entity';
import { TemplatePreviewService } from './services/template-preview.service';
export declare class TemplateController {
    private readonly templateService;
    private readonly templatePreviewService;
    constructor(templateService: TemplateService, templatePreviewService: TemplatePreviewService);
    create(createTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate>;
    findAll(): Promise<{
        dbTemplates: EmailTemplate[];
        fileTemplates: any[];
        total: number;
    }>;
    findOne(id: string): Promise<EmailTemplate>;
    createFromFile(fileTemplateName: string, name?: string): Promise<EmailTemplate>;
    update(id: string, updateTemplateDto: UpdateEmailTemplateDto): Promise<EmailTemplate>;
    remove(id: string): Promise<void>;
    previewTemplate(id: string, type?: 'file' | 'db'): Promise<{
        content: string;
    }>;
}
//# sourceMappingURL=template.controller.d.ts.map