"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportHistory = ExportHistory;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkExportService_1 = __importDefault(require("@/lib/api/bulkExportService"));
function ExportHistory({ onViewJob, onNewExport }) {
    const [jobs, setJobs] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [downloadingJobs, setDownloadingJobs] = (0, react_1.useState)(new Set());
    const [deletingJobs, setDeletingJobs] = (0, react_1.useState)(new Set());
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalJobs, setTotalJobs] = (0, react_1.useState)(0);
    const [hasMore, setHasMore] = (0, react_1.useState)(false);
    const loadJobs = async (page = 1) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await bulkExportService_1.default.getExportJobs(page, 10);
            if (page === 1) {
                setJobs(response.jobs);
            }
            else {
                setJobs(prev => [...prev, ...response.jobs]);
            }
            setTotalJobs(response.total);
            setHasMore(response.jobs.length === 10 && jobs.length + response.jobs.length < response.total);
            setCurrentPage(page);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Dışa aktarma geçmişi yüklenemedi');
        }
        finally {
            setIsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        loadJobs();
    }, []);
    const handleDownload = async (job) => {
        if (job.status !== shared_types_1.ExportJobStatus.COMPLETED)
            return;
        const isExpired = new Date() > new Date(job.expiresAt);
        if (isExpired)
            return;
        setDownloadingJobs(prev => new Set(prev).add(job.id));
        try {
            const blob = await bulkExportService_1.default.downloadExport(job.id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = job.fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (err) {
            console.error('Download failed:', err);
        }
        finally {
            setDownloadingJobs(prev => {
                const newSet = new Set(prev);
                newSet.delete(job.id);
                return newSet;
            });
        }
    };
    const handleDelete = async (job) => {
        if (!confirm('Bu dışa aktarma işini silmek istediğinizden emin misiniz?'))
            return;
        setDeletingJobs(prev => new Set(prev).add(job.id));
        try {
            await bulkExportService_1.default.cancelExport(job.id);
            setJobs(prev => prev.filter(j => j.id !== job.id));
            setTotalJobs(prev => prev - 1);
        }
        catch (err) {
            console.error('Delete failed:', err);
        }
        finally {
            setDeletingJobs(prev => {
                const newSet = new Set(prev);
                newSet.delete(job.id);
                return newSet;
            });
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
                return <lucide_react_1.Clock className="h-4 w-4 text-yellow-600"/>;
            case shared_types_1.ExportJobStatus.PROCESSING:
                return <lucide_react_1.RefreshCw className="h-4 w-4 text-blue-600 animate-spin"/>;
            case shared_types_1.ExportJobStatus.COMPLETED:
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>;
            case shared_types_1.ExportJobStatus.FAILED:
                return <lucide_react_1.AlertCircle className="h-4 w-4 text-red-600"/>;
            default:
                return <lucide_react_1.AlertCircle className="h-4 w-4 text-gray-600"/>;
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
    const isExpired = (job) => {
        return new Date() > new Date(job.expiresAt);
    };
    if (isLoading && jobs.length === 0) {
        return (<div className="flex items-center justify-center py-8">
        <lucide_react_1.RefreshCw className="h-6 w-6 animate-spin mr-2"/>
        <span>Dışa aktarma geçmişi yükleniyor...</span>
      </div>);
    }
    if (error) {
        return (<alert_1.Alert variant="destructive">
        <lucide_react_1.AlertCircle className="h-4 w-4"/>
        <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    if (jobs.length === 0) {
        return (<card_1.Card>
        <card_1.CardContent className="text-center py-8">
          <lucide_react_1.FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
          <h3 className="text-lg font-semibold mb-2">Henüz dışa aktarma yok</h3>
          <p className="text-muted-foreground mb-4">
            İlk dışa aktarmanızı oluşturmak için başlayın.
          </p>
          {onNewExport && (<button_1.Button onClick={onNewExport}>
              <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
              Yeni Dışa Aktarma
            </button_1.Button>)}
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dışa Aktarma Geçmişi</h3>
          <p className="text-muted-foreground">
            Toplam {totalJobs} dışa aktarma işi
          </p>
        </div>
        {onNewExport && (<button_1.Button onClick={onNewExport}>
            <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
            Yeni Dışa Aktarma
          </button_1.Button>)}
      </div>

      <div className="space-y-4">
        {jobs.map(job => (<card_1.Card key={job.id}>
            <card_1.CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <card_1.CardTitle className="text-base">{job.fileName}</card_1.CardTitle>
                    <card_1.CardDescription>
                      {formatDate(job.createdAt)}
                    </card_1.CardDescription>
                  </div>
                </div>
                {getStatusBadge(job.status)}
              </div>
            </card_1.CardHeader>
            <card_1.CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">{job.totalRecords}</div>
                  <div className="text-xs text-muted-foreground">Kayıt</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {job.options.fields.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Alan</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {formatFileSize(job.fileSizeBytes)}
                  </div>
                  <div className="text-xs text-muted-foreground">Boyut</div>
                </div>
                <div className="text-center">
                  <badge_1.Badge variant="outline" className="uppercase text-xs">
                    {job.options.format}
                  </badge_1.Badge>
                  <div className="text-xs text-muted-foreground mt-1">Format</div>
                </div>
              </div>

              {/* Progress bar for processing jobs */}
              {(job.status === shared_types_1.ExportJobStatus.PROCESSING || job.status === shared_types_1.ExportJobStatus.PENDING) && (<div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">İlerleme</span>
                    <span className="text-xs text-muted-foreground">
                      {job.processedRecords} / {job.totalRecords}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${job.progressPercentage}%` }}/>
                  </div>
                </div>)}

              {/* Expiration warning */}
              {job.status === shared_types_1.ExportJobStatus.COMPLETED && (<div className="mb-4">
                  <div className={(0, utils_1.cn)("text-xs", isExpired(job) ? "text-red-600" : "text-muted-foreground")}>
                    {isExpired(job)
                    ? `Süresi doldu: ${formatDate(job.expiresAt)}`
                    : `Son geçerlilik: ${formatDate(job.expiresAt)}`}
                  </div>
                </div>)}

              {/* Error message */}
              {job.error && (<alert_1.Alert variant="destructive" className="mb-4">
                  <lucide_react_1.AlertCircle className="h-4 w-4"/>
                  <alert_1.AlertDescription className="text-sm">{job.error}</alert_1.AlertDescription>
                </alert_1.Alert>)}

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {onViewJob && (<button_1.Button variant="outline" size="sm" onClick={() => onViewJob(job)}>
                      <lucide_react_1.Eye className="h-4 w-4 mr-1"/>
                      Detay
                    </button_1.Button>)}
                </div>
                
                <div className="flex gap-2">
                  {job.status === shared_types_1.ExportJobStatus.COMPLETED && !isExpired(job) && (<button_1.Button size="sm" onClick={() => handleDownload(job)} disabled={downloadingJobs.has(job.id)}>
                      {downloadingJobs.has(job.id) ? (<>
                          <lucide_react_1.RefreshCw className="h-4 w-4 mr-1 animate-spin"/>
                          İndiriliyor
                        </>) : (<>
                          <lucide_react_1.Download className="h-4 w-4 mr-1"/>
                          İndir
                        </>)}
                    </button_1.Button>)}
                  
                  <button_1.Button variant="outline" size="sm" onClick={() => handleDelete(job)} disabled={deletingJobs.has(job.id)}>
                    {deletingJobs.has(job.id) ? (<lucide_react_1.RefreshCw className="h-4 w-4 animate-spin"/>) : (<lucide_react_1.Trash2 className="h-4 w-4"/>)}
                  </button_1.Button>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>))}
      </div>

      {/* Load more button */}
      {hasMore && (<div className="text-center">
          <button_1.Button variant="outline" onClick={() => loadJobs(currentPage + 1)} disabled={isLoading}>
            {isLoading ? (<>
                <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                Yükleniyor...
              </>) : ('Daha Fazla Yükle')}
          </button_1.Button>
        </div>)}
    </div>);
}
//# sourceMappingURL=export-history.js.map