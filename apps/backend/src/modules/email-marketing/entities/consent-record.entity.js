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
exports.ConsentRecord = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const subscriber_entity_1 = require("./subscriber.entity");
const gdpr_compliance_service_1 = require("../services/gdpr-compliance.service");
let ConsentRecord = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('consent_records')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _subscriber_decorators;
    let _subscriber_initializers = [];
    let _subscriber_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _consentType_decorators;
    let _consentType_initializers = [];
    let _consentType_extraInitializers = [];
    let _consentStatus_decorators;
    let _consentStatus_initializers = [];
    let _consentStatus_extraInitializers = [];
    let _consentDate_decorators;
    let _consentDate_initializers = [];
    let _consentDate_extraInitializers = [];
    let _ipAddress_decorators;
    let _ipAddress_initializers = [];
    let _ipAddress_extraInitializers = [];
    let _userAgent_decorators;
    let _userAgent_initializers = [];
    let _userAgent_extraInitializers = [];
    let _consentMethod_decorators;
    let _consentMethod_initializers = [];
    let _consentMethod_extraInitializers = [];
    let _legalBasis_decorators;
    let _legalBasis_initializers = [];
    let _legalBasis_extraInitializers = [];
    let _dataProcessingPurposes_decorators;
    let _dataProcessingPurposes_initializers = [];
    let _dataProcessingPurposes_extraInitializers = [];
    let _retentionPeriod_decorators;
    let _retentionPeriod_initializers = [];
    let _retentionPeriod_extraInitializers = [];
    let _withdrawalDate_decorators;
    let _withdrawalDate_initializers = [];
    let _withdrawalDate_extraInitializers = [];
    let _withdrawalReason_decorators;
    let _withdrawalReason_initializers = [];
    let _withdrawalReason_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    var ConsentRecord = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _subscriber_decorators = [(0, typeorm_1.ManyToOne)(() => subscriber_entity_1.Subscriber, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'subscriber_id' })];
            _subscriberId_decorators = [(0, typeorm_1.Column)({ name: 'subscriber_id' })];
            _email_decorators = [(0, typeorm_1.Column)()];
            _consentType_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.ConsentType })];
            _consentStatus_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.ConsentStatus })];
            _consentDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _ipAddress_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _userAgent_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _consentMethod_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.ConsentMethod })];
            _legalBasis_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.LegalBasis })];
            _dataProcessingPurposes_decorators = [(0, typeorm_1.Column)({ type: 'json' })];
            _retentionPeriod_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _withdrawalDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _withdrawalReason_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            __esDecorate(null, null, _subscriber_decorators, { kind: "field", name: "subscriber", static: false, private: false, access: { has: obj => "subscriber" in obj, get: obj => obj.subscriber, set: (obj, value) => { obj.subscriber = value; } }, metadata: _metadata }, _subscriber_initializers, _subscriber_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _consentType_decorators, { kind: "field", name: "consentType", static: false, private: false, access: { has: obj => "consentType" in obj, get: obj => obj.consentType, set: (obj, value) => { obj.consentType = value; } }, metadata: _metadata }, _consentType_initializers, _consentType_extraInitializers);
            __esDecorate(null, null, _consentStatus_decorators, { kind: "field", name: "consentStatus", static: false, private: false, access: { has: obj => "consentStatus" in obj, get: obj => obj.consentStatus, set: (obj, value) => { obj.consentStatus = value; } }, metadata: _metadata }, _consentStatus_initializers, _consentStatus_extraInitializers);
            __esDecorate(null, null, _consentDate_decorators, { kind: "field", name: "consentDate", static: false, private: false, access: { has: obj => "consentDate" in obj, get: obj => obj.consentDate, set: (obj, value) => { obj.consentDate = value; } }, metadata: _metadata }, _consentDate_initializers, _consentDate_extraInitializers);
            __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: obj => "ipAddress" in obj, get: obj => obj.ipAddress, set: (obj, value) => { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
            __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: obj => "userAgent" in obj, get: obj => obj.userAgent, set: (obj, value) => { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
            __esDecorate(null, null, _consentMethod_decorators, { kind: "field", name: "consentMethod", static: false, private: false, access: { has: obj => "consentMethod" in obj, get: obj => obj.consentMethod, set: (obj, value) => { obj.consentMethod = value; } }, metadata: _metadata }, _consentMethod_initializers, _consentMethod_extraInitializers);
            __esDecorate(null, null, _legalBasis_decorators, { kind: "field", name: "legalBasis", static: false, private: false, access: { has: obj => "legalBasis" in obj, get: obj => obj.legalBasis, set: (obj, value) => { obj.legalBasis = value; } }, metadata: _metadata }, _legalBasis_initializers, _legalBasis_extraInitializers);
            __esDecorate(null, null, _dataProcessingPurposes_decorators, { kind: "field", name: "dataProcessingPurposes", static: false, private: false, access: { has: obj => "dataProcessingPurposes" in obj, get: obj => obj.dataProcessingPurposes, set: (obj, value) => { obj.dataProcessingPurposes = value; } }, metadata: _metadata }, _dataProcessingPurposes_initializers, _dataProcessingPurposes_extraInitializers);
            __esDecorate(null, null, _retentionPeriod_decorators, { kind: "field", name: "retentionPeriod", static: false, private: false, access: { has: obj => "retentionPeriod" in obj, get: obj => obj.retentionPeriod, set: (obj, value) => { obj.retentionPeriod = value; } }, metadata: _metadata }, _retentionPeriod_initializers, _retentionPeriod_extraInitializers);
            __esDecorate(null, null, _withdrawalDate_decorators, { kind: "field", name: "withdrawalDate", static: false, private: false, access: { has: obj => "withdrawalDate" in obj, get: obj => obj.withdrawalDate, set: (obj, value) => { obj.withdrawalDate = value; } }, metadata: _metadata }, _withdrawalDate_initializers, _withdrawalDate_extraInitializers);
            __esDecorate(null, null, _withdrawalReason_decorators, { kind: "field", name: "withdrawalReason", static: false, private: false, access: { has: obj => "withdrawalReason" in obj, get: obj => obj.withdrawalReason, set: (obj, value) => { obj.withdrawalReason = value; } }, metadata: _metadata }, _withdrawalReason_initializers, _withdrawalReason_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ConsentRecord = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscriber = __runInitializers(this, _subscriber_initializers, void 0);
        subscriberId = (__runInitializers(this, _subscriber_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        email = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        consentType = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _consentType_initializers, void 0));
        consentStatus = (__runInitializers(this, _consentType_extraInitializers), __runInitializers(this, _consentStatus_initializers, void 0));
        consentDate = (__runInitializers(this, _consentStatus_extraInitializers), __runInitializers(this, _consentDate_initializers, void 0));
        ipAddress = (__runInitializers(this, _consentDate_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0));
        userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0));
        consentMethod = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _consentMethod_initializers, void 0));
        legalBasis = (__runInitializers(this, _consentMethod_extraInitializers), __runInitializers(this, _legalBasis_initializers, void 0));
        dataProcessingPurposes = (__runInitializers(this, _legalBasis_extraInitializers), __runInitializers(this, _dataProcessingPurposes_initializers, void 0));
        retentionPeriod = (__runInitializers(this, _dataProcessingPurposes_extraInitializers), __runInitializers(this, _retentionPeriod_initializers, void 0)); // in months
        withdrawalDate = (__runInitializers(this, _retentionPeriod_extraInitializers), __runInitializers(this, _withdrawalDate_initializers, void 0));
        withdrawalReason = (__runInitializers(this, _withdrawalDate_extraInitializers), __runInitializers(this, _withdrawalReason_initializers, void 0));
        metadata = (__runInitializers(this, _withdrawalReason_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
    return ConsentRecord = _classThis;
})();
exports.ConsentRecord = ConsentRecord;
//# sourceMappingURL=consent-record.entity.js.map