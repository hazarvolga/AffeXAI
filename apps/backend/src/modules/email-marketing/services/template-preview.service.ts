import { Injectable } from '@nestjs/common';
import { TemplateFileService } from './template-file.service';
import { EmailTemplate } from '../entities/email-template.entity';
import { SiteSettingsDto } from '../../settings/dto/site-settings.dto';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class TemplatePreviewService {
  constructor(
    private readonly templateFileService: TemplateFileService,
    private readonly settingsService: SettingsService,
  ) {}

  async previewTemplate(
    templateId: string,
    templateType: 'file' | 'db' = 'file',
  ): Promise<string> {
    let templateContent: string;

    if (templateType === 'file') {
      // Load template from file
      templateContent = await this.templateFileService.getTemplateFileContent(
        `${templateId}.tsx`,
      );
    } else {
      // Load template from database
      // This would require a different approach to fetch from DB
      templateContent = ''; // Placeholder
    }

    // Get site settings
    const siteSettings = await this.settingsService.getSiteSettings();

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