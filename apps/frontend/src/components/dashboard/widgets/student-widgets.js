"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentQuickLinks = StudentQuickLinks;
exports.StudentRecentActivity = StudentRecentActivity;
exports.StudentRecommendedCourses = StudentRecommendedCourses;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const quickLinks = [
    { title: "Eğitimlerim", icon: lucide_react_1.GraduationCap, href: "/portal/courses" },
    { title: "Sertifikalarım", icon: lucide_react_1.Award, href: "/portal/certificates" },
    { title: "Bilgi Bankası", icon: lucide_react_1.BookOpen, href: "/portal/kb" },
    { title: "Bülten Arşivi", icon: lucide_react_1.Mail, href: "/portal/newsletter" },
];
const recentActivity = [
    { description: "'İleri Düzey Modelleme' kursunu tamamladınız.", time: "2 gün önce" },
    { description: "Yeni sertifikanız hazır: BIM Temelleri", time: "5 gün önce" },
    { description: "'3D Görselleştirme' webinar kaydını izlediniz.", time: "1 hafta önce" },
];
function StudentQuickLinks() {
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
function StudentRecentActivity() {
    return (<card_1.Card className="col-span-4">
            <card_1.CardHeader>
                <card_1.CardTitle>Son Aktiviteler (Student)</card_1.CardTitle>
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
function StudentRecommendedCourses() {
    return (<card_1.Card className="col-span-4 lg:col-span-3">
            <card_1.CardHeader>
                <card_1.CardTitle>Önerilen Kurslar</card_1.CardTitle>
                <card_1.CardDescription>
                    Sizin için seçtiğimiz eğitim içerikleri.
                </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-sm">BIM ile Proje Yönetimi</h3>
                    <p className="text-sm text-muted-foreground">BIM araçlarıyla etkili proje yönetimi tekniklerini öğrenin.</p>
                    <button_1.Button variant="link" size="sm" className="p-0 h-auto mt-1">Kursa Git</button_1.Button>
                </div>
                <div>
                    <h3 className="font-semibold text-sm">İleri Düzey Parametrik Modelleme</h3>
                    <p className="text-sm text-muted-foreground">Karmaşık yapıları parametrik modelleme ile oluşturun.</p>
                    <button_1.Button variant="link" size="sm" className="p-0 h-auto mt-1">Kursa Git</button_1.Button>
                </div>
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=student-widgets.js.map