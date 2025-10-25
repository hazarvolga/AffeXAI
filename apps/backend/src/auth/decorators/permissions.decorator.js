"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = void 0;
const common_1 = require("@nestjs/common");
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
const RequirePermissions = (...permissions) => (0, common_1.SetMetadata)('permissions', permissions);
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=permissions.decorator.js.map