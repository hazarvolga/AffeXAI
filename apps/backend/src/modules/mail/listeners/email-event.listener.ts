import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '../mail.service';
import { MailChannel } from '../mail.types';

/**
 * Email Event Listener
 *
 * Listens to platform events and sends appropriate emails
 * This decouples email sending from business logic
 */
@Injectable()
export class EmailEventListener {
  private readonly logger = new Logger(EmailEventListener.name);

  constructor(private readonly mailService: MailService) {}

  /**
   * Handle USER_CREATED event
   * Sends account creation email with password reset link
   */
  @OnEvent('user.created')
  async handleUserCreated(payload: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    resetToken: string;
  }) {
    this.logger.log(`📧 Handling user.created event for: ${payload.email}`);

    try {
      const baseUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003';
      const resetPasswordUrl = `${baseUrl}/reset-password?token=${payload.resetToken}`;

      await this.mailService.sendMail({
        to: {
          email: payload.email,
          name: `${payload.firstName} ${payload.lastName}`,
        },
        subject: 'Hesabınız Oluşturuldu - Şifrenizi Belirleyin',
        template: 'account-created',
        channel: MailChannel.TRANSACTIONAL,
        context: {
          userName: `${payload.firstName} ${payload.lastName}`,
          userEmail: payload.email,
          resetPasswordUrl,
        },
      });

      this.logger.log(`✅ Account creation email sent to: ${payload.email}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send account creation email: ${error.message}`, error.stack);
      // Don't throw - email failure shouldn't break user creation
    }
  }

  /**
   * Handle TICKET_MESSAGE_CREATED event
   * Sends notification to customer or support team
   */
  @OnEvent('ticket.message.created')
  async handleTicketMessageCreated(payload: {
    ticketId: number;
    messageId: number;
    ticketDisplayNumber: string;
    ticketTitle: string;
    messageText: string;
    senderRole: string; // 'customer' | 'support'
    customerEmail: string;
    customerName: string;
    assignedToEmail?: string;
    assignedToName?: string;
  }) {
    this.logger.log(`📧 Handling ticket.message.created event for ticket #${payload.ticketDisplayNumber}`);

    try {
      if (payload.senderRole === 'customer') {
        // Customer sent message → notify support team
        if (payload.assignedToEmail) {
          await this.sendTicketNotificationToSupport(payload);
        } else {
          this.logger.warn(`⚠️ Ticket #${payload.ticketDisplayNumber} has no assigned support - skipping email`);
        }
      } else {
        // Support sent message → notify customer
        await this.sendTicketNotificationToCustomer(payload);
      }

      this.logger.log(`✅ Ticket notification sent for #${payload.ticketDisplayNumber}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send ticket notification: ${error.message}`, error.stack);
      // Don't throw - email failure shouldn't break ticket message creation
    }
  }

  /**
   * Send ticket notification to customer
   */
  private async sendTicketNotificationToCustomer(payload: {
    ticketDisplayNumber: string;
    ticketTitle: string;
    messageText: string;
    customerEmail: string;
    customerName: string;
    assignedToName?: string;
  }) {
    const baseUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003';
    const ticketUrl = `${baseUrl}/portal/support/${payload.ticketDisplayNumber}`;

    await this.mailService.sendMail({
      to: {
        email: payload.customerEmail,
        name: payload.customerName,
      },
      subject: `Destek Talebiniz Yanıtlandı - #${payload.ticketDisplayNumber}`,
      template: 'ticket-reply-customer',
      channel: MailChannel.TRANSACTIONAL,
      context: {
        customerName: payload.customerName,
        ticketNumber: payload.ticketDisplayNumber,
        ticketTitle: payload.ticketTitle,
        messageText: payload.messageText,
        supportName: payload.assignedToName || 'Destek Ekibi',
        ticketUrl,
      },
    });
  }

  /**
   * Send ticket notification to support team
   */
  private async sendTicketNotificationToSupport(payload: {
    ticketDisplayNumber: string;
    ticketTitle: string;
    messageText: string;
    customerName: string;
    assignedToEmail: string;
    assignedToName: string;
  }) {
    const baseUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9003';
    const ticketUrl = `${baseUrl}/admin/support/${payload.ticketDisplayNumber}`;

    await this.mailService.sendMail({
      to: {
        email: payload.assignedToEmail,
        name: payload.assignedToName,
      },
      subject: `Yeni Müşteri Mesajı - #${payload.ticketDisplayNumber}`,
      template: 'ticket-reply-support',
      channel: MailChannel.TRANSACTIONAL,
      context: {
        supportName: payload.assignedToName,
        customerName: payload.customerName,
        ticketNumber: payload.ticketDisplayNumber,
        ticketTitle: payload.ticketTitle,
        messageText: payload.messageText,
        ticketUrl,
      },
    });
  }
}
