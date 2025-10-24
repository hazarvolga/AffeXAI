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
  const { toast } = useToast();

  useEffect(() => {
    loadConfiguration();
  }, []);

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
        type: inferType(config.value),
        value: config.value,
        defaultValue: config.value,
      });
      return acc;
    }, {} as Record<string, ConfigSetting[]>);

    // Create sections
    return Object.entries(grouped).map(([category, settings]) => ({
      key: category,
      title: formatCategoryTitle(category),
      description: getCategoryDescription(category),
      icon: getCategoryIcon(category),
      settings
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
      processing: 'İşleme Ayarları',
      recognition: 'Pattern Tanıma',
      quality: 'Kalite Kontrol',
      sources: 'Veri Kaynakları',
      categories: 'Kategori Yönetimi',
      advanced: 'Gelişmiş Ayarlar'
    };
    return titles[category] || category;
  };

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      thresholds: 'FAQ onay ve yayınlama için güven skorları',
      processing: 'Batch işleme ve gerçek zamanlı işleme ayarları',
      recognition: 'Pattern tanıma ve öğrenme parametreleri',
      quality: 'Kalite kontrol ve doğrulama kuralları',
      sources: 'Chat ve ticket veri kaynağı ayarları',
      categories: 'Otomatik kategori atama ayarları',
      advanced: 'Gelişmiş sistem ayarları'
    };
    return descriptions[category] || '';
  };

  const getCategoryIcon = (category: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      thresholds: <BarChart3 className="h-5 w-5" />,
      processing: <Zap className="h-5 w-5" />,
      recognition: <Brain className="h-5 w-5" />,
      quality: <Shield className="h-5 w-5" />,
      sources: <Filter className="h-5 w-5" />,
      categories: <Calendar className="h-5 w-5" />,
      advanced: <Settings className="h-5 w-5" />
    };
    return icons[category] || <Settings className="h-5 w-5" />;
  };



  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      
      // Save all configurations
      for (const section of configSections) {
        for (const setting of section.settings) {
          await FaqLearningService.updateConfig({
            configKey: setting.key,
            configValue: setting.value,
            description: setting.description,
            category: section.key
          });
        }
      }
      
      toast({
        title: 'Başarılı',
        description: 'Tüm ayarlar kaydedildi'
      });
      
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast({
        title: 'Hata',
        description: 'Ayarlar kaydedilemedi',
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

  const updateSettingValue = (sectionKey: string, settingKey: string, value: any) => {
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
          <Textarea
            id={inputId}
            value={setting.value}
            onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)}
            rows={4}
          />
        );

      case 'number':
        return (
          <div className="flex items-center gap-2">
            <Input
              id={inputId}
              type="number"
              value={setting.value}
              onChange={(e) => updateSettingValue(section.key, setting.key, Number(e.target.value))}
              min={setting.min}
              max={setting.max}
              step={setting.step}
              className="max-w-[200px]"
            />
            {setting.unit && (
              <span className="text-sm text-muted-foreground">{setting.unit}</span>
            )}
          </div>
        );

      default:
        return (
          <Input
            id={inputId}
            type="text"
            value={setting.value}
            onChange={(e) => updateSettingValue(section.key, setting.key, e.target.value)}
          />
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
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Tüm Ayarları Kaydet
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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            {configSections.map((section) => (
              <TabsTrigger key={section.key} value={section.key} className="flex items-center gap-2">
                {section.icon}
                <span className="hidden sm:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

        {configSections.map((section) => (
          <TabsContent key={section.key} value={section.key} className="space-y-4">
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
