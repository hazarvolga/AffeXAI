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
exports.SupportAssignmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../../modules/users/enums/user-role.enum");
const support_assignment_dto_1 = require("../dto/support-assignment.dto");
const chat_support_assignment_entity_1 = require("../entities/chat-support-assignment.entity");
let SupportAssignmentController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Chat Support Assignment'), (0, common_1.Controller)('chat/support-assignment'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createAssignment_decorators;
    let _transferAssignment_decorators;
    let _escalateAssignment_decorators;
    let _completeAssignment_decorators;
    let _autoAssignSupport_decorators;
    let _getActiveAssignment_decorators;
    let _getSessionAssignments_decorators;
    let _getSupportUserAssignments_decorators;
    let _getMyAssignments_decorators;
    let _getSupportTeamAvailability_decorators;
    let _getAssignmentStats_decorators;
    let _getAssignments_decorators;
    var SupportAssignmentController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createAssignment_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Create a new support assignment' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Assignment created successfully', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session or user not found' })];
            _transferAssignment_decorators = [(0, common_1.Put)('transfer'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Transfer assignment between support users' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignment transferred successfully', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation failed' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignment not found' })];
            _escalateAssignment_decorators = [(0, common_1.Post)('escalate'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Escalate assignment to manager' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Assignment escalated successfully', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - no available managers' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Session not found' })];
            _completeAssignment_decorators = [(0, common_1.Put)('complete'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Complete an assignment' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignment completed successfully', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignment not found' })];
            _autoAssignSupport_decorators = [(0, common_1.Post)('auto-assign/:sessionId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Auto-assign support to a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Support auto-assigned successfully', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 400, description: 'No available support users' })];
            _getActiveAssignment_decorators = [(0, common_1.Get)('session/:sessionId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get active assignment for a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Active assignment retrieved', type: chat_support_assignment_entity_1.ChatSupportAssignment }), (0, swagger_1.ApiResponse)({ status: 404, description: 'No active assignment found' })];
            _getSessionAssignments_decorators = [(0, common_1.Get)('session/:sessionId/all'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get all assignments for a session' }), (0, swagger_1.ApiParam)({ name: 'sessionId', description: 'Chat session ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Session assignments retrieved', type: [chat_support_assignment_entity_1.ChatSupportAssignment] })];
            _getSupportUserAssignments_decorators = [(0, common_1.Get)('user/:userId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get active assignments for a support user' }), (0, swagger_1.ApiParam)({ name: 'userId', description: 'Support user ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User assignments retrieved', type: [chat_support_assignment_entity_1.ChatSupportAssignment] })];
            _getMyAssignments_decorators = [(0, common_1.Get)('my-assignments'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get current user active assignments' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Current user assignments retrieved', type: [chat_support_assignment_entity_1.ChatSupportAssignment] })];
            _getSupportTeamAvailability_decorators = [(0, common_1.Get)('availability'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get support team availability' }), (0, swagger_1.ApiQuery)({ name: 'userIds', description: 'Comma-separated user IDs to check', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Support team availability retrieved', type: [support_assignment_dto_1.SupportTeamAvailabilityResponseDto] })];
            _getAssignmentStats_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get assignment statistics' }), (0, swagger_1.ApiQuery)({ name: 'supportUserId', description: 'Support user ID to filter by', required: false }), (0, swagger_1.ApiQuery)({ name: 'dateFrom', description: 'Start date (ISO string)', required: false }), (0, swagger_1.ApiQuery)({ name: 'dateTo', description: 'End date (ISO string)', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignment statistics retrieved', type: support_assignment_dto_1.AssignmentStatsResponseDto })];
            _getAssignments_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get assignments with filters' }), (0, swagger_1.ApiQuery)({ name: 'supportUserId', description: 'Support user ID to filter by', required: false }), (0, swagger_1.ApiQuery)({ name: 'sessionId', description: 'Session ID to filter by', required: false }), (0, swagger_1.ApiQuery)({ name: 'status', description: 'Assignment status to filter by', required: false }), (0, swagger_1.ApiQuery)({ name: 'dateFrom', description: 'Start date (ISO string)', required: false }), (0, swagger_1.ApiQuery)({ name: 'dateTo', description: 'End date (ISO string)', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignments retrieved', type: [chat_support_assignment_entity_1.ChatSupportAssignment] })];
            __esDecorate(this, null, _createAssignment_decorators, { kind: "method", name: "createAssignment", static: false, private: false, access: { has: obj => "createAssignment" in obj, get: obj => obj.createAssignment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _transferAssignment_decorators, { kind: "method", name: "transferAssignment", static: false, private: false, access: { has: obj => "transferAssignment" in obj, get: obj => obj.transferAssignment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _escalateAssignment_decorators, { kind: "method", name: "escalateAssignment", static: false, private: false, access: { has: obj => "escalateAssignment" in obj, get: obj => obj.escalateAssignment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _completeAssignment_decorators, { kind: "method", name: "completeAssignment", static: false, private: false, access: { has: obj => "completeAssignment" in obj, get: obj => obj.completeAssignment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _autoAssignSupport_decorators, { kind: "method", name: "autoAssignSupport", static: false, private: false, access: { has: obj => "autoAssignSupport" in obj, get: obj => obj.autoAssignSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getActiveAssignment_decorators, { kind: "method", name: "getActiveAssignment", static: false, private: false, access: { has: obj => "getActiveAssignment" in obj, get: obj => obj.getActiveAssignment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSessionAssignments_decorators, { kind: "method", name: "getSessionAssignments", static: false, private: false, access: { has: obj => "getSessionAssignments" in obj, get: obj => obj.getSessionAssignments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSupportUserAssignments_decorators, { kind: "method", name: "getSupportUserAssignments", static: false, private: false, access: { has: obj => "getSupportUserAssignments" in obj, get: obj => obj.getSupportUserAssignments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMyAssignments_decorators, { kind: "method", name: "getMyAssignments", static: false, private: false, access: { has: obj => "getMyAssignments" in obj, get: obj => obj.getMyAssignments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSupportTeamAvailability_decorators, { kind: "method", name: "getSupportTeamAvailability", static: false, private: false, access: { has: obj => "getSupportTeamAvailability" in obj, get: obj => obj.getSupportTeamAvailability }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAssignmentStats_decorators, { kind: "method", name: "getAssignmentStats", static: false, private: false, access: { has: obj => "getAssignmentStats" in obj, get: obj => obj.getAssignmentStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAssignments_decorators, { kind: "method", name: "getAssignments", static: false, private: false, access: { has: obj => "getAssignments" in obj, get: obj => obj.getAssignments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SupportAssignmentController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        supportAssignmentService = __runInitializers(this, _instanceExtraInitializers);
        constructor(supportAssignmentService) {
            this.supportAssignmentService = supportAssignmentService;
        }
        async createAssignment(createDto, req) {
            try {
                // Set assignedBy to current user if not provided
                if (!createDto.assignedBy) {
                    createDto.assignedBy = req.user.userId;
                }
                return await this.supportAssignmentService.createAssignment(createDto);
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to create assignment: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async transferAssignment(transferDto, req) {
            try {
                // Set transferredBy to current user if not provided
                if (!transferDto.transferredBy) {
                    transferDto.transferredBy = req.user.userId;
                }
                return await this.supportAssignmentService.transferAssignment(transferDto);
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to transfer assignment: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async escalateAssignment(escalateDto, req) {
            try {
                // Set escalatedBy to current user if not provided
                if (!escalateDto.escalatedBy) {
                    escalateDto.escalatedBy = req.user.userId;
                }
                return await this.supportAssignmentService.escalateAssignment(escalateDto.sessionId, escalateDto.escalatedBy, escalateDto.notes);
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to escalate assignment: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async completeAssignment(completeDto, req) {
            try {
                // Set supportUserId to current user if not provided
                if (!completeDto.supportUserId) {
                    completeDto.supportUserId = req.user.userId;
                }
                return await this.supportAssignmentService.completeAssignment(completeDto.sessionId, completeDto.supportUserId, completeDto.notes);
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to complete assignment: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async autoAssignSupport(sessionId) {
            try {
                return await this.supportAssignmentService.autoAssignSupport(sessionId);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to auto-assign support: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getActiveAssignment(sessionId) {
            return await this.supportAssignmentService.getActiveAssignment(sessionId);
        }
        async getSessionAssignments(sessionId) {
            return await this.supportAssignmentService.getSessionAssignments(sessionId);
        }
        async getSupportUserAssignments(userId) {
            return await this.supportAssignmentService.getSupportUserAssignments(userId);
        }
        async getMyAssignments(req) {
            return await this.supportAssignmentService.getSupportUserAssignments(req.user.userId);
        }
        async getSupportTeamAvailability(userIds) {
            const userIdArray = userIds ? userIds.split(',').filter(id => id.trim()) : undefined;
            return await this.supportAssignmentService.getSupportTeamAvailability(userIdArray);
        }
        async getAssignmentStats(query) {
            const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
            const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;
            return await this.supportAssignmentService.getAssignmentStats(query.supportUserId, dateFrom, dateTo);
        }
        async getAssignments(query) {
            // This would need a more complex query implementation
            // For now, return empty array as placeholder
            return [];
        }
    };
    return SupportAssignmentController = _classThis;
})();
exports.SupportAssignmentController = SupportAssignmentController;
//# sourceMappingURL=support-assignment.controller.js.map