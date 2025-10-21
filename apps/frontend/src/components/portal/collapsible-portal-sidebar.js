"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsiblePortalSidebar = CollapsiblePortalSidebar;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
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
function CollapsiblePortalSidebar({ user }) {
    const pathname = (0, navigation_1.usePathname)();
    // Collapsible state with localStorage
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)(false);
    // Load collapse state from localStorage on mount
    (0, react_1.useEffect)(() => {
        const stored = localStorage.getItem('portal-sidebar-collapsed');
        if (stored !== null) {
            setIsCollapsed(stored === 'true');
        }
    }, []);
    // Save collapse state to localStorage
    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('portal-sidebar-collapsed', String(newState));
    };
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
    return (<div className={(0, utils_1.cn)("hidden border-r bg-background sm:block sticky top-0 h-screen transition-all duration-300 ease-in-out", isCollapsed ? "w-[60px]" : "w-[220px] lg:w-[280px]")}>
            <div className="flex h-full max-h-screen flex-col gap-2 relative">
                {/* Header with Logo */}
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <link_1.default href="/portal/dashboard" className="flex items-center gap-2 font-semibold">
                        <lucide_react_1.Package2 className="h-6 w-6 text-primary flex-shrink-0"/>
                        {!isCollapsed && <span className="truncate">Kullanıcı Portalı</span>}
                    </link_1.default>
                </div>

                {/* Collapse Toggle Button */}
                <button_1.Button variant="ghost" size="icon" onClick={toggleCollapse} className="absolute -right-3 top-16 z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent" title={isCollapsed ? "Genişlet" : "Daralt"}>
                    {isCollapsed ? (<lucide_react_1.ChevronRight className="h-4 w-4"/>) : (<lucide_react_1.ChevronLeft className="h-4 w-4"/>)}
                </button_1.Button>

                <div className="flex-1 overflow-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navLinks.map(link => {
            // The dashboard link should always point to the main dispatcher
            const href = link.label === 'Genel Bakış' ? '/portal/dashboard' : link.href;
            const isActive = pathname.startsWith(href) && href !== '#';
            return (<link_1.default key={link.label} href={href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? link.label : undefined}>
                                    <link.icon className="h-4 w-4 flex-shrink-0"/>
                                    {!isCollapsed && <span className="truncate">{link.label}</span>}
                                </link_1.default>);
        })}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                        <link_1.default href="/" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Siteye Dön" : undefined}>
                            <lucide_react_1.Globe className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Siteye Dön"}
                        </link_1.default>
                         <link_1.default href="#" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Ayarlar" : undefined}>
                            <lucide_react_1.Settings className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Ayarlar"}
                        </link_1.default>
                    </nav>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=collapsible-portal-sidebar.js.map