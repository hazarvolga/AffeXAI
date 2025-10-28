import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { Ticket } from '../entities/ticket.entity';
import { TicketMessage } from '../entities/ticket-message.entity';
import { User } from '../../users/entities/user.entity';
import { MailChannel } from '../../mail/interfaces/mail-service.interface';

/**
 * Ticket Email Service
 * Handles all email notifications for ticket-related events
 */
@Injectable()
export class TicketEmailService {
  private readonly logger = new Logger(TicketEmailService.name);
  private readonly baseUrl: string;

  constructor(private readonly mailService: MailService) {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
  }

  /**
   * Send email when a new ticket is created
   */
  async sendTicketCreatedEmail(
    ticket: Ticket,
    customer: User,
  ): Promise<void> {
    try {
      this.logger.log(`[EMAIL DEBUG] sendTicketCreatedEmail called for ticket ${ticket.id}`);
      this.logger.log(`[EMAIL DEBUG] Customer email: ${customer.email}`);
      this.logger.log(`[EMAIL DEBUG] Base URL: ${this.baseUrl}`);

      const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;

      // Note: siteSettings are automatically injected by template-renderer.service.ts
      // No need to pass them here - they will be fetched from database at render time

      this.logger.log(`[EMAIL DEBUG] Calling mailService.sendMail...`);
      await this.mailService.sendMail({
        to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
        subject: `Destek Talebi Oluşturuldu: ${ticket.subject}`,
        template: 'ticket-created',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
          ticketId: ticket.id,
          ticketNumber: `#${ticket.id.slice(0, 8).toUpperCase()}`,
          subject: ticket.subject,
          priority: ticket.priority,
          ticketUrl,
        },
      });

      this.logger.log(`Ticket created email sent to ${customer.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send ticket created email: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send email when a ticket is assigned to an agent
   */
  async sendTicketAssignedEmail(
    ticket: Ticket,
    assignedTo: User,
    assignedBy: User,
  ): Promise<void> {
    try {
      const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;

      await this.mailService.sendMail({
        to: { email: assignedTo.email, name: `${assignedTo.firstName} ${assignedTo.lastName}` },
        subject: `Ticket Assigned: ${ticket.subject}`,
        template: 'ticket-assigned',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          agentName: `${assignedTo.firstName} ${assignedTo.lastName}` || assignedTo.email,
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          ticketPriority: ticket.priority,
          ticketStatus: ticket.status,
          assignedByName: `${assignedBy.firstName} ${assignedBy.lastName}` || assignedBy.email,
          ticketUrl,
        },
      });

      this.logger.log(`Ticket assigned email sent to ${assignedTo.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send ticket assigned email: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send email when a new message is added to a ticket
   */
  async sendNewMessageEmail(
    ticket: Ticket,
    message: TicketMessage,
    recipient: User,
    isCustomerMessage: boolean,
  ): Promise<void> {
    try {
      const ticketUrl = isCustomerMessage
        ? `${this.baseUrl}/admin/support/${ticket.id}`
        : `${this.baseUrl}/portal/support/${ticket.id}`;

      const subject = isCustomerMessage
        ? `New Customer Message: ${ticket.subject}`
        : `New Response: ${ticket.subject}`;

      await this.mailService.sendMail({
        to: { email: recipient.email, name: `${recipient.firstName} ${recipient.lastName}` },
        subject,
        template: 'ticket-new-message',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          recipientName: `${recipient.firstName} ${recipient.lastName}` || recipient.email,
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          messageContent: message.content,
          messageAuthor: message.author ? `${message.author.firstName} ${message.author.lastName}` : 'Support Team',
          isCustomerMessage,
          ticketUrl,
        },
      });

      this.logger.log(`New message email sent to ${recipient.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send new message email: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send email when a ticket is resolved (with CSAT survey)
   */
  async sendTicketResolved(
    ticket: Ticket,
    surveyToken?: string,
  ): Promise<void> {
    try {
      const customer = ticket.user; // ticket.user is the creator (customer)
      const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;
      const surveyUrl = surveyToken
        ? `${this.baseUrl}/survey/${surveyToken}`
        : null;

      await this.mailService.sendMail({
        to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
        subject: `Ticket Resolved: ${ticket.subject}`,
        template: 'csat-survey',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
          ticketTitle: ticket.subject,
          ticketId: ticket.id,
          surveyUrl,
          agentName: ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Destek Ekibi',
          siteSettings: {
            siteName: process.env.SITE_NAME || 'Aluplan',
            siteUrl: this.baseUrl,
            supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
          },
        },
      });

      this.logger.log(`Ticket resolved email with CSAT survey sent to ${customer.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send ticket resolved email: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * DEPRECATED: Use sendTicketResolved instead
   * Send email when a ticket is resolved
   */
  async sendTicketResolvedEmail(
    ticket: Ticket,
    customer: User,
    resolvedBy: User,
  ): Promise<void> {
    try {
      const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;
      const feedbackUrl = `${this.baseUrl}/portal/support/${ticket.id}/feedback`;

      await this.mailService.sendMail({
        to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
        subject: `Ticket Resolved: ${ticket.subject}`,
        template: 'ticket-resolved',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          resolvedByName: `${resolvedBy.firstName} ${resolvedBy.lastName}` || 'Support Team',
          resolutionTime: ticket.resolutionTimeHours,
          ticketUrl,
          feedbackUrl,
        },
      });

      this.logger.log(`Ticket resolved email sent to ${customer.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send ticket resolved email: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send SLA breach alert to support team
   */
  async sendSLABreachAlert(
    ticket: Ticket,
    breachType: 'first_response' | 'resolution',
  ): Promise<void> {
    try {
      const supportEmail = process.env.SUPPORT_TEAM_EMAIL || 'support@example.com';
      const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;

      await this.mailService.sendMail({
        to: { email: supportEmail, name: 'Support Team' },
        subject: `⚠️ SLA Breach Alert: ${ticket.subject}`,
        template: 'sla-breach-alert',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          ticketPriority: ticket.priority,
          breachType,
          ticketUrl,
          assignedTo: ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Unassigned',
        },
      });

      this.logger.log(`SLA breach alert sent for ticket ${ticket.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to send SLA breach alert: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send SLA approaching alert (proactive notification)
   */
  async sendSLAApproachingAlert(
    ticket: Ticket,
    remainingHours: number,
  ): Promise<void> {
    try {
      if (!ticket.assignedTo) {
        this.logger.warn(
          `Ticket ${ticket.id} has no assigned agent for SLA alert`,
        );
        return;
      }

      const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;

      await this.mailService.sendMail({
        to: { email: ticket.assignedTo.email, name: `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` },
        subject: `⏰ SLA Alert: ${ticket.subject} - ${remainingHours}h remaining`,
        template: 'sla-approaching-alert',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          agentName: `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` || ticket.assignedTo.email,
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          ticketPriority: ticket.priority,
          remainingHours,
          ticketUrl,
        },
      });

      this.logger.log(
        `SLA approaching alert sent to ${ticket.assignedTo.email}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send SLA approaching alert: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Send email when ticket is escalated
   */
  async sendTicketEscalatedEmail(
    ticket: Ticket,
    escalatedTo: User,
    escalationLevel: number,
    reason: string,
  ): Promise<void> {
    try {
      const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;

      await this.mailService.sendMail({
        to: { email: escalatedTo.email, name: `${escalatedTo.firstName} ${escalatedTo.lastName}` },
        subject: `🚨 Escalated Ticket (Level ${escalationLevel}): ${ticket.subject}`,
        template: 'ticket-escalated',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          agentName: `${escalatedTo.firstName} ${escalatedTo.lastName}` || escalatedTo.email,
          ticketId: ticket.id,
          ticketSubject: ticket.subject,
          ticketPriority: ticket.priority,
          escalationLevel,
          reason,
          ticketUrl,
        },
      });

      this.logger.log(`Ticket escalation email sent to ${escalatedTo.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send ticket escalation email: ${error.message}`,
        error.stack,
      );
    }
  }
}
