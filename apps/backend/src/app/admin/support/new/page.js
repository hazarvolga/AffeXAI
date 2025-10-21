"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminNewSupportTicketPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const textarea_1 = require("@/components/ui/textarea");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function AdminNewSupportTicketPage() {
    return (<div className="flex-1 space-y-8">
      <card_1.Card>
        <form>
          <card_1.CardHeader>
            <card_1.CardTitle>Yeni Destek Talebi Oluştur</card_1.CardTitle>
            <card_1.CardDescription>
              Bir kullanıcı adına manuel olarak yeni bir destek talebi oluşturun.
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-6">
            <div className="space-y-2">
              <label_1.Label htmlFor="user-email">Kullanıcı E-posta Adresi</label_1.Label>
              <input_1.Input id="user-email" type="email" placeholder="kullanici@example.com"/>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="subject">Konu</label_1.Label>
              <input_1.Input id="subject" placeholder="Örn: Lisans anahtarı çalışmıyor"/>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label_1.Label htmlFor="category">Kategori</label_1.Label>
                <select_1.Select>
                  <select_1.SelectTrigger id="category">
                    <select_1.SelectValue placeholder="Bir kategori seçin"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="technical">Teknik Sorun</select_1.SelectItem>
                    <select_1.SelectItem value="billing">Faturalama</select_1.SelectItem>
                    <select_1.SelectItem value="general">Genel Soru</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="priority">Öncelik</label_1.Label>
                <select_1.Select defaultValue="Medium">
                  <select_1.SelectTrigger id="priority">
                    <select_1.SelectValue />
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="Low">Düşük</select_1.SelectItem>
                    <select_1.SelectItem value="Medium">Orta</select_1.SelectItem>
                    <select_1.SelectItem value="High">Yüksek</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
            </div>

            <div className="space-y-2">
              <label_1.Label htmlFor="description">Açıklama</label_1.Label>
              <textarea_1.Textarea id="description" placeholder="Yaşanan sorunu detaylı bir şekilde anlatın..." className="min-h-[180px]"/>
            </div>
             <div>
                <label_1.Label>Ekler</label_1.Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                    <div className="text-center">
                    <lucide_react_1.Paperclip className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                        <span>Dosyalarınızı yükleyin</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple/>
                        </label>
                        <p className="pl-1">veya sürükleyip bırakın</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, PDF, vb. en fazla 10MB</p>
                    </div>
                </div>
            </div>
          </card_1.CardContent>
          <card_1.CardFooter className="flex justify-end gap-2">
            <button_1.Button variant="outline" asChild>
                <link_1.default href="/admin/support">İptal</link_1.default>
            </button_1.Button>
            <button_1.Button type="submit">
              <lucide_react_1.Send className="mr-2 h-4 w-4"/> Talebi Oluştur
            </button_1.Button>
          </card_1.CardFooter>
        </form>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map