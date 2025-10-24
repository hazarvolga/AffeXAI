'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Brain,
  Filter,
  Zap,
  Shield,
  Calendar,
  BarChart3,
  Info,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConfigSection {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  settings: ConfigSetting[];
}

interface ConfigSetting {
  key: string;
  label: string;
  description: string;
  type: 'number' | 'boolean' | 'string' | 'select' | 'range' | 'textarea';
  value: any;
  defaultValue: any;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

export default function ConfigurationManagementPage() {
  const [configSections, setConfigSections] = useState<ConfigSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('thresholds');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [aiProviderInfo, setAiProviderInfo] = useState<{
    currentProvider: string;
    currentModel: string;
    available: boolean;
    isReadOnly: boolean;
    globalSettingsUrl: string;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadConfiguration();
    loadAiProviderInfo();
  }, []);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
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
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const data = await FaqLearningService.getAiProviderInfo();
      setAiProviderInfo(data);
    } catch (error) {
      console.error('Failed to load AI provider info:', error);
    }
  };

  const loadConfiguration = async () => {
    setIsLoading(true);
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const data = await FaqLearningService.getConfig();
      
      // Transform API data to config sections
      const sections = transformToConfigSections(data.configurations);
      setConfigSections(sections);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      
      // Show empty state instead of mock data
      setConfigSections([]);
      
      toast({
        title: 'Hata',
        description: 'Ayarlar yüklenemedi. Lütfen daha sonra tekrar deneyin.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const transformToConfigSections = (configs: any[]): ConfigSection[] => {
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
    }, {} as Record<string, ConfigSetting[]>);

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

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const inferType = (value: any): ConfigSetting['type'] => {
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    return 'string';
  };

  const formatCategoryTitle = (category: string): string => {
    const titles: Record<string, string> = {
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

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
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

  const getCategoryIcon = (category: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      thresholds: <BarChart3 className="h-5 w-5" />,
      recognition: <Brain className="h-5 w-5" />,
      processing: <Zap className="h-5 w-5" />,
      quality: <Shield className="h-5 w-5" />,
      sources: <Filter className="h-5 w-5" />,
      categories: <Calendar className="h-5 w-5" />,
      ai: <Brain className="h-5 w-5" />,
      advanced: <Settings className="h-5 w-5" />
    };
    return icons[category] || <Settings className="h-5 w-5" />;
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
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      
      // Prepare all configurations for bulk update
      const allConfigs: Array<{
        configKey: string;
        configValue: any;
        description?: string;
        category?: string;
      }> = [];

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
      
      if (result.success) {
        toast({
          title: 'Başarılı',
          description: `${allConfigs.length} ayar başarıyla kaydedildi`
        });
        
        setHasChanges(false);
        setValidationErrors({}); // Clear validation errors after successful save
      } else {
        throw new Error(result.message || 'Bulk update failed');
      }
      
      // Show detailed results if available
      if (result.results) {
        const { successful, failed } = result.results;
        
        if (failed && failed.length > 0) {
          console.warn('Some configurations failed to save:', failed);
          toast({
            title: 'Kısmi Başarı',
            description: `${successful.length} ayar kaydedildi, ${failed.length} ayar başarısız oldu`,
            variant: 'destructive'
          });
        }
      }
      
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Ayarlar kaydedilemedi',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async (sectionKey: string) => {
    if (!confirm(`${sectionKey} kategorisindeki ayarları varsayılana sıfırlamak istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      await FaqLearningService.resetConfigSection(sectionKey);
      
      toast({
        title: 'Başarılı',
        description: 'Ayarlar sıfırlandı'
      });
      
      await loadConfiguration();
    } catch (error) {
      console.error('Failed to reset configuration:', error);
      toast({
        title: 'Hata',
        description: 'Ayarlar sıfırlanamadı',
        variant: 'destructive'
      });
    }
  };

  const validateSetting = (setting: ConfigSetting, value: any): string | null => {
    // Type validation
    switch (setting.type) {
      case 'number':
      case 'range':
        if (typeof value !== 'number' || isNaN(value)) {
          return `${setting.label} geçerli bir sayı olmalıdır`;
        }
        if (setting.min !== undefined && value < setting.min) {
          return `${setting.label} en az ${setting.min} olmalıdır`;
        }
        if (setting.max !== undefined && value > setting.max) {
          return `${setting.label} en fazla ${setting.max} olmalıdır`;
        }
        break;
      
      case 'string':
        if (setting.validation?.required && (!value || value.trim() === '')) {
          return `${setting.label} zorunludur`;
        }
        break;
    }
    
    return null;
  };

  const updateSettingValue = (sectionKey: string, settingKey: string, value: any) => {
    // Find the setting for validation
    const section = configSections.find(s => s.key === sectionKey);
    const setting = section?.settings.find(s => s.key === settingKey);
    
    // Validate the new value
    if (setting) {
      const error = validateSetting(setting, value);
      setValidationErrors(prev => ({
        ...prev,
        [`${sectionKey}-${settingKey}`]: error || ''
      }));
    }

    setConfigSections(prev =>
      prev.map(section =>
        section.key === sectionKey
          ? {
              ...section,
              settings: section.settings.map(setting =>
                setting.key === settingKey ? { ...setting, value } : setting
              )
            }
          : section
      )
    );
    setHasChanges(true);
  };

  const renderSettingInput = (section: ConfigSection, setting: ConfigSetting) => {
    const inputId = `${section.key}-${setting.key}`;
    const errorKey = `${section.key}-${setting.key}`;
    const hasError = validationErrors[errorKey];

    switch (setting.type) {
      case 'boolean':
        return (
          <Switch
            id={inputId}
            checked={setting.value}
            onCheckedChange={(checked) => updateSettingValue(section.key, setting.key, checked)}
          />
        );

      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                {setting.value}{setting.unit || ''}
              </span>
            </div>
            <Slider
              id={inputId}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={[setting.value]}
              onValueChange={([value]) => updateSettingValue(section.key, setting.key, value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{setting.min}{setting.unit || ''}</span>
              <span>{setting.max}{setting.unit || ''}</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <Select
            value={setting.value}
            onValueChange={(value) => updateSettingValue(section.key, setting.key, value)}
          >
            <SelectTrigger id={inputId}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <div className="space-y-1">
            <Textarea
              id={inputId}
              value={setting.value}
              onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)}
              rows={4}
              className={hasError ? 'border-red-500 focus:border-red-500' : ''}
            />
            {hasError && (
              <p className="text-sm text-red-500">{validationErrors[errorKey]}</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Input
                id={inputId}
                type="number"
                value={setting.value}
                onChange={(e) => updateSettingValue(section.key, setting.key, Number(e.target.value))}
                min={setting.min}
                max={setting.max}
                step={setting.step}
                className={`max-w-[200px] ${hasError ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {setting.unit && (
                <span className="text-sm text-muted-foreground">{setting.unit}</span>
              )}
            </div>
            {hasError && (
              <p className="text-sm text-red-500">{validationErrors[errorKey]}</p>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {setting.value && Array.isArray(setting.value) && setting.value.map((selectedValue: string) => (
                <Badge key={selectedValue} variant="secondary" className="flex items-center gap-1">
                  {setting.options?.find(opt => opt.value === selectedValue)?.label || selectedValue}
                  <button
                    type="button"
                    onClick={() => {
                      const newValue = setting.value.filter((v: string) => v !== selectedValue);
                      updateSettingValue(section.key, setting.key, newValue);
                    }}
                    className="ml-1 text-xs hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <Select
              value=""
              onValueChange={(value) => {
                if (value && !setting.value.includes(value)) {
                  const newValue = [...(setting.value || []), value];
                  updateSettingValue(section.key, setting.key, newValue);
                }
              }}
            >
              <SelectTrigger id={inputId}>
                <SelectValue placeholder="Kategori seçin..." />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.filter(option => !setting.value?.includes(option.value)).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return (
          <div className="space-y-1">
            <Input
              id={inputId}
              type="text"
              value={setting.value}
              onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)}
              className={hasError ? 'border-red-500 focus:border-red-500' : ''}
            />
            {hasError && (
              <p className="text-sm text-red-500">{validationErrors[errorKey]}</p>
            )}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            FAQ Learning Ayarları
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistem konfigürasyonu ve öğrenme parametreleri
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => loadConfiguration()}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Yenile
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving || Object.values(validationErrors).some(error => error !== '')}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor... ({configSections.reduce((total, section) => total + section.settings.length, 0)} ayar)
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Tüm Ayarları Kaydet ({configSections.reduce((total, section) => total + section.settings.length, 0)} ayar)
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Changes Alert */}
      {hasChanges && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900">Kaydedilmemiş Değişiklikler</AlertTitle>
          <AlertDescription className="text-orange-800">
            Yaptığınız değişiklikleri kaydetmeyi unutmayın.
          </AlertDescription>
        </Alert>
      )}

      {/* Empty State */}
      {configSections.length === 0 && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Settings className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ayar Bulunamadı</h3>
            <p className="text-muted-foreground text-center mb-4">
              Henüz hiç ayar yapılandırılmamış. Backend'den ayarlar yüklenemedi.
            </p>
            <Button onClick={() => loadConfiguration()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Tekrar Dene
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      {configSections.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {configSections.map((section) => (
              <TabsTrigger key={section.key} value={section.key} className="flex items-center gap-2">
                {section.icon}
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

        {configSections.map((section) => (
          <TabsContent key={section.key} value={section.key} className="space-y-4">
            {section.key === 'ai' ? (
              // Special AI Model Tab
              <div className="space-y-4">
                {/* AI Provider Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Mevcut AI Sağlayıcısı
                    </CardTitle>
                    <CardDescription>
                      Global AI ayarlarından gelen aktif sağlayıcı bilgileri
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiProviderInfo ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Sağlayıcı</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={aiProviderInfo.available ? "default" : "destructive"}>
                                {aiProviderInfo.currentProvider.toUpperCase()}
                              </Badge>
                              {aiProviderInfo.available ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Model</Label>
                            <div className="mt-1 font-mono text-sm">
                              {aiProviderInfo.currentModel}
                            </div>
                          </div>
                        </div>
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            AI sağlayıcısını ve modelini değiştirmek için{' '}
                            <a 
                              href={aiProviderInfo.globalSettingsUrl} 
                              className="underline hover:text-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Global AI Ayarları
                            </a>
                            'na gidin. Burada sadece model parametrelerini ayarlayabilirsiniz.
                          </AlertDescription>
                        </Alert>
                      </>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        AI sağlayıcı bilgileri yükleniyor...
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* AI Model Parameters Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {section.icon}
                          Model Parametreleri
                        </CardTitle>
                        <CardDescription>
                          FAQ oluşturma için AI model ayarları
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReset(section.key)}
                      >
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Varsayılana Dön
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.settings.map((setting) => (
                      <div key={setting.key} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <Label htmlFor={`${section.key}-${setting.key}`} className="text-base font-medium">
                              {setting.label}
                              {setting.validation?.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          {setting.value !== setting.defaultValue && (
                            <Badge variant="secondary" className="ml-2">
                              Değiştirildi
                            </Badge>
                          )}
                        </div>
                        {renderSettingInput(section, setting)}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Regular Tab
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {section.icon}
                        {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReset(section.key)}
                    >
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Varsayılana Dön
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <Label htmlFor={`${section.key}-${setting.key}`} className="text-base font-medium">
                            {setting.label}
                            {setting.validation?.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        {setting.value !== setting.defaultValue && (
                          <Badge variant="secondary" className="ml-2">
                            Değiştirildi
                          </Badge>
                        )}
                      </div>
                      {renderSettingInput(section, setting)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
        </Tabs>
      )}

      {/* Info Card */}
      {configSections.length > 0 && (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="h-4 w-4" />
            Ayarlar Hakkında
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
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
        </CardContent>
      </Card>
      )}
    </div>
  );
}
