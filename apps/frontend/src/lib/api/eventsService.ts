import { httpClient } from './http-client';
import { BaseApiService } from './base-service';
import type {
  Event,
  CreateEventDto,
  UpdateEventDto,
  EventDashboardStats,
  EventQueryParams,
  BulkCertificateRequest,
  BulkCertificateResponse,
} from '@affexai/shared-types';

// Re-export types for convenience
export type {
  Event,
  CreateEventDto,
  UpdateEventDto,
  EventDashboardStats,
  EventQueryParams,
};

// Deprecated: Use EventDashboardStats from shared types
/** @deprecated Use EventDashboardStats instead */
export type DashboardStats = EventDashboardStats;

/**
 * Events Service
 * Handles event operations extending BaseApiService
 */
class EventsService extends BaseApiService<Event, CreateEventDto, UpdateEventDto> {
  constructor() {
    super({ endpoint: '/events', useWrappedResponses: true });
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<EventDashboardStats> {
    return httpClient.getWrapped<EventDashboardStats>(`${this.endpoint}/stats`);
  }

  /**
   * Generate certificates for all event attendees
   */
  async generateBulkCertificates(request: BulkCertificateRequest): Promise<BulkCertificateResponse> {
    return httpClient.postWrapped<BulkCertificateResponse, BulkCertificateRequest>(
      `${this.endpoint}/${request.eventId}/certificates/bulk`,
      request
    );
  }

  /**
   * Get events with query parameters
   */
  async getEvents(params?: EventQueryParams): Promise<Event[]> {
    return this.getAll(params);
  }
}

export const eventsService = new EventsService();
export default eventsService;
