/**
 * Resend Webhook Events
 */
export declare enum ResendWebhookEvent {
    EMAIL_SENT = "email.sent",
    EMAIL_DELIVERED = "email.delivered",
    EMAIL_DELIVERY_DELAYED = "email.delivery_delayed",
    EMAIL_COMPLAINED = "email.complained",
    EMAIL_BOUNCED = "email.bounced",
    EMAIL_OPENED = "email.opened",
    EMAIL_CLICKED = "email.clicked"
}
/**
 * Resend Webhook Payload
 */
interface ResendWebhookPayload {
    type: ResendWebhookEvent;
    created_at: string;
    data: {
        email_id: string;
        from: string;
        to: string[];
        subject: string;
        created_at: string;
        bounce_type?: 'hard' | 'soft';
        bounce_reason?: string;
        complaint_feedback_type?: string;
    };
}
/**
 * Resend Webhook Controller
 * Handles incoming webhooks from Resend for email events
 */
export declare class ResendWebhookController {
    private readonly logger;
    private readonly webhookSecret;
    constructor();
    /**
     * Resend webhook endpoint
     * URL to configure in Resend: https://your-domain.com/api/webhooks/resend
     */
    handleWebhook(payload: ResendWebhookPayload, signature: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Verify webhook signature from Resend
     */
    private verifySignature;
    /**
     * Handle email sent event
     */
    private handleEmailSent;
    /**
     * Handle email delivered event
     */
    private handleEmailDelivered;
    /**
     * Handle email delayed event
     */
    private handleEmailDelayed;
    /**
     * Handle email bounced event (CRITICAL)
     */
    private handleEmailBounced;
    /**
     * Handle email complained event (CRITICAL)
     */
    private handleEmailComplained;
    /**
     * Handle email opened event
     */
    private handleEmailOpened;
    /**
     * Handle email clicked event
     */
    private handleEmailClicked;
}
export {};
//# sourceMappingURL=resend-webhook.controller.d.ts.map