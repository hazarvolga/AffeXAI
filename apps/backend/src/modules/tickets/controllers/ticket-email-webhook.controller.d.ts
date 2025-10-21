import { TicketEmailParserService } from '../services/ticket-email-parser.service';
import type { ParsedEmail } from '../services/ticket-email-parser.service';
/**
 * Ticket Email Webhook Controller
 * Receives inbound emails from email service providers
 *
 * Supported providers:
 * - SendGrid Inbound Parse
 * - Mailgun Routes
 * - Postmark Inbound
 * - Custom SMTP forwarding
 */
export declare class TicketEmailWebhookController {
    private readonly emailParserService;
    private readonly logger;
    constructor(emailParserService: TicketEmailParserService);
    /**
     * SendGrid Inbound Parse Webhook
     * https://docs.sendgrid.com/for-developers/parsing-email/setting-up-the-inbound-parse-webhook
     */
    handleSendGridWebhook(payload: any): Promise<{
        success: boolean;
        ticketId?: string;
    }>;
    /**
     * Mailgun Inbound Webhook
     * https://documentation.mailgun.com/en/latest/user_manual.html#routes
     */
    handleMailgunWebhook(payload: any): Promise<{
        success: boolean;
        ticketId?: string;
    }>;
    /**
     * Postmark Inbound Webhook
     * https://postmarkapp.com/developer/webhooks/inbound-webhook
     */
    handlePostmarkWebhook(payload: any): Promise<{
        success: boolean;
        ticketId?: string;
    }>;
    /**
     * Generic webhook for custom email forwarding
     */
    handleGenericWebhook(payload: ParsedEmail): Promise<{
        success: boolean;
        ticketId?: string;
    }>;
    /**
     * Parse SendGrid attachments
     */
    private parseSendGridAttachments;
    /**
     * Parse Mailgun attachments
     */
    private parseMailgunAttachments;
    /**
     * Parse Postmark attachments
     */
    private parsePostmarkAttachments;
}
//# sourceMappingURL=ticket-email-webhook.controller.d.ts.map