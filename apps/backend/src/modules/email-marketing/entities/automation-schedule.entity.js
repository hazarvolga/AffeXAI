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
exports.AutomationSchedule = exports.ScheduleStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const email_automation_entity_1 = require("./email-automation.entity");
const subscriber_entity_1 = require("./subscriber.entity");
/**
 * Schedule Status
 */
var ScheduleStatus;
(function (ScheduleStatus) {
    ScheduleStatus["PENDING"] = "pending";
    ScheduleStatus["PROCESSING"] = "processing";
    ScheduleStatus["COMPLETED"] = "completed";
    ScheduleStatus["FAILED"] = "failed";
    ScheduleStatus["CANCELLED"] = "cancelled";
})(ScheduleStatus || (exports.ScheduleStatus = ScheduleStatus = {}));
/**
 * Automation Schedule Entity
 * Manages scheduled execution of automation steps (for delays and time-based triggers)
 */
let AutomationSchedule = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('automation_schedules')];
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
    let _stepIndex_decorators;
    let _stepIndex_initializers = [];
    let _stepIndex_extraInitializers = [];
    let _scheduledFor_decorators;
    let _scheduledFor_initializers = [];
    let _scheduledFor_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _executedAt_decorators;
    let _executedAt_initializers = [];
    let _executedAt_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    var AutomationSchedule = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _automationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _automation_decorators = [(0, typeorm_1.ManyToOne)(() => email_automation_entity_1.EmailAutomation, (automation) => automation.schedules, {
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'automationId' })];
            _subscriberId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _subscriber_decorators = [(0, typeorm_1.ManyToOne)(() => subscriber_entity_1.Subscriber, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'subscriberId' })];
            _stepIndex_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
            _scheduledFor_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 20,
                    default: ScheduleStatus.PENDING,
                })];
            _executedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _automation_decorators, { kind: "field", name: "automation", static: false, private: false, access: { has: obj => "automation" in obj, get: obj => obj.automation, set: (obj, value) => { obj.automation = value; } }, metadata: _metadata }, _automation_initializers, _automation_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _subscriber_decorators, { kind: "field", name: "subscriber", static: false, private: false, access: { has: obj => "subscriber" in obj, get: obj => obj.subscriber, set: (obj, value) => { obj.subscriber = value; } }, metadata: _metadata }, _subscriber_initializers, _subscriber_extraInitializers);
            __esDecorate(null, null, _stepIndex_decorators, { kind: "field", name: "stepIndex", static: false, private: false, access: { has: obj => "stepIndex" in obj, get: obj => obj.stepIndex, set: (obj, value) => { obj.stepIndex = value; } }, metadata: _metadata }, _stepIndex_initializers, _stepIndex_extraInitializers);
            __esDecorate(null, null, _scheduledFor_decorators, { kind: "field", name: "scheduledFor", static: false, private: false, access: { has: obj => "scheduledFor" in obj, get: obj => obj.scheduledFor, set: (obj, value) => { obj.scheduledFor = value; } }, metadata: _metadata }, _scheduledFor_initializers, _scheduledFor_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _executedAt_decorators, { kind: "field", name: "executedAt", static: false, private: false, access: { has: obj => "executedAt" in obj, get: obj => obj.executedAt, set: (obj, value) => { obj.executedAt = value; } }, metadata: _metadata }, _executedAt_initializers, _executedAt_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationSchedule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // Automation relation
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        automation = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _automation_initializers, void 0));
        // Subscriber relation
        subscriberId = (__runInitializers(this, _automation_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        subscriber = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _subscriber_initializers, void 0));
        // Schedule details
        stepIndex = (__runInitializers(this, _subscriber_extraInitializers), __runInitializers(this, _stepIndex_initializers, void 0));
        scheduledFor = (__runInitializers(this, _stepIndex_extraInitializers), __runInitializers(this, _scheduledFor_initializers, void 0));
        status = (__runInitializers(this, _scheduledFor_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        executedAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _executedAt_initializers, void 0));
        error = (__runInitializers(this, _executedAt_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        // Helper methods
        isReady() {
            return (this.status === ScheduleStatus.PENDING &&
                new Date() >= this.scheduledFor);
        }
        markAsProcessing() {
            this.status = ScheduleStatus.PROCESSING;
        }
        markAsCompleted() {
            this.status = ScheduleStatus.COMPLETED;
            this.executedAt = new Date();
        }
        markAsFailed(error) {
            this.status = ScheduleStatus.FAILED;
            this.error = error;
            this.executedAt = new Date();
        }
        cancel() {
            this.status = ScheduleStatus.CANCELLED;
        }
        getDelayInMinutes() {
            const now = new Date();
            const diff = this.scheduledFor.getTime() - now.getTime();
            return Math.max(0, Math.round(diff / (1000 * 60)));
        }
        isOverdue() {
            return this.status === ScheduleStatus.PENDING && new Date() > this.scheduledFor;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _error_extraInitializers);
        }
    };
    return AutomationSchedule = _classThis;
})();
exports.AutomationSchedule = AutomationSchedule;
//# sourceMappingURL=automation-schedule.entity.js.map