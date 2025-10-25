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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
let AnalyticsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('FAQ Learning Analytics'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('faq-learning/analytics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_AGENT)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getLearningEffectiveness_decorators;
    let _getProviderPerformance_decorators;
    let _getFaqUsageMetrics_decorators;
    let _getROIMetrics_decorators;
    let _getComprehensiveAnalytics_decorators;
    let _getPatternAnalytics_decorators;
    var AnalyticsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getLearningEffectiveness_decorators = [(0, common_1.Get)('effectiveness'), (0, swagger_1.ApiOperation)({ summary: 'Get learning effectiveness metrics' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Learning effectiveness metrics retrieved' })];
            _getProviderPerformance_decorators = [(0, common_1.Get)('provider-performance'), (0, swagger_1.ApiOperation)({ summary: 'Get AI provider performance comparison' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Provider performance metrics retrieved' })];
            _getFaqUsageMetrics_decorators = [(0, common_1.Get)('usage'), (0, swagger_1.ApiOperation)({ summary: 'Get FAQ usage metrics' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ usage metrics retrieved' })];
            _getROIMetrics_decorators = [(0, common_1.Get)('roi'), (0, swagger_1.ApiOperation)({ summary: 'Get ROI and ticket reduction metrics' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'ROI metrics retrieved' })];
            _getComprehensiveAnalytics_decorators = [(0, common_1.Get)('comprehensive'), (0, swagger_1.ApiOperation)({ summary: 'Get comprehensive analytics dashboard data' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Comprehensive analytics retrieved' })];
            _getPatternAnalytics_decorators = [(0, common_1.Get)('patterns'), (0, swagger_1.ApiOperation)({ summary: 'Get pattern analytics' }), (0, swagger_1.ApiQuery)({ name: 'period', enum: ['day', 'week', 'month', 'all'], required: false }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Pattern analytics retrieved' })];
            __esDecorate(this, null, _getLearningEffectiveness_decorators, { kind: "method", name: "getLearningEffectiveness", static: false, private: false, access: { has: obj => "getLearningEffectiveness" in obj, get: obj => obj.getLearningEffectiveness }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProviderPerformance_decorators, { kind: "method", name: "getProviderPerformance", static: false, private: false, access: { has: obj => "getProviderPerformance" in obj, get: obj => obj.getProviderPerformance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFaqUsageMetrics_decorators, { kind: "method", name: "getFaqUsageMetrics", static: false, private: false, access: { has: obj => "getFaqUsageMetrics" in obj, get: obj => obj.getFaqUsageMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getROIMetrics_decorators, { kind: "method", name: "getROIMetrics", static: false, private: false, access: { has: obj => "getROIMetrics" in obj, get: obj => obj.getROIMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getComprehensiveAnalytics_decorators, { kind: "method", name: "getComprehensiveAnalytics", static: false, private: false, access: { has: obj => "getComprehensiveAnalytics" in obj, get: obj => obj.getComprehensiveAnalytics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPatternAnalytics_decorators, { kind: "method", name: "getPatternAnalytics", static: false, private: false, access: { has: obj => "getPatternAnalytics" in obj, get: obj => obj.getPatternAnalytics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        analyticsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(analyticsService) {
            this.analyticsService = analyticsService;
        }
        async getLearningEffectiveness(period = 'week') {
            const metrics = await this.analyticsService.getLearningEffectiveness(period);
            return {
                success: true,
                data: metrics,
            };
        }
        async getProviderPerformance(period = 'week') {
            const metrics = await this.analyticsService.getProviderPerformance(period);
            return {
                success: true,
                data: metrics,
            };
        }
        async getFaqUsageMetrics(period = 'week') {
            const metrics = await this.analyticsService.getFaqUsageMetrics(period);
            return {
                success: true,
                data: metrics,
            };
        }
        async getROIMetrics(period = 'month') {
            const metrics = await this.analyticsService.getROIMetrics(period);
            return {
                success: true,
                data: metrics,
            };
        }
        async getComprehensiveAnalytics(period = 'week') {
            const analytics = await this.analyticsService.getComprehensiveAnalytics(period);
            return {
                success: true,
                data: analytics,
            };
        }
        async getPatternAnalytics(period = 'week') {
            const analytics = await this.analyticsService.getPatternAnalytics(period);
            return {
                success: true,
                data: analytics,
            };
        }
    };
    return AnalyticsController = _classThis;
})();
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map