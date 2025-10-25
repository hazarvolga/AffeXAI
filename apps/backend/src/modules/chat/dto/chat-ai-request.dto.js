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
exports.ChatAiTestRequestDto = exports.ChatAiRequestDto = exports.ChatContextOptionsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const ai_settings_dto_1 = require("../../settings/dto/ai-settings.dto");
let ChatContextOptionsDto = (() => {
    let _maxSources_decorators;
    let _maxSources_initializers = [];
    let _maxSources_extraInitializers = [];
    let _minRelevanceScore_decorators;
    let _minRelevanceScore_initializers = [];
    let _minRelevanceScore_extraInitializers = [];
    let _includeKnowledgeBase_decorators;
    let _includeKnowledgeBase_initializers = [];
    let _includeKnowledgeBase_extraInitializers = [];
    let _includeFaqLearning_decorators;
    let _includeFaqLearning_initializers = [];
    let _includeFaqLearning_extraInitializers = [];
    let _includeDocuments_decorators;
    let _includeDocuments_initializers = [];
    let _includeDocuments_extraInitializers = [];
    return class ChatContextOptionsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _maxSources_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of context sources to include', minimum: 1, maximum: 20 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(20)];
            _minRelevanceScore_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Minimum relevance score for context sources', minimum: 0, maximum: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(1)];
            _includeKnowledgeBase_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include Knowledge Base articles in context' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeFaqLearning_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include FAQ Learning entries in context' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _includeDocuments_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include uploaded documents in context' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _maxSources_decorators, { kind: "field", name: "maxSources", static: false, private: false, access: { has: obj => "maxSources" in obj, get: obj => obj.maxSources, set: (obj, value) => { obj.maxSources = value; } }, metadata: _metadata }, _maxSources_initializers, _maxSources_extraInitializers);
            __esDecorate(null, null, _minRelevanceScore_decorators, { kind: "field", name: "minRelevanceScore", static: false, private: false, access: { has: obj => "minRelevanceScore" in obj, get: obj => obj.minRelevanceScore, set: (obj, value) => { obj.minRelevanceScore = value; } }, metadata: _metadata }, _minRelevanceScore_initializers, _minRelevanceScore_extraInitializers);
            __esDecorate(null, null, _includeKnowledgeBase_decorators, { kind: "field", name: "includeKnowledgeBase", static: false, private: false, access: { has: obj => "includeKnowledgeBase" in obj, get: obj => obj.includeKnowledgeBase, set: (obj, value) => { obj.includeKnowledgeBase = value; } }, metadata: _metadata }, _includeKnowledgeBase_initializers, _includeKnowledgeBase_extraInitializers);
            __esDecorate(null, null, _includeFaqLearning_decorators, { kind: "field", name: "includeFaqLearning", static: false, private: false, access: { has: obj => "includeFaqLearning" in obj, get: obj => obj.includeFaqLearning, set: (obj, value) => { obj.includeFaqLearning = value; } }, metadata: _metadata }, _includeFaqLearning_initializers, _includeFaqLearning_extraInitializers);
            __esDecorate(null, null, _includeDocuments_decorators, { kind: "field", name: "includeDocuments", static: false, private: false, access: { has: obj => "includeDocuments" in obj, get: obj => obj.includeDocuments, set: (obj, value) => { obj.includeDocuments = value; } }, metadata: _metadata }, _includeDocuments_initializers, _includeDocuments_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        maxSources = __runInitializers(this, _maxSources_initializers, void 0);
        minRelevanceScore = (__runInitializers(this, _maxSources_extraInitializers), __runInitializers(this, _minRelevanceScore_initializers, void 0));
        includeKnowledgeBase = (__runInitializers(this, _minRelevanceScore_extraInitializers), __runInitializers(this, _includeKnowledgeBase_initializers, void 0));
        includeFaqLearning = (__runInitializers(this, _includeKnowledgeBase_extraInitializers), __runInitializers(this, _includeFaqLearning_initializers, void 0));
        includeDocuments = (__runInitializers(this, _includeFaqLearning_extraInitializers), __runInitializers(this, _includeDocuments_initializers, void 0));
        constructor() {
            __runInitializers(this, _includeDocuments_extraInitializers);
        }
    };
})();
exports.ChatContextOptionsDto = ChatContextOptionsDto;
let ChatAiRequestDto = (() => {
    let _prompt_decorators;
    let _prompt_initializers = [];
    let _prompt_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    let _includeContext_decorators;
    let _includeContext_initializers = [];
    let _includeContext_extraInitializers = [];
    let _contextOptions_decorators;
    let _contextOptions_initializers = [];
    let _contextOptions_extraInitializers = [];
    let _streamResponse_decorators;
    let _streamResponse_initializers = [];
    let _streamResponse_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _temperature_decorators;
    let _temperature_initializers = [];
    let _temperature_extraInitializers = [];
    let _maxTokens_decorators;
    let _maxTokens_initializers = [];
    let _maxTokens_extraInitializers = [];
    return class ChatAiRequestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _prompt_decorators = [(0, swagger_1.ApiProperty)({ description: 'User prompt/message' }), (0, class_validator_1.IsString)()];
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)()];
            _messageId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Message ID for context tracking' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _includeContext_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Include context from various sources', default: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _contextOptions_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Context options' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => ChatContextOptionsDto)];
            _streamResponse_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Enable streaming response', default: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _model_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'AI model to use (overrides global settings)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ai_settings_dto_1.AiModel)];
            _provider_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'AI provider to use (overrides global settings)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ai_settings_dto_1.AiProvider)];
            _temperature_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Temperature for AI generation', minimum: 0, maximum: 2 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(2)];
            _maxTokens_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum tokens for AI response', minimum: 50, maximum: 4000 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(50), (0, class_validator_1.Max)(4000)];
            __esDecorate(null, null, _prompt_decorators, { kind: "field", name: "prompt", static: false, private: false, access: { has: obj => "prompt" in obj, get: obj => obj.prompt, set: (obj, value) => { obj.prompt = value; } }, metadata: _metadata }, _prompt_initializers, _prompt_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(null, null, _includeContext_decorators, { kind: "field", name: "includeContext", static: false, private: false, access: { has: obj => "includeContext" in obj, get: obj => obj.includeContext, set: (obj, value) => { obj.includeContext = value; } }, metadata: _metadata }, _includeContext_initializers, _includeContext_extraInitializers);
            __esDecorate(null, null, _contextOptions_decorators, { kind: "field", name: "contextOptions", static: false, private: false, access: { has: obj => "contextOptions" in obj, get: obj => obj.contextOptions, set: (obj, value) => { obj.contextOptions = value; } }, metadata: _metadata }, _contextOptions_initializers, _contextOptions_extraInitializers);
            __esDecorate(null, null, _streamResponse_decorators, { kind: "field", name: "streamResponse", static: false, private: false, access: { has: obj => "streamResponse" in obj, get: obj => obj.streamResponse, set: (obj, value) => { obj.streamResponse = value; } }, metadata: _metadata }, _streamResponse_initializers, _streamResponse_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _temperature_decorators, { kind: "field", name: "temperature", static: false, private: false, access: { has: obj => "temperature" in obj, get: obj => obj.temperature, set: (obj, value) => { obj.temperature = value; } }, metadata: _metadata }, _temperature_initializers, _temperature_extraInitializers);
            __esDecorate(null, null, _maxTokens_decorators, { kind: "field", name: "maxTokens", static: false, private: false, access: { has: obj => "maxTokens" in obj, get: obj => obj.maxTokens, set: (obj, value) => { obj.maxTokens = value; } }, metadata: _metadata }, _maxTokens_initializers, _maxTokens_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        prompt = __runInitializers(this, _prompt_initializers, void 0);
        sessionId = (__runInitializers(this, _prompt_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        messageId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
        includeContext = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _includeContext_initializers, true));
        contextOptions = (__runInitializers(this, _includeContext_extraInitializers), __runInitializers(this, _contextOptions_initializers, void 0));
        streamResponse = (__runInitializers(this, _contextOptions_extraInitializers), __runInitializers(this, _streamResponse_initializers, false));
        model = (__runInitializers(this, _streamResponse_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        provider = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        temperature = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _temperature_initializers, void 0));
        maxTokens = (__runInitializers(this, _temperature_extraInitializers), __runInitializers(this, _maxTokens_initializers, void 0));
        constructor() {
            __runInitializers(this, _maxTokens_extraInitializers);
        }
    };
})();
exports.ChatAiRequestDto = ChatAiRequestDto;
let ChatAiTestRequestDto = (() => {
    let _testMessage_decorators;
    let _testMessage_initializers = [];
    let _testMessage_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    return class ChatAiTestRequestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _testMessage_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Test message to send to AI' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _model_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'AI model to test (overrides global settings)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ai_settings_dto_1.AiModel)];
            _provider_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'AI provider to test (overrides global settings)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ai_settings_dto_1.AiProvider)];
            __esDecorate(null, null, _testMessage_decorators, { kind: "field", name: "testMessage", static: false, private: false, access: { has: obj => "testMessage" in obj, get: obj => obj.testMessage, set: (obj, value) => { obj.testMessage = value; } }, metadata: _metadata }, _testMessage_initializers, _testMessage_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        testMessage = __runInitializers(this, _testMessage_initializers, 'Hello, this is a test message. Please respond with "Test successful".');
        model = (__runInitializers(this, _testMessage_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        provider = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        constructor() {
            __runInitializers(this, _provider_extraInitializers);
        }
    };
})();
exports.ChatAiTestRequestDto = ChatAiTestRequestDto;
//# sourceMappingURL=chat-ai-request.dto.js.map