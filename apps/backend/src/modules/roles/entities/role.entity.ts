import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/user-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  name: string; // Unique identifier (e.g., 'admin', 'editor')

  @Column({ length: 100 })
  displayName: string; // Display name (e.g., 'Admin', 'Editor')

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: [] })
  permissions: string[]; // Array of permission IDs

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isSystem: boolean; // System roles cannot be deleted

  // DEPRECATED: Single role relationship (kept for backward compatibility)
  @OneToMany(() => User, user => user.roleEntity)
  users: User[];

  // NEW: Many-to-Many relationship for multi-role support
  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
