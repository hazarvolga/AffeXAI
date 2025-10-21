"use strict";
/**
 * Authentication Module
 *
 * Barrel export for all authentication-related exports.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = exports.ProtectedRoute = exports.tokenStorage = exports.authService = exports.useAuth = exports.AuthProvider = void 0;
// Context and hooks
var auth_context_1 = require("./auth-context");
Object.defineProperty(exports, "AuthProvider", { enumerable: true, get: function () { return auth_context_1.AuthProvider; } });
Object.defineProperty(exports, "useAuth", { enumerable: true, get: function () { return auth_context_1.useAuth; } });
// Services
var authService_1 = require("../api/authService");
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return authService_1.authService; } });
var token_storage_1 = require("./token-storage");
Object.defineProperty(exports, "tokenStorage", { enumerable: true, get: function () { return token_storage_1.tokenStorage; } });
// Protected routes
var protected_route_1 = require("./protected-route");
Object.defineProperty(exports, "ProtectedRoute", { enumerable: true, get: function () { return protected_route_1.ProtectedRoute; } });
Object.defineProperty(exports, "withAuth", { enumerable: true, get: function () { return protected_route_1.withAuth; } });
//# sourceMappingURL=index.js.map