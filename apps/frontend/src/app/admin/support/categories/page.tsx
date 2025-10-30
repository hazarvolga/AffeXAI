'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PlusCircle,
  Edit,
  Trash2,
  GripVertical,
  ChevronRight,
  ChevronDown,
  Power,
  PowerOff,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ticketCategoryService, { type TicketCategory, type CreateCategoryDto } from '@/lib/api/ticketCategoryService';
import { ColorPicker } from '@/components/common/color-picker';
import { IconPicker } from '@/components/common/icon-picker';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CategoryFormData {
  name: string;
  description: string;
  parentId: string;
  color: string;
  icon: string;
}

interface SortableCategoryProps {
  category: TicketCategory;
  level: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (category: TicketCategory) => void;
  onDelete: (category: TicketCategory) => void;
  onToggleActive: (category: TicketCategory) => void;
}

function SortableCategory({
  category,
  level,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onToggleActive,
}: SortableCategoryProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = category.icon ? (Icons as any)[category.icon] : Icons.FolderTree;
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
        style={{ marginLeft: `${level * 32}px` }}
      >
        {/* Drag handle */}
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </div>

        {/* Expand/collapse button */}
        {hasChildren && (
          <button
            onClick={onToggleExpand}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}

        {/* Icon */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded border"
          style={{ backgroundColor: category.color || '#e5e7eb', borderColor: category.color || '#d1d5db' }}
        >
          {IconComponent && <IconComponent className="h-5 w-5" style={{ color: category.color ? '#fff' : '#6b7280' }} />}
        </div>

        {/* Category name */}
        <div className="flex-1">
          <div className="font-medium">{category.name}</div>
          {category.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">{category.description}</div>
          )}
        </div>

        {/* Ticket count */}
        <Badge variant="secondary">{category.ticketCount || 0} tickets</Badge>

        {/* Active status */}
        {category.isActive ? (
          <Badge variant="default" className="bg-green-600">Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        )}

        {/* Actions */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleActive(category)}
            title={category.isActive ? 'Deactivate' : 'Activate'}
          >
            {category.isActive ? (
              <PowerOff className="h-4 w-4 text-orange-600" />
            ) : (
              <Power className="h-4 w-4 text-green-600" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category)}
            disabled={hasChildren || (category.ticketCount || 0) > 0}
            title={
              hasChildren
                ? 'Cannot delete category with subcategories'
                : (category.ticketCount || 0) > 0
                ? 'Cannot delete category with tickets'
                : 'Delete'
            }
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SupportCategoriesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TicketCategory | null>(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState<TicketCategory | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    parentId: '',
    color: '#0D9488',
    icon: 'FolderTree',
  });

  // Queries
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['ticket-categories'],
    queryFn: () => ticketCategoryService.getAll(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => ticketCategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-categories'] });
      toast({ title: 'Success', description: 'Category created successfully' });
      handleCloseForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create category',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryDto }) =>
      ticketCategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-categories'] });
      toast({ title: 'Success', description: 'Category updated successfully' });
      handleCloseForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update category',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ticketCategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-categories'] });
      toast({ title: 'Success', description: 'Category deleted successfully' });
      setDeleteConfirmCategory(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete category',
        variant: 'destructive',
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      ticketCategoryService.toggleActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-categories'] });
      toast({ title: 'Success', description: 'Category status updated' });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (categories: TicketCategory[]) =>
      ticketCategoryService.reorder({
        categories: categories.map((cat, index) => ({
          id: cat.id,
          order: index,
          parentId: cat.parentId,
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-categories'] });
    },
  });

  // Handlers
  const handleNewCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      parentId: '',
      color: '#0D9488',
      icon: 'FolderTree',
    });
    setIsFormOpen(true);
  };

  const handleEdit = (category: TicketCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      parentId: category.parentId || '',
      color: category.color || '#0D9488',
      icon: category.icon || 'FolderTree',
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateCategoryDto = {
      name: formData.name,
      description: formData.description || undefined,
      parentId: formData.parentId || undefined,
      color: formData.color,
      icon: formData.icon,
      isActive: true,
    };

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (category: TicketCategory) => {
    setDeleteConfirmCategory(category);
  };

  const handleToggleActive = (category: TicketCategory) => {
    toggleActiveMutation.mutate({
      id: category.id,
      isActive: !category.isActive,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      const reorderedCategories = arrayMove(categories, oldIndex, newIndex);
      reorderMutation.mutate(reorderedCategories);
    }
  };

  // Render tree recursively
  const renderTree = (cats: TicketCategory[], parentId: string | null = null, level = 0): React.ReactNode[] => {
    const children = cats.filter((c) => (c.parentId || null) === parentId);

    return children.flatMap((category) => {
      const isExpanded = expandedIds.has(category.id);
      const hasChildren = category.children && category.children.length > 0;

      const items = [
        <SortableCategory
          key={category.id}
          category={category}
          level={level}
          isExpanded={isExpanded}
          onToggleExpand={() => toggleExpand(category.id)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />,
      ];

      if (hasChildren && isExpanded) {
        items.push(...renderTree(cats, category.id, level + 1));
      }

      return items;
    });
  };

  return (
    <div className="flex-1 space-y-6 p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ticket Categories</CardTitle>
            <CardDescription>
              Manage categories to organize support tickets with colors, icons, and hierarchy
            </CardDescription>
          </div>
          <Button onClick={handleNewCategory}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Category
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No categories found. Create your first category!
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">{renderTree(categories)}</div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Update the category details below'
                : 'Create a new category with custom color and icon'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select
                    value={formData.parentId}
                    onValueChange={(value) => setFormData({ ...formData, parentId: value === 'none' ? '' : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None (Root category)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Root category)</SelectItem>
                      {categories
                        .filter((c) => !c.parentId && c.id !== editingCategory?.id)
                        .map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Color"
                  value={formData.color}
                  onChange={(color) => setFormData({ ...formData, color })}
                />
                <IconPicker
                  label="Icon"
                  value={formData.icon}
                  onChange={(icon) => setFormData({ ...formData, icon })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingCategory ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmCategory} onOpenChange={(open) => !open && setDeleteConfirmCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete category <span className="font-semibold">{deleteConfirmCategory?.name}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmCategory && deleteMutation.mutate(deleteConfirmCategory.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
