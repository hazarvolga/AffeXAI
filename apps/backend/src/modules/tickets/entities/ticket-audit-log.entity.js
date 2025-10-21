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
exports.TicketAuditLog = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("./ticket.entity");
/**
 * TicketAuditLog Entity
 * Tracks all changes made to tickets and messages for compliance and debugging
 */
let TicketAuditLog = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ticket_audit_logs')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _ticketId_decorators;
    let _ticketId_initializers = [];
    let _ticketId_extraInitializers = [];
    let _ticket_decorators;
    let _ticket_initializers = [];
    let _ticket_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _action_decorators;
    let _action_initializers = [];
    let _action_extraInitializers = [];
    let _entityType_decorators;
    let _entityType_initializers = [];
    let _entityType_extraInitializers = [];
    let _entityId_decorators;
    let _entityId_initializers = [];
    let _entityId_extraInitializers = [];
    let _oldValues_decorators;
    let _oldValues_initializers = [];
    let _oldValues_extraInitializers = [];
    let _newValues_decorators;
    let _newValues_initializers = [];
    let _newValues_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _ipAddress_decorators;
    let _ipAddress_initializers = [];
    let _ipAddress_extraInitializers = [];
    let _userAgent_decorators;
    let _userAgent_initializers = [];
    let _userAgent_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    var TicketAuditLog = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _ticketId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _ticket_decorators = [(0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _action_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100 })];
            _entityType_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true })];
            _entityId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _oldValues_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _newValues_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _ipAddress_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
            _userAgent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: obj => "ticketId" in obj, get: obj => obj.ticketId, set: (obj, value) => { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: obj => "ticket" in obj, get: obj => obj.ticket, set: (obj, value) => { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: obj => "action" in obj, get: obj => obj.action, set: (obj, value) => { obj.action = value; } }, metadata: _metadata }, _action_initializers, _action_extraInitializers);
            __esDecorate(null, null, _entityType_decorators, { kind: "field", name: "entityType", static: false, private: false, access: { has: obj => "entityType" in obj, get: obj => obj.entityType, set: (obj, value) => { obj.entityType = value; } }, metadata: _metadata }, _entityType_initializers, _entityType_extraInitializers);
            __esDecorate(null, null, _entityId_decorators, { kind: "field", name: "entityId", static: false, private: false, access: { has: obj => "entityId" in obj, get: obj => obj.entityId, set: (obj, value) => { obj.entityId = value; } }, metadata: _metadata }, _entityId_initializers, _entityId_extraInitializers);
            __esDecorate(null, null, _oldValues_decorators, { kind: "field", name: "oldValues", static: false, private: false, access: { has: obj => "oldValues" in obj, get: obj => obj.oldValues, set: (obj, value) => { obj.oldValues = value; } }, metadata: _metadata }, _oldValues_initializers, _oldValues_extraInitializers);
            __esDecorate(null, null, _newValues_decorators, { kind: "field", name: "newValues", static: false, private: false, access: { has: obj => "newValues" in obj, get: obj => obj.newValues, set: (obj, value) => { obj.newValues = value; } }, metadata: _metadata }, _newValues_initializers, _newValues_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: obj => "ipAddress" in obj, get: obj => obj.ipAddress, set: (obj, value) => { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
            __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: obj => "userAgent" in obj, get: obj => obj.userAgent, set: (obj, value) => { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAuditLog = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        ticketId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
        ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
        userId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        action = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _action_initializers, void 0)); // e.g., 'status_changed', 'assigned', 'message_added', 'message_edited', 'priority_changed'
        entityType = (__runInitializers(this, _action_extraInitializers), __runInitializers(this, _entityType_initializers, void 0)); // 'ticket' | 'message' | 'assignment'
        entityId = (__runInitializers(this, _entityType_extraInitializers), __runInitializers(this, _entityId_initializers, void 0)); // ID of the affected entity (e.g., message ID)
        oldValues = (__runInitializers(this, _entityId_extraInitializers), __runInitializers(this, _oldValues_initializers, void 0));
        newValues = (__runInitializers(this, _oldValues_extraInitializers), __runInitializers(this, _newValues_initializers, void 0));
        description = (__runInitializers(this, _newValues_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        ipAddress = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
        userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
        metadata = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
    return TicketAuditLog = _classThis;
})();
exports.TicketAuditLog = TicketAuditLog;
//# sourceMappingURL=ticket-audit-log.entity.js.map