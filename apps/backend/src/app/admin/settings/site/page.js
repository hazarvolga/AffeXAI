"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SiteSettingsPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const site_settings_data_1 = require("@/lib/site-settings-data");
const actions_1 = require("./actions");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const select_1 = require("@/components/ui/select");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const separator_1 = require("@/components/ui/separator");
const checkbox_1 = require("@/components/ui/checkbox");
const newsletter_data_1 = require("@/lib/newsletter-data");
const scroll_area_1 = require("@/components/ui/scroll-area");
const utils_1 = require("@/lib/utils");
const use_toast_1 = require("@/hooks/use-toast");
const MediaPicker_1 = __importDefault(require("@/components/media/MediaPicker"));
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
const socialIcons = {
    facebook: lucide_react_1.Facebook,
    linkedin: lucide_react_1.Linkedin,
    twitter: lucide_react_1.Twitter,
    youtube: lucide_react_1.Youtube,
    instagram: lucide_react_1.Instagram,
    pinterest: lucide_react_1.Share2,
    tiktok: lucide_react_1.Component,
};
function SaveSettingsButton() {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button_1.Button type="submit" size="lg" disabled={pending}>
      {pending ? <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <lucide_react_1.Save className="mr-2 h-4 w-4"/>}
      Tüm Ayarları Kaydet
    </button_1.Button>);
}
function SiteSettingsPage() {
    // Fetch current settings from backend to ensure we have the latest data
    const [currentSettings, setCurrentSettings] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    // This local state is for UI interactions only (adding/removing social links before saving)
    const [dynamicSocials, setDynamicSocials] = (0, react_1.useState)({});
    const [newSocialPlatform, setNewSocialPlatform] = (0, react_1.useState)('');
    const [useSingleApiKey, setUseSingleApiKey] = (0, react_1.useState)(false);
    const [selectedEmailService, setSelectedEmailService] = (0, react_1.useState)('resend');
    const [templateSearch, setTemplateSearch] = (0, react_1.useState)('');
    const [selectedTemplateId, setSelectedTemplateId] = (0, react_1.useState)(null);
    const { toast } = (0, use_toast_1.useToast)();
    const initialState = { message: '', success: false };
    const [state, formAction] = (0, react_1.useActionState)(actions_1.saveSiteSettings, initialState);
    // Fetch the latest settings from the backend when the component mounts
    (0, react_1.useEffect)(() => {
        const fetchCurrentSettings = async () => {
            try {
                const settings = await settingsService_1.default.getSiteSettings();
                console.log('Fetched settings from backend:', settings);
                setCurrentSettings(settings);
                // Convert socialMedia to the expected format
                const socialMediaFormatted = {};
                if (settings.socialMedia) {
                    for (const [key, value] of Object.entries(settings.socialMedia)) {
                        if (value !== undefined) {
                            socialMediaFormatted[key] = value;
                        }
                    }
                }
                setDynamicSocials(socialMediaFormatted);
            }
            catch (error) {
                console.error('Failed to fetch current settings:', error);
                // Fallback to static data
                console.log('Using fallback static data');
                setCurrentSettings(site_settings_data_1.siteSettingsData);
                setDynamicSocials(site_settings_data_1.siteSettingsData.socialMedia || {});
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCurrentSettings();
    }, []);
    // Use current settings from backend if available, otherwise fallback to static data
    const effectiveSettings = currentSettings || site_settings_data_1.siteSettingsData;
    console.log('Effective settings being used:', effectiveSettings);
    (0, react_1.useEffect)(() => {
        if (state.message) {
            toast({
                title: state.success ? 'Başarılı!' : 'Hata!',
                description: state.message,
                variant: state.success ? 'default' : 'destructive',
            });
            // After successful save, refresh the current settings
            if (state.success) {
                const fetchCurrentSettings = async () => {
                    try {
                        const settings = await settingsService_1.default.getSiteSettings();
                        setCurrentSettings(settings);
                        // Convert socialMedia to the expected format
                        const socialMediaFormatted = {};
                        if (settings.socialMedia) {
                            for (const [key, value] of Object.entries(settings.socialMedia)) {
                                if (value !== undefined) {
                                    socialMediaFormatted[key] = value;
                                }
                            }
                        }
                        setDynamicSocials(socialMediaFormatted);
                    }
                    catch (error) {
                        console.error('Failed to fetch current settings:', error);
                    }
                };
                fetchCurrentSettings();
            }
        }
    }, [state, toast]);
    const handleAddSocialLink = () => {
        if (newSocialPlatform && !(newSocialPlatform in dynamicSocials)) {
            setDynamicSocials(prev => ({
                ...prev,
                [newSocialPlatform]: ''
            }));
            setNewSocialPlatform('');
        }
    };
    const handleRemoveSocialLink = (platformToRemove) => {
        setDynamicSocials(prev => {
            const newSocialMedia = { ...prev };
            delete newSocialMedia[platformToRemove];
            return newSocialMedia;
        });
    };
    const availablePlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'pinterest', 'tiktok'].filter(p => !Object.keys(dynamicSocials).includes(p));
    const filteredTemplates = newsletter_data_1.templates.filter(t => t.name.toLowerCase().includes(templateSearch.toLowerCase()));
    const handleSendTestEmail = () => {
        if (selectedTemplateId) {
            const template = newsletter_data_1.templates.find(t => t.id === selectedTemplateId);
            toast({
                title: 'Test Maili Gönderiliyor',
                description: `"${template?.name}" şablonu için test maili gönderiliyor...`,
            });
        }
    };
    // Show loading state while fetching settings
    if (isLoading) {
        return (<div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Site Ayarları</h1>
                    <p className="text-muted-foreground">
                        Sitenizin genelinde kullanılacak kurumsal bilgileri, logoyu, sosyal medya ve SEO ayarlarını buradan yönetin.
                    </p>
                </div>
                <div className="flex items-center justify-center h-64">
                    <lucide_react_1.Loader2 className="h-8 w-8 animate-spin"/>
                </div>
            </div>);
    }
    return (<div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Site Ayarları</h1>
                <p className="text-muted-foreground">
                    Sitenizin genelinde kullanılacak kurumsal bilgileri, logoyu, sosyal medya ve SEO ayarlarını buradan yönetin.
                </p>
            </div>
            <form action={formAction}>
                 <tabs_1.Tabs defaultValue="company">
                    <tabs_1.TabsList className="grid w-full grid-cols-6">
                        <tabs_1.TabsTrigger value="company">Company</tabs_1.TabsTrigger>
                        <tabs_1.TabsTrigger value="ai">AI</tabs_1.TabsTrigger>
                        <tabs_1.TabsTrigger value="email">Email Settings</tabs_1.TabsTrigger>
                        <tabs_1.TabsTrigger value="social">Social Media</tabs_1.TabsTrigger>
                        <tabs_1.TabsTrigger value="analytics">Analytics</tabs_1.TabsTrigger>
                        <tabs_1.TabsTrigger value="tab6">Tab 6</tabs_1.TabsTrigger>
                    </tabs_1.TabsList>
                    <tabs_1.TabsContent value="company" className="mt-6">
                        <div className="space-y-8">
                            <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle>Kurumsal Kimlik</card_1.CardTitle>
                                    <card_1.CardDescription>Şirket adı ve logosu gibi temel kimlik bilgileri.</card_1.CardDescription>
                                </card_1.CardHeader>
                                <card_1.CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="companyName">Şirket Adı</label_1.Label>
                                            <input_1.Input id="companyName" name="companyName" defaultValue={effectiveSettings.companyName || ''}/>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label_1.Label htmlFor="logoUrl">Logo (Açık Tema)</label_1.Label>
                                                <MediaPicker_1.default value={effectiveSettings.logoUrl?.includes('.') ? effectiveSettings.logoUrl.split('/').pop() : effectiveSettings.logoUrl} onChange={(mediaId) => {
            // Update the hidden input with the media ID
            const input = document.getElementById('logoUrl');
            if (input)
                input.value = mediaId || '';
        }} placeholder="Açık tema logosu seçin"/>
                                                <input_1.Input id="logoUrl" name="logoUrl" defaultValue={effectiveSettings.logoUrl || ''} className="hidden"/>
                                            </div>
                                            <div className="space-y-2">
                                                <label_1.Label htmlFor="logoDarkUrl">Logo (Koyu Tema)</label_1.Label>
                                                <MediaPicker_1.default value={effectiveSettings.logoDarkUrl?.includes('.') ? effectiveSettings.logoDarkUrl.split('/').pop() : effectiveSettings.logoDarkUrl} onChange={(mediaId) => {
            // Update the hidden input with the media ID
            const input = document.getElementById('logoDarkUrl');
            if (input)
                input.value = mediaId || '';
        }} placeholder="Koyu tema logosu seçin"/>
                                                <input_1.Input id="logoDarkUrl" name="logoDarkUrl" defaultValue={effectiveSettings.logoDarkUrl || ''} className="hidden"/>
                                            </div>
                                        </div>
                                    </div>
                                </card_1.CardContent>
                            </card_1.Card>

                            <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle>İletişim ve Adres Bilgileri</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="email">Genel E-posta</label_1.Label>
                                        <input_1.Input id="email" name="email" type="email" defaultValue={effectiveSettings.contact?.email || ''}/>
                                    </div>
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="phone">Genel Telefon</label_1.Label>
                                        <input_1.Input id="phone" name="phone" type="tel" defaultValue={effectiveSettings.contact?.phone || ''}/>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label_1.Label htmlFor="address">Adres</label_1.Label>
                                        <textarea_1.Textarea id="address" name="address" defaultValue={effectiveSettings.contact?.address || ''}/>
                                    </div>
                                </card_1.CardContent>
                            </card_1.Card>
                            
                            <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle>Genel SEO Ayarları</card_1.CardTitle>
                                    <card_1.CardDescription>Arama motorları için sitenizin varsayılan görünümü.</card_1.CardDescription>
                                </card_1.CardHeader>
                                <card_1.CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="defaultTitle">Varsayılan Site Başlığı</label_1.Label>
                                        <input_1.Input id="defaultTitle" name="defaultTitle" defaultValue={effectiveSettings.seo?.defaultTitle || ''}/>
                                    </div>
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor="defaultDescription">Varsayılan Site Açıklaması</label_1.Label>
                                        <textarea_1.Textarea id="defaultDescription" name="defaultDescription" defaultValue={effectiveSettings.seo?.defaultDescription || ''}/>
                                    </div>
                                </card_1.CardContent>
                            </card_1.Card>
                        </div>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="ai" className="mt-6">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Bot className="h-6 w-6 text-primary"/>AI Ayarları</card_1.CardTitle>
                                <card_1.CardDescription>
                                    Projedeki yapay zeka özelliklerinin genel ayarlarını ve varsayılan davranışlarını yönetin.
                                </card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-6">
                                <div className="space-y-8">
                                    <div className="space-y-4 p-4 border rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <checkbox_1.Checkbox id="single-api-key" checked={useSingleApiKey} onCheckedChange={(checked) => setUseSingleApiKey(Boolean(checked))}/>
                                            <label_1.Label htmlFor="single-api-key">Tüm modüller için tek bir API anahtarı kullan</label_1.Label>
                                        </div>
                                        <div className="space-y-2">
                                            <label_1.Label htmlFor="global-api-key" className="sr-only">Global API Key</label_1.Label>
                                            <input_1.Input id="global-api-key" placeholder="Global API Anahtarını Girin" icon={lucide_react_1.KeyRound} disabled={!useSingleApiKey}/>
                                        </div>
                                    </div>

                                    <separator_1.Separator />
                                    
                                    <div className="space-y-4 p-4 border rounded-lg">
                                        <h3 className="font-semibold text-lg">Social Media</h3>
                                        <div className="grid md:grid-cols-3 gap-4 items-end">
                                            <div className="md:col-span-2 space-y-2">
                                                <label_1.Label htmlFor="social-api-key">API Key</label_1.Label>
                                                <input_1.Input id="social-api-key" placeholder="API Anahtarını Girin" icon={lucide_react_1.KeyRound} disabled={useSingleApiKey}/>
                                            </div>
                                            <div className="space-y-2">
                                                 <label_1.Label htmlFor="social-model">Model Seçimi</label_1.Label>
                                                 <select_1.Select>
                                                    <select_1.SelectTrigger id="social-model"><select_1.SelectValue placeholder="Model seçin..."/></select_1.SelectTrigger>
                                                    <select_1.SelectContent>
                                                        <select_1.SelectItem value="local">Local</select_1.SelectItem>
                                                        <select_1.SelectItem value="api">API</select_1.SelectItem>
                                                    </select_1.SelectContent>
                                                </select_1.Select>
                                            </div>
                                        </div>
                                        <button_1.Button variant="outline" type="button" className="w-full md:w-auto"><lucide_react_1.TestTube2 className="mr-2"/>Bağlantıyı Test Et</button_1.Button>
                                    </div>
                                     <separator_1.Separator />
                                     <div className="space-y-4 p-4 border rounded-lg">
                                        <h3 className="font-semibold text-lg">Email Marketing</h3>
                                        <div className="grid md:grid-cols-3 gap-4 items-end">
                                            <div className="md:col-span-2 space-y-2">
                                                <label_1.Label htmlFor="email-api-key">API Key</label_1.Label>
                                                <input_1.Input id="email-api-key" placeholder="API Anahtarını Girin" icon={lucide_react_1.KeyRound} disabled={useSingleApiKey}/>
                                            </div>
                                            <div className="space-y-2">
                                                 <label_1.Label htmlFor="email-model">Model Seçimi</label_1.Label>
                                                 <select_1.Select>
                                                    <select_1.SelectTrigger id="email-model"><select_1.SelectValue placeholder="Model seçin..."/></select_1.SelectTrigger>
                                                    <select_1.SelectContent>
                                                        <select_1.SelectItem value="local">Local</select_1.SelectItem>
                                                        <select_1.SelectItem value="api">API</select_1.SelectItem>
                                                    </select_1.SelectContent>
                                                </select_1.Select>
                                            </div>
                                        </div>
                                         <button_1.Button variant="outline" type="button" className="w-full md:w-auto"><lucide_react_1.TestTube2 className="mr-2"/>Modeli Test Et</button_1.Button>
                                    </div>
                                     <separator_1.Separator />
                                      <div className="space-y-4 p-4 border rounded-lg">
                                        <h3 className="font-semibold text-lg">Support Chatbot</h3>
                                        <div className="grid md:grid-cols-3 gap-4 items-end">
                                            <div className="md:col-span-2 space-y-2">
                                                <label_1.Label htmlFor="support-api-key">API Key</label_1.Label>
                                                <input_1.Input id="support-api-key" placeholder="API Anahtarını Girin" icon={lucide_react_1.KeyRound} disabled={useSingleApiKey}/>
                                            </div>
                                            <div className="space-y-2">
                                                 <label_1.Label htmlFor="support-model">Model Seçimi</label_1.Label>
                                                 <select_1.Select>
                                                    <select_1.SelectTrigger id="support-model"><select_1.SelectValue placeholder="Model seçin..."/></select_1.SelectTrigger>
                                                    <select_1.SelectContent>
                                                        <select_1.SelectItem value="local">Local</select_1.SelectItem>
                                                        <select_1.SelectItem value="api">API</select_1.SelectItem>
                                                    </select_1.SelectContent>
                                                </select_1.Select>
                                            </div>
                                        </div>
                                         <button_1.Button variant="outline" type="button" className="w-full md:w-auto"><lucide_react_1.TestTube2 className="mr-2"/>Bağlantıyı Test Et</button_1.Button>
                                    </div>
                                     <separator_1.Separator />
                                    <div className="space-y-4 p-4 border rounded-lg">
                                        <h3 className="font-semibold text-lg">Analytics (opsiyonel)</h3>
                                        <div className="grid md:grid-cols-3 gap-4 items-end">
                                            <div className="md:col-span-2 space-y-2">
                                                <label_1.Label htmlFor="analytics-api-key">API Key</label_1.Label>
                                                <input_1.Input id="analytics-api-key" placeholder="API Anahtarını Girin" icon={lucide_react_1.KeyRound} disabled={useSingleApiKey}/>
                                            </div>
                                            <div className="space-y-2">
                                                 <label_1.Label htmlFor="analytics-model">Model Seçimi</label_1.Label>
                                                 <select_1.Select>
                                                    <select_1.SelectTrigger id="analytics-model"><select_1.SelectValue placeholder="Model seçin..."/></select_1.SelectTrigger>
                                                    <select_1.SelectContent>
                                                        <select_1.SelectItem value="local">Local</select_1.SelectItem>
                                                        <select_1.SelectItem value="api">API</select_1.SelectItem>
                                                    </select_1.SelectContent>
                                                </select_1.Select>
                                            </div>
                                        </div>
                                         <button_1.Button variant="outline" type="button" className="w-full md:w-auto"><lucide_react_1.TestTube2 className="mr-2"/>Bağlantıyı Test Et</button_1.Button>
                                    </div>
                                </div>
                            </card_1.CardContent>
                        </card_1.Card>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="email" className="mt-6">
                         <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>Email Ayarları</card_1.CardTitle>
                                <card_1.CardDescription>Sistem tarafından gönderilecek e-postalar için varsayılan servisi ve ayarları yapılandırın.</card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-8">
                                <div className="space-y-2">
                                    <label_1.Label htmlFor="default-email-service">Varsayılan Email Servisi</label_1.Label>
                                    <select_1.Select value={selectedEmailService} onValueChange={setSelectedEmailService}>
                                        <select_1.SelectTrigger id="default-email-service" className="w-full md:w-1/3">
                                            <select_1.SelectValue />
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                            <select_1.SelectItem value="resend">Resend</select_1.SelectItem>
                                            <select_1.SelectItem value="sendgrid">SendGrid</select_1.SelectItem>
                                            <select_1.SelectItem value="postmark">Postmark</select_1.SelectItem>
                                            <select_1.SelectItem value="mailgun">Mailgun</select_1.SelectItem>
                                            <select_1.SelectItem value="ses">Amazon SES</select_1.SelectItem>
                                            <select_1.SelectItem value="gmail">Gmail SMTP</select_1.SelectItem>
                                            <select_1.SelectItem value="smtp">SMTP (Özel)</select_1.SelectItem>
                                        </select_1.SelectContent>
                                    </select_1.Select>
                                </div>
                                
                                <separator_1.Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4">API Anahtarları ve Yapılandırma</h3>
                                    <div className="space-y-4">
                                        {selectedEmailService === 'resend' && (<div className="space-y-2">
                                                <label_1.Label htmlFor="resend-api-key">Resend API Key</label_1.Label>
                                                <input_1.Input id="resend-api-key" placeholder="re_..." icon={lucide_react_1.KeyRound}/>
                                            </div>)}
                                        {selectedEmailService === 'sendgrid' && (<div className="space-y-2">
                                                <label_1.Label htmlFor="sendgrid-api-key">SendGrid API Key</label_1.Label>
                                                <input_1.Input id="sendgrid-api-key" placeholder="SG..." icon={lucide_react_1.KeyRound}/>
                                            </div>)}
                                         {selectedEmailService === 'postmark' && (<div className="space-y-2">
                                                <label_1.Label htmlFor="postmark-api-key">Postmark API Key</label_1.Label>
                                                <input_1.Input id="postmark-api-key" placeholder="..." icon={lucide_react_1.KeyRound}/>
                                            </div>)}
                                        {selectedEmailService === 'mailgun' && (<div className="space-y-2">
                                                <label_1.Label htmlFor="mailgun-api-key">Mailgun API Key</label_1.Label>
                                                <input_1.Input id="mailgun-api-key" placeholder="key-..." icon={lucide_react_1.KeyRound}/>
                                            </div>)}
                                        {selectedEmailService === 'ses' && (<div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label_1.Label htmlFor="ses-access-key">Amazon SES Access Key</label_1.Label>
                                                    <input_1.Input id="ses-access-key" placeholder="AKIA..." icon={lucide_react_1.KeyRound}/>
                                                </div>
                                                <div className="space-y-2">
                                                    <label_1.Label htmlFor="ses-secret-key">Amazon SES Secret Key</label_1.Label>
                                                    <input_1.Input id="ses-secret-key" type="password" icon={lucide_react_1.KeyRound}/>
                                                </div>
                                            </div>)}
                                         {selectedEmailService === 'gmail' && (<div className="space-y-2">
                                                <label_1.Label htmlFor="gmail-app-pass">Gmail App Password</label_1.Label>
                                                <input_1.Input id="gmail-app-pass" type="password" placeholder="Google Hesabından oluşturulan uygulama şifresi" icon={lucide_react_1.KeyRound}/>
                                            </div>)}
                                         {selectedEmailService === 'smtp' && (<card_1.Card className="bg-secondary/50 p-4">
                                                <card_1.CardHeader className="p-2">
                                                    <card_1.CardTitle>Özel SMTP Ayarları</card_1.CardTitle>
                                                </card_1.CardHeader>
                                                 <card_1.CardContent className="p-2 space-y-4">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-host">Host</label_1.Label><input_1.Input id="smtp-host" placeholder="smtp.example.com"/></div>
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-port">Port</label_1.Label><input_1.Input id="smtp-port" placeholder="587"/></div>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-user">Username</label_1.Label><input_1.Input id="smtp-user" placeholder="user@example.com"/></div>
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-pass">Password</label_1.Label><input_1.Input id="smtp-pass" type="password"/></div>
                                                    </div>
                                                     <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-from-name">From Name</label_1.Label><input_1.Input id="smtp-from-name" defaultValue={effectiveSettings.companyName}/></div>
                                                        <div className="space-y-2"><label_1.Label htmlFor="smtp-from-email">From Email</label_1.Label><input_1.Input id="smtp-from-email" defaultValue={effectiveSettings.contact?.email}/></div>
                                                    </div>
                                                 </card_1.CardContent>
                                             </card_1.Card>)}
                                    </div>
                                </div>
                                
                                <separator_1.Separator />

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Varsayılan Şablonlar</h3>
                                    <div className="space-y-4">
                                        <input_1.Input placeholder="Şablon ara..." icon={lucide_react_1.Search} value={templateSearch} onChange={(e) => setTemplateSearch(e.target.value)}/>
                                        <scroll_area_1.ScrollArea className="h-60 w-full rounded-md border p-2">
                                            <div className="space-y-1">
                                                {filteredTemplates.length > 0 ? filteredTemplates.map(template => (<div key={template.id} className={(0, utils_1.cn)("p-2 rounded-md hover:bg-muted text-sm cursor-pointer", selectedTemplateId === template.id && "bg-primary/10 text-primary font-semibold")} onClick={() => setSelectedTemplateId(template.id)}>
                                                        {template.name}
                                                    </div>)) : (<p className="p-2 text-sm text-muted-foreground text-center">Şablon bulunamadı.</p>)}
                                            </div>
                                        </scroll_area_1.ScrollArea>
                                    </div>
                                </div>
                            </card_1.CardContent>
                             <card_1.CardFooter className="flex justify-between items-center">
                                <button_1.Button type="button" variant="outline" onClick={handleSendTestEmail} disabled={!selectedTemplateId}>
                                    <lucide_react_1.Mail className="mr-2"/> Test Maili Gönder
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="social" className="mt-6">
                        <div className="space-y-8">
                            <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle>Sosyal Medya Hesapları</card_1.CardTitle>
                                    <card_1.CardDescription>Kullanıcıların sitenizde göreceği sosyal medya linklerini yönetin.</card_1.CardDescription>
                                </card_1.CardHeader>
                                <card_1.CardContent className="space-y-4">
                                    {Object.entries(dynamicSocials).map(([platform, url]) => {
            const Icon = socialIcons[platform] || lucide_react_1.Link2;
            return (<div key={platform} className="flex items-center gap-2">
                                                <div className="relative flex-grow flex items-center">
                                                    <Icon className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                                    <input_1.Input id={`social-${platform}`} name={`social-${platform}`} defaultValue={url || ''} className="pl-10" placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}/>
                                                </div>
                                                <button_1.Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemoveSocialLink(platform)}>
                                                    <lucide_react_1.Trash2 className="h-4 w-4"/>
                                                    <span className="sr-only">{platform} hesabını sil</span>
                                                </button_1.Button>
                                            </div>);
        })}
                                    <div className="flex items-center gap-2 pt-4 border-t">
                                        <select_1.Select value={newSocialPlatform} onValueChange={setNewSocialPlatform}>
                                            <select_1.SelectTrigger className="flex-grow">
                                                <select_1.SelectValue placeholder="Eklemek için bir platform seçin..."/>
                                            </select_1.SelectTrigger>
                                            <select_1.SelectContent>
                                                {availablePlatforms.map(platform => (<select_1.SelectItem key={platform} value={platform}>
                                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                    </select_1.SelectItem>))}
                                            </select_1.SelectContent>
                                        </select_1.Select>
                                        <button_1.Button type="button" onClick={handleAddSocialLink} disabled={!newSocialPlatform}>
                                            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Ekle
                                        </button_1.Button>
                                    </div>
                                </card_1.CardContent>
                            </card_1.Card>
                            <card_1.Card>
                                 <card_1.CardHeader>
                                    <card_1.CardTitle>1. Varsayılan Platform</card_1.CardTitle>
                                    <card_1.CardDescription>Yeni AI önerilen gönderiler varsayılan olarak bu platforma hazırlanır.</card_1.CardDescription>
                                </card_1.CardHeader>
                                <card_1.CardContent>
                                    <select_1.Select defaultValue="twitter">
                                        <select_1.SelectTrigger className="w-full md:w-1/2">
                                            <select_1.SelectValue />
                                        </select_1.SelectTrigger>
                                        <select_1.SelectContent>
                                            <select_1.SelectItem value="twitter">Twitter</select_1.SelectItem>
                                            <select_1.SelectItem value="linkedin">LinkedIn</select_1.SelectItem>
                                            <select_1.SelectItem value="instagram">Instagram</select_1.SelectItem>
                                            <select_1.SelectItem value="facebook">Facebook</select_1.SelectItem>
                                            <select_1.SelectItem value="tiktok">TikTok</select_1.SelectItem>
                                        </select_1.SelectContent>
                                    </select_1.Select>
                                </card_1.CardContent>
                            </card_1.Card>
                        </div>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="analytics" className="mt-6">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>Analytics Ayarları</card_1.CardTitle>
                                <card_1.CardDescription>Google Analytics gibi izleme araçları için yapılandırmalar.</card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-6">
                                <alert_1.Alert>
                                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                                    <alert_1.AlertTitle>Dikkat</alert_1.AlertTitle>
                                    <alert_1.AlertDescription>
                                        Analytics yapılandırmaları henüz tamamlanmadı. Lütfen daha sonra tekrar kontrol edin.
                                    </alert_1.AlertDescription>
                                </alert_1.Alert>
                            </card_1.CardContent>
                        </card_1.Card>
                    </tabs_1.TabsContent>
                    <tabs_1.TabsContent value="tab6" className="mt-6">
                        <card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>Tab 6</card_1.CardTitle>
                                <card_1.CardDescription>Ek ayarlar ve yapılandırmalar.</card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-6">
                                <alert_1.Alert>
                                    <lucide_react_1.AlertCircle className="h-4 w-4"/>
                                    <alert_1.AlertTitle>Dikkat</alert_1.AlertTitle>
                                    <alert_1.AlertDescription>
                                        Bu sekme henüz yapılandırılmadı. Lütfen daha sonra tekrar kontrol edin.
                                    </alert_1.AlertDescription>
                                </alert_1.Alert>
                            </card_1.CardContent>
                        </card_1.Card>
                    </tabs_1.TabsContent>
                </tabs_1.Tabs>
                <card_1.Card className="mt-8">
                    <card_1.CardFooter className="flex justify-end">
                        <SaveSettingsButton />
                    </card_1.CardFooter>
                </card_1.Card>
            </form>
        </div>);
}
//# sourceMappingURL=page.js.map