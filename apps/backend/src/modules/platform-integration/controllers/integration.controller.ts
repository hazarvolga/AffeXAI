import { Controller, Get, Query, Param } from '@nestjs/common';
import { EventBusService } from '../services/event-bus.service';
import { PlatformEventType, ModuleSource } from '../entities/platform-event.entity';

/**
 * Integration Controller
 * 
 * Provides endpoints for viewing platform events and statistics.
 */
@Controller('integration')
export class IntegrationController {
  constructor(private readonly eventBusService: EventBusService) {}

  /**
   * Get recent events
   */
  @Get('events')
  async getEvents(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.eventBusService.getRecentEvents(limitNum);
  }

  /**
   * Get events by type
   */
  @Get('events/type/:eventType')
  async getEventsByType(
    @Param('eventType') eventType: PlatformEventType,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.eventBusService.getEventsByType(eventType, limitNum);
  }

  /**
   * Get events by source module
   */
  @Get('events/source/:source')
  async getEventsBySource(
    @Param('source') source: ModuleSource,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.eventBusService.getEventsBySource(source, limitNum);
  }

  /**
   * Get events with automation
   */
  @Get('events/automated')
  async getEventsWithAutomation(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.eventBusService.getEventsWithAutomation(limitNum);
  }

  /**
   * Get event statistics
   */
  @Get('events/stats')
  async getEventStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.eventBusService.getEventStats(start, end);
  }
}
