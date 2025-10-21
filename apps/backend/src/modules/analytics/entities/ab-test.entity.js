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
exports.ABTest = exports.ABTestStatus = void 0;
const typeorm_1 = require("typeorm");
const ab_test_variant_entity_1 = require("./ab-test-variant.entity");
var ABTestStatus;
(function (ABTestStatus) {
    ABTestStatus["DRAFT"] = "draft";
    ABTestStatus["RUNNING"] = "running";
    ABTestStatus["PAUSED"] = "paused";
    ABTestStatus["COMPLETED"] = "completed";
})(ABTestStatus || (exports.ABTestStatus = ABTestStatus = {}));
let ABTest = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ab_tests'), (0, typeorm_1.Index)(['componentId']), (0, typeorm_1.Index)(['status'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
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
    let _winnerVariantId_decorators;
    let _winnerVariantId_initializers = [];
    let _winnerVariantId_extraInitializers = [];
    let _confidenceLevel_decorators;
    let _confidenceLevel_initializers = [];
    let _confidenceLevel_extraInitializers = [];
    let _sampleSize_decorators;
    let _sampleSize_initializers = [];
    let _sampleSize_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _variants_decorators;
    let _variants_initializers = [];
    let _variants_extraInitializers = [];
    var ABTest = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _name_decorators = [(0, typeorm_1.Column)()];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _componentId_decorators = [(0, typeorm_1.Column)()];
            _componentType_decorators = [(0, typeorm_1.Column)()];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ['draft', 'running', 'paused', 'completed'],
                    enumName: 'ab_test_status_enum',
                    default: 'draft',
                })];
            _periodStart_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _periodEnd_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _conversionGoal_decorators = [(0, typeorm_1.Column)()];
            _targetAudience_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                    comment: 'Countries, devices, user segments',
                })];
            _winnerVariantId_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _confidenceLevel_decorators = [(0, typeorm_1.Column)({
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    nullable: true,
                    comment: 'Statistical confidence (0-100)',
                })];
            _sampleSize_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            _variants_decorators = [(0, typeorm_1.OneToMany)(() => ab_test_variant_entity_1.ABTestVariant, (variant) => variant.test, {
                    cascade: true,
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: obj => "periodStart" in obj, get: obj => obj.periodStart, set: (obj, value) => { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: obj => "periodEnd" in obj, get: obj => obj.periodEnd, set: (obj, value) => { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _conversionGoal_decorators, { kind: "field", name: "conversionGoal", static: false, private: false, access: { has: obj => "conversionGoal" in obj, get: obj => obj.conversionGoal, set: (obj, value) => { obj.conversionGoal = value; } }, metadata: _metadata }, _conversionGoal_initializers, _conversionGoal_extraInitializers);
            __esDecorate(null, null, _targetAudience_decorators, { kind: "field", name: "targetAudience", static: false, private: false, access: { has: obj => "targetAudience" in obj, get: obj => obj.targetAudience, set: (obj, value) => { obj.targetAudience = value; } }, metadata: _metadata }, _targetAudience_initializers, _targetAudience_extraInitializers);
            __esDecorate(null, null, _winnerVariantId_decorators, { kind: "field", name: "winnerVariantId", static: false, private: false, access: { has: obj => "winnerVariantId" in obj, get: obj => obj.winnerVariantId, set: (obj, value) => { obj.winnerVariantId = value; } }, metadata: _metadata }, _winnerVariantId_initializers, _winnerVariantId_extraInitializers);
            __esDecorate(null, null, _confidenceLevel_decorators, { kind: "field", name: "confidenceLevel", static: false, private: false, access: { has: obj => "confidenceLevel" in obj, get: obj => obj.confidenceLevel, set: (obj, value) => { obj.confidenceLevel = value; } }, metadata: _metadata }, _confidenceLevel_initializers, _confidenceLevel_extraInitializers);
            __esDecorate(null, null, _sampleSize_decorators, { kind: "field", name: "sampleSize", static: false, private: false, access: { has: obj => "sampleSize" in obj, get: obj => obj.sampleSize, set: (obj, value) => { obj.sampleSize = value; } }, metadata: _metadata }, _sampleSize_initializers, _sampleSize_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: obj => "variants" in obj, get: obj => obj.variants, set: (obj, value) => { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ABTest = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        componentId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _componentId_initializers, void 0));
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        status = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        periodStart = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
        periodEnd = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
        conversionGoal = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _conversionGoal_initializers, void 0));
        targetAudience = (__runInitializers(this, _conversionGoal_extraInitializers), __runInitializers(this, _targetAudience_initializers, void 0));
        winnerVariantId = (__runInitializers(this, _targetAudience_extraInitializers), __runInitializers(this, _winnerVariantId_initializers, void 0));
        confidenceLevel = (__runInitializers(this, _winnerVariantId_extraInitializers), __runInitializers(this, _confidenceLevel_initializers, void 0));
        sampleSize = (__runInitializers(this, _confidenceLevel_extraInitializers), __runInitializers(this, _sampleSize_initializers, void 0));
        createdAt = (__runInitializers(this, _sampleSize_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        // Relations
        variants = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _variants_initializers, void 0));
        constructor() {
            __runInitializers(this, _variants_extraInitializers);
        }
    };
    return ABTest = _classThis;
})();
exports.ABTest = ABTest;
//# sourceMappingURL=ab-test.entity.js.map