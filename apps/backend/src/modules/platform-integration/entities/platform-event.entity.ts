import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * Platform Event Types
 * Events emitted by various modules across the platform
 */
export enum PlatformEventType {
  // Events Module
  EVENT_CREATED = 'event.created',
  EVENT_UPDATED = 'event.updated',
  EVENT_PUBLISHED = 'event.published',
  EVENT_CANCELLED = 'event.cancelled',
  
  // Email Marketing Module
  CAMPAIGN_CREATED = 'campaign.created',
  CAMPAIGN_SENT = 'campaign.sent',
  CAMPAIGN_COMPLETED = 'campaign.completed',
  SUBSCRIBER_ADDED = 'subscriber.added',
  SUBSCRIBER_UNSUBSCRIBED = 'subscriber.unsubscribed',
  
  // Certificates Module
  CERTIFICATE_ISSUED = 'certificate.issued',
  CERTIFICATE_SENT = 'certificate.sent',
  CERTIFICATE_DOWNLOADED = 'certificate.downloaded',
  
  // CMS Module
  PAGE_CREATED = 'page.created',
  PAGE_PUBLISHED = 'page.published',
  PAGE_UPDATED = 'page.updated',
  PAGE_ARCHIVED = 'page.archived',
  
  // Media Module
  MEDIA_UPLOADED = 'media.uploaded',
  MEDIA_DELETED = 'media.deleted',
  
  // Future: Support Tickets (v2.0)
  // TICKET_CREATED = 'ticket.created',
  // TICKET_RESOLVED = 'ticket.resolved',
  
  // Future: Social Media (v2.0)
  // POST_PUBLISHED = 'social.post_published',
  // POST_SCHEDULED = 'social.post_scheduled',
}

/**
 * Module Sources
 */
export enum ModuleSource {
  EVENTS = 'events',
  EMAIL_MARKETING = 'email-marketing',
  CERTIFICATES = 'certificates',
  CMS = 'cms',
  MEDIA = 'media',
  SUPPORT = 'support',        // Future: v2.0
  SOCIAL_MEDIA = 'social-media', // Future: v2.0
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
@Entity('platform_events')
@Index('idx_platform_events_type', ['eventType'])
@Index('idx_platform_events_source', ['source'])
@Index('idx_platform_events_created', ['createdAt'])
export class PlatformEvent extends BaseEntity {
  /**
   * Source module that emitted the event
   */
  @Column({
    type: 'varchar',
    length: 50,
  })
  @Index()
  source: ModuleSource;

  /**
   * Type of event
   */
  @Column({
    type: 'varchar',
    length: 100,
  })
  @Index()
  eventType: PlatformEventType;

  /**
   * Event payload (full event data)
   * 
   * Examples:
   * - Event created: { id, title, startDate, ... }
   * - Certificate issued: { id, recipientName, ... }
   * - Page published: { id, slug, title, ... }
   */
  @Column({
    type: 'jsonb',
  })
  payload: Record<string, any>;

  /**
   * IDs of automation rules that were triggered by this event
   */
  @Column({
    type: 'uuid',
    array: true,
    default: [],
  })
  triggeredRules: string[];

  /**
   * Additional metadata
   * 
   * Examples:
   * - userId: Who triggered the event
   * - ip: IP address
   * - userAgent: Browser info
   */
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata?: Record<string, any>;
}
