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
exports.default = CategoryPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const breadcrumb_1 = require("@/components/ui/breadcrumb");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function CategoryPage() {
    const params = (0, navigation_1.useParams)();
    const router = (0, navigation_1.useRouter)();
    const categoryId = params.categoryId;
    const [category, setCategory] = (0, react_1.useState)(null);
    const [articles, setArticles] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [page, setPage] = (0, react_1.useState)(1);
    const [totalPages, setTotalPages] = (0, react_1.useState)(1);
    const [hasMore, setHasMore] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (categoryId) {
            fetchCategoryData();
        }
    }, [categoryId, page]);
    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            const [categoryRes, articlesRes] = await Promise.all([
                fetch(`/api/knowledge-base/categories/${categoryId}/path`),
                fetch(`/api/knowledge-base/categories/${categoryId}/articles?limit=20&offset=${(page - 1) * 20}&includeSubcategories=true`)
            ]);
            if (categoryRes.ok) {
                const categoryData = await categoryRes.json();
                setCategory(categoryData.data);
            }
            if (articlesRes.ok) {
                const articlesData = await articlesRes.json();
                if (page === 1) {
                    setArticles(articlesData.articles || []);
                }
                else {
                    setArticles(prev => [...prev, ...(articlesData.articles || [])]);
                }
                const total = articlesData.total || 0;
                setTotalPages(Math.ceil(total / 20));
                setHasMore(page < Math.ceil(total / 20));
            }
        }
        catch (error) {
            console.error('Failed to fetch category data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadMore = () => {
        if (hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };
    const getIconEmoji = (iconName) => {
        const iconMap = {
            folder: '📁',
            book: '📚',
            file: '📄',
            tag: '🏷️',
            star: '⭐',
            heart: '❤️',
            info: 'ℹ️',
            help: '❓',
        };
        return iconMap[iconName] || '📁';
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    if (loading && page === 1) {
        return (<div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <lucide_react_1.Loader2 className="h-12 w-12 animate-spin text-primary"/>
        </div>
      </div>);
    }
    if (!category) {
        return (<div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Kategori bulunamadı</h1>
          <p className="text-muted-foreground mb-6">Aradığınız kategori mevcut değil.</p>
          <link_1.default href="/help">
            <button_1.Button>
              <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
              Yardım Merkezine Dön
            </button_1.Button>
          </link_1.default>
        </div>
      </div>);
    }
    return (<div className="container mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <breadcrumb_1.Breadcrumb>
        <breadcrumb_1.BreadcrumbList>
          <breadcrumb_1.BreadcrumbItem>
            <breadcrumb_1.BreadcrumbLink href="/help">Yardım Merkezi</breadcrumb_1.BreadcrumbLink>
          </breadcrumb_1.BreadcrumbItem>
          <breadcrumb_1.BreadcrumbSeparator />
          {category.path.map((pathItem, index) => (<react_1.default.Fragment key={index}>
              <breadcrumb_1.BreadcrumbItem>
                {index === category.path.length - 1 ? (<breadcrumb_1.BreadcrumbPage>{pathItem}</breadcrumb_1.BreadcrumbPage>) : (<breadcrumb_1.BreadcrumbLink href="#">{pathItem}</breadcrumb_1.BreadcrumbLink>)}
              </breadcrumb_1.BreadcrumbItem>
              {index < category.path.length - 1 && <breadcrumb_1.BreadcrumbSeparator />}
            </react_1.default.Fragment>))}
        </breadcrumb_1.BreadcrumbList>
      </breadcrumb_1.Breadcrumb>

      {/* Category Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg bg-${category.color}-100`}>
            <div className="text-2xl">
              {getIconEmoji(category.icon)}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            {category.description && (<p className="text-muted-foreground mt-2 text-lg">{category.description}</p>)}
            <div className="flex items-center space-x-4 mt-3">
              <badge_1.Badge variant="secondary">
                {category.articleCount} makale
              </badge_1.Badge>
            </div>
          </div>
        </div>
        
        <link_1.default href="/help">
          <button_1.Button variant="outline">
            <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
            Geri
          </button_1.Button>
        </link_1.default>
      </div>

      {/* Articles */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Makaleler</h2>
        
        {articles.length === 0 ? (<card_1.Card>
            <card_1.CardContent className="py-12 text-center">
              <lucide_react_1.BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
              <h3 className="text-lg font-semibold mb-2">Henüz makale yok</h3>
              <p className="text-muted-foreground">
                Bu kategoride henüz yayınlanmış makale bulunmuyor.
              </p>
            </card_1.CardContent>
          </card_1.Card>) : (<div className="space-y-4">
            {articles.map((article) => (<link_1.default key={article.id} href={`/help/${article.slug}`}>
                <card_1.Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <card_1.CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {article.isFeatured && (<badge_1.Badge variant="default" className="bg-yellow-500">
                              Öne Çıkan
                            </badge_1.Badge>)}
                          <badge_1.Badge variant="outline">{article.category.name}</badge_1.Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.summary}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <lucide_react_1.User className="h-4 w-4"/>
                            <span>{article.author.firstName} {article.author.lastName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <lucide_react_1.Calendar className="h-4 w-4"/>
                            <span>{formatDate(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <lucide_react_1.Eye className="h-4 w-4"/>
                            <span>{article.viewCount} görüntülenme</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <lucide_react_1.ThumbsUp className="h-4 w-4"/>
                            <span>{article.helpfulCount} faydalı</span>
                          </div>
                        </div>
                      </div>
                      
                      <lucide_react_1.ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4"/>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </link_1.default>))}
            
            {/* Load More Button */}
            {hasMore && (<div className="text-center pt-6">
                <button_1.Button onClick={loadMore} disabled={loading} variant="outline" size="lg">
                  {loading ? (<>
                      <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Yükleniyor...
                    </>) : ('Daha fazla makale yükle')}
                </button_1.Button>
              </div>)}
          </div>)}
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map