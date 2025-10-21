"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PortalLayout;
const portal_header_1 = require("@/components/portal/portal-header");
const portal_sidebar_1 = require("@/components/portal/portal-sidebar");
const admin_top_bar_1 = require("@/components/portal/admin-top-bar");
const navigation_1 = require("next/navigation");
// In a real app, the user's base role would come from an auth context.
const mockAdmin = {
    role: 'Admin',
};
// Helper to extract role from pathname
const getRoleFromPathname = (pathname) => {
    const parts = pathname.split('/');
    if (parts.length > 3 && parts[1] === 'portal' && parts[2] === 'dashboard') {
        const rolePart = parts[3];
        // Handle URL encoding for "Support Team" etc.
        const roleName = rolePart ? decodeURIComponent(rolePart.replace(/\+/g, ' ')) : 'Customer';
        // Capitalize role names correctly e.g. "support-team" -> "Support Team"
        return roleName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return 'Customer';
};
function PortalLayout({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    // Don't show sidebar and header on login page
    const isLoginPage = pathname === '/portal/login';
    // Determine role from URL path first, then fallback to default.
    const effectiveRole = getRoleFromPathname(pathname);
    // Show the admin bar if the base user is an admin.
    const isAdmin = mockAdmin.role === 'Admin';
    if (isLoginPage) {
        return <div className="min-h-screen w-full">{children}</div>;
    }
    return (<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <portal_sidebar_1.PortalSidebar role={effectiveRole}/>
            <div className="flex flex-col">
                {isAdmin && <admin_top_bar_1.AdminTopBar currentRole={effectiveRole}/>}
                <portal_header_1.PortalHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                    {children}
                </main>
            </div>
        </div>);
}
//# sourceMappingURL=layout.js.map