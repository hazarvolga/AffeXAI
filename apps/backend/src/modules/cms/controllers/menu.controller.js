"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
let MenuController = (() => {
    let _classDecorators = [(0, common_1.Controller)('cms/menus')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createMenu_decorators;
    let _findAllMenus_decorators;
    let _findOneMenu_decorators;
    let _findMenuBySlug_decorators;
    let _updateMenu_decorators;
    let _removeMenu_decorators;
    let _createMenuItem_decorators;
    let _findMenuItems_decorators;
    let _getMenuItemTree_decorators;
    let _findOneMenuItem_decorators;
    let _updateMenuItem_decorators;
    let _removeMenuItem_decorators;
    let _reorderMenuItems_decorators;
    var MenuController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createMenu_decorators = [(0, common_1.Post)()];
            _findAllMenus_decorators = [(0, common_1.Get)()];
            _findOneMenu_decorators = [(0, common_1.Get)(':id')];
            _findMenuBySlug_decorators = [(0, common_1.Get)('slug/:slug')];
            _updateMenu_decorators = [(0, common_1.Patch)(':id')];
            _removeMenu_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            _createMenuItem_decorators = [(0, common_1.Post)('items')];
            _findMenuItems_decorators = [(0, common_1.Get)(':menuId/items')];
            _getMenuItemTree_decorators = [(0, common_1.Get)(':menuId/items/tree')];
            _findOneMenuItem_decorators = [(0, common_1.Get)('items/:id')];
            _updateMenuItem_decorators = [(0, common_1.Patch)('items/:id')];
            _removeMenuItem_decorators = [(0, common_1.Delete)('items/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            _reorderMenuItems_decorators = [(0, common_1.Post)('items/reorder'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            __esDecorate(this, null, _createMenu_decorators, { kind: "method", name: "createMenu", static: false, private: false, access: { has: obj => "createMenu" in obj, get: obj => obj.createMenu }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAllMenus_decorators, { kind: "method", name: "findAllMenus", static: false, private: false, access: { has: obj => "findAllMenus" in obj, get: obj => obj.findAllMenus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOneMenu_decorators, { kind: "method", name: "findOneMenu", static: false, private: false, access: { has: obj => "findOneMenu" in obj, get: obj => obj.findOneMenu }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findMenuBySlug_decorators, { kind: "method", name: "findMenuBySlug", static: false, private: false, access: { has: obj => "findMenuBySlug" in obj, get: obj => obj.findMenuBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateMenu_decorators, { kind: "method", name: "updateMenu", static: false, private: false, access: { has: obj => "updateMenu" in obj, get: obj => obj.updateMenu }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeMenu_decorators, { kind: "method", name: "removeMenu", static: false, private: false, access: { has: obj => "removeMenu" in obj, get: obj => obj.removeMenu }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createMenuItem_decorators, { kind: "method", name: "createMenuItem", static: false, private: false, access: { has: obj => "createMenuItem" in obj, get: obj => obj.createMenuItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findMenuItems_decorators, { kind: "method", name: "findMenuItems", static: false, private: false, access: { has: obj => "findMenuItems" in obj, get: obj => obj.findMenuItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMenuItemTree_decorators, { kind: "method", name: "getMenuItemTree", static: false, private: false, access: { has: obj => "getMenuItemTree" in obj, get: obj => obj.getMenuItemTree }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOneMenuItem_decorators, { kind: "method", name: "findOneMenuItem", static: false, private: false, access: { has: obj => "findOneMenuItem" in obj, get: obj => obj.findOneMenuItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateMenuItem_decorators, { kind: "method", name: "updateMenuItem", static: false, private: false, access: { has: obj => "updateMenuItem" in obj, get: obj => obj.updateMenuItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeMenuItem_decorators, { kind: "method", name: "removeMenuItem", static: false, private: false, access: { has: obj => "removeMenuItem" in obj, get: obj => obj.removeMenuItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reorderMenuItems_decorators, { kind: "method", name: "reorderMenuItems", static: false, private: false, access: { has: obj => "reorderMenuItems" in obj, get: obj => obj.reorderMenuItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MenuController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        menuService = __runInitializers(this, _instanceExtraInitializers);
        constructor(menuService) {
            this.menuService = menuService;
        }
        // ==========================================================================
        // Menu Endpoints
        // ==========================================================================
        async createMenu(createDto) {
            return this.menuService.createMenu(createDto);
        }
        async findAllMenus(location, isActive, search) {
            const params = {};
            if (location) {
                params.location = location;
            }
            if (isActive !== undefined) {
                params.isActive = isActive === 'true';
            }
            if (search) {
                params.search = search;
            }
            return this.menuService.findAllMenus(params);
        }
        async findOneMenu(id) {
            return this.menuService.findOneMenu(id);
        }
        async findMenuBySlug(slug) {
            return this.menuService.findMenuBySlug(slug);
        }
        async updateMenu(id, updateDto) {
            return this.menuService.updateMenu(id, updateDto);
        }
        async removeMenu(id) {
            await this.menuService.removeMenu(id);
        }
        // ==========================================================================
        // Menu Item Endpoints
        // ==========================================================================
        async createMenuItem(createDto) {
            return this.menuService.createMenuItem(createDto);
        }
        async findMenuItems(menuId) {
            return this.menuService.findMenuItems(menuId);
        }
        async getMenuItemTree(menuId) {
            return this.menuService.getMenuItemTree(menuId);
        }
        async findOneMenuItem(id) {
            return this.menuService.findOneMenuItem(id);
        }
        async updateMenuItem(id, updateDto) {
            return this.menuService.updateMenuItem(id, updateDto);
        }
        async removeMenuItem(id) {
            await this.menuService.removeMenuItem(id);
        }
        async reorderMenuItems(dto) {
            await this.menuService.reorderMenuItems(dto);
            return { message: 'Menu items reordered successfully' };
        }
    };
    return MenuController = _classThis;
})();
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map