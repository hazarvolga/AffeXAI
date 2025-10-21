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
exports.EmailAutomation = exports.TriggerType = exports.AutomationStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const segment_entity_1 = require("./segment.entity");
const automation_trigger_entity_1 = require("./automation-trigger.entity");
const automation_execution_entity_1 = require("./automation-execution.entity");
const automation_schedule_entity_1 = require("./automation-schedule.entity");
/**
 * Automation Status
 */
var AutomationStatus;
(function (AutomationStatus) {
    AutomationStatus["DRAFT"] = "draft";
    AutomationStatus["ACTIVE"] = "active";
    AutomationStatus["PAUSED"] = "paused";
    AutomationStatus["COMPLETED"] = "completed";
    AutomationStatus["ARCHIVED"] = "archived";
})(AutomationStatus || (exports.AutomationStatus = AutomationStatus = {}));
/**
 * Trigger Types
 */
var TriggerType;
(function (TriggerType) {
    TriggerType["EVENT"] = "event";
    TriggerType["BEHAVIOR"] = "behavior";
    TriggerType["TIME_BASED"] = "time_based";
    TriggerType["ATTRIBUTE"] = "attribute";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
/**
 * Email Automation Entity
 * Manages automated email workflows with triggers and multi-step flows
 */
let EmailAutomation = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_automations')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _instanceExtraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _triggerType_decorators;
    let _triggerType_initializers = [];
    let _triggerType_extraInitializers = [];
    let _triggerConfig_decorators;
    let _triggerConfig_initializers = [];
    let _triggerConfig_extraInitializers = [];
    let _workflowSteps_decorators;
    let _workflowSteps_initializers = [];
    let _workflowSteps_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _segmentId_decorators;
    let _segmentId_initializers = [];
    let _segmentId_extraInitializers = [];
    let _segment_decorators;
    let _segment_initializers = [];
    let _segment_extraInitializers = [];
    let _subscriberCount_decorators;
    let _subscriberCount_initializers = [];
    let _subscriberCount_extraInitializers = [];
    let _executionCount_decorators;
    let _executionCount_initializers = [];
    let _executionCount_extraInitializers = [];
    let _successRate_decorators;
    let _successRate_initializers = [];
    let _successRate_extraInitializers = [];
    let _avgExecutionTime_decorators;
    let _avgExecutionTime_initializers = [];
    let _avgExecutionTime_extraInitializers = [];
    let _lastExecutedAt_decorators;
    let _lastExecutedAt_initializers = [];
    let _lastExecutedAt_extraInitializers = [];
    let _triggers_decorators;
    let _triggers_initializers = [];
    let _triggers_extraInitializers = [];
    let _executions_decorators;
    let _executions_initializers = [];
    let _executions_extraInitializers = [];
    let _schedules_decorators;
    let _schedules_initializers = [];
    let _schedules_extraInitializers = [];
    let _validateWorkflow_decorators;
    var EmailAutomation = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 50,
                    default: AutomationStatus.DRAFT,
                })];
            _triggerType_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50 })];
            _triggerConfig_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: {} })];
            _workflowSteps_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', default: [] })];
            _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _segmentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _segment_decorators = [(0, typeorm_1.ManyToOne)(() => segment_entity_1.Segment, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'segmentId' })];
            _subscriberCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _executionCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _successRate_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 })];
            _avgExecutionTime_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _lastExecutedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _triggers_decorators = [(0, typeorm_1.OneToMany)(() => automation_trigger_entity_1.AutomationTrigger, (trigger) => trigger.automation)];
            _executions_decorators = [(0, typeorm_1.OneToMany)(() => automation_execution_entity_1.AutomationExecution, (execution) => execution.automation)];
            _schedules_decorators = [(0, typeorm_1.OneToMany)(() => automation_schedule_entity_1.AutomationSchedule, (schedule) => schedule.automation)];
            _validateWorkflow_decorators = [(0, typeorm_1.BeforeInsert)(), (0, typeorm_1.BeforeUpdate)()];
            __esDecorate(this, null, _validateWorkflow_decorators, { kind: "method", name: "validateWorkflow", static: false, private: false, access: { has: obj => "validateWorkflow" in obj, get: obj => obj.validateWorkflow }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _triggerType_decorators, { kind: "field", name: "triggerType", static: false, private: false, access: { has: obj => "triggerType" in obj, get: obj => obj.triggerType, set: (obj, value) => { obj.triggerType = value; } }, metadata: _metadata }, _triggerType_initializers, _triggerType_extraInitializers);
            __esDecorate(null, null, _triggerConfig_decorators, { kind: "field", name: "triggerConfig", static: false, private: false, access: { has: obj => "triggerConfig" in obj, get: obj => obj.triggerConfig, set: (obj, value) => { obj.triggerConfig = value; } }, metadata: _metadata }, _triggerConfig_initializers, _triggerConfig_extraInitializers);
            __esDecorate(null, null, _workflowSteps_decorators, { kind: "field", name: "workflowSteps", static: false, private: false, access: { has: obj => "workflowSteps" in obj, get: obj => obj.workflowSteps, set: (obj, value) => { obj.workflowSteps = value; } }, metadata: _metadata }, _workflowSteps_initializers, _workflowSteps_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _segmentId_decorators, { kind: "field", name: "segmentId", static: false, private: false, access: { has: obj => "segmentId" in obj, get: obj => obj.segmentId, set: (obj, value) => { obj.segmentId = value; } }, metadata: _metadata }, _segmentId_initializers, _segmentId_extraInitializers);
            __esDecorate(null, null, _segment_decorators, { kind: "field", name: "segment", static: false, private: false, access: { has: obj => "segment" in obj, get: obj => obj.segment, set: (obj, value) => { obj.segment = value; } }, metadata: _metadata }, _segment_initializers, _segment_extraInitializers);
            __esDecorate(null, null, _subscriberCount_decorators, { kind: "field", name: "subscriberCount", static: false, private: false, access: { has: obj => "subscriberCount" in obj, get: obj => obj.subscriberCount, set: (obj, value) => { obj.subscriberCount = value; } }, metadata: _metadata }, _subscriberCount_initializers, _subscriberCount_extraInitializers);
            __esDecorate(null, null, _executionCount_decorators, { kind: "field", name: "executionCount", static: false, private: false, access: { has: obj => "executionCount" in obj, get: obj => obj.executionCount, set: (obj, value) => { obj.executionCount = value; } }, metadata: _metadata }, _executionCount_initializers, _executionCount_extraInitializers);
            __esDecorate(null, null, _successRate_decorators, { kind: "field", name: "successRate", static: false, private: false, access: { has: obj => "successRate" in obj, get: obj => obj.successRate, set: (obj, value) => { obj.successRate = value; } }, metadata: _metadata }, _successRate_initializers, _successRate_extraInitializers);
            __esDecorate(null, null, _avgExecutionTime_decorators, { kind: "field", name: "avgExecutionTime", static: false, private: false, access: { has: obj => "avgExecutionTime" in obj, get: obj => obj.avgExecutionTime, set: (obj, value) => { obj.avgExecutionTime = value; } }, metadata: _metadata }, _avgExecutionTime_initializers, _avgExecutionTime_extraInitializers);
            __esDecorate(null, null, _lastExecutedAt_decorators, { kind: "field", name: "lastExecutedAt", static: false, private: false, access: { has: obj => "lastExecutedAt" in obj, get: obj => obj.lastExecutedAt, set: (obj, value) => { obj.lastExecutedAt = value; } }, metadata: _metadata }, _lastExecutedAt_initializers, _lastExecutedAt_extraInitializers);
            __esDecorate(null, null, _triggers_decorators, { kind: "field", name: "triggers", static: false, private: false, access: { has: obj => "triggers" in obj, get: obj => obj.triggers, set: (obj, value) => { obj.triggers = value; } }, metadata: _metadata }, _triggers_initializers, _triggers_extraInitializers);
            __esDecorate(null, null, _executions_decorators, { kind: "field", name: "executions", static: false, private: false, access: { has: obj => "executions" in obj, get: obj => obj.executions, set: (obj, value) => { obj.executions = value; } }, metadata: _metadata }, _executions_initializers, _executions_extraInitializers);
            __esDecorate(null, null, _schedules_decorators, { kind: "field", name: "schedules", static: false, private: false, access: { has: obj => "schedules" in obj, get: obj => obj.schedules, set: (obj, value) => { obj.schedules = value; } }, metadata: _metadata }, _schedules_initializers, _schedules_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailAutomation = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, void 0));
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        triggerType = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _triggerType_initializers, void 0));
        triggerConfig = (__runInitializers(this, _triggerType_extraInitializers), __runInitializers(this, _triggerConfig_initializers, void 0));
        workflowSteps = (__runInitializers(this, _triggerConfig_extraInitializers), __runInitializers(this, _workflowSteps_initializers, void 0));
        isActive = (__runInitializers(this, _workflowSteps_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        // Segment relation (optional - can target all subscribers)
        segmentId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _segmentId_initializers, void 0));
        segment = (__runInitializers(this, _segmentId_extraInitializers), __runInitializers(this, _segment_initializers, void 0));
        // Statistics
        subscriberCount = (__runInitializers(this, _segment_extraInitializers), __runInitializers(this, _subscriberCount_initializers, void 0));
        executionCount = (__runInitializers(this, _subscriberCount_extraInitializers), __runInitializers(this, _executionCount_initializers, void 0));
        successRate = (__runInitializers(this, _executionCount_extraInitializers), __runInitializers(this, _successRate_initializers, void 0));
        avgExecutionTime = (__runInitializers(this, _successRate_extraInitializers), __runInitializers(this, _avgExecutionTime_initializers, void 0)); // milliseconds
        lastExecutedAt = (__runInitializers(this, _avgExecutionTime_extraInitializers), __runInitializers(this, _lastExecutedAt_initializers, void 0));
        // Relations
        triggers = (__runInitializers(this, _lastExecutedAt_extraInitializers), __runInitializers(this, _triggers_initializers, void 0));
        executions = (__runInitializers(this, _triggers_extraInitializers), __runInitializers(this, _executions_initializers, void 0));
        schedules = (__runInitializers(this, _executions_extraInitializers), __runInitializers(this, _schedules_initializers, void 0));
        // Lifecycle hooks
        validateWorkflow() {
            if (this.workflowSteps && this.workflowSteps.length > 0) {
                // Validate step IDs are unique
                const stepIds = this.workflowSteps.map((step) => step.id);
                const uniqueIds = new Set(stepIds);
                if (stepIds.length !== uniqueIds.size) {
                    throw new Error('Workflow steps must have unique IDs');
                }
                // Validate nextStepId references exist
                for (const step of this.workflowSteps) {
                    if (step.nextStepId && !stepIds.includes(step.nextStepId)) {
                        throw new Error(`Invalid nextStepId reference: ${step.nextStepId}`);
                    }
                    if (step.conditionalPaths) {
                        for (const path of step.conditionalPaths) {
                            if (!stepIds.includes(path.nextStepId)) {
                                throw new Error(`Invalid conditional path nextStepId: ${path.nextStepId}`);
                            }
                        }
                    }
                }
            }
        }
        // Helper methods
        isRunning() {
            return this.status === AutomationStatus.ACTIVE && this.isActive;
        }
        canBeActivated() {
            return (this.status === AutomationStatus.DRAFT ||
                this.status === AutomationStatus.PAUSED) &&
                this.workflowSteps.length > 0;
        }
        pause() {
            if (this.status === AutomationStatus.ACTIVE) {
                this.status = AutomationStatus.PAUSED;
                this.isActive = false;
            }
        }
        activate() {
            if (this.canBeActivated()) {
                this.status = AutomationStatus.ACTIVE;
                this.isActive = true;
            }
        }
        archive() {
            this.status = AutomationStatus.ARCHIVED;
            this.isActive = false;
        }
        updateStatistics(execution) {
            this.executionCount++;
            this.lastExecutedAt = new Date();
            // Calculate success rate
            const successfulExecutions = this.executions.filter((e) => e.status === 'completed').length;
            this.successRate = (successfulExecutions / this.executionCount) * 100;
            // Calculate average execution time
            const totalTime = this.executions.reduce((sum, e) => sum + (e.executionTime || 0), 0);
            this.avgExecutionTime = Math.round(totalTime / this.executionCount);
        }
        getFirstStep() {
            return this.workflowSteps.length > 0 ? this.workflowSteps[0] : null;
        }
        getStepById(stepId) {
            return this.workflowSteps.find((step) => step.id === stepId) || null;
        }
        getNextStep(currentStepId, conditionResult) {
            const currentStep = this.getStepById(currentStepId);
            if (!currentStep)
                return null;
            // Handle conditional paths
            if (currentStep.type === 'condition' && currentStep.conditionalPaths) {
                const path = currentStep.conditionalPaths.find((p) => p.condition === (conditionResult ? 'true' : 'false'));
                return path ? this.getStepById(path.nextStepId) : null;
            }
            // Handle regular next step
            return currentStep.nextStepId ? this.getStepById(currentStep.nextStepId) : null;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _schedules_extraInitializers);
        }
    };
    return EmailAutomation = _classThis;
})();
exports.EmailAutomation = EmailAutomation;
//# sourceMappingURL=email-automation.entity.js.map