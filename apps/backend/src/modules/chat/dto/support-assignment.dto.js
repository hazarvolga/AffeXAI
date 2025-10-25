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
exports.AssignmentNotificationDto = exports.AssignmentStatsResponseDto = exports.SupportTeamAvailabilityResponseDto = exports.SupportAssignmentQueryDto = exports.CompleteSupportAssignmentDto = exports.EscalateSupportAssignmentDto = exports.TransferSupportAssignmentDto = exports.CreateSupportAssignmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const chat_support_assignment_entity_1 = require("../entities/chat-support-assignment.entity");
let CreateSupportAssignmentDto = (() => {
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
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    return class CreateSupportAssignmentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _supportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support user ID to assign' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _assignedBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'User ID who made the assignment' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _assignmentType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Type of assignment',
                    enum: chat_support_assignment_entity_1.AssignmentType,
                    default: chat_support_assignment_entity_1.AssignmentType.MANUAL
                }), (0, class_validator_1.IsEnum)(chat_support_assignment_entity_1.AssignmentType), (0, class_validator_1.IsOptional)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Assignment notes', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _supportUserId_decorators, { kind: "field", name: "supportUserId", static: false, private: false, access: { has: obj => "supportUserId" in obj, get: obj => obj.supportUserId, set: (obj, value) => { obj.supportUserId = value; } }, metadata: _metadata }, _supportUserId_initializers, _supportUserId_extraInitializers);
            __esDecorate(null, null, _assignedBy_decorators, { kind: "field", name: "assignedBy", static: false, private: false, access: { has: obj => "assignedBy" in obj, get: obj => obj.assignedBy, set: (obj, value) => { obj.assignedBy = value; } }, metadata: _metadata }, _assignedBy_initializers, _assignedBy_extraInitializers);
            __esDecorate(null, null, _assignmentType_decorators, { kind: "field", name: "assignmentType", static: false, private: false, access: { has: obj => "assignmentType" in obj, get: obj => obj.assignmentType, set: (obj, value) => { obj.assignmentType = value; } }, metadata: _metadata }, _assignmentType_initializers, _assignmentType_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        supportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _supportUserId_initializers, void 0));
        assignedBy = (__runInitializers(this, _supportUserId_extraInitializers), __runInitializers(this, _assignedBy_initializers, void 0));
        assignmentType = (__runInitializers(this, _assignedBy_extraInitializers), __runInitializers(this, _assignmentType_initializers, void 0));
        notes = (__runInitializers(this, _assignmentType_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
})();
exports.CreateSupportAssignmentDto = CreateSupportAssignmentDto;
let TransferSupportAssignmentDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _fromSupportUserId_decorators;
    let _fromSupportUserId_initializers = [];
    let _fromSupportUserId_extraInitializers = [];
    let _toSupportUserId_decorators;
    let _toSupportUserId_initializers = [];
    let _toSupportUserId_extraInitializers = [];
    let _transferredBy_decorators;
    let _transferredBy_initializers = [];
    let _transferredBy_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    return class TransferSupportAssignmentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _fromSupportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Current support user ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _toSupportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'New support user ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _transferredBy_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID who initiated the transfer' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Transfer notes', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _fromSupportUserId_decorators, { kind: "field", name: "fromSupportUserId", static: false, private: false, access: { has: obj => "fromSupportUserId" in obj, get: obj => obj.fromSupportUserId, set: (obj, value) => { obj.fromSupportUserId = value; } }, metadata: _metadata }, _fromSupportUserId_initializers, _fromSupportUserId_extraInitializers);
            __esDecorate(null, null, _toSupportUserId_decorators, { kind: "field", name: "toSupportUserId", static: false, private: false, access: { has: obj => "toSupportUserId" in obj, get: obj => obj.toSupportUserId, set: (obj, value) => { obj.toSupportUserId = value; } }, metadata: _metadata }, _toSupportUserId_initializers, _toSupportUserId_extraInitializers);
            __esDecorate(null, null, _transferredBy_decorators, { kind: "field", name: "transferredBy", static: false, private: false, access: { has: obj => "transferredBy" in obj, get: obj => obj.transferredBy, set: (obj, value) => { obj.transferredBy = value; } }, metadata: _metadata }, _transferredBy_initializers, _transferredBy_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        fromSupportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _fromSupportUserId_initializers, void 0));
        toSupportUserId = (__runInitializers(this, _fromSupportUserId_extraInitializers), __runInitializers(this, _toSupportUserId_initializers, void 0));
        transferredBy = (__runInitializers(this, _toSupportUserId_extraInitializers), __runInitializers(this, _transferredBy_initializers, void 0));
        notes = (__runInitializers(this, _transferredBy_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
})();
exports.TransferSupportAssignmentDto = TransferSupportAssignmentDto;
let EscalateSupportAssignmentDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _escalatedBy_decorators;
    let _escalatedBy_initializers = [];
    let _escalatedBy_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    return class EscalateSupportAssignmentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _escalatedBy_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID who initiated the escalation' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Escalation notes', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _escalatedBy_decorators, { kind: "field", name: "escalatedBy", static: false, private: false, access: { has: obj => "escalatedBy" in obj, get: obj => obj.escalatedBy, set: (obj, value) => { obj.escalatedBy = value; } }, metadata: _metadata }, _escalatedBy_initializers, _escalatedBy_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        escalatedBy = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _escalatedBy_initializers, void 0));
        notes = (__runInitializers(this, _escalatedBy_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
})();
exports.EscalateSupportAssignmentDto = EscalateSupportAssignmentDto;
let CompleteSupportAssignmentDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _supportUserId_decorators;
    let _supportUserId_initializers = [];
    let _supportUserId_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    return class CompleteSupportAssignmentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _supportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support user ID completing the assignment' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsNotEmpty)()];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Completion notes', maxLength: 1000 }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _supportUserId_decorators, { kind: "field", name: "supportUserId", static: false, private: false, access: { has: obj => "supportUserId" in obj, get: obj => obj.supportUserId, set: (obj, value) => { obj.supportUserId = value; } }, metadata: _metadata }, _supportUserId_initializers, _supportUserId_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        supportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _supportUserId_initializers, void 0));
        notes = (__runInitializers(this, _supportUserId_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        constructor() {
            __runInitializers(this, _notes_extraInitializers);
        }
    };
})();
exports.CompleteSupportAssignmentDto = CompleteSupportAssignmentDto;
let SupportAssignmentQueryDto = (() => {
    let _supportUserId_decorators;
    let _supportUserId_initializers = [];
    let _supportUserId_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _dateFrom_decorators;
    let _dateFrom_initializers = [];
    let _dateFrom_extraInitializers = [];
    let _dateTo_decorators;
    let _dateTo_initializers = [];
    let _dateTo_extraInitializers = [];
    return class SupportAssignmentQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _supportUserId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Support user ID to filter by' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _sessionId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Chat session ID to filter by' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Assignment status to filter by' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _dateFrom_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Date from (ISO string)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _dateTo_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Date to (ISO string)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _supportUserId_decorators, { kind: "field", name: "supportUserId", static: false, private: false, access: { has: obj => "supportUserId" in obj, get: obj => obj.supportUserId, set: (obj, value) => { obj.supportUserId = value; } }, metadata: _metadata }, _supportUserId_initializers, _supportUserId_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _dateFrom_decorators, { kind: "field", name: "dateFrom", static: false, private: false, access: { has: obj => "dateFrom" in obj, get: obj => obj.dateFrom, set: (obj, value) => { obj.dateFrom = value; } }, metadata: _metadata }, _dateFrom_initializers, _dateFrom_extraInitializers);
            __esDecorate(null, null, _dateTo_decorators, { kind: "field", name: "dateTo", static: false, private: false, access: { has: obj => "dateTo" in obj, get: obj => obj.dateTo, set: (obj, value) => { obj.dateTo = value; } }, metadata: _metadata }, _dateTo_initializers, _dateTo_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        supportUserId = __runInitializers(this, _supportUserId_initializers, void 0);
        sessionId = (__runInitializers(this, _supportUserId_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        status = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        dateFrom = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _dateFrom_initializers, void 0));
        dateTo = (__runInitializers(this, _dateFrom_extraInitializers), __runInitializers(this, _dateTo_initializers, void 0));
        constructor() {
            __runInitializers(this, _dateTo_extraInitializers);
        }
    };
})();
exports.SupportAssignmentQueryDto = SupportAssignmentQueryDto;
let SupportTeamAvailabilityResponseDto = (() => {
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _userName_decorators;
    let _userName_initializers = [];
    let _userName_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _isOnline_decorators;
    let _isOnline_initializers = [];
    let _isOnline_extraInitializers = [];
    let _activeAssignments_decorators;
    let _activeAssignments_initializers = [];
    let _activeAssignments_extraInitializers = [];
    let _maxAssignments_decorators;
    let _maxAssignments_initializers = [];
    let _maxAssignments_extraInitializers = [];
    let _isAvailable_decorators;
    let _isAvailable_initializers = [];
    let _isAvailable_extraInitializers = [];
    let _lastActivity_decorators;
    let _lastActivity_initializers = [];
    let _lastActivity_extraInitializers = [];
    return class SupportTeamAvailabilityResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID' })];
            _userName_decorators = [(0, swagger_1.ApiProperty)({ description: 'User full name' })];
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: 'User email' })];
            _isOnline_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether user is currently online' })];
            _activeAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of active assignments' })];
            _maxAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Maximum assignments allowed' })];
            _isAvailable_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether user is available for new assignments' })];
            _lastActivity_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Last activity timestamp' })];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _userName_decorators, { kind: "field", name: "userName", static: false, private: false, access: { has: obj => "userName" in obj, get: obj => obj.userName, set: (obj, value) => { obj.userName = value; } }, metadata: _metadata }, _userName_initializers, _userName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _isOnline_decorators, { kind: "field", name: "isOnline", static: false, private: false, access: { has: obj => "isOnline" in obj, get: obj => obj.isOnline, set: (obj, value) => { obj.isOnline = value; } }, metadata: _metadata }, _isOnline_initializers, _isOnline_extraInitializers);
            __esDecorate(null, null, _activeAssignments_decorators, { kind: "field", name: "activeAssignments", static: false, private: false, access: { has: obj => "activeAssignments" in obj, get: obj => obj.activeAssignments, set: (obj, value) => { obj.activeAssignments = value; } }, metadata: _metadata }, _activeAssignments_initializers, _activeAssignments_extraInitializers);
            __esDecorate(null, null, _maxAssignments_decorators, { kind: "field", name: "maxAssignments", static: false, private: false, access: { has: obj => "maxAssignments" in obj, get: obj => obj.maxAssignments, set: (obj, value) => { obj.maxAssignments = value; } }, metadata: _metadata }, _maxAssignments_initializers, _maxAssignments_extraInitializers);
            __esDecorate(null, null, _isAvailable_decorators, { kind: "field", name: "isAvailable", static: false, private: false, access: { has: obj => "isAvailable" in obj, get: obj => obj.isAvailable, set: (obj, value) => { obj.isAvailable = value; } }, metadata: _metadata }, _isAvailable_initializers, _isAvailable_extraInitializers);
            __esDecorate(null, null, _lastActivity_decorators, { kind: "field", name: "lastActivity", static: false, private: false, access: { has: obj => "lastActivity" in obj, get: obj => obj.lastActivity, set: (obj, value) => { obj.lastActivity = value; } }, metadata: _metadata }, _lastActivity_initializers, _lastActivity_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        userId = __runInitializers(this, _userId_initializers, void 0);
        userName = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _userName_initializers, void 0));
        email = (__runInitializers(this, _userName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        isOnline = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _isOnline_initializers, void 0));
        activeAssignments = (__runInitializers(this, _isOnline_extraInitializers), __runInitializers(this, _activeAssignments_initializers, void 0));
        maxAssignments = (__runInitializers(this, _activeAssignments_extraInitializers), __runInitializers(this, _maxAssignments_initializers, void 0));
        isAvailable = (__runInitializers(this, _maxAssignments_extraInitializers), __runInitializers(this, _isAvailable_initializers, void 0));
        lastActivity = (__runInitializers(this, _isAvailable_extraInitializers), __runInitializers(this, _lastActivity_initializers, void 0));
        constructor() {
            __runInitializers(this, _lastActivity_extraInitializers);
        }
    };
})();
exports.SupportTeamAvailabilityResponseDto = SupportTeamAvailabilityResponseDto;
let AssignmentStatsResponseDto = (() => {
    let _totalAssignments_decorators;
    let _totalAssignments_initializers = [];
    let _totalAssignments_extraInitializers = [];
    let _activeAssignments_decorators;
    let _activeAssignments_initializers = [];
    let _activeAssignments_extraInitializers = [];
    let _completedAssignments_decorators;
    let _completedAssignments_initializers = [];
    let _completedAssignments_extraInitializers = [];
    let _transferredAssignments_decorators;
    let _transferredAssignments_initializers = [];
    let _transferredAssignments_extraInitializers = [];
    let _escalatedAssignments_decorators;
    let _escalatedAssignments_initializers = [];
    let _escalatedAssignments_extraInitializers = [];
    let _autoAssignments_decorators;
    let _autoAssignments_initializers = [];
    let _autoAssignments_extraInitializers = [];
    let _avgResolutionTimeMinutes_decorators;
    let _avgResolutionTimeMinutes_initializers = [];
    let _avgResolutionTimeMinutes_extraInitializers = [];
    return class AssignmentStatsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total number of assignments' })];
            _activeAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of active assignments' })];
            _completedAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of completed assignments' })];
            _transferredAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of transferred assignments' })];
            _escalatedAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of escalated assignments' })];
            _autoAssignments_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of auto assignments' })];
            _avgResolutionTimeMinutes_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average resolution time in minutes' })];
            __esDecorate(null, null, _totalAssignments_decorators, { kind: "field", name: "totalAssignments", static: false, private: false, access: { has: obj => "totalAssignments" in obj, get: obj => obj.totalAssignments, set: (obj, value) => { obj.totalAssignments = value; } }, metadata: _metadata }, _totalAssignments_initializers, _totalAssignments_extraInitializers);
            __esDecorate(null, null, _activeAssignments_decorators, { kind: "field", name: "activeAssignments", static: false, private: false, access: { has: obj => "activeAssignments" in obj, get: obj => obj.activeAssignments, set: (obj, value) => { obj.activeAssignments = value; } }, metadata: _metadata }, _activeAssignments_initializers, _activeAssignments_extraInitializers);
            __esDecorate(null, null, _completedAssignments_decorators, { kind: "field", name: "completedAssignments", static: false, private: false, access: { has: obj => "completedAssignments" in obj, get: obj => obj.completedAssignments, set: (obj, value) => { obj.completedAssignments = value; } }, metadata: _metadata }, _completedAssignments_initializers, _completedAssignments_extraInitializers);
            __esDecorate(null, null, _transferredAssignments_decorators, { kind: "field", name: "transferredAssignments", static: false, private: false, access: { has: obj => "transferredAssignments" in obj, get: obj => obj.transferredAssignments, set: (obj, value) => { obj.transferredAssignments = value; } }, metadata: _metadata }, _transferredAssignments_initializers, _transferredAssignments_extraInitializers);
            __esDecorate(null, null, _escalatedAssignments_decorators, { kind: "field", name: "escalatedAssignments", static: false, private: false, access: { has: obj => "escalatedAssignments" in obj, get: obj => obj.escalatedAssignments, set: (obj, value) => { obj.escalatedAssignments = value; } }, metadata: _metadata }, _escalatedAssignments_initializers, _escalatedAssignments_extraInitializers);
            __esDecorate(null, null, _autoAssignments_decorators, { kind: "field", name: "autoAssignments", static: false, private: false, access: { has: obj => "autoAssignments" in obj, get: obj => obj.autoAssignments, set: (obj, value) => { obj.autoAssignments = value; } }, metadata: _metadata }, _autoAssignments_initializers, _autoAssignments_extraInitializers);
            __esDecorate(null, null, _avgResolutionTimeMinutes_decorators, { kind: "field", name: "avgResolutionTimeMinutes", static: false, private: false, access: { has: obj => "avgResolutionTimeMinutes" in obj, get: obj => obj.avgResolutionTimeMinutes, set: (obj, value) => { obj.avgResolutionTimeMinutes = value; } }, metadata: _metadata }, _avgResolutionTimeMinutes_initializers, _avgResolutionTimeMinutes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalAssignments = __runInitializers(this, _totalAssignments_initializers, void 0);
        activeAssignments = (__runInitializers(this, _totalAssignments_extraInitializers), __runInitializers(this, _activeAssignments_initializers, void 0));
        completedAssignments = (__runInitializers(this, _activeAssignments_extraInitializers), __runInitializers(this, _completedAssignments_initializers, void 0));
        transferredAssignments = (__runInitializers(this, _completedAssignments_extraInitializers), __runInitializers(this, _transferredAssignments_initializers, void 0));
        escalatedAssignments = (__runInitializers(this, _transferredAssignments_extraInitializers), __runInitializers(this, _escalatedAssignments_initializers, void 0));
        autoAssignments = (__runInitializers(this, _escalatedAssignments_extraInitializers), __runInitializers(this, _autoAssignments_initializers, void 0));
        avgResolutionTimeMinutes = (__runInitializers(this, _autoAssignments_extraInitializers), __runInitializers(this, _avgResolutionTimeMinutes_initializers, void 0));
        constructor() {
            __runInitializers(this, _avgResolutionTimeMinutes_extraInitializers);
        }
    };
})();
exports.AssignmentStatsResponseDto = AssignmentStatsResponseDto;
let AssignmentNotificationDto = (() => {
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _supportUserId_decorators;
    let _supportUserId_initializers = [];
    let _supportUserId_extraInitializers = [];
    let _supportUserName_decorators;
    let _supportUserName_initializers = [];
    let _supportUserName_extraInitializers = [];
    let _assignedBy_decorators;
    let _assignedBy_initializers = [];
    let _assignedBy_extraInitializers = [];
    let _assignedByName_decorators;
    let _assignedByName_initializers = [];
    let _assignedByName_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _timestamp_decorators;
    let _timestamp_initializers = [];
    let _timestamp_extraInitializers = [];
    return class AssignmentNotificationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification type' })];
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' })];
            _supportUserId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support user ID' })];
            _supportUserName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support user name' })];
            _assignedBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'User ID who initiated the action' })];
            _assignedByName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Name of user who initiated the action' })];
            _notes_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional notes' })];
            _timestamp_decorators = [(0, swagger_1.ApiProperty)({ description: 'Notification timestamp' })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _supportUserId_decorators, { kind: "field", name: "supportUserId", static: false, private: false, access: { has: obj => "supportUserId" in obj, get: obj => obj.supportUserId, set: (obj, value) => { obj.supportUserId = value; } }, metadata: _metadata }, _supportUserId_initializers, _supportUserId_extraInitializers);
            __esDecorate(null, null, _supportUserName_decorators, { kind: "field", name: "supportUserName", static: false, private: false, access: { has: obj => "supportUserName" in obj, get: obj => obj.supportUserName, set: (obj, value) => { obj.supportUserName = value; } }, metadata: _metadata }, _supportUserName_initializers, _supportUserName_extraInitializers);
            __esDecorate(null, null, _assignedBy_decorators, { kind: "field", name: "assignedBy", static: false, private: false, access: { has: obj => "assignedBy" in obj, get: obj => obj.assignedBy, set: (obj, value) => { obj.assignedBy = value; } }, metadata: _metadata }, _assignedBy_initializers, _assignedBy_extraInitializers);
            __esDecorate(null, null, _assignedByName_decorators, { kind: "field", name: "assignedByName", static: false, private: false, access: { has: obj => "assignedByName" in obj, get: obj => obj.assignedByName, set: (obj, value) => { obj.assignedByName = value; } }, metadata: _metadata }, _assignedByName_initializers, _assignedByName_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: obj => "timestamp" in obj, get: obj => obj.timestamp, set: (obj, value) => { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        type = __runInitializers(this, _type_initializers, void 0);
        sessionId = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
        supportUserId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _supportUserId_initializers, void 0));
        supportUserName = (__runInitializers(this, _supportUserId_extraInitializers), __runInitializers(this, _supportUserName_initializers, void 0));
        assignedBy = (__runInitializers(this, _supportUserName_extraInitializers), __runInitializers(this, _assignedBy_initializers, void 0));
        assignedByName = (__runInitializers(this, _assignedBy_extraInitializers), __runInitializers(this, _assignedByName_initializers, void 0));
        notes = (__runInitializers(this, _assignedByName_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        timestamp = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
        constructor() {
            __runInitializers(this, _timestamp_extraInitializers);
        }
    };
})();
exports.AssignmentNotificationDto = AssignmentNotificationDto;
//# sourceMappingURL=support-assignment.dto.js.map