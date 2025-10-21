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
exports.EventBusService = void 0;
const common_1 = require("@nestjs/common");
const platform_event_entity_1 = require("../entities/platform-event.entity");
/**
 * EventBus Service
 *
 * Central event management system for the entire platform.
 * Handles event publishing, logging, and triggering automation rules.
 *
 * Features:
 * - Event logging to database
 * - Event broadcasting to subscribers
 * - Automatic automation rule triggering
 * - Event filtering and querying
 * - Real-time event streaming
 */
let EventBusService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventBusService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EventBusService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        eventRepository;
        ruleRepository;
        eventEmitter;
        logger = new common_1.Logger(EventBusService.name);
        constructor(eventRepository, ruleRepository, eventEmitter) {
            this.eventRepository = eventRepository;
            this.ruleRepository = ruleRepository;
            this.eventEmitter = eventEmitter;
        }
        /**
         * Publish an event to the platform
         *
         * This is the main entry point for all platform events.
         *
         * @param source - Module that generated the event
         * @param eventType - Type of event
         * @param payload - Event data
         * @param metadata - Additional context (userId, ip, userAgent, etc.)
         * @returns Created event entity
         */
        async publish(source, eventType, payload, metadata) {
            try {
                // Create event record
                const event = this.eventRepository.create({
                    source,
                    eventType,
                    payload,
                    metadata,
                    triggeredRules: [], // Will be populated when rules trigger
                });
                // Save to database
                const savedEvent = await this.eventRepository.save(event);
                this.logger.log(`Event published: ${eventType} from ${source}`, { eventId: savedEvent.id });
                // Emit event to EventEmitter2 for real-time subscribers
                this.eventEmitter.emit(eventType, {
                    event: savedEvent,
                    payload,
                    metadata,
                });
                // Also emit a generic event for all-event listeners
                this.eventEmitter.emit('platform.event', {
                    event: savedEvent,
                    payload,
                    metadata,
                });
                // Trigger automation rules asynchronously
                // Don't await to avoid blocking the event publishing
                this.triggerAutomationRules(savedEvent).catch((error) => {
                    this.logger.error(`Failed to trigger automation rules for event ${savedEvent.id}`, error.stack);
                });
                return savedEvent;
            }
            catch (error) {
                this.logger.error(`Failed to publish event: ${eventType} from ${source}`, error.stack);
                throw error;
            }
        }
        /**
         * Trigger automation rules for an event
         *
         * Finds all active rules matching the event type,
         * checks conditions, and triggers matching rules.
         *
         * @param event - Platform event
         */
        async triggerAutomationRules(event) {
            try {
                // Find all active rules for this event type
                const rules = await this.ruleRepository.find({
                    where: {
                        triggerEventType: event.eventType,
                        isActive: true,
                    },
                    order: {
                        priority: 'DESC', // Higher priority first
                    },
                });
                if (rules.length === 0) {
                    this.logger.debug(`No automation rules found for event type: ${event.eventType}`);
                    return;
                }
                this.logger.log(`Found ${rules.length} potential automation rules for event ${event.id}`);
                // Check which rules should trigger
                const triggeredRuleIds = [];
                for (const rule of rules) {
                    if (rule.shouldTrigger(event)) {
                        triggeredRuleIds.push(rule.id);
                        // Emit automation trigger event
                        // The AutomationExecutor service will listen to this
                        this.eventEmitter.emit('automation.trigger', {
                            rule,
                            event,
                        });
                        this.logger.log(`Automation rule triggered: ${rule.name} (${rule.id})`, { eventId: event.id, ruleId: rule.id });
                    }
                }
                // Update event with triggered rule IDs
                if (triggeredRuleIds.length > 0) {
                    await this.eventRepository.update(event.id, {
                        triggeredRules: triggeredRuleIds,
                    });
                }
            }
            catch (error) {
                this.logger.error(`Failed to trigger automation rules for event ${event.id}`, error.stack);
                // Don't throw - we don't want to fail the event publishing
            }
        }
        /**
         * Get events by type
         */
        async getEventsByType(eventType, limit = 100) {
            return this.eventRepository.find({
                where: { eventType },
                order: { createdAt: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get events by source module
         */
        async getEventsBySource(source, limit = 100) {
            return this.eventRepository.find({
                where: { source },
                order: { createdAt: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get recent events
         */
        async getRecentEvents(limit = 100) {
            return this.eventRepository.find({
                order: { createdAt: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get events that triggered automation rules
         */
        async getEventsWithAutomation(limit = 100) {
            return this.eventRepository
                .createQueryBuilder('event')
                .where("array_length(event.triggered_rules, 1) > 0")
                .orderBy('event.created_at', 'DESC')
                .limit(limit)
                .getMany();
        }
        /**
         * Get event statistics
         */
        async getEventStats(startDate, endDate) {
            const query = this.eventRepository.createQueryBuilder('event');
            if (startDate) {
                query.andWhere('event.created_at >= :startDate', { startDate });
            }
            if (endDate) {
                query.andWhere('event.created_at <= :endDate', { endDate });
            }
            const events = await query.getMany();
            const eventsByType = {};
            const eventsBySource = {};
            let eventsWithAutomation = 0;
            events.forEach((event) => {
                // Count by type
                eventsByType[event.eventType] = (eventsByType[event.eventType] || 0) + 1;
                // Count by source
                eventsBySource[event.source] = (eventsBySource[event.source] || 0) + 1;
                // Count events with automation
                if (event.triggeredRules && event.triggeredRules.length > 0) {
                    eventsWithAutomation++;
                }
            });
            return {
                totalEvents: events.length,
                eventsByType,
                eventsBySource,
                eventsWithAutomation,
            };
        }
        /**
         * Subscribe to events in real-time
         *
         * @param eventType - Event type to subscribe to (or 'platform.event' for all)
         * @param callback - Function to call when event occurs
         * @returns Unsubscribe function
         */
        subscribe(eventType, callback) {
            this.eventEmitter.on(eventType, callback);
            // Return unsubscribe function
            return () => {
                this.eventEmitter.off(eventType, callback);
            };
        }
        /**
         * Publish event helper methods for common event types
         */
        // Events Module
        async publishEventCreated(eventId, eventData, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.EVENTS, platform_event_entity_1.PlatformEventType.EVENT_CREATED, { eventId, ...eventData }, { userId });
        }
        async publishEventPublished(eventId, eventData, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.EVENTS, platform_event_entity_1.PlatformEventType.EVENT_PUBLISHED, { eventId, ...eventData }, { userId });
        }
        async publishEventCancelled(eventId, reason, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.EVENTS, platform_event_entity_1.PlatformEventType.EVENT_CANCELLED, { eventId, reason }, { userId });
        }
        // Email Marketing Module
        async publishCampaignSent(campaignId, recipientCount, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.EMAIL_MARKETING, platform_event_entity_1.PlatformEventType.CAMPAIGN_SENT, { campaignId, recipientCount }, { userId });
        }
        async publishSubscriberAdded(subscriberId, email, source) {
            return this.publish(platform_event_entity_1.ModuleSource.EMAIL_MARKETING, platform_event_entity_1.PlatformEventType.SUBSCRIBER_ADDED, { subscriberId, email, source });
        }
        // Certificates Module
        async publishCertificateIssued(certificateId, userId, eventId) {
            return this.publish(platform_event_entity_1.ModuleSource.CERTIFICATES, platform_event_entity_1.PlatformEventType.CERTIFICATE_ISSUED, { certificateId, userId, eventId });
        }
        // CMS Module
        async publishPagePublished(pageId, slug, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.CMS, platform_event_entity_1.PlatformEventType.PAGE_PUBLISHED, { pageId, slug }, { userId });
        }
        // Media Module
        async publishMediaUploaded(mediaId, fileName, fileSize, userId) {
            return this.publish(platform_event_entity_1.ModuleSource.MEDIA, platform_event_entity_1.PlatformEventType.MEDIA_UPLOADED, { mediaId, fileName, fileSize }, { userId });
        }
    };
    return EventBusService = _classThis;
})();
exports.EventBusService = EventBusService;
//# sourceMappingURL=event-bus.service.js.map