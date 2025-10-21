import { Repository } from 'typeorm';
import { EmailLog } from './entities/email-log.entity';
import { EmailCampaign } from './entities/email-campaign.entity';
import { Subscriber } from './entities/subscriber.entity';
import { EmailOpenHistory } from './entities/email-open-history.entity';
import { ConfigService } from '@nestjs/config';
interface TrackingMetadata {
    userAgent?: string;
    ipAddress?: string;
    originalUrl?: string;
    timestamp: Date;
}
interface TrackingData {
    trackingId: string;
    pixelUrl: string;
    linkWrapper: (url: string) => string;
}
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
        openedAt: Date;
        userAgent?: string;
        ipAddress?: string;
    }>;
    recentClicks: Array<{
        recipientEmail: string;
        clickedAt: Date;
        originalUrl?: string;
        userAgent?: string;
        ipAddress?: string;
    }>;
}
/**
 * Email Tracking Service
 * Handles email open and click tracking functionality
 */
export declare class TrackingService {
    private emailLogRepository;
    private campaignRepository;
    private subscriberRepository;
    private emailOpenHistoryRepository;
    private configService;
    private readonly baseUrl;
    constructor(emailLogRepository: Repository<EmailLog>, campaignRepository: Repository<EmailCampaign>, subscriberRepository: Repository<Subscriber>, emailOpenHistoryRepository: Repository<EmailOpenHistory>, configService: ConfigService);
    /**
     * Generate tracking data for an email
     */
    generateTrackingData(campaignId: string, recipientEmail: string): Promise<TrackingData>;
    /**
     * Track email open event
     */
    trackEmailOpen(trackingId: string, metadata: TrackingMetadata): Promise<void>;
    /**
     * Track email click event
     */
    trackEmailClick(trackingId: string, metadata: TrackingMetadata): Promise<void>;
    /**
     * Get tracking statistics for a campaign
     */
    getTrackingStats(campaignId: string): Promise<TrackingStats>;
    /**
     * Update campaign statistics
     */
    private updateCampaignStats;
    /**
     * Update subscriber statistics
     */
    private updateSubscriberStats;
    /**
     * Process email content to add tracking
     */
    processEmailContent(htmlContent: string, campaignId: string, recipientEmail: string): Promise<string>;
    /**
     * Detect device type from user agent
     */
    private detectDeviceType;
    /**
     * Detect email client from user agent
     */
    private detectEmailClient;
}
export {};
//# sourceMappingURL=tracking.service.d.ts.map