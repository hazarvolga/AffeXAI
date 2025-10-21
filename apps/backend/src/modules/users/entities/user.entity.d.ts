import { BaseEntity } from '../../../database/entities/base.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from './user-role.entity';
export declare class User extends BaseEntity {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
    address: string;
    city: string;
    country: string;
    bio: string;
    isActive: boolean;
    emailVerified: boolean;
    emailVerifiedAt: Date;
    emailVerificationToken: string;
    emailVerificationExpires: Date;
    refreshToken: string;
    refreshTokenExpires: Date;
    lastLoginAt: Date;
    tokenVersion: number;
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
        additionalRoles?: string[];
        profileCompleted?: boolean;
        profileCompletedAt?: string;
        [key: string]: any;
    };
    customerNumber: string;
    schoolName: string;
    studentId: string;
    isSubscribedToNewsletter: boolean;
    role: string;
    roleId: string;
    roleEntity: Role;
    userRoles: UserRole[];
    notifications: Notification[];
    get fullName(): string;
    get primaryRole(): Role | null;
    get roles(): Role[];
    get roleNames(): string[];
}
//# sourceMappingURL=user.entity.d.ts.map