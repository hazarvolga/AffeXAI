import { WebhookService } from '../services/webhook.service';
import type { ResendWebhookPayload } from '../interfaces/webhook-event.interface';
/**
 * Resend webhook controller
 * Receives webhooks from Resend and processes them
 *
 * Setup in Resend dashboard:
 * 1. Go to Webhooks section
 * 2. Add endpoint: https://yourdomain.com/api/webhooks/resend
 * 3. Select events: email.delivered, email.bounced, email.complained, email.opened, email.clicked
 * 4. Copy signing secret to environment: RESEND_WEBHOOK_SECRET
 */
export declare class ResendWebhookController {
    private readonly webhookService;
    private readonly logger;
    constructor(webhookService: WebhookService);
    handleWebhook(svixId: string, svixTimestamp: string, svixSignature: string, payload: ResendWebhookPayload): Promise<{
        success: boolean;
    }>;
    /**
     * Map Resend-specific webhook payload to generic EmailWebhookEvent
     */
    private mapResendToGenericEvent;
    /**
     * Map Resend bounce message to normalized bounce reason
     */
    private mapResendBounceReason;
}
//# sourceMappingURL=resend-webhook.controller.d.ts.map