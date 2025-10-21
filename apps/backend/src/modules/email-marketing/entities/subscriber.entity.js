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
exports.Subscriber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const shared_types_1 = require("@affexai/shared-types");
let Subscriber = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('subscribers')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    let _segments_decorators;
    let _segments_initializers = [];
    let _segments_extraInitializers = [];
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _firstName_extraInitializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _lastName_extraInitializers = [];
    let _company_decorators;
    let _company_initializers = [];
    let _company_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _customerStatus_decorators;
    let _customerStatus_initializers = [];
    let _customerStatus_extraInitializers = [];
    let _subscriptionType_decorators;
    let _subscriptionType_initializers = [];
    let _subscriptionType_extraInitializers = [];
    let _mailerCheckResult_decorators;
    let _mailerCheckResult_initializers = [];
    let _mailerCheckResult_extraInitializers = [];
    let _location_decorators;
    let _location_initializers = [];
    let _location_extraInitializers = [];
    let _sent_decorators;
    let _sent_initializers = [];
    let _sent_extraInitializers = [];
    let _opens_decorators;
    let _opens_initializers = [];
    let _opens_extraInitializers = [];
    let _clicks_decorators;
    let _clicks_initializers = [];
    let _clicks_extraInitializers = [];
    let _customFields_decorators;
    let _customFields_initializers = [];
    let _customFields_extraInitializers = [];
    let _isDoubleOptIn_decorators;
    let _isDoubleOptIn_initializers = [];
    let _isDoubleOptIn_extraInitializers = [];
    let _optInToken_decorators;
    let _optInToken_initializers = [];
    let _optInToken_extraInitializers = [];
    let _optInDate_decorators;
    let _optInDate_initializers = [];
    let _optInDate_extraInitializers = [];
    let _optOutDate_decorators;
    let _optOutDate_initializers = [];
    let _optOutDate_extraInitializers = [];
    let _optOutReason_decorators;
    let _optOutReason_initializers = [];
    let _optOutReason_extraInitializers = [];
    let _optInIp_decorators;
    let _optInIp_initializers = [];
    let _optInIp_extraInitializers = [];
    let _optOutIp_decorators;
    let _optOutIp_initializers = [];
    let _optOutIp_extraInitializers = [];
    let _emailNotifications_decorators;
    let _emailNotifications_initializers = [];
    let _emailNotifications_extraInitializers = [];
    let _marketingEmails_decorators;
    let _marketingEmails_initializers = [];
    let _marketingEmails_extraInitializers = [];
    let _transactionalEmails_decorators;
    let _transactionalEmails_initializers = [];
    let _transactionalEmails_extraInitializers = [];
    let _unsubscribeToken_decorators;
    let _unsubscribeToken_initializers = [];
    let _unsubscribeToken_extraInitializers = [];
    let _subscribedAt_decorators;
    let _subscribedAt_initializers = [];
    let _subscribedAt_extraInitializers = [];
    let _lastUpdated_decorators;
    let _lastUpdated_initializers = [];
    let _lastUpdated_extraInitializers = [];
    var Subscriber = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: shared_types_1.SubscriberStatus, default: shared_types_1.SubscriberStatus.PENDING })];
            _groups_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _segments_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _firstName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _lastName_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _company_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _phone_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _customerStatus_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _subscriptionType_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _mailerCheckResult_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _location_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _sent_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _opens_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _clicks_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _customFields_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _isDoubleOptIn_decorators = [(0, typeorm_1.Column)({ default: false })];
            _optInToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _optInDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _optOutDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _optOutReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _optInIp_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _optOutIp_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _emailNotifications_decorators = [(0, typeorm_1.Column)({ default: true })];
            _marketingEmails_decorators = [(0, typeorm_1.Column)({ default: true })];
            _transactionalEmails_decorators = [(0, typeorm_1.Column)({ default: true })];
            _unsubscribeToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _subscribedAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _lastUpdated_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(null, null, _segments_decorators, { kind: "field", name: "segments", static: false, private: false, access: { has: obj => "segments" in obj, get: obj => obj.segments, set: (obj, value) => { obj.segments = value; } }, metadata: _metadata }, _segments_initializers, _segments_extraInitializers);
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: obj => "company" in obj, get: obj => obj.company, set: (obj, value) => { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _customerStatus_decorators, { kind: "field", name: "customerStatus", static: false, private: false, access: { has: obj => "customerStatus" in obj, get: obj => obj.customerStatus, set: (obj, value) => { obj.customerStatus = value; } }, metadata: _metadata }, _customerStatus_initializers, _customerStatus_extraInitializers);
            __esDecorate(null, null, _subscriptionType_decorators, { kind: "field", name: "subscriptionType", static: false, private: false, access: { has: obj => "subscriptionType" in obj, get: obj => obj.subscriptionType, set: (obj, value) => { obj.subscriptionType = value; } }, metadata: _metadata }, _subscriptionType_initializers, _subscriptionType_extraInitializers);
            __esDecorate(null, null, _mailerCheckResult_decorators, { kind: "field", name: "mailerCheckResult", static: false, private: false, access: { has: obj => "mailerCheckResult" in obj, get: obj => obj.mailerCheckResult, set: (obj, value) => { obj.mailerCheckResult = value; } }, metadata: _metadata }, _mailerCheckResult_initializers, _mailerCheckResult_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: obj => "location" in obj, get: obj => obj.location, set: (obj, value) => { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _sent_decorators, { kind: "field", name: "sent", static: false, private: false, access: { has: obj => "sent" in obj, get: obj => obj.sent, set: (obj, value) => { obj.sent = value; } }, metadata: _metadata }, _sent_initializers, _sent_extraInitializers);
            __esDecorate(null, null, _opens_decorators, { kind: "field", name: "opens", static: false, private: false, access: { has: obj => "opens" in obj, get: obj => obj.opens, set: (obj, value) => { obj.opens = value; } }, metadata: _metadata }, _opens_initializers, _opens_extraInitializers);
            __esDecorate(null, null, _clicks_decorators, { kind: "field", name: "clicks", static: false, private: false, access: { has: obj => "clicks" in obj, get: obj => obj.clicks, set: (obj, value) => { obj.clicks = value; } }, metadata: _metadata }, _clicks_initializers, _clicks_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: obj => "customFields" in obj, get: obj => obj.customFields, set: (obj, value) => { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            __esDecorate(null, null, _isDoubleOptIn_decorators, { kind: "field", name: "isDoubleOptIn", static: false, private: false, access: { has: obj => "isDoubleOptIn" in obj, get: obj => obj.isDoubleOptIn, set: (obj, value) => { obj.isDoubleOptIn = value; } }, metadata: _metadata }, _isDoubleOptIn_initializers, _isDoubleOptIn_extraInitializers);
            __esDecorate(null, null, _optInToken_decorators, { kind: "field", name: "optInToken", static: false, private: false, access: { has: obj => "optInToken" in obj, get: obj => obj.optInToken, set: (obj, value) => { obj.optInToken = value; } }, metadata: _metadata }, _optInToken_initializers, _optInToken_extraInitializers);
            __esDecorate(null, null, _optInDate_decorators, { kind: "field", name: "optInDate", static: false, private: false, access: { has: obj => "optInDate" in obj, get: obj => obj.optInDate, set: (obj, value) => { obj.optInDate = value; } }, metadata: _metadata }, _optInDate_initializers, _optInDate_extraInitializers);
            __esDecorate(null, null, _optOutDate_decorators, { kind: "field", name: "optOutDate", static: false, private: false, access: { has: obj => "optOutDate" in obj, get: obj => obj.optOutDate, set: (obj, value) => { obj.optOutDate = value; } }, metadata: _metadata }, _optOutDate_initializers, _optOutDate_extraInitializers);
            __esDecorate(null, null, _optOutReason_decorators, { kind: "field", name: "optOutReason", static: false, private: false, access: { has: obj => "optOutReason" in obj, get: obj => obj.optOutReason, set: (obj, value) => { obj.optOutReason = value; } }, metadata: _metadata }, _optOutReason_initializers, _optOutReason_extraInitializers);
            __esDecorate(null, null, _optInIp_decorators, { kind: "field", name: "optInIp", static: false, private: false, access: { has: obj => "optInIp" in obj, get: obj => obj.optInIp, set: (obj, value) => { obj.optInIp = value; } }, metadata: _metadata }, _optInIp_initializers, _optInIp_extraInitializers);
            __esDecorate(null, null, _optOutIp_decorators, { kind: "field", name: "optOutIp", static: false, private: false, access: { has: obj => "optOutIp" in obj, get: obj => obj.optOutIp, set: (obj, value) => { obj.optOutIp = value; } }, metadata: _metadata }, _optOutIp_initializers, _optOutIp_extraInitializers);
            __esDecorate(null, null, _emailNotifications_decorators, { kind: "field", name: "emailNotifications", static: false, private: false, access: { has: obj => "emailNotifications" in obj, get: obj => obj.emailNotifications, set: (obj, value) => { obj.emailNotifications = value; } }, metadata: _metadata }, _emailNotifications_initializers, _emailNotifications_extraInitializers);
            __esDecorate(null, null, _marketingEmails_decorators, { kind: "field", name: "marketingEmails", static: false, private: false, access: { has: obj => "marketingEmails" in obj, get: obj => obj.marketingEmails, set: (obj, value) => { obj.marketingEmails = value; } }, metadata: _metadata }, _marketingEmails_initializers, _marketingEmails_extraInitializers);
            __esDecorate(null, null, _transactionalEmails_decorators, { kind: "field", name: "transactionalEmails", static: false, private: false, access: { has: obj => "transactionalEmails" in obj, get: obj => obj.transactionalEmails, set: (obj, value) => { obj.transactionalEmails = value; } }, metadata: _metadata }, _transactionalEmails_initializers, _transactionalEmails_extraInitializers);
            __esDecorate(null, null, _unsubscribeToken_decorators, { kind: "field", name: "unsubscribeToken", static: false, private: false, access: { has: obj => "unsubscribeToken" in obj, get: obj => obj.unsubscribeToken, set: (obj, value) => { obj.unsubscribeToken = value; } }, metadata: _metadata }, _unsubscribeToken_initializers, _unsubscribeToken_extraInitializers);
            __esDecorate(null, null, _subscribedAt_decorators, { kind: "field", name: "subscribedAt", static: false, private: false, access: { has: obj => "subscribedAt" in obj, get: obj => obj.subscribedAt, set: (obj, value) => { obj.subscribedAt = value; } }, metadata: _metadata }, _subscribedAt_initializers, _subscribedAt_extraInitializers);
            __esDecorate(null, null, _lastUpdated_decorators, { kind: "field", name: "lastUpdated", static: false, private: false, access: { has: obj => "lastUpdated" in obj, get: obj => obj.lastUpdated, set: (obj, value) => { obj.lastUpdated = value; } }, metadata: _metadata }, _lastUpdated_initializers, _lastUpdated_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Subscriber = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        email = __runInitializers(this, _email_initializers, void 0);
        status = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        groups = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _groups_initializers, void 0)); // Array of group IDs
        segments = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _segments_initializers, void 0)); // Array of segment names
        firstName = (__runInitializers(this, _segments_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
        lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
        company = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _company_initializers, void 0));
        phone = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
        customerStatus = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _customerStatus_initializers, void 0));
        subscriptionType = (__runInitializers(this, _customerStatus_extraInitializers), __runInitializers(this, _subscriptionType_initializers, void 0));
        mailerCheckResult = (__runInitializers(this, _subscriptionType_extraInitializers), __runInitializers(this, _mailerCheckResult_initializers, void 0));
        location = (__runInitializers(this, _mailerCheckResult_extraInitializers), __runInitializers(this, _location_initializers, void 0));
        sent = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _sent_initializers, void 0));
        opens = (__runInitializers(this, _sent_extraInitializers), __runInitializers(this, _opens_initializers, void 0));
        clicks = (__runInitializers(this, _opens_extraInitializers), __runInitializers(this, _clicks_initializers, void 0));
        customFields = (__runInitializers(this, _clicks_extraInitializers), __runInitializers(this, _customFields_initializers, void 0)); // Dynamic custom fields
        // Opt-in/Opt-out fields
        isDoubleOptIn = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _isDoubleOptIn_initializers, void 0)); // Has confirmed subscription via email
        optInToken = (__runInitializers(this, _isDoubleOptIn_extraInitializers), __runInitializers(this, _optInToken_initializers, void 0)); // Token for email confirmation
        optInDate = (__runInitializers(this, _optInToken_extraInitializers), __runInitializers(this, _optInDate_initializers, void 0)); // When user confirmed subscription
        optOutDate = (__runInitializers(this, _optInDate_extraInitializers), __runInitializers(this, _optOutDate_initializers, void 0)); // When user unsubscribed
        optOutReason = (__runInitializers(this, _optOutDate_extraInitializers), __runInitializers(this, _optOutReason_initializers, void 0)); // Why user unsubscribed
        optInIp = (__runInitializers(this, _optOutReason_extraInitializers), __runInitializers(this, _optInIp_initializers, void 0)); // IP address when opted in
        optOutIp = (__runInitializers(this, _optInIp_extraInitializers), __runInitializers(this, _optOutIp_initializers, void 0)); // IP address when opted out
        emailNotifications = (__runInitializers(this, _optOutIp_extraInitializers), __runInitializers(this, _emailNotifications_initializers, void 0)); // Wants to receive emails
        marketingEmails = (__runInitializers(this, _emailNotifications_extraInitializers), __runInitializers(this, _marketingEmails_initializers, void 0)); // Wants marketing emails
        transactionalEmails = (__runInitializers(this, _marketingEmails_extraInitializers), __runInitializers(this, _transactionalEmails_initializers, void 0)); // Wants transactional emails (always true)
        unsubscribeToken = (__runInitializers(this, _transactionalEmails_extraInitializers), __runInitializers(this, _unsubscribeToken_initializers, void 0)); // Unique token for one-click unsubscribe
        subscribedAt = (__runInitializers(this, _unsubscribeToken_extraInitializers), __runInitializers(this, _subscribedAt_initializers, void 0));
        lastUpdated = (__runInitializers(this, _subscribedAt_extraInitializers), __runInitializers(this, _lastUpdated_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _lastUpdated_extraInitializers);
        }
    };
    return Subscriber = _classThis;
})();
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.entity.js.map