'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  StarOff,
  Loader2,
  Search,
  Copy,
  Eye,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TicketFormService } from '@/lib/api/ticketFormService';
import type { TicketFormDefinition } from '@/types/ticket-form.types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function TicketFormsPage() {
  const router = useRouter();
  const { toast } = useToast();

  // State
  const [forms, setForms] = useState<TicketFormDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Dialog states (only delete dialog now, builder moved to separate page)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  // Fetch forms
  const fetchForms = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching forms...');
      const data = await TicketFormService.getAllFormDefinitions();
      console.log('📋 Forms received:', data);
      console.log('📊 Forms count:', data?.length || 0);
      setForms(data);
    } catch (error) {
      console.error('❌ Error fetching forms:', error);
      toast({
        title: 'Hata',
        description: 'Form listesi yüklenirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Filter forms by search
  const filteredForms = forms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Set as default
  const handleSetDefault = async (formId: string) => {
    try {
      await TicketFormService.setAsDefault(formId);
      toast({
        title: 'Başarılı',
        description: 'Form varsayılan olarak ayarlandı',
      });
      fetchForms();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Form güncellenirken bir hata oluştu',
        variant: 'destructive',
      });
    }
  };

  // Delete form
  const handleDelete = async () => {
    if (!formToDelete) return;

    try {
      await TicketFormService.deleteFormDefinition(formToDelete);
      toast({
        title: 'Başarılı',
        description: 'Form başarıyla silindi',
      });
      fetchForms();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Form silinirken bir hata oluştu',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setFormToDelete(null);
    }
  };

  // Duplicate form
  const handleDuplicate = async (form: TicketFormDefinition) => {
    try {
      const duplicated = await TicketFormService.duplicateFormDefinition(form.id);
      toast({
        title: 'Başarılı',
        description: `"${duplicated.name}" oluşturuldu`,
      });
      fetchForms();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Form kopyalanırken bir hata oluştu',
        variant: 'destructive',
      });
    }
  };

  // Navigate to new form page
  const handleNewForm = () => {
    router.push('/admin/support/forms/new');
  };

  // Navigate to edit form page
  const handleEdit = (form: TicketFormDefinition) => {
    router.push(`/admin/support/forms/${form.id}/edit`);
  };


  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Form Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Destek talep formlarını özelleştirin ve yönetin
          </p>
        </div>
        <Button onClick={handleNewForm}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Form Oluştur
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Form Listesi</CardTitle>
          <CardDescription>
            Tüm ticket formları burada listelenir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Form ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz form oluşturulmadı'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Adı</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>Alan Sayısı</TableHead>
                  <TableHead>Versiyon</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Oluşturulma</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {form.isDefault && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                        {form.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {form.description || '-'}
                    </TableCell>
                    <TableCell>
                      {form.schema.fields.length} alan
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">v{form.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={form.isActive ? 'default' : 'secondary'}>
                        {form.isActive ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(form.createdAt), 'dd MMM yyyy', { locale: tr })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(form)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(form)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Kopyala
                          </DropdownMenuItem>
                          {!form.isDefault && (
                            <DropdownMenuItem onClick={() => handleSetDefault(form.id)}>
                              <Star className="mr-2 h-4 w-4" />
                              Varsayılan Yap
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setFormToDelete(form.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Formu Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu formu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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
