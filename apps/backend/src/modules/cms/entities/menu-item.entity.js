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
exports.MenuItem = void 0;
const typeorm_1 = require("typeorm");
const menu_entity_1 = require("./menu.entity");
const page_entity_1 = require("./page.entity");
const category_entity_1 = require("./category.entity");
const shared_types_1 = require("@affexai/shared-types");
let MenuItem = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('cms_menu_items')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _menuId_decorators;
    let _menuId_initializers = [];
    let _menuId_extraInitializers = [];
    let _menu_decorators;
    let _menu_initializers = [];
    let _menu_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _parent_decorators;
    let _parent_initializers = [];
    let _parent_extraInitializers = [];
    let _children_decorators;
    let _children_initializers = [];
    let _children_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _pageId_decorators;
    let _pageId_initializers = [];
    let _pageId_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _target_decorators;
    let _target_initializers = [];
    let _target_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _cssClass_decorators;
    let _cssClass_initializers = [];
    let _cssClass_extraInitializers = [];
    let _orderIndex_decorators;
    let _orderIndex_initializers = [];
    let _orderIndex_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var MenuItem = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _menuId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'menu_id' })];
            _menu_decorators = [(0, typeorm_1.ManyToOne)(() => menu_entity_1.Menu, (menu) => menu.items, {
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'menu_id' })];
            _parentId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'parent_id' })];
            _parent_decorators = [(0, typeorm_1.ManyToOne)(() => MenuItem, (menuItem) => menuItem.children, {
                    nullable: true,
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'parent_id' })];
            _children_decorators = [(0, typeorm_1.OneToMany)(() => MenuItem, (menuItem) => menuItem.parent)];
            _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: shared_types_1.MenuItemType })];
            _label_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _url_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true })];
            _pageId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'page_id' })];
            _page_decorators = [(0, typeorm_1.ManyToOne)(() => page_entity_1.Page, {
                    nullable: true,
                    onDelete: 'SET NULL',
                }), (0, typeorm_1.JoinColumn)({ name: 'page_id' })];
            _categoryId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'category_id' })];
            _category_decorators = [(0, typeorm_1.ManyToOne)(() => category_entity_1.Category, {
                    nullable: true,
                    onDelete: 'SET NULL',
                }), (0, typeorm_1.JoinColumn)({ name: 'category_id' })];
            _target_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })];
            _icon_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true })];
            _cssClass_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, name: 'css_class' })];
            _orderIndex_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, name: 'order_index' })];
            _isActive_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _menuId_decorators, { kind: "field", name: "menuId", static: false, private: false, access: { has: obj => "menuId" in obj, get: obj => obj.menuId, set: (obj, value) => { obj.menuId = value; } }, metadata: _metadata }, _menuId_initializers, _menuId_extraInitializers);
            __esDecorate(null, null, _menu_decorators, { kind: "field", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, get: obj => obj.parent, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
            __esDecorate(null, null, _children_decorators, { kind: "field", name: "children", static: false, private: false, access: { has: obj => "children" in obj, get: obj => obj.children, set: (obj, value) => { obj.children = value; } }, metadata: _metadata }, _children_initializers, _children_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
            __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(null, null, _cssClass_decorators, { kind: "field", name: "cssClass", static: false, private: false, access: { has: obj => "cssClass" in obj, get: obj => obj.cssClass, set: (obj, value) => { obj.cssClass = value; } }, metadata: _metadata }, _cssClass_initializers, _cssClass_extraInitializers);
            __esDecorate(null, null, _orderIndex_decorators, { kind: "field", name: "orderIndex", static: false, private: false, access: { has: obj => "orderIndex" in obj, get: obj => obj.orderIndex, set: (obj, value) => { obj.orderIndex = value; } }, metadata: _metadata }, _orderIndex_initializers, _orderIndex_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MenuItem = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        menuId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _menuId_initializers, void 0));
        menu = (__runInitializers(this, _menuId_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
        parentId = (__runInitializers(this, _menu_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        parent = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _parent_initializers, void 0));
        children = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _children_initializers, void 0));
        type = (__runInitializers(this, _children_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        label = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _label_initializers, void 0));
        url = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        pageId = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        page = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        categoryId = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        category = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
        target = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _target_initializers, void 0));
        icon = (__runInitializers(this, _target_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        cssClass = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _cssClass_initializers, void 0));
        orderIndex = (__runInitializers(this, _cssClass_extraInitializers), __runInitializers(this, _orderIndex_initializers, void 0));
        isActive = (__runInitializers(this, _orderIndex_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        createdAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return MenuItem = _classThis;
})();
exports.MenuItem = MenuItem;
//# sourceMappingURL=menu-item.entity.js.map