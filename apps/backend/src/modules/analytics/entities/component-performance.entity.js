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
exports.ComponentPerformance = void 0;
const typeorm_1 = require("typeorm");
let ComponentPerformance = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('component_performance'), (0, typeorm_1.Index)(['componentId', 'pageUrl']), (0, typeorm_1.Index)(['periodStart', 'periodEnd'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _componentId_decorators;
    let _componentId_initializers = [];
    let _componentId_extraInitializers = [];
    let _componentType_decorators;
    let _componentType_initializers = [];
    let _componentType_extraInitializers = [];
    let _pageUrl_decorators;
    let _pageUrl_initializers = [];
    let _pageUrl_extraInitializers = [];
    let _periodStart_decorators;
    let _periodStart_initializers = [];
    let _periodStart_extraInitializers = [];
    let _periodEnd_decorators;
    let _periodEnd_initializers = [];
    let _periodEnd_extraInitializers = [];
    let _renderTimeAvg_decorators;
    let _renderTimeAvg_initializers = [];
    let _renderTimeAvg_extraInitializers = [];
    let _renderTimeMin_decorators;
    let _renderTimeMin_initializers = [];
    let _renderTimeMin_extraInitializers = [];
    let _renderTimeMax_decorators;
    let _renderTimeMax_initializers = [];
    let _renderTimeMax_extraInitializers = [];
    let _renderTimeP50_decorators;
    let _renderTimeP50_initializers = [];
    let _renderTimeP50_extraInitializers = [];
    let _renderTimeP95_decorators;
    let _renderTimeP95_initializers = [];
    let _renderTimeP95_extraInitializers = [];
    let _renderTimeP99_decorators;
    let _renderTimeP99_initializers = [];
    let _renderTimeP99_extraInitializers = [];
    let _errorRate_decorators;
    let _errorRate_initializers = [];
    let _errorRate_extraInitializers = [];
    let _totalRenders_decorators;
    let _totalRenders_initializers = [];
    let _totalRenders_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var ComponentPerformance = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _componentId_decorators = [(0, typeorm_1.Column)()];
            _componentType_decorators = [(0, typeorm_1.Column)()];
            _pageUrl_decorators = [(0, typeorm_1.Column)({ length: 500 })];
            _periodStart_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _periodEnd_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _renderTimeAvg_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _renderTimeMin_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _renderTimeMax_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _renderTimeP50_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _renderTimeP95_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _renderTimeP99_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
            _errorRate_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, default: 0 })];
            _totalRenders_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: obj => "periodStart" in obj, get: obj => obj.periodStart, set: (obj, value) => { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: obj => "periodEnd" in obj, get: obj => obj.periodEnd, set: (obj, value) => { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _renderTimeAvg_decorators, { kind: "field", name: "renderTimeAvg", static: false, private: false, access: { has: obj => "renderTimeAvg" in obj, get: obj => obj.renderTimeAvg, set: (obj, value) => { obj.renderTimeAvg = value; } }, metadata: _metadata }, _renderTimeAvg_initializers, _renderTimeAvg_extraInitializers);
            __esDecorate(null, null, _renderTimeMin_decorators, { kind: "field", name: "renderTimeMin", static: false, private: false, access: { has: obj => "renderTimeMin" in obj, get: obj => obj.renderTimeMin, set: (obj, value) => { obj.renderTimeMin = value; } }, metadata: _metadata }, _renderTimeMin_initializers, _renderTimeMin_extraInitializers);
            __esDecorate(null, null, _renderTimeMax_decorators, { kind: "field", name: "renderTimeMax", static: false, private: false, access: { has: obj => "renderTimeMax" in obj, get: obj => obj.renderTimeMax, set: (obj, value) => { obj.renderTimeMax = value; } }, metadata: _metadata }, _renderTimeMax_initializers, _renderTimeMax_extraInitializers);
            __esDecorate(null, null, _renderTimeP50_decorators, { kind: "field", name: "renderTimeP50", static: false, private: false, access: { has: obj => "renderTimeP50" in obj, get: obj => obj.renderTimeP50, set: (obj, value) => { obj.renderTimeP50 = value; } }, metadata: _metadata }, _renderTimeP50_initializers, _renderTimeP50_extraInitializers);
            __esDecorate(null, null, _renderTimeP95_decorators, { kind: "field", name: "renderTimeP95", static: false, private: false, access: { has: obj => "renderTimeP95" in obj, get: obj => obj.renderTimeP95, set: (obj, value) => { obj.renderTimeP95 = value; } }, metadata: _metadata }, _renderTimeP95_initializers, _renderTimeP95_extraInitializers);
            __esDecorate(null, null, _renderTimeP99_decorators, { kind: "field", name: "renderTimeP99", static: false, private: false, access: { has: obj => "renderTimeP99" in obj, get: obj => obj.renderTimeP99, set: (obj, value) => { obj.renderTimeP99 = value; } }, metadata: _metadata }, _renderTimeP99_initializers, _renderTimeP99_extraInitializers);
            __esDecorate(null, null, _errorRate_decorators, { kind: "field", name: "errorRate", static: false, private: false, access: { has: obj => "errorRate" in obj, get: obj => obj.errorRate, set: (obj, value) => { obj.errorRate = value; } }, metadata: _metadata }, _errorRate_initializers, _errorRate_extraInitializers);
            __esDecorate(null, null, _totalRenders_decorators, { kind: "field", name: "totalRenders", static: false, private: false, access: { has: obj => "totalRenders" in obj, get: obj => obj.totalRenders, set: (obj, value) => { obj.totalRenders = value; } }, metadata: _metadata }, _totalRenders_initializers, _totalRenders_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ComponentPerformance = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        componentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _componentId_initializers, void 0));
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        pageUrl = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        periodStart = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
        periodEnd = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
        renderTimeAvg = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _renderTimeAvg_initializers, void 0));
        renderTimeMin = (__runInitializers(this, _renderTimeAvg_extraInitializers), __runInitializers(this, _renderTimeMin_initializers, void 0));
        renderTimeMax = (__runInitializers(this, _renderTimeMin_extraInitializers), __runInitializers(this, _renderTimeMax_initializers, void 0));
        renderTimeP50 = (__runInitializers(this, _renderTimeMax_extraInitializers), __runInitializers(this, _renderTimeP50_initializers, void 0));
        renderTimeP95 = (__runInitializers(this, _renderTimeP50_extraInitializers), __runInitializers(this, _renderTimeP95_initializers, void 0));
        renderTimeP99 = (__runInitializers(this, _renderTimeP95_extraInitializers), __runInitializers(this, _renderTimeP99_initializers, void 0));
        errorRate = (__runInitializers(this, _renderTimeP99_extraInitializers), __runInitializers(this, _errorRate_initializers, void 0));
        totalRenders = (__runInitializers(this, _errorRate_extraInitializers), __runInitializers(this, _totalRenders_initializers, void 0));
        createdAt = (__runInitializers(this, _totalRenders_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return ComponentPerformance = _classThis;
})();
exports.ComponentPerformance = ComponentPerformance;
//# sourceMappingURL=component-performance.entity.js.map