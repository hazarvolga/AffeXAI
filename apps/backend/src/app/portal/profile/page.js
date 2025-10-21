"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserProfilePage;
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const avatar_1 = require("@/components/ui/avatar");
const lucide_react_1 = require("lucide-react");
function UserProfilePage() {
    return (<div className="flex-1 space-y-8">
        <card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Profil Bilgilerim</card_1.CardTitle>
                <card_1.CardDescription>Kişisel bilgilerinizi ve tercihlerinizi buradan yönetebilirsiniz.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
                <form className="space-y-8">
                    <div className="flex items-center gap-6">
                        <avatar_1.Avatar className="h-20 w-20">
                            <avatar_1.AvatarImage src="https://i.pravatar.cc/150?u=ahmet-yilmaz" alt="Ahmet Yılmaz"/>
                            <avatar_1.AvatarFallback>AY</avatar_1.AvatarFallback>
                        </avatar_1.Avatar>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">Ahmet Yılmaz</h3>
                            <p className="text-muted-foreground">Proje Yöneticisi</p>
                             <button_1.Button variant="outline" size="sm" className="mt-2">Resmi Değiştir</button_1.Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label_1.Label htmlFor="name">Adınız Soyadınız</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.User className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="name" defaultValue="Ahmet Yılmaz" className="pl-10"/>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label_1.Label htmlFor="email">E-posta Adresi</label_1.Label>
                             <div className="relative flex items-center">
                                <lucide_react_1.Mail className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="email" type="email" defaultValue="ahmet.yilmaz@example.com" className="pl-10"/>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label_1.Label htmlFor="company">Firma</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.Building className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="company" defaultValue="Örnek İnşaat A.Ş." className="pl-10"/>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <label_1.Label htmlFor="phone">Telefon Numarası</label_1.Label>
                            <div className="relative flex items-center">
                                <lucide_react_1.Phone className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input id="phone" type="tel" defaultValue="+90 555 123 45 67" className="pl-10"/>
                            </div>
                        </div>
                    </div>
                </form>
            </card_1.CardContent>
            <card_1.CardFooter className="border-t pt-6">
                <button_1.Button>Değişiklikleri Kaydet</button_1.Button>
            </card_1.CardFooter>
        </card_1.Card>
         <card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Şifre Değiştir</card_1.CardTitle>
                <card_1.CardDescription>Güvenliğiniz için şifrenizi düzenli olarak değiştirmenizi öneririz.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
                <form className="space-y-4 max-w-md">
                     <div className="space-y-2">
                        <label_1.Label htmlFor="current-password">Mevcut Şifre</label_1.Label>
                        <input_1.Input id="current-password" type="password"/>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="new-password">Yeni Şifre</label_1.Label>
                        <input_1.Input id="new-password" type="password"/>
                    </div>
                     <div className="space-y-2">
                        <label_1.Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</label_1.Label>
                        <input_1.Input id="confirm-password" type="password"/>
                    </div>
                </form>
            </card_1.CardContent>
            <card_1.CardFooter className="border-t pt-6">
                <button_1.Button>Şifreyi Güncelle</button_1.Button>
            </card_1.CardFooter>
        </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map