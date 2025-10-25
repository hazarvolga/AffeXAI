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
exports.ChatMessage = exports.ChatMessageType = exports.ChatMessageSenderType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const chat_session_entity_1 = require("./chat-session.entity");
const chat_context_source_entity_1 = require("./chat-context-source.entity");
var ChatMessageSenderType;
(function (ChatMessageSenderType) {
    ChatMessageSenderType["USER"] = "user";
    ChatMessageSenderType["AI"] = "ai";
    ChatMessageSenderType["SUPPORT"] = "support";
})(ChatMessageSenderType || (exports.ChatMessageSenderType = ChatMessageSenderType = {}));
var ChatMessageType;
(function (ChatMessageType) {
    ChatMessageType["TEXT"] = "text";
    ChatMessageType["FILE"] = "file";
    ChatMessageType["URL"] = "url";
    ChatMessageType["SYSTEM"] = "system";
})(ChatMessageType || (exports.ChatMessageType = ChatMessageType = {}));
let ChatMessage = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_messages'), (0, typeorm_1.Index)(['sessionId', 'createdAt']), (0, typeorm_1.Index)(['senderType', 'senderId'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _senderType_decorators;
    let _senderType_initializers = [];
    let _senderType_extraInitializers = [];
    let _senderId_decorators;
    let _senderId_initializers = [];
    let _senderId_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _messageType_decorators;
    let _messageType_initializers = [];
    let _messageType_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _sender_decorators;
    let _sender_initializers = [];
    let _sender_extraInitializers = [];
    let _contextSources_decorators;
    let _contextSources_initializers = [];
    let _contextSources_extraInitializers = [];
    var ChatMessage = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _sessionId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _senderType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ChatMessageSenderType
                })];
            _senderId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _content_decorators = [(0, typeorm_1.Column)('text')];
            _messageType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ChatMessageType,
                    default: ChatMessageType.TEXT
                })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _session_decorators = [(0, typeorm_1.ManyToOne)(() => chat_session_entity_1.ChatSession, session => session.messages, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'sessionId' })];
            _sender_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'senderId' })];
            _contextSources_decorators = [(0, typeorm_1.OneToMany)(() => chat_context_source_entity_1.ChatContextSource, source => source.message, { cascade: true })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _senderType_decorators, { kind: "field", name: "senderType", static: false, private: false, access: { has: obj => "senderType" in obj, get: obj => obj.senderType, set: (obj, value) => { obj.senderType = value; } }, metadata: _metadata }, _senderType_initializers, _senderType_extraInitializers);
            __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: obj => "senderId" in obj, get: obj => obj.senderId, set: (obj, value) => { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _messageType_decorators, { kind: "field", name: "messageType", static: false, private: false, access: { has: obj => "messageType" in obj, get: obj => obj.messageType, set: (obj, value) => { obj.messageType = value; } }, metadata: _metadata }, _messageType_initializers, _messageType_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: obj => "sender" in obj, get: obj => obj.sender, set: (obj, value) => { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
            __esDecorate(null, null, _contextSources_decorators, { kind: "field", name: "contextSources", static: false, private: false, access: { has: obj => "contextSources" in obj, get: obj => obj.contextSources, set: (obj, value) => { obj.contextSources = value; } }, metadata: _metadata }, _contextSources_initializers, _contextSources_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatMessage = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        senderType = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _senderType_initializers, void 0));
        senderId = (__runInitializers(this, _senderType_extraInitializers), __runInitializers(this, _senderId_initializers, void 0)); // NULL for AI, user_id for user/support
        content = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        messageType = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _messageType_initializers, void 0));
        metadata = (__runInitializers(this, _messageType_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Relations
        session = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        sender = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
        contextSources = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _contextSources_initializers, void 0));
        // Computed properties
        get isFromUser() {
            return this.senderType === ChatMessageSenderType.USER;
        }
        get isFromAI() {
            return this.senderType === ChatMessageSenderType.AI;
        }
        get isFromSupport() {
            return this.senderType === ChatMessageSenderType.SUPPORT;
        }
        get hasContextSources() {
            return this.contextSources?.length > 0;
        }
        get hasAttachments() {
            return this.metadata?.attachments?.length > 0;
        }
        get wordCount() {
            return this.content.split(/\s+/).length;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _contextSources_extraInitializers);
        }
    };
    return ChatMessage = _classThis;
})();
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=chat-message.entity.js.map