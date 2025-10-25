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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewSupportTicketPage;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const react_dom_1 = require("react-dom");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const textarea_1 = require("@/components/ui/textarea");
const input_1 = require("@/components/ui/input");
const tabs_1 = require("@/components/ui/tabs");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const actions_1 = require("./actions");
const alert_1 = require("@/components/ui/alert");
const ticketsService_1 = require("@/lib/api/ticketsService");
const api_1 = require("@/lib/api");
const use_toast_1 = require("@/hooks/use-toast");
const chatbox_1 = require("@/components/support/chatbox");
const support_page_module_css_1 = __importDefault(require("./support-page.module.css"));
const utils_1 = require("@/lib/utils");
const renderCategoryOptions = (categories, parentId = null, level = 0) => {
    const options = [];
    const children = categories.filter(c => c.parentId === parentId);
    for (const category of children) {
        options.push(<select_1.SelectItem key={category.id} value={category.id} style={{ paddingLeft: `${level * 1.5 + 1}rem` }}>
        {category.name}
      </select_1.SelectItem>);
        if (categories.some(c => c.parentId === category.id)) {
            options.push(...renderCategoryOptions(categories, category.id, level + 1));
        }
    }
    return options;
};
function SubmitButton() {
    const { pending } = (0, react_dom_1.useFormStatus)();
    return (<button_1.Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (<>
          <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Analiz Ediliyor...
        </>) : (<>
          <lucide_react_1.Lightbulb className="mr-2 h-4 w-4"/> Analiz Et ve Devam Et
        </>)}
    </button_1.Button>);
}
function NewSupportTicketPage() {
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [loadingCategories, setLoadingCategories] = (0, react_1.useState)(true);
    const [activeTab, setActiveTab] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('support-active-tab') || 'form';
        }
        return 'form';
    });
    const [isChatVisible, setIsChatVisible] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('support-chat-visible') === 'true';
        }
        return false;
    });
    const [isChatMinimized, setIsChatMinimized] = (0, react_1.useState)(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('support-chat-minimized') === 'true';
        }
        return false;
    });
    const [chatSession, setChatSession] = (0, react_1.useState)(null);
    const initialState = {
        step: 1,
        message: '',
    };
    const [state, formAction] = (0, react_dom_1.useFormState)(actions_1.analyzeSupportTicket, initialState);
    (0, react_1.useEffect)(() => {
        loadCategories();
    }, []);
    (0, react_1.useEffect)(() => {
        // Check if ticket was created successfully
        if (state.ticketCreated && state.ticketId) {
            toast({
                title: 'Başarılı! 🎉',
                description: 'Destek talebiniz başarıyla oluşturuldu. Yönlendiriliyorsunuz...',
            });
            setTimeout(() => {
                router.push(`/portal/support/${state.ticketId}`);
            }, 1500);
        }
    }, [state.ticketCreated, state.ticketId, router, toast]);
    const loadCategories = async () => {
        try {
            if (!api_1.authService.isAuthenticated()) {
                router.push('/login');
                return;
            }
            const data = await ticketsService_1.ticketsService.getCategories();
            setCategories(data);
        }
        catch (error) {
            console.error('Error loading categories:', error);
            toast({
                title: 'Hata',
                description: 'Kategoriler yüklenirken bir hata oluştu',
                variant: 'destructive',
            });
        }
        finally {
            setLoadingCategories(false);
        }
    };
    const handleChatSessionCreate = (session) => {
        setChatSession(session);
        console.log('Chat session created:', session);
    };
    const handleChatMessageSent = (message) => {
        console.log('Chat message sent:', message);
    };
    const toggleChatVisibility = () => {
        const newVisibility = !isChatVisible;
        setIsChatVisible(newVisibility);
        localStorage.setItem('support-chat-visible', newVisibility.toString());
        if (newVisibility) {
            setIsChatMinimized(false);
            localStorage.setItem('support-chat-minimized', 'false');
            if (activeTab === 'form') {
                setActiveTab('both');
                localStorage.setItem('support-active-tab', 'both');
            }
        }
        else {
            if (activeTab === 'both') {
                setActiveTab('form');
                localStorage.setItem('support-active-tab', 'form');
            }
        }
    };
    const toggleChatMinimized = () => {
        const newMinimized = !isChatMinimized;
        setIsChatMinimized(newMinimized);
        localStorage.setItem('support-chat-minimized', newMinimized.toString());
    };
    const handleTabChange = (value) => {
        const newTab = value;
        setActiveTab(newTab);
        localStorage.setItem('support-active-tab', newTab);
        // Auto-show chat when switching to chat or both tabs
        if ((newTab === 'chat' || newTab === 'both') && !isChatVisible) {
            setIsChatVisible(true);
            localStorage.setItem('support-chat-visible', 'true');
        }
        // Auto-minimize chat when switching to form only
        if (newTab === 'form' && isChatVisible) {
            setIsChatVisible(false);
            localStorage.setItem('support-chat-visible', 'false');
        }
    };
    return (<div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Destek Merkezi</h2>
          <p className="text-muted-foreground">
            Sorunuzu çözmek için destek talebi oluşturun veya AI asistanımızla sohbet edin.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant={activeTab === 'both' ? "default" : "outline"} onClick={() => handleTabChange(activeTab === 'both' ? 'form' : 'both')} className="flex items-center space-x-2">
            <lucide_react_1.MessageCircle className="h-4 w-4"/>
            <span>{activeTab === 'both' ? 'Yan Yana Görünüm' : 'Form + Chat'}</span>
          </button_1.Button>
          <button_1.Button variant={isChatVisible ? "default" : "outline"} onClick={toggleChatVisibility} className="flex items-center space-x-2">
            {isChatVisible ? <lucide_react_1.EyeOff className="h-4 w-4"/> : <lucide_react_1.Eye className="h-4 w-4"/>}
            <span>{isChatVisible ? 'Chat\'i Gizle' : 'AI Chat\'i Göster'}</span>
          </button_1.Button>
        </div>
      </div>

      {/* Support Options Tabs */}
      <tabs_1.Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <tabs_1.TabsList className={`w-full ${support_page_module_css_1.default.mobileTabsGrid}`}>
          <tabs_1.TabsTrigger value="form" className={support_page_module_css_1.default.tabTrigger}>
            <lucide_react_1.FileText className="h-4 w-4"/>
            <span>Destek Formu</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="chat" className={support_page_module_css_1.default.tabTrigger}>
            <lucide_react_1.MessageCircle className="h-4 w-4"/>
            <span>AI Sohbet</span>
            {chatSession && (<badge_1.Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                Aktif
              </badge_1.Badge>)}
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="both" className={support_page_module_css_1.default.tabTrigger}>
            <div className="flex items-center space-x-1">
              <lucide_react_1.FileText className="h-3 w-3"/>
              <lucide_react_1.MessageCircle className="h-3 w-3"/>
            </div>
            <span>Yan Yana</span>
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Form Tab Content */}
        <tabs_1.TabsContent value="form" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <card_1.Card>
        {state.step === 1 && (<form action={formAction}>
            <card_1.CardHeader>
              <card_1.CardTitle>1. Adım: Sorununuzu Anlatın</card_1.CardTitle>
              <card_1.CardDescription>
                Lütfen sorununuzu olabildiğince ayrıntılı açıklayın. AI,
                destek ekibimiz için bir özet oluşturacaktır.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label_1.Label htmlFor="title">Başlık *</label_1.Label>
                  <input_1.Input id="title" name="title" placeholder="Kısa ve öz bir başlık yazın" required minLength={10} maxLength={100}/>
                </div>
                <div className="space-y-2">
                  <label_1.Label htmlFor="category">Kategori *</label_1.Label>
                  <select_1.Select name="category" required disabled={loadingCategories}>
                    <select_1.SelectTrigger id="category">
                      <select_1.SelectValue placeholder={loadingCategories ? "Yükleniyor..." : "Bir kategori seçin"}/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      {renderCategoryOptions(categories)}
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="problemDescription">Açıklama *</label_1.Label>
                <textarea_1.Textarea id="problemDescription" name="problemDescription" placeholder="Yaşadığınız sorunu detaylı bir şekilde anlatın... Hangi işletim sistemini kullanıyorsunuz, hangi adımları izlediniz ve neyle karşılaştınız?" className="min-h-[250px]" required minLength={50}/>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label_1.Label htmlFor="priority">Öncelik *</label_1.Label>
                  <select_1.Select name="priority" defaultValue="medium" required>
                    <select_1.SelectTrigger id="priority">
                      <select_1.SelectValue />
                    </select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="low">Düşük</select_1.SelectItem>
                      <select_1.SelectItem value="medium">Orta</select_1.SelectItem>
                      <select_1.SelectItem value="high">Yüksek</select_1.SelectItem>
                      <select_1.SelectItem value="urgent">Acil</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </div>
            </card_1.CardContent>
            <card_1.CardFooter className="flex flex-col items-end gap-4">
              {state.message && !state.data && (<alert_1.Alert variant="destructive" className="w-full">
                  <alert_1.AlertTitle>Hata</alert_1.AlertTitle>
                  <alert_1.AlertDescription>{state.message}</alert_1.AlertDescription>
                </alert_1.Alert>)}
              <SubmitButton />
            </card_1.CardFooter>
          </form>)}

        {state.step === 2 && state.data && (<div>
            <card_1.CardHeader>
              <card_1.CardTitle>2. Adım: AI Analizi ve Onay</card_1.CardTitle>
              <card_1.CardDescription>
                Yapay zeka sorununuzu analiz etti. Devam etmeden önce lütfen
                aşağıdaki bilgileri inceleyin.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-6">
              <alert_1.Alert variant="default" className="bg-blue-50 border-blue-200">
                <lucide_react_1.Lightbulb className="h-4 w-4 !text-blue-600"/>
                <alert_1.AlertTitle className="text-blue-800">
                  AI Çözüm Önerisi
                </alert_1.AlertTitle>
                <alert_1.AlertDescription className="text-blue-700">
                  {state.data.suggestion}
                </alert_1.AlertDescription>
              </alert_1.Alert>

              <card_1.Card className="bg-secondary/50">
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">
                    Destek Ekibi İçin Oluşturulan Özet
                  </card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                  <div>
                    <label_1.Label className="font-semibold">Problem Özeti</label_1.Label>
                    <p className="text-sm text-muted-foreground">
                      {state.data.summary}
                    </p>
                  </div>
                  <div>
                    <label_1.Label className="font-semibold">AI Tarafından Önerilen Öncelik</label_1.Label>
                     <p className="text-sm font-semibold text-primary">
                      {state.data.priority}
                    </p>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </card_1.CardContent>
            <card_1.CardFooter className="flex justify-end gap-2">
                <form action={formAction}>
                    {/* Hidden fields to pass data to the next step */}
                    <input type="hidden" name="title" value={state.originalInput?.title}/>
                    <input type="hidden" name="problemDescription" value={state.originalInput?.problemDescription}/>
                    <input type="hidden" name="category" value={state.originalInput?.category}/>
                    <input type="hidden" name="priority" value={state.originalInput?.priority}/>
                    <input type="hidden" name="summary" value={state.data.summary}/>
                    <input type="hidden" name="aiPriority" value={state.data.priority}/>
                    <div className="flex gap-2">
                      <button_1.Button variant="outline" type="submit" name="action" value="back">
                          Geri Dön ve Düzenle
                      </button_1.Button>
                      <button_1.Button type="submit" name="action" value="create_ticket" disabled={state.creating}>
                          {state.creating ? (<>
                              <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                              Oluşturuluyor...
                            </>) : (<>
                              <lucide_react_1.ClipboardCheck className="mr-2 h-4 w-4"/>
                              Destek Talebi Oluştur
                            </>)}
                      </button_1.Button>
                    </div>
                </form>
            </card_1.CardFooter>
          </div>)}
      </card_1.Card>
            </div>

            {/* Sidebar with Tips */}
            <div className="space-y-6">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg flex items-center space-x-2">
                    <lucide_react_1.Lightbulb className="h-5 w-5 text-yellow-500"/>
                    <span>Hızlı Çözüm İpuçları</span>
                  </card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Sık Karşılaşılan Sorunlar</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Giriş yapma sorunları</li>
                      <li>• Şifre sıfırlama</li>
                      <li>• Hesap ayarları</li>
                      <li>• Fatura ve ödeme</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <button_1.Button variant="outline" size="sm" onClick={() => setActiveTab('chat')} className="w-full">
                      <lucide_react_1.MessageCircle className="h-4 w-4 mr-2"/>
                      AI Asistanla Sohbet Et
                    </button_1.Button>
                  </div>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Form Doldurma İpuçları</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <p><strong>Başlık:</strong> Sorununuzu özetleyen kısa bir başlık yazın</p>
                    <p><strong>Kategori:</strong> Sorununuza en uygun kategoriyi seçin</p>
                    <p><strong>Açıklama:</strong> Sorunu detaylı açıklayın, hangi adımları izlediğinizi belirtin</p>
                    <p><strong>Öncelik:</strong> Sorununuzun aciliyet durumunu belirleyin</p>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </div>
          </div>
        </tabs_1.TabsContent>

        {/* Chat Tab Content */}
        <tabs_1.TabsContent value="chat" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <card_1.Card className="h-[500px] md:h-[600px] lg:h-[700px] flex flex-col">
                <card_1.CardHeader className="pb-3">
                  <card_1.CardTitle className="flex items-center space-x-2">
                    <lucide_react_1.MessageCircle className="h-5 w-5"/>
                    <span>AI Destek Asistanı</span>
                    {chatSession && (<badge_1.Badge variant="outline" className="ml-2">
                        Oturum: {chatSession.id.slice(0, 8)}...
                      </badge_1.Badge>)}
                  </card_1.CardTitle>
                  <card_1.CardDescription>
                    Sorularınızı AI asistanımıza sorun. Gerektiğinde destek ekibine yönlendirebilir.
                  </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="flex-1 p-0">
                  {/* Chat component will be embedded here */}
                  <div className="h-full relative">
                    <chatbox_1.ChatBox sessionType="support" onSessionCreate={handleChatSessionCreate} onMessageSent={handleChatMessageSent} embedded={true} showHeader={false} height="100%" className="w-full h-full"/>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </div>

            {/* Chat Sidebar */}
            <div className="space-y-6 hidden lg:block">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Sohbet Özellikleri</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time yanıtlar</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Dosya yükleme</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">URL paylaşma</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Destek ekibine yönlendirme</span>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Hızlı Başlangıç</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Örnek Sorular:</h4>
                    <div className="space-y-1">
                      <button_1.Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2" onClick={() => {
            // This would send a predefined message to chat
            console.log('Quick question clicked');
        }}>
                        <span className="text-xs">"Hesabıma giriş yapamıyorum"</span>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2" onClick={() => {
            console.log('Quick question clicked');
        }}>
                        <span className="text-xs">"Şifremi nasıl sıfırlarım?"</span>
                      </button_1.Button>
                      <button_1.Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2" onClick={() => {
            console.log('Quick question clicked');
        }}>
                        <span className="text-xs">"Fatura ile ilgili sorum var"</span>
                      </button_1.Button>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Destek Seçenekleri</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-3">
                  <button_1.Button variant="outline" size="sm" onClick={() => setActiveTab('form')} className="w-full">
                    <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
                    Forma Geç
                  </button_1.Button>
                  <div className="text-xs text-muted-foreground">
                    Karmaşık sorunlar için detaylı form kullanabilirsiniz.
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </div>
          </div>

          {/* Mobile Chat Info */}
          <div className="lg:hidden mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <card_1.Card>
              <card_1.CardHeader className="pb-3">
                <card_1.CardTitle className="text-base">Sohbet Özellikleri</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Dosya yükleme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>URL paylaşma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Destek yönlendirme</span>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="pb-3">
                <card_1.CardTitle className="text-base">Hızlı Geçiş</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <button_1.Button variant="outline" size="sm" onClick={() => setActiveTab('form')} className="w-full">
                  <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
                  Forma Geç
                </button_1.Button>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>

        {/* Side-by-Side Tab Content */}
        <tabs_1.TabsContent value="both" className="mt-6">
          <div className={support_page_module_css_1.default.sideBySideContainer}>
            {/* Form Section */}
            <div className={support_page_module_css_1.default.formSection}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <lucide_react_1.FileText className="h-5 w-5"/>
                  <span>Destek Talebi Formu</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detaylı destek talebi oluşturun
                </p>
              </div>
              
              <card_1.Card className="flex-1 overflow-auto">
                {state.step === 1 && (<form action={formAction}>
                    <card_1.CardHeader>
                      <card_1.CardTitle className="text-base">Sorununuzu Anlatın</card_1.CardTitle>
                      <card_1.CardDescription className="text-sm">
                        Lütfen sorununuzu olabildiğince ayrıntılı açıklayın.
                      </card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label_1.Label htmlFor="title-both">Başlık *</label_1.Label>
                        <input_1.Input id="title-both" name="title" placeholder="Kısa ve öz bir başlık yazın" required minLength={10} maxLength={100}/>
                      </div>
                      <div className="space-y-2">
                        <label_1.Label htmlFor="category-both">Kategori *</label_1.Label>
                        <select_1.Select name="category" required disabled={loadingCategories}>
                          <select_1.SelectTrigger id="category-both">
                            <select_1.SelectValue placeholder={loadingCategories ? "Yükleniyor..." : "Bir kategori seçin"}/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            {renderCategoryOptions(categories)}
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>
                      <div className="space-y-2">
                        <label_1.Label htmlFor="problemDescription-both">Açıklama *</label_1.Label>
                        <textarea_1.Textarea id="problemDescription-both" name="problemDescription" placeholder="Yaşadığınız sorunu detaylı bir şekilde anlatın..." className="min-h-[200px]" required minLength={50}/>
                      </div>
                      <div className="space-y-2">
                        <label_1.Label htmlFor="priority-both">Öncelik *</label_1.Label>
                        <select_1.Select name="priority" defaultValue="medium" required>
                          <select_1.SelectTrigger id="priority-both">
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="low">Düşük</select_1.SelectItem>
                            <select_1.SelectItem value="medium">Orta</select_1.SelectItem>
                            <select_1.SelectItem value="high">Yüksek</select_1.SelectItem>
                            <select_1.SelectItem value="urgent">Acil</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>
                    </card_1.CardContent>
                    <card_1.CardFooter className="flex flex-col gap-4">
                      {state.message && !state.data && (<alert_1.Alert variant="destructive" className="w-full">
                          <alert_1.AlertTitle>Hata</alert_1.AlertTitle>
                          <alert_1.AlertDescription>{state.message}</alert_1.AlertDescription>
                        </alert_1.Alert>)}
                      <SubmitButton />
                    </card_1.CardFooter>
                  </form>)}

                {state.step === 2 && state.data && (<div>
                    <card_1.CardHeader>
                      <card_1.CardTitle className="text-base">AI Analizi ve Onay</card_1.CardTitle>
                      <card_1.CardDescription className="text-sm">
                        Yapay zeka sorununuzu analiz etti. Lütfen inceleyin.
                      </card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                      <alert_1.Alert variant="default" className="bg-blue-50 border-blue-200">
                        <lucide_react_1.Lightbulb className="h-4 w-4 !text-blue-600"/>
                        <alert_1.AlertTitle className="text-blue-800 text-sm">
                          AI Çözüm Önerisi
                        </alert_1.AlertTitle>
                        <alert_1.AlertDescription className="text-blue-700 text-sm">
                          {state.data.suggestion}
                        </alert_1.AlertDescription>
                      </alert_1.Alert>

                      <card_1.Card className="bg-secondary/50">
                        <card_1.CardHeader>
                          <card_1.CardTitle className="text-base">
                            Destek Ekibi İçin Özet
                          </card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-3">
                          <div>
                            <label_1.Label className="font-semibold text-sm">Problem Özeti</label_1.Label>
                            <p className="text-xs text-muted-foreground">
                              {state.data.summary}
                            </p>
                          </div>
                          <div>
                            <label_1.Label className="font-semibold text-sm">Önerilen Öncelik</label_1.Label>
                             <p className="text-xs font-semibold text-primary">
                              {state.data.priority}
                            </p>
                          </div>
                        </card_1.CardContent>
                      </card_1.Card>
                    </card_1.CardContent>
                    <card_1.CardFooter className="flex justify-end gap-2">
                        <form action={formAction}>
                            {/* Hidden fields to pass data to the next step */}
                            <input type="hidden" name="title" value={state.originalInput?.title}/>
                            <input type="hidden" name="problemDescription" value={state.originalInput?.problemDescription}/>
                            <input type="hidden" name="category" value={state.originalInput?.category}/>
                            <input type="hidden" name="priority" value={state.originalInput?.priority}/>
                            <input type="hidden" name="summary" value={state.data.summary}/>
                            <input type="hidden" name="aiPriority" value={state.data.priority}/>
                            <div className="flex gap-2">
                              <button_1.Button variant="outline" type="submit" name="action" value="back" size="sm">
                                  Geri Dön
                              </button_1.Button>
                              <button_1.Button type="submit" name="action" value="create_ticket" disabled={state.creating} size="sm">
                                  {state.creating ? (<>
                                      <lucide_react_1.Loader2 className="mr-2 h-3 w-3 animate-spin"/>
                                      Oluşturuluyor...
                                    </>) : (<>
                                      <lucide_react_1.ClipboardCheck className="mr-2 h-3 w-3"/>
                                      Talebi Oluştur
                                    </>)}
                              </button_1.Button>
                            </div>
                        </form>
                    </card_1.CardFooter>
                  </div>)}
              </card_1.Card>
            </div>

            {/* Chat Section */}
            <div className={support_page_module_css_1.default.chatSection}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <lucide_react_1.MessageCircle className="h-5 w-5"/>
                    <span>AI Destek Asistanı</span>
                    {chatSession && (<badge_1.Badge variant="outline" className="ml-2">
                        Aktif
                      </badge_1.Badge>)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Anında yardım alın veya destek ekibiyle iletişime geçin
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button_1.Button variant="ghost" size="icon" onClick={toggleChatMinimized} className="h-8 w-8">
                    {isChatMinimized ? <lucide_react_1.Maximize2 className="h-4 w-4"/> : <lucide_react_1.Minimize2 className="h-4 w-4"/>}
                  </button_1.Button>
                </div>
              </div>
              
              <card_1.Card className={(0, utils_1.cn)(support_page_module_css_1.default.responsiveCard, "transition-all duration-300", isChatMinimized ? support_page_module_css_1.default.chatMinimized : support_page_module_css_1.default.chatExpanded)}>
                {isChatMinimized ? (<card_1.CardContent className="flex items-center justify-center h-full">
                    <button_1.Button variant="ghost" onClick={toggleChatMinimized} className="flex items-center space-x-2">
                      <lucide_react_1.MessageCircle className="h-4 w-4"/>
                      <span>Chat'i Genişlet</span>
                    </button_1.Button>
                  </card_1.CardContent>) : (<card_1.CardContent className={support_page_module_css_1.default.responsiveCardContent}>
                    <div className={support_page_module_css_1.default.chatContainer}>
                      <chatbox_1.ChatBox sessionType="support" onSessionCreate={handleChatSessionCreate} onMessageSent={handleChatMessageSent} embedded={true} showHeader={false} height="100%" className="w-full h-full"/>
                    </div>
                  </card_1.CardContent>)}
              </card_1.Card>
            </div>
          </div>

          {/* Mobile Side-by-Side Info */}
          <div className="lg:hidden mt-6">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-base">Mobil Kullanım İpucu</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent>
                <p className="text-sm text-muted-foreground">
                  Mobil cihazlarda daha iyi deneyim için "Destek Formu" veya "AI Sohbet" sekmelerini ayrı ayrı kullanmanızı öneririz.
                </p>
                <div className="flex space-x-2 mt-3">
                  <button_1.Button variant="outline" size="sm" onClick={() => handleTabChange('form')}>
                    Forma Geç
                  </button_1.Button>
                  <button_1.Button variant="outline" size="sm" onClick={() => handleTabChange('chat')}>
                    Chat'e Geç
                  </button_1.Button>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {/* Floating Chat Toggle (Mobile) */}
      {(!isChatVisible || (activeTab !== 'chat' && activeTab !== 'both')) && (<div className={support_page_module_css_1.default.floatingButton}>
          <button_1.Button onClick={() => {
                if (!isChatVisible) {
                    toggleChatVisibility();
                }
                handleTabChange('chat');
            }} className="rounded-full h-14 w-14 shadow-lg" size="icon">
            <lucide_react_1.MessageCircle className="h-6 w-6"/>
          </button_1.Button>
          {chatSession && (<badge_1.Badge variant="secondary" className="absolute -top-2 -left-2 text-xs">
              Aktif
            </badge_1.Badge>)}
        </div>)}

      {/* Floating Chat Minimize Toggle (When chat is visible) */}
      {isChatVisible && activeTab === 'both' && (<div className={support_page_module_css_1.default.floatingButtonLeft}>
          <button_1.Button onClick={toggleChatMinimized} variant="outline" className="rounded-full h-12 w-12 shadow-lg" size="icon">
            {isChatMinimized ? <lucide_react_1.Maximize2 className="h-5 w-5"/> : <lucide_react_1.Minimize2 className="h-5 w-5"/>}
          </button_1.Button>
        </div>)}
    </div>);
}
//# sourceMappingURL=page.js.map