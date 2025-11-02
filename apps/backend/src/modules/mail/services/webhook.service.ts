import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailWebhookEvent, EmailWebhookEventType, BounceReason } from '../interfaces/webhook-event.interface';
import { EmailSuppression } from '../entities/email-suppression.entity';
import { SubscriberService } from '../../email-marketing/subscriber.service';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { TicketMessage } from '../../tickets/entities/ticket-message.entity';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(EmailSuppression)
    private suppressionRepository: Repository<EmailSuppression>,
    
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    
    @InjectRepository(TicketMessage)
    private ticketMessageRepository: Repository<TicketMessage>,
    
    @Inject(forwardRef(() => SubscriberService))
    private subscriberService: SubscriberService,
    
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Process incoming webhook event
   * Provider-agnostic - works with any email provider
   */
  async processWebhookEvent(event: EmailWebhookEvent): Promise<void> {
    this.logger.log(
      `Processing webhook event: ${event.eventType} for ${event.email} from ${event.provider}`,
    );

    switch (event.eventType) {
      case EmailWebhookEventType.BOUNCED:
      case EmailWebhookEventType.SOFT_BOUNCED:
        await this.handleBounce(event);
        break;

      case EmailWebhookEventType.COMPLAINED:
      case EmailWebhookEventType.SPAM:
        await this.handleComplaint(event);
        break;

      case EmailWebhookEventType.UNSUBSCRIBED:
        await this.handleUnsubscribe(event);
        break;

      case EmailWebhookEventType.DELIVERED:
        await this.handleDelivery(event);
        break;

      case EmailWebhookEventType.OPENED:
      case EmailWebhookEventType.CLICKED:
        await this.handleEngagement(event);
        break;

      default:
        this.logger.debug(
          `Unhandled event type: ${event.eventType} for ${event.email}`,
        );
    }
  }

  /**
   * Handle bounce events
   * Hard bounces -> permanent suppression + update subscriber
   * Soft bounces -> log but don't suppress yet
   */
  private async handleBounce(event: EmailWebhookEvent): Promise<void> {
    const isHardBounce = event.eventType === EmailWebhookEventType.BOUNCED;

    this.logger.warn(
      `${isHardBounce ? 'Hard' : 'Soft'} bounce detected for ${event.email}: ${event.reason}`,
    );

    if (isHardBounce) {
      // Hard bounce - permanent suppression
      await this.addToSuppressionList({
        email: event.email,
        reason: `Hard bounce: ${event.reason || 'unknown'}`,
        provider: event.provider,
        eventType: event.eventType,
        bounceReason: event.reason,
        suppressedAt: event.timestamp,
        metadata: event.metadata,
      });

      // Update subscriber status to 'bounced'
      try {
        const subscriber = await this.subscriberService.updateStatusFromWebhook(
          event.email,
          'bounced',
          event.metadata,
        );
        if (subscriber) {
          this.logger.log(`Updated subscriber ${event.email} status to 'bounced'`);
        } else {
          this.logger.debug(`No subscriber found for ${event.email}, skipping status update`);
        }
      } catch (error) {
        this.logger.error(`Failed to update subscriber status: ${error.message}`);
      }
    } else {
      // Soft bounce - just log for now
      // TODO: If same email soft bounces 3+ times, add to suppression
      this.logger.debug(
        `Soft bounce logged for ${event.email}, will monitor for repeated bounces`,
      );
    }
  }

  /**
   * Handle complaint/spam events
   * Always add to suppression list + update subscriber
   */
  private async handleComplaint(event: EmailWebhookEvent): Promise<void> {
    this.logger.warn(
      `Complaint/spam reported for ${event.email} from ${event.provider}`,
    );

    await this.addToSuppressionList({
      email: event.email,
      reason: `Complaint: ${event.eventType}`,
      provider: event.provider,
      eventType: event.eventType,
      suppressedAt: event.timestamp,
      metadata: event.metadata,
    });

    // Update subscriber status to 'complained'
    try {
      const subscriber = await this.subscriberService.updateStatusFromWebhook(
        event.email,
        'complained',
        event.metadata,
      );
      if (subscriber) {
        this.logger.log(`Updated subscriber ${event.email} status to 'complained'`);
      }
    } catch (error) {
      this.logger.error(`Failed to update subscriber status: ${error.message}`);
    }
  }

  /**
   * Handle unsubscribe events
   */
  private async handleUnsubscribe(event: EmailWebhookEvent): Promise<void> {
    this.logger.log(`Unsubscribe detected for ${event.email}`);

    await this.addToSuppressionList({
      email: event.email,
      reason: 'Unsubscribed via email link',
      provider: event.provider,
      eventType: event.eventType,
      suppressedAt: event.timestamp,
      metadata: event.metadata,
    });

    // Update subscriber status to 'unsubscribed'
    try {
      const subscriber = await this.subscriberService.updateStatusFromWebhook(
        event.email,
        'unsubscribed',
        event.metadata,
      );
      if (subscriber) {
        this.logger.log(`Updated subscriber ${event.email} status to 'unsubscribed'`);
      }
    } catch (error) {
      this.logger.error(`Failed to update subscriber status: ${error.message}`);
    }
  }

  /**
   * Handle successful delivery
   */
  private async handleDelivery(event: EmailWebhookEvent): Promise<void> {
    this.logger.debug(`Email delivered successfully to ${event.email}`);
    // TODO: Update email campaign stats, delivery count, etc.
  }

  /**
   * Handle engagement events (open, click)
   */
  private async handleEngagement(event: EmailWebhookEvent): Promise<void> {
    this.logger.debug(
      `${event.eventType} event for ${event.email} at ${event.timestamp}`,
    );
    // TODO: Update email campaign stats, engagement metrics
  }

  /**
   * Add email to suppression list
   * Prevents future emails to this address
   */
  private async addToSuppressionList(
    data: Partial<EmailSuppression>,
  ): Promise<void> {
    try {
      // Check if already suppressed
      const existing = await this.suppressionRepository.findOne({
        where: { email: data.email },
      });

      if (existing) {
        this.logger.debug(
          `Email ${data.email} already in suppression list, updating...`,
        );
        await this.suppressionRepository.update(existing.id, data);
      } else {
        this.logger.log(`Adding ${data.email} to suppression list`);
        await this.suppressionRepository.save(data);
      }
    } catch (error) {
      this.logger.error(
        `Failed to add ${data.email} to suppression list: ${error.message}`,
      );
    }
  }

  /**
   * Check if email is suppressed
   * Use this before sending any email
   */
  async isEmailSuppressed(email: string): Promise<boolean> {
    const suppressed = await this.suppressionRepository.findOne({
      where: { email },
    });

    return !!suppressed;
  }

  /**
   * Get suppression details for an email
   */
  async getSuppressionDetails(email: string): Promise<EmailSuppression | null> {
    return await this.suppressionRepository.findOne({
      where: { email },
    });
  }

  /**
   * Remove email from suppression list (admin override)
   */
  async removeFromSuppressionList(email: string): Promise<void> {
    await this.suppressionRepository.delete({ email });
    this.logger.log(`Removed ${email} from suppression list`);
  }

  /**
   * Get all suppressed emails (for admin dashboard)
   */
  async getAllSuppressedEmails(): Promise<EmailSuppression[]> {
    return await this.suppressionRepository.find({
      order: { suppressedAt: 'DESC' },
    });
  }

  /**
   * Handle inbound emails (email replies to tickets)
   * Parse ticket ID from recipient address and create ticket message
   */
  async handleInboundEmail(inboundData: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    messageId: string;
    inReplyTo?: string;
    references?: string;
    headers: any;
  }): Promise<void> {
    this.logger.log(`📧 Processing inbound email from: ${inboundData.from}`);
    this.logger.log(`   To: ${inboundData.to}`);
    this.logger.log(`   Subject: ${inboundData.subject}`);

    try {
      // Extract ticket ID from recipient address (ticket-{id}@domain.com or ticket+{id}@domain.com)
      const ticketIdMatch = inboundData.to.match(/ticket[-+](\d+)@/);
      
      if (!ticketIdMatch) {
        this.logger.warn(`❌ Could not extract ticket ID from recipient: ${inboundData.to}`);
        return;
      }

      const ticketId = parseInt(ticketIdMatch[1], 10);
      this.logger.log(`🎫 Extracted ticket ID: ${ticketId}`);

      // Look up ticket in database
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
        relations: ['customer', 'assignedTo'],
      });

      if (!ticket) {
        this.logger.warn(`❌ Ticket not found: ${ticketId}`);
        return;
      }

      this.logger.log(`✅ Found ticket: ${ticket.subject} (Status: ${ticket.status})`);

      // Determine if this is from customer or support team
      const isFromCustomer = inboundData.from.toLowerCase() === ticket.customer?.email?.toLowerCase();
      
      // Create new ticket message
      const ticketMessage = this.ticketMessageRepository.create({
        ticket: { id: ticketId },
        sender: isFromCustomer ? ticket.customer : ticket.assignedTo,
        message: inboundData.text || inboundData.html || '',
        isInternal: false, // Email replies are always public
        createdAt: new Date(),
      });

      await this.ticketMessageRepository.save(ticketMessage);
      this.logger.log(`✅ Created ticket message from email reply`);

      // Emit ticket.message.created event for email notifications
      this.eventEmitter.emit('ticket.message.created', {
        ticketId: ticket.id,
        messageId: ticketMessage.id,
        isFromCustomer,
        customerEmail: ticket.customer?.email,
        customerName: `${ticket.customer?.firstName} ${ticket.customer?.lastName}`,
        supportEmail: ticket.assignedTo?.email,
        supportName: ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : undefined,
        ticketSubject: ticket.subject,
        messageContent: ticketMessage.message,
      });

      this.logger.log(`📧 Emitted ticket.message.created event`);

      // Update ticket status if it was closed/resolved
      if (ticket.status === 'closed' || ticket.status === 'resolved') {
        ticket.status = 'open'; // Reopen ticket on customer reply
        ticket.updatedAt = new Date();
        await this.ticketRepository.save(ticket);
        this.logger.log(`🔄 Reopened ticket ${ticketId} due to customer reply`);
      }

    } catch (error) {
      this.logger.error(`❌ Error processing inbound email: ${error.message}`, error.stack);
      throw error;
    }
  }
}
