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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
let RolesController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('roles'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('roles'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _getPermissions_decorators;
    let _updatePermissions_decorators;
    let _getUserCount_decorators;
    var RolesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a new role' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Role created successfully' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Role name already exists' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin only' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get all roles' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all roles with user counts' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get role by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns role details' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update role' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Role updated successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot modify system roles' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Delete role' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Role deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete system role or role with users' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            _getPermissions_decorators = [(0, common_1.Get)(':id/permissions'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get role permissions' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns array of permission IDs' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            _updatePermissions_decorators = [(0, common_1.Patch)(':id/permissions'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update role permissions' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Permissions updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            _getUserCount_decorators = [(0, common_1.Get)(':id/user-count'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get number of users with this role' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns user count' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPermissions_decorators, { kind: "method", name: "getPermissions", static: false, private: false, access: { has: obj => "getPermissions" in obj, get: obj => obj.getPermissions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePermissions_decorators, { kind: "method", name: "updatePermissions", static: false, private: false, access: { has: obj => "updatePermissions" in obj, get: obj => obj.updatePermissions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUserCount_decorators, { kind: "method", name: "getUserCount", static: false, private: false, access: { has: obj => "getUserCount" in obj, get: obj => obj.getUserCount }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RolesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        rolesService = __runInitializers(this, _instanceExtraInitializers);
        constructor(rolesService) {
            this.rolesService = rolesService;
        }
        /**
         * Create a new role
         * Only Admin can create roles
         */
        create(createRoleDto) {
            return this.rolesService.create(createRoleDto);
        }
        /**
         * Get all roles
         * Admin and Viewers can see all roles
         */
        findAll() {
            return this.rolesService.findAll();
        }
        /**
         * Get role by ID
         * Admin and Viewers can view role details
         */
        findOne(id) {
            return this.rolesService.findOne(id);
        }
        /**
         * Update role
         * Only Admin can update roles
         */
        update(id, updateRoleDto) {
            return this.rolesService.update(id, updateRoleDto);
        }
        /**
         * Delete role
         * Only Admin can delete roles
         */
        async remove(id) {
            await this.rolesService.remove(id);
        }
        /**
         * Get role permissions
         * Admin and Viewers can view permissions
         */
        getPermissions(id) {
            return this.rolesService.getPermissions(id);
        }
        /**
         * Update role permissions
         * Only Admin can update permissions
         */
        updatePermissions(id, permissions) {
            return this.rolesService.updatePermissions(id, permissions);
        }
        /**
         * Get user count for role
         */
        async getUserCount(id) {
            const count = await this.rolesService.getUserCount(id);
            return { count };
        }
    };
    return RolesController = _classThis;
})();
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map