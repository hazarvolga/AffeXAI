"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalSidebar = PortalSidebar;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const allNavLinks = [
    // Common for all portal users
    { href: "/portal/dashboard", icon: lucide_react_1.Home, label: "Genel Bakış", access: 'all' },
    // Customer-specific features
    { href: "/portal/orders", icon: lucide_react_1.ShoppingCart, label: "Siparişlerim", access: 'customer' },
    { href: "/portal/licenses", icon: lucide_react_1.FileText, label: "Lisanslarım", access: 'customer' },
    { href: "/portal/support", icon: lucide_react_1.LifeBuoy, label: "Destek Taleplerim", access: 'customer' },
    // Education features (Customer + Student)
    { href: "/portal/courses", icon: lucide_react_1.GraduationCap, label: "Eğitimlerim", access: ['customer', 'student'] },
    { href: "/portal/certificates", icon: lucide_react_1.Award, label: "Sertifikalarım", access: ['customer', 'student'] },
    // Content features (All users can view)
    { href: "/portal/kb", icon: lucide_react_1.BookOpen, label: "Bilgi Bankası", access: 'all' },
    { href: "/portal/newsletter", icon: lucide_react_1.Mail, label: "Bülten Arşivi", access: 'all' },
    { href: "/portal/events", icon: lucide_react_1.Calendar, label: "Etkinliklerim", access: 'all' },
    // Profile (everyone)
    { href: "/portal/profile", icon: lucide_react_1.Users, label: "Profilim", access: 'all' },
    // Admin-only debug feature
    { href: "/portal/caching-test", icon: lucide_react_1.Zap, label: "Caching Test", access: 'admin' },
];
function PortalSidebar({ user }) {
    const pathname = (0, navigation_1.usePathname)();
    /**
     * Check if user has a specific role (supports multi-role)
     * Uses new role system: user.roles[] or user.primaryRole
     */
    const hasRole = (roleName) => {
        if (!user)
            return false;
        // NEW: Check in roles array (multi-role system)
        if (user.roles && Array.isArray(user.roles)) {
            return user.roles.some((role) => role.name.toLowerCase() === roleName.toLowerCase());
        }
        // FALLBACK: Check primaryRole
        if (user.primaryRole?.name) {
            return user.primaryRole.name.toLowerCase() === roleName.toLowerCase();
        }
        // LEGACY: Check old roleEntity for backward compatibility
        if (user.roleEntity?.name) {
            return user.roleEntity.name.toLowerCase() === roleName.toLowerCase();
        }
        return false;
    };
    /**
     * Check if user has ANY of the specified roles
     */
    const hasAnyRole = (roleNames) => {
        return roleNames.some(roleName => hasRole(roleName));
    };
    // Debug logging
    console.log('🔍 PortalSidebar Debug:', {
        user,
        hasRoles: user?.roles?.map((r) => r.name),
        primaryRole: user?.primaryRole?.name,
        hasCustomer: hasRole('customer'),
        hasStudent: hasRole('student'),
        hasSubscriber: hasRole('subscriber'),
        hasAdmin: hasRole('admin'),
    });
    // Filter links based on role-based access
    const navLinks = allNavLinks.filter(link => {
        // 'all' - everyone can access
        if (link.access === 'all')
            return true;
        // No user = no access
        if (!user)
            return false;
        // Single role access
        if (typeof link.access === 'string') {
            return hasRole(link.access);
        }
        // Multiple roles access (array) - user needs ANY of these roles
        if (Array.isArray(link.access)) {
            return hasAnyRole(link.access);
        }
        return false;
    });
    return (<div className="hidden border-r bg-background sm:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <link_1.default href="/portal/dashboard" className="flex items-center gap-2 font-semibold">
                        <lucide_react_1.Package2 className="h-6 w-6 text-primary"/>
                        <span className="">Kullanıcı Portalı</span>
                    </link_1.default>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navLinks.map(link => {
            // The dashboard link should always point to the main dispatcher
            const href = link.label === 'Genel Bakış' ? '/portal/dashboard' : link.href;
            const isActive = pathname.startsWith(href) && href !== '#';
            return (<link_1.default key={link.label} href={href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}>
                                    <link.icon className="h-4 w-4"/>
                                    {link.label}
                                </link_1.default>);
        })}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                        <link_1.default href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <lucide_react_1.Globe className="h-4 w-4"/>
                            Siteye Dön
                        </link_1.default>
                         <link_1.default href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <lucide_react_1.Settings className="h-4 w-4"/>
                            Ayarlar
                        </link_1.default>
                    </nav>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=portal-sidebar.js.map