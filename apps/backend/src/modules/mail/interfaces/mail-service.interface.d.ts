/**
 * Mail Channel Types
 * Defines different types of emails for routing and rate limiting
 */
export declare enum MailChannel {
    TRANSACTIONAL = "transactional",// Password resets, confirmations, etc.
    MARKETING = "marketing",// Newsletters, campaigns
    CERTIFICATE = "certificate",// Certificate delivery emails
    EVENT = "event",// Event notifications
    SUPPORT = "support",// Support ticket notifications
    SYSTEM = "system"
}
/**
 * Email Priority Levels
 */
export declare enum MailPriority {
    HIGH = "high",// Immediate delivery (e.g., password resets)
    NORMAL = "normal",// Standard delivery
    LOW = "low"
}
/**
 * Email Recipient Interface
 */
export interface MailRecipient {
    email: string;
    name?: string;
}
/**
 * Email Attachment Interface
 */
export interface MailAttachment {
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
}
/**
 * Custom Email Headers
 */
export interface MailHeaders {
    [key: string]: string;
}
/**
 * Email Tracking Options
 */
export interface TrackingOptions {
    clickTracking?: boolean;
    openTracking?: boolean;
}
/**
 * List-Unsubscribe Header Configuration
 */
export interface UnsubscribeConfig {
    email?: string;
    url?: string;
    oneClick?: boolean;
}
/**
 * Main Email Options Interface
 */
export interface SendMailOptions {
    to: MailRecipient | MailRecipient[];
    cc?: MailRecipient | MailRecipient[];
    bcc?: MailRecipient | MailRecipient[];
    from?: MailRecipient;
    replyTo?: MailRecipient;
    subject: string;
    html?: string;
    text?: string;
    template?: string;
    context?: Record<string, any>;
    channel: MailChannel;
    priority?: MailPriority;
    attachments?: MailAttachment[];
    headers?: MailHeaders;
    tracking?: TrackingOptions;
    unsubscribe?: UnsubscribeConfig;
    tags?: string[];
    metadata?: Record<string, any>;
}
/**
 * Email Send Result
 */
export interface SendMailResult {
    success: boolean;
    messageId?: string;
    error?: string;
    provider: string;
    timestamp: Date;
}
/**
 * Bulk Email Send Options
 */
export interface BulkSendOptions {
    emails: SendMailOptions[];
    batchSize?: number;
    delayBetweenBatches?: number;
}
/**
 * Mail Service Interface
 * All email providers must implement this interface
 */
export interface IMailService {
    /**
     * Send a single email
     */
    sendMail(options: SendMailOptions): Promise<SendMailResult>;
    /**
     * Send multiple emails
     */
    sendBulk(options: BulkSendOptions): Promise<SendMailResult[]>;
    /**
     * Verify email address syntax
     */
    validateEmail(email: string): boolean;
    /**
     * Generate plain text version from HTML
     */
    htmlToText(html: string): string;
    /**
     * Test connection to email provider
     */
    testConnection(): Promise<boolean>;
}
//# sourceMappingURL=mail-service.interface.d.ts.map