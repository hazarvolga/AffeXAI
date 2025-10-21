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
exports.ImportWizard = ImportWizard;
const react_1 = require("react");
const auth_1 = require("@/lib/auth");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const checkbox_1 = require("@/components/ui/checkbox");
const progress_1 = require("@/components/ui/progress");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const bulkImportService_1 = __importStar(require("@/lib/api/bulkImportService"));
const import_results_dashboard_1 = require("./import-results-dashboard");
const useImportProgress_1 = require("@/hooks/useImportProgress");
const useCustomFields_1 = require("@/hooks/useCustomFields");
const useGroupsAndSegments_1 = require("@/hooks/useGroupsAndSegments");
// Note: Using ImportJob and ImportJobStatus from bulkImportService as the source of truth
// Animated counter hook
function useAnimatedCounter(targetValue, duration = 300) {
    const [displayValue, setDisplayValue] = (0, react_1.useState)(targetValue);
    (0, react_1.useEffect)(() => {
        const start = displayValue;
        const diff = targetValue - start;
        const increment = diff / (duration / 16); // 60fps
        if (Math.abs(diff) < 1) {
            setDisplayValue(targetValue);
            return;
        }
        const timer = setInterval(() => {
            setDisplayValue(prev => {
                const next = prev + increment;
                if ((increment > 0 && next >= targetValue) || (increment < 0 && next <= targetValue)) {
                    clearInterval(timer);
                    return targetValue;
                }
                return next;
            });
        }, 16);
        return () => clearInterval(timer);
    }, [targetValue, duration]);
    return Math.round(displayValue);
}
function ImportWizard({ onComplete, onCancel }) {
    const [currentStep, setCurrentStep] = (0, react_1.useState)('upload');
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const [csvPreview, setCsvPreview] = (0, react_1.useState)(null);
    const [columnMapping, setColumnMapping] = (0, react_1.useState)({});
    const [importOptions, setImportOptions] = (0, react_1.useState)({
        groupIds: [],
        segmentIds: [],
        duplicateHandling: 'skip',
        validationThreshold: 70,
        batchSize: 1000,
        columnMapping: {}
    });
    const [importJob, setImportJob] = (0, react_1.useState)(null);
    const [validationStats, setValidationStats] = (0, react_1.useState)(null);
    const [isProcessing, setIsProcessing] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [isDragOver, setIsDragOver] = (0, react_1.useState)(false);
    // Processing stats tracking
    const [startTime, setStartTime] = (0, react_1.useState)(null);
    const [lastProcessedCount, setLastProcessedCount] = (0, react_1.useState)(0);
    const [recordsPerSecond, setRecordsPerSecond] = (0, react_1.useState)(0);
    // Auth check
    const { isAuthenticated, isLoading: authLoading, user } = (0, auth_1.useAuth)();
    // Use custom hooks for data fetching
    const { mappingFields, loading: fieldsLoading, error: fieldsError } = (0, useCustomFields_1.useCustomFields)();
    const { groups: availableGroups, segments: availableSegments, loading: groupsLoading, error: groupsError } = (0, useGroupsAndSegments_1.useGroupsAndSegments)();
    // Memoize callbacks to prevent infinite re-renders
    const handleImportComplete = (0, react_1.useCallback)((job) => {
        setImportJob(job);
        setValidationStats({
            total: job.totalRecords,
            valid: job.validRecords,
            invalid: job.invalidRecords,
            risky: job.riskyRecords || 0,
            duplicates: job.duplicateRecords
        });
        setCurrentStep('results');
    }, []);
    const handleImportError = (0, react_1.useCallback)((errorMessage) => {
        setError(errorMessage);
    }, []);
    // Use the progress tracking hook
    const { job: progressJob, isLoading: isProgressLoading, error: progressError, isPolling } = (0, useImportProgress_1.useImportProgress)({
        jobId: importJob?.id || null,
        userId: user?.id || '',
        enabled: currentStep === 'validate' && !!importJob?.id,
        onComplete: handleImportComplete,
        onError: handleImportError
    });
    const fileInputRef = (0, react_1.useRef)(null);
    // Calculate processing stats when progressJob updates
    (0, react_1.useEffect)(() => {
        if (!progressJob)
            return;
        const currentProcessed = (progressJob.validRecords || 0) +
            (progressJob.riskyRecords || 0) +
            (progressJob.invalidRecords || 0) +
            (progressJob.duplicateRecords || 0);
        // Initialize start time on first update
        if (!startTime && currentProcessed > 0) {
            setStartTime(new Date());
            setLastProcessedCount(currentProcessed);
            return;
        }
        // Calculate records per second
        if (startTime && currentProcessed > lastProcessedCount) {
            const elapsed = (Date.now() - startTime.getTime()) / 1000; // seconds
            const rate = currentProcessed / elapsed;
            setRecordsPerSecond(Math.round(rate));
            setLastProcessedCount(currentProcessed);
        }
    }, [progressJob, startTime, lastProcessedCount]);
    // Ensure isProcessing is false when job status becomes completed
    (0, react_1.useEffect)(() => {
        const current = progressJob || importJob;
        if (current?.status === bulkImportService_1.ImportJobStatus.COMPLETED && isProcessing) {
            setIsProcessing(false);
        }
    }, [progressJob, importJob, isProcessing]);
    // Animated counters for all metrics (must be called at component level, not in render)
    const currentJob = progressJob || importJob;
    // Debug log
    (0, react_1.useEffect)(() => {
        console.log('[ImportWizard] Job state updated:', {
            hasProgressJob: !!progressJob,
            hasImportJob: !!importJob,
            currentJobId: currentJob?.id,
            currentJobStatus: currentJob?.status,
            totalRecords: currentJob?.totalRecords,
            processedRecords: currentJob?.processedRecords,
            validRecords: currentJob?.validRecords,
            isPolling
        });
    }, [progressJob, importJob, currentJob, isPolling]);
    const animatedProcessedRecords = useAnimatedCounter(currentJob?.processedRecords || 0, 300);
    const animatedValidRecords = useAnimatedCounter(currentJob?.validRecords || 0, 300);
    const animatedRiskyRecords = useAnimatedCounter(currentJob?.riskyRecords || 0, 300);
    const animatedInvalidRecords = useAnimatedCounter(currentJob?.invalidRecords || 0, 300);
    const animatedDuplicateRecords = useAnimatedCounter(currentJob?.duplicateRecords || 0, 300);
    const steps = [
        { key: 'upload', title: 'Dosya Yükle', icon: lucide_react_1.Upload },
        { key: 'configure', title: 'Yapılandır', icon: lucide_react_1.Settings },
        { key: 'validate', title: 'Doğrula', icon: lucide_react_1.CheckCircle },
        { key: 'results', title: 'Sonuçlar', icon: lucide_react_1.FileText }
    ];
    const handleDragOver = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);
    const handleDragLeave = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);
    const handleDrop = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
        if (csvFile) {
            handleFileSelect(csvFile);
        }
        else {
            setError('Lütfen geçerli bir CSV dosyası seçin.');
        }
    }, []);
    const handleFileSelect = async (file) => {
        setError(null);
        setSelectedFile(file);
        // Parse CSV for preview
        try {
            const text = await file.text();
            const lines = text.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const rows = lines.slice(1, 6).map(line => line.split(',').map(cell => cell.trim().replace(/"/g, '')));
            setCsvPreview({
                headers,
                rows,
                totalRows: lines.length - 1
            });
            // Auto-detect column mapping
            const autoMapping = {};
            headers.forEach(header => {
                const lowerHeader = header.toLowerCase();
                // Check against available mapping fields
                const matchingField = mappingFields.find(field => {
                    const fieldKey = field.key.replace('custom_', '');
                    const fieldLabel = field.label.toLowerCase();
                    return (lowerHeader.includes(fieldKey) ||
                        lowerHeader.includes(fieldLabel) ||
                        (fieldKey === 'email' && (lowerHeader.includes('e-mail') || lowerHeader.includes('mail'))) ||
                        (fieldKey === 'firstName' && (lowerHeader.includes('first') || lowerHeader.includes('ad'))) ||
                        (fieldKey === 'lastName' && (lowerHeader.includes('last') || lowerHeader.includes('soyad'))) ||
                        (fieldKey === 'company' && (lowerHeader.includes('şirket') || lowerHeader.includes('firma'))) ||
                        (fieldKey === 'phone' && (lowerHeader.includes('telefon') || lowerHeader.includes('tel'))) ||
                        (fieldKey === 'location' && (lowerHeader.includes('konum') || lowerHeader.includes('adres'))));
                });
                if (matchingField) {
                    autoMapping[header] = matchingField.key;
                }
            });
            setColumnMapping(autoMapping);
            setImportOptions((prev) => ({ ...prev, columnMapping: autoMapping }));
        }
        catch (err) {
            setError('CSV dosyası okunurken hata oluştu.');
        }
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };
    const handleColumnMappingChange = (csvColumn, fieldKey) => {
        const newMapping = { ...columnMapping };
        // Remove this field from other columns
        Object.keys(newMapping).forEach(key => {
            if (newMapping[key] === fieldKey && key !== csvColumn) {
                delete newMapping[key];
            }
        });
        if (fieldKey === 'none') {
            delete newMapping[csvColumn];
        }
        else {
            newMapping[csvColumn] = fieldKey;
        }
        setColumnMapping(newMapping);
        setImportOptions((prev) => ({ ...prev, columnMapping: newMapping }));
    };
    const handleGroupToggle = (groupId, checked) => {
        setImportOptions((prev) => ({
            ...prev,
            groupIds: checked
                ? [...(prev.groupIds || []), groupId]
                : (prev.groupIds || []).filter((id) => id !== groupId)
        }));
    };
    const handleSegmentToggle = (segmentId, checked) => {
        setImportOptions((prev) => ({
            ...prev,
            segmentIds: checked
                ? [...(prev.segmentIds || []), segmentId]
                : (prev.segmentIds || []).filter((id) => id !== segmentId)
        }));
    };
    const startImport = async () => {
        if (!selectedFile)
            return;
        setIsProcessing(true);
        setError(null);
        try {
            const job = await bulkImportService_1.default.uploadFile({
                file: selectedFile,
                options: importOptions
            });
            console.log('[ImportWizard] Job received from backend:', {
                id: job.id,
                status: job.status,
                totalRecords: job.totalRecords,
                processedRecords: job.processedRecords
            });
            setImportJob(job);
            setCurrentStep('validate');
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Bilinmeyen hata oluştu');
        }
        finally {
            setIsProcessing(false);
        }
    };
    const handleDownloadReport = async () => {
        if (!importJob)
            return;
        try {
            const blob = await bulkImportService_1.default.downloadReport(importJob.id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `import-report-${importJob.id}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (err) {
            setError('Rapor indirilemedi');
        }
    };
    const canProceedToNext = () => {
        switch (currentStep) {
            case 'upload':
                return selectedFile && csvPreview;
            case 'configure':
                return Object.values(columnMapping).includes('email');
            case 'validate': {
                // Consider the polling job (progressJob) as the source of truth during validation
                const current = progressJob || importJob;
                return current?.status === bulkImportService_1.ImportJobStatus.COMPLETED;
            }
            default:
                return false;
        }
    };
    const handleNext = () => {
        switch (currentStep) {
            case 'upload':
                setCurrentStep('configure');
                break;
            case 'configure':
                startImport();
                break;
            case 'validate':
                setCurrentStep('results');
                break;
        }
    };
    const handlePrevious = () => {
        switch (currentStep) {
            case 'configure':
                setCurrentStep('upload');
                break;
            case 'validate':
                setCurrentStep('configure');
                break;
            case 'results':
                setCurrentStep('validate');
                break;
        }
    };
    const renderStepIndicator = () => (<div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
            const Icon = step.icon;
            return (<div key={step.key} className="flex items-center">
            <div className={(0, utils_1.cn)("flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors", isActive && "border-primary bg-primary text-primary-foreground", isCompleted && "border-green-500 bg-green-500 text-white", !isActive && !isCompleted && "border-muted-foreground text-muted-foreground")}>
              <Icon className="h-5 w-5"/>
            </div>
            <div className="ml-3 text-sm">
              <div className={(0, utils_1.cn)("font-medium", isActive && "text-primary", isCompleted && "text-green-600")}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (<div className={(0, utils_1.cn)("w-12 h-0.5 mx-4", isCompleted ? "bg-green-500" : "bg-muted")}/>)}
          </div>);
        })}
    </div>);
    const renderUploadStep = () => (<div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">CSV Dosyası Yükleyin</h3>
        <p className="text-muted-foreground">
          Abone bilgilerini içeren CSV dosyanızı seçin veya sürükleyip bırakın.
        </p>
      </div>

      <div className={(0, utils_1.cn)("border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer", isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25", selectedFile && "border-green-500 bg-green-50")} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
        <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileInputChange} className="hidden"/>
        
        {selectedFile ? (<div className="space-y-2">
            <lucide_react_1.CheckCircle className="h-12 w-12 text-green-500 mx-auto"/>
            <div className="font-medium">{selectedFile.name}</div>
            <div className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </div>
          </div>) : (<div className="space-y-2">
            <lucide_react_1.Upload className="h-12 w-12 text-muted-foreground mx-auto"/>
            <div className="font-medium">CSV dosyası seçin</div>
            <div className="text-sm text-muted-foreground">
              Dosyayı buraya sürükleyin veya tıklayarak seçin
            </div>
          </div>)}
      </div>

      {csvPreview && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="text-base">Dosya Önizlemesi</card_1.CardTitle>
            <card_1.CardDescription>
              İlk 5 satır gösteriliyor. Toplam {csvPreview.totalRows} satır bulundu.
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {csvPreview.headers.map((header, index) => (<th key={index} className="text-left p-2 font-medium">
                        {header}
                      </th>))}
                  </tr>
                </thead>
                <tbody>
                  {csvPreview.rows.map((row, rowIndex) => (<tr key={rowIndex} className="border-b">
                      {row.map((cell, cellIndex) => (<td key={cellIndex} className="p-2">
                          {cell}
                        </td>))}
                    </tr>))}
                </tbody>
              </table>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}

      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
    const renderConfigureStep = () => (<div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">İçe Aktarma Ayarları</h3>
        <p className="text-muted-foreground">
          Sütun eşleştirmesi yapın ve içe aktarma seçeneklerini belirleyin.
        </p>
      </div>

      {/* Column Mapping */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base">Sütun Eşleştirmesi</card_1.CardTitle>
          <card_1.CardDescription>
            CSV sütunlarını abone alanlarıyla eşleştirin. Email alanı zorunludur.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {csvPreview?.headers.map(header => (<div key={header} className="flex items-center gap-4">
              <div className="w-32 font-medium text-sm">{header}</div>
              <lucide_react_1.ArrowRight className="h-4 w-4 text-muted-foreground"/>
              <select_1.Select value={columnMapping[header] || 'none'} onValueChange={(value) => handleColumnMappingChange(header, value)}>
                <select_1.SelectTrigger className="w-48">
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="none">Eşleştirme</select_1.SelectItem>
                  {mappingFields.map(field => (<select_1.SelectItem key={field.key} value={field.key}>
                      {field.label} {field.required && '*'}
                      {field.key.startsWith('custom_') && (<badge_1.Badge variant="outline" className="ml-2 text-xs">
                          Özel
                        </badge_1.Badge>)}
                    </select_1.SelectItem>))}
                </select_1.SelectContent>
              </select_1.Select>
            </div>))}
        </card_1.CardContent>
      </card_1.Card>

      {/* Loading state for groups and segments */}
      {(groupsLoading || fieldsLoading) && (<alert_1.Alert>
          <lucide_react_1.RefreshCw className="h-4 w-4 animate-spin"/>
          <alert_1.AlertDescription>
            Gruplar ve segmentler yükleniyor...
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Error state for groups and segments */}
      {(groupsError || fieldsError) && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>
            Veri yüklenirken hata oluştu: {groupsError || fieldsError}
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Groups Selection */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base flex items-center gap-2">
            <lucide_react_1.Users className="h-4 w-4"/>
            Gruplar
          </card_1.CardTitle>
          <card_1.CardDescription>
            İçe aktarılan abonelerin ekleneceği grupları seçin.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-3">
          {availableGroups.map(group => (<div key={group.id} className="flex items-center space-x-2">
              <checkbox_1.Checkbox id={`group-${group.id}`} checked={importOptions.groupIds?.includes(group.id)} onCheckedChange={(checked) => handleGroupToggle(group.id, checked)}/>
              <label_1.Label htmlFor={`group-${group.id}`} className="flex-1">
                <div className="font-medium">{group.name}</div>
                <div className="text-sm text-muted-foreground">
                  {group.subscriberCount} abone
                </div>
              </label_1.Label>
            </div>))}
        </card_1.CardContent>
      </card_1.Card>

      {/* Segments Selection */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base flex items-center gap-2">
            <lucide_react_1.Filter className="h-4 w-4"/>
            Segmentler
          </card_1.CardTitle>
          <card_1.CardDescription>
            İçe aktarılan abonelerin ekleneceği segmentleri seçin.
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-3">
          {availableSegments.map(segment => (<div key={segment.id} className="flex items-center space-x-2">
              <checkbox_1.Checkbox id={`segment-${segment.id}`} checked={importOptions.segmentIds?.includes(segment.id)} onCheckedChange={(checked) => handleSegmentToggle(segment.id, checked)}/>
              <label_1.Label htmlFor={`segment-${segment.id}`} className="flex-1">
                <div className="font-medium">{segment.name}</div>
                <div className="text-sm text-muted-foreground">
                  {segment.subscriberCount} abone • %{segment.openRate} açılma oranı
                </div>
              </label_1.Label>
            </div>))}
        </card_1.CardContent>
      </card_1.Card>

      {/* Import Options */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base">İçe Aktarma Seçenekleri</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div>
            <label_1.Label htmlFor="duplicate-handling">Tekrar Eden E-postalar</label_1.Label>
            <select_1.Select value={importOptions.duplicateHandling} onValueChange={(value) => setImportOptions((prev) => ({ ...prev, duplicateHandling: value }))}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="skip">Atla</select_1.SelectItem>
                <select_1.SelectItem value="update">Güncelle</select_1.SelectItem>
                <select_1.SelectItem value="replace">Değiştir</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div>
            <label_1.Label htmlFor="validation-threshold">
              Doğrulama Eşiği (%{importOptions.validationThreshold})
            </label_1.Label>
            <input_1.Input type="range" min="0" max="100" value={importOptions.validationThreshold} onChange={(e) => setImportOptions((prev) => ({
            ...prev,
            validationThreshold: parseInt(e.target.value)
        }))} className="mt-2"/>
            <div className="text-sm text-muted-foreground mt-1">
              Bu değerin altındaki güven skoruna sahip e-postalar riskli olarak işaretlenir.
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {!Object.values(columnMapping).includes('email') && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>
            Email alanı eşleştirmesi zorunludur. Lütfen bir sütunu email alanıyla eşleştirin.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
    const renderValidateStep = () => (<div className="space-y-6">
      {/* Multi-Stage Progress Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">İçe Aktarma İşlemi</h3>
            <p className="text-sm text-gray-600 mt-1">
              {(() => {
            const currentJob = progressJob || importJob;
            if (!currentJob)
                return 'Hazırlanıyor...';
            if (currentJob.status === bulkImportService_1.ImportJobStatus.COMPLETED)
                return 'İşlem başarıyla tamamlandı!';
            if (currentJob.status === bulkImportService_1.ImportJobStatus.FAILED)
                return 'İşlem başarısız oldu.';
            return `${currentJob.processedRecords}/${currentJob.totalRecords} kayıt işleniyor...`;
        })()}
            </p>
          </div>
          {isPolling && (<div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
              <lucide_react_1.RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600"/>
              <span className="text-xs font-medium text-blue-700">Canlı</span>
            </div>)}
        </div>

        {/* Stage Progress Indicators */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
            <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
            <span className="text-xs font-medium text-green-700">Dosya Yüklendi</span>
          </div>
          <div className="h-0.5 flex-1 bg-blue-200"></div>
          <div className={(0, utils_1.cn)("flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.PROCESSING
            ? "bg-blue-100"
            : (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED
                ? "bg-green-100"
                : "bg-gray-100")}>
            <lucide_react_1.RefreshCw className={(0, utils_1.cn)("h-4 w-4", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.PROCESSING && "animate-spin text-blue-600", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED && "text-green-600", (progressJob || importJob)?.status !== bulkImportService_1.ImportJobStatus.PROCESSING && (progressJob || importJob)?.status !== bulkImportService_1.ImportJobStatus.COMPLETED && "text-gray-400")}/>
            <span className={(0, utils_1.cn)("text-xs font-medium", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.PROCESSING && "text-blue-700", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED && "text-green-700", (progressJob || importJob)?.status !== bulkImportService_1.ImportJobStatus.PROCESSING && (progressJob || importJob)?.status !== bulkImportService_1.ImportJobStatus.COMPLETED && "text-gray-500")}>
              Doğrulanıyor
            </span>
          </div>
          <div className="h-0.5 flex-1 bg-gray-200"></div>
          <div className={(0, utils_1.cn)("flex items-center gap-2 px-3 py-1.5 rounded-full", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED
            ? "bg-green-100"
            : "bg-gray-100")}>
            <lucide_react_1.CheckCircle className={(0, utils_1.cn)("h-4 w-4", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED ? "text-green-600" : "text-gray-400")}/>
            <span className={(0, utils_1.cn)("text-xs font-medium", (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.COMPLETED ? "text-green-700" : "text-gray-500")}>
              Tamamlandı
            </span>
          </div>
        </div>
      </div>

      {(progressJob || importJob) && (<>
          {/* Overall Progress */}
          <card_1.Card>
            <card_1.CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <card_1.CardTitle className="text-base">Genel İlerleme</card_1.CardTitle>
                  <card_1.CardDescription className="mt-1">
                    {(() => {
                const currentJob = progressJob || importJob;
                if (!currentJob)
                    return '';
                const percentage = currentJob.progressPercentage ||
                    ((currentJob.processedRecords / currentJob.totalRecords) * 100);
                return `%${percentage.toFixed(1)} tamamlandı`;
            })()}
                  </card_1.CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {animatedProcessedRecords.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">
                      {' '}/{' '}
                      {((progressJob || importJob)?.totalRecords || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">kayıt</div>
                </div>
              </div>
              
              {/* Processing Stats - ETA and Speed */}
              {recordsPerSecond > 0 && (progressJob || importJob)?.status === bulkImportService_1.ImportJobStatus.PROCESSING && (<div className="flex items-center gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <lucide_react_1.Zap className="h-4 w-4 text-amber-500"/>
                    <span className="font-medium text-gray-700">{recordsPerSecond.toLocaleString()}</span>
                    <span className="text-gray-500">kayıt/sn</span>
                  </div>
                  {(() => {
                    const currentJob = progressJob || importJob;
                    if (!currentJob)
                        return null;
                    const remaining = currentJob.totalRecords - currentJob.processedRecords;
                    const etaSeconds = recordsPerSecond > 0 ? Math.ceil(remaining / recordsPerSecond) : 0;
                    const minutes = Math.floor(etaSeconds / 60);
                    const seconds = etaSeconds % 60;
                    if (etaSeconds > 0) {
                        return (<div className="flex items-center gap-2 text-sm">
                          <lucide_react_1.Clock className="h-4 w-4 text-blue-500"/>
                          <span className="text-gray-500">Tahmini kalan:</span>
                          <span className="font-medium text-gray-700">
                            {minutes > 0 ? `${minutes}dk ${seconds}sn` : `${seconds}sn`}
                          </span>
                        </div>);
                    }
                    return null;
                })()}
                </div>)}
            </card_1.CardHeader>
            <card_1.CardContent>
              <progress_1.Progress value={(() => {
                const currentJob = progressJob || importJob;
                if (!currentJob)
                    return 0;
                return currentJob.progressPercentage ||
                    ((currentJob.processedRecords / currentJob.totalRecords) * 100);
            })()} className="h-3"/>
            </card_1.CardContent>
          </card_1.Card>

          {/* Category Breakdown with Individual Progress Bars */}
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="text-base">Doğrulama Sonuçları</card_1.CardTitle>
              <card_1.CardDescription>
                Her kategori için detaylı analiz ve ilerleme durumu
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              {(() => {
                const currentJob = progressJob || importJob;
                if (!currentJob)
                    return null;
                const total = (currentJob.totalRecords && currentJob.totalRecords > 0) ? currentJob.totalRecords : 1;
                const validCount = currentJob.validRecords ?? 0;
                const riskyCount = currentJob.riskyRecords ?? 0;
                const invalidCount = currentJob.invalidRecords ?? 0;
                const duplicateCount = currentJob.duplicateRecords ?? 0;
                const processedCount = currentJob.processedRecords ?? 0;
                const progressPct = currentJob.progressPercentage ?? ((processedCount / total) * 100);
                return (<>
                    {/* Valid Emails */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
                          <span className="text-sm font-medium text-green-700">Geçerli Email'ler</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-green-600">
                            {animatedValidRecords.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({((validCount / total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${(validCount / total) * 100}%` }}/>
                      </div>
                    </div>

                    {/* Risky Emails */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-600"/>
                          <span className="text-sm font-medium text-yellow-700">Riskli Email'ler</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-yellow-600">
                            {animatedRiskyRecords.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({((riskyCount / total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-yellow-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-yellow-500 h-full transition-all duration-300" style={{ width: `${(riskyCount / total) * 100}%` }}/>
                      </div>
                    </div>

                    {/* Invalid Emails */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <lucide_react_1.AlertCircle className="h-4 w-4 text-red-600"/>
                          <span className="text-sm font-medium text-red-700">Geçersiz Email'ler</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-red-600">
                            {animatedInvalidRecords.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({((invalidCount / total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-red-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${(invalidCount / total) * 100}%` }}/>
                      </div>
                    </div>

                    {/* Duplicate Emails */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                          </svg>
                          <span className="text-sm font-medium text-blue-700">Tekrar Eden Email'ler</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-blue-600">
                            {animatedDuplicateRecords.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({((duplicateCount / total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${(duplicateCount / total) * 100}%` }}/>
                      </div>
                    </div>

                    {/* Quality Score */}
                    <div className="mt-6 p-4 rounded-lg bg-gray-900 border text-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <lucide_react_1.BarChart3 className="h-4 w-4"/>
                          Kalite Skoru
                        </span>
                        <div className="flex items-center gap-1">
                          {((validCount / total) * 100) >= 80 ? (<span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                              Mükemmel
                            </span>) : ((validCount / total) * 100) >= 60 ? (<span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                              İyi
                            </span>) : (<span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                              Düşük
                            </span>)}
                          <span className="font-bold ml-2">
                            {((validCount / total) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <progress_1.Progress value={(validCount / total) * 100} className="h-2"/>
                      <div className="text-xs text-muted-foreground mt-2">
                        Geçerli email oranına göre hesaplanmıştır
                      </div>
                    </div>
                  </>);
            })()}
            </card_1.CardContent>
          </card_1.Card>
        </>)}

      {(error || progressError) && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error || progressError}</alert_1.AlertDescription>
        </alert_1.Alert>)}
    </div>);
    const renderResultsStep = () => {
        const finalJob = progressJob || importJob;
        if (!finalJob) {
            return (<div className="text-center py-8">
          <lucide_react_1.AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
          <p className="text-muted-foreground">İçe aktarma bilgileri bulunamadı.</p>
        </div>);
        }
        return (<import_results_dashboard_1.ImportResultsDashboard job={finalJob} onClose={() => onComplete({})} onNewImport={() => {
                setCurrentStep('upload');
                setImportJob(null);
                setSelectedFile(null);
                setCsvPreview(null);
                setError(null);
            }}/>);
    };
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'upload':
                return renderUploadStep();
            case 'configure':
                return renderConfigureStep();
            case 'validate':
                return renderValidateStep();
            case 'results':
                return renderResultsStep();
            default:
                return null;
        }
    };
    // Auth check
    if (authLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Yetkilendirme kontrol ediliyor...</p>
        </div>
      </div>);
    }
    if (!isAuthenticated) {
        return (<div className="flex items-center justify-center h-64">
        <div className="text-center">
          <lucide_react_1.AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4"/>
          <h3 className="text-lg font-semibold mb-2">Giriş Gerekli</h3>
          <p className="text-muted-foreground mb-4">Bu sayfayı görüntülemek için giriş yapmanız gerekiyor.</p>
          <button_1.Button onClick={() => window.location.href = '/login'}>
            Giriş Yap
          </button_1.Button>
        </div>
      </div>);
    }
    return (<div className="max-w-4xl mx-auto space-y-8">
      {renderStepIndicator()}
      
      <div className="min-h-[400px]">
        {renderCurrentStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <div>
          {currentStep !== 'upload' && currentStep !== 'results' && (<button_1.Button variant="outline" onClick={handlePrevious}>
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
              Geri
            </button_1.Button>)}
        </div>
        
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={onCancel}>
            <lucide_react_1.X className="h-4 w-4 mr-2"/>
            İptal
          </button_1.Button>
          
          {currentStep !== 'results' && (<button_1.Button onClick={handleNext} disabled={!canProceedToNext() || isProcessing}>
              {isProcessing ? (<>
                  <lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                  İşleniyor...
                </>) : currentStep === 'configure' ? (<>
                  İçe Aktarmayı Başlat
                  <lucide_react_1.ArrowRight className="h-4 w-4 ml-2"/>
                </>) : (<>
                  İleri
                  <lucide_react_1.ArrowRight className="h-4 w-4 ml-2"/>
                </>)}
            </button_1.Button>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=import-wizard.js.map