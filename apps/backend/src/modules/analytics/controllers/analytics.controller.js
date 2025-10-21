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
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let AnalyticsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('analytics')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _trackEvent_decorators;
    let _trackEventsBatch_decorators;
    let _getDashboard_decorators;
    let _getHeatmap_decorators;
    let _getComponentHeatmaps_decorators;
    let _getTestVariant_decorators;
    let _trackTestImpression_decorators;
    let _trackTestConversion_decorators;
    var AnalyticsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _trackEvent_decorators = [(0, common_1.Post)('track'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            _trackEventsBatch_decorators = [(0, common_1.Post)('track/batch'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            _getDashboard_decorators = [(0, common_1.Get)('dashboard'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
            _getHeatmap_decorators = [(0, common_1.Get)('heatmap'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
            _getComponentHeatmaps_decorators = [(0, common_1.Get)('heatmap/:componentId'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
            _getTestVariant_decorators = [(0, common_1.Get)('ab-test/:testId/variant')];
            _trackTestImpression_decorators = [(0, common_1.Post)('ab-test/impression'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            _trackTestConversion_decorators = [(0, common_1.Post)('ab-test/conversion'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            __esDecorate(this, null, _trackEvent_decorators, { kind: "method", name: "trackEvent", static: false, private: false, access: { has: obj => "trackEvent" in obj, get: obj => obj.trackEvent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackEventsBatch_decorators, { kind: "method", name: "trackEventsBatch", static: false, private: false, access: { has: obj => "trackEventsBatch" in obj, get: obj => obj.trackEventsBatch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: obj => "getDashboard" in obj, get: obj => obj.getDashboard }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getHeatmap_decorators, { kind: "method", name: "getHeatmap", static: false, private: false, access: { has: obj => "getHeatmap" in obj, get: obj => obj.getHeatmap }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getComponentHeatmaps_decorators, { kind: "method", name: "getComponentHeatmaps", static: false, private: false, access: { has: obj => "getComponentHeatmaps" in obj, get: obj => obj.getComponentHeatmaps }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTestVariant_decorators, { kind: "method", name: "getTestVariant", static: false, private: false, access: { has: obj => "getTestVariant" in obj, get: obj => obj.getTestVariant }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackTestImpression_decorators, { kind: "method", name: "trackTestImpression", static: false, private: false, access: { has: obj => "trackTestImpression" in obj, get: obj => obj.trackTestImpression }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackTestConversion_decorators, { kind: "method", name: "trackTestConversion", static: false, private: false, access: { has: obj => "trackTestConversion" in obj, get: obj => obj.trackTestConversion }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        trackingService = __runInitializers(this, _instanceExtraInitializers);
        dashboardService;
        heatmapService;
        abTestingService;
        constructor(trackingService, dashboardService, heatmapService, abTestingService) {
            this.trackingService = trackingService;
            this.dashboardService = dashboardService;
            this.heatmapService = heatmapService;
            this.abTestingService = abTestingService;
        }
        /**
         * Track a single event
         * POST /analytics/track
         */
        async trackEvent(dto) {
            await this.trackingService.trackEvent(dto);
        }
        /**
         * Track multiple events (batch)
         * POST /analytics/track/batch
         */
        async trackEventsBatch(dto) {
            return this.trackingService.trackEventsBatch(dto);
        }
        /**
         * Get dashboard data
         * GET /analytics/dashboard
         */
        async getDashboard(query) {
            return this.dashboardService.getDashboardData(query);
        }
        /**
         * Generate/Get heatmap
         * GET /analytics/heatmap
         */
        async getHeatmap(query) {
            return this.heatmapService.generateHeatmap(query);
        }
        /**
         * Get heatmaps for component
         * GET /analytics/heatmap/:componentId
         */
        async getComponentHeatmaps(componentId, pageUrl) {
            return this.heatmapService.getHeatmapsForComponent(componentId, pageUrl);
        }
        /**
         * Get variant for A/B test (for user assignment)
         * GET /analytics/ab-test/:testId/variant
         */
        async getTestVariant(testId) {
            return this.abTestingService.getVariantForUser(testId);
        }
        /**
         * Track A/B test impression
         * POST /analytics/ab-test/impression
         */
        async trackTestImpression(variantId) {
            await this.abTestingService.trackImpression(variantId);
        }
        /**
         * Track A/B test conversion
         * POST /analytics/ab-test/conversion
         */
        async trackTestConversion(variantId, engagementTime) {
            await this.abTestingService.trackConversion(variantId, engagementTime);
        }
    };
    return AnalyticsController = _classThis;
})();
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map