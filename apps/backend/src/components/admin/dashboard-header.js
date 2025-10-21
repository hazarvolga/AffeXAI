"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardHeader = DashboardHeader;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const sheet_1 = require("@/components/ui/sheet");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const breadcrumb_1 = require("../ui/breadcrumb");
const navigation_1 = require("next/navigation");
const breadcrumbNameMap = {
    '/admin': 'Genel Bakış',
    '/admin/users': 'Kullanıcılar',
    '/admin/users/new': 'Yeni Kullanıcı',
    '/admin/notifications': 'Bildirimler',
    '/admin/logs': 'Aktivite Kayıtları',
    '/admin/events': 'Etkinlikler',
    '/admin/events/new': 'Yeni Etkinlik',
    '/admin/optimize-casestudy': 'SEO Optimizasyonu',
    '/admin/support': 'Destek Paneli',
    '/admin/support/new': 'Yeni Destek Talebi',
    '/admin/support/categories': 'Destek Kategorileri',
    '/admin/certificates': 'Sertifikalar',
    '/admin/certificates/new': 'Yeni Sertifika',
    '/admin/cms/pages': 'Sayfa Yönetimi',
    '/admin/cms/menus': 'Menü Yönetimi',
    '/admin/cms/pages/new': 'Yeni Sayfa',
    '/admin/social-media': 'Sosyal Medya Paneli',
    '/admin/social-media/composer': 'Yeni Gönderi Oluştur',
    '/admin/newsletter': 'Email Marketing',
    '/admin/newsletter/subscribers': 'Aboneler',
    '/admin/newsletter/subscribers/import': 'Toplu İçe Aktar',
    '/admin/newsletter/campaigns': 'Kampanyalar',
    '/admin/newsletter/campaigns/new': 'Yeni Kampanya',
    '/admin/newsletter/groups': 'Gruplar',
    '/admin/newsletter/segments': 'Segmentler',
    '/admin/dev-docs': 'Developer Docs',
    '/admin/settings': 'Ayarlar',
    '/admin/settings/site': 'Site Ayarları',
};
function DashboardHeader() {
    const pathname = (0, navigation_1.usePathname)();
    const pathSegments = pathname.split('/').filter(Boolean);
    return (<header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <sheet_1.Sheet>
        <sheet_1.SheetTrigger asChild>
          <button_1.Button size="icon" variant="outline" className="sm:hidden">
            <lucide_react_1.PanelLeft className="h-5 w-5"/>
            <span className="sr-only">Toggle Menu</span>
          </button_1.Button>
        </sheet_1.SheetTrigger>
        <sheet_1.SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <link_1.default href="/admin" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <lucide_react_1.Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
              <span className="sr-only">Aluplan Admin</span>
            </link_1.default>
            <link_1.default href="/admin" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Home className="h-5 w-5"/>
              Genel Bakış
            </link_1.default>
             <link_1.default href="/admin/events" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Calendar className="h-5 w-5"/>
              Etkinlikler
            </link_1.default>
             <link_1.default href="/admin/certificates" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Award className="h-5 w-5"/>
              Sertifikalar
            </link_1.default>
             <link_1.default href="/admin/social-media" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <lucide_react_1.Share2 className="h-5 w-5"/>
                Sosyal Medya
            </link_1.default>
             <link_1.default href="/admin/cms/pages" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.FileText className="h-5 w-5"/>
              Sayfa Yönetimi
            </link_1.default>
            <link_1.default href="/admin/users" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Users className="h-5 w-5"/>
              Kullanıcılar
            </link_1.default>
             <link_1.default href="/admin/support" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.LifeBuoy className="h-5 w-5"/>
              Destek Merkezi
            </link_1.default>
             <link_1.default href="/admin/optimize-casestudy" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <lucide_react_1.Bot className="h-5 w-5"/>
                AI Araçları
            </link_1.default>
            <link_1.default href="/admin/notifications" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <lucide_react_1.Bell className="h-5 w-5"/>
              Bildirimler
            </link_1.default>
            <link_1.default href="/admin/logs" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <lucide_react_1.LineChart className="h-5 w-5"/>
                Aktivite Kayıtları
            </link_1.default>
             <link_1.default href="/admin/settings/site" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <lucide_react_1.Settings className="h-5 w-5"/>
                Ayarlar
            </link_1.default>
            <link_1.default href="/admin/dev-docs" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                <lucide_react_1.ShieldCheck className="h-5 w-5"/>
                Developer Docs
            </link_1.default>
          </nav>
        </sheet_1.SheetContent>
      </sheet_1.Sheet>
      <breadcrumb_1.Breadcrumb className="hidden md:flex">
        <breadcrumb_1.BreadcrumbList>
          <breadcrumb_1.BreadcrumbItem>
            <breadcrumb_1.BreadcrumbLink asChild>
              <link_1.default href="/admin">Yönetim Paneli</link_1.default>
            </breadcrumb_1.BreadcrumbLink>
          </breadcrumb_1.BreadcrumbItem>
          {pathSegments.slice(1).map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 2).join('/')}`;
            let name = breadcrumbNameMap[href] || segment;
            if (href.startsWith('/admin/optimize-casestudy')) {
                name = 'AI Araçları';
            }
            const isLast = index === pathSegments.length - 2;
            const isDynamicAndUnmapped = href.split('/').length > 3 && !breadcrumbNameMap[href];
            return (<react_1.default.Fragment key={href}>
                    <breadcrumb_1.BreadcrumbSeparator />
                    <breadcrumb_1.BreadcrumbItem>
                        {isLast || isDynamicAndUnmapped ? (<breadcrumb_1.BreadcrumbPage>{breadcrumbNameMap[href] || name}</breadcrumb_1.BreadcrumbPage>) : (<breadcrumb_1.BreadcrumbLink asChild>
                                <link_1.default href={href}>{name}</link_1.default>
                            </breadcrumb_1.BreadcrumbLink>)}
                    </breadcrumb_1.BreadcrumbItem>
                </react_1.default.Fragment>);
        })}
        </breadcrumb_1.BreadcrumbList>
      </breadcrumb_1.Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <lucide_react_1.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
        <input_1.Input type="search" placeholder="Ara..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"/>
      </div>
      <button_1.Button asChild variant="ghost" size="icon" className="relative rounded-full">
        <link_1.default href="/admin/notifications">
            <lucide_react_1.Bell className="h-5 w-5"/>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="sr-only">Bildirimler</span>
        </link_1.default>
      </button_1.Button>
      <dropdown_menu_1.DropdownMenu>
        <dropdown_menu_1.DropdownMenuTrigger asChild>
          <button_1.Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <img src="https://i.pravatar.cc/150?u=admin" width={36} height={36} alt="Avatar"/>
          </button_1.Button>
        </dropdown_menu_1.DropdownMenuTrigger>
        <dropdown_menu_1.DropdownMenuContent align="end">
          <dropdown_menu_1.DropdownMenuLabel>Hesabım</dropdown_menu_1.DropdownMenuLabel>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>
            <lucide_react_1.Settings className="mr-2 h-4 w-4"/>
            Ayarlar
          </dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuItem>
            <lucide_react_1.Users className="mr-2 h-4 w-4"/>
            Destek
          </dropdown_menu_1.DropdownMenuItem>
          <dropdown_menu_1.DropdownMenuSeparator />
          <dropdown_menu_1.DropdownMenuItem>
            <lucide_react_1.LogOut className="mr-2 h-4 w-4"/>
            Çıkış Yap
          </dropdown_menu_1.DropdownMenuItem>
        </dropdown_menu_1.DropdownMenuContent>
      </dropdown_menu_1.DropdownMenu>
    </header>);
}
//# sourceMappingURL=dashboard-header.js.map