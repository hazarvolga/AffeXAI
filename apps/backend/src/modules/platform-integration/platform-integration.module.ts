import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

// Entities
import { PlatformEvent } from './entities/platform-event.entity';
import { AutomationRule } from './entities/automation-rule.entity';
import { Webhook } from './entities/webhook.entity';
import { AutomationApproval } from './entities/automation-approval.entity';

// Services
import { EventBusService } from './services/event-bus.service';
import { AutomationExecutorService } from './services/automation-executor.service';
import { WebhookService } from './services/webhook.service';

// Controllers
import { IntegrationController } from './controllers/integration.controller';
import { AutomationRulesController } from './controllers/automation-rules.controller';
import { WebhooksController } from './controllers/webhooks.controller';
import { ApprovalsController } from './controllers/approvals.controller';

/**
 * Platform Integration Module
 * 
 * Central hub for platform-wide event management, automation, and integrations.
 * 
 * Features:
 * - Event Bus: Platform-wide event publishing and subscription
 * - Automation Rules: Event-driven automation workflows
 * - Webhooks: Integration with external systems
 * - Approval System: Multi-level approval for automation actions
 * 
 * Use Cases:
 * - When event.published → Send email campaign
 * - When certificate.issued → Add to segment
 * - When page.published → Trigger webhook
 * - All with optional approval workflow
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlatformEvent,
      AutomationRule,
      Webhook,
      AutomationApproval,
    ]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  controllers: [
    IntegrationController,
    AutomationRulesController,
    WebhooksController,
    ApprovalsController,
  ],
  providers: [
    EventBusService,
    AutomationExecutorService,
    WebhookService,
  ],
  exports: [
    EventBusService, // Export for other modules to use
    AutomationExecutorService,
    WebhookService,
  ],
})
export class PlatformIntegrationModule {}
