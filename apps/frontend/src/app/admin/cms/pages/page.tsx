'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog';
import { cmsService } from '@/lib/cms/cms-service';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Page, PageStatus } from '@affexai/shared-types';

const CmsAdminPage = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<PageStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, [selectedStatus]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const status = selectedStatus === 'all' ? undefined : (selectedStatus as PageStatus);
      const pagesData = await cmsService.getPages(status);
      setPages(pagesData);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter pages based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery) return pages;
    
    const query = searchQuery.toLowerCase();
    return pages.filter(page => 
      page.title.toLowerCase().includes(query) || 
      page.slug.toLowerCase().includes(query) ||
      (page.description && page.description.toLowerCase().includes(query))
    );
  }, [pages, searchQuery]);

  const handleCreatePage = async () => {
    try {
      // Create a new page with default values
      const createdPage = await cmsService.createPage({
        title: 'New Page',
        slug: 'new-page-' + Date.now(),
        description: '',
      });
      
      // Redirect to visual editor for the newly created page
      router.push(`/admin/cms/editor?pageId=${createdPage.id}`);
    } catch (error) {
      console.error('Failed to create page:', error);
      alert('Failed to create page');
    }
  };

  const handlePublishPage = async (id: string) => {
    try {
      await cmsService.publishPage(id);
      fetchPages();
    } catch (error) {
      console.error('Failed to publish page:', error);
      alert('Failed to publish page');
    }
  };

  const handleUnpublishPage = async (id: string) => {
    try {
      await cmsService.unpublishPage(id);
      fetchPages();
    } catch (error) {
      console.error('Failed to unpublish page:', error);
      alert('Failed to unpublish page');
    }
  };

  const handleDeleteClick = (page: Page) => {
    setPageToDelete({ id: page.id, title: page.title });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pageToDelete) return;

    setIsDeleting(true);
    try {
      await cmsService.deletePage(pageToDelete.id);
      
      toast({
        title: 'Sayfa silindi',
        description: `"${pageToDelete.title}" başarıyla silindi.`,
      });
      
      fetchPages();
    } catch (error) {
      console.error('Failed to delete page:', error);
      
      toast({
        title: 'Hata',
        description: 'Sayfa silinirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setPageToDelete(null);
    }
  };

  const handleEditPage = (pageId: string) => {
    router.push(`/admin/cms/editor?pageId=${pageId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">CMS Sayfa Yönetimi</h1>
            <p className="text-muted-foreground">İçerik sayfalarını yönetin</p>
          </div>
          <Button onClick={handleCreatePage}>
            <Plus className="h-4 w-4 mr-2" />
            Create Page
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select 
            value={selectedStatus} 
            onValueChange={(value: PageStatus | 'all') => setSelectedStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pages List */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sayfalar</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading pages...</p>
            ) : filteredPages.length === 0 ? (
              <p>No pages found.</p>
            ) : (
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">{page.slug}</p>
                      <p className="text-xs text-muted-foreground">
                        Status: <span className="capitalize">{page.status}</span> | 
                        Updated: {new Date(page.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPage(page.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                      {page.status !== 'published' && (
                        <Button variant="outline" size="sm" onClick={() => handlePublishPage(page.id)}>
                          Yayınla
                        </Button>
                      )}
                      {page.status === 'published' && (
                        <Button variant="outline" size="sm" onClick={() => handleUnpublishPage(page.id)}>
                          Yayından Kaldır
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(page)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Sil
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Sayfayı Sil"
        description="Bu sayfayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        itemName={pageToDelete?.title}
        isDeleting={isDeleting}
        confirmText="Evet, Sil"
        cancelText="İptal"
      />
    </div>
  );
};

export default CmsAdminPage;