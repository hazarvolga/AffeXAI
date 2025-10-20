import { httpClient } from './http-client';

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

export const integrationService = {
  /**
   * Get all platform events
   */
  async getEvents(limit?: number): Promise<PlatformEvent[]> {
    const response = await httpClient.get('/integration/events', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get events by type
   */
  async getEventsByType(eventType: string, limit?: number): Promise<PlatformEvent[]> {
    const response = await httpClient.get(`/integration/events/type/${eventType}`, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get events by source
   */
  async getEventsBySource(
    source: 'events' | 'email-marketing' | 'cms' | 'certificates' | 'media',
    limit?: number
  ): Promise<PlatformEvent[]> {
    const response = await httpClient.get(`/integration/events/source/${source}`, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get events that triggered automation
   */
  async getEventsWithAutomation(limit?: number): Promise<PlatformEvent[]> {
    const response = await httpClient.get('/integration/events/automated', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get event statistics
   */
  async getStats(startDate?: string, endDate?: string): Promise<EventStats> {
    const response = await httpClient.get('/integration/events/stats', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
