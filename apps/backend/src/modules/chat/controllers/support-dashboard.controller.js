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
exports.SupportDashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../../modules/users/enums/user-role.enum");
const support_dashboard_dto_1 = require("../dto/support-dashboard.dto");
let SupportDashboardController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Support Dashboard'), (0, common_1.Controller)('chat/support-dashboard'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDashboardStats_decorators;
    let _getSupportAgentStats_decorators;
    let _getMyStats_decorators;
    let _getSessionOverview_decorators;
    let _getMySessions_decorators;
    let _getEscalationAlerts_decorators;
    let _getRealTimeMetrics_decorators;
    let _getQueueSessions_decorators;
    var SupportDashboardController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getDashboardStats_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get overall dashboard statistics' }), (0, swagger_1.ApiQuery)({ name: 'dateFrom', description: 'Start date (ISO string)', required: false }), (0, swagger_1.ApiQuery)({ name: 'dateTo', description: 'End date (ISO string)', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard statistics retrieved', type: support_dashboard_dto_1.DashboardStatsResponseDto })];
            _getSupportAgentStats_decorators = [(0, common_1.Get)('agents'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get support agent statistics' }), (0, swagger_1.ApiQuery)({ name: 'agentId', description: 'Specific agent ID to filter by', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Agent statistics retrieved', type: [support_dashboard_dto_1.SupportAgentStatsResponseDto] })];
            _getMyStats_decorators = [(0, common_1.Get)('my-stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get current user agent statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Current user agent statistics retrieved', type: [support_dashboard_dto_1.SupportAgentStatsResponseDto] })];
            _getSessionOverview_decorators = [(0, common_1.Get)('sessions'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get session overview for dashboard' }), (0, swagger_1.ApiQuery)({ name: 'status', description: 'Filter by session status', required: false }), (0, swagger_1.ApiQuery)({ name: 'assignedTo', description: 'Filter by assigned support user', required: false }), (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Maximum number of sessions', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Session overview retrieved', type: [support_dashboard_dto_1.SessionOverviewResponseDto] })];
            _getMySessions_decorators = [(0, common_1.Get)('my-sessions'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get sessions assigned to current user' }), (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Maximum number of sessions', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'My sessions retrieved', type: [support_dashboard_dto_1.SessionOverviewResponseDto] })];
            _getEscalationAlerts_decorators = [(0, common_1.Get)('escalations'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get escalation alerts' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Escalation alerts retrieved', type: [support_dashboard_dto_1.EscalationAlertResponseDto] })];
            _getRealTimeMetrics_decorators = [(0, common_1.Get)('realtime'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get real-time dashboard metrics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Real-time metrics retrieved', type: support_dashboard_dto_1.RealTimeMetricsResponseDto })];
            _getQueueSessions_decorators = [(0, common_1.Get)('queue'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPPORT_AGENT, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get sessions in support queue (waiting for assignment)' }), (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Maximum number of sessions', required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Queue sessions retrieved', type: [support_dashboard_dto_1.SessionOverviewResponseDto] })];
            __esDecorate(this, null, _getDashboardStats_decorators, { kind: "method", name: "getDashboardStats", static: false, private: false, access: { has: obj => "getDashboardStats" in obj, get: obj => obj.getDashboardStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSupportAgentStats_decorators, { kind: "method", name: "getSupportAgentStats", static: false, private: false, access: { has: obj => "getSupportAgentStats" in obj, get: obj => obj.getSupportAgentStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMyStats_decorators, { kind: "method", name: "getMyStats", static: false, private: false, access: { has: obj => "getMyStats" in obj, get: obj => obj.getMyStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSessionOverview_decorators, { kind: "method", name: "getSessionOverview", static: false, private: false, access: { has: obj => "getSessionOverview" in obj, get: obj => obj.getSessionOverview }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMySessions_decorators, { kind: "method", name: "getMySessions", static: false, private: false, access: { has: obj => "getMySessions" in obj, get: obj => obj.getMySessions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEscalationAlerts_decorators, { kind: "method", name: "getEscalationAlerts", static: false, private: false, access: { has: obj => "getEscalationAlerts" in obj, get: obj => obj.getEscalationAlerts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRealTimeMetrics_decorators, { kind: "method", name: "getRealTimeMetrics", static: false, private: false, access: { has: obj => "getRealTimeMetrics" in obj, get: obj => obj.getRealTimeMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getQueueSessions_decorators, { kind: "method", name: "getQueueSessions", static: false, private: false, access: { has: obj => "getQueueSessions" in obj, get: obj => obj.getQueueSessions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SupportDashboardController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        supportDashboardService = __runInitializers(this, _instanceExtraInitializers);
        constructor(supportDashboardService) {
            this.supportDashboardService = supportDashboardService;
        }
        async getDashboardStats(query) {
            try {
                const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
                const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;
                return await this.supportDashboardService.getDashboardStats(dateFrom, dateTo);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get dashboard stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getSupportAgentStats(query) {
            try {
                return await this.supportDashboardService.getSupportAgentStats(query.agentId);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get agent stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getMyStats(req) {
            try {
                return await this.supportDashboardService.getSupportAgentStats(req.user.userId);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get my stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getSessionOverview(query) {
            try {
                return await this.supportDashboardService.getSessionOverview(query.status, query.assignedTo, query.limit || 50);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get session overview: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getMySessions(query, req) {
            try {
                return await this.supportDashboardService.getSessionOverview(undefined, // any status
                req.user.userId, // assigned to current user
                query.limit || 50);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get my sessions: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getEscalationAlerts() {
            try {
                return await this.supportDashboardService.getEscalationAlerts();
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get escalation alerts: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getRealTimeMetrics() {
            try {
                return await this.supportDashboardService.getRealTimeMetrics();
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get real-time metrics: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getQueueSessions(query) {
            try {
                // Get active sessions and filter for those without assignments
                const allSessions = await this.supportDashboardService.getSessionOverview('active', // ChatSessionStatus.ACTIVE
                undefined, query.limit || 50);
                // Filter for sessions without assigned support
                return allSessions.filter(session => !session.assignedSupport);
            }
            catch (error) {
                throw new common_1.HttpException(`Failed to get queue sessions: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    return SupportDashboardController = _classThis;
})();
exports.SupportDashboardController = SupportDashboardController;
//# sourceMappingURL=support-dashboard.controller.js.map