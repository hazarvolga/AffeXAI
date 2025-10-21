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
exports.ABTestVariant = void 0;
const typeorm_1 = require("typeorm");
const ab_test_entity_1 = require("./ab-test.entity");
let ABTestVariant = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ab_test_variants'), (0, typeorm_1.Index)(['testId'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _testId_decorators;
    let _testId_initializers = [];
    let _testId_extraInitializers = [];
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
    let _impressions_decorators;
    let _impressions_initializers = [];
    let _impressions_extraInitializers = [];
    let _interactions_decorators;
    let _interactions_initializers = [];
    let _interactions_extraInitializers = [];
    let _conversions_decorators;
    let _conversions_initializers = [];
    let _conversions_extraInitializers = [];
    let _conversionRate_decorators;
    let _conversionRate_initializers = [];
    let _conversionRate_extraInitializers = [];
    let _averageEngagementTime_decorators;
    let _averageEngagementTime_initializers = [];
    let _averageEngagementTime_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _test_decorators;
    let _test_initializers = [];
    let _test_extraInitializers = [];
    var ABTestVariant = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _testId_decorators = [(0, typeorm_1.Column)('uuid')];
            _name_decorators = [(0, typeorm_1.Column)()];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _componentConfig_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    comment: 'Component configuration for this variant',
                })];
            _trafficAllocation_decorators = [(0, typeorm_1.Column)({
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    comment: 'Percentage of traffic (0-100)',
                })];
            _impressions_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _interactions_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _conversions_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _conversionRate_decorators = [(0, typeorm_1.Column)({
                    type: 'decimal',
                    precision: 5,
                    scale: 4,
                    default: 0,
                    comment: 'Conversion rate (0-1)',
                })];
            _averageEngagementTime_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                    comment: 'Average engagement time in milliseconds',
                })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            _test_decorators = [(0, typeorm_1.ManyToOne)(() => ab_test_entity_1.ABTest, (test) => test.variants, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'testId' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _testId_decorators, { kind: "field", name: "testId", static: false, private: false, access: { has: obj => "testId" in obj, get: obj => obj.testId, set: (obj, value) => { obj.testId = value; } }, metadata: _metadata }, _testId_initializers, _testId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _componentConfig_decorators, { kind: "field", name: "componentConfig", static: false, private: false, access: { has: obj => "componentConfig" in obj, get: obj => obj.componentConfig, set: (obj, value) => { obj.componentConfig = value; } }, metadata: _metadata }, _componentConfig_initializers, _componentConfig_extraInitializers);
            __esDecorate(null, null, _trafficAllocation_decorators, { kind: "field", name: "trafficAllocation", static: false, private: false, access: { has: obj => "trafficAllocation" in obj, get: obj => obj.trafficAllocation, set: (obj, value) => { obj.trafficAllocation = value; } }, metadata: _metadata }, _trafficAllocation_initializers, _trafficAllocation_extraInitializers);
            __esDecorate(null, null, _impressions_decorators, { kind: "field", name: "impressions", static: false, private: false, access: { has: obj => "impressions" in obj, get: obj => obj.impressions, set: (obj, value) => { obj.impressions = value; } }, metadata: _metadata }, _impressions_initializers, _impressions_extraInitializers);
            __esDecorate(null, null, _interactions_decorators, { kind: "field", name: "interactions", static: false, private: false, access: { has: obj => "interactions" in obj, get: obj => obj.interactions, set: (obj, value) => { obj.interactions = value; } }, metadata: _metadata }, _interactions_initializers, _interactions_extraInitializers);
            __esDecorate(null, null, _conversions_decorators, { kind: "field", name: "conversions", static: false, private: false, access: { has: obj => "conversions" in obj, get: obj => obj.conversions, set: (obj, value) => { obj.conversions = value; } }, metadata: _metadata }, _conversions_initializers, _conversions_extraInitializers);
            __esDecorate(null, null, _conversionRate_decorators, { kind: "field", name: "conversionRate", static: false, private: false, access: { has: obj => "conversionRate" in obj, get: obj => obj.conversionRate, set: (obj, value) => { obj.conversionRate = value; } }, metadata: _metadata }, _conversionRate_initializers, _conversionRate_extraInitializers);
            __esDecorate(null, null, _averageEngagementTime_decorators, { kind: "field", name: "averageEngagementTime", static: false, private: false, access: { has: obj => "averageEngagementTime" in obj, get: obj => obj.averageEngagementTime, set: (obj, value) => { obj.averageEngagementTime = value; } }, metadata: _metadata }, _averageEngagementTime_initializers, _averageEngagementTime_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _test_decorators, { kind: "field", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test, set: (obj, value) => { obj.test = value; } }, metadata: _metadata }, _test_initializers, _test_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ABTestVariant = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        testId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _testId_initializers, void 0));
        name = (__runInitializers(this, _testId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        componentConfig = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _componentConfig_initializers, void 0));
        trafficAllocation = (__runInitializers(this, _componentConfig_extraInitializers), __runInitializers(this, _trafficAllocation_initializers, void 0));
        impressions = (__runInitializers(this, _trafficAllocation_extraInitializers), __runInitializers(this, _impressions_initializers, void 0));
        interactions = (__runInitializers(this, _impressions_extraInitializers), __runInitializers(this, _interactions_initializers, void 0));
        conversions = (__runInitializers(this, _interactions_extraInitializers), __runInitializers(this, _conversions_initializers, void 0));
        conversionRate = (__runInitializers(this, _conversions_extraInitializers), __runInitializers(this, _conversionRate_initializers, void 0));
        averageEngagementTime = (__runInitializers(this, _conversionRate_extraInitializers), __runInitializers(this, _averageEngagementTime_initializers, void 0));
        createdAt = (__runInitializers(this, _averageEngagementTime_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        // Relations
        test = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _test_initializers, void 0));
        constructor() {
            __runInitializers(this, _test_extraInitializers);
        }
    };
    return ABTestVariant = _classThis;
})();
exports.ABTestVariant = ABTestVariant;
//# sourceMappingURL=ab-test-variant.entity.js.map