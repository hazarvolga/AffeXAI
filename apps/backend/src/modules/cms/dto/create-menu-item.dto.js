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
exports.CreateCmsMenuItemDto = void 0;
const class_validator_1 = require("class-validator");
const shared_types_1 = require("@affexai/shared-types");
let CreateCmsMenuItemDto = (() => {
    let _menuId_decorators;
    let _menuId_initializers = [];
    let _menuId_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
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
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
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
    return class CreateCmsMenuItemDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _menuId_decorators = [(0, class_validator_1.IsUUID)()];
            _parentId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _type_decorators = [(0, class_validator_1.IsEnum)(shared_types_1.MenuItemType)];
            _label_decorators = [(0, class_validator_1.IsString)()];
            _url_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pageId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _categoryId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _target_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _icon_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _cssClass_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _orderIndex_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _isActive_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _menuId_decorators, { kind: "field", name: "menuId", static: false, private: false, access: { has: obj => "menuId" in obj, get: obj => obj.menuId, set: (obj, value) => { obj.menuId = value; } }, metadata: _metadata }, _menuId_initializers, _menuId_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _pageId_decorators, { kind: "field", name: "pageId", static: false, private: false, access: { has: obj => "pageId" in obj, get: obj => obj.pageId, set: (obj, value) => { obj.pageId = value; } }, metadata: _metadata }, _pageId_initializers, _pageId_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
            __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(null, null, _cssClass_decorators, { kind: "field", name: "cssClass", static: false, private: false, access: { has: obj => "cssClass" in obj, get: obj => obj.cssClass, set: (obj, value) => { obj.cssClass = value; } }, metadata: _metadata }, _cssClass_initializers, _cssClass_extraInitializers);
            __esDecorate(null, null, _orderIndex_decorators, { kind: "field", name: "orderIndex", static: false, private: false, access: { has: obj => "orderIndex" in obj, get: obj => obj.orderIndex, set: (obj, value) => { obj.orderIndex = value; } }, metadata: _metadata }, _orderIndex_initializers, _orderIndex_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        menuId = __runInitializers(this, _menuId_initializers, void 0);
        parentId = (__runInitializers(this, _menuId_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        type = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        label = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _label_initializers, void 0));
        url = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        pageId = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _pageId_initializers, void 0));
        categoryId = (__runInitializers(this, _pageId_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        target = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _target_initializers, void 0));
        icon = (__runInitializers(this, _target_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        cssClass = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _cssClass_initializers, void 0));
        orderIndex = (__runInitializers(this, _cssClass_extraInitializers), __runInitializers(this, _orderIndex_initializers, void 0));
        isActive = (__runInitializers(this, _orderIndex_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        constructor() {
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
exports.CreateCmsMenuItemDto = CreateCmsMenuItemDto;
//# sourceMappingURL=create-menu-item.dto.js.map