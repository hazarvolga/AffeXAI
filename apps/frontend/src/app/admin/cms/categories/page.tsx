'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { cmsCategoryService } from '@/lib/cms/category-service';
import { Edit, Plus, Trash2, ChevronRight, ChevronDown, Folder, FolderOpen, GripVertical, FolderTree } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CmsCategory, CmsCategoryTree, CreateCmsCategoryDto, UpdateCmsCategoryDto } from '@affexai/shared-types';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  isActive: boolean;
}

const CmsCategoriesPage = () => {
  const [categoryTree, setCategoryTree] = useState<CmsCategoryTree[]>([]);
  const [allCategories, setAllCategories] = useState<CmsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CmsCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [draggedCategoryId, setDraggedCategoryId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    parentId: null,
    isActive: true,
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const [tree, flat] = await Promise.all([
        cmsCategoryService.getCategoryTree(),
        cmsCategoryService.getCategories(),
      ]);
      setCategoryTree(tree);
      setAllCategories(flat);
      
      // Auto-expand all categories on initial load
      const allIds = new Set<string>();
      const collectIds = (items: CmsCategoryTree[]) => {
        items.forEach((item) => {
          allIds.add(item.id);
          if (item.children?.length > 0) {
            collectIds(item.children);
          }
        });
      };
      collectIds(tree);
      setExpandedCategories(allIds);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Hata',
        description: error.response?.data?.error?.message || 'Kategoriler yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      parentId: null,
      isActive: true,
    });
    setDialogOpen(true);
  };

  const handleEditCategory = (category: CmsCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId ?? null,
      isActive: category.isActive,
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (category: CmsCategory) => {
    setCategoryToDelete({ id: category.id, name: category.name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setIsDeleting(true);
      await cmsCategoryService.deleteCategory(categoryToDelete.id);
      toast({
        title: 'Başarılı',
        description: 'Kategori silindi',
      });
      await fetchCategories();
      setCategoryToDelete(null);
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Hata',
        description: error.response?.data?.error?.message || 'Kategori silinirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      const payload = {
        name: formData.name,
        slug: formData.slug || undefined,
        description: formData.description || undefined,
        parentId: formData.parentId || null,
        isActive: formData.isActive,
      };

      if (editingCategory) {
        await cmsCategoryService.updateCategory(editingCategory.id, payload as UpdateCmsCategoryDto);
        toast({
          title: 'Başarılı',
          description: 'Kategori güncellendi',
        });
      } else {
        await cmsCategoryService.createCategory(payload as CreateCmsCategoryDto);
        toast({
          title: 'Başarılı',
          description: 'Kategori oluşturuldu',
        });
      }

      setDialogOpen(false);
      await fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: 'Hata',
        description: error.response?.data?.error?.message || 'Kategori kaydedilirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Count total categories in tree (including children)
  const countCategoriesInTree = (categories: CmsCategoryTree[]): number => {
    let count = 0;
    const traverse = (items: CmsCategoryTree[]) => {
      items.forEach((item) => {
        count++;
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };
    traverse(categories);
    return count;
  };

  // Check if dropping would create circular reference
  const checkCircularReference = (nodeId: string, targetId: string): boolean => {
    if (nodeId === targetId) return true;

    const findNode = (categories: CmsCategoryTree[], id: string): CmsCategoryTree | null => {
      for (const cat of categories) {
        if (cat.id === id) return cat;
        if (cat.children) {
          const found = findNode(cat.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const isDescendant = (parent: CmsCategoryTree, childId: string): boolean => {
      if (!parent.children) return false;
      for (const child of parent.children) {
        if (child.id === childId) return true;
        if (isDescendant(child, childId)) return true;
      }
      return false;
    };

    const targetNode = findNode(categoryTree, targetId);
    if (!targetNode) return false;

    return isDescendant(targetNode, nodeId);
  };

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, categoryId: string) => {
    setDraggedCategoryId(categoryId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedCategoryId || draggedCategoryId === targetCategoryId) return;
    if (checkCircularReference(draggedCategoryId, targetCategoryId)) return;

    setDropTargetId(targetCategoryId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDropTargetId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetCategoryId: string | null) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedCategoryId) return;
    if (draggedCategoryId === targetCategoryId) return;
    if (targetCategoryId && checkCircularReference(draggedCategoryId, targetCategoryId)) return;

    try {
      // Update the category's parent
      const draggedCategory = allCategories.find((c) => c.id === draggedCategoryId);
      if (!draggedCategory) return;

      await cmsCategoryService.updateCategory(draggedCategoryId, {
        ...draggedCategory,
        parentId: targetCategoryId,
      });

      // Reload categories
      await fetchCategories();
      
      toast({
        title: 'Başarılı',
        description: 'Kategori taşındı',
      });
    } catch (error) {
      console.error('Error reordering category:', error);
      toast({
        title: 'Hata',
        description: 'Kategori sıralaması güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setDraggedCategoryId(null);
      setDropTargetId(null);
    }
  };

  const handleDropOnRoot = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedCategoryId) return;

    try {
      const draggedCategory = allCategories.find((c) => c.id === draggedCategoryId);
      if (!draggedCategory) return;

      await cmsCategoryService.updateCategory(draggedCategoryId, {
        ...draggedCategory,
        parentId: null,
      });

      await fetchCategories();
      
      toast({
        title: 'Başarılı',
        description: 'Kategori ana kategoriye taşındı',
      });
    } catch (error) {
      console.error('Error moving to root:', error);
      toast({
        title: 'Hata',
        description: 'Kategori taşınırken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setDraggedCategoryId(null);
      setDropTargetId(null);
    }
  };

  const renderCategoryTree = (items: CmsCategoryTree[], level: number = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedCategories.has(item.id);
      const paddingLeft = level * 24;
      const isDragging = draggedCategoryId === item.id;
      const isDropTarget = dropTargetId === item.id;
      const canDrop = draggedCategoryId && !checkCircularReference(draggedCategoryId, item.id);

      return (
        <div key={item.id}>
          <div
            className={`flex items-center justify-between p-3 hover:bg-gray-50 border-b group transition-all ${
              isDragging ? 'opacity-50' : ''
            } ${isDropTarget && canDrop ? 'ring-2 ring-primary ring-dashed bg-blue-50' : ''}`}
            style={{ paddingLeft: `${paddingLeft + 12}px` }}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => {
              if (canDrop) {
                handleDragOver(e, item.id);
              }
            }}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              if (canDrop) {
                handleDrop(e, item.id);
              }
            }}
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} p-1 hover:bg-gray-200 rounded`}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>

              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <div className="w-6" />
              )}
              
              {isExpanded && hasChildren ? (
                <FolderOpen className="h-5 w-5 text-blue-600" />
              ) : (
                <Folder className="h-5 w-5 text-gray-600" />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  {!item.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Pasif
                    </Badge>
                  )}
                  {hasChildren && (
                    <Badge variant="outline" className="text-xs">
                      {countCategoriesInTree([item])} öğe
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">({item.slug})</span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const category = allCategories.find((c) => c.id === item.id);
                  if (category) handleEditCategory(category);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const category = allCategories.find((c) => c.id === item.id);
                  if (category) handleDeleteClick(category);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>

          {hasChildren && isExpanded && renderCategoryTree(item.children, level + 1)}
        </div>
      );
    });
  };

  // Get available parent categories (excluding the current category and its children)
  const getAvailableParentCategories = (): CmsCategory[] => {
    if (!editingCategory) return allCategories;

    // Exclude self and all descendants
    const excludeIds = new Set<string>([editingCategory.id]);
    
    const collectDescendants = (parentId: string) => {
      allCategories.forEach((cat) => {
        if (cat.parentId === parentId) {
          excludeIds.add(cat.id);
          collectDescendants(cat.id);
        }
      });
    };
    
    collectDescendants(editingCategory.id);
    
    return allCategories.filter((cat) => !excludeIds.has(cat.id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Kategoriler yükleniyor...</div>
      </div>
    );
  }

  // Get all root categories for the category list
  const rootCategories = categoryTree;
  const totalCategories = countCategoriesInTree(categoryTree);

  // Find selected category in the tree
  const findCategoryInTree = (id: string, categories: CmsCategoryTree[]): CmsCategoryTree | null => {
    for (const cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategoryInTree(id, cat.children);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedCategory = selectedCategoryId ? findCategoryInTree(selectedCategoryId, categoryTree) : null;

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Card - Category List */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5" />
                  Kategoriler
                </CardTitle>
                <Button size="sm" onClick={handleCreateCategory}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              {categoryTree.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  Henüz kategori yok
                </div>
              ) : (
                <div className="space-y-1">
                  {rootCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategoryId === category.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        if (!expandedCategories.has(category.id)) {
                          toggleExpand(category.id);
                        }
                      }}
                      onDoubleClick={() => {
                        const cat = allCategories.find((c) => c.id === category.id);
                        if (cat) handleEditCategory(cat);
                      }}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Folder className="h-4 w-4" />
                        <span className="flex-1">{category.name}</span>
                        <div className="flex items-center gap-1">
                          <Badge variant={category.isActive ? 'default' : 'secondary'} className="text-xs">
                            {countCategoriesInTree([category])}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Card - Category Tree Editor */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory ? selectedCategory.name : 'Kategori Ağacı'}
              </CardTitle>
            </CardHeader>
            <CardContent
              onDragOver={(e) => {
                e.preventDefault();
                setDropTargetId(null);
              }}
              onDrop={handleDropOnRoot}
            >
              {categoryTree.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Henüz kategori oluşturulmamış. Başlamak için sol taraftaki + butonuna tıklayın.
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  {renderCategoryTree(categoryTree)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? 'Kategori bilgilerini güncelleyin'
                  : 'Yeni bir kategori oluşturun'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Kategori Adı *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: Blog, Haberler"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Otomatik oluşturulur"
                />
                <p className="text-xs text-gray-500">
                  Boş bırakılırsa kategori adından otomatik oluşturulur
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kategori açıklaması"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="parentId">Üst Kategori</Label>
                <Select
                  value={formData.parentId || 'none'}
                  onValueChange={(value) =>
                    setFormData({ ...formData, parentId: value === 'none' ? null : value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ana Kategori</SelectItem>
                    {getAvailableParentCategories().map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="isActive">Aktif</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isSaving}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Kaydediliyor...' : editingCategory ? 'Güncelle' : 'Oluştur'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        itemName={categoryToDelete?.name || ''}
        isDeleting={isDeleting}
        title="Kategori Sil"
        description="Bu kategoriyi silmek istediğinizden emin misiniz?"
      />
    </div>
  );
};

export default CmsCategoriesPage;
