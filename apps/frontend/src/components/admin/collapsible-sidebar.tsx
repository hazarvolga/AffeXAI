'use client'

import Link from "next/link";
import { Package2, Home, Users, LineChart, Bell, Settings, Calendar, LifeBuoy, Bot, Globe, Award, ShieldCheck, FileText, Send, Share2, Layers, Palette, BookOpen, Wand2, Brain, TrendingUp, ChevronLeft, ChevronRight, BarChart3, Map, FlaskConical, FileStack } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission } from "@/lib/permissions/constants";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const navLinks = [
    { href: "/admin", label: "Genel Bakış", icon: Home, permission: null }, // Everyone can see dashboard
    { href: "/admin/events", label: "Etkinlikler", icon: Calendar, permission: Permission.EVENTS_VIEW },
    { href: "/admin/certificates", label: "Sertifikalar", icon: Award, permission: Permission.CERTIFICATES_VIEW },
    { href: "/admin/social-media", label: "Sosyal Medya", icon: Share2, permission: Permission.SOCIAL_MEDIA_VIEW },
    { href: "/admin/notifications", label: "Bildirimler", icon: Bell, permission: Permission.NOTIFICATIONS_VIEW },
    { href: "/admin/ai-settings", label: "AI Ayarları", icon: Bot, permission: Permission.SETTINGS_VIEW },
    { href: "/admin/logs", label: "Aktivite Kayıtları", icon: LineChart, permission: Permission.LOGS_VIEW },
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
    { href: "/admin/support", label: "Ticket Listesi", icon: LifeBuoy },
    { href: "/admin/support/analytics", label: "Raporlar & Analiz", icon: TrendingUp },
    { href: "/admin/support/templates", label: "Ticket Şablonları", icon: FileText },
    { href: "/admin/support/knowledge-base", label: "Bilgi Bankası", icon: BookOpen },
    { href: "/admin/support/macros", label: "Makro Yönetimi", icon: Wand2 },
    { href: "/admin/support/ai-insights", label: "AI Insights", icon: Brain },
];

const faqLearningLinks = [
    { href: "/admin/support/faq-learning", label: "Dashboard", icon: Home },
    { href: "/admin/support/faq-learning/review", label: "İnceleme Kuyruğu", icon: FileText },
    { href: "/admin/support/faq-learning/providers", label: "AI Sağlayıcılar", icon: Bot },
    { href: "/admin/support/faq-learning/settings", label: "Ayarlar", icon: Settings },
];

const userManagementLinks = [
    { href: "/admin/users", label: "Kullanıcı Listesi"},
    { href: "/admin/users/roles", label: "Roller ve İzinler"},
]

const settingsLinks = [
    { href: "/admin/settings/site", label: "Site Ayarları", icon: Settings },
    { href: "/admin/settings/automation", label: "Otomasyon Merkezi", icon: Bot },
];

export function CollapsibleDashboardSidebar() {
    const pathname = usePathname();
    const { hasPermission, hasAnyPermission, isLoading, permissions, userRole } = usePermissions();

    // Collapsible state with localStorage
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Load collapse state from localStorage on mount
    useEffect(() => {
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
    };

    return (
        <div className={cn(
            "hidden border-r bg-background sm:block sticky top-0 h-screen transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[60px]" : "w-[220px] lg:w-[280px]"
        )}>
            <div className="flex h-full max-h-screen flex-col gap-2 relative">
                {/* Header with Logo */}
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6 text-primary flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">Aluplan Admin</span>}
                    </Link>
                </div>

                {/* Collapse Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleCollapse}
                    className="absolute -right-3 top-16 z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent"
                    title={isCollapsed ? "Genişlet" : "Daralt"}
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>

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
                                        isActive && "bg-muted text-primary",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                    title={isCollapsed ? link.label : undefined}
                                >
                                    <link.icon className="h-4 w-4 flex-shrink-0" />
                                    {!isCollapsed && <span className="truncate">{link.label}</span>}
                                </Link>
                             )
                        })}

                        {/* Show accordions only when not collapsed */}
                        {!isCollapsed && (
                         <Accordion type="multiple" className="w-full">
                             {/* Email Marketing - Permission: EMAIL_VIEW */}
                             {hasPermission(Permission.EMAIL_VIEW) && (
                             <AccordionItem value="email-marketing" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/email-marketing') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Send className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">Email Marketing</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {emailMarketingLinks.map(link => {
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

                             {/* FAQ Learning System - Permission: TICKETS_VIEW_ALL */}
                             {hasAnyPermission([Permission.TICKETS_VIEW_ALL, Permission.TICKETS_VIEW_OWN]) && (
                             <AccordionItem value="faq-learning" className="border-none">
                                <AccordionTrigger className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                                    pathname.startsWith('/admin/support/faq-learning') && "bg-muted text-primary"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Brain className="h-4 w-4" />
                                        FAQ Öğrenme Sistemi
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8 pt-1">
                                    <nav className="grid gap-1">
                                    {faqLearningLinks.map(link => {
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
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                    isActive && "bg-muted text-primary"
                                                )}
                                            >
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
                                            href="/admin/cms/templates"
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                                pathname === "/admin/cms/templates" && "bg-muted text-primary"
                                            )}
                                        >
                                            <FileStack className="h-3 w-3" />
                                            Şablonlar
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
                            {hasPermission(Permission.CMS_VIEW) && !isCollapsed && (
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
                        )}

                        {/* Design System - Permission: DESIGN_VIEW */}
                        {hasPermission(Permission.DESIGN_VIEW) && (
                        <Link
                            href="/admin/design"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/design') && "bg-muted text-primary",
                                isCollapsed && "justify-center px-2"
                            )}
                            title={isCollapsed ? "Design" : undefined}
                        >
                            <Palette className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && "Design"}
                        </Link>
                        )}

                        {/* Settings - Permission: SETTINGS_VIEW */}
                        {hasPermission(Permission.SETTINGS_VIEW) && !isCollapsed && (
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

                        {/* Settings icon-only when collapsed */}
                        {hasPermission(Permission.SETTINGS_VIEW) && isCollapsed && (
                            <Link
                                href="/admin/settings"
                                className={cn(
                                    "flex items-center justify-center rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname.startsWith('/admin/settings') && "bg-muted text-primary"
                                )}
                                title="Ayarlar"
                            >
                                <Settings className="h-4 w-4" />
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                        {/* Theme Toggle */}
                        {!isCollapsed ? (
                            <div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground">
                                <div className="flex items-center gap-3">
                                    <Settings className="h-4 w-4" />
                                    <span className="text-sm">Tema</span>
                                </div>
                                <ThemeToggle />
                            </div>
                        ) : (
                            <div className="flex justify-center py-2">
                                <ThemeToggle />
                            </div>
                        )}

                         <Link
                            href="/"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                isCollapsed && "justify-center px-2"
                            )}
                            title={isCollapsed ? "Siteye Dön" : undefined}
                        >
                            <Globe className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && "Siteye Dön"}
                        </Link>
                         <Link
                            href="/admin/dev-docs"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/dev-docs') && "bg-muted text-primary",
                                isCollapsed && "justify-center px-2"
                            )}
                            title={isCollapsed ? "Developer Docs" : undefined}
                        >
                            <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && "Developer Docs"}
                        </Link>
                        <Link
                            href="/admin/blueprint"
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                pathname.startsWith('/admin/blueprint') && "bg-muted text-primary",
                                isCollapsed && "justify-center px-2"
                            )}
                            title={isCollapsed ? "Blueprint" : undefined}
                        >
                            <Layers className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && "Blueprint"}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
