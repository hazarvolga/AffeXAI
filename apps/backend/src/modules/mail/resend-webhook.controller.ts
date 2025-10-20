import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { createHmac } from 'crypto';

/**
 * Resend Webhook Events
 */
export enum ResendWebhookEvent {
  EMAIL_SENT = 'email.sent',
  EMAIL_DELIVERED = 'email.delivered',
  EMAIL_DELIVERY_DELAYED = 'email.delivery_delayed',
  EMAIL_COMPLAINED = 'email.complained',
  EMAIL_BOUNCED = 'email.bounced',
  EMAIL_OPENED = 'email.opened',
  EMAIL_CLICKED = 'email.clicked',
}

/**
 * Resend Webhook Payload
 */
interface ResendWebhookPayload {
  type: ResendWebhookEvent;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
    // Bounce specific
    bounce_type?: 'hard' | 'soft';
    bounce_reason?: string;
    // Complaint specific
    complaint_feedback_type?: string;
  };
}

/**
 * Resend Webhook Controller
 * Handles incoming webhooks from Resend for email events
 */
@Controller('webhooks/resend')
export class ResendWebhookController {
  private readonly logger = new Logger(ResendWebhookController.name);
  private readonly webhookSecret: string;

  constructor() {
    this.webhookSecret = process.env.RESEND_WEBHOOK_SECRET || '';
    if (!this.webhookSecret) {
      this.logger.warn('⚠️  RESEND_WEBHOOK_SECRET not set. Webhook signature verification disabled!');
    }
  }

  /**
   * Resend webhook endpoint
   * URL to configure in Resend: https://your-domain.com/api/webhooks/resend
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() payload: ResendWebhookPayload,
    @Headers('resend-signature') signature: string,
  ) {
    this.logger.log(`Received webhook: ${payload.type} for email ${payload.data.email_id}`);

    // Verify webhook signature
    if (this.webhookSecret && !this.verifySignature(payload, signature)) {
      this.logger.error('Invalid webhook signature');
      throw new BadRequestException('Invalid signature');
    }

    // Handle different event types
    try {
      switch (payload.type) {
        case ResendWebhookEvent.EMAIL_SENT:
          await this.handleEmailSent(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_DELIVERED:
          await this.handleEmailDelivered(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_DELIVERY_DELAYED:
          await this.handleEmailDelayed(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_BOUNCED:
          await this.handleEmailBounced(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_COMPLAINED:
          await this.handleEmailComplained(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_OPENED:
          await this.handleEmailOpened(payload);
          break;
        
        case ResendWebhookEvent.EMAIL_CLICKED:
          await this.handleEmailClicked(payload);
          break;
        
        default:
          this.logger.warn(`Unknown webhook event: ${payload.type}`);
      }

      return { success: true, message: 'Webhook processed' };
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Verify webhook signature from Resend
   */
  private verifySignature(payload: ResendWebhookPayload, signature: string): boolean {
    if (!signature) {
      return false;
    }

    try {
      const payloadString = JSON.stringify(payload);
      const expectedSignature = createHmac('sha256', this.webhookSecret)
        .update(payloadString)
        .digest('hex');
      
      return signature === expectedSignature;
    } catch (error) {
      this.logger.error('Signature verification failed', error);
      return false;
    }
  }

  /**
   * Handle email sent event
   */
  private async handleEmailSent(payload: ResendWebhookPayload) {
    this.logger.log(`Email sent: ${payload.data.email_id} to ${payload.data.to.join(', ')}`);
    
    // TODO: Update EmailLog table with sent status
    // await this.emailLogService.updateStatus(payload.data.email_id, 'sent');
  }

  /**
   * Handle email delivered event
   */
  private async handleEmailDelivered(payload: ResendWebhookPayload) {
    this.logger.log(`Email delivered: ${payload.data.email_id}`);
    
    // TODO: Update EmailLog table with delivered status
    // await this.emailLogService.updateStatus(payload.data.email_id, 'delivered');
  }

