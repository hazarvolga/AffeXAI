"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActivityLogsPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const scroll_area_1 = require("@/components/ui/scroll-area");
const pagination_1 = require("@/components/ui/pagination");
const logData = [
    { id: 'log-001', user: 'admin@example.com', action: 'Kullanıcı Güncelledi', details: 'Kullanıcı ID: usr-002, Rol: Editör -> Admin', timestamp: '2024-07-29 14:30:15', level: 'info' },
    { id: 'log-002', user: 'editor@example.com', action: 'İçerik Oluşturdu', details: 'Başlık: Yeni Başarı Hikayesi', timestamp: '2024-07-29 11:05:42', level: 'info' },
    { id: 'log-003', user: 'viewer@example.com', action: 'Giriş Başarısız', details: 'IP: 192.168.1.10, Neden: Yanlış şifre', timestamp: '2024-07-29 09:15:03', level: 'warning' },
    { id: 'log-004', user: 'admin@example.com', action: 'Sistem Ayarı Değiştirdi', details: 'Ayar: Bakım Modu, Değer: Aktif', timestamp: '2024-07-28 23:00:00', level: 'critical' },
    { id: 'log-005', user: 'editor@example.com', action: 'İçerik Sildi', details: 'İçerik ID: post-123', timestamp: '2024-07-28 16:45:21', level: 'info' },
];
function ActivityLogsPage() {
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Aktivite Kayıtları</card_1.CardTitle>
                <card_1.CardDescription>Sistemde gerçekleşen tüm kullanıcı ve sistem aktivitelerinin kaydı.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
                <scroll_area_1.ScrollArea className="h-[60vh] w-full">
                    <table_1.Table>
                        <table_1.TableHeader>
                            <table_1.TableRow>
                                <table_1.TableHead>Kullanıcı</table_1.TableHead>
                                <table_1.TableHead>Eylem</table_1.TableHead>
                                <table_1.TableHead>Detaylar</table_1.TableHead>
                                <table_1.TableHead>Zaman Damgası</table_1.TableHead>
                                <table_1.TableHead>Seviye</table_1.TableHead>
                            </table_1.TableRow>
                        </table_1.TableHeader>
                        <table_1.TableBody>
                            {logData.map((log) => (<table_1.TableRow key={log.id}>
                                    <table_1.TableCell className="font-medium">{log.user}</table_1.TableCell>
                                    <table_1.TableCell>{log.action}</table_1.TableCell>
                                    <table_1.TableCell className="text-muted-foreground">{log.details}</table_1.TableCell>
                                    <table_1.TableCell>{log.timestamp}</table_1.TableCell>
                                    <table_1.TableCell>
                                        <badge_1.Badge variant={log.level === 'critical' ? 'destructive' : log.level === 'warning' ? 'default' : 'secondary'} className={log.level === 'warning' ? 'bg-yellow-500' : ''}>
                                            {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
                                        </badge_1.Badge>
                                    </table_1.TableCell>
                                </table_1.TableRow>))}
                        </table_1.TableBody>
                    </table_1.Table>
                </scroll_area_1.ScrollArea>
                 <pagination_1.Pagination className="mt-4">
                    <pagination_1.PaginationContent>
                        <pagination_1.PaginationItem>
                        <pagination_1.PaginationPrevious href="#"/>
                        </pagination_1.PaginationItem>
                        {/* Sayfa numaraları burada oluşturulabilir */}
                        <pagination_1.PaginationItem>
                        <pagination_1.PaginationNext href="#"/>
                        </pagination_1.PaginationItem>
                    </pagination_1.PaginationContent>
                </pagination_1.Pagination>
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=page.js.map