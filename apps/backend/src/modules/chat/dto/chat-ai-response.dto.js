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
exports.ChatAiUsageStatsDto = exports.ChatAiTestResponseDto = exports.StreamingChunkResponseDto = exports.ChatAiResponseDto = exports.ContextResultResponseDto = exports.ContextSourceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ai_settings_dto_1 = require("../../settings/dto/ai-settings.dto");
const chat_context_source_entity_1 = require("../entities/chat-context-source.entity");
let ContextSourceResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _relevanceScore_decorators;
    let _relevanceScore_initializers = [];
    let _relevanceScore_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _sourceId_decorators;
    let _sourceId_initializers = [];
    let _sourceId_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    return class ContextSourceResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Source ID' })];
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Source type', enum: chat_context_source_entity_1.ContextSourceType })];
            _title_decorators = [(0, swagger_1.ApiProperty)({ description: 'Source title' })];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Source content excerpt' })];
            _relevanceScore_decorators = [(0, swagger_1.ApiProperty)({ description: 'Relevance score (0-1)' })];
            _url_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Source URL if available' })];
            _sourceId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Original source ID' })];
            _metadata_decorators = [(0, swagger_1.ApiProperty)({ description: 'Additional metadata' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _relevanceScore_decorators, { kind: "field", name: "relevanceScore", static: false, private: false, access: { has: obj => "relevanceScore" in obj, get: obj => obj.relevanceScore, set: (obj, value) => { obj.relevanceScore = value; } }, metadata: _metadata }, _relevanceScore_initializers, _relevanceScore_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _sourceId_decorators, { kind: "field", name: "sourceId", static: false, private: false, access: { has: obj => "sourceId" in obj, get: obj => obj.sourceId, set: (obj, value) => { obj.sourceId = value; } }, metadata: _metadata }, _sourceId_initializers, _sourceId_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        relevanceScore = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _relevanceScore_initializers, void 0));
        url = (__runInitializers(this, _relevanceScore_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        sourceId = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _sourceId_initializers, void 0));
        metadata = (__runInitializers(this, _sourceId_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
})();
exports.ContextSourceResponseDto = ContextSourceResponseDto;
let ContextResultResponseDto = (() => {
    let _sources_decorators;
    let _sources_initializers = [];
    let _sources_extraInitializers = [];
    let _totalRelevanceScore_decorators;
    let _totalRelevanceScore_initializers = [];
    let _totalRelevanceScore_extraInitializers = [];
    let _searchQuery_decorators;
    let _searchQuery_initializers = [];
    let _searchQuery_extraInitializers = [];
    let _processingTime_decorators;
    let _processingTime_initializers = [];
    let _processingTime_extraInitializers = [];
    return class ContextResultResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sources_decorators = [(0, swagger_1.ApiProperty)({ description: 'Context sources found', type: [ContextSourceResponseDto] })];
            _totalRelevanceScore_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total relevance score of all sources' })];
            _searchQuery_decorators = [(0, swagger_1.ApiProperty)({ description: 'Original search query' })];
            _processingTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Context processing time in milliseconds' })];
            __esDecorate(null, null, _sources_decorators, { kind: "field", name: "sources", static: false, private: false, access: { has: obj => "sources" in obj, get: obj => obj.sources, set: (obj, value) => { obj.sources = value; } }, metadata: _metadata }, _sources_initializers, _sources_extraInitializers);
            __esDecorate(null, null, _totalRelevanceScore_decorators, { kind: "field", name: "totalRelevanceScore", static: false, private: false, access: { has: obj => "totalRelevanceScore" in obj, get: obj => obj.totalRelevanceScore, set: (obj, value) => { obj.totalRelevanceScore = value; } }, metadata: _metadata }, _totalRelevanceScore_initializers, _totalRelevanceScore_extraInitializers);
            __esDecorate(null, null, _searchQuery_decorators, { kind: "field", name: "searchQuery", static: false, private: false, access: { has: obj => "searchQuery" in obj, get: obj => obj.searchQuery, set: (obj, value) => { obj.searchQuery = value; } }, metadata: _metadata }, _searchQuery_initializers, _searchQuery_extraInitializers);
            __esDecorate(null, null, _processingTime_decorators, { kind: "field", name: "processingTime", static: false, private: false, access: { has: obj => "processingTime" in obj, get: obj => obj.processingTime, set: (obj, value) => { obj.processingTime = value; } }, metadata: _metadata }, _processingTime_initializers, _processingTime_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sources = __runInitializers(this, _sources_initializers, void 0);
        totalRelevanceScore = (__runInitializers(this, _sources_extraInitializers), __runInitializers(this, _totalRelevanceScore_initializers, void 0));
        searchQuery = (__runInitializers(this, _totalRelevanceScore_extraInitializers), __runInitializers(this, _searchQuery_initializers, void 0));
        processingTime = (__runInitializers(this, _searchQuery_extraInitializers), __runInitializers(this, _processingTime_initializers, void 0));
        constructor() {
            __runInitializers(this, _processingTime_extraInitializers);
        }
    };
})();
exports.ContextResultResponseDto = ContextResultResponseDto;
let ChatAiResponseDto = (() => {
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _tokensUsed_decorators;
    let _tokensUsed_initializers = [];
    let _tokensUsed_extraInitializers = [];
    let _finishReason_decorators;
    let _finishReason_initializers = [];
    let _finishReason_extraInitializers = [];
    let _contextUsed_decorators;
    let _contextUsed_initializers = [];
    let _contextUsed_extraInitializers = [];
    let _contextSources_decorators;
    let _contextSources_initializers = [];
    let _contextSources_extraInitializers = [];
    let _confidenceScore_decorators;
    let _confidenceScore_initializers = [];
    let _confidenceScore_extraInitializers = [];
    let _citations_decorators;
    let _citations_initializers = [];
    let _citations_extraInitializers = [];
    let _streamingSupported_decorators;
    let _streamingSupported_initializers = [];
    let _streamingSupported_extraInitializers = [];
    return class ChatAiResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Generated AI response content' })];
            _model_decorators = [(0, swagger_1.ApiProperty)({ description: 'AI model used' })];
            _provider_decorators = [(0, swagger_1.ApiProperty)({ description: 'AI provider used', enum: ai_settings_dto_1.AiProvider })];
            _tokensUsed_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of tokens used' })];
            _finishReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Finish reason from AI provider' })];
            _contextUsed_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Context information used', type: ContextResultResponseDto })];
            _contextSources_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Context sources used', type: [ContextSourceResponseDto] })];
            _confidenceScore_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Confidence score (0-1)' })];
            _citations_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Citations extracted from response', type: [String] })];
            _streamingSupported_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether streaming is supported for this configuration' })];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _tokensUsed_decorators, { kind: "field", name: "tokensUsed", static: false, private: false, access: { has: obj => "tokensUsed" in obj, get: obj => obj.tokensUsed, set: (obj, value) => { obj.tokensUsed = value; } }, metadata: _metadata }, _tokensUsed_initializers, _tokensUsed_extraInitializers);
            __esDecorate(null, null, _finishReason_decorators, { kind: "field", name: "finishReason", static: false, private: false, access: { has: obj => "finishReason" in obj, get: obj => obj.finishReason, set: (obj, value) => { obj.finishReason = value; } }, metadata: _metadata }, _finishReason_initializers, _finishReason_extraInitializers);
            __esDecorate(null, null, _contextUsed_decorators, { kind: "field", name: "contextUsed", static: false, private: false, access: { has: obj => "contextUsed" in obj, get: obj => obj.contextUsed, set: (obj, value) => { obj.contextUsed = value; } }, metadata: _metadata }, _contextUsed_initializers, _contextUsed_extraInitializers);
            __esDecorate(null, null, _contextSources_decorators, { kind: "field", name: "contextSources", static: false, private: false, access: { has: obj => "contextSources" in obj, get: obj => obj.contextSources, set: (obj, value) => { obj.contextSources = value; } }, metadata: _metadata }, _contextSources_initializers, _contextSources_extraInitializers);
            __esDecorate(null, null, _confidenceScore_decorators, { kind: "field", name: "confidenceScore", static: false, private: false, access: { has: obj => "confidenceScore" in obj, get: obj => obj.confidenceScore, set: (obj, value) => { obj.confidenceScore = value; } }, metadata: _metadata }, _confidenceScore_initializers, _confidenceScore_extraInitializers);
            __esDecorate(null, null, _citations_decorators, { kind: "field", name: "citations", static: false, private: false, access: { has: obj => "citations" in obj, get: obj => obj.citations, set: (obj, value) => { obj.citations = value; } }, metadata: _metadata }, _citations_initializers, _citations_extraInitializers);
            __esDecorate(null, null, _streamingSupported_decorators, { kind: "field", name: "streamingSupported", static: false, private: false, access: { has: obj => "streamingSupported" in obj, get: obj => obj.streamingSupported, set: (obj, value) => { obj.streamingSupported = value; } }, metadata: _metadata }, _streamingSupported_initializers, _streamingSupported_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        content = __runInitializers(this, _content_initializers, void 0);
        model = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        provider = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        tokensUsed = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _tokensUsed_initializers, void 0));
        finishReason = (__runInitializers(this, _tokensUsed_extraInitializers), __runInitializers(this, _finishReason_initializers, void 0));
        contextUsed = (__runInitializers(this, _finishReason_extraInitializers), __runInitializers(this, _contextUsed_initializers, void 0));
        contextSources = (__runInitializers(this, _contextUsed_extraInitializers), __runInitializers(this, _contextSources_initializers, void 0));
        confidenceScore = (__runInitializers(this, _contextSources_extraInitializers), __runInitializers(this, _confidenceScore_initializers, void 0));
        citations = (__runInitializers(this, _confidenceScore_extraInitializers), __runInitializers(this, _citations_initializers, void 0));
        streamingSupported = (__runInitializers(this, _citations_extraInitializers), __runInitializers(this, _streamingSupported_initializers, void 0));
        constructor() {
            __runInitializers(this, _streamingSupported_extraInitializers);
        }
    };
})();
exports.ChatAiResponseDto = ChatAiResponseDto;
let StreamingChunkResponseDto = (() => {
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _isComplete_decorators;
    let _isComplete_initializers = [];
    let _isComplete_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    return class StreamingChunkResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Content chunk' })];
            _isComplete_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether this is the final chunk' })];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Chunk metadata' })];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _isComplete_decorators, { kind: "field", name: "isComplete", static: false, private: false, access: { has: obj => "isComplete" in obj, get: obj => obj.isComplete, set: (obj, value) => { obj.isComplete = value; } }, metadata: _metadata }, _isComplete_initializers, _isComplete_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        content = __runInitializers(this, _content_initializers, void 0);
        isComplete = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _isComplete_initializers, void 0));
        metadata = (__runInitializers(this, _isComplete_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
})();
exports.StreamingChunkResponseDto = StreamingChunkResponseDto;
let ChatAiTestResponseDto = (() => {
    let _success_decorators;
    let _success_initializers = [];
    let _success_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _streamingSupported_decorators;
    let _streamingSupported_initializers = [];
    let _streamingSupported_extraInitializers = [];
    let _responseTime_decorators;
    let _responseTime_initializers = [];
    let _responseTime_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _testResponse_decorators;
    let _testResponse_initializers = [];
    let _testResponse_extraInitializers = [];
    return class ChatAiTestResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether the test was successful' })];
            _provider_decorators = [(0, swagger_1.ApiProperty)({ description: 'AI provider tested', enum: ai_settings_dto_1.AiProvider })];
            _model_decorators = [(0, swagger_1.ApiProperty)({ description: 'AI model tested' })];
            _streamingSupported_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether streaming is supported' })];
            _responseTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Response time in milliseconds' })];
            _error_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Error message if test failed' })];
            _testResponse_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Test response content if successful' })];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: obj => "success" in obj, get: obj => obj.success, set: (obj, value) => { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _streamingSupported_decorators, { kind: "field", name: "streamingSupported", static: false, private: false, access: { has: obj => "streamingSupported" in obj, get: obj => obj.streamingSupported, set: (obj, value) => { obj.streamingSupported = value; } }, metadata: _metadata }, _streamingSupported_initializers, _streamingSupported_extraInitializers);
            __esDecorate(null, null, _responseTime_decorators, { kind: "field", name: "responseTime", static: false, private: false, access: { has: obj => "responseTime" in obj, get: obj => obj.responseTime, set: (obj, value) => { obj.responseTime = value; } }, metadata: _metadata }, _responseTime_initializers, _responseTime_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _testResponse_decorators, { kind: "field", name: "testResponse", static: false, private: false, access: { has: obj => "testResponse" in obj, get: obj => obj.testResponse, set: (obj, value) => { obj.testResponse = value; } }, metadata: _metadata }, _testResponse_initializers, _testResponse_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        success = __runInitializers(this, _success_initializers, void 0);
        provider = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        model = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        streamingSupported = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _streamingSupported_initializers, void 0));
        responseTime = (__runInitializers(this, _streamingSupported_extraInitializers), __runInitializers(this, _responseTime_initializers, void 0));
        error = (__runInitializers(this, _responseTime_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        testResponse = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _testResponse_initializers, void 0));
        constructor() {
            __runInitializers(this, _testResponse_extraInitializers);
        }
    };
})();
exports.ChatAiTestResponseDto = ChatAiTestResponseDto;
let ChatAiUsageStatsDto = (() => {
    let _totalRequests_decorators;
    let _totalRequests_initializers = [];
    let _totalRequests_extraInitializers = [];
    let _totalTokens_decorators;
    let _totalTokens_initializers = [];
    let _totalTokens_extraInitializers = [];
    let _averageResponseTime_decorators;
    let _averageResponseTime_initializers = [];
    let _averageResponseTime_extraInitializers = [];
    let _averageConfidence_decorators;
    let _averageConfidence_initializers = [];
    let _averageConfidence_extraInitializers = [];
    let _providerUsage_decorators;
    let _providerUsage_initializers = [];
    let _providerUsage_extraInitializers = [];
    let _modelUsage_decorators;
    let _modelUsage_initializers = [];
    let _modelUsage_extraInitializers = [];
    let _sessionStats_decorators;
    let _sessionStats_initializers = [];
    let _sessionStats_extraInitializers = [];
    return class ChatAiUsageStatsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalRequests_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total number of AI requests' })];
            _totalTokens_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total tokens consumed' })];
            _averageResponseTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average response time in milliseconds' })];
            _averageConfidence_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average confidence score' })];
            _providerUsage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Usage by provider' })];
            _modelUsage_decorators = [(0, swagger_1.ApiProperty)({ description: 'Usage by model' })];
            _sessionStats_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Session-specific stats if sessionId provided' })];
            __esDecorate(null, null, _totalRequests_decorators, { kind: "field", name: "totalRequests", static: false, private: false, access: { has: obj => "totalRequests" in obj, get: obj => obj.totalRequests, set: (obj, value) => { obj.totalRequests = value; } }, metadata: _metadata }, _totalRequests_initializers, _totalRequests_extraInitializers);
            __esDecorate(null, null, _totalTokens_decorators, { kind: "field", name: "totalTokens", static: false, private: false, access: { has: obj => "totalTokens" in obj, get: obj => obj.totalTokens, set: (obj, value) => { obj.totalTokens = value; } }, metadata: _metadata }, _totalTokens_initializers, _totalTokens_extraInitializers);
            __esDecorate(null, null, _averageResponseTime_decorators, { kind: "field", name: "averageResponseTime", static: false, private: false, access: { has: obj => "averageResponseTime" in obj, get: obj => obj.averageResponseTime, set: (obj, value) => { obj.averageResponseTime = value; } }, metadata: _metadata }, _averageResponseTime_initializers, _averageResponseTime_extraInitializers);
            __esDecorate(null, null, _averageConfidence_decorators, { kind: "field", name: "averageConfidence", static: false, private: false, access: { has: obj => "averageConfidence" in obj, get: obj => obj.averageConfidence, set: (obj, value) => { obj.averageConfidence = value; } }, metadata: _metadata }, _averageConfidence_initializers, _averageConfidence_extraInitializers);
            __esDecorate(null, null, _providerUsage_decorators, { kind: "field", name: "providerUsage", static: false, private: false, access: { has: obj => "providerUsage" in obj, get: obj => obj.providerUsage, set: (obj, value) => { obj.providerUsage = value; } }, metadata: _metadata }, _providerUsage_initializers, _providerUsage_extraInitializers);
            __esDecorate(null, null, _modelUsage_decorators, { kind: "field", name: "modelUsage", static: false, private: false, access: { has: obj => "modelUsage" in obj, get: obj => obj.modelUsage, set: (obj, value) => { obj.modelUsage = value; } }, metadata: _metadata }, _modelUsage_initializers, _modelUsage_extraInitializers);
            __esDecorate(null, null, _sessionStats_decorators, { kind: "field", name: "sessionStats", static: false, private: false, access: { has: obj => "sessionStats" in obj, get: obj => obj.sessionStats, set: (obj, value) => { obj.sessionStats = value; } }, metadata: _metadata }, _sessionStats_initializers, _sessionStats_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalRequests = __runInitializers(this, _totalRequests_initializers, void 0);
        totalTokens = (__runInitializers(this, _totalRequests_extraInitializers), __runInitializers(this, _totalTokens_initializers, void 0));
        averageResponseTime = (__runInitializers(this, _totalTokens_extraInitializers), __runInitializers(this, _averageResponseTime_initializers, void 0));
        averageConfidence = (__runInitializers(this, _averageResponseTime_extraInitializers), __runInitializers(this, _averageConfidence_initializers, void 0));
        providerUsage = (__runInitializers(this, _averageConfidence_extraInitializers), __runInitializers(this, _providerUsage_initializers, void 0));
        modelUsage = (__runInitializers(this, _providerUsage_extraInitializers), __runInitializers(this, _modelUsage_initializers, void 0));
        sessionStats = (__runInitializers(this, _modelUsage_extraInitializers), __runInitializers(this, _sessionStats_initializers, void 0));
        constructor() {
            __runInitializers(this, _sessionStats_extraInitializers);
        }
    };
})();
exports.ChatAiUsageStatsDto = ChatAiUsageStatsDto;
//# sourceMappingURL=chat-ai-response.dto.js.map