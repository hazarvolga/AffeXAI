export interface PlatformEvent {
    id: string;
    source: 'events' | 'email-marketing' | 'cms' | 'certificates' | 'media';
    eventType: string;
    payload: Record<string, any>;
    triggeredRules: string[];
    metadata?: Record<string, any>;
    createdAt: string;
}
export interface EventStats {
    totalEvents: number;
    eventsByType: Record<string, number>;
    eventsBySource: Record<string, number>;
    eventsWithAutomation: number;
    automationTriggerRate: number;
}
export declare const integrationService: {
    /**
     * Get all platform events
     */
    getEvents(limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get events by type
     */
    getEventsByType(eventType: string, limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get events by source
     */
    getEventsBySource(source: "events" | "email-marketing" | "cms" | "certificates" | "media", limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get events that triggered automation
     */
    getEventsWithAutomation(limit?: number): Promise<PlatformEvent[]>;
    /**
     * Get event statistics
     */
    getStats(startDate?: string, endDate?: string): Promise<EventStats>;
};
//# sourceMappingURL=integrationService.d.ts.map