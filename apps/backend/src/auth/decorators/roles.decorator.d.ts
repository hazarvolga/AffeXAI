import { UserRole } from '../../modules/users/enums/user-role.enum';
/**
 * Roles Decorator
 * Used to specify required roles for endpoints
 *
 * @example
 * @Roles(UserRole.ADMIN, UserRole.EDITOR)
 * @Get('admin-only')
 * adminEndpoint() {}
 */
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
//# sourceMappingURL=roles.decorator.d.ts.map