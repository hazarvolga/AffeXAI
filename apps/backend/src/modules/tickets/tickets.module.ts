import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketMessage } from './entities/ticket-message.entity';
import { TicketCategory } from './entities/ticket-category.entity';
import { ChatSession } from './entities/chat-session.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { TicketAssignmentRule } from './entities/ticket-assignment-rule.entity';
import { TicketEscalationRule } from './entities/ticket-escalation-rule.entity';
import { TicketAuditLog } from './entities/ticket-audit-log.entity';
import { TicketTemplate } from './entities/ticket-template.entity';
import { TicketCSAT } from './entities/ticket-csat.entity';
import { KnowledgeBaseArticle } from './entities/knowledge-base-article.entity';
import { TicketMacro } from './entities/ticket-macro.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketAssignmentRulesController } from './controllers/ticket-assignment-rules.controller';
import { TicketEscalationRulesController } from './controllers/ticket-escalation-rules.controller';
import { TicketAttachmentsController } from './controllers/ticket-attachments.controller';
import { TicketTemplatesController } from './controllers/ticket-templates.controller';
import { TicketAnalyticsController } from './controllers/ticket-analytics.controller';
import { TicketEmailWebhookController } from './controllers/ticket-email-webhook.controller';
import { TicketCSATController } from './controllers/ticket-csat.controller';
import { KnowledgeBaseController } from './controllers/knowledge-base.controller';
import { TicketMacroController } from './controllers/ticket-macro.controller';
import { AICategorizationController } from './controllers/ai-categorization.controller';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../../auth/auth.module';
import { MediaModule } from '../media/media.module';
import { TicketAutomationService } from './services/ticket-automation.service';
import { TicketAssignmentRulesService } from './services/ticket-assignment-rules.service';
import { TicketEscalationRulesService } from './services/ticket-escalation-rules.service';
import { TicketAttachmentService } from './services/ticket-attachment.service';
import { SlaService } from './services/sla.service';
import { TicketEmailService } from './services/ticket-email.service';
import { TicketTemplatesService } from './services/ticket-templates.service';
import { TicketAnalyticsService } from './services/ticket-analytics.service';
import { TicketEmailParserService } from './services/ticket-email-parser.service';
import { TicketCSATService } from './services/ticket-csat.service';
import { TicketAutoTaggingService } from './services/ticket-auto-tagging.service';
import { BusinessHoursService } from './services/business-hours.service';
import { KnowledgeBaseService } from './services/knowledge-base.service';
import { TicketMacroService } from './services/ticket-macro.service';
import { AICategorizationService } from './services/ai-categorization.service';
import { TicketNotificationsGateway } from './gateways/ticket-notifications.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingsModule } from '../settings/settings.module';
import { AiModule } from '../ai/ai.module';

/**
 * Tickets Module
 * Handles support ticket management, messages, and categories
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      TicketMessage,
      TicketCategory,
      ChatSession,
      ChatMessage,
      TicketAssignmentRule,
      TicketEscalationRule,
      TicketAuditLog,
      TicketTemplate,
      TicketCSAT,
      KnowledgeBaseArticle,
      TicketMacro,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '7d', // JWT accepts string format like '1d', '7d', '24h'
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule, // For user authentication and support team lookup
    MailModule, // For email notifications
    AuthModule, // For authentication guards
    MediaModule, // For media management
    SettingsModule, // For AI settings
    AiModule, // For AI services
    ScheduleModule.forRoot(), // Enable scheduling for automation
  ],
  controllers: [
    TicketsController,
    TicketAssignmentRulesController,
    TicketEscalationRulesController,
    TicketAttachmentsController,
    TicketTemplatesController,
    TicketAnalyticsController,
    TicketEmailWebhookController,
    TicketCSATController,
    KnowledgeBaseController,
    TicketMacroController,
    AICategorizationController,
  ],
  providers: [
    TicketsService,
    TicketAutomationService,
    TicketAssignmentRulesService,
    TicketEscalationRulesService,
    TicketAttachmentService,
    SlaService,
    TicketEmailService,
    TicketEmailParserService,
    TicketCSATService,
    TicketAutoTaggingService,
    BusinessHoursService,
    KnowledgeBaseService,
    TicketMacroService,
    AICategorizationService,
    TicketTemplatesService,
    TicketAnalyticsService,
    TicketNotificationsGateway,
  ],
  exports: [
    TicketsService,
    TicketAutomationService,
    TicketAssignmentRulesService,
    TicketEscalationRulesService,
    TicketAttachmentService,
    SlaService,
    TicketEmailService,
    TicketTemplatesService,
    TicketNotificationsGateway,
  ],
})
export class TicketsModule {}