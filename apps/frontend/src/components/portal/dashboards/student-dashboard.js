"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StudentDashboard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const events_data_1 = require("@/lib/events-data");
const image_1 = __importDefault(require("next/image"));
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
function StudentDashboard() {
    const upcomingEvents = events_data_1.events.filter(e => new Date(e.date) > new Date()).slice(0, 2);
    return (<>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Hoş Geldiniz! (Student View)</h2>
                    <p className="text-muted-foreground">
                        Eğitim portalınıza genel bir bakış.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <card_1.Card className="lg:col-span-7">
                    <card_1.CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <card_1.CardTitle>Yaklaşan Etkinlikler</card_1.CardTitle>
                            <card_1.CardDescription>Kayıt olduğunuz veya ilginizi çekebilecek etkinlikler.</card_1.CardDescription>
                        </div>
                        <button_1.Button asChild variant="outline" size="sm">
                            <link_1.default href="/portal/events">Tüm Etkinlikler</link_1.default>
                        </button_1.Button>
                    </card_1.CardHeader>
                    <card_1.CardContent className="grid md:grid-cols-2 gap-6">
                       {upcomingEvents.map(event => (<link_1.default href={`/portal/events/${event.id}`} key={event.id} className="group">
                            <card_1.Card className="overflow-hidden h-full transition-all hover:border-primary">
                                <div className="relative aspect-[16/9]">
                                    <image_1.default src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105"/>
                                </div>
                                <card_1.CardContent className="p-4">
                                     <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{event.title}</h3>
                                    <p className="text-sm text-muted-foreground">{event.location.city}</p>
                                </card_1.CardContent>
                            </card_1.Card>
                           </link_1.default>))}
                       {upcomingEvents.length === 0 && (<div className="md:col-span-2 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                                <lucide_react_1.Calendar className="h-12 w-12 text-muted-foreground mb-4"/>
                                <h3 className="font-semibold text-lg">Yaklaşan bir etkinliğiniz bulunmuyor.</h3>
                                <p className="text-muted-foreground mb-4">Yeni etkinlikleri keşfetmeye ne dersiniz?</p>
                                <button_1.Button asChild>
                                    <link_1.default href="/portal/events/discover">Etkinlik Keşfet</link_1.default>
                                </button_1.Button>
                           </div>)}
                    </card_1.CardContent>
                </card_1.Card>

                 <card_1.Card className="col-span-4">
                    <card_1.CardHeader>
                        <card_1.CardTitle>Son Aktiviteler</card_1.CardTitle>
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
                </card_1.Card>
                 <card_1.Card className="col-span-4 lg:col-span-3">
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
                </card_1.Card>
            </div>
        </>);
}
//# sourceMappingURL=student-dashboard.js.map