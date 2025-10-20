import { Injectable, Logger } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';
import { ResendMailAdapter } from './adapters/resend-mail.adapter';
import {
  IMailService,
  SendMailOptions,
  SendMailResult,
  BulkSendOptions,
  MailChannel,
} from './interfaces/mail-service.interface';
import { EmailProvider } from '../settings/dto/email-settings.dto';

/**
 * Mail Service Facade
 * Routes emails through appropriate provider based on settings
 */
@Injectable()
export class MailService implements IMailService {
  private readonly logger = new Logger(MailService.name);
  private adapter: IMailService;

  constructor(private readonly settingsService: SettingsService) {}

  /**
   * Initialize the mail service with current settings
   */
  async initialize(): Promise<void> {
    const settings = await this.settingsService.getEmailSettings();
    
    // Create adapter based on provider
    switch (settings.provider) {
      case EmailProvider.RESEND:
        if (!settings.resend?.apiKey) {
          throw new Error('Resend API key not configured');
        }
        this.adapter = new ResendMailAdapter(settings.resend.apiKey);
        this.logger.log('Mail service initialized with Resend adapter');
        break;

      case EmailProvider.SENDGRID:
        throw new Error('SendGrid adapter not yet implemented');

      case EmailProvider.POSTMARK:
        throw new Error('Postmark adapter not yet implemented');

      case EmailProvider.MAILGUN:
        throw new Error('Mailgun adapter not yet implemented');

      case EmailProvider.SES:
        throw new Error('AWS SES adapter not yet implemented');

      case EmailProvider.SMTP:
        throw new Error('SMTP adapter not yet implemented');

      default:
        throw new Error(`Unknown email provider: ${settings.provider}`);
    }
  }

  /**
   * Ensure adapter is initialized before sending
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.adapter) {
      await this.initialize();
    }
  }

  /**
   * Send a single email with automatic provider routing
   */
  async sendMail(options: SendMailOptions): Promise<SendMailResult> {
    await this.ensureInitialized();

    const settings = await this.settingsService.getEmailSettings();

    // Apply channel-specific defaults if not provided
    const enhancedOptions = await this.applyChannelDefaults(options, settings);

    // Send via adapter
    const result = await this.adapter.sendMail(enhancedOptions);

    // Log the result
    if (result.success) {
      this.logger.log(
        `Email sent successfully [${options.channel}]: ${result.messageId}`
      );
    } else {
      this.logger.error(
        `Email failed [${options.channel}]: ${result.error}`
      );
    }

    return result;
  }

  /**
   * Send multiple emails in bulk
   */
  async sendBulk(options: BulkSendOptions): Promise<SendMailResult[]> {
    await this.ensureInitialized();

    const settings = await this.settingsService.getEmailSettings();

    // Apply defaults to all emails
    const enhancedEmails = await Promise.all(
      options.emails.map((email) => this.applyChannelDefaults(email, settings))
    );

    return this.adapter.sendBulk({
      ...options,
      emails: enhancedEmails,
    });
  }

  /**
   * Validate email address
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Convert HTML to plain text
   */
  htmlToText(html: string): string {
    if (this.adapter) {
      return this.adapter.htmlToText(html);
    }
    // Fallback: basic HTML stripping
    return html.replace(/<[^>]*>/g, '');
  }

  /**
   * Test connection to email provider
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.ensureInitialized();
      return await this.adapter.testConnection();
    } catch (error) {
      this.logger.error(`Connection test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Apply channel-specific defaults from settings
   */
  private async applyChannelDefaults(
    options: SendMailOptions,
    settings: any,
  ): Promise<SendMailOptions> {
    const enhanced = { ...options };

    // Apply from/replyTo based on channel
    if (!enhanced.from) {
      if (options.channel === MailChannel.MARKETING) {
        enhanced.from = {
          name: settings.marketing.fromName,
          email: settings.marketing.fromEmail,
        };
        enhanced.replyTo = enhanced.replyTo || {
          email: settings.marketing.replyToEmail,
        };
      } else {
        // Transactional, Certificate, Event, System use transactional settings
        enhanced.from = {
          name: settings.transactional.fromName,
          email: settings.transactional.fromEmail,
        };
        enhanced.replyTo = enhanced.replyTo || {
          email: settings.transactional.replyToEmail,
        };
      }
    }

    // Apply tracking settings
    if (!enhanced.tracking) {
      enhanced.tracking = {
        clickTracking: settings.tracking?.clickTracking ?? false,
        openTracking: settings.tracking?.openTracking ?? true,
      };
    }

    // For marketing emails, add List-Unsubscribe if not present
    if (
      options.channel === MailChannel.MARKETING &&
      !enhanced.unsubscribe
    ) {
      // Will be filled by specific marketing service with actual unsubscribe URL
      enhanced.unsubscribe = {
        url: undefined, // Placeholder - should be set by caller
      };
    }

    return enhanced;
  }
}
