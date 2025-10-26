'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bot, KeyRound, TestTube2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Mail, Share2, MessageSquare, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import settingsService, { AiSettings, AiModel, AiModuleSettings, AiProvider } from '@/lib/api/settingsService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// AI Providers
const AI_PROVIDERS = [
  { value: 'openai' as AiProvider, label: 'OpenAI', icon: '🤖', description: 'GPT models from OpenAI' },
  { value: 'anthropic' as AiProvider, label: 'Anthropic', icon: '🧠', description: 'Claude models from Anthropic' },
  { value: 'google' as AiProvider, label: 'Google', icon: '🔍', description: 'Gemini models from Google' },
  { value: 'openrouter' as AiProvider, label: 'OpenRouter', icon: '🌐', description: 'Access to multiple models via OpenRouter' },
  { value: 'local' as AiProvider, label: 'Local AI', icon: '🏠', description: 'Local models via Ollama' },
];

// AI Models grouped by provider with recommended flags
const AI_MODELS_BY_PROVIDER: Record<AiProvider, Array<{ value: AiModel; label: string; cost: string; recommended?: boolean }>> = {
  openai: [
    { value: 'gpt-4o', label: 'GPT-4o', cost: 'High', recommended: true },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', cost: 'High' },
    { value: 'gpt-4', label: 'GPT-4', cost: 'High' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Faster)', cost: 'Low' },
  ],
  anthropic: [
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Latest)', cost: 'Medium', recommended: true },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus', cost: 'High' },
    { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', cost: 'Medium' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fast)', cost: 'Low' },
  ],
  google: [
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', cost: 'Medium', recommended: true },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Fast)', cost: 'Low' },
    { value: 'gemini-pro', label: 'Gemini Pro', cost: 'Medium' },
    { value: 'gemini-pro-vision', label: 'Gemini Pro Vision', cost: 'Medium' },
  ],
  openrouter: [
    { value: 'openai/gpt-4', label: 'GPT-4 via OpenRouter', cost: 'High', recommended: true },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet via OpenRouter', cost: 'Medium' },
    { value: 'meta-llama/llama-3.1-70b-instruct', label: 'Llama 3.1 70B', cost: 'Low' },
  ],
  local: [
    { value: 'llama3.1', label: 'Llama 3.1 (Local)', cost: 'Free', recommended: true },
    { value: 'mistral', label: 'Mistral (Local)', cost: 'Free' },
    { value: 'codellama', label: 'Code Llama (Local)', cost: 'Free' },
  ],
};

// Module metadata for tabs
const MODULES = [
  { key: 'emailMarketing', label: 'Email Marketing', icon: Mail, description: 'AI for email campaigns and content' },
  { key: 'social', label: 'Social Media', icon: Share2, description: 'AI for social media posts' },
  { key: 'support', label: 'Support & Chat', icon: MessageSquare, description: 'Chatbot and FAQ learning' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, description: 'AI insights and analytics' },
] as const;

export default function AiSettingsPage() {
  const [aiSettings, setAiSettings] = useState<AiSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [testingModule, setTestingModule] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState('global');
  const { toast } = useToast();

  // Load AI settings from backend
  useEffect(() => {
    loadAiSettings();
  }, []);

  const loadAiSettings = async () => {
    try {
      setIsLoading(true);
      const settings = await settingsService.getAiSettings();
      setAiSettings(settings);
    } catch (error) {
      console.error('Failed to load AI settings:', error);
      toast({
        title: 'Hata',
        description: 'AI ayarları yüklenemedi.',
        variant: 'destructive',
      });
      // Set default values
      setAiSettings({
        useSingleApiKey: false,
        emailMarketing: { model: 'gpt-4o', enabled: true, provider: 'openai' },
        social: { model: 'gpt-4o', enabled: false, provider: 'openai' },
        support: { model: 'gpt-4o', enabled: false, provider: 'openai' },
        analytics: { model: 'gpt-4o', enabled: false, provider: 'openai' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!aiSettings) return;

    try {
      setIsSaving(true);
      await settingsService.updateAiSettings(aiSettings);
      toast({
        title: 'Başarılı',
        description: 'AI ayarları kaydedildi.',
      });
      // Reload to get masked API keys
      await loadAiSettings();
    } catch (error: any) {
      console.error('Failed to save AI settings:', error);
      toast({
        title: 'Hata',
        description: error.message || 'AI ayarları kaydedilemedi.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async (module: 'emailMarketing' | 'social' | 'support' | 'analytics') => {
    try {
      setTestingModule(module);
      const result = await settingsService.testAiConnection(module);

      if (result.success) {
        toast({
          title: 'Bağlantı Başarılı',
          description: result.message,
        });
      } else {
        toast({
          title: 'Bağlantı Başarısız',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Connection test failed:', error);
      toast({
        title: 'Test Hatası',
        description: error.message || 'Bağlantı test edilemedi.',
        variant: 'destructive',
      });
    } finally {
      setTestingModule(null);
    }
  };

  const updateModuleSettings = (module: keyof Omit<AiSettings, 'useSingleApiKey' | 'global'>, updates: Partial<AiModuleSettings>) => {
    if (!aiSettings) return;
    setAiSettings({
      ...aiSettings,
      [module]: {
        ...aiSettings[module],
        ...updates,
      },
    });
  };

  const updateGlobalSettings = (updates: Partial<AiModuleSettings>) => {
    if (!aiSettings) return;
    setAiSettings({
      ...aiSettings,
      global: {
        ...(aiSettings.global || { model: 'gpt-4o', enabled: true, provider: 'openai' }),
        ...updates,
      },
    });
  };

  // Helper: Get current global provider from settings (FIX for issue #1)
  const getCurrentGlobalProvider = (): AiProvider => {
    // First, check if global.provider is explicitly set
    if (aiSettings?.global?.provider) {
      return aiSettings.global.provider;
    }
    // Fallback: derive from global model
    if (aiSettings?.global?.model) {
      return getProviderFromModel(aiSettings.global.model);
    }
    return 'openai';
  };

  // Helper function to get provider from model
  const getProviderFromModel = (model: string): AiProvider => {
    if (model.startsWith('gpt-')) return 'openai';
    if (model.startsWith('claude-')) return 'anthropic';
    if (model.startsWith('gemini-')) return 'google';
    if (model.includes('/')) return 'openrouter';
    if (['llama3.1', 'mistral', 'codellama'].includes(model)) return 'local';
    return 'openai';
  };

  // Helper function to get available models for selected provider
  const getAvailableModels = (provider: AiProvider) => {
    return AI_MODELS_BY_PROVIDER[provider] || [];
  };

  // Helper: Get cost badge color
  const getCostBadgeClass = (cost: string) => {
    switch (cost) {
      case 'Free': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Helper: Check if API key is masked
  const isApiKeyMasked = (apiKey: string | undefined): boolean => {
    return Boolean(apiKey && apiKey.startsWith('***'));
  };

  // FIX for issue #3: Auto-enable all modules when toggling useSingleApiKey
  const handleToggleSingleApiKey = (checked: boolean) => {
    if (!aiSettings) return;

    setAiSettings({
      ...aiSettings,
      useSingleApiKey: checked,
      // When enabling single API key, enable all modules
      ...(checked ? {
        emailMarketing: { ...aiSettings.emailMarketing, enabled: true },
        social: { ...aiSettings.social, enabled: true },
        support: { ...aiSettings.support, enabled: true },
        analytics: { ...aiSettings.analytics, enabled: true },
      } : {}),
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!aiSettings) return null;

  const currentGlobalProvider = getCurrentGlobalProvider();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          AI Ayarları
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Projedeki yapay zeka özelliklerinin genel ayarlarını ve varsayılan davranışlarını yönetin.
        </p>
      </div>

      {/* Info Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Multi-Provider AI Desteği</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <p className="text-sm">Farklı AI sağlayıcılarından API anahtarları alabilirsiniz:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">🤖 OpenAI API Keys</a>
              <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">🧠 Anthropic API Keys</a>
              <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">🔍 Google AI API Keys</a>
              <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">🌐 OpenRouter API Keys</a>
            </div>
            <p className="text-xs text-muted-foreground">API anahtarları veritabanında şifreli olarak saklanır.</p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Main Settings Card with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            AI Konfigürasyonu
          </CardTitle>
          <CardDescription>
            Tüm modüller için AI sağlayıcı ayarları ve API anahtarları
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Global API Key Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label htmlFor="single-api-key" className="text-base font-semibold cursor-pointer">
                Tek API Anahtarı Kullan
              </Label>
              <p className="text-xs md:text-sm text-muted-foreground">
                Tüm modüller için tek bir API anahtarı kullanın
              </p>
            </div>
            <Switch
              id="single-api-key"
              checked={aiSettings.useSingleApiKey}
              onCheckedChange={handleToggleSingleApiKey}
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="global" className="text-xs md:text-sm">
                Global
              </TabsTrigger>
              {MODULES.map((module) => (
                <TabsTrigger key={module.key} value={module.key} className="text-xs md:text-sm">
                  <module.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">{module.label}</span>
                  <span className="sm:hidden">{module.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Global Settings Tab */}
            <TabsContent value="global" className="space-y-4 mt-4">
              {!aiSettings.useSingleApiKey && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Global ayarlar devre dışı. Tek API anahtarı kullanmak için yukarıdaki anahtarı açın.
                  </AlertDescription>
                </Alert>
              )}

              {aiSettings.useSingleApiKey && (
                <div className="space-y-4">
                  {/* Provider Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="global-provider">AI Sağlayıcı</Label>
                    <Select
                      value={currentGlobalProvider}
                      onValueChange={(value: AiProvider) => {
                        const models = getAvailableModels(value);
                        const defaultModel = models.find(m => m.recommended)?.value || models[0]?.value;
                        updateGlobalSettings({
                          provider: value,
                          model: defaultModel as AiModel,
                        });
                      }}
                    >
                      <SelectTrigger id="global-provider">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AI_PROVIDERS.map((provider) => (
                          <SelectItem key={provider.value} value={provider.value}>
                            <div className="flex items-center gap-2">
                              <span>{provider.icon}</span>
                              <div className="text-left">
                                <div className="font-medium">{provider.label}</div>
                                <div className="text-xs text-muted-foreground">{provider.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Model Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="global-model">AI Model</Label>
                    <Select
                      value={aiSettings.global?.model || 'gpt-4o'}
                      onValueChange={(value) => updateGlobalSettings({ model: value as AiModel })}
                    >
                      <SelectTrigger id="global-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableModels(currentGlobalProvider).map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            <div className="flex items-center justify-between w-full gap-2">
                              <span className="text-sm">{model.label}</span>
                              <Badge variant="secondary" className={`text-xs ${getCostBadgeClass(model.cost)}`}>
                                {model.cost}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* API Key Input */}
                  {currentGlobalProvider !== 'local' && (
                    <div className="space-y-2">
                      <Label htmlFor="global-api-key" className="flex items-center justify-between">
                        <span>API Anahtarı</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="h-6 px-2"
                        >
                          {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </Label>
                      <Input
                        id="global-api-key"
                        type={showApiKey ? 'text' : 'password'}
                        placeholder={
                          currentGlobalProvider === 'openai' ? 'sk-proj-...' :
                          currentGlobalProvider === 'anthropic' ? 'sk-ant-...' :
                          currentGlobalProvider === 'google' ? 'AIza...' :
                          currentGlobalProvider === 'openrouter' ? 'sk-or-...' :
                          'API Key'
                        }
                        value={aiSettings.global?.apiKey || ''}
                        onChange={(e) => updateGlobalSettings({ apiKey: e.target.value })}
                        className="font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        {isApiKeyMasked(aiSettings.global?.apiKey)
                          ? '✓ API key kaydedildi (güvenlik için maskelenmiş)'
                          : 'API key buraya yazın'}
                      </p>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/20">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Tüm modüller bu ayarları kullanıyor</span>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Module Settings Tabs */}
            {MODULES.map((module) => (
              <TabsContent key={module.key} value={module.key} className="space-y-4 mt-4">
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/10">
                  <module.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{module.label}</h3>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                  <Switch
                    checked={aiSettings[module.key].enabled}
                    onCheckedChange={(checked) => updateModuleSettings(module.key, { enabled: checked })}
                  />
                </div>

                {aiSettings.useSingleApiKey ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Bu modül global AI ayarlarını kullanıyor. Özel ayarlar için yukarıdaki "Tek API Anahtarı Kullan" seçeneğini kapatın.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {/* Provider Selection */}
                    <div className="space-y-2">
                      <Label htmlFor={`${module.key}-provider`}>AI Sağlayıcı</Label>
                      <Select
                        value={aiSettings[module.key].provider || 'openai'}
                        onValueChange={(value: AiProvider) => {
                          const models = getAvailableModels(value);
                          const defaultModel = models.find(m => m.recommended)?.value || models[0]?.value;
                          updateModuleSettings(module.key, {
                            provider: value,
                            model: defaultModel as AiModel,
                          });
                        }}
                      >
                        <SelectTrigger id={`${module.key}-provider`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AI_PROVIDERS.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              <div className="flex items-center gap-2">
                                <span>{provider.icon}</span>
                                <div>
                                  <div className="font-medium">{provider.label}</div>
                                  <div className="text-xs text-muted-foreground">{provider.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Model Selection */}
                    <div className="space-y-2">
                      <Label htmlFor={`${module.key}-model`}>AI Model</Label>
                      <Select
                        value={aiSettings[module.key].model}
                        onValueChange={(value) => updateModuleSettings(module.key, { model: value as AiModel })}
                      >
                        <SelectTrigger id={`${module.key}-model`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableModels(aiSettings[module.key].provider || 'openai').map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full gap-2">
                                <span className="text-sm">{model.label}</span>
                                <Badge variant="secondary" className={`text-xs ${getCostBadgeClass(model.cost)}`}>
                                  {model.cost}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* API Key Input */}
                    {(aiSettings[module.key].provider || 'openai') !== 'local' && (
                      <div className="space-y-2">
                        <Label htmlFor={`${module.key}-api-key`}>API Anahtarı</Label>
                        <Input
                          id={`${module.key}-api-key`}
                          type="password"
                          placeholder="sk-..."
                          value={aiSettings[module.key].apiKey || ''}
                          onChange={(e) => updateModuleSettings(module.key, { apiKey: e.target.value })}
                          className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          {isApiKeyMasked(aiSettings[module.key].apiKey)
                            ? '✓ API key kaydedildi (güvenlik için maskelenmiş)'
                            : 'API key buraya yazın'}
                        </p>
                      </div>
                    )}

                    {/* Test Connection Button */}
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleTestConnection(module.key)}
                      disabled={testingModule === module.key || !aiSettings[module.key].enabled}
                      className="w-full"
                    >
                      {testingModule === module.key ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube2 className="mr-2 h-4 w-4" />
                      )}
                      Bağlantıyı Test Et
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button onClick={handleSave} disabled={isSaving} size="lg" className="w-full sm:w-auto">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  AI Ayarlarını Kaydet
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
