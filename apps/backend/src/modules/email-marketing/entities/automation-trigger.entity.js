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
exports.AutomationTrigger = exports.TriggerStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const email_automation_entity_1 = require("./email-automation.entity");
const subscriber_entity_1 = require("./subscriber.entity");
/**
 * Trigger Status
 */
var TriggerStatus;
(function (TriggerStatus) {
    TriggerStatus["PENDING"] = "pending";
    TriggerStatus["SCHEDULED"] = "scheduled";
    TriggerStatus["FIRED"] = "fired";
    TriggerStatus["SKIPPED"] = "skipped";
    TriggerStatus["FAILED"] = "failed";
})(TriggerStatus || (exports.TriggerStatus = TriggerStatus = {}));
/**
 * Automation Trigger Entity
 * Records when automation triggers fire for specific subscribers
 */
let AutomationTrigger = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('automation_triggers')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _automation_decorators;
    let _automation_initializers = [];
    let _automation_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _subscriber_decorators;
    let _subscriber_initializers = [];
    let _subscriber_extraInitializers = [];
    let _triggerType_decorators;
    let _triggerType_initializers = [];
    let _triggerType_extraInitializers = [];
    let _triggerData_decorators;
    let _triggerData_initializers = [];
    let _triggerData_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _scheduledFor_decorators;
    let _scheduledFor_initializers = [];
    let _scheduledFor_extraInitializers = [];
    let _firedAt_decorators;
    let _firedAt_initializers = [];
    let _firedAt_extraInitializers = [];
    var AutomationTrigger = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _automationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _automation_decorators = [(0, typeorm_1.ManyToOne)(() => email_automation_entity_1.EmailAutomation, (automation) => automation.triggers, {
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'automationId' })];
            _subscriberId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _subscriber_decorators = [(0, typeorm_1.ManyToOne)(() => subscriber_entity_1.Subscriber, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'subscriberId' })];
            _triggerType_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50 })];
            _triggerData_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: {} })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 20,
                    default: TriggerStatus.PENDING,
                })];
            _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _firedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _automation_decorators, { kind: "field", name: "automation", static: false, private: false, access: { has: obj => "automation" in obj, get: obj => obj.automation, set: (obj, value) => { obj.automation = value; } }, metadata: _metadata }, _automation_initializers, _automation_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _subscriber_decorators, { kind: "field", name: "subscriber", static: false, private: false, access: { has: obj => "subscriber" in obj, get: obj => obj.subscriber, set: (obj, value) => { obj.subscriber = value; } }, metadata: _metadata }, _subscriber_initializers, _subscriber_extraInitializers);
            __esDecorate(null, null, _triggerType_decorators, { kind: "field", name: "triggerType", static: false, private: false, access: { has: obj => "triggerType" in obj, get: obj => obj.triggerType, set: (obj, value) => { obj.triggerType = value; } }, metadata: _metadata }, _triggerType_initializers, _triggerType_extraInitializers);
            __esDecorate(null, null, _triggerData_decorators, { kind: "field", name: "triggerData", static: false, private: false, access: { has: obj => "triggerData" in obj, get: obj => obj.triggerData, set: (obj, value) => { obj.triggerData = value; } }, metadata: _metadata }, _triggerData_initializers, _triggerData_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: obj => "scheduledFor" in obj, get: obj => obj.scheduledFor, set: (obj, value) => { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            __esDecorate(null, null, _firedAt_decorators, { kind: "field", name: "firedAt", static: false, private: false, access: { has: obj => "firedAt" in obj, get: obj => obj.firedAt, set: (obj, value) => { obj.firedAt = value; } }, metadata: _metadata }, _firedAt_initializers, _firedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationTrigger = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // Automation relation
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        automation = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _automation_initializers, void 0));
        // Subscriber relation
        subscriberId = (__runInitializers(this, _automation_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        subscriber = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _subscriber_initializers, void 0));
        // Trigger details
        triggerType = (__runInitializers(this, _subscriber_extraInitializers), __runInitializers(this, _triggerType_initializers, void 0));
        triggerData = (__runInitializers(this, _triggerType_extraInitializers), __runInitializers(this, _triggerData_initializers, void 0));
        status = (__runInitializers(this, _triggerData_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        scheduledFor = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
        firedAt = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _firedAt_initializers, void 0));
        // Helper methods
        fire() {
            this.status = TriggerStatus.FIRED;
            this.firedAt = new Date();
        }
        skip(reason) {
            this.status = TriggerStatus.SKIPPED;
            if (reason) {
                this.triggerData = { ...this.triggerData, skipReason: reason };
            }
        }
        fail(error) {
            this.status = TriggerStatus.FAILED;
            this.triggerData = { ...this.triggerData, error };
        }
        schedule(date) {
            this.status = TriggerStatus.SCHEDULED;
            this.scheduledFor = date;
        }
        isReady() {
            if (this.status !== TriggerStatus.SCHEDULED)
                return false;
            if (!this.scheduledFor)
                return false;
            return new Date() >= this.scheduledFor;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _firedAt_extraInitializers);
        }
    };
    return AutomationTrigger = _classThis;
})();
exports.AutomationTrigger = AutomationTrigger;
//# sourceMappingURL=automation-trigger.entity.js.map