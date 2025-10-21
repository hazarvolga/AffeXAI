"use strict";
/**
 * Protected Route Component
 *
 * Wraps components/pages that require authentication.
 * Redirects to login if user is not authenticated.
 */
'use client';
/**
 * Protected Route Component
 *
 * Wraps components/pages that require authentication.
 * Redirects to login if user is not authenticated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
exports.withAuth = withAuth;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_context_1 = require("./auth-context");
// ============================================================================
// Protected Route Component
// ============================================================================
/**
 * Protected Route
 *
 * Protects routes that require authentication and/or specific roles.
 *
 * @example
 * ```tsx
 * // Require authentication only
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * // Require specific role
 * <ProtectedRoute requiredRole="ADMIN">
 *   <AdminPanel />
 * </ProtectedRoute>
 *
 * // Require one of multiple roles
 * <ProtectedRoute requiredRoles={["ADMIN", "EDITOR"]}>
 *   <CMSEditor />
 * </ProtectedRoute>
 * ```
 */
function ProtectedRoute({ children, requiredRole, requiredRoles, redirectTo = '/login', fallback = null, }) {
    const router = (0, navigation_1.useRouter)();
    const pathname = (0, navigation_1.usePathname)();
    const { isAuthenticated, isLoading, hasRole, hasAnyRole } = (0, auth_context_1.useAuth)();
    (0, react_1.useEffect)(() => {
        // Wait for auth state to load
        if (isLoading)
            return;
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            // Store intended destination for redirect after login
            const returnUrl = encodeURIComponent(pathname || '/');
            router.push(`${redirectTo}?returnUrl=${returnUrl}`);
            return;
        }
        // Check role requirements
        if (requiredRole && !hasRole(requiredRole)) {
            // User doesn't have required role, redirect to unauthorized page
            router.push('/unauthorized');
            return;
        }
        if (requiredRoles && !hasAnyRole(requiredRoles)) {
            // User doesn't have any of the required roles
            router.push('/unauthorized');
            return;
        }
    }, [
        isAuthenticated,
        isLoading,
        requiredRole,
        requiredRoles,
        hasRole,
        hasAnyRole,
        router,
        pathname,
        redirectTo,
    ]);
    // Show loading state
    if (isLoading) {
        return <>{fallback}</>;
    }
    // Show nothing while redirecting
    if (!isAuthenticated) {
        return <>{fallback}</>;
    }
    // Check role requirements
    if (requiredRole && !hasRole(requiredRole)) {
        return <>{fallback}</>;
    }
    if (requiredRoles && !hasAnyRole(requiredRoles)) {
        return <>{fallback}</>;
    }
    // User is authenticated and authorized
    return <>{children}</>;
}
// ============================================================================
// Higher-Order Component (HOC) Version
// ============================================================================
/**
 * withAuth HOC
 *
 * Wraps a component to require authentication.
 *
 * @example
 * ```tsx
 * const ProtectedDashboard = withAuth(Dashboard);
 * const ProtectedAdminPanel = withAuth(AdminPanel, { requiredRole: "ADMIN" });
 * ```
 */
function withAuth(Component, options) {
    return function ProtectedComponent(props) {
        return (<ProtectedRoute {...options}>
        <Component {...props}/>
      </ProtectedRoute>);
    };
}
// ============================================================================
// Exports
// ============================================================================
exports.default = ProtectedRoute;
//# sourceMappingURL=protected-route.js.map