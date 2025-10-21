"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditCmsPage;
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const cms_data_1 = require("@/lib/cms-data");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const separator_1 = require("@/components/ui/separator");
const react_1 = require("react");
const tabs_1 = require("@/components/ui/tabs");
const social_media_manager_1 = require("@/components/admin/social-media/social-media-manager");
const react_2 = require("react");
// Helper function to create a URL-friendly slug
const slugify = (text) => {
    if (!text)
        return '';
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};
const GooglePreview = ({ title, slug, description }) => {
    const siteUrl = "https://www.aluplan.com.tr";
    const displayUrl = `${siteUrl}${slug === '/' ? '' : slug}`;
    return (<div className="p-4 rounded-lg">
            <p className="text-sm text-gray-800 truncate">{displayUrl}</p>
            <h3 className="text-blue-600 text-xl font-medium truncate group-hover:underline">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>);
};
function EditCmsPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { pageId } = unwrappedParams;
    const [page, setPage] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = (0, react_1.useState)(false);
    const [formattedDate, setFormattedDate] = (0, react_1.useState)('');
    const hasFetchedPage = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedPage.current)
            return;
        hasFetchedPage.current = true;
        const fetchPage = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the page data from an API
                // For now, we're using mock data
                const pageData = cms_data_1.pages.find(p => p.id === pageId);
                if (!pageData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setPage(pageData);
                // Format date on client-side to avoid hydration mismatch
                setFormattedDate(new Date(pageData.lastUpdated).toLocaleString('tr-TR'));
                setError(null);
            }
            catch (err) {
                console.error('Error fetching page:', err);
                setError('Sayfa bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [pageId]);
    (0, react_1.useEffect)(() => {
        // This effect runs once when the component mounts with the initial page data.
        // It checks if the initial slug was likely manually edited.
        if (page?.slug && page?.title) {
            const expectedSlug = `/${slugify(page.title)}`;
            if (page.slug !== expectedSlug) {
                setIsSlugManuallyEdited(true);
            }
        }
        // We only want this to run once on mount for the initial page data.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page?.id]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!page) {
        (0, navigation_1.notFound)();
        return null;
    }
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setPage(prevPage => {
            if (!prevPage)
                return undefined;
            let newSlug = prevPage.slug;
            if (!isSlugManuallyEdited) {
                newSlug = `/${slugify(newTitle)}`;
            }
            return {
                ...prevPage,
                title: newTitle,
                slug: newSlug,
                seo: { ...prevPage.seo, title: newTitle }
            };
        });
    };
    const handleSlugChange = (e) => {
        if (!isSlugManuallyEdited) {
            setIsSlugManuallyEdited(true);
        }
        const newSlug = e.target.value;
        setPage(prevPage => {
            if (!prevPage)
                return undefined;
            return { ...prevPage, slug: newSlug.startsWith('/') ? newSlug : `/${newSlug}` };
        });
    };
    const handleSeoChange = (field, value) => {
        setPage(prevPage => {
            if (!prevPage)
                return undefined;
            return { ...prevPage, seo: { ...prevPage.seo, [field]: value } };
        });
    };
    return (<div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sayfa Düzenle: {page.title}</h1>
          <p className="text-muted-foreground">Sayfanın içeriğini, SEO ayarlarını ve sosyal medya paylaşımlarını yönetin.</p>
        </div>
      </div>
      
       <tabs_1.Tabs defaultValue="content">
        <tabs_1.TabsList className="grid w-full grid-cols-2">
            <tabs_1.TabsTrigger value="content">Sayfa İçeriği</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="social">Sosyal Medyada Paylaş</tabs_1.TabsTrigger>
        </tabs_1.TabsList>
        <tabs_1.TabsContent value="content" className="mt-6">
            <form className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Sayfa İçeriği</card_1.CardTitle>
                            <card_1.CardDescription>
                                Bu alan şu an için sadece bir konsepttir. Gerçek bir CMS'de burada zengin bir metin editörü (Rich Text Editor) bulunacaktır.
                            </card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <div className="space-y-2 mb-6">
                                <label_1.Label htmlFor="page-title">Sayfa Başlığı</label_1.Label>
                                <input_1.Input id="page-title" value={page.title} onChange={handleTitleChange}/>
                            </div>
                            <textarea_1.Textarea className="min-h-[400px]" defaultValue={`Bu alanda "${page.title}" sayfasının içeriği düzenlenecek.`}/>
                        </card_1.CardContent>
                    </card_1.Card>
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Gelişmiş SEO Ayarları</card_1.CardTitle>
                            <card_1.CardDescription>Arama motoru optimizasyonu için meta verileri ve sosyal medya paylaşım ayarlarını düzenleyin.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label_1.Label htmlFor="slug">URL Yolu (Slug)</label_1.Label>
                                <div className="flex items-center">
                                    <span className="text-sm text-muted-foreground bg-secondary px-3 py-2 rounded-l-md border border-r-0">https://aluplan.com.tr</span>
                                    <input_1.Input id="slug" value={page.slug} onChange={handleSlugChange} className="rounded-l-none"/>
                                </div>
                            </div>
                            <separator_1.Separator />
                            <div className="space-y-2">
                                <label_1.Label htmlFor="seo-title">SEO Başlığı</label_1.Label>
                                <input_1.Input id="seo-title" value={page.seo.title} onChange={e => handleSeoChange('title', e.target.value)}/>
                                <button_1.Button type="button" variant="link" className="p-0 h-auto text-primary flex items-center gap-1">
                                    <lucide_react_1.Sparkles className="h-4 w-4"/> AI ile Öneri Al
                                </button_1.Button>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label htmlFor="seo-description">SEO Açıklaması</label_1.Label>
                                <textarea_1.Textarea id="seo-description" value={page.seo.description} onChange={e => handleSeoChange('description', e.target.value)} className="min-h-[100px]"/>
                                <button_1.Button type="button" variant="link" className="p-0 h-auto text-primary flex items-center gap-1">
                                    <lucide_react_1.Sparkles className="h-4 w-4"/> AI ile Öneri Al
                                </button_1.Button>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label htmlFor="keywords">Anahtar Kelimeler (Virgülle ayırın)</label_1.Label>
                                <input_1.Input id="keywords" placeholder="Örn: mimari tasarım, BIM, allplan"/>
                                <button_1.Button type="button" variant="link" className="p-0 h-auto text-primary flex items-center gap-1">
                                    <lucide_react_1.Sparkles className="h-4 w-4"/> AI ile Öneri Al
                                </button_1.Button>
                            </div>
                            <separator_1.Separator />
                            <div>
                                <label_1.Label>Google Önizlemesi</label_1.Label>
                                <div className="mt-2 border rounded-lg bg-white shadow-sm">
                                    <GooglePreview title={page.seo.title} slug={page.slug} description={page.seo.description}/>
                                </div>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>
                </div>
                <div className="lg:col-span-1 space-y-8 sticky top-24">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Yayınlama</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label_1.Label>Durum</label_1.Label>
                                <select_1.Select defaultValue={page.status}>
                                    <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                        <select_1.SelectItem value="published">Yayınlandı</select_1.SelectItem>
                                        <select_1.SelectItem value="draft">Taslak</select_1.SelectItem>
                                    </select_1.SelectContent>
                                </select_1.Select>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Son Güncelleme: {formattedDate || '...'}
                            </p>
                        </card_1.CardContent>
                        <card_1.CardFooter className="flex justify-between">
                            <button_1.Button variant="outline" asChild><link_1.default href="/admin/cms/pages">İptal</link_1.default></button_1.Button>
                            <button_1.Button><lucide_react_1.Save className="mr-2 h-4 w-4"/> Kaydet</button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>
                </div>
            </form>
        </tabs_1.TabsContent>
        <tabs_1.TabsContent value="social" className="mt-6">
            <social_media_manager_1.SocialMediaManager />
        </tabs_1.TabsContent>
       </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=page.js.map