"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SupportDashboard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const support_data_1 = require("@/lib/support-data");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const avatar_1 = require("@/components/ui/avatar");
const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
function SupportDashboard() {
    const openTickets = support_data_1.supportTickets.filter(t => t.status === 'Open' || t.status === 'In Progress');
    const assignedToMe = openTickets.filter(t => t.assignee.id === 'usr-002'); // Mocking 'Zeynep Kaya'
    const highPriorityTickets = openTickets.filter(t => t.priority === 'High');
    // Combine and remove duplicates to prevent key errors
    const uniqueTicketsToShow = Array.from(new Map([...highPriorityTickets, ...assignedToMe].map(ticket => [ticket.id, ticket])).values());
    return (<>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Destek Ekibi Paneli</h2>
                    <p className="text-muted-foreground">
                        Kullanıcı taleplerini yönetin ve çözüme kavuşturun.
                    </p>
                </div>
                 <button_1.Button asChild>
                    <link_1.default href="/admin/support/new">
                        <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Manuel Talep Oluştur
                    </link_1.default>
                </button_1.Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Açık Talepler</card_1.CardTitle>
                        <lucide_react_1.LifeBuoy className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{openTickets.length}</div>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Bana Atananlar</card_1.CardTitle>
                        <lucide_react_1.User className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{assignedToMe.length}</div>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Yüksek Öncelikli</card_1.CardTitle>
                        <lucide_react_1.Clock className="h-4 w-4 text-destructive"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold text-destructive">{highPriorityTickets.length}</div>
                    </card_1.CardContent>
                </card_1.Card>
            </div>

            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>İlgi Bekleyen Talepler</card_1.CardTitle>
                    <card_1.CardDescription>Size atanmış veya yüksek öncelikli açık talepler.</card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent>
                    <table_1.Table>
                        <table_1.TableHeader>
                            <table_1.TableRow>
                                <table_1.TableHead>Konu</table_1.TableHead>
                                <table_1.TableHead>Kullanıcı</table_1.TableHead>
                                <table_1.TableHead>Öncelik</table_1.TableHead>
                                <table_1.TableHead>Tarih</table_1.TableHead>
                                <table_1.TableHead className="text-right">Eylem</table_1.TableHead>
                            </table_1.TableRow>
                        </table_1.TableHeader>
                        <table_1.TableBody>
                            {uniqueTicketsToShow.slice(0, 5).map(ticket => (<table_1.TableRow key={ticket.id}>
                                    <table_1.TableCell>
                                        <p className="font-medium">{ticket.subject}</p>
                                        <p className="text-xs text-muted-foreground">{ticket.category}</p>
                                    </table_1.TableCell>
                                    <table_1.TableCell>
                                        <div className="flex items-center gap-2">
                                            <avatar_1.Avatar className="h-8 w-8"><avatar_1.AvatarFallback>{getInitials(ticket.user.name)}</avatar_1.AvatarFallback></avatar_1.Avatar>
                                            <p>{ticket.user.name}</p>
                                        </div>
                                    </table_1.TableCell>
                                    <table_1.TableCell><badge_1.Badge variant={ticket.priority === 'High' ? 'destructive' : 'secondary'}>{ticket.priority}</badge_1.Badge></table_1.TableCell>
                                    <table_1.TableCell>{new Date(ticket.createdAt).toLocaleDateString('tr-TR')}</table_1.TableCell>
                                    <table_1.TableCell className="text-right">
                                        <button_1.Button asChild size="sm">
                                            <link_1.default href={`/admin/support/${ticket.id}`}>Aç <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/></link_1.default>
                                        </button_1.Button>
                                    </table_1.TableCell>
                                </table_1.TableRow>))}
                        </table_1.TableBody>
                    </table_1.Table>
                </card_1.CardContent>
            </card_1.Card>
        </>);
}
//# sourceMappingURL=support-dashboard.js.map