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
exports.FilterUsersDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let FilterUsersDto = (() => {
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _roleId_decorators;
    let _roleId_initializers = [];
    let _roleId_extraInitializers = [];
    let _roleName_decorators;
    let _roleName_initializers = [];
    let _roleName_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _emailVerified_decorators;
    let _emailVerified_initializers = [];
    let _emailVerified_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _sortBy_decorators;
    let _sortBy_initializers = [];
    let _sortBy_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    return class FilterUsersDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Search in name and email', example: 'john' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _roleId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by role ID (UUID)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _roleName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by role name', example: 'admin' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by active status', example: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => {
                    if (value === 'true')
                        return true;
                    if (value === 'false')
                        return false;
                    return value;
                })];
            _emailVerified_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by email verified status', example: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => {
                    if (value === 'true')
                        return true;
                    if (value === 'false')
                        return false;
                    return value;
                })];
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Page number', example: 1, default: 1 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10))];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Items per page', example: 10, default: 10 }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10))];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort by field', example: 'createdAt' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Sort order', enum: ['ASC', 'DESC'], example: 'DESC' }), (0, class_validator_1.IsEnum)(['ASC', 'DESC']), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _roleId_decorators, { kind: "field", name: "roleId", static: false, private: false, access: { has: obj => "roleId" in obj, get: obj => obj.roleId, set: (obj, value) => { obj.roleId = value; } }, metadata: _metadata }, _roleId_initializers, _roleId_extraInitializers);
            __esDecorate(null, null, _roleName_decorators, { kind: "field", name: "roleName", static: false, private: false, access: { has: obj => "roleName" in obj, get: obj => obj.roleName, set: (obj, value) => { obj.roleName = value; } }, metadata: _metadata }, _roleName_initializers, _roleName_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _emailVerified_decorators, { kind: "field", name: "emailVerified", static: false, private: false, access: { has: obj => "emailVerified" in obj, get: obj => obj.emailVerified, set: (obj, value) => { obj.emailVerified = value; } }, metadata: _metadata }, _emailVerified_initializers, _emailVerified_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: obj => "sortBy" in obj, get: obj => obj.sortBy, set: (obj, value) => { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        search = __runInitializers(this, _search_initializers, void 0);
        roleId = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _roleId_initializers, void 0));
        roleName = (__runInitializers(this, _roleId_extraInitializers), __runInitializers(this, _roleName_initializers, void 0));
        isActive = (__runInitializers(this, _roleName_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        emailVerified = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _emailVerified_initializers, void 0));
        page = (__runInitializers(this, _emailVerified_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        sortBy = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
        sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
        constructor() {
            __runInitializers(this, _sortOrder_extraInitializers);
        }
    };
})();
exports.FilterUsersDto = FilterUsersDto;
//# sourceMappingURL=filter-users.dto.js.map