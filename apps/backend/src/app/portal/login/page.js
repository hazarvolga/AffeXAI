"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserPortalLoginPage;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
function UserPortalLoginPage() {
    return (<div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="absolute top-8 left-8">
            <link_1.default href="/" className="text-2xl font-bold text-primary">
                Aluplan Digital
            </link_1.default>
        </div>
        <card_1.Card className="w-full max-w-md">
        <card_1.CardHeader className="text-center">
            <card_1.CardTitle className="text-2xl font-bold">Kullanıcı Portalı</card_1.CardTitle>
            <card_1.CardDescription>Hesabınıza erişmek için bilgilerinizi girin.</card_1.CardDescription>
        </card_1.CardHeader>
        <form>
            <card_1.CardContent className="space-y-6">
            <div className="space-y-2">
                <label_1.Label htmlFor="email">E-posta Adresi</label_1.Label>
                <div className="relative flex items-center">
                    <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                    <input_1.Input id="email" name="email" type="email" placeholder="ornek@example.com" required className="pl-10"/>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label_1.Label htmlFor="password">Şifre</label_1.Label>
                    <link_1.default href="#" className="text-sm font-medium text-primary hover:underline">
                        Şifrenizi mi unuttunuz?
                    </link_1.default>
                </div>
                <div className="relative flex items-center">
                    <lucide_react_1.KeyRound className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                    <input_1.Input id="password" name="password" type="password" required className="pl-10"/>
                </div>
            </div>
            </card_1.CardContent>
            <card_1.CardFooter className="flex flex-col gap-4">
            <button_1.Button type="submit" className="w-full">
                <lucide_react_1.LogIn className="mr-2"/> Giriş Yap
            </button_1.Button>
            <div className="text-center text-sm text-muted-foreground">
                    Hesabınız yok mu? <link_1.default href="#" className="font-medium text-primary hover:underline">Destek ile İletişime Geçin</link_1.default>
                </div>
            </card_1.CardFooter>
        </form>
        </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map