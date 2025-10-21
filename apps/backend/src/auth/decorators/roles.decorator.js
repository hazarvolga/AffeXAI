"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
/**
 * Roles Decorator
 * Used to specify required roles for endpoints
 *
 * @example
 * @Roles(UserRole.ADMIN, UserRole.EDITOR)
 * @Get('admin-only')
 * adminEndpoint() {}
 */
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map