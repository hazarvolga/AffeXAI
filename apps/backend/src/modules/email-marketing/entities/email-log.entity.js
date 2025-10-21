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
exports.EmailLog = void 0;
const typeorm_1 = require("typeorm");
const email_campaign_entity_1 = require("./email-campaign.entity");
let EmailLog = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_logs')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _campaignId_decorators;
    let _campaignId_initializers = [];
    let _campaignId_extraInitializers = [];
    let _recipientEmail_decorators;
    let _recipientEmail_initializers = [];
    let _recipientEmail_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _sentAt_decorators;
    let _sentAt_initializers = [];
    let _sentAt_extraInitializers = [];
    let _openedAt_decorators;
    let _openedAt_initializers = [];
    let _openedAt_extraInitializers = [];
    let _clickedAt_decorators;
    let _clickedAt_initializers = [];
    let _clickedAt_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _campaign_decorators;
    let _campaign_initializers = [];
    let _campaign_extraInitializers = [];
    var EmailLog = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _campaignId_decorators = [(0, typeorm_1.Column)({ name: 'campaign_id' })];
            _recipientEmail_decorators = [(0, typeorm_1.Column)({ name: 'recipient_email' })];
            _status_decorators = [(0, typeorm_1.Column)({ default: 'pending' })];
            _sentAt_decorators = [(0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamp', nullable: true })];
            _openedAt_decorators = [(0, typeorm_1.Column)({ name: 'opened_at', type: 'timestamp', nullable: true })];
            _clickedAt_decorators = [(0, typeorm_1.Column)({ name: 'clicked_at', type: 'timestamp', nullable: true })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
            _campaign_decorators = [(0, typeorm_1.ManyToOne)(() => email_campaign_entity_1.EmailCampaign, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'campaign_id' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _campaignId_decorators, { kind: "field", name: "campaignId", static: false, private: false, access: { has: obj => "campaignId" in obj, get: obj => obj.campaignId, set: (obj, value) => { obj.campaignId = value; } }, metadata: _metadata }, _campaignId_initializers, _campaignId_extraInitializers);
            __esDecorate(null, null, _recipientEmail_decorators, { kind: "field", name: "recipientEmail", static: false, private: false, access: { has: obj => "recipientEmail" in obj, get: obj => obj.recipientEmail, set: (obj, value) => { obj.recipientEmail = value; } }, metadata: _metadata }, _recipientEmail_initializers, _recipientEmail_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: obj => "sentAt" in obj, get: obj => obj.sentAt, set: (obj, value) => { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
            __esDecorate(null, null, _openedAt_decorators, { kind: "field", name: "openedAt", static: false, private: false, access: { has: obj => "openedAt" in obj, get: obj => obj.openedAt, set: (obj, value) => { obj.openedAt = value; } }, metadata: _metadata }, _openedAt_initializers, _openedAt_extraInitializers);
            __esDecorate(null, null, _clickedAt_decorators, { kind: "field", name: "clickedAt", static: false, private: false, access: { has: obj => "clickedAt" in obj, get: obj => obj.clickedAt, set: (obj, value) => { obj.clickedAt = value; } }, metadata: _metadata }, _clickedAt_initializers, _clickedAt_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _campaign_decorators, { kind: "field", name: "campaign", static: false, private: false, access: { has: obj => "campaign" in obj, get: obj => obj.campaign, set: (obj, value) => { obj.campaign = value; } }, metadata: _metadata }, _campaign_initializers, _campaign_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailLog = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        campaignId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _campaignId_initializers, void 0));
        recipientEmail = (__runInitializers(this, _campaignId_extraInitializers), __runInitializers(this, _recipientEmail_initializers, void 0));
        status = (__runInitializers(this, _recipientEmail_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        sentAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
        openedAt = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _openedAt_initializers, void 0));
        clickedAt = (__runInitializers(this, _openedAt_extraInitializers), __runInitializers(this, _clickedAt_initializers, void 0));
        error = (__runInitializers(this, _clickedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        metadata = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        campaign = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _campaign_initializers, void 0));
        constructor() {
            __runInitializers(this, _campaign_extraInitializers);
        }
    };
    return EmailLog = _classThis;
})();
exports.EmailLog = EmailLog;
//# sourceMappingURL=email-log.entity.js.map