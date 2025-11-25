import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from '../mail.service';
import { SettingsService } from '../../settings/settings.service';
import { MailChannel } from '../interfaces/mail-service.interface';

/**
 * Email Event Listener
 *
 * Listens to platform events and sends appropriate emails
 * This decouples email sending from business logic
 */
@Injectable()
export class EmailEventListener {
  private readonly logger = new Logger(EmailEventListener.name);

  constructor(
    private readonly mailService: MailService,
    private readonly settingsService: SettingsService,
  ) {}

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
      const baseUrl = await this.settingsService.getFrontendUrl();
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
    ticketId: string;
    messageId: string;
    isFromCustomer: boolean;
    customerEmail?: string;
    customerName?: string;
    supportEmail?: string;
    supportName?: string;
    ticketSubject: string;
    messageContent: string;
  }) {
    this.logger.log(`📧 Handling ticket.message.created event for ticket ${payload.ticketId}`);

    try {
      if (payload.isFromCustomer) {
        // Customer sent message → notify support team
        if (payload.supportEmail && payload.supportName) {
          await this.sendTicketNotificationToSupport(payload);
        } else {
          this.logger.warn(`⚠️ Ticket ${payload.ticketId} has no assigned support - skipping email`);
        }
      } else {
        // Support sent message → notify customer
        if (payload.customerEmail && payload.customerName) {
          await this.sendTicketNotificationToCustomer(payload);
        } else {
          this.logger.warn(`⚠️ Ticket ${payload.ticketId} has no customer email - skipping email`);
        }
      }

      this.logger.log(`✅ Ticket notification sent for ${payload.ticketId}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send ticket notification: ${error.message}`, error.stack);
      // Don't throw - email failure shouldn't break ticket message creation
    }
  }

  /**
   * Send ticket notification to customer
   */
  private async sendTicketNotificationToCustomer(payload: {
    ticketId: string;
    ticketSubject: string;
    messageContent: string;
    customerEmail?: string;
    customerName?: string;
    supportName?: string;
  }) {
    const baseUrl = await this.settingsService.getFrontendUrl();
    const ticketUrl = `${baseUrl}/portal/support/${payload.ticketId}`;

    await this.mailService.sendMail({
      to: {
        email: payload.customerEmail!,
        name: payload.customerName!,
      },
      subject: `Destek Talebiniz Yanıtlandı - ${payload.ticketSubject}`,
      template: 'ticket-reply-customer',
      channel: MailChannel.TRANSACTIONAL,
      context: {
        customerName: payload.customerName,
        ticketNumber: payload.ticketId,
        ticketTitle: payload.ticketSubject,
        messageText: payload.messageContent,
        supportName: payload.supportName || 'Destek Ekibi',
        ticketUrl,
      },
    });
  }

  /**
   * Send ticket notification to support team
   */
  private async sendTicketNotificationToSupport(payload: {
    ticketId: string;
    ticketSubject: string;
    messageContent: string;
    customerName?: string;
    supportEmail?: string;
    supportName?: string;
  }) {
    const baseUrl = await this.settingsService.getFrontendUrl();
    const ticketUrl = `${baseUrl}/admin/support/${payload.ticketId}`;

    await this.mailService.sendMail({
      to: {
        email: payload.supportEmail!,
        name: payload.supportName!,
      },
      subject: `Yeni Müşteri Mesajı - ${payload.ticketSubject}`,
      template: 'ticket-reply-support',
      channel: MailChannel.TRANSACTIONAL,
      context: {
        supportName: payload.supportName,
        customerName: payload.customerName,
        ticketNumber: payload.ticketId,
        ticketTitle: payload.ticketSubject,
        messageText: payload.messageContent,
        ticketUrl,
      },
    });
  }
}
