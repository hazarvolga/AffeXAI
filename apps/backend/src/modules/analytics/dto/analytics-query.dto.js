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
exports.HeatmapQueryDto = exports.AnalyticsQueryDto = exports.AnalyticsTimeRange = void 0;
const class_validator_1 = require("class-validator");
var AnalyticsTimeRange;
(function (AnalyticsTimeRange) {
    AnalyticsTimeRange["TODAY"] = "today";
    AnalyticsTimeRange["YESTERDAY"] = "yesterday";
    AnalyticsTimeRange["LAST_7_DAYS"] = "last7days";
    AnalyticsTimeRange["LAST_30_DAYS"] = "last30days";
    AnalyticsTimeRange["LAST_90_DAYS"] = "last90days";
    AnalyticsTimeRange["CUSTOM"] = "custom";
})(AnalyticsTimeRange || (exports.AnalyticsTimeRange = AnalyticsTimeRange = {}));
let AnalyticsQueryDto = (() => {
    let _timeRange_decorators;
    let _timeRange_initializers = [];
    let _timeRange_extraInitializers = [];
    let _customStartDate_decorators;
    let _customStartDate_initializers = [];
    let _customStartDate_extraInitializers = [];
    let _customEndDate_decorators;
    let _customEndDate_initializers = [];
    let _customEndDate_extraInitializers = [];
    let _pageUrl_decorators;
    let _pageUrl_initializers = [];
    let _pageUrl_extraInitializers = [];
    let _componentType_decorators;
    let _componentType_initializers = [];
    let _componentType_extraInitializers = [];
    let _deviceTypes_decorators;
    let _deviceTypes_initializers = [];
    let _deviceTypes_extraInitializers = [];
    let _userSegment_decorators;
    let _userSegment_initializers = [];
    let _userSegment_extraInitializers = [];
    return class AnalyticsQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _timeRange_decorators = [(0, class_validator_1.IsEnum)(AnalyticsTimeRange)];
            _customStartDate_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _customEndDate_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _pageUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _componentType_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _deviceTypes_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _userSegment_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _timeRange_decorators, { kind: "field", name: "timeRange", static: false, private: false, access: { has: obj => "timeRange" in obj, get: obj => obj.timeRange, set: (obj, value) => { obj.timeRange = value; } }, metadata: _metadata }, _timeRange_initializers, _timeRange_extraInitializers);
            __esDecorate(null, null, _customStartDate_decorators, { kind: "field", name: "customStartDate", static: false, private: false, access: { has: obj => "customStartDate" in obj, get: obj => obj.customStartDate, set: (obj, value) => { obj.customStartDate = value; } }, metadata: _metadata }, _customStartDate_initializers, _customStartDate_extraInitializers);
            __esDecorate(null, null, _customEndDate_decorators, { kind: "field", name: "customEndDate", static: false, private: false, access: { has: obj => "customEndDate" in obj, get: obj => obj.customEndDate, set: (obj, value) => { obj.customEndDate = value; } }, metadata: _metadata }, _customEndDate_initializers, _customEndDate_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _componentType_decorators, { kind: "field", name: "componentType", static: false, private: false, access: { has: obj => "componentType" in obj, get: obj => obj.componentType, set: (obj, value) => { obj.componentType = value; } }, metadata: _metadata }, _componentType_initializers, _componentType_extraInitializers);
            __esDecorate(null, null, _deviceTypes_decorators, { kind: "field", name: "deviceTypes", static: false, private: false, access: { has: obj => "deviceTypes" in obj, get: obj => obj.deviceTypes, set: (obj, value) => { obj.deviceTypes = value; } }, metadata: _metadata }, _deviceTypes_initializers, _deviceTypes_extraInitializers);
            __esDecorate(null, null, _userSegment_decorators, { kind: "field", name: "userSegment", static: false, private: false, access: { has: obj => "userSegment" in obj, get: obj => obj.userSegment, set: (obj, value) => { obj.userSegment = value; } }, metadata: _metadata }, _userSegment_initializers, _userSegment_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        timeRange = __runInitializers(this, _timeRange_initializers, void 0);
        customStartDate = (__runInitializers(this, _timeRange_extraInitializers), __runInitializers(this, _customStartDate_initializers, void 0));
        customEndDate = (__runInitializers(this, _customStartDate_extraInitializers), __runInitializers(this, _customEndDate_initializers, void 0));
        pageUrl = (__runInitializers(this, _customEndDate_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        componentType = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _componentType_initializers, void 0));
        deviceTypes = (__runInitializers(this, _componentType_extraInitializers), __runInitializers(this, _deviceTypes_initializers, void 0));
        userSegment = (__runInitializers(this, _deviceTypes_extraInitializers), __runInitializers(this, _userSegment_initializers, void 0));
        constructor() {
            __runInitializers(this, _userSegment_extraInitializers);
        }
    };
})();
exports.AnalyticsQueryDto = AnalyticsQueryDto;
let HeatmapQueryDto = (() => {
    let _componentId_decorators;
    let _componentId_initializers = [];
    let _componentId_extraInitializers = [];
    let _pageUrl_decorators;
    let _pageUrl_initializers = [];
    let _pageUrl_extraInitializers = [];
    let _timeRange_decorators;
    let _timeRange_initializers = [];
    let _timeRange_extraInitializers = [];
    let _customStartDate_decorators;
    let _customStartDate_initializers = [];
    let _customStartDate_extraInitializers = [];
    let _customEndDate_decorators;
    let _customEndDate_initializers = [];
    let _customEndDate_extraInitializers = [];
    return class HeatmapQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _componentId_decorators = [(0, class_validator_1.IsString)()];
            _pageUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _timeRange_decorators = [(0, class_validator_1.IsEnum)(AnalyticsTimeRange)];
            _customStartDate_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _customEndDate_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _componentId_decorators, { kind: "field", name: "componentId", static: false, private: false, access: { has: obj => "componentId" in obj, get: obj => obj.componentId, set: (obj, value) => { obj.componentId = value; } }, metadata: _metadata }, _componentId_initializers, _componentId_extraInitializers);
            __esDecorate(null, null, _pageUrl_decorators, { kind: "field", name: "pageUrl", static: false, private: false, access: { has: obj => "pageUrl" in obj, get: obj => obj.pageUrl, set: (obj, value) => { obj.pageUrl = value; } }, metadata: _metadata }, _pageUrl_initializers, _pageUrl_extraInitializers);
            __esDecorate(null, null, _timeRange_decorators, { kind: "field", name: "timeRange", static: false, private: false, access: { has: obj => "timeRange" in obj, get: obj => obj.timeRange, set: (obj, value) => { obj.timeRange = value; } }, metadata: _metadata }, _timeRange_initializers, _timeRange_extraInitializers);
            __esDecorate(null, null, _customStartDate_decorators, { kind: "field", name: "customStartDate", static: false, private: false, access: { has: obj => "customStartDate" in obj, get: obj => obj.customStartDate, set: (obj, value) => { obj.customStartDate = value; } }, metadata: _metadata }, _customStartDate_initializers, _customStartDate_extraInitializers);
            __esDecorate(null, null, _customEndDate_decorators, { kind: "field", name: "customEndDate", static: false, private: false, access: { has: obj => "customEndDate" in obj, get: obj => obj.customEndDate, set: (obj, value) => { obj.customEndDate = value; } }, metadata: _metadata }, _customEndDate_initializers, _customEndDate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        componentId = __runInitializers(this, _componentId_initializers, void 0);
        pageUrl = (__runInitializers(this, _componentId_extraInitializers), __runInitializers(this, _pageUrl_initializers, void 0));
        timeRange = (__runInitializers(this, _pageUrl_extraInitializers), __runInitializers(this, _timeRange_initializers, void 0));
        customStartDate = (__runInitializers(this, _timeRange_extraInitializers), __runInitializers(this, _customStartDate_initializers, void 0));
        customEndDate = (__runInitializers(this, _customStartDate_extraInitializers), __runInitializers(this, _customEndDate_initializers, void 0));
        constructor() {
            __runInitializers(this, _customEndDate_extraInitializers);
        }
    };
})();
exports.HeatmapQueryDto = HeatmapQueryDto;
//# sourceMappingURL=analytics-query.dto.js.map