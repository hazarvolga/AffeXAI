"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMediaComposerPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const switch_1 = require("@/components/ui/switch");
const social_media_data_1 = require("@/lib/social-media-data");
const events_data_1 = require("@/lib/events-data");
const cms_data_1 = require("@/lib/cms-data");
const image_1 = __importDefault(require("next/image"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const availableContent = [
    ...events_data_1.events.map(e => ({ ...e, type: 'event', icon: lucide_react_1.Calendar })),
    ...cms_data_1.pages.map(p => ({ ...p, type: 'page', icon: lucide_react_1.FileText })),
];
function SocialMediaComposerPage() {
    const [step, setStep] = (0, react_1.useState)(1);
    const [selectedContent, setSelectedContent] = (0, react_1.useState)(null);
    const [selectedAccounts, setSelectedAccounts] = (0, react_1.useState)([]);
    const handleContentSelect = (content) => {
        setSelectedContent({ id: content.id, title: content.title, type: content.type });
        setStep(2);
    };
    const handleStartCustom = () => {
        setSelectedContent({ id: 'custom', title: 'Özel Gönderi', type: 'custom' });
        setStep(2);
    };
    const toggleAccountSelection = (accountId) => {
        const account = social_media_data_1.socialAccounts.find(a => a.id === accountId);
        if (!account || !account.isConnected)
            return; // Do not select if not connected
        setSelectedAccounts(prev => prev.includes(accountId)
            ? prev.filter(id => id !== accountId)
            : [...prev, accountId]);
    };
    const StepIndicator = ({ currentStep }) => (<ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {["İçerik Seç", "Platform Seç", "AI ile Oluştur", "Planla & Yayınla"].map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;
            return (<li key={stepNumber} className={`flex md:w-full items-center ${isCompleted ? 'text-blue-600 dark:text-blue-500' : ''} ${stepNumber < 4 ? "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700" : ""}`}>
                        <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${isCompleted || isCurrent ? '' : 'text-gray-500'}`}>
                            {isCompleted ? (<svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>) : (<span className="me-2">{stepNumber}</span>)}
                            {title}
                        </span>
                    </li>);
        })}
        </ol>);
    return (<div className="space-y-8">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Destekli Gönderi Oluşturucu</h1>
                    <p className="text-muted-foreground">Mevcut içeriklerden veya sıfırdan sosyal medya gönderileri oluşturun.</p>
                </div>
            </div>

            <card_1.Card>
                <card_1.CardHeader>
                    <StepIndicator currentStep={step}/>
                </card_1.CardHeader>
                <card_1.CardContent>
                    {step === 1 && (<div>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold">Nasıl Başlamak İstersiniz?</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <card_1.Card className="hover:shadow-lg transition-shadow">
                                    <card_1.CardHeader>
                                        <card_1.CardTitle>Mevcut İçerikten Başla</card_1.CardTitle>
                                        <card_1.CardDescription>Bir etkinlik, sayfa veya blog yazısını sosyal medya gönderisine dönüştürün.</card_1.CardDescription>
                                    </card_1.CardHeader>
                                    <card_1.CardContent className="max-h-96 overflow-y-auto">
                                        <div className="space-y-2">
                                            {availableContent.map(item => (<button key={item.id} onClick={() => handleContentSelect(item)} className="w-full text-left p-2 rounded-md hover:bg-muted flex items-center gap-3">
                                                    <item.icon className="h-4 w-4 text-muted-foreground flex-shrink-0"/>
                                                    <span className="truncate flex-grow">{item.title}</span>
                                                    <badge_1.Badge variant="outline">{item.type}</badge_1.Badge>
                                                </button>))}
                                        </div>
                                    </card_1.CardContent>
                                </card_1.Card>
                                 <card_1.Card className="hover:shadow-lg transition-shadow flex flex-col items-center justify-center text-center">
                                    <card_1.CardHeader>
                                        <card_1.CardTitle>Yeni Gönderi Oluştur</card_1.CardTitle>
                                        <card_1.CardDescription>Tamamen yeni ve özel bir sosyal medya gönderisi yazın.</card_1.CardDescription>
                                    </card_1.CardHeader>
                                    <card_1.CardContent>
                                        <button_1.Button size="lg" onClick={handleStartCustom}>
                                            <lucide_react_1.PenSquare className="mr-2 h-5 w-5"/> Sıfırdan Başla
                                        </button_1.Button>
                                    </card_1.CardContent>
                                </card_1.Card>
                            </div>
                        </div>)}
                    {step === 2 && selectedContent && (<div>
                             <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-semibold">2. Adım: Platformları Seçin</h2>
                                    <p className="text-muted-foreground">Kaynak İçerik: <span className="font-semibold text-primary">{selectedContent.title}</span></p>
                                </div>
                                <button_1.Button variant="outline" onClick={() => setStep(1)}>Geri</button_1.Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {social_media_data_1.socialAccounts.map(account => {
                const PlatformIcon = (0, social_media_data_1.getPlatformIcon)(account.platform);
                const isSelected = selectedAccounts.includes(account.id);
                return (<button key={account.id} onClick={() => toggleAccountSelection(account.id)} disabled={!account.isConnected} className={(0, utils_1.cn)(`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all`, isSelected ? 'ring-2 ring-primary bg-primary/10' : 'hover:bg-muted', !account.isConnected && 'opacity-50 cursor-not-allowed')}>
                                            <PlatformIcon className="h-8 w-8"/>
                                            <span className="font-semibold">{account.platform}</span>
                                            {!account.isConnected && <badge_1.Badge variant="destructive">Bağlı Değil</badge_1.Badge>}
                                        </button>);
            })}
                            </div>
                            <div className="flex justify-end mt-8">
                                <button_1.Button onClick={() => setStep(3)} disabled={selectedAccounts.length === 0}>İleri</button_1.Button>
                            </div>
                        </div>)}
                    {step === 3 && selectedContent && (<div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-semibold">3. Adım: AI ile İçerik Oluşturun</h2>
                                     <p className="text-muted-foreground">Seçili platformlar için AI önerilerini düzenleyin ve kullanın.</p>
                                </div>
                                <button_1.Button variant="outline" onClick={() => setStep(2)}>Geri</button_1.Button>
                            </div>

                            <tabs_1.Tabs defaultValue={selectedAccounts[0]} className="w-full">
                                <tabs_1.TabsList>
                                    {selectedAccounts.map(id => {
                const account = social_media_data_1.socialAccounts.find(a => a.id === id);
                if (!account)
                    return null;
                const PlatformIcon = (0, social_media_data_1.getPlatformIcon)(account.platform);
                return <tabs_1.TabsTrigger key={id} value={id} className="flex items-center gap-2"><PlatformIcon className="h-4 w-4"/> {account.platform}</tabs_1.TabsTrigger>;
            })}
                                </tabs_1.TabsList>
                                {selectedAccounts.map(id => {
                const account = social_media_data_1.socialAccounts.find(a => a.id === id);
                if (!account)
                    return null;
                return (<tabs_1.TabsContent key={id} value={id} className="mt-4">
                                            <div className="grid lg:grid-cols-2 gap-6">
                                                {/* Text Content */}
                                                <div className="space-y-4">
                                                    <card_1.Card>
                                                        <card_1.CardHeader>
                                                            <card_1.CardTitle className="flex items-center justify-between">
                                                                Metin İçeriği
                                                                <button_1.Button variant="ghost" size="sm"><lucide_react_1.Sparkles className="mr-2 h-4 w-4"/> Yeniden Oluştur</button_1.Button>
                                                            </card_1.CardTitle>
                                                        </card_1.CardHeader>
                                                        <card_1.CardContent>
                                                            <textarea_1.Textarea className="min-h-48" defaultValue={`#Allplan ile projelerinizi bir üst seviyeye taşıyın! "${selectedContent.title}" etkinliğimizde bize katılın. Detaylar ve kayıt için link profilde! #BIM #${account?.platform}`}/>
                                                        </card_1.CardContent>
                                                    </card_1.Card>
                                                     <card_1.Card>
                                                        <card_1.CardHeader>
                                                            <card_1.CardTitle className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2"><lucide_react_1.Tags className="h-5 w-5"/> Hashtag Önerileri</div>
                                                                <button_1.Button variant="ghost" size="sm"><lucide_react_1.Sparkles className="mr-2 h-4 w-4"/> Yenile</button_1.Button>
                                                            </card_1.CardTitle>
                                                        </card_1.CardHeader>
                                                        <card_1.CardContent className="flex flex-wrap gap-2">
                                                            <badge_1.Badge variant="secondary" className="cursor-pointer">#Allplan</badge_1.Badge>
                                                            <badge_1.Badge variant="secondary" className="cursor-pointer">#BIM</badge_1.Badge>
                                                            <badge_1.Badge variant="secondary" className="cursor-pointer">#Mimari</badge_1.Badge>
                                                            <badge_1.Badge variant="secondary" className="cursor-pointer">#İnşaatTeknolojileri</badge_1.Badge>
                                                        </card_1.CardContent>
                                                    </card_1.Card>
                                                </div>
                                                {/* Visual Content */}
                                                <card_1.Card>
                                                    <card_1.CardHeader>
                                                         <card_1.CardTitle className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2"><lucide_react_1.Image className="h-5 w-5"/> Görsel İçerik</div>
                                                            <button_1.Button variant="ghost" size="sm"><lucide_react_1.Sparkles className="mr-2 h-4 w-4"/> Yeni Görsel Oluştur</button_1.Button>
                                                        </card_1.CardTitle>
                                                        <card_1.CardDescription>AI, içeriğiniz için bu görsel temalarını öneriyor. Yeni bir tane oluşturabilir veya mevcut görselleri kullanabilirsiniz.</card_1.CardDescription>
                                                    </card_1.CardHeader>
                                                    <card_1.CardContent className="space-y-4">
                                                         <image_1.default src="https://picsum.photos/seed/social-media-post/1200/630" alt="Generated Post" width={1200} height={630} className="rounded-lg border aspect-video object-cover"/>
                                                         <p className="text-sm text-muted-foreground text-center">Önerilen görsel teması: <span className="font-semibold text-foreground">modern bina ve planlar</span></p>
                                                    </card_1.CardContent>
                                                </card_1.Card>
                                            </div>
                                        </tabs_1.TabsContent>);
            })}
                            </tabs_1.Tabs>
                             <div className="flex justify-end mt-8">
                                <button_1.Button onClick={() => setStep(4)}>İleri</button_1.Button>
                            </div>
                         </div>)}
                    {step === 4 && (<div>
                             <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-semibold">4. Adım: Planla ve Yayınla</h2>
                                    <p className="text-muted-foreground">Gönderilerinizi hemen yayınlayın veya ileri bir tarihe planlayın.</p>
                                </div>
                                <button_1.Button variant="outline" onClick={() => setStep(3)}>Geri</button_1.Button>
                            </div>
                            <card_1.Card>
                                <card_1.CardHeader>
                                    <card_1.CardTitle>Yayınlama Seçenekleri</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <switch_1.Switch id="schedule-switch"/>
                                        <label_1.Label htmlFor="schedule-switch">Gönderileri Planla</label_1.Label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input_1.Input type="date"/>
                                        <input_1.Input type="time"/>
                                    </div>
                                </card_1.CardContent>
                                <card_1.CardFooter className="flex justify-end gap-4">
                                    <button_1.Button variant="secondary"><lucide_react_1.Clock className="mr-2 h-4 w-4"/> Gönderileri Planla</button_1.Button>
                                    <button_1.Button><lucide_react_1.Send className="mr-2 h-4 w-4"/> Şimdi Yayınla</button_1.Button>
                                </card_1.CardFooter>
                            </card_1.Card>
                        </div>)}
                </card_1.CardContent>
            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map