"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_message_entity_1 = require("./entities/ticket-message.entity");
const ticket_category_entity_1 = require("./entities/ticket-category.entity");
const ticket_assignment_rule_entity_1 = require("./entities/ticket-assignment-rule.entity");
const ticket_escalation_rule_entity_1 = require("./entities/ticket-escalation-rule.entity");
const ticket_audit_log_entity_1 = require("./entities/ticket-audit-log.entity");
const ticket_template_entity_1 = require("./entities/ticket-template.entity");
const ticket_csat_entity_1 = require("./entities/ticket-csat.entity");
const knowledge_base_article_entity_1 = require("./entities/knowledge-base-article.entity");
const ticket_macro_entity_1 = require("./entities/ticket-macro.entity");
const tickets_service_1 = require("./tickets.service");
const tickets_controller_1 = require("./tickets.controller");
const ticket_assignment_rules_controller_1 = require("./controllers/ticket-assignment-rules.controller");
const ticket_escalation_rules_controller_1 = require("./controllers/ticket-escalation-rules.controller");
const ticket_attachments_controller_1 = require("./controllers/ticket-attachments.controller");
const ticket_templates_controller_1 = require("./controllers/ticket-templates.controller");
const ticket_analytics_controller_1 = require("./controllers/ticket-analytics.controller");
const ticket_email_webhook_controller_1 = require("./controllers/ticket-email-webhook.controller");
const ticket_csat_controller_1 = require("./controllers/ticket-csat.controller");
const knowledge_base_controller_1 = require("./controllers/knowledge-base.controller");
const ticket_macro_controller_1 = require("./controllers/ticket-macro.controller");
const ai_categorization_controller_1 = require("./controllers/ai-categorization.controller");
const users_module_1 = require("../users/users.module");
const mail_module_1 = require("../mail/mail.module");
const auth_module_1 = require("../../auth/auth.module");
const media_module_1 = require("../media/media.module");
const ticket_automation_service_1 = require("./services/ticket-automation.service");
const ticket_assignment_rules_service_1 = require("./services/ticket-assignment-rules.service");
const ticket_escalation_rules_service_1 = require("./services/ticket-escalation-rules.service");
const ticket_attachment_service_1 = require("./services/ticket-attachment.service");
const sla_service_1 = require("./services/sla.service");
const ticket_email_service_1 = require("./services/ticket-email.service");
const ticket_templates_service_1 = require("./services/ticket-templates.service");
const ticket_analytics_service_1 = require("./services/ticket-analytics.service");
const ticket_email_parser_service_1 = require("./services/ticket-email-parser.service");
const ticket_csat_service_1 = require("./services/ticket-csat.service");
const ticket_auto_tagging_service_1 = require("./services/ticket-auto-tagging.service");
const business_hours_service_1 = require("./services/business-hours.service");
const knowledge_base_service_1 = require("./services/knowledge-base.service");
const ticket_macro_service_1 = require("./services/ticket-macro.service");
const ai_categorization_service_1 = require("./services/ai-categorization.service");
const ticket_notifications_gateway_1 = require("./gateways/ticket-notifications.gateway");
const schedule_1 = require("@nestjs/schedule");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
/**
 * Tickets Module
 * Handles support ticket management, messages, and categories
 */
let TicketsModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    ticket_entity_1.Ticket,
                    ticket_message_entity_1.TicketMessage,
                    ticket_category_entity_1.TicketCategory,
                    ticket_assignment_rule_entity_1.TicketAssignmentRule,
                    ticket_escalation_rule_entity_1.TicketEscalationRule,
                    ticket_audit_log_entity_1.TicketAuditLog,
                    ticket_template_entity_1.TicketTemplate,
                    ticket_csat_entity_1.TicketCSAT,
                    knowledge_base_article_entity_1.KnowledgeBaseArticle,
                    ticket_macro_entity_1.TicketMacro,
                ]),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: async (configService) => ({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: '7d', // JWT accepts string format like '1d', '7d', '24h'
                        },
                    }),
                    inject: [config_1.ConfigService],
                }),
                users_module_1.UsersModule, // For user authentication and support team lookup
                mail_module_1.MailModule, // For email notifications
                auth_module_1.AuthModule, // For authentication guards
                media_module_1.MediaModule, // For media management
                schedule_1.ScheduleModule.forRoot(), // Enable scheduling for automation
            ],
            controllers: [
                tickets_controller_1.TicketsController,
                ticket_assignment_rules_controller_1.TicketAssignmentRulesController,
                ticket_escalation_rules_controller_1.TicketEscalationRulesController,
                ticket_attachments_controller_1.TicketAttachmentsController,
                ticket_templates_controller_1.TicketTemplatesController,
                ticket_analytics_controller_1.TicketAnalyticsController,
                ticket_email_webhook_controller_1.TicketEmailWebhookController,
                ticket_csat_controller_1.TicketCSATController,
                knowledge_base_controller_1.KnowledgeBaseController,
                ticket_macro_controller_1.TicketMacroController,
                ai_categorization_controller_1.AICategorizationController,
            ],
            providers: [
                tickets_service_1.TicketsService,
                ticket_automation_service_1.TicketAutomationService,
                ticket_assignment_rules_service_1.TicketAssignmentRulesService,
                ticket_escalation_rules_service_1.TicketEscalationRulesService,
                ticket_attachment_service_1.TicketAttachmentService,
                sla_service_1.SlaService,
                ticket_email_service_1.TicketEmailService,
                ticket_email_parser_service_1.TicketEmailParserService,
                ticket_csat_service_1.TicketCSATService,
                ticket_auto_tagging_service_1.TicketAutoTaggingService,
                business_hours_service_1.BusinessHoursService,
                knowledge_base_service_1.KnowledgeBaseService,
                ticket_macro_service_1.TicketMacroService,
                ai_categorization_service_1.AICategorizationService,
                ticket_templates_service_1.TicketTemplatesService,
                ticket_analytics_service_1.TicketAnalyticsService,
                ticket_notifications_gateway_1.TicketNotificationsGateway,
            ],
            exports: [
                tickets_service_1.TicketsService,
                ticket_automation_service_1.TicketAutomationService,
                ticket_assignment_rules_service_1.TicketAssignmentRulesService,
                ticket_escalation_rules_service_1.TicketEscalationRulesService,
                ticket_attachment_service_1.TicketAttachmentService,
                sla_service_1.SlaService,
                ticket_email_service_1.TicketEmailService,
                ticket_templates_service_1.TicketTemplatesService,
                ticket_notifications_gateway_1.TicketNotificationsGateway,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketsModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketsModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TicketsModule = _classThis;
})();
exports.TicketsModule = TicketsModule;
//# sourceMappingURL=tickets.module.js.map