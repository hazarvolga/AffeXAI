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
exports.Page = void 0;
const typeorm_1 = require("typeorm");
const component_entity_1 = require("./component.entity");
const category_entity_1 = require("./category.entity");
const shared_types_1 = require("@affexai/shared-types");
let Page = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('cms_pages')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _slug_decorators;
    let _slug_initializers = [];
    let _slug_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _publishedAt_decorators;
    let _publishedAt_initializers = [];
    let _publishedAt_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    let _updatedBy_decorators;
    let _updatedBy_initializers = [];
    let _updatedBy_extraInitializers = [];
    let _layoutOptions_decorators;
    let _layoutOptions_initializers = [];
    let _layoutOptions_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _components_decorators;
    let _components_initializers = [];
    let _components_extraInitializers = [];
    var Page = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _title_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _slug_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: shared_types_1.PageStatus, default: shared_types_1.PageStatus.DRAFT })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
            _publishedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'published_at' })];
            _createdBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'created_by', nullable: true })];
            _updatedBy_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'updated_by', nullable: true })];
            _layoutOptions_decorators = [(0, typeorm_1.Column)({ type: 'json', name: 'layout_options', nullable: true })];
            _categoryId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'category_id' })];
            _category_decorators = [(0, typeorm_1.ManyToOne)(() => category_entity_1.Category, {
                    nullable: true,
                    onDelete: 'SET NULL',
                }), (0, typeorm_1.JoinColumn)({ name: 'category_id' })];
            _components_decorators = [(0, typeorm_1.OneToMany)(() => component_entity_1.Component, (component) => component.page)];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: obj => "slug" in obj, get: obj => obj.slug, set: (obj, value) => { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _publishedAt_decorators, { kind: "field", name: "publishedAt", static: false, private: false, access: { has: obj => "publishedAt" in obj, get: obj => obj.publishedAt, set: (obj, value) => { obj.publishedAt = value; } }, metadata: _metadata }, _publishedAt_initializers, _publishedAt_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: obj => "updatedBy" in obj, get: obj => obj.updatedBy, set: (obj, value) => { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
            __esDecorate(null, null, _layoutOptions_decorators, { kind: "field", name: "layoutOptions", static: false, private: false, access: { has: obj => "layoutOptions" in obj, get: obj => obj.layoutOptions, set: (obj, value) => { obj.layoutOptions = value; } }, metadata: _metadata }, _layoutOptions_initializers, _layoutOptions_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _components_decorators, { kind: "field", name: "components", static: false, private: false, access: { has: obj => "components" in obj, get: obj => obj.components, set: (obj, value) => { obj.components = value; } }, metadata: _metadata }, _components_initializers, _components_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Page = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        slug = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
        description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        publishedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _publishedAt_initializers, void 0));
        createdBy = (__runInitializers(this, _publishedAt_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
        updatedBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
        layoutOptions = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _layoutOptions_initializers, void 0));
        categoryId = (__runInitializers(this, _layoutOptions_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        category = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        components = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _components_initializers, void 0));
        constructor() {
            __runInitializers(this, _components_extraInitializers);
        }
    };
    return Page = _classThis;
})();
exports.Page = Page;
//# sourceMappingURL=page.entity.js.map