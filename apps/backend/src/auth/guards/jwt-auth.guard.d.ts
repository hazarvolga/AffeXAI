import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../modules/users/users.service';
/**
 * JWT Authentication Guard
 * Validates JWT token from Authorization header
 * Fetches fresh user data with roles from DB on each request
 * Validates tokenVersion to invalidate old tokens on role changes
 */
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
//# sourceMappingURL=jwt-auth.guard.d.ts.map