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
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
let TemplateController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('CMS Templates'), (0, common_1.Controller)('cms/templates')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _getStats_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _incrementUsage_decorators;
    let _import_decorators;
    let _export_decorators;
    let _duplicate_decorators;
    var TemplateController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new page template' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Template created successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid template data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all templates' }), (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' }), (0, swagger_1.ApiQuery)({ name: 'isFeatured', required: false, type: Boolean, description: 'Filter featured templates' }), (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean, description: 'Filter active templates' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Templates retrieved successfully' })];
            _getStats_decorators = [(0, common_1.Get)('stats'), (0, swagger_1.ApiOperation)({ summary: 'Get template statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get a template by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' })];
            _update_decorators = [(0, common_1.Put)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Update a template' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _remove_decorators = [(0, common_1.Delete)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiBearerAuth)(), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Delete a template (soft delete)' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Template deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _incrementUsage_decorators = [(0, common_1.Post)(':id/use'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Increment template usage count' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Usage count incremented' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' })];
            _import_decorators = [(0, common_1.Post)('import'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Import a template from JSON' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Template imported successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid template data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _export_decorators = [(0, common_1.Get)(':id/export'), (0, swagger_1.ApiOperation)({ summary: 'Export a template as JSON' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template exported successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' })];
            _duplicate_decorators = [(0, common_1.Post)(':id/duplicate'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Duplicate a template' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Template duplicated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _incrementUsage_decorators, { kind: "method", name: "incrementUsage", static: false, private: false, access: { has: obj => "incrementUsage" in obj, get: obj => obj.incrementUsage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _import_decorators, { kind: "method", name: "import", static: false, private: false, access: { has: obj => "import" in obj, get: obj => obj.import }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _export_decorators, { kind: "method", name: "export", static: false, private: false, access: { has: obj => "export" in obj, get: obj => obj.export }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _duplicate_decorators, { kind: "method", name: "duplicate", static: false, private: false, access: { has: obj => "duplicate" in obj, get: obj => obj.duplicate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TemplateController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        templateService = __runInitializers(this, _instanceExtraInitializers);
        constructor(templateService) {
            this.templateService = templateService;
        }
        /**
         * Create a new template
         */
        async create(createTemplateDto) {
            return await this.templateService.create(createTemplateDto);
        }
        /**
         * Get all templates
         */
        async findAll(category, isFeatured, isActive) {
            const options = {};
            if (category)
                options.category = category;
            if (isFeatured !== undefined)
                options.isFeatured = isFeatured === 'true';
            if (isActive !== undefined)
                options.isActive = isActive === 'true';
            return await this.templateService.findAll(options);
        }
        /**
         * Get template statistics
         */
        async getStats() {
            return await this.templateService.getStats();
        }
        /**
         * Get a single template
         */
        async findOne(id) {
            return await this.templateService.findOne(id);
        }
        /**
         * Update a template
         */
        async update(id, updateTemplateDto) {
            return await this.templateService.update(id, updateTemplateDto);
        }
        /**
         * Delete a template (soft delete)
         */
        async remove(id) {
            await this.templateService.remove(id);
        }
        /**
         * Increment template usage count
         */
        async incrementUsage(id) {
            await this.templateService.incrementUsage(id);
            return { message: 'Usage count incremented' };
        }
        /**
         * Import template from JSON
         */
        async import(importTemplateDto) {
            return await this.templateService.import(importTemplateDto);
        }
        /**
         * Export template as JSON
         */
        async export(id) {
            return await this.templateService.export(id);
        }
        /**
         * Duplicate a template
         */
        async duplicate(id, newName) {
            return await this.templateService.duplicate(id, newName);
        }
    };
    return TemplateController = _classThis;
})();
exports.TemplateController = TemplateController;
//# sourceMappingURL=template.controller.js.map