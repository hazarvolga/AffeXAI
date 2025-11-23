"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../modules/users/entities/user.entity");
const user_role_entity_1 = require("../modules/users/entities/user-role.entity");
const role_entity_1 = require("../modules/roles/entities/role.entity");
const notification_entity_1 = require("../modules/notifications/entities/notification.entity");
const subscriber_entity_1 = require("../modules/email-marketing/entities/subscriber.entity");
const email_campaign_entity_1 = require("../modules/email-marketing/entities/email-campaign.entity");
const email_campaign_variant_entity_1 = require("../modules/email-marketing/entities/email-campaign-variant.entity");
const email_log_entity_1 = require("../modules/email-marketing/entities/email-log.entity");
const group_entity_1 = require("../modules/email-marketing/entities/group.entity");
const segment_entity_1 = require("../modules/email-marketing/entities/segment.entity");
const email_automation_entity_1 = require("../modules/email-marketing/entities/email-automation.entity");
const automation_trigger_entity_1 = require("../modules/email-marketing/entities/automation-trigger.entity");
const automation_execution_entity_1 = require("../modules/email-marketing/entities/automation-execution.entity");
const automation_schedule_entity_1 = require("../modules/email-marketing/entities/automation-schedule.entity");
const import_job_entity_1 = require("../modules/email-marketing/entities/import-job.entity");
const export_job_entity_1 = require("../modules/email-marketing/entities/export-job.entity");
const import_result_entity_1 = require("../modules/email-marketing/entities/import-result.entity");
const page_entity_1 = require("../modules/cms/entities/page.entity");
const component_entity_1 = require("../modules/cms/entities/component.entity");
const category_entity_1 = require("../modules/cms/entities/category.entity");
const menu_entity_1 = require("../modules/cms/entities/menu.entity");
const menu_item_entity_1 = require("../modules/cms/entities/menu-item.entity");
const cms_metric_entity_1 = require("../modules/cms/entities/cms-metric.entity");
const ticket_entity_1 = require("../modules/tickets/entities/ticket.entity");
const ticket_message_entity_1 = require("../modules/tickets/entities/ticket-message.entity");
const ticket_category_entity_1 = require("../modules/tickets/entities/ticket-category.entity");
const ticket_audit_log_entity_1 = require("../modules/tickets/entities/ticket-audit-log.entity");
const ticket_assignment_rule_entity_1 = require("../modules/tickets/entities/ticket-assignment-rule.entity");
const ticket_escalation_rule_entity_1 = require("../modules/tickets/entities/ticket-escalation-rule.entity");
const chat_session_entity_1 = require("../modules/chat/entities/chat-session.entity");
const chat_message_entity_1 = require("../modules/chat/entities/chat-message.entity");
const chat_document_entity_1 = require("../modules/chat/entities/chat-document.entity");
const chat_context_source_entity_1 = require("../modules/chat/entities/chat-context-source.entity");
const chat_support_assignment_entity_1 = require("../modules/chat/entities/chat-support-assignment.entity");
const chat_url_cache_entity_1 = require("../modules/chat/entities/chat-url-cache.entity");
const company_knowledge_source_entity_1 = require("../modules/knowledge-sources/entities/company-knowledge-source.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'postgres',
    database: 'affexai_dev',
    synchronize: false,
    logging: false,
    entities: [
        user_entity_1.User,
        user_role_entity_1.UserRole,
        role_entity_1.Role,
        notification_entity_1.Notification,
        subscriber_entity_1.Subscriber,
        email_campaign_entity_1.EmailCampaign,
        email_campaign_variant_entity_1.EmailCampaignVariant,
        email_log_entity_1.EmailLog,
        group_entity_1.Group,
        segment_entity_1.Segment,
        email_automation_entity_1.EmailAutomation,
        automation_trigger_entity_1.AutomationTrigger,
        automation_execution_entity_1.AutomationExecution,
        automation_schedule_entity_1.AutomationSchedule,
        import_job_entity_1.ImportJob,
        export_job_entity_1.ExportJob,
        import_result_entity_1.ImportResult,
        page_entity_1.Page,
        component_entity_1.Component,
        category_entity_1.Category,
        menu_entity_1.Menu,
        menu_item_entity_1.MenuItem,
        cms_metric_entity_1.CmsMetric,
        ticket_entity_1.Ticket,
        ticket_message_entity_1.TicketMessage,
        ticket_category_entity_1.TicketCategory,
        ticket_audit_log_entity_1.TicketAuditLog,
        ticket_assignment_rule_entity_1.TicketAssignmentRule,
        ticket_escalation_rule_entity_1.TicketEscalationRule,
        chat_session_entity_1.ChatSession,
        chat_message_entity_1.ChatMessage,
        chat_document_entity_1.ChatDocument,
        chat_context_source_entity_1.ChatContextSource,
        chat_support_assignment_entity_1.ChatSupportAssignment,
        chat_url_cache_entity_1.ChatUrlCache,
        company_knowledge_source_entity_1.CompanyKnowledgeSource,
    ],
    migrations: ['src/database/migrations/**/*.ts'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map