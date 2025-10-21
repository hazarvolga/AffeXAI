import { User } from './user.entity';
import { Role } from '../../roles/entities/role.entity';
/**
 * UserRole Entity
 * Junction table for many-to-many relationship between Users and Roles
 * Supports multi-role assignment with primary role designation
 */
export declare class UserRole {
    id: string;
    userId: string;
    roleId: string;
    isPrimary: boolean;
    assignedAt: Date;
    assignedBy: string | null;
    user: User;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user-role.entity.d.ts.map