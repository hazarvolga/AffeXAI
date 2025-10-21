"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportConfiguration = ExportConfiguration;
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const checkbox_1 = require("@/components/ui/checkbox");
const badge_1 = require("@/components/ui/badge");
const separator_1 = require("@/components/ui/separator");
const alert_1 = require("@/components/ui/alert");
const date_range_picker_1 = require("@/components/ui/date-range-picker");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkExportService_1 = __importDefault(require("@/lib/api/bulkExportService"));
const useExportProgress_1 = require("@/hooks/useExportProgress");
function ExportConfiguration({ onComplete, onCancel }) {
    const [filters, setFilters] = (0, react_1.useState)({
        status: [],
        groupIds: [],
        segmentIds: [],
        dateRange: undefined,
        validationStatus: []
    });
    const [options, setOptions] = (0, react_1.useState)({
        fields: ['email', 'firstName', 'lastName', 'status'],
        format: 'csv',
        includeMetadata: false,
        batchSize: 1000
    });
    const [availableFields, setAvailableFields] = (0, react_1.useState)([]);
    const [exportJob, setExportJob] = (0, react_1.useState)(null);
    const [exportPreview, setExportPreview] = (0, react_1.useState)(null);
    const [isCreatingJob, setIsCreatingJob] = (0, react_1.useState)(false);
    const [isLoadingPreview, setIsLoadingPreview] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [showPreview, setShowPreview] = (0, react_1.useState)(false);
    // Mock data for groups and segments - in real app, fetch from API
    const availableGroups = [
        { id: '1', name: 'Newsletter Subscribers', description: 'General newsletter subscribers', subscriberCount: 1250, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', name: 'Product Updates', description: 'Users interested in product updates', subscriberCount: 890, createdAt: new Date(), updatedAt: new Date() },
        { id: '3', name: 'VIP Customers', description: 'Premium customers', subscriberCount: 156, createdAt: new Date(), updatedAt: new Date() }
    ];
    const availableSegments = [
        { id: '1', name: 'Active Users', description: 'Users active in last 30 days', subscriberCount: 2100, criteria: 'last_activity > 30 days', openRate: 25.5, clickRate: 3.2, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', name: 'High Engagement', description: 'Users with high email engagement', subscriberCount: 450, criteria: 'open_rate > 40%', openRate: 45.2, clickRate: 8.1, createdAt: new Date(), updatedAt: new Date() }
    ];
    const statusOptions = [
        { value: shared_types_1.SubscriberStatus.ACTIVE, label: 'Aktif', color: 'bg-green-100 text-green-800' },
        { value: shared_types_1.SubscriberStatus.PENDING, label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
        { value: shared_types_1.SubscriberStatus.UNSUBSCRIBED, label: 'Abonelik İptal', color: 'bg-gray-100 text-gray-800' },
        { value: shared_types_1.SubscriberStatus.BOUNCED, label: 'Geri Dönen', color: 'bg-red-100 text-red-800' },
        { value: shared_types_1.SubscriberStatus.COMPLAINED, label: 'Şikayet', color: 'bg-orange-100 text-orange-800' }
    ];
    const validationStatusOptions = [
        { value: 'valid', label: 'Geçerli', color: 'bg-green-100 text-green-800' },
        { value: 'invalid', label: 'Geçersiz', color: 'bg-red-100 text-red-800' },
        { value: 'risky', label: 'Riskli', color: 'bg-yellow-100 text-yellow-800' }
    ];
    // Use export progress hook
    const { job: progressJob, isLoading: isProgressLoading, error: progressError, isPolling } = (0, useExportProgress_1.useExportProgress)({
        jobId: exportJob?.id || null,
        enabled: exportJob?.status === shared_types_1.ExportJobStatus.PROCESSING || exportJob?.status === shared_types_1.ExportJobStatus.PENDING,
        onComplete: (job) => {
            setExportJob(job);
            onComplete?.(job);
        },
        onError: (errorMessage) => {
            setError(errorMessage);
        }
    });
    // Load available fields on mount
    (0, react_1.useEffect)(() => {
        const loadAvailableFields = async () => {
            try {
                const fields = await bulkExportService_1.default.getAvailableFields();
                setAvailableFields(fields);
            }
            catch (err) {
                console.error('Failed to load available fields:', err);
                // Fallback to default fields
                setAvailableFields([
                    { key: 'email', label: 'E-posta', type: 'string', required: true },
                    { key: 'firstName', label: 'Ad', type: 'string', required: false },
                    { key: 'lastName', label: 'Soyad', type: 'string', required: false },
                    { key: 'company', label: 'Şirket', type: 'string', required: false },
                    { key: 'phone', label: 'Telefon', type: 'string', required: false },
                    { key: 'status', label: 'Durum', type: 'enum', required: false },
                    { key: 'location', label: 'Konum', type: 'string', required: false },
                    { key: 'subscribedAt', label: 'Abone Tarihi', type: 'date', required: false },
                    { key: 'lastUpdated', label: 'Son Güncelleme', type: 'date', required: false },
                    { key: 'sent', label: 'Gönderilen', type: 'number', required: false },
                    { key: 'opens', label: 'Açılma', type: 'number', required: false },
                    { key: 'clicks', label: 'Tıklama', type: 'number', required: false }
                ]);
            }
        };
        loadAvailableFields();
    }, []);
    const handleStatusToggle = (status, checked) => {
        setFilters(prev => ({
            ...prev,
            status: checked
                ? [...(prev.status || []), status]
                : (prev.status || []).filter(s => s !== status)
        }));
    };
    const handleGroupToggle = (groupId, checked) => {
        setFilters(prev => ({
            ...prev,
            groupIds: checked
                ? [...(prev.groupIds || []), groupId]
                : (prev.groupIds || []).filter(id => id !== groupId)
        }));
    };
    const handleSegmentToggle = (segmentId, checked) => {
        setFilters(prev => ({
            ...prev,
            segmentIds: checked
                ? [...(prev.segmentIds || []), segmentId]
                : (prev.segmentIds || []).filter(id => id !== segmentId)
        }));
    };
    const handleValidationStatusToggle = (status, checked) => {
        setFilters(prev => ({
            ...prev,
            validationStatus: checked
                ? [...(prev.validationStatus || []), status]
                : (prev.validationStatus || []).filter(s => s !== status)
        }));
    };
    const handleFieldToggle = (fieldKey, checked) => {
        setOptions(prev => ({
            ...prev,
            fields: checked
                ? [...prev.fields, fieldKey]
                : prev.fields.filter(f => f !== fieldKey)
        }));
    };
    const handleDateRangeChange = (dateRange) => {
        setFilters(prev => ({
            ...prev,
            dateRange
        }));
    };
    const loadExportPreview = (0, react_1.useCallback)(async () => {
        setIsLoadingPreview(true);
        setError(null);
        try {
            const preview = await bulkExportService_1.default.getExportPreview(filters);
            setExportPreview(preview);
            setShowPreview(true);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Önizleme yüklenemedi');
        }
        finally {
            setIsLoadingPreview(false);
        }
    }, [filters]);
    const handleCreateExport = async () => {
        setIsCreatingJob(true);
        setError(null);
        try {
            const job = await bulkExportService_1.default.createExportJob({
                filters,
                options
            });
            setExportJob(job);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Dışa aktarma işi oluşturulamadı');
        }
        finally {
            setIsCreatingJob(false);
        }
    };
    const getSelectedFiltersCount = () => {
        let count = 0;
        if (filters.status?.length)
            count++;
        if (filters.groupIds?.length)
            count++;
        if (filters.segmentIds?.length)
            count++;
        if (filters.dateRange)
            count++;
        if (filters.validationStatus?.length)
            count++;
        return count;
    };
    const renderFilterSection = () => (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-base flex items-center gap-2">
          <lucide_react_1.Filter className="h-4 w-4"/>
          Abone Filtreleri
          {getSelectedFiltersCount() > 0 && (<badge_1.Badge variant="secondary" className="ml-2">
              {getSelectedFiltersCount()} filtre
            </badge_1.Badge>)}
        </card_1.CardTitle>
        <card_1.CardDescription>
          Dışa aktarılacak aboneleri filtrelemek için kriterleri seçin.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        {/* Status Filter */}
        <div>
          <label_1.Label className="text-sm font-medium mb-3 block">Abone Durumu</label_1.Label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(status => (<div key={status.value} className="flex items-center space-x-2">
                <checkbox_1.Checkbox id={`status-${status.value}`} checked={filters.status?.includes(status.value)} onCheckedChange={(checked) => handleStatusToggle(status.value, checked)}/>
                <label_1.Label htmlFor={`status-${status.value}`}>
                  <badge_1.Badge variant="secondary" className={(0, utils_1.cn)("text-xs", status.color)}>
                    {status.label}
                  </badge_1.Badge>
                </label_1.Label>
              </div>))}
          </div>
        </div>

        <separator_1.Separator />

        {/* Groups Filter */}
        <div>
          <label_1.Label className="text-sm font-medium mb-3 block flex items-center gap-2">
            <lucide_react_1.Users className="h-4 w-4"/>
            Gruplar
          </label_1.Label>
          <div className="space-y-2">
            {availableGroups.map(group => (<div key={group.id} className="flex items-center space-x-2">
                <checkbox_1.Checkbox id={`group-${group.id}`} checked={filters.groupIds?.includes(group.id)} onCheckedChange={(checked) => handleGroupToggle(group.id, checked)}/>
                <label_1.Label htmlFor={`group-${group.id}`} className="flex-1">
                  <div className="font-medium">{group.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {group.subscriberCount} abone
                  </div>
                </label_1.Label>
              </div>))}
          </div>
        </div>

        <separator_1.Separator />

        {/* Segments Filter */}
        <div>
          <label_1.Label className="text-sm font-medium mb-3 block">Segmentler</label_1.Label>
          <div className="space-y-2">
            {availableSegments.map(segment => (<div key={segment.id} className="flex items-center space-x-2">
                <checkbox_1.Checkbox id={`segment-${segment.id}`} checked={filters.segmentIds?.includes(segment.id)} onCheckedChange={(checked) => handleSegmentToggle(segment.id, checked)}/>
                <label_1.Label htmlFor={`segment-${segment.id}`} className="flex-1">
                  <div className="font-medium">{segment.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {segment.subscriberCount} abone • %{segment.openRate} açılma oranı
                  </div>
                </label_1.Label>
              </div>))}
          </div>
        </div>

        <separator_1.Separator />

        {/* Date Range Filter */}
        <div>
          <label_1.Label className="text-sm font-medium mb-3 block flex items-center gap-2">
            <lucide_react_1.Calendar className="h-4 w-4"/>
            Tarih Aralığı
          </label_1.Label>
          <date_range_picker_1.DateRangePicker value={filters.dateRange} onChange={handleDateRangeChange} placeholder="Abone olma tarihi aralığı seçin"/>
        </div>

        <separator_1.Separator />

        {/* Validation Status Filter */}
        <div>
          <label_1.Label className="text-sm font-medium mb-3 block">Doğrulama Durumu</label_1.Label>
          <div className="flex flex-wrap gap-2">
            {validationStatusOptions.map(status => (<div key={status.value} className="flex items-center space-x-2">
                <checkbox_1.Checkbox id={`validation-${status.value}`} checked={filters.validationStatus?.includes(status.value)} onCheckedChange={(checked) => handleValidationStatusToggle(status.value, checked)}/>
                <label_1.Label htmlFor={`validation-${status.value}`}>
                  <badge_1.Badge variant="secondary" className={(0, utils_1.cn)("text-xs", status.color)}>
                    {status.label}
                  </badge_1.Badge>
                </label_1.Label>
              </div>))}
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
    const renderFieldSelectionSection = () => (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-base flex items-center gap-2">
          <lucide_react_1.FileText className="h-4 w-4"/>
          Alan Seçimi
          <badge_1.Badge variant="secondary" className="ml-2">
            {options.fields.length} alan
          </badge_1.Badge>
        </card_1.CardTitle>
        <card_1.CardDescription>
          Dışa aktarma dosyasına dahil edilecek alanları seçin.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableFields.map(field => (<div key={field.key} className="flex items-center space-x-2">
              <checkbox_1.Checkbox id={`field-${field.key}`} checked={options.fields.includes(field.key)} onCheckedChange={(checked) => handleFieldToggle(field.key, checked)} disabled={field.required}/>
              <label_1.Label htmlFor={`field-${field.key}`} className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{field.label}</span>
                  {field.required && (<badge_1.Badge variant="outline" className="text-xs">
                      Zorunlu
                    </badge_1.Badge>)}
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {field.type}
                </div>
              </label_1.Label>
            </div>))}
        </div>
      </card_1.CardContent>
    </card_1.Card>);
    const renderOptionsSection = () => (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="text-base flex items-center gap-2">
          <lucide_react_1.Settings className="h-4 w-4"/>
          Dışa Aktarma Seçenekleri
        </card_1.CardTitle>
        <card_1.CardDescription>
          Dosya formatı ve diğer seçenekleri yapılandırın.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-4">
        <div>
          <label_1.Label htmlFor="format">Dosya Formatı</label_1.Label>
          <select_1.Select value={options.format} onValueChange={(value) => setOptions(prev => ({ ...prev, format: value }))}>
            <select_1.SelectTrigger>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="csv">CSV (.csv)</select_1.SelectItem>
              <select_1.SelectItem value="xlsx">Excel (.xlsx)</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>

        <div className="flex items-center space-x-2">
          <checkbox_1.Checkbox id="include-metadata" checked={options.includeMetadata} onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeMetadata: checked }))}/>
          <label_1.Label htmlFor="include-metadata">
            <div className="font-medium">Metadata Dahil Et</div>
            <div className="text-sm text-muted-foreground">
              Ek abone bilgilerini ve istatistikleri dahil et
            </div>
          </label_1.Label>
        </div>

        <div>
          <label_1.Label htmlFor="batch-size">
            Batch Boyutu ({options.batchSize})
          </label_1.Label>
          <input_1.Input type="range" min="100" max="5000" step="100" value={options.batchSize} onChange={(e) => setOptions(prev => ({
            ...prev,
            batchSize: parseInt(e.target.value)
        }))} className="mt-2"/>
          <div className="text-sm text-muted-foreground mt-1">
            Büyük dosyalar için daha küçük batch boyutu kullanın.
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
    const renderPreviewSection = () => {
        if (!showPreview || !exportPreview)
            return null;
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base flex items-center gap-2">
            <lucide_react_1.Eye className="h-4 w-4"/>
            Dışa Aktarma Önizlemesi
          </card_1.CardTitle>
          <card_1.CardDescription>
            Seçilen filtrelerle eşleşen kayıt sayısı ve tahmini dosya boyutu.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{exportPreview.totalRecords}</div>
              <div className="text-sm text-muted-foreground">Toplam Kayıt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{options.fields.length}</div>
              <div className="text-sm text-muted-foreground">Seçilen Alan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{exportPreview.estimatedFileSize}</div>
              <div className="text-sm text-muted-foreground">Tahmini Boyut</div>
            </div>
          </div>

          {exportPreview.sampleRecords.length > 0 && (<div className="mt-4">
              <label_1.Label className="text-sm font-medium mb-2 block">Örnek Kayıtlar</label_1.Label>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {options.fields.map(fieldKey => {
                    const field = availableFields.find(f => f.key === fieldKey);
                    return (<th key={fieldKey} className="text-left p-2 font-medium">
                            {field?.label || fieldKey}
                          </th>);
                })}
                    </tr>
                  </thead>
                  <tbody>
                    {exportPreview.sampleRecords.slice(0, 3).map((record, index) => (<tr key={index} className="border-b">
                        {options.fields.map(fieldKey => (<td key={fieldKey} className="p-2">
                            {record[fieldKey] || '-'}
                          </td>))}
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>);
    };
    if (exportJob && (exportJob.status === shared_types_1.ExportJobStatus.PROCESSING || exportJob.status === shared_types_1.ExportJobStatus.PENDING)) {
        const currentJob = progressJob || exportJob;
        return (<div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Dışa Aktarma İşleniyor</h3>
          <p className="text-muted-foreground">
            Verileriniz hazırlanıyor, lütfen bekleyin...
          </p>
        </div>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="text-base">İşlem Durumu</card_1.CardTitle>
            <card_1.CardDescription>
              {isPolling && (<div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <lucide_react_1.RefreshCw className="h-4 w-4 animate-spin"/>
                  Gerçek zamanlı güncelleniyor...
                </div>)}
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">İlerleme</span>
              <span className="text-sm text-muted-foreground">
                {currentJob.processedRecords} / {currentJob.totalRecords}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${currentJob.progressPercentage}%` }}/>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentJob.totalRecords}</div>
                <div className="text-sm text-muted-foreground">Toplam Kayıt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentJob.processedRecords}</div>
                <div className="text-sm text-muted-foreground">İşlenen</div>
              </div>
            </div>

            {currentJob.status === shared_types_1.ExportJobStatus.PROCESSING && (<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <lucide_react_1.RefreshCw className="h-4 w-4 animate-spin"/>
                İşleniyor...
              </div>)}
          </card_1.CardContent>
        </card_1.Card>

        {(error || progressError) && (<alert_1.Alert variant="destructive">
            <lucide_react_1.AlertCircle className="h-4 w-4"/>
            <alert_1.AlertDescription>{error || progressError}</alert_1.AlertDescription>
          </alert_1.Alert>)}

        <div className="flex justify-center">
          <button_1.Button variant="outline" onClick={onCancel}>
            <lucide_react_1.X className="h-4 w-4 mr-2"/>
            İptal
          </button_1.Button>
        </div>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Abone Dışa Aktarma</h3>
        <p className="text-muted-foreground">
          Abone verilerinizi CSV veya Excel formatında dışa aktarın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {renderFilterSection()}
          {renderOptionsSection()}
        </div>
        
        <div className="space-y-6">
          {renderFieldSelectionSection()}
          {renderPreviewSection()}
        </div>
      </div>

      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}

      <div className="flex justify-between pt-6 border-t">
        <button_1.Button variant="outline" onClick={loadExportPreview} disabled={isLoadingPreview}>
          {isLoadingPreview ? (<>
              <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
              Yükleniyor...
            </>) : (<>
              <lucide_react_1.Eye className="h-4 w-4 mr-2"/>
              Önizleme
            </>)}
        </button_1.Button>
        
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={onCancel}>
            <lucide_react_1.X className="h-4 w-4 mr-2"/>
            İptal
          </button_1.Button>
          
          <button_1.Button onClick={handleCreateExport} disabled={isCreatingJob || options.fields.length === 0}>
            {isCreatingJob ? (<>
                <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                Oluşturuluyor...
              </>) : (<>
                <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                Dışa Aktarmayı Başlat
              </>)}
          </button_1.Button>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=export-configuration.js.map