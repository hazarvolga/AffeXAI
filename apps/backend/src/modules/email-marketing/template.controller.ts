import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateEmailTemplateDto } from './dto/create-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-template.dto';
import { CloneTemplateDto } from './dto/clone-template.dto';
import { EmailTemplate } from './entities/email-template.entity';
import { TemplatePreviewService } from './services/template-preview.service';

@Controller('email-templates')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly templatePreviewService: TemplatePreviewService,
  ) {}

  @Post()
  create(@Body() createTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  async findAll() {
    return this.templateService.getTemplatesWithFiles();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EmailTemplate> {
    return this.templateService.findOne(id);
  }

  @Post('from-file/:fileTemplateName')
  createFromFile(
    @Param('fileTemplateName') fileTemplateName: string,
    @Body('name') name?: string,
  ): Promise<EmailTemplate> {
    return this.templateService.createFromExistingFile(fileTemplateName, name);
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
    @Query('type') type: 'file' | 'db' = 'file',
  ): Promise<{ content: string }> {
    try {
      const content = await this.templatePreviewService.previewTemplate(id, type);
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
}