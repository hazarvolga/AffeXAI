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
exports.ResendWebhookController = void 0;
const common_1 = require("@nestjs/common");
const svix_1 = require("svix");
const webhook_event_interface_1 = require("../interfaces/webhook-event.interface");
/**
 * Resend webhook controller
 * Receives webhooks from Resend and processes them
 *
 * Setup in Resend dashboard:
 * 1. Go to Webhooks section
 * 2. Add endpoint: https://yourdomain.com/api/webhooks/resend
 * 3. Select events: email.delivered, email.bounced, email.complained, email.opened, email.clicked
 * 4. Copy signing secret to environment: RESEND_WEBHOOK_SECRET
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
            _handleWebhook_decorators = [(0, common_1.Post)()];
            __esDecorate(this, null, _handleWebhook_decorators, { kind: "method", name: "handleWebhook", static: false, private: false, access: { has: obj => "handleWebhook" in obj, get: obj => obj.handleWebhook }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ResendWebhookController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        webhookService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(ResendWebhookController.name);
        constructor(webhookService) {
            this.webhookService = webhookService;
        }
        async handleWebhook(svixId, svixTimestamp, svixSignature, payload) {
            // Verify webhook signature using Svix
            // Resend uses Svix for webhook delivery and signing
            const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
            if (!webhookSecret) {
                this.logger.error('RESEND_WEBHOOK_SECRET not configured');
                throw new common_1.BadRequestException('Webhook secret not configured');
            }
            // TODO: In production, enable signature verification
            // For development, we'll skip verification to test functionality
            if (process.env.NODE_ENV === 'production') {
                try {
                    const wh = new svix_1.Webhook(webhookSecret);
                    // Verify signature
                    wh.verify(JSON.stringify(payload), {
                        'svix-id': svixId,
                        'svix-timestamp': svixTimestamp,
                        'svix-signature': svixSignature,
                    });
                    this.logger.log(`Verified Resend webhook: ${payload.type} for ${payload.data.to[0]}`);
                }
                catch (err) {
                    this.logger.error(`Webhook signature verification failed: ${err.message}`);
                    throw new common_1.BadRequestException('Invalid signature');
                }
            }
            else {
                this.logger.warn('Development mode: Skipping webhook signature verification');
            }
            // Convert Resend payload to generic EmailWebhookEvent
            const event = this.mapResendToGenericEvent(payload);
            // Process event
            await this.webhookService.processWebhookEvent(event);
            return { success: true };
        }
        /**
         * Map Resend-specific webhook payload to generic EmailWebhookEvent
         */
        mapResendToGenericEvent(payload) {
            const eventTypeMap = {
                'email.delivered': webhook_event_interface_1.EmailWebhookEventType.DELIVERED,
                'email.bounced': webhook_event_interface_1.EmailWebhookEventType.BOUNCED,
                'email.complained': webhook_event_interface_1.EmailWebhookEventType.COMPLAINED,
                'email.opened': webhook_event_interface_1.EmailWebhookEventType.OPENED,
                'email.clicked': webhook_event_interface_1.EmailWebhookEventType.CLICKED,
                'email.delivery_delayed': webhook_event_interface_1.EmailWebhookEventType.DEFERRED,
            };
            const event = {
                provider: 'resend',
                eventType: eventTypeMap[payload.type] || webhook_event_interface_1.EmailWebhookEventType.DELIVERED,
                email: payload.data.to[0], // Resend sends array, we take first
                messageId: payload.data.email_id,
                timestamp: new Date(payload.created_at),
                rawPayload: payload,
            };
            // Map bounce reason if present
            if (payload.data.bounce) {
                event.reason = this.mapResendBounceReason(payload.data.bounce.message);
                event.metadata = {
                    bounceType: payload.data.bounce.type,
                    bounceMessage: payload.data.bounce.message,
                };
            }
            // Add click/open metadata
            if (payload.data.click) {
                event.metadata = {
                    link: payload.data.click.link,
                    ipAddress: payload.data.click.ipAddress,
                    userAgent: payload.data.click.userAgent,
                };
            }
            if (payload.data.open) {
                event.metadata = {
                    ipAddress: payload.data.open.ipAddress,
                    userAgent: payload.data.open.userAgent,
                };
            }
            return event;
        }
        /**
         * Map Resend bounce message to normalized bounce reason
         */
        mapResendBounceReason(message) {
            const lowerMessage = message.toLowerCase();
            if (lowerMessage.includes('mailbox') && lowerMessage.includes('not found')) {
                return webhook_event_interface_1.BounceReason.MAILBOX_NOT_FOUND;
            }
            if (lowerMessage.includes('domain') && lowerMessage.includes('not found')) {
                return webhook_event_interface_1.BounceReason.DOMAIN_NOT_FOUND;
            }
            if (lowerMessage.includes('mailbox full')) {
                return webhook_event_interface_1.BounceReason.MAILBOX_FULL;
            }
            if (lowerMessage.includes('message too large')) {
                return webhook_event_interface_1.BounceReason.MESSAGE_TOO_LARGE;
            }
            if (lowerMessage.includes('rejected')) {
                return webhook_event_interface_1.BounceReason.RECIPIENT_REJECTED;
            }
            if (lowerMessage.includes('blocked')) {
                return webhook_event_interface_1.BounceReason.BLOCKED;
            }
            return webhook_event_interface_1.BounceReason.UNKNOWN;
        }
    };
    return ResendWebhookController = _classThis;
})();
exports.ResendWebhookController = ResendWebhookController;
//# sourceMappingURL=resend-webhook.controller.js.map