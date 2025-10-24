import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate, TemplateType } from './entities/email-template.entity';
import { CreateEmailTemplateDto } from './dto/create-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-template.dto';
import { TemplateFileService } from './services/template-file.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(EmailTemplate)
    private templatesRepository: Repository<EmailTemplate>,
    private readonly templateFileService: TemplateFileService,
  ) {}

  async create(createTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    const template = this.templatesRepository.create(createTemplateDto);
    return this.templatesRepository.save(template);
  }

  async findAll(): Promise<EmailTemplate[]> {
    return this.templatesRepository.find();
  }

  async findOne(id: string): Promise<EmailTemplate> {
    const template = await this.templatesRepository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async update(id: string, updateTemplateDto: UpdateEmailTemplateDto): Promise<EmailTemplate> {
    const template = await this.findOne(id);
    Object.assign(template, updateTemplateDto);
    return this.templatesRepository.save(template);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findOne(id);
    await this.templatesRepository.remove(template);
  }

  async getTemplatesWithFiles(): Promise<{ 
    dbTemplates: EmailTemplate[]; 
    fileTemplates: any[]; 
    total: number 
  }> {
    const dbTemplates = await this.findAll();
    const fileTemplates = await this.templateFileService.getAllTemplateFiles();
    
    return {
      dbTemplates,
      fileTemplates,
      total: dbTemplates.length + fileTemplates.length,
    };
  }

  async createFromExistingFile(
    fileTemplateName: string,
    customName?: string,
  ): Promise<EmailTemplate> {
    try {
      const content = await this.templateFileService.getTemplateFileContent(
        `${fileTemplateName}.tsx`,
      );
      
      const createDto: CreateEmailTemplateDto = {
        name: customName || this.formatTemplateName(fileTemplateName),
        content,
        type: TemplateType.CUSTOM,
        fileTemplateName,
        isActive: true,
      };
      
      return this.create(createDto);
    } catch (error) {
      throw new NotFoundException(
        `Could not create template from file ${fileTemplateName}`,
      );
    }
  }

  private formatTemplateName(templateId: string): string {
    // Convert kebab-case to readable format
    return templateId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}