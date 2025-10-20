'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';
import emailCampaignsService, { EmailCampaign, UpdateCampaignDto } from '@/lib/api/emailCampaignsService';
import templatesService, { TemplateResponse } from '@/lib/api/templatesService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.campaignId as string;
  
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [templates, setTemplates] = useState<TemplateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    templateId: '',
    fromName: '',
    fromEmail: '',
    replyTo: '',
  });

  useEffect(() => {
    if (campaignId) {
      fetchData();
    }
  }, [campaignId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch campaign and templates in parallel
      const [campaignData, templatesData] = await Promise.all([
        emailCampaignsService.getById(campaignId),
        templatesService.getAllTemplates()
      ]);
      
      setCampaign(campaignData);
      setTemplates(templatesData);
      
      // Set form data
      setFormData({
        name: campaignData.name || '',
        subject: campaignData.subject || '',
        content: campaignData.content || '',
        templateId: campaignData.templateId || '',
        fromName: campaignData.fromName || '',
        fromEmail: campaignData.fromEmail || '',
        replyTo: campaignData.replyTo || '',
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Veri yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!campaign) return;
    
    try {
      setSaving(true);
      
      const updateData: UpdateCampaignDto = {
        name: formData.name,
        subject: formData.subject,
        content: formData.content,
        templateId: formData.templateId || undefined,
        fromName: formData.fromName || undefined,
        fromEmail: formData.fromEmail || undefined,
        replyTo: formData.replyTo || undefined,
      };
      
      await emailCampaignsService.update(campaign.id, updateData);
      
      // Redirect back to campaign detail
      router.push(`/admin/email-marketing/campaigns/${campaign.id}`);
    } catch (err) {
      console.error('Error saving campaign:', err);
      setError('Kampanya kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleTemplateSelect = async (templateId: string) => {
    setFormData(prev => ({ ...prev, templateId }));
    
    // If it's a file template, we could potentially load its content
    // For now, just update the templateId
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanyayı Düzenle</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Kampanya yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanyayı Düzenle</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-sm text-red-500">{error || 'Kampanya bulunamadı'}</p>
            <Button variant="outline" className="mt-2" onClick={fetchData}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Only allow editing if campaign is in draft status
  if (campaign.status !== 'draft') {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanyayı Düzenle</h1>
          </div>
        </div>
        <Alert>
          <AlertDescription>
            Bu kampanya düzenlenemez çünkü durumu "{campaign.status}". Sadece taslak durumundaki kampanyalar düzenlenebilir.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button asChild>
            <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
              Kampanya Detaylarına Dön
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Kampanyayı Düzenle</h1>
          <p className="text-muted-foreground">{campaign.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
              <Eye className="mr-2 h-4 w-4" />
              Önizleme
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kampanya Bilgileri</CardTitle>
              <CardDescription>
                Kampanyanızın temel bilgilerini düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Kampanya Adı</Label>
                <Input
                  id="campaign-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Kampanya adı"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email Konusu</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Email konu satırı"
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" type="button">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-name">Gönderen Adı</Label>
                  <Input
                    id="from-name"
                    value={formData.fromName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fromName: e.target.value }))}
                    placeholder="Gönderen adı"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from-email">Gönderen Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={formData.fromEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
                    placeholder="gönderen@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply-to">Yanıtlama Adresi</Label>
                <Input
                  id="reply-to"
                  type="email"
                  value={formData.replyTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, replyTo: e.target.value }))}
                  placeholder="yanitla@example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email İçeriği</CardTitle>
              <CardDescription>
                Email içeriğinizi düzenleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">İçerik</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Email içeriğinizi buraya yazın..."
                  className="min-h-[300px]"
                />
                <p className="text-xs text-muted-foreground">
                  HTML formatında içerik yazabilirsiniz.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Seçimi</CardTitle>
              <CardDescription>
                Kampanyanız için bir template seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select value={formData.templateId} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Template seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Template kullanma</SelectItem>
                    {templates?.dbTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                    {templates?.fileTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} <Badge variant="outline" className="ml-2">Hazır</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.templateId && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Template seçildi. İçerik template'e göre güncellenecek.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kampanya Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Mevcut Durum</Label>
                  <div className="mt-1">
                    <Badge variant="secondary">Taslak</Badge>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Son Güncelleme</Label>
                  <p className="text-sm">
                    {new Date(campaign.updatedAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eylemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleSave} disabled={saving} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link href={`/admin/email-marketing/campaigns/${campaignId}`}>
                  İptal
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}