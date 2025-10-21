import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    primaryRoleId?: string;
    additionalRoleIds?: string[];
    roleId?: string;
    emailVerified?: boolean;
    emailVerifiedAt?: Date;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    metadata?: any;
    customerNumber?: string;
    schoolName?: string;
    studentId?: string;
    isSubscribedToNewsletter?: boolean;
    refreshToken?: string;
    refreshTokenExpires?: Date;
    lastLoginAt?: Date;
}
export {};
//# sourceMappingURL=update-user.dto.d.ts.map