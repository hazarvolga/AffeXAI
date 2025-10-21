"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TicketDetailPage;
const support_data_1 = require("@/lib/support-data");
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const avatar_1 = require("@/components/ui/avatar");
const lucide_react_1 = require("lucide-react");
const separator_1 = require("@/components/ui/separator");
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
function TicketDetailPage({ params, }) {
    const ticket = support_data_1.supportTickets.find(t => t.id === params.ticketId);
    if (!ticket) {
        (0, navigation_1.notFound)();
    }
    // Determine if the current user can reply
    const canReply = 
    // Case 1: The user is the original creator of the ticket
    ticket.user.id === mockUser.id ||
        // Case 2: The user is a Support Team member AND the ticket is assigned to them
        (mockUser.role === 'Support Team' && ticket.assignee.id === mockUser.id);
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
            <div className="flex justify-between items-start">
                <div>
                    <badge_1.Badge variant="outline" className='mb-2'>{ticket.category}</badge_1.Badge>
                    <card_1.CardTitle className="text-2xl">{ticket.subject}</card_1.CardTitle>
                    <card_1.CardDescription>
                    Talep ID: #{ticket.id}
                    </card_1.CardDescription>
                </div>
                 <div className='text-right'>
                    <badge_1.Badge variant={ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'default' : 'destructive'} className={ticket.status === 'Open' ? 'bg-blue-500' : ticket.status === 'In Progress' ? 'bg-yellow-500' : ''}>{ticket.status}</badge_1.Badge>
                    <p className='text-sm text-muted-foreground mt-1'>Öncelik: {ticket.priority}</p>
                 </div>
            </div>
          </card_1.CardHeader>
          <separator_1.Separator />
          <card_1.CardContent className="pt-6">
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
                        {new Date(message.timestamp).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}
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

        {canReply && (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Cevap Yaz</card_1.CardTitle>
                <card_1.CardDescription>Talebinize yeni bir mesaj ekleyin.</card_1.CardDescription>
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
            </card_1.Card>)}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Talep Detayları</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4 text-sm">
             <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.User className="h-4 w-4"/> Atanan Temsilci
              </span>
              <div className="flex items-center gap-2">
                    <avatar_1.Avatar className="h-6 w-6">
                        <avatar_1.AvatarImage src={ticket.assignee.avatarUrl}/>
                        <avatar_1.AvatarFallback>{getInitials(ticket.assignee.name)}</avatar_1.AvatarFallback>
                    </avatar_1.Avatar>
                    <span className="font-medium">{ticket.assignee.name}</span>
                </div>
            </div>
            <separator_1.Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.Clock className="h-4 w-4"/> Oluşturulma
              </span>
              <span>
                {new Date(ticket.createdAt).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <lucide_react_1.Clock className="h-4 w-4"/> Son Güncelleme
              </span>
              <span>
                 {new Date(ticket.lastUpdated).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
            <separator_1.Separator />
             <button_1.Button variant="outline" className="w-full">Talebi Kapat</button_1.Button>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map