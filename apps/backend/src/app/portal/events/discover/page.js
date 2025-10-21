"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiscoverEventsPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const events_data_1 = require("@/lib/events-data");
const badge_1 = require("@/components/ui/badge");
const react_1 = require("react");
const calendar_1 = require("@/components/ui/calendar");
const popover_1 = require("@/components/ui/popover");
const date_fns_1 = require("date-fns");
const label_1 = require("@/components/ui/label");
const EventCard = ({ event }) => (<card_1.Card className="flex flex-col overflow-hidden group transition-shadow hover:shadow-lg">
        <link_1.default href={`/portal/events/${event.id}`} className="block">
            <div className="relative aspect-[16/9] overflow-hidden">
                <image_1.default src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                <badge_1.Badge className="absolute top-2 right-2" variant={event.isOnline ? "secondary" : "default"}>
                    {event.isOnline ? "Online" : "Yüz Yüze"}
                </badge_1.Badge>
            </div>
        </link_1.default>
        <card_1.CardHeader>
            <link_1.default href={`/portal/events/${event.id}`}>
                <card_1.CardTitle className="text-lg group-hover:text-primary transition-colors">{event.title}</card_1.CardTitle>
            </link_1.default>
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
function DiscoverEventsPage() {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [category, setCategory] = (0, react_1.useState)('all');
    const [location, setLocation] = (0, react_1.useState)('all');
    const [date, setDate] = (0, react_1.useState)(undefined);
    const filteredEvents = events_data_1.events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || event.category === category;
        const eventLocation = event.isOnline ? 'Online' : event.location.city;
        const matchesLocation = location === 'all' || eventLocation === location;
        const matchesDate = !date || new Date(event.date).toDateString() === date.toDateString();
        return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
    const resetFilters = () => {
        setSearchTerm('');
        setCategory('all');
        setLocation('all');
        setDate(undefined);
    };
    const categories = [...new Set(events_data_1.events.map(e => e.category))];
    const locations = [...new Set(events_data_1.events.filter(e => !e.isOnline).map(e => e.location.city))];
    return (<div className="flex-1 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Etkinlik Keşfet</h2>
                <p className="text-muted-foreground">İlgi alanlarınıza uygun yeni etkinlikler bulun.</p>
            </div>

            <card_1.Card>
                <card_1.CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
                        <div className="lg:col-span-2">
                            <label_1.Label htmlFor="search-event" className="text-sm font-medium">Etkinlik Ara</label_1.Label>
                            <input_1.Input id="search-event" placeholder="Etkinlik adı, açıklama..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                        <div>
                             <label_1.Label htmlFor="category-filter" className="text-sm font-medium">Kategori</label_1.Label>
                             <select_1.Select value={category} onValueChange={setCategory}>
                                <select_1.SelectTrigger id="category-filter"><select_1.SelectValue /></select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectItem value="all">Tüm Kategoriler</select_1.SelectItem>
                                    {categories.map(cat => <select_1.SelectItem key={cat} value={cat}>{cat}</select_1.SelectItem>)}
                                </select_1.SelectContent>
                            </select_1.Select>
                        </div>
                         <div>
                             <label_1.Label htmlFor="location-filter" className="text-sm font-medium">Lokasyon</label_1.Label>
                             <select_1.Select value={location} onValueChange={setLocation}>
                                <select_1.SelectTrigger id="location-filter"><select_1.SelectValue /></select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectItem value="all">Tüm Lokasyonlar</select_1.SelectItem>
                                     {locations.map(loc => <select_1.SelectItem key={loc} value={loc}>{loc}</select_1.SelectItem>)}
                                     <select_1.SelectItem value="Online">Online</select_1.SelectItem>
                                </select_1.SelectContent>
                            </select_1.Select>
                        </div>
                        <div>
                            <label_1.Label htmlFor="date-filter" className="text-sm font-medium">Tarih</label_1.Label>
                             <popover_1.Popover>
                                <popover_1.PopoverTrigger asChild>
                                <button_1.Button id="date-filter" variant={"outline"} className="w-full justify-start text-left font-normal">
                                    <lucide_react_1.Calendar className="mr-2 h-4 w-4"/>
                                    {date ? (0, date_fns_1.format)(date, "PPP") : <span>Bir tarih seçin</span>}
                                </button_1.Button>
                                </popover_1.PopoverTrigger>
                                <popover_1.PopoverContent className="w-auto p-0">
                                    <calendar_1.Calendar mode="single" selected={date} onSelect={setDate} initialFocus/>
                                </popover_1.PopoverContent>
                            </popover_1.Popover>
                        </div>
                    </div>
                     <div className="flex justify-end mt-4">
                        <button_1.Button variant="ghost" onClick={resetFilters}>
                            <lucide_react_1.X className="mr-2 h-4 w-4"/>
                            Filtreleri Temizle
                        </button_1.Button>
                    </div>
                </card_1.CardContent>
            </card_1.Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map(event => <EventCard key={event.id} event={event}/>)}
                {filteredEvents.length === 0 && (<div className="col-span-full text-center text-muted-foreground py-10 flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-lg">
                        <lucide_react_1.Search className="h-12 w-12 text-muted-foreground/50"/>
                        <p>Aramanızla eşleşen bir etkinlik bulunamadı.</p>
                        <button_1.Button variant="outline" onClick={resetFilters}>Filtreleri Sıfırla</button_1.Button>
                    </div>)}
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map