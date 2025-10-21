"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbTestResultsViewer;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const progress_1 = require("@/components/ui/progress");
const dialog_1 = require("@/components/ui/dialog");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const abTestService_1 = __importDefault(require("@/lib/api/abTestService"));
const use_toast_1 = require("@/hooks/use-toast");
function AbTestResultsViewer({ campaignId, open, onOpenChange, onWinnerSelected }) {
    const { toast } = (0, use_toast_1.useToast)();
    const [results, setResults] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [selectingWinner, setSelectingWinner] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (open && campaignId) {
            fetchResults();
        }
    }, [open, campaignId]);
    const fetchResults = async () => {
        try {
            setLoading(true);
            const data = await abTestService_1.default.getResults(campaignId);
            setResults(data);
        }
        catch (error) {
            console.error('Error fetching A/B test results:', error);
            toast({
                title: 'Hata',
                description: 'A/B test sonuçları yüklenirken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleSelectWinner = async (variantId) => {
        try {
            setSelectingWinner(true);
            await abTestService_1.default.selectWinner(campaignId, variantId);
            toast({
                title: 'Kazanan Seçildi',
                description: 'Kazanan varyant başarıyla seçildi.',
            });
            await fetchResults(); // Refresh results
            onWinnerSelected?.();
        }
        catch (error) {
            console.error('Error selecting winner:', error);
            toast({
                title: 'Hata',
                description: 'Kazanan seçilirken bir hata oluştu.',
                variant: 'destructive',
            });
        }
        finally {
            setSelectingWinner(false);
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft':
                return <badge_1.Badge variant="secondary">Taslak</badge_1.Badge>;
            case 'testing':
                return <badge_1.Badge variant="default" className="bg-blue-500"><lucide_react_1.Clock className="w-3 h-3 mr-1"/>Test Ediliyor</badge_1.Badge>;
            case 'completed':
                return <badge_1.Badge variant="default" className="bg-green-500"><lucide_react_1.CheckCircle className="w-3 h-3 mr-1"/>Tamamlandı</badge_1.Badge>;
            default:
                return <badge_1.Badge variant="secondary">{status}</badge_1.Badge>;
        }
    };
    const getVariantBadge = (variant, isWinner) => {
        if (isWinner) {
            return <badge_1.Badge variant="default" className="bg-yellow-500"><lucide_react_1.Crown className="w-3 h-3 mr-1"/>Kazanan</badge_1.Badge>;
        }
        switch (variant.status) {
            case 'testing':
                return <badge_1.Badge variant="outline"><lucide_react_1.Zap className="w-3 h-3 mr-1"/>Test Ediliyor</badge_1.Badge>;
            case 'winner':
                return <badge_1.Badge variant="default" className="bg-green-500"><lucide_react_1.Trophy className="w-3 h-3 mr-1"/>Kazanan</badge_1.Badge>;
            case 'loser':
                return <badge_1.Badge variant="secondary">Kaybeden</badge_1.Badge>;
            default:
                return <badge_1.Badge variant="outline">{variant.status}</badge_1.Badge>;
        }
    };
    const formatPercentage = (value) => {
        return `${value.toFixed(2)}%`;
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const getBestPerformingVariant = () => {
        if (!results?.variants)
            return null;
        const metric = results.campaign.winnerCriteria;
        let bestVariant = results.variants[0];
        results.variants.forEach(variant => {
            switch (metric) {
                case 'open_rate':
                    if (variant.openRate > bestVariant.openRate)
                        bestVariant = variant;
                    break;
                case 'click_rate':
                    if (variant.clickRate > bestVariant.clickRate)
                        bestVariant = variant;
                    break;
                case 'conversion_rate':
                    if (variant.conversionRate > bestVariant.conversionRate)
                        bestVariant = variant;
                    break;
                case 'revenue':
                    if (variant.revenue > bestVariant.revenue)
                        bestVariant = variant;
                    break;
            }
        });
        return bestVariant;
    };
    if (loading) {
        return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
        <dialog_1.DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>A/B Test Sonuçları</dialog_1.DialogTitle>
          </dialog_1.DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Sonuçlar yükleniyor...</p>
            </div>
          </div>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>);
    }
    if (!results) {
        return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
        <dialog_1.DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>A/B Test Sonuçları</dialog_1.DialogTitle>
          </dialog_1.DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <lucide_react_1.AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
              <p className="text-muted-foreground">A/B test sonuçları bulunamadı.</p>
            </div>
          </div>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>);
    }
    const bestVariant = getBestPerformingVariant();
    const isWinnerSelected = results.campaign.selectedWinnerId;
    return (<dialog_1.Dialog open={open} onOpenChange={onOpenChange}>
      <dialog_1.DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle className="flex items-center gap-2">
            <lucide_react_1.BarChart3 className="h-5 w-5"/>
            A/B Test Sonuçları
          </dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            {results.campaign.name} - {results.campaign.testType} testi
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>

        <div className="space-y-6">
          {/* Test Overview */}
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <card_1.CardTitle>Test Özeti</card_1.CardTitle>
                  <card_1.CardDescription>
                    {results.campaign.testType} testi - {results.campaign.winnerCriteria} kriterine göre
                  </card_1.CardDescription>
                </div>
                {getStatusBadge(results.campaign.testStatus)}
              </div>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Test Süresi</p>
                  <p className="text-2xl font-bold">{results.campaign.testDuration}h</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Güven Seviyesi</p>
                  <p className="text-2xl font-bold">{results.campaign.confidenceLevel}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Min. Örnek</p>
                  <p className="text-2xl font-bold">{results.campaign.minSampleSize}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Varyant Sayısı</p>
                  <p className="text-2xl font-bold">{results.variants.length}</p>
                </div>
              </div>

              {results.campaign.sentAt && (<div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Test başlangıcı: {formatDate(results.campaign.sentAt)}
                  </p>
                </div>)}
            </card_1.CardContent>
          </card_1.Card>

          {/* Statistical Significance */}
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center gap-2">
                <lucide_react_1.Target className="h-4 w-4"/>
                İstatistiksel Analiz
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">İstatistiksel Anlamlılık</span>
                  {results.statistics.isSignificant ? (<badge_1.Badge variant="default" className="bg-green-500">
                      <lucide_react_1.CheckCircle className="w-3 h-3 mr-1"/>
                      Anlamlı
                    </badge_1.Badge>) : (<badge_1.Badge variant="secondary">
                      <lucide_react_1.AlertCircle className="w-3 h-3 mr-1"/>
                      Anlamlı Değil
                    </badge_1.Badge>)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">P-Value</p>
                    <p className="text-lg font-bold">{results.statistics.pValue.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chi-Square</p>
                    <p className="text-lg font-bold">{results.statistics.chiSquare.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Min. Örnek</p>
                    {results.statistics.hasMinimumSample ? (<badge_1.Badge variant="default" className="bg-green-500">Yeterli</badge_1.Badge>) : (<badge_1.Badge variant="secondary">Yetersiz</badge_1.Badge>)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Kazanan Seçilebilir</p>
                    {results.statistics.canDeclareWinner ? (<badge_1.Badge variant="default" className="bg-green-500">Evet</badge_1.Badge>) : (<badge_1.Badge variant="secondary">Hayır</badge_1.Badge>)}
                  </div>
                </div>

                <alert_1.Alert>
                  <lucide_react_1.AlertCircle className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    {results.statistics.message}
                  </alert_1.AlertDescription>
                </alert_1.Alert>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          {/* Variant Results */}
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Varyant Performansı</card_1.CardTitle>
              <card_1.CardDescription>
                Her varyantın detaylı performans metrikleri
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {results.variants.map((variant) => {
            const isWinner = variant.id === results.campaign.selectedWinnerId;
            const isBest = bestVariant?.id === variant.id;
            return (<card_1.Card key={variant.id} className={`p-4 ${isWinner ? 'ring-2 ring-yellow-500' : isBest ? 'ring-2 ring-green-500' : ''}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <badge_1.Badge variant="outline" className="text-lg font-bold">
                            {variant.label}
                          </badge_1.Badge>
                          {getVariantBadge(variant, isWinner)}
                          {isBest && !isWinner && (<badge_1.Badge variant="outline" className="bg-green-50">
                              <lucide_react_1.TrendingUp className="w-3 h-3 mr-1"/>
                              En İyi Performans
                            </badge_1.Badge>)}
                        </div>
                        
                        {!isWinnerSelected && results.statistics.canDeclareWinner && isBest && (<button_1.Button size="sm" onClick={() => handleSelectWinner(variant.id)} disabled={selectingWinner}>
                            <lucide_react_1.Trophy className="w-4 h-4 mr-2"/>
                            Kazanan Seç
                          </button_1.Button>)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm font-medium">Gönderilen</span>
                          </div>
                          <p className="text-2xl font-bold">{variant.sentCount.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <lucide_react_1.Mail className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm font-medium">Açılma Oranı</span>
                          </div>
                          <p className="text-2xl font-bold">{formatPercentage(variant.openRate)}</p>
                          <p className="text-sm text-muted-foreground">{variant.openedCount} açılma</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <lucide_react_1.MousePointer className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm font-medium">Tıklama Oranı</span>
                          </div>
                          <p className="text-2xl font-bold">{formatPercentage(variant.clickRate)}</p>
                          <p className="text-sm text-muted-foreground">{variant.clickedCount} tıklama</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <lucide_react_1.Target className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm font-medium">Dönüşüm Oranı</span>
                          </div>
                          <p className="text-2xl font-bold">{formatPercentage(variant.conversionRate)}</p>
                          <p className="text-sm text-muted-foreground">{variant.conversionCount} dönüşüm</p>
                        </div>
                      </div>

                      {/* Performance comparison bars */}
                      <div className="mt-4 space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Açılma Oranı</span>
                            <span>{formatPercentage(variant.openRate)}</span>
                          </div>
                          <progress_1.Progress value={variant.openRate} className="h-2"/>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tıklama Oranı</span>
                            <span>{formatPercentage(variant.clickRate)}</span>
                          </div>
                          <progress_1.Progress value={variant.clickRate} className="h-2"/>
                        </div>
                      </div>
                    </card_1.Card>);
        })}
              </div>
            </card_1.CardContent>
          </card_1.Card>

          {/* Confidence Intervals */}
          {results.confidenceIntervals && (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Güven Aralıkları</card_1.CardTitle>
                <card_1.CardDescription>
                  %{results.campaign.confidenceLevel} güven seviyesinde performans aralıkları
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-4">
                  {results.confidenceIntervals.map((ci) => (<div key={ci.label} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <badge_1.Badge variant="outline">{ci.label}</badge_1.Badge>
                        <span className="text-sm font-medium">Varyant {ci.label}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-mono">
                          [{ci.interval.lower.toFixed(2)}% - {ci.interval.upper.toFixed(2)}%]
                        </span>
                        <span className="text-muted-foreground ml-2">
                          ±{ci.interval.margin.toFixed(2)}%
                        </span>
                      </div>
                    </div>))}
                </div>
              </card_1.CardContent>
            </card_1.Card>)}
        </div>

        <dialog_1.DialogFooter>
          <button_1.Button variant="outline" onClick={() => onOpenChange(false)}>
            Kapat
          </button_1.Button>
          <button_1.Button onClick={fetchResults}>
            Sonuçları Yenile
          </button_1.Button>
        </dialog_1.DialogFooter>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
//# sourceMappingURL=AbTestResults.js.map