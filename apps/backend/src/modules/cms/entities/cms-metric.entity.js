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
exports.CmsMetric = exports.MetricType = void 0;
const typeorm_1 = require("typeorm");
var MetricType;
(function (MetricType) {
    MetricType["VIEW"] = "view";
    MetricType["CLICK"] = "click";
    MetricType["EDIT"] = "edit";
    MetricType["PUBLISH"] = "publish";
})(MetricType || (exports.MetricType = MetricType = {}));
let CmsMetric = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('cms_metrics'), (0, typeorm_1.Index)(['pageId', 'metricType', 'createdAt']), (0, typeorm_1.Index)(['metricType', 'createdAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _metricType_decorators;
    let _metricType_initializers = [];
    let _metricType_extraInitializers = [];
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _pageTitle_decorators;
    let _pageTitle_initializers = [];
    let _pageTitle_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _linkUrl_decorators;
    let _linkUrl_initializers = [];
    let _linkUrl_extraInitializers = [];
    let _linkText_decorators;
    let _linkText_initializers = [];
    let _linkText_extraInitializers = [];
    let _visitorId_decorators;
    let _visitorId_initializers = [];
    let _visitorId_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    var CmsMetric = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _metricType_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: MetricType }), (0, typeorm_1.Index)()];
            _pageId_decorators = [(0, typeorm_1.Column)({ nullable: true }), (0, typeorm_1.Index)()];
            _pageTitle_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _category_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _linkUrl_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _linkText_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _visitorId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _metricType_decorators, { kind: "field", name: "metricType", static: false, private: false, access: { has: obj => "metricType" in obj, get: obj => obj.metricType, set: (obj, value) => { obj.metricType = value; } }, metadata: _metadata }, _metricType_initializers, _metricType_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _pageTitle_decorators, { kind: "field", name: "pageTitle", static: false, private: false, access: { has: obj => "pageTitle" in obj, get: obj => obj.pageTitle, set: (obj, value) => { obj.pageTitle = value; } }, metadata: _metadata }, _pageTitle_initializers, _pageTitle_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _linkUrl_decorators, { kind: "field", name: "linkUrl", static: false, private: false, access: { has: obj => "linkUrl" in obj, get: obj => obj.linkUrl, set: (obj, value) => { obj.linkUrl = value; } }, metadata: _metadata }, _linkUrl_initializers, _linkUrl_extraInitializers);
            __esDecorate(null, null, _linkText_decorators, { kind: "field", name: "linkText", static: false, private: false, access: { has: obj => "linkText" in obj, get: obj => obj.linkText, set: (obj, value) => { obj.linkText = value; } }, metadata: _metadata }, _linkText_initializers, _linkText_extraInitializers);
            __esDecorate(null, null, _visitorId_decorators, { kind: "field", name: "visitorId", static: false, private: false, access: { has: obj => "visitorId" in obj, get: obj => obj.visitorId, set: (obj, value) => { obj.visitorId = value; } }, metadata: _metadata }, _visitorId_initializers, _visitorId_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CmsMetric = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        metricType = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _metricType_initializers, void 0));
        pageId = (__runInitializers(this, _metricType_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        pageTitle = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _pageTitle_initializers, void 0));
        category = (__runInitializers(this, _pageTitle_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        linkUrl = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _linkUrl_initializers, void 0));
        linkText = (__runInitializers(this, _linkUrl_extraInitializers), __runInitializers(this, _linkText_initializers, void 0));
        visitorId = (__runInitializers(this, _linkText_extraInitializers), __runInitializers(this, _visitorId_initializers, void 0));
        metadata = (__runInitializers(this, _visitorId_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
    return CmsMetric = _classThis;
})();
exports.CmsMetric = CmsMetric;
//# sourceMappingURL=cms-metric.entity.js.map