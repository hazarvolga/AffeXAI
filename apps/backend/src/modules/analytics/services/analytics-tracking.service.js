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
exports.AnalyticsTrackingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AnalyticsTrackingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsTrackingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsTrackingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventRepository;
        sessionRepository;
        logger = new common_1.Logger(AnalyticsTrackingService.name);
        constructor(eventRepository, sessionRepository) {
            this.eventRepository = eventRepository;
            this.sessionRepository = sessionRepository;
        }
        /**
         * Track a single event
         */
        async trackEvent(dto) {
            try {
                const event = this.eventRepository.create({
                    componentId: dto.componentId,
                    componentType: dto.componentType,
                    interactionType: dto.interactionType,
                    sessionId: dto.sessionId,
                    userId: dto.userId || null,
                    pageUrl: dto.pageUrl,
                    deviceType: dto.deviceType,
                    browser: dto.browser || null,
                    viewportWidth: dto.viewport.width,
                    viewportHeight: dto.viewport.height,
                    coordinateX: dto.coordinates?.x || null,
                    coordinateY: dto.coordinates?.y || null,
                    relativeX: dto.coordinates?.relativeX || null,
                    relativeY: dto.coordinates?.relativeY || null,
                    metadata: dto.metadata || null,
                });
                const savedEvent = await this.eventRepository.save(event);
                // Update session interaction count
                await this.updateSessionInteractions(dto.sessionId);
                return savedEvent;
            }
            catch (error) {
                this.logger.error(`Failed to track event: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Track multiple events in batch (optimized)
         */
        async trackEventsBatch(dto) {
            try {
                // Create or update session if provided
                if (dto.session) {
                    await this.upsertSession(dto.session);
                }
                // Bulk insert events
                const events = dto.events.map((event) => this.eventRepository.create({
                    componentId: event.componentId,
                    componentType: event.componentType,
                    interactionType: event.interactionType,
                    sessionId: event.sessionId,
                    userId: event.userId || null,
                    pageUrl: event.pageUrl,
                    deviceType: event.deviceType,
                    browser: event.browser || null,
                    viewportWidth: event.viewport.width,
                    viewportHeight: event.viewport.height,
                    coordinateX: event.coordinates?.x || null,
                    coordinateY: event.coordinates?.y || null,
                    relativeX: event.coordinates?.relativeX || null,
                    relativeY: event.coordinates?.relativeY || null,
                    metadata: event.metadata || null,
                }));
                await this.eventRepository.save(events);
                // Update session interactions
                const uniqueSessionIds = [...new Set(dto.events.map((e) => e.sessionId))];
                await Promise.all(uniqueSessionIds.map((sessionId) => this.updateSessionInteractions(sessionId)));
                return { success: true, count: events.length };
            }
            catch (error) {
                this.logger.error(`Failed to track batch events: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Create or update session
         */
        async upsertSession(sessionData) {
            const existing = await this.sessionRepository.findOne({
                where: { id: sessionData.id },
            });
            if (existing) {
                return existing;
            }
            const session = this.sessionRepository.create({
                id: sessionData.id,
                startTime: sessionData.startTime,
                deviceType: sessionData.deviceType,
                browser: sessionData.browser || null,
                os: sessionData.os || null,
                pagesVisited: [],
                totalInteractions: 0,
            });
            return this.sessionRepository.save(session);
        }
        /**
         * Update session interaction count
         */
        async updateSessionInteractions(sessionId) {
            const count = await this.eventRepository.count({
                where: { sessionId },
            });
            await this.sessionRepository.update(sessionId, {
                totalInteractions: count,
            });
        }
        /**
         * Get events for a component
         */
        async getComponentEvents(componentId, startDate, endDate) {
            return this.eventRepository.find({
                where: {
                    componentId,
                    createdAt: (0, typeorm_1.Between)(startDate, endDate),
                },
                order: {
                    createdAt: 'DESC',
                },
            });
        }
        /**
         * Get events for a session
         */
        async getSessionEvents(sessionId) {
            return this.eventRepository.find({
                where: { sessionId },
                order: {
                    createdAt: 'ASC',
                },
            });
        }
        /**
         * Get session by ID
         */
        async getSession(sessionId) {
            return this.sessionRepository.findOne({
                where: { id: sessionId },
                relations: ['events'],
            });
        }
        /**
         * End a session
         */
        async endSession(sessionId, endTime) {
            const session = await this.sessionRepository.findOne({
                where: { id: sessionId },
            });
            if (!session) {
                return;
            }
            const duration = endTime.getTime() - session.startTime.getTime();
            await this.sessionRepository.update(sessionId, {
                endTime,
                duration,
            });
        }
        /**
         * Mark session as converted
         */
        async markSessionAsConverted(sessionId, conversionGoal) {
            await this.sessionRepository.update(sessionId, {
                converted: true,
                conversionGoal,
            });
        }
    };
    return AnalyticsTrackingService = _classThis;
})();
exports.AnalyticsTrackingService = AnalyticsTrackingService;
//# sourceMappingURL=analytics-tracking.service.js.map