import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { UserRolesService } from './user-roles.service';
export declare class UsersController {
    private readonly usersService;
    private readonly userRolesService;
    constructor(usersService: UsersService, userRolesService: UserRolesService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(filterDto: FilterUsersDto): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
    }>;
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
    getCurrentUser(userId: string): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    completeProfile(userId: string, completeProfileDto: CompleteProfileDto): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    changeRole(id: string, changeRoleDto: ChangeUserRoleDto): Promise<import("./entities/user.entity").User>;
    toggleActive(id: string): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
    hardDelete(id: string): Promise<void>;
    restore(id: string): Promise<import("./entities/user.entity").User>;
    assignRoles(userId: string, assignRolesDto: AssignRolesDto, currentUserId: string): Promise<import("./entities/user-role.entity").UserRole[]>;
    getUserRoles(userId: string): Promise<import("./entities/user-role.entity").UserRole[]>;
    removeRole(userId: string, roleId: string): Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map