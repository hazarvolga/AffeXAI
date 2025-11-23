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
exports.LearnedFaqEntry = exports.FaqEntrySource = exports.FaqEntryStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var FaqEntryStatus;
(function (FaqEntryStatus) {
    FaqEntryStatus["DRAFT"] = "draft";
    FaqEntryStatus["PENDING_REVIEW"] = "pending_review";
    FaqEntryStatus["APPROVED"] = "approved";
    FaqEntryStatus["REJECTED"] = "rejected";
    FaqEntryStatus["PUBLISHED"] = "published";
})(FaqEntryStatus || (exports.FaqEntryStatus = FaqEntryStatus = {}));
var FaqEntrySource;
(function (FaqEntrySource) {
    FaqEntrySource["CHAT"] = "chat";
    FaqEntrySource["TICKET"] = "ticket";
    FaqEntrySource["USER_SUGGESTION"] = "user_suggestion";
})(FaqEntrySource || (exports.FaqEntrySource = FaqEntrySource = {}));
let LearnedFaqEntry = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('learned_faq_entries'), (0, typeorm_1.Index)(['status']), (0, typeorm_1.Index)(['source']), (0, typeorm_1.Index)(['category']), (0, typeorm_1.Index)(['createdAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _question_decorators;
    let _question_initializers = [];
    let _question_extraInitializers = [];
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _confidence_decorators;
    let _confidence_initializers = [];
    let _confidence_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _source_decorators;
    let _source_initializers = [];
    let _source_extraInitializers = [];
    let _sourceId_decorators;
    let _sourceId_initializers = [];
    let _sourceId_extraInitializers = [];
    let _keywords_decorators;
    let _keywords_initializers = [];
    let _keywords_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _usageCount_decorators;
    let _usageCount_initializers = [];
    let _usageCount_extraInitializers = [];
    let _viewCount_decorators;
    let _viewCount_initializers = [];
    let _viewCount_extraInitializers = [];
    let _helpfulCount_decorators;
    let _helpfulCount_initializers = [];
    let _helpfulCount_extraInitializers = [];
    let _notHelpfulCount_decorators;
    let _notHelpfulCount_initializers = [];
    let _notHelpfulCount_extraInitializers = [];
    let _reviewedAt_decorators;
    let _reviewedAt_initializers = [];
    let _reviewedAt_extraInitializers = [];
    let _publishedAt_decorators;
    let _publishedAt_initializers = [];
    let _publishedAt_extraInitializers = [];
    let _reviewer_decorators;
    let _reviewer_initializers = [];
    let _reviewer_extraInitializers = [];
    let _reviewedBy_decorators;
    let _reviewedBy_initializers = [];
    let _reviewedBy_extraInitializers = [];
    let _creator_decorators;
    let _creator_initializers = [];
    let _creator_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    var LearnedFaqEntry = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _question_decorators = [(0, typeorm_1.Column)('text')];
            _answer_decorators = [(0, typeorm_1.Column)('text')];
            _category_decorators = [(0, typeorm_1.Column)({ length: 100, nullable: true })];
            _confidence_decorators = [(0, typeorm_1.Column)('int', {
                    transformer: {
                        to: (value) => Math.max(1, Math.min(100, value)),
                        from: (value) => value
                    }
                }), (0, typeorm_1.Index)()];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: FaqEntryStatus,
                    default: FaqEntryStatus.DRAFT
                })];
            _source_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: FaqEntrySource
                })];
            _sourceId_decorators = [(0, typeorm_1.Column)('uuid'), (0, typeorm_1.Index)()];
            _keywords_decorators = [(0, typeorm_1.Column)('text', { array: true, default: [] })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
            _usageCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 }), (0, typeorm_1.Index)()];
            _viewCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 }), (0, typeorm_1.Index)()];
            _helpfulCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
            _notHelpfulCount_decorators = [(0, typeorm_1.Column)('int', { default: 0 })];
            _reviewedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _publishedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _reviewer_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'reviewedBy' })];
            _reviewedBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            _creator_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'createdBy' })];
            _createdBy_decorators = [(0, typeorm_1.Column)('uuid', { nullable: true })];
            __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: obj => "question" in obj, get: obj => obj.question, set: (obj, value) => { obj.question = value; } }, metadata: _metadata }, _question_initializers, _question_extraInitializers);
            __esDecorate(null, null, _answer_decorators, { kind: "field", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _confidence_decorators, { kind: "field", name: "confidence", static: false, private: false, access: { has: obj => "confidence" in obj, get: obj => obj.confidence, set: (obj, value) => { obj.confidence = value; } }, metadata: _metadata }, _confidence_initializers, _confidence_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
            __esDecorate(null, null, _sourceId_decorators, { kind: "field", name: "sourceId", static: false, private: false, access: { has: obj => "sourceId" in obj, get: obj => obj.sourceId, set: (obj, value) => { obj.sourceId = value; } }, metadata: _metadata }, _sourceId_initializers, _sourceId_extraInitializers);
            __esDecorate(null, null, _keywords_decorators, { kind: "field", name: "keywords", static: false, private: false, access: { has: obj => "keywords" in obj, get: obj => obj.keywords, set: (obj, value) => { obj.keywords = value; } }, metadata: _metadata }, _keywords_initializers, _keywords_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _usageCount_decorators, { kind: "field", name: "usageCount", static: false, private: false, access: { has: obj => "usageCount" in obj, get: obj => obj.usageCount, set: (obj, value) => { obj.usageCount = value; } }, metadata: _metadata }, _usageCount_initializers, _usageCount_extraInitializers);
            __esDecorate(null, null, _viewCount_decorators, { kind: "field", name: "viewCount", static: false, private: false, access: { has: obj => "viewCount" in obj, get: obj => obj.viewCount, set: (obj, value) => { obj.viewCount = value; } }, metadata: _metadata }, _viewCount_initializers, _viewCount_extraInitializers);
            __esDecorate(null, null, _helpfulCount_decorators, { kind: "field", name: "helpfulCount", static: false, private: false, access: { has: obj => "helpfulCount" in obj, get: obj => obj.helpfulCount, set: (obj, value) => { obj.helpfulCount = value; } }, metadata: _metadata }, _helpfulCount_initializers, _helpfulCount_extraInitializers);
            __esDecorate(null, null, _notHelpfulCount_decorators, { kind: "field", name: "notHelpfulCount", static: false, private: false, access: { has: obj => "notHelpfulCount" in obj, get: obj => obj.notHelpfulCount, set: (obj, value) => { obj.notHelpfulCount = value; } }, metadata: _metadata }, _notHelpfulCount_initializers, _notHelpfulCount_extraInitializers);
            __esDecorate(null, null, _reviewedAt_decorators, { kind: "field", name: "reviewedAt", static: false, private: false, access: { has: obj => "reviewedAt" in obj, get: obj => obj.reviewedAt, set: (obj, value) => { obj.reviewedAt = value; } }, metadata: _metadata }, _reviewedAt_initializers, _reviewedAt_extraInitializers);
            __esDecorate(null, null, _publishedAt_decorators, { kind: "field", name: "publishedAt", static: false, private: false, access: { has: obj => "publishedAt" in obj, get: obj => obj.publishedAt, set: (obj, value) => { obj.publishedAt = value; } }, metadata: _metadata }, _publishedAt_initializers, _publishedAt_extraInitializers);
            __esDecorate(null, null, _reviewer_decorators, { kind: "field", name: "reviewer", static: false, private: false, access: { has: obj => "reviewer" in obj, get: obj => obj.reviewer, set: (obj, value) => { obj.reviewer = value; } }, metadata: _metadata }, _reviewer_initializers, _reviewer_extraInitializers);
            __esDecorate(null, null, _reviewedBy_decorators, { kind: "field", name: "reviewedBy", static: false, private: false, access: { has: obj => "reviewedBy" in obj, get: obj => obj.reviewedBy, set: (obj, value) => { obj.reviewedBy = value; } }, metadata: _metadata }, _reviewedBy_initializers, _reviewedBy_extraInitializers);
            __esDecorate(null, null, _creator_decorators, { kind: "field", name: "creator", static: false, private: false, access: { has: obj => "creator" in obj, get: obj => obj.creator, set: (obj, value) => { obj.creator = value; } }, metadata: _metadata }, _creator_initializers, _creator_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LearnedFaqEntry = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        question = __runInitializers(this, _question_initializers, void 0);
        answer = (__runInitializers(this, _question_extraInitializers), __runInitializers(this, _answer_initializers, void 0));
        category = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        confidence = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _confidence_initializers, void 0)); // 1-100
        status = (__runInitializers(this, _confidence_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        source = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _source_initializers, void 0));
        sourceId = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _sourceId_initializers, void 0));
        keywords = (__runInitializers(this, _sourceId_extraInitializers), __runInitializers(this, _keywords_initializers, void 0));
        metadata = (__runInitializers(this, _keywords_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        usageCount = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _usageCount_initializers, void 0));
        viewCount = (__runInitializers(this, _usageCount_extraInitializers), __runInitializers(this, _viewCount_initializers, void 0));
        helpfulCount = (__runInitializers(this, _viewCount_extraInitializers), __runInitializers(this, _helpfulCount_initializers, void 0));
        notHelpfulCount = (__runInitializers(this, _helpfulCount_extraInitializers), __runInitializers(this, _notHelpfulCount_initializers, void 0));
        reviewedAt = (__runInitializers(this, _notHelpfulCount_extraInitializers), __runInitializers(this, _reviewedAt_initializers, void 0));
        publishedAt = (__runInitializers(this, _reviewedAt_extraInitializers), __runInitializers(this, _publishedAt_initializers, void 0));
        reviewer = (__runInitializers(this, _publishedAt_extraInitializers), __runInitializers(this, _reviewer_initializers, void 0));
        reviewedBy = (__runInitializers(this, _reviewer_extraInitializers), __runInitializers(this, _reviewedBy_initializers, void 0));
        creator = (__runInitializers(this, _reviewedBy_extraInitializers), __runInitializers(this, _creator_initializers, void 0));
        createdBy = (__runInitializers(this, _creator_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
        // Computed properties
        get positiveFeedbackCount() {
            return this.helpfulCount;
        }
        get feedbackCount() {
            return this.helpfulCount + this.notHelpfulCount;
        }
        get helpfulnessRatio() {
            const total = this.helpfulCount + this.notHelpfulCount;
            return total > 0 ? this.helpfulCount / total : 0;
        }
        get isHighConfidence() {
            return this.confidence >= 85;
        }
        get needsReview() {
            return this.status === FaqEntryStatus.PENDING_REVIEW;
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _createdBy_extraInitializers);
        }
    };
    return LearnedFaqEntry = _classThis;
})();
exports.LearnedFaqEntry = LearnedFaqEntry;
//# sourceMappingURL=learned-faq-entry.entity.js.map