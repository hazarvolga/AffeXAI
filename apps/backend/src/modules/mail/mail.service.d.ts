import { SettingsService } from '../settings/settings.service';
import { IMailService, SendMailOptions, SendMailResult, BulkSendOptions } from './interfaces/mail-service.interface';
/**
 * Mail Service Facade
 * Routes emails through appropriate provider based on settings
 */
export declare class MailService implements IMailService {
    private readonly settingsService;
    private readonly logger;
    private adapter;
    constructor(settingsService: SettingsService);
    /**
     * Initialize the mail service with current settings
     */
    initialize(): Promise<void>;
    /**
     * Ensure adapter is initialized before sending
     */
    private ensureInitialized;
    /**
     * Send a single email with automatic provider routing
     */
    sendMail(options: SendMailOptions): Promise<SendMailResult>;
    /**
     * Send multiple emails in bulk
     */
    sendBulk(options: BulkSendOptions): Promise<SendMailResult[]>;
    /**
     * Validate email address
     */
    validateEmail(email: string): boolean;
    /**
     * Convert HTML to plain text
     */
    htmlToText(html: string): string;
    /**
     * Test connection to email provider
     */
    testConnection(): Promise<boolean>;
    /**
     * Apply channel-specific defaults from settings
     */
    private applyChannelDefaults;
}
//# sourceMappingURL=mail.service.d.ts.map