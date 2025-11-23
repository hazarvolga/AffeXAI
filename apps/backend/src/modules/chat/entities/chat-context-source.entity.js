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
exports.ChatContextSource = exports.ContextSourceType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const chat_session_entity_1 = require("./chat-session.entity");
const chat_message_entity_1 = require("./chat-message.entity");
var ContextSourceType;
(function (ContextSourceType) {
    ContextSourceType["KNOWLEDGE_BASE"] = "knowledge_base";
    ContextSourceType["FAQ_LEARNING"] = "faq_learning";
    ContextSourceType["DOCUMENT"] = "document";
    ContextSourceType["URL"] = "url";
})(ContextSourceType || (exports.ContextSourceType = ContextSourceType = {}));
let ChatContextSource = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_context_sources'), (0, typeorm_1.Index)(['sessionId']), (0, typeorm_1.Index)(['sourceType']), (0, typeorm_1.Index)(['relevanceScore'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    let _sourceType_decorators;
    let _sourceType_initializers = [];
    let _sourceType_extraInitializers = [];
    let _sourceId_decorators;
    let _sourceId_initializers = [];
    let _sourceId_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _relevanceScore_decorators;
    let _relevanceScore_initializers = [];
    let _relevanceScore_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    var ChatContextSource = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _sessionId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _messageId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _sourceType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ContextSourceType
                })];
            _sourceId_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
            _content_decorators = [(0, typeorm_1.Column)('text')];
            _relevanceScore_decorators = [(0, typeorm_1.Column)('float', { default: 0.0 })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _session_decorators = [(0, typeorm_1.ManyToOne)(() => chat_session_entity_1.ChatSession, session => session, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'sessionId' })];
            _message_decorators = [(0, typeorm_1.ManyToOne)(() => chat_message_entity_1.ChatMessage, message => message.contextSources, { nullable: true, onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'messageId' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(null, null, _sourceType_decorators, { kind: "field", name: "sourceType", static: false, private: false, access: { has: obj => "sourceType" in obj, get: obj => obj.sourceType, set: (obj, value) => { obj.sourceType = value; } }, metadata: _metadata }, _sourceType_initializers, _sourceType_extraInitializers);
            __esDecorate(null, null, _sourceId_decorators, { kind: "field", name: "sourceId", static: false, private: false, access: { has: obj => "sourceId" in obj, get: obj => obj.sourceId, set: (obj, value) => { obj.sourceId = value; } }, metadata: _metadata }, _sourceId_initializers, _sourceId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _relevanceScore_decorators, { kind: "field", name: "relevanceScore", static: false, private: false, access: { has: obj => "relevanceScore" in obj, get: obj => obj.relevanceScore, set: (obj, value) => { obj.relevanceScore = value; } }, metadata: _metadata }, _relevanceScore_initializers, _relevanceScore_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatContextSource = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        messageId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
        sourceType = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _sourceType_initializers, void 0));
        sourceId = (__runInitializers(this, _sourceType_extraInitializers), __runInitializers(this, _sourceId_initializers, void 0)); // KB article ID, FAQ entry ID, document ID, URL
        content = (__runInitializers(this, _sourceId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        relevanceScore = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _relevanceScore_initializers, void 0));
        metadata = (__runInitializers(this, _relevanceScore_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Relations
        session = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        message = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _message_initializers, void 0));
        // Computed properties
        get isHighRelevance() {
            return this.relevanceScore >= 0.8;
        }
        get isMediumRelevance() {
            return this.relevanceScore >= 0.5 && this.relevanceScore < 0.8;
        }
        get isLowRelevance() {
            return this.relevanceScore < 0.5;
        }
        get sourceDisplayName() {
            switch (this.sourceType) {
                case ContextSourceType.KNOWLEDGE_BASE:
                    return 'Knowledge Base';
                case ContextSourceType.FAQ_LEARNING:
                    return 'FAQ';
                case ContextSourceType.DOCUMENT:
                    return 'Document';
                case ContextSourceType.URL:
                    return 'Web Content';
                default:
                    return 'Unknown';
            }
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _message_extraInitializers);
        }
    };
    return ChatContextSource = _classThis;
})();
exports.ChatContextSource = ChatContextSource;
//# sourceMappingURL=chat-context-source.entity.js.map