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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UsersService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsersService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersRepository;
        authUtilsService;
        cacheService;
        rolesService;
        userRolesService;
        constructor(usersRepository, authUtilsService, cacheService, rolesService, userRolesService) {
            this.usersRepository = usersRepository;
            this.authUtilsService = authUtilsService;
            this.cacheService = cacheService;
            this.rolesService = rolesService;
            this.userRolesService = userRolesService;
        }
        async create(createUserDto) {
            try {
                // Check if email already exists (skip cache for accuracy)
                const existingUser = await this.findByEmail(createUserDto.email, true);
                if (existingUser) {
                    throw new common_1.ConflictException('User with this email already exists');
                }
                // If no roleId provided, assign default viewer role
                if (!createUserDto.roleId) {
                    try {
                        const roles = await this.rolesService.findAll();
                        const viewerRole = roles.find(r => r.name === 'viewer');
                        if (viewerRole) {
                            createUserDto.roleId = viewerRole.id;
                        }
                        else {
                            console.error('❌ Viewer role not found in database');
                            throw new common_1.BadRequestException('Default viewer role not found. Please contact administrator.');
                        }
                    }
                    catch (roleError) {
                        console.error('❌ Error fetching roles:', roleError);
                        throw new common_1.BadRequestException('Unable to assign default role. Please try again later.');
                    }
                }
                // Hash the password before saving
                const hashedPassword = await this.authUtilsService.hashPassword(createUserDto.password);
                const user = this.usersRepository.create({
                    ...createUserDto,
                    password: hashedPassword,
                });
                console.log('✓ Creating user with data:', {
                    email: user.email,
                    roleId: user.roleId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    hasMetadata: !!user.metadata,
                });
                const savedUser = await this.usersRepository.save(user);
                console.log('✓ User created successfully:', savedUser.id);
                // Clear cache
                await this.cacheService.del('users:all');
                return savedUser;
            }
            catch (error) {
                console.error('❌ Error in UsersService.create:', error);
                // Re-throw known errors
                if (error instanceof common_1.ConflictException || error instanceof common_1.BadRequestException) {
                    throw error;
                }
                // Handle database constraint violations (duplicate key)
                if (error.code === '23505') { // PostgreSQL unique violation code
                    if (error.constraint?.includes('email') || error.detail?.includes('email')) {
                        throw new common_1.ConflictException('User with this email already exists');
                    }
                    throw new common_1.ConflictException('A user with this information already exists');
                }
                // Log and throw unexpected errors
                console.error('❌ Unexpected error details:', {
                    message: error.message,
                    code: error.code,
                    constraint: error.constraint,
                    detail: error.detail,
                    stack: error.stack,
                    name: error.name,
                });
                throw error;
            }
        }
        async findAll(filterDto) {
            const page = filterDto?.page || 1;
            const limit = filterDto?.limit || 10;
            const skip = (page - 1) * limit;
            const where = {};
            // Search filter (email or name)
            if (filterDto?.search) {
                // This is simplified - for production, use query builder for OR conditions
                where.email = (0, typeorm_1.ILike)(`%${filterDto.search}%`);
            }
            // Role filter
            if (filterDto?.roleId) {
                where.roleId = filterDto.roleId;
            }
            // Status filters
            if (filterDto?.isActive !== undefined) {
                where.isActive = filterDto.isActive;
            }
            if (filterDto?.emailVerified !== undefined) {
                where.emailVerified = filterDto.emailVerified;
            }
            // Sorting
            const sortBy = filterDto?.sortBy || 'createdAt';
            const sortOrder = filterDto?.sortOrder || 'DESC';
            const [users, total] = await this.usersRepository.findAndCount({
                where,
                relations: ['roleEntity', 'userRoles', 'userRoles.role'], // Include multi-role data
                take: limit,
                skip,
                order: {
                    [sortBy]: sortOrder,
                },
                withDeleted: false, // Exclude soft-deleted users from list
            });
            return {
                data: users,
                total,
                page,
                limit,
            };
        }
        async findOne(id) {
            const user = await this.usersRepository.findOne({
                where: { id },
                relations: ['roleEntity', 'userRoles', 'userRoles.role'], // Include both legacy and new role relations
                withDeleted: false, // Exclude soft-deleted users
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${id}" not found`);
            }
            // DEBUG: Log user roles
            console.log('🔍 UsersService.findOne - user roles:', {
                email: user.email,
                roleId: user.roleId,
                userRolesCount: user.userRoles?.length || 0,
                userRoles: user.userRoles?.map(ur => ({
                    roleName: ur.role?.name,
                    isPrimary: ur.isPrimary,
                })),
                rolesGetter: user.roles?.map(r => r.name),
            });
            return user;
        }
        async findByEmail(email, skipCache = false) {
            // Skip cache for critical operations like user registration
            if (!skipCache) {
                const cached = await this.cacheService.get(`users:email:${email}`);
                if (cached) {
                    return cached;
                }
            }
            // Important: Only find users that are NOT soft-deleted
            // TypeORM automatically excludes soft-deleted records when using findOne
            // But we need to be explicit for clarity
            const user = await this.usersRepository.findOne({
                where: { email },
                relations: ['roleEntity', 'userRoles', 'userRoles.role'], // Include role information for permission checks
                withDeleted: false, // Explicitly exclude soft-deleted users
            });
            if (user && !skipCache) {
                await this.cacheService.set(`users:email:${email}`, user, 60); // 60 seconds TTL
            }
            return user;
        }
        async findByVerificationToken(token) {
            return await this.usersRepository.findOne({
                where: { emailVerificationToken: token },
                withDeleted: false, // Don't allow verifying deleted accounts
            });
        }
        async update(id, updateUserDto) {
            const user = await this.findOne(id);
            // Check if email is being changed and if it's already taken
            if (updateUserDto.email && updateUserDto.email !== user.email) {
                const existingUser = await this.findByEmail(updateUserDto.email);
                if (existingUser) {
                    throw new common_1.ConflictException('Email already in use');
                }
            }
            // NEW: Role handling - Update roles if primaryRoleId is provided
            if (updateUserDto.primaryRoleId) {
                console.log(`🔄 Updating roles for user ${id}:`, {
                    primaryRoleId: updateUserDto.primaryRoleId,
                    additionalRoleIds: updateUserDto.additionalRoleIds || [],
                });
                try {
                    await this.userRolesService.assignRoles(id, updateUserDto.primaryRoleId, updateUserDto.additionalRoleIds || [], true, // Replace existing roles
                    undefined);
                    // Remove from DTO to prevent duplicate update
                    delete updateUserDto.primaryRoleId;
                    delete updateUserDto.additionalRoleIds;
                }
                catch (error) {
                    console.error('❌ Error updating user roles:', error);
                    throw error;
                }
            }
            // DEPRECATED: Backward compatibility for single roleId
            if (updateUserDto.roleId && updateUserDto.roleId !== user.roleId) {
                console.log(`⚠️ Using deprecated roleId field. Consider using primaryRoleId instead.`);
                // Validate role exists
                const roleExists = await this.rolesService.findOne(updateUserDto.roleId);
                if (!roleExists) {
                    throw new common_1.NotFoundException(`Role with ID "${updateUserDto.roleId}" not found`);
                }
                // Assign as primary role using new system
                await this.userRolesService.assignRoles(id, updateUserDto.roleId, [], true);
            }
            // If password is being updated, hash it
            if (updateUserDto.password) {
                updateUserDto.password = await this.authUtilsService.hashPassword(updateUserDto.password);
            }
            // IMPORTANT: Use update() instead of save() to avoid eager loading issues
            // save() tries to persist eager loaded relations which causes userId to become null
            await this.usersRepository.update(id, updateUserDto);
            // Clear cache
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del(`users:email:${user.email}`);
            await this.cacheService.del('users:all');
            // Reload user with updated roles
            return this.findOne(id);
        }
        // Alias for update method (for compatibility)
        async updateUser(id, updateUserDto) {
            return this.update(id, updateUserDto);
        }
        async remove(id) {
            // Need to use withDeleted to find user even if already soft-deleted
            const user = await this.usersRepository.findOne({
                where: { id },
                withDeleted: true,
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${id}" not found`);
            }
            // Soft delete by setting deletedAt
            await this.usersRepository.softDelete(id);
            // Clear cache
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del(`users:email:${user.email}`);
            await this.cacheService.del('users:all');
        }
        /**
         * Hard delete - permanently remove user from database
         * Use with caution! This action cannot be undone.
         * Consider using soft delete (remove) instead.
         */
        async hardDelete(id) {
            const user = await this.usersRepository.findOne({
                where: { id },
                withDeleted: true, // Find even soft-deleted users
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${id}" not found`);
            }
            console.warn(`⚠️  HARD DELETE: Permanently removing user ${user.email} (${id})`);
            // Permanently delete from database
            await this.usersRepository.remove(user);
            // Clear cache
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del(`users:email:${user.email}`);
            await this.cacheService.del('users:all');
        }
        /**
         * Restore a soft-deleted user
         */
        async restore(id) {
            // Find soft-deleted user
            const user = await this.usersRepository.findOne({
                where: { id },
                withDeleted: true,
            });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID "${id}" not found`);
            }
            if (!user.deletedAt) {
                throw new common_1.BadRequestException('User is not deleted');
            }
            // Restore the user
            await this.usersRepository.restore(id);
            // Clear cache and return updated user
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del(`users:email:${user.email}`);
            await this.cacheService.del('users:all');
            return this.findOne(id);
        }
        async changeRole(id, changeRoleDto) {
            console.log(`⚠️ changeRole is deprecated. Use update with primaryRoleId instead.`);
            const user = await this.findOne(id);
            // Use new multi-role system
            await this.userRolesService.assignRoles(id, changeRoleDto.roleId, [], // No additional roles
            true);
            // Clear cache
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del('users:all');
            // Reload user with new role relation
            return this.findOne(id);
        }
        async toggleActive(id) {
            const user = await this.findOne(id);
            user.isActive = !user.isActive;
            const updatedUser = await this.usersRepository.save(user);
            // Clear cache
            await this.cacheService.del(`users:${id}`);
            await this.cacheService.del('users:all');
            return updatedUser;
        }
        async getStats() {
            const total = await this.usersRepository.count();
            const active = await this.usersRepository.count({ where: { isActive: true } });
            const inactive = await this.usersRepository.count({ where: { isActive: false } });
            const verified = await this.usersRepository.count({ where: { emailVerified: true } });
            const unverified = await this.usersRepository.count({ where: { emailVerified: false } });
            // Get count by role
            const byRoleQuery = await this.usersRepository
                .createQueryBuilder('user')
                .leftJoin('user.roleEntity', 'role')
                .select('role.displayName', 'role')
                .addSelect('COUNT(user.id)', 'count')
                .groupBy('role.displayName')
                .getRawMany();
            const byRole = byRoleQuery.map(item => ({
                role: item.role || 'No Role',
                count: parseInt(item.count),
            }));
            return {
                total,
                active,
                inactive,
                verified,
                unverified,
                byRole,
            };
        }
        /**
         * Complete user profile after registration
         * This method handles automatic role assignment based on profile data:
         * - Customer role: if customerData is provided
         * - Student role: if studentData is provided
         * - Subscriber role: if newsletter preferences are enabled
         */
        async completeProfile(userId, completeProfileDto) {
            const user = await this.findOne(userId);
            // Update basic profile fields
            if (completeProfileDto.firstName)
                user.firstName = completeProfileDto.firstName;
            if (completeProfileDto.lastName)
                user.lastName = completeProfileDto.lastName;
            if (completeProfileDto.phone)
                user.phone = completeProfileDto.phone;
            // Update metadata
            if (!user.metadata) {
                user.metadata = {};
            }
            // Handle customer data and role assignment
            if (completeProfileDto.customerData &&
                (completeProfileDto.customerData.customerNumber || completeProfileDto.customerData.companyName)) {
                user.metadata.customerData = completeProfileDto.customerData;
                // Update direct customer fields for easier querying
                if (completeProfileDto.customerData.customerNumber) {
                    user.customerNumber = completeProfileDto.customerData.customerNumber;
                }
                // Assign Customer role
                await this.assignRoleByName(user, 'customer');
            }
            // Handle student data and role assignment
            if (completeProfileDto.studentData &&
                (completeProfileDto.studentData.schoolName || completeProfileDto.studentData.studentId)) {
                user.metadata.studentData = completeProfileDto.studentData;
                // Update direct student fields for easier querying
                if (completeProfileDto.studentData.schoolName) {
                    user.schoolName = completeProfileDto.studentData.schoolName;
                }
                if (completeProfileDto.studentData.studentId) {
                    user.studentId = completeProfileDto.studentData.studentId;
                }
                // Assign Student role (if exists, otherwise log warning)
                await this.assignRoleByName(user, 'student');
            }
            // Handle newsletter preferences and subscriber role
            if (completeProfileDto.newsletterPreferences) {
                user.metadata.newsletterPreferences = completeProfileDto.newsletterPreferences;
                // If any newsletter option is enabled, assign Subscriber role
                const hasNewsletterSubscription = Object.values(completeProfileDto.newsletterPreferences).some(v => v === true);
                if (hasNewsletterSubscription) {
                    // Update direct subscription flag
                    user.isSubscribedToNewsletter = true;
                    await this.assignRoleByName(user, 'subscriber');
                    // TODO: Add to email marketing list
                    console.log(`📧 User ${user.email} subscribed to newsletter. TODO: Add to email marketing service.`);
                }
            }
            // Merge additional metadata
            if (completeProfileDto.metadata) {
                user.metadata = { ...user.metadata, ...completeProfileDto.metadata };
            }
            // Mark profile as completed
            user.metadata.profileCompleted = true;
            user.metadata.profileCompletedAt = new Date().toISOString();
            const updatedUser = await this.usersRepository.save(user);
            // Clear cache
            await this.cacheService.del(`users:${userId}`);
            await this.cacheService.del(`users:email:${user.email}`);
            await this.cacheService.del('users:all');
            return updatedUser;
        }
        /**
         * Assign a role to user by role name
         * Only assigns if user doesn't already have the role
         */
        async assignRoleByName(user, roleName) {
            try {
                const roles = await this.rolesService.findAll();
                const role = roles.find(r => r.name.toLowerCase() === roleName.toLowerCase());
                if (!role) {
                    console.warn(`⚠️ Role "${roleName}" not found in database. Skipping role assignment.`);
                    return;
                }
                // Check if user already has this role
                if (user.roleId === role.id) {
                    console.log(`ℹ️ User ${user.email} already has role "${roleName}"`);
                    return;
                }
                // For now, we'll store additional roles in metadata
                // In future, we can implement many-to-many relationship for multiple roles
                if (!user.metadata.additionalRoles) {
                    user.metadata.additionalRoles = [];
                }
                if (!user.metadata.additionalRoles.includes(role.name)) {
                    user.metadata.additionalRoles.push(role.name);
                    console.log(`✅ Assigned role "${roleName}" to user ${user.email}`);
                }
            }
            catch (error) {
                console.error(`❌ Error assigning role "${roleName}":`, error);
            }
        }
    };
    return UsersService = _classThis;
})();
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map