import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TemplateService } from '../template.service';
import { TemplateFileService } from './template-file.service';
import { MjmlRendererService } from './mjml-renderer.service';
import {
  UnifiedTemplate,
  TemplateSource,
  TemplateRenderOptions,
  TemplateRenderResult,
} from '../types/unified-template.types';
import { EmailTemplate } from '../entities/email-template.entity';

/**
 * UnifiedTemplateService
 *
 * Single entry point for all email template operations.
 * Supports both database-based (JSON/MJML) and file-based (HTML) templates
 * with automatic detection and unified interface.
 *
 * Strategy:
 * 1. UUID pattern → Database lookup
 * 2. Name lookup → Database (if exists)
 * 3. Fallback → File-based templates
 *
 * This approach ensures:
 * - Zero breaking changes (existing file-based templates work)
 * - Future-proof (new templates use database)
 * - Clean interface (single point of entry)
 */
@Injectable()
export class UnifiedTemplateService {
  private readonly logger = new Logger(UnifiedTemplateService.name);

  constructor(
    private readonly templateService: TemplateService,
    private readonly templateFileService: TemplateFileService,
    private readonly mjmlRenderer: MjmlRendererService,
  ) {}

  /**
   * Get template with auto-detection
   *
   * @param identifier - UUID (database) or name (database/file)
   * @returns Unified template object
   */
  async getTemplate(identifier: string): Promise<UnifiedTemplate> {
    this.logger.debug(`Getting template: ${identifier}`);

    // Strategy 1: UUID pattern → Database
    if (this.isUUID(identifier)) {
      return this.getFromDatabase(identifier);
    }

    // Strategy 2: Try database by name
    try {
      const dbTemplate = await this.templateService.findByName(identifier);
      if (dbTemplate) {
        this.logger.debug(`Template found in database: ${identifier}`);
        return this.mapToUnified(dbTemplate, TemplateSource.DATABASE);
      }
    } catch (error) {
      this.logger.debug(
        `Template not found in database, trying file-based: ${identifier}`,
      );
    }

    // Strategy 3: Fallback to file-based
    return this.getFromFile(identifier);
  }

  /**
   * Render template with unified interface
   *
   * @param identifier - Template UUID or name
   * @param options - Render options with data
   * @returns Rendered HTML
   */
  async renderTemplate(
    identifier: string,
    options: TemplateRenderOptions = {},
  ): Promise<TemplateRenderResult> {
    const template = await this.getTemplate(identifier);
    const { data = {}, interpolate = true } = options;

    if (template.source === TemplateSource.DATABASE && template.structure) {
      // Modern: JSON → MJML → HTML
      this.logger.debug(`Rendering database template with MJML: ${identifier}`);
      const { mjml, html } = this.mjmlRenderer.renderEmail(template.structure);

      const finalHtml = interpolate
        ? this.interpolateVariables(html, data)
        : html;

      return {
        html: finalHtml,
        mjml,
        source: TemplateSource.DATABASE,
      };
    } else {
      // Legacy: HTML → Direct
      this.logger.debug(`Rendering file-based template: ${identifier}`);
      const content = template.compiledHtml || template.content || '';
      const finalHtml = interpolate
        ? this.interpolateVariables(content, data)
        : content;

      return {
        html: finalHtml,
        source: TemplateSource.FILE,
      };
    }
  }

  /**
   * Get template from database by UUID
   */
  private async getFromDatabase(id: string): Promise<UnifiedTemplate> {
    try {
      const template = await this.templateService.findOne(id);
      return this.mapToUnified(template, TemplateSource.DATABASE);
    } catch (error) {
      throw new NotFoundException(
        `Database template not found with ID: ${id}`,
      );
    }
  }

  /**
   * Get template from file system
   */
  private async getFromFile(name: string): Promise<UnifiedTemplate> {
    try {
      // TemplateFileService returns raw TSX content, not compiled HTML
      // For now, we'll use the filename with .tsx extension
      const filename = name.endsWith('.tsx') ? name : `${name}.tsx`;
      const content = await this.templateFileService.getTemplateFileContent(filename);

      return {
        id: name.replace('.tsx', ''),
        name: name.replace('.tsx', ''),
        source: TemplateSource.FILE,
        content,
        isActive: true,
        isEditable: false,
      };
    } catch (error) {
      throw new NotFoundException(
        `Template not found in database or files: ${name}`,
      );
    }
  }

  /**
   * Map database entity to unified template
   */
  private mapToUnified(
    template: EmailTemplate,
    source: TemplateSource,
  ): UnifiedTemplate {
    return {
      id: template.id,
      name: template.name,
      description: template.description,
      source,
      structure: template.structure,
      content: template.content,
      compiledMjml: template.compiledMjml,
      compiledHtml: template.compiledHtml,
      type: template.type,
      isActive: template.isActive,
      isEditable: template.isEditable,
      version: template.version,
      variables: template.variables,
      createdFrom: template.createdFrom,
      thumbnailUrl: template.thumbnailUrl,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  /**
   * Check if string is a valid UUID
   */
  private isUUID(str: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  }

  /**
   * Interpolate variables in template
   * Supports {{variable}} syntax
   */
  private interpolateVariables(
    html: string,
    data: Record<string, any>,
  ): string {
    return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  }

  /**
   * List all available templates (database + file)
   */
  async listAllTemplates(): Promise<{
    database: UnifiedTemplate[];
    files: UnifiedTemplate[];
  }> {
    const [dbTemplates, fileTemplates] = await Promise.all([
      this.templateService.findAll(),
      this.templateFileService.getAllTemplateFiles(),
    ]);

    return {
      database: dbTemplates.map((t) =>
        this.mapToUnified(t, TemplateSource.DATABASE),
      ),
      files: fileTemplates.map((f) => ({
        id: f.id,
        name: f.name,
        source: TemplateSource.FILE,
        isActive: true,
        isEditable: false,
      })),
    };
  }

  /**
   * Check if template exists
   */
  async exists(identifier: string): Promise<boolean> {
    try {
      await this.getTemplate(identifier);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get template source type without loading full template
   */
  async getTemplateSource(identifier: string): Promise<TemplateSource> {
    if (this.isUUID(identifier)) {
      return TemplateSource.DATABASE;
    }

    try {
      await this.templateService.findByName(identifier);
      return TemplateSource.DATABASE;
    } catch {
      return TemplateSource.FILE;
    }
  }
}
