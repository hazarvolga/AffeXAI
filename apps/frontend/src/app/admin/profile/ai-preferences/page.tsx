'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, KeyRound, TestTube2, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import userAiPreferencesService, {
  AiModule,
  AiProvider,
  UserAiPreference,
  CreateUserAiPreferenceDto,
  GlobalAiPreference,
  UpsertGlobalPreferenceDto,
} from '@/lib/api/user-ai-preferences';

// Available AI models grouped by provider
const AI_MODELS_BY_PROVIDER: Record<AiProvider, { value: string; label: string }[]> = {
  [AiProvider.OPENAI]: [
    { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Faster, Cheaper)' },
  ],
  [AiProvider.ANTHROPIC]: [
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Latest)' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus (Most Capable)' },
    { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet (Balanced)' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku (Fastest)' },
  ],
  [AiProvider.GOOGLE]: [
    { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash Exp ⚡ (Free)' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro 🚀 (Most Capable)' },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash ⏱️ (Fast)' },
    { value: 'gemini-pro', label: 'Gemini Pro ⚖️ (Balanced)' },
  ],
  [AiProvider.OPENROUTER]: [
    // OpenAI models via OpenRouter
    { value: 'openai/gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'openai/gpt-4o', label: 'GPT-4o' },
    { value: 'openai/gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    // Anthropic models via OpenRouter
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'anthropic/claude-3-sonnet', label: 'Claude 3 Sonnet' },
    { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
    // Google models via OpenRouter
    { value: 'google/gemini-pro', label: 'Gemini Pro' },
    { value: 'google/palm-2-chat-bison', label: 'PaLM 2 Chat' },
    // Meta models
    { value: 'meta-llama/llama-3-70b-instruct', label: 'Llama 3 70B' },
    { value: 'meta-llama/llama-2-70b-chat', label: 'Llama 2 70B Chat' },
    // Mistral models
    { value: 'mistralai/mixtral-8x7b-instruct', label: 'Mixtral 8x7B' },
    { value: 'mistralai/mistral-7b-instruct', label: 'Mistral 7B' },
    // Perplexity models
    { value: 'perplexity/pplx-70b-online', label: 'PPLX 70B Online 🌐' },
    { value: 'perplexity/pplx-7b-chat', label: 'PPLX 7B Chat' },
    // Auto-routing (best model for task)
    { value: 'openrouter/auto', label: '🤖 Auto (Best for Task)' },
  ],
};

const PROVIDER_LABELS: Record<AiProvider, string> = {
  [AiProvider.OPENAI]: 'OpenAI',
  [AiProvider.ANTHROPIC]: 'Anthropic',
  [AiProvider.GOOGLE]: 'Google',
  [AiProvider.OPENROUTER]: 'OpenRouter',
};

const MODULE_LABELS: Record<AiModule, string> = {
  [AiModule.EMAIL]: 'Email Marketing',
  [AiModule.SOCIAL]: 'Social Media Management',
  [AiModule.SUPPORT_AGENT]: 'Destek Merkezi - Agent AI',
  [AiModule.SUPPORT_CHATBOT]: 'Web Sitesi - Chatbot',
  [AiModule.ANALYTICS]: 'Analytics & Reporting',
  [AiModule.FAQ_AUTO_RESPONSE]: 'Otomatik FAQ Oluşturma',
};

interface ModulePreference {
  module: AiModule;
  preference: UserAiPreference | null;
  provider: AiProvider;
  model: string;
  apiKey: string;
  enabled: boolean;
  useGlobal: boolean; // NEW: Whether to use global preference
}

export default function UserAiPreferencesPage() {
  // Global preference state
  const [globalPreference, setGlobalPreference] = useState<GlobalAiPreference | null>(null);
  const [globalForm, setGlobalForm] = useState({
    provider: AiProvider.OPENAI,
    model: 'gpt-4o',
    apiKey: '',
    enabled: true,
  });
  
  // Module preferences state
  const [modulePreferences, setModulePreferences] = useState<ModulePreference[]>([]);
  
  // Loading and saving states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<AiModule | 'global' | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      
      // Load global preference
      const globalPref = await userAiPreferencesService.getGlobalPreference();
      setGlobalPreference(globalPref);
      
      // Update global form if global preference exists
      if (globalPref) {
        setGlobalForm({
          provider: globalPref.provider,
          model: globalPref.model,
          apiKey: '', // Don't show existing API key
          enabled: globalPref.enabled,
        });
      }
      
      // Load module preferences
      const preferences = await userAiPreferencesService.getUserPreferences();

      // Initialize module preferences with existing data or defaults
      const modules = Object.values(AiModule);
      const prefs: ModulePreference[] = modules.map((module) => {
        const existing = preferences.find((p) => p.module === module);
        const hasModuleSpecific = !!existing;
        const shouldUseGlobal = !hasModuleSpecific && !!globalPref;
        
        return {
          module,
          preference: existing || null,
          provider: existing?.provider || AiProvider.OPENAI,
          model: existing?.model || 'gpt-4o',
          apiKey: '',
          enabled: existing?.enabled ?? true,
          useGlobal: shouldUseGlobal, // NEW: Auto-determine global usage
        };
      });

      setModulePreferences(prefs);
    } catch (error) {
      console.error('Failed to load AI preferences:', error);
      toast({
        title: 'Hata',
        description: 'AI tercihleri yüklenemedi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (module: AiModule) => {
    const pref = modulePreferences.find((p) => p.module === module);
    if (!pref) return;

    try {
      setIsSaving(module);

      const dto: CreateUserAiPreferenceDto = {
        module,
        provider: pref.provider,
        model: pref.model,
        apiKey: pref.apiKey || undefined,
        enabled: pref.enabled,
      };

      const result = await userAiPreferencesService.upsertPreference(dto);

      // Update state with saved preference
      setModulePreferences((prev) =>
        prev.map((p) =>
          p.module === module ? { ...p, preference: result, apiKey: '' } : p
        )
      );

      toast({
        title: 'Başarılı',
        description: `${MODULE_LABELS[module]} AI tercihleri kaydedildi.`,
      });
    } catch (error: any) {
      console.error('Failed to save AI preference:', error);
      toast({
        title: 'Hata',
        description: error.message || 'AI tercihleri kaydedilemedi.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(null);
    }
  };

  // Global preference save function
  const handleSaveGlobal = async () => {
    try {
      setIsSaving('global');

      const dto: UpsertGlobalPreferenceDto = {
        provider: globalForm.provider,
        model: globalForm.model,
        apiKey: globalForm.apiKey || undefined,
        enabled: globalForm.enabled,
      };

      const result = await userAiPreferencesService.upsertGlobalPreference(dto);
      setGlobalPreference(result);
      
      // Clear API key from form
      setGlobalForm(prev => ({ ...prev, apiKey: '' }));
      
      // Update modules that use global to reflect new global settings
      setModulePreferences((prev) =>
        prev.map((p) => 
          p.useGlobal ? { 
            ...p, 
            provider: result.provider, 
            model: result.model 
          } : p
        )
      );

      toast({
        title: 'Başarılı',
        description: 'Global AI tercihleri kaydedildi.',
      });
    } catch (error: any) {
      console.error('Failed to save global AI preference:', error);
      toast({
        title: 'Hata',
        description: error.message || 'Global AI tercihleri kaydedilemedi.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(null);
    }
  };

  const updateModulePreference = (
    module: AiModule,
    updates: Partial<Omit<ModulePreference, 'module'>>
  ) => {
    setModulePreferences((prev) =>
      prev.map((p) => (p.module === module ? { ...p, ...updates } : p))
    );
  };

  // Toggle global usage for a module
  const toggleGlobalUsage = async (module: AiModule, useGlobal: boolean) => {
    const pref = modulePreferences.find((p) => p.module === module);
    if (!pref) return;

    if (useGlobal) {
      // Switch to global - delete module-specific preference if exists
      if (pref.preference) {
        try {
          await userAiPreferencesService.deletePreference(pref.preference.id);
        } catch (error) {
          console.error('Failed to delete module preference:', error);
        }
      }
      
      // Update state to use global
      updateModulePreference(module, { 
        useGlobal: true,
        provider: globalPreference?.provider || AiProvider.OPENAI,
        model: globalPreference?.model || 'gpt-4o',
        preference: null,
      });
    } else {
      // Switch to custom - just update state, user will need to save
      updateModulePreference(module, { useGlobal: false });
    }
  };

  const getAvailableModels = (provider: AiProvider) => {
    return AI_MODELS_BY_PROVIDER[provider] || [];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Kişisel AI Tercihleri
          </h1>
          <p className="text-muted-foreground mt-2">
            Global ayar ile tek API key kullanın veya her modül için özel ayar yapın
          </p>
        </div>
      </div>

      {/* Global AI Preference Card */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🌐 Global AI Ayarları
                <Badge variant="secondary">Tüm Modüller</Badge>
              </CardTitle>
              <CardDescription>
                Tek API key ile tüm AI özelliklerini kullanın (Önerilen)
              </CardDescription>
            </div>
            <Switch
              checked={globalForm.enabled}
              onCheckedChange={(checked) =>
                setGlobalForm(prev => ({ ...prev, enabled: checked }))
              }
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {globalPreference ? (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                ✅ Global ayar aktif: {PROVIDER_LABELS[globalPreference.provider]} - {globalPreference.model}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ⚠️ AI kullanmak için global ayar yapın veya her modül için ayrı key girin
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="global-provider">AI Provider</Label>
              <Select
                value={globalForm.provider}
                onValueChange={(value) => {
                  const newProvider = value as AiProvider;
                  const defaultModel = getAvailableModels(newProvider)[0]?.value || '';
                  setGlobalForm(prev => ({
                    ...prev,
                    provider: newProvider,
                    model: defaultModel,
                  }));
                }}
              >
                <SelectTrigger id="global-provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AiProvider.OPENAI}>
                    OpenAI (GPT-4, GPT-3.5)
                  </SelectItem>
                  <SelectItem value={AiProvider.ANTHROPIC}>
                    Anthropic (Claude 3)
                  </SelectItem>
                  <SelectItem value={AiProvider.GOOGLE}>
                    Google (Gemini Pro, Flash)
                  </SelectItem>
                  <SelectItem value={AiProvider.OPENROUTER}>
                    OpenRouter (100+ Models) 🌐
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="global-model">Model</Label>
              <Select
                value={globalForm.model}
                onValueChange={(value) =>
                  setGlobalForm(prev => ({ ...prev, model: value }))
                }
              >
                <SelectTrigger id="global-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableModels(globalForm.provider).map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="global-api-key">
              API Key (zorunlu - AI özelliklerini kullanmak için)
            </Label>
            <Input
              id="global-api-key"
              type="password"
              placeholder={
                globalForm.provider === AiProvider.OPENAI
                  ? 'sk-proj-...'
                  : globalForm.provider === AiProvider.ANTHROPIC
                  ? 'sk-ant-...'
                  : 'API key giriniz'
              }
              value={globalForm.apiKey}
              onChange={(e) =>
                setGlobalForm(prev => ({ ...prev, apiKey: e.target.value }))
              }
              icon={KeyRound}
            />
            <p className="text-xs text-muted-foreground">
              {globalPreference?.apiKey
                ? `Kaydedilmiş API key: ${globalPreference.apiKey}`
                : 'Global API key tüm modüller tarafından kullanılacak'}
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveGlobal}
              disabled={isSaving === 'global' || !globalForm.apiKey}
            >
              {isSaving === 'global' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Global Ayarı Kaydet
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI Tercihleri Nasıl Çalışır?</AlertTitle>
        <AlertDescription>
          <strong>Basit Kullanım:</strong> Global ayar ile tek API key tüm modüllerde kullanılır. <br />
          <strong>İleri Kullanım:</strong> Her modül için farklı AI provider seçebilirsiniz. <br />
          API key'ler güvenli şekilde şifrelenir ve sadece sizin erişiminize açıktır.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {modulePreferences.map((pref) => (
          <Card key={pref.module}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    {MODULE_LABELS[pref.module]}
                  </CardTitle>
                  <CardDescription>
                    {globalPreference && pref.useGlobal ? (
                      <span className="text-green-600">
                        🌐 Global ayar kullanılıyor: {PROVIDER_LABELS[globalPreference.provider]} - {globalPreference.model}
                      </span>
                    ) : pref.preference ? (
                      `Özel ayar: ${PROVIDER_LABELS[pref.preference.provider]} - ${pref.preference.model}`
                    ) : (
                      'Henüz tercih belirlenmemiş'
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  {globalPreference && (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={pref.useGlobal}
                        onCheckedChange={(checked) => toggleGlobalUsage(pref.module, checked)}
                      />
                      <Label className="text-sm">Global ayarı kullan</Label>
                    </div>
                  )}
                  <Checkbox
                    checked={pref.enabled}
                    onCheckedChange={(checked) =>
                      updateModulePreference(pref.module, { enabled: Boolean(checked) })
                    }
                  />
                </div>
              </div>
            </CardHeader>
            {/* Sadece global kullanmıyorsa ayarları göster */}
            {(!globalPreference || !pref.useGlobal) && (
              <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${pref.module}-provider`}>AI Provider</Label>
                  <Select
                    value={pref.provider}
                    onValueChange={(value) => {
                      const newProvider = value as AiProvider;
                      const defaultModel = getAvailableModels(newProvider)[0]?.value || '';
                      updateModulePreference(pref.module, {
                        provider: newProvider,
                        model: defaultModel,
                      });
                    }}
                  >
                    <SelectTrigger id={`${pref.module}-provider`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AiProvider.OPENAI}>
                        OpenAI (GPT-4, GPT-3.5)
                      </SelectItem>
                      <SelectItem value={AiProvider.ANTHROPIC}>
                        Anthropic (Claude 3)
                      </SelectItem>
                      <SelectItem value={AiProvider.GOOGLE}>
                        Google (Gemini Pro, Flash)
                      </SelectItem>
                      <SelectItem value={AiProvider.OPENROUTER}>
                        OpenRouter (100+ Models) 🌐
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${pref.module}-model`}>Model</Label>
                  <Select
                    value={pref.model}
                    onValueChange={(value) =>
                      updateModulePreference(pref.module, { model: value })
                    }
                  >
                    <SelectTrigger id={`${pref.module}-model`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableModels(pref.provider).map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${pref.module}-api-key`}>
                  API Key (zorunlu - bu modül için özel provider kullanıyorsunuz)
                </Label>
                <Input
                  id={`${pref.module}-api-key`}
                  type="password"
                  placeholder={
                    pref.provider === AiProvider.OPENAI
                      ? 'sk-proj-...'
                      : pref.provider === AiProvider.ANTHROPIC
                      ? 'sk-ant-...'
                      : 'API key giriniz'
                  }
                  value={pref.apiKey}
                  onChange={(e) =>
                    updateModulePreference(pref.module, { apiKey: e.target.value })
                  }
                  icon={KeyRound}
                />
                <p className="text-xs text-muted-foreground">
                  {pref.preference?.apiKey
                    ? `Kaydedilmiş API key: ${pref.preference.apiKey}`
                    : 'Özel API key gerekli - bu modül için farklı provider kullanıyorsunuz'}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave(pref.module)}
                  disabled={isSaving === pref.module}
                >
                  {isSaving === pref.module ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Kaydet
                    </>
                  )}
                </Button>
              </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">💡 Bilgi</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>API Key Önceliği:</strong> Modül-specific key → Global key → AI kullanılamaz
          </p>
          <p>
            <strong>Öneriler:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Email Marketing için GPT-4o (hızlı ve kaliteli)</li>
            <li>Support için Claude 3.5 Sonnet (doğal konuşma)</li>
            <li>Analytics için GPT-3.5 Turbo (uygun maliyetli)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
