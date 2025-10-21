import { AuthService } from './auth.service';
import { UsersService } from '../modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            roleId: any;
        };
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        success: boolean;
        data: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
        };
    }>;
    verifyEmail(token: string): Promise<{
        success: boolean;
        message: string;
        user: {
            email: any;
            firstName: any;
            lastName: any;
        };
    }>;
    getCurrentUser(req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            roleId: string;
            phone: string;
            city: string;
            country: string;
            address: string;
            bio: string;
            isActive: boolean;
            emailVerified: boolean;
            emailVerifiedAt: Date;
            metadata: {
                [key: string]: any;
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
            };
        };
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map