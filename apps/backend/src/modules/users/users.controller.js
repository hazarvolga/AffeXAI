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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("./enums/user-role.enum");
let UsersController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('users'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('users'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _getStats_decorators;
    let _getCurrentUser_decorators;
    let _findOne_decorators;
    let _completeProfile_decorators;
    let _update_decorators;
    let _changeRole_decorators;
    let _toggleActive_decorators;
    let _remove_decorators;
    let _hardDelete_decorators;
    let _restore_decorators;
    let _assignRoles_decorators;
    let _getUserRoles_decorators;
    let _removeRole_decorators;
    var UsersController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already in use' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get all users with filters and pagination' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' })];
            _getStats_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get user statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' })];
            _getCurrentUser_decorators = [(0, common_1.Get)('me'), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile (self-service)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Current user retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get a single user by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _completeProfile_decorators = [(0, common_1.Patch)('complete-profile'), (0, swagger_1.ApiOperation)({ summary: 'Complete user profile after registration (self-service)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile completed successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Update a user (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already in use' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - admin only' })];
            _changeRole_decorators = [(0, common_1.Patch)(':id/role'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Change user role' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User role changed successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _toggleActive_decorators = [(0, common_1.Patch)(':id/toggle-active'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Toggle user active status' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User status toggled successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _remove_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Soft delete a user (can be restored)' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'User soft deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _hardDelete_decorators = [(0, common_1.Delete)(':id/permanent'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Permanently delete a user (CANNOT be restored)' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'User permanently deleted' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' })];
            _restore_decorators = [(0, common_1.Post)(':id/restore'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Restore a soft-deleted user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User restored successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'User is not deleted' })];
            _assignRoles_decorators = [(0, common_1.Post)(':id/roles'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Assign multiple roles to a user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Roles assigned successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User or role not found' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid role assignment' })];
            _getUserRoles_decorators = [(0, common_1.Get)(':id/roles'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VIEWER), (0, swagger_1.ApiOperation)({ summary: 'Get all roles for a user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User roles retrieved successfully' })];
            _removeRole_decorators = [(0, common_1.Delete)(':id/roles/:roleId'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Remove a specific role from a user' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Role removed successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot remove primary role' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCurrentUser_decorators, { kind: "method", name: "getCurrentUser", static: false, private: false, access: { has: obj => "getCurrentUser" in obj, get: obj => obj.getCurrentUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _completeProfile_decorators, { kind: "method", name: "completeProfile", static: false, private: false, access: { has: obj => "completeProfile" in obj, get: obj => obj.completeProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _changeRole_decorators, { kind: "method", name: "changeRole", static: false, private: false, access: { has: obj => "changeRole" in obj, get: obj => obj.changeRole }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _toggleActive_decorators, { kind: "method", name: "toggleActive", static: false, private: false, access: { has: obj => "toggleActive" in obj, get: obj => obj.toggleActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _hardDelete_decorators, { kind: "method", name: "hardDelete", static: false, private: false, access: { has: obj => "hardDelete" in obj, get: obj => obj.hardDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _restore_decorators, { kind: "method", name: "restore", static: false, private: false, access: { has: obj => "restore" in obj, get: obj => obj.restore }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _assignRoles_decorators, { kind: "method", name: "assignRoles", static: false, private: false, access: { has: obj => "assignRoles" in obj, get: obj => obj.assignRoles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUserRoles_decorators, { kind: "method", name: "getUserRoles", static: false, private: false, access: { has: obj => "getUserRoles" in obj, get: obj => obj.getUserRoles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeRole_decorators, { kind: "method", name: "removeRole", static: false, private: false, access: { has: obj => "removeRole" in obj, get: obj => obj.removeRole }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService = __runInitializers(this, _instanceExtraInitializers);
        userRolesService;
        constructor(usersService, userRolesService) {
            this.usersService = usersService;
            this.userRolesService = userRolesService;
        }
        create(createUserDto) {
            return this.usersService.create(createUserDto);
        }
        findAll(filterDto) {
            return this.usersService.findAll(filterDto);
        }
        getStats() {
            return this.usersService.getStats();
        }
        getCurrentUser(userId) {
            return this.usersService.findOne(userId);
        }
        findOne(id) {
            return this.usersService.findOne(id);
        }
        completeProfile(userId, completeProfileDto) {
            return this.usersService.completeProfile(userId, completeProfileDto);
        }
        update(id, updateUserDto) {
            return this.usersService.update(id, updateUserDto);
        }
        changeRole(id, changeRoleDto) {
            return this.usersService.changeRole(id, changeRoleDto);
        }
        toggleActive(id) {
            return this.usersService.toggleActive(id);
        }
        remove(id) {
            return this.usersService.remove(id);
        }
        hardDelete(id) {
            return this.usersService.hardDelete(id);
        }
        restore(id) {
            return this.usersService.restore(id);
        }
        // NEW: Multi-role endpoints
        async assignRoles(userId, assignRolesDto, currentUserId) {
            return this.userRolesService.assignRoles(userId, assignRolesDto.primaryRoleId, assignRolesDto.additionalRoleIds || [], assignRolesDto.replaceExisting ?? true, currentUserId);
        }
        async getUserRoles(userId) {
            return this.userRolesService.getUserRoles(userId);
        }
        async removeRole(userId, roleId) {
            await this.userRolesService.removeRole(userId, roleId);
        }
    };
    return UsersController = _classThis;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map