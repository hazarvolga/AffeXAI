import { OptInOutService } from '../services/opt-in-out.service';
import type { Request } from 'express';
export declare class OptInOutController {
    private readonly optInOutService;
    constructor(optInOutService: OptInOutService);
    /**
     * Subscribe with double opt-in
     */
    subscribe(body: {
        email: string;
        firstName?: string;
        lastName?: string;
        company?: string;
        marketingEmails?: boolean;
    }, req?: Request): Promise<{
        message: string;
        requiresConfirmation: boolean;
    }>;
    /**
     * Confirm opt-in via email token
     */
    confirmOptIn(token: string, req?: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Unsubscribe via token (one-click)
     */
    unsubscribeWithToken(token: string, reason?: string, req?: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Re-subscribe
     */
    resubscribe(email: string, req?: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Update preferences
     */
    updatePreferences(body: {
        email: string;
        marketingEmails?: boolean;
        emailNotifications?: boolean;
    }): Promise<import("../entities/subscriber.entity").Subscriber>;
    /**
     * Get preferences
     */
    getPreferences(email: string): Promise<{
        emailNotifications: boolean;
        marketingEmails: boolean;
        transactionalEmails: boolean;
        status: string;
    }>;
    /**
     * Check if can receive marketing emails
     */
    canReceiveMarketingEmails(email: string): Promise<{
        email: string;
        canReceive: boolean;
    }>;
    /**
     * Check if can receive transactional emails
     */
    canReceiveTransactionalEmails(email: string): Promise<{
        email: string;
        canReceive: boolean;
    }>;
}
//# sourceMappingURL=opt-in-out.controller.d.ts.map