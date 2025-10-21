import { Repository } from 'typeorm';
import { EmailTemplate } from './entities/email-template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateFileService } from './services/template-file.service';
export declare class TemplateService {
    private templatesRepository;
    private readonly templateFileService;
    constructor(templatesRepository: Repository<EmailTemplate>, templateFileService: TemplateFileService);
    create(createTemplateDto: CreateTemplateDto): Promise<EmailTemplate>;
    findAll(): Promise<EmailTemplate[]>;
    findOne(id: string): Promise<EmailTemplate>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<EmailTemplate>;
    remove(id: string): Promise<void>;
    getTemplatesWithFiles(): Promise<{
        dbTemplates: EmailTemplate[];
        fileTemplates: any[];
        total: number;
    }>;
    createFromExistingFile(fileTemplateName: string, customName?: string): Promise<EmailTemplate>;
    private formatTemplateName;
}
//# sourceMappingURL=template.service.d.ts.map