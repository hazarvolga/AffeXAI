"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDetailPage;
const events_data_1 = require("@/lib/events-data");
const navigation_1 = require("next/navigation");
const image_1 = __importDefault(require("next/image"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("@/components/ui/avatar");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
// Mock ticket types for a specific event for demonstration
// In a real app, this would come from the event data
const ticketOptions = [
    { type: "Genel Giriş", price: 75, benefits: ["Tüm oturumlara erişim"], stock: 85 },
    { type: "VIP", price: 250, benefits: ["Ön sıra", "Konuşmacılarla tanışma", "Öğle yemeği dahil"], stock: 3 }
];
function EventDetailPage({ params }) {
    const initialEvent = events_data_1.events.find(e => e.id === params.eventId);
    const [event, setEvent] = (0, react_1.useState)(initialEvent);
    if (!event) {
        (0, navigation_1.notFound)();
    }
    const toggleFavorite = () => {
        setEvent(prevEvent => {
            if (!prevEvent)
                return undefined;
            // In a real app, you would also make an API call here to update the backend.
            return { ...prevEvent, isFavorite: !prevEvent.isFavorite };
        });
    };
    return (<div className="space-y-8">
            {/* Header */}
            <div className="relative h-[40vh] min-h-[300px] rounded-lg overflow-hidden">
                <image_1.default src={event.imageUrl} alt={event.title} fill className="object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <badge_1.Badge variant="secondary" className="mb-2">{event.category}</badge_1.Badge>
                    <h1 className="text-4xl font-bold">{event.title}</h1>
                    <p className="text-lg mt-1">{new Date(event.date).toLocaleString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Etkinlik Hakkında</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
                        </card_1.CardContent>
                    </card_1.Card>

                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Biletler</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                           {ticketOptions.map(ticket => (<div key={ticket.type} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                                   <div>
                                       <h3 className="font-semibold text-lg">{ticket.type}</h3>
                                       <p className="text-sm text-muted-foreground">{ticket.benefits.join(', ')}</p>
                                       <badge_1.Badge variant={ticket.stock < 10 ? 'destructive' : 'outline'} className="mt-2">
                                           {ticket.stock > 0 ? `Kalan Bilet: ${ticket.stock}` : "Tükendi"}
                                       </badge_1.Badge>
                                   </div>
                                   <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                       <span className="text-xl font-bold">{ticket.price} TL</span>
                                       <button_1.Button disabled={ticket.stock === 0}>
                                           <lucide_react_1.Ticket className="mr-2 h-4 w-4"/> Satın Al
                                       </button_1.Button>
                                   </div>
                               </div>))}
                        </card_1.CardContent>
                    </card_1.Card>

                    {event.assessments && event.assessments.length > 0 && (<card_1.Card>
                            <card_1.CardHeader>
                                <card_1.CardTitle>Değerlendirmeler</card_1.CardTitle>
                                <card_1.CardDescription>
                                    Etkinliği tamamlamak veya sertifika kazanmak için bu değerlendirmeleri tamamlamanız gerekebilir.
                                </card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="space-y-4">
                                {event.assessments.map((assessment) => (<div key={assessment.id} className="flex justify-between items-center p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <lucide_react_1.FileText className="h-6 w-6 text-primary"/>
                                            <div>
                                                <h3 className="font-semibold">{assessment.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {assessment.type === 'quiz' ? 'Quiz' : 'Anket'} - {assessment.questions.length} Soru
                                                </p>
                                            </div>
                                        </div>
                                        <button_1.Button asChild>
                                            <link_1.default href={`/portal/assessments/${assessment.id}`}>
                                                {assessment.type === 'quiz' ? 'Teste Başla' : 'Anketi Doldur'}
                                            </link_1.default>
                                        </button_1.Button>
                                    </div>))}
                            </card_1.CardContent>
                        </card_1.Card>)}

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="flex gap-2">
                        <button_1.Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                            <lucide_react_1.Ticket className="mr-2"/> Şimdi Kayıt Ol
                        </button_1.Button>
                        <button_1.Button variant="outline" size="icon" onClick={toggleFavorite}>
                            <lucide_react_1.Heart className={`h-5 w-5 transition-colors ${event.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}/>
                             <span className="sr-only">Favorilere ekle</span>
                        </button_1.Button>
                        <button_1.Button variant="outline" size="icon">
                            <lucide_react_1.Share2 className="h-5 w-5"/>
                             <span className="sr-only">Paylaş</span>
                        </button_1.Button>
                    </div>

                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Detaylar</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <lucide_react_1.Calendar className="h-4 w-4 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Tarih & Saat</p>
                                    <p className="text-muted-foreground">{new Date(event.date).toLocaleString('tr-TR', { dateStyle: 'full', timeStyle: 'short' })}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <lucide_react_1.MapPin className="h-4 w-4 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Mekan</p>
                                    <p className="text-muted-foreground">{event.isOnline ? "Çevrimiçi" : `${event.location.venue}, ${event.location.city}`}</p>
                                    {!event.isOnline && <a href="#" className="text-primary text-xs hover:underline">Haritada Gör</a>}
                                </div>
                            </div>
                              <div className="flex items-start gap-3">
                                <lucide_react_1.Users className="h-4 w-4 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Organizatör</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <avatar_1.Avatar className="h-6 w-6">
                                            <avatar_1.AvatarImage src={event.organizer.avatarUrl}/>
                                            <avatar_1.AvatarFallback>{event.organizer.name.charAt(0)}</avatar_1.AvatarFallback>
                                        </avatar_1.Avatar>
                                        <span className="text-muted-foreground">{event.organizer.name}</span>
                                    </div>
                                </div>
                            </div>
                             {event.grantsCertificate && (<div className="flex items-start gap-3">
                                    <lucide_react_1.CheckCircle className="h-4 w-4 mt-1 text-muted-foreground"/>
                                    <div>
                                        <p className="font-semibold">Sertifika</p>
                                        <p className="text-muted-foreground">Bu etkinlik sonunda katılım sertifikası verilmektedir.</p>
                                    </div>
                                </div>)}
                        </card_1.CardContent>
                    </card_1.Card>
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map