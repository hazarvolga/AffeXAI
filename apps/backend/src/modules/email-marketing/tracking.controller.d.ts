import type { Response } from 'express';
import { TrackingService, TrackingStats } from './tracking.service';
/**
 * Email Tracking Controller
 * Handles pixel tracking for email opens and link click tracking
 */
export declare class TrackingController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    /**
     * Track email open via 1x1 pixel
     * GET /api/email-marketing/track/open/:trackingId
     */
    trackOpen(trackingId: string, userAgent: string, forwardedFor: string, realIp: string, res: Response): Promise<void>;
    /**
     * Track link click and redirect
     * GET /api/email-marketing/track/click/:trackingId?url=...
     */
    trackClick(trackingId: string, originalUrl: string, userAgent: string, forwardedFor: string, realIp: string, res: Response): Promise<void>;
    /**
     * Generate tracking URLs for email content
     * POST /api/email-marketing/track/generate
     */
    generateTrackingUrls(campaignId: string, recipientEmail: string): Promise<{
        trackingId: string;
        pixelUrl: string;
        linkWrapper: (url: string) => string;
    }>;
    /**
     * Get tracking statistics for a campaign
     * GET /api/email-marketing/track/stats/:campaignId
     */
    getTrackingStats(campaignId: string): Promise<TrackingStats>;
}
//# sourceMappingURL=tracking.controller.d.ts.map