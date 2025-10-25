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
exports.HandoffNotificationDto = exports.HandoffHistoryResponseDto = exports.HandoffNoteResponseDto = exports.HandoffContextResponseDto = exports.AddHandoffNoteDto = exports.ExecuteEscalationDto = exports.ExecuteHandoffDto = exports.UrgencyLevel = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var UrgencyLevel;
(function (UrgencyLevel) {
    UrgencyLevel["LOW"] = "low";
    UrgencyLevel["MEDIUM"] = "medium";
    UrgencyLevel["HIGH"] = "high";
    UrgencyLevel["CRITICAL"] = "critical";
})(UrgencyLevel || (exports.UrgencyLevel = UrgencyLevel = {}));
let ExecuteHandoffDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _fromSupportUserId_decorators;
    let _fromSupportUserId_initializers = [];
    let _fromSupportUserId_extraInitializers = [];
    let _toSupportUserId_decorators;
    let _toSupportUserId_initializers = [];
    let _toSupportUserId_extraInitializers = [];
    let _handoffReason_decorators;
    let _handoffReason_initializers = [];
    let _handoffReason_extraInitializers = [];
    let _privateNotes_decorators;
    let _privateNotes_initializers = [];
    let _privateNotes_extraInitializers = [];
    let _transferredBy_decorators;
    let _transferredBy_initializers = [];
    let _transferredBy_extraInitializers = [];
    return class ExecuteHandoffDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _fromSupportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Current support user ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _toSupportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'New support user ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _handoffReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Reason for handoff', maxLength: 500 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(500)];
            _privateNotes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Private notes for support team', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            _transferredBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'User ID who initiated the transfer' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _fromSupportUserId_decorators, { kind: "field", name: "fromSupportUserId", static: false, private: false, access: { has: obj => "fromSupportUserId" in obj, get: obj => obj.fromSupportUserId, set: (obj, value) => { obj.fromSupportUserId = value; } }, metadata: _metadata }, _fromSupportUserId_initializers, _fromSupportUserId_extraInitializers);
            __esDecorate(null, null, _toSupportUserId_decorators, { kind: "field", name: "toSupportUserId", static: false, private: false, access: { has: obj => "toSupportUserId" in obj, get: obj => obj.toSupportUserId, set: (obj, value) => { obj.toSupportUserId = value; } }, metadata: _metadata }, _toSupportUserId_initializers, _toSupportUserId_extraInitializers);
            __esDecorate(null, null, _handoffReason_decorators, { kind: "field", name: "handoffReason", static: false, private: false, access: { has: obj => "handoffReason" in obj, get: obj => obj.handoffReason, set: (obj, value) => { obj.handoffReason = value; } }, metadata: _metadata }, _handoffReason_initializers, _handoffReason_extraInitializers);
            __esDecorate(null, null, _privateNotes_decorators, { kind: "field", name: "privateNotes", static: false, private: false, access: { has: obj => "privateNotes" in obj, get: obj => obj.privateNotes, set: (obj, value) => { obj.privateNotes = value; } }, metadata: _metadata }, _privateNotes_initializers, _privateNotes_extraInitializers);
            __esDecorate(null, null, _transferredBy_decorators, { kind: "field", name: "transferredBy", static: false, private: false, access: { has: obj => "transferredBy" in obj, get: obj => obj.transferredBy, set: (obj, value) => { obj.transferredBy = value; } }, metadata: _metadata }, _transferredBy_initializers, _transferredBy_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        fromSupportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _fromSupportUserId_initializers, void 0));
        toSupportUserId = (__runInitializers(this, _fromSupportUserId_extraInitializers), __runInitializers(this, _toSupportUserId_initializers, void 0));
        handoffReason = (__runInitializers(this, _toSupportUserId_extraInitializers), __runInitializers(this, _handoffReason_initializers, void 0));
        privateNotes = (__runInitializers(this, _handoffReason_extraInitializers), __runInitializers(this, _privateNotes_initializers, void 0));
        transferredBy = (__runInitializers(this, _privateNotes_extraInitializers), __runInitializers(this, _transferredBy_initializers, void 0));
        constructor() {
            __runInitializers(this, _transferredBy_extraInitializers);
        }
    };
})();
exports.ExecuteHandoffDto = ExecuteHandoffDto;
let ExecuteEscalationDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _escalatedBy_decorators;
    let _escalatedBy_initializers = [];
    let _escalatedBy_extraInitializers = [];
    let _escalationReason_decorators;
    let _escalationReason_initializers = [];
    let _escalationReason_extraInitializers = [];
    let _urgencyLevel_decorators;
    let _urgencyLevel_initializers = [];
    let _urgencyLevel_extraInitializers = [];
    let _privateNotes_decorators;
    let _privateNotes_initializers = [];
    let _privateNotes_extraInitializers = [];
    return class ExecuteEscalationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _escalatedBy_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID who initiated escalation' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _escalationReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Reason for escalation', maxLength: 500 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(500)];
            _urgencyLevel_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Urgency level',
                    enum: UrgencyLevel,
                    default: UrgencyLevel.HIGH
                }), (0, class_validator_1.IsEnum)(UrgencyLevel), (0, class_validator_1.IsOptional)()];
            _privateNotes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Private escalation notes', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _escalatedBy_decorators, { kind: "field", name: "escalatedBy", static: false, private: false, access: { has: obj => "escalatedBy" in obj, get: obj => obj.escalatedBy, set: (obj, value) => { obj.escalatedBy = value; } }, metadata: _metadata }, _escalatedBy_initializers, _escalatedBy_extraInitializers);
            __esDecorate(null, null, _escalationReason_decorators, { kind: "field", name: "escalationReason", static: false, private: false, access: { has: obj => "escalationReason" in obj, get: obj => obj.escalationReason, set: (obj, value) => { obj.escalationReason = value; } }, metadata: _metadata }, _escalationReason_initializers, _escalationReason_extraInitializers);
            __esDecorate(null, null, _urgencyLevel_decorators, { kind: "field", name: "urgencyLevel", static: false, private: false, access: { has: obj => "urgencyLevel" in obj, get: obj => obj.urgencyLevel, set: (obj, value) => { obj.urgencyLevel = value; } }, metadata: _metadata }, _urgencyLevel_initializers, _urgencyLevel_extraInitializers);
            __esDecorate(null, null, _privateNotes_decorators, { kind: "field", name: "privateNotes", static: false, private: false, access: { has: obj => "privateNotes" in obj, get: obj => obj.privateNotes, set: (obj, value) => { obj.privateNotes = value; } }, metadata: _metadata }, _privateNotes_initializers, _privateNotes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        escalatedBy = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _escalatedBy_initializers, void 0));
        escalationReason = (__runInitializers(this, _escalatedBy_extraInitializers), __runInitializers(this, _escalationReason_initializers, void 0));
        urgencyLevel = (__runInitializers(this, _escalationReason_extraInitializers), __runInitializers(this, _urgencyLevel_initializers, void 0));
        privateNotes = (__runInitializers(this, _urgencyLevel_extraInitializers), __runInitializers(this, _privateNotes_initializers, void 0));
        constructor() {
            __runInitializers(this, _privateNotes_extraInitializers);
        }
    };
})();
exports.ExecuteEscalationDto = ExecuteEscalationDto;
let AddHandoffNoteDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _isPrivate_decorators;
    let _isPrivate_initializers = [];
    let _isPrivate_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    return class AddHandoffNoteDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Note content', maxLength: 2000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(2000)];
            _isPrivate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether note is private to support team', default: false }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Tags for categorizing the note' }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: obj => "isPrivate" in obj, get: obj => obj.isPrivate, set: (obj, value) => { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        content = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        isPrivate = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
        tags = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        constructor() {
            __runInitializers(this, _tags_extraInitializers);
        }
    };
})();
exports.AddHandoffNoteDto = AddHandoffNoteDto;
let HandoffContextResponseDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _previousMessages_decorators;
    let _previousMessages_initializers = [];
    let _previousMessages_extraInitializers = [];
    let _contextSummary_decorators;
    let _contextSummary_initializers = [];
    let _contextSummary_extraInitializers = [];
    let _customerInfo_decorators;
    let _customerInfo_initializers = [];
    let _customerInfo_extraInitializers = [];
    let _previousAssignments_decorators;
    let _previousAssignments_initializers = [];
    let _previousAssignments_extraInitializers = [];
    let _sessionMetadata_decorators;
    let _sessionMetadata_initializers = [];
    let _sessionMetadata_extraInitializers = [];
    let _handoffReason_decorators;
    let _handoffReason_initializers = [];
    let _handoffReason_extraInitializers = [];
    let _urgencyLevel_decorators;
    let _urgencyLevel_initializers = [];
    let _urgencyLevel_extraInitializers = [];
    return class HandoffContextResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' })];
            _previousMessages_decorators = [(0, swagger_1.ApiProperty)({ description: 'Previous messages for context' })];
            _contextSummary_decorators = [(0, swagger_1.ApiProperty)({ description: 'Generated context summary' })];
            _customerInfo_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer information' })];
            _previousAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Previous support assignments' })];
            _sessionMetadata_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session metadata' })];
            _handoffReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Reason for handoff' })];
            _urgencyLevel_decorators = [(0, swagger_1.ApiProperty)({ description: 'Urgency level', enum: UrgencyLevel })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _previousMessages_decorators, { kind: "field", name: "previousMessages", static: false, private: false, access: { has: obj => "previousMessages" in obj, get: obj => obj.previousMessages, set: (obj, value) => { obj.previousMessages = value; } }, metadata: _metadata }, _previousMessages_initializers, _previousMessages_extraInitializers);
            __esDecorate(null, null, _contextSummary_decorators, { kind: "field", name: "contextSummary", static: false, private: false, access: { has: obj => "contextSummary" in obj, get: obj => obj.contextSummary, set: (obj, value) => { obj.contextSummary = value; } }, metadata: _metadata }, _contextSummary_initializers, _contextSummary_extraInitializers);
            __esDecorate(null, null, _customerInfo_decorators, { kind: "field", name: "customerInfo", static: false, private: false, access: { has: obj => "customerInfo" in obj, get: obj => obj.customerInfo, set: (obj, value) => { obj.customerInfo = value; } }, metadata: _metadata }, _customerInfo_initializers, _customerInfo_extraInitializers);
            __esDecorate(null, null, _previousAssignments_decorators, { kind: "field", name: "previousAssignments", static: false, private: false, access: { has: obj => "previousAssignments" in obj, get: obj => obj.previousAssignments, set: (obj, value) => { obj.previousAssignments = value; } }, metadata: _metadata }, _previousAssignments_initializers, _previousAssignments_extraInitializers);
            __esDecorate(null, null, _sessionMetadata_decorators, { kind: "field", name: "sessionMetadata", static: false, private: false, access: { has: obj => "sessionMetadata" in obj, get: obj => obj.sessionMetadata, set: (obj, value) => { obj.sessionMetadata = value; } }, metadata: _metadata }, _sessionMetadata_initializers, _sessionMetadata_extraInitializers);
            __esDecorate(null, null, _handoffReason_decorators, { kind: "field", name: "handoffReason", static: false, private: false, access: { has: obj => "handoffReason" in obj, get: obj => obj.handoffReason, set: (obj, value) => { obj.handoffReason = value; } }, metadata: _metadata }, _handoffReason_initializers, _handoffReason_extraInitializers);
            __esDecorate(null, null, _urgencyLevel_decorators, { kind: "field", name: "urgencyLevel", static: false, private: false, access: { has: obj => "urgencyLevel" in obj, get: obj => obj.urgencyLevel, set: (obj, value) => { obj.urgencyLevel = value; } }, metadata: _metadata }, _urgencyLevel_initializers, _urgencyLevel_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        previousMessages = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _previousMessages_initializers, void 0));
        contextSummary = (__runInitializers(this, _previousMessages_extraInitializers), __runInitializers(this, _contextSummary_initializers, void 0));
        customerInfo = (__runInitializers(this, _contextSummary_extraInitializers), __runInitializers(this, _customerInfo_initializers, void 0));
        previousAssignments = (__runInitializers(this, _customerInfo_extraInitializers), __runInitializers(this, _previousAssignments_initializers, void 0));
        sessionMetadata = (__runInitializers(this, _previousAssignments_extraInitializers), __runInitializers(this, _sessionMetadata_initializers, void 0));
        handoffReason = (__runInitializers(this, _sessionMetadata_extraInitializers), __runInitializers(this, _handoffReason_initializers, void 0));
        urgencyLevel = (__runInitializers(this, _handoffReason_extraInitializers), __runInitializers(this, _urgencyLevel_initializers, void 0));
        constructor() {
            __runInitializers(this, _urgencyLevel_extraInitializers);
        }
    };
})();
exports.HandoffContextResponseDto = HandoffContextResponseDto;
let HandoffNoteResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _authorId_decorators;
    let _authorId_initializers = [];
    let _authorId_extraInitializers = [];
    let _authorName_decorators;
    let _authorName_initializers = [];
    let _authorName_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _isPrivate_decorators;
    let _isPrivate_initializers = [];
    let _isPrivate_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    return class HandoffNoteResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Note ID' })];
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' })];
            _authorId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Author user ID' })];
            _authorName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Author name' })];
            _content_decorators = [(0, swagger_1.ApiProperty)({ description: 'Note content' })];
            _isPrivate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether note is private' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Creation timestamp' })];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Note tags' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: obj => "authorId" in obj, get: obj => obj.authorId, set: (obj, value) => { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _authorName_decorators, { kind: "field", name: "authorName", static: false, private: false, access: { has: obj => "authorName" in obj, get: obj => obj.authorName, set: (obj, value) => { obj.authorName = value; } }, metadata: _metadata }, _authorName_initializers, _authorName_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _isPrivate_decorators, { kind: "field", name: "isPrivate", static: false, private: false, access: { has: obj => "isPrivate" in obj, get: obj => obj.isPrivate, set: (obj, value) => { obj.isPrivate = value; } }, metadata: _metadata }, _isPrivate_initializers, _isPrivate_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        sessionId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        authorId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
        authorName = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _authorName_initializers, void 0));
        content = (__runInitializers(this, _authorName_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        isPrivate = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _isPrivate_initializers, void 0));
        createdAt = (__runInitializers(this, _isPrivate_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        tags = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        constructor() {
            __runInitializers(this, _tags_extraInitializers);
        }
    };
})();
exports.HandoffNoteResponseDto = HandoffNoteResponseDto;
let HandoffHistoryResponseDto = (() => {
    let _transfers_decorators;
    let _transfers_initializers = [];
    let _transfers_extraInitializers = [];
    let _escalations_decorators;
    let _escalations_initializers = [];
    let _escalations_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    return class HandoffHistoryResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transfers_decorators = [(0, swagger_1.ApiProperty)({ description: 'Transfer history' })];
            _escalations_decorators = [(0, swagger_1.ApiProperty)({ description: 'Escalation history' })];
            _notes_decorators = [(0, swagger_1.ApiProperty)({ description: 'Handoff notes', type: [HandoffNoteResponseDto] })];
            __esDecorate(null, null, _transfers_decorators, { kind: "field", name: "transfers", static: false, private: false, access: { has: obj => "transfers" in obj, get: obj => obj.transfers, set: (obj, value) => { obj.transfers = value; } }, metadata: _metadata }, _transfers_initializers, _transfers_extraInitializers);
            __esDecorate(null, null, _escalations_decorators, { kind: "field", name: "escalations", static: false, private: false, access: { has: obj => "escalations" in obj, get: obj => obj.escalations, set: (obj, value) => { obj.escalations = value; } }, metadata: _metadata }, _escalations_initializers, _escalations_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        transfers = __runInitializers(this, _transfers_initializers, void 0);
        escalations = (__runInitializers(this, _transfers_extraInitializers), __runInitializers(this, _escalations_initializers, void 0));
        notes = (__runInitializers(this, _escalations_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
})();
exports.HandoffHistoryResponseDto = HandoffHistoryResponseDto;
let HandoffNotificationDto = (() => {
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _customerInfo_decorators;
    let _customerInfo_initializers = [];
    let _customerInfo_extraInitializers = [];
    let _contextSummary_decorators;
    let _contextSummary_initializers = [];
    let _contextSummary_extraInitializers = [];
    let _urgencyLevel_decorators;
    let _urgencyLevel_initializers = [];
    let _urgencyLevel_extraInitializers = [];
    let _handoffReason_decorators;
    let _handoffReason_initializers = [];
    let _handoffReason_extraInitializers = [];
    let _messageCount_decorators;
    let _messageCount_initializers = [];
    let _messageCount_extraInitializers = [];
    let _timestamp_decorators;
    let _timestamp_initializers = [];
    let _timestamp_extraInitializers = [];
    return class HandoffNotificationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification type' })];
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' })];
            _customerInfo_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer information' })];
            _contextSummary_decorators = [(0, swagger_1.ApiProperty)({ description: 'Context summary' })];
            _urgencyLevel_decorators = [(0, swagger_1.ApiProperty)({ description: 'Urgency level', enum: UrgencyLevel })];
            _handoffReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Handoff or escalation reason' })];
            _messageCount_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of previous messages' })];
            _timestamp_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification timestamp' })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _customerInfo_decorators, { kind: "field", name: "customerInfo", static: false, private: false, access: { has: obj => "customerInfo" in obj, get: obj => obj.customerInfo, set: (obj, value) => { obj.customerInfo = value; } }, metadata: _metadata }, _customerInfo_initializers, _customerInfo_extraInitializers);
            __esDecorate(null, null, _contextSummary_decorators, { kind: "field", name: "contextSummary", static: false, private: false, access: { has: obj => "contextSummary" in obj, get: obj => obj.contextSummary, set: (obj, value) => { obj.contextSummary = value; } }, metadata: _metadata }, _contextSummary_initializers, _contextSummary_extraInitializers);
            __esDecorate(null, null, _urgencyLevel_decorators, { kind: "field", name: "urgencyLevel", static: false, private: false, access: { has: obj => "urgencyLevel" in obj, get: obj => obj.urgencyLevel, set: (obj, value) => { obj.urgencyLevel = value; } }, metadata: _metadata }, _urgencyLevel_initializers, _urgencyLevel_extraInitializers);
            __esDecorate(null, null, _handoffReason_decorators, { kind: "field", name: "handoffReason", static: false, private: false, access: { has: obj => "handoffReason" in obj, get: obj => obj.handoffReason, set: (obj, value) => { obj.handoffReason = value; } }, metadata: _metadata }, _handoffReason_initializers, _handoffReason_extraInitializers);
            __esDecorate(null, null, _messageCount_decorators, { kind: "field", name: "messageCount", static: false, private: false, access: { has: obj => "messageCount" in obj, get: obj => obj.messageCount, set: (obj, value) => { obj.messageCount = value; } }, metadata: _metadata }, _messageCount_initializers, _messageCount_extraInitializers);
            __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: obj => "timestamp" in obj, get: obj => obj.timestamp, set: (obj, value) => { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        type = __runInitializers(this, _type_initializers, void 0);
        sessionId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        customerInfo = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _customerInfo_initializers, void 0));
        contextSummary = (__runInitializers(this, _customerInfo_extraInitializers), __runInitializers(this, _contextSummary_initializers, void 0));
        urgencyLevel = (__runInitializers(this, _contextSummary_extraInitializers), __runInitializers(this, _urgencyLevel_initializers, void 0));
        handoffReason = (__runInitializers(this, _urgencyLevel_extraInitializers), __runInitializers(this, _handoffReason_initializers, void 0));
        escalationReason = __runInitializers(this, _handoffReason_extraInitializers);
        messageCount = __runInitializers(this, _messageCount_initializers, void 0);
        timestamp = (__runInitializers(this, _messageCount_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
        constructor() {
            __runInitializers(this, _timestamp_extraInitializers);
        }
    };
})();
exports.HandoffNotificationDto = HandoffNotificationDto;
//# sourceMappingURL=chat-handoff.dto.js.map