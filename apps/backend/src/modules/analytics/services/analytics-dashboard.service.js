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
exports.AnalyticsDashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const dto_1 = require("../dto");
let AnalyticsDashboardService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsDashboardService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsDashboardService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventRepository;
        sessionRepository;
        abTestRepository;
        constructor(eventRepository, sessionRepository, abTestRepository) {
            this.eventRepository = eventRepository;
            this.sessionRepository = sessionRepository;
            this.abTestRepository = abTestRepository;
        }
        /**
         * Get dashboard data
         */
        async getDashboardData(query) {
            const { startDate, endDate } = this.getDateRange(query.timeRange, query.customStartDate, query.customEndDate);
            const { startDate: prevStartDate, endDate: prevEndDate } = this.getPreviousPeriod(startDate, endDate);
            // Get current period data
            const [overview, topComponents, timeline, deviceDist, recentSessions] = await Promise.all([
                this.getOverview(startDate, endDate, prevStartDate, prevEndDate, query),
                this.getTopComponents(startDate, endDate, query),
                this.getTimeline(startDate, endDate, query),
                this.getDeviceDistribution(startDate, endDate, query),
                this.getRecentSessions(10),
            ]);
            return {
                overview,
                topComponents,
                timeline,
                deviceDistribution: deviceDist,
                recentSessions,
            };
        }
        /**
         * Get overview metrics with comparison
         */
        async getOverview(startDate, endDate, prevStartDate, prevEndDate, query) {
            // Current period
            const currentViews = await this.countEvents(startDate, endDate, entities_1.InteractionType.VIEW, query);
            const currentInteractions = await this.countEvents(startDate, endDate, null, query);
            const currentEngagement = await this.getAverageEngagement(startDate, endDate, query);
            const currentConversionRate = await this.getConversionRate(startDate, endDate, query);
            // Previous period
            const prevViews = await this.countEvents(prevStartDate, prevEndDate, entities_1.InteractionType.VIEW, query);
            const prevInteractions = await this.countEvents(prevStartDate, prevEndDate, null, query);
            const prevEngagement = await this.getAverageEngagement(prevStartDate, prevEndDate, query);
            const prevConversionRate = await this.getConversionRate(prevStartDate, prevEndDate, query);
            return {
                totalViews: currentViews,
                totalInteractions: currentInteractions,
                averageEngagementTime: currentEngagement,
                conversionRate: currentConversionRate,
                changeFromPrevious: {
                    views: this.calculatePercentageChange(currentViews, prevViews),
                    interactions: this.calculatePercentageChange(currentInteractions, prevInteractions),
                    engagementTime: this.calculatePercentageChange(currentEngagement, prevEngagement),
                    conversionRate: this.calculatePercentageChange(currentConversionRate, prevConversionRate),
                },
            };
        }
        /**
         * Get top performing components
         */
        async getTopComponents(startDate, endDate, query) {
            const qb = this.eventRepository
                .createQueryBuilder('event')
                .select('event.componentId', 'componentId')
                .addSelect('event.componentType', 'componentType')
                .addSelect('event.pageUrl', 'pageUrl')
                .addSelect('COUNT(CASE WHEN event.interactionType != :viewType THEN 1 END)', 'interactions')
                .addSelect('COUNT(CASE WHEN event.interactionType = :viewType THEN 1 END)', 'views')
                .addSelect('COUNT(CASE WHEN event.interactionType = :submitType THEN 1 END)', 'conversions')
                .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
                .setParameter('viewType', entities_1.InteractionType.VIEW)
                .setParameter('submitType', entities_1.InteractionType.SUBMIT)
                .groupBy('event.componentId')
                .addGroupBy('event.componentType')
                .addGroupBy('event.pageUrl')
                .orderBy('interactions', 'DESC')
                .limit(10);
            if (query.pageUrl) {
                qb.andWhere('event.pageUrl = :pageUrl', { pageUrl: query.pageUrl });
            }
            const results = await qb.getRawMany();
            return results.map((r) => ({
                componentId: r.componentId,
                componentType: r.componentType,
                pageUrl: r.pageUrl,
                interactionRate: r.views > 0 ? r.interactions / r.views : 0,
                conversions: parseInt(r.conversions),
            }));
        }
        /**
         * Get timeline data
         */
        async getTimeline(startDate, endDate, query) {
            const qb = this.eventRepository
                .createQueryBuilder('event')
                .select(`DATE_TRUNC('day', event.createdAt)`, 'timestamp')
                .addSelect('COUNT(CASE WHEN event.interactionType = :viewType THEN 1 END)', 'views')
                .addSelect('COUNT(CASE WHEN event.interactionType != :viewType THEN 1 END)', 'interactions')
                .addSelect('COUNT(CASE WHEN event.interactionType = :submitType THEN 1 END)', 'conversions')
                .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
                .setParameter('viewType', entities_1.InteractionType.VIEW)
                .setParameter('submitType', entities_1.InteractionType.SUBMIT)
                .groupBy('timestamp')
                .orderBy('timestamp', 'ASC');
            if (query.pageUrl) {
                qb.andWhere('event.pageUrl = :pageUrl', { pageUrl: query.pageUrl });
            }
            const results = await qb.getRawMany();
            return results.map((r) => ({
                timestamp: r.timestamp,
                views: parseInt(r.views),
                interactions: parseInt(r.interactions),
                conversions: parseInt(r.conversions),
            }));
        }
        /**
         * Get device distribution
         */
        async getDeviceDistribution(startDate, endDate, query) {
            const total = await this.countEvents(startDate, endDate, null, query);
            if (total === 0) {
                return { mobile: 0, tablet: 0, desktop: 0 };
            }
            const qb = this.eventRepository
                .createQueryBuilder('event')
                .select('event.deviceType', 'deviceType')
                .addSelect('COUNT(*)', 'count')
                .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
                .groupBy('event.deviceType');
            const results = await qb.getRawMany();
            const distribution = { mobile: 0, tablet: 0, desktop: 0 };
            results.forEach((r) => {
                distribution[r.deviceType] = parseInt(r.count) / total;
            });
            return distribution;
        }
        /**
         * Get recent sessions
         */
        async getRecentSessions(limit = 10) {
            return this.sessionRepository.find({
                order: { startTime: 'DESC' },
                take: limit,
            });
        }
        /**
         * Helper: Count events
         */
        async countEvents(startDate, endDate, interactionType, query) {
            const qb = this.eventRepository
                .createQueryBuilder('event')
                .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });
            if (interactionType) {
                qb.andWhere('event.interactionType = :type', { type: interactionType });
            }
            if (query.pageUrl) {
                qb.andWhere('event.pageUrl = :pageUrl', { pageUrl: query.pageUrl });
            }
            if (query.deviceTypes && query.deviceTypes.length > 0) {
                qb.andWhere('event.deviceType IN (:...deviceTypes)', { deviceTypes: query.deviceTypes });
            }
            return qb.getCount();
        }
        /**
         * Helper: Get average engagement time
         */
        async getAverageEngagement(startDate, endDate, query) {
            const sessions = await this.sessionRepository
                .createQueryBuilder('session')
                .where('session.startTime BETWEEN :startDate AND :endDate', { startDate, endDate })
                .andWhere('session.duration IS NOT NULL')
                .getMany();
            if (sessions.length === 0)
                return 0;
            const totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
            return totalDuration / sessions.length;
        }
        /**
         * Helper: Get conversion rate
         */
        async getConversionRate(startDate, endDate, query) {
            const totalSessions = await this.sessionRepository.count({
                where: {
                    startTime: (0, typeorm_1.Between)(startDate, endDate),
                },
            });
            if (totalSessions === 0)
                return 0;
            const convertedSessions = await this.sessionRepository.count({
                where: {
                    startTime: (0, typeorm_1.Between)(startDate, endDate),
                    converted: true,
                },
            });
            return convertedSessions / totalSessions;
        }
        /**
         * Helper: Calculate percentage change
         */
        calculatePercentageChange(current, previous) {
            if (previous === 0)
                return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        }
        /**
         * Helper: Get date range from time range enum
         */
        getDateRange(timeRange, customStart, customEnd) {
            const now = new Date();
            let startDate;
            let endDate = now;
            switch (timeRange) {
                case dto_1.AnalyticsTimeRange.TODAY:
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case dto_1.AnalyticsTimeRange.YESTERDAY:
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
                    endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() + 1);
                    break;
                case dto_1.AnalyticsTimeRange.LAST_7_DAYS:
                    startDate = new Date(now);
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case dto_1.AnalyticsTimeRange.LAST_30_DAYS:
                    startDate = new Date(now);
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                case dto_1.AnalyticsTimeRange.LAST_90_DAYS:
                    startDate = new Date(now);
                    startDate.setDate(startDate.getDate() - 90);
                    break;
                case dto_1.AnalyticsTimeRange.CUSTOM:
                    startDate = customStart ? new Date(customStart) : new Date(now.getFullYear(), now.getMonth(), 1);
                    endDate = customEnd ? new Date(customEnd) : now;
                    break;
                default:
                    startDate = new Date(now);
                    startDate.setDate(startDate.getDate() - 7);
            }
            return { startDate, endDate };
        }
        /**
         * Helper: Get previous period dates
         */
        getPreviousPeriod(startDate, endDate) {
            const duration = endDate.getTime() - startDate.getTime();
            const prevEndDate = new Date(startDate);
            const prevStartDate = new Date(startDate.getTime() - duration);
            return { startDate: prevStartDate, endDate: prevEndDate };
        }
    };
    return AnalyticsDashboardService = _classThis;
})();
exports.AnalyticsDashboardService = AnalyticsDashboardService;
//# sourceMappingURL=analytics-dashboard.service.js.map