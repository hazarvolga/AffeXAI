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
exports.AbTestResultDto = exports.SelectWinnerDto = exports.SendAbTestDto = exports.UpdateVariantDto = exports.CreateAbTestDto = exports.VariantDto = exports.WinnerCriteria = exports.TestType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
/**
 * Types of A/B tests
 */
var TestType;
(function (TestType) {
    TestType["SUBJECT"] = "subject";
    TestType["CONTENT"] = "content";
    TestType["SEND_TIME"] = "send_time";
    TestType["FROM_NAME"] = "from_name";
    TestType["COMBINED"] = "combined";
})(TestType || (exports.TestType = TestType = {}));
/**
 * Criteria for selecting the winning variant
 */
var WinnerCriteria;
(function (WinnerCriteria) {
    WinnerCriteria["OPEN_RATE"] = "open_rate";
    WinnerCriteria["CLICK_RATE"] = "click_rate";
    WinnerCriteria["CONVERSION_RATE"] = "conversion_rate";
    WinnerCriteria["REVENUE"] = "revenue";
})(WinnerCriteria || (exports.WinnerCriteria = WinnerCriteria = {}));
/**
 * Single variant configuration
 */
let VariantDto = (() => {
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _fromName_decorators;
    let _fromName_initializers = [];
    let _fromName_extraInitializers = [];
    let _sendTimeOffset_decorators;
    let _sendTimeOffset_initializers = [];
    let _sendTimeOffset_extraInitializers = [];
    let _splitPercentage_decorators;
    let _splitPercentage_initializers = [];
    let _splitPercentage_extraInitializers = [];
    return class VariantDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _label_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Variant label (A, B, C, D, or E)',
                    example: 'A',
                }), (0, class_validator_1.IsString)()];
            _subject_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Email subject line for this variant',
                    example: 'Special Offer - 50% Off Today!',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _content_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Email content/body for this variant (HTML)',
                    example: '<h1>Welcome!</h1><p>Check out our amazing deals...</p>',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _fromName_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'From name for this variant',
                    example: 'Support Team',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _sendTimeOffset_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Send time offset in minutes from base send time',
                    example: 0,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(-1440), (0, class_validator_1.Max)(1440)];
            _splitPercentage_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Percentage of recipients for this variant (0-100)',
                    example: 50,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: obj => "fromName" in obj, get: obj => obj.fromName, set: (obj, value) => { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
            __esDecorate(null, null, _sendTimeOffset_decorators, { kind: "field", name: "sendTimeOffset", static: false, private: false, access: { has: obj => "sendTimeOffset" in obj, get: obj => obj.sendTimeOffset, set: (obj, value) => { obj.sendTimeOffset = value; } }, metadata: _metadata }, _sendTimeOffset_initializers, _sendTimeOffset_extraInitializers);
            __esDecorate(null, null, _splitPercentage_decorators, { kind: "field", name: "splitPercentage", static: false, private: false, access: { has: obj => "splitPercentage" in obj, get: obj => obj.splitPercentage, set: (obj, value) => { obj.splitPercentage = value; } }, metadata: _metadata }, _splitPercentage_initializers, _splitPercentage_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        label = __runInitializers(this, _label_initializers, void 0);
        subject = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        fromName = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
        sendTimeOffset = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _sendTimeOffset_initializers, void 0));
        splitPercentage = (__runInitializers(this, _sendTimeOffset_extraInitializers), __runInitializers(this, _splitPercentage_initializers, void 0));
        constructor() {
            __runInitializers(this, _splitPercentage_extraInitializers);
        }
    };
})();
exports.VariantDto = VariantDto;
/**
 * DTO for creating a new A/B test
 */
