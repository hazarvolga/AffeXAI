import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
/**
 * Roles Guard
 * Checks if user has required roles (supports multi-role)
 * User roles are already attached to request by JwtAuthGuard
 */
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=roles.guard.d.ts.map