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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const z = __importStar(require("zod"));
const dialog_1 = require("../ui/dialog");
const form_1 = require("../ui/form");
const select_1 = require("../ui/select");
const input_1 = require("../ui/input");
const textarea_1 = require("../ui/textarea");
const button_1 = require("../ui/button");
const switch_1 = require("../ui/switch");
const use_toast_1 = require("../../hooks/use-toast");
const categorySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(255, 'Name must not exceed 255 characters'),
    description: z.string().max(1000, 'Description must not exceed 1000 characters').optional(),
    color: z.enum(['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray']),
    icon: z.enum(['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help']),
    parentId: z.string().uuid().optional().or(z.literal('none')).or(z.literal('')),
    sortOrder: z.number().min(0, 'Sort order must be non-negative').optional(),
    isActive: z.boolean().optional(),
});
const colorOptions = [
    { value: 'blue', label: 'Mavi', class: 'bg-blue-500' },
    { value: 'green', label: 'Yeşil', class: 'bg-green-500' },
    { value: 'red', label: 'Kırmızı', class: 'bg-red-500' },
    { value: 'yellow', label: 'Sarı', class: 'bg-yellow-500' },
    { value: 'purple', label: 'Mor', class: 'bg-purple-500' },
    { value: 'pink', label: 'Pembe', class: 'bg-pink-500' },
    { value: 'indigo', label: 'İndigo', class: 'bg-indigo-500' },
    { value: 'gray', label: 'Gri', class: 'bg-gray-500' },
];
const iconOptions = [
    { value: 'folder', label: 'Klasör', icon: '📁' },
    { value: 'book', label: 'Kitap', icon: '📚' },
    { value: 'file', label: 'Dosya', icon: '📄' },
    { value: 'tag', label: 'Etiket', icon: '🏷️' },
    { value: 'star', label: 'Yıldız', icon: '⭐' },
    { value: 'heart', label: 'Kalp', icon: '❤️' },
    { value: 'info', label: 'Bilgi', icon: 'ℹ️' },
    { value: 'help', label: 'Yardım', icon: '❓' },
];
const CategoryForm = ({ isOpen, onClose, onSubmit, category, parentCategories = [], isLoading = false, mode, }) => {
    const { toast } = (0, use_toast_1.useToast)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(categorySchema),
        defaultValues: {
            name: '',
            description: '',
            color: 'blue',
            icon: 'folder',
            parentId: 'none',
            sortOrder: 0,
            isActive: true,
        },
    });
    // Reset form when category changes or dialog opens/closes
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            if (category && mode === 'edit') {
                form.reset({
                    name: category.name,
                    description: '', // Add description field to CategoryTreeNode if needed
                    color: category.color,
                    icon: category.icon,
                    parentId: category.parentId || 'none',
                    sortOrder: 0, // Add sortOrder field to CategoryTreeNode if needed
                    isActive: category.isActive,
                });
            }
            else {
                form.reset({
                    name: '',
                    description: '',
                    color: 'blue',
                    icon: 'folder',
                    parentId: 'none',
                    sortOrder: 0,
                    isActive: true,
                });
            }
        }
    }, [isOpen, category, mode, form]);
    const handleSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            // Clean up empty parentId
            const submitData = {
                ...data,
                parentId: data.parentId === 'none' || data.parentId === '' ? undefined : data.parentId,
            };
            await onSubmit(submitData);
            toast({
                title: mode === 'create' ? 'Kategori Oluşturuldu' : 'Kategori Güncellendi',
                description: `"${data.name}" kategorisi başarıyla ${mode === 'create' ? 'oluşturuldu' : 'güncellendi'}.`,
            });
            onClose();
        }
        catch (error) {
            toast({
                title: 'Hata',
                description: error instanceof Error ? error.message : 'Kategori kaydedilirken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]+/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
    };
    const watchedName = form.watch('name');
    const previewSlug = watchedName ? generateSlug(watchedName) : '';
    // Filter out the current category and its descendants from parent options
    const getAvailableParents = () => {
        if (mode === 'create')
            return parentCategories;
        // For edit mode, exclude the current category and its descendants
        const excludeIds = new Set();
        if (category) {
            excludeIds.add(category.id);
            // Add all descendants
            const addDescendants = (cat) => {
                cat.children.forEach(child => {
                    excludeIds.add(child.id);
                    addDescendants(child);
                });
            };
            addDescendants(category);
        }
        return parentCategories.filter(cat => !excludeIds.has(cat.id));
    };
    const renderCategoryOption = (cat, level = 0) => {
        const indent = '  '.repeat(level);
        return (<select_1.SelectItem key={cat.id} value={cat.id}>
        <div className="flex items-center space-x-2">
          <span>{indent}</span>
          <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`}></div>
          <span>{cat.name}</span>
        </div>
      </select_1.SelectItem>);
    };
    const renderCategoryTree = (categories, level = 0) => {
        const result = [];
        categories.forEach((cat, index) => {
            result.push(renderCategoryOption(cat, level));
            if (cat.children && cat.children.length > 0) {
                result.push(...renderCategoryTree(cat.children, level + 1));
            }
        });
        return result;
    };
    return (<dialog_1.Dialog open={isOpen} onOpenChange={onClose}>
      <dialog_1.DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>
            {mode === 'create' ? 'Yeni Kategori Oluştur' : 'Kategori Düzenle'}
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            {mode === 'create'
            ? 'Makalelerinizi organize etmek için yeni bir bilgi bankası kategorisi oluşturun.'
            : 'Kategori bilgilerini ve ayarlarını güncelleyin.'}
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Name Field */}
            <form_1.FormField control={form.control} name="name" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Kategori Adı *</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input placeholder="Kategori adını girin" {...field}/>
                  </form_1.FormControl>
                  {previewSlug && (<form_1.FormDescription>
                      URL slug: <code className="text-sm bg-gray-100 px-1 rounded">/{previewSlug}</code>
                    </form_1.FormDescription>)}
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            {/* Description Field */}
            <form_1.FormField control={form.control} name="description" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Açıklama</form_1.FormLabel>
                  <form_1.FormControl>
                    <textarea_1.Textarea placeholder="Kategori açıklamasını girin (opsiyonel)" className="resize-none" rows={3} {...field}/>
                  </form_1.FormControl>
                  <form_1.FormDescription>
                    Bu kategorinin ne içerdiğine dair kısa bir açıklama.
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            {/* Parent Category Field */}
            <form_1.FormField control={form.control} name="parentId" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Üst Kategori</form_1.FormLabel>
                  <select_1.Select onValueChange={field.onChange} value={field.value}>
                    <form_1.FormControl>
                      <select_1.SelectTrigger>
                        <select_1.SelectValue placeholder="Üst kategori seçin (opsiyonel)"/>
                      </select_1.SelectTrigger>
                    </form_1.FormControl>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="none">Üst Kategori Yok (Ana Seviye)</select_1.SelectItem>
                      {renderCategoryTree(getAvailableParents())}
                    </select_1.SelectContent>
                  </select_1.Select>
                  <form_1.FormDescription>
                    Hiyerarşi oluşturmak için bir üst kategori seçin.
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <div className="grid grid-cols-2 gap-4">
              {/* Color Field */}
              <form_1.FormField control={form.control} name="color" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>Renk</form_1.FormLabel>
                    <select_1.Select onValueChange={field.onChange} value={field.value}>
                      <form_1.FormControl>
                        <select_1.SelectTrigger>
                          <select_1.SelectValue placeholder="Renk seçin"/>
                        </select_1.SelectTrigger>
                      </form_1.FormControl>
                      <select_1.SelectContent>
                        {colorOptions.map((color) => (<select_1.SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                              <span>{color.label}</span>
                            </div>
                          </select_1.SelectItem>))}
                      </select_1.SelectContent>
                    </select_1.Select>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>

              {/* Icon Field */}
              <form_1.FormField control={form.control} name="icon" render={({ field }) => (<form_1.FormItem>
                    <form_1.FormLabel>İkon</form_1.FormLabel>
                    <select_1.Select onValueChange={field.onChange} value={field.value}>
                      <form_1.FormControl>
                        <select_1.SelectTrigger>
                          <select_1.SelectValue placeholder="İkon seçin"/>
                        </select_1.SelectTrigger>
                      </form_1.FormControl>
                      <select_1.SelectContent>
                        {iconOptions.map((icon) => (<select_1.SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center space-x-2">
                              <span>{icon.icon}</span>
                              <span>{icon.label}</span>
                            </div>
                          </select_1.SelectItem>))}
                      </select_1.SelectContent>
                    </select_1.Select>
                    <form_1.FormMessage />
                  </form_1.FormItem>)}/>
            </div>

            {/* Sort Order Field */}
            <form_1.FormField control={form.control} name="sortOrder" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>Sıralama</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input type="number" min="0" placeholder="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}/>
                  </form_1.FormControl>
                  <form_1.FormDescription>
                    Düşük sayılar önce görünür. Otomatik sıralama için 0 bırakın.
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            {/* Active Status Field (only for edit mode) */}
            {mode === 'edit' && (<form_1.FormField control={form.control} name="isActive" render={({ field }) => (<form_1.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <form_1.FormLabel className="text-base">Aktif Durum</form_1.FormLabel>
                      <form_1.FormDescription>
                        Pasif kategoriler halktan gizlenir ancak yöneticiler tarafından erişilebilir kalır.
                      </form_1.FormDescription>
                    </div>
                    <form_1.FormControl>
                      <switch_1.Switch checked={field.value} onCheckedChange={field.onChange}/>
                    </form_1.FormControl>
                  </form_1.FormItem>)}/>)}

            {/* Preview */}
            <div className="rounded-lg border p-4 bg-gray-50">
              <h4 className="text-sm font-medium mb-2">Önizleme</h4>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded bg-${form.watch('color')}-100 text-${form.watch('color')}-800`}>
                  <span className="text-lg">
                    {iconOptions.find(i => i.value === form.watch('icon'))?.icon || '📁'}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{form.watch('name') || 'Kategori Adı'}</div>
                  <div className="text-sm text-gray-500">
                    /{previewSlug || 'kategori-slug'}
                  </div>
                </div>
              </div>
            </div>

            <dialog_1.DialogFooter>
              <button_1.Button type="button" variant="outline" onClick={onClose}>
                İptal
              </button_1.Button>
              <button_1.Button type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting ? 'Kaydediliyor...' : (mode === 'create' ? 'Kategori Oluştur' : 'Kategori Güncelle')}
              </button_1.Button>
            </dialog_1.DialogFooter>
          </form>
        </form_1.Form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = CategoryForm;
//# sourceMappingURL=CategoryForm.js.map