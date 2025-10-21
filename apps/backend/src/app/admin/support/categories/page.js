"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SupportCategoriesPage;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const support_data_1 = require("@/lib/support-data");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const CategoryForm = ({ category, categories, }) => {
    const isEditing = !!category;
    return (<dialog_1.DialogContent className="sm:max-w-[425px]">
      <dialog_1.DialogHeader>
        <dialog_1.DialogTitle>
          {isEditing ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}
        </dialog_1.DialogTitle>
        <dialog_1.DialogDescription>
          {isEditing
            ? `"${category.name}" kategorisinin bilgilerini güncelleyin.`
            : 'Destek talepleri için yeni bir kategori oluşturun.'}
        </dialog_1.DialogDescription>
      </dialog_1.DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label_1.Label htmlFor="name" className="text-right">
            Ad
          </label_1.Label>
          <input_1.Input id="name" defaultValue={category?.name} className="col-span-3"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label_1.Label htmlFor="description" className="text-right">
            Açıklama
          </label_1.Label>
          <textarea_1.Textarea id="description" defaultValue={category?.description} className="col-span-3"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label_1.Label htmlFor="parent" className="text-right">
            Üst Kategori
          </label_1.Label>
          <select_1.Select defaultValue={category?.parentId || 'none'}>
            <select_1.SelectTrigger className="col-span-3">
              <select_1.SelectValue placeholder="Bir üst kategori seçin"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="none">Yok</select_1.SelectItem>
              {categories
            .filter(c => !c.parentId && c.id !== category?.id) // Prevent self-parenting
            .map(parent => (<select_1.SelectItem key={parent.id} value={parent.id}>
                    {parent.name}
                  </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </div>
      <dialog_1.DialogFooter>
        <button_1.Button type="submit">
          {isEditing ? 'Değişiklikleri Kaydet' : 'Kategori Oluştur'}
        </button_1.Button>
      </dialog_1.DialogFooter>
    </dialog_1.DialogContent>);
};
function SupportCategoriesPage() {
    const renderCategoryRows = (categories, parentId = null, level = 0) => {
        const rows = [];
        const children = categories.filter(c => c.parentId === parentId);
        for (const category of children) {
            rows.push(<table_1.TableRow key={category.id}>
          <table_1.TableCell className="font-medium" style={{ paddingLeft: `${level * 24 + 16}px` }}>
            <div className="flex items-center gap-2">
              {level > 0 && (<lucide_react_1.CornerDownRight className="h-4 w-4 text-muted-foreground"/>)}
              <span>{category.name}</span>
            </div>
          </table_1.TableCell>
          <table_1.TableCell className="text-muted-foreground">
            {category.description}
          </table_1.TableCell>
          <table_1.TableCell>
            <badge_1.Badge variant="secondary">{category.ticketCount}</badge_1.Badge>
          </table_1.TableCell>
          <table_1.TableCell>
            <dialog_1.Dialog>
              <dropdown_menu_1.DropdownMenu>
                <dropdown_menu_1.DropdownMenuTrigger asChild>
                  <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Menüyü aç</span>
                    <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                  </button_1.Button>
                </dropdown_menu_1.DropdownMenuTrigger>
                <dropdown_menu_1.DropdownMenuContent align="end">
                  <dialog_1.DialogTrigger asChild>
                    <dropdown_menu_1.DropdownMenuItem>
                      <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                    </dropdown_menu_1.DropdownMenuItem>
                  </dialog_1.DialogTrigger>
                  <dropdown_menu_1.DropdownMenuSeparator />
                  <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                    <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Sil
                  </dropdown_menu_1.DropdownMenuItem>
                </dropdown_menu_1.DropdownMenuContent>
              </dropdown_menu_1.DropdownMenu>
              <CategoryForm category={category} categories={support_data_1.supportCategories}/>
            </dialog_1.Dialog>
          </table_1.TableCell>
        </table_1.TableRow>);
            rows.push(...renderCategoryRows(categories, category.id, level + 1));
        }
        return rows;
    };
    return (<card_1.Card>
      <card_1.CardHeader className="flex flex-row items-center justify-between">
        <div>
          <card_1.CardTitle>Destek Kategorileri</card_1.CardTitle>
          <card_1.CardDescription>
            Destek taleplerini organize etmek için kategorileri yönetin.
          </card_1.CardDescription>
        </div>
        <dialog_1.Dialog>
          <dialog_1.DialogTrigger asChild>
            <button_1.Button>
              <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
              Yeni Kategori Ekle
            </button_1.Button>
          </dialog_1.DialogTrigger>
          <CategoryForm categories={support_data_1.supportCategories}/>
        </dialog_1.Dialog>
      </card_1.CardHeader>
      <card_1.CardContent>
        <table_1.Table>
          <table_1.TableHeader>
            <table_1.TableRow>
              <table_1.TableHead>Kategori Adı</table_1.TableHead>
              <table_1.TableHead>Açıklama</table_1.TableHead>
              <table_1.TableHead>Talep Sayısı</table_1.TableHead>
              <table_1.TableHead>
                <span className="sr-only">Eylemler</span>
              </table_1.TableHead>
            </table_1.TableRow>
          </table_1.TableHeader>
          <table_1.TableBody>{renderCategoryRows(support_data_1.supportCategories)}</table_1.TableBody>
        </table_1.Table>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=page.js.map