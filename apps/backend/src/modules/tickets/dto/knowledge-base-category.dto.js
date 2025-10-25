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
exports.BulkDeleteDto = exports.BulkUpdateStatusDto = exports.MoveCategoryDto = exports.ReorderCategoriesDto = exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let CreateCategoryDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    return class CreateCategoryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Category name', example: 'Getting Started' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(255)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category description', example: 'Basic information and setup guides' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            _color_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category color',
                    example: 'blue',
                    enum: ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray'])];
            _icon_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category icon',
                    example: 'folder',
                    enum: ['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help'])];
            _parentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Parent category ID', example: 'uuid' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', example: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        color = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _color_initializers, void 0));
        icon = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        parentId = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        sortOrder = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
        constructor() {
            __runInitializers(this, _sortOrder_extraInitializers);
        }
    };
})();
exports.CreateCategoryDto = CreateCategoryDto;
let UpdateCategoryDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    let _parentId_decorators;
    let _parentId_initializers = [];
    let _parentId_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    return class UpdateCategoryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category name', example: 'Getting Started' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(255)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category description', example: 'Basic information and setup guides' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            _color_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category color',
                    example: 'blue',
                    enum: ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray'])];
            _icon_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category icon',
                    example: 'folder',
                    enum: ['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help']
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help'])];
            _parentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Parent category ID', example: 'uuid' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', example: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category active status', example: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
            __esDecorate(null, null, _parentId_decorators, { kind: "field", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId, set: (obj, value) => { obj.parentId = value; } }, metadata: _metadata }, _parentId_initializers, _parentId_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        color = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _color_initializers, void 0));
        icon = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
        parentId = (__runInitializers(this, _icon_extraInitializers), __runInitializers(this, _parentId_initializers, void 0));
        sortOrder = (__runInitializers(this, _parentId_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
        isActive = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        constructor() {
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
exports.UpdateCategoryDto = UpdateCategoryDto;
let ReorderCategoriesDto = (() => {
    let _categoryIds_decorators;
    let _categoryIds_initializers = [];
    let _categoryIds_extraInitializers = [];
    return class ReorderCategoriesDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _categoryIds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Array of category IDs in new order', example: ['uuid1', 'uuid2', 'uuid3'] }), (0, class_validator_1.IsUUID)(4, { each: true })];
            __esDecorate(null, null, _categoryIds_decorators, { kind: "field", name: "categoryIds", static: false, private: false, access: { has: obj => "categoryIds" in obj, get: obj => obj.categoryIds, set: (obj, value) => { obj.categoryIds = value; } }, metadata: _metadata }, _categoryIds_initializers, _categoryIds_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        categoryIds = __runInitializers(this, _categoryIds_initializers, void 0);
        constructor() {
            __runInitializers(this, _categoryIds_extraInitializers);
        }
    };
})();
exports.ReorderCategoriesDto = ReorderCategoriesDto;
let MoveCategoryDto = (() => {
    let _newParentId_decorators;
    let _newParentId_initializers = [];
    let _newParentId_extraInitializers = [];
    return class MoveCategoryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _newParentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'New parent category ID (null for root level)', example: 'uuid' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _newParentId_decorators, { kind: "field", name: "newParentId", static: false, private: false, access: { has: obj => "newParentId" in obj, get: obj => obj.newParentId, set: (obj, value) => { obj.newParentId = value; } }, metadata: _metadata }, _newParentId_initializers, _newParentId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        newParentId = __runInitializers(this, _newParentId_initializers, void 0);
        constructor() {
            __runInitializers(this, _newParentId_extraInitializers);
        }
    };
})();
exports.MoveCategoryDto = MoveCategoryDto;
let BulkUpdateStatusDto = (() => {
    let _categoryIds_decorators;
    let _categoryIds_initializers = [];
    let _categoryIds_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    return class BulkUpdateStatusDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _categoryIds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Array of category IDs to update', example: ['uuid1', 'uuid2'] }), (0, class_validator_1.IsUUID)(4, { each: true })];
            _isActive_decorators = [(0, swagger_1.ApiProperty)({ description: 'New active status', example: true }), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _categoryIds_decorators, { kind: "field", name: "categoryIds", static: false, private: false, access: { has: obj => "categoryIds" in obj, get: obj => obj.categoryIds, set: (obj, value) => { obj.categoryIds = value; } }, metadata: _metadata }, _categoryIds_initializers, _categoryIds_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        categoryIds = __runInitializers(this, _categoryIds_initializers, void 0);
        isActive = (__runInitializers(this, _categoryIds_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        constructor() {
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
exports.BulkUpdateStatusDto = BulkUpdateStatusDto;
let BulkDeleteDto = (() => {
    let _categoryIds_decorators;
    let _categoryIds_initializers = [];
    let _categoryIds_extraInitializers = [];
    return class BulkDeleteDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _categoryIds_decorators = [(0, swagger_1.ApiProperty)({ description: 'Array of category IDs to delete', example: ['uuid1', 'uuid2'] }), (0, class_validator_1.IsUUID)(4, { each: true })];
            __esDecorate(null, null, _categoryIds_decorators, { kind: "field", name: "categoryIds", static: false, private: false, access: { has: obj => "categoryIds" in obj, get: obj => obj.categoryIds, set: (obj, value) => { obj.categoryIds = value; } }, metadata: _metadata }, _categoryIds_initializers, _categoryIds_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        categoryIds = __runInitializers(this, _categoryIds_initializers, void 0);
        constructor() {
            __runInitializers(this, _categoryIds_extraInitializers);
        }
    };
})();
exports.BulkDeleteDto = BulkDeleteDto;
//# sourceMappingURL=knowledge-base-category.dto.js.map