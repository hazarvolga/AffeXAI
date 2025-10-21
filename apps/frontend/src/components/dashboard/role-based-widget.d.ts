import { ReactNode } from 'react';
interface RoleBasedWidgetProps {
    /** Roles that can see this widget */
    roles: string[];
    /** Widget content */
    children: ReactNode;
    /** Optional: Show widget to users with ANY of the roles (default: true) */
    requireAll?: boolean;
}
/**
 * RoleBasedWidget - Conditionally renders widgets based on user roles
 *
 * Examples:
 * - <RoleBasedWidget roles={['customer']}><CustomerWidget /></RoleBasedWidget>
 * - <RoleBasedWidget roles={['customer', 'student']}><SharedWidget /></RoleBasedWidget>
 * - <RoleBasedWidget roles={['admin', 'editor']} requireAll={true}><AdminOnlyWidget /></RoleBasedWidget>
 */
export declare function RoleBasedWidget({ roles, children, requireAll }: RoleBasedWidgetProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=role-based-widget.d.ts.map