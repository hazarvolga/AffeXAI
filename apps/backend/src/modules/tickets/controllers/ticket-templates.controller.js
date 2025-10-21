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
exports.TicketTemplatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Ticket Templates Controller
 * RESTful API endpoints for ticket template management
 */
let TicketTemplatesController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Templates'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('tickets/templates'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAll_decorators;
    let _getPopular_decorators;
    let _search_decorators;
    let _getMyTemplates_decorators;
    let _findOne_decorators;
    let _findByCategory_decorators;
    let _create_decorators;
    let _update_decorators;
    let _toggle_decorators;
    let _incrementUsage_decorators;
    let _delete_decorators;
    var TicketTemplatesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all active ticket templates' }), (0, swagger_1.ApiQuery)({ name: 'isPublic', required: false, type: Boolean }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Templates retrieved successfully' })];
            _getPopular_decorators = [(0, common_1.Get)('popular'), (0, swagger_1.ApiOperation)({ summary: 'Get popular templates' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular templates retrieved successfully' })];
            _search_decorators = [(0, common_1.Get)('search'), (0, swagger_1.ApiOperation)({ summary: 'Search templates by name or content' }), (0, swagger_1.ApiQuery)({ name: 'q', required: true, type: String }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' })];
            _getMyTemplates_decorators = [(0, common_1.Get)('my-templates'), (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s private templates' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User templates retrieved successfully' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get template details by ID' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Template UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' })];
            _findByCategory_decorators = [(0, common_1.Get)('category/:categoryId'), (0, swagger_1.ApiOperation)({ summary: 'Get templates by category' }), (0, swagger_1.ApiParam)({ name: 'categoryId', description: 'Category UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Templates retrieved successfully' })];
            _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Create a new ticket template' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Template created successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Update a ticket template' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Template UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _toggle_decorators = [(0, common_1.Patch)(':id/toggle'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Toggle template active status' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Template UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Template toggled successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _incrementUsage_decorators = [(0, common_1.Post)(':id/use'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Increment template usage count' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Template UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Usage count incremented successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' })];
            _delete_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Delete a ticket template' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Template UUID' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Template deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPopular_decorators, { kind: "method", name: "getPopular", static: false, private: false, access: { has: obj => "getPopular" in obj, get: obj => obj.getPopular }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMyTemplates_decorators, { kind: "method", name: "getMyTemplates", static: false, private: false, access: { has: obj => "getMyTemplates" in obj, get: obj => obj.getMyTemplates }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findByCategory_decorators, { kind: "method", name: "findByCategory", static: false, private: false, access: { has: obj => "findByCategory" in obj, get: obj => obj.findByCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _toggle_decorators, { kind: "method", name: "toggle", static: false, private: false, access: { has: obj => "toggle" in obj, get: obj => obj.toggle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _incrementUsage_decorators, { kind: "method", name: "incrementUsage", static: false, private: false, access: { has: obj => "incrementUsage" in obj, get: obj => obj.incrementUsage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketTemplatesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        templatesService = __runInitializers(this, _instanceExtraInitializers);
        constructor(templatesService) {
            this.templatesService = templatesService;
        }
        /**
         * Get all active templates
         */
        async findAll(isPublic) {
            const isPublicBool = isPublic === 'true' ? true : isPublic === 'false' ? false : undefined;
            return this.templatesService.findAll(isPublicBool);
        }
        /**
         * Get popular templates
         */
        async getPopular(limit) {
            return this.templatesService.getPopular(limit || 10);
        }
        /**
         * Search templates
         */
        async search(query) {
            return this.templatesService.search(query);
        }
        /**
         * Get user's private templates
         */
        async getMyTemplates(userId) {
            return this.templatesService.findByUser(userId);
        }
        /**
         * Get template by ID
         */
        async findOne(id) {
            return this.templatesService.findOne(id);
        }
        /**
         * Get templates by category
         */
        async findByCategory(categoryId) {
            return this.templatesService.findByCategory(categoryId);
        }
        /**
         * Create new template
         */
        async create(createTemplateDto, userId) {
            return this.templatesService.create({
                ...createTemplateDto,
                createdById: userId,
            });
        }
        /**
         * Update template
         */
        async update(id, updateTemplateDto) {
            return this.templatesService.update(id, updateTemplateDto);
        }
        /**
         * Toggle template active status
         */
        async toggle(id) {
            return this.templatesService.toggle(id);
        }
        /**
         * Increment template usage
         */
        async incrementUsage(id) {
            await this.templatesService.incrementUsage(id);
            return { success: true };
        }
        /**
         * Delete template
         */
        async delete(id) {
            await this.templatesService.delete(id);
        }
    };
    return TicketTemplatesController = _classThis;
})();
exports.TicketTemplatesController = TicketTemplatesController;
//# sourceMappingURL=ticket-templates.controller.js.map