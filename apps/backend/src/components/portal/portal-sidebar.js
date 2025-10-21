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
    { href: "/portal/dashboard", icon: lucide_react_1.Home, label: "Genel Bakış" },
    { href: "/portal/caching-test", icon: lucide_react_1.Zap, label: "Caching Test" },
    { href: "/portal/events", icon: lucide_react_1.Calendar, label: "Etkinliklerim" },
    { href: "/portal/certificates", icon: lucide_react_1.Award, label: "Sertifikalarım" },
    { href: "/portal/support", icon: lucide_react_1.LifeBuoy, label: "Destek Taleplerim" },
    { href: "/portal/kb", icon: lucide_react_1.BookOpen, label: "Bilgi Bankası" },
    { href: "/portal/profile", icon: lucide_react_1.Users, label: "Profilim" },
    { href: "#", icon: lucide_react_1.FileText, label: "Lisanslarım" },
];
const editorHiddenLinks = ['Destek Taleplerim', 'Bilgi Bankası', 'Lisanslarım'];
const viewerHiddenLinks = ['Etkinliklerim', 'Sertifikalarım', 'Destek Taleplerim', 'Bilgi Bankası', 'Lisanslarım'];
function PortalSidebar({ role }) {
    const pathname = (0, navigation_1.usePathname)();
    // Determine which links to show based on the role
    const navLinks = allNavLinks.filter(link => {
        if (role === 'Editor') {
            return !editorHiddenLinks.includes(link.label);
        }
        if (role === 'Viewer') {
            return !viewerHiddenLinks.includes(link.label);
        }
        // Add more role-based filtering logic here if needed for other roles
        // e.g., if (role === 'Support Team') { ... }
        return true; // Show all links by default for other roles
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