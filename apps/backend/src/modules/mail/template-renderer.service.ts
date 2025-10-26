import { Injectable, Logger } from '@nestjs/common';
import { render } from '@react-email/render';
import { SettingsService } from '../settings/settings.service';
import * as React from 'react';

/**
 * Template Renderer Service
 * Renders React Email templates to HTML with site settings context
 */
@Injectable()
export class TemplateRendererService {
  private readonly logger = new Logger(TemplateRendererService.name);

  constructor(private readonly settingsService: SettingsService) {}

  /**
   * Render a React Email template to HTML
   * Automatically injects site settings (logo, company name, contact info)
   */
  async renderTemplate(
    templateName: string,
    context: Record<string, any> = {},
  ): Promise<string> {
    try {
      // Get site settings to inject into templates
      const siteSettings = await this.getSiteSettings();

      // Merge context with site settings
      const enhancedContext = {
        ...context,
        siteSettings,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9003',
      };

      // Import and render the appropriate template
      const template = await this.getTemplate(templateName);

      if (!template) {
        throw new Error(`Template not found: ${templateName}`);
      }

      // Render React component to HTML
      const html = render(template(enhancedContext));

      this.logger.log(`Template rendered successfully: ${templateName}`);
      return html;
    } catch (error) {
      this.logger.error(
        `Failed to render template ${templateName}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Get template component by name
   * Dynamically imports the React Email component
   */
  private async getTemplate(templateName: string): Promise<any> {
    const templatePath = this.getTemplatePath(templateName);

    try {
      // Dynamic import of the template
      // Note: In production, templates should be pre-compiled or bundled
      const templateModule = await import(templatePath);
      return templateModule.default || templateModule[this.getTemplateComponentName(templateName)];
    } catch (error) {
      this.logger.error(`Failed to load template: ${templatePath}`, error.stack);
      throw new Error(`Template not found: ${templateName}`);
    }
  }

  /**
   * Map template name to file path
   */
  private getTemplatePath(templateName: string): string {
    // Templates are in the frontend emails directory
    const frontendPath = '../../../frontend/src/emails';

    // Map template names to actual file paths
    const templateMap: Record<string, string> = {
      // Ticket templates
      'ticket-created': `${frontendPath}/ticket-created`,
      'ticket-assigned': `${frontendPath}/ticket-assigned`,
      'ticket-new-message': `${frontendPath}/ticket-new-message`,
      'ticket-resolved': `${frontendPath}/ticket-resolved`,
      'ticket-escalated': `${frontendPath}/ticket-escalated`,
      'csat-survey': `${frontendPath}/csat-survey`,
      'sla-breach-alert': `${frontendPath}/sla-breach-alert`,
      'sla-approaching-alert': `${frontendPath}/sla-approaching-alert`,

      // Certificate templates
      'certificate-issued': `${frontendPath}/certificate-issued`,
      'certificate-reminder': `${frontendPath}/certificate-reminder`,

      // Event templates
      'event-registration-confirmation': `${frontendPath}/event-registration-confirmation`,
      'event-reminder': `${frontendPath}/event-reminder`,
      'event-cancelled': `${frontendPath}/event-cancelled`,

      // Auth templates
      'welcome': `${frontendPath}/welcome`,
      'email-verification': `${frontendPath}/email-verification`,
      'password-reset': `${frontendPath}/password-reset`,
      'password-changed': `${frontendPath}/password-changed`,

      // Email marketing templates
      'campaign': `${frontendPath}/campaign`,
      'newsletter': `${frontendPath}/newsletter`,
    };

    return templateMap[templateName] || `${frontendPath}/${templateName}`;
  }

  /**
   * Get component name from template name
   * Converts kebab-case to PascalCase
   */
  private getTemplateComponentName(templateName: string): string {
    return templateName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Email';
  }

  /**
   * Get site settings for template context
   */
  private async getSiteSettings(): Promise<any> {
    try {
      // Get site settings from SettingsService
      const siteSettings = await this.settingsService.getSiteSettings();

      return {
        companyName: siteSettings.companyName || 'Aluplan',
        logoUrl: siteSettings.logoUrl || 'https://aluplan.tr/logo.png',
        contact: {
          address: siteSettings.contact?.address || '',
          phone: siteSettings.contact?.phone || '',
          email: siteSettings.contact?.email || 'info@aluplan.tr',
        },
        socialMedia: {
          facebook: siteSettings.socialMedia?.facebook || '',
          twitter: siteSettings.socialMedia?.twitter || '',
          linkedin: siteSettings.socialMedia?.linkedin || '',
          instagram: siteSettings.socialMedia?.instagram || '',
        },
      };
    } catch (error) {
      this.logger.warn(`Failed to load site settings: ${error.message}`);
      // Return defaults if settings unavailable
      return {
        companyName: 'Aluplan',
        logoUrl: 'https://aluplan.tr/logo.png',
        contact: {
          address: '',
          phone: '',
          email: 'info@aluplan.tr',
        },
        socialMedia: {},
      };
    }
  }
}
