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
exports.AiController = exports.GenerateBodyDto = exports.GenerateSubjectDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let GenerateSubjectDto = (() => {
    let _campaignName_decorators;
    let _campaignName_initializers = [];
    let _campaignName_extraInitializers = [];
    let _targetAudience_decorators;
    let _targetAudience_initializers = [];
    let _targetAudience_extraInitializers = [];
    let _productName_decorators;
    let _productName_initializers = [];
    let _productName_extraInitializers = [];
    let _productDescription_decorators;
    let _productDescription_initializers = [];
    let _productDescription_extraInitializers = [];
    let _callToAction_decorators;
    let _callToAction_initializers = [];
    let _callToAction_extraInitializers = [];
    let _tone_decorators;
    let _tone_initializers = [];
    let _tone_extraInitializers = [];
    let _keywords_decorators;
    let _keywords_initializers = [];
    let _keywords_extraInitializers = [];
    let _count_decorators;
    let _count_initializers = [];
    let _count_extraInitializers = [];
    return class GenerateSubjectDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _campaignName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _targetAudience_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _productName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _productDescription_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _callToAction_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['professional', 'casual', 'enthusiastic', 'urgent', 'friendly'])];
            _keywords_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _count_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(10)];
            __esDecorate(null, null, _campaignName_decorators, { kind: "field", name: "campaignName", static: false, private: false, access: { has: obj => "campaignName" in obj, get: obj => obj.campaignName, set: (obj, value) => { obj.campaignName = value; } }, metadata: _metadata }, _campaignName_initializers, _campaignName_extraInitializers);
            __esDecorate(null, null, _targetAudience_decorators, { kind: "field", name: "targetAudience", static: false, private: false, access: { has: obj => "targetAudience" in obj, get: obj => obj.targetAudience, set: (obj, value) => { obj.targetAudience = value; } }, metadata: _metadata }, _targetAudience_initializers, _targetAudience_extraInitializers);
            __esDecorate(null, null, _productName_decorators, { kind: "field", name: "productName", static: false, private: false, access: { has: obj => "productName" in obj, get: obj => obj.productName, set: (obj, value) => { obj.productName = value; } }, metadata: _metadata }, _productName_initializers, _productName_extraInitializers);
            __esDecorate(null, null, _productDescription_decorators, { kind: "field", name: "productDescription", static: false, private: false, access: { has: obj => "productDescription" in obj, get: obj => obj.productDescription, set: (obj, value) => { obj.productDescription = value; } }, metadata: _metadata }, _productDescription_initializers, _productDescription_extraInitializers);
            __esDecorate(null, null, _callToAction_decorators, { kind: "field", name: "callToAction", static: false, private: false, access: { has: obj => "callToAction" in obj, get: obj => obj.callToAction, set: (obj, value) => { obj.callToAction = value; } }, metadata: _metadata }, _callToAction_initializers, _callToAction_extraInitializers);
            __esDecorate(null, null, _tone_decorators, { kind: "field", name: "tone", static: false, private: false, access: { has: obj => "tone" in obj, get: obj => obj.tone, set: (obj, value) => { obj.tone = value; } }, metadata: _metadata }, _tone_initializers, _tone_extraInitializers);
            __esDecorate(null, null, _keywords_decorators, { kind: "field", name: "keywords", static: false, private: false, access: { has: obj => "keywords" in obj, get: obj => obj.keywords, set: (obj, value) => { obj.keywords = value; } }, metadata: _metadata }, _keywords_initializers, _keywords_extraInitializers);
            __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count, set: (obj, value) => { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        campaignName = __runInitializers(this, _campaignName_initializers, void 0);
        targetAudience = (__runInitializers(this, _campaignName_extraInitializers), __runInitializers(this, _targetAudience_initializers, void 0));
        productName = (__runInitializers(this, _targetAudience_extraInitializers), __runInitializers(this, _productName_initializers, void 0));
        productDescription = (__runInitializers(this, _productName_extraInitializers), __runInitializers(this, _productDescription_initializers, void 0));
        callToAction = (__runInitializers(this, _productDescription_extraInitializers), __runInitializers(this, _callToAction_initializers, void 0));
        tone = (__runInitializers(this, _callToAction_extraInitializers), __runInitializers(this, _tone_initializers, void 0));
        keywords = (__runInitializers(this, _tone_extraInitializers), __runInitializers(this, _keywords_initializers, void 0));
        count = (__runInitializers(this, _keywords_extraInitializers), __runInitializers(this, _count_initializers, void 0));
        constructor() {
            __runInitializers(this, _count_extraInitializers);
        }
    };
})();
exports.GenerateSubjectDto = GenerateSubjectDto;
let GenerateBodyDto = (() => {
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _campaignName_decorators;
    let _campaignName_initializers = [];
    let _campaignName_extraInitializers = [];
    let _targetAudience_decorators;
    let _targetAudience_initializers = [];
    let _targetAudience_extraInitializers = [];
    let _productName_decorators;
    let _productName_initializers = [];
    let _productName_extraInitializers = [];
    let _productDescription_decorators;
    let _productDescription_initializers = [];
    let _productDescription_extraInitializers = [];
    let _callToAction_decorators;
    let _callToAction_initializers = [];
    let _callToAction_extraInitializers = [];
    let _tone_decorators;
    let _tone_initializers = [];
    let _tone_extraInitializers = [];
    return class GenerateBodyDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subject_decorators = [(0, class_validator_1.IsString)()];
            _campaignName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _targetAudience_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _productName_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _productDescription_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _callToAction_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tone_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['professional', 'casual', 'enthusiastic', 'urgent', 'friendly'])];
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _campaignName_decorators, { kind: "field", name: "campaignName", static: false, private: false, access: { has: obj => "campaignName" in obj, get: obj => obj.campaignName, set: (obj, value) => { obj.campaignName = value; } }, metadata: _metadata }, _campaignName_initializers, _campaignName_extraInitializers);
            __esDecorate(null, null, _targetAudience_decorators, { kind: "field", name: "targetAudience", static: false, private: false, access: { has: obj => "targetAudience" in obj, get: obj => obj.targetAudience, set: (obj, value) => { obj.targetAudience = value; } }, metadata: _metadata }, _targetAudience_initializers, _targetAudience_extraInitializers);
            __esDecorate(null, null, _productName_decorators, { kind: "field", name: "productName", static: false, private: false, access: { has: obj => "productName" in obj, get: obj => obj.productName, set: (obj, value) => { obj.productName = value; } }, metadata: _metadata }, _productName_initializers, _productName_extraInitializers);
            __esDecorate(null, null, _productDescription_decorators, { kind: "field", name: "productDescription", static: false, private: false, access: { has: obj => "productDescription" in obj, get: obj => obj.productDescription, set: (obj, value) => { obj.productDescription = value; } }, metadata: _metadata }, _productDescription_initializers, _productDescription_extraInitializers);
            __esDecorate(null, null, _callToAction_decorators, { kind: "field", name: "callToAction", static: false, private: false, access: { has: obj => "callToAction" in obj, get: obj => obj.callToAction, set: (obj, value) => { obj.callToAction = value; } }, metadata: _metadata }, _callToAction_initializers, _callToAction_extraInitializers);
            __esDecorate(null, null, _tone_decorators, { kind: "field", name: "tone", static: false, private: false, access: { has: obj => "tone" in obj, get: obj => obj.tone, set: (obj, value) => { obj.tone = value; } }, metadata: _metadata }, _tone_initializers, _tone_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        subject = __runInitializers(this, _subject_initializers, void 0);
        campaignName = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _campaignName_initializers, void 0));
        targetAudience = (__runInitializers(this, _campaignName_extraInitializers), __runInitializers(this, _targetAudience_initializers, void 0));
        productName = (__runInitializers(this, _targetAudience_extraInitializers), __runInitializers(this, _productName_initializers, void 0));
        productDescription = (__runInitializers(this, _productName_extraInitializers), __runInitializers(this, _productDescription_initializers, void 0));
        callToAction = (__runInitializers(this, _productDescription_extraInitializers), __runInitializers(this, _callToAction_initializers, void 0));
        tone = (__runInitializers(this, _callToAction_extraInitializers), __runInitializers(this, _tone_initializers, void 0));
        constructor() {
            __runInitializers(this, _tone_extraInitializers);
        }
    };
})();
exports.GenerateBodyDto = GenerateBodyDto;
let AiController = (() => {
    let _classDecorators = [(0, common_1.Controller)('ai')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _generateSubject_decorators;
    let _generateBody_decorators;
    let _generateComplete_decorators;
    var AiController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _generateSubject_decorators = [(0, common_1.Post)('email/generate-subject')];
            _generateBody_decorators = [(0, common_1.Post)('email/generate-body')];
            _generateComplete_decorators = [(0, common_1.Post)('email/generate-complete')];
            __esDecorate(this, null, _generateSubject_decorators, { kind: "method", name: "generateSubject", static: false, private: false, access: { has: obj => "generateSubject" in obj, get: obj => obj.generateSubject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateBody_decorators, { kind: "method", name: "generateBody", static: false, private: false, access: { has: obj => "generateBody" in obj, get: obj => obj.generateBody }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateComplete_decorators, { kind: "method", name: "generateComplete", static: false, private: false, access: { has: obj => "generateComplete" in obj, get: obj => obj.generateComplete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AiController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        aiEmailService = __runInitializers(this, _instanceExtraInitializers);
        constructor(aiEmailService) {
            this.aiEmailService = aiEmailService;
        }
        /**
         * Generate email subject lines using AI
         * POST /api/ai/email/generate-subject
         */
        async generateSubject(dto) {
            try {
                const context = {
                    campaignName: dto.campaignName,
                    targetAudience: dto.targetAudience,
                    productName: dto.productName,
                    productDescription: dto.productDescription,
                    callToAction: dto.callToAction,
                    tone: dto.tone,
                    keywords: dto.keywords,
                };
                const subjects = await this.aiEmailService.generateSubjectLines(context, dto.count || 5);
                return {
                    success: true,
                    data: {
                        subjects,
                        count: subjects.length,
                    },
                };
            }
            catch (error) {
                throw new common_1.HttpException({
                    success: false,
                    error: {
                        message: error.message,
                        code: 'AI_GENERATION_FAILED',
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        /**
         * Generate email body content using AI
         * POST /api/ai/email/generate-body
         */
        async generateBody(dto) {
            try {
                const context = {
                    campaignName: dto.campaignName,
                    targetAudience: dto.targetAudience,
                    productName: dto.productName,
                    productDescription: dto.productDescription,
                    callToAction: dto.callToAction,
                    tone: dto.tone,
                };
                const result = await this.aiEmailService.generateEmailBody(dto.subject, context);
                return {
                    success: true,
                    data: {
                        htmlBody: result.htmlBody,
                        plainTextBody: result.plainTextBody,
                        tokensUsed: result.tokensUsed,
                    },
                };
            }
            catch (error) {
                throw new common_1.HttpException({
                    success: false,
                    error: {
                        message: error.message,
                        code: 'AI_GENERATION_FAILED',
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        /**
         * Generate both subject and body in one request
         * POST /api/ai/email/generate-complete
         */
        async generateComplete(dto) {
            try {
                const context = {
                    campaignName: dto.campaignName,
                    targetAudience: dto.targetAudience,
                    productName: dto.productName,
                    productDescription: dto.productDescription,
                    callToAction: dto.callToAction,
                    tone: dto.tone,
                    keywords: dto.keywords,
                };
                // Generate subjects first
                const subjects = await this.aiEmailService.generateSubjectLines(context, dto.count || 5);
                // Use first subject to generate body
                const bodyResult = await this.aiEmailService.generateEmailBody(subjects[0], context);
                return {
                    success: true,
                    data: {
                        subjects,
                        selectedSubject: subjects[0],
                        htmlBody: bodyResult.htmlBody,
                        plainTextBody: bodyResult.plainTextBody,
                        tokensUsed: bodyResult.tokensUsed,
                    },
                };
            }
            catch (error) {
                throw new common_1.HttpException({
                    success: false,
                    error: {
                        message: error.message,
                        code: 'AI_GENERATION_FAILED',
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    return AiController = _classThis;
})();
exports.AiController = AiController;
//# sourceMappingURL=ai.controller.js.map