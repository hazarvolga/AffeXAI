"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPasswordPage;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function ForgotPasswordPage() {
    return (<card_1.Card className="w-full max-w-md">
      <card_1.CardHeader className="text-center">
        <card_1.CardTitle className="text-2xl font-bold">Şifrenizi mi Unuttunuz?</card_1.CardTitle>
        <card_1.CardDescription>
          Endişelenmeyin, olur böyle şeyler. E-posta adresinizi girin, size şifrenizi sıfırlamanız için bir bağlantı gönderelim.
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <label_1.Label htmlFor="email">E-posta Adresi</label_1.Label>
            <div className="relative flex items-center">
              <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
              <input_1.Input id="email" type="email" placeholder="ornek@example.com" className="pl-10"/>
            </div>
          </div>
          <button_1.Button type="submit" className="w-full">
            Sıfırlama Bağlantısı Gönder
          </button_1.Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Şifrenizi hatırladınız mı?{' '}
          <link_1.default href="/admin/login" className="font-medium text-primary hover:underline">
            Giriş yapın
          </link_1.default>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=page.js.map