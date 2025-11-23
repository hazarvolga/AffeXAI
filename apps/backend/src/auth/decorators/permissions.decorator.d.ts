/**
 * Permissions Decorator
 * Used to specify required permissions for endpoints
 * Works with PermissionsGuard to enforce permission-based access control
 *
 * @example
 * @RequirePermissions('users.view', 'users.create')
 * @Get('users')
 * getUsers() {}
 *
 * @example
 * import { PERMISSIONS } from '../../lib/permissions';
 * @RequirePermissions(PERMISSIONS.USERS_VIEW, PERMISSIONS.USERS_CREATE)
 * @Get('users')
 * getUsers() {}
 */
export declare const RequirePermissions: (...permissions: string[]) => import("@nestjs/common").CustomDecorator<string>;
//# sourceMappingURL=permissions.decorator.d.ts.map