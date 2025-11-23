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
exports.FaqLearningConfig = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let FaqLearningConfig = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('faq_learning_config'), (0, typeorm_1.Index)(['configKey']), (0, typeorm_1.Index)(['updatedAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _configKey_decorators;
    let _configKey_initializers = [];
    let _configKey_extraInitializers = [];
    let _configValue_decorators;
    let _configValue_initializers = [];
    let _configValue_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _updater_decorators;
    let _updater_initializers = [];
    let _updater_extraInitializers = [];
    let _updatedBy_decorators;
    let _updatedBy_initializers = [];
    let _updatedBy_extraInitializers = [];
    var FaqLearningConfig = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _configKey_decorators = [(0, typeorm_1.Column)({ length: 100, unique: true })];
            _configValue_decorators = [(0, typeorm_1.Column)('jsonb')];
            _description_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _isActive_decorators = [(0, typeorm_1.Column)('boolean', { default: true })];
            _category_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _updater_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'updatedBy' })];
            _updatedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            __esDecorate(null, null, _configKey_decorators, { kind: "field", name: "configKey", static: false, private: false, access: { has: obj => "configKey" in obj, get: obj => obj.configKey, set: (obj, value) => { obj.configKey = value; } }, metadata: _metadata }, _configKey_initializers, _configKey_extraInitializers);
            __esDecorate(null, null, _configValue_decorators, { kind: "field", name: "configValue", static: false, private: false, access: { has: obj => "configValue" in obj, get: obj => obj.configValue, set: (obj, value) => { obj.configValue = value; } }, metadata: _metadata }, _configValue_initializers, _configValue_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _updater_decorators, { kind: "field", name: "updater", static: false, private: false, access: { has: obj => "updater" in obj, get: obj => obj.updater, set: (obj, value) => { obj.updater = value; } }, metadata: _metadata }, _updater_initializers, _updater_extraInitializers);
            __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: obj => "updatedBy" in obj, get: obj => obj.updatedBy, set: (obj, value) => { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqLearningConfig = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configKey = __runInitializers(this, _configKey_initializers, void 0);
        configValue = (__runInitializers(this, _configKey_extraInitializers), __runInitializers(this, _configValue_initializers, void 0));
        description = (__runInitializers(this, _configValue_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        category = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _category_initializers, void 0)); // Group related configs
        updater = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _updater_initializers, void 0));
        updatedBy = (__runInitializers(this, _updater_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
        // Helper methods for common config operations
        static getDefaultConfig() {
            return {
                minConfidenceForReview: 60,
                minConfidenceForAutoPublish: 85,
                minPatternFrequency: 3,
                similarityThreshold: 0.8,
                batchSize: 100,
                processingInterval: 3600,
                minQuestionLength: 10,
                maxQuestionLength: 500,
                minAnswerLength: 20,
                chatSessionMinDuration: 300,
                ticketMinResolutionTime: 1800,
                requiredSatisfactionScore: 4,
                excludedCategories: [],
                autoCategorizationEnabled: true,
                aiProvider: 'openai',
                modelName: 'gpt-4',
                temperature: 0.7,
                maxTokens: 1000,
                enableRealTimeProcessing: false,
                enableAutoPublishing: false,
                maxDailyProcessingLimit: 1000,
                retentionPeriodDays: 365
            };
        }
        // Type-safe getters for common config values
        get minConfidenceForReview() {
            return this.configValue.minConfidenceForReview ?? 60;
        }
        get minConfidenceForAutoPublish() {
            return this.configValue.minConfidenceForAutoPublish ?? 85;
        }
        get aiProvider() {
            return this.configValue.aiProvider ?? 'openai';
        }
        get batchSize() {
            return this.configValue.batchSize ?? 100;
        }
        get isAutoPublishingEnabled() {
            return this.configValue.enableAutoPublishing ?? false;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _updatedBy_extraInitializers);
        }
    };
    return FaqLearningConfig = _classThis;
})();
exports.FaqLearningConfig = FaqLearningConfig;
//# sourceMappingURL=faq-learning-config.entity.js.map