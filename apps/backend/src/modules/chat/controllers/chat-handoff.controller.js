"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandoffController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../../modules/users/enums/user-role.enum");
const chat_handoff_dto_1 = require("../dto/chat-handoff.dto");
let ChatHandoffController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Chat Handoff'), (0, common_1.Controller)('chat/handoff'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getHandoffContext_decorators;
    let _executeHandoff_decorators;
    let _executeEscalation_decorators;
    let _addHandoffNote_decorators;
    let _getHandoffNotes_decorators;
    let _getHandoffHistory_decorators;
    var ChatHandoffController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getHandoffContext_decorators = [(0, common_1.Get)('context/:sessionId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get handoff context for a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Handoff context retrieved', type: chat_handoff_dto_1.HandoffContextResponseDto }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session not found' })];
            _executeHandoff_decorators = [(0, common_1.Post)('execute'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Execute chat handoff between support agents' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Handoff executed successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session or user not found' })];
            _executeEscalation_decorators = [(0, common_1.Post)('escalate'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Escalate chat to manager' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Escalation executed successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - no available managers' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session not found' })];
            _addHandoffNote_decorators = [(0, common_1.Post)('note'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Add handoff note to session' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Handoff note added successfully', type: chat_handoff_dto_1.HandoffNoteResponseDto }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session not found' })];
            _getHandoffNotes_decorators = [(0, common_1.Get)('notes/:sessionId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get handoff notes for a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiQuery)({ name: 'includePrivate', description: 'Include private notes', required: false, type: Boolean }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Handoff notes retrieved', type: [chat_handoff_dto_1.HandoffNoteResponseDto] })];
            _getHandoffHistory_decorators = [(0, common_1.Get)('history/:sessionId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get complete handoff history for a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Handoff history retrieved', type: chat_handoff_dto_1.HandoffHistoryResponseDto })];
            __esDecorate(this, null, _getHandoffContext_decorators, { kind: "method", name: "getHandoffContext", static: false, private: false, access: { has: obj => "getHandoffContext" in obj, get: obj => obj.getHandoffContext }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _executeHandoff_decorators, { kind: "method", name: "executeHandoff", static: false, private: false, access: { has: obj => "executeHandoff" in obj, get: obj => obj.executeHandoff }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _executeEscalation_decorators, { kind: "method", name: "executeEscalation", static: false, private: false, access: { has: obj => "executeEscalation" in obj, get: obj => obj.executeEscalation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addHandoffNote_decorators, { kind: "method", name: "addHandoffNote", static: false, private: false, access: { has: obj => "addHandoffNote" in obj, get: obj => obj.addHandoffNote }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getHandoffNotes_decorators, { kind: "method", name: "getHandoffNotes", static: false, private: false, access: { has: obj => "getHandoffNotes" in obj, get: obj => obj.getHandoffNotes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getHandoffHistory_decorators, { kind: "method", name: "getHandoffHistory", static: false, private: false, access: { has: obj => "getHandoffHistory" in obj, get: obj => obj.getHandoffHistory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatHandoffController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        chatHandoffService = __runInitializers(this, _instanceExtraInitializers);
        constructor(chatHandoffService) {
            this.chatHandoffService = chatHandoffService;
        }
        async getHandoffContext(sessionId) {
            try {
                const context = await this.chatHandoffService.prepareHandoffContext(sessionId);
                return {
                    ...context,
                    urgencyLevel: context.urgencyLevel // Type assertion for enum compatibility
                };
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to get handoff context: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async executeHandoff(handoffDto, req) {
            try {
                // Set transferredBy to current user if not provided
                if (!handoffDto.transferredBy) {
                    handoffDto.transferredBy = req.user.userId;
                }
                await this.chatHandoffService.executeHandoff(handoffDto.sessionId, handoffDto.fromSupportUserId, handoffDto.toSupportUserId, handoffDto.handoffReason, handoffDto.privateNotes, handoffDto.transferredBy);
                return {
                    success: true,
                    message: 'Handoff executed successfully',
                };
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to execute handoff: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async executeEscalation(escalationDto, req) {
            try {
                // Set escalatedBy to current user if not provided
                if (!escalationDto.escalatedBy) {
                    escalationDto.escalatedBy = req.user.userId;
                }
                await this.chatHandoffService.executeEscalation(escalationDto.sessionId, escalationDto.escalatedBy, escalationDto.escalationReason, escalationDto.urgencyLevel, escalationDto.privateNotes);
                return {
                    success: true,
                    message: 'Escalation executed successfully',
                };
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to execute escalation: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async addHandoffNote(noteDto, req) {
            try {
                return await this.chatHandoffService.addHandoffNote(noteDto.sessionId, req.user.userId, noteDto.content, noteDto.isPrivate || false, noteDto.tags);
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to add handoff note: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getHandoffNotes(sessionId, includePrivate) {
            try {
                return await this.chatHandoffService.getHandoffNotes(sessionId, includePrivate || false);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get handoff notes: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getHandoffHistory(sessionId) {
            try {
                return await this.chatHandoffService.getHandoffHistory(sessionId);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get handoff history: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    return ChatHandoffController = _classThis;
})();
exports.ChatHandoffController = ChatHandoffController;
//# sourceMappingURL=chat-handoff.controller.js.map