let CreateAbTestDto = (() => {
    let _campaignId_decorators;
    let _campaignId_initializers = [];
    let _campaignId_extraInitializers = [];
    let _testType_decorators;
    let _testType_initializers = [];
    let _testType_extraInitializers = [];
    let _winnerCriteria_decorators;
    let _winnerCriteria_initializers = [];
    let _winnerCriteria_extraInitializers = [];
    let _autoSelectWinner_decorators;
    let _autoSelectWinner_initializers = [];
    let _autoSelectWinner_extraInitializers = [];
    let _testDuration_decorators;
    let _testDuration_initializers = [];
    let _testDuration_extraInitializers = [];
    let _confidenceLevel_decorators;
    let _confidenceLevel_initializers = [];
    let _confidenceLevel_extraInitializers = [];
    let _minSampleSize_decorators;
    let _minSampleSize_initializers = [];
    let _minSampleSize_extraInitializers = [];
    let _variants_decorators;
    let _variants_initializers = [];
    let _variants_extraInitializers = [];
    return class CreateAbTestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _campaignId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Campaign ID to create A/B test for',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _testType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of test to run',
                    enum: TestType,
                    example: TestType.SUBJECT,
                }), (0, class_validator_1.IsEnum)(TestType)];
            _winnerCriteria_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Criteria for selecting the winner',
                    enum: WinnerCriteria,
                    example: WinnerCriteria.OPEN_RATE,
                }), (0, class_validator_1.IsEnum)(WinnerCriteria)];
            _autoSelectWinner_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Auto-select winner when test completes',
                    example: true,
                }), (0, class_validator_1.IsBoolean)()];
            _testDuration_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Test duration in hours',
                    example: 24,
                    minimum: 1,
                    maximum: 168,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(168)];
            _confidenceLevel_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Confidence level for statistical significance (90-99.9)',
                    example: 95,
                    minimum: 90,
                    maximum: 99.9,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(90), (0, class_validator_1.Max)(99.9)];
            _minSampleSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Minimum number of sends per variant before declaring winner',
                    example: 100,
                    minimum: 50,
                }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(50)];
            _variants_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Array of variants (2-5 variants)',
                    type: [VariantDto],
                    example: [
                        {
                            label: 'A',
                            subject: 'Original Subject',
                            splitPercentage: 50,
                        },
                        {
                            label: 'B',
                            subject: 'Alternative Subject',
                            splitPercentage: 50,
                        },
                    ],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMinSize)(2), (0, class_validator_1.ArrayMaxSize)(5), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(() => VariantDto)];
            __esDecorate(null, null, _campaignId_decorators, { kind: "field", name: "campaignId", static: false, private: false, access: { has: obj => "campaignId" in obj, get: obj => obj.campaignId, set: (obj, value) => { obj.campaignId = value; } }, metadata: _metadata }, _campaignId_initializers, _campaignId_extraInitializers);
            __esDecorate(null, null, _testType_decorators, { kind: "field", name: "testType", static: false, private: false, access: { has: obj => "testType" in obj, get: obj => obj.testType, set: (obj, value) => { obj.testType = value; } }, metadata: _metadata }, _testType_initializers, _testType_extraInitializers);
            __esDecorate(null, null, _winnerCriteria_decorators, { kind: "field", name: "winnerCriteria", static: false, private: false, access: { has: obj => "winnerCriteria" in obj, get: obj => obj.winnerCriteria, set: (obj, value) => { obj.winnerCriteria = value; } }, metadata: _metadata }, _winnerCriteria_initializers, _winnerCriteria_extraInitializers);
            __esDecorate(null, null, _autoSelectWinner_decorators, { kind: "field", name: "autoSelectWinner", static: false, private: false, access: { has: obj => "autoSelectWinner" in obj, get: obj => obj.autoSelectWinner, set: (obj, value) => { obj.autoSelectWinner = value; } }, metadata: _metadata }, _autoSelectWinner_initializers, _autoSelectWinner_extraInitializers);
            __esDecorate(null, null, _testDuration_decorators, { kind: "field", name: "testDuration", static: false, private: false, access: { has: obj => "testDuration" in obj, get: obj => obj.testDuration, set: (obj, value) => { obj.testDuration = value; } }, metadata: _metadata }, _testDuration_initializers, _testDuration_extraInitializers);
            __esDecorate(null, null, _confidenceLevel_decorators, { kind: "field", name: "confidenceLevel", static: false, private: false, access: { has: obj => "confidenceLevel" in obj, get: obj => obj.confidenceLevel, set: (obj, value) => { obj.confidenceLevel = value; } }, metadata: _metadata }, _confidenceLevel_initializers, _confidenceLevel_extraInitializers);
            __esDecorate(null, null, _minSampleSize_decorators, { kind: "field", name: "minSampleSize", static: false, private: false, access: { has: obj => "minSampleSize" in obj, get: obj => obj.minSampleSize, set: (obj, value) => { obj.minSampleSize = value; } }, metadata: _metadata }, _minSampleSize_initializers, _minSampleSize_extraInitializers);
            __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: obj => "variants" in obj, get: obj => obj.variants, set: (obj, value) => { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        campaignId = __runInitializers(this, _campaignId_initializers, void 0);
        testType = (__runInitializers(this, _campaignId_extraInitializers), __runInitializers(this, _testType_initializers, void 0));
        winnerCriteria = (__runInitializers(this, _testType_extraInitializers), __runInitializers(this, _winnerCriteria_initializers, void 0));
        autoSelectWinner = (__runInitializers(this, _winnerCriteria_extraInitializers), __runInitializers(this, _autoSelectWinner_initializers, void 0));
        testDuration = (__runInitializers(this, _autoSelectWinner_extraInitializers), __runInitializers(this, _testDuration_initializers, void 0));
        confidenceLevel = (__runInitializers(this, _testDuration_extraInitializers), __runInitializers(this, _confidenceLevel_initializers, void 0));
        minSampleSize = (__runInitializers(this, _confidenceLevel_extraInitializers), __runInitializers(this, _minSampleSize_initializers, void 0));
        variants = (__runInitializers(this, _minSampleSize_extraInitializers), __runInitializers(this, _variants_initializers, void 0));
        constructor() {
            __runInitializers(this, _variants_extraInitializers);
        }
    };
})();
exports.CreateAbTestDto = CreateAbTestDto;
/**
 * DTO for updating a variant's content
 */
