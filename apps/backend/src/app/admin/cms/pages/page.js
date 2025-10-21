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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const cms_service_1 = require("@/lib/cms/cms-service");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const use_cms_tracking_1 = require("@/hooks/use-cms-tracking");
const CmsAdminPage = () => {
    const [pages, setPages] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedStatus, setSelectedStatus] = (0, react_1.useState)('all');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const router = (0, navigation_1.useRouter)();
    const trackActivity = (0, use_cms_tracking_1.useActivityTracking)();
    (0, react_1.useEffect)(() => {
        fetchPages();
    }, [selectedStatus]);
    const fetchPages = async () => {
        try {
            setLoading(true);
            const status = selectedStatus === 'all' ? undefined : selectedStatus;
            const pagesData = await cms_service_1.cmsService.getPages(status);
            setPages(pagesData);
        }
        catch (error) {
            console.error('Failed to fetch pages:', error);
        }
        finally {
            setLoading(false);
        }
    };
    // Filter pages based on search query
    const filteredPages = (0, react_1.useMemo)(() => {
        if (!searchQuery)
            return pages;
        const query = searchQuery.toLowerCase();
        return pages.filter(page => page.title.toLowerCase().includes(query) ||
            page.slug.toLowerCase().includes(query) ||
            (page.description && page.description.toLowerCase().includes(query)));
    }, [pages, searchQuery]);
    const handleCreatePage = async () => {
        try {
            // Create a new page with default values
            const createdPage = await cms_service_1.cmsService.createPage({
                title: 'New Page',
                slug: 'new-page-' + Date.now(),
                description: '',
            });
            // Redirect to visual editor for the newly created page
            router.push(`/admin/cms/editor?pageId=${createdPage.id}`);
        }
        catch (error) {
            console.error('Failed to create page:', error);
            alert('Failed to create page');
        }
    };
    const handlePublishPage = async (id) => {
        try {
            await cms_service_1.cmsService.publishPage(id);
            // Track publish activity
            const page = pages.find(p => p.id === id);
            if (page) {
                await trackActivity('publish', page.id, page.title);
            }
            fetchPages();
        }
        catch (error) {
            console.error('Failed to publish page:', error);
            alert('Failed to publish page');
        }
    };
    const handleUnpublishPage = async (id) => {
        try {
            await cms_service_1.cmsService.unpublishPage(id);
            fetchPages();
        }
        catch (error) {
            console.error('Failed to unpublish page:', error);
            alert('Failed to unpublish page');
        }
    };
    const handleDeletePage = async (id) => {
        if (!confirm('Are you sure you want to delete this page?')) {
            return;
        }
        try {
            await cms_service_1.cmsService.deletePage(id);
            fetchPages();
        }
        catch (error) {
            console.error('Failed to delete page:', error);
            alert('Failed to delete page');
        }
    };
    const handleEditPage = (pageId) => {
        router.push(`/admin/cms/editor?pageId=${pageId}`);
    };
    return (<div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">CMS Sayfa Yönetimi</h1>
            <p className="text-muted-foreground">İçerik sayfalarını yönetin</p>
          </div>
          <button_1.Button onClick={handleCreatePage}>
            <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
            Create Page
          </button_1.Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
          <input_1.Input placeholder="Search pages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
        </div>
        <div className="w-full sm:w-48">
          <select_1.Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)}>
            <select_1.SelectTrigger>
              <select_1.SelectValue placeholder="Filter by status"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">All Pages</select_1.SelectItem>
              <select_1.SelectItem value="draft">Draft</select_1.SelectItem>
              <select_1.SelectItem value="published">Published</select_1.SelectItem>
              <select_1.SelectItem value="archived">Archived</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </div>

      {/* Pages List */}
      <div className="mb-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Sayfalar</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            {loading ? (<p>Loading pages...</p>) : filteredPages.length === 0 ? (<p>No pages found.</p>) : (<div className="space-y-4">
                {filteredPages.map((page) => (<div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">{page.slug}</p>
                      <p className="text-xs text-muted-foreground">
                        Status: <span className="capitalize">{page.status}</span> | 
                        Updated: {new Date(page.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button_1.Button variant="outline" size="sm" onClick={() => handleEditPage(page.id)}>
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button_1.Button>
                      <button_1.Button variant="outline" size="sm" onClick={() => handlePublishPage(page.id)}>
                        Publish
                      </button_1.Button>
                      <button_1.Button variant="outline" size="sm" onClick={() => handleUnpublishPage(page.id)}>
                        Unpublish
                      </button_1.Button>
                      <button_1.Button variant="destructive" size="sm" onClick={() => handleDeletePage(page.id)}>
                        Delete
                      </button_1.Button>
                    </div>
                  </div>))}
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
};
exports.default = CmsAdminPage;
//# sourceMappingURL=page.js.map