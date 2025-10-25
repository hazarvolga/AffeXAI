"use strict";
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
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("../ui/button");
const card_1 = require("../ui/card");
const badge_1 = require("../ui/badge");
const use_toast_1 = require("../../hooks/use-toast");
const CategoryList_1 = __importDefault(require("./CategoryList"));
const CategoryForm_1 = __importDefault(require("./CategoryForm"));
const alert_1 = require("../ui/alert");
const CategoryManagement = ({ onLoadCategories, onLoadStats, onCreateCategory, onUpdateCategory, onDeleteCategory, onReorderCategories, onInitializeDefaults, onUpdateArticleCounts, }) => {
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isFormOpen, setIsFormOpen] = (0, react_1.useState)(false);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)(null);
    const [formMode, setFormMode] = (0, react_1.useState)('create');
    const [isUpdatingCounts, setIsUpdatingCounts] = (0, react_1.useState)(false);
    const { toast } = (0, use_toast_1.useToast)();
    // Load initial data
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setIsLoading(true);
            const [categoriesData, statsData] = await Promise.all([
                onLoadCategories(),
                onLoadStats(),
            ]);
            setCategories(categoriesData);
            setStats(statsData);
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Kategori verileri yüklenemedi.',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setFormMode('create');
        setIsFormOpen(true);
    };
    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setFormMode('edit');
        setIsFormOpen(true);
    };
    const handleDeleteCategory = async (categoryId) => {
        if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            return;
        }
        try {
            await onDeleteCategory(categoryId);
            await loadData(); // Reload data
            toast({
                title: 'Başarılı',
                description: 'Kategori başarıyla silindi.',
            });
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: error instanceof Error ? error.message : 'Kategori silinemedi.',
                variant: 'destructive',
            });
        }
    };
    const handleFormSubmit = async (data) => {
        if (formMode === 'create') {
            await onCreateCategory(data);
        }
        else if (selectedCategory) {
            await onUpdateCategory(selectedCategory.id, data);
        }
        await loadData(); // Reload data
    };
    const handleReorderCategories = async (categoryIds) => {
        try {
            await onReorderCategories(categoryIds);
            await loadData(); // Reload data
            toast({
                title: 'Başarılı',
                description: 'Kategoriler başarıyla yeniden sıralandı.',
            });
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Kategoriler yeniden sıralanamadı.',
                variant: 'destructive',
            });
        }
    };
    const handleInitializeDefaults = async () => {
        if (!confirm('Bu işlem varsayılan kategorileri oluşturacak. Devam etmek istiyor musunuz?')) {
            return;
        }
        try {
            await onInitializeDefaults();
            await loadData(); // Reload data
            toast({
                title: 'Başarılı',
                description: 'Varsayılan kategoriler başarıyla oluşturuldu.',
            });
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Varsayılan kategoriler oluşturulamadı.',
                variant: 'destructive',
            });
        }
    };
    const handleUpdateArticleCounts = async () => {
        try {
            setIsUpdatingCounts(true);
            await onUpdateArticleCounts();
            await loadData(); // Reload data
            toast({
                title: 'Başarılı',
                description: 'Makale sayıları başarıyla güncellendi.',
            });
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: 'Makale sayıları güncellenemedi.',
                variant: 'destructive',
            });
        }
        finally {
            setIsUpdatingCounts(false);
        }
    };
    const flattenCategories = (cats) => {
        const result = [];
        const traverse = (categories) => {
            categories.forEach(cat => {
                result.push(cat);
                if (cat.children.length > 0) {
                    traverse(cat.children);
                }
            });
        };
        traverse(cats);
        return result;
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kategori Yönetimi</h1>
          <p className="text-muted-foreground">
            Bilgi bankası makalelerinizi kategoriler ve alt kategoriler ile organize edin.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" onClick={handleUpdateArticleCounts} disabled={isUpdatingCounts} className="flex items-center space-x-2">
            <lucide_react_1.RotateCcw className={`h-4 w-4 ${isUpdatingCounts ? 'animate-spin' : ''}`}/>
            <span>Sayıları Güncelle</span>
          </button_1.Button>
          <button_1.Button variant="outline" onClick={handleInitializeDefaults} className="flex items-center space-x-2">
            <lucide_react_1.Settings className="h-4 w-4"/>
            <span>Varsayılan Kategoriler</span>
          </button_1.Button>
          <button_1.Button onClick={handleCreateCategory} className="flex items-center space-x-2">
            <lucide_react_1.Plus className="h-4 w-4"/>
            <span>Yeni Kategori</span>
          </button_1.Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Toplam Kategori</card_1.CardTitle>
              <lucide_react_1.BarChart3 className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCategories} aktif
              </p>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Toplam Makale</card_1.CardTitle>
              <lucide_react_1.BarChart3 className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">
                Tüm kategorilerde
              </p>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Ort. Makale/Kategori</card_1.CardTitle>
              <lucide_react_1.BarChart3 className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.averageArticlesPerCategory}</div>
              <p className="text-xs text-muted-foreground">
                Aktif kategori başına
              </p>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Kullanılmayan Kategoriler</card_1.CardTitle>
              <lucide_react_1.BarChart3 className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.unusedCategories.length}</div>
              <p className="text-xs text-muted-foreground">
                0 makaleli kategoriler
              </p>
            </card_1.CardContent>
          </card_1.Card>
        </div>)}

      {/* Alerts for unused categories */}
      {stats && stats.unusedCategories.length > 0 && (<alert_1.Alert>
          <alert_1.AlertDescription>
            {stats.unusedCategories.length} adet kullanılmayan kategoriniz var. Bunlara makale eklemeyi veya bilgi bankanızı düzenli tutmak için silmeyi düşünün.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Category List */}
        <div className="lg:col-span-2">
          <CategoryList_1.default categories={categories} onCategoryEdit={handleEditCategory} onCategoryDelete={handleDeleteCategory} onCategoryReorder={handleReorderCategories} onCategoryCreate={handleCreateCategory} isLoading={isLoading} showActions={true} allowReorder={true} searchable={true}/>
        </div>

        {/* Sidebar with Popular Categories */}
        <div className="space-y-6">
          {stats && stats.mostPopularCategories.length > 0 && (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>En Popüler Kategoriler</card_1.CardTitle>
                <card_1.CardDescription>
                  En çok makaleye sahip kategoriler
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-3">
                  {stats.mostPopularCategories.slice(0, 5).map((category) => (<div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <badge_1.Badge variant="secondary">{category.articleCount}</badge_1.Badge>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>)}

          {stats && stats.unusedCategories.length > 0 && (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Kullanılmayan Kategoriler</card_1.CardTitle>
                <card_1.CardDescription>
                  Hiç makalesi olmayan kategoriler
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-3">
                  {stats.unusedCategories.slice(0, 5).map((category) => (<div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <button_1.Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)} className="h-6 px-2 text-xs">
                        Düzenle
                      </button_1.Button>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>)}

          {/* Quick Actions */}
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Hızlı İşlemler</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-2">
              <button_1.Button variant="outline" className="w-full justify-start" onClick={handleCreateCategory}>
                <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                Yeni Kategori Oluştur
              </button_1.Button>
              <button_1.Button variant="outline" className="w-full justify-start" onClick={handleInitializeDefaults}>
                <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
                Varsayılan Kategorileri Başlat
              </button_1.Button>
              <button_1.Button variant="outline" className="w-full justify-start" onClick={handleUpdateArticleCounts} disabled={isUpdatingCounts}>
                <lucide_react_1.RotateCcw className={`h-4 w-4 mr-2 ${isUpdatingCounts ? 'animate-spin' : ''}`}/>
                Makale Sayılarını Güncelle
              </button_1.Button>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>

      {/* Category Form Dialog */}
      <CategoryForm_1.default isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} category={selectedCategory} parentCategories={flattenCategories(categories)} mode={formMode}/>
    </div>);
};
exports.default = CategoryManagement;
//# sourceMappingURL=CategoryManagement.js.map