"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportResultsDashboard = ImportResultsDashboard;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const bulkImportService_1 = __importStar(require("@/lib/api/bulkImportService"));
const validation_results_display_1 = require("./validation-results-display");
function ImportResultsDashboard({ job, onClose, onNewImport }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)('overview');
    const [qualityMetrics, setQualityMetrics] = (0, react_1.useState)(null);
    const [isDownloading, setIsDownloading] = (0, react_1.useState)(false);
    const [downloadError, setDownloadError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Calculate quality metrics
        if (job.totalRecords > 0) {
            const validRate = (job.validRecords / job.totalRecords) * 100;
            const riskyRate = ((job.riskyRecords || 0) / job.totalRecords) * 100;
            const invalidRate = (job.invalidRecords / job.totalRecords) * 100;
            const duplicateRate = (job.duplicateRecords / job.totalRecords) * 100;
            const overallScore = validRate;
            const deliverabilityScore = Math.max(0, 100 - (riskyRate * 0.5 + invalidRate));
            const riskScore = riskyRate + invalidRate;
            const validationAccuracy = 0; // TODO: Add validationSummary to ImportJob type
            setQualityMetrics({
                overallScore,
                deliverabilityScore,
                riskScore,
                duplicateRate,
                validationAccuracy
            });
        }
    }, [job]);
    const handleDownloadReport = async () => {
        setIsDownloading(true);
        setDownloadError(null);
        try {
            const blob = await bulkImportService_1.default.downloadReport(job.id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `import-report-${job.id}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (error) {
            setDownloadError(error instanceof Error ? error.message : 'Rapor indirilemedi');
        }
        finally {
            setIsDownloading(false);
        }
    };
    const getScoreBadgeColor = (score) => {
        if (score >= 80)
            return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 60)
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <lucide_react_1.CheckCircle className="h-6 w-6 text-green-500"/>
            İçe Aktarma Tamamlandı
          </h2>
          <p className="text-muted-foreground">
            {job.fileName} • {new Date(job.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={onNewImport}>
            Yeni İçe Aktarma
          </button_1.Button>
          {onClose && (<button_1.Button variant="outline" onClick={onClose}>
              Kapat
            </button_1.Button>)}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <card_1.Card>
          <card_1.CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{job.totalRecords.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Toplam Kayıt</div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{job.validRecords.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Geçerli</div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{job.invalidRecords.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Geçersiz</div>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {qualityMetrics ? `${qualityMetrics.overallScore.toFixed(1)}%` : '-'}
            </div>
            <div className="text-sm text-muted-foreground">Kalite Skoru</div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Main Content Tabs */}
      <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab}>
        <tabs_1.TabsList className="grid w-full grid-cols-3">
          <tabs_1.TabsTrigger value="overview" className="flex items-center gap-2">
            <lucide_react_1.BarChart3 className="h-4 w-4"/>
            Özet
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="details" className="flex items-center gap-2">
            <lucide_react_1.FileText className="h-4 w-4"/>
            Detaylar
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="actions" className="flex items-center gap-2">
            <lucide_react_1.Download className="h-4 w-4"/>
            İşlemler
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Overview Tab */}
        <tabs_1.TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Processing Summary */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.Clock className="h-5 w-5"/>
                  İşlem Özeti
                </card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Başlangıç:</span>
                  <span>{new Date(job.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bitiş:</span>
                  <span>{job.completedAt ? new Date(job.completedAt).toLocaleString() : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Durum:</span>
                  <badge_1.Badge className={(0, utils_1.cn)('border', job.status === bulkImportService_1.ImportJobStatus.COMPLETED
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200')}>
                    {job.status.toUpperCase()}
                  </badge_1.Badge>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            {/* Validation Breakdown */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.Mail className="h-5 w-5"/>
                  Doğrulama Dağılımı
                </card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>
                      <span>Geçerli</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{job.validRecords.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((job.validRecords / job.totalRecords) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-500"/>
                      <span>Riskli</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{job.riskyRecords.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((job.riskyRecords / job.totalRecords) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>
                      <span>Geçersiz</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{job.invalidRecords.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((job.invalidRecords / job.totalRecords) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <lucide_react_1.Info className="h-4 w-4 text-blue-500"/>
                      <span>Tekrar</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{job.duplicateRecords.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {((job.duplicateRecords / job.totalRecords) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          {/* Quality Metrics */}
          {qualityMetrics && (<card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Kalite Metrikleri</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <badge_1.Badge className={(0, utils_1.cn)('border', getScoreBadgeColor(qualityMetrics.overallScore))}>
                      {qualityMetrics.overallScore.toFixed(1)}%
                    </badge_1.Badge>
                    <div className="text-sm text-muted-foreground mt-1">Genel Kalite</div>
                  </div>
                  <div className="text-center">
                    <badge_1.Badge className={(0, utils_1.cn)('border', getScoreBadgeColor(qualityMetrics.deliverabilityScore))}>
                      {qualityMetrics.deliverabilityScore.toFixed(1)}%
                    </badge_1.Badge>
                    <div className="text-sm text-muted-foreground mt-1">Teslimat</div>
                  </div>
                  <div className="text-center">
                    <badge_1.Badge className={(0, utils_1.cn)('border', getScoreBadgeColor(100 - qualityMetrics.riskScore))}>
                      {qualityMetrics.riskScore.toFixed(1)}%
                    </badge_1.Badge>
                    <div className="text-sm text-muted-foreground mt-1">Risk</div>
                  </div>
                  <div className="text-center">
                    <badge_1.Badge className={(0, utils_1.cn)('border', getScoreBadgeColor(qualityMetrics.validationAccuracy))}>
                      {qualityMetrics.validationAccuracy.toFixed(1)}%
                    </badge_1.Badge>
                    <div className="text-sm text-muted-foreground mt-1">Doğruluk</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  {qualityMetrics.overallScore < 80 && (<alert_1.Alert>
                      <lucide_react_1.AlertCircle className="h-4 w-4"/>
                      <alert_1.AlertDescription>
                        Kalite skoru düşük. Geçersiz e-postaları temizlemeyi düşünün.
                      </alert_1.AlertDescription>
                    </alert_1.Alert>)}
                  
                  {qualityMetrics.riskScore > 20 && (<alert_1.Alert>
                      <lucide_react_1.AlertCircle className="h-4 w-4"/>
                      <alert_1.AlertDescription>
                        Yüksek risk oranı tespit edildi. Riskli e-postaları ayrı bir kampanyada test edin.
                      </alert_1.AlertDescription>
                    </alert_1.Alert>)}
                </div>
              </card_1.CardContent>
            </card_1.Card>)}
        </tabs_1.TabsContent>

        {/* Details Tab */}
        <tabs_1.TabsContent value="details">
          <validation_results_display_1.ValidationResultsDisplay jobId={job.id}/>
        </tabs_1.TabsContent>

        {/* Actions Tab */}
        <tabs_1.TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Rapor İndirme</card_1.CardTitle>
                <card_1.CardDescription>
                  Detaylı analiz ve kayıtlar için raporları indirin
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <button_1.Button onClick={handleDownloadReport} disabled={isDownloading} className="w-full">
                  <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                  {isDownloading ? 'İndiriliyor...' : 'Detaylı Rapor İndir'}
                </button_1.Button>

                {downloadError && (<alert_1.Alert variant="destructive">
                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                    <alert_1.AlertDescription>{downloadError}</alert_1.AlertDescription>
                  </alert_1.Alert>)}
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle>Sonraki Adımlar</card_1.CardTitle>
                <card_1.CardDescription>
                  İçe aktarma sonrası önerilen işlemler
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-4">
                <button_1.Button variant="outline" className="w-full justify-start">
                  <lucide_react_1.Users className="h-4 w-4 mr-2"/>
                  Aboneleri Görüntüle
                  <lucide_react_1.ExternalLink className="h-4 w-4 ml-auto"/>
                </button_1.Button>
                
                <button_1.Button variant="outline" className="w-full justify-start">
                  <lucide_react_1.Mail className="h-4 w-4 mr-2"/>
                  Kampanya Oluştur
                  <lucide_react_1.ExternalLink className="h-4 w-4 ml-auto"/>
                </button_1.Button>
                
                <button_1.Button variant="outline" className="w-full justify-start" onClick={onNewImport}>
                  <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                  Yeni İçe Aktarma
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=import-results-dashboard.js.map