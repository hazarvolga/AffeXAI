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
exports.ChatSupportAssignment = exports.AssignmentStatus = exports.AssignmentType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const chat_session_entity_1 = require("./chat-session.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var AssignmentType;
(function (AssignmentType) {
    AssignmentType["MANUAL"] = "manual";
    AssignmentType["AUTO"] = "auto";
    AssignmentType["ESCALATED"] = "escalated";
})(AssignmentType || (exports.AssignmentType = AssignmentType = {}));
var AssignmentStatus;
(function (AssignmentStatus) {
    AssignmentStatus["ACTIVE"] = "active";
    AssignmentStatus["COMPLETED"] = "completed";
    AssignmentStatus["TRANSFERRED"] = "transferred";
})(AssignmentStatus || (exports.AssignmentStatus = AssignmentStatus = {}));
let ChatSupportAssignment = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('chat_support_assignments'), (0, typeorm_1.Index)(['sessionId']), (0, typeorm_1.Index)(['supportUserId']), (0, typeorm_1.Index)(['status'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _supportUserId_decorators;
    let _supportUserId_initializers = [];
    let _supportUserId_extraInitializers = [];
    let _assignedBy_decorators;
    let _assignedBy_initializers = [];
    let _assignedBy_extraInitializers = [];
    let _assignmentType_decorators;
    let _assignmentType_initializers = [];
    let _assignmentType_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _assignedAt_decorators;
    let _assignedAt_initializers = [];
    let _assignedAt_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _session_decorators;
    let _session_initializers = [];
    let _session_extraInitializers = [];
    let _supportUser_decorators;
    let _supportUser_initializers = [];
    let _supportUser_extraInitializers = [];
    let _assignedByUser_decorators;
    let _assignedByUser_initializers = [];
    let _assignedByUser_extraInitializers = [];
    var ChatSupportAssignment = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _sessionId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _supportUserId_decorators = [(0, typeorm_1.Column)('uuid')];
            _assignedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _assignmentType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: AssignmentType,
                    default: AssignmentType.MANUAL
                })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: AssignmentStatus,
                    default: AssignmentStatus.ACTIVE
                })];
            _assignedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })];
            _completedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _notes_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _session_decorators = [(0, typeorm_1.ManyToOne)(() => chat_session_entity_1.ChatSession, session => session.supportAssignments, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'sessionId' })];
            _supportUser_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }), (0, typeorm_1.JoinColumn)({ name: 'supportUserId' })];
            _assignedByUser_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'assignedBy' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _supportUserId_decorators, { kind: "field", name: "supportUserId", static: false, private: false, access: { has: obj => "supportUserId" in obj, get: obj => obj.supportUserId, set: (obj, value) => { obj.supportUserId = value; } }, metadata: _metadata }, _supportUserId_initializers, _supportUserId_extraInitializers);
            __esDecorate(null, null, _assignedBy_decorators, { kind: "field", name: "assignedBy", static: false, private: false, access: { has: obj => "assignedBy" in obj, get: obj => obj.assignedBy, set: (obj, value) => { obj.assignedBy = value; } }, metadata: _metadata }, _assignedBy_initializers, _assignedBy_extraInitializers);
            __esDecorate(null, null, _assignmentType_decorators, { kind: "field", name: "assignmentType", static: false, private: false, access: { has: obj => "assignmentType" in obj, get: obj => obj.assignmentType, set: (obj, value) => { obj.assignmentType = value; } }, metadata: _metadata }, _assignmentType_initializers, _assignmentType_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _assignedAt_decorators, { kind: "field", name: "assignedAt", static: false, private: false, access: { has: obj => "assignedAt" in obj, get: obj => obj.assignedAt, set: (obj, value) => { obj.assignedAt = value; } }, metadata: _metadata }, _assignedAt_initializers, _assignedAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _session_decorators, { kind: "field", name: "session", static: false, private: false, access: { has: obj => "session" in obj, get: obj => obj.session, set: (obj, value) => { obj.session = value; } }, metadata: _metadata }, _session_initializers, _session_extraInitializers);
            __esDecorate(null, null, _supportUser_decorators, { kind: "field", name: "supportUser", static: false, private: false, access: { has: obj => "supportUser" in obj, get: obj => obj.supportUser, set: (obj, value) => { obj.supportUser = value; } }, metadata: _metadata }, _supportUser_initializers, _supportUser_extraInitializers);
            __esDecorate(null, null, _assignedByUser_decorators, { kind: "field", name: "assignedByUser", static: false, private: false, access: { has: obj => "assignedByUser" in obj, get: obj => obj.assignedByUser, set: (obj, value) => { obj.assignedByUser = value; } }, metadata: _metadata }, _assignedByUser_initializers, _assignedByUser_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatSupportAssignment = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        supportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _supportUserId_initializers, void 0));
        assignedBy = (__runInitializers(this, _supportUserId_extraInitializers), __runInitializers(this, _assignedBy_initializers, void 0));
        assignmentType = (__runInitializers(this, _assignedBy_extraInitializers), __runInitializers(this, _assignmentType_initializers, void 0));
        status = (__runInitializers(this, _assignmentType_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        assignedAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _assignedAt_initializers, void 0));
        completedAt = (__runInitializers(this, _assignedAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        notes = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        // Relations
        session = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _session_initializers, void 0));
        supportUser = (__runInitializers(this, _session_extraInitializers), __runInitializers(this, _supportUser_initializers, void 0));
        assignedByUser = (__runInitializers(this, _supportUser_extraInitializers), __runInitializers(this, _assignedByUser_initializers, void 0));
        // Computed properties
        get isActive() {
            return this.status === AssignmentStatus.ACTIVE;
        }
        get isCompleted() {
            return this.status === AssignmentStatus.COMPLETED;
        }
        get duration() {
            if (!this.completedAt)
                return null;
            return Math.floor((this.completedAt.getTime() - this.assignedAt.getTime()) / 1000);
        }
        get durationInMinutes() {
            const durationSeconds = this.duration;
            return durationSeconds ? Math.floor(durationSeconds / 60) : null;
        }
        get wasEscalated() {
            return this.assignmentType === AssignmentType.ESCALATED;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _assignedByUser_extraInitializers);
        }
    };
    return ChatSupportAssignment = _classThis;
})();
exports.ChatSupportAssignment = ChatSupportAssignment;
//# sourceMappingURL=chat-support-assignment.entity.js.map