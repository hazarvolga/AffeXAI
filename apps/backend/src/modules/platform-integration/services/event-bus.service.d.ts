import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlatformEvent, PlatformEventType, ModuleSource } from '../entities/platform-event.entity';
import { AutomationRule } from '../entities/automation-rule.entity';
/**
 * EventBus Service
 *
 * Central event management system for the entire platform.
 * Handles event publishing, logging, and triggering automation rules.
 *
 * Features:
 * - Event logging to database
 * - Event broadcasting to subscribers
 * - Automatic automation rule triggering
 * - Event filtering and querying
 * - Real-time event streaming
 */
export declare class EventBusService {
    private readonly eventRepository;
    private readonly ruleRepository;
    private readonly eventEmitter;
    private readonly logger;
    constructor(eventRepository: Repository<PlatformEvent>, ruleRepository: Repository<AutomationRule>, eventEmitter: EventEmitter2);
    /**
     * Publish an event to the platform
     *
     * This is the main entry point for all platform events.
     *
     * @param source - Module that generated the event
     * @param eventType - Type of event
     * @param payload - Event data
     * @param metadata - Additional context (userId, ip, userAgent, etc.)
     * @returns Created event entity
     */
    publish(source: ModuleSource, eventType: PlatformEventType, payload: Record<string, any>, metadata?: Record<string, any>): Promise<PlatformEvent>;
    /**
     * Trigger automation rules for an event
     *
     * Finds all active rules matching the event type,
     * checks conditions, and triggers matching rules.
     *
     * @param event - Platform event
     */
    private triggerAutomationRules;
    /**
     * Get events by type
     */
    getEventsByType(eventType: PlatformEventType, limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get events by source module
     */
    getEventsBySource(source: ModuleSource, limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get recent events
     */
    getRecentEvents(limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get events that triggered automation rules
     */
    getEventsWithAutomation(limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get event statistics
     */
    getEventStats(startDate?: Date, endDate?: Date): Promise<{
        totalEvents: number;
        eventsByType: Record<string, number>;
        eventsBySource: Record<string, number>;
        eventsWithAutomation: number;
    }>;
    /**
     * Subscribe to events in real-time
     *
     * @param eventType - Event type to subscribe to (or 'platform.event' for all)
     * @param callback - Function to call when event occurs
     * @returns Unsubscribe function
     */
    subscribe(eventType: PlatformEventType | 'platform.event', callback: (data: any) => void): () => void;
    /**
     * Publish event helper methods for common event types
     */
    publishEventCreated(eventId: string, eventData: any, userId?: string): Promise<PlatformEvent>;
    publishEventPublished(eventId: string, eventData: any, userId?: string): Promise<PlatformEvent>;
    publishEventCancelled(eventId: string, reason: string, userId?: string): Promise<PlatformEvent>;
    publishCampaignSent(campaignId: string, recipientCount: number, userId?: string): Promise<PlatformEvent>;
    publishSubscriberAdded(subscriberId: string, email: string, source?: string): Promise<PlatformEvent>;
    publishCertificateIssued(certificateId: string, userId: string, eventId?: string): Promise<PlatformEvent>;
    publishPagePublished(pageId: string, slug: string, userId?: string): Promise<PlatformEvent>;
    publishMediaUploaded(mediaId: string, fileName: string, fileSize: number, userId?: string): Promise<PlatformEvent>;
}
//# sourceMappingURL=event-bus.service.d.ts.map