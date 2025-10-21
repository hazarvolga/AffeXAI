"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BounceReason = exports.EmailWebhookEventType = void 0;
/**
 * Generic webhook event types - provider-agnostic
 */
var EmailWebhookEventType;
(function (EmailWebhookEventType) {
    // Delivery events
    EmailWebhookEventType["DELIVERED"] = "delivered";
    EmailWebhookEventType["BOUNCED"] = "bounced";
    EmailWebhookEventType["SOFT_BOUNCED"] = "soft_bounced";
    // Engagement events
    EmailWebhookEventType["OPENED"] = "opened";
    EmailWebhookEventType["CLICKED"] = "clicked";
    // Complaint events
    EmailWebhookEventType["COMPLAINED"] = "complained";
    EmailWebhookEventType["SPAM"] = "spam";
    EmailWebhookEventType["UNSUBSCRIBED"] = "unsubscribed";
    // Other
    EmailWebhookEventType["DROPPED"] = "dropped";
    EmailWebhookEventType["DEFERRED"] = "deferred";
})(EmailWebhookEventType || (exports.EmailWebhookEventType = EmailWebhookEventType = {}));
/**
 * Bounce reasons - normalized across providers
 */
var BounceReason;
(function (BounceReason) {
    // Hard bounces (permanent)
    BounceReason["MAILBOX_NOT_FOUND"] = "mailbox_not_found";
    BounceReason["DOMAIN_NOT_FOUND"] = "domain_not_found";
    BounceReason["RECIPIENT_REJECTED"] = "recipient_rejected";
    // Soft bounces (temporary)
    BounceReason["MAILBOX_FULL"] = "mailbox_full";
    BounceReason["MESSAGE_TOO_LARGE"] = "message_too_large";
    BounceReason["TEMPORARY_FAILURE"] = "temporary_failure";
    // Other
    BounceReason["BLOCKED"] = "blocked";
    BounceReason["UNKNOWN"] = "unknown";
})(BounceReason || (exports.BounceReason = BounceReason = {}));
//# sourceMappingURL=webhook-event.interface.js.map