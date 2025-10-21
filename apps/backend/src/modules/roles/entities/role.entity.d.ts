import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/user-role.entity';
export declare class Role {
    id: string;
    name: string;
    displayName: string;
    description: string;
    permissions: string[];
    isActive: boolean;
    isSystem: boolean;
    users: User[];
    userRoles: UserRole[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=role.entity.d.ts.map