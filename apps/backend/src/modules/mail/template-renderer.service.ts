import { Injectable, Logger } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Template Renderer Service
 * Loads pre-compiled HTML email templates
 *
 * Architecture:
 * - Build time: React Email templates (.tsx) → compiled to static HTML (.html)
 * - Runtime: Simply load pre-compiled HTML from disk
 *
 * Why pre-compiled templates?
 * - NestJS can't dynamically import .tsx files at runtime
 * - No JSX/React runtime dependency in production
 * - Fastest possible email rendering (just file read)
 * - Production-ready and reliable
 *
 * IMPORTANT: Templates are compiled with sample data at build time.
 * For production, you must implement dynamic variable injection (Handlebars/Mustache/etc)
 * or generate multiple variants at build time.
 */
@Injectable()
export class TemplateRendererService {
  private readonly logger = new Logger(TemplateRendererService.name);
  private readonly templatesDir: string;
  private templateCache: Map<string, string> = new Map();

  constructor(private readonly settingsService: SettingsService) {
    // Templates are pre-compiled at build time to dist/templates/
    this.templatesDir = path.join(__dirname, '../../templates');
    this.logger.log(`📧 Template directory: ${this.templatesDir}`);
  }

  /**
   * Render a pre-compiled HTML template
   * @param templateName - Name of the template (e.g., 'ticket-created')
   * @param context - Variables (currently unused - templates are static)
   */
  async renderTemplate(
    templateName: string,
    context: Record<string, any> = {},
  ): Promise<string> {
    try {
      this.logger.log(`📧 Loading template: ${templateName}`);

      // Load pre-compiled HTML template (already rendered with React Email)
      const html = await this.loadTemplate(templateName);

      this.logger.log(`✅ Template loaded successfully: ${templateName}`);
      return html;
    } catch (error) {
      this.logger.error(
        `❌ Failed to load template ${templateName}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Load pre-compiled HTML template from disk
   * Uses caching to avoid repeated file reads
   */
  private async loadTemplate(templateName: string): Promise<string> {
    // Check cache first
    if (this.templateCache.has(templateName)) {
      this.logger.debug(`📦 Template loaded from cache: ${templateName}`);
      return this.templateCache.get(templateName)!;
    }

    // Load from disk
    const templatePath = path.join(this.templatesDir, `${templateName}.html`);

    if (!fs.existsSync(templatePath)) {
      const available = this.getAvailableTemplates();
      throw new Error(
        `Template file not found: ${templatePath}\n` +
        `Available templates (${available.length}): ${available.join(', ')}\n` +
        `Did you run 'npm run compile:templates' before 'npm run build'?`
      );
    }

    const html = fs.readFileSync(templatePath, 'utf-8');

    // Cache the template
    this.templateCache.set(templateName, html);

    this.logger.log(`📄 Template loaded from disk: ${templateName} (${html.length} bytes)`);
    return html;
  }

  /**
   * Get list of available pre-compiled templates
   */
  private getAvailableTemplates(): string[] {
    try {
      if (!fs.existsSync(this.templatesDir)) {
        return [];
      }

      return fs.readdirSync(this.templatesDir)
        .filter(file => file.endsWith('.html'))
        .map(file => file.replace('.html', ''));
    } catch (error) {
      this.logger.warn(`Failed to list templates: ${error.message}`);
      return [];
    }
  }

  /**
   * Clear template cache (useful for development)
   */
  clearCache(): void {
    this.templateCache.clear();
    this.logger.log('🗑️  Template cache cleared');
  }
}
