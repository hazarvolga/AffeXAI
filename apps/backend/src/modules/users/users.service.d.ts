import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { User } from './entities/user.entity';
import { AuthUtilsService } from '../../shared/auth-utils.service';
import { CacheService } from '../../shared/services/cache.service';
import { RolesService } from '../roles/roles.service';
import { UserRolesService } from './user-roles.service';
export declare class UsersService {
    private usersRepository;
    private authUtilsService;
    private cacheService;
    private rolesService;
    private userRolesService;
    constructor(usersRepository: Repository<User>, authUtilsService: AuthUtilsService, cacheService: CacheService, rolesService: RolesService, userRolesService: UserRolesService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(filterDto?: FilterUsersDto): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string, skipCache?: boolean): Promise<User | null>;
    findByVerificationToken(token: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    /**
     * Hard delete - permanently remove user from database
     * Use with caution! This action cannot be undone.
     * Consider using soft delete (remove) instead.
     */
    hardDelete(id: string): Promise<void>;
    /**
     * Restore a soft-deleted user
     */
    restore(id: string): Promise<User>;
    changeRole(id: string, changeRoleDto: ChangeUserRoleDto): Promise<User>;
    toggleActive(id: string): Promise<User>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        verified: number;
        unverified: number;
        byRole: {
            role: string;
            count: number;
        }[];
    }>;
    /**
     * Complete user profile after registration
     * This method handles automatic role assignment based on profile data:
     * - Customer role: if customerData is provided
     * - Student role: if studentData is provided
     * - Subscriber role: if newsletter preferences are enabled
     */
    completeProfile(userId: string, completeProfileDto: CompleteProfileDto): Promise<User>;
    /**
     * Assign a role to user by role name
     * Only assigns if user doesn't already have the role
     */
    private assignRoleByName;
}
//# sourceMappingURL=users.service.d.ts.map