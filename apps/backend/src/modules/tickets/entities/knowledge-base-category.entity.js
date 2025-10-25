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
exports.KnowledgeBaseCategory = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const knowledge_base_article_entity_1 = require("./knowledge-base-article.entity");
const user_entity_1 = require("../../users/entities/user.entity");
/**
 * Knowledge Base Category Entity
 * Organizes KB articles into hierarchical categories
 */
let KnowledgeBaseCategory = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('knowledge_base_categories')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _slug_decorators;
    let _slug_initializers = [];
    let _slug_extraInitializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _parent_decorators;
    let _parent_initializers = [];
    let _parent_extraInitializers = [];
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    let _articleCount_decorators;
    let _articleCount_initializers = [];
    let _articleCount_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    let _updatedBy_decorators;
    let _updatedBy_initializers = [];
    let _updatedBy_extraInitializers = [];
    let _createdByUser_decorators;
    let _createdByUser_initializers = [];
    let _createdByUser_extraInitializers = [];
    let _updatedByUser_decorators;
    let _updatedByUser_initializers = [];
    let _updatedByUser_extraInitializers = [];
    let _articles_decorators;
    let _articles_initializers = [];
    let _articles_extraInitializers = [];
    var KnowledgeBaseCategory = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _slug_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true })];
            _color_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'blue' })];
            _icon_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'folder' })];
            _sortOrder_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
            _parentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _parent_decorators = [(0, typeorm_1.ManyToOne)(() => KnowledgeBaseCategory, category => category.children, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'parentId' })];
            _children_decorators = [(0, typeorm_1.OneToMany)(() => KnowledgeBaseCategory, category => category.parent)];
            _articleCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _createdBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _updatedBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _createdByUser_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'createdBy' })];
            _updatedByUser_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'updatedBy' })];
            _articles_decorators = [(0, typeorm_1.OneToMany)(() => knowledge_base_article_entity_1.KnowledgeBaseArticle, article => article.category)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: obj => "slug" in obj, get: obj => obj.slug, set: (obj, value) => { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
            __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
            __esDecorate(null, null, _articleCount_decorators, { kind: "field", name: "articleCount", static: false, private: false, access: { has: obj => "articleCount" in obj, get: obj => obj.articleCount, set: (obj, value) => { obj.articleCount = value; } }, metadata: _metadata }, _articleCount_initializers, _articleCount_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: obj => "updatedBy" in obj, get: obj => obj.updatedBy, set: (obj, value) => { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
            __esDecorate(null, null, _createdByUser_decorators, { kind: "field", name: "createdByUser", static: false, private: false, access: { has: obj => "createdByUser" in obj, get: obj => obj.createdByUser, set: (obj, value) => { obj.createdByUser = value; } }, metadata: _metadata }, _createdByUser_initializers, _createdByUser_extraInitializers);
            __esDecorate(null, null, _updatedByUser_decorators, { kind: "field", name: "updatedByUser", static: false, private: false, access: { has: obj => "updatedByUser" in obj, get: obj => obj.updatedByUser, set: (obj, value) => { obj.updatedByUser = value; } }, metadata: _metadata }, _updatedByUser_initializers, _updatedByUser_extraInitializers);
            __esDecorate(null, null, _articles_decorators, { kind: "field", name: "articles", static: false, private: false, access: { has: obj => "articles" in obj, get: obj => obj.articles, set: (obj, value) => { obj.articles = value; } }, metadata: _metadata }, _articles_initializers, _articles_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseCategory = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        slug = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
        color = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _color_initializers, void 0));
        icon = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        sortOrder = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
        isActive = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        // Self-referencing parent-child relationship
        parentId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        parent = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _parent_initializers, void 0));
        children = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _children_initializers, void 0));
        // Article count (denormalized for performance)
        articleCount = (__runInitializers(this, _children_extraInitializers), __runInitializers(this, _articleCount_initializers, void 0));
        // Audit fields
        createdBy = (__runInitializers(this, _articleCount_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
        updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
        createdByUser = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _createdByUser_initializers, void 0));
        updatedByUser = (__runInitializers(this, _createdByUser_extraInitializers), __runInitializers(this, _updatedByUser_initializers, void 0));
        // Relations
        articles = (__runInitializers(this, _updatedByUser_extraInitializers), __runInitializers(this, _articles_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _articles_extraInitializers);
        }
    };
    return KnowledgeBaseCategory = _classThis;
})();
exports.KnowledgeBaseCategory = KnowledgeBaseCategory;
//# sourceMappingURL=knowledge-base-category.entity.js.map