"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const popover_1 = require("@/components/ui/popover");
const lucide_react_1 = require("lucide-react");
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const sheet_1 = require("../ui/sheet");
const scroll_area_1 = require("../ui/scroll-area");
const accordion_1 = require("@/components/ui/accordion");
const menu_data_1 = require("@/lib/menu-data");
const theme_toggle_1 = require("../common/theme-toggle");
const social_media_data_1 = require("@/lib/social-media-data");
const image_1 = __importDefault(require("next/image"));
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
const topBarLinks = [
    { href: '/downloads#faq', text: 'ALLPLAN FAQ' },
    { href: '/education/training', text: 'LEARN NOW' },
    { href: '#', text: 'Duyurular' },
    { href: '/downloads#remote', text: 'Microsoft Teams' },
    { href: '#', text: 'Product Lifecycle' },
    { href: '/downloads#customer', text: 'Allplan Connect: Login' },
    { href: '/downloads#license', text: 'Allplan Connect License' },
];
const MegaMenuContent = ({ categories, parentHref }) => (<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (<div key={category.title}>
          <p className="font-semibold uppercase tracking-wider text-sm text-primary">{category.title}</p>
          <div className="mt-4 grid grid-cols-1 gap-1">
            {category.items.map((item) => (<link_1.default key={item.title} href={item.href} className="group -m-3 flex items-start gap-4 rounded-lg p-3 transition-all duration-200 hover:bg-secondary">
                {item.icon && (<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-foreground">
                    <item.icon className="h-6 w-6" aria-hidden="true"/>
                  </div>)}
                <div className="flex-1">
                  <p className="font-medium text-foreground transition-colors group-hover:text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </link_1.default>))}
          </div>
        </div>))}
    </div>
  </div>);
const MegaMenuItem = ({ title, parentHref, categories }) => {
    return (<popover_1.Popover>
            <popover_1.PopoverTrigger asChild>
                <button_1.Button variant="ghost" className="px-2 group">
                  <link_1.default href={parentHref} className="text-sm font-medium text-foreground hover:text-primary">{title}</link_1.default>
                  <lucide_react_1.ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 ml-1"/>
                </button_1.Button>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent align="start" sideOffset={20} className="w-screen max-w-none rounded-none border-x-0 border-b-0 p-0 top-full animate-in fade-in-0 slide-in-from-top-4 duration-300">
                <MegaMenuContent categories={categories} parentHref={parentHref}/>
            </popover_1.PopoverContent>
        </popover_1.Popover>);
};
function Header() {
    const [isScrolled, setIsScrolled] = react_1.default.useState(false);
    const [siteSettings, setSiteSettings] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Fetch site settings on component mount
    (0, react_1.useEffect)(() => {
        const fetchSiteSettings = async () => {
            try {
                const settings = await settingsService_1.default.getSiteSettings();
                setSiteSettings(settings);
            }
            catch (error) {
                console.error('Failed to fetch site settings:', error);
                // Fallback to default values
                setSiteSettings({
                    companyName: "Aluplan Program Sistemleri",
                    logoUrl: "https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo",
                    logoDarkUrl: "https://placehold.co/140x40/171717/f0f0f0?text=Logo",
                    contact: {
                        address: "",
                        phone: "",
                        email: ""
                    },
                    socialMedia: {},
                    seo: {
                        defaultTitle: "Aluplan",
                        defaultDescription: "Aluplan Digital Solutions"
                    }
                });
            }
        };
        fetchSiteSettings();
    }, []);
    const navItems = menu_data_1.menus.find(m => m.id === 'main-nav')?.items || [];
    const renderNavItems = (items) => {
        return items.filter(item => item.parentId === null).map(item => {
            if (item.behavior === 'mega' && item.megaMenuCategories) {
                return (<MegaMenuItem key={item.id} title={item.title} parentHref={item.href} categories={item.megaMenuCategories}/>);
            }
            return (<button_1.Button asChild variant="ghost" key={item.id}>
            <link_1.default href={item.href} className="text-sm font-medium text-foreground hover:text-primary">
              {item.title}
            </link_1.default>
          </button_1.Button>);
        });
    };
    const renderMobileNavItems = (items) => {
        const topLevelItems = items.filter(item => item.parentId === null);
        const renderAccordionItems = topLevelItems.map(item => {
            const children = items.filter(child => child.parentId === item.id);
            const hasMegaMenu = item.behavior === 'mega' && item.megaMenuCategories && item.megaMenuCategories.length > 0;
            if (!hasMegaMenu && children.length === 0) {
                return (<sheet_1.SheetClose asChild key={item.id}>
                    <link_1.default href={item.href} className="block rounded-lg py-3 px-4 text-base font-medium text-foreground hover:bg-secondary hover:text-primary">{item.title}</link_1.default>
                </sheet_1.SheetClose>);
            }
            return (<accordion_1.AccordionItem value={item.id} key={item.id}>
                <accordion_1.AccordionTrigger className="hover:no-underline font-semibold text-foreground py-3 px-4">
                    <link_1.default href={item.href} className="flex-1 text-left">{item.title}</link_1.default>
                </accordion_1.AccordionTrigger>
                <accordion_1.AccordionContent className="pl-8 pb-0">
                    <sheet_1.SheetClose asChild>
                        <link_1.default href={item.href} className="flex items-center gap-2 rounded-lg py-2 text-base font-semibold text-primary hover:bg-secondary">
                            Genel Bakış <lucide_react_1.ArrowRight className="h-4 w-4"/>
                        </link_1.default>
                    </sheet_1.SheetClose>
                    {(item.megaMenuCategories || []).flatMap(c => c.items).map(subItem => (<sheet_1.SheetClose asChild key={subItem.title}>
                            <link_1.default href={subItem.href} className="block rounded-lg py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary">{subItem.title}</link_1.default>
                        </sheet_1.SheetClose>))}
                    {children.map(childItem => (<sheet_1.SheetClose asChild key={childItem.id}>
                             <link_1.default href={childItem.href} className="block rounded-lg py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary">{childItem.title}</link_1.default>
                        </sheet_1.SheetClose>))}
                </accordion_1.AccordionContent>
            </accordion_1.AccordionItem>);
        });
        const regularLinks = topLevelItems.filter(item => item.behavior === 'link' && !items.some(child => child.parentId === item.id));
        return (<>
            <accordion_1.Accordion type="multiple" className="w-full px-4">
                {renderAccordionItems.filter(item => item.props.value)}
            </accordion_1.Accordion>
             <div className="pt-4 mt-4 border-t px-4">
                {regularLinks.map((link) => (<sheet_1.SheetClose asChild key={link.id}>
                        <link_1.default href={link.href} className="block rounded-lg py-2 text-base font-medium text-foreground hover:bg-secondary hover:text-primary">{link.title}</link_1.default>
                    </sheet_1.SheetClose>))}
            </div>
        </>);
    };
    // Get logo URL based on theme
    const getDynamicLogoUrl = (isDarkMode = false) => {
        if (!siteSettings)
            return isDarkMode
                ? 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'
                : 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
        try {
            // For media files, we need to construct the URL
            // Check if the logo URL looks like a media file ID
            const logoUrl = isDarkMode ? siteSettings.logoDarkUrl : siteSettings.logoUrl;
            if (logoUrl) {
                // If it's already a full URL, return it
                if (typeof logoUrl === 'string' && (logoUrl.startsWith('http://') || logoUrl.startsWith('https://'))) {
                    return logoUrl;
                }
                // If it looks like a media file ID (contains a dot for extension), construct the URL
                if (typeof logoUrl === 'string' && logoUrl.includes('.')) {
                    return `http://localhost:9005/uploads/${logoUrl}`;
                }
                // Otherwise, return as is (might be a relative path or full URL)
                return logoUrl;
            }
            // Default placeholder
            return isDarkMode
                ? 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'
                : 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
        }
        catch (error) {
            console.error('Error getting logo URL:', error);
            // Return fallback placeholder
            return isDarkMode
                ? 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'
                : 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
        }
    };
    if (!siteSettings) {
        // Show a loading state or placeholder while fetching settings
        return (<div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>);
    }
    return (<div className={(0, utils_1.cn)('sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm', isScrolled ? 'shadow-md' : '')}>
      {/* Top Bar 1 */}
      <div className="bg-secondary/50 text-secondary-foreground border-b border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-3">
                      {Object.entries(siteSettings.socialMedia || {}).map(([platform, url]) => {
            if (!url)
                return null;
            const Icon = (0, social_media_data_1.getPlatformIcon)(platform);
            return (<a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                <Icon className="h-4 w-4"/>
                            </a>);
        })}
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border"></div>
                  <a href={`mailto:${siteSettings.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <lucide_react_1.Mail className="h-4 w-4"/>
                      <span className="hidden md:inline">{siteSettings.contact.email}</span>
                  </a>
              </div>
              <div className="flex items-center gap-4 font-medium">
                  <link_1.default href="/admin/login" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <lucide_react_1.UserCog className="h-4 w-4"/> Admin Girişi
                  </link_1.default>
                  <div className="w-px h-4 bg-border"></div>
                   <link_1.default href="/portal/login" className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <lucide_react_1.User className="h-4 w-4"/> Kullanıcı Portalı
                  </link_1.default>
                  <div className="w-px h-4 bg-border"></div>
                  <theme_toggle_1.ThemeToggle />
              </div>
          </div>
      </div>

      {/* Top Bar 2 */}
      <div className="hidden lg:block bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <scroll_area_1.ScrollArea className="w-full whitespace-nowrap">
                <div className="flex items-center gap-2">
                    {topBarLinks.map(link => (<button_1.Button key={link.text} variant="outline" size="sm" asChild className="h-8 border-dashed shadow-sm hover:shadow-md transition-shadow">
                            <link_1.default href={link.href}>{link.text}</link_1.default>
                        </button_1.Button>))}
                </div>
                <scroll_area_1.ScrollBar orientation="horizontal" className="h-1.5"/>
            </scroll_area_1.ScrollArea>
          </div>
      </div>
      
      <header>
        <div className="container mx-auto flex h-28 items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
           <link_1.default href="/" className="flex items-center gap-2 font-semibold">
                <span className="sr-only">{siteSettings.companyName}</span>
                <image_1.default className="dark:hidden" src={getDynamicLogoUrl(false) || 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo'} alt={`${siteSettings.companyName} Logo`} width={200} height={60} priority/>
                <image_1.default className="hidden dark:block" src={getDynamicLogoUrl(true) || 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'} alt={`${siteSettings.companyName} Logo`} width={200} height={60} priority/>
            </link_1.default>
          <nav className="hidden items-center gap-x-2 lg:flex">
             {renderNavItems(navItems)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button_1.Button variant="ghost" asChild><link_1.default href="/contact">İletişim</link_1.default></button_1.Button>
            <button_1.Button className="bg-accent text-accent-foreground hover:bg-accent/90">Demo İste</button_1.Button>
          </div>
          <div className="lg:hidden">
            <sheet_1.Sheet>
              <sheet_1.SheetTrigger asChild>
                <button_1.Button variant="ghost" size="icon">
                  <lucide_react_1.Menu className="h-6 w-6"/>
                  <span className="sr-only">Menüyü aç</span>
                </button_1.Button>
              </sheet_1.SheetTrigger>
              <sheet_1.SheetContent side="left" className="w-full max-w-xs p-0 flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b">
                      <link_1.default href="/" className="text-xl font-bold text-primary">
                        <image_1.default src={getDynamicLogoUrl(false) || 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo'} alt={`${siteSettings.companyName} Logo`} width={160} height={45} priority/>
                      </link_1.default>
                      <sheet_1.SheetClose asChild>
                          <button_1.Button variant="ghost" size="icon">
                              <lucide_react_1.X className="h-6 w-6"/>
                              <span className="sr-only">Menüyü kapat</span>
                          </button_1.Button>
                      </sheet_1.SheetClose>
                  </div>
                  <scroll_area_1.ScrollArea className="flex-1">
                      <div className="p-4 space-y-2">
                            {topBarLinks.map(link => (<sheet_1.SheetClose asChild key={link.text}>
                                    <link_1.default href={link.href} className="block rounded-lg py-2 pl-2 pr-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary">{link.text}</link_1.default>
                                </sheet_1.SheetClose>))}
                        </div>
                      {renderMobileNavItems(navItems)}
                  </scroll_area_1.ScrollArea>
                   <div className="p-4 border-t mt-auto space-y-2">
                        <button_1.Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Demo İste</button_1.Button>
                        <button_1.Button variant="outline" className="w-full">İletişim</button_1.Button>
                  </div>
              </sheet_1.SheetContent>
            </sheet_1.Sheet>
          </div>
        </div>
      </header>
    </div>);
}
//# sourceMappingURL=header.js.map