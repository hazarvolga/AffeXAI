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
exports.Component = void 0;
const typeorm_1 = require("typeorm");
const page_entity_1 = require("./page.entity");
const shared_types_1 = require("@affexai/shared-types");
let Component = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('cms_components')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _props_decorators;
    let _props_initializers = [];
    let _props_extraInitializers = [];
    let _orderIndex_decorators;
    let _orderIndex_initializers = [];
    let _orderIndex_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    let _parent_decorators;
    let _parent_initializers = [];
    let _parent_extraInitializers = [];
    var Component = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _pageId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'page_id' })];
            _parentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'parent_id', nullable: true })];
            _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: shared_types_1.ComponentType })];
            _props_decorators = [(0, typeorm_1.Column)({ type: 'jsonb' })];
            _orderIndex_decorators = [(0, typeorm_1.Column)({ type: 'integer', name: 'order_index', default: 0 })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
            _page_decorators = [(0, typeorm_1.ManyToOne)(() => page_entity_1.Page, (page) => page.components, { onDelete: 'CASCADE' })];
            _children_decorators = [(0, typeorm_1.OneToMany)(() => Component, (component) => component.parent)];
            _parent_decorators = [(0, typeorm_1.ManyToOne)(() => Component, (component) => component.children, { onDelete: 'CASCADE' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _props_decorators, { kind: "field", name: "props", static: false, private: false, access: { has: obj => "props" in obj, get: obj => obj.props, set: (obj, value) => { obj.props = value; } }, metadata: _metadata }, _props_initializers, _props_extraInitializers);
            __esDecorate(null, null, _orderIndex_decorators, { kind: "field", name: "orderIndex", static: false, private: false, access: { has: obj => "orderIndex" in obj, get: obj => obj.orderIndex, set: (obj, value) => { obj.orderIndex = value; } }, metadata: _metadata }, _orderIndex_initializers, _orderIndex_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
            __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Component = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        pageId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        parentId = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        type = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        props = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _props_initializers, void 0));
        orderIndex = (__runInitializers(this, _props_extraInitializers), __runInitializers(this, _orderIndex_initializers, void 0));
        createdAt = (__runInitializers(this, _orderIndex_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        page = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        children = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _children_initializers, void 0));
        parent = (__runInitializers(this, _children_extraInitializers), __runInitializers(this, _parent_initializers, void 0));
        constructor() {
            __runInitializers(this, _parent_extraInitializers);
        }
    };
    return Component = _classThis;
})();
exports.Component = Component;
//# sourceMappingURL=component.entity.js.map