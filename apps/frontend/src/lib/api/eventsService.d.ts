import { BaseApiService } from './base-service';
import type { Event, CreateEventDto, UpdateEventDto, EventDashboardStats, EventQueryParams, BulkCertificateRequest, BulkCertificateResponse } from '@affexai/shared-types';
export type { Event, CreateEventDto, UpdateEventDto, EventDashboardStats, EventQueryParams, };
/** @deprecated Use EventDashboardStats instead */
export type DashboardStats = EventDashboardStats;
/**
 * Events Service
 * Handles event operations extending BaseApiService
 */
declare class EventsService extends BaseApiService<Event, CreateEventDto, UpdateEventDto> {
    constructor();
    /**
     * Get dashboard statistics
     */
    getDashboardStats(): Promise<EventDashboardStats>;
    /**
     * Generate certificates for all event attendees
     */
    generateBulkCertificates(request: BulkCertificateRequest): Promise<BulkCertificateResponse>;
    /**
     * Get events with query parameters
     */
    getEvents(params?: EventQueryParams): Promise<Event[]>;
}
export declare const eventsService: EventsService;
export default eventsService;
//# sourceMappingURL=eventsService.d.ts.map