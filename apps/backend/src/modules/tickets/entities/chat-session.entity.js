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
exports.ChatSession = exports.ChatSessionStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const chat_message_entity_1 = require("./chat-message.entity");
var ChatSessionStatus;
(function (ChatSessionStatus) {
    ChatSessionStatus["ACTIVE"] = "active";
    ChatSessionStatus["ENDED"] = "ended";
    ChatSessionStatus["TRANSFERRED"] = "transferred";
})(ChatSessionStatus || (exports.ChatSessionStatus = ChatSessionStatus = {}));
let ChatSession = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_sessions')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _agentId_decorators;
    let _agentId_initializers = [];
    let _agentId_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _startedAt_decorators;
    let _startedAt_initializers = [];
    let _startedAt_extraInitializers = [];
    let _endedAt_decorators;
    let _endedAt_initializers = [];
    let _endedAt_extraInitializers = [];
    let _duration_decorators;
    let _duration_initializers = [];
    let _duration_extraInitializers = [];
    let _satisfactionScore_decorators;
    let _satisfactionScore_initializers = [];
    let _satisfactionScore_extraInitializers = [];
    let _feedback_decorators;
    let _feedback_initializers = [];
    let _feedback_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _agent_decorators;
    let _agent_initializers = [];
    let _agent_extraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    var ChatSession = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _sessionId_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
            _userId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _agentId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ChatSessionStatus,
                    default: ChatSessionStatus.ACTIVE
                })];
            _startedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _endedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _duration_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
            _satisfactionScore_decorators = [(0, typeorm_1.Column)('int', { nullable: true, default: null })];
            _feedback_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _agent_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'agentId' })];
            _messages_decorators = [(0, typeorm_1.OneToMany)(() => chat_message_entity_1.ChatMessage, message => message.session)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _agentId_decorators, { kind: "field", name: "agentId", static: false, private: false, access: { has: obj => "agentId" in obj, get: obj => obj.agentId, set: (obj, value) => { obj.agentId = value; } }, metadata: _metadata }, _agentId_initializers, _agentId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _startedAt_decorators, { kind: "field", name: "startedAt", static: false, private: false, access: { has: obj => "startedAt" in obj, get: obj => obj.startedAt, set: (obj, value) => { obj.startedAt = value; } }, metadata: _metadata }, _startedAt_initializers, _startedAt_extraInitializers);
            __esDecorate(null, null, _endedAt_decorators, { kind: "field", name: "endedAt", static: false, private: false, access: { has: obj => "endedAt" in obj, get: obj => obj.endedAt, set: (obj, value) => { obj.endedAt = value; } }, metadata: _metadata }, _endedAt_initializers, _endedAt_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: obj => "duration" in obj, get: obj => obj.duration, set: (obj, value) => { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _satisfactionScore_decorators, { kind: "field", name: "satisfactionScore", static: false, private: false, access: { has: obj => "satisfactionScore" in obj, get: obj => obj.satisfactionScore, set: (obj, value) => { obj.satisfactionScore = value; } }, metadata: _metadata }, _satisfactionScore_initializers, _satisfactionScore_extraInitializers);
            __esDecorate(null, null, _feedback_decorators, { kind: "field", name: "feedback", static: false, private: false, access: { has: obj => "feedback" in obj, get: obj => obj.feedback, set: (obj, value) => { obj.feedback = value; } }, metadata: _metadata }, _feedback_initializers, _feedback_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _agent_decorators, { kind: "field", name: "agent", static: false, private: false, access: { has: obj => "agent" in obj, get: obj => obj.agent, set: (obj, value) => { obj.agent = value; } }, metadata: _metadata }, _agent_initializers, _agent_extraInitializers);
            __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatSession = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        userId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        agentId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _agentId_initializers, void 0));
        status = (__runInitializers(this, _agentId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        startedAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _startedAt_initializers, void 0));
        endedAt = (__runInitializers(this, _startedAt_extraInitializers), __runInitializers(this, _endedAt_initializers, void 0));
        duration = (__runInitializers(this, _endedAt_extraInitializers), __runInitializers(this, _duration_initializers, void 0)); // in seconds
        satisfactionScore = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _satisfactionScore_initializers, void 0)); // 1-5
        feedback = (__runInitializers(this, _satisfactionScore_extraInitializers), __runInitializers(this, _feedback_initializers, void 0));
        metadata = (__runInitializers(this, _feedback_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Relations
        user = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        agent = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _agent_initializers, void 0));
        messages = (__runInitializers(this, _agent_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
        // Computed properties
        get messageCount() {
            return this.messages?.length || 0;
        }
        get isResolved() {
            return this.status === ChatSessionStatus.ENDED && this.satisfactionScore >= 4;
        }
        get hasPositiveFeedback() {
            return this.satisfactionScore >= 4;
        }
        // Compatibility aliases for FAQ learning services
        get durationSeconds() {
            return this.duration;
        }
        get satisfactionRating() {
            return this.satisfactionScore;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _messages_extraInitializers);
        }
    };
    return ChatSession = _classThis;
})();
exports.ChatSession = ChatSession;
//# sourceMappingURL=chat-session.entity.js.map