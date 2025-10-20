import { Module, Global, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ResendWebhookController } from './controllers/resend-webhook.controller';
import { WebhookService } from './services/webhook.service';
import { EmailSuppression } from './entities/email-suppression.entity';
import { SettingsModule } from '../settings/settings.module';
import { EmailMarketingModule } from '../email-marketing/email-marketing.module';

/**
 * Mail Module
 * Provides email sending functionality across the application
 * Marked as @Global so it's available everywhere without imports
 */
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([EmailSuppression]),
    SettingsModule,
    forwardRef(() => EmailMarketingModule), // Forward reference to avoid circular dependency
  ],
  controllers: [
    MailController,
    ResendWebhookController,
  ],
  providers: [
    MailService,
    WebhookService,
  ],
  exports: [
    MailService,
    WebhookService,
  ],
})
export class MailModule {}
