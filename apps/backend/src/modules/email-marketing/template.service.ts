import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate, TemplateType } from './entities/email-template.entity';
import { CreateEmailTemplateDto } from './dto/create-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-template.dto';
import { CloneTemplateDto } from './dto/clone-template.dto';
import { TemplateFileService } from './services/template-file.service';
import { MjmlRendererService } from './services/mjml-renderer.service';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(EmailTemplate)
    private templatesRepository: Repository<EmailTemplate>,
    private readonly templateFileService: TemplateFileService,
    private readonly mjmlRendererService: MjmlRendererService,
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

  async findByName(name: string): Promise<EmailTemplate> {
    const template = await this.templatesRepository.findOne({ where: { name } });
    if (!template) {
      throw new NotFoundException(`Template with name ${name} not found`);
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

  /**
   * Clone an existing template (file-based or DB)
   * Converts file-based templates to editable JSON structure
   */
  async cloneTemplate(
    id: string,
    cloneDto: CloneTemplateDto,
  ): Promise<EmailTemplate> {
    const originalTemplate = await this.findOne(id);

    // Generate new name
    const newName = cloneDto.newName || `${originalTemplate.name} (Copy)`;
    const newDescription = cloneDto.newDescription || originalTemplate.description;
    const makeEditable = cloneDto.makeEditable !== false; // Default true

    // Create cloned template
    const clonedTemplate = this.templatesRepository.create({
      name: newName,
      description: newDescription,
      type: TemplateType.CUSTOM,
      isActive: true,
      isEditable: makeEditable,
      createdFrom: originalTemplate.fileTemplateName || 'cloned',
      version: 1,

      // Copy structure if exists, otherwise create basic structure from HTML
      structure: originalTemplate.structure || this.htmlToStructure(originalTemplate.content),

      // Copy or generate compiled versions
      compiledHtml: originalTemplate.compiledHtml || originalTemplate.content,
      compiledMjml: originalTemplate.compiledMjml,

      // Copy metadata
      variables: originalTemplate.variables,
      thumbnailUrl: originalTemplate.thumbnailUrl,
    });

    // If original has JSON structure, render it
    if (clonedTemplate.structure && makeEditable) {
      const { mjml, html } = this.mjmlRendererService.renderEmail(
        clonedTemplate.structure,
      );
      clonedTemplate.compiledMjml = mjml;
      clonedTemplate.compiledHtml = html;
    }

    return this.templatesRepository.save(clonedTemplate);
  }

  /**
   * Convert legacy HTML content to JSON structure
   * Used when cloning old HTML-only templates
   */
  private htmlToStructure(html: string): any {
    return {
      rows: [
        {
          id: this.generateId(),
          type: 'section',
          columns: [
            {
              id: this.generateId(),
              width: '100%',
              blocks: [
                {
                  id: this.generateId(),
                  type: 'html',
                  properties: {
                    html: html,
                  },
                  styles: {},
                },
              ],
            },
          ],
          settings: {},
        },
      ],
      settings: {
        backgroundColor: '#f5f5f5',
        contentWidth: '600px',
        fonts: [],
      },
    };
  }

  /**
   * Render template structure to HTML
   */
  async renderTemplate(id: string): Promise<{ html: string; mjml: string }> {
    const template = await this.findOne(id);

    if (!template.structure) {
      // Return legacy HTML content
      return {
        html: template.content || template.compiledHtml,
        mjml: null,
      };
    }

    const { mjml, html } = this.mjmlRendererService.renderEmail(
      template.structure,
    );

    // Update compiled versions
    await this.templatesRepository.update(id, {
      compiledHtml: html,
      compiledMjml: mjml,
    });

    return { html, mjml };
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatTemplateName(templateId: string): string {
    // Convert kebab-case to readable format
    return templateId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}