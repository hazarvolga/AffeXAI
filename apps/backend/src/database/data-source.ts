import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { UserRole } from '../modules/users/entities/user-role.entity';
import { Role } from '../modules/roles/entities/role.entity';
import { Notification } from '../modules/notifications/entities/notification.entity';
import { Subscriber } from '../modules/email-marketing/entities/subscriber.entity';
import { EmailCampaign } from '../modules/email-marketing/entities/email-campaign.entity';
import { EmailCampaignVariant } from '../modules/email-marketing/entities/email-campaign-variant.entity';
import { EmailLog } from '../modules/email-marketing/entities/email-log.entity';
import { Group } from '../modules/email-marketing/entities/group.entity';
import { Segment } from '../modules/email-marketing/entities/segment.entity';
import { EmailAutomation } from '../modules/email-marketing/entities/email-automation.entity';
import { AutomationTrigger } from '../modules/email-marketing/entities/automation-trigger.entity';
import { AutomationExecution } from '../modules/email-marketing/entities/automation-execution.entity';
import { AutomationSchedule } from '../modules/email-marketing/entities/automation-schedule.entity';
import { ImportJob } from '../modules/email-marketing/entities/import-job.entity';
import { ExportJob } from '../modules/email-marketing/entities/export-job.entity';
import { ImportResult } from '../modules/email-marketing/entities/import-result.entity';
import { Page } from '../modules/cms/entities/page.entity';
import { Component } from '../modules/cms/entities/component.entity';
import { Category } from '../modules/cms/entities/category.entity';
import { Menu } from '../modules/cms/entities/menu.entity';
import { MenuItem } from '../modules/cms/entities/menu-item.entity';
import { CmsMetric } from '../modules/cms/entities/cms-metric.entity';
import { Ticket } from '../modules/tickets/entities/ticket.entity';
import { TicketMessage } from '../modules/tickets/entities/ticket-message.entity';
import { TicketCategory } from '../modules/tickets/entities/ticket-category.entity';
import { TicketAuditLog } from '../modules/tickets/entities/ticket-audit-log.entity';
import { TicketAssignmentRule } from '../modules/tickets/entities/ticket-assignment-rule.entity';
import { TicketEscalationRule } from '../modules/tickets/entities/ticket-escalation-rule.entity';
import { ChatSession } from '../modules/chat/entities/chat-session.entity';
import { ChatMessage } from '../modules/chat/entities/chat-message.entity';
import { ChatDocument } from '../modules/chat/entities/chat-document.entity';
import { ChatContextSource } from '../modules/chat/entities/chat-context-source.entity';
import { ChatSupportAssignment } from '../modules/chat/entities/chat-support-assignment.entity';
import { ChatUrlCache } from '../modules/chat/entities/chat-url-cache.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'affexai_dev',
  synchronize: false,
  logging: false,
  entities: [
    User,
    UserRole,
    Role,
    Notification,
    Subscriber,
    EmailCampaign,
    EmailCampaignVariant,
    EmailLog,
    Group,
    Segment,
    EmailAutomation,
    AutomationTrigger,
    AutomationExecution,
    AutomationSchedule,
    ImportJob,
    ExportJob,
    ImportResult,
    Page,
    Component,
    Category,
    Menu,
    MenuItem,
    CmsMetric,
    Ticket,
    TicketMessage,
    TicketCategory,
    TicketAuditLog,
    TicketAssignmentRule,
    TicketEscalationRule,
    ChatSession,
    ChatMessage,
    ChatDocument,
    ChatContextSource,
    ChatSupportAssignment,
    ChatUrlCache,
  ],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: [],
});