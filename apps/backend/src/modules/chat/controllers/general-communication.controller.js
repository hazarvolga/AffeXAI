"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralCommunicationController = exports.GetSuggestedTopicsDto = exports.GeneralQueryDto = exports.CreateGeneralSessionDto = void 0;
const common_1 = require("@nestjs/common");
const chat_session_entity_1 = require("../entities/chat-session.entity");
class CreateGeneralSessionDto {
    title;
    language;
    metadata;
}
exports.CreateGeneralSessionDto = CreateGeneralSessionDto;
class GeneralQueryDto {
    query;
    sessionId;
    includeContextSources;
    maxResponseLength;
    tone;
    language;
}
exports.GeneralQueryDto = GeneralQueryDto;
class GetSuggestedTopicsDto {
    limit;
}
exports.GetSuggestedTopicsDto = GetSuggestedTopicsDto;
let GeneralCommunicationController = (() => {
    let _classDecorators = [(0, common_1.Controller)('chat/general')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createGeneralSession_decorators;
    let _handleGeneralQuery_decorators;
    let _getConversationStarters_decorators;
    let _getSuggestedTopics_decorators;
    let _analyzeQuery_decorators;
    let _getGeneralContext_decorators;
    let _getSessionStats_decorators;
    let _escalateToSupport_decorators;
    let _analyzeEscalationNeed_decorators;
    let _getEscalationHistory_decorators;
    let _getEscalationStatistics_decorators;
    var GeneralCommunicationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createGeneralSession_decorators = [(0, common_1.Post)('sessions')];
            _handleGeneralQuery_decorators = [(0, common_1.Post)('query')];
            _getConversationStarters_decorators = [(0, common_1.Get)('conversation-starters')];
            _getSuggestedTopics_decorators = [(0, common_1.Get)('suggested-topics')];
            _analyzeQuery_decorators = [(0, common_1.Post)('analyze-query')];
            _getGeneralContext_decorators = [(0, common_1.Post)('context')];
            _getSessionStats_decorators = [(0, common_1.Get)('sessions/:sessionId/stats')];
            _escalateToSupport_decorators = [(0, common_1.Post)('sessions/:sessionId/escalate')];
            _analyzeEscalationNeed_decorators = [(0, common_1.Post)('sessions/:sessionId/analyze-escalation')];
            _getEscalationHistory_decorators = [(0, common_1.Get)('sessions/:sessionId/escalation-history')];
            _getEscalationStatistics_decorators = [(0, common_1.Get)('escalation-statistics')];
            __esDecorate(this, null, _createGeneralSession_decorators, { kind: "method", name: "createGeneralSession", static: false, private: false, access: { has: obj => "createGeneralSession" in obj, get: obj => obj.createGeneralSession }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleGeneralQuery_decorators, { kind: "method", name: "handleGeneralQuery", static: false, private: false, access: { has: obj => "handleGeneralQuery" in obj, get: obj => obj.handleGeneralQuery }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getConversationStarters_decorators, { kind: "method", name: "getConversationStarters", static: false, private: false, access: { has: obj => "getConversationStarters" in obj, get: obj => obj.getConversationStarters }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSuggestedTopics_decorators, { kind: "method", name: "getSuggestedTopics", static: false, private: false, access: { has: obj => "getSuggestedTopics" in obj, get: obj => obj.getSuggestedTopics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _analyzeQuery_decorators, { kind: "method", name: "analyzeQuery", static: false, private: false, access: { has: obj => "analyzeQuery" in obj, get: obj => obj.analyzeQuery }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getGeneralContext_decorators, { kind: "method", name: "getGeneralContext", static: false, private: false, access: { has: obj => "getGeneralContext" in obj, get: obj => obj.getGeneralContext }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSessionStats_decorators, { kind: "method", name: "getSessionStats", static: false, private: false, access: { has: obj => "getSessionStats" in obj, get: obj => obj.getSessionStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _escalateToSupport_decorators, { kind: "method", name: "escalateToSupport", static: false, private: false, access: { has: obj => "escalateToSupport" in obj, get: obj => obj.escalateToSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _analyzeEscalationNeed_decorators, { kind: "method", name: "analyzeEscalationNeed", static: false, private: false, access: { has: obj => "analyzeEscalationNeed" in obj, get: obj => obj.analyzeEscalationNeed }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEscalationHistory_decorators, { kind: "method", name: "getEscalationHistory", static: false, private: false, access: { has: obj => "getEscalationHistory" in obj, get: obj => obj.getEscalationHistory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEscalationStatistics_decorators, { kind: "method", name: "getEscalationStatistics", static: false, private: false, access: { has: obj => "getEscalationStatistics" in obj, get: obj => obj.getEscalationStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GeneralCommunicationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        generalCommunicationAiService = __runInitializers(this, _instanceExtraInitializers);
        generalContextService;
        chatSessionService;
        chatEscalationService;
        logger = new common_1.Logger(GeneralCommunicationController.name);
        constructor(generalCommunicationAiService, generalContextService, chatSessionService, chatEscalationService) {
            this.generalCommunicationAiService = generalCommunicationAiService;
            this.generalContextService = generalContextService;
            this.chatSessionService = chatSessionService;
            this.chatEscalationService = chatEscalationService;
        }
        /**
         * Create a new general communication session
         */
        async createGeneralSession(req, createSessionDto) {
            try {
                const userId = req.user.sub || req.user.userId;
                const { title, language = 'tr', metadata = {} } = createSessionDto;
                this.logger.log(`Creating general communication session for user ${userId}`);
                const session = await this.chatSessionService.createSession({
                    userId,
                    sessionType: chat_session_entity_1.ChatSessionType.GENERAL,
                    title: title || (language === 'tr' ? 'Genel Sohbet' : 'General Chat'),
                    metadata: {
                        ...metadata,
                        language,
                        createdVia: 'general-communication-api',
                        initialContext: 'platform-information'
                    }
                });
                // Get conversation starters for the new session
                const conversationStarters = await this.generalCommunicationAiService.getConversationStarters(language);
                return {
                    session,
                    conversationStarters,
                    suggestedTopics: await this.generalContextService.getSuggestedTopics(6)
                };
            }
            catch (error) {
                this.logger.error(`Error creating general session: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Generate AI response for general communication query
         */
        async handleGeneralQuery(req, queryDto) {
            try {
                const userId = req.user.sub || req.user.userId;
                const { query, sessionId, includeContextSources = true, maxResponseLength = 800, tone = 'friendly', language = 'tr' } = queryDto;
                this.logger.log(`Handling general query for user ${userId} in session ${sessionId}`);
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    throw new Error('Access denied to session');
                }
                // Generate AI response
                const response = await this.generalCommunicationAiService.generateGeneralResponse(query, sessionId, {
                    includeContextSources,
                    maxResponseLength,
                    tone,
                    language
                });
                return {
                    response: response.content,
                    confidence: response.confidence,
                    responseType: response.responseType,
                    suggestedActions: response.suggestedActions,
                    contextSources: response.contextSources,
                    escalationReason: response.escalationReason,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error handling general query: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get conversation starters for general communication
         */
        async getConversationStarters(language = 'tr') {
            try {
                const starters = await this.generalCommunicationAiService.getConversationStarters(language);
                return {
                    starters,
                    language,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting conversation starters: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get suggested topics for general communication
         */
        async getSuggestedTopics(getSuggestedTopicsDto) {
            try {
                const { limit = 6 } = getSuggestedTopicsDto;
                const topics = await this.generalContextService.getSuggestedTopics(limit);
                return {
                    topics,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting suggested topics: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Check if a query is platform information related
         */
        async analyzeQuery(body) {
            try {
                const { query } = body;
                const isPlatformQuery = this.generalContextService.isPlatformInformationQuery(query);
                return {
                    query,
                    isPlatformInformationQuery: isPlatformQuery,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error analyzing query: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get general communication context for a query
         */
        async getGeneralContext(req, body) {
            try {
                const userId = req.user.sub || req.user.userId;
                const { query, sessionId, maxSources = 6, minRelevanceScore = 0.2, focusOnPlatformInfo = true } = body;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    throw new Error('Access denied to session');
                }
                const contextResult = await this.generalContextService.buildGeneralContext(query, sessionId, {
                    maxSources,
                    minRelevanceScore,
                    focusOnPlatformInfo
                });
                return {
                    ...contextResult,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting general context: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get general communication session statistics
         */
        async getSessionStats(req, sessionId) {
            try {
                const userId = req.user.sub || req.user.userId;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    throw new Error('Access denied to session');
                }
                const session = await this.chatSessionService.getSession(sessionId);
                if (!session || session.sessionType !== chat_session_entity_1.ChatSessionType.GENERAL) {
                    throw new Error('Session not found or not a general communication session');
                }
                // Get session statistics
                // const messageCount = await this.chatSessionService.getSessionMessageCount(sessionId); // TODO: Implement this method
                const messageCount = 0; // Placeholder
                const contextStats = await this.generalContextService['chatContextEngineService'].getContextStatistics(sessionId);
                return {
                    sessionId,
                    sessionType: session.sessionType,
                    messageCount,
                    contextStats,
                    sessionDuration: session.updatedAt.getTime() - session.createdAt.getTime(),
                    isActive: session.status === 'active',
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting session stats: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Escalate general communication session to support
         */
        async escalateToSupport(req, sessionId, body) {
            try {
                const userId = req.user.sub || req.user.userId;
                const { reason = 'user-requested', notes, priority = 'medium', category } = body;
                this.logger.log(`Escalating session ${sessionId} to support by user ${userId}`);
                // Use escalation service for comprehensive escalation handling
                const escalationResult = await this.chatEscalationService.escalateToSupport({
                    sessionId,
                    userId,
                    reason,
                    notes,
                    priority,
                    category
                });
                return {
                    success: escalationResult.success,
                    session: escalationResult.session,
                    assignment: escalationResult.assignment,
                    escalationMessage: escalationResult.escalationMessage,
                    notificationsSent: escalationResult.notificationsSent,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error escalating session to support: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Analyze if session needs escalation
         */
        async analyzeEscalationNeed(req, sessionId) {
            try {
                const userId = req.user.sub || req.user.userId;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    throw new Error('Access denied to session');
                }
                const analysis = await this.chatEscalationService.analyzeEscalationNeed(sessionId);
                return {
                    ...analysis,
                    sessionId,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error analyzing escalation need: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get escalation history for a session
         */
        async getEscalationHistory(req, sessionId) {
            try {
                const userId = req.user.sub || req.user.userId;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    throw new Error('Access denied to session');
                }
                const history = await this.chatEscalationService.getSessionEscalationHistory(sessionId);
                return {
                    ...history,
                    sessionId,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting escalation history: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get escalation statistics
         */
        async getEscalationStatistics(from, to) {
            try {
                const timeframe = from && to ? {
                    from: new Date(from),
                    to: new Date(to)
                } : undefined;
                const statistics = await this.chatEscalationService.getEscalationStatistics(timeframe);
                return {
                    ...statistics,
                    timeframe,
                    timestamp: new Date()
                };
            }
            catch (error) {
                this.logger.error(`Error getting escalation statistics: ${error.message}`, error.stack);
                throw error;
            }
        }
    };
    return GeneralCommunicationController = _classThis;
})();
exports.GeneralCommunicationController = GeneralCommunicationController;
//# sourceMappingURL=general-communication.controller.js.map