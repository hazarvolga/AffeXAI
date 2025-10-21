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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const webhook_event_interface_1 = require("../interfaces/webhook-event.interface");
let WebhookService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WebhookService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WebhookService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        suppressionRepository;
        subscriberService;
        logger = new common_1.Logger(WebhookService.name);
        constructor(suppressionRepository, subscriberService) {
            this.suppressionRepository = suppressionRepository;
            this.subscriberService = subscriberService;
        }
        /**
         * Process incoming webhook event
         * Provider-agnostic - works with any email provider
         */
        async processWebhookEvent(event) {
            this.logger.log(`Processing webhook event: ${event.eventType} for ${event.email} from ${event.provider}`);
            switch (event.eventType) {
                case webhook_event_interface_1.EmailWebhookEventType.BOUNCED:
                case webhook_event_interface_1.EmailWebhookEventType.SOFT_BOUNCED:
                    await this.handleBounce(event);
                    break;
                case webhook_event_interface_1.EmailWebhookEventType.COMPLAINED:
                case webhook_event_interface_1.EmailWebhookEventType.SPAM:
                    await this.handleComplaint(event);
                    break;
                case webhook_event_interface_1.EmailWebhookEventType.UNSUBSCRIBED:
                    await this.handleUnsubscribe(event);
                    break;
                case webhook_event_interface_1.EmailWebhookEventType.DELIVERED:
                    await this.handleDelivery(event);
                    break;
                case webhook_event_interface_1.EmailWebhookEventType.OPENED:
                case webhook_event_interface_1.EmailWebhookEventType.CLICKED:
                    await this.handleEngagement(event);
                    break;
                default:
                    this.logger.debug(`Unhandled event type: ${event.eventType} for ${event.email}`);
            }
        }
        /**
         * Handle bounce events
         * Hard bounces -> permanent suppression + update subscriber
         * Soft bounces -> log but don't suppress yet
         */
        async handleBounce(event) {
            const isHardBounce = event.eventType === webhook_event_interface_1.EmailWebhookEventType.BOUNCED;
            this.logger.warn(`${isHardBounce ? 'Hard' : 'Soft'} bounce detected for ${event.email}: ${event.reason}`);
            if (isHardBounce) {
                // Hard bounce - permanent suppression
                await this.addToSuppressionList({
                    email: event.email,
                    reason: `Hard bounce: ${event.reason || 'unknown'}`,
                    provider: event.provider,
                    eventType: event.eventType,
                    bounceReason: event.reason,
                    suppressedAt: event.timestamp,
                    metadata: event.metadata,
                });
                // Update subscriber status to 'bounced'
                try {
                    const subscriber = await this.subscriberService.updateStatusFromWebhook(event.email, 'bounced', event.metadata);
                    if (subscriber) {
                        this.logger.log(`Updated subscriber ${event.email} status to 'bounced'`);
                    }
                    else {
                        this.logger.debug(`No subscriber found for ${event.email}, skipping status update`);
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to update subscriber status: ${error.message}`);
                }
            }
            else {
                // Soft bounce - just log for now
                // TODO: If same email soft bounces 3+ times, add to suppression
                this.logger.debug(`Soft bounce logged for ${event.email}, will monitor for repeated bounces`);
            }
        }
        /**
         * Handle complaint/spam events
         * Always add to suppression list + update subscriber
         */
        async handleComplaint(event) {
            this.logger.warn(`Complaint/spam reported for ${event.email} from ${event.provider}`);
            await this.addToSuppressionList({
                email: event.email,
                reason: `Complaint: ${event.eventType}`,
                provider: event.provider,
                eventType: event.eventType,
                suppressedAt: event.timestamp,
                metadata: event.metadata,
            });
            // Update subscriber status to 'complained'
            try {
                const subscriber = await this.subscriberService.updateStatusFromWebhook(event.email, 'complained', event.metadata);
                if (subscriber) {
                    this.logger.log(`Updated subscriber ${event.email} status to 'complained'`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to update subscriber status: ${error.message}`);
            }
        }
        /**
         * Handle unsubscribe events
         */
        async handleUnsubscribe(event) {
            this.logger.log(`Unsubscribe detected for ${event.email}`);
            await this.addToSuppressionList({
                email: event.email,
                reason: 'Unsubscribed via email link',
                provider: event.provider,
                eventType: event.eventType,
                suppressedAt: event.timestamp,
                metadata: event.metadata,
            });
            // Update subscriber status to 'unsubscribed'
            try {
                const subscriber = await this.subscriberService.updateStatusFromWebhook(event.email, 'unsubscribed', event.metadata);
                if (subscriber) {
                    this.logger.log(`Updated subscriber ${event.email} status to 'unsubscribed'`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to update subscriber status: ${error.message}`);
            }
        }
        /**
         * Handle successful delivery
         */
        async handleDelivery(event) {
            this.logger.debug(`Email delivered successfully to ${event.email}`);
            // TODO: Update email campaign stats, delivery count, etc.
        }
        /**
         * Handle engagement events (open, click)
         */
        async handleEngagement(event) {
            this.logger.debug(`${event.eventType} event for ${event.email} at ${event.timestamp}`);
            // TODO: Update email campaign stats, engagement metrics
        }
        /**
         * Add email to suppression list
         * Prevents future emails to this address
         */
        async addToSuppressionList(data) {
            try {
                // Check if already suppressed
                const existing = await this.suppressionRepository.findOne({
                    where: { email: data.email },
                });
                if (existing) {
                    this.logger.debug(`Email ${data.email} already in suppression list, updating...`);
                    await this.suppressionRepository.update(existing.id, data);
                }
                else {
                    this.logger.log(`Adding ${data.email} to suppression list`);
                    await this.suppressionRepository.save(data);
                }
            }
            catch (error) {
                this.logger.error(`Failed to add ${data.email} to suppression list: ${error.message}`);
            }
        }
        /**
         * Check if email is suppressed
         * Use this before sending any email
         */
        async isEmailSuppressed(email) {
            const suppressed = await this.suppressionRepository.findOne({
                where: { email },
            });
            return !!suppressed;
        }
        /**
         * Get suppression details for an email
         */
        async getSuppressionDetails(email) {
            return await this.suppressionRepository.findOne({
                where: { email },
            });
        }
        /**
         * Remove email from suppression list (admin override)
         */
        async removeFromSuppressionList(email) {
            await this.suppressionRepository.delete({ email });
            this.logger.log(`Removed ${email} from suppression list`);
        }
        /**
         * Get all suppressed emails (for admin dashboard)
         */
        async getAllSuppressedEmails() {
            return await this.suppressionRepository.find({
                order: { suppressedAt: 'DESC' },
            });
        }
    };
    return WebhookService = _classThis;
})();
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map