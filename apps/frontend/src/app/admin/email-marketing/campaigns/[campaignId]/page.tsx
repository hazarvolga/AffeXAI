'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Send, 
  Edit, 
  Trash2, 
  Calendar,
  Users,
  Mail,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Eye,
  Download,
  TestTube,
  Trophy
} from 'lucide-react';
import Link from 'next/link';
import emailCampaignsService, { EmailCampaign } from '@/lib/api/emailCampaignsService';
import abTestService from '@/lib/api/abTestService';
import trackingService from '@/lib/api/trackingService';
import type { TrackingStats } from '@/lib/api/trackingService';
import AbTestCreator from '@/components/admin/email/AbTestCreator';
import AbTestResults from '@/components/admin/email/AbTestResults';
import TrackingStatsComponent from '@/components/admin/email/TrackingStats';
import CampaignScheduler from '@/components/admin/email/CampaignScheduler';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.campaignId as string;
  
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAbTestCreatorOpen, setIsAbTestCreatorOpen] = useState(false);
  const [isAbTestResultsOpen, setIsAbTestResultsOpen] = useState(false);
  const [hasAbTest, setHasAbTest] = useState(false);
  const [trackingStats, setTrackingStats] = useState<TrackingStats | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const data = await emailCampaignsService.getById(campaignId);
      setCampaign(data);
      
      // Check if campaign has A/B test
      try {
        await abTestService.getSummary(campaignId);
        setHasAbTest(true);
      } catch {
        setHasAbTest(false);
      }

      // Fetch tracking stats if campaign is sent
      if (data.status === 'sent') {
        fetchTrackingStats();
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching campaign:', err);
      setError('Kampanya bilgileri yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingStats = async () => {
    try {
      setTrackingLoading(true);
      const stats = await trackingService.getTrackingStats(campaignId);
      setTrackingStats(stats);
    } catch (err) {
      console.error('Error fetching tracking stats:', err);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleSendCampaign = async () => {
    if (!campaign) return;
    
    try {
      await emailCampaignsService.sendCampaign(campaign.id);
      await fetchCampaign(); // Refresh campaign data
      alert('Kampanya başarıyla gönderildi!');
    } catch (err) {
      console.error('Error sending campaign:', err);
      alert('Kampanya gönderilirken bir hata oluştu.');
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaign) return;
    
    try {
      await emailCampaignsService.delete(campaign.id);
      router.push('/admin/email-marketing/campaigns');
    } catch (err) {
      console.error('Error deleting campaign:', err);
      alert('Kampanya silinirken bir hata oluştu.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary"><Edit className="w-3 h-3 mr-1" />Taslak</Badge>;
      case 'scheduled':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Planlandı</Badge>;
      case 'sending':
        return <Badge variant="default"><Send className="w-3 h-3 mr-1" />Gönderiliyor</Badge>;
      case 'sent':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Gönderildi</Badge>;
      case 'paused':
        return <Badge variant="outline"><Pause className="w-3 h-3 mr-1" />Duraklatıldı</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />İptal Edildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateOpenRate = () => {
    if (!campaign?.sentCount || campaign.sentCount === 0) return '0.00';
    return ((campaign.openedCount || 0) / campaign.sentCount * 100).toFixed(2);
  };

  const calculateClickRate = () => {
    if (!campaign?.openedCount || campaign.openedCount === 0) return '0.00';
    return ((campaign.clickedCount || 0) / campaign.openedCount * 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanya Detayları</h1>
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
            <Link href="/admin/email-marketing/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanya Detayları</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-sm text-red-500">{error || 'Kampanya bulunamadı'}</p>
            <Button variant="outline" className="mt-2" onClick={fetchCampaign}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/email-marketing/campaigns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
          <p className="text-muted-foreground">{campaign.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(campaign.status)}
          {campaign.status === 'draft' && (
            <Button asChild>
              <Link href={`/admin/email-marketing/campaigns/${campaign.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Düzenle
              </Link>
            </Button>
          )}
          {campaign.status === 'draft' && !hasAbTest && (
            <Button variant="outline" onClick={() => setIsAbTestCreatorOpen(true)}>
              <TestTube className="mr-2 h-4 w-4" />
              A/B Test Oluştur
            </Button>
          )}
          
          {hasAbTest && (
            <Button variant="outline" onClick={() => setIsAbTestResultsOpen(true)}>
              <Trophy className="mr-2 h-4 w-4" />
              Test Sonuçları
            </Button>
          )}
          
          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
            <Button onClick={handleSendCampaign}>
              <Send className="mr-2 h-4 w-4" />
              {hasAbTest ? 'A/B Test Başlat' : 'Gönder'}
            </Button>
          )}
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gönderilen</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.sentCount || 0}</div>
            <p className="text-xs text-muted-foreground">Toplam alıcı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açılan</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.openedCount || 0}</div>
            <p className="text-xs text-muted-foreground">{calculateOpenRate()}% açılma oranı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tıklanan</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.clickedCount || 0}</div>
            <p className="text-xs text-muted-foreground">{calculateClickRate()}% tıklama oranı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gönderim Tarihi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaign.sentAt ? formatDate(campaign.sentAt).split(' ')[0] : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaign.sentAt ? formatDate(campaign.sentAt).split(' ')[1] : 'Henüz gönderilmedi'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="recipients">Alıcılar</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kampanya Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Kampanya Adı</label>
                  <p className="text-sm">{campaign.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Konu</label>
                  <p className="text-sm">{campaign.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Durum</label>
                  <div className="mt-1">{getStatusBadge(campaign.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Oluşturulma Tarihi</label>
                  <p className="text-sm">{formatDate(campaign.createdAt)}</p>
                </div>
                {campaign.sentAt && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gönderim Tarihi</label>
                    <p className="text-sm">{formatDate(campaign.sentAt)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eylemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {campaign.status === 'draft' && (
                  <Button asChild className="w-full">
                    <Link href={`/admin/email-marketing/campaigns/${campaign.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Kampanyayı Düzenle
                    </Link>
                  </Button>
                )}

                {campaign.status === 'draft' && !hasAbTest && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsAbTestCreatorOpen(true)}
                  >
                    <TestTube className="mr-2 h-4 w-4" />
                    A/B Test Oluştur
                  </Button>
                )}

                {hasAbTest && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsAbTestResultsOpen(true)}
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Test Sonuçlarını Görüntüle
                  </Button>
                )}
                
                {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                  <Button onClick={handleSendCampaign} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {hasAbTest ? 'A/B Test Başlat' : 'Kampanyayı Gönder'}
                  </Button>
                )}

                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Önizleme
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Rapor İndir
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Kampanyayı Sil
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu işlem geri alınamaz. "{campaign.name}" kampanyası kalıcı olarak silinecek.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteCampaign}>
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Scheduler */}
          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
            <CampaignScheduler
              campaignId={campaign.id}
              currentStatus={campaign.status}
              currentScheduledAt={campaign.scheduledAt}
              onScheduleUpdate={fetchCampaign}
            />
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email İçeriği</CardTitle>
              <CardDescription>
                Kampanyanın email içeriğini görüntüleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Konu</label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">{campaign.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">İçerik</label>
                  <div className="mt-1 p-3 bg-muted rounded-md max-h-96 overflow-y-auto">
                    {campaign.content ? (
                      <div dangerouslySetInnerHTML={{ __html: campaign.content }} />
                    ) : (
                      <p className="text-sm text-muted-foreground">İçerik bulunamadı</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alıcı Bilgileri</CardTitle>
              <CardDescription>
                Kampanyanın gönderildiği alıcılar hakkında bilgi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Alıcı detayları henüz mevcut değil. Bu özellik yakında eklenecek.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {campaign.status === 'sent' && trackingStats ? (
            <TrackingStats stats={trackingStats} loading={trackingLoading} />
          ) : campaign.status === 'sent' ? (
            <Card>
              <CardHeader>
                <CardTitle>Email Tracking</CardTitle>
                <CardDescription>
                  Gerçek zamanlı açılma ve tıklama verileri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Detaylı Analitik</CardTitle>
                <CardDescription>
                  Kampanya performansının detaylı analizi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Kampanya gönderildikten sonra detaylı tracking verileri burada görünecek.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* A/B Test Dialogs */}
      <AbTestCreator
        campaignId={campaignId}
        campaignName={campaign.name}
        open={isAbTestCreatorOpen}
        onOpenChange={setIsAbTestCreatorOpen}
        onTestCreated={() => {
          setHasAbTest(true);
          fetchCampaign();
        }}
      />

      <AbTestResults
        campaignId={campaignId}
        open={isAbTestResultsOpen}
        onOpenChange={setIsAbTestResultsOpen}
        onWinnerSelected={() => {
          fetchCampaign();
        }}
      />
    </div>
  );
}