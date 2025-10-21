"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyEventsPage;
const tabs_1 = require("@/components/ui/tabs");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const events_data_1 = require("@/lib/events-data");
const badge_1 = require("@/components/ui/badge");
// Mock user object to simulate roles. In a real app, this would come from an auth context.
const mockUser = {
    role: 'Editor', // Can be 'Participant', 'Editor', 'Support Team'
};
const EventCard = ({ event }) => (<card_1.Card className="flex flex-col overflow-hidden group transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
            <image_1.default src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
            <badge_1.Badge className="absolute top-2 right-2" variant={event.isOnline ? "secondary" : "default"}>
                {event.isOnline ? "Online" : "Yüz Yüze"}
            </badge_1.Badge>
        </div>
        <card_1.CardHeader>
            <card_1.CardTitle className="text-lg group-hover:text-primary transition-colors">{event.title}</card_1.CardTitle>
            <card_1.CardDescription>{new Date(event.date).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' })}</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <lucide_react_1.MapPin className="h-4 w-4"/>
                <span>{event.isOnline ? "Çevrimiçi" : `${event.location.venue}, ${event.location.city}`}</span>
            </div>
            <div className="flex items-center gap-2">
                <lucide_react_1.Tag className="h-4 w-4"/>
                <span>{event.category}</span>
            </div>
        </card_1.CardContent>
        <card_1.CardFooter>
            <button_1.Button asChild className="w-full">
                <link_1.default href={`/portal/events/${event.id}`}>
                    Detayları Görüntüle <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                </link_1.default>
            </button_1.Button>
        </card_1.CardFooter>
    </card_1.Card>);
function MyEventsPage() {
    const now = new Date();
    const upcomingEvents = events_data_1.events.filter(e => new Date(e.date) >= now);
    const pastEvents = events_data_1.events.filter(e => new Date(e.date) < now);
    const favoriteEvents = events_data_1.events.filter(e => e.isFavorite);
    return (<div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Etkinliklerim</h2>
                    <p className="text-muted-foreground">Kayıtlı olduğunuz ve favorilerinize eklediğiniz etkinlikler.</p>
                </div>
                <div className="flex gap-2">
                    <button_1.Button variant="outline" asChild>
                         <link_1.default href="/portal/events/discover">
                            <lucide_react_1.Search className="mr-2 h-4 w-4"/> Etkinlik Keşfet
                        </link_1.default>
                    </button_1.Button>
                    {mockUser.role === 'Editor' && (<button_1.Button asChild>
                             <link_1.default href="/admin/events/new">
                                <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Yeni Etkinlik Oluştur
                            </link_1.default>
                        </button_1.Button>)}
                </div>
            </div>

            <tabs_1.Tabs defaultValue="upcoming">
                <tabs_1.TabsList>
                    <tabs_1.TabsTrigger value="upcoming">Yaklaşan Etkinlikler</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="past">Geçmiş Etkinlikler</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="favorites">Favoriler</tabs_1.TabsTrigger>
                </tabs_1.TabsList>
                <tabs_1.TabsContent value="upcoming" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {upcomingEvents.map(event => <EventCard key={event.id} event={event}/>)}
                        {upcomingEvents.length === 0 && (<p className="col-span-full text-center text-muted-foreground">Yaklaşan bir etkinliğiniz bulunmuyor.</p>)}
                    </div>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="past" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {pastEvents.map(event => <EventCard key={event.id} event={event}/>)}
                         {pastEvents.length === 0 && (<p className="col-span-full text-center text-muted-foreground">Geçmiş bir etkinliğiniz bulunmuyor.</p>)}
                    </div>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="favorites" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoriteEvents.map(event => <EventCard key={event.id} event={event}/>)}
                         {favoriteEvents.length === 0 && (<p className="col-span-full text-center text-muted-foreground">Favori etkinliğiniz bulunmuyor.</p>)}
                    </div>
                </tabs_1.TabsContent>
            </tabs_1.Tabs>
        </div>);
}
//# sourceMappingURL=page.js.map