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
exports.default = ConfigurationManagementPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const switch_1 = require("@/components/ui/switch");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const badge_1 = require("@/components/ui/badge");
const slider_1 = require("@/components/ui/slider");
const lucide_react_1 = require("lucide-react");
const use_toast_1 = require("@/hooks/use-toast");
const tooltip_1 = require("@/components/ui/tooltip");
const progress_1 = require("@/components/ui/progress");
function ConfigurationManagementPage() {
    const [configSections, setConfigSections] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const [isResetting, setIsResetting] = (0, react_1.useState)(null); // Track which section is being reset
    const [hasChanges, setHasChanges] = (0, react_1.useState)(false);
    const [changedSettings, setChangedSettings] = (0, react_1.useState)(new Set());
    const [originalValues, setOriginalValues] = (0, react_1.useState)({});
    const [activeTab, setActiveTab] = (0, react_1.useState)('thresholds');
    const [validationErrors, setValidationErrors] = (0, react_1.useState)({});
    const [aiProviderInfo, setAiProviderInfo] = (0, react_1.useState)(null);
    const [saveProgress, setSaveProgress] = (0, react_1.useState)(0);
    const [showAdvancedSettings, setShowAdvancedSettings] = (0, react_1.useState)(false);
    const [screenSize, setScreenSize] = (0, react_1.useState)('desktop');
    const [isOnline, setIsOnline] = (0, react_1.useState)(navigator.onLine);
    const [connectionQuality, setConnectionQuality] = (0, react_1.useState)('good');
    const { toast } = (0, use_toast_1.useToast)();
    // Screen size detection
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScreenSize('mobile');
            }
            else if (width < 1024) {
                setScreenSize('tablet');
            }
            else {
                setScreenSize('desktop');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Network connectivity detection
    (0, react_1.useEffect)(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setConnectionQuality('good');
            toast({
                title: 'Bağlantı Yeniden Kuruldu',
                description: 'İnternet bağlantınız geri geldi.',
                variant: 'default',
                duration: 3000
            });
        };
        const handleOffline = () => {
            setIsOnline(false);
            setConnectionQuality('offline');
            toast({
                title: 'Bağlantı Kesildi',
                description: 'İnternet bağlantınız kesildi. Değişiklikler kaydedilmeyebilir.',
                variant: 'destructive',
                duration: 5000
            });
        };
        // Connection quality detection
        const checkConnectionQuality = async () => {
            if (!navigator.onLine) {
                setConnectionQuality('offline');
                return;
            }
            try {
                const start = Date.now();
                await fetch('/api/ping', {
                    method: 'HEAD',
                    cache: 'no-cache',
                    signal: AbortSignal.timeout(5000)
                });
                const duration = Date.now() - start;
                setConnectionQuality(duration > 2000 ? 'poor' : 'good');
            }
            catch {
                setConnectionQuality('poor');
            }
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // Check connection quality periodically
        const qualityInterval = setInterval(checkConnectionQuality, 30000);
        checkConnectionQuality(); // Initial check
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(qualityInterval);
        };
    }, [toast]);
    (0, react_1.useEffect)(() => {
        loadConfiguration();
        loadAiProviderInfo();
    }, []);
    // Unsaved changes warning
    (0, react_1.useEffect)(() => {
        const handleBeforeUnload = (e) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = 'Kaydedilmemiş değişiklikleriniz var. Sayfadan ayrılmak istediğinizden emin misiniz?';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);
    const loadAiProviderInfo = async () => {
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const data = await FaqLearningService.getAiProviderInfo();
            setAiProviderInfo(data);
        }
        catch (error) {
            console.error('Failed to load AI provider info:', error);
        }
    };
    const loadConfiguration = async (retryCount = 0) => {
        setIsLoading(true);
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            // Add timeout for network requests
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 10000));
            const configPromise = FaqLearningService.getConfig();
            const data = await Promise.race([configPromise, timeoutPromise]);
            // Validate response structure
            if (!data || !Array.isArray(data.configurations)) {
                throw new Error('Invalid response format');
            }
            // Transform API data to config sections
            const sections = transformToConfigSections(data.configurations);
            // Validate that we have at least some configurations
            if (sections.length === 0) {
                throw new Error('No configurations found');
            }
            setConfigSections(sections);
            // Store original values for change tracking
            const originalVals = {};
            sections.forEach(section => {
                section.settings.forEach(setting => {
                    originalVals[`${section.key}-${setting.key}`] = setting.value;
                });
            });
            setOriginalValues(originalVals);
            // Reset change tracking
            setHasChanges(false);
            setChangedSettings(new Set());
            setValidationErrors({});
            // Success toast for retry scenarios
            if (retryCount > 0) {
                toast({
                    title: 'Başarılı',
                    description: 'Ayarlar başarıyla yüklendi.',
                    variant: 'default'
                });
            }
        }
        catch (error) {
            console.error('Failed to load configuration:', error);
            // Enhanced error handling with retry logic
            const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
            const isNetworkError = errorMessage.includes('timeout') ||
                errorMessage.includes('fetch') ||
                errorMessage.includes('network');
            // Show empty state
            setConfigSections([]);
            // Enhanced error toast with retry option
            toast({
                title: isNetworkError ? 'Bağlantı Hatası' : 'Yükleme Hatası',
                description: (<div className="space-y-2">
            <p>
              {isNetworkError
                        ? 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.'
                        : `Ayarlar yüklenemedi: ${errorMessage}`}
            </p>
            {retryCount < 3 && (<button onClick={() => loadConfiguration(retryCount + 1)} className="text-sm underline hover:no-underline">
                Tekrar dene ({3 - retryCount} deneme kaldı)
              </button>)}
          </div>),
                variant: 'destructive',
                duration: retryCount < 3 ? 10000 : 5000
            });
            // Auto-retry for network errors (max 3 times)
            if (isNetworkError && retryCount < 2) {
                setTimeout(() => {
                    loadConfiguration(retryCount + 1);
                }, 2000 * (retryCount + 1)); // Exponential backoff
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    const transformToConfigSections = (configs) => {
        // Group configurations by category
        const grouped = configs.reduce((acc, config) => {
            const category = config.category || 'other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({
                key: config.key,
                label: formatLabel(config.key),
                description: config.description || '',
                type: config.type || inferType(config.value),
                value: config.value,
                defaultValue: config.value,
                min: config.min,
                max: config.max,
                step: config.step,
                unit: config.unit,
                options: config.options,
                validation: config.validation
            });
            return acc;
        }, {});
        // Ensure all 6 categories exist with proper order
        const orderedCategories = ['thresholds', 'recognition', 'processing', 'quality', 'sources', 'categories', 'ai', 'advanced'];
        return orderedCategories
            .filter(category => grouped[category] && grouped[category].length > 0)
            .map(category => ({
            key: category,
            title: formatCategoryTitle(category),
            description: getCategoryDescription(category),
            icon: getCategoryIcon(category),
            settings: grouped[category]
        }));
    };
    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };
    const inferType = (value) => {
        if (typeof value === 'boolean')
            return 'boolean';
        if (typeof value === 'number')
            return 'number';
        return 'string';
    };
    const formatCategoryTitle = (category) => {
        const titles = {
            thresholds: 'Güven Eşikleri',
            recognition: 'Pattern Tanıma',
            processing: 'İşleme Ayarları',
            quality: 'Kalite Kontrol',
            sources: 'Veri Kaynakları',
            categories: 'Kategori Yönetimi',
            ai: 'AI Modeli',
            advanced: 'Gelişmiş Ayarlar'
        };
        return titles[category] || category;
    };
    const getCategoryDescription = (category) => {
        const descriptions = {
            thresholds: 'FAQ onay ve yayınlama için güven skorları',
            recognition: 'Pattern tanıma ve benzerlik eşikleri',
            processing: 'Batch işleme ve gerçek zamanlı işleme ayarları',
            quality: 'Kalite kontrol ve doğrulama kuralları',
            sources: 'Chat ve ticket veri kaynağı ayarları',
            categories: 'Otomatik kategori atama ve yönetim',
            ai: 'AI model parametreleri (sadece temperature ve maxTokens)',
            advanced: 'Gelişmiş sistem ayarları ve veri saklama'
        };
        return descriptions[category] || '';
    };
    const getCategoryIcon = (category) => {
        const icons = {
            thresholds: <lucide_react_1.BarChart3 className="h-5 w-5"/>,
            recognition: <lucide_react_1.Brain className="h-5 w-5"/>,
            processing: <lucide_react_1.Zap className="h-5 w-5"/>,
            quality: <lucide_react_1.Shield className="h-5 w-5"/>,
            sources: <lucide_react_1.Filter className="h-5 w-5"/>,
            categories: <lucide_react_1.Calendar className="h-5 w-5"/>,
            ai: <lucide_react_1.Brain className="h-5 w-5"/>,
            advanced: <lucide_react_1.Settings className="h-5 w-5"/>
        };
        return icons[category] || <lucide_react_1.Settings className="h-5 w-5"/>;
    };
    const handleSave = async () => {
        // Check for validation errors
        const hasValidationErrors = Object.values(validationErrors).some(error => error !== '');
        if (hasValidationErrors) {
            toast({
                title: 'Doğrulama Hatası',
                description: 'Lütfen tüm hataları düzeltin ve tekrar deneyin.',
                variant: 'destructive'
            });
            return;
        }
        setIsSaving(true);
        setSaveProgress(0);
        // Show loading toast with progress
        const totalConfigs = configSections.reduce((total, section) => total + section.settings.length, 0);
        const loadingToast = toast({
            title: 'Kaydediliyor...',
            description: (<div className="space-y-2">
          <p>{totalConfigs} ayar kaydediliyor</p>
          <progress_1.Progress value={saveProgress} className="w-full"/>
        </div>),
            duration: 0
        });
        // Simulate progress updates
        const progressInterval = setInterval(() => {
            setSaveProgress(prev => Math.min(prev + 10, 90));
        }, 100);
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            // Prepare all configurations for bulk update
            const allConfigs = [];
            for (const section of configSections) {
                for (const setting of section.settings) {
                    allConfigs.push({
                        configKey: setting.key,
                        configValue: setting.value,
                        description: setting.description,
                        category: section.key
                    });
                }
            }
            console.log('💾 Saving configurations:', allConfigs.length, 'items');
            // Bulk save all configurations
            const result = await FaqLearningService.bulkUpdateConfig(allConfigs);
            // Complete progress and dismiss loading toast
            clearInterval(progressInterval);
            setSaveProgress(100);
            setTimeout(() => {
                loadingToast.dismiss?.();
            }, 500);
            if (result.success) {
                // Update UI state after successful save
                setHasChanges(false);
                setChangedSettings(new Set());
                setValidationErrors({}); // Clear validation errors after successful save
                // Update original values to current values to track future changes
                const newOriginalValues = {};
                configSections.forEach(section => {
                    section.settings.forEach(setting => {
                        newOriginalValues[`${section.key}-${setting.key}`] = setting.value;
                    });
                });
                setOriginalValues(newOriginalValues);
                // Update default values to current values to track future changes
                setConfigSections(prev => prev.map(section => ({
                    ...section,
                    settings: section.settings.map(setting => ({
                        ...setting,
                        defaultValue: setting.value
                    }))
                })));
                // Show detailed success message
                if (result.results && Array.isArray(result.results)) {
                    const successfulCount = result.results.filter((r) => r.success).length;
                    const failedCount = result.results.filter((r) => !r.success).length;
                    if (failedCount > 0) {
                        const failedConfigs = result.results
                            .filter((r) => !r.success)
                            .map((r) => r.configKey)
                            .join(', ');
                        toast({
                            title: 'Kısmi Başarı',
                            description: `${successfulCount} ayar kaydedildi, ${failedCount} ayar başarısız oldu: ${failedConfigs}`,
                            variant: 'destructive'
                        });
                    }
                    else {
                        toast({
                            title: 'Başarılı',
                            description: `Tüm ${allConfigs.length} ayar başarıyla kaydedildi`,
                            variant: 'default'
                        });
                    }
                }
                else {
                    toast({
                        title: 'Başarılı',
                        description: `${allConfigs.length} ayar başarıyla kaydedildi`,
                        variant: 'default'
                    });
                }
            }
            else {
                throw new Error(result.message || 'Bulk update failed');
            }
        }
        catch (error) {
            // Clear progress and dismiss loading toast
            clearInterval(progressInterval);
            setSaveProgress(0);
            loadingToast.dismiss?.();
            console.error('Failed to save configuration:', error);
            // Enhanced error toast with retry option
            toast({
                title: 'Kaydetme Hatası',
                description: (<div className="space-y-2">
            <p>{error instanceof Error ? error.message : 'Ayarlar kaydedilemedi.'}</p>
            <button onClick={() => handleSave()} className="text-sm underline hover:no-underline">
              Tekrar dene
            </button>
          </div>),
                variant: 'destructive',
                duration: 10000 // Longer duration for error messages
            });
        }
        finally {
            setIsSaving(false);
            setSaveProgress(0);
        }
    };
    const handleReset = async (sectionKey) => {
        const section = configSections.find(s => s.key === sectionKey);
        if (!section)
            return;
        const settingsCount = section.settings.length;
        const sectionTitle = section.title;
        // Enhanced confirmation dialog with more details
        const hasUnsavedChanges = section.settings.some(setting => setting.value !== setting.defaultValue);
        const confirmMessage = hasUnsavedChanges
            ? `"${sectionTitle}" kategorisindeki ${settingsCount} ayarı varsayılan değerlere sıfırlamak istediğinizden emin misiniz?\n\n⚠️ Bu kategoride kaydedilmemiş değişiklikleriniz var!\n\nBu işlem:\n• Sadece bu kategorideki ayarları etkiler\n• Diğer kategorilerdeki değişiklikler korunur\n• Geri alınamaz`
            : `"${sectionTitle}" kategorisindeki ${settingsCount} ayarı varsayılan değerlere sıfırlamak istediğinizden emin misiniz?\n\nBu işlem:\n• Sadece bu kategorideki ayarları etkiler\n• Diğer kategorilerdeki değişiklikler korunur\n• Geri alınamaz`;
        if (!confirm(confirmMessage)) {
            return;
        }
        setIsResetting(sectionKey);
        // Show loading toast
        const loadingToast = toast({
            title: 'Sıfırlanıyor...',
            description: `"${sectionTitle}" kategorisi varsayılan değerlere sıfırlanıyor`,
            duration: 0
        });
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            console.log(`🔄 Resetting section: ${sectionKey} (${settingsCount} settings)`);
            const result = await FaqLearningService.resetConfigSection(sectionKey);
            // Dismiss loading toast
            loadingToast.dismiss?.();
            if (result.success) {
                // Update form state after reset - get default values for this section
                const defaultConfigs = await getDefaultConfigsForSection(sectionKey);
                // Update only this section's settings to default values
                setConfigSections(prev => prev.map(prevSection => prevSection.key === sectionKey
                    ? {
                        ...prevSection,
                        settings: prevSection.settings.map(setting => {
                            const defaultConfig = defaultConfigs.find(dc => dc.key === setting.key);
                            return defaultConfig
                                ? { ...setting, value: defaultConfig.value, defaultValue: defaultConfig.value }
                                : setting;
                        })
                    }
                    : prevSection));
                // Clear validation errors for this section
                const newValidationErrors = { ...validationErrors };
                Object.keys(newValidationErrors).forEach(key => {
                    if (key.startsWith(`${sectionKey}-`)) {
                        delete newValidationErrors[key];
                    }
                });
                setValidationErrors(newValidationErrors);
                // Update original values for the reset section
                const newOriginalValues = { ...originalValues };
                const resetSection = configSections.find(s => s.key === sectionKey);
                if (resetSection) {
                    resetSection.settings.forEach(setting => {
                        const defaultConfig = defaultConfigs.find(dc => dc.key === setting.key);
                        if (defaultConfig) {
                            newOriginalValues[`${sectionKey}-${setting.key}`] = defaultConfig.value;
                        }
                    });
                }
                setOriginalValues(newOriginalValues);
                // Remove this section's changes from changed settings
                setChangedSettings(prev => {
                    const newSet = new Set(prev);
                    Array.from(prev).forEach(settingId => {
                        if (settingId.startsWith(`${sectionKey}-`)) {
                            newSet.delete(settingId);
                        }
                    });
                    return newSet;
                });
                // Check if we still have changes in other sections
                const stillHasChanges = Array.from(changedSettings).some(settingId => !settingId.startsWith(`${sectionKey}-`));
                setHasChanges(stillHasChanges);
                toast({
                    title: 'Başarılı',
                    description: `"${sectionTitle}" kategorisindeki ${settingsCount} ayar varsayılan değerlere sıfırlandı`,
                    variant: 'default'
                });
            }
            else {
                throw new Error(result.message || 'Reset failed');
            }
        }
        catch (error) {
            // Dismiss loading toast
            loadingToast.dismiss?.();
            console.error('Failed to reset configuration:', error);
            toast({
                title: 'Sıfırlama Hatası',
                description: `"${sectionTitle}" kategorisi sıfırlanamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
                variant: 'destructive'
            });
        }
        finally {
            setIsResetting(null);
        }
    };
    // Helper function to get default configs for a section
    const getDefaultConfigsForSection = async (sectionKey) => {
        // This would normally come from the API, but for now we'll use the same defaults as backend
        const defaults = {
            'thresholds': [
                { key: 'minConfidenceForReview', value: 60 },
                { key: 'minConfidenceForAutoPublish', value: 85 }
            ],
            'recognition': [
                { key: 'minPatternFrequency', value: 3 },
                { key: 'similarityThreshold', value: 0.8 }
            ],
            'processing': [
                { key: 'batchSize', value: 100 },
                { key: 'processingInterval', value: 3600 },
                { key: 'enableRealTimeProcessing', value: false },
                { key: 'enableAutoPublishing', value: false },
                { key: 'maxDailyProcessingLimit', value: 1000 }
            ],
            'quality': [
                { key: 'minQuestionLength', value: 10 },
                { key: 'maxQuestionLength', value: 500 },
                { key: 'minAnswerLength', value: 20 }
            ],
            'sources': [
                { key: 'chatSessionMinDuration', value: 300 },
                { key: 'ticketMinResolutionTime', value: 1800 },
                { key: 'requiredSatisfactionScore', value: 4 }
            ],
            'categories': [
                { key: 'excludedCategories', value: [] },
                { key: 'autoCategorizationEnabled', value: true }
            ],
            'ai': [
                { key: 'temperature', value: 0.7 },
                { key: 'maxTokens', value: 1000 }
            ],
            'advanced': [
                { key: 'retentionPeriodDays', value: 365 }
            ]
        };
        return defaults[sectionKey] || [];
    };
    const validateSetting = (setting, value) => {
        // Handle null/undefined values
        if (value === null || value === undefined) {
            if (setting.validation?.required) {
                return `${setting.label} zorunludur`;
            }
            return null;
        }
        // Type validation with enhanced error messages
        switch (setting.type) {
            case 'number':
            case 'range':
                // Handle string inputs that should be numbers
                const numValue = typeof value === 'string' ? parseFloat(value) : value;
                if (typeof numValue !== 'number' || isNaN(numValue)) {
                    return `${setting.label} geçerli bir sayı olmalıdır`;
                }
                // Check for decimal places when step is integer
                if (setting.step && setting.step === 1 && numValue % 1 !== 0) {
                    return `${setting.label} tam sayı olmalıdır`;
                }
                // Range validation with context
                if (setting.min !== undefined && numValue < setting.min) {
                    const unit = setting.unit || '';
                    return `${setting.label} en az ${setting.min}${unit} olmalıdır`;
                }
                if (setting.max !== undefined && numValue > setting.max) {
                    const unit = setting.unit || '';
                    return `${setting.label} en fazla ${setting.max}${unit} olmalıdır`;
                }
                // Special validation for percentage values
                if (setting.unit === '%' && (numValue < 0 || numValue > 100)) {
                    return `${setting.label} 0-100 arasında olmalıdır`;
                }
                // Special validation for confidence scores
                if (setting.key.includes('Confidence') && (numValue < 0 || numValue > 100)) {
                    return `Güven skoru 0-100 arasında olmalıdır`;
                }
                // Special validation for temperature (AI setting)
                if (setting.key === 'temperature' && (numValue < 0 || numValue > 2)) {
                    return `Sıcaklık değeri 0-2 arasında olmalıdır`;
                }
                break;
            case 'boolean':
                if (typeof value !== 'boolean') {
                    return `${setting.label} doğru/yanlış değeri olmalıdır`;
                }
                break;
            case 'string':
            case 'textarea':
                if (typeof value !== 'string') {
                    return `${setting.label} metin olmalıdır`;
                }
                if (setting.validation?.required && value.trim() === '') {
                    return `${setting.label} zorunludur`;
                }
                if (setting.validation?.min && value.length < setting.validation.min) {
                    return `${setting.label} en az ${setting.validation.min} karakter olmalıdır`;
                }
                if (setting.validation?.max && value.length > setting.validation.max) {
                    return `${setting.label} en fazla ${setting.validation.max} karakter olmalıdır`;
                }
                break;
            case 'multiselect':
                if (!Array.isArray(value)) {
                    return `${setting.label} bir liste olmalıdır`;
                }
                // Validate that all selected values are valid options
                if (setting.options && value.some(v => !setting.options?.find(opt => opt.value === v))) {
                    return `${setting.label} geçersiz seçenekler içeriyor`;
                }
                break;
            case 'select':
                if (setting.options && !setting.options.find(opt => opt.value === value)) {
                    return `${setting.label} geçerli bir seçenek olmalıdır`;
                }
                break;
        }
        return null;
    };
    const updateSettingValue = (sectionKey, settingKey, value) => {
        const settingId = `${sectionKey}-${settingKey}`;
        try {
            // Find the setting for validation
            const section = configSections.find(s => s.key === sectionKey);
            const setting = section?.settings.find(s => s.key === settingKey);
            if (!setting) {
                console.error(`Setting not found: ${settingId}`);
                return;
            }
            // Sanitize and normalize the value based on type
            let normalizedValue = value;
            switch (setting.type) {
                case 'number':
                case 'range':
                    // Handle string inputs and edge cases
                    if (typeof value === 'string') {
                        normalizedValue = value === '' ? setting.min || 0 : parseFloat(value);
                    }
                    // Clamp value to valid range to prevent invalid states
                    if (setting.min !== undefined) {
                        normalizedValue = Math.max(normalizedValue, setting.min);
                    }
                    if (setting.max !== undefined) {
                        normalizedValue = Math.min(normalizedValue, setting.max);
                    }
                    // Round to step if specified
                    if (setting.step && setting.step !== 0) {
                        normalizedValue = Math.round(normalizedValue / setting.step) * setting.step;
                    }
                    break;
                case 'string':
                case 'textarea':
                    // Ensure string type and trim whitespace
                    normalizedValue = String(value || '').trim();
                    break;
                case 'multiselect':
                    // Ensure array type and remove duplicates
                    normalizedValue = Array.isArray(value) ? [...new Set(value)] : [];
                    break;
                case 'boolean':
                    // Ensure boolean type
                    normalizedValue = Boolean(value);
                    break;
            }
            // Validate the normalized value
            const error = validateSetting(setting, normalizedValue);
            setValidationErrors(prev => ({
                ...prev,
                [settingId]: error || ''
            }));
            // Update the setting value with error boundary
            setConfigSections(prev => {
                try {
                    return prev.map(section => section.key === sectionKey
                        ? {
                            ...section,
                            settings: section.settings.map(s => s.key === settingKey ? { ...s, value: normalizedValue } : s)
                        }
                        : section);
                }
                catch (updateError) {
                    console.error('Error updating config sections:', updateError);
                    return prev; // Return previous state on error
                }
            });
            // Track changes with error handling
            try {
                const originalValue = originalValues[settingId];
                const hasChanged = JSON.stringify(normalizedValue) !== JSON.stringify(originalValue);
                setChangedSettings(prev => {
                    const newSet = new Set(prev);
                    if (hasChanged) {
                        newSet.add(settingId);
                    }
                    else {
                        newSet.delete(settingId);
                    }
                    return newSet;
                });
                // Update global hasChanges state
                setHasChanges(prev => {
                    const newChangedSettings = new Set(changedSettings);
                    if (hasChanged) {
                        newChangedSettings.add(settingId);
                    }
                    else {
                        newChangedSettings.delete(settingId);
                    }
                    return newChangedSettings.size > 0;
                });
            }
            catch (trackingError) {
                console.error('Error tracking changes:', trackingError);
            }
        }
        catch (error) {
            console.error('Error updating setting value:', error);
            // Show user-friendly error message
            toast({
                title: 'Güncelleme Hatası',
                description: `${setting?.label || settingKey} güncellenirken bir hata oluştu.`,
                variant: 'destructive',
                duration: 3000
            });
        }
    };
    // Function to restore original values (cancel changes)
    const handleCancelChanges = () => {
        if (!confirm('Tüm değişiklikleri iptal etmek istediğinizden emin misiniz?\n\nBu işlem tüm kaydedilmemiş değişiklikleri geri alır.')) {
            return;
        }
        // Restore original values
        setConfigSections(prev => prev.map(section => ({
            ...section,
            settings: section.settings.map(setting => {
                const originalValue = originalValues[`${section.key}-${setting.key}`];
                return originalValue !== undefined
                    ? { ...setting, value: originalValue }
                    : setting;
            })
        })));
        // Reset change tracking
        setHasChanges(false);
        setChangedSettings(new Set());
        setValidationErrors({});
        toast({
            title: 'Değişiklikler İptal Edildi',
            description: 'Tüm ayarlar orijinal değerlerine geri döndürüldü',
            variant: 'default'
        });
    };
    const renderSettingInput = (section, setting) => {
        const inputId = `${section.key}-${setting.key}`;
        const errorKey = `${section.key}-${setting.key}`;
        const hasError = validationErrors[errorKey];
        // Enhanced tooltip content
        const getTooltipContent = () => {
            let content = setting.description;
            if (setting.min !== undefined && setting.max !== undefined) {
                content += ` (${setting.min} - ${setting.max}${setting.unit || ''})`;
            }
            if (setting.type === 'range' && setting.step) {
                content += ` Adım: ${setting.step}`;
            }
            return content;
        };
        switch (setting.type) {
            case 'boolean':
                return (<div className="flex items-center gap-2">
            <switch_1.Switch id={inputId} checked={setting.value} onCheckedChange={(checked) => updateSettingValue(section.key, setting.key, checked)} aria-label={setting.label}/>
            <tooltip_1.TooltipProvider>
              <tooltip_1.Tooltip>
                <tooltip_1.TooltipTrigger asChild>
                  <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground cursor-help"/>
                </tooltip_1.TooltipTrigger>
                <tooltip_1.TooltipContent side="top" className="max-w-xs">
                  <p>{getTooltipContent()}</p>
                </tooltip_1.TooltipContent>
              </tooltip_1.Tooltip>
            </tooltip_1.TooltipProvider>
          </div>);
            case 'range':
                return (<div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {setting.value}{setting.unit || ''}
                </span>
                <tooltip_1.TooltipProvider>
                  <tooltip_1.Tooltip>
                    <tooltip_1.TooltipTrigger asChild>
                      <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground cursor-help"/>
                    </tooltip_1.TooltipTrigger>
                    <tooltip_1.TooltipContent side="top" className="max-w-xs">
                      <p>{getTooltipContent()}</p>
                    </tooltip_1.TooltipContent>
                  </tooltip_1.Tooltip>
                </tooltip_1.TooltipProvider>
              </div>
              {screenSize === 'mobile' && (<input_1.Input type="number" value={setting.value} onChange={(e) => updateSettingValue(section.key, setting.key, Number(e.target.value))} min={setting.min} max={setting.max} step={setting.step} className="w-20 h-8 text-sm"/>)}
            </div>
            <slider_1.Slider id={inputId} min={setting.min} max={setting.max} step={setting.step} value={[setting.value]} onValueChange={([value]) => updateSettingValue(section.key, setting.key, value)} className="w-full" aria-label={setting.label}/>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{setting.min}{setting.unit || ''}</span>
              <span>{setting.max}{setting.unit || ''}</span>
            </div>
          </div>);
            case 'select':
                return (<select_1.Select value={setting.value} onValueChange={(value) => updateSettingValue(section.key, setting.key, value)}>
            <select_1.SelectTrigger id={inputId}>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {setting.options?.map((option) => (<select_1.SelectItem key={option.value} value={option.value}>
                  {option.label}
                </select_1.SelectItem>))}
            </select_1.SelectContent>
          </select_1.Select>);
            case 'textarea':
                return (<div className="space-y-1">
            <textarea_1.Textarea id={inputId} value={setting.value} onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)} rows={4} className={hasError ? 'border-red-500 focus:border-red-500' : ''}/>
            {hasError && (<p className="text-sm text-red-500">{validationErrors[errorKey]}</p>)}
          </div>);
            case 'number':
                return (<div className="space-y-1">
            <div className="flex items-center gap-2">
              <input_1.Input id={inputId} type="number" value={setting.value} onChange={(e) => updateSettingValue(section.key, setting.key, Number(e.target.value))} min={setting.min} max={setting.max} step={setting.step} className={`${screenSize === 'mobile' ? 'max-w-full' : 'max-w-[200px]'} ${hasError ? 'border-red-500 focus:border-red-500' : ''}`} aria-label={setting.label}/>
              {setting.unit && (<span className="text-sm text-muted-foreground whitespace-nowrap">{setting.unit}</span>)}
              <tooltip_1.TooltipProvider>
                <tooltip_1.Tooltip>
                  <tooltip_1.TooltipTrigger asChild>
                    <lucide_react_1.HelpCircle className="h-4 w-4 text-muted-foreground cursor-help flex-shrink-0"/>
                  </tooltip_1.TooltipTrigger>
                  <tooltip_1.TooltipContent side="top" className="max-w-xs">
                    <p>{getTooltipContent()}</p>
                  </tooltip_1.TooltipContent>
                </tooltip_1.Tooltip>
              </tooltip_1.TooltipProvider>
            </div>
            {hasError && (<p className="text-sm text-red-500">{validationErrors[errorKey]}</p>)}
          </div>);
            case 'multiselect':
                return (<div className="space-y-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {setting.value && Array.isArray(setting.value) && setting.value.map((selectedValue) => (<badge_1.Badge key={selectedValue} variant="secondary" className="flex items-center gap-1">
                  {setting.options?.find(opt => opt.value === selectedValue)?.label || selectedValue}
                  <button type="button" onClick={() => {
                            const newValue = setting.value.filter((v) => v !== selectedValue);
                            updateSettingValue(section.key, setting.key, newValue);
                        }} className="ml-1 text-xs hover:text-red-500">
                    ×
                  </button>
                </badge_1.Badge>))}
            </div>
            <select_1.Select value="" onValueChange={(value) => {
                        if (value && !setting.value.includes(value)) {
                            const newValue = [...(setting.value || []), value];
                            updateSettingValue(section.key, setting.key, newValue);
                        }
                    }}>
              <select_1.SelectTrigger id={inputId}>
                <select_1.SelectValue placeholder="Kategori seçin..."/>
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                {setting.options?.filter(option => !setting.value?.includes(option.value)).map((option) => (<select_1.SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </select_1.SelectItem>))}
              </select_1.SelectContent>
            </select_1.Select>
          </div>);
            default:
                return (<div className="space-y-1">
            <input_1.Input id={inputId} type="text" value={setting.value} onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)} className={hasError ? 'border-red-500 focus:border-red-500' : ''}/>
            {hasError && (<p className="text-sm text-red-500">{validationErrors[errorKey]}</p>)}
          </div>);
        }
    };
    if (isLoading) {
        return (<div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>);
    }
    return (<div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <lucide_react_1.Settings className="h-6 w-6 sm:h-8 sm:w-8 text-primary"/>
            <h1 className="text-2xl sm:text-3xl font-bold">
              FAQ Learning Ayarları
            </h1>
            {/* Connection status indicator */}
            <div className="flex items-center gap-2">
              <badge_1.Badge variant={connectionQuality === 'offline' ? 'destructive' : connectionQuality === 'poor' ? 'secondary' : 'default'} className="text-xs">
                <div className={`w-2 h-2 rounded-full mr-1 ${connectionQuality === 'offline' ? 'bg-red-500' :
            connectionQuality === 'poor' ? 'bg-yellow-500' : 'bg-green-500'}`}/>
                {connectionQuality === 'offline' ? 'Çevrimdışı' :
            connectionQuality === 'poor' ? 'Yavaş Bağlantı' : 'Çevrimiçi'}
              </badge_1.Badge>
              
              {/* Screen size indicator for debugging */}
              {process.env.NODE_ENV === 'development' && (<badge_1.Badge variant="outline" className="text-xs">
                  {screenSize === 'mobile' && <lucide_react_1.Smartphone className="h-3 w-3 mr-1"/>}
                  {screenSize === 'tablet' && <lucide_react_1.Tablet className="h-3 w-3 mr-1"/>}
                  {screenSize === 'desktop' && <lucide_react_1.Monitor className="h-3 w-3 mr-1"/>}
                  {screenSize}
                </badge_1.Badge>)}
            </div>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sistem konfigürasyonu ve öğrenme parametreleri
          </p>
        </div>
        
        {/* Action buttons - responsive layout */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="flex gap-2">
            <button_1.Button variant="outline" size={screenSize === 'mobile' ? 'sm' : 'default'} onClick={() => loadConfiguration()} disabled={isLoading} className="flex-1 sm:flex-none">
              <lucide_react_1.RefreshCw className="mr-2 h-4 w-4"/>
              {screenSize === 'mobile' ? 'Yenile' : 'Yenile'}
            </button_1.Button>
            {hasChanges && (<button_1.Button variant="outline" size={screenSize === 'mobile' ? 'sm' : 'default'} onClick={handleCancelChanges} disabled={isSaving} className="flex-1 sm:flex-none">
                <lucide_react_1.RefreshCw className="mr-2 h-4 w-4"/>
                {screenSize === 'mobile' ? 'İptal' : 'Değişiklikleri İptal Et'}
              </button_1.Button>)}
          </div>
          
          <button_1.Button onClick={handleSave} disabled={!hasChanges ||
            isSaving ||
            !isOnline ||
            Object.values(validationErrors).some(error => error !== '')} className={`${hasChanges ? 'bg-primary hover:bg-primary/90' : ''} w-full sm:w-auto`} size={screenSize === 'mobile' ? 'sm' : 'default'}>
            {isSaving ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                {screenSize === 'mobile' ? 'Kaydediliyor...' : `Kaydediliyor... (${changedSettings.size} değişiklik)`}
              </>) : (<>
                <lucide_react_1.Save className="mr-2 h-4 w-4"/>
                {screenSize === 'mobile' ? 'Kaydet' : 'Tüm Ayarları Kaydet'}
                {hasChanges && (<badge_1.Badge variant="secondary" className="ml-2">
                    {changedSettings.size}
                  </badge_1.Badge>)}
              </>)}
          </button_1.Button>
        </div>
      </div>

      {/* Offline Warning */}
      {!isOnline && (<alert_1.Alert className="border-red-200 bg-red-50">
          <lucide_react_1.AlertTriangle className="h-4 w-4 text-red-600"/>
          <alert_1.AlertTitle className="text-red-800">Bağlantı Yok</alert_1.AlertTitle>
          <alert_1.AlertDescription className="text-red-800">
            İnternet bağlantınız kesildi. Değişiklikler kaydedilemeyecek. Lütfen bağlantınızı kontrol edin.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Poor Connection Warning */}
      {isOnline && connectionQuality === 'poor' && (<alert_1.Alert className="border-yellow-200 bg-yellow-50">
          <lucide_react_1.Clock className="h-4 w-4 text-yellow-600"/>
          <alert_1.AlertTitle className="text-yellow-800">Yavaş Bağlantı</alert_1.AlertTitle>
          <alert_1.AlertDescription className="text-yellow-800">
            İnternet bağlantınız yavaş. Kaydetme işlemi uzun sürebilir.
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Changes Alert */}
      {hasChanges && (<alert_1.Alert className="border-orange-200 bg-orange-50">
          <lucide_react_1.AlertTriangle className="h-4 w-4 text-orange-600"/>
          <alert_1.AlertTitle className="text-orange-900">Kaydedilmemiş Değişiklikler</alert_1.AlertTitle>
          <alert_1.AlertDescription className="text-orange-800 space-y-2">
            <p>
              {changedSettings.size} ayarda değişiklik yaptınız. Değişiklikleri kaydetmeyi unutmayın.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {Array.from(changedSettings).slice(0, 5).map(settingId => {
                const [sectionKey, settingKey] = settingId.split('-');
                const section = configSections.find(s => s.key === sectionKey);
                const setting = section?.settings.find(s => s.key === settingKey);
                return setting ? (<badge_1.Badge key={settingId} variant="outline" className="text-xs">
                    {setting.label}
                  </badge_1.Badge>) : null;
            })}
              {changedSettings.size > 5 && (<badge_1.Badge variant="outline" className="text-xs">
                  +{changedSettings.size - 5} daha
                </badge_1.Badge>)}
            </div>
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Empty State */}
      {configSections.length === 0 && !isLoading && (<card_1.Card>
          <card_1.CardContent className="flex flex-col items-center justify-center py-12">
            <lucide_react_1.Settings className="h-16 w-16 text-muted-foreground mb-4"/>
            <h3 className="text-lg font-semibold mb-2">Ayar Bulunamadı</h3>
            <p className="text-muted-foreground text-center mb-4">
              Henüz hiç ayar yapılandırılmamış. Backend'den ayarlar yüklenemedi.
            </p>
            <button_1.Button onClick={() => loadConfiguration()}>
              <lucide_react_1.RefreshCw className="mr-2 h-4 w-4"/>
              Tekrar Dene
            </button_1.Button>
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Tabs */}
      {configSections.length > 0 && (<tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          {/* Responsive tab layout */}
          <div className="space-y-2">
            <tabs_1.TabsList className={`
              ${screenSize === 'mobile'
                ? 'grid grid-cols-2 gap-1 h-auto p-1'
                : screenSize === 'tablet'
                    ? 'grid grid-cols-4 gap-1'
                    : 'grid grid-cols-8 gap-1'} w-full
            `}>
              {configSections.map((section) => {
                const sectionHasChanges = section.settings.some(setting => changedSettings.has(`${section.key}-${setting.key}`));
                return (<tabs_1.TabsTrigger key={section.key} value={section.key} className={`
                      flex items-center gap-1 sm:gap-2 relative text-xs sm:text-sm
                      ${screenSize === 'mobile' ? 'flex-col p-2 h-auto min-h-[60px]' : 'flex-row'}
                    `}>
                    <div className="flex items-center gap-1">
                      {section.icon}
                      <span className={screenSize === 'mobile' ? 'text-center leading-tight' : 'hidden sm:inline'}>
                        {screenSize === 'mobile' ? section.title.split(' ')[0] : section.title}
                      </span>
                    </div>
                    {sectionHasChanges && (<div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"/>)}
                  </tabs_1.TabsTrigger>);
            })}
            </tabs_1.TabsList>
            
            {/* Advanced settings toggle for mobile */}
            {screenSize === 'mobile' && (<div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <lucide_react_1.Eye className="h-4 w-4"/>
                  <span className="text-sm">Gelişmiş Görünüm</span>
                </div>
                <switch_1.Switch checked={showAdvancedSettings} onCheckedChange={setShowAdvancedSettings}/>
              </div>)}
          </div>

        {configSections.map((section) => (<tabs_1.TabsContent key={section.key} value={section.key} className="space-y-4">
            {section.key === 'ai' ? (
                // Special AI Model Tab
                <div className="space-y-4">
                {/* AI Provider Info Card */}
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2">
                      <lucide_react_1.Brain className="h-5 w-5"/>
                      Mevcut AI Sağlayıcısı
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Global AI ayarlarından gelen aktif sağlayıcı bilgileri
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    {aiProviderInfo ? (<>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label_1.Label className="text-sm font-medium">Sağlayıcı</label_1.Label>
                            <div className="flex items-center gap-2 mt-1">
                              <badge_1.Badge variant={aiProviderInfo.available ? "default" : "destructive"}>
                                {aiProviderInfo.currentProvider.toUpperCase()}
                              </badge_1.Badge>
                              {aiProviderInfo.available ? (<lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.AlertTriangle className="h-4 w-4 text-red-500"/>)}
                            </div>
                          </div>
                          <div>
                            <label_1.Label className="text-sm font-medium">Model</label_1.Label>
                            <div className="mt-1 font-mono text-sm">
                              {aiProviderInfo.currentModel}
                            </div>
                          </div>
                        </div>
                        <alert_1.Alert>
                          <lucide_react_1.Info className="h-4 w-4"/>
                          <alert_1.AlertDescription>
                            AI sağlayıcısını ve modelini değiştirmek için{' '}
                            <a href="/admin/ai-settings" className="underline hover:text-primary">
                              Global AI Ayarları
                            </a>
                            'na gidin. Burada sadece model parametrelerini ayarlayabilirsiniz.
                          </alert_1.AlertDescription>
                        </alert_1.Alert>
                      </>) : (<div className="text-center py-4 text-muted-foreground">
                        AI sağlayıcı bilgileri yükleniyor...
                      </div>)}
                  </card_1.CardContent>
                </card_1.Card>

                {/* AI Model Parameters Card */}
                <card_1.Card>
                  <card_1.CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <card_1.CardTitle className="flex items-center gap-2">
                          {section.icon}
                          Model Parametreleri
                        </card_1.CardTitle>
                        <card_1.CardDescription>
                          FAQ oluşturma için AI model ayarları
                        </card_1.CardDescription>
                      </div>
                      <button_1.Button variant="ghost" size="sm" onClick={() => handleReset(section.key)}>
                        <lucide_react_1.RefreshCw className="mr-2 h-3 w-3"/>
                        Varsayılana Dön
                      </button_1.Button>
                    </div>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    {section.settings.map((setting) => (<div key={setting.key} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <label_1.Label htmlFor={`${section.key}-${setting.key}`} className="text-base font-medium flex items-center gap-2">
                              {setting.label}
                              {setting.validation?.required && (<span className="text-red-500 ml-1">*</span>)}
                              {changedSettings.has(`${section.key}-${setting.key}`) && (<div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" title="Değiştirildi"/>)}
                            </label_1.Label>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            {changedSettings.has(`${section.key}-${setting.key}`) && (<badge_1.Badge variant="outline" className="border-orange-500 text-orange-700 bg-orange-50">
                                Değiştirildi
                              </badge_1.Badge>)}
                            {setting.value !== setting.defaultValue && !changedSettings.has(`${section.key}-${setting.key}`) && (<badge_1.Badge variant="secondary">
                                Varsayılan Değil
                              </badge_1.Badge>)}
                          </div>
                        </div>
                        {renderSettingInput(section, setting)}
                      </div>))}
                  </card_1.CardContent>
                </card_1.Card>
              </div>) : (
                // Regular Tab
                <card_1.Card>
                <card_1.CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <card_1.CardTitle className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </card_1.CardTitle>
                      <card_1.CardDescription>{section.description}</card_1.CardDescription>
                    </div>
                    <button_1.Button variant="ghost" size="sm" onClick={() => handleReset(section.key)} disabled={isResetting === section.key}>
                      <lucide_react_1.RefreshCw className={`mr-2 h-3 w-3 ${isResetting === section.key ? 'animate-spin' : ''}`}/>
                      {isResetting === section.key ? 'Sıfırlanıyor...' : 'Varsayılana Dön'}
                    </button_1.Button>
                  </div>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                  {section.settings.map((setting) => {
                        // Hide advanced settings on mobile unless toggle is on
                        if (screenSize === 'mobile' && !showAdvancedSettings &&
                            ['advanced', 'categories'].includes(section.key)) {
                            return null;
                        }
                        return (<div key={setting.key} className={`
                        space-y-3 pb-6 border-b last:border-0 last:pb-0
                        ${screenSize === 'mobile' ? 'pb-4' : 'pb-6'}
                      `}>
                        <div className={`
                          flex items-start justify-between gap-4
                          ${screenSize === 'mobile' ? 'flex-col gap-2' : 'flex-row'}
                        `}>
                          <div className="space-y-1 flex-1 min-w-0">
                            <label_1.Label htmlFor={`${section.key}-${setting.key}`} className={`
                                font-medium flex items-center gap-2 flex-wrap
                                ${screenSize === 'mobile' ? 'text-sm' : 'text-base'}
                              `}>
                              <span className="flex items-center gap-2">
                                {setting.label}
                                {setting.validation?.required && (<span className="text-red-500">*</span>)}
                                {changedSettings.has(`${section.key}-${setting.key}`) && (<div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" title="Değiştirildi"/>)}
                              </span>
                            </label_1.Label>
                            <p className={`
                              text-muted-foreground break-words
                              ${screenSize === 'mobile' ? 'text-xs' : 'text-sm'}
                            `}>
                              {setting.description}
                            </p>
                          </div>
                          
                          {/* Status badges - responsive layout */}
                          <div className={`
                            flex items-center gap-2 flex-shrink-0
                            ${screenSize === 'mobile' ? 'self-start' : 'ml-2'}
                          `}>
                            {changedSettings.has(`${section.key}-${setting.key}`) && (<badge_1.Badge variant="outline" className={`
                                  border-orange-500 text-orange-700 bg-orange-50
                                  ${screenSize === 'mobile' ? 'text-xs px-2 py-1' : ''}
                                `}>
                                {screenSize === 'mobile' ? 'Değişti' : 'Değiştirildi'}
                              </badge_1.Badge>)}
                            {setting.value !== setting.defaultValue && !changedSettings.has(`${section.key}-${setting.key}`) && (<badge_1.Badge variant="secondary" className={screenSize === 'mobile' ? 'text-xs px-2 py-1' : ''}>
                                {screenSize === 'mobile' ? 'Özel' : 'Varsayılan Değil'}
                              </badge_1.Badge>)}
                          </div>
                        </div>
                        
                        {/* Input container with loading state */}
                        <div className="relative">
                          {isSaving && (<div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-md flex items-center justify-center z-10">
                              <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
                            </div>)}
                          {renderSettingInput(section, setting)}
                        </div>
                      </div>);
                    }).filter(Boolean)}
                </card_1.CardContent>
              </card_1.Card>)}
          </tabs_1.TabsContent>))}
        </tabs_1.Tabs>)}

      {/* Info Card */}
      {configSections.length > 0 && (<card_1.Card className="border-dashed">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-sm flex items-center gap-2">
            <lucide_react_1.Info className="h-4 w-4"/>
            Ayarlar Hakkında
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Güven Eşikleri:</strong> FAQ'ların otomatik onaylanması veya incelemeye gönderilmesi için kullanılır.
          </p>
          <p>
            <strong>İşleme Ayarları:</strong> Batch boyutu ve gerçek zamanlı işleme seçeneklerini kontrol eder.
          </p>
          <p>
            <strong>Varsayılan Değerler:</strong> Her kategori için "Varsayılana Dön" butonunu kullanarak varsayılan değerlere dönebilirsiniz.
          </p>
          <p>
            <strong>Değişiklikler:</strong> Tüm değişiklikler "Tüm Ayarları Kaydet" butonuna basılana kadar geçici olarak saklanır.
          </p>
        </card_1.CardContent>
      </card_1.Card>)}
    </div>);
}
//# sourceMappingURL=page.js.map