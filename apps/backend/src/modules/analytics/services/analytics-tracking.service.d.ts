import { Repository } from 'typeorm';
import { AnalyticsEvent, AnalyticsSession } from '../entities';
import { TrackEventDto, BatchTrackEventsDto } from '../dto';
export declare class AnalyticsTrackingService {
    private readonly eventRepository;
    private readonly sessionRepository;
    private readonly logger;
    constructor(eventRepository: Repository<AnalyticsEvent>, sessionRepository: Repository<AnalyticsSession>);
    /**
     * Track a single event
     */
    trackEvent(dto: TrackEventDto): Promise<AnalyticsEvent>;
    /**
     * Track multiple events in batch (optimized)
     */
    trackEventsBatch(dto: BatchTrackEventsDto): Promise<{
        success: boolean;
        count: number;
    }>;
    /**
     * Create or update session
     */
    private upsertSession;
    /**
     * Update session interaction count
     */
    private updateSessionInteractions;
    /**
     * Get events for a component
     */
    getComponentEvents(componentId: string, startDate: Date, endDate: Date): Promise<AnalyticsEvent[]>;
    /**
     * Get events for a session
     */
    getSessionEvents(sessionId: string): Promise<AnalyticsEvent[]>;
    /**
     * Get session by ID
     */
    getSession(sessionId: string): Promise<AnalyticsSession | null>;
    /**
     * End a session
     */
    endSession(sessionId: string, endTime: Date): Promise<void>;
    /**
     * Mark session as converted
     */
    markSessionAsConverted(sessionId: string, conversionGoal: string): Promise<void>;
}
//# sourceMappingURL=analytics-tracking.service.d.ts.map