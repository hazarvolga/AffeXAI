import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { EventsModule } from './modules/events/events.module';
import { EmailMarketingModule } from './modules/email-marketing/email-marketing.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { MediaModule } from './modules/media/media.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { SettingsModule } from './modules/settings/settings.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { CmsModule } from './modules/cms/cms.module';
import { MailModule } from './modules/mail/mail.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { RolesModule } from './modules/roles/roles.module';
import { AiModule } from './modules/ai/ai.module';
import { PlatformIntegrationModule } from './modules/platform-integration/platform-integration.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { FaqLearningModule } from './modules/faq-learning/faq-learning.module';
import { ChatModule } from './modules/chat/chat.module';
import { KnowledgeSourcesModule } from './modules/knowledge-sources/knowledge-sources.module';
import { CrmModule } from './modules/crm/crm.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggingModule } from './common/logging/logging.module';
import { SystemLogsModule } from './modules/system-logs/system-logs.module';
import { FormBuilderModule } from './modules/form-builder/form-builder.module';

@Module({
  imports: [
    ConfigModule,
    LoggingModule, // Add logging module globally
    EventEmitterModule.forRoot({
      // Use this instance across the entire Nest application
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    CacheModule.register({
      ttl: 60, // seconds
      max: 100, // maximum number of items in cache
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: 'postgres',
      password: 'postgres',
      database: process.env.DB_NAME || 'affexai_dev',
      autoLoadEntities: true,
      synchronize: true, // Temporary: Will sync schema with entities
      logging: ['query', 'error', 'schema'], // Log SQL queries, errors, and schema changes
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    ScheduleModule.forRoot(), // Enable scheduling for the entire application
    SharedModule,
    MailModule,
    UsersModule,
    AuthModule,
    EventsModule,
    EmailMarketingModule,
    MediaModule,
    NotificationsModule,
    SettingsModule,
    CertificatesModule,
    CmsModule,
    TicketsModule,
    RolesModule,
    AiModule,
    PlatformIntegrationModule,
    AnalyticsModule,
    FaqLearningModule,
    ChatModule,
    KnowledgeSourcesModule,
    CrmModule,
    SystemLogsModule, // Add system logs API
    FormBuilderModule, // Centralized form builder for all modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}