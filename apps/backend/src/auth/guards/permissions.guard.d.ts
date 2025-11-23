import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
/**
 * Permissions Guard
 * Checks if user has required permissions (granular permission control)
 * User roles and permissions are already attached to request by JwtAuthGuard
 *
 * Usage:
 * @UseGuards(JwtAuthGuard, PermissionsGuard)
 * @RequirePermissions('users.view', 'users.create')
 * async getUsers() {}
 */
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
/**
 * Permissions Guard (OR Logic)
 * Checks if user has ANY of the required permissions
 * Useful when multiple permissions can grant access
 *
 * Usage:
 * @UseGuards(JwtAuthGuard, PermissionsGuardOr)
 * @RequirePermissions('users.view', 'users.create')
 * async getUsers() {}
 */
export declare class PermissionsGuardOr implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=permissions.guard.d.ts.map