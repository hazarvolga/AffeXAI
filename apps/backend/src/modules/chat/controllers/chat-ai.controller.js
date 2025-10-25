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
exports.ChatAiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const chat_ai_response_dto_1 = require("../dto/chat-ai-response.dto");
const ai_settings_dto_1 = require("../../settings/dto/ai-settings.dto");
const rxjs_1 = require("rxjs");
let ChatAiController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Chat AI'), (0, common_1.Controller)('chat/ai'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _generateResponse_decorators;
    let _streamResponse_decorators;
    let _testConfiguration_decorators;
    let _getUsageStats_decorators;
    let _previewContext_decorators;
    var ChatAiController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _generateResponse_decorators = [(0, common_1.Post)('generate'), (0, swagger_1.ApiOperation)({ summary: 'Generate AI response with context' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'AI response generated successfully',
                    type: chat_ai_response_dto_1.ChatAiResponseDto
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request parameters' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'AI generation failed' }), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CUSTOMER, user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN)];
            _streamResponse_decorators = [(0, common_1.Sse)('stream'), (0, swagger_1.ApiOperation)({ summary: 'Generate streaming AI response with context' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Streaming AI response',
                    type: chat_ai_response_dto_1.StreamingChunkResponseDto
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request parameters' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CUSTOMER, user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN)];
            _testConfiguration_decorators = [(0, common_1.Post)('test'), (0, swagger_1.ApiOperation)({ summary: 'Test AI configuration for chat' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'AI configuration test results',
                    type: chat_ai_response_dto_1.ChatAiTestResponseDto
                }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER)];
            _getUsageStats_decorators = [(0, common_1.Get)('usage-stats'), (0, swagger_1.ApiOperation)({ summary: 'Get AI usage statistics' }), (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, description: 'Filter by session ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'AI usage statistics',
                    type: chat_ai_response_dto_1.ChatAiUsageStatsDto
                }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT)];
            _previewContext_decorators = [(0, common_1.Get)('context-preview/:sessionId'), (0, swagger_1.ApiOperation)({ summary: 'Preview context that would be used for AI generation' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Context preview',
                    type: 'object'
                }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CUSTOMER, user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN)];
            __esDecorate(this, null, _generateResponse_decorators, { kind: "method", name: "generateResponse", static: false, private: false, access: { has: obj => "generateResponse" in obj, get: obj => obj.generateResponse }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _streamResponse_decorators, { kind: "method", name: "streamResponse", static: false, private: false, access: { has: obj => "streamResponse" in obj, get: obj => obj.streamResponse }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _testConfiguration_decorators, { kind: "method", name: "testConfiguration", static: false, private: false, access: { has: obj => "testConfiguration" in obj, get: obj => obj.testConfiguration }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUsageStats_decorators, { kind: "method", name: "getUsageStats", static: false, private: false, access: { has: obj => "getUsageStats" in obj, get: obj => obj.getUsageStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewContext_decorators, { kind: "method", name: "previewContext", static: false, private: false, access: { has: obj => "previewContext" in obj, get: obj => obj.previewContext }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatAiController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        chatAiService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(ChatAiController.name);
        constructor(chatAiService) {
            this.chatAiService = chatAiService;
        }
        async generateResponse(request, user) {
            this.logger.log(`Generating AI response for user ${user.id} in session ${request.sessionId}`);
            try {
                const result = await this.chatAiService.generateChatResponse(request.prompt, {
                    includeContext: request.includeContext,
                    contextOptions: request.contextOptions,
                    sessionId: request.sessionId,
                    messageId: request.messageId,
                    model: request.model,
                    provider: request.provider,
                    temperature: request.temperature,
                    maxTokens: request.maxTokens,
                    streamResponse: false
                });
                return {
                    content: result.content,
                    model: result.model,
                    provider: result.provider,
                    tokensUsed: result.tokensUsed,
                    finishReason: result.finishReason,
                    contextUsed: result.contextUsed ? {
                        sources: result.contextUsed.sources.map(source => ({
                            id: source.id,
                            type: source.type,
                            title: source.title,
                            content: source.content,
                            relevanceScore: source.relevanceScore,
                            url: source.url,
                            sourceId: source.sourceId,
                            metadata: source.metadata
                        })),
                        totalRelevanceScore: result.contextUsed.totalRelevanceScore,
                        searchQuery: result.contextUsed.searchQuery,
                        processingTime: result.contextUsed.processingTime
                    } : undefined,
                    contextSources: result.contextSources?.map(source => ({
                        id: source.id,
                        type: source.type,
                        title: source.title,
                        content: source.content,
                        relevanceScore: source.relevanceScore,
                        url: source.url,
                        sourceId: source.sourceId,
                        metadata: source.metadata
                    })),
                    confidenceScore: result.confidenceScore,
                    citations: result.citations,
                    streamingSupported: result.streamingSupported
                };
            }
            catch (error) {
                this.logger.error(`AI generation failed for user ${user.id}: ${error.message}`, error.stack);
                throw error;
            }
        }
        streamResponse(prompt, sessionId, messageId, includeContext = true, maxSources, minRelevanceScore, user) {
            this.logger.log(`Starting streaming AI response for user ${user?.id} in session ${sessionId}`);
            return new rxjs_1.Observable(observer => {
                (async () => {
                    try {
                        const generator = this.chatAiService.generateStreamingChatResponse(prompt, {
                            includeContext,
                            contextOptions: {
                                maxSources,
                                minRelevanceScore
                            },
                            sessionId,
                            messageId,
                            streamResponse: true
                        });
                        for await (const chunk of generator) {
                            const event = {
                                data: {
                                    content: chunk.content,
                                    isComplete: chunk.isComplete,
                                    metadata: chunk.metadata
                                }
                            };
                            observer.next(event);
                            if (chunk.isComplete) {
                                break;
                            }
                        }
                        observer.complete();
                    }
                    catch (error) {
                        this.logger.error(`Streaming AI generation failed: ${error.message}`, error.stack);
                        observer.error(error);
                    }
                })();
            });
        }
        async testConfiguration(request, user) {
            this.logger.log(`Testing AI configuration for user ${user.id}`);
            try {
                const result = await this.chatAiService.testChatAiConfiguration();
                return {
                    success: result.success,
                    provider: result.provider,
                    model: result.model,
                    streamingSupported: result.streamingSupported,
                    responseTime: result.responseTime,
                    error: result.error,
                    testResponse: result.success ? 'Test successful' : undefined
                };
            }
            catch (error) {
                this.logger.error(`AI configuration test failed: ${error.message}`, error.stack);
                return {
                    success: false,
                    provider: ai_settings_dto_1.AiProvider.OPENAI,
                    model: ai_settings_dto_1.AiModel.GPT_4_TURBO,
                    streamingSupported: false,
                    responseTime: 0,
                    error: error.message
                };
            }
        }
        async getUsageStats(sessionId, user) {
            this.logger.log(`Getting AI usage stats for user ${user?.id}${sessionId ? ` and session ${sessionId}` : ''}`);
            try {
                const stats = await this.chatAiService.getChatAiUsageStats(sessionId);
                return {
                    totalRequests: stats.totalRequests,
                    totalTokens: stats.totalTokens,
                    averageResponseTime: stats.averageResponseTime,
                    averageConfidence: stats.averageConfidence,
                    providerUsage: stats.providerUsage,
                    modelUsage: stats.modelUsage,
                    sessionStats: sessionId ? {
                        sessionId,
                        requestCount: 0, // Would be populated from actual usage data
                        totalTokens: 0,
                        averageConfidence: 0
                    } : undefined
                };
            }
            catch (error) {
                this.logger.error(`Failed to get AI usage stats: ${error.message}`, error.stack);
                throw error;
            }
        }
        async previewContext(sessionId, query, maxSources, minRelevanceScore, includeKnowledgeBase, includeFaqLearning, includeDocuments, user) {
            this.logger.log(`Previewing context for user ${user?.id} in session ${sessionId}`);
            try {
                // This would use the context engine directly to show what context would be used
                // without actually generating an AI response
                return {
                    message: 'Context preview functionality would be implemented here',
                    sessionId,
                    query,
                    options: {
                        maxSources,
                        minRelevanceScore,
                        includeKnowledgeBase,
                        includeFaqLearning,
                        includeDocuments
                    }
                };
            }
            catch (error) {
                this.logger.error(`Context preview failed: ${error.message}`, error.stack);
                throw error;
            }
        }
    };
    return ChatAiController = _classThis;
})();
exports.ChatAiController = ChatAiController;
//# sourceMappingURL=chat-ai.controller.js.map