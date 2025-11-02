import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from './user-role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  avatar: string; // URL to avatar image

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true, length: 100 })
  city: string;

  @Column({ nullable: true, length: 100 })
  country: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'text', nullable: true })
  emailVerificationToken: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerificationExpires: Date;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  refreshTokenExpires: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  // Token versioning for role/permission changes
  @Column({ type: 'int', default: 1 })
  tokenVersion: number;

  // Account type metadata (for customer, student, subscriber flags)
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    isCustomer?: boolean;
    isStudent?: boolean;
    isSubscriber?: boolean;
    customerNumber?: string;
    schoolName?: string;
    studentId?: string;
    subscriptionPreferences?: {
      optIn?: boolean;
      categories?: string[];
    };
    // Complete profile data
    customerData?: {
      customerNumber?: string;
      companyName?: string;
      taxNumber?: string;
      companyPhone?: string;
      companyAddress?: string;
      companyCity?: string;
    };
    studentData?: {
      schoolName?: string;
      studentId?: string;
    };
    newsletterPreferences?: {
      email?: boolean;
      productUpdates?: boolean;
      eventUpdates?: boolean;
    };
    // Additional roles (for multi-role support)
    additionalRoles?: string[];
    // Profile completion tracking
    profileCompleted?: boolean;
    profileCompletedAt?: string;
    [key: string]: any; // Allow additional dynamic properties
  };

  // Customer specific fields
  @Column({ nullable: true, unique: true })
  customerNumber: string;

  // Student specific fields
  @Column({ nullable: true })
  schoolName: string;

  @Column({ nullable: true })
  studentId: string;

  // Subscriber preferences
  @Column({ default: false })
  isSubscribedToNewsletter: boolean;

  // Legacy role field (kept for backward compatibility, deprecated)
  @Column({ nullable: true })
  role: string;

  // DEPRECATED: Single role relationship (kept for backward compatibility)
  @Column({ type: 'uuid', nullable: true })
  roleId: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'roleId' })
  roleEntity: Role;

  // NEW: Many-to-Many relationship for multi-role support
  @OneToMany(() => UserRole, userRole => userRole.user, { eager: true })
  userRoles: UserRole[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  // Computed property for full name
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // NEW: Computed property for primary role
  @Expose()
  get primaryRole(): Role | null {
    const primary = this.userRoles?.find(ur => ur.isPrimary);
    return primary?.role || null;
  }

  // NEW: Computed property for all roles
  @Expose()
  get roles(): Role[] {
    return this.userRoles?.map(ur => ur.role).filter(Boolean) || [];
  }

  // NEW: Computed property for all role names
  @Expose()
  get roleNames(): string[] {
    return this.roles.map(r => r.name);
  }
}