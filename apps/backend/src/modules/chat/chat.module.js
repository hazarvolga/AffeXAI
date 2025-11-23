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
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
// External modules
const ai_module_1 = require("../ai/ai.module");
const settings_module_1 = require("../settings/settings.module");
const faq_learning_module_1 = require("../faq-learning/faq-learning.module");
// Entities
const chat_session_entity_1 = require("./entities/chat-session.entity");
const chat_message_entity_1 = require("./entities/chat-message.entity");
const chat_document_entity_1 = require("./entities/chat-document.entity");
const chat_context_source_entity_1 = require("./entities/chat-context-source.entity");
const chat_support_assignment_entity_1 = require("./entities/chat-support-assignment.entity");
const chat_url_cache_entity_1 = require("./entities/chat-url-cache.entity");
// Services
const chat_session_service_1 = require("./services/chat-session.service");
const chat_message_service_1 = require("./services/chat-message.service");
const document_processor_service_1 = require("./services/document-processor.service");
const file_validator_service_1 = require("./services/file-validator.service");
const chat_context_engine_service_1 = require("./services/chat-context-engine.service");
const url_processor_service_1 = require("./services/url-processor.service");
const url_cache_service_1 = require("./services/url-cache.service");
const chat_ai_service_1 = require("./services/chat-ai.service");
const chat_ai_settings_service_1 = require("./services/chat-ai-settings.service");
const chat_support_assignment_service_1 = require("./services/chat-support-assignment.service");
const chat_handoff_service_1 = require("./services/chat-handoff.service");
const support_dashboard_service_1 = require("./services/support-dashboard.service");
const general_communication_context_service_1 = require("./services/general-communication-context.service");
const general_communication_ai_service_1 = require("./services/general-communication-ai.service");
const chat_escalation_service_1 = require("./services/chat-escalation.service");
// Controllers
const document_upload_controller_1 = require("./controllers/document-upload.controller");
const url_processing_controller_1 = require("./controllers/url-processing.controller");
const chat_ai_controller_1 = require("./controllers/chat-ai.controller");
const support_assignment_controller_1 = require("./controllers/support-assignment.controller");
const chat_handoff_controller_1 = require("./controllers/chat-handoff.controller");
const support_dashboard_controller_1 = require("./controllers/support-dashboard.controller");
const general_communication_controller_1 = require("./controllers/general-communication.controller");
// Gateways
const chat_gateway_1 = require("./gateways/chat.gateway");
// External entities
const user_entity_1 = require("../users/entities/user.entity");
const knowledge_base_article_entity_1 = require("../tickets/entities/knowledge-base-article.entity");
const learned_faq_entry_entity_1 = require("../faq-learning/entities/learned-faq-entry.entity");
const learning_pattern_entity_1 = require("../faq-learning/entities/learning-pattern.entity");
// External services
const faq_enhanced_search_service_1 = require("../faq-learning/services/faq-enhanced-search.service");
let ChatModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    // Chat entities
                    chat_session_entity_1.ChatSession,
                    chat_message_entity_1.ChatMessage,
                    chat_document_entity_1.ChatDocument,
                    chat_context_source_entity_1.ChatContextSource,
                    chat_support_assignment_entity_1.ChatSupportAssignment,
                    chat_url_cache_entity_1.ChatUrlCache,
                    // External entities
                    user_entity_1.User,
                    knowledge_base_article_entity_1.KnowledgeBaseArticle,
                    learned_faq_entry_entity_1.LearnedFaqEntry,
                    learning_pattern_entity_1.LearningPattern,
                ]),
                jwt_1.JwtModule.register({
                    secret: process.env.JWT_SECRET || 'your-secret-key',
                    signOptions: { expiresIn: '24h' },
                }),
                // External modules
                ai_module_1.AiModule,
                settings_module_1.SettingsModule,
                faq_learning_module_1.FaqLearningModule,
            ],
            controllers: [
                document_upload_controller_1.DocumentUploadController,
                url_processing_controller_1.UrlProcessingController,
                chat_ai_controller_1.ChatAiController,
                support_assignment_controller_1.SupportAssignmentController,
                chat_handoff_controller_1.ChatHandoffController,
                support_dashboard_controller_1.SupportDashboardController,
                general_communication_controller_1.GeneralCommunicationController,
            ],
            providers: [
                chat_session_service_1.ChatSessionService,
                chat_message_service_1.ChatMessageService,
                document_processor_service_1.DocumentProcessorService,
                file_validator_service_1.FileValidatorService,
                chat_context_engine_service_1.ChatContextEngineService,
                url_processor_service_1.UrlProcessorService,
                url_cache_service_1.UrlCacheService,
                chat_ai_service_1.ChatAiService,
                chat_ai_settings_service_1.ChatAiSettingsService,
                chat_support_assignment_service_1.ChatSupportAssignmentService,
                chat_handoff_service_1.ChatHandoffService,
                support_dashboard_service_1.SupportDashboardService,
                general_communication_context_service_1.GeneralCommunicationContextService,
                general_communication_ai_service_1.GeneralCommunicationAiService,
                chat_escalation_service_1.ChatEscalationService,
                faq_enhanced_search_service_1.FaqEnhancedSearchService,
                chat_gateway_1.ChatGateway,
            ],
            exports: [
                chat_session_service_1.ChatSessionService,
                chat_message_service_1.ChatMessageService,
                document_processor_service_1.DocumentProcessorService,
                file_validator_service_1.FileValidatorService,
                chat_context_engine_service_1.ChatContextEngineService,
                url_processor_service_1.UrlProcessorService,
                url_cache_service_1.UrlCacheService,
                chat_ai_service_1.ChatAiService,
                chat_ai_settings_service_1.ChatAiSettingsService,
                chat_support_assignment_service_1.ChatSupportAssignmentService,
                chat_handoff_service_1.ChatHandoffService,
                support_dashboard_service_1.SupportDashboardService,
                general_communication_context_service_1.GeneralCommunicationContextService,
                general_communication_ai_service_1.GeneralCommunicationAiService,
                chat_escalation_service_1.ChatEscalationService,
                chat_gateway_1.ChatGateway,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return ChatModule = _classThis;
})();
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map