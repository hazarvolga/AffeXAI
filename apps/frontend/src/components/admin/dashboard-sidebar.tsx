'use client'

import Link from "next/link";
import { Package2, Home, Users, LineChart, Bell, Settings, Calendar, LifeBuoy, Bot, Globe, Award, ShieldCheck, FileText, Send, Share2, Layers, Palette, BookOpen, Wand2, Brain, TrendingUp, BarChart3, Map, FlaskConical, Database, Mail, FolderTree } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission, UserRole } from "@/lib/permissions/constants";

const navLinks = [
    { href: "/admin", label: "Genel Bakış", icon: Home, permission: null }, // Everyone can see dashboard
    { href: "/admin/crm", label: "CRM Yönetimi", icon: Database, permission: null }, // Admin only (will check in component)
    { href: "/admin/social-media", label: "Sosyal Medya", icon: Share2, permission: Permission.SOCIAL_MEDIA_VIEW },
    { href: "/admin/notifications", label: "Bildirimler", icon: Bell, permission: Permission.NOTIFICATIONS_VIEW },
    { href: "/admin/logs", label: "Aktivite Kayıtları", icon: LineChart, permission: Permission.LOGS_VIEW },
];

const certificatesLinks = [
    { href: "/admin/certificates", label: "Sertifika Listesi", icon: Award },
    { href: "/admin/certificates/email-templates", label: "Email Şablonları", icon: Mail },
];

const eventsLinks = [
    { href: "/admin/events", label: "Etkinlik Listesi", icon: Calendar },
    { href: "/admin/events/email-templates", label: "Email Şablonları", icon: Mail },
];

const emailMarketingLinks = [
    { href: "/admin/email-marketing", label: "Genel Bakış" },
    { href: "/admin/email-marketing/campaigns", label: "Kampanyalar" },
    { href: "/admin/email-marketing/templates", label: "Şablonlar" },
    { href: "/admin/email-marketing/templates/builder", label: "Email Builder", icon: Palette },
    { href: "/admin/email-marketing/email-templates", label: "Email Şablonları", icon: Mail },
    { href: "/admin/email-marketing/subscribers", label: "Aboneler" },
    { href: "/admin/email-marketing/analytics", label: "Analytics" },
    { href: "/admin/email-marketing/automations", label: "Otomasyonlar" },
];


const supportLinks = [
    { href: "/admin/support", label: "Ticket Listesi", icon: LifeBuoy },
    { href: "/admin/support/categories", label: "Ticket Categories", icon: FolderTree },
    { href: "/admin/support/analytics", label: "Raporlar & Analiz", icon: TrendingUp },
    { href: "/admin/support/templates", label: "Ticket Şablonları", icon: FileText },
    { href: "/admin/support/email-templates", label: "Email Şablonları", icon: Mail },
    { href: "/admin/support/knowledge-base", label: "Bilgi Bankası", icon: BookOpen },
    { href: "/admin/support/macros", label: "Makro Yönetimi", icon: Wand2 },
    { href: "/admin/support/ai-insights", label: "AI Insights", icon: Brain },
];

const formBuilderLinks = [
    { href: "/admin/form-builder", label: "Genel Bakış", icon: FileText },
    { href: "/admin/form-builder/forms", label: "Form Yönetimi", icon: FileText },
    { href: "/admin/form-builder/submissions", label: "Gönderiler", icon: Send },
];

const userManagementLinks = [
    { href: "/admin/users", label: "Kullanıcı Listesi", icon: Users },
    { href: "/admin/users/roles", label: "Roller ve İzinler", icon: ShieldCheck },
    { href: "/admin/users/email-templates", label: "Email Şablonları", icon: Mail },
]

