import { Injectable, Logger } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { render } from '@react-email/render';
import * as React from 'react';

/**
 * Template Renderer Service
 * Renders React Email templates with dynamic site settings
 *
 * Architecture:
 * - Runtime: Import React Email .tsx components and render with @react-email/render
 * - Site settings fetched from database and passed as props
 * - Each template render is fresh with current database values
 *
 * Why runtime rendering?
 * - Dynamic site settings (company name, logo, social media, etc.)
 * - No need for variable substitution (Handlebars/Mustache)
 * - Templates are React components that accept props
 * - Always up-to-date with current settings
 */
@Injectable()
export class TemplateRendererService {
  private readonly logger = new Logger(TemplateRendererService.name);

  constructor(private readonly settingsService: SettingsService) {
    this.logger.log(`📧 Template Renderer Service initialized`);
  }

  /**
   * Render a React Email template with dynamic site settings
   * @param templateName - Name of the template (e.g., 'ticket-created')
   * @param context - Variables to pass as props to template
   */
  async renderTemplate(
    templateName: string,
    context: Record<string, any> = {},
  ): Promise<string> {
    try {
      this.logger.log(`📧 Rendering template: ${templateName}`);

      // Fetch site settings from database
      const siteSettings = await this.settingsService.getSiteSettings();

      // Prepare site settings in expected format
      const templateSiteSettings = {
        companyName: siteSettings.companyName || 'Aluplan Program Sistemleri',
        logoUrl: siteSettings.logoDarkUrl || siteSettings.logoUrl || '',
        contact: {
          email: siteSettings.contact?.email || 'destek@aluplan.tr',
          phone: siteSettings.contact?.phone || '',
          address: siteSettings.contact?.address || '',
        },
        socialMedia: siteSettings.socialMedia || {},
      };

      // Import template dynamically
      const templateModule = await this.importTemplate(templateName);
      const TemplateComponent = templateModule.default;

      if (!TemplateComponent) {
        throw new Error(`No default export found in template: ${templateName}`);
      }

      // Render template with React Email
      const html = await render(
        React.createElement(TemplateComponent, {
          ...context,
          siteSettings: templateSiteSettings,
        }),
        { pretty: false }
      );

      this.logger.log(`✅ Template rendered successfully: ${templateName}`);
      return html;
    } catch (error) {
      this.logger.error(
        `❌ Failed to render template ${templateName}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Dynamically import template .tsx file
   */
  private async importTemplate(templateName: string): Promise<any> {
    try {
      // Use dynamic import to load .tsx template at runtime
      // This requires @react-email/render to be available
      const templatePath = `../../emails/${templateName}`;
      return await import(templatePath);
    } catch (error) {
      throw new Error(
        `Failed to import template ${templateName}: ${error.message}\n` +
        `Make sure the template exists at src/emails/${templateName}.tsx`
      );
    }
  }
}
