export interface TrackingStats {
    campaignId: string;
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
    openRate: number;
    clickRate: number;
    uniqueOpens: number;
    uniqueClicks: number;
    recentOpens: Array<{
        recipientEmail: string;
        openedAt: string;
        userAgent?: string;
        ipAddress?: string;
    }>;
    recentClicks: Array<{
        recipientEmail: string;
        clickedAt: string;
        originalUrl?: string;
        userAgent?: string;
        ipAddress?: string;
    }>;
}
export interface TrackingData {
    trackingId: string;
    pixelUrl: string;
    linkWrapper: (url: string) => string;
}
/**
 * Email Tracking Service
 * Handles email tracking operations
 */
declare class TrackingService {
    private readonly endpoint;
    /**
     * Generate tracking URLs for email content
     */
    generateTrackingUrls(campaignId: string, recipientEmail: string): Promise<TrackingData>;
    /**
     * Get tracking statistics for a campaign
     */
    getTrackingStats(campaignId: string): Promise<TrackingStats>;
    /**
     * Process email content to add tracking
     */
    processEmailContent(htmlContent: string, trackingData: TrackingData): string;
    /**
     * Generate tracking pixel URL
     */
    generatePixelUrl(trackingId: string): string;
    /**
     * Generate click tracking URL
     */
    generateClickUrl(trackingId: string, originalUrl: string): string;
    /**
     * Extract tracking metrics from stats
     */
    getTrackingMetrics(stats: TrackingStats): {
        deliveryRate: number;
        openRate: number;
        clickRate: number;
        clickThroughRate: number;
        engagement: {
            totalSent: number;
            totalOpened: number;
            totalClicked: number;
            uniqueOpens: number;
            uniqueClicks: number;
        };
    };
    /**
     * Format tracking data for display
     */
    formatTrackingData(stats: TrackingStats): {
        overview: {
            sent: string;
            opened: string;
            clicked: string;
            openRate: string;
            clickRate: string;
        };
        recentActivity: {
            opens: {
                email: string;
                timestamp: string;
                device: string;
            }[];
            clicks: {
                email: string;
                timestamp: string;
                url: string | undefined;
                device: string;
            }[];
        };
    };
    /**
     * Mask email for privacy
     */
    private maskEmail;
    /**
     * Extract device info from user agent
     */
    private extractDevice;
}
export declare const trackingService: TrackingService;
export default trackingService;
//# sourceMappingURL=trackingService.d.ts.map