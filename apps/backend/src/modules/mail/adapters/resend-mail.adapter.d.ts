import { IMailService, SendMailOptions, SendMailResult, BulkSendOptions } from '../interfaces/mail-service.interface';
/**
 * Resend Email Service Adapter
 * Implements IMailService using Resend API
 */
export declare class ResendMailAdapter implements IMailService {
    private readonly apiKey;
    private readonly logger;
    private resend;
    private readonly providerName;
    constructor(apiKey: string);
    /**
     * Send a single email via Resend
     */
    sendMail(options: SendMailOptions): Promise<SendMailResult>;
    /**
     * Send multiple emails in bulk
     */
    sendBulk(options: BulkSendOptions): Promise<SendMailResult[]>;
    /**
     * Validate email address format
     */
    validateEmail(email: string): boolean;
    /**
     * Convert HTML to plain text
     */
    htmlToText(html: string): string;
    /**
     * Test connection to Resend API
     */
    testConnection(): Promise<boolean>;
    /**
     * Format a single recipient
     */
    private formatRecipient;
    /**
     * Format multiple recipients
     */
    private formatRecipients;
    /**
     * Build tracking headers
     */
    private buildTrackingHeaders;
    /**
     * Build List-Unsubscribe headers
     */
    private buildUnsubscribeHeaders;
    /**
     * Delay helper for rate limiting
     */
    private delay;
}
//# sourceMappingURL=resend-mail.adapter.d.ts.map