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
exports.MonitoringController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const monitoring_alerting_service_1 = require("../services/monitoring-alerting.service");
let MonitoringController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('FAQ Learning Monitoring'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('faq-learning/monitoring'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getSystemHealth_decorators;
    let _getAllAlerts_decorators;
    let _getActiveAlerts_decorators;
    let _getAlertsByType_decorators;
    let _getAlertsBySeverity_decorators;
    let _getAlertStatistics_decorators;
    let _resolveAlert_decorators;
    let _clearResolvedAlerts_decorators;
    let _triggerHealthCheck_decorators;
    let _triggerPerformanceCheck_decorators;
    var MonitoringController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSystemHealth_decorators = [(0, common_1.Get)('health'), (0, swagger_1.ApiOperation)({ summary: 'Get system health status' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'System health status retrieved' })];
            _getAllAlerts_decorators = [(0, common_1.Get)('alerts'), (0, swagger_1.ApiOperation)({ summary: 'Get all alerts' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Alerts retrieved' })];
            _getActiveAlerts_decorators = [(0, common_1.Get)('alerts/active'), (0, swagger_1.ApiOperation)({ summary: 'Get active alerts' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Active alerts retrieved' })];
            _getAlertsByType_decorators = [(0, common_1.Get)('alerts/type/:type'), (0, swagger_1.ApiOperation)({ summary: 'Get alerts by type' }), (0, swagger_1.ApiParam)({ name: 'type', enum: monitoring_alerting_service_1.AlertType }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Alerts by type retrieved' })];
            _getAlertsBySeverity_decorators = [(0, common_1.Get)('alerts/severity/:severity'), (0, swagger_1.ApiOperation)({ summary: 'Get alerts by severity' }), (0, swagger_1.ApiParam)({ name: 'severity', enum: monitoring_alerting_service_1.AlertSeverity }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Alerts by severity retrieved' })];
            _getAlertStatistics_decorators = [(0, common_1.Get)('alerts/statistics'), (0, swagger_1.ApiOperation)({ summary: 'Get alert statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Alert statistics retrieved' })];
            _resolveAlert_decorators = [(0, common_1.Post)('alerts/:alertId/resolve'), (0, swagger_1.ApiOperation)({ summary: 'Resolve an alert' }), (0, swagger_1.ApiParam)({ name: 'alertId', type: String }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Alert resolved' })];
            _clearResolvedAlerts_decorators = [(0, common_1.Post)('alerts/clear-resolved'), (0, swagger_1.ApiOperation)({ summary: 'Clear all resolved alerts' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Resolved alerts cleared' })];
            _triggerHealthCheck_decorators = [(0, common_1.Post)('health-check'), (0, swagger_1.ApiOperation)({ summary: 'Trigger manual health check' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Health check triggered' })];
            _triggerPerformanceCheck_decorators = [(0, common_1.Post)('performance-check'), (0, swagger_1.ApiOperation)({ summary: 'Trigger manual performance check' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance check triggered' })];
            __esDecorate(this, null, _getSystemHealth_decorators, { kind: "method", name: "getSystemHealth", static: false, private: false, access: { has: obj => "getSystemHealth" in obj, get: obj => obj.getSystemHealth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAllAlerts_decorators, { kind: "method", name: "getAllAlerts", static: false, private: false, access: { has: obj => "getAllAlerts" in obj, get: obj => obj.getAllAlerts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getActiveAlerts_decorators, { kind: "method", name: "getActiveAlerts", static: false, private: false, access: { has: obj => "getActiveAlerts" in obj, get: obj => obj.getActiveAlerts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAlertsByType_decorators, { kind: "method", name: "getAlertsByType", static: false, private: false, access: { has: obj => "getAlertsByType" in obj, get: obj => obj.getAlertsByType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAlertsBySeverity_decorators, { kind: "method", name: "getAlertsBySeverity", static: false, private: false, access: { has: obj => "getAlertsBySeverity" in obj, get: obj => obj.getAlertsBySeverity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAlertStatistics_decorators, { kind: "method", name: "getAlertStatistics", static: false, private: false, access: { has: obj => "getAlertStatistics" in obj, get: obj => obj.getAlertStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resolveAlert_decorators, { kind: "method", name: "resolveAlert", static: false, private: false, access: { has: obj => "resolveAlert" in obj, get: obj => obj.resolveAlert }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _clearResolvedAlerts_decorators, { kind: "method", name: "clearResolvedAlerts", static: false, private: false, access: { has: obj => "clearResolvedAlerts" in obj, get: obj => obj.clearResolvedAlerts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _triggerHealthCheck_decorators, { kind: "method", name: "triggerHealthCheck", static: false, private: false, access: { has: obj => "triggerHealthCheck" in obj, get: obj => obj.triggerHealthCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _triggerPerformanceCheck_decorators, { kind: "method", name: "triggerPerformanceCheck", static: false, private: false, access: { has: obj => "triggerPerformanceCheck" in obj, get: obj => obj.triggerPerformanceCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MonitoringController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        monitoringService = __runInitializers(this, _instanceExtraInitializers);
        constructor(monitoringService) {
            this.monitoringService = monitoringService;
        }
        async getSystemHealth() {
            const health = await this.monitoringService.getSystemHealth();
            return {
                success: true,
                data: health,
            };
        }
        async getAllAlerts(limit) {
            const alerts = this.monitoringService.getAllAlerts(limit ? parseInt(limit.toString()) : 50);
            return {
                success: true,
                data: alerts,
            };
        }
        async getActiveAlerts() {
            const alerts = this.monitoringService.getActiveAlerts();
            return {
                success: true,
                data: alerts,
            };
        }
        async getAlertsByType(type) {
            const alerts = this.monitoringService.getAlertsByType(type);
            return {
                success: true,
                data: alerts,
            };
        }
        async getAlertsBySeverity(severity) {
            const alerts = this.monitoringService.getAlertsBySeverity(severity);
            return {
                success: true,
                data: alerts,
            };
        }
        async getAlertStatistics() {
            const stats = await this.monitoringService.getAlertStatistics();
            return {
                success: true,
                data: stats,
            };
        }
        async resolveAlert(alertId) {
            const resolved = await this.monitoringService.resolveAlert(alertId);
            return {
                success: resolved,
                message: resolved ? 'Alert resolved successfully' : 'Alert not found or already resolved',
            };
        }
        async clearResolvedAlerts() {
            const count = this.monitoringService.clearResolvedAlerts();
            return {
                success: true,
                message: `Cleared ${count} resolved alerts`,
                data: { clearedCount: count },
            };
        }
        async triggerHealthCheck() {
            await this.monitoringService.performHealthCheck();
            const health = await this.monitoringService.getSystemHealth();
            return {
                success: true,
                message: 'Health check completed',
                data: health,
            };
        }
        async triggerPerformanceCheck() {
            await this.monitoringService.checkPerformanceMetrics();
            return {
                success: true,
                message: 'Performance check completed',
            };
        }
    };
    return MonitoringController = _classThis;
})();
exports.MonitoringController = MonitoringController;
//# sourceMappingURL=monitoring.controller.js.map