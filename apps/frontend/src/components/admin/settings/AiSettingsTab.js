"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiSettingsTab;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const skeleton_1 = require("@/components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const separator_1 = require("@/components/ui/separator");
const checkbox_1 = require("@/components/ui/checkbox");
const select_1 = require("@/components/ui/select");
const use_toast_1 = require("@/hooks/use-toast");
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
const alert_1 = require("@/components/ui/alert");
const AI_MODELS = [
    { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Faster)' },
    { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
    { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
];
function AiSettingsTab() {
    const [aiSettings, setAiSettings] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const [testingModule, setTestingModule] = (0, react_1.useState)(null);
    const { toast } = (0, use_toast_1.useToast)();
    // Load AI settings from backend
    (0, react_1.useEffect)(() => {
        loadAiSettings();
    }, []);
    const loadAiSettings = async () => {
        try {
            setIsLoading(true);
            const settings = await settingsService_1.default.getAiSettings();
            setAiSettings(settings);
        }
        catch (error) {
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
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSave = async () => {
        if (!aiSettings)
            return;
        try {
            setIsSaving(true);
            await settingsService_1.default.updateAiSettings(aiSettings);
            toast({
                title: 'Başarılı',
                description: 'AI ayarları kaydedildi.',
            });
        }
        catch (error) {
            console.error('Failed to save AI settings:', error);
            toast({
                title: 'Hata',
                description: error.message || 'AI ayarları kaydedilemedi.',
                variant: 'destructive',
            });
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleTestConnection = async (module) => {
        try {
            setTestingModule(module);
            const result = await settingsService_1.default.testAiConnection(module);
            if (result.success) {
                toast({
                    title: 'Bağlantı Başarılı',
                    description: result.message,
                });
            }
            else {
                toast({
                    title: 'Bağlantı Başarısız',
                    description: result.message,
                    variant: 'destructive',
                });
            }
        }
        catch (error) {
            console.error('Connection test failed:', error);
            toast({
                title: 'Test Hatası',
                description: error.message || 'Bağlantı test edilemedi.',
                variant: 'destructive',
            });
        }
        finally {
            setTestingModule(null);
        }
    };
    const updateModuleSettings = (module, updates) => {
        if (!aiSettings)
            return;
        setAiSettings({
            ...aiSettings,
            [module]: {
                ...aiSettings[module],
                ...updates,
            },
        });
    };
    const updateGlobalSettings = (updates) => {
        if (!aiSettings)
            return;
        setAiSettings({
            ...aiSettings,
            global: {
                ...(aiSettings.global || { model: 'gpt-4o', enabled: true }),
                ...updates,
            },
        });
    };
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <skeleton_1.Skeleton className="h-8 w-48"/>
          <skeleton_1.Skeleton className="h-4 w-96 mt-2"/>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6">
          <skeleton_1.Skeleton className="h-20 w-full"/>
          <skeleton_1.Skeleton className="h-32 w-full"/>
          <skeleton_1.Skeleton className="h-32 w-full"/>
          <skeleton_1.Skeleton className="h-10 w-32"/>
        </card_1.CardContent>
      </card_1.Card>);
    }
    if (!aiSettings)
        return null;
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Bot className="h-6 w-6 text-primary"/>
          AI Ayarları
        </card_1.CardTitle>
        <card_1.CardDescription>
          Projedeki yapay zeka özelliklerinin genel ayarlarını ve varsayılan davranışlarını yönetin.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent className="space-y-6">
        {/* Info Alert */}
        <alert_1.Alert>
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertTitle>OpenAI API Key Gerekli</alert_1.AlertTitle>
          <alert_1.AlertDescription>
            AI özelliklerini kullanmak için OpenAI API key'inize ihtiyacınız var.{' '}
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Buradan alabilirsiniz
            </a>
            . API key'ler veritabanında şifreli olarak saklanır.
          </alert_1.AlertDescription>
        </alert_1.Alert>

        <div className="space-y-8">
          {/* Global API Key Setting */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center space-x-2">
              <checkbox_1.Checkbox id="single-api-key" checked={aiSettings.useSingleApiKey} onCheckedChange={(checked) => {
            setAiSettings({
                ...aiSettings,
                useSingleApiKey: Boolean(checked),
            });
        }}/>
              <label_1.Label htmlFor="single-api-key" className="cursor-pointer">
                Tüm modüller için tek bir API anahtarı kullan
              </label_1.Label>
            </div>
            {aiSettings.useSingleApiKey && (<>
                <div className="space-y-2">
                  <label_1.Label htmlFor="global-api-key">Global API Key</label_1.Label>
                  <input_1.Input id="global-api-key" type="password" placeholder="sk-proj-..." value={aiSettings.global?.apiKey || ''} onChange={(e) => updateGlobalSettings({ apiKey: e.target.value })} icon={lucide_react_1.KeyRound}/>
                  <p className="text-xs text-muted-foreground">
                    {aiSettings.global?.apiKey && aiSettings.global.apiKey.startsWith('***')
                ? 'API key kaydedildi (maskelenmiş)'
                : 'API key buraya yazın'}
                  </p>
                </div>
                <div className="space-y-2">
                  <label_1.Label htmlFor="global-model">Global Model</label_1.Label>
                  <select_1.Select value={aiSettings.global?.model || 'gpt-4o'} onValueChange={(value) => updateGlobalSettings({ model: value })}>
                    <select_1.SelectTrigger id="global-model">
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      {AI_MODELS.map((model) => (<select_1.SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </select_1.SelectItem>))}
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </>)}
          </div>

          <separator_1.Separator />

          {/* Email Marketing Module */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Email Marketing</h3>
              <checkbox_1.Checkbox checked={aiSettings.emailMarketing.enabled} onCheckedChange={(checked) => updateModuleSettings('emailMarketing', { enabled: Boolean(checked) })}/>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label_1.Label htmlFor="email-api-key">API Key</label_1.Label>
                <input_1.Input id="email-api-key" type="password" placeholder="sk-proj-..." value={aiSettings.emailMarketing.apiKey || ''} onChange={(e) => updateModuleSettings('emailMarketing', { apiKey: e.target.value })} disabled={aiSettings.useSingleApiKey} icon={lucide_react_1.KeyRound}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="email-model">Model Seçimi</label_1.Label>
                <select_1.Select value={aiSettings.emailMarketing.model} onValueChange={(value) => updateModuleSettings('emailMarketing', { model: value })}>
                  <select_1.SelectTrigger id="email-model">
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {AI_MODELS.map((model) => (<select_1.SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>
            <button_1.Button variant="outline" type="button" onClick={() => handleTestConnection('emailMarketing')} disabled={testingModule === 'emailMarketing'} className="w-full md:w-auto">
              {testingModule === 'emailMarketing' ? (<lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>) : (<lucide_react_1.TestTube2 className="mr-2 h-4 w-4"/>)}
              Bağlantıyı Test Et
            </button_1.Button>
          </div>

          <separator_1.Separator />

          {/* Social Media Module */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Social Media</h3>
              <checkbox_1.Checkbox checked={aiSettings.social.enabled} onCheckedChange={(checked) => updateModuleSettings('social', { enabled: Boolean(checked) })}/>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label_1.Label htmlFor="social-api-key">API Key</label_1.Label>
                <input_1.Input id="social-api-key" type="password" placeholder="sk-proj-..." value={aiSettings.social.apiKey || ''} onChange={(e) => updateModuleSettings('social', { apiKey: e.target.value })} disabled={aiSettings.useSingleApiKey} icon={lucide_react_1.KeyRound}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="social-model">Model Seçimi</label_1.Label>
                <select_1.Select value={aiSettings.social.model} onValueChange={(value) => updateModuleSettings('social', { model: value })}>
                  <select_1.SelectTrigger id="social-model">
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {AI_MODELS.map((model) => (<select_1.SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>
            <button_1.Button variant="outline" type="button" onClick={() => handleTestConnection('social')} disabled={testingModule === 'social'} className="w-full md:w-auto">
              {testingModule === 'social' ? (<lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>) : (<lucide_react_1.TestTube2 className="mr-2 h-4 w-4"/>)}
              Bağlantıyı Test Et
            </button_1.Button>
          </div>

          <separator_1.Separator />

          {/* Support Chatbot Module */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Support Chatbot</h3>
              <checkbox_1.Checkbox checked={aiSettings.support.enabled} onCheckedChange={(checked) => updateModuleSettings('support', { enabled: Boolean(checked) })}/>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label_1.Label htmlFor="support-api-key">API Key</label_1.Label>
                <input_1.Input id="support-api-key" type="password" placeholder="sk-proj-..." value={aiSettings.support.apiKey || ''} onChange={(e) => updateModuleSettings('support', { apiKey: e.target.value })} disabled={aiSettings.useSingleApiKey} icon={lucide_react_1.KeyRound}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="support-model">Model Seçimi</label_1.Label>
                <select_1.Select value={aiSettings.support.model} onValueChange={(value) => updateModuleSettings('support', { model: value })}>
                  <select_1.SelectTrigger id="support-model">
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {AI_MODELS.map((model) => (<select_1.SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>
            <button_1.Button variant="outline" type="button" onClick={() => handleTestConnection('support')} disabled={testingModule === 'support'} className="w-full md:w-auto">
              {testingModule === 'support' ? (<lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>) : (<lucide_react_1.TestTube2 className="mr-2 h-4 w-4"/>)}
              Bağlantıyı Test Et
            </button_1.Button>
          </div>

          <separator_1.Separator />

          {/* Analytics Module */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Analytics (opsiyonel)</h3>
              <checkbox_1.Checkbox checked={aiSettings.analytics.enabled} onCheckedChange={(checked) => updateModuleSettings('analytics', { enabled: Boolean(checked) })}/>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label_1.Label htmlFor="analytics-api-key">API Key</label_1.Label>
                <input_1.Input id="analytics-api-key" type="password" placeholder="sk-proj-..." value={aiSettings.analytics.apiKey || ''} onChange={(e) => updateModuleSettings('analytics', { apiKey: e.target.value })} disabled={aiSettings.useSingleApiKey} icon={lucide_react_1.KeyRound}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="analytics-model">Model Seçimi</label_1.Label>
                <select_1.Select value={aiSettings.analytics.model} onValueChange={(value) => updateModuleSettings('analytics', { model: value })}>
                  <select_1.SelectTrigger id="analytics-model">
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {AI_MODELS.map((model) => (<select_1.SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </select_1.SelectItem>))}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>
            <button_1.Button variant="outline" type="button" onClick={() => handleTestConnection('analytics')} disabled={testingModule === 'analytics'} className="w-full md:w-auto">
              {testingModule === 'analytics' ? (<lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>) : (<lucide_react_1.TestTube2 className="mr-2 h-4 w-4"/>)}
              Bağlantıyı Test Et
            </button_1.Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <button_1.Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (<>
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Kaydediliyor...
              </>) : (<>
                <lucide_react_1.CheckCircle2 className="mr-2 h-4 w-4"/>
                AI Ayarlarını Kaydet
              </>)}
          </button_1.Button>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=AiSettingsTab.js.map