"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsibleDashboardSidebar = CollapsibleDashboardSidebar;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const accordion_1 = require("../ui/accordion");
const theme_toggle_1 = require("@/components/common/theme-toggle");
const usePermissions_1 = require("@/hooks/usePermissions");
const constants_1 = require("@/lib/permissions/constants");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
const navLinks = [
    { href: "/admin", label: "Genel Bakış", icon: lucide_react_1.Home, permission: null }, // Everyone can see dashboard
    { href: "/admin/events", label: "Etkinlikler", icon: lucide_react_1.Calendar, permission: constants_1.Permission.EVENTS_VIEW },
    { href: "/admin/certificates", label: "Sertifikalar", icon: lucide_react_1.Award, permission: constants_1.Permission.CERTIFICATES_VIEW },
    { href: "/admin/social-media", label: "Sosyal Medya", icon: lucide_react_1.Share2, permission: constants_1.Permission.SOCIAL_MEDIA_VIEW },
    { href: "/admin/notifications", label: "Bildirimler", icon: lucide_react_1.Bell, permission: constants_1.Permission.NOTIFICATIONS_VIEW },
    { href: "/admin/ai-settings", label: "AI Ayarları", icon: lucide_react_1.Bot, permission: constants_1.Permission.SETTINGS_VIEW },
    { href: "/admin/logs", label: "Aktivite Kayıtları", icon: lucide_react_1.LineChart, permission: constants_1.Permission.LOGS_VIEW },
];
const emailMarketingLinks = [
    { href: "/admin/email-marketing", label: "Genel Bakış" },
    { href: "/admin/email-marketing/campaigns", label: "Kampanyalar" },
    { href: "/admin/email-marketing/templates", label: "Şablonlar" },
    { href: "/admin/email-marketing/subscribers", label: "Aboneler" },
    { href: "/admin/email-marketing/analytics", label: "Analytics" },
    { href: "/admin/email-marketing/automations", label: "Otomasyonlar" },
];
const supportLinks = [
    { href: "/admin/support", label: "Ticket Listesi", icon: lucide_react_1.LifeBuoy },
    { href: "/admin/support/analytics", label: "Raporlar & Analiz", icon: lucide_react_1.TrendingUp },
    { href: "/admin/support/templates", label: "Ticket Şablonları", icon: lucide_react_1.FileText },
    { href: "/admin/support/knowledge-base", label: "Bilgi Bankası", icon: lucide_react_1.BookOpen },
    { href: "/admin/support/macros", label: "Makro Yönetimi", icon: lucide_react_1.Wand2 },
    { href: "/admin/support/ai-insights", label: "AI Insights", icon: lucide_react_1.Brain },
];
const faqLearningLinks = [
    { href: "/admin/support/faq-learning", label: "Dashboard", icon: lucide_react_1.Home },
    { href: "/admin/support/faq-learning/review", label: "İnceleme Kuyruğu", icon: lucide_react_1.FileText },
    { href: "/admin/support/faq-learning/providers", label: "AI Sağlayıcılar", icon: lucide_react_1.Bot },
    { href: "/admin/support/faq-learning/settings", label: "Ayarlar", icon: lucide_react_1.Settings },
];
const userManagementLinks = [
    { href: "/admin/users", label: "Kullanıcı Listesi" },
    { href: "/admin/users/roles", label: "Roller ve İzinler" },
];
const settingsLinks = [
    { href: "/admin/settings/site", label: "Site Ayarları", icon: lucide_react_1.Settings },
    { href: "/admin/settings/automation", label: "Otomasyon Merkezi", icon: lucide_react_1.Bot },
];
function CollapsibleDashboardSidebar() {
    const pathname = (0, navigation_1.usePathname)();
    const { hasPermission, hasAnyPermission, isLoading, permissions, userRole } = (0, usePermissions_1.usePermissions)();
    // Collapsible state with localStorage
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)(false);
    // Load collapse state from localStorage on mount
    (0, react_1.useEffect)(() => {
        const stored = localStorage.getItem('admin-sidebar-collapsed');
        if (stored !== null) {
            setIsCollapsed(stored === 'true');
        }
    }, []);
    // Save collapse state to localStorage
    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('admin-sidebar-collapsed', String(newState));
    };
    // DEBUG: Log permission state
    console.log('🎯 DashboardSidebar render:', {
        isLoading,
        userRole,
        permissionsCount: permissions.length,
        hasEmailView: hasPermission(constants_1.Permission.EMAIL_VIEW),
    });
    const isNavLinkActive = (href) => {
        if (href === "/admin") {
            return pathname === href;
        }
        if (href.includes('cms')) {
            return pathname.startsWith('/admin/cms');
        }
        if (href.includes('email-marketing')) {
            return pathname.startsWith('/admin/email-marketing');
        }
        if (href.includes('social-media')) {
            return pathname.startsWith('/admin/social-media');
        }
        return pathname.startsWith(href);
    };
    return (<div className={(0, utils_1.cn)("hidden border-r bg-background sm:block sticky top-0 h-screen transition-all duration-300 ease-in-out", isCollapsed ? "w-[60px]" : "w-[220px] lg:w-[280px]")}>
            <div className="flex h-full max-h-screen flex-col gap-2 relative">
                {/* Header with Logo */}
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
                    <link_1.default href="/admin" className="flex items-center gap-2 font-semibold">
                        <lucide_react_1.Package2 className="h-6 w-6 text-primary flex-shrink-0"/>
                        {!isCollapsed && <span className="truncate">Aluplan Admin</span>}
                    </link_1.default>
                </div>

                {/* Collapse Toggle Button */}
                <button_1.Button variant="ghost" size="icon" onClick={toggleCollapse} className="absolute -right-3 top-16 z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent" title={isCollapsed ? "Genişlet" : "Daralt"}>
                    {isCollapsed ? (<lucide_react_1.ChevronRight className="h-4 w-4"/>) : (<lucide_react_1.ChevronLeft className="h-4 w-4"/>)}
                </button_1.Button>

                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navLinks.map(link => {
            // Permission check: Show only if user has permission OR no permission required
            if (link.permission && !hasPermission(link.permission)) {
                return null;
            }
            const isActive = isNavLinkActive(link.href);
            return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? link.label : undefined}>
                                    <link.icon className="h-4 w-4 flex-shrink-0"/>
                                    {!isCollapsed && <span className="truncate">{link.label}</span>}
                                </link_1.default>);
        })}

                        {/* Show accordions only when not collapsed */}
                        {!isCollapsed && (<accordion_1.Accordion type="multiple" className="w-full">
                             {/* Email Marketing - Permission: EMAIL_VIEW */}
                             {hasPermission(constants_1.Permission.EMAIL_VIEW) && (<accordion_1.AccordionItem value="email-marketing" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/email-marketing') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.Send className="h-4 w-4 flex-shrink-0"/>
                                        <span className="truncate">Email Marketing</span>
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {emailMarketingLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}>
                                                {link.label}
                                            </link_1.default>);
                })}
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}

                             {/* Support System - Permission: TICKETS_VIEW_ALL */}
                             {hasAnyPermission([constants_1.Permission.TICKETS_VIEW_ALL, constants_1.Permission.TICKETS_VIEW_OWN]) && (<accordion_1.AccordionItem value="support-system" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/support') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.LifeBuoy className="h-4 w-4"/>
                                        Destek Merkezi
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {supportLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs", isActive && "bg-muted text-primary")}>
                                                <link.icon className="h-3 w-3"/>
                                                {link.label}
                                            </link_1.default>);
                })}
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}

                             {/* FAQ Learning System - Permission: TICKETS_VIEW_ALL */}
                             {hasAnyPermission([constants_1.Permission.TICKETS_VIEW_ALL, constants_1.Permission.TICKETS_VIEW_OWN]) && (<accordion_1.AccordionItem value="faq-learning" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/support/faq-learning') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.Brain className="h-4 w-4"/>
                                        FAQ Öğrenme Sistemi
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {faqLearningLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs", isActive && "bg-muted text-primary")}>
                                                <link.icon className="h-3 w-3"/>
                                                {link.label}
                                            </link_1.default>);
                })}
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}

                             {/* User Management - Permission: USERS_VIEW */}
                             {hasPermission(constants_1.Permission.USERS_VIEW) && (<accordion_1.AccordionItem value="user-management" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", (pathname.startsWith('/admin/users') || pathname.startsWith('/admin/roles')) && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.Users className="h-4 w-4"/>
                                        Kullanıcı Yönetimi
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {userManagementLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}>
                                                {link.label}
                                            </link_1.default>);
                })}
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}

                            {/* CMS Management - Permission: CMS_VIEW */}
                            {hasPermission(constants_1.Permission.CMS_VIEW) && (<accordion_1.AccordionItem value="cms-management" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/cms') && !pathname.startsWith('/admin/cms/analytics') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.FileText className="h-4 w-4"/>
                                        CMS Yönetimi
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        <link_1.default href="/admin/cms" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms" && "bg-muted text-primary")}>
                                            Sayfalar
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/categories" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/categories" && "bg-muted text-primary")}>
                                            Kategoriler
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/menus" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/menus" && "bg-muted text-primary")}>
                                            Menüler
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/editor" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/editor" && "bg-muted text-primary")}>
                                            Görsel Editör
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/templates" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/templates" && "bg-muted text-primary")}>
                                            <lucide_react_1.FileStack className="h-3 w-3"/>
                                            Şablonlar
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/media" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/media" && "bg-muted text-primary")}>
                                            Medya Yönetimi
                                        </link_1.default>
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}

                            {/* CMS Analytics - Permission: CMS_VIEW */}
                            {hasPermission(constants_1.Permission.CMS_VIEW) && !isCollapsed && (<accordion_1.AccordionItem value="cms-analytics" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/cms/analytics') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.BarChart3 className="h-4 w-4"/>
                                        CMS Analytics
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        <link_1.default href="/admin/cms/analytics" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs", pathname === "/admin/cms/analytics" && "bg-muted text-primary")}>
                                            <lucide_react_1.TrendingUp className="h-3 w-3"/>
                                            Dashboard
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/analytics/heatmaps" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs", pathname === "/admin/cms/analytics/heatmaps" && "bg-muted text-primary")}>
                                            <lucide_react_1.Map className="h-3 w-3"/>
                                            Heatmaps
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/analytics/ab-tests" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs", pathname === "/admin/cms/analytics/ab-tests" && "bg-muted text-primary")}>
                                            <lucide_react_1.FlaskConical className="h-3 w-3"/>
                                            A/B Tests
                                        </link_1.default>
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>)}
                        </accordion_1.Accordion>)}

                        {/* Design System - Permission: DESIGN_VIEW */}
                        {hasPermission(constants_1.Permission.DESIGN_VIEW) && (<link_1.default href="/admin/design" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/design') && "bg-muted text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Design" : undefined}>
                            <lucide_react_1.Palette className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Design"}
                        </link_1.default>)}

                        {/* Settings - Permission: SETTINGS_VIEW */}
                        {hasPermission(constants_1.Permission.SETTINGS_VIEW) && !isCollapsed && (<accordion_1.Accordion type="single" collapsible defaultValue={pathname.startsWith('/admin/settings') ? 'settings-management' : undefined}>
                            <accordion_1.AccordionItem value="settings-management" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/settings') && "bg-muted text-primary")}>
                                    <div className="flex items-center gap-3">
                                        <lucide_react_1.Settings className="h-4 w-4"/>
                                        Ayarlar
                                    </div>
                                </accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        {settingsLinks.map(link => {
                const isActive = pathname === link.href;
                return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}>
                                                    <link.icon className="h-4 w-4"/>
                                                    {link.label}
                                                </link_1.default>);
            })}
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>
                        </accordion_1.Accordion>)}

                        {/* Settings icon-only when collapsed */}
                        {hasPermission(constants_1.Permission.SETTINGS_VIEW) && isCollapsed && (<link_1.default href="/admin/settings" className={(0, utils_1.cn)("flex items-center justify-center rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/settings') && "bg-muted text-primary")} title="Ayarlar">
                                <lucide_react_1.Settings className="h-4 w-4"/>
                            </link_1.default>)}
                    </nav>
                </div>

                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                        {/* Theme Toggle */}
                        {!isCollapsed ? (<div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground">
                                <div className="flex items-center gap-3">
                                    <lucide_react_1.Settings className="h-4 w-4"/>
                                    <span className="text-sm">Tema</span>
                                </div>
                                <theme_toggle_1.ThemeToggle />
                            </div>) : (<div className="flex justify-center py-2">
                                <theme_toggle_1.ThemeToggle />
                            </div>)}

                         <link_1.default href="/" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Siteye Dön" : undefined}>
                            <lucide_react_1.Globe className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Siteye Dön"}
                        </link_1.default>
                         <link_1.default href="/admin/dev-docs" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/dev-docs') && "bg-muted text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Developer Docs" : undefined}>
                            <lucide_react_1.ShieldCheck className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Developer Docs"}
                        </link_1.default>
                        <link_1.default href="/admin/blueprint" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/blueprint') && "bg-muted text-primary", isCollapsed && "justify-center px-2")} title={isCollapsed ? "Blueprint" : undefined}>
                            <lucide_react_1.Layers className="h-4 w-4 flex-shrink-0"/>
                            {!isCollapsed && "Blueprint"}
                        </link_1.default>
                    </nav>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=collapsible-sidebar.js.map