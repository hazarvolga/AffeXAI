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
exports.TicketMessage = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("./ticket.entity");
/**
 * TicketMessage Entity
 * Represents a message/comment in a ticket conversation
 */
let TicketMessage = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ticket_messages')];
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
    let _authorId_decorators;
    let _authorId_initializers = [];
    let _authorId_extraInitializers = [];
    let _author_decorators;
    let _author_initializers = [];
    let _author_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _htmlContent_decorators;
    let _htmlContent_initializers = [];
    let _htmlContent_extraInitializers = [];
    let _isInternal_decorators;
    let _isInternal_initializers = [];
    let _isInternal_extraInitializers = [];
    let _attachmentIds_decorators;
    let _attachmentIds_initializers = [];
    let _attachmentIds_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _emailMessageId_decorators;
    let _emailMessageId_initializers = [];
    let _emailMessageId_extraInitializers = [];
    let _contentType_decorators;
    let _contentType_initializers = [];
    let _contentType_extraInitializers = [];
    let _isEdited_decorators;
    let _isEdited_initializers = [];
    let _isEdited_extraInitializers = [];
    let _editedAt_decorators;
    let _editedAt_initializers = [];
    let _editedAt_extraInitializers = [];
    let _editedById_decorators;
    let _editedById_initializers = [];
    let _editedById_extraInitializers = [];
    let _editedBy_decorators;
    let _editedBy_initializers = [];
    let _editedBy_extraInitializers = [];
    let _originalContent_decorators;
    let _originalContent_initializers = [];
    let _originalContent_extraInitializers = [];
    let _isDeleted_decorators;
    let _isDeleted_initializers = [];
    let _isDeleted_extraInitializers = [];
    let _deletedAt_decorators;
    let _deletedAt_initializers = [];
    let _deletedAt_extraInitializers = [];
    let _deletedById_decorators;
    let _deletedById_initializers = [];
    let _deletedById_extraInitializers = [];
    let _deletedBy_decorators;
    let _deletedBy_initializers = [];
    let _deletedBy_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    var TicketMessage = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _ticketId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _ticket_decorators = [(0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, (ticket) => ticket.messages, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
            _authorId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _author_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'authorId' })];
            _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
            _htmlContent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _isInternal_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _attachmentIds_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _emailMessageId_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
            _contentType_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
            _isEdited_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _editedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _editedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _editedBy_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'editedById' })];
            _originalContent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _isDeleted_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _deletedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _deletedById_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _deletedBy_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'deletedById' })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: obj => "ticketId" in obj, get: obj => obj.ticketId, set: (obj, value) => { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: obj => "ticket" in obj, get: obj => obj.ticket, set: (obj, value) => { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: obj => "authorId" in obj, get: obj => obj.authorId, set: (obj, value) => { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: obj => "author" in obj, get: obj => obj.author, set: (obj, value) => { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _htmlContent_decorators, { kind: "field", name: "htmlContent", static: false, private: false, access: { has: obj => "htmlContent" in obj, get: obj => obj.htmlContent, set: (obj, value) => { obj.htmlContent = value; } }, metadata: _metadata }, _htmlContent_initializers, _htmlContent_extraInitializers);
            __esDecorate(null, null, _isInternal_decorators, { kind: "field", name: "isInternal", static: false, private: false, access: { has: obj => "isInternal" in obj, get: obj => obj.isInternal, set: (obj, value) => { obj.isInternal = value; } }, metadata: _metadata }, _isInternal_initializers, _isInternal_extraInitializers);
            __esDecorate(null, null, _attachmentIds_decorators, { kind: "field", name: "attachmentIds", static: false, private: false, access: { has: obj => "attachmentIds" in obj, get: obj => obj.attachmentIds, set: (obj, value) => { obj.attachmentIds = value; } }, metadata: _metadata }, _attachmentIds_initializers, _attachmentIds_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _emailMessageId_decorators, { kind: "field", name: "emailMessageId", static: false, private: false, access: { has: obj => "emailMessageId" in obj, get: obj => obj.emailMessageId, set: (obj, value) => { obj.emailMessageId = value; } }, metadata: _metadata }, _emailMessageId_initializers, _emailMessageId_extraInitializers);
            __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: obj => "contentType" in obj, get: obj => obj.contentType, set: (obj, value) => { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
            __esDecorate(null, null, _isEdited_decorators, { kind: "field", name: "isEdited", static: false, private: false, access: { has: obj => "isEdited" in obj, get: obj => obj.isEdited, set: (obj, value) => { obj.isEdited = value; } }, metadata: _metadata }, _isEdited_initializers, _isEdited_extraInitializers);
            __esDecorate(null, null, _editedAt_decorators, { kind: "field", name: "editedAt", static: false, private: false, access: { has: obj => "editedAt" in obj, get: obj => obj.editedAt, set: (obj, value) => { obj.editedAt = value; } }, metadata: _metadata }, _editedAt_initializers, _editedAt_extraInitializers);
            __esDecorate(null, null, _editedById_decorators, { kind: "field", name: "editedById", static: false, private: false, access: { has: obj => "editedById" in obj, get: obj => obj.editedById, set: (obj, value) => { obj.editedById = value; } }, metadata: _metadata }, _editedById_initializers, _editedById_extraInitializers);
            __esDecorate(null, null, _editedBy_decorators, { kind: "field", name: "editedBy", static: false, private: false, access: { has: obj => "editedBy" in obj, get: obj => obj.editedBy, set: (obj, value) => { obj.editedBy = value; } }, metadata: _metadata }, _editedBy_initializers, _editedBy_extraInitializers);
            __esDecorate(null, null, _originalContent_decorators, { kind: "field", name: "originalContent", static: false, private: false, access: { has: obj => "originalContent" in obj, get: obj => obj.originalContent, set: (obj, value) => { obj.originalContent = value; } }, metadata: _metadata }, _originalContent_initializers, _originalContent_extraInitializers);
            __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: obj => "isDeleted" in obj, get: obj => obj.isDeleted, set: (obj, value) => { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _isDeleted_extraInitializers);
            __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: obj => "deletedAt" in obj, get: obj => obj.deletedAt, set: (obj, value) => { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
            __esDecorate(null, null, _deletedById_decorators, { kind: "field", name: "deletedById", static: false, private: false, access: { has: obj => "deletedById" in obj, get: obj => obj.deletedById, set: (obj, value) => { obj.deletedById = value; } }, metadata: _metadata }, _deletedById_initializers, _deletedById_extraInitializers);
            __esDecorate(null, null, _deletedBy_decorators, { kind: "field", name: "deletedBy", static: false, private: false, access: { has: obj => "deletedBy" in obj, get: obj => obj.deletedBy, set: (obj, value) => { obj.deletedBy = value; } }, metadata: _metadata }, _deletedBy_initializers, _deletedBy_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketMessage = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        ticketId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
        ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
        authorId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
        author = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _author_initializers, void 0));
        content = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        htmlContent = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _htmlContent_initializers, void 0));
        isInternal = (__runInitializers(this, _htmlContent_extraInitializers), __runInitializers(this, _isInternal_initializers, void 0));
        attachmentIds = (__runInitializers(this, _isInternal_extraInitializers), __runInitializers(this, _attachmentIds_initializers, void 0));
        metadata = (__runInitializers(this, _attachmentIds_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        emailMessageId = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _emailMessageId_initializers, void 0)); // For email threading
        contentType = (__runInitializers(this, _emailMessageId_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
        // Message editing tracking
        isEdited = (__runInitializers(this, _contentType_extraInitializers), __runInitializers(this, _isEdited_initializers, void 0));
        editedAt = (__runInitializers(this, _isEdited_extraInitializers), __runInitializers(this, _editedAt_initializers, void 0));
        editedById = (__runInitializers(this, _editedAt_extraInitializers), __runInitializers(this, _editedById_initializers, void 0));
        editedBy = (__runInitializers(this, _editedById_extraInitializers), __runInitializers(this, _editedBy_initializers, void 0));
        originalContent = (__runInitializers(this, _editedBy_extraInitializers), __runInitializers(this, _originalContent_initializers, void 0));
        isDeleted = (__runInitializers(this, _originalContent_extraInitializers), __runInitializers(this, _isDeleted_initializers, void 0));
        deletedAt = (__runInitializers(this, _isDeleted_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
        deletedById = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _deletedById_initializers, void 0));
        deletedBy = (__runInitializers(this, _deletedById_extraInitializers), __runInitializers(this, _deletedBy_initializers, void 0));
        createdAt = (__runInitializers(this, _deletedBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
    return TicketMessage = _classThis;
})();
exports.TicketMessage = TicketMessage;
//# sourceMappingURL=ticket-message.entity.js.map