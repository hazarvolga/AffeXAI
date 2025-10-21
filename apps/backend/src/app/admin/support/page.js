"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SupportDashboardPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const support_data_1 = require("@/lib/support-data");
const avatar_1 = require("@/components/ui/avatar");
const utils_1 = require("@/lib/utils");
const getStatusIcon = (status) => {
    switch (status) {
        case 'Open':
            return <lucide_react_1.ArrowRight className="h-4 w-4 text-blue-500"/>;
        case 'In Progress':
            return <lucide_react_1.Circle className="h-4 w-4 text-yellow-500 animate-pulse"/>;
        case 'Resolved':
            return <lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-500"/>;
        case 'Closed':
            return <lucide_react_1.XCircle className="h-4 w-4 text-muted-foreground"/>;
        default:
            return <lucide_react_1.Circle className="h-4 w-4"/>;
    }
};
const getPriorityIcon = (priority) => {
    switch (priority) {
        case 'High':
            return <lucide_react_1.ArrowUp className="h-4 w-4 text-red-500"/>;
        case 'Medium':
            return <lucide_react_1.ArrowRight className="h-4 w-4 text-yellow-500"/>;
        case 'Low':
            return <lucide_react_1.ArrowDown className="h-4 w-4 text-green-500"/>;
        default:
            return <lucide_react_1.ArrowRight className="h-4 w-4"/>;
    }
};
const getInitials = (name) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('');
};
function SupportDashboardPage() {
    const stats = {
        open: support_data_1.supportTickets.filter(t => t.status === 'Open').length,
        inProgress: support_data_1.supportTickets.filter(t => t.status === 'In Progress').length,
        resolved: support_data_1.supportTickets.filter(t => t.status === 'Resolved').length,
        closed: support_data_1.supportTickets.filter(t => t.status === 'Closed').length,
    };
    const statCards = [
        { title: "Açık Talepler", value: stats.open, icon: lucide_react_1.Activity },
        { title: "İşlemde", value: stats.inProgress, icon: lucide_react_1.Clock },
        { title: "Çözüldü", value: stats.resolved, icon: lucide_react_1.Check },
        { title: "Kapandı", value: stats.closed, icon: lucide_react_1.XCircle },
    ];
    const recentTickets = [...support_data_1.supportTickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
    return (<div className="space-y-8">
       <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destek Paneli</h2>
            <p className="text-muted-foreground">
              Destek taleplerine genel bir bakış.
            </p>
          </div>
          <div className="flex gap-2">
            <button_1.Button asChild>
                <link_1.default href="/admin/support/new">
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                    Yeni Talep Oluştur
                </link_1.default>
            </button_1.Button>
             <button_1.Button asChild variant="outline">
                <link_1.default href="/admin/support/categories">
                    <lucide_react_1.Book className="mr-2 h-4 w-4"/>
                    Kategorileri Yönet
                </link_1.default>
            </button_1.Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {statCards.map(stat => (<card_1.Card key={stat.title}>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">{stat.title}</card_1.CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </card_1.CardContent>
                </card_1.Card>))}
        </div>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between">
            <div>
              <card_1.CardTitle>Son Destek Talepleri</card_1.CardTitle>
              <card_1.CardDescription>
                En son oluşturulan 5 destek talebi.
              </card_1.CardDescription>
            </div>
          </card_1.CardHeader>
          <card_1.CardContent>
            <table_1.Table>
              <table_1.TableHeader>
                <table_1.TableRow>
                  <table_1.TableHead>Talep ID</table_1.TableHead>
                  <table_1.TableHead>Konu</table_1.TableHead>
                  <table_1.TableHead>Kullanıcı</table_1.TableHead>
                  <table_1.TableHead>Durum</table_1.TableHead>
                  <table_1.TableHead>Öncelik</table_1.TableHead>
                  <table_1.TableHead>
                    <span className="sr-only">Eylemler</span>
                  </table_1.TableHead>
                </table_1.TableRow>
              </table_1.TableHeader>
              <table_1.TableBody>
                {recentTickets.map(ticket => (<table_1.TableRow key={ticket.id}>
                    <table_1.TableCell className="font-mono text-xs">#{ticket.id}</table_1.TableCell>
                    <table_1.TableCell className="font-medium">
                      <link_1.default href={`/admin/support/${ticket.id}`} className="hover:underline">
                        {ticket.subject}
                      </link_1.default>
                      <div className="text-xs text-muted-foreground">
                        {ticket.category}
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex items-center gap-2">
                        <avatar_1.Avatar className="h-8 w-8">
                          <avatar_1.AvatarFallback>
                            {getInitials(ticket.user.name)}
                          </avatar_1.AvatarFallback>
                        </avatar_1.Avatar>
                        <div>
                          <div>{ticket.user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {ticket.user.email}
                          </div>
                        </div>
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <badge_1.Badge variant={ticket.status === 'Resolved' || ticket.status === 'Closed'
                ? 'outline'
                : 'default'} className={(0, utils_1.cn)('flex items-center gap-1.5', ticket.status === 'Open' && 'bg-blue-500/20 text-blue-700', ticket.status === 'In Progress' &&
                'bg-yellow-500/20 text-yellow-700')}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </badge_1.Badge>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <div className="flex items-center gap-1.5">
                        {getPriorityIcon(ticket.priority)}
                        {ticket.priority}
                      </div>
                    </table_1.TableCell>
                    <table_1.TableCell>
                      <dropdown_menu_1.DropdownMenu>
                        <dropdown_menu_1.DropdownMenuTrigger asChild>
                          <button_1.Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menüyü aç</span>
                            <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
                          </button_1.Button>
                        </dropdown_menu_1.DropdownMenuTrigger>
                        <dropdown_menu_1.DropdownMenuContent align="end">
                          <dropdown_menu_1.DropdownMenuItem asChild>
                            <link_1.default href={`/admin/support/${ticket.id}`}>
                              Görüntüle ve Cevapla
                            </link_1.default>
                          </dropdown_menu_1.DropdownMenuItem>
                          <dropdown_menu_1.DropdownMenuItem>Kullanıcıyı Görüntüle</dropdown_menu_1.DropdownMenuItem>
                        </dropdown_menu_1.DropdownMenuContent>
                      </dropdown_menu_1.DropdownMenu>
                    </table_1.TableCell>
                  </table_1.TableRow>))}
              </table_1.TableBody>
            </table_1.Table>
          </card_1.CardContent>
          <card_1.CardFooter className="justify-between">
            <p className="text-sm text-muted-foreground">Toplam {support_data_1.supportTickets.length} talep bulunuyor.</p>
            <button_1.Button variant="outline" size="sm" asChild>
                <link_1.default href="#">Tüm Talepleri Gör</link_1.default>
            </button_1.Button>
          </card_1.CardFooter>
        </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map