"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicketDetailPage;
const support_data_1 = require("@/lib/support-data");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const badge_1 = require("@/components/ui/badge");
const avatar_1 = require("@/components/ui/avatar");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const separator_1 = require("@/components/ui/separator");
const react_1 = require("react");
const react_2 = require("react");
function TicketDetailPage({ params, }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { ticketId } = unwrappedParams;
    const [ticket, setTicket] = (0, react_1.useState)(undefined);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedTicket = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedTicket.current)
            return;
        hasFetchedTicket.current = true;
        const fetchTicket = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch the ticket data from an API
                // For now, we're using mock data
                const ticketData = support_data_1.supportTickets.find(t => t.id === ticketId);
                if (!ticketData) {
                    (0, navigation_1.notFound)();
                    return;
                }
                setTicket(ticketData);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching ticket:', err);
                setError('Talep bilgileri yüklenirken bir hata oluştu.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!ticket) {
        (0, navigation_1.notFound)();
        return null;
    }
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('');
    };
    return (<div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="text-2xl">{ticket.subject}</card_1.CardTitle>
            <card_1.CardDescription>
              {ticket.user.name} tarafından{' '}
              {new Date(ticket.createdAt).toLocaleString('tr-TR', {
            dateStyle: 'long',
            timeStyle: 'short',
        })}{' '}
              tarihinde oluşturuldu.
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-6">
              {ticket.messages.map((message, index) => (<div key={index} className="flex items-start gap-4">
                  <avatar_1.Avatar>
                    <avatar_1.AvatarImage src={message.author.avatarUrl}/>
                    <avatar_1.AvatarFallback>
                      {getInitials(message.author.name)}
                    </avatar_1.AvatarFallback>
                  </avatar_1.Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{message.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div className="mt-2 p-4 bg-secondary/50 rounded-lg whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                  </div>
                </div>))}
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Cevap Yaz</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <textarea_1.Textarea placeholder="Cevabınızı buraya yazın..." className="min-h-[150px]"/>
          </card_1.CardContent>
          <card_1.CardFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              <button_1.Button variant="ghost" size="icon">
                <lucide_react_1.Paperclip className="h-4 w-4"/>
                <span className="sr-only">Dosya Ekle</span>
              </button_1.Button>
            </div>
            <button_1.Button>
              <lucide_react_1.Send className="mr-2 h-4 w-4"/> Cevabı Gönder
            </button_1.Button>
          </card_1.CardFooter>
        </card_1.Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Talep Yönetimi</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="space-y-2">
              <label_1.Label>Durum</label_1.Label>
              <select_1.Select defaultValue={ticket.status}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="Open">Açık</select_1.SelectItem>
                  <select_1.SelectItem value="In Progress">İşlemde</select_1.SelectItem>
                  <select_1.SelectItem value="Resolved">Çözüldü</select_1.SelectItem>
                  <select_1.SelectItem value="Closed">Kapalı</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            <div className="space-y-2">
              <label_1.Label>Öncelik</label_1.Label>
              <select_1.Select defaultValue={ticket.priority}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="Low">Düşük</select_1.SelectItem>
                  <select_1.SelectItem value="Medium">Orta</select_1.SelectItem>
                  <select_1.SelectItem value="High">Yüksek</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            <div className="space-y-2">
              <label_1.Label>Atanan Kişi</label_1.Label>
              <select_1.Select defaultValue={ticket.assignee.id}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="usr-001">Ahmet Yılmaz (Admin)</select_1.SelectItem>
                  <select_1.SelectItem value="usr-002">Zeynep Kaya (Destek)</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            <button_1.Button className="w-full">Değişiklikleri Kaydet</button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Talep Detayları</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.Hash className="h-4 w-4"/> Talep ID
              </span>
              <span className="font-mono text-xs">#{ticket.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.Tag className="h-4 w-4"/> Kategori
              </span>
              <badge_1.Badge variant="outline">{ticket.category}</badge_1.Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.Clock className="h-4 w-4"/> Oluşturulma
              </span>
              <span>
                {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            <separator_1.Separator />
            <div className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4"/> Müşteri
              </span>
              <span>{ticket.user.name}</span>
            </div>
            <p className="text-muted-foreground">{ticket.user.email}</p>
            <p className="text-muted-foreground text-xs">{ticket.user.company}</p>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map