import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { MailService } from '../modules/mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { AuthUtilsService } from '../shared/auth-utils.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private authUtilsService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, authUtilsService: AuthUtilsService, mailService: MailService);
    validateUser(email: string, password: string): Promise<any>;
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
    } | null>;
    checkEmailExists(email: string): Promise<boolean>;
    /**
     * Refresh access token using refresh token
     */
    refreshAccessToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
    }>;
    /**
     * Generate email verification token
     */
    generateVerificationToken(): string;
    /**
     * Create email verification token for user
     * Returns the token (to be sent via email)
     */
    createEmailVerificationToken(userId: string): Promise<string>;
    /**
     * Verify email with token
     * Returns user if successful, null if token invalid/expired
     */
    verifyEmail(token: string): Promise<any>;
    /**
     * Send verification email to user
     */
    sendVerificationEmail(userId: string, email: string, firstName: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map