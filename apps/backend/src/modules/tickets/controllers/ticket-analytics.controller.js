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
exports.TicketAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Ticket Analytics Controller
 * RESTful API endpoints for ticket analytics and reporting
 */
let TicketAnalyticsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Analytics'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('tickets/analytics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getOverallStats_decorators;
    let _getTimeBasedStats_decorators;
    let _getAgentPerformance_decorators;
    let _getSpecificAgentPerformance_decorators;
    let _getCategoryStats_decorators;
    let _getTagStats_decorators;
    let _getCustomerStats_decorators;
    let _getMyStats_decorators;
    var TicketAnalyticsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getOverallStats_decorators = [(0, common_1.Get)('overview'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get overall ticket statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getTimeBasedStats_decorators = [(0, common_1.Get)('trends'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get time-based ticket trends' }), (0, swagger_1.ApiQuery)({ name: 'period', required: false, enum: ['day', 'week', 'month'] }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Trends retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getAgentPerformance_decorators = [(0, common_1.Get)('agents'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get agent performance statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Agent stats retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getSpecificAgentPerformance_decorators = [(0, common_1.Get)('agents/:agentId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get specific agent performance statistics' }), (0, swagger_1.ApiParam)({ name: 'agentId', description: 'Agent UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Agent stats retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getCategoryStats_decorators = [(0, common_1.Get)('categories'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get category statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category stats retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getTagStats_decorators = [(0, common_1.Get)('tags'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get tag usage statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Tag stats retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getCustomerStats_decorators = [(0, common_1.Get)('customers'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get customer ticket statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer stats retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _getMyStats_decorators = [(0, common_1.Get)('my-stats'), (0, swagger_1.ApiOperation)({ summary: 'Get current user ticket statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User stats retrieved successfully' })];
            __esDecorate(this, null, _getOverallStats_decorators, { kind: "method", name: "getOverallStats", static: false, private: false, access: { has: obj => "getOverallStats" in obj, get: obj => obj.getOverallStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTimeBasedStats_decorators, { kind: "method", name: "getTimeBasedStats", static: false, private: false, access: { has: obj => "getTimeBasedStats" in obj, get: obj => obj.getTimeBasedStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAgentPerformance_decorators, { kind: "method", name: "getAgentPerformance", static: false, private: false, access: { has: obj => "getAgentPerformance" in obj, get: obj => obj.getAgentPerformance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSpecificAgentPerformance_decorators, { kind: "method", name: "getSpecificAgentPerformance", static: false, private: false, access: { has: obj => "getSpecificAgentPerformance" in obj, get: obj => obj.getSpecificAgentPerformance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryStats_decorators, { kind: "method", name: "getCategoryStats", static: false, private: false, access: { has: obj => "getCategoryStats" in obj, get: obj => obj.getCategoryStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTagStats_decorators, { kind: "method", name: "getTagStats", static: false, private: false, access: { has: obj => "getTagStats" in obj, get: obj => obj.getTagStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCustomerStats_decorators, { kind: "method", name: "getCustomerStats", static: false, private: false, access: { has: obj => "getCustomerStats" in obj, get: obj => obj.getCustomerStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMyStats_decorators, { kind: "method", name: "getMyStats", static: false, private: false, access: { has: obj => "getMyStats" in obj, get: obj => obj.getMyStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAnalyticsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        analyticsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(analyticsService) {
            this.analyticsService = analyticsService;
        }
        /**
         * Get overall ticket statistics
         */
        async getOverallStats() {
            return this.analyticsService.getOverallStats();
        }
        /**
         * Get time-based statistics
         */
        async getTimeBasedStats(period) {
            return this.analyticsService.getTimeBasedStats(period || 'week');
        }
        /**
         * Get agent performance statistics
         */
        async getAgentPerformance() {
            return this.analyticsService.getAgentPerformance();
        }
        /**
         * Get specific agent performance
         */
        async getSpecificAgentPerformance(agentId) {
            const stats = await this.analyticsService.getAgentPerformance(agentId);
            return stats[0] || null;
        }
        /**
         * Get category statistics
         */
        async getCategoryStats() {
            return this.analyticsService.getCategoryStats();
        }
        /**
         * Get tag statistics
         */
        async getTagStats() {
            return this.analyticsService.getTagStats();
        }
        /**
         * Get customer statistics (admin view)
         */
        async getCustomerStats() {
            return this.analyticsService.getCustomerStats();
        }
        /**
         * Get customer's own statistics
         */
        async getMyStats(userId) {
            return this.analyticsService.getCustomerStats(userId);
        }
    };
    return TicketAnalyticsController = _classThis;
})();
exports.TicketAnalyticsController = TicketAnalyticsController;
//# sourceMappingURL=ticket-analytics.controller.js.map