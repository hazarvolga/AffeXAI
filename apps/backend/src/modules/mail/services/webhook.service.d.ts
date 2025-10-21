import { Repository } from 'typeorm';
import { EmailWebhookEvent } from '../interfaces/webhook-event.interface';
import { EmailSuppression } from '../entities/email-suppression.entity';
import { SubscriberService } from '../../email-marketing/subscriber.service';
export declare class WebhookService {
    private suppressionRepository;
    private subscriberService;
    private readonly logger;
    constructor(suppressionRepository: Repository<EmailSuppression>, subscriberService: SubscriberService);
    /**
     * Process incoming webhook event
     * Provider-agnostic - works with any email provider
     */
    processWebhookEvent(event: EmailWebhookEvent): Promise<void>;
    /**
     * Handle bounce events
     * Hard bounces -> permanent suppression + update subscriber
     * Soft bounces -> log but don't suppress yet
     */
    private handleBounce;
    /**
     * Handle complaint/spam events
     * Always add to suppression list + update subscriber
     */
    private handleComplaint;
    /**
     * Handle unsubscribe events
     */
    private handleUnsubscribe;
    /**
     * Handle successful delivery
     */
    private handleDelivery;
    /**
     * Handle engagement events (open, click)
     */
    private handleEngagement;
    /**
     * Add email to suppression list
     * Prevents future emails to this address
     */
    private addToSuppressionList;
    /**
     * Check if email is suppressed
     * Use this before sending any email
     */
    isEmailSuppressed(email: string): Promise<boolean>;
    /**
     * Get suppression details for an email
     */
    getSuppressionDetails(email: string): Promise<EmailSuppression | null>;
    /**
     * Remove email from suppression list (admin override)
     */
    removeFromSuppressionList(email: string): Promise<void>;
    /**
     * Get all suppressed emails (for admin dashboard)
     */
    getAllSuppressedEmails(): Promise<EmailSuppression[]>;
}
//# sourceMappingURL=webhook.service.d.ts.map