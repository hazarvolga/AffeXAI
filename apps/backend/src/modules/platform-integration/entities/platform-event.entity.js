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
exports.PlatformEvent = exports.ModuleSource = exports.PlatformEventType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
/**
 * Platform Event Types
 * Events emitted by various modules across the platform
 */
var PlatformEventType;
(function (PlatformEventType) {
    // Events Module
    PlatformEventType["EVENT_CREATED"] = "event.created";
    PlatformEventType["EVENT_UPDATED"] = "event.updated";
    PlatformEventType["EVENT_PUBLISHED"] = "event.published";
    PlatformEventType["EVENT_CANCELLED"] = "event.cancelled";
    // Email Marketing Module
    PlatformEventType["CAMPAIGN_CREATED"] = "campaign.created";
    PlatformEventType["CAMPAIGN_SENT"] = "campaign.sent";
    PlatformEventType["CAMPAIGN_COMPLETED"] = "campaign.completed";
    PlatformEventType["SUBSCRIBER_ADDED"] = "subscriber.added";
    PlatformEventType["SUBSCRIBER_UNSUBSCRIBED"] = "subscriber.unsubscribed";
    // Certificates Module
    PlatformEventType["CERTIFICATE_ISSUED"] = "certificate.issued";
    PlatformEventType["CERTIFICATE_SENT"] = "certificate.sent";
    PlatformEventType["CERTIFICATE_DOWNLOADED"] = "certificate.downloaded";
    // CMS Module
    PlatformEventType["PAGE_CREATED"] = "page.created";
    PlatformEventType["PAGE_PUBLISHED"] = "page.published";
    PlatformEventType["PAGE_UPDATED"] = "page.updated";
    PlatformEventType["PAGE_ARCHIVED"] = "page.archived";
    // Media Module
    PlatformEventType["MEDIA_UPLOADED"] = "media.uploaded";
    PlatformEventType["MEDIA_DELETED"] = "media.deleted";
    // Future: Support Tickets (v2.0)
    // TICKET_CREATED = 'ticket.created',
    // TICKET_RESOLVED = 'ticket.resolved',
    // Future: Social Media (v2.0)
    // POST_PUBLISHED = 'social.post_published',
    // POST_SCHEDULED = 'social.post_scheduled',
})(PlatformEventType || (exports.PlatformEventType = PlatformEventType = {}));
/**
 * Module Sources
 */
var ModuleSource;
(function (ModuleSource) {
    ModuleSource["EVENTS"] = "events";
    ModuleSource["EMAIL_MARKETING"] = "email-marketing";
    ModuleSource["CERTIFICATES"] = "certificates";
    ModuleSource["CMS"] = "cms";
    ModuleSource["MEDIA"] = "media";
    ModuleSource["SUPPORT"] = "support";
    ModuleSource["SOCIAL_MEDIA"] = "social-media";
})(ModuleSource || (exports.ModuleSource = ModuleSource = {}));
/**
 * Platform Event Entity
 *
 * Stores all events emitted across the platform for:
 * - Event log/history
 * - Automation rule triggers
 * - Webhook notifications
 * - Analytics and monitoring
 */
let PlatformEvent = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('platform_events'), (0, typeorm_1.Index)('idx_platform_events_type', ['eventType']), (0, typeorm_1.Index)('idx_platform_events_source', ['source']), (0, typeorm_1.Index)('idx_platform_events_created', ['createdAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _source_decorators;
    let _source_initializers = [];
    let _source_extraInitializers = [];
    let _eventType_decorators;
    let _eventType_initializers = [];
    let _eventType_extraInitializers = [];
    let _payload_decorators;
    let _payload_initializers = [];
    let _payload_extraInitializers = [];
    let _triggeredRules_decorators;
    let _triggeredRules_initializers = [];
    let _triggeredRules_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    var PlatformEvent = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _source_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 50,
                }), (0, typeorm_1.Index)()];
            _eventType_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 100,
                }), (0, typeorm_1.Index)()];
            _payload_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                })];
            _triggeredRules_decorators = [(0, typeorm_1.Column)({
                    type: 'uuid',
                    array: true,
                    default: [],
                })];
            _metadata_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                })];
            __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
            __esDecorate(null, null, _eventType_decorators, { kind: "field", name: "eventType", static: false, private: false, access: { has: obj => "eventType" in obj, get: obj => obj.eventType, set: (obj, value) => { obj.eventType = value; } }, metadata: _metadata }, _eventType_initializers, _eventType_extraInitializers);
            __esDecorate(null, null, _payload_decorators, { kind: "field", name: "payload", static: false, private: false, access: { has: obj => "payload" in obj, get: obj => obj.payload, set: (obj, value) => { obj.payload = value; } }, metadata: _metadata }, _payload_initializers, _payload_extraInitializers);
            __esDecorate(null, null, _triggeredRules_decorators, { kind: "field", name: "triggeredRules", static: false, private: false, access: { has: obj => "triggeredRules" in obj, get: obj => obj.triggeredRules, set: (obj, value) => { obj.triggeredRules = value; } }, metadata: _metadata }, _triggeredRules_initializers, _triggeredRules_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PlatformEvent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * Source module that emitted the event
         */
        source = __runInitializers(this, _source_initializers, void 0);
        /**
         * Type of event
         */
        eventType = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _eventType_initializers, void 0));
        /**
         * Event payload (full event data)
         *
         * Examples:
         * - Event created: { id, title, startDate, ... }
         * - Certificate issued: { id, recipientName, ... }
         * - Page published: { id, slug, title, ... }
         */
        payload = (__runInitializers(this, _eventType_extraInitializers), __runInitializers(this, _payload_initializers, void 0));
        /**
         * IDs of automation rules that were triggered by this event
         */
        triggeredRules = (__runInitializers(this, _payload_extraInitializers), __runInitializers(this, _triggeredRules_initializers, void 0));
        /**
         * Additional metadata
         *
         * Examples:
         * - userId: Who triggered the event
         * - ip: IP address
         * - userAgent: Browser info
         */
        metadata = (__runInitializers(this, _triggeredRules_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
    return PlatformEvent = _classThis;
})();
exports.PlatformEvent = PlatformEvent;
//# sourceMappingURL=platform-event.entity.js.map