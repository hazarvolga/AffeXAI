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
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
const ticket_message_entity_1 = require("./ticket-message.entity");
const ticket_category_entity_1 = require("./ticket-category.entity");
/**
 * Ticket Entity
 * Represents a support ticket in the system
 */
let Ticket = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('tickets')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _assignedToId_decorators;
    let _assignedToId_initializers = [];
    let _assignedToId_extraInitializers = [];
    let _assignedTo_decorators;
    let _assignedTo_initializers = [];
    let _assignedTo_extraInitializers = [];
    let _companyName_decorators;
    let _companyName_initializers = [];
    let _companyName_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _customFields_decorators;
    let _customFields_initializers = [];
    let _customFields_extraInitializers = [];
    let _firstResponseAt_decorators;
    let _firstResponseAt_initializers = [];
    let _firstResponseAt_extraInitializers = [];
    let _resolvedAt_decorators;
    let _resolvedAt_initializers = [];
    let _resolvedAt_extraInitializers = [];
    let _closedAt_decorators;
    let _closedAt_initializers = [];
    let _closedAt_extraInitializers = [];
    let _slaFirstResponseDueAt_decorators;
    let _slaFirstResponseDueAt_initializers = [];
    let _slaFirstResponseDueAt_extraInitializers = [];
    let _slaResolutionDueAt_decorators;
    let _slaResolutionDueAt_initializers = [];
    let _slaResolutionDueAt_extraInitializers = [];
    let _isSLABreached_decorators;
    let _isSLABreached_initializers = [];
    let _isSLABreached_extraInitializers = [];
    let _responseTimeHours_decorators;
    let _responseTimeHours_initializers = [];
    let _responseTimeHours_extraInitializers = [];
    let _resolutionTimeHours_decorators;
    let _resolutionTimeHours_initializers = [];
    let _resolutionTimeHours_extraInitializers = [];
    let _escalationLevel_decorators;
    let _escalationLevel_initializers = [];
    let _escalationLevel_extraInitializers = [];
    let _lastEscalatedAt_decorators;
    let _lastEscalatedAt_initializers = [];
    let _lastEscalatedAt_extraInitializers = [];
    let _escalationHistory_decorators;
    let _escalationHistory_initializers = [];
    let _escalationHistory_extraInitializers = [];
    let _mergedTicketIds_decorators;
    let _mergedTicketIds_initializers = [];
    let _mergedTicketIds_extraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var Ticket = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _subject_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
            _categoryId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _category_decorators = [(0, typeorm_1.ManyToOne)(() => ticket_category_entity_1.TicketCategory, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'categoryId' })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ticket_status_enum_1.TicketStatus,
                    default: ticket_status_enum_1.TicketStatus.NEW,
                })];
            _priority_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ticket_priority_enum_1.TicketPriority,
                    default: ticket_priority_enum_1.TicketPriority.MEDIUM,
                })];
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _assignedToId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _assignedTo_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'assignedToId' })];
            _companyName_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _tags_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
            _customFields_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _firstResponseAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _resolvedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _closedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _slaFirstResponseDueAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _slaResolutionDueAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _isSLABreached_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _responseTimeHours_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _resolutionTimeHours_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _escalationLevel_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _lastEscalatedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _escalationHistory_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _mergedTicketIds_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
            _messages_decorators = [(0, typeorm_1.OneToMany)(() => ticket_message_entity_1.TicketMessage, (message) => message.ticket)];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _assignedToId_decorators, { kind: "field", name: "assignedToId", static: false, private: false, access: { has: obj => "assignedToId" in obj, get: obj => obj.assignedToId, set: (obj, value) => { obj.assignedToId = value; } }, metadata: _metadata }, _assignedToId_initializers, _assignedToId_extraInitializers);
            __esDecorate(null, null, _assignedTo_decorators, { kind: "field", name: "assignedTo", static: false, private: false, access: { has: obj => "assignedTo" in obj, get: obj => obj.assignedTo, set: (obj, value) => { obj.assignedTo = value; } }, metadata: _metadata }, _assignedTo_initializers, _assignedTo_extraInitializers);
            __esDecorate(null, null, _companyName_decorators, { kind: "field", name: "companyName", static: false, private: false, access: { has: obj => "companyName" in obj, get: obj => obj.companyName, set: (obj, value) => { obj.companyName = value; } }, metadata: _metadata }, _companyName_initializers, _companyName_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: obj => "customFields" in obj, get: obj => obj.customFields, set: (obj, value) => { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            __esDecorate(null, null, _firstResponseAt_decorators, { kind: "field", name: "firstResponseAt", static: false, private: false, access: { has: obj => "firstResponseAt" in obj, get: obj => obj.firstResponseAt, set: (obj, value) => { obj.firstResponseAt = value; } }, metadata: _metadata }, _firstResponseAt_initializers, _firstResponseAt_extraInitializers);
            __esDecorate(null, null, _resolvedAt_decorators, { kind: "field", name: "resolvedAt", static: false, private: false, access: { has: obj => "resolvedAt" in obj, get: obj => obj.resolvedAt, set: (obj, value) => { obj.resolvedAt = value; } }, metadata: _metadata }, _resolvedAt_initializers, _resolvedAt_extraInitializers);
            __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: obj => "closedAt" in obj, get: obj => obj.closedAt, set: (obj, value) => { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
            __esDecorate(null, null, _slaFirstResponseDueAt_decorators, { kind: "field", name: "slaFirstResponseDueAt", static: false, private: false, access: { has: obj => "slaFirstResponseDueAt" in obj, get: obj => obj.slaFirstResponseDueAt, set: (obj, value) => { obj.slaFirstResponseDueAt = value; } }, metadata: _metadata }, _slaFirstResponseDueAt_initializers, _slaFirstResponseDueAt_extraInitializers);
            __esDecorate(null, null, _slaResolutionDueAt_decorators, { kind: "field", name: "slaResolutionDueAt", static: false, private: false, access: { has: obj => "slaResolutionDueAt" in obj, get: obj => obj.slaResolutionDueAt, set: (obj, value) => { obj.slaResolutionDueAt = value; } }, metadata: _metadata }, _slaResolutionDueAt_initializers, _slaResolutionDueAt_extraInitializers);
            __esDecorate(null, null, _isSLABreached_decorators, { kind: "field", name: "isSLABreached", static: false, private: false, access: { has: obj => "isSLABreached" in obj, get: obj => obj.isSLABreached, set: (obj, value) => { obj.isSLABreached = value; } }, metadata: _metadata }, _isSLABreached_initializers, _isSLABreached_extraInitializers);
            __esDecorate(null, null, _responseTimeHours_decorators, { kind: "field", name: "responseTimeHours", static: false, private: false, access: { has: obj => "responseTimeHours" in obj, get: obj => obj.responseTimeHours, set: (obj, value) => { obj.responseTimeHours = value; } }, metadata: _metadata }, _responseTimeHours_initializers, _responseTimeHours_extraInitializers);
            __esDecorate(null, null, _resolutionTimeHours_decorators, { kind: "field", name: "resolutionTimeHours", static: false, private: false, access: { has: obj => "resolutionTimeHours" in obj, get: obj => obj.resolutionTimeHours, set: (obj, value) => { obj.resolutionTimeHours = value; } }, metadata: _metadata }, _resolutionTimeHours_initializers, _resolutionTimeHours_extraInitializers);
            __esDecorate(null, null, _escalationLevel_decorators, { kind: "field", name: "escalationLevel", static: false, private: false, access: { has: obj => "escalationLevel" in obj, get: obj => obj.escalationLevel, set: (obj, value) => { obj.escalationLevel = value; } }, metadata: _metadata }, _escalationLevel_initializers, _escalationLevel_extraInitializers);
            __esDecorate(null, null, _lastEscalatedAt_decorators, { kind: "field", name: "lastEscalatedAt", static: false, private: false, access: { has: obj => "lastEscalatedAt" in obj, get: obj => obj.lastEscalatedAt, set: (obj, value) => { obj.lastEscalatedAt = value; } }, metadata: _metadata }, _lastEscalatedAt_initializers, _lastEscalatedAt_extraInitializers);
            __esDecorate(null, null, _escalationHistory_decorators, { kind: "field", name: "escalationHistory", static: false, private: false, access: { has: obj => "escalationHistory" in obj, get: obj => obj.escalationHistory, set: (obj, value) => { obj.escalationHistory = value; } }, metadata: _metadata }, _escalationHistory_initializers, _escalationHistory_extraInitializers);
            __esDecorate(null, null, _mergedTicketIds_decorators, { kind: "field", name: "mergedTicketIds", static: false, private: false, access: { has: obj => "mergedTicketIds" in obj, get: obj => obj.mergedTicketIds, set: (obj, value) => { obj.mergedTicketIds = value; } }, metadata: _metadata }, _mergedTicketIds_initializers, _mergedTicketIds_extraInitializers);
            __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Ticket = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        subject = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        description = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        categoryId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        category = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        status = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        priority = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        userId = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        assignedToId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _assignedToId_initializers, void 0));
        assignedTo = (__runInitializers(this, _assignedToId_extraInitializers), __runInitializers(this, _assignedTo_initializers, void 0));
        companyName = (__runInitializers(this, _assignedTo_extraInitializers), __runInitializers(this, _companyName_initializers, void 0));
        metadata = (__runInitializers(this, _companyName_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Tags and Custom Fields
        tags = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        customFields = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
        firstResponseAt = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _firstResponseAt_initializers, void 0));
        resolvedAt = (__runInitializers(this, _firstResponseAt_extraInitializers), __runInitializers(this, _resolvedAt_initializers, void 0));
        closedAt = (__runInitializers(this, _resolvedAt_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
        // SLA Tracking Fields
        slaFirstResponseDueAt = (__runInitializers(this, _closedAt_extraInitializers), __runInitializers(this, _slaFirstResponseDueAt_initializers, void 0));
        slaResolutionDueAt = (__runInitializers(this, _slaFirstResponseDueAt_extraInitializers), __runInitializers(this, _slaResolutionDueAt_initializers, void 0));
        isSLABreached = (__runInitializers(this, _slaResolutionDueAt_extraInitializers), __runInitializers(this, _isSLABreached_initializers, void 0));
        responseTimeHours = (__runInitializers(this, _isSLABreached_extraInitializers), __runInitializers(this, _responseTimeHours_initializers, void 0));
        resolutionTimeHours = (__runInitializers(this, _responseTimeHours_extraInitializers), __runInitializers(this, _resolutionTimeHours_initializers, void 0));
        // Escalation Tracking Fields
        escalationLevel = (__runInitializers(this, _resolutionTimeHours_extraInitializers), __runInitializers(this, _escalationLevel_initializers, void 0));
        lastEscalatedAt = (__runInitializers(this, _escalationLevel_extraInitializers), __runInitializers(this, _lastEscalatedAt_initializers, void 0));
        escalationHistory = (__runInitializers(this, _lastEscalatedAt_extraInitializers), __runInitializers(this, _escalationHistory_initializers, void 0));
        // Merged Tickets Tracking
        mergedTicketIds = (__runInitializers(this, _escalationHistory_extraInitializers), __runInitializers(this, _mergedTicketIds_initializers, void 0));
        messages = (__runInitializers(this, _mergedTicketIds_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
        createdAt = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return Ticket = _classThis;
})();
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entity.js.map