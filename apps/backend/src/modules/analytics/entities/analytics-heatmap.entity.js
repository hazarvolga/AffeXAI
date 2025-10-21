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
exports.AnalyticsHeatmap = void 0;
const typeorm_1 = require("typeorm");
let AnalyticsHeatmap = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('analytics_heatmaps'), (0, typeorm_1.Index)(['componentId', 'pageUrl']), (0, typeorm_1.Index)(['periodStart', 'periodEnd'])];
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
    let _points_decorators;
    let _points_initializers = [];
    let _points_extraInitializers = [];
    let _dimensionWidth_decorators;
    let _dimensionWidth_initializers = [];
    let _dimensionWidth_extraInitializers = [];
    let _dimensionHeight_decorators;
    let _dimensionHeight_initializers = [];
    let _dimensionHeight_extraInitializers = [];
    let _totalInteractions_decorators;
    let _totalInteractions_initializers = [];
    let _totalInteractions_extraInitializers = [];
    let _uniqueUsers_decorators;
    let _uniqueUsers_initializers = [];
    let _uniqueUsers_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var AnalyticsHeatmap = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _componentId_decorators = [(0, typeorm_1.Column)()];
            _componentType_decorators = [(0, typeorm_1.Column)()];
            _pageUrl_decorators = [(0, typeorm_1.Column)({ length: 500 })];
            _periodStart_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _periodEnd_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _points_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    comment: 'Array of {x, y, intensity, type}',
                })];
            _dimensionWidth_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
            _dimensionHeight_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
            _totalInteractions_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _uniqueUsers_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: obj => "periodStart" in obj, get: obj => obj.periodStart, set: (obj, value) => { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
            __esDecorate(null, null, _periodEnd_decorators, { kind: "field", name: "periodEnd", static: false, private: false, access: { has: obj => "periodEnd" in obj, get: obj => obj.periodEnd, set: (obj, value) => { obj.periodEnd = value; } }, metadata: _metadata }, _periodEnd_initializers, _periodEnd_extraInitializers);
            __esDecorate(null, null, _points_decorators, { kind: "field", name: "points", static: false, private: false, access: { has: obj => "points" in obj, get: obj => obj.points, set: (obj, value) => { obj.points = value; } }, metadata: _metadata }, _points_initializers, _points_extraInitializers);
            __esDecorate(null, null, _dimensionWidth_decorators, { kind: "field", name: "dimensionWidth", static: false, private: false, access: { has: obj => "dimensionWidth" in obj, get: obj => obj.dimensionWidth, set: (obj, value) => { obj.dimensionWidth = value; } }, metadata: _metadata }, _dimensionWidth_initializers, _dimensionWidth_extraInitializers);
            __esDecorate(null, null, _dimensionHeight_decorators, { kind: "field", name: "dimensionHeight", static: false, private: false, access: { has: obj => "dimensionHeight" in obj, get: obj => obj.dimensionHeight, set: (obj, value) => { obj.dimensionHeight = value; } }, metadata: _metadata }, _dimensionHeight_initializers, _dimensionHeight_extraInitializers);
            __esDecorate(null, null, _totalInteractions_decorators, { kind: "field", name: "totalInteractions", static: false, private: false, access: { has: obj => "totalInteractions" in obj, get: obj => obj.totalInteractions, set: (obj, value) => { obj.totalInteractions = value; } }, metadata: _metadata }, _totalInteractions_initializers, _totalInteractions_extraInitializers);
            __esDecorate(null, null, _uniqueUsers_decorators, { kind: "field", name: "uniqueUsers", static: false, private: false, access: { has: obj => "uniqueUsers" in obj, get: obj => obj.uniqueUsers, set: (obj, value) => { obj.uniqueUsers = value; } }, metadata: _metadata }, _uniqueUsers_initializers, _uniqueUsers_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsHeatmap = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        componentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _componentId_initializers, void 0));
        componentType = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        pageUrl = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        periodStart = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
        periodEnd = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _periodEnd_initializers, void 0));
        points = (__runInitializers(this, _periodEnd_extraInitializers), __runInitializers(this, _points_initializers, void 0));
        dimensionWidth = (__runInitializers(this, _points_extraInitializers), __runInitializers(this, _dimensionWidth_initializers, void 0));
        dimensionHeight = (__runInitializers(this, _dimensionWidth_extraInitializers), __runInitializers(this, _dimensionHeight_initializers, void 0));
        totalInteractions = (__runInitializers(this, _dimensionHeight_extraInitializers), __runInitializers(this, _totalInteractions_initializers, void 0));
        uniqueUsers = (__runInitializers(this, _totalInteractions_extraInitializers), __runInitializers(this, _uniqueUsers_initializers, void 0));
        createdAt = (__runInitializers(this, _uniqueUsers_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return AnalyticsHeatmap = _classThis;
})();
exports.AnalyticsHeatmap = AnalyticsHeatmap;
//# sourceMappingURL=analytics-heatmap.entity.js.map