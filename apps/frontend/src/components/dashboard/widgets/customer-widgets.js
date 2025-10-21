"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerQuickLinks = CustomerQuickLinks;
exports.CustomerRecentActivity = CustomerRecentActivity;
exports.CustomerHighlights = CustomerHighlights;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const quickLinks = [
    { title: "Lisans Bilgilerim", icon: lucide_react_1.FileText, href: "/portal/licenses" },
    { title: "Destek Taleplerim", icon: lucide_react_1.Briefcase, href: "/portal/support" },
    { title: "Eğitim Videoları", icon: lucide_react_1.PlayCircle, href: "/portal/videos" },
    { title: "Son İndirmeler", icon: lucide_react_1.Download, href: "/portal/downloads" },
];
const recentActivity = [
    { description: "Allplan 2024 Kurulum Kılavuzu'nu indirdiniz.", time: "2 saat önce" },
    { description: "Destek talebiniz güncellendi: #78945", time: "1 gün önce" },
    { description: "'İleri Düzey Modelleme' webinar kaydını izlediniz.", time: "3 gün önce" },
];
function CustomerQuickLinks() {
    return (<>
            {quickLinks.map(link => (<card_1.Card key={link.title} className="hover:bg-muted/50 transition-colors">
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">{link.title}</card_1.CardTitle>
                        <link.icon className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <button_1.Button variant="link" className="p-0 h-auto" asChild>
                            <link_1.default href={link.href}>Git →</link_1.default>
                        </button_1.Button>
                    </card_1.CardContent>
                </card_1.Card>))}
        </>);
}
function CustomerRecentActivity() {
    return (<card_1.Card className="col-span-4">
            <card_1.CardHeader>
                <card_1.CardTitle>Son Aktiviteler (Customer)</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
                <div className="space-y-6">
                    {recentActivity.map((activity, index) => (<div key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-1.5"/>
                            <div className="ml-4">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>))}
                </div>
            </card_1.CardContent>
        </card_1.Card>);
}
function CustomerHighlights() {
    return (<card_1.Card className="col-span-4 lg:col-span-3">
            <card_1.CardHeader>
                <card_1.CardTitle>Öne Çıkanlar</card_1.CardTitle>
                <card_1.CardDescription>
                    Sizin için seçtiğimiz en son haberler ve güncellemeler.
                </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-sm">Allplan 2024.1 Güncellemesi Yayınlandı</h3>
                    <p className="text-sm text-muted-foreground">Performans iyileştirmeleri ve yeni özellikler içeriyor. Hemen indirin!</p>
                    <button_1.Button variant="link" size="sm" className="p-0 h-auto mt-1">Daha Fazla Bilgi</button_1.Button>
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Yeni Webinar: Köprü Tasarımında Otomasyon</h3>
                    <p className="text-sm text-muted-foreground">Uzmanlarımızdan Allplan Bridge'in inceliklerini öğrenin. Kayıtlar başladı.</p>
                    <button_1.Button variant="link" size="sm" className="p-0 h-auto mt-1">Şimdi Kaydol</button_1.Button>
                </div>
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=customer-widgets.js.map