"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewCmsPage;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function NewCmsPage() {
    return (<div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yeni Sayfa Oluştur</h1>
          <p className="text-muted-foreground">Yeni bir sayfanın içeriğini ve SEO ayarlarını yapılandırın.</p>
        </div>
      </div>
      
       <form className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Sayfa İçeriği</card_1.CardTitle>
                        <card_1.CardDescription>
                            Bu alan şu an için sadece bir konsepttir. Gerçek bir CMS'de burada zengin bir metin editörü (Rich Text Editor) bulunacaktır.
                        </card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                         <textarea_1.Textarea className="min-h-[400px]" placeholder="Yeni sayfanızın içeriğini buraya yazın..."/>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
             <div className="lg:col-span-1 space-y-8">
                 <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Yayınlama</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                        <div className="space-y-2">
                             <label_1.Label>Sayfa Başlığı</label_1.Label>
                             <input_1.Input placeholder="Örn: Hakkımızda"/>
                        </div>
                        <div className="space-y-2">
                            <label_1.Label>Durum</label_1.Label>
                            <select_1.Select defaultValue="draft">
                                <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectItem value="published">Yayınlandı</select_1.SelectItem>
                                    <select_1.SelectItem value="draft">Taslak</select_1.SelectItem>
                                </select_1.SelectContent>
                            </select_1.Select>
                        </div>
                    </card_1.CardContent>
                     <card_1.CardFooter className="flex justify-between">
                        <button_1.Button variant="outline" asChild><link_1.default href="/admin/cms/pages">İptal</link_1.default></button_1.Button>
                        <button_1.Button><lucide_react_1.Save className="mr-2 h-4 w-4"/> Kaydet</button_1.Button>
                    </card_1.CardFooter>
                 </card_1.Card>

                 <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>SEO Ayarları</card_1.CardTitle>
                        <card_1.CardDescription>Arama motoru optimizasyonu için meta başlık ve açıklamayı düzenleyin.</card_1.CardDescription>
                    </card_1.CardHeader>
                     <card_1.CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label_1.Label htmlFor="seo-title">SEO Başlığı</label_1.Label>
                            <input_1.Input id="seo-title" placeholder="Sayfanızın SEO başlığı"/>
                        </div>
                        <div className="space-y-2">
                             <label_1.Label htmlFor="seo-description">SEO Açıklaması</label_1.Label>
                            <textarea_1.Textarea id="seo-description" placeholder="Sayfanızın SEO açıklaması" className="min-h-[100px]"/>
                        </div>
                     </card_1.CardContent>
                 </card_1.Card>
            </div>
        </form>
    </div>);
}
//# sourceMappingURL=page.js.map