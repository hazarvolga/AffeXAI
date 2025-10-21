import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    /**
     * Create a new role
     * Only Admin can create roles
     */
    create(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").Role>;
    /**
     * Get all roles
     * Admin and Viewers can see all roles
     */
    findAll(): Promise<import("./entities/role.entity").Role[]>;
    /**
     * Get role by ID
     * Admin and Viewers can view role details
     */
    findOne(id: string): Promise<import("./entities/role.entity").Role>;
    /**
     * Update role
     * Only Admin can update roles
     */
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./entities/role.entity").Role>;
    /**
     * Delete role
     * Only Admin can delete roles
     */
    remove(id: string): Promise<void>;
    /**
     * Get role permissions
     * Admin and Viewers can view permissions
     */
    getPermissions(id: string): Promise<string[]>;
    /**
     * Update role permissions
     * Only Admin can update permissions
     */
    updatePermissions(id: string, permissions: string[]): Promise<import("./entities/role.entity").Role>;
    /**
     * Get user count for role
     */
    getUserCount(id: string): Promise<{
        count: number;
    }>;
}
//# sourceMappingURL=roles.controller.d.ts.map