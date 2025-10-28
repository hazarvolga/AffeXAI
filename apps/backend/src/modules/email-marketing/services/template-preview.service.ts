import { Injectable } from '@nestjs/common';
import { EmailTemplate } from '../entities/email-template.entity';
import { SiteSettingsDto } from '../../settings/dto/site-settings.dto';
import { SettingsService } from '../../settings/settings.service';

/**
 * Service for previewing email templates with site settings injected
 * Database-only architecture - all templates are stored in the database
 */
@Injectable()
export class TemplatePreviewService {
  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  /**
   * Preview template with site settings injected
   * @param template EmailTemplate entity from database
   * @returns Processed HTML content with site settings injected
   */
  async previewTemplate(template: EmailTemplate): Promise<string> {
    // Get site settings
    const siteSettings = await this.settingsService.getSiteSettings();

    // Use compiledHtml if available, otherwise use content
    const templateContent = template.compiledHtml || template.content || '';

    // Inject site settings into template
    return this.injectSiteSettings(templateContent, siteSettings);
  }

  private injectSiteSettings(
    templateContent: string,
    siteSettings: SiteSettingsDto,
  ): string {
    // Replace placeholders with actual site settings
    let processedContent = templateContent;

    // Replace company name
    processedContent = processedContent.replace(
      /siteSettingsData\.companyName/g,
      JSON.stringify(siteSettings.companyName),
    );

    // Replace logo URLs
    processedContent = processedContent.replace(
      /siteSettingsData\.logoUrl/g,
      JSON.stringify(siteSettings.logoUrl),
    );

    processedContent = processedContent.replace(
      /siteSettingsData\.logoDarkUrl/g,
      JSON.stringify(siteSettings.logoDarkUrl),
    );

    // Replace contact information
    processedContent = processedContent.replace(
      /siteSettingsData\.contact\.address/g,
      JSON.stringify(siteSettings.contact.address),
    );

    processedContent = processedContent.replace(
      /siteSettingsData\.contact\.phone/g,
      JSON.stringify(siteSettings.contact.phone),
    );

    processedContent = processedContent.replace(
      /siteSettingsData\.contact\.email/g,
      JSON.stringify(siteSettings.contact.email),
    );

    // Replace social media
    const socialMediaStr = JSON.stringify(siteSettings.socialMedia);
    processedContent = processedContent.replace(
      /siteSettingsData\.socialMedia/g,
      socialMediaStr,
    );

    return processedContent;
  }
}