  /**
   * Handle email delayed event
   */
  private async handleEmailDelayed(payload: ResendWebhookPayload) {
    this.logger.warn(`Email delivery delayed: ${payload.data.email_id}`);
    
    // TODO: Log delay, retry after some time
    // await this.emailLogService.updateStatus(payload.data.email_id, 'delayed');
  }

  /**
   * Handle email bounced event (CRITICAL)
   */
  private async handleEmailBounced(payload: ResendWebhookPayload) {
    const { email_id, to, bounce_type, bounce_reason } = payload.data;
    
    this.logger.error(
      `Email bounced: ${email_id} to ${to.join(', ')} | Type: ${bounce_type} | Reason: ${bounce_reason}`
    );

    // TODO: Implement bounce handling logic
    // 1. Update EmailLog table with bounced status
    // await this.emailLogService.updateStatus(email_id, 'bounced', { bounce_type, bounce_reason });

    // 2. Hard bounce: Mark subscriber as invalid (stop sending)
    if (bounce_type === 'hard') {
      for (const email of to) {
        this.logger.warn(`Hard bounce detected for ${email}. Marking as invalid.`);
        
        // TODO: Mark subscriber as invalid
        // await this.subscriberService.markAsInvalid(email, 'hard_bounce', bounce_reason);
        
        // TODO: Add to suppression list
        // await this.suppressionListService.add(email, 'bounce', bounce_reason);
      }
    }

    // 3. Soft bounce: Increment retry count, temporary issue
    if (bounce_type === 'soft') {
      for (const email of to) {
        this.logger.log(`Soft bounce for ${email}. Will retry later.`);
        
        // TODO: Increment bounce count
        // await this.subscriberService.incrementBounceCount(email);
        
        // TODO: If bounce count > threshold (e.g., 5), mark as invalid
        // const bounceCount = await this.subscriberService.getBounceCount(email);
        // if (bounceCount >= 5) {
        //   await this.subscriberService.markAsInvalid(email, 'soft_bounce_threshold', bounce_reason);
        // }
      }
    }
  }

  /**
   * Handle email complained event (CRITICAL)
   */
  private async handleEmailComplained(payload: ResendWebhookPayload) {
    const { email_id, to, complaint_feedback_type } = payload.data;
    
    this.logger.error(
      `Email complaint: ${email_id} from ${to.join(', ')} | Feedback: ${complaint_feedback_type}`
    );

    // TODO: Implement complaint handling logic
    // 1. Update EmailLog table with complained status
    // await this.emailLogService.updateStatus(email_id, 'complained', { complaint_feedback_type });

    // 2. Mark subscriber as complained (IMMEDIATELY stop sending)
    for (const email of to) {
      this.logger.warn(`Spam complaint from ${email}. Immediately unsubscribing.`);
      
      // TODO: Mark subscriber as complained/unsubscribed
      // await this.subscriberService.markAsComplained(email, complaint_feedback_type);
      
      // TODO: Add to suppression list (NEVER send again)
      // await this.suppressionListService.add(email, 'complaint', complaint_feedback_type);
      
      // TODO: Update subscriber status to COMPLAINED
      // await this.subscriberService.updateStatus(email, SubscriberStatus.COMPLAINED);
    }
  }

  /**
   * Handle email opened event
   */
  private async handleEmailOpened(payload: ResendWebhookPayload) {
    this.logger.log(`Email opened: ${payload.data.email_id}`);
    
    // TODO: Track open event for analytics
    // await this.emailLogService.incrementOpenCount(payload.data.email_id);
    // await this.campaignService.incrementOpenCount(campaignId);
  }

  /**
   * Handle email clicked event
   */
  private async handleEmailClicked(payload: ResendWebhookPayload) {
    this.logger.log(`Email link clicked: ${payload.data.email_id}`);
    
    // TODO: Track click event for analytics
    // await this.emailLogService.incrementClickCount(payload.data.email_id);
    // await this.campaignService.incrementClickCount(campaignId);
  }
}
