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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import userAiPreferencesService, {
  AiModule,
  AiProvider,
  UserAiPreference,
  CreateUserAiPreferenceDto,
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
};

const PROVIDER_LABELS: Record<AiProvider, string> = {
  [AiProvider.OPENAI]: 'OpenAI',
  [AiProvider.ANTHROPIC]: 'Anthropic',
  [AiProvider.GOOGLE]: 'Google',
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
}

export default function UserAiPreferencesPage() {
  const [modulePreferences, setModulePreferences] = useState<ModulePreference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<AiModule | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      const preferences = await userAiPreferencesService.getUserPreferences();

      // Initialize module preferences with existing data or defaults
      const modules = Object.values(AiModule);
      const prefs: ModulePreference[] = modules.map((module) => {
        const existing = preferences.find((p) => p.module === module);
        return {
          module,
          preference: existing || null,
          provider: existing?.provider || AiProvider.OPENAI,
          model: existing?.model || 'gpt-4o',
          apiKey: '',
          enabled: existing?.enabled ?? true,
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

  const updateModulePreference = (
    module: AiModule,
    updates: Partial<Omit<ModulePreference, 'module' | 'preference'>>
  ) => {
    setModulePreferences((prev) =>
      prev.map((p) => (p.module === module ? { ...p, ...updates } : p))
    );
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
            Her modül için kendi AI provider'ınızı ve API key'inizi seçin
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Kişisel AI Tercihleri</AlertTitle>
        <AlertDescription>
          Buradan her modül için farklı AI provider ve kendi API key'lerinizi kullanabilirsiniz.
          API key'ler güvenli bir şekilde şifrelenerek saklanır ve sadece sizin erişiminize açıktır.
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
                    {pref.preference
                      ? `Mevcut: ${PROVIDER_LABELS[pref.preference.provider]} - ${pref.preference.model}`
                      : 'Henüz tercih belirlenmemiş'}
                  </CardDescription>
                </div>
                <Checkbox
                  checked={pref.enabled}
                  onCheckedChange={(checked) =>
                    updateModulePreference(pref.module, { enabled: Boolean(checked) })
                  }
                />
              </div>
            </CardHeader>
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
                  API Key (opsiyonel - kendi key'inizi kullanmak için)
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
                    : 'API key girilmemiş (admin key veya default kullanılacak)'}
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
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">💡 Bilgi</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>API Key Önceliği:</strong> Kendi API key'iniz → Admin global key → Ücretsiz tier
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
