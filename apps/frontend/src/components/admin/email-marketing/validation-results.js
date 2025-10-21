"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResults = ValidationResults;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const progress_1 = require("@/components/ui/progress");
const alert_1 = require("@/components/ui/alert");
const tabs_1 = require("@/components/ui/tabs");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const table_1 = require("@/components/ui/table");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkImportService_1 = __importDefault(require("@/lib/api/bulkImportService"));
function ValidationResults({ job, onRetry, onDownloadReport }) {
    const [results, setResults] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [filter, setFilter] = (0, react_1.useState)({
        status: 'all',
        search: '',
        page: 1,
        limit: 50
    });
    const [totalResults, setTotalResults] = (0, react_1.useState)(0);
    const [selectedResult, setSelectedResult] = (0, react_1.useState)(null);
    const stats = {
        total: job.totalRecords,
        valid: job.validRecords,
        invalid: job.invalidRecords,
        risky: job.riskyRecords,
        duplicates: job.duplicateRecords,
        imported: job.validRecords + job.riskyRecords - job.duplicateRecords
    };
    const fetchResults = async () => {
        if (!job.id)
            return;
        setLoading(true);
        setError(null);
        try {
            const response = await bulkImportService_1.default.getImportResults(job.id, filter.page, filter.limit);
            let filteredResults = response.results;
            // Apply status filter
            if (filter.status !== 'all') {
                filteredResults = filteredResults.filter(result => result.status === filter.status);
            }
            // Apply search filter
            if (filter.search) {
                const searchLower = filter.search.toLowerCase();
                filteredResults = filteredResults.filter(result => result.email.toLowerCase().includes(searchLower) ||
                    result.issues?.some(issue => issue.toLowerCase().includes(searchLower)) ||
                    result.suggestions?.some(suggestion => suggestion.toLowerCase().includes(searchLower)));
            }
            setResults(filteredResults);
            setTotalResults(response.total);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Sonuçlar yüklenemedi');
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchResults();
    }, [job.id, filter]);
    const getStatusIcon = (status) => {
        switch (status) {
            case shared_types_1.ImportResultStatus.VALID:
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>;
            case shared_types_1.ImportResultStatus.INVALID:
                return <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>;
            case shared_types_1.ImportResultStatus.RISKY:
                return <lucide_react_1.AlertTriangle className="h-4 w-4 text-yellow-500"/>;
            case shared_types_1.ImportResultStatus.DUPLICATE:
                return <lucide_react_1.Copy className="h-4 w-4 text-blue-500"/>;
            default:
                return <lucide_react_1.Minus className="h-4 w-4 text-gray-500"/>;
        }
    };
    const getStatusBadge = (status) => {
        const variants = {
            [shared_types_1.ImportResultStatus.VALID]: 'default',
            [shared_types_1.ImportResultStatus.INVALID]: 'destructive',
            [shared_types_1.ImportResultStatus.RISKY]: 'secondary',
            [shared_types_1.ImportResultStatus.DUPLICATE]: 'outline'
        };
        const labels = {
            [shared_types_1.ImportResultStatus.VALID]: 'Geçerli',
            [shared_types_1.ImportResultStatus.INVALID]: 'Geçersiz',
            [shared_types_1.ImportResultStatus.RISKY]: 'Riskli',
            [shared_types_1.ImportResultStatus.DUPLICATE]: 'Tekrar'
        };
        return (<badge_1.Badge variant={variants[status] || 'outline'}>
        {labels[status] || status}
      </badge_1.Badge>);
    };
    const getConfidenceColor = (score) => {
        if (score >= 80)
            return 'text-green-600';
        if (score >= 60)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    const getConfidenceTrend = (score) => {
        if (score >= 80)
            return <lucide_react_1.TrendingUp className="h-4 w-4 text-green-500"/>;
        if (score >= 60)
            return <lucide_react_1.Minus className="h-4 w-4 text-yellow-500"/>;
        return <lucide_react_1.TrendingDown className="h-4 w-4 text-red-500"/>;
    };
    const renderStatsCards = () => (<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <card_1.Card>
        <card_1.CardContent className="p-4 text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Toplam</div>
        </card_1.CardContent>
      </card_1.Card>
      
      <card_1.Card>
        <card_1.CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
          <div className="text-sm text-muted-foreground">Geçerli</div>
          <div className="text-xs text-muted-foreground">
            %{((stats.valid / stats.total) * 100).toFixed(1)}
          </div>
        </card_1.CardContent>
      </card_1.Card>
      
      <card_1.Card>
        <card_1.CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.risky}</div>
          <div className="text-sm text-muted-foreground">Riskli</div>
          <div className="text-xs text-muted-foreground">
            %{((stats.risky / stats.total) * 100).toFixed(1)}
          </div>
        </card_1.CardContent>
      </card_1.Card>
      
      <card_1.Card>
        <card_1.CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.invalid}</div>
          <div className="text-sm text-muted-foreground">Geçersiz</div>
          <div className="text-xs text-muted-foreground">
            %{((stats.invalid / stats.total) * 100).toFixed(1)}
          </div>
        </card_1.CardContent>
      </card_1.Card>
      
      <card_1.Card>
        <card_1.CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.duplicates}</div>
          <div className="text-sm text-muted-foreground">Tekrar</div>
          <div className="text-xs text-muted-foreground">
            %{((stats.duplicates / stats.total) * 100).toFixed(1)}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
    const renderProgressBar = () => {
        const successRate = ((stats.valid + stats.risky) / stats.total) * 100;
        return (<card_1.Card className="mb-6">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base">Doğrulama Başarı Oranı</card_1.CardTitle>
          <card_1.CardDescription>
            Geçerli ve riskli e-postaların toplam oranı
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Başarı Oranı</span>
              <span className="font-medium">%{successRate.toFixed(1)}</span>
            </div>
            <progress_1.Progress value={successRate} className="h-2"/>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{stats.valid + stats.risky} başarılı</span>
              <span>{stats.invalid} başarısız</span>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    };
    const renderFilters = () => (<card_1.Card className="mb-6">
      <card_1.CardHeader>
        <card_1.CardTitle className="text-base">Filtreler</card_1.CardTitle>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
              <input_1.Input placeholder="E-posta adresi ara..." value={filter.search} onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value, page: 1 }))} className="pl-10"/>
            </div>
          </div>
          
          <select_1.Select value={filter.status} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value, page: 1 }))}>
            <select_1.SelectTrigger className="w-48">
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="all">Tüm Durumlar</select_1.SelectItem>
              <select_1.SelectItem value={shared_types_1.ImportResultStatus.VALID}>Geçerli</select_1.SelectItem>
              <select_1.SelectItem value={shared_types_1.ImportResultStatus.RISKY}>Riskli</select_1.SelectItem>
              <select_1.SelectItem value={shared_types_1.ImportResultStatus.INVALID}>Geçersiz</select_1.SelectItem>
              <select_1.SelectItem value={shared_types_1.ImportResultStatus.DUPLICATE}>Tekrar</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          
          <button_1.Button variant="outline" onClick={fetchResults} disabled={loading}>
            <lucide_react_1.RefreshCw className={(0, utils_1.cn)("h-4 w-4 mr-2", loading && "animate-spin")}/>
            Yenile
          </button_1.Button>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
    const renderResultsTable = () => (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-base">Detaylı Sonuçlar</card_1.CardTitle>
        <card_1.CardDescription>
          {totalResults} sonuçtan {results.length} tanesi gösteriliyor
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        {loading ? (<div className="flex items-center justify-center py-8">
            <lucide_react_1.RefreshCw className="h-6 w-6 animate-spin mr-2"/>
            Yükleniyor...
          </div>) : results.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
            Sonuç bulunamadı
          </div>) : (<div className="overflow-x-auto">
            <table_1.Table>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>E-posta</table_1.TableHead>
                  <table_1.TableHead>Durum</table_1.TableHead>
                  <table_1.TableHead>Güven Skoru</table_1.TableHead>
                  <table_1.TableHead>İçe Aktarıldı</table_1.TableHead>
                  <table_1.TableHead>Satır</table_1.TableHead>
                  <table_1.TableHead>İşlemler</table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {results.map((result) => (<table_1.TableRow key={result.id}>
                    <table_1.TableCell className="font-medium">
                      {result.email}
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        {getStatusBadge(result.status)}
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex items-center gap-2">
                        {getConfidenceTrend(result.confidenceScore)}
                        <span className={(0, utils_1.cn)("font-medium", getConfidenceColor(result.confidenceScore))}>
                          {result.confidenceScore}%
                        </span>
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      {result.imported ? (<lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>)}
                    </table_1.TableCell>
                    <table_1.TableCell>{result.rowNumber}</table_1.TableCell>
                    <table_1.TableCell>
                      <button_1.Button variant="ghost" size="sm" onClick={() => setSelectedResult(result)}>
                        <lucide_react_1.Eye className="h-4 w-4"/>
                      </button_1.Button>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
          </div>)}
      </card_1.CardContent>
    </card_1.Card>);
    const renderResultDetail = () => {
        if (!selectedResult)
            return null;
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base">Detay: {selectedResult.email}</card_1.CardTitle>
          <button_1.Button variant="ghost" size="sm" onClick={() => setSelectedResult(null)} className="absolute top-4 right-4">
            ×
          </button_1.Button>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Durum</div>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(selectedResult.status)}
                {getStatusBadge(selectedResult.status)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Güven Skoru</div>
              <div className="flex items-center gap-2 mt-1">
                {getConfidenceTrend(selectedResult.confidenceScore)}
                <span className={(0, utils_1.cn)("font-medium", getConfidenceColor(selectedResult.confidenceScore))}>
                  {selectedResult.confidenceScore}%
                </span>
              </div>
            </div>
          </div>

          {selectedResult.issues && selectedResult.issues.length > 0 && (<div>
              <div className="text-sm font-medium mb-2">Sorunlar</div>
              <div className="space-y-1">
                {selectedResult.issues.map((issue, index) => (<alert_1.Alert key={index} variant="destructive">
                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                    <alert_1.AlertDescription>{issue}</alert_1.AlertDescription>
                  </alert_1.Alert>))}
              </div>
            </div>)}

          {selectedResult.suggestions && selectedResult.suggestions.length > 0 && (<div>
              <div className="text-sm font-medium mb-2">Öneriler</div>
              <div className="space-y-1">
                {selectedResult.suggestions.map((suggestion, index) => (<alert_1.Alert key={index}>
                    <alert_1.AlertDescription>{suggestion}</alert_1.AlertDescription>
                  </alert_1.Alert>))}
              </div>
            </div>)}

          {selectedResult.validationDetails && (<div>
              <div className="text-sm font-medium mb-2">Doğrulama Detayları</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Sözdizimi:</span>
                  <span>{selectedResult.validationDetails.syntaxValid ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domain:</span>
                  <span>{selectedResult.validationDetails.domainExists ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span>MX Kaydı:</span>
                  <span>{selectedResult.validationDetails.mxRecordExists ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tek Kullanımlık:</span>
                  <span>{selectedResult.validationDetails.isDisposable ? '✗' : '✓'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rol Hesabı:</span>
                  <span>{selectedResult.validationDetails.isRoleAccount ? '✗' : '✓'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yazım Hatası:</span>
                  <span>{selectedResult.validationDetails.hasTypos ? '✗' : '✓'}</span>
                </div>
              </div>
            </div>)}

          {selectedResult.error && (<alert_1.Alert variant="destructive">
              <lucide_react_1.AlertCircle className="h-4 w-4"/>
              <alert_1.AlertDescription>{selectedResult.error}</alert_1.AlertDescription>
            </alert_1.Alert>)}
        </card_1.CardContent>
      </card_1.Card>);
    };
    return (<div className="space-y-6">
      {renderStatsCards()}
      {renderProgressBar()}
      
      <tabs_1.Tabs defaultValue="results" className="w-full">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="results">Sonuçlar</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="summary">Özet</tabs_1.TabsTrigger>
        </tabs_1.TabsList>
        
        <tabs_1.TabsContent value="results" className="space-y-6">
          {renderFilters()}
          {selectedResult ? renderResultDetail() : renderResultsTable()}
        </tabs_1.TabsContent>
        
        <tabs_1.TabsContent value="summary" className="space-y-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>İçe Aktarma Özeti</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Dosya Adı</div>
                  <div className="text-sm text-muted-foreground">{job.fileName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">İşlem Tarihi</div>
                  <div className="text-sm text-muted-foreground">
                    {job.createdAt ? new Date(job.createdAt).toLocaleString('tr-TR') : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Tamamlanma Tarihi</div>
                  <div className="text-sm text-muted-foreground">
                    {job.completedAt ? new Date(job.completedAt).toLocaleString('tr-TR') : '-'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">İşlem Süresi</div>
                  <div className="text-sm text-muted-foreground">
                    {job.completedAt && job.createdAt
            ? `${Math.round((new Date(job.completedAt).getTime() - new Date(job.createdAt).getTime()) / 1000)} saniye`
            : '-'}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button_1.Button onClick={onDownloadReport} variant="outline">
                  <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                  Rapor İndir
                </button_1.Button>
                {onRetry && (<button_1.Button onClick={onRetry} variant="outline">
                    <lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/>
                    Tekrar Dene
                  </button_1.Button>)}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
}
//# sourceMappingURL=validation-results.js.map