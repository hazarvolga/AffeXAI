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
exports.default = MenuManagementPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const menu_data_1 = require("@/lib/menu-data");
const tabs_1 = require("@/components/ui/tabs");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const EditMenuItemDialog = ({ item, menuItems, onSave, onOpenChange }) => {
    const [title, setTitle] = (0, react_1.useState)(item.title);
    const [href, setHref] = (0, react_1.useState)(item.href);
    const [behavior, setBehavior] = (0, react_1.useState)(item.behavior);
    const [parentId, setParentId] = (0, react_1.useState)(item.parentId || 'none');
    const handleSave = () => {
        onSave({ ...item, title, href, behavior, parentId: parentId === 'none' ? undefined : parentId });
        onOpenChange(false);
    };
    const getValidParentOptions = (items, currentItemId) => {
        let childIds = new Set();
        const findChildrenRecursive = (parentId) => {
            const children = items.filter(i => i.parentId === parentId);
            for (const child of children) {
                childIds.add(child.id);
                findChildrenRecursive(child.id);
            }
        };
        findChildrenRecursive(currentItemId);
        return items.filter(i => i.id !== currentItemId && !childIds.has(i.id));
    };
    const potentialParents = getValidParentOptions(menuItems, item.id);
    return (<dialog_1.DialogContent>
            <dialog_1.DialogHeader>
                <dialog_1.DialogTitle>Menü Öğesini Düzenle</dialog_1.DialogTitle>
                <dialog_1.DialogDescription>"{item.title}" öğesinin detaylarını güncelleyin.</dialog_1.DialogDescription>
            </dialog_1.DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <label_1.Label htmlFor="item-title">Başlık</label_1.Label>
                    <input_1.Input id="item-title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <label_1.Label htmlFor="item-href">URL</label_1.Label>
                    <input_1.Input id="item-href" value={href} onChange={(e) => setHref(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <label_1.Label htmlFor="item-behavior">Davranış</label_1.Label>
                    <select_1.Select value={behavior} onValueChange={(value) => setBehavior(value)}>
                        <select_1.SelectTrigger id="item-behavior">
                            <select_1.SelectValue />
                        </select_1.SelectTrigger>
                        <select_1.SelectContent>
                            <select_1.SelectItem value="link">Basit Link</select_1.SelectItem>
                            <select_1.SelectItem value="dropdown">Dropdown Menü</select_1.SelectItem>
                            <select_1.SelectItem value="mega">Mega Menü</select_1.SelectItem>
                        </select_1.SelectContent>
                    </select_1.Select>
                </div>
                 <div className="space-y-2">
                    <label_1.Label htmlFor="item-parent">Üst Kategori</label_1.Label>
                    <select_1.Select value={parentId || 'none'} onValueChange={setParentId}>
                        <select_1.SelectTrigger id="item-parent">
                            <select_1.SelectValue />
                        </select_1.SelectTrigger>
                        <select_1.SelectContent>
                            <select_1.SelectItem value="none">Yok (Ana Kategori)</select_1.SelectItem>
                            {potentialParents.map(parent => (<select_1.SelectItem key={parent.id} value={parent.id}>
                                    {parent.title}
                                </select_1.SelectItem>))}
                        </select_1.SelectContent>
                    </select_1.Select>
                </div>
            </div>
            <dialog_1.DialogFooter>
                 <button_1.Button variant="outline" onClick={() => onOpenChange(false)}>İptal</button_1.Button>
                 <button_1.Button onClick={handleSave}><lucide_react_1.Save className="mr-2 h-4 w-4"/> Kaydet</button_1.Button>
            </dialog_1.DialogFooter>
        </dialog_1.DialogContent>);
};
const MenuItem = ({ item, onMove, isFirst, isLast, allItems, onSave, onDelete }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const getBehaviorBadge = (behavior) => {
        switch (behavior) {
            case 'mega': return <badge_1.Badge variant="default" className="bg-purple-600">Mega Menü</badge_1.Badge>;
            case 'dropdown': return <badge_1.Badge variant="secondary">Dropdown</badge_1.Badge>;
            default: return <badge_1.Badge variant="outline">Link</badge_1.Badge>;
        }
    };
    return (<div className="flex items-center gap-2 bg-background p-2 rounded-lg border group">
            <lucide_react_1.GripVertical className="h-5 w-5 text-muted-foreground cursor-grab"/>
            <div className="flex-grow">
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.href}</p>
            </div>
            <div className="flex items-center gap-2">
                {getBehaviorBadge(item.behavior)}
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button_1.Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove('up')} disabled={isFirst}>
                        <lucide_react_1.ArrowUp className="h-4 w-4"/>
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove('down')} disabled={isLast}>
                        <lucide_react_1.ArrowDown className="h-4 w-4"/>
                    </button_1.Button>
                </div>
                 <dialog_1.Dialog open={open} onOpenChange={setOpen}>
                    <dialog_1.DialogTrigger asChild>
                         <button_1.Button variant="ghost" size="icon" className="h-8 w-8">
                            <lucide_react_1.Edit className="h-4 w-4"/>
                        </button_1.Button>
                    </dialog_1.DialogTrigger>
                    <EditMenuItemDialog item={item} menuItems={allItems} onSave={onSave} onOpenChange={setOpen}/>
                </dialog_1.Dialog>
                 <button_1.Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={onDelete}>
                    <lucide_react_1.Trash2 className="h-4 w-4"/>
                </button_1.Button>
            </div>
        </div>);
};
const CategoryRow = ({ item, allItems, onMove, onSave, onDelete, level, }) => {
    const children = allItems.filter((child) => child.parentId === item.id);
    const siblings = allItems.filter(i => i.parentId === item.parentId);
    const itemIndex = siblings.findIndex(i => i.id === item.id);
    return (<div className="space-y-2">
      <div style={{ marginLeft: `${level * 2}rem` }} className="flex items-start gap-2">
        {level > 0 && <lucide_react_1.CornerDownRight className="h-5 w-5 text-muted-foreground mt-2.5 flex-shrink-0"/>}
        <div className="flex-grow">
          <MenuItem item={item} onMove={(direction) => onMove(item.id, direction)} isFirst={itemIndex === 0} isLast={itemIndex === siblings.length - 1} allItems={allItems} onSave={onSave} onDelete={() => onDelete(item.id)}/>
        </div>
      </div>
      {children.map((child) => (<CategoryRow key={child.id} item={child} allItems={allItems} onMove={onMove} onSave={onSave} onDelete={onDelete} level={level + 1}/>))}
    </div>);
};
function MenuManagementPage() {
    const [menusData, setMenusData] = (0, react_1.useState)(menu_data_1.menus);
    const [activeMenuId, setActiveMenuId] = (0, react_1.useState)(menusData[0].id);
    const activeMenu = menusData.find(m => m.id === activeMenuId);
    const handleMove = (menuId, itemId, direction) => {
        setMenusData(currentMenusData => {
            const newMenusData = JSON.parse(JSON.stringify(currentMenusData));
            const menu = newMenusData.find((m) => m.id === menuId);
            if (!menu)
                return currentMenusData;
            const targetItem = menu.items.find((i) => i.id === itemId);
            if (!targetItem)
                return currentMenusData;
            const siblings = menu.items.filter((i) => i.parentId === targetItem.parentId);
            const currentIndexInSiblings = siblings.findIndex((item) => item.id === itemId);
            if (currentIndexInSiblings === -1)
                return currentMenusData;
            const newIndexInSiblings = direction === 'up' ? currentIndexInSiblings - 1 : currentIndexInSiblings + 1;
            if (newIndexInSiblings < 0 || newIndexInSiblings >= siblings.length)
                return currentMenusData;
            const otherItemInSiblings = siblings[newIndexInSiblings];
            const targetItemGlobalIndex = menu.items.findIndex((i) => i.id === targetItem.id);
            const otherItemGlobalIndex = menu.items.findIndex((i) => i.id === otherItemInSiblings.id);
            if (targetItemGlobalIndex > -1 && otherItemGlobalIndex > -1) {
                [menu.items[targetItemGlobalIndex], menu.items[otherItemGlobalIndex]] = [menu.items[otherItemGlobalIndex], menu.items[targetItemGlobalIndex]];
            }
            return newMenusData;
        });
    };
    const handleSaveItem = (updatedItem) => {
        setMenusData(currentMenusData => {
            return currentMenusData.map(menu => {
                if (menu.id === activeMenuId) {
                    const newItems = menu.items.map(item => item.id === updatedItem.id ? updatedItem : item);
                    return { ...menu, items: newItems };
                }
                return menu;
            });
        });
    };
    const handleDeleteItem = (itemId) => {
        setMenusData(currentMenusData => {
            return currentMenusData.map(menu => {
                if (menu.id === activeMenuId) {
                    // Also remove children of the deleted item
                    let itemsToDelete = new Set([itemId]);
                    let newItems = [...menu.items];
                    let changed = true;
                    while (changed) {
                        changed = false;
                        newItems = newItems.filter(item => {
                            if (item.parentId && itemsToDelete.has(item.parentId)) {
                                itemsToDelete.add(item.id);
                                changed = true;
                                return false;
                            }
                            return true;
                        });
                    }
                    newItems = newItems.filter(item => !itemsToDelete.has(item.id));
                    return { ...menu, items: newItems };
                }
                return menu;
            });
        });
    };
    const handleAddItem = () => {
        setMenusData(currentMenusData => {
            return currentMenusData.map(menu => {
                if (menu.id === activeMenuId) {
                    const newItem = {
                        id: `new-item-${Date.now()}`,
                        title: 'Yeni Öğe',
                        href: '#',
                        behavior: 'link',
                        parentId: null
                    };
                    return { ...menu, items: [...menu.items, newItem] };
                }
                return menu;
            });
        });
    };
    return (<div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Menü Yönetimi</h1>
                    <p className="text-muted-foreground">
                        Web sitenizin ana navigasyonunu ve diğer menülerini buradan yönetin.
                    </p>
                </div>
            </div>

            <card_1.Card>
                <tabs_1.Tabs value={activeMenuId} onValueChange={setActiveMenuId}>
                    <card_1.CardHeader className="flex flex-row items-center justify-between">
                        <tabs_1.TabsList>
                            {menusData.map(menu => (<tabs_1.TabsTrigger key={menu.id} value={menu.id}>{menu.name}</tabs_1.TabsTrigger>))}
                        </tabs_1.TabsList>
                        <button_1.Button onClick={handleAddItem}>
                            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                            Yeni Menü Öğesi Ekle
                        </button_1.Button>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        {menusData.map(menu => (<tabs_1.TabsContent key={menu.id} value={menu.id}>
                               <div className="space-y-2">
                                {activeMenu && activeMenu.items.filter(i => i.parentId === null).map(item => (<CategoryRow key={item.id} item={item} allItems={activeMenu.items} onMove={(itemId, direction) => handleMove(menu.id, itemId, direction)} onSave={handleSaveItem} onDelete={handleDeleteItem} level={0}/>))}
                               </div>
                            </tabs_1.TabsContent>))}
                    </card_1.CardContent>
                </tabs_1.Tabs>
            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map