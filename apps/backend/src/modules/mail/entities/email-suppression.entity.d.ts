import { EmailWebhookEventType, BounceReason } from '../interfaces/webhook-event.interface';
/**
 * Email suppression list
 * Bounce, complaint, unsubscribe olan email'leri saklar
 * Bu listede olan emaillere email gönderilmez
 *
 * Note: Index'ler migration'da oluşturulur (1760427888000-CreateEmailSuppressionTable.ts)
 */
export declare class EmailSuppression {
    id: number;
    email: string;
    reason: string;
    provider: string;
    eventType: EmailWebhookEventType;
    bounceReason?: BounceReason;
    suppressedAt: Date;
    metadata?: Record<string, any>;
}
//# sourceMappingURL=email-suppression.entity.d.ts.map