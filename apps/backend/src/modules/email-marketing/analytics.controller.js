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
let AnalyticsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-marketing/analytics')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getDashboardData_decorators;
    let _getOverviewMetrics_decorators;
    let _getCampaignAnalytics_decorators;
    let _getSubscriberGrowth_decorators;
    let _getEmailEngagement_decorators;
    let _getRevenueMetrics_decorators;
    let _getTopCampaigns_decorators;
    let _getAbTestSummary_decorators;
    let _compareCampaigns_decorators;
    let _getDataStatus_decorators;
    let _exportData_decorators;
    var AnalyticsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getDashboardData_decorators = [(0, common_1.Get)('dashboard')];
            _getOverviewMetrics_decorators = [(0, common_1.Get)('overview')];
            _getCampaignAnalytics_decorators = [(0, common_1.Get)('campaigns')];
            _getSubscriberGrowth_decorators = [(0, common_1.Get)('subscriber-growth')];
            _getEmailEngagement_decorators = [(0, common_1.Get)('engagement')];
            _getRevenueMetrics_decorators = [(0, common_1.Get)('revenue')];
            _getTopCampaigns_decorators = [(0, common_1.Get)('top-campaigns')];
            _getAbTestSummary_decorators = [(0, common_1.Get)('ab-tests')];
            _compareCampaigns_decorators = [(0, common_1.Post)('compare-campaigns')];
            _getDataStatus_decorators = [(0, common_1.Get)('debug/data-status')];
            _exportData_decorators = [(0, common_1.Get)('export')];
            __esDecorate(this, null, _getDashboardData_decorators, { kind: "method", name: "getDashboardData", static: false, private: false, access: { has: obj => "getDashboardData" in obj, get: obj => obj.getDashboardData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOverviewMetrics_decorators, { kind: "method", name: "getOverviewMetrics", static: false, private: false, access: { has: obj => "getOverviewMetrics" in obj, get: obj => obj.getOverviewMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCampaignAnalytics_decorators, { kind: "method", name: "getCampaignAnalytics", static: false, private: false, access: { has: obj => "getCampaignAnalytics" in obj, get: obj => obj.getCampaignAnalytics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSubscriberGrowth_decorators, { kind: "method", name: "getSubscriberGrowth", static: false, private: false, access: { has: obj => "getSubscriberGrowth" in obj, get: obj => obj.getSubscriberGrowth }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEmailEngagement_decorators, { kind: "method", name: "getEmailEngagement", static: false, private: false, access: { has: obj => "getEmailEngagement" in obj, get: obj => obj.getEmailEngagement }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRevenueMetrics_decorators, { kind: "method", name: "getRevenueMetrics", static: false, private: false, access: { has: obj => "getRevenueMetrics" in obj, get: obj => obj.getRevenueMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getTopCampaigns_decorators, { kind: "method", name: "getTopCampaigns", static: false, private: false, access: { has: obj => "getTopCampaigns" in obj, get: obj => obj.getTopCampaigns }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAbTestSummary_decorators, { kind: "method", name: "getAbTestSummary", static: false, private: false, access: { has: obj => "getAbTestSummary" in obj, get: obj => obj.getAbTestSummary }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _compareCampaigns_decorators, { kind: "method", name: "compareCampaigns", static: false, private: false, access: { has: obj => "compareCampaigns" in obj, get: obj => obj.compareCampaigns }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDataStatus_decorators, { kind: "method", name: "getDataStatus", static: false, private: false, access: { has: obj => "getDataStatus" in obj, get: obj => obj.getDataStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _exportData_decorators, { kind: "method", name: "exportData", static: false, private: false, access: { has: obj => "exportData" in obj, get: obj => obj.exportData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        analyticsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(analyticsService) {
            this.analyticsService = analyticsService;
        }
        async getDashboardData(startDate, endDate, period = 'month') {
            try {
                return await this.analyticsService.getDashboardData(startDate, endDate, period);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch dashboard data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getOverviewMetrics(startDate, endDate) {
            try {
                return await this.analyticsService.getOverviewMetrics(startDate, endDate);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch overview metrics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getCampaignAnalytics(startDate, endDate, limit = 50) {
            try {
                return await this.analyticsService.getCampaignAnalytics(startDate, endDate, limit);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch campaign analytics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getSubscriberGrowth(startDate, endDate, period = 'day') {
            try {
                return await this.analyticsService.getSubscriberGrowth(startDate, endDate, period);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch subscriber growth data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getEmailEngagement(startDate, endDate, period = 'day') {
            try {
                return await this.analyticsService.getEmailEngagement(startDate, endDate, period);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch email engagement data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getRevenueMetrics(startDate, endDate, period = 'day') {
            try {
                return await this.analyticsService.getRevenueMetrics(startDate, endDate, period);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch revenue metrics', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getTopCampaigns(startDate, endDate, limit = 10, sortBy = 'score') {
            try {
                return await this.analyticsService.getTopCampaigns(startDate, endDate, limit, sortBy);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch top campaigns', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getAbTestSummary(startDate, endDate, limit = 20) {
            try {
                return await this.analyticsService.getAbTestSummary(startDate, endDate, limit);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to fetch A/B test summary', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async compareCampaigns(body) {
            try {
                return await this.analyticsService.compareCampaigns(body.campaignIds, body.metrics);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to compare campaigns', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getDataStatus() {
            try {
                return await this.analyticsService.getDataStatus();
            }
            catch (error) {
                throw new common_1.HttpException('Failed to get data status', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async exportData(type, format = 'csv', startDate, endDate, res) {
            try {
                const data = await this.analyticsService.exportData(type, format, startDate, endDate);
                const filename = `${type}-analytics-${new Date().toISOString().split('T')[0]}.${format}`;
                const contentType = format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                res.setHeader('Content-Type', contentType);
                res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                res.send(data);
            }
            catch (error) {
                throw new common_1.HttpException('Failed to export data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    return AnalyticsController = _classThis;
})();
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analytics.controller.js.map