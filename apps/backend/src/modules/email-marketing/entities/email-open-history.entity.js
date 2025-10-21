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
exports.EmailOpenHistory = void 0;
const typeorm_1 = require("typeorm");
const subscriber_entity_1 = require("./subscriber.entity");
const email_campaign_entity_1 = require("./email-campaign.entity");
let EmailOpenHistory = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_open_history'), (0, typeorm_1.Index)(['subscriberId', 'openedAt']), (0, typeorm_1.Index)(['campaignId', 'openedAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _subscriber_decorators;
    let _subscriber_initializers = [];
    let _subscriber_extraInitializers = [];
    let _campaignId_decorators;
    let _campaignId_initializers = [];
    let _campaignId_extraInitializers = [];
    let _campaign_decorators;
    let _campaign_initializers = [];
    let _campaign_extraInitializers = [];
    let _openedAt_decorators;
    let _openedAt_initializers = [];
    let _openedAt_extraInitializers = [];
    let _timezone_decorators;
    let _timezone_initializers = [];
    let _timezone_extraInitializers = [];
    let _hourOfDay_decorators;
    let _hourOfDay_initializers = [];
    let _hourOfDay_extraInitializers = [];
    let _dayOfWeek_decorators;
    let _dayOfWeek_initializers = [];
    let _dayOfWeek_extraInitializers = [];
    let _deviceType_decorators;
    let _deviceType_initializers = [];
    let _deviceType_extraInitializers = [];
    let _emailClient_decorators;
    let _emailClient_initializers = [];
    let _emailClient_extraInitializers = [];
    let _ipAddress_decorators;
    let _ipAddress_initializers = [];
    let _ipAddress_extraInitializers = [];
    let _country_decorators;
    let _country_initializers = [];
    let _country_extraInitializers = [];
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    var EmailOpenHistory = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _subscriberId_decorators = [(0, typeorm_1.Column)('uuid')];
            _subscriber_decorators = [(0, typeorm_1.ManyToOne)(() => subscriber_entity_1.Subscriber, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'subscriberId' })];
            _campaignId_decorators = [(0, typeorm_1.Column)('uuid')];
            _campaign_decorators = [(0, typeorm_1.ManyToOne)(() => email_campaign_entity_1.EmailCampaign, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'campaignId' })];
            _openedAt_decorators = [(0, typeorm_1.Column)('timestamp with time zone')];
            _timezone_decorators = [(0, typeorm_1.Column)('varchar', { length: 100, nullable: true })];
            _hourOfDay_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
            _dayOfWeek_decorators = [(0, typeorm_1.Column)('int', { nullable: true })];
            _deviceType_decorators = [(0, typeorm_1.Column)('varchar', { length: 50, nullable: true })];
            _emailClient_decorators = [(0, typeorm_1.Column)('varchar', { length: 100, nullable: true })];
            _ipAddress_decorators = [(0, typeorm_1.Column)('varchar', { length: 100, nullable: true })];
            _country_decorators = [(0, typeorm_1.Column)('varchar', { length: 100, nullable: true })];
            _city_decorators = [(0, typeorm_1.Column)('varchar', { length: 100, nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _subscriber_decorators, { kind: "field", name: "subscriber", static: false, private: false, access: { has: obj => "subscriber" in obj, get: obj => obj.subscriber, set: (obj, value) => { obj.subscriber = value; } }, metadata: _metadata }, _subscriber_initializers, _subscriber_extraInitializers);
            __esDecorate(null, null, _campaignId_decorators, { kind: "field", name: "campaignId", static: false, private: false, access: { has: obj => "campaignId" in obj, get: obj => obj.campaignId, set: (obj, value) => { obj.campaignId = value; } }, metadata: _metadata }, _campaignId_initializers, _campaignId_extraInitializers);
            __esDecorate(null, null, _campaign_decorators, { kind: "field", name: "campaign", static: false, private: false, access: { has: obj => "campaign" in obj, get: obj => obj.campaign, set: (obj, value) => { obj.campaign = value; } }, metadata: _metadata }, _campaign_initializers, _campaign_extraInitializers);
            __esDecorate(null, null, _openedAt_decorators, { kind: "field", name: "openedAt", static: false, private: false, access: { has: obj => "openedAt" in obj, get: obj => obj.openedAt, set: (obj, value) => { obj.openedAt = value; } }, metadata: _metadata }, _openedAt_initializers, _openedAt_extraInitializers);
            __esDecorate(null, null, _timezone_decorators, { kind: "field", name: "timezone", static: false, private: false, access: { has: obj => "timezone" in obj, get: obj => obj.timezone, set: (obj, value) => { obj.timezone = value; } }, metadata: _metadata }, _timezone_initializers, _timezone_extraInitializers);
            __esDecorate(null, null, _hourOfDay_decorators, { kind: "field", name: "hourOfDay", static: false, private: false, access: { has: obj => "hourOfDay" in obj, get: obj => obj.hourOfDay, set: (obj, value) => { obj.hourOfDay = value; } }, metadata: _metadata }, _hourOfDay_initializers, _hourOfDay_extraInitializers);
            __esDecorate(null, null, _dayOfWeek_decorators, { kind: "field", name: "dayOfWeek", static: false, private: false, access: { has: obj => "dayOfWeek" in obj, get: obj => obj.dayOfWeek, set: (obj, value) => { obj.dayOfWeek = value; } }, metadata: _metadata }, _dayOfWeek_initializers, _dayOfWeek_extraInitializers);
            __esDecorate(null, null, _deviceType_decorators, { kind: "field", name: "deviceType", static: false, private: false, access: { has: obj => "deviceType" in obj, get: obj => obj.deviceType, set: (obj, value) => { obj.deviceType = value; } }, metadata: _metadata }, _deviceType_initializers, _deviceType_extraInitializers);
            __esDecorate(null, null, _emailClient_decorators, { kind: "field", name: "emailClient", static: false, private: false, access: { has: obj => "emailClient" in obj, get: obj => obj.emailClient, set: (obj, value) => { obj.emailClient = value; } }, metadata: _metadata }, _emailClient_initializers, _emailClient_extraInitializers);
            __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: obj => "ipAddress" in obj, get: obj => obj.ipAddress, set: (obj, value) => { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: obj => "country" in obj, get: obj => obj.country, set: (obj, value) => { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailOpenHistory = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        subscriberId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        subscriber = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _subscriber_initializers, void 0));
        campaignId = (__runInitializers(this, _subscriber_extraInitializers), __runInitializers(this, _campaignId_initializers, void 0));
        campaign = (__runInitializers(this, _campaignId_extraInitializers), __runInitializers(this, _campaign_initializers, void 0));
        openedAt = (__runInitializers(this, _campaign_extraInitializers), __runInitializers(this, _openedAt_initializers, void 0));
        timezone = (__runInitializers(this, _openedAt_extraInitializers), __runInitializers(this, _timezone_initializers, void 0));
        hourOfDay = (__runInitializers(this, _timezone_extraInitializers), __runInitializers(this, _hourOfDay_initializers, void 0)); // 0-23
        dayOfWeek = (__runInitializers(this, _hourOfDay_extraInitializers), __runInitializers(this, _dayOfWeek_initializers, void 0)); // 0-6 (0=Sunday)
        deviceType = (__runInitializers(this, _dayOfWeek_extraInitializers), __runInitializers(this, _deviceType_initializers, void 0));
        emailClient = (__runInitializers(this, _deviceType_extraInitializers), __runInitializers(this, _emailClient_initializers, void 0));
        ipAddress = (__runInitializers(this, _emailClient_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
        country = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _country_initializers, void 0));
        city = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _city_initializers, void 0));
        createdAt = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
    return EmailOpenHistory = _classThis;
})();
exports.EmailOpenHistory = EmailOpenHistory;
//# sourceMappingURL=email-open-history.entity.js.map