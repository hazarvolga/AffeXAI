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
exports.FaqLearningModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
// Entities
const learned_faq_entry_entity_1 = require("./entities/learned-faq-entry.entity");
const learning_pattern_entity_1 = require("./entities/learning-pattern.entity");
const faq_learning_config_entity_1 = require("./entities/faq-learning-config.entity");
const chat_session_entity_1 = require("../tickets/entities/chat-session.entity");
const chat_message_entity_1 = require("../tickets/entities/chat-message.entity");
const knowledge_base_article_entity_1 = require("../tickets/entities/knowledge-base-article.entity");
const knowledge_base_category_entity_1 = require("../tickets/entities/knowledge-base-category.entity");
const ticket_entity_1 = require("../tickets/entities/ticket.entity");
// Services - Data Extraction
const chat_data_extractor_service_1 = require("./services/chat-data-extractor.service");
const ticket_data_extractor_service_1 = require("./services/ticket-data-extractor.service");
const data_normalizer_service_1 = require("./services/data-normalizer.service");
const batch_processor_service_1 = require("./services/batch-processor.service");
// Services - Pattern Recognition & AI
const pattern_recognition_service_1 = require("./services/pattern-recognition.service");
const faq_ai_service_1 = require("./services/faq-ai.service");
const confidence_calculator_service_1 = require("./services/confidence-calculator.service");
// Services - FAQ Management
const faq_learning_service_1 = require("./services/faq-learning.service");
const faq_generator_service_1 = require("./services/faq-generator.service");
const review_queue_service_1 = require("./services/review-queue.service");
const feedback_processor_service_1 = require("./services/feedback-processor.service");
// Services - Integration
const knowledge_base_integrator_service_1 = require("./services/knowledge-base-integrator.service");
const faq_enhanced_search_service_1 = require("./services/faq-enhanced-search.service");
const chat_faq_integration_service_1 = require("./services/chat-faq-integration.service");
// Services - Background Processing
const scheduled_learning_jobs_service_1 = require("./services/scheduled-learning-jobs.service");
const real_time_processor_service_1 = require("./services/real-time-processor.service");
// Services - Analytics & Monitoring
const learning_analytics_service_1 = require("./services/learning-analytics.service");
const monitoring_alerting_service_1 = require("./services/monitoring-alerting.service");
// Services - Security
const data_privacy_service_1 = require("./services/data-privacy.service");
const audit_logging_service_1 = require("./services/audit-logging.service");
// Controllers
const faq_learning_controller_1 = require("./controllers/faq-learning.controller");
const review_management_controller_1 = require("./controllers/review-management.controller");
const learned_faq_controller_1 = require("./controllers/learned-faq.controller");
const analytics_controller_1 = require("./controllers/analytics.controller");
const monitoring_controller_1 = require("./controllers/monitoring.controller");
// External modules
const tickets_module_1 = require("../tickets/tickets.module");
const mail_module_1 = require("../mail/mail.module");
const users_module_1 = require("../users/users.module");
const ai_module_1 = require("../ai/ai.module");
const settings_module_1 = require("../settings/settings.module");
const common_2 = require("@nestjs/common");
let FaqLearningModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    learned_faq_entry_entity_1.LearnedFaqEntry,
                    learning_pattern_entity_1.LearningPattern,
                    faq_learning_config_entity_1.FaqLearningConfig,
                    chat_session_entity_1.ChatSession,
                    chat_message_entity_1.ChatMessage,
                    knowledge_base_article_entity_1.KnowledgeBaseArticle,
                    knowledge_base_category_entity_1.KnowledgeBaseCategory,
                    ticket_entity_1.Ticket,
                ]),
                schedule_1.ScheduleModule.forRoot(),
                (0, common_2.forwardRef)(() => tickets_module_1.TicketsModule),
                mail_module_1.MailModule,
                users_module_1.UsersModule,
                ai_module_1.AiModule,
                settings_module_1.SettingsModule,
            ],
            providers: [
                // Data Extraction Services
                chat_data_extractor_service_1.ChatDataExtractorService,
                ticket_data_extractor_service_1.TicketDataExtractorService,
                data_normalizer_service_1.DataNormalizerService,
                batch_processor_service_1.BatchProcessorService,
                // Pattern Recognition & AI Services
                pattern_recognition_service_1.PatternRecognitionService,
                faq_ai_service_1.FaqAiService,
                confidence_calculator_service_1.ConfidenceCalculatorService,
                // FAQ Management Services
                faq_learning_service_1.FaqLearningService,
                faq_generator_service_1.FaqGeneratorService,
                review_queue_service_1.ReviewQueueService,
                feedback_processor_service_1.FeedbackProcessorService,
                // Integration Services
                knowledge_base_integrator_service_1.KnowledgeBaseIntegratorService,
                faq_enhanced_search_service_1.FaqEnhancedSearchService,
                chat_faq_integration_service_1.ChatFaqIntegrationService,
                // Background Processing Services
                scheduled_learning_jobs_service_1.ScheduledLearningJobsService,
                real_time_processor_service_1.RealTimeProcessorService,
                // Analytics & Monitoring Services
                learning_analytics_service_1.LearningAnalyticsService,
                monitoring_alerting_service_1.MonitoringAlertingService,
                // Security Services
                data_privacy_service_1.DataPrivacyService,
                audit_logging_service_1.AuditLoggingService,
            ],
            controllers: [
                faq_learning_controller_1.FaqLearningController,
                review_management_controller_1.ReviewManagementController,
                learned_faq_controller_1.LearnedFaqController,
                analytics_controller_1.AnalyticsController,
                monitoring_controller_1.MonitoringController,
            ],
            exports: [
                // Export services that might be used by other modules
                faq_learning_service_1.FaqLearningService,
                faq_enhanced_search_service_1.FaqEnhancedSearchService,
                chat_faq_integration_service_1.ChatFaqIntegrationService,
                real_time_processor_service_1.RealTimeProcessorService,
                learning_analytics_service_1.LearningAnalyticsService,
                data_privacy_service_1.DataPrivacyService,
                audit_logging_service_1.AuditLoggingService,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FaqLearningModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqLearningModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return FaqLearningModule = _classThis;
})();
exports.FaqLearningModule = FaqLearningModule;
//# sourceMappingURL=faq-learning.module.js.map