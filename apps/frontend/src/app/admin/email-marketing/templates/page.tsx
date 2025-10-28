'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutTemplate, PlusCircle, Eye, Pen, Palette, Wand2 } from 'lucide-react';
import Link from 'next/link';
import templatesService from '@/lib/api/templatesService';
import { EmailTemplate } from '@affexai/shared-types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from "next/image";
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

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
            <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Şablonlar yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
            <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-destructive">{error}</div>
        </div>
      </div>
    );
  }

  // All templates are from database now (Database-Only Architecture)
  const allTemplates = templates.map(template => ({
    id: template.id,
    name: template.name,
    description: template.description || 'Database template',
    thumbnailUrl: template.thumbnailUrl || '/placeholders/template-default.png',
    createdAt: template.createdAt,
    type: 'db' as const,
    templateType: template.type,
    isCustom: template.type === 'custom',
    hasDesignSystem: designSystemTemplates.includes(template.id)
  }));

  const totalCount = templates.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Şablonları Yönet</h1>
            <p className="text-muted-foreground">Yeniden kullanılabilir e-posta şablonları oluşturun ve yönetin.</p>
          </div>
        </div>
        <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Link href="/admin/email-marketing/templates/builder">
            <Wand2 className="mr-2 h-5 w-5" />
            Email Builder
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Şablonlar</CardTitle>
                <CardDescription>
                  Mevcut e-posta şablonlarınızı görüntüleyin ve yönetin. Toplam {totalCount} şablon.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <Palette className="w-3 h-3 mr-1" />
                  {allTemplates.filter(t => t.hasDesignSystem).length} DS
                </Badge>
                <Badge variant="secondary">
                  {allTemplates.filter(t => !t.hasDesignSystem).length} Eski
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {allTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <LayoutTemplate className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Henüz Şablon Oluşturulmadı</h3>
                <p className="text-muted-foreground">
                  Email Builder ile yeni şablonlar oluşturarak e-posta gönderimlerinizi kolaylaştırın.
                </p>
              </div>
              <Button asChild>
                <Link href="/admin/email-marketing/templates/builder">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Email Builder ile Oluştur
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Önizleme</TableHead>
                  <TableHead>Şablon Adı</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Oluşturulma Tarihi</TableHead>
                  <TableHead className="text-right">Eylemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTemplates.map((template) => (
                  <TableRow key={`${template.type}-${template.id}`}>
                    <TableCell>
                      <Image 
                        src={template.thumbnailUrl} 
                        alt={template.name}
                        width={120}
                        height={90}
                        className="rounded-md border aspect-[4/3] object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {template.name}
                      {template.isCustom && (
                        <Badge variant="secondary" className="ml-2">Özelleştirilmiş</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{template.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {template.type === 'db' ? (
                          <Badge variant="default" className="bg-blue-600">
                            <Database className="w-3 h-3 mr-1" />
                            Database
                          </Badge>
                        ) : (
                          <Badge variant="default" className="bg-green-600">
                            <FileText className="w-3 h-3 mr-1" />
                            TSX File
                          </Badge>
                        )}
                        {template.hasDesignSystem && (
                          <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                            <Palette className="w-3 h-3 mr-1" />
                            DS
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(template.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2" asChild>
                        <Link href={`/admin/email-marketing/templates/${template.id}/preview`}>
                          <Eye className="mr-2 h-4 w-4" /> Önizle
                        </Link>
                      </Button>

                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/admin/email-marketing/templates/${template.id}/edit`}>
                          <Pen className="mr-2 h-4 w-4" /> Düzenle
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}