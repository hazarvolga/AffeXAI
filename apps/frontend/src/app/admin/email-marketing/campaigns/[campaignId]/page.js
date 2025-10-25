"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignDetailPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
const abTestService_1 = __importDefault(require("@/lib/api/abTestService"));
const trackingService_1 = __importDefault(require("@/lib/api/trackingService"));
const AbTestCreator_1 = __importDefault(require("@/components/admin/email/AbTestCreator"));
const AbTestResults_1 = __importDefault(require("@/components/admin/email/AbTestResults"));
const CampaignScheduler_1 = __importDefault(require("@/components/admin/email/CampaignScheduler"));
const alert_dialog_1 = require("@/components/ui/alert-dialog");
function CampaignDetailPage() {
    const params = (0, navigation_1.useParams)();
    const router = (0, navigation_1.useRouter)();
    const campaignId = params.campaignId;
    const [campaign, setCampaign] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isAbTestCreatorOpen, setIsAbTestCreatorOpen] = (0, react_1.useState)(false);
    const [isAbTestResultsOpen, setIsAbTestResultsOpen] = (0, react_1.useState)(false);
    const [hasAbTest, setHasAbTest] = (0, react_1.useState)(false);
    const [trackingStats, setTrackingStats] = (0, react_1.useState)(null);
    const [trackingLoading, setTrackingLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (campaignId) {
            fetchCampaign();
        }
    }, [campaignId]);
    const fetchCampaign = async () => {
        try {
            setLoading(true);
            const data = await emailCampaignsService_1.default.getById(campaignId);
            setCampaign(data);
            // Check if campaign has A/B test
            try {
                await abTestService_1.default.getSummary(campaignId);
                setHasAbTest(true);
            }
            catch {
                setHasAbTest(false);
            }
            // Fetch tracking stats if campaign is sent
            if (data.status === 'sent') {
                fetchTrackingStats();
            }
            setError(null);
        }
        catch (err) {
            console.error('Error fetching campaign:', err);
            setError('Kampanya bilgileri yüklenirken bir hata oluştu.');
        }
        finally {
            setLoading(false);
        }
    };
    const fetchTrackingStats = async () => {
        try {
            setTrackingLoading(true);
            const stats = await trackingService_1.default.getTrackingStats(campaignId);
            setTrackingStats(stats);
        }
        catch (err) {
            console.error('Error fetching tracking stats:', err);
        }
        finally {
            setTrackingLoading(false);
        }
    };
    const handleSendCampaign = async () => {
        if (!campaign)
            return;
        try {
            await emailCampaignsService_1.default.sendCampaign(campaign.id);
            await fetchCampaign(); // Refresh campaign data
            alert('Kampanya başarıyla gönderildi!');
        }
        catch (err) {
            console.error('Error sending campaign:', err);
            alert('Kampanya gönderilirken bir hata oluştu.');
        }
    };
    const handleDeleteCampaign = async () => {
        if (!campaign)
            return;
        try {
            await emailCampaignsService_1.default.delete(campaign.id);
            router.push('/admin/email-marketing/campaigns');
        }
        catch (err) {
            console.error('Error deleting campaign:', err);
            alert('Kampanya silinirken bir hata oluştu.');
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft':
                return <badge_1.Badge variant="secondary"><lucide_react_1.Edit className="w-3 h-3 mr-1"/>Taslak</badge_1.Badge>;
            case 'scheduled':
                return <badge_1.Badge variant="outline"><lucide_react_1.Clock className="w-3 h-3 mr-1"/>Planlandı</badge_1.Badge>;
            case 'sending':
                return <badge_1.Badge variant="default"><lucide_react_1.Send className="w-3 h-3 mr-1"/>Gönderiliyor</badge_1.Badge>;
            case 'sent':
                return <badge_1.Badge variant="default" className="bg-green-500"><lucide_react_1.CheckCircle className="w-3 h-3 mr-1"/>Gönderildi</badge_1.Badge>;
            case 'paused':
                return <badge_1.Badge variant="outline"><lucide_react_1.Pause className="w-3 h-3 mr-1"/>Duraklatıldı</badge_1.Badge>;
            case 'cancelled':
                return <badge_1.Badge variant="destructive"><lucide_react_1.XCircle className="w-3 h-3 mr-1"/>İptal Edildi</badge_1.Badge>;
            default:
                return <badge_1.Badge variant="secondary">{status}</badge_1.Badge>;
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const calculateOpenRate = () => {
        if (!campaign?.sentCount || campaign.sentCount === 0)
            return '0.00';
        return ((campaign.openedCount || 0) / campaign.sentCount * 100).toFixed(2);
    };
    const calculateClickRate = () => {
        if (!campaign?.openedCount || campaign.openedCount === 0)
            return '0.00';
        return ((campaign.clickedCount || 0) / campaign.openedCount * 100).toFixed(2);
    };
    if (loading) {
        return (<div className="space-y-8">
        <div className="flex items-center gap-4">
          <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/email-marketing/campaigns">
              <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
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
      </div>);
    }
    if (error || !campaign) {
        return (<div className="space-y-8">
        <div className="flex items-center gap-4">
          <button_1.Button variant="outline" size="icon" asChild>
            <link_1.default href="/admin/email-marketing/campaigns">
              <lucide_react_1.ArrowLeft className="h-4 w-4"/>
            </link_1.default>
          </button_1.Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kampanya Detayları</h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-sm text-red-500">{error || 'Kampanya bulunamadı'}</p>
            <button_1.Button variant="outline" className="mt-2" onClick={fetchCampaign}>
              Tekrar Dene
            </button_1.Button>
          </div>
        </div>
      </div>);
    }
    return (<div className="space-y-8">
      <div className="flex items-center gap-4">
        <button_1.Button variant="outline" size="icon" asChild>
          <link_1.default href="/admin/email-marketing/campaigns">
            <lucide_react_1.ArrowLeft className="h-4 w-4"/>
          </link_1.default>
        </button_1.Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
          <p className="text-muted-foreground">{campaign.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(campaign.status)}
          {campaign.status === 'draft' && (<button_1.Button asChild>
              <link_1.default href={`/admin/email-marketing/campaigns/${campaign.id}/edit`}>
                <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                Düzenle
              </link_1.default>
            </button_1.Button>)}
          {campaign.status === 'draft' && !hasAbTest && (<button_1.Button variant="outline" onClick={() => setIsAbTestCreatorOpen(true)}>
              <lucide_react_1.TestTube className="mr-2 h-4 w-4"/>
              A/B Test Oluştur
            </button_1.Button>)}
          
          {hasAbTest && (<button_1.Button variant="outline" onClick={() => setIsAbTestResultsOpen(true)}>
              <lucide_react_1.Trophy className="mr-2 h-4 w-4"/>
              Test Sonuçları
            </button_1.Button>)}
          
          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (<button_1.Button onClick={handleSendCampaign}>
              <lucide_react_1.Send className="mr-2 h-4 w-4"/>
              {hasAbTest ? 'A/B Test Başlat' : 'Gönder'}
            </button_1.Button>)}
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Gönderilen</card_1.CardTitle>
            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{campaign.sentCount || 0}</div>
            <p className="text-xs text-muted-foreground">Toplam alıcı</p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Açılan</card_1.CardTitle>
            <lucide_react_1.Mail className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{campaign.openedCount || 0}</div>
            <p className="text-xs text-muted-foreground">{calculateOpenRate()}% açılma oranı</p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Tıklanan</card_1.CardTitle>
            <lucide_react_1.BarChart3 className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{campaign.clickedCount || 0}</div>
            <p className="text-xs text-muted-foreground">{calculateClickRate()}% tıklama oranı</p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Gönderim Tarihi</card_1.CardTitle>
            <lucide_react_1.Calendar className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {campaign.sentAt ? formatDate(campaign.sentAt).split(' ')[0] : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaign.sentAt ? formatDate(campaign.sentAt).split(' ')[1] : 'Henüz gönderilmedi'}
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <tabs_1.Tabs defaultValue="overview" className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="overview">Genel Bakış</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="content">İçerik</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="recipients">Alıcılar</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="analytics">Analitik</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Kampanya Bilgileri</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
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
                {campaign.sentAt && (<div>
                    <label className="text-sm font-medium text-muted-foreground">Gönderim Tarihi</label>
                    <p className="text-sm">{formatDate(campaign.sentAt)}</p>
                  </div>)}
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Eylemler</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-2">
                {campaign.status === 'draft' && (<button_1.Button asChild className="w-full">
                    <link_1.default href={`/admin/email-marketing/campaigns/${campaign.id}/edit`}>
                      <lucide_react_1.Edit className="mr-2 h-4 w-4"/>
                      Kampanyayı Düzenle
                    </link_1.default>
                  </button_1.Button>)}

                {campaign.status === 'draft' && !hasAbTest && (<button_1.Button variant="outline" className="w-full" onClick={() => setIsAbTestCreatorOpen(true)}>
                    <lucide_react_1.TestTube className="mr-2 h-4 w-4"/>
                    A/B Test Oluştur
                  </button_1.Button>)}

                {hasAbTest && (<button_1.Button variant="outline" className="w-full" onClick={() => setIsAbTestResultsOpen(true)}>
                    <lucide_react_1.Trophy className="mr-2 h-4 w-4"/>
                    Test Sonuçlarını Görüntüle
                  </button_1.Button>)}
                
                {(campaign.status === 'draft' || campaign.status === 'scheduled') && (<button_1.Button onClick={handleSendCampaign} className="w-full">
                    <lucide_react_1.Send className="mr-2 h-4 w-4"/>
                    {hasAbTest ? 'A/B Test Başlat' : 'Kampanyayı Gönder'}
                  </button_1.Button>)}

                <button_1.Button variant="outline" className="w-full">
                  <lucide_react_1.Eye className="mr-2 h-4 w-4"/>
                  Önizleme
                </button_1.Button>

                <button_1.Button variant="outline" className="w-full">
                  <lucide_react_1.Download className="mr-2 h-4 w-4"/>
                  Rapor İndir
                </button_1.Button>

                <alert_dialog_1.AlertDialog>
                  <alert_dialog_1.AlertDialogTrigger asChild>
                    <button_1.Button variant="destructive" className="w-full">
                      <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/>
                      Kampanyayı Sil
                    </button_1.Button>
                  </alert_dialog_1.AlertDialogTrigger>
                  <alert_dialog_1.AlertDialogContent>
                    <alert_dialog_1.AlertDialogHeader>
                      <alert_dialog_1.AlertDialogTitle>Emin misiniz?</alert_dialog_1.AlertDialogTitle>
                      <alert_dialog_1.AlertDialogDescription>
                        Bu işlem geri alınamaz. "{campaign.name}" kampanyası kalıcı olarak silinecek.
                      </alert_dialog_1.AlertDialogDescription>
                    </alert_dialog_1.AlertDialogHeader>
                    <alert_dialog_1.AlertDialogFooter>
                      <alert_dialog_1.AlertDialogCancel>İptal</alert_dialog_1.AlertDialogCancel>
                      <alert_dialog_1.AlertDialogAction onClick={handleDeleteCampaign}>
                        Sil
                      </alert_dialog_1.AlertDialogAction>
                    </alert_dialog_1.AlertDialogFooter>
                  </alert_dialog_1.AlertDialogContent>
                </alert_dialog_1.AlertDialog>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          {/* Campaign Scheduler */}
          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (<CampaignScheduler_1.default campaignId={campaign.id} currentStatus={campaign.status} currentScheduledAt={campaign.scheduledAt} onScheduleUpdate={fetchCampaign}/>)}
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="content" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Email İçeriği</card_1.CardTitle>
              <card_1.CardDescription>
                Kampanyanın email içeriğini görüntüleyin
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Konu</label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">{campaign.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">İçerik</label>
                  <div className="mt-1 p-3 bg-muted rounded-md max-h-96 overflow-y-auto">
                    {campaign.content ? (<div dangerouslySetInnerHTML={{ __html: campaign.content }}/>) : (<p className="text-sm text-muted-foreground">İçerik bulunamadı</p>)}
                  </div>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="recipients" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Alıcı Bilgileri</card_1.CardTitle>
              <card_1.CardDescription>
                Kampanyanın gönderildiği alıcılar hakkında bilgi
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-center py-8">
                <lucide_react_1.Users className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                <p className="text-muted-foreground">
                  Alıcı detayları henüz mevcut değil. Bu özellik yakında eklenecek.
                </p>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="analytics" className="space-y-4">
          {campaign.status === 'sent' && trackingStats ? (<TrackingStats stats={trackingStats} loading={trackingLoading}/>) : campaign.status === 'sent' ? (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Email Tracking</card_1.CardTitle>
                <card_1.CardDescription>
                  Gerçek zamanlı açılma ve tıklama verileri
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </card_1.CardContent>
            </card_1.Card>) : (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Detaylı Analitik</card_1.CardTitle>
                <card_1.CardDescription>
                  Kampanya performansının detaylı analizi
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-center py-8">
                  <lucide_react_1.BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                  <p className="text-muted-foreground">
                    Kampanya gönderildikten sonra detaylı tracking verileri burada görünecek.
                  </p>
                </div>
              </card_1.CardContent>
            </card_1.Card>)}
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {/* A/B Test Dialogs */}
      <AbTestCreator_1.default campaignId={campaignId} campaignName={campaign.name} open={isAbTestCreatorOpen} onOpenChange={setIsAbTestCreatorOpen} onTestCreated={() => {
            setHasAbTest(true);
            fetchCampaign();
        }}/>

      <AbTestResults_1.default campaignId={campaignId} open={isAbTestResultsOpen} onOpenChange={setIsAbTestResultsOpen} onWinnerSelected={() => {
            fetchCampaign();
        }}/>
    </div>);
}
//# sourceMappingURL=page.js.map