import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  AnalyticsEvent,
  AnalyticsSession,
  DeviceType,
} from '../entities';
import { TrackEventDto, BatchTrackEventsDto } from '../dto';

@Injectable()
export class AnalyticsTrackingService {
  private readonly logger = new Logger(AnalyticsTrackingService.name);

  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly eventRepository: Repository<AnalyticsEvent>,
    @InjectRepository(AnalyticsSession)
    private readonly sessionRepository: Repository<AnalyticsSession>,
  ) {}

  /**
   * Track a single event
   */
  async trackEvent(dto: TrackEventDto): Promise<AnalyticsEvent> {
    try {
      const event = this.eventRepository.create({
        componentId: dto.componentId,
        componentType: dto.componentType,
        interactionType: dto.interactionType,
        sessionId: dto.sessionId,
        userId: dto.userId || null,
        pageUrl: dto.pageUrl,
        deviceType: dto.deviceType,
        browser: dto.browser || null,
        viewportWidth: dto.viewport.width,
        viewportHeight: dto.viewport.height,
        coordinateX: dto.coordinates?.x || null,
        coordinateY: dto.coordinates?.y || null,
        relativeX: dto.coordinates?.relativeX || null,
        relativeY: dto.coordinates?.relativeY || null,
        metadata: dto.metadata || null,
      });

      const savedEvent = await this.eventRepository.save(event);

      // Update session interaction count
      await this.updateSessionInteractions(dto.sessionId);

      return savedEvent;
    } catch (error) {
      this.logger.error(`Failed to track event: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Track multiple events in batch (optimized)
   */
  async trackEventsBatch(dto: BatchTrackEventsDto): Promise<{ success: boolean; count: number }> {
    try {
      // Create or update session if provided
      if (dto.session) {
        await this.upsertSession(dto.session);
      }

      // Bulk insert events
      const events = dto.events.map((event) =>
        this.eventRepository.create({
          componentId: event.componentId,
          componentType: event.componentType,
          interactionType: event.interactionType,
          sessionId: event.sessionId,
          userId: event.userId || null,
          pageUrl: event.pageUrl,
          deviceType: event.deviceType,
          browser: event.browser || null,
          viewportWidth: event.viewport.width,
          viewportHeight: event.viewport.height,
          coordinateX: event.coordinates?.x || null,
          coordinateY: event.coordinates?.y || null,
          relativeX: event.coordinates?.relativeX || null,
          relativeY: event.coordinates?.relativeY || null,
          metadata: event.metadata || null,
        }),
      );

      await this.eventRepository.save(events);

      // Update session interactions
      const uniqueSessionIds = [...new Set(dto.events.map((e) => e.sessionId))];
      await Promise.all(
        uniqueSessionIds.map((sessionId) => this.updateSessionInteractions(sessionId)),
      );

      return { success: true, count: events.length };
    } catch (error) {
      this.logger.error(`Failed to track batch events: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Create or update session
   */
  private async upsertSession(sessionData: {
    id: string;
    startTime: Date;
    deviceType: DeviceType;
    browser?: string;
    os?: string;
  }): Promise<AnalyticsSession> {
    const existing = await this.sessionRepository.findOne({
      where: { id: sessionData.id },
    });

    if (existing) {
      return existing;
    }

    const session = this.sessionRepository.create({
      id: sessionData.id,
      startTime: sessionData.startTime,
      deviceType: sessionData.deviceType,
      browser: sessionData.browser || null,
      os: sessionData.os || null,
      pagesVisited: [],
      totalInteractions: 0,
    });

    return this.sessionRepository.save(session);
  }

  /**
   * Update session interaction count
   */
  private async updateSessionInteractions(sessionId: string): Promise<void> {
    const count = await this.eventRepository.count({
      where: { sessionId },
    });

    await this.sessionRepository.update(sessionId, {
      totalInteractions: count,
    });
  }

  /**
   * Get events for a component
   */
  async getComponentEvents(
    componentId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find({
      where: {
        componentId,
        createdAt: Between(startDate, endDate),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Get events for a session
   */
  async getSessionEvents(sessionId: string): Promise<AnalyticsEvent[]> {
    return this.eventRepository.find({
      where: { sessionId },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<AnalyticsSession | null> {
    return this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['events'],
    });
  }

  /**
   * End a session
   */
  async endSession(sessionId: string, endTime: Date): Promise<void> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      return;
    }

    const duration = endTime.getTime() - session.startTime.getTime();

    await this.sessionRepository.update(sessionId, {
      endTime,
      duration,
    });
  }

  /**
   * Mark session as converted
   */
  async markSessionAsConverted(
    sessionId: string,
    conversionGoal: string,
  ): Promise<void> {
    await this.sessionRepository.update(sessionId, {
      converted: true,
      conversionGoal,
    });
  }
}
