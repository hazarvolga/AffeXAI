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
exports.UserRolesService = void 0;
const common_1 = require("@nestjs/common");
/**
 * UserRolesService
 *
 * Handles multi-role assignment and management for users.
 * Supports primary role designation and audit trail.
 */
let UserRolesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserRolesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UserRolesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        userRolesRepository;
        usersRepository;
        rolesService;
        constructor(userRolesRepository, usersRepository, rolesService) {
            this.userRolesRepository = userRolesRepository;
            this.usersRepository = usersRepository;
            this.rolesService = rolesService;
        }
        /**
         * Assign roles to a user
         * @param userId User ID
         * @param primaryRoleId Primary role ID
         * @param additionalRoleIds Additional role IDs (optional)
         * @param replaceExisting Replace all existing roles (default: true)
         * @param assignedBy User ID who is assigning roles (for audit trail)
         */
        async assignRoles(userId, primaryRoleId, additionalRoleIds = [], replaceExisting = true, assignedBy) {
            console.log(`🔄 Assigning roles to user ${userId}:`, {
                primaryRoleId,
                additionalRoleIds,
                replaceExisting,
                assignedBy,
            });
            // Validate user exists
            const user = await this.usersRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${userId}" not found`);
            }
            // Validate all role IDs exist
            const allRoleIds = [primaryRoleId, ...additionalRoleIds];
            const roles = await this.rolesService.findByIds(allRoleIds);
            if (roles.length !== allRoleIds.length) {
                const foundIds = roles.map(r => r.id);
                const missingIds = allRoleIds.filter(id => !foundIds.includes(id));
                throw new common_1.NotFoundException(`Roles not found: ${missingIds.join(', ')}`);
            }
            // Validate primary role exists in the list
            if (!roles.find(r => r.id === primaryRoleId)) {
                throw new common_1.BadRequestException(`Primary role "${primaryRoleId}" not found`);
            }
            // Remove existing roles if replaceExisting is true
            if (replaceExisting) {
                await this.userRolesRepository.delete({ userId });
                console.log(`🗑️  Removed existing roles for user ${userId}`);
            }
            // Prepare user roles
            const userRolesToCreate = [];
            // Add primary role
            userRolesToCreate.push({
                userId,
                roleId: primaryRoleId,
                isPrimary: true,
                assignedBy,
            });
            // Add additional roles
            for (const roleId of additionalRoleIds) {
                userRolesToCreate.push({
                    userId,
                    roleId,
                    isPrimary: false,
                    assignedBy,
                });
            }
            // Save all user roles
            const savedUserRoles = await this.userRolesRepository.save(userRolesToCreate);
            // Update legacy roleId field for backward compatibility
            // AND increment tokenVersion to invalidate old JWT tokens
            await this.usersRepository.update(userId, {
                roleId: primaryRoleId,
                tokenVersion: () => 'tokenVersion + 1'
            });
            console.log(`✅ Assigned ${savedUserRoles.length} role(s) to user ${userId}, tokenVersion incremented`);
            return savedUserRoles;
        }
        /**
         * Get all roles for a user
         */
        async getUserRoles(userId) {
            return this.userRolesRepository.find({
                where: { userId },
                relations: ['role'],
                order: { isPrimary: 'DESC', assignedAt: 'ASC' },
            });
        }
        /**
         * Get primary role for a user
         */
        async getPrimaryRole(userId) {
            return this.userRolesRepository.findOne({
                where: { userId, isPrimary: true },
                relations: ['role'],
            });
        }
        /**
         * Remove a specific role from a user
         */
        async removeRole(userId, roleId) {
            const userRole = await this.userRolesRepository.findOne({
                where: { userId, roleId },
            });
            if (!userRole) {
                throw new common_1.NotFoundException(`Role assignment not found`);
            }
            if (userRole.isPrimary) {
                throw new common_1.BadRequestException('Cannot remove primary role. Assign a new primary role first.');
            }
            await this.userRolesRepository.delete({ id: userRole.id });
            // Increment tokenVersion to invalidate old JWT tokens
            await this.usersRepository.update(userId, {
                tokenVersion: () => 'tokenVersion + 1'
            });
            console.log(`✅ Removed role ${roleId} from user ${userId}, tokenVersion incremented`);
        }
        /**
         * Check if user has a specific role
         */
        async userHasRole(userId, roleName) {
            const count = await this.userRolesRepository
                .createQueryBuilder('ur')
                .innerJoin('ur.role', 'role')
                .where('ur.userId = :userId', { userId })
                .andWhere('role.name = :roleName', { roleName })
                .getCount();
            return count > 0;
        }
        /**
         * Check if user has any of the specified roles
         */
        async userHasAnyRole(userId, roleNames) {
            const count = await this.userRolesRepository
                .createQueryBuilder('ur')
                .innerJoin('ur.role', 'role')
                .where('ur.userId = :userId', { userId })
                .andWhere('role.name IN (:...roleNames)', { roleNames })
                .getCount();
            return count > 0;
        }
        /**
         * Get all users with a specific role
         */
        async getUsersByRole(roleId) {
            const userRoles = await this.userRolesRepository.find({
                where: { roleId },
                relations: ['user'],
            });
            return userRoles.map(ur => ur.user);
        }
        /**
         * Count users with a specific role
         */
        async countUsersByRole(roleId) {
            return this.userRolesRepository.count({
                where: { roleId },
            });
        }
    };
    return UserRolesService = _classThis;
})();
exports.UserRolesService = UserRolesService;
//# sourceMappingURL=user-roles.service.js.map