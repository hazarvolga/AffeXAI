"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSidebar = DashboardSidebar;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const accordion_1 = require("../ui/accordion");
const navLinks = [
    { href: "/admin", label: "Genel Bakış", icon: lucide_react_1.Home },
    { href: "/admin/events", label: "Etkinlikler", icon: lucide_react_1.Calendar },
    { href: "/admin/certificates", label: "Sertifikalar", icon: lucide_react_1.Award },
    { href: "/admin/newsletter", label: "Email Marketing", icon: lucide_react_1.Send },
    { href: "/admin/social-media", label: "Sosyal Medya", icon: lucide_react_1.Share2 },
    { href: "/admin/support", label: "Destek Merkezi", icon: lucide_react_1.LifeBuoy },
    { href: "/admin/notifications", label: "Bildirimler", icon: lucide_react_1.Bell },
    { href: "/admin/logs", label: "Aktivite Kayıtları", icon: lucide_react_1.LineChart },
];
const userManagementLinks = [
    { href: "/admin/users", label: "Kullanıcı Listesi" },
    { href: "/admin/users/roles", label: "Roller ve İzinler" },
];
function DashboardSidebar() {
    const pathname = (0, navigation_1.usePathname)();
    const isNavLinkActive = (href) => {
        if (href === "/admin") {
            return pathname === href;
        }
        if (href.includes('cms')) {
            return pathname.startsWith('/admin/cms');
        }
        if (href.includes('newsletter')) {
            return pathname.startsWith('/admin/newsletter');
        }
        if (href.includes('social-media')) {
            return pathname.startsWith('/admin/social-media');
        }
        return pathname.startsWith(href);
    };
    return (<div className="hidden border-r bg-background sm:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <link_1.default href="/admin" className="flex items-center gap-2 font-semibold">
                        <lucide_react_1.Package2 className="h-6 w-6 text-primary"/>
                        <span className="">Aluplan Admin</span>
                    </link_1.default>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navLinks.map(link => {
            const isActive = isNavLinkActive(link.href);
            return (<link_1.default key={link.href} href={link.href} className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", isActive && "bg-muted text-primary")}>
                                    <link.icon className="h-4 w-4"/>
                                    {link.label}
                                </link_1.default>);
        })}
                         <accordion_1.Accordion type="multiple" className="w-full">
                             <accordion_1.AccordionItem value="user-management" className="border-none">
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
                            </accordion_1.AccordionItem>
                            
                            <accordion_1.AccordionItem value="cms-management" className="border-none">
                                <accordion_1.AccordionTrigger className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline", pathname.startsWith('/admin/cms') && "bg-muted text-primary")}>
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
                                        <link_1.default href="/admin/cms/editor" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/editor" && "bg-muted text-primary")}>
                                            Görsel Editör
                                        </link_1.default>
                                        <link_1.default href="/admin/cms/media" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname === "/admin/cms/media" && "bg-muted text-primary")}>
                                            Medya Yönetimi
                                        </link_1.default>
                                    </nav>
                                </accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>
                        </accordion_1.Accordion>
                         <link_1.default href="/admin/settings/site" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/settings') && "bg-muted text-primary")}>
                            <lucide_react_1.Settings className="h-4 w-4"/>
                            Ayarlar
                        </link_1.default>
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <nav className="grid gap-1">
                         <link_1.default href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <lucide_react_1.Globe className="h-4 w-4"/>
                            Siteye Dön
                        </link_1.default>
                         <link_1.default href="/admin/dev-docs" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/dev-docs') && "bg-muted text-primary")}>
                            <lucide_react_1.ShieldCheck className="h-4 w-4"/>
                            Developer Docs
                        </link_1.default>
                        <link_1.default href="/admin/blueprint" className={(0, utils_1.cn)("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith('/admin/blueprint') && "bg-muted text-primary")}>
                            <lucide_react_1.Layers className="h-4 w-4"/>
                            Blueprint
                        </link_1.default>
                    </nav>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=dashboard-sidebar.js.map