import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { MailService } from '../../mail/mail.service';
export declare class OptInOutService {
    private readonly subscriberRepository;
    private readonly mailService;
    constructor(subscriberRepository: Repository<Subscriber>, mailService: MailService);
    /**
     * Subscribe a new email with double opt-in
     */
    subscribeWithDoubleOptIn(email: string, data?: {
        firstName?: string;
        lastName?: string;
        company?: string;
        marketingEmails?: boolean;
    }, ipAddress?: string): Promise<{
        message: string;
        requiresConfirmation: boolean;
    }>;
    /**
     * Confirm double opt-in subscription
     */
    confirmOptIn(token: string, ipAddress?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Unsubscribe using token (one-click unsubscribe)
     */
    unsubscribeWithToken(token: string, reason?: string, ipAddress?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Update email preferences
     */
    updatePreferences(email: string, preferences: {
        marketingEmails?: boolean;
        emailNotifications?: boolean;
    }): Promise<Subscriber>;
    /**
     * Re-subscribe (opt back in)
     */
    resubscribe(email: string, ipAddress?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Get subscriber preferences
     */
    getPreferences(email: string): Promise<{
        emailNotifications: boolean;
        marketingEmails: boolean;
        transactionalEmails: boolean;
        status: string;
    }>;
    /**
     * Send opt-in confirmation email
     */
    private sendOptInConfirmationEmail;
    /**
     * Send welcome email
     */
    private sendWelcomeEmail;
    /**
     * Send goodbye email
     */
    private sendGoodbyeEmail;
    /**
     * Check if email can receive marketing emails
     */
    canReceiveMarketingEmails(email: string): Promise<boolean>;
    /**
     * Check if email can receive transactional emails
     */
    canReceiveTransactionalEmails(email: string): Promise<boolean>;
}
//# sourceMappingURL=opt-in-out.service.d.ts.map