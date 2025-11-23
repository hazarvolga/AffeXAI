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
exports.LearningPattern = exports.PatternType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
var PatternType;
(function (PatternType) {
    PatternType["QUESTION"] = "question";
    PatternType["ANSWER"] = "answer";
    PatternType["CONTEXT"] = "context";
})(PatternType || (exports.PatternType = PatternType = {}));
let LearningPattern = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('learning_patterns'), (0, typeorm_1.Index)(['patternType']), (0, typeorm_1.Index)(['frequency']), (0, typeorm_1.Index)(['confidence']), (0, typeorm_1.Index)(['category']), (0, typeorm_1.Index)(['createdAt']), (0, typeorm_1.Unique)(['patternHash'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _patternType_decorators;
    let _patternType_initializers = [];
    let _patternType_extraInitializers = [];
    let _pattern_decorators;
    let _pattern_initializers = [];
    let _pattern_extraInitializers = [];
    let _patternHash_decorators;
    let _patternHash_initializers = [];
    let _patternHash_extraInitializers = [];
    let _frequency_decorators;
    let _frequency_initializers = [];
    let _frequency_extraInitializers = [];
    let _confidence_decorators;
    let _confidence_initializers = [];
    let _confidence_extraInitializers = [];
    let _keywords_decorators;
    let _keywords_initializers = [];
    let _keywords_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _sources_decorators;
    let _sources_initializers = [];
    let _sources_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    var LearningPattern = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _patternType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: PatternType
                })];
            _pattern_decorators = [(0, typeorm_1.Column)('text')];
            _patternHash_decorators = [(0, typeorm_1.Column)({ length: 64, unique: true })];
            _frequency_decorators = [(0, typeorm_1.Column)('int', { default: 1 })];
            _confidence_decorators = [(0, typeorm_1.Column)('int', { default: 50,
                    transformer: {
                        to: (value) => Math.max(1, Math.min(100, value)),
                        from: (value) => value
                    }
                })];
            _keywords_decorators = [(0, typeorm_1.Column)('text', { array: true, default: [] })];
            _category_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
            _sources_decorators = [(0, typeorm_1.Column)('jsonb', { default: [] })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
            __esDecorate(null, null, _patternType_decorators, { kind: "field", name: "patternType", static: false, private: false, access: { has: obj => "patternType" in obj, get: obj => obj.patternType, set: (obj, value) => { obj.patternType = value; } }, metadata: _metadata }, _patternType_initializers, _patternType_extraInitializers);
            __esDecorate(null, null, _pattern_decorators, { kind: "field", name: "pattern", static: false, private: false, access: { has: obj => "pattern" in obj, get: obj => obj.pattern, set: (obj, value) => { obj.pattern = value; } }, metadata: _metadata }, _pattern_initializers, _pattern_extraInitializers);
            __esDecorate(null, null, _patternHash_decorators, { kind: "field", name: "patternHash", static: false, private: false, access: { has: obj => "patternHash" in obj, get: obj => obj.patternHash, set: (obj, value) => { obj.patternHash = value; } }, metadata: _metadata }, _patternHash_initializers, _patternHash_extraInitializers);
            __esDecorate(null, null, _frequency_decorators, { kind: "field", name: "frequency", static: false, private: false, access: { has: obj => "frequency" in obj, get: obj => obj.frequency, set: (obj, value) => { obj.frequency = value; } }, metadata: _metadata }, _frequency_initializers, _frequency_extraInitializers);
            __esDecorate(null, null, _confidence_decorators, { kind: "field", name: "confidence", static: false, private: false, access: { has: obj => "confidence" in obj, get: obj => obj.confidence, set: (obj, value) => { obj.confidence = value; } }, metadata: _metadata }, _confidence_initializers, _confidence_extraInitializers);
            __esDecorate(null, null, _keywords_decorators, { kind: "field", name: "keywords", static: false, private: false, access: { has: obj => "keywords" in obj, get: obj => obj.keywords, set: (obj, value) => { obj.keywords = value; } }, metadata: _metadata }, _keywords_initializers, _keywords_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _sources_decorators, { kind: "field", name: "sources", static: false, private: false, access: { has: obj => "sources" in obj, get: obj => obj.sources, set: (obj, value) => { obj.sources = value; } }, metadata: _metadata }, _sources_initializers, _sources_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LearningPattern = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        patternType = __runInitializers(this, _patternType_initializers, void 0);
        pattern = (__runInitializers(this, _patternType_extraInitializers), __runInitializers(this, _pattern_initializers, void 0));
        patternHash = (__runInitializers(this, _pattern_extraInitializers), __runInitializers(this, _patternHash_initializers, void 0)); // For deduplication
        frequency = (__runInitializers(this, _patternHash_extraInitializers), __runInitializers(this, _frequency_initializers, void 0));
        confidence = (__runInitializers(this, _frequency_extraInitializers), __runInitializers(this, _confidence_initializers, void 0)); // 1-100
        keywords = (__runInitializers(this, _confidence_extraInitializers), __runInitializers(this, _keywords_initializers, void 0));
        category = (__runInitializers(this, _keywords_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        sources = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _sources_initializers, void 0));
        metadata = (__runInitializers(this, _sources_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        // Computed properties
        get type() {
            return this.patternType;
        }
        get patternText() {
            return this.pattern;
        }
        get isHighFrequency() {
            return this.frequency >= 5;
        }
        get isHighConfidence() {
            return this.confidence >= 80;
        }
        get averageSourceRelevance() {
            if (this.sources.length === 0)
                return 0;
            const total = this.sources.reduce((sum, source) => sum + source.relevance, 0);
            return total / this.sources.length;
        }
        get uniqueSourceCount() {
            const uniqueSources = new Set(this.sources.map(s => s.id));
            return uniqueSources.size;
        }
        // Helper methods
        addSource(source) {
            const existingIndex = this.sources.findIndex(s => s.id === source.id && s.type === source.type);
            if (existingIndex >= 0) {
                // Update existing source with higher relevance
                if (source.relevance > this.sources[existingIndex].relevance) {
                    this.sources[existingIndex] = source;
                }
            }
            else {
                this.sources.push(source);
            }
        }
        incrementFrequency() {
            this.frequency += 1;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
    return LearningPattern = _classThis;
})();
exports.LearningPattern = LearningPattern;
//# sourceMappingURL=learning-pattern.entity.js.map