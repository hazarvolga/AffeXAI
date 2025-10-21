/**
 * Protected Route Component
 *
 * Wraps components/pages that require authentication.
 * Redirects to login if user is not authenticated.
 */
import type { UserRole } from '@affexai/shared-types';
export interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    requiredRoles?: UserRole[];
    redirectTo?: string;
    fallback?: React.ReactNode;
}
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
export declare function ProtectedRoute({ children, requiredRole, requiredRoles, redirectTo, fallback, }: ProtectedRouteProps): import("react").JSX.Element;
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
export declare function withAuth<P extends object>(Component: React.ComponentType<P>, options?: Omit<ProtectedRouteProps, 'children'>): (props: P) => import("react").JSX.Element;
export default ProtectedRoute;
//# sourceMappingURL=protected-route.d.ts.map