const settingsLinks = [
    { href: "/admin/settings/site", label: "Site Ayarları", icon: Settings },
    { href: "/admin/settings/automation", label: "Otomasyon Merkezi", icon: Bot },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { hasPermission, hasAnyPermission, isLoading, permissions, userRole, isAdmin, isSupportManager } = usePermissions();

    // DEBUG: Log permission state
    console.log('🎯 DashboardSidebar render:', {
        isLoading,
        userRole,
        isAdmin,
        isSupportManager,
        permissionsCount: permissions.length,
        hasEmailView: hasPermission(Permission.EMAIL_VIEW),
    });

    const isNavLinkActive = (href: string) => {
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
    }

    return (
        <div className="hidden border-r bg-background sm:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6 text-primary" />
                        <span className="">Aluplan Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navLinks.map(link => {
                             // Permission check: Show only if user has permission OR no permission required
                             if (link.permission && !hasPermission(link.permission)) {
                                 return null;
                             }
                             
                             const isActive = isNavLinkActive(link.href);
                             return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                        isActive && "bg-muted text-primary"
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                             )
                        })}
                         <Accordion type="multiple" className="w-full">
                             {/* Email Marketing - Permission: EMAIL_VIEW */}
                             {hasPermission(Permission.EMAIL_VIEW) && (
                             <AccordionItem value="email-marketing" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/email-marketing') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Send className="h-4 w-4" />
                                        Email Marketing
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {emailMarketingLinks.map(link => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                {Icon && <Icon className="h-3 w-3" />}
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                             {/* Support System - Permission: TICKETS_VIEW_ALL */}
                             {hasAnyPermission([Permission.TICKETS_VIEW_ALL, Permission.TICKETS_VIEW_OWN]) && (
                             <AccordionItem value="support-system" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/support') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <LifeBuoy className="h-4 w-4" />
                                        Destek Merkezi
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {supportLinks.map(link => {
                                        // Form Management and Categories are only visible to Admin and Support Manager
                                        if (link.href === '/admin/support/forms' || link.href === '/admin/support/categories') {
                                            console.log('🔍 Admin-only link visibility:', { href: link.href, isAdmin, isSupportManager, shouldShow: isAdmin || isSupportManager });
                                            if (!isAdmin && !isSupportManager) {
                                                return null;
                                            }
                                        }

                                        const isActive = pathname === link.href;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                <link.icon className="h-3 w-3" />
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                             {/* Form Builder - Admin and Support Manager only */}
                             {(isAdmin || isSupportManager) && (
                             <AccordionItem value="form-builder" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/form-builder') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Layers className="h-4 w-4" />
                                        Form Builder
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {formBuilderLinks.map(link => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                <Icon className="h-3 w-3" />
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                             {/* Certificates - Permission: CERTIFICATES_VIEW */}
                             {hasPermission(Permission.CERTIFICATES_VIEW) && (
                             <AccordionItem value="certificates" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/certificates') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Award className="h-4 w-4" />
                                        Sertifikalar
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {certificatesLinks.map(link => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                <Icon className="h-3 w-3" />
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                             {/* Events - Permission: EVENTS_VIEW */}
                             {hasPermission(Permission.EVENTS_VIEW) && (
                             <AccordionItem value="events" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/events') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4" />
                                        Etkinlikler
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {eventsLinks.map(link => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                <Icon className="h-3 w-3" />
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                             {/* User Management - Permission: USERS_VIEW */}
                             {hasPermission(Permission.USERS_VIEW) && (
                             <AccordionItem value="user-management" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    (pathname.startsWith('/admin/users') || pathname.startsWith('/admin/roles')) && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-4 w-4" />
                                        Kullanıcı Yönetimi
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {userManagementLinks.map(link => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
                                                {Icon && <Icon className="h-3 w-3" />}
                                                {link.label}
                                            </Link>
                                        )
                                    })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                             )}

                            {/* CMS Management - Permission: CMS_VIEW */}
                            {hasPermission(Permission.CMS_VIEW) && (
                            <AccordionItem value="cms-management" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/cms') && !pathname.startsWith('/admin/cms/analytics') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4" />
                                        CMS Yönetimi
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        <Link
                                            href="/admin/cms"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms" && "bg-muted text-primary"
                                            )}
                                        >
                                            Sayfalar
                                        </Link>
                                        <Link
                                            href="/admin/cms/categories"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms/categories" && "bg-muted text-primary"
                                            )}
                                        >
                                            Kategoriler
                                        </Link>
                                        <Link
                                            href="/admin/cms/menus"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms/menus" && "bg-muted text-primary"
                                            )}
                                        >
                                            Menüler
                                        </Link>
                                        <Link
                                            href="/admin/cms/editor"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms/editor" && "bg-muted text-primary"
                                            )}
                                        >
                                            Görsel Editör
                                        </Link>
                                        <Link
                                            href="/admin/cms/media"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms/media" && "bg-muted text-primary"
                                            )}
                                        >
                                            Medya Yönetimi
                                        </Link>
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                            )}

                            {/* CMS Analytics - Permission: CMS_VIEW */}
                            {(() => {
                                const hasCmsView = hasPermission(Permission.CMS_VIEW);
                                console.log('🎯 CMS Analytics visibility check:', {
                                    hasCmsView,
                                    userRole,
                                    allPermissions: permissions,
                                    permissionsCount: permissions.length,
                                    specificCheck: permissions.includes(Permission.CMS_VIEW),
                                    CMS_VIEW_VALUE: Permission.CMS_VIEW
                                });
                                // TEMPORARY: Always show for debugging
                                return true; // hasCmsView;
                            })() && (
                            <AccordionItem value="cms-analytics" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/cms/analytics') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="h-4 w-4" />
                                        CMS Analytics
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        <Link
                                            href="/admin/cms/analytics"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                pathname === "/admin/cms/analytics" && "bg-muted text-primary"
                                            )}
                                        >
                                            <TrendingUp className="h-3 w-3" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/admin/cms/analytics/heatmaps"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                pathname === "/admin/cms/analytics/heatmaps" && "bg-muted text-primary"
                                            )}
                                        >
                                            <Map className="h-3 w-3" />
                                            Heatmaps
                                        </Link>
                                        <Link
                                            href="/admin/cms/analytics/ab-tests"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xs",
                                                pathname === "/admin/cms/analytics/ab-tests" && "bg-muted text-primary"
                                            )}
                                        >
                                            <FlaskConical className="h-3 w-3" />
                                            A/B Tests
                                        </Link>
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                            )}
                        </Accordion>
                        {/* Design System - Permission: DESIGN_VIEW */}
                        {hasPermission(Permission.DESIGN_VIEW) && (
                        <Link
                            href="/admin/design"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/design') && "bg-muted text-primary"
                            )}
                        >
                            <Palette className="h-4 w-4" />
                            Design
                        </Link>
                        )}
                        {/* Settings - Permission: SETTINGS_VIEW */}
                        {hasPermission(Permission.SETTINGS_VIEW) && (
                        <Accordion type="single" collapsible defaultValue={pathname.startsWith('/admin/settings') ? 'settings-management' : undefined}>
                            <AccordionItem value="settings-management" className="border-none">
                                <AccordionTrigger
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                        pathname.startsWith('/admin/settings') && "bg-muted text-primary"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Settings className="h-4 w-4" />
                                        Ayarlar
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                        {settingsLinks.map(link => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                        isActive && "bg-muted text-primary"
                                                    )}
                                                >
                                                    <link.icon className="h-4 w-4" />
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        )}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Settings className="h-4 w-4" />
                                <span className="text-sm">Tema</span>
                            </div>
                            <ThemeToggle />
                        </div>
                        
                         <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Globe className="h-4 w-4" />
                            Siteye Dön
                        </Link>
                         <Link
                            href="/admin/dev-docs"
                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/dev-docs') && "bg-muted text-primary"
                            )}
                        >
                            <ShieldCheck className="h-4 w-4" />
                            Developer Docs
                        </Link>
                        <Link
                            href="/admin/blueprint"
                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/blueprint') && "bg-muted text-primary"
                            )}
                        >
                            <Layers className="h-4 w-4" />
                            Blueprint
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}