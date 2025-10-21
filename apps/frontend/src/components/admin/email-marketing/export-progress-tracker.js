"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportProgressTracker = ExportProgressTracker;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const progress_1 = require("@/components/ui/progress");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkExportService_1 = __importDefault(require("@/lib/api/bulkExportService"));
const useExportProgress_1 = require("@/hooks/useExportProgress");
function ExportProgressTracker({ job, onComplete, onCancel, onNewExport }) {
    const [isDownloading, setIsDownloading] = (0, react_1.useState)(false);
    const [downloadError, setDownloadError] = (0, react_1.useState)(null);
    const { job: progressJob, isLoading, error: progressError, isPolling, refetch } = (0, useExportProgress_1.useExportProgress)({
        jobId: job.id,
        enabled: job.status === shared_types_1.ExportJobStatus.PROCESSING || job.status === shared_types_1.ExportJobStatus.PENDING,
        onComplete: (completedJob) => {
            onComplete?.(completedJob);
        },
        onError: (errorMessage) => {
            console.error('Export progress error:', errorMessage);
        }
    });
    const currentJob = progressJob || job;
    const handleDownload = async () => {
        if (currentJob.status !== shared_types_1.ExportJobStatus.COMPLETED)
            return;
        setIsDownloading(true);
        setDownloadError(null);
        try {
            const blob = await bulkExportService_1.default.downloadExport(currentJob.id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = currentJob.fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (err) {
            setDownloadError(err instanceof Error ? err.message : 'Dosya indirilemedi');
        }
        finally {
            setIsDownloading(false);
        }
    };
    const handleCancelJob = async () => {
        if (currentJob.status !== shared_types_1.ExportJobStatus.PROCESSING && currentJob.status !== shared_types_1.ExportJobStatus.PENDING)
            return;
        try {
            await bulkExportService_1.default.cancelExport(currentJob.id);
            onCancel?.();
        }
        catch (err) {
            console.error('Failed to cancel export:', err);
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case shared_types_1.ExportJobStatus.PENDING:
                return <badge_1.Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beklemede</badge_1.Badge>;
            case shared_types_1.ExportJobStatus.PROCESSING:
                return <badge_1.Badge variant="secondary" className="bg-blue-100 text-blue-800">İşleniyor</badge_1.Badge>;
            case shared_types_1.ExportJobStatus.COMPLETED:
                return <badge_1.Badge variant="secondary" className="bg-green-100 text-green-800">Tamamlandı</badge_1.Badge>;
            case shared_types_1.ExportJobStatus.FAILED:
                return <badge_1.Badge variant="destructive">Başarısız</badge_1.Badge>;
            default:
                return <badge_1.Badge variant="secondary">Bilinmeyen</badge_1.Badge>;
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case shared_types_1.ExportJobStatus.PENDING:
                return <lucide_react_1.Clock className="h-5 w-5 text-yellow-600"/>;
            case shared_types_1.ExportJobStatus.PROCESSING:
                return <lucide_react_1.RefreshCw className="h-5 w-5 text-blue-600 animate-spin"/>;
            case shared_types_1.ExportJobStatus.COMPLETED:
                return <lucide_react_1.CheckCircle className="h-5 w-5 text-green-600"/>;
            case shared_types_1.ExportJobStatus.FAILED:
                return <lucide_react_1.AlertCircle className="h-5 w-5 text-red-600"/>;
            default:
                return <lucide_react_1.AlertCircle className="h-5 w-5 text-gray-600"/>;
        }
    };
    const formatFileSize = (bytes) => {
        if (!bytes)
            return 'Bilinmiyor';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const isExpired = currentJob.expiresAt && new Date() > new Date(currentJob.expiresAt);
    return (<div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {getStatusIcon(currentJob.status)}
          <h3 className="text-lg font-semibold">Dışa Aktarma Durumu</h3>
        </div>
        <p className="text-muted-foreground">
          {currentJob.fileName}
        </p>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <card_1.CardTitle className="text-base">İşlem Detayları</card_1.CardTitle>
            {getStatusBadge(currentJob.status)}
          </div>
          <card_1.CardDescription>
            {isPolling && (<div className="flex items-center gap-2 text-sm text-muted-foreground">
                <lucide_react_1.RefreshCw className="h-4 w-4 animate-spin"/>
                Gerçek zamanlı güncelleniyor...
              </div>)}
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {/* Progress Bar */}
          {(currentJob.status === shared_types_1.ExportJobStatus.PROCESSING || currentJob.status === shared_types_1.ExportJobStatus.PENDING) && (<div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">İlerleme</span>
                <span className="text-sm text-muted-foreground">
                  {currentJob.processedRecords} / {currentJob.totalRecords}
                </span>
              </div>
              <progress_1.Progress value={currentJob.progressPercentage} className="w-full"/>
            </div>)}

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentJob.totalRecords}</div>
              <div className="text-sm text-muted-foreground">Toplam Kayıt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentJob.processedRecords}</div>
              <div className="text-sm text-muted-foreground">İşlenen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentJob.options.fields.length}
              </div>
              <div className="text-sm text-muted-foreground">Alan Sayısı</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatFileSize(currentJob.fileSizeBytes)}
              </div>
              <div className="text-sm text-muted-foreground">Dosya Boyutu</div>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dosya Formatı:</span>
              <badge_1.Badge variant="outline" className="uppercase">
                {currentJob.options.format}
              </badge_1.Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Oluşturulma:</span>
              <span className="text-sm text-muted-foreground">
                {formatDate(currentJob.createdAt)}
              </span>
            </div>
            
            {currentJob.completedAt && (<div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tamamlanma:</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(currentJob.completedAt)}
                </span>
              </div>)}
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Son Geçerlilik:</span>
              <span className={(0, utils_1.cn)("text-sm", isExpired ? "text-red-600" : "text-muted-foreground")}>
                {formatDate(currentJob.expiresAt)}
                {isExpired && " (Süresi dolmuş)"}
              </span>
            </div>
          </div>

          {/* Applied Filters Summary */}
          {Object.keys(currentJob.filters).some(key => {
            const value = currentJob.filters[key];
            return Array.isArray(value) ? value.length > 0 : !!value;
        }) && (<div className="space-y-2 pt-4 border-t">
              <span className="text-sm font-medium">Uygulanan Filtreler:</span>
              <div className="flex flex-wrap gap-2">
                {currentJob.filters.status?.map(status => (<badge_1.Badge key={status} variant="secondary" className="text-xs">
                    Durum: {status}
                  </badge_1.Badge>))}
                {currentJob.filters.groupIds?.map(groupId => (<badge_1.Badge key={groupId} variant="secondary" className="text-xs">
                    Grup: {groupId}
                  </badge_1.Badge>))}
                {currentJob.filters.segmentIds?.map(segmentId => (<badge_1.Badge key={segmentId} variant="secondary" className="text-xs">
                    Segment: {segmentId}
                  </badge_1.Badge>))}
                {currentJob.filters.dateRange && (<badge_1.Badge variant="secondary" className="text-xs">
                    Tarih Aralığı
                  </badge_1.Badge>)}
                {currentJob.filters.validationStatus?.map(status => (<badge_1.Badge key={status} variant="secondary" className="text-xs">
                    Doğrulama: {status}
                  </badge_1.Badge>))}
              </div>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Error Display */}
      {(currentJob.error || progressError || downloadError) && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>
            {currentJob.error || progressError || downloadError}
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Expiration Warning */}
      {currentJob.status === shared_types_1.ExportJobStatus.COMPLETED && !isExpired && (<alert_1.Alert>
          <lucide_react_1.Calendar className="h-4 w-4"/>
          <alert_1.AlertDescription>
            Bu dosya {formatDate(currentJob.expiresAt)} tarihine kadar indirilebilir.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <div>
          {onNewExport && (<button_1.Button variant="outline" onClick={onNewExport}>
              <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
              Yeni Dışa Aktarma
            </button_1.Button>)}
        </div>
        
        <div className="flex gap-2">
          {(currentJob.status === shared_types_1.ExportJobStatus.PROCESSING || currentJob.status === shared_types_1.ExportJobStatus.PENDING) && (<button_1.Button variant="outline" onClick={handleCancelJob}>
              <lucide_react_1.X className="h-4 w-4 mr-2"/>
              İptal Et
            </button_1.Button>)}
          
          {currentJob.status === shared_types_1.ExportJobStatus.COMPLETED && !isExpired && (<button_1.Button onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (<>
                  <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                  İndiriliyor...
                </>) : (<>
                  <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                  Dosyayı İndir
                </>)}
            </button_1.Button>)}
          
          {onCancel && (<button_1.Button variant="outline" onClick={onCancel}>
              Kapat
            </button_1.Button>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=export-progress-tracker.js.map