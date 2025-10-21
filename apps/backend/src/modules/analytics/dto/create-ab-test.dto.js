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
exports.UpdateABTestDto = exports.CreateABTestDto = exports.TargetAudienceDto = exports.ABTestVariantDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const entities_1 = require("../entities");
let ABTestVariantDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _componentConfig_decorators;
    let _componentConfig_initializers = [];
    let _componentConfig_extraInitializers = [];
    let _trafficAllocation_decorators;
    let _trafficAllocation_initializers = [];
    let _trafficAllocation_extraInitializers = [];
    return class ABTestVariantDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _componentConfig_decorators = [(0, class_validator_1.IsObject)()];
            _trafficAllocation_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _componentConfig_decorators, { kind: "field", name: "componentConfig", static: false, private: false, access: { has: obj => "componentConfig" in obj, get: obj => obj.componentConfig, set: (obj, value) => { obj.componentConfig = value; } }, metadata: _metadata }, _componentConfig_initializers, _componentConfig_extraInitializers);
            __esDecorate(null, null, _trafficAllocation_decorators, { kind: "field", name: "trafficAllocation", static: false, private: false, access: { has: obj => "trafficAllocation" in obj, get: obj => obj.trafficAllocation, set: (obj, value) => { obj.trafficAllocation = value; } }, metadata: _metadata }, _trafficAllocation_initializers, _trafficAllocation_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        componentConfig = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _componentConfig_initializers, void 0));
        trafficAllocation = (__runInitializers(this, _componentConfig_extraInitializers), __runInitializers(this, _trafficAllocation_initializers, void 0));
        constructor() {
            __runInitializers(this, _trafficAllocation_extraInitializers);
        }
    };
})();
exports.ABTestVariantDto = ABTestVariantDto;
let TargetAudienceDto = (() => {
    let _countries_decorators;
    let _countries_initializers = [];
    let _countries_extraInitializers = [];
    let _devices_decorators;
    let _devices_initializers = [];
    let _devices_extraInitializers = [];
    let _userSegments_decorators;
    let _userSegments_initializers = [];
    let _userSegments_extraInitializers = [];
    return class TargetAudienceDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _countries_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _devices_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _userSegments_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _countries_decorators, { kind: "field", name: "countries", static: false, private: false, access: { has: obj => "countries" in obj, get: obj => obj.countries, set: (obj, value) => { obj.countries = value; } }, metadata: _metadata }, _countries_initializers, _countries_extraInitializers);
            __esDecorate(null, null, _devices_decorators, { kind: "field", name: "devices", static: false, private: false, access: { has: obj => "devices" in obj, get: obj => obj.devices, set: (obj, value) => { obj.devices = value; } }, metadata: _metadata }, _devices_initializers, _devices_extraInitializers);
            __esDecorate(null, null, _userSegments_decorators, { kind: "field", name: "userSegments", static: false, private: false, access: { has: obj => "userSegments" in obj, get: obj => obj.userSegments, set: (obj, value) => { obj.userSegments = value; } }, metadata: _metadata }, _userSegments_initializers, _userSegments_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        countries = __runInitializers(this, _countries_initializers, void 0);
        devices = (__runInitializers(this, _countries_extraInitializers), __runInitializers(this, _devices_initializers, void 0));
        userSegments = (__runInitializers(this, _devices_extraInitializers), __runInitializers(this, _userSegments_initializers, void 0));
        constructor() {
            __runInitializers(this, _userSegments_extraInitializers);
        }
    };
})();
exports.TargetAudienceDto = TargetAudienceDto;
let CreateABTestDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _componentId_decorators;
    let _componentId_initializers = [];
    let _componentId_extraInitializers = [];
    let _componentType_decorators;
    let _componentType_initializers = [];
    let _componentType_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _periodStart_decorators;
    let _periodStart_initializers = [];
    let _periodStart_extraInitializers = [];
    let _periodEnd_decorators;
    let _periodEnd_initializers = [];
    let _periodEnd_extraInitializers = [];
    let _conversionGoal_decorators;
    let _conversionGoal_initializers = [];
    let _conversionGoal_extraInitializers = [];
    let _targetAudience_decorators;
    let _targetAudience_initializers = [];
    let _targetAudience_extraInitializers = [];
    let _variants_decorators;
    let _variants_initializers = [];
    let _variants_extraInitializers = [];
    return class CreateABTestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _componentId_decorators = [(0, class_validator_1.IsString)()];
            _componentType_decorators = [(0, class_validator_1.IsString)()];
            _status_decorators = [(0, class_validator_1.IsEnum)(entities_1.ABTestStatus), (0, class_validator_1.IsOptional)()];
            _periodStart_decorators = [(0, class_validator_1.IsDateString)()];
            _periodEnd_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _conversionGoal_decorators = [(0, class_validator_1.IsString)()];
            _targetAudience_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => TargetAudienceDto), (0, class_validator_1.IsOptional)()];
            _variants_decorators = [(0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(() => ABTestVariantDto), (0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: obj => "periodStart" in obj, get: obj => obj.periodStart, set: (obj, value) => { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: obj => "periodEnd" in obj, get: obj => obj.periodEnd, set: (obj, value) => { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _conversionGoal_decorators, { kind: "field", name: "conversionGoal", static: false, private: false, access: { has: obj => "conversionGoal" in obj, get: obj => obj.conversionGoal, set: (obj, value) => { obj.conversionGoal = value; } }, metadata: _metadata }, _conversionGoal_initializers, _conversionGoal_extraInitializers);
            __esDecorate(null, null, _targetAudience_decorators, { kind: "field", name: "targetAudience", static: false, private: false, access: { has: obj => "targetAudience" in obj, get: obj => obj.targetAudience, set: (obj, value) => { obj.targetAudience = value; } }, metadata: _metadata }, _targetAudience_initializers, _targetAudience_extraInitializers);
            __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: obj => "variants" in obj, get: obj => obj.variants, set: (obj, value) => { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        componentId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _componentId_initializers, void 0));
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        status = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        periodStart = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
        periodEnd = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
        conversionGoal = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _conversionGoal_initializers, void 0));
        targetAudience = (__runInitializers(this, _conversionGoal_extraInitializers), __runInitializers(this, _targetAudience_initializers, void 0));
        variants = (__runInitializers(this, _targetAudience_extraInitializers), __runInitializers(this, _variants_initializers, void 0));
        constructor() {
            __runInitializers(this, _variants_extraInitializers);
        }
    };
})();
exports.CreateABTestDto = CreateABTestDto;
let UpdateABTestDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _periodEnd_decorators;
    let _periodEnd_initializers = [];
    let _periodEnd_extraInitializers = [];
    let _winnerVariantId_decorators;
    let _winnerVariantId_initializers = [];
    let _winnerVariantId_extraInitializers = [];
    let _confidenceLevel_decorators;
    let _confidenceLevel_initializers = [];
    let _confidenceLevel_extraInitializers = [];
    return class UpdateABTestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _status_decorators = [(0, class_validator_1.IsEnum)(entities_1.ABTestStatus), (0, class_validator_1.IsOptional)()];
            _periodEnd_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _winnerVariantId_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _confidenceLevel_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: obj => "periodEnd" in obj, get: obj => obj.periodEnd, set: (obj, value) => { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _winnerVariantId_decorators, { kind: "field", name: "winnerVariantId", static: false, private: false, access: { has: obj => "winnerVariantId" in obj, get: obj => obj.winnerVariantId, set: (obj, value) => { obj.winnerVariantId = value; } }, metadata: _metadata }, _winnerVariantId_initializers, _winnerVariantId_extraInitializers);
            __esDecorate(null, null, _confidenceLevel_decorators, { kind: "field", name: "confidenceLevel", static: false, private: false, access: { has: obj => "confidenceLevel" in obj, get: obj => obj.confidenceLevel, set: (obj, value) => { obj.confidenceLevel = value; } }, metadata: _metadata }, _confidenceLevel_initializers, _confidenceLevel_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        periodEnd = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
        winnerVariantId = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _winnerVariantId_initializers, void 0));
        confidenceLevel = (__runInitializers(this, _winnerVariantId_extraInitializers), __runInitializers(this, _confidenceLevel_initializers, void 0));
        constructor() {
            __runInitializers(this, _confidenceLevel_extraInitializers);
        }
    };
})();
exports.UpdateABTestDto = UpdateABTestDto;
//# sourceMappingURL=create-ab-test.dto.js.map