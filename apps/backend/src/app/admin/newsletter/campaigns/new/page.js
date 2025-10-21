"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewCampaignPage;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const separator_1 = require("@/components/ui/separator");
// This is a placeholder for a real rich text editor like Tiptap, TinyMCE, etc.
const RichTextEditorPlaceholder = () => (<div className="w-full h-96 rounded-md border bg-muted p-4">
        <div className="flex gap-2 mb-4 border-b pb-2">
            <button_1.Button variant="outline" size="sm">Kalın</button_1.Button>
            <button_1.Button variant="outline" size="sm">İtalik</button_1.Button>
            <button_1.Button variant="outline" size="sm">Link</button_1.Button>
            <button_1.Button variant="link" size="sm" className="text-primary gap-1">
                <lucide_react_1.Sparkles className="h-4 w-4"/> AI ile Yaz
            </button_1.Button>
        </div>
        <div className="mt-4 text-muted-foreground">
            Burası zengin metin editörünün (rich text editor) geleceği yerdir. E-posta içeriğinizi burada oluşturacaksınız.
        </div>
    </div>);
function NewCampaignPage() {
    return (<div className="space-y-8">
             <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Email Kampanyası</h1>
                <p className="text-muted-foreground">Yeni bir e-posta kampanyası oluşturun ve hedef kitlenize gönderin.</p>
            </div>

             <form className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Kampanya İçeriği</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label_1.Label htmlFor="campaign-title">Kampanya Başlığı (Dahili)</label_1.Label>
                                <input_1.Input id="campaign-title" placeholder="Örn: Eylül 2024 Bülteni"/>
                                <p className="text-xs text-muted-foreground">Bu başlık sadece panelde görünür ve size özeldir.</p>
                            </div>
                             <div className="space-y-2">
                                <label_1.Label htmlFor="subject">E-posta Konusu</label_1.Label>
                                <div className="flex items-center gap-2">
                                    <input_1.Input id="subject" placeholder="Abonelerinizin gelen kutusunda göreceği konu" className="flex-grow"/>
                                    <button_1.Button variant="outline" size="icon" type="button" aria-label="AI ile konu önerisi al">
                                        <lucide_react_1.Sparkles className="h-4 w-4 text-primary"/>
                                    </button_1.Button>
                                </div>
                                <p className="text-xs text-muted-foreground">AI ikonuna tıklayarak içerikle uyumlu konu başlığı önerileri alabilirsiniz.</p>
                            </div>
                             <div className="space-y-2">
                                <label_1.Label>İçerik</label_1.Label>
                                <RichTextEditorPlaceholder />
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>
                </div>
                <div className="lg:col-span-1 space-y-8 sticky top-24">
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Gönderim</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                             <div className="space-y-2">
                                <label_1.Label>Alıcılar</label_1.Label>
                                <p className="text-sm text-muted-foreground">Aktif <strong>{1250}</strong> aboneye gönderilecek.</p>
                            </div>
                            <button_1.Button variant="link" className="p-0 h-auto">Alıcıları Filtrele</button_1.Button>
                            <separator_1.Separator />
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label_1.Label>Gönderim Zamanı</label_1.Label>
                                     <button_1.Button variant="link" size="sm" className="p-0 h-auto text-primary gap-1 text-xs">
                                        <lucide_react_1.Sparkles className="h-3 w-3"/> En İyi Zamanı Öner
                                    </button_1.Button>
                                </div>
                                <div className="flex gap-2">
                                    <input_1.Input type="date"/>
                                    <input_1.Input type="time"/>
                                </div>
                            </div>
                        </card_1.CardContent>
                        <card_1.CardFooter className="flex flex-col gap-2">
                            <button_1.Button className="w-full"><lucide_react_1.Clock className="mr-2 h-4 w-4"/> Kampanyayı Planla</button_1.Button>
                            <button_1.Button variant="secondary" className="w-full"><lucide_react_1.Send className="mr-2 h-4 w-4"/> Şimdi Gönder</button_1.Button>
                            <button_1.Button variant="ghost" className="w-full"><lucide_react_1.Eye className="mr-2 h-4 w-4"/> Önizle ve Test Maili Gönder</button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Kaydet</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardFooter className="flex justify-between">
                            <button_1.Button variant="outline" asChild><link_1.default href="/admin/newsletter">İptal</link_1.default></button_1.Button>
                            <button_1.Button><lucide_react_1.Save className="mr-2 h-4 w-4"/> Taslak Olarak Kaydet</button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>
                </div>
            </form>
        </div>);
}
//# sourceMappingURL=page.js.map