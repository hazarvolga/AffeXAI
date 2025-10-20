'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, ArrowUp, ArrowDown, Save, CornerDownRight, Loader2, Menu as MenuIcon, GripVertical } from "lucide-react";
import type { CmsMenu, CmsMenuItem, MenuLocation } from '@affexai/shared-types';
import { MenuItemType } from '@affexai/shared-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cmsMenuService } from '@/lib/cms/menu-service';
import { useToast } from '@/hooks/use-toast';

// Delete Confirm Dialog Component
const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
          <Button variant="destructive" onClick={() => { onConfirm(); onOpenChange(false); }}>
            Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Menu Dialog Component
const MenuDialog = ({ 
  menu, 
  onSave, 
  onOpenChange 
}: { 
  menu?: CmsMenu;
  onSave: (data: { name: string; slug: string; location: MenuLocation; isActive: boolean }) => void;
  onOpenChange: (open: boolean) => void;
}) => {
  const [name, setName] = useState(menu?.name || '');
  const [slug, setSlug] = useState(menu?.slug || '');
  const [location, setLocation] = useState<MenuLocation>((menu?.location as MenuLocation) || 'header');
  const [isActive, setIsActive] = useState(menu?.isActive ?? true);

  const handleSave = () => {
    onSave({ name, slug, location, isActive });
    onOpenChange(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{menu ? 'Menü Düzenle' : 'Yeni Menü Oluştur'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="menu-name">Menü Adı</Label>
          <Input id="menu-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ana Menü" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="menu-slug">Slug</Label>
          <Input id="menu-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ana-menu" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="menu-location">Konum</Label>
          <Select value={location} onValueChange={(value) => setLocation(value as MenuLocation)}>
            <SelectTrigger id="menu-location">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="footer">Footer</SelectItem>
              <SelectItem value="sidebar">Sidebar</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="menu-active">Aktif</Label>
          <Switch id="menu-active" checked={isActive} onCheckedChange={setIsActive} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
        <Button onClick={handleSave} disabled={!name || !slug}>
          <Save className="mr-2 h-4 w-4"/> Kaydet
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

// Menu Item Dialog Component
const MenuItemDialog = ({ 
  item, 
  menuId,
  menuItems, 
  onSave, 
  onOpenChange 
}: { 
  item?: CmsMenuItem;
  menuId: string;
  menuItems: CmsMenuItem[];
  onSave: (data: {
    label: string;
    type: MenuItemType;
    url?: string;
    parentId?: string | null;
    target?: '_blank' | '_self';
    icon?: string;
    isActive: boolean;
  }) => void;
  onOpenChange: (open: boolean) => void;
}) => {
  const [label, setLabel] = useState(item?.label || '');
  const [type, setType] = useState<MenuItemType>(item?.type || MenuItemType.CUSTOM);
  const [url, setUrl] = useState(item?.url || '');
  const [parentId, setParentId] = useState<string | null>(item?.parentId || null);
  const [target, setTarget] = useState<'_blank' | '_self'>(item?.target || '_self');
  const [icon, setIcon] = useState(item?.icon || '');
  const [isActive, setIsActive] = useState(item?.isActive ?? true);

  const getValidParentOptions = (items: CmsMenuItem[], currentItemId?: string): CmsMenuItem[] => {
    if (!currentItemId) return items;
    
    let childIds = new Set<string>();

    const findChildrenRecursive = (parentId: string) => {
      const children = items.filter(i => i.parentId === parentId);
      for (const child of children) {
        childIds.add(child.id);
        findChildrenRecursive(child.id);
      }
    };

    findChildrenRecursive(currentItemId);
    return items.filter(i => i.id !== currentItemId && !childIds.has(i.id));
  };
  
  const potentialParents = getValidParentOptions(menuItems, item?.id);

  const handleSave = () => {
    onSave({
      label,
      type,
      url: type === MenuItemType.CUSTOM ? url : undefined,
      parentId: parentId || null,
      target,
      icon,
      isActive
    });
    onOpenChange(false);
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{item ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi Ekle'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-label">Etiket</Label>
            <Input 
              id="item-label" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)} 
              placeholder="Ana Sayfa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-type">Tip</Label>
            <Select value={type} onValueChange={(value) => setType(value as MenuItemType)}>
              <SelectTrigger id="item-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MenuItemType.CUSTOM}>Özel Link</SelectItem>
                <SelectItem value={MenuItemType.PAGE}>Sayfa</SelectItem>
                <SelectItem value={MenuItemType.CATEGORY}>Kategori</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {type === MenuItemType.CUSTOM && (
          <div className="space-y-2">
            <Label htmlFor="item-url">URL</Label>
            <Input 
              id="item-url" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="/hakkimizda"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-parent">Üst Öğe</Label>
            <Select value={parentId || 'none'} onValueChange={(val) => setParentId(val === 'none' ? null : val)}>
              <SelectTrigger id="item-parent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Yok (Ana Öğe)</SelectItem>
                {potentialParents.map(parent => (
                  <SelectItem key={parent.id} value={parent.id}>
                    {parent.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-target">Hedef</Label>
            <Select value={target} onValueChange={(value) => setTarget(value as '_blank' | '_self')}>
              <SelectTrigger id="item-target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_self">Aynı Pencere</SelectItem>
                <SelectItem value="_blank">Yeni Pencere</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-icon">İkon (isteğe bağlı)</Label>
          <Input 
            id="item-icon" 
            value={icon} 
            onChange={(e) => setIcon(e.target.value)} 
            placeholder="home"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="item-active">Aktif</Label>
          <Switch 
            id="item-active" 
            checked={isActive} 
            onCheckedChange={setIsActive}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
        <Button onClick={handleSave} disabled={!label}>
          <Save className="mr-2 h-4 w-4"/> Kaydet
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

// Menu Item Component
const MenuItem = ({ 
  item, 
  onMove, 
  isFirst, 
  isLast, 
  onEdit,
  onDelete,
  isDragging
}: { 
  item: CmsMenuItem;
  onMove: (direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
  isDragging: boolean;
}) => {
  const getTypeBadge = (type: MenuItemType) => {
    switch (type) {
      case MenuItemType.PAGE: return <Badge variant="default">Sayfa</Badge>;
      case MenuItemType.CATEGORY: return <Badge variant="secondary">Kategori</Badge>;
      default: return <Badge variant="outline">Link</Badge>;
    }
  };

  return (
    <div className={`flex items-center gap-2 bg-background p-3 rounded-lg border group hover:border-primary/50 transition-colors ${isDragging ? 'opacity-50' : ''}`}>
      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing flex-shrink-0" />
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{item.label}</p>
          {item.icon && <span className="text-xs text-muted-foreground">({item.icon})</span>}
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.url || item.type}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {getTypeBadge(item.type)}
        {!item.isActive && <Badge variant="destructive" className="text-xs">Pasif</Badge>}
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove('up')} disabled={isFirst}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove('down')} disabled={isLast}>
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Tree Row Component with Drag & Drop
const TreeRow = ({
  item,
  allItems,
  onMove,
  onEdit,
  onDelete,
  onReorder,
  level,
}: {
  item: CmsMenuItem;
  allItems: CmsMenuItem[];
  onMove: (itemId: string, direction: "up" | "down") => void;
  onEdit: (item: CmsMenuItem) => void;
  onDelete: (itemId: string) => void;
  onReorder: (draggedId: string, targetParentId: string | null, index: number) => void;
  level: number;
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  
  const children = allItems.filter((child) => child.parentId === item.id);
  const siblings = allItems.filter(i => i.parentId === item.parentId);
  const itemIndex = siblings.findIndex(i => i.id === item.id);

  // Check for circular reference
  const checkCircularReference = (nodeId: string, targetId: string): boolean => {
    if (nodeId === targetId) return true;
    const childItems = allItems.filter((child) => child.parentId === nodeId);
    return childItems.some((child) => checkCircularReference(child.id, targetId));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('menuItemId', item.id);
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const draggedId = e.dataTransfer.getData('menuItemId');
    if (draggedId && draggedId !== item.id) {
      // Check if trying to drop item into its own children (prevent circular reference)
      const isCircular = checkCircularReference(item.id, draggedId);
      if (!isCircular) {
        const newIndex = children.length;
        onReorder(draggedId, item.id, newIndex);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div 
        style={{ marginLeft: `${level * 2}rem` }} 
        className="flex items-start gap-2"
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {level > 0 && <CornerDownRight className="h-5 w-5 text-muted-foreground mt-3 flex-shrink-0" />}
        <div className={`flex-grow min-w-0 ${isDragOver ? 'ring-2 ring-primary ring-dashed rounded-lg' : ''}`}>
          <MenuItem
            item={item}
            onMove={(direction) => onMove(item.id, direction)}
            isFirst={itemIndex === 0}
            isLast={itemIndex === siblings.length - 1}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
            isDragging={false}
          />
        </div>
      </div>
      {children.map((child) => (
        <TreeRow
          key={child.id}
          item={child}
          allItems={allItems}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
          onReorder={onReorder}
          level={level + 1}
        />
      ))}
    </div>
  );
};

// Main Page Component
export default function MenuManagementPage() {
  const [menus, setMenus] = useState<CmsMenu[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<CmsMenu | undefined>();
  const [editingItem, setEditingItem] = useState<CmsMenuItem | undefined>();
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { toast } = useToast();

  const activeMenu = menus.find(m => m.id === activeMenuId);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await cmsMenuService.getMenus();
      setMenus(data);
      if (data.length > 0 && !activeMenuId) {
        setActiveMenuId(data[0].id);
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menüler yüklenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMenu = async (data: { name: string; slug: string; location: MenuLocation; isActive: boolean }) => {
    try {
      const newMenu = await cmsMenuService.createMenu(data);
      setMenus([...menus, newMenu]);
      setActiveMenuId(newMenu.id);
      toast({
        title: 'Başarılı',
        description: 'Menü başarıyla oluşturuldu.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü oluşturulurken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateMenu = async (data: { name: string; slug: string; location: MenuLocation; isActive: boolean }) => {
    if (!editingMenu) return;
    
    try {
      const updatedMenu = await cmsMenuService.updateMenu(editingMenu.id, data);
      setMenus(menus.map(m => m.id === updatedMenu.id ? updatedMenu : m));
      toast({
        title: 'Başarılı',
        description: 'Menü başarıyla güncellendi.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleCreateMenuItem = async (data: {
    label: string;
    type: MenuItemType;
    url?: string;
    parentId?: string | null;
    target?: '_blank' | '_self';
    icon?: string;
    isActive: boolean;
  }) => {
    if (!activeMenuId) return;

    try {
      await cmsMenuService.createMenuItem({
        menuId: activeMenuId,
        ...data,
      });

      const updatedMenu = await cmsMenuService.getMenu(activeMenuId);
      setMenus(menus.map(m => m.id === activeMenuId ? updatedMenu : m));

      toast({
        title: 'Başarılı',
        description: 'Menü öğesi başarıyla oluşturuldu.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü öğesi oluşturulurken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateMenuItem = async (data: {
    label: string;
    type: MenuItemType;
    url?: string;
    parentId?: string | null;
    target?: '_blank' | '_self';
    icon?: string;
    isActive: boolean;
  }) => {
    if (!editingItem || !activeMenuId) return;

    try {
      await cmsMenuService.updateMenuItem(editingItem.id, data);
      const updatedMenu = await cmsMenuService.getMenu(activeMenuId);
      setMenus(menus.map(m => m.id === activeMenuId ? updatedMenu : m));

      toast({
        title: 'Başarılı',
        description: 'Menü öğesi başarıyla güncellendi.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü öğesi güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    if (!activeMenuId) return;

    try {
      await cmsMenuService.deleteMenuItem(itemId);
      const updatedMenu = await cmsMenuService.getMenu(activeMenuId);
      setMenus(menus.map(m => m.id === activeMenuId ? updatedMenu : m));

      toast({
        title: 'Başarılı',
        description: 'Menü öğesi başarıyla silindi.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü öğesi silinirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setDeleteItemId(null);
    }
  };

  const handleReorderMenuItem = async (draggedId: string, targetParentId: string | null, index: number) => {
    if (!activeMenuId) return;

    try {
      // Update the dragged item's parent
      await cmsMenuService.updateMenuItem(draggedId, {
        parentId: targetParentId,
        orderIndex: index,
      });

      // Reload the menu to get updated structure
      const updatedMenu = await cmsMenuService.getMenu(activeMenuId);
      setMenus(menus.map(m => m.id === activeMenuId ? updatedMenu : m));

      toast({
        title: 'Başarılı',
        description: 'Menü öğesi başarıyla taşındı.',
      });
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü öğesi taşınırken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  const handleMoveItem = async (itemId: string, direction: 'up' | 'down') => {
    if (!activeMenu || !activeMenu.items) return;

    const targetItem = activeMenu.items.find(i => i.id === itemId);
    if (!targetItem) return;

    const siblings = activeMenu.items.filter(i => i.parentId === targetItem.parentId);
    const currentIndex = siblings.findIndex(i => i.id === itemId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= siblings.length) return;

    const otherItem = siblings[newIndex];

    try {
      await cmsMenuService.reorderMenuItems({
        menuItemIds: [targetItem.id, otherItem.id],
        orderIndexes: [otherItem.orderIndex, targetItem.orderIndex],
      });

      const updatedMenu = await cmsMenuService.getMenu(activeMenuId!);
      setMenus(menus.map(m => m.id === activeMenuId ? updatedMenu : m));
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Menü öğesi taşınırken bir hata oluştu.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menü Yönetimi</h1>
          <p className="text-muted-foreground">
            Web sitenizin navigasyonunu ve menülerini buradan yönetin.
          </p>
        </div>
        <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMenu(undefined)}>
              <MenuIcon className="mr-2 h-4 w-4"/>
              Yeni Menü Oluştur
            </Button>
          </DialogTrigger>
          <MenuDialog
            menu={editingMenu}
            onSave={editingMenu ? handleUpdateMenu : handleCreateMenu}
            onOpenChange={setMenuDialogOpen}
          />
        </Dialog>
      </div>

      {/* Two-Card Layout: Menu List (Left) + Menu Editor (Right) */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Card - Menu List (4 columns) */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Menüler</h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setEditingMenu(undefined);
                  setMenuDialogOpen(true);
                }}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {menus.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MenuIcon className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-4">Henüz menü yok</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setMenuDialogOpen(true)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Menü Oluştur
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {menus.map(menu => (
                  <Button
                    key={menu.id}
                    variant={activeMenuId === menu.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveMenuId(menu.id)}
                    onDoubleClick={() => {
                      setEditingMenu(menu);
                      setMenuDialogOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <MenuIcon className="h-4 w-4" />
                        <span className="font-medium">{menu.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {menu.items?.length || 0}
                        </Badge>
                        {!menu.isActive && (
                          <Badge variant="outline" className="text-xs">
                            Pasif
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Card - Menu Editor (8 columns) */}
        <Card className="col-span-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <h3 className="text-lg font-semibold">
              {activeMenu ? `${activeMenu.name} - Menü Öğeleri` : 'Menü Öğeleri'}
            </h3>
            <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => setEditingItem(undefined)}
                  disabled={!activeMenuId}
                >
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  Yeni Öğe Ekle
                </Button>
              </DialogTrigger>
              <MenuItemDialog
                item={editingItem}
                menuId={activeMenuId || ''}
                menuItems={activeMenu?.items || []}
                onSave={editingItem ? handleUpdateMenuItem : handleCreateMenuItem}
                onOpenChange={setItemDialogOpen}
              />
            </Dialog>
          </CardHeader>
          <CardContent>
            {!activeMenu ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MenuIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Soldan bir menü seçin veya yeni menü oluşturun</p>
              </div>
            ) : !activeMenu.items || activeMenu.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">Bu menüde henüz öğe yok</p>
                <Button variant="outline" onClick={() => setItemDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  İlk Öğeyi Ekle
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {activeMenu.items.filter(i => !i.parentId).map(item => (
                  <TreeRow 
                    key={item.id}
                    item={item}
                    allItems={activeMenu.items || []}
                    onMove={handleMoveItem}
                    onEdit={(item) => {
                      setEditingItem(item);
                      setItemDialogOpen(true);
                    }}
                    onDelete={(itemId) => setDeleteItemId(itemId)}
                    onReorder={handleReorderMenuItem}
                    level={0}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={deleteItemId !== null}
        onOpenChange={(open: boolean) => !open && setDeleteItemId(null)}
        onConfirm={() => deleteItemId && handleDeleteMenuItem(deleteItemId)}
        title="Menü Öğesini Sil"
        description="Bu menü öğesini ve tüm alt öğelerini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </div>
  );
}
