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
exports.KnowledgeBaseArticle = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_category_entity_1 = require("./ticket-category.entity");
/**
 * Knowledge Base Article Entity
 * Self-service articles for customers
 */
let KnowledgeBaseArticle = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('knowledge_base_articles')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _summary_decorators;
    let _summary_initializers = [];
    let _summary_extraInitializers = [];
    let _slug_decorators;
    let _slug_initializers = [];
    let _slug_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _authorId_decorators;
    let _authorId_initializers = [];
    let _authorId_extraInitializers = [];
    let _author_decorators;
    let _author_initializers = [];
    let _author_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _isPublished_decorators;
    let _isPublished_initializers = [];
    let _isPublished_extraInitializers = [];
    let _isFeatured_decorators;
    let _isFeatured_initializers = [];
    let _isFeatured_extraInitializers = [];
    let _viewCount_decorators;
    let _viewCount_initializers = [];
    let _viewCount_extraInitializers = [];
    let _helpfulCount_decorators;
    let _helpfulCount_initializers = [];
    let _helpfulCount_extraInitializers = [];
    let _notHelpfulCount_decorators;
    let _notHelpfulCount_initializers = [];
    let _notHelpfulCount_extraInitializers = [];
    let _searchScore_decorators;
    let _searchScore_initializers = [];
    let _searchScore_extraInitializers = [];
    let _relatedArticleIds_decorators;
    let _relatedArticleIds_initializers = [];
    let _relatedArticleIds_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _publishedAt_decorators;
    let _publishedAt_initializers = [];
    let _publishedAt_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var KnowledgeBaseArticle = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _title_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500 })];
            _content_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
            _summary_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _slug_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, unique: true })];
            _categoryId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _category_decorators = [(0, typeorm_1.ManyToOne)(() => ticket_category_entity_1.TicketCategory, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'categoryId' })];
            _authorId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _author_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'authorId' })];
            _tags_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
            _isPublished_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _isFeatured_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _viewCount_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 0 })];
            _helpfulCount_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 0 })];
            _notHelpfulCount_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 0 })];
            _searchScore_decorators = [(0, typeorm_1.Column)({ type: 'integer', default: 0 })];
            _relatedArticleIds_decorators = [(0, typeorm_1.Column)({ type: 'simple-array', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'draft' })];
            _publishedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: obj => "summary" in obj, get: obj => obj.summary, set: (obj, value) => { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: obj => "slug" in obj, get: obj => obj.slug, set: (obj, value) => { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: obj => "authorId" in obj, get: obj => obj.authorId, set: (obj, value) => { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: obj => "author" in obj, get: obj => obj.author, set: (obj, value) => { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _isPublished_decorators, { kind: "field", name: "isPublished", static: false, private: false, access: { has: obj => "isPublished" in obj, get: obj => obj.isPublished, set: (obj, value) => { obj.isPublished = value; } }, metadata: _metadata }, _isPublished_initializers, _isPublished_extraInitializers);
            __esDecorate(null, null, _isFeatured_decorators, { kind: "field", name: "isFeatured", static: false, private: false, access: { has: obj => "isFeatured" in obj, get: obj => obj.isFeatured, set: (obj, value) => { obj.isFeatured = value; } }, metadata: _metadata }, _isFeatured_initializers, _isFeatured_extraInitializers);
            __esDecorate(null, null, _viewCount_decorators, { kind: "field", name: "viewCount", static: false, private: false, access: { has: obj => "viewCount" in obj, get: obj => obj.viewCount, set: (obj, value) => { obj.viewCount = value; } }, metadata: _metadata }, _viewCount_initializers, _viewCount_extraInitializers);
            __esDecorate(null, null, _helpfulCount_decorators, { kind: "field", name: "helpfulCount", static: false, private: false, access: { has: obj => "helpfulCount" in obj, get: obj => obj.helpfulCount, set: (obj, value) => { obj.helpfulCount = value; } }, metadata: _metadata }, _helpfulCount_initializers, _helpfulCount_extraInitializers);
            __esDecorate(null, null, _notHelpfulCount_decorators, { kind: "field", name: "notHelpfulCount", static: false, private: false, access: { has: obj => "notHelpfulCount" in obj, get: obj => obj.notHelpfulCount, set: (obj, value) => { obj.notHelpfulCount = value; } }, metadata: _metadata }, _notHelpfulCount_initializers, _notHelpfulCount_extraInitializers);
            __esDecorate(null, null, _searchScore_decorators, { kind: "field", name: "searchScore", static: false, private: false, access: { has: obj => "searchScore" in obj, get: obj => obj.searchScore, set: (obj, value) => { obj.searchScore = value; } }, metadata: _metadata }, _searchScore_initializers, _searchScore_extraInitializers);
            __esDecorate(null, null, _relatedArticleIds_decorators, { kind: "field", name: "relatedArticleIds", static: false, private: false, access: { has: obj => "relatedArticleIds" in obj, get: obj => obj.relatedArticleIds, set: (obj, value) => { obj.relatedArticleIds = value; } }, metadata: _metadata }, _relatedArticleIds_initializers, _relatedArticleIds_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _publishedAt_decorators, { kind: "field", name: "publishedAt", static: false, private: false, access: { has: obj => "publishedAt" in obj, get: obj => obj.publishedAt, set: (obj, value) => { obj.publishedAt = value; } }, metadata: _metadata }, _publishedAt_initializers, _publishedAt_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseArticle = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        summary = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _summary_initializers, void 0));
        slug = (__runInitializers(this, _summary_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
        categoryId = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        category = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        authorId = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
        author = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _author_initializers, void 0));
        tags = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        isPublished = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _isPublished_initializers, void 0));
        isFeatured = (__runInitializers(this, _isPublished_extraInitializers), __runInitializers(this, _isFeatured_initializers, void 0));
        viewCount = (__runInitializers(this, _isFeatured_extraInitializers), __runInitializers(this, _viewCount_initializers, void 0));
        helpfulCount = (__runInitializers(this, _viewCount_extraInitializers), __runInitializers(this, _helpfulCount_initializers, void 0));
        notHelpfulCount = (__runInitializers(this, _helpfulCount_extraInitializers), __runInitializers(this, _notHelpfulCount_initializers, void 0));
        searchScore = (__runInitializers(this, _notHelpfulCount_extraInitializers), __runInitializers(this, _searchScore_initializers, void 0)); // For search ranking
        relatedArticleIds = (__runInitializers(this, _searchScore_extraInitializers), __runInitializers(this, _relatedArticleIds_initializers, void 0));
        metadata = (__runInitializers(this, _relatedArticleIds_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        status = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        publishedAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _publishedAt_initializers, void 0));
        createdAt = (__runInitializers(this, _publishedAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return KnowledgeBaseArticle = _classThis;
})();
exports.KnowledgeBaseArticle = KnowledgeBaseArticle;
//# sourceMappingURL=knowledge-base-article.entity.js.map