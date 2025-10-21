import { EventBusService } from '../services/event-bus.service';
import { PlatformEventType, ModuleSource } from '../entities/platform-event.entity';
/**
 * Integration Controller
 *
 * Provides endpoints for viewing platform events and statistics.
 */
export declare class IntegrationController {
    private readonly eventBusService;
    constructor(eventBusService: EventBusService);
    /**
     * Get recent events
     */
    getEvents(limit?: string): Promise<import("../entities/platform-event.entity").PlatformEvent[]>;
    /**
     * Get events by type
     */
    getEventsByType(eventType: PlatformEventType, limit?: string): Promise<import("../entities/platform-event.entity").PlatformEvent[]>;
    /**
     * Get events by source module
     */
    getEventsBySource(source: ModuleSource, limit?: string): Promise<import("../entities/platform-event.entity").PlatformEvent[]>;
    /**
     * Get events with automation
     */
    getEventsWithAutomation(limit?: string): Promise<import("../entities/platform-event.entity").PlatformEvent[]>;
    /**
     * Get event statistics
     */
    getEventStats(startDate?: string, endDate?: string): Promise<{
        totalEvents: number;
        eventsByType: Record<string, number>;
        eventsBySource: Record<string, number>;
        eventsWithAutomation: number;
    }>;
}
//# sourceMappingURL=integration.controller.d.ts.map