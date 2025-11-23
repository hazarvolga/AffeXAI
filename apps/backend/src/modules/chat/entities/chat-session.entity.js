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
exports.ChatSession = exports.ChatSessionStatus = exports.ChatSessionType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const chat_message_entity_1 = require("./chat-message.entity");
const chat_document_entity_1 = require("./chat-document.entity");
const chat_support_assignment_entity_1 = require("./chat-support-assignment.entity");
var ChatSessionType;
(function (ChatSessionType) {
    ChatSessionType["SUPPORT"] = "support";
    ChatSessionType["GENERAL"] = "general";
})(ChatSessionType || (exports.ChatSessionType = ChatSessionType = {}));
var ChatSessionStatus;
(function (ChatSessionStatus) {
    ChatSessionStatus["ACTIVE"] = "active";
    ChatSessionStatus["CLOSED"] = "closed";
    ChatSessionStatus["TRANSFERRED"] = "transferred";
})(ChatSessionStatus || (exports.ChatSessionStatus = ChatSessionStatus = {}));
let ChatSession = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_sessions'), (0, typeorm_1.Index)(['userId']), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['sessionType']), (0, typeorm_1.Index)(['createdAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _sessionType_decorators;
    let _sessionType_initializers = [];
    let _sessionType_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _closedAt_decorators;
    let _closedAt_initializers = [];
    let _closedAt_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    let _documents_decorators;
    let _documents_initializers = [];
    let _documents_extraInitializers = [];
    let _supportAssignments_decorators;
    let _supportAssignments_initializers = [];
    let _supportAssignments_extraInitializers = [];
    var ChatSession = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _userId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _sessionType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ChatSessionType,
                    default: ChatSessionType.SUPPORT
                })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ChatSessionStatus,
                    default: ChatSessionStatus.ACTIVE
                })];
            _title_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { default: {} })];
            _closedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _messages_decorators = [(0, typeorm_1.OneToMany)(() => chat_message_entity_1.ChatMessage, message => message.session, { cascade: true })];
            _documents_decorators = [(0, typeorm_1.OneToMany)(() => chat_document_entity_1.ChatDocument, document => document.session, { cascade: true })];
            _supportAssignments_decorators = [(0, typeorm_1.OneToMany)(() => chat_support_assignment_entity_1.ChatSupportAssignment, assignment => assignment.session, { cascade: true })];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _sessionType_decorators, { kind: "field", name: "sessionType", static: false, private: false, access: { has: obj => "sessionType" in obj, get: obj => obj.sessionType, set: (obj, value) => { obj.sessionType = value; } }, metadata: _metadata }, _sessionType_initializers, _sessionType_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: obj => "closedAt" in obj, get: obj => obj.closedAt, set: (obj, value) => { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(null, null, _documents_decorators, { kind: "field", name: "documents", static: false, private: false, access: { has: obj => "documents" in obj, get: obj => obj.documents, set: (obj, value) => { obj.documents = value; } }, metadata: _metadata }, _documents_initializers, _documents_extraInitializers);
            __esDecorate(null, null, _supportAssignments_decorators, { kind: "field", name: "supportAssignments", static: false, private: false, access: { has: obj => "supportAssignments" in obj, get: obj => obj.supportAssignments, set: (obj, value) => { obj.supportAssignments = value; } }, metadata: _metadata }, _supportAssignments_initializers, _supportAssignments_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatSession = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        userId = __runInitializers(this, _userId_initializers, void 0);
        sessionType = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _sessionType_initializers, void 0));
        status = (__runInitializers(this, _sessionType_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        title = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        metadata = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        closedAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
        // Relations
        user = (__runInitializers(this, _closedAt_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        messages = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
        documents = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _documents_initializers, void 0));
        supportAssignments = (__runInitializers(this, _documents_extraInitializers), __runInitializers(this, _supportAssignments_initializers, void 0));
        // Computed properties
        get messageCount() {
            return this.messages?.length || 0;
        }
        get isActive() {
            return this.status === ChatSessionStatus.ACTIVE;
        }
        get isClosed() {
            return this.status === ChatSessionStatus.CLOSED;
        }
        get hasSupport() {
            return this.metadata?.supportAssigned || false;
        }
        get currentAssignment() {
            return this.supportAssignments?.find(assignment => assignment.status === 'active');
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _supportAssignments_extraInitializers);
        }
    };
    return ChatSession = _classThis;
})();
exports.ChatSession = ChatSession;
//# sourceMappingURL=chat-session.entity.js.map