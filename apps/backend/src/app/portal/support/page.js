"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserSupportTicketsPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const support_data_1 = require("@/lib/support-data");
const pagination_1 = require("@/components/ui/pagination");
const utils_1 = require("@/lib/utils");
// Mock user object to simulate roles. In a real app, this would come from an auth context.
const mockUser = {
    id: 'usr-portal-01', // This is the normal user 'Ayşe Vural'
    role: 'Customer', // Can be 'Customer', 'Editor', or 'Support Team'
};
// To test the support team view, change the mockUser to this:
/*
const mockUser = {
    id: 'usr-002', // This is the support agent 'Zeynep Kaya'
    role: 'Support Team',
};
*/
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
function UserSupportTicketsPage() {
    const userTickets = mockUser.role === 'Support Team'
        ? support_data_1.supportTickets // Support Team sees all tickets
        : support_data_1.supportTickets.filter(ticket => ticket.user.id === mockUser.id); // Customers see only their own tickets
    return (<div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Destek Taleplerim</h2>
          <p className="text-muted-foreground">
            Oluşturduğunuz tüm destek taleplerini buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <button_1.Button asChild>
                <link_1.default href="/portal/support/new">
                    <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                    Yeni Destek Talebi Oluştur
                </link_1.default>
            </button_1.Button>
             <button_1.Button asChild variant="outline">
                <link_1.default href="/portal/dashboard">
                    <lucide_react_1.ArrowLeft className="mr-2 h-4 w-4"/>
                    Geri Dön
                </link_1.default>
            </button_1.Button>
        </div>
      </div>

      <card_1.Card>
        <card_1.CardContent className="p-0">
          <table_1.Table>
            <table_1.TableHeader>
              <table_1.TableRow>
                <table_1.TableHead>Talep ID</table_1.TableHead>
                <table_1.TableHead>Konu</table_1.TableHead>
                <table_1.TableHead>Durum</table_1.TableHead>
                <table_1.TableHead>Öncelik</table_1.TableHead>
                <table_1.TableHead>Son Güncelleme</table_1.TableHead>
                <table_1.TableHead>
                  <span className="sr-only">Eylemler</span>
                </table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {userTickets.map(ticket => (<table_1.TableRow key={ticket.id}>
                  <table_1.TableCell className="font-mono text-xs">#{ticket.id}</table_1.TableCell>
                  <table_1.TableCell className="font-medium">
                    <link_1.default href={`/portal/support/${ticket.id}`} className="hover:underline">
                      {ticket.subject}
                    </link_1.default>
                    <div className="text-xs text-muted-foreground">
                      {ticket.category}
                    </div>
                  </table_1.TableCell>
                  <table_1.TableCell>
                    <badge_1.Badge variant={ticket.status === 'Resolved' || ticket.status === 'Closed'
                ? 'outline'
                : 'default'} className={(0, utils_1.cn)('flex items-center gap-1.5 w-fit', ticket.status === 'Open' && 'bg-blue-500/20 text-blue-700', ticket.status === 'In Progress' &&
                'bg-yellow-500/20 text-yellow-700', ticket.status === 'Resolved' &&
                'bg-green-500/20 text-green-700')}>
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
                    {new Date(ticket.lastUpdated).toLocaleDateString('tr-TR')}
                  </table_1.TableCell>
                   <table_1.TableCell>
                      <button_1.Button asChild variant="outline" size="sm">
                          <link_1.default href={`/portal/support/${ticket.id}`}>
                            Görüntüle
                          </link_1.default>
                      </button_1.Button>
                  </table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </card_1.CardContent>
        <card_1.CardFooter className="justify-end pt-6">
             <pagination_1.Pagination>
                <pagination_1.PaginationContent>
                    <pagination_1.PaginationItem><pagination_1.PaginationPrevious href="#"/></pagination_1.PaginationItem>
                    <pagination_1.PaginationItem><pagination_1.PaginationLink href="#">1</pagination_1.PaginationLink></pagination_1.PaginationItem>
                    <pagination_1.PaginationItem><pagination_1.PaginationNext href="#"/></pagination_1.PaginationItem>
                </pagination_1.PaginationContent>
            </pagination_1.Pagination>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map