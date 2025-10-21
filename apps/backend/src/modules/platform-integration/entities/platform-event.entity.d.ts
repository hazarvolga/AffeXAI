import { BaseEntity } from '../../../common/entities/base.entity';
/**
 * Platform Event Types
 * Events emitted by various modules across the platform
 */
export declare enum PlatformEventType {
    EVENT_CREATED = "event.created",
    EVENT_UPDATED = "event.updated",
    EVENT_PUBLISHED = "event.published",
    EVENT_CANCELLED = "event.cancelled",
    CAMPAIGN_CREATED = "campaign.created",
    CAMPAIGN_SENT = "campaign.sent",
    CAMPAIGN_COMPLETED = "campaign.completed",
    SUBSCRIBER_ADDED = "subscriber.added",
    SUBSCRIBER_UNSUBSCRIBED = "subscriber.unsubscribed",
    CERTIFICATE_ISSUED = "certificate.issued",
    CERTIFICATE_SENT = "certificate.sent",
    CERTIFICATE_DOWNLOADED = "certificate.downloaded",
    PAGE_CREATED = "page.created",
    PAGE_PUBLISHED = "page.published",
    PAGE_UPDATED = "page.updated",
    PAGE_ARCHIVED = "page.archived",
    MEDIA_UPLOADED = "media.uploaded",
    MEDIA_DELETED = "media.deleted"
}
/**
 * Module Sources
 */
export declare enum ModuleSource {
    EVENTS = "events",
    EMAIL_MARKETING = "email-marketing",
    CERTIFICATES = "certificates",
    CMS = "cms",
    MEDIA = "media",
    SUPPORT = "support",// Future: v2.0
    SOCIAL_MEDIA = "social-media"
}
/**
 * Platform Event Entity
 *
 * Stores all events emitted across the platform for:
 * - Event log/history
 * - Automation rule triggers
 * - Webhook notifications
 * - Analytics and monitoring
 */
export declare class PlatformEvent extends BaseEntity {
    /**
     * Source module that emitted the event
     */
    source: ModuleSource;
    /**
     * Type of event
     */
    eventType: PlatformEventType;
    /**
     * Event payload (full event data)
     *
     * Examples:
     * - Event created: { id, title, startDate, ... }
     * - Certificate issued: { id, recipientName, ... }
     * - Page published: { id, slug, title, ... }
     */
    payload: Record<string, any>;
    /**
     * IDs of automation rules that were triggered by this event
     */
    triggeredRules: string[];
    /**
     * Additional metadata
     *
     * Examples:
     * - userId: Who triggered the event
     * - ip: IP address
     * - userAgent: Browser info
     */
    metadata?: Record<string, any>;
}
//# sourceMappingURL=platform-event.entity.d.ts.map