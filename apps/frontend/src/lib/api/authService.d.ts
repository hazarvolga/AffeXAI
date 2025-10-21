export interface LoginDto {
    email: string;
    password: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        roleId: string;
    };
}
export interface RefreshTokenDto {
    refresh_token: string;
}
export interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}
export interface CurrentUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
    phone?: string;
    city?: string;
    country?: string;
    address?: string;
    bio?: string;
    isActive: boolean;
    emailVerified?: boolean;
    emailVerifiedAt?: string;
    metadata?: {
        isCustomer?: boolean;
        isStudent?: boolean;
        isSubscriber?: boolean;
        customerNumber?: string;
        schoolName?: string;
        studentId?: string;
        isSubscribedToNewsletter?: boolean;
        subscriptionPreferences?: {
            optIn?: boolean;
            categories?: string[];
        };
        additionalRoles?: string[];
    };
}
declare class AuthService {
    /**
     * Login user and store token
     * Uses server-side route handler to properly set cookies for middleware
     */
    login(credentials: LoginDto): Promise<LoginResponse>;
    /**
     * Logout user and clear token
     */
    logout(): void;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Get current token
     */
    getToken(): string | null;
    /**
     * Decode JWT token and get user info (client-side only)
     * Note: This is NOT secure for permissions - only use for UI display
     */
    getUserFromToken(): CurrentUser | null;
    /**
     * Get current user from API
     */
    getCurrentUser(): Promise<CurrentUser>;
    /**
     * Update user token with fresh user data
     * Useful after profile updates to keep JWT in sync
     */
    updateUserToken(updatedUser: Partial<CurrentUser>): void;
    /**
     * Check if email already exists (duplicate check)
     */
    checkEmailExists(email: string): Promise<{
        exists: boolean;
        message: string;
    }>;
    /**
     * Register new user
     */
    register(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone?: string;
        roleId?: string;
        metadata?: any;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    /**
     * Refresh access token using refresh token
     */
    refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponse>;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=authService.d.ts.map