let UpdateVariantDto = (() => {
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _fromName_decorators;
    let _fromName_initializers = [];
    let _fromName_extraInitializers = [];
    let _splitPercentage_decorators;
    let _splitPercentage_initializers = [];
    let _splitPercentage_extraInitializers = [];
    return class UpdateVariantDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subject_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated subject line',
                    example: 'New Subject',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _content_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated content',
                    example: '<h1>Updated content</h1>',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _fromName_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated from name',
                    example: 'Sales Team',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _splitPercentage_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated split percentage',
                    example: 60,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: obj => "fromName" in obj, get: obj => obj.fromName, set: (obj, value) => { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
            __esDecorate(null, null, _splitPercentage_decorators, { kind: "field", name: "splitPercentage", static: false, private: false, access: { has: obj => "splitPercentage" in obj, get: obj => obj.splitPercentage, set: (obj, value) => { obj.splitPercentage = value; } }, metadata: _metadata }, _splitPercentage_initializers, _splitPercentage_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        subject = __runInitializers(this, _subject_initializers, void 0);
        content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        fromName = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
        splitPercentage = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _splitPercentage_initializers, void 0));
        constructor() {
            __runInitializers(this, _splitPercentage_extraInitializers);
        }
    };
})();
exports.UpdateVariantDto = UpdateVariantDto;
/**
 * DTO for sending an A/B test
 */
let SendAbTestDto = (() => {
    let _campaignId_decorators;
    let _campaignId_initializers = [];
    let _campaignId_extraInitializers = [];
    let _subscriberIds_decorators;
    let _subscriberIds_initializers = [];
    let _subscriberIds_extraInitializers = [];
    let _segmentIds_decorators;
    let _segmentIds_initializers = [];
    let _segmentIds_extraInitializers = [];
    return class SendAbTestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _campaignId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Campaign ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _subscriberIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Array of subscriber IDs to send to (optional, will use all if not provided)',
                    type: [String],
                    example: ['sub-1', 'sub-2', 'sub-3'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _segmentIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Segment IDs to send to (optional)',
                    type: [String],
                    example: ['seg-1', 'seg-2'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _campaignId_decorators, { kind: "field", name: "campaignId", static: false, private: false, access: { has: obj => "campaignId" in obj, get: obj => obj.campaignId, set: (obj, value) => { obj.campaignId = value; } }, metadata: _metadata }, _campaignId_initializers, _campaignId_extraInitializers);
            __esDecorate(null, null, _subscriberIds_decorators, { kind: "field", name: "subscriberIds", static: false, private: false, access: { has: obj => "subscriberIds" in obj, get: obj => obj.subscriberIds, set: (obj, value) => { obj.subscriberIds = value; } }, metadata: _metadata }, _subscriberIds_initializers, _subscriberIds_extraInitializers);
            __esDecorate(null, null, _segmentIds_decorators, { kind: "field", name: "segmentIds", static: false, private: false, access: { has: obj => "segmentIds" in obj, get: obj => obj.segmentIds, set: (obj, value) => { obj.segmentIds = value; } }, metadata: _metadata }, _segmentIds_initializers, _segmentIds_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        campaignId = __runInitializers(this, _campaignId_initializers, void 0);
        subscriberIds = (__runInitializers(this, _campaignId_extraInitializers), __runInitializers(this, _subscriberIds_initializers, void 0));
        segmentIds = (__runInitializers(this, _subscriberIds_extraInitializers), __runInitializers(this, _segmentIds_initializers, void 0));
        constructor() {
            __runInitializers(this, _segmentIds_extraInitializers);
        }
    };
})();
exports.SendAbTestDto = SendAbTestDto;
/**
 * DTO for manually selecting a winner
 */
let SelectWinnerDto = (() => {
    let _variantId_decorators;
    let _variantId_initializers = [];
    let _variantId_extraInitializers = [];
    return class SelectWinnerDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _variantId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Variant ID to select as winner',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _variantId_decorators, { kind: "field", name: "variantId", static: false, private: false, access: { has: obj => "variantId" in obj, get: obj => obj.variantId, set: (obj, value) => { obj.variantId = value; } }, metadata: _metadata }, _variantId_initializers, _variantId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        variantId = __runInitializers(this, _variantId_initializers, void 0);
        constructor() {
            __runInitializers(this, _variantId_extraInitializers);
        }
    };
})();
exports.SelectWinnerDto = SelectWinnerDto;
/**
 * Response DTO for A/B test results
 */
let AbTestResultDto = (() => {
    let _campaign_decorators;
    let _campaign_initializers = [];
    let _campaign_extraInitializers = [];
    let _variants_decorators;
    let _variants_initializers = [];
    let _variants_extraInitializers = [];
    let _statistics_decorators;
    let _statistics_initializers = [];
    let _statistics_extraInitializers = [];
    return class AbTestResultDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _campaign_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Campaign information',
                })];
            _variants_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Variant statistics',
                })];
            _statistics_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Statistical analysis',
                })];
            __esDecorate(null, null, _campaign_decorators, { kind: "field", name: "campaign", static: false, private: false, access: { has: obj => "campaign" in obj, get: obj => obj.campaign, set: (obj, value) => { obj.campaign = value; } }, metadata: _metadata }, _campaign_initializers, _campaign_extraInitializers);
            __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: obj => "variants" in obj, get: obj => obj.variants, set: (obj, value) => { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
            __esDecorate(null, null, _statistics_decorators, { kind: "field", name: "statistics", static: false, private: false, access: { has: obj => "statistics" in obj, get: obj => obj.statistics, set: (obj, value) => { obj.statistics = value; } }, metadata: _metadata }, _statistics_initializers, _statistics_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        campaign = __runInitializers(this, _campaign_initializers, void 0);
        variants = (__runInitializers(this, _campaign_extraInitializers), __runInitializers(this, _variants_initializers, void 0));
        statistics = (__runInitializers(this, _variants_extraInitializers), __runInitializers(this, _statistics_initializers, void 0));
        constructor() {
            __runInitializers(this, _statistics_extraInitializers);
        }
    };
})();
exports.AbTestResultDto = AbTestResultDto;
//# sourceMappingURL=ab-test.dto.js.map