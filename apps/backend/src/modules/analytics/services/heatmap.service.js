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
exports.HeatmapService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
let HeatmapService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeatmapService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            HeatmapService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        heatmapRepository;
        eventRepository;
        constructor(heatmapRepository, eventRepository) {
            this.heatmapRepository = heatmapRepository;
            this.eventRepository = eventRepository;
        }
        /**
         * Generate heatmap from events
         */
        async generateHeatmap(query) {
            const { startDate, endDate } = this.getDateRange(query.timeRange, query.customStartDate, query.customEndDate);
            // Check if heatmap already exists for this period
            const existing = await this.heatmapRepository.findOne({
                where: {
                    componentId: query.componentId,
                    ...(query.pageUrl && { pageUrl: query.pageUrl }),
                    periodStart: startDate,
                    periodEnd: endDate,
                },
            });
            if (existing) {
                return existing;
            }
            // Get events with coordinates
            const qb = this.eventRepository
                .createQueryBuilder('event')
                .where('event.componentId = :componentId', { componentId: query.componentId })
                .andWhere('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
                .andWhere('event.coordinateX IS NOT NULL')
                .andWhere('event.coordinateY IS NOT NULL')
                .andWhere('event.relativeX IS NOT NULL')
                .andWhere('event.relativeY IS NOT NULL');
            if (query.pageUrl) {
                qb.andWhere('event.pageUrl = :pageUrl', { pageUrl: query.pageUrl });
            }
            const events = await qb.getMany();
            if (events.length === 0) {
                // Return empty heatmap
                return this.heatmapRepository.create({
                    componentId: query.componentId,
                    componentType: 'unknown',
                    pageUrl: query.pageUrl || '',
                    periodStart: startDate,
                    periodEnd: endDate,
                    points: [],
                    dimensionWidth: 0,
                    dimensionHeight: 0,
                    totalInteractions: 0,
                    uniqueUsers: 0,
                });
            }
            // Aggregate points by coordinates
            const pointsMap = new Map();
            events.forEach((event) => {
                // Grid size for aggregation (10x10 pixels)
                const gridSize = 10;
                const gridX = Math.floor(event.relativeX / gridSize) * gridSize;
                const gridY = Math.floor(event.relativeY / gridSize) * gridSize;
                const key = `${gridX},${gridY}`;
                const existing = pointsMap.get(key);
                if (existing) {
                    existing.intensity += 1;
                }
                else {
                    pointsMap.set(key, {
                        x: gridX,
                        y: gridY,
                        intensity: 1,
                        type: event.interactionType,
                    });
                }
            });
            const points = Array.from(pointsMap.values());
            // Get component dimensions (max coordinates)
            const maxWidth = Math.max(...events.map((e) => e.relativeX));
            const maxHeight = Math.max(...events.map((e) => e.relativeY));
            // Get unique users
            const uniqueUserIds = new Set(events.map((e) => e.userId).filter(Boolean));
            // Create heatmap
            const heatmap = this.heatmapRepository.create({
                componentId: query.componentId,
                componentType: events[0].componentType,
                pageUrl: query.pageUrl || events[0].pageUrl,
                periodStart: startDate,
                periodEnd: endDate,
                points,
                dimensionWidth: maxWidth,
                dimensionHeight: maxHeight,
                totalInteractions: events.length,
                uniqueUsers: uniqueUserIds.size,
            });
            return this.heatmapRepository.save(heatmap);
        }
        /**
         * Get heatmap by ID
         */
        async getHeatmapById(id) {
            return this.heatmapRepository.findOne({ where: { id } });
        }
        /**
         * Get heatmaps for component
         */
        async getHeatmapsForComponent(componentId, pageUrl) {
            const where = { componentId };
            if (pageUrl) {
                where.pageUrl = pageUrl;
            }
            return this.heatmapRepository.find({
                where,
                order: { periodStart: 'DESC' },
            });
        }
        /**
         * Delete old heatmaps
         */
        async deleteOldHeatmaps(daysToKeep = 90) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
            const result = await this.heatmapRepository
                .createQueryBuilder()
                .delete()
                .where('periodEnd < :cutoffDate', { cutoffDate })
                .execute();
            return result.affected || 0;
        }
        /**
         * Helper: Get date range from query
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
    };
    return HeatmapService = _classThis;
})();
exports.HeatmapService = HeatmapService;
//# sourceMappingURL=heatmap.service.js.map