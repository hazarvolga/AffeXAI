import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateEmailTemplateDto } from './dto/create-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-template.dto';
import { CloneTemplateDto } from './dto/clone-template.dto';
import { EmailTemplate } from './entities/email-template.entity';
import { TemplatePreviewService } from './services/template-preview.service';
import { UnifiedTemplateService } from './services/unified-template.service';
import { TemplateSource } from './types/unified-template.types';

@Controller('email-templates')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly templatePreviewService: TemplatePreviewService,
    private readonly unifiedTemplateService: UnifiedTemplateService,
  ) {}

  @Post()
  create(@Body() createTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  async findAll(): Promise<EmailTemplate[]> {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EmailTemplate> {
    return this.templateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTemplateDto: UpdateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    return this.templateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.templateService.remove(id);
  }

  @Get(':id/preview')
  async previewTemplate(
    @Param('id') id: string,
  ): Promise<{ content: string }> {
    try {
      const template = await this.templateService.findOne(id);
      const content = await this.templatePreviewService.previewTemplate(template);
      return { content };
    } catch (error) {
      throw new NotFoundException(`Could not preview template ${id}`);
    }
  }

  @Post(':id/clone')
  async cloneTemplate(
    @Param('id') id: string,
    @Body() cloneDto: CloneTemplateDto,
  ): Promise<EmailTemplate> {
    return this.templateService.cloneTemplate(id, cloneDto);
  }

  @Get(':id/render')
  async renderTemplate(
    @Param('id') id: string,
  ): Promise<{ html: string; mjml: string }> {
    return this.templateService.renderTemplate(id);
  }

  // NEW: Unified template endpoints
  @Get('unified/:id')
  async getUnifiedTemplate(@Param('id') id: string) {
    try {
      return await this.unifiedTemplateService.getTemplate(id);
    } catch (error) {
      throw new NotFoundException(`Template not found: ${id}`);
    }
  }

  @Get('unified/:id/preview-html')
  async getUnifiedTemplatePreview(@Param('id') id: string): Promise<{ html: string }> {
    try {
      const dbTemplate = await this.templateService.findOne(id);
      const content = await this.templatePreviewService.previewTemplate(dbTemplate);
      return { html: content };
    } catch (error) {
      throw new NotFoundException(`Could not preview template ${id}: ${error.message}`);
    }
  }

  @Get('unified/all')
  async getAllUnifiedTemplates() {
    return this.unifiedTemplateService.listAllTemplates();
  }
}