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
exports.AutomationExecution = exports.ExecutionStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const email_automation_entity_1 = require("./email-automation.entity");
const automation_trigger_entity_1 = require("./automation-trigger.entity");
const subscriber_entity_1 = require("./subscriber.entity");
/**
 * Execution Status
 */
var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["PENDING"] = "pending";
    ExecutionStatus["RUNNING"] = "running";
    ExecutionStatus["COMPLETED"] = "completed";
    ExecutionStatus["FAILED"] = "failed";
    ExecutionStatus["CANCELLED"] = "cancelled";
})(ExecutionStatus || (exports.ExecutionStatus = ExecutionStatus = {}));
/**
 * Automation Execution Entity
 * Tracks the execution of an automation workflow for a specific subscriber
 */
let AutomationExecution = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('automation_executions')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _instanceExtraInitializers = [];
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _automation_decorators;
    let _automation_initializers = [];
    let _automation_extraInitializers = [];
    let _triggerId_decorators;
    let _triggerId_initializers = [];
    let _triggerId_extraInitializers = [];
    let _trigger_decorators;
    let _trigger_initializers = [];
    let _trigger_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _subscriber_decorators;
    let _subscriber_initializers = [];
    let _subscriber_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _currentStepIndex_decorators;
    let _currentStepIndex_initializers = [];
    let _currentStepIndex_extraInitializers = [];
    let _stepResults_decorators;
    let _stepResults_initializers = [];
    let _stepResults_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _startedAt_decorators;
    let _startedAt_initializers = [];
    let _startedAt_extraInitializers = [];
    let _completedAt_decorators;
    let _completedAt_initializers = [];
    let _completedAt_extraInitializers = [];
    let _executionTime_decorators;
    let _executionTime_initializers = [];
    let _executionTime_extraInitializers = [];
    let _calculateExecutionTime_decorators;
    var AutomationExecution = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _automationId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _automation_decorators = [(0, typeorm_1.ManyToOne)(() => email_automation_entity_1.EmailAutomation, (automation) => automation.executions, {
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'automationId' })];
            _triggerId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _trigger_decorators = [(0, typeorm_1.ManyToOne)(() => automation_trigger_entity_1.AutomationTrigger, { onDelete: 'SET NULL', nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'triggerId' })];
            _subscriberId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _subscriber_decorators = [(0, typeorm_1.ManyToOne)(() => subscriber_entity_1.Subscriber, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'subscriberId' })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 20,
                    default: ExecutionStatus.PENDING,
                })];
            _currentStepIndex_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _stepResults_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: [] })];
            _error_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _startedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _completedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _executionTime_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _calculateExecutionTime_decorators = [(0, typeorm_1.BeforeUpdate)()];
            __esDecorate(this, null, _calculateExecutionTime_decorators, { kind: "method", name: "calculateExecutionTime", static: false, private: false, access: { has: obj => "calculateExecutionTime" in obj, get: obj => obj.calculateExecutionTime }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _automation_decorators, { kind: "field", name: "automation", static: false, private: false, access: { has: obj => "automation" in obj, get: obj => obj.automation, set: (obj, value) => { obj.automation = value; } }, metadata: _metadata }, _automation_initializers, _automation_extraInitializers);
            __esDecorate(null, null, _triggerId_decorators, { kind: "field", name: "triggerId", static: false, private: false, access: { has: obj => "triggerId" in obj, get: obj => obj.triggerId, set: (obj, value) => { obj.triggerId = value; } }, metadata: _metadata }, _triggerId_initializers, _triggerId_extraInitializers);
            __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: obj => "trigger" in obj, get: obj => obj.trigger, set: (obj, value) => { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _subscriber_decorators, { kind: "field", name: "subscriber", static: false, private: false, access: { has: obj => "subscriber" in obj, get: obj => obj.subscriber, set: (obj, value) => { obj.subscriber = value; } }, metadata: _metadata }, _subscriber_initializers, _subscriber_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _currentStepIndex_decorators, { kind: "field", name: "currentStepIndex", static: false, private: false, access: { has: obj => "currentStepIndex" in obj, get: obj => obj.currentStepIndex, set: (obj, value) => { obj.currentStepIndex = value; } }, metadata: _metadata }, _currentStepIndex_initializers, _currentStepIndex_extraInitializers);
            __esDecorate(null, null, _stepResults_decorators, { kind: "field", name: "stepResults", static: false, private: false, access: { has: obj => "stepResults" in obj, get: obj => obj.stepResults, set: (obj, value) => { obj.stepResults = value; } }, metadata: _metadata }, _stepResults_initializers, _stepResults_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _startedAt_decorators, { kind: "field", name: "startedAt", static: false, private: false, access: { has: obj => "startedAt" in obj, get: obj => obj.startedAt, set: (obj, value) => { obj.startedAt = value; } }, metadata: _metadata }, _startedAt_initializers, _startedAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _executionTime_decorators, { kind: "field", name: "executionTime", static: false, private: false, access: { has: obj => "executionTime" in obj, get: obj => obj.executionTime, set: (obj, value) => { obj.executionTime = value; } }, metadata: _metadata }, _executionTime_initializers, _executionTime_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationExecution = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // Automation relation
        automationId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _automationId_initializers, void 0));
        automation = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _automation_initializers, void 0));
        // Trigger relation (optional)
        triggerId = (__runInitializers(this, _automation_extraInitializers), __runInitializers(this, _triggerId_initializers, void 0));
        trigger = (__runInitializers(this, _triggerId_extraInitializers), __runInitializers(this, _trigger_initializers, void 0));
        // Subscriber relation
        subscriberId = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        subscriber = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _subscriber_initializers, void 0));
        // Execution state
        status = (__runInitializers(this, _subscriber_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        currentStepIndex = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _currentStepIndex_initializers, void 0));
        stepResults = (__runInitializers(this, _currentStepIndex_extraInitializers), __runInitializers(this, _stepResults_initializers, void 0));
        error = (__runInitializers(this, _stepResults_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        // Timing
        startedAt = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _startedAt_initializers, void 0));
        completedAt = (__runInitializers(this, _startedAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        executionTime = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _executionTime_initializers, void 0)); // milliseconds
        // Lifecycle hooks
        calculateExecutionTime() {
            if (this.startedAt && this.completedAt) {
                this.executionTime = this.completedAt.getTime() - this.startedAt.getTime();
            }
        }
        // Helper methods
        start() {
            this.status = ExecutionStatus.RUNNING;
            this.startedAt = new Date();
        }
        complete() {
            this.status = ExecutionStatus.COMPLETED;
            this.completedAt = new Date();
        }
        fail(error) {
            this.status = ExecutionStatus.FAILED;
            this.error = error;
            this.completedAt = new Date();
        }
        cancel() {
            this.status = ExecutionStatus.CANCELLED;
            this.completedAt = new Date();
        }
        addStepResult(result) {
            this.stepResults = [...this.stepResults, result];
            this.currentStepIndex++;
        }
        getLastStepResult() {
            return this.stepResults.length > 0
                ? this.stepResults[this.stepResults.length - 1]
                : null;
        }
        getStepResult(stepId) {
            return this.stepResults.find((r) => r.stepId === stepId) || null;
        }
        hasCompletedStep(stepId) {
            const result = this.getStepResult(stepId);
            return result !== null && result.status === 'completed';
        }
        getTotalExecutionTime() {
            if (this.executionTime)
                return this.executionTime;
            if (!this.startedAt)
                return 0;
            const endTime = this.completedAt || new Date();
            return endTime.getTime() - this.startedAt.getTime();
        }
        getSuccessfulSteps() {
            return this.stepResults.filter((r) => r.status === 'completed').length;
        }
        getFailedSteps() {
            return this.stepResults.filter((r) => r.status === 'failed').length;
        }
        getProgress() {
            if (!this.automation || !this.automation.workflowSteps)
                return 0;
            const totalSteps = this.automation.workflowSteps.length;
            if (totalSteps === 0)
                return 100;
            return Math.round((this.stepResults.length / totalSteps) * 100);
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _executionTime_extraInitializers);
        }
    };
    return AutomationExecution = _classThis;
})();
exports.AutomationExecution = AutomationExecution;
//# sourceMappingURL=automation-execution.entity.js.map