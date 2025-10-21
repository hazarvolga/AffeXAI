import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
    findByName(name: string): Promise<Role | null>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<void>;
    getPermissions(id: string): Promise<string[]>;
    updatePermissions(id: string, permissions: string[]): Promise<Role>;
    getUserCount(id: string): Promise<number>;
    /**
     * Find multiple roles by their IDs
     * NEW: Added for multi-role support
     */
    findByIds(ids: string[]): Promise<Role[]>;
}
//# sourceMappingURL=roles.service.d.ts.map