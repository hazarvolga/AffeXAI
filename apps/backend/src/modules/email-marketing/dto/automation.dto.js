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
exports.AnalyticsResponseDto = exports.ExecutionResponseDto = exports.AutomationResponseDto = exports.AutomationAnalyticsDto = exports.GetExecutionsQueryDto = exports.TestAutomationDto = exports.PauseAutomationDto = exports.ActivateAutomationDto = exports.WorkflowStepDto = exports.UpdateAutomationDto = exports.CreateAutomationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const email_automation_entity_1 = require("../entities/email-automation.entity");
/**
 * Create Automation DTO
 */
let CreateAutomationDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _triggerType_decorators;
    let _triggerType_initializers = [];
    let _triggerType_extraInitializers = [];
    let _triggerConfig_decorators;
    let _triggerConfig_initializers = [];
    let _triggerConfig_extraInitializers = [];
    let _workflowSteps_decorators;
    let _workflowSteps_initializers = [];
    let _workflowSteps_extraInitializers = [];
    let _segmentId_decorators;
    let _segmentId_initializers = [];
    let _segmentId_extraInitializers = [];
    return class CreateAutomationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Automation name', example: 'Welcome Series' }), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Automation description' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _triggerType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Trigger type',
                    enum: email_automation_entity_1.TriggerType,
                    example: email_automation_entity_1.TriggerType.EVENT
                }), (0, class_validator_1.IsEnum)(email_automation_entity_1.TriggerType)];
            _triggerConfig_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Trigger configuration (JSON)',
                    example: { events: ['subscriber.created'] }
                }), (0, class_validator_1.IsObject)()];
            _workflowSteps_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Workflow steps',
                    type: 'array',
                    example: [
                        {
                            id: 'step1',
                            type: 'send_email',
                            config: { templateId: '123', subject: 'Welcome!' },
                            nextStepId: 'step2'
                        }
                    ]
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(() => WorkflowStepDto)];
            _segmentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Target segment ID (UUID)' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _triggerType_decorators, { kind: "field", name: "triggerType", static: false, private: false, access: { has: obj => "triggerType" in obj, get: obj => obj.triggerType, set: (obj, value) => { obj.triggerType = value; } }, metadata: _metadata }, _triggerType_initializers, _triggerType_extraInitializers);
            __esDecorate(null, null, _triggerConfig_decorators, { kind: "field", name: "triggerConfig", static: false, private: false, access: { has: obj => "triggerConfig" in obj, get: obj => obj.triggerConfig, set: (obj, value) => { obj.triggerConfig = value; } }, metadata: _metadata }, _triggerConfig_initializers, _triggerConfig_extraInitializers);
            __esDecorate(null, null, _workflowSteps_decorators, { kind: "field", name: "workflowSteps", static: false, private: false, access: { has: obj => "workflowSteps" in obj, get: obj => obj.workflowSteps, set: (obj, value) => { obj.workflowSteps = value; } }, metadata: _metadata }, _workflowSteps_initializers, _workflowSteps_extraInitializers);
            __esDecorate(null, null, _segmentId_decorators, { kind: "field", name: "segmentId", static: false, private: false, access: { has: obj => "segmentId" in obj, get: obj => obj.segmentId, set: (obj, value) => { obj.segmentId = value; } }, metadata: _metadata }, _segmentId_initializers, _segmentId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        triggerType = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _triggerType_initializers, void 0));
        triggerConfig = (__runInitializers(this, _triggerType_extraInitializers), __runInitializers(this, _triggerConfig_initializers, void 0));
        workflowSteps = (__runInitializers(this, _triggerConfig_extraInitializers), __runInitializers(this, _workflowSteps_initializers, void 0));
        segmentId = (__runInitializers(this, _workflowSteps_extraInitializers), __runInitializers(this, _segmentId_initializers, void 0));
        constructor() {
            __runInitializers(this, _segmentId_extraInitializers);
        }
    };
})();
exports.CreateAutomationDto = CreateAutomationDto;
/**
 * Update Automation DTO
 */
let UpdateAutomationDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _triggerConfig_decorators;
    let _triggerConfig_initializers = [];
    let _triggerConfig_extraInitializers = [];
    let _workflowSteps_decorators;
    let _workflowSteps_initializers = [];
    let _workflowSteps_extraInitializers = [];
    let _segmentId_decorators;
    let _segmentId_initializers = [];
    let _segmentId_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    return class UpdateAutomationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Automation name' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Automation description' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Automation status',
                    enum: email_automation_entity_1.AutomationStatus
                }), (0, class_validator_1.IsEnum)(email_automation_entity_1.AutomationStatus), (0, class_validator_1.IsOptional)()];
            _triggerConfig_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Trigger configuration (JSON)' }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _workflowSteps_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Workflow steps' }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(() => WorkflowStepDto), (0, class_validator_1.IsOptional)()];
            _segmentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Target segment ID (UUID)' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Is active flag' }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _triggerConfig_decorators, { kind: "field", name: "triggerConfig", static: false, private: false, access: { has: obj => "triggerConfig" in obj, get: obj => obj.triggerConfig, set: (obj, value) => { obj.triggerConfig = value; } }, metadata: _metadata }, _triggerConfig_initializers, _triggerConfig_extraInitializers);
            __esDecorate(null, null, _workflowSteps_decorators, { kind: "field", name: "workflowSteps", static: false, private: false, access: { has: obj => "workflowSteps" in obj, get: obj => obj.workflowSteps, set: (obj, value) => { obj.workflowSteps = value; } }, metadata: _metadata }, _workflowSteps_initializers, _workflowSteps_extraInitializers);
            __esDecorate(null, null, _segmentId_decorators, { kind: "field", name: "segmentId", static: false, private: false, access: { has: obj => "segmentId" in obj, get: obj => obj.segmentId, set: (obj, value) => { obj.segmentId = value; } }, metadata: _metadata }, _segmentId_initializers, _segmentId_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        triggerConfig = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _triggerConfig_initializers, void 0));
        workflowSteps = (__runInitializers(this, _triggerConfig_extraInitializers), __runInitializers(this, _workflowSteps_initializers, void 0));
        segmentId = (__runInitializers(this, _workflowSteps_extraInitializers), __runInitializers(this, _segmentId_initializers, void 0));
        isActive = (__runInitializers(this, _segmentId_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        constructor() {
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
exports.UpdateAutomationDto = UpdateAutomationDto;
/**
 * Workflow Step DTO
 */
let WorkflowStepDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _nextStepId_decorators;
    let _nextStepId_initializers = [];
    let _nextStepId_extraInitializers = [];
    let _conditionalPaths_decorators;
    let _conditionalPaths_initializers = [];
    let _conditionalPaths_extraInitializers = [];
    return class WorkflowStepDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Step ID (unique within workflow)', example: 'step1' }), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Step type',
                    enum: ['send_email', 'delay', 'condition', 'split', 'exit'],
                    example: 'send_email'
                }), (0, class_validator_1.IsEnum)(['send_email', 'delay', 'condition', 'split', 'exit'])];
            _config_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Step configuration (JSON)',
                    example: { templateId: '123', subject: 'Welcome!' }
                }), (0, class_validator_1.IsObject)()];
            _nextStepId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Next step ID' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _conditionalPaths_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Conditional paths (for condition/split steps)',
                    type: 'array'
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _nextStepId_decorators, { kind: "field", name: "nextStepId", static: false, private: false, access: { has: obj => "nextStepId" in obj, get: obj => obj.nextStepId, set: (obj, value) => { obj.nextStepId = value; } }, metadata: _metadata }, _nextStepId_initializers, _nextStepId_extraInitializers);
            __esDecorate(null, null, _conditionalPaths_decorators, { kind: "field", name: "conditionalPaths", static: false, private: false, access: { has: obj => "conditionalPaths" in obj, get: obj => obj.conditionalPaths, set: (obj, value) => { obj.conditionalPaths = value; } }, metadata: _metadata }, _conditionalPaths_initializers, _conditionalPaths_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        config = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _config_initializers, void 0));
        nextStepId = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _nextStepId_initializers, void 0));
        conditionalPaths = (__runInitializers(this, _nextStepId_extraInitializers), __runInitializers(this, _conditionalPaths_initializers, void 0));
        constructor() {
            __runInitializers(this, _conditionalPaths_extraInitializers);
        }
    };
})();
exports.WorkflowStepDto = WorkflowStepDto;
/**
 * Activate Automation DTO
 */
let ActivateAutomationDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _registerExistingSubscribers_decorators;
    let _registerExistingSubscribers_initializers = [];
    let _registerExistingSubscribers_extraInitializers = [];
    return class ActivateAutomationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Automation ID (UUID)' }), (0, class_validator_1.IsUUID)()];
            _registerExistingSubscribers_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Register existing subscribers',
                    default: false
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _registerExistingSubscribers_decorators, { kind: "field", name: "registerExistingSubscribers", static: false, private: false, access: { has: obj => "registerExistingSubscribers" in obj, get: obj => obj.registerExistingSubscribers, set: (obj, value) => { obj.registerExistingSubscribers = value; } }, metadata: _metadata }, _registerExistingSubscribers_initializers, _registerExistingSubscribers_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        registerExistingSubscribers = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _registerExistingSubscribers_initializers, void 0));
        constructor() {
            __runInitializers(this, _registerExistingSubscribers_extraInitializers);
        }
    };
})();
exports.ActivateAutomationDto = ActivateAutomationDto;
/**
 * Pause Automation DTO
 */
let PauseAutomationDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _cancelPendingExecutions_decorators;
    let _cancelPendingExecutions_initializers = [];
    let _cancelPendingExecutions_extraInitializers = [];
    return class PauseAutomationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Automation ID (UUID)' }), (0, class_validator_1.IsUUID)()];
            _cancelPendingExecutions_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Cancel pending executions',
                    default: false
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _cancelPendingExecutions_decorators, { kind: "field", name: "cancelPendingExecutions", static: false, private: false, access: { has: obj => "cancelPendingExecutions" in obj, get: obj => obj.cancelPendingExecutions, set: (obj, value) => { obj.cancelPendingExecutions = value; } }, metadata: _metadata }, _cancelPendingExecutions_initializers, _cancelPendingExecutions_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        cancelPendingExecutions = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _cancelPendingExecutions_initializers, void 0));
        constructor() {
            __runInitializers(this, _cancelPendingExecutions_extraInitializers);
        }
    };
})();
exports.PauseAutomationDto = PauseAutomationDto;
/**
 * Test Automation DTO
 */
let TestAutomationDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _dryRun_decorators;
    let _dryRun_initializers = [];
    let _dryRun_extraInitializers = [];
    return class TestAutomationDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Automation ID (UUID)' }), (0, class_validator_1.IsUUID)()];
            _subscriberId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Test subscriber ID (UUID)' }), (0, class_validator_1.IsUUID)()];
            _dryRun_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Test mode (dry run)', default: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _dryRun_decorators, { kind: "field", name: "dryRun", static: false, private: false, access: { has: obj => "dryRun" in obj, get: obj => obj.dryRun, set: (obj, value) => { obj.dryRun = value; } }, metadata: _metadata }, _dryRun_initializers, _dryRun_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        subscriberId = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        dryRun = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _dryRun_initializers, void 0));
        constructor() {
            __runInitializers(this, _dryRun_extraInitializers);
        }
    };
})();
exports.TestAutomationDto = TestAutomationDto;
/**
 * Get Executions Query DTO
 */
let GetExecutionsQueryDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class GetExecutionsQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Automation ID filter' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _subscriberId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Subscriber ID filter' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Status filter',
                    enum: ['pending', 'running', 'completed', 'failed', 'cancelled']
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number', default: 1, minimum: 1 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsOptional)()];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', default: 20, minimum: 1, maximum: 100 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_transformer_1.Type)(() => Number), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        subscriberId = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        status = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        page = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _page_initializers, 1));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.GetExecutionsQueryDto = GetExecutionsQueryDto;
/**
 * Automation Analytics DTO
 */
let AutomationAnalyticsDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _startDate_decorators;
    let _startDate_initializers = [];
    let _startDate_extraInitializers = [];
    let _endDate_decorators;
    let _endDate_initializers = [];
    let _endDate_extraInitializers = [];
    return class AutomationAnalyticsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Automation ID (UUID)' }), (0, class_validator_1.IsUUID)()];
            _startDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date (ISO 8601)' }), (0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _endDate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date (ISO 8601)' }), (0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: obj => "startDate" in obj, get: obj => obj.startDate, set: (obj, value) => { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: obj => "endDate" in obj, get: obj => obj.endDate, set: (obj, value) => { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        startDate = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
        endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
        constructor() {
            __runInitializers(this, _endDate_extraInitializers);
        }
    };
})();
exports.AutomationAnalyticsDto = AutomationAnalyticsDto;
/**
 * Automation Response DTO
 */
let AutomationResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
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
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    return class AutomationResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)()];
            _name_decorators = [(0, swagger_1.ApiProperty)()];
            _description_decorators = [(0, swagger_1.ApiProperty)()];
            _status_decorators = [(0, swagger_1.ApiProperty)({ enum: email_automation_entity_1.AutomationStatus })];
            _triggerType_decorators = [(0, swagger_1.ApiProperty)({ enum: email_automation_entity_1.TriggerType })];
            _triggerConfig_decorators = [(0, swagger_1.ApiProperty)()];
            _workflowSteps_decorators = [(0, swagger_1.ApiProperty)()];
            _isActive_decorators = [(0, swagger_1.ApiProperty)()];
            _segmentId_decorators = [(0, swagger_1.ApiProperty)()];
            _subscriberCount_decorators = [(0, swagger_1.ApiProperty)()];
            _executionCount_decorators = [(0, swagger_1.ApiProperty)()];
            _successRate_decorators = [(0, swagger_1.ApiProperty)()];
            _avgExecutionTime_decorators = [(0, swagger_1.ApiProperty)()];
            _lastExecutedAt_decorators = [(0, swagger_1.ApiProperty)()];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)()];
            _updatedAt_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _triggerType_decorators, { kind: "field", name: "triggerType", static: false, private: false, access: { has: obj => "triggerType" in obj, get: obj => obj.triggerType, set: (obj, value) => { obj.triggerType = value; } }, metadata: _metadata }, _triggerType_initializers, _triggerType_extraInitializers);
            __esDecorate(null, null, _triggerConfig_decorators, { kind: "field", name: "triggerConfig", static: false, private: false, access: { has: obj => "triggerConfig" in obj, get: obj => obj.triggerConfig, set: (obj, value) => { obj.triggerConfig = value; } }, metadata: _metadata }, _triggerConfig_initializers, _triggerConfig_extraInitializers);
            __esDecorate(null, null, _workflowSteps_decorators, { kind: "field", name: "workflowSteps", static: false, private: false, access: { has: obj => "workflowSteps" in obj, get: obj => obj.workflowSteps, set: (obj, value) => { obj.workflowSteps = value; } }, metadata: _metadata }, _workflowSteps_initializers, _workflowSteps_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _segmentId_decorators, { kind: "field", name: "segmentId", static: false, private: false, access: { has: obj => "segmentId" in obj, get: obj => obj.segmentId, set: (obj, value) => { obj.segmentId = value; } }, metadata: _metadata }, _segmentId_initializers, _segmentId_extraInitializers);
            __esDecorate(null, null, _subscriberCount_decorators, { kind: "field", name: "subscriberCount", static: false, private: false, access: { has: obj => "subscriberCount" in obj, get: obj => obj.subscriberCount, set: (obj, value) => { obj.subscriberCount = value; } }, metadata: _metadata }, _subscriberCount_initializers, _subscriberCount_extraInitializers);
            __esDecorate(null, null, _executionCount_decorators, { kind: "field", name: "executionCount", static: false, private: false, access: { has: obj => "executionCount" in obj, get: obj => obj.executionCount, set: (obj, value) => { obj.executionCount = value; } }, metadata: _metadata }, _executionCount_initializers, _executionCount_extraInitializers);
            __esDecorate(null, null, _successRate_decorators, { kind: "field", name: "successRate", static: false, private: false, access: { has: obj => "successRate" in obj, get: obj => obj.successRate, set: (obj, value) => { obj.successRate = value; } }, metadata: _metadata }, _successRate_initializers, _successRate_extraInitializers);
            __esDecorate(null, null, _avgExecutionTime_decorators, { kind: "field", name: "avgExecutionTime", static: false, private: false, access: { has: obj => "avgExecutionTime" in obj, get: obj => obj.avgExecutionTime, set: (obj, value) => { obj.avgExecutionTime = value; } }, metadata: _metadata }, _avgExecutionTime_initializers, _avgExecutionTime_extraInitializers);
            __esDecorate(null, null, _lastExecutedAt_decorators, { kind: "field", name: "lastExecutedAt", static: false, private: false, access: { has: obj => "lastExecutedAt" in obj, get: obj => obj.lastExecutedAt, set: (obj, value) => { obj.lastExecutedAt = value; } }, metadata: _metadata }, _lastExecutedAt_initializers, _lastExecutedAt_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        triggerType = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _triggerType_initializers, void 0));
        triggerConfig = (__runInitializers(this, _triggerType_extraInitializers), __runInitializers(this, _triggerConfig_initializers, void 0));
        workflowSteps = (__runInitializers(this, _triggerConfig_extraInitializers), __runInitializers(this, _workflowSteps_initializers, void 0));
        isActive = (__runInitializers(this, _workflowSteps_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        segmentId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _segmentId_initializers, void 0));
        subscriberCount = (__runInitializers(this, _segmentId_extraInitializers), __runInitializers(this, _subscriberCount_initializers, void 0));
        executionCount = (__runInitializers(this, _subscriberCount_extraInitializers), __runInitializers(this, _executionCount_initializers, void 0));
        successRate = (__runInitializers(this, _executionCount_extraInitializers), __runInitializers(this, _successRate_initializers, void 0));
        avgExecutionTime = (__runInitializers(this, _successRate_extraInitializers), __runInitializers(this, _avgExecutionTime_initializers, void 0));
        lastExecutedAt = (__runInitializers(this, _avgExecutionTime_extraInitializers), __runInitializers(this, _lastExecutedAt_initializers, void 0));
        createdAt = (__runInitializers(this, _lastExecutedAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
})();
exports.AutomationResponseDto = AutomationResponseDto;
/**
 * Execution Response DTO
 */
let ExecutionResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _subscriberId_decorators;
    let _subscriberId_initializers = [];
    let _subscriberId_extraInitializers = [];
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
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    return class ExecutionResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)()];
            _automationId_decorators = [(0, swagger_1.ApiProperty)()];
            _subscriberId_decorators = [(0, swagger_1.ApiProperty)()];
            _status_decorators = [(0, swagger_1.ApiProperty)()];
            _currentStepIndex_decorators = [(0, swagger_1.ApiProperty)()];
            _stepResults_decorators = [(0, swagger_1.ApiProperty)()];
            _error_decorators = [(0, swagger_1.ApiProperty)()];
            _startedAt_decorators = [(0, swagger_1.ApiProperty)()];
            _completedAt_decorators = [(0, swagger_1.ApiProperty)()];
            _executionTime_decorators = [(0, swagger_1.ApiProperty)()];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)()];
            _updatedAt_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _subscriberId_decorators, { kind: "field", name: "subscriberId", static: false, private: false, access: { has: obj => "subscriberId" in obj, get: obj => obj.subscriberId, set: (obj, value) => { obj.subscriberId = value; } }, metadata: _metadata }, _subscriberId_initializers, _subscriberId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _currentStepIndex_decorators, { kind: "field", name: "currentStepIndex", static: false, private: false, access: { has: obj => "currentStepIndex" in obj, get: obj => obj.currentStepIndex, set: (obj, value) => { obj.currentStepIndex = value; } }, metadata: _metadata }, _currentStepIndex_initializers, _currentStepIndex_extraInitializers);
            __esDecorate(null, null, _stepResults_decorators, { kind: "field", name: "stepResults", static: false, private: false, access: { has: obj => "stepResults" in obj, get: obj => obj.stepResults, set: (obj, value) => { obj.stepResults = value; } }, metadata: _metadata }, _stepResults_initializers, _stepResults_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _startedAt_decorators, { kind: "field", name: "startedAt", static: false, private: false, access: { has: obj => "startedAt" in obj, get: obj => obj.startedAt, set: (obj, value) => { obj.startedAt = value; } }, metadata: _metadata }, _startedAt_initializers, _startedAt_extraInitializers);
            __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: obj => "completedAt" in obj, get: obj => obj.completedAt, set: (obj, value) => { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
            __esDecorate(null, null, _executionTime_decorators, { kind: "field", name: "executionTime", static: false, private: false, access: { has: obj => "executionTime" in obj, get: obj => obj.executionTime, set: (obj, value) => { obj.executionTime = value; } }, metadata: _metadata }, _executionTime_initializers, _executionTime_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        automationId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _automationId_initializers, void 0));
        subscriberId = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _subscriberId_initializers, void 0));
        status = (__runInitializers(this, _subscriberId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        currentStepIndex = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _currentStepIndex_initializers, void 0));
        stepResults = (__runInitializers(this, _currentStepIndex_extraInitializers), __runInitializers(this, _stepResults_initializers, void 0));
        error = (__runInitializers(this, _stepResults_extraInitializers), __runInitializers(this, _error_initializers, void 0));
        startedAt = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _startedAt_initializers, void 0));
        completedAt = (__runInitializers(this, _startedAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
        executionTime = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _executionTime_initializers, void 0));
        createdAt = (__runInitializers(this, _executionTime_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
})();
exports.ExecutionResponseDto = ExecutionResponseDto;
/**
 * Analytics Response DTO
 */
let AnalyticsResponseDto = (() => {
    let _automationId_decorators;
    let _automationId_initializers = [];
    let _automationId_extraInitializers = [];
    let _automationName_decorators;
    let _automationName_initializers = [];
    let _automationName_extraInitializers = [];
    let _totalExecutions_decorators;
    let _totalExecutions_initializers = [];
    let _totalExecutions_extraInitializers = [];
    let _completedExecutions_decorators;
    let _completedExecutions_initializers = [];
    let _completedExecutions_extraInitializers = [];
    let _failedExecutions_decorators;
    let _failedExecutions_initializers = [];
    let _failedExecutions_extraInitializers = [];
    let _successRate_decorators;
    let _successRate_initializers = [];
    let _successRate_extraInitializers = [];
    let _avgExecutionTime_decorators;
    let _avgExecutionTime_initializers = [];
    let _avgExecutionTime_extraInitializers = [];
    let _totalSubscribers_decorators;
    let _totalSubscribers_initializers = [];
    let _totalSubscribers_extraInitializers = [];
    let _activeSubscribers_decorators;
    let _activeSubscribers_initializers = [];
    let _activeSubscribers_extraInitializers = [];
    let _stepPerformance_decorators;
    let _stepPerformance_initializers = [];
    let _stepPerformance_extraInitializers = [];
    let _timeline_decorators;
    let _timeline_initializers = [];
    let _timeline_extraInitializers = [];
    return class AnalyticsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _automationId_decorators = [(0, swagger_1.ApiProperty)()];
            _automationName_decorators = [(0, swagger_1.ApiProperty)()];
            _totalExecutions_decorators = [(0, swagger_1.ApiProperty)()];
            _completedExecutions_decorators = [(0, swagger_1.ApiProperty)()];
            _failedExecutions_decorators = [(0, swagger_1.ApiProperty)()];
            _successRate_decorators = [(0, swagger_1.ApiProperty)()];
            _avgExecutionTime_decorators = [(0, swagger_1.ApiProperty)()];
            _totalSubscribers_decorators = [(0, swagger_1.ApiProperty)()];
            _activeSubscribers_decorators = [(0, swagger_1.ApiProperty)()];
            _stepPerformance_decorators = [(0, swagger_1.ApiProperty)()];
            _timeline_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _automationId_decorators, { kind: "field", name: "automationId", static: false, private: false, access: { has: obj => "automationId" in obj, get: obj => obj.automationId, set: (obj, value) => { obj.automationId = value; } }, metadata: _metadata }, _automationId_initializers, _automationId_extraInitializers);
            __esDecorate(null, null, _automationName_decorators, { kind: "field", name: "automationName", static: false, private: false, access: { has: obj => "automationName" in obj, get: obj => obj.automationName, set: (obj, value) => { obj.automationName = value; } }, metadata: _metadata }, _automationName_initializers, _automationName_extraInitializers);
            __esDecorate(null, null, _totalExecutions_decorators, { kind: "field", name: "totalExecutions", static: false, private: false, access: { has: obj => "totalExecutions" in obj, get: obj => obj.totalExecutions, set: (obj, value) => { obj.totalExecutions = value; } }, metadata: _metadata }, _totalExecutions_initializers, _totalExecutions_extraInitializers);
            __esDecorate(null, null, _completedExecutions_decorators, { kind: "field", name: "completedExecutions", static: false, private: false, access: { has: obj => "completedExecutions" in obj, get: obj => obj.completedExecutions, set: (obj, value) => { obj.completedExecutions = value; } }, metadata: _metadata }, _completedExecutions_initializers, _completedExecutions_extraInitializers);
            __esDecorate(null, null, _failedExecutions_decorators, { kind: "field", name: "failedExecutions", static: false, private: false, access: { has: obj => "failedExecutions" in obj, get: obj => obj.failedExecutions, set: (obj, value) => { obj.failedExecutions = value; } }, metadata: _metadata }, _failedExecutions_initializers, _failedExecutions_extraInitializers);
            __esDecorate(null, null, _successRate_decorators, { kind: "field", name: "successRate", static: false, private: false, access: { has: obj => "successRate" in obj, get: obj => obj.successRate, set: (obj, value) => { obj.successRate = value; } }, metadata: _metadata }, _successRate_initializers, _successRate_extraInitializers);
            __esDecorate(null, null, _avgExecutionTime_decorators, { kind: "field", name: "avgExecutionTime", static: false, private: false, access: { has: obj => "avgExecutionTime" in obj, get: obj => obj.avgExecutionTime, set: (obj, value) => { obj.avgExecutionTime = value; } }, metadata: _metadata }, _avgExecutionTime_initializers, _avgExecutionTime_extraInitializers);
            __esDecorate(null, null, _totalSubscribers_decorators, { kind: "field", name: "totalSubscribers", static: false, private: false, access: { has: obj => "totalSubscribers" in obj, get: obj => obj.totalSubscribers, set: (obj, value) => { obj.totalSubscribers = value; } }, metadata: _metadata }, _totalSubscribers_initializers, _totalSubscribers_extraInitializers);
            __esDecorate(null, null, _activeSubscribers_decorators, { kind: "field", name: "activeSubscribers", static: false, private: false, access: { has: obj => "activeSubscribers" in obj, get: obj => obj.activeSubscribers, set: (obj, value) => { obj.activeSubscribers = value; } }, metadata: _metadata }, _activeSubscribers_initializers, _activeSubscribers_extraInitializers);
            __esDecorate(null, null, _stepPerformance_decorators, { kind: "field", name: "stepPerformance", static: false, private: false, access: { has: obj => "stepPerformance" in obj, get: obj => obj.stepPerformance, set: (obj, value) => { obj.stepPerformance = value; } }, metadata: _metadata }, _stepPerformance_initializers, _stepPerformance_extraInitializers);
            __esDecorate(null, null, _timeline_decorators, { kind: "field", name: "timeline", static: false, private: false, access: { has: obj => "timeline" in obj, get: obj => obj.timeline, set: (obj, value) => { obj.timeline = value; } }, metadata: _metadata }, _timeline_initializers, _timeline_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        automationId = __runInitializers(this, _automationId_initializers, void 0);
        automationName = (__runInitializers(this, _automationId_extraInitializers), __runInitializers(this, _automationName_initializers, void 0));
        totalExecutions = (__runInitializers(this, _automationName_extraInitializers), __runInitializers(this, _totalExecutions_initializers, void 0));
        completedExecutions = (__runInitializers(this, _totalExecutions_extraInitializers), __runInitializers(this, _completedExecutions_initializers, void 0));
        failedExecutions = (__runInitializers(this, _completedExecutions_extraInitializers), __runInitializers(this, _failedExecutions_initializers, void 0));
        successRate = (__runInitializers(this, _failedExecutions_extraInitializers), __runInitializers(this, _successRate_initializers, void 0));
        avgExecutionTime = (__runInitializers(this, _successRate_extraInitializers), __runInitializers(this, _avgExecutionTime_initializers, void 0));
        totalSubscribers = (__runInitializers(this, _avgExecutionTime_extraInitializers), __runInitializers(this, _totalSubscribers_initializers, void 0));
        activeSubscribers = (__runInitializers(this, _totalSubscribers_extraInitializers), __runInitializers(this, _activeSubscribers_initializers, void 0));
        stepPerformance = (__runInitializers(this, _activeSubscribers_extraInitializers), __runInitializers(this, _stepPerformance_initializers, void 0));
        timeline = (__runInitializers(this, _stepPerformance_extraInitializers), __runInitializers(this, _timeline_initializers, void 0));
        constructor() {
            __runInitializers(this, _timeline_extraInitializers);
        }
    };
})();
exports.AnalyticsResponseDto = AnalyticsResponseDto;
//# sourceMappingURL=automation.dto.js.map