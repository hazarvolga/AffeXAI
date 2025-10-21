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
exports.PageTemplate = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let PageTemplate = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('page_templates')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _designSystem_decorators;
    let _designSystem_initializers = [];
    let _designSystem_extraInitializers = [];
    let _blocks_decorators;
    let _blocks_initializers = [];
    let _blocks_extraInitializers = [];
    let _layoutOptions_decorators;
    let _layoutOptions_initializers = [];
    let _layoutOptions_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _preview_decorators;
    let _preview_initializers = [];
    let _preview_extraInitializers = [];
    let _constraints_decorators;
    let _constraints_initializers = [];
    let _constraints_extraInitializers = [];
    let _usageCount_decorators;
    let _usageCount_initializers = [];
    let _usageCount_extraInitializers = [];
    let _isFeatured_decorators;
    let _isFeatured_initializers = [];
    let _isFeatured_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _authorId_decorators;
    let _authorId_initializers = [];
    let _authorId_extraInitializers = [];
    let _author_decorators;
    let _author_initializers = [];
    let _author_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var PageTemplate = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _category_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100 })];
            _designSystem_decorators = [(0, typeorm_1.Column)({ type: 'jsonb' })];
            _blocks_decorators = [(0, typeorm_1.Column)({ type: 'jsonb' })];
            _layoutOptions_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _preview_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _constraints_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _usageCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _isFeatured_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
            _authorId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true })];
            _author_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'authorId' })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _designSystem_decorators, { kind: "field", name: "designSystem", static: false, private: false, access: { has: obj => "designSystem" in obj, get: obj => obj.designSystem, set: (obj, value) => { obj.designSystem = value; } }, metadata: _metadata }, _designSystem_initializers, _designSystem_extraInitializers);
            __esDecorate(null, null, _blocks_decorators, { kind: "field", name: "blocks", static: false, private: false, access: { has: obj => "blocks" in obj, get: obj => obj.blocks, set: (obj, value) => { obj.blocks = value; } }, metadata: _metadata }, _blocks_initializers, _blocks_extraInitializers);
            __esDecorate(null, null, _layoutOptions_decorators, { kind: "field", name: "layoutOptions", static: false, private: false, access: { has: obj => "layoutOptions" in obj, get: obj => obj.layoutOptions, set: (obj, value) => { obj.layoutOptions = value; } }, metadata: _metadata }, _layoutOptions_initializers, _layoutOptions_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _preview_decorators, { kind: "field", name: "preview", static: false, private: false, access: { has: obj => "preview" in obj, get: obj => obj.preview, set: (obj, value) => { obj.preview = value; } }, metadata: _metadata }, _preview_initializers, _preview_extraInitializers);
            __esDecorate(null, null, _constraints_decorators, { kind: "field", name: "constraints", static: false, private: false, access: { has: obj => "constraints" in obj, get: obj => obj.constraints, set: (obj, value) => { obj.constraints = value; } }, metadata: _metadata }, _constraints_initializers, _constraints_extraInitializers);
            __esDecorate(null, null, _usageCount_decorators, { kind: "field", name: "usageCount", static: false, private: false, access: { has: obj => "usageCount" in obj, get: obj => obj.usageCount, set: (obj, value) => { obj.usageCount = value; } }, metadata: _metadata }, _usageCount_initializers, _usageCount_extraInitializers);
            __esDecorate(null, null, _isFeatured_decorators, { kind: "field", name: "isFeatured", static: false, private: false, access: { has: obj => "isFeatured" in obj, get: obj => obj.isFeatured, set: (obj, value) => { obj.isFeatured = value; } }, metadata: _metadata }, _isFeatured_initializers, _isFeatured_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: obj => "authorId" in obj, get: obj => obj.authorId, set: (obj, value) => { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: obj => "author" in obj, get: obj => obj.author, set: (obj, value) => { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PageTemplate = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        category = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        designSystem = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _designSystem_initializers, void 0));
        blocks = (__runInitializers(this, _designSystem_extraInitializers), __runInitializers(this, _blocks_initializers, void 0));
        layoutOptions = (__runInitializers(this, _blocks_extraInitializers), __runInitializers(this, _layoutOptions_initializers, void 0));
        metadata = (__runInitializers(this, _layoutOptions_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        preview = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _preview_initializers, void 0));
        constraints = (__runInitializers(this, _preview_extraInitializers), __runInitializers(this, _constraints_initializers, void 0));
        usageCount = (__runInitializers(this, _constraints_extraInitializers), __runInitializers(this, _usageCount_initializers, void 0));
        isFeatured = (__runInitializers(this, _usageCount_extraInitializers), __runInitializers(this, _isFeatured_initializers, void 0));
        isActive = (__runInitializers(this, _isFeatured_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        authorId = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
        author = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _author_initializers, void 0));
        createdAt = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return PageTemplate = _classThis;
})();
exports.PageTemplate = PageTemplate;
//# sourceMappingURL=page-template.entity.js.map