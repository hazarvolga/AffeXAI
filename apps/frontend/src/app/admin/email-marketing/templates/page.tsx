'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, LayoutTemplate, Wand2, Eye, Pen, Search, Sparkles, Calendar } from 'lucide-react';
import Link from 'next/link';
import templatesService from '@/lib/api/templatesService';
import { EmailTemplate } from '@affexai/shared-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Design System entegreli template'ler listesi
const designSystemTemplates = [
  'password-reset',
  'email-verification',
  'welcome',
  'order-confirmation',
  'abandoned-cart',
  'newsletter'
];

export default function TemplatesManagementPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await templatesService.getAllTemplates();
        setTemplates(data);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Şablonlar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered and mapped templates with search
  const filteredTemplates = useMemo(() => {
    const mapped = templates.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description || 'Database template',
      createdAt: template.createdAt,
      templateType: template.type,
      isCustom: template.type === 'custom',
      hasDesignSystem: designSystemTemplates.includes(template.id)
    }));

    if (!searchQuery.trim()) {
      return mapped;
    }

    const query = searchQuery.toLowerCase();
    return mapped.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    );
  }, [templates, searchQuery]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">E-posta Şablonları</h1>
            <p className="text-sm text-muted-foreground">Yeniden kullanılabilir şablonlarınızı yönetin</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">E-posta Şablonları</h1>
            <p className="text-sm text-muted-foreground">Yeniden kullanılabilir şablonlarınızı yönetin</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-destructive">{error}</div>
        </div>
      </div>
    );
  }

  const totalCount = templates.length;
  const dsCount = filteredTemplates.filter(t => t.hasDesignSystem).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="shrink-0">
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">E-posta Şablonları</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} şablon • {dsCount} modern tasarım
            </p>
          </div>
        </div>
        <Button
          asChild
          size="default"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shrink-0"
        >
          <Link href="/admin/email-marketing/templates/builder">
            <Wand2 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Yeni Şablon</span>
            <span className="sm:hidden">Yeni</span>
          </Link>
        </Button>
      </div>

      {/* Search & Stats */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Şablon ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {filteredTemplates.length} sonuç
              </Badge>
              {dsCount > 0 && (
                <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {dsCount} Modern
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 px-4">
              <LayoutTemplate className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {searchQuery ? 'Sonuç Bulunamadı' : 'Henüz Şablon Yok'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery
                    ? 'Arama kriterlerinize uygun şablon bulunamadı.'
                    : 'Email Builder ile ilk şablonunuzu oluşturun.'
                  }
                </p>
              </div>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/admin/email-marketing/templates/builder">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Şablon Oluştur
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Şablon</TableHead>
                    <TableHead className="hidden md:table-cell">Açıklama</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Tarih
                    </TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="truncate">{template.name}</span>
                            {template.hasDesignSystem && (
                              <Badge
                                variant="outline"
                                className="text-xs border-orange-500 text-orange-600 shrink-0"
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                Modern
                              </Badge>
                            )}
                            {template.isCustom && (
                              <Badge variant="secondary" className="text-xs shrink-0">
                                Özel
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground md:hidden truncate">
                            {template.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-xs truncate">
                        {template.description}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {new Date(template.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-8 px-2 sm:px-3"
                          >
                            <Link href={`/admin/email-marketing/templates/${template.id}/preview`}>
                              <Eye className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Önizle</span>
                            </Link>
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            asChild
                            className="h-8 px-2 sm:px-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          >
                            <Link href={`/admin/email-marketing/templates/${template.id}/edit`}>
                              <Pen className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Düzenle</span>
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
