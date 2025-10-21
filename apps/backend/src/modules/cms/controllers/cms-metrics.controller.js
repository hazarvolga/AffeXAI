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
exports.CmsMetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cms_metrics_dto_1 = require("../dto/cms-metrics.dto");
let CmsMetricsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('CMS Metrics'), (0, common_1.Controller)('cms-metrics')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getMetrics_decorators;
    let _trackPageView_decorators;
    let _trackLinkClick_decorators;
    let _trackActivity_decorators;
    var CmsMetricsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getMetrics_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get CMS analytics metrics' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Returns aggregated CMS metrics',
                    type: cms_metrics_dto_1.CmsMetricsResponseDto,
                })];
            _trackPageView_decorators = [(0, common_1.Post)('view'), (0, swagger_1.ApiOperation)({ summary: 'Track page view' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Page view tracked successfully' })];
            _trackLinkClick_decorators = [(0, common_1.Post)('click'), (0, swagger_1.ApiOperation)({ summary: 'Track link click' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Link click tracked successfully' })];
            _trackActivity_decorators = [(0, common_1.Post)('activity'), (0, swagger_1.ApiOperation)({ summary: 'Track CMS activity (edit/publish)' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Activity tracked successfully' })];
            __esDecorate(this, null, _getMetrics_decorators, { kind: "method", name: "getMetrics", static: false, private: false, access: { has: obj => "getMetrics" in obj, get: obj => obj.getMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackPageView_decorators, { kind: "method", name: "trackPageView", static: false, private: false, access: { has: obj => "trackPageView" in obj, get: obj => obj.trackPageView }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackLinkClick_decorators, { kind: "method", name: "trackLinkClick", static: false, private: false, access: { has: obj => "trackLinkClick" in obj, get: obj => obj.trackLinkClick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _trackActivity_decorators, { kind: "method", name: "trackActivity", static: false, private: false, access: { has: obj => "trackActivity" in obj, get: obj => obj.trackActivity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CmsMetricsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        metricsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(metricsService) {
            this.metricsService = metricsService;
        }
        async getMetrics(query) {
            const period = query.period || 'week';
            return this.metricsService.getMetrics(period);
        }
        async trackPageView(dto) {
            await this.metricsService.trackPageView(dto);
            return { success: true, message: 'Sayfa görüntüleme kaydedildi' };
        }
        async trackLinkClick(dto) {
            await this.metricsService.trackLinkClick(dto);
            return { success: true, message: 'Link tıklama kaydedildi' };
        }
        async trackActivity(dto) {
            await this.metricsService.trackActivity(dto);
            return { success: true, message: 'Aktivite kaydedildi' };
        }
    };
    return CmsMetricsController = _classThis;
})();
exports.CmsMetricsController = CmsMetricsController;
//# sourceMappingURL=cms-metrics.controller.js.map