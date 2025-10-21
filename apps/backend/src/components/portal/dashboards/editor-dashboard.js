"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorDashboard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const cms_data_1 = require("@/lib/cms-data");
const events_data_1 = require("@/lib/events-data");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
function EditorDashboard() {
    const draftPages = cms_data_1.pages.filter(p => p.status === 'draft').slice(0, 3);
    const recentEvents = events_data_1.events.slice(0, 3);
    return (<>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">İçerik Editörü Paneli</h2>
                    <p className="text-muted-foreground">
                        Sayfaları, etkinlikleri ve sertifikaları yönetin.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <button_1.Button asChild size="lg" className="h-auto py-6 text-left justify-start">
                    <link_1.default href="/admin/cms/pages/new">
                        <lucide_react_1.FileText className="mr-4 h-6 w-6"/>
                        <div>
                            <p className="font-bold">Yeni Sayfa Oluştur</p>
                            <p className="font-normal text-sm">Yeni bir CMS sayfası ekleyin.</p>
                        </div>
                    </link_1.default>
                </button_1.Button>
                 <button_1.Button asChild size="lg" className="h-auto py-6 text-left justify-start">
                    <link_1.default href="/admin/events/new">
                        <lucide_react_1.Calendar className="mr-4 h-6 w-6"/>
                         <div>
                            <p className="font-bold">Yeni Etkinlik Oluştur</p>
                            <p className="font-normal text-sm">Yeni bir webinar veya seminer planlayın.</p>
                        </div>
                    </link_1.default>
                </button_1.Button>
                 <button_1.Button asChild size="lg" className="h-auto py-6 text-left justify-start">
                    <link_1.default href="/admin/certificates/new">
                        <lucide_react_1.Award className="mr-4 h-6 w-6"/>
                         <div>
                            <p className="font-bold">Yeni Sertifika Oluştur</p>
                            <p className="font-normal text-sm">Katılımcılar için yeni sertifika verin.</p>
                        </div>
                    </link_1.default>
                </button_1.Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Onay Bekleyen Taslaklar</card_1.CardTitle>
                        <card_1.CardDescription>Yayınlanmayı bekleyen son taslak sayfalar.</card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <table_1.Table>
                            <table_1.TableHeader>
                                <table_1.TableRow>
                                    <table_1.TableHead>Başlık</table_1.TableHead>
                                    <table_1.TableHead>Son Güncelleme</table_1.TableHead>
                                    <table_1.TableHead className="text-right">Eylem</table_1.TableHead>
                                </table_1.TableRow>
                            </table_1.TableHeader>
                            <table_1.TableBody>
                                {draftPages.map(page => (<table_1.TableRow key={page.id}>
                                        <table_1.TableCell>{page.title}</table_1.TableCell>
                                        <table_1.TableCell>{new Date(page.lastUpdated).toLocaleDateString('tr-TR')}</table_1.TableCell>
                                        <table_1.TableCell className="text-right">
                                            <button_1.Button variant="outline" size="sm" asChild>
                                                <link_1.default href={`/admin/cms/pages/${page.id}`}>
                                                    <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                                                </link_1.default>
                                            </button_1.Button>
                                        </table_1.TableCell>
                                    </table_1.TableRow>))}
                            </table_1.TableBody>
                        </table_1.Table>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Son Etkinlikler</card_1.CardTitle>
                         <card_1.CardDescription>En son oluşturulan veya güncellenen etkinlikler.</card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <table_1.Table>
                             <table_1.TableHeader>
                                <table_1.TableRow>
                                    <table_1.TableHead>Etkinlik</table_1.TableHead>
                                    <table_1.TableHead>Tarih</table_1.TableHead>
                                    <table_1.TableHead>Durum</table_1.TableHead>
                                </table_1.TableRow>
                            </table_1.TableHeader>
                            <table_1.TableBody>
                                {recentEvents.map(event => (<table_1.TableRow key={event.id}>
                                        <table_1.TableCell>
                                            <link_1.default href={`/admin/events/${event.id}`} className="font-medium hover:underline">{event.title}</link_1.default>
                                        </table_1.TableCell>
                                        <table_1.TableCell>{new Date(event.date).toLocaleDateString('tr-TR')}</table_1.TableCell>
                                        <table_1.TableCell>
                                            <badge_1.Badge variant={new Date(event.date) > new Date() ? 'default' : 'outline'}>
                                                {new Date(event.date) > new Date() ? 'Yaklaşıyor' : 'Tamamlandı'}
                                            </badge_1.Badge>
                                        </table_1.TableCell>
                                    </table_1.TableRow>))}
                            </table_1.TableBody>
                        </table_1.Table>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
        </>);
}
//# sourceMappingURL=editor-dashboard.js.map