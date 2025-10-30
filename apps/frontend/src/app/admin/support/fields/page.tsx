'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Filter, Pencil, Trash2, Power, PowerOff, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ticketFieldLibraryService, {
  type TicketFieldLibrary,
  type FieldLibraryFilters,
} from '@/lib/api/ticketFieldLibraryService';
import { FieldEditor } from '@/components/admin/field-editor';

export default function TicketFieldsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State
  const [filters, setFilters] = useState<FieldLibraryFilters>({
    page: 1,
    limit: 20,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingField, setEditingField] = useState<TicketFieldLibrary | null>(null);
  const [deleteConfirmField, setDeleteConfirmField] = useState<TicketFieldLibrary | null>(null);

  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ['ticket-field-library', filters],
    queryFn: () => ticketFieldLibraryService.getAllFields(filters),
  });

  const { data: availableTags } = useQuery({
    queryKey: ['ticket-field-library-tags'],
    queryFn: () => ticketFieldLibraryService.getAllTags(),
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: (id: string) => ticketFieldLibraryService.deleteField(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-field-library'] });
      toast({
        title: 'Başarılı',
        description: 'Alan şablonu silindi',
      });
      setDeleteConfirmField(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.response?.data?.message || 'Silme işlemi başarısız',
        variant: 'destructive',
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      ticketFieldLibraryService.toggleActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-field-library'] });
      toast({
        title: 'Başarılı',
        description: 'Alan durumu güncellendi',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.response?.data?.message || 'Güncelleme başarısız',
        variant: 'destructive',
      });
    },
  });

  // Handlers
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchQuery, page: 1 }));
  };

  const handleNewField = () => {
    setEditingField(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (field: TicketFieldLibrary) => {
    setEditingField(field);
    setIsEditorOpen(true);
  };

  const handleDelete = (field: TicketFieldLibrary) => {
    if (field.isSystemField) {
      toast({
        title: 'Uyarı',
        description: 'Sistem alanları silinemez',
        variant: 'destructive',
      });
      return;
    }
    setDeleteConfirmField(field);
  };

  const handleToggleActive = (field: TicketFieldLibrary) => {
    toggleActiveMutation.mutate({
      id: field.id,
      isActive: !field.isActive,
    });
  };

  const handleSaveField = async () => {
    queryClient.invalidateQueries({ queryKey: ['ticket-field-library'] });
    setIsEditorOpen(false);
    setEditingField(null);
  };

  const handleFilterChange = (key: keyof FieldLibraryFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  // Field type display names
  const getFieldTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      text: 'Text',
      textarea: 'Textarea',
      number: 'Number',
      email: 'Email',
      url: 'URL',
      date: 'Date',
      datetime: 'Date Time',
      time: 'Time',
      select: 'Select (Single)',
      multiselect: 'Select (Multiple)',
      radio: 'Radio Button',
      checkbox: 'Checkbox',
      file: 'File',
      'file-multiple': 'File (Multiple)',
      'file-single': 'File (Single)',
      richtext: 'Rich Text',
      html: 'HTML',
      'edd-order': 'EDD Order',
      'edd-product': 'EDD Product',
    };
    return labels[type] || type;
  };

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Fields</h1>
          <p className="text-muted-foreground mt-2">
            Ticket formlarında kullanılabilecek yeniden kullanılabilir alan şablonlarını yönetin
          </p>
        </div>
        <Button onClick={handleNewField}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Alan
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Alan adı veya açıklama ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="max-w-md"
              />
              <Button onClick={handleSearch} variant="secondary">
                <Search className="h-4 w-4 mr-2" />
                Ara
              </Button>
            </div>

            <Select
              value={filters.isActive === undefined ? 'all' : filters.isActive ? 'active' : 'inactive'}
              onValueChange={(value) =>
                handleFilterChange('isActive', value === 'all' ? undefined : value === 'active')
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>

            {filters.search && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ page: 1, limit: 20 });
                }}
              >
                Filtreleri Temizle
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alan Şablonları</CardTitle>
          <CardDescription>
            {data?.total || 0} alan şablonu bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              Veriler yüklenirken hata oluştu
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Hiç alan şablonu bulunamadı
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alan Adı</TableHead>
                    <TableHead>Etiket</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Etiketler</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Sistem Alanı</TableHead>
                    <TableHead>Oluşturulma</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((field) => (
                    <TableRow key={field.id}>
                      <TableCell className="font-medium">{field.name}</TableCell>
                      <TableCell>{field.fieldConfig.label}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getFieldTypeLabel(field.fieldConfig.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {field.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {field.isActive ? (
                          <Badge variant="default" className="bg-green-600">
                            Aktif
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pasif</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {field.isSystemField && (
                          <Badge variant="outline" className="text-blue-600">
                            Sistem
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(field.createdAt).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleActive(field)}
                            title={field.isActive ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                          >
                            {field.isActive ? (
                              <PowerOff className="h-4 w-4 text-orange-600" />
                            ) : (
                              <Power className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(field)}
                            title="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(field)}
                            disabled={field.isSystemField}
                            title={field.isSystemField ? 'Sistem alanları silinemez' : 'Sil'}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data && data.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Sayfa {data.page} / {data.totalPages} (Toplam: {data.total})
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('page', Math.max(1, (filters.page || 1) - 1))}
                      disabled={filters.page === 1}
                    >
                      Önceki
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('page', (filters.page || 1) + 1)}
                      disabled={filters.page === data.totalPages}
                    >
                      Sonraki
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Field Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingField ? 'Alanı Düzenle' : 'Yeni Alan'}
            </DialogTitle>
            <DialogDescription>
              Ticket formunda kullanılacak alanı oluşturun
            </DialogDescription>
          </DialogHeader>
          <FieldEditor
            field={editingField}
            onSave={handleSaveField}
            onCancel={() => setIsEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirmField}
        onOpenChange={(open) => !open && setDeleteConfirmField(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alan şablonunu silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold">{deleteConfirmField?.name}</span> alan şablonu silinecek.
              Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmField && deleteMutation.mutate(deleteConfirmField.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
