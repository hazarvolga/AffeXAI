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
exports.CmsMetricsResponseDto = exports.MetricsSummary = exports.CategoryEngagementMetric = exports.LinkClickMetric = exports.PageViewMetric = exports.GetMetricsQueryDto = exports.TrackActivityDto = exports.TrackLinkClickDto = exports.TrackPageViewDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const cms_metric_entity_1 = require("../entities/cms-metric.entity");
let TrackPageViewDto = (() => {
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _pageTitle_decorators;
    let _pageTitle_initializers = [];
    let _pageTitle_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _visitorId_decorators;
    let _visitorId_initializers = [];
    let _visitorId_extraInitializers = [];
    return class TrackPageViewDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _pageId_decorators = [(0, swagger_1.ApiProperty)({ example: 'uuid-page-id' }), (0, class_validator_1.IsUUID)()];
            _pageTitle_decorators = [(0, swagger_1.ApiProperty)({ example: 'Ana Sayfa' }), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'Blog' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _visitorId_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'visitor-session-id' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _pageTitle_decorators, { kind: "field", name: "pageTitle", static: false, private: false, access: { has: obj => "pageTitle" in obj, get: obj => obj.pageTitle, set: (obj, value) => { obj.pageTitle = value; } }, metadata: _metadata }, _pageTitle_initializers, _pageTitle_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _visitorId_decorators, { kind: "field", name: "visitorId", static: false, private: false, access: { has: obj => "visitorId" in obj, get: obj => obj.visitorId, set: (obj, value) => { obj.visitorId = value; } }, metadata: _metadata }, _visitorId_initializers, _visitorId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        pageId = __runInitializers(this, _pageId_initializers, void 0);
        pageTitle = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _pageTitle_initializers, void 0));
        category = (__runInitializers(this, _pageTitle_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        visitorId = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _visitorId_initializers, void 0));
        constructor() {
            __runInitializers(this, _visitorId_extraInitializers);
        }
    };
})();
exports.TrackPageViewDto = TrackPageViewDto;
let TrackLinkClickDto = (() => {
    let _linkUrl_decorators;
    let _linkUrl_initializers = [];
    let _linkUrl_extraInitializers = [];
    let _linkText_decorators;
    let _linkText_initializers = [];
    let _linkText_extraInitializers = [];
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _visitorId_decorators;
    let _visitorId_initializers = [];
    let _visitorId_extraInitializers = [];
    return class TrackLinkClickDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _linkUrl_decorators = [(0, swagger_1.ApiProperty)({ example: 'https://example.com' }), (0, class_validator_1.IsString)()];
            _linkText_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'Daha Fazla Bilgi' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pageId_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'uuid-page-id' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _visitorId_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'visitor-session-id' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _linkUrl_decorators, { kind: "field", name: "linkUrl", static: false, private: false, access: { has: obj => "linkUrl" in obj, get: obj => obj.linkUrl, set: (obj, value) => { obj.linkUrl = value; } }, metadata: _metadata }, _linkUrl_initializers, _linkUrl_extraInitializers);
            __esDecorate(null, null, _linkText_decorators, { kind: "field", name: "linkText", static: false, private: false, access: { has: obj => "linkText" in obj, get: obj => obj.linkText, set: (obj, value) => { obj.linkText = value; } }, metadata: _metadata }, _linkText_initializers, _linkText_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _visitorId_decorators, { kind: "field", name: "visitorId", static: false, private: false, access: { has: obj => "visitorId" in obj, get: obj => obj.visitorId, set: (obj, value) => { obj.visitorId = value; } }, metadata: _metadata }, _visitorId_initializers, _visitorId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        linkUrl = __runInitializers(this, _linkUrl_initializers, void 0);
        linkText = (__runInitializers(this, _linkUrl_extraInitializers), __runInitializers(this, _linkText_initializers, void 0));
        pageId = (__runInitializers(this, _linkText_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        visitorId = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _visitorId_initializers, void 0));
        constructor() {
            __runInitializers(this, _visitorId_extraInitializers);
        }
    };
})();
exports.TrackLinkClickDto = TrackLinkClickDto;
let TrackActivityDto = (() => {
    let _activityType_decorators;
    let _activityType_initializers = [];
    let _activityType_extraInitializers = [];
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _pageTitle_decorators;
    let _pageTitle_initializers = [];
    let _pageTitle_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    return class TrackActivityDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _activityType_decorators = [(0, swagger_1.ApiProperty)({ enum: cms_metric_entity_1.MetricType, example: cms_metric_entity_1.MetricType.EDIT }), (0, class_validator_1.IsEnum)(cms_metric_entity_1.MetricType)];
            _pageId_decorators = [(0, swagger_1.ApiProperty)({ example: 'uuid-page-id' }), (0, class_validator_1.IsUUID)()];
            _pageTitle_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'Ana Sayfa' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'Blog' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _activityType_decorators, { kind: "field", name: "activityType", static: false, private: false, access: { has: obj => "activityType" in obj, get: obj => obj.activityType, set: (obj, value) => { obj.activityType = value; } }, metadata: _metadata }, _activityType_initializers, _activityType_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _pageTitle_decorators, { kind: "field", name: "pageTitle", static: false, private: false, access: { has: obj => "pageTitle" in obj, get: obj => obj.pageTitle, set: (obj, value) => { obj.pageTitle = value; } }, metadata: _metadata }, _pageTitle_initializers, _pageTitle_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        activityType = __runInitializers(this, _activityType_initializers, void 0);
        pageId = (__runInitializers(this, _activityType_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        pageTitle = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _pageTitle_initializers, void 0));
        category = (__runInitializers(this, _pageTitle_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        constructor() {
            __runInitializers(this, _category_extraInitializers);
        }
    };
})();
exports.TrackActivityDto = TrackActivityDto;
let GetMetricsQueryDto = (() => {
    let _period_decorators;
    let _period_initializers = [];
    let _period_extraInitializers = [];
    return class GetMetricsQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _period_decorators = [(0, swagger_1.ApiPropertyOptional)({ enum: ['day', 'week', 'month'], default: 'week' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _period_decorators, { kind: "field", name: "period", static: false, private: false, access: { has: obj => "period" in obj, get: obj => obj.period, set: (obj, value) => { obj.period = value; } }, metadata: _metadata }, _period_initializers, _period_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        period = __runInitializers(this, _period_initializers, void 0);
        constructor() {
            __runInitializers(this, _period_extraInitializers);
        }
    };
})();
exports.GetMetricsQueryDto = GetMetricsQueryDto;
let PageViewMetric = (() => {
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _pageTitle_decorators;
    let _pageTitle_initializers = [];
    let _pageTitle_extraInitializers = [];
    let _viewCount_decorators;
    let _viewCount_initializers = [];
    let _viewCount_extraInitializers = [];
    let _uniqueVisitors_decorators;
    let _uniqueVisitors_initializers = [];
    let _uniqueVisitors_extraInitializers = [];
    return class PageViewMetric {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _pageId_decorators = [(0, swagger_1.ApiProperty)()];
            _pageTitle_decorators = [(0, swagger_1.ApiProperty)()];
            _viewCount_decorators = [(0, swagger_1.ApiProperty)()];
            _uniqueVisitors_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _pageTitle_decorators, { kind: "field", name: "pageTitle", static: false, private: false, access: { has: obj => "pageTitle" in obj, get: obj => obj.pageTitle, set: (obj, value) => { obj.pageTitle = value; } }, metadata: _metadata }, _pageTitle_initializers, _pageTitle_extraInitializers);
            __esDecorate(null, null, _viewCount_decorators, { kind: "field", name: "viewCount", static: false, private: false, access: { has: obj => "viewCount" in obj, get: obj => obj.viewCount, set: (obj, value) => { obj.viewCount = value; } }, metadata: _metadata }, _viewCount_initializers, _viewCount_extraInitializers);
            __esDecorate(null, null, _uniqueVisitors_decorators, { kind: "field", name: "uniqueVisitors", static: false, private: false, access: { has: obj => "uniqueVisitors" in obj, get: obj => obj.uniqueVisitors, set: (obj, value) => { obj.uniqueVisitors = value; } }, metadata: _metadata }, _uniqueVisitors_initializers, _uniqueVisitors_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        pageId = __runInitializers(this, _pageId_initializers, void 0);
        pageTitle = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _pageTitle_initializers, void 0));
        viewCount = (__runInitializers(this, _pageTitle_extraInitializers), __runInitializers(this, _viewCount_initializers, void 0));
        uniqueVisitors = (__runInitializers(this, _viewCount_extraInitializers), __runInitializers(this, _uniqueVisitors_initializers, void 0));
        constructor() {
            __runInitializers(this, _uniqueVisitors_extraInitializers);
        }
    };
})();
exports.PageViewMetric = PageViewMetric;
let LinkClickMetric = (() => {
    let _linkUrl_decorators;
    let _linkUrl_initializers = [];
    let _linkUrl_extraInitializers = [];
    let _linkText_decorators;
    let _linkText_initializers = [];
    let _linkText_extraInitializers = [];
    let _clickCount_decorators;
    let _clickCount_initializers = [];
    let _clickCount_extraInitializers = [];
    let _uniqueVisitors_decorators;
    let _uniqueVisitors_initializers = [];
    let _uniqueVisitors_extraInitializers = [];
    return class LinkClickMetric {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _linkUrl_decorators = [(0, swagger_1.ApiProperty)()];
            _linkText_decorators = [(0, swagger_1.ApiProperty)()];
            _clickCount_decorators = [(0, swagger_1.ApiProperty)()];
            _uniqueVisitors_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _linkUrl_decorators, { kind: "field", name: "linkUrl", static: false, private: false, access: { has: obj => "linkUrl" in obj, get: obj => obj.linkUrl, set: (obj, value) => { obj.linkUrl = value; } }, metadata: _metadata }, _linkUrl_initializers, _linkUrl_extraInitializers);
            __esDecorate(null, null, _linkText_decorators, { kind: "field", name: "linkText", static: false, private: false, access: { has: obj => "linkText" in obj, get: obj => obj.linkText, set: (obj, value) => { obj.linkText = value; } }, metadata: _metadata }, _linkText_initializers, _linkText_extraInitializers);
            __esDecorate(null, null, _clickCount_decorators, { kind: "field", name: "clickCount", static: false, private: false, access: { has: obj => "clickCount" in obj, get: obj => obj.clickCount, set: (obj, value) => { obj.clickCount = value; } }, metadata: _metadata }, _clickCount_initializers, _clickCount_extraInitializers);
            __esDecorate(null, null, _uniqueVisitors_decorators, { kind: "field", name: "uniqueVisitors", static: false, private: false, access: { has: obj => "uniqueVisitors" in obj, get: obj => obj.uniqueVisitors, set: (obj, value) => { obj.uniqueVisitors = value; } }, metadata: _metadata }, _uniqueVisitors_initializers, _uniqueVisitors_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        linkUrl = __runInitializers(this, _linkUrl_initializers, void 0);
        linkText = (__runInitializers(this, _linkUrl_extraInitializers), __runInitializers(this, _linkText_initializers, void 0));
        clickCount = (__runInitializers(this, _linkText_extraInitializers), __runInitializers(this, _clickCount_initializers, void 0));
        uniqueVisitors = (__runInitializers(this, _clickCount_extraInitializers), __runInitializers(this, _uniqueVisitors_initializers, void 0));
        constructor() {
            __runInitializers(this, _uniqueVisitors_extraInitializers);
        }
    };
})();
exports.LinkClickMetric = LinkClickMetric;
let CategoryEngagementMetric = (() => {
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _views_decorators;
    let _views_initializers = [];
    let _views_extraInitializers = [];
    let _clicks_decorators;
    let _clicks_initializers = [];
    let _clicks_extraInitializers = [];
    return class CategoryEngagementMetric {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _category_decorators = [(0, swagger_1.ApiProperty)()];
            _views_decorators = [(0, swagger_1.ApiProperty)()];
            _clicks_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _views_decorators, { kind: "field", name: "views", static: false, private: false, access: { has: obj => "views" in obj, get: obj => obj.views, set: (obj, value) => { obj.views = value; } }, metadata: _metadata }, _views_initializers, _views_extraInitializers);
            __esDecorate(null, null, _clicks_decorators, { kind: "field", name: "clicks", static: false, private: false, access: { has: obj => "clicks" in obj, get: obj => obj.clicks, set: (obj, value) => { obj.clicks = value; } }, metadata: _metadata }, _clicks_initializers, _clicks_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        category = __runInitializers(this, _category_initializers, void 0);
        views = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _views_initializers, void 0));
        clicks = (__runInitializers(this, _views_extraInitializers), __runInitializers(this, _clicks_initializers, void 0));
        constructor() {
            __runInitializers(this, _clicks_extraInitializers);
        }
    };
})();
exports.CategoryEngagementMetric = CategoryEngagementMetric;
let MetricsSummary = (() => {
    let _totalViews_decorators;
    let _totalViews_initializers = [];
    let _totalViews_extraInitializers = [];
    let _uniqueVisitors_decorators;
    let _uniqueVisitors_initializers = [];
    let _uniqueVisitors_extraInitializers = [];
    let _totalClicks_decorators;
    let _totalClicks_initializers = [];
    let _totalClicks_extraInitializers = [];
    let _uniqueLinks_decorators;
    let _uniqueLinks_initializers = [];
    let _uniqueLinks_extraInitializers = [];
    let _edits_decorators;
    let _edits_initializers = [];
    let _edits_extraInitializers = [];
    let _publishes_decorators;
    let _publishes_initializers = [];
    let _publishes_extraInitializers = [];
    return class MetricsSummary {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalViews_decorators = [(0, swagger_1.ApiProperty)()];
            _uniqueVisitors_decorators = [(0, swagger_1.ApiProperty)()];
            _totalClicks_decorators = [(0, swagger_1.ApiProperty)()];
            _uniqueLinks_decorators = [(0, swagger_1.ApiProperty)()];
            _edits_decorators = [(0, swagger_1.ApiProperty)()];
            _publishes_decorators = [(0, swagger_1.ApiProperty)()];
            __esDecorate(null, null, _totalViews_decorators, { kind: "field", name: "totalViews", static: false, private: false, access: { has: obj => "totalViews" in obj, get: obj => obj.totalViews, set: (obj, value) => { obj.totalViews = value; } }, metadata: _metadata }, _totalViews_initializers, _totalViews_extraInitializers);
            __esDecorate(null, null, _uniqueVisitors_decorators, { kind: "field", name: "uniqueVisitors", static: false, private: false, access: { has: obj => "uniqueVisitors" in obj, get: obj => obj.uniqueVisitors, set: (obj, value) => { obj.uniqueVisitors = value; } }, metadata: _metadata }, _uniqueVisitors_initializers, _uniqueVisitors_extraInitializers);
            __esDecorate(null, null, _totalClicks_decorators, { kind: "field", name: "totalClicks", static: false, private: false, access: { has: obj => "totalClicks" in obj, get: obj => obj.totalClicks, set: (obj, value) => { obj.totalClicks = value; } }, metadata: _metadata }, _totalClicks_initializers, _totalClicks_extraInitializers);
            __esDecorate(null, null, _uniqueLinks_decorators, { kind: "field", name: "uniqueLinks", static: false, private: false, access: { has: obj => "uniqueLinks" in obj, get: obj => obj.uniqueLinks, set: (obj, value) => { obj.uniqueLinks = value; } }, metadata: _metadata }, _uniqueLinks_initializers, _uniqueLinks_extraInitializers);
            __esDecorate(null, null, _edits_decorators, { kind: "field", name: "edits", static: false, private: false, access: { has: obj => "edits" in obj, get: obj => obj.edits, set: (obj, value) => { obj.edits = value; } }, metadata: _metadata }, _edits_initializers, _edits_extraInitializers);
            __esDecorate(null, null, _publishes_decorators, { kind: "field", name: "publishes", static: false, private: false, access: { has: obj => "publishes" in obj, get: obj => obj.publishes, set: (obj, value) => { obj.publishes = value; } }, metadata: _metadata }, _publishes_initializers, _publishes_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalViews = __runInitializers(this, _totalViews_initializers, void 0);
        uniqueVisitors = (__runInitializers(this, _totalViews_extraInitializers), __runInitializers(this, _uniqueVisitors_initializers, void 0));
        totalClicks = (__runInitializers(this, _uniqueVisitors_extraInitializers), __runInitializers(this, _totalClicks_initializers, void 0));
        uniqueLinks = (__runInitializers(this, _totalClicks_extraInitializers), __runInitializers(this, _uniqueLinks_initializers, void 0));
        edits = (__runInitializers(this, _uniqueLinks_extraInitializers), __runInitializers(this, _edits_initializers, void 0));
        publishes = (__runInitializers(this, _edits_extraInitializers), __runInitializers(this, _publishes_initializers, void 0));
        constructor() {
            __runInitializers(this, _publishes_extraInitializers);
        }
    };
})();
exports.MetricsSummary = MetricsSummary;
let CmsMetricsResponseDto = (() => {
    let _summary_decorators;
    let _summary_initializers = [];
    let _summary_extraInitializers = [];
    let _topPages_decorators;
    let _topPages_initializers = [];
    let _topPages_extraInitializers = [];
    let _topLinks_decorators;
    let _topLinks_initializers = [];
    let _topLinks_extraInitializers = [];
    let _categoryEngagement_decorators;
    let _categoryEngagement_initializers = [];
    let _categoryEngagement_extraInitializers = [];
    return class CmsMetricsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _summary_decorators = [(0, swagger_1.ApiProperty)({ type: MetricsSummary })];
            _topPages_decorators = [(0, swagger_1.ApiProperty)({ type: [PageViewMetric] })];
            _topLinks_decorators = [(0, swagger_1.ApiProperty)({ type: [LinkClickMetric] })];
            _categoryEngagement_decorators = [(0, swagger_1.ApiProperty)({ type: [CategoryEngagementMetric] })];
            __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: obj => "summary" in obj, get: obj => obj.summary, set: (obj, value) => { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
            __esDecorate(null, null, _topPages_decorators, { kind: "field", name: "topPages", static: false, private: false, access: { has: obj => "topPages" in obj, get: obj => obj.topPages, set: (obj, value) => { obj.topPages = value; } }, metadata: _metadata }, _topPages_initializers, _topPages_extraInitializers);
            __esDecorate(null, null, _topLinks_decorators, { kind: "field", name: "topLinks", static: false, private: false, access: { has: obj => "topLinks" in obj, get: obj => obj.topLinks, set: (obj, value) => { obj.topLinks = value; } }, metadata: _metadata }, _topLinks_initializers, _topLinks_extraInitializers);
            __esDecorate(null, null, _categoryEngagement_decorators, { kind: "field", name: "categoryEngagement", static: false, private: false, access: { has: obj => "categoryEngagement" in obj, get: obj => obj.categoryEngagement, set: (obj, value) => { obj.categoryEngagement = value; } }, metadata: _metadata }, _categoryEngagement_initializers, _categoryEngagement_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        summary = __runInitializers(this, _summary_initializers, void 0);
        topPages = (__runInitializers(this, _summary_extraInitializers), __runInitializers(this, _topPages_initializers, void 0));
        topLinks = (__runInitializers(this, _topPages_extraInitializers), __runInitializers(this, _topLinks_initializers, void 0));
        categoryEngagement = (__runInitializers(this, _topLinks_extraInitializers), __runInitializers(this, _categoryEngagement_initializers, void 0));
        constructor() {
            __runInitializers(this, _categoryEngagement_extraInitializers);
        }
    };
})();
exports.CmsMetricsResponseDto = CmsMetricsResponseDto;
//# sourceMappingURL=cms-metrics.dto.js.map