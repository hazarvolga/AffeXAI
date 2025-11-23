"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuardOr = exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
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
let PermissionsGuard = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PermissionsGuard = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PermissionsGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        reflector;
        constructor(reflector) {
            this.reflector = reflector;
        }
        async canActivate(context) {
            const requiredPermissions = this.reflector.getAllAndOverride('permissions', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredPermissions || requiredPermissions.length === 0) {
                return true; // No permissions required
            }
            const { user } = context.switchToHttp().getRequest();
            if (!user) {
                throw new common_1.ForbiddenException('User not authenticated');
            }
            // Collect all permissions from all user roles
            const userPermissions = new Set();
            if (user.roles && Array.isArray(user.roles)) {
                user.roles.forEach(role => {
                    if (role.permissions && Array.isArray(role.permissions)) {
                        role.permissions.forEach(permission => {
                            userPermissions.add(permission);
                        });
                    }
                });
            }
            if (userPermissions.size === 0) {
                throw new common_1.ForbiddenException('User has no permissions assigned');
            }
            // Check if user has ALL required permissions (AND logic)
            const missingPermissions = requiredPermissions.filter(permission => !userPermissions.has(permission));
            if (missingPermissions.length > 0) {
                console.log('❌ PermissionsGuard: Access denied', {
                    userId: user.id,
                    email: user.email,
                    requiredPermissions,
                    userPermissions: Array.from(userPermissions),
                    missingPermissions,
                });
                throw new common_1.ForbiddenException(`Access denied. Missing permissions: ${missingPermissions.join(', ')}`);
            }
            console.log('✅ PermissionsGuard: Access granted', {
                userId: user.id,
                email: user.email,
                requiredPermissions,
            });
            return true;
        }
    };
    return PermissionsGuard = _classThis;
})();
exports.PermissionsGuard = PermissionsGuard;
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
let PermissionsGuardOr = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PermissionsGuardOr = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PermissionsGuardOr = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        reflector;
        constructor(reflector) {
            this.reflector = reflector;
        }
        async canActivate(context) {
            const requiredPermissions = this.reflector.getAllAndOverride('permissions', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredPermissions || requiredPermissions.length === 0) {
                return true;
            }
            const { user } = context.switchToHttp().getRequest();
            if (!user) {
                throw new common_1.ForbiddenException('User not authenticated');
            }
            // Collect all permissions from all user roles
            const userPermissions = new Set();
            if (user.roles && Array.isArray(user.roles)) {
                user.roles.forEach(role => {
                    if (role.permissions && Array.isArray(role.permissions)) {
                        role.permissions.forEach(permission => {
                            userPermissions.add(permission);
                        });
                    }
                });
            }
            if (userPermissions.size === 0) {
                throw new common_1.ForbiddenException('User has no permissions assigned');
            }
            // Check if user has ANY of the required permissions (OR logic)
            const hasAnyPermission = requiredPermissions.some(permission => userPermissions.has(permission));
            if (!hasAnyPermission) {
                console.log('❌ PermissionsGuardOr: Access denied', {
                    userId: user.id,
                    email: user.email,
                    requiredPermissions,
                    userPermissions: Array.from(userPermissions),
                });
                throw new common_1.ForbiddenException(`Access denied. Required one of: ${requiredPermissions.join(', ')}`);
            }
            console.log('✅ PermissionsGuardOr: Access granted', {
                userId: user.id,
                email: user.email,
                matchedPermissions: requiredPermissions.filter(p => userPermissions.has(p)),
            });
            return true;
        }
    };
    return PermissionsGuardOr = _classThis;
})();
exports.PermissionsGuardOr = PermissionsGuardOr;
//# sourceMappingURL=permissions.guard.js.map