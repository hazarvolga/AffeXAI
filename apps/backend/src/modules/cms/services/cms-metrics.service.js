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
exports.CmsMetricsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const cms_metric_entity_1 = require("../entities/cms-metric.entity");
let CmsMetricsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CmsMetricsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CmsMetricsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        metricsRepository;
        constructor(metricsRepository) {
            this.metricsRepository = metricsRepository;
        }
        async trackPageView(dto) {
            const metric = this.metricsRepository.create({
                metricType: cms_metric_entity_1.MetricType.VIEW,
                pageId: dto.pageId,
                pageTitle: dto.pageTitle,
                category: dto.category,
                visitorId: dto.visitorId,
            });
            return this.metricsRepository.save(metric);
        }
        async trackLinkClick(dto) {
            const metric = this.metricsRepository.create({
                metricType: cms_metric_entity_1.MetricType.CLICK,
                linkUrl: dto.linkUrl,
                linkText: dto.linkText,
                pageId: dto.pageId,
                visitorId: dto.visitorId,
            });
            return this.metricsRepository.save(metric);
        }
        async trackActivity(dto) {
            const metric = this.metricsRepository.create({
                metricType: dto.activityType,
                pageId: dto.pageId,
                pageTitle: dto.pageTitle,
                category: dto.category,
            });
            return this.metricsRepository.save(metric);
        }
        async getMetrics(period) {
            const startDate = this.getStartDate(period);
            const [summary, topPages, topLinks, categoryEngagement] = await Promise.all([
                this.getSummary(startDate),
                this.getTopPages(startDate),
                this.getTopLinks(startDate),
                this.getCategoryEngagement(startDate),
            ]);
            return {
                summary,
                topPages,
                topLinks,
                categoryEngagement,
            };
        }
        getStartDate(period) {
            const now = new Date();
            const startDate = new Date(now);
            switch (period) {
                case 'day':
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    startDate.setDate(now.getDate() - 30);
                    break;
            }
            return startDate;
        }
        async getSummary(startDate) {
            const metrics = await this.metricsRepository.find({
                where: { createdAt: (0, typeorm_1.MoreThan)(startDate) },
            });
            const views = metrics.filter((m) => m.metricType === cms_metric_entity_1.MetricType.VIEW);
            const clicks = metrics.filter((m) => m.metricType === cms_metric_entity_1.MetricType.CLICK);
            const edits = metrics.filter((m) => m.metricType === cms_metric_entity_1.MetricType.EDIT);
            const publishes = metrics.filter((m) => m.metricType === cms_metric_entity_1.MetricType.PUBLISH);
            const uniqueVisitors = new Set(views.map((m) => m.visitorId).filter(Boolean)).size;
            const uniqueLinks = new Set(clicks.map((m) => m.linkUrl).filter(Boolean)).size;
            return {
                totalViews: views.length,
                uniqueVisitors,
                totalClicks: clicks.length,
                uniqueLinks,
                edits: edits.length,
                publishes: publishes.length,
            };
        }
        async getTopPages(startDate) {
            const results = await this.metricsRepository
                .createQueryBuilder('metric')
                .select('metric.pageId', 'page_id')
                .addSelect('metric.pageTitle', 'page_title')
                .addSelect('COUNT(*)', 'view_count')
                .addSelect('COUNT(DISTINCT metric.visitorId)', 'unique_visitors')
                .where('metric.metricType = :type', { type: cms_metric_entity_1.MetricType.VIEW })
                .andWhere('metric.createdAt > :startDate', { startDate })
                .andWhere('metric.pageId IS NOT NULL')
                .groupBy('metric.pageId')
                .addGroupBy('metric.pageTitle')
                .orderBy('view_count', 'DESC')
                .limit(10)
                .getRawMany();
            return results.map((r) => ({
                pageId: r.page_id,
                pageTitle: r.page_title || 'Başlıksız Sayfa',
                viewCount: parseInt(r.view_count, 10),
                uniqueVisitors: parseInt(r.unique_visitors, 10),
            }));
        }
        async getTopLinks(startDate) {
            const results = await this.metricsRepository
                .createQueryBuilder('metric')
                .select('metric.linkUrl', 'link_url')
                .addSelect('metric.linkText', 'link_text')
                .addSelect('COUNT(*)', 'click_count')
                .addSelect('COUNT(DISTINCT metric.visitorId)', 'unique_visitors')
                .where('metric.metricType = :type', { type: cms_metric_entity_1.MetricType.CLICK })
                .andWhere('metric.createdAt > :startDate', { startDate })
                .andWhere('metric.linkUrl IS NOT NULL')
                .groupBy('metric.linkUrl')
                .addGroupBy('metric.linkText')
                .orderBy('click_count', 'DESC')
                .limit(10)
                .getRawMany();
            return results.map((r) => ({
                linkUrl: r.link_url,
                linkText: r.link_text || r.link_url,
                clickCount: parseInt(r.click_count, 10),
                uniqueVisitors: parseInt(r.unique_visitors, 10),
            }));
        }
        async getCategoryEngagement(startDate) {
            const results = await this.metricsRepository
                .createQueryBuilder('metric')
                .select('metric.category', 'category')
                .addSelect('SUM(CASE WHEN metric.metricType = :viewType THEN 1 ELSE 0 END)', 'views')
                .addSelect('SUM(CASE WHEN metric.metricType = :clickType THEN 1 ELSE 0 END)', 'clicks')
                .where('metric.createdAt > :startDate', { startDate })
                .andWhere('metric.category IS NOT NULL')
                .setParameter('viewType', cms_metric_entity_1.MetricType.VIEW)
                .setParameter('clickType', cms_metric_entity_1.MetricType.CLICK)
                .groupBy('metric.category')
                .orderBy('views', 'DESC')
                .getRawMany();
            return results.map((r) => ({
                category: r.category,
                views: parseInt(r.views, 10),
                clicks: parseInt(r.clicks, 10),
            }));
        }
    };
    return CmsMetricsService = _classThis;
})();
exports.CmsMetricsService = CmsMetricsService;
//# sourceMappingURL=cms-metrics.service.js.map