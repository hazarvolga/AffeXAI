'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, KeyRound, TestTube2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import settingsService, { AiSettings, AiModel, AiModuleSettings } from '@/lib/api/settingsService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// AI Providers
const AI_PROVIDERS = [
  { value: 'openai', label: 'OpenAI', icon: '🤖', description: 'GPT models from OpenAI' },
  { value: 'anthropic', label: 'Anthropic', icon: '🧠', description: 'Claude models from Anthropic' },
  { value: 'google', label: 'Google', icon: '🔍', description: 'Gemini models from Google' },
  { value: 'openrouter', label: 'OpenRouter', icon: '🌐', description: 'Access to multiple models via OpenRouter' },
  { value: 'local', label: 'Local AI', icon: '🏠', description: 'Local models via Ollama' },
];

// AI Models grouped by provider
const AI_MODELS_BY_PROVIDER = {
  openai: [
    { value: 'gpt-4o', label: 'GPT-4o (Recommended)', cost: 'High' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', cost: 'High' },
    { value: 'gpt-4', label: 'GPT-4', cost: 'High' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Faster)', cost: 'Low' },
  ],
  anthropic: [
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Latest)', cost: 'Medium' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus', cost: 'High' },
    { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', cost: 'Medium' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fast)', cost: 'Low' },
  ],
  google: [
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', cost: 'Medium' },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Fast)', cost: 'Low' },
    { value: 'gemini-pro', label: 'Gemini Pro', cost: 'Medium' },
    { value: 'gemini-pro-vision', label: 'Gemini Pro Vision', cost: 'Medium' },
  ],
  openrouter: [
    { value: 'openai/gpt-4', label: 'GPT-4 via OpenRouter', cost: 'High' },
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet via OpenRouter', cost: 'Medium' },
    { value: 'meta-llama/llama-3.1-70b-instruct', label: 'Llama 3.1 70B', cost: 'Low' },
  ],
  local: [
    { value: 'llama3.1', label: 'Llama 3.1 (Local)', cost: 'Free' },
    { value: 'mistral', label: 'Mistral (Local)', cost: 'Free' },
    { value: 'codellama', label: 'Code Llama (Local)', cost: 'Free' },
  ],
};

export default function AiSettingsPage() {
  const [aiSettings, setAiSettings] = useState<AiSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [testingModule, setTestingModule] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('openai');
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
        emailMarketing: { model: 'gpt-4o', enabled: true },
        social: { model: 'gpt-4o', enabled: false },
        support: { model: 'gpt-4o', enabled: false },
        analytics: { model: 'gpt-4o', enabled: false },
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
        ...(aiSettings.global || { model: 'gpt-4o', enabled: true }),
        ...updates,
      },
    });
  };

  // Helper function to get provider from model
  const getProviderFromModel = (model: string): string => {
    if (model.startsWith('gpt-')) return 'openai';
    if (model.startsWith('claude-')) return 'anthropic';
    if (model.startsWith('gemini-')) return 'google';
    if (model.includes('/')) return 'openrouter';
    if (['llama3.1', 'mistral', 'codellama'].includes(model)) return 'local';
    return 'openai';
  };

  // Helper function to get available models for selected provider
  const getAvailableModels = (provider: string) => {
    return AI_MODELS_BY_PROVIDER[provider as keyof typeof AI_MODELS_BY_PROVIDER] || [];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          AI Ayarları
        </h1>
        <p className="text-muted-foreground">
          Projedeki yapay zeka özelliklerinin genel ayarlarını ve varsayılan davranışlarını yönetin.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Global AI Konfigürasyonu
          </CardTitle>
          <CardDescription>
            Tüm modüller için AI sağlayıcı ayarları ve API anahtarları
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Multi-Provider AI Desteği</AlertTitle>
            <AlertDescription>
              <div className="space-y-2">
                <p>Farklı AI sağlayıcılarından API anahtarları alabilirsiniz:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">🤖 OpenAI API Keys</a>
                  <a href="https://console.anthropic.com/" target="_blank" className="underline">🧠 Anthropic API Keys</a>
                  <a href="https://makersuite.google.com/app/apikey" target="_blank" className="underline">🔍 Google AI API Keys</a>
                  <a href="https://openrouter.ai/keys" target="_blank" className="underline">🌐 OpenRouter API Keys</a>
                </div>
                <p className="text-xs">API anahtarları veritabanında şifreli olarak saklanır.</p>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-8">
            {/* Global API Key Setting */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="single-api-key"
                  checked={aiSettings.useSingleApiKey}
                  onCheckedChange={(checked) => {
                    setAiSettings({
                      ...aiSettings,
                      useSingleApiKey: Boolean(checked),
                    });
                  }}
                />
                <Label htmlFor="single-api-key" className="cursor-pointer">
                  Tüm modüller için tek bir API anahtarı kullan
                </Label>
              </div>
              {aiSettings.useSingleApiKey && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="global-api-key">Global API Key</Label>
                    <Input
                      id="global-api-key"
                      type="password"
                      placeholder={
                        selectedProvider === 'openai' ? 'sk-proj-...' :
                        selectedProvider === 'anthropic' ? 'sk-ant-...' :
                        selectedProvider === 'google' ? 'AIza...' :
                        selectedProvider === 'openrouter' ? 'sk-or-...' :
                        'API Key (Local AI için gerekli değil)'
                      }
                      value={aiSettings.global?.apiKey || ''}
                      onChange={(e) => updateGlobalSettings({ apiKey: e.target.value })}
                      disabled={selectedProvider === 'local'}
                    />
                    <p className="text-xs text-muted-foreground">
                      {aiSettings.global?.apiKey && aiSettings.global.apiKey.startsWith('***')
                        ? 'API key kaydedildi (maskelenmiş)'
                        : 'API key buraya yazın'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="global-provider">Global Provider</Label>
                    <Select
                      value={selectedProvider}
                      onValueChange={(value) => {
                        setSelectedProvider(value);
                        // Auto-select first model of the provider
                        const models = getAvailableModels(value);
                        if (models.length > 0) {
                          updateGlobalSettings({ model: models[0].value as AiModel });
                        }
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
                  <div className="space-y-2">
                    <Label htmlFor="global-model">Global Model</Label>
                    <Select
                      value={aiSettings.global?.model || 'gpt-4o'}
                      onValueChange={(value) => updateGlobalSettings({ model: value as AiModel })}
                    >
                      <SelectTrigger id="global-model">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableModels(selectedProvider).map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{model.label}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                model.cost === 'Free' ? 'bg-green-100 text-green-800' :
                                model.cost === 'Low' ? 'bg-blue-100 text-blue-800' :
                                model.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {model.cost}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <Separator />

            {/* Email Marketing Module */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Email Marketing</h3>
                <Checkbox
                  checked={aiSettings.emailMarketing.enabled}
                  onCheckedChange={(checked) => updateModuleSettings('emailMarketing', { enabled: Boolean(checked) })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email-api-key">API Key</Label>
                  <Input
                    id="email-api-key"
                    type="password"
                    placeholder="sk-proj-..."
                    value={aiSettings.emailMarketing.apiKey || ''}
                    onChange={(e) => updateModuleSettings('emailMarketing', { apiKey: e.target.value })}
                    disabled={aiSettings.useSingleApiKey}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-model">Model Seçimi</Label>
                  <Select
                    value={aiSettings.emailMarketing.model}
                    onValueChange={(value) => updateModuleSettings('emailMarketing', { model: value as AiModel })}
                  >
                    <SelectTrigger id="email-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AI_MODELS_BY_PROVIDER).map(([provider, models]) => (
                        <div key={provider}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                            {AI_PROVIDERS.find(p => p.value === provider)?.label}
                          </div>
                          {models.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{model.label}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  model.cost === 'Free' ? 'bg-green-100 text-green-800' :
                                  model.cost === 'Low' ? 'bg-blue-100 text-blue-800' :
                                  model.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {model.cost}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleTestConnection('emailMarketing')}
                disabled={testingModule === 'emailMarketing'}
                className="w-full md:w-auto"
              >
                {testingModule === 'emailMarketing' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TestTube2 className="mr-2 h-4 w-4" />
                )}
                Bağlantıyı Test Et
              </Button>
            </div>

            <Separator />

            {/* Social Media Module */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Social Media</h3>
                <Checkbox
                  checked={aiSettings.social.enabled}
                  onCheckedChange={(checked) => updateModuleSettings('social', { enabled: Boolean(checked) })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="social-api-key">API Key</Label>
                  <Input
                    id="social-api-key"
                    type="password"
                    placeholder="sk-proj-..."
                    value={aiSettings.social.apiKey || ''}
                    onChange={(e) => updateModuleSettings('social', { apiKey: e.target.value })}
                    disabled={aiSettings.useSingleApiKey}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social-model">Model Seçimi</Label>
                  <Select
                    value={aiSettings.social.model}
                    onValueChange={(value) => updateModuleSettings('social', { model: value as AiModel })}
                  >
                    <SelectTrigger id="social-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AI_MODELS_BY_PROVIDER).map(([provider, models]) => (
                        <div key={provider}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                            {AI_PROVIDERS.find(p => p.value === provider)?.label}
                          </div>
                          {models.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{model.label}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  model.cost === 'Free' ? 'bg-green-100 text-green-800' :
                                  model.cost === 'Low' ? 'bg-blue-100 text-blue-800' :
                                  model.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {model.cost}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleTestConnection('social')}
                disabled={testingModule === 'social'}
                className="w-full md:w-auto"
              >
                {testingModule === 'social' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TestTube2 className="mr-2 h-4 w-4" />
                )}
                Bağlantıyı Test Et
              </Button>
            </div>

            <Separator />

            {/* Support Chatbot Module */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Support Chatbot & FAQ Learning</h3>
                <Checkbox
                  checked={aiSettings.support.enabled}
                  onCheckedChange={(checked) => updateModuleSettings('support', { enabled: Boolean(checked) })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="support-api-key">API Key</Label>
                  <Input
                    id="support-api-key"
                    type="password"
                    placeholder="sk-proj-..."
                    value={aiSettings.support.apiKey || ''}
                    onChange={(e) => updateModuleSettings('support', { apiKey: e.target.value })}
                    disabled={aiSettings.useSingleApiKey}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-model">Model Seçimi</Label>
                  <Select
                    value={aiSettings.support.model}
                    onValueChange={(value) => updateModuleSettings('support', { model: value as AiModel })}
                  >
                    <SelectTrigger id="support-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AI_MODELS_BY_PROVIDER).map(([provider, models]) => (
                        <div key={provider}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                            {AI_PROVIDERS.find(p => p.value === provider)?.label}
                          </div>
                          {models.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{model.label}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  model.cost === 'Free' ? 'bg-green-100 text-green-800' :
                                  model.cost === 'Low' ? 'bg-blue-100 text-blue-800' :
                                  model.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {model.cost}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleTestConnection('support')}
                disabled={testingModule === 'support'}
                className="w-full md:w-auto"
              >
                {testingModule === 'support' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TestTube2 className="mr-2 h-4 w-4" />
                )}
                Bağlantıyı Test Et
              </Button>
            </div>

            <Separator />

            {/* Analytics Module */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Analytics (opsiyonel)</h3>
                <Checkbox
                  checked={aiSettings.analytics.enabled}
                  onCheckedChange={(checked) => updateModuleSettings('analytics', { enabled: Boolean(checked) })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="analytics-api-key">API Key</Label>
                  <Input
                    id="analytics-api-key"
                    type="password"
                    placeholder="sk-proj-..."
                    value={aiSettings.analytics.apiKey || ''}
                    onChange={(e) => updateModuleSettings('analytics', { apiKey: e.target.value })}
                    disabled={aiSettings.useSingleApiKey}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="analytics-model">Model Seçimi</Label>
                  <Select
                    value={aiSettings.analytics.model}
                    onValueChange={(value) => updateModuleSettings('analytics', { model: value as AiModel })}
                  >
                    <SelectTrigger id="analytics-model">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AI_MODELS_BY_PROVIDER).map(([provider, models]) => (
                        <div key={provider}>
                          <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                            {AI_PROVIDERS.find(p => p.value === provider)?.label}
                          </div>
                          {models.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{model.label}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  model.cost === 'Free' ? 'bg-green-100 text-green-800' :
                                  model.cost === 'Low' ? 'bg-blue-100 text-blue-800' :
                                  model.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {model.cost}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleTestConnection('analytics')}
                disabled={testingModule === 'analytics'}
                className="w-full md:w-auto"
              >
                {testingModule === 'analytics' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TestTube2 className="mr-2 h-4 w-4" />
                )}
                Bağlantıyı Test Et
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} disabled={isSaving} size="lg">
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