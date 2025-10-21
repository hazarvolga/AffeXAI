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
exports.ResendWebhookController = exports.ResendWebhookEvent = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
/**
 * Resend Webhook Events
 */
var ResendWebhookEvent;
(function (ResendWebhookEvent) {
    ResendWebhookEvent["EMAIL_SENT"] = "email.sent";
    ResendWebhookEvent["EMAIL_DELIVERED"] = "email.delivered";
    ResendWebhookEvent["EMAIL_DELIVERY_DELAYED"] = "email.delivery_delayed";
    ResendWebhookEvent["EMAIL_COMPLAINED"] = "email.complained";
    ResendWebhookEvent["EMAIL_BOUNCED"] = "email.bounced";
    ResendWebhookEvent["EMAIL_OPENED"] = "email.opened";
    ResendWebhookEvent["EMAIL_CLICKED"] = "email.clicked";
})(ResendWebhookEvent || (exports.ResendWebhookEvent = ResendWebhookEvent = {}));
/**
 * Resend Webhook Controller
 * Handles incoming webhooks from Resend for email events
 */
let ResendWebhookController = (() => {
    let _classDecorators = [(0, common_1.Controller)('webhooks/resend')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleWebhook_decorators;
    var ResendWebhookController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleWebhook_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            __esDecorate(this, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: obj => "handleWebhook" in obj, get: obj => obj.handleWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ResendWebhookController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = (__runInitializers(this, _instanceExtraInitializers), new common_1.Logger(ResendWebhookController.name));
        webhookSecret;
        constructor() {
            this.webhookSecret = process.env.RESEND_WEBHOOK_SECRET || '';
            if (!this.webhookSecret) {
                this.logger.warn('⚠️  RESEND_WEBHOOK_SECRET not set. Webhook signature verification disabled!');
            }
        }
        /**
         * Resend webhook endpoint
         * URL to configure in Resend: https://your-domain.com/api/webhooks/resend
         */
        async handleWebhook(payload, signature) {
            this.logger.log(`Received webhook: ${payload.type} for email ${payload.data.email_id}`);
            // Verify webhook signature
            if (this.webhookSecret && !this.verifySignature(payload, signature)) {
                this.logger.error('Invalid webhook signature');
                throw new common_1.BadRequestException('Invalid signature');
            }
            // Handle different event types
            try {
                switch (payload.type) {
                    case ResendWebhookEvent.EMAIL_SENT:
                        await this.handleEmailSent(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_DELIVERED:
                        await this.handleEmailDelivered(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_DELIVERY_DELAYED:
                        await this.handleEmailDelayed(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_BOUNCED:
                        await this.handleEmailBounced(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_COMPLAINED:
                        await this.handleEmailComplained(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_OPENED:
                        await this.handleEmailOpened(payload);
                        break;
                    case ResendWebhookEvent.EMAIL_CLICKED:
                        await this.handleEmailClicked(payload);
                        break;
                    default:
                        this.logger.warn(`Unknown webhook event: ${payload.type}`);
                }
                return { success: true, message: 'Webhook processed' };
            }
            catch (error) {
                this.logger.error(`Error processing webhook: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Verify webhook signature from Resend
         */
        verifySignature(payload, signature) {
            if (!signature) {
                return false;
            }
            try {
                const payloadString = JSON.stringify(payload);
                const expectedSignature = (0, crypto_1.createHmac)('sha256', this.webhookSecret)
                    .update(payloadString)
                    .digest('hex');
                return signature === expectedSignature;
            }
            catch (error) {
                this.logger.error('Signature verification failed', error);
                return false;
            }
        }
        /**
         * Handle email sent event
         */
        async handleEmailSent(payload) {
            this.logger.log(`Email sent: ${payload.data.email_id} to ${payload.data.to.join(', ')}`);
            // TODO: Update EmailLog table with sent status
            // await this.emailLogService.updateStatus(payload.data.email_id, 'sent');
        }
        /**
         * Handle email delivered event
         */
        async handleEmailDelivered(payload) {
            this.logger.log(`Email delivered: ${payload.data.email_id}`);
            // TODO: Update EmailLog table with delivered status
            // await this.emailLogService.updateStatus(payload.data.email_id, 'delivered');
        }
        /**
         * Handle email delayed event
         */
        async handleEmailDelayed(payload) {
            this.logger.warn(`Email delivery delayed: ${payload.data.email_id}`);
            // TODO: Log delay, retry after some time
            // await this.emailLogService.updateStatus(payload.data.email_id, 'delayed');
        }
        /**
         * Handle email bounced event (CRITICAL)
         */
        async handleEmailBounced(payload) {
            const { email_id, to, bounce_type, bounce_reason } = payload.data;
            this.logger.error(`Email bounced: ${email_id} to ${to.join(', ')} | Type: ${bounce_type} | Reason: ${bounce_reason}`);
            // TODO: Implement bounce handling logic
            // 1. Update EmailLog table with bounced status
            // await this.emailLogService.updateStatus(email_id, 'bounced', { bounce_type, bounce_reason });
            // 2. Hard bounce: Mark subscriber as invalid (stop sending)
            if (bounce_type === 'hard') {
                for (const email of to) {
                    this.logger.warn(`Hard bounce detected for ${email}. Marking as invalid.`);
                    // TODO: Mark subscriber as invalid
                    // await this.subscriberService.markAsInvalid(email, 'hard_bounce', bounce_reason);
                    // TODO: Add to suppression list
                    // await this.suppressionListService.add(email, 'bounce', bounce_reason);
                }
            }
            // 3. Soft bounce: Increment retry count, temporary issue
            if (bounce_type === 'soft') {
                for (const email of to) {
                    this.logger.log(`Soft bounce for ${email}. Will retry later.`);
                    // TODO: Increment bounce count
                    // await this.subscriberService.incrementBounceCount(email);
                    // TODO: If bounce count > threshold (e.g., 5), mark as invalid
                    // const bounceCount = await this.subscriberService.getBounceCount(email);
                    // if (bounceCount >= 5) {
                    //   await this.subscriberService.markAsInvalid(email, 'soft_bounce_threshold', bounce_reason);
                    // }
                }
            }
        }
        /**
         * Handle email complained event (CRITICAL)
         */
        async handleEmailComplained(payload) {
            const { email_id, to, complaint_feedback_type } = payload.data;
            this.logger.error(`Email complaint: ${email_id} from ${to.join(', ')} | Feedback: ${complaint_feedback_type}`);
            // TODO: Implement complaint handling logic
            // 1. Update EmailLog table with complained status
            // await this.emailLogService.updateStatus(email_id, 'complained', { complaint_feedback_type });
            // 2. Mark subscriber as complained (IMMEDIATELY stop sending)
            for (const email of to) {
                this.logger.warn(`Spam complaint from ${email}. Immediately unsubscribing.`);
                // TODO: Mark subscriber as complained/unsubscribed
                // await this.subscriberService.markAsComplained(email, complaint_feedback_type);
                // TODO: Add to suppression list (NEVER send again)
                // await this.suppressionListService.add(email, 'complaint', complaint_feedback_type);
                // TODO: Update subscriber status to COMPLAINED
                // await this.subscriberService.updateStatus(email, SubscriberStatus.COMPLAINED);
            }
        }
        /**
         * Handle email opened event
         */
        async handleEmailOpened(payload) {
            this.logger.log(`Email opened: ${payload.data.email_id}`);
            // TODO: Track open event for analytics
            // await this.emailLogService.incrementOpenCount(payload.data.email_id);
            // await this.campaignService.incrementOpenCount(campaignId);
        }
        /**
         * Handle email clicked event
         */
        async handleEmailClicked(payload) {
            this.logger.log(`Email link clicked: ${payload.data.email_id}`);
            // TODO: Track click event for analytics
            // await this.emailLogService.incrementClickCount(payload.data.email_id);
            // await this.campaignService.incrementClickCount(campaignId);
        }
    };
    return ResendWebhookController = _classThis;
})();
exports.ResendWebhookController = ResendWebhookController;
//# sourceMappingURL=resend-webhook.controller.js.map