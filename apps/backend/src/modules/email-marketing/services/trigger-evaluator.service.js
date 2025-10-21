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
exports.TriggerEvaluatorService = exports.TriggerEvent = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const email_automation_entity_1 = require("../entities/email-automation.entity");
const automation_trigger_entity_1 = require("../entities/automation-trigger.entity");
const automation_queue_1 = require("../queues/automation.queue");
/**
 * Trigger Event Types
 */
var TriggerEvent;
(function (TriggerEvent) {
    TriggerEvent["SUBSCRIBER_CREATED"] = "subscriber.created";
    TriggerEvent["SUBSCRIBER_UPDATED"] = "subscriber.updated";
    TriggerEvent["SUBSCRIBER_SEGMENT_ADDED"] = "subscriber.segment_added";
    TriggerEvent["SUBSCRIBER_SEGMENT_REMOVED"] = "subscriber.segment_removed";
    TriggerEvent["EMAIL_OPENED"] = "email.opened";
    TriggerEvent["EMAIL_CLICKED"] = "email.clicked";
    TriggerEvent["PURCHASE_MADE"] = "purchase.made";
    TriggerEvent["CART_ABANDONED"] = "cart.abandoned";
    TriggerEvent["PRODUCT_VIEWED"] = "product.viewed";
})(TriggerEvent || (exports.TriggerEvent = TriggerEvent = {}));
/**
 * Trigger Evaluator Service
 * Evaluates automation triggers and registers subscribers
 */
let TriggerEvaluatorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _evaluateBehaviorTriggers_decorators;
    let _evaluateTimeBasedTriggers_decorators;
    var TriggerEvaluatorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _evaluateBehaviorTriggers_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            _evaluateTimeBasedTriggers_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT)];
            __esDecorate(this, null, _evaluateBehaviorTriggers_decorators, { kind: "method", name: "evaluateBehaviorTriggers", static: false, private: false, access: { has: obj => "evaluateBehaviorTriggers" in obj, get: obj => obj.evaluateBehaviorTriggers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _evaluateTimeBasedTriggers_decorators, { kind: "method", name: "evaluateTimeBasedTriggers", static: false, private: false, access: { has: obj => "evaluateTimeBasedTriggers" in obj, get: obj => obj.evaluateTimeBasedTriggers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TriggerEvaluatorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        automationRepo = __runInitializers(this, _instanceExtraInitializers);
        triggerRepo;
        subscriberRepo;
        segmentRepo;
        queueService;
        logger = new common_1.Logger(TriggerEvaluatorService.name);
        constructor(automationRepo, triggerRepo, subscriberRepo, segmentRepo, queueService) {
            this.automationRepo = automationRepo;
            this.triggerRepo = triggerRepo;
            this.subscriberRepo = subscriberRepo;
            this.segmentRepo = segmentRepo;
            this.queueService = queueService;
        }
        /**
         * Evaluate event-based triggers
         */
        async evaluateEventTrigger(event, subscriberId, eventData = {}) {
            this.logger.log(`Evaluating event trigger: ${event} for subscriber ${subscriberId}`);
            // Find active automations with this event trigger
            const automations = await this.automationRepo.find({
                where: {
                    status: email_automation_entity_1.AutomationStatus.ACTIVE,
                    isActive: true,
                    triggerType: email_automation_entity_1.TriggerType.EVENT,
                },
            });
            for (const automation of automations) {
                const config = automation.triggerConfig;
                // Check if event matches
                if (!config.events || !config.events.includes(event)) {
                    continue;
                }
                // Check segment targeting
                if (automation.segmentId) {
                    const subscriber = await this.subscriberRepo.findOne({
                        where: { id: subscriberId },
                    });
                    if (!subscriber || !subscriber.segments?.includes(automation.segmentId)) {
                        continue;
                    }
                }
                // Evaluate conditions
                if (config.conditions && config.conditions.length > 0) {
                    const conditionsMet = await this.evaluateConditions(config.conditions, subscriberId, eventData);
                    if (!conditionsMet) {
                        continue;
                    }
                }
                // Check if subscriber already has a trigger for this automation
                const existingTrigger = await this.triggerRepo.findOne({
                    where: {
                        automationId: automation.id,
                        subscriberId,
                        status: automation_trigger_entity_1.TriggerStatus.PENDING,
                    },
                });
                if (existingTrigger) {
                    this.logger.debug(`Trigger already exists for automation ${automation.id}`);
                    continue;
                }
                // Create trigger
                await this.createTrigger(automation.id, subscriberId, event, eventData);
            }
        }
        /**
         * Evaluate behavior-based triggers (runs on cron)
         */
        async evaluateBehaviorTriggers() {
            this.logger.log('Evaluating behavior triggers...');
            const automations = await this.automationRepo.find({
                where: {
                    status: email_automation_entity_1.AutomationStatus.ACTIVE,
                    isActive: true,
                    triggerType: email_automation_entity_1.TriggerType.BEHAVIOR,
                },
            });
            for (const automation of automations) {
                const config = automation.triggerConfig;
                switch (config.behaviorType) {
                    case 'cart_abandonment':
                        await this.evaluateCartAbandonment(automation, config);
                        break;
                    case 'inactive_subscriber':
                        await this.evaluateInactiveSubscribers(automation, config);
                        break;
                    case 'browsing_pattern':
                        await this.evaluateBrowsingPattern(automation, config);
                        break;
                }
            }
        }
        /**
         * Evaluate time-based triggers (runs daily)
         */
        async evaluateTimeBasedTriggers() {
            this.logger.log('Evaluating time-based triggers...');
            const automations = await this.automationRepo.find({
                where: {
                    status: email_automation_entity_1.AutomationStatus.ACTIVE,
                    isActive: true,
                    triggerType: email_automation_entity_1.TriggerType.TIME_BASED,
                },
            });
            for (const automation of automations) {
                const config = automation.triggerConfig;
                switch (config.schedule) {
                    case 'daily':
                        await this.evaluateDailyTriggers(automation, config);
                        break;
                    case 'weekly':
                        await this.evaluateWeeklyTriggers(automation, config);
                        break;
                    case 'monthly':
                        await this.evaluateMonthlyTriggers(automation, config);
                        break;
                    case 'birthday':
                        await this.evaluateBirthdayTriggers(automation, config);
                        break;
                    case 'anniversary':
                        await this.evaluateAnniversaryTriggers(automation, config);
                        break;
                }
            }
        }
        /**
         * Evaluate attribute change triggers
         */
        async evaluateAttributeTrigger(subscriberId, attribute, oldValue, newValue) {
            this.logger.log(`Evaluating attribute trigger: ${attribute} changed from ${oldValue} to ${newValue}`);
            const automations = await this.automationRepo.find({
                where: {
                    status: email_automation_entity_1.AutomationStatus.ACTIVE,
                    isActive: true,
                    triggerType: email_automation_entity_1.TriggerType.ATTRIBUTE,
                },
            });
            for (const automation of automations) {
                const config = automation.triggerConfig;
                // Check if attribute matches
                if (config.attribute !== attribute) {
                    continue;
                }
                // Check change type
                let triggered = false;
                switch (config.changeType) {
                    case 'any':
                        triggered = oldValue !== newValue;
                        break;
                    case 'specific':
                        triggered =
                            oldValue === config.oldValue && newValue === config.newValue;
                        break;
                    case 'increased':
                        triggered =
                            typeof oldValue === 'number' &&
                                typeof newValue === 'number' &&
                                newValue > oldValue;
                        break;
                    case 'decreased':
                        triggered =
                            typeof oldValue === 'number' &&
                                typeof newValue === 'number' &&
                                newValue < oldValue;
                        break;
                }
                if (!triggered) {
                    continue;
                }
                // Create trigger
                await this.createTrigger(automation.id, subscriberId, email_automation_entity_1.TriggerType.ATTRIBUTE, {
                    attribute,
                    oldValue,
                    newValue,
                });
            }
        }
        /**
         * Private: Create trigger
         */
        async createTrigger(automationId, subscriberId, triggerType, triggerData = {}) {
            const trigger = this.triggerRepo.create({
                automationId,
                subscriberId,
                triggerType: triggerType,
                triggerData,
                status: automation_trigger_entity_1.TriggerStatus.PENDING,
            });
            const saved = await this.triggerRepo.save(trigger);
            this.logger.log(`Created trigger ${saved.id} for automation ${automationId}`);
            // Add to queue for processing
            await this.queueService.addProcessTriggerJob({
                triggerId: saved.id,
                automationId,
                subscriberId,
                triggerType,
                triggerData,
            }, automation_queue_1.AutomationJobPriority.NORMAL);
            return saved;
        }
        /**
         * Private: Evaluate conditions
         */
        async evaluateConditions(conditions, subscriberId, eventData) {
            const subscriber = await this.subscriberRepo.findOne({
                where: { id: subscriberId },
            });
            if (!subscriber)
                return false;
            for (const condition of conditions) {
                const value = eventData[condition.field] || subscriber[condition.field];
                switch (condition.operator) {
                    case 'equals':
                        if (value !== condition.value)
                            return false;
                        break;
                    case 'not_equals':
                        if (value === condition.value)
                            return false;
                        break;
                    case 'contains':
                        if (typeof value !== 'string' ||
                            !value.includes(condition.value)) {
                            return false;
                        }
                        break;
                    case 'greater_than':
                        if (typeof value !== 'number' || value <= condition.value) {
                            return false;
                        }
                        break;
                    case 'less_than':
                        if (typeof value !== 'number' || value >= condition.value) {
                            return false;
                        }
                        break;
                }
            }
            return true;
        }
        /**
         * Private: Evaluate cart abandonment
         */
        async evaluateCartAbandonment(automation, config) {
            // This would integrate with your e-commerce system
            // For now, it's a placeholder
            this.logger.debug(`Evaluating cart abandonment for automation ${automation.id}`);
        }
        /**
         * Private: Evaluate inactive subscribers
         */
        async evaluateInactiveSubscribers(automation, config) {
            const cutoffDate = new Date();
            cutoffDate.setMinutes(cutoffDate.getMinutes() - config.timeWindow);
            // Find subscribers who haven't opened emails in timeWindow
            const subscribers = await this.subscriberRepo
                .createQueryBuilder('subscriber')
                .leftJoin('email_logs', 'log', 'log.subscriberId = subscriber.id')
                .where('subscriber.status = :status', { status: 'active' })
                .andWhere('(log.openedAt IS NULL OR log.openedAt < :cutoffDate)', { cutoffDate })
                .getMany();
            for (const subscriber of subscribers) {
                await this.createTrigger(automation.id, subscriber.id, email_automation_entity_1.TriggerType.BEHAVIOR, {
                    behaviorType: 'inactive_subscriber',
                    inactiveDays: Math.floor(config.timeWindow / (60 * 24)),
                });
            }
        }
        /**
         * Private: Evaluate browsing pattern
         */
        async evaluateBrowsingPattern(automation, config) {
            // Placeholder for browsing pattern evaluation
            this.logger.debug(`Evaluating browsing pattern for automation ${automation.id}`);
        }
        /**
         * Private: Evaluate daily triggers
         */
        async evaluateDailyTriggers(automation, config) {
            const subscribers = await this.getTargetSubscribers(automation);
            for (const subscriber of subscribers) {
                const scheduledFor = this.calculateScheduleTime(config.time || '09:00');
                await this.createScheduledTrigger(automation.id, subscriber.id, scheduledFor);
            }
        }
        /**
         * Private: Evaluate weekly triggers
         */
        async evaluateWeeklyTriggers(automation, config) {
            const today = new Date().getDay();
            if (config.dayOfWeek !== undefined && today !== config.dayOfWeek) {
                return;
            }
            const subscribers = await this.getTargetSubscribers(automation);
            for (const subscriber of subscribers) {
                const scheduledFor = this.calculateScheduleTime(config.time || '09:00');
                await this.createScheduledTrigger(automation.id, subscriber.id, scheduledFor);
            }
        }
        /**
         * Private: Evaluate monthly triggers
         */
        async evaluateMonthlyTriggers(automation, config) {
            const today = new Date().getDate();
            if (config.dayOfMonth !== undefined && today !== config.dayOfMonth) {
                return;
            }
            const subscribers = await this.getTargetSubscribers(automation);
            for (const subscriber of subscribers) {
                const scheduledFor = this.calculateScheduleTime(config.time || '09:00');
                await this.createScheduledTrigger(automation.id, subscriber.id, scheduledFor);
            }
        }
        /**
         * Private: Evaluate birthday triggers
         */
        async evaluateBirthdayTriggers(automation, config) {
            const today = new Date();
            const targetDate = new Date(today);
            targetDate.setDate(targetDate.getDate() + (config.offsetDays || 0));
            const subscribers = await this.subscriberRepo
                .createQueryBuilder('subscriber')
                .where('EXTRACT(MONTH FROM subscriber.birthday) = :month', {
                month: targetDate.getMonth() + 1,
            })
                .andWhere('EXTRACT(DAY FROM subscriber.birthday) = :day', {
                day: targetDate.getDate(),
            })
                .getMany();
            for (const subscriber of subscribers) {
                const scheduledFor = this.calculateScheduleTime(config.time || '09:00');
                await this.createScheduledTrigger(automation.id, subscriber.id, scheduledFor);
            }
        }
        /**
         * Private: Evaluate anniversary triggers
         */
        async evaluateAnniversaryTriggers(automation, config) {
            const today = new Date();
            const targetDate = new Date(today);
            targetDate.setDate(targetDate.getDate() + (config.offsetDays || 0));
            const subscribers = await this.subscriberRepo
                .createQueryBuilder('subscriber')
                .where(`EXTRACT(MONTH FROM subscriber.${config.dateField}) = :month`, {
                month: targetDate.getMonth() + 1,
            })
                .andWhere(`EXTRACT(DAY FROM subscriber.${config.dateField}) = :day`, {
                day: targetDate.getDate(),
            })
                .getMany();
            for (const subscriber of subscribers) {
                const scheduledFor = this.calculateScheduleTime(config.time || '09:00');
                await this.createScheduledTrigger(automation.id, subscriber.id, scheduledFor);
            }
        }
        /**
         * Private: Get target subscribers for automation
         */
        async getTargetSubscribers(automation) {
            if (automation.segmentId) {
                return this.subscriberRepo
                    .createQueryBuilder('subscriber')
                    .where('subscriber.status = :status', { status: 'active' })
                    .andWhere(':segmentId = ANY(subscriber.segments)', {
                    segmentId: automation.segmentId,
                })
                    .getMany();
            }
            return this.subscriberRepo.find({ where: { status: 'active' } });
        }
        /**
         * Private: Create scheduled trigger
         */
        async createScheduledTrigger(automationId, subscriberId, scheduledFor) {
            const existing = await this.triggerRepo.findOne({
                where: {
                    automationId,
                    subscriberId,
                    scheduledFor,
                    status: automation_trigger_entity_1.TriggerStatus.SCHEDULED,
                },
            });
            if (existing) {
                return;
            }
            const trigger = this.triggerRepo.create({
                automationId,
                subscriberId,
                triggerType: email_automation_entity_1.TriggerType.TIME_BASED,
                triggerData: {},
                status: automation_trigger_entity_1.TriggerStatus.SCHEDULED,
                scheduledFor,
            });
            await this.triggerRepo.save(trigger);
        }
        /**
         * Private: Calculate schedule time
         */
        calculateScheduleTime(time) {
            const [hours, minutes] = time.split(':').map(Number);
            const scheduledFor = new Date();
            scheduledFor.setHours(hours, minutes, 0, 0);
            return scheduledFor;
        }
    };
    return TriggerEvaluatorService = _classThis;
})();
exports.TriggerEvaluatorService = TriggerEvaluatorService;
//# sourceMappingURL=trigger-evaluator.service.js.map