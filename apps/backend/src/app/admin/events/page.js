"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventsDashboardPage;
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const pagination_1 = require("@/components/ui/pagination");
const tabs_1 = require("@/components/ui/tabs");
const progress_1 = require("@/components/ui/progress");
const input_1 = require("@/components/ui/input");
const react_1 = require("react");
const eventsService_1 = __importDefault(require("@/lib/api/eventsService"));
const EventTable = ({ eventsToShow }) => {
    if (eventsToShow.length === 0) {
        return <div className="text-center text-muted-foreground py-12">Bu görünümde gösterilecek etkinlik yok.</div>;
    }
    return (<>
            <table_1.Table>
                <table_1.TableHeader>
                    <table_1.TableRow>
                        <table_1.TableHead>Etkinlik Adı</table_1.TableHead>
                        <table_1.TableHead>Durum</table_1.TableHead>
                        <table_1.TableHead>Tarih</table_1.TableHead>
                        <table_1.TableHead>Mekan</table_1.TableHead>
                        <table_1.TableHead>Bilet Satışı</table_1.TableHead>
                        <table_1.TableHead><span className="sr-only">Eylemler</span></table_1.TableHead>
                    </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                    {eventsToShow.map(event => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < new Date();
            const ticketsSold = event.attendees?.length || 0;
            const capacity = 150; // Mock data
            const progress = (ticketsSold / capacity) * 100;
            return (<table_1.TableRow key={event.id}>
                                <table_1.TableCell className="font-medium">
                                    <div>{event.title}</div>
                                    <div className="text-xs text-muted-foreground">{event.category}</div>
                                </table_1.TableCell>
                                <table_1.TableCell>
                                    <badge_1.Badge variant={isPast ? "outline" : "default"} className={!isPast ? "bg-green-500" : ""}>
                                        {isPast ? 'Tamamlandı' : 'Yaklaşıyor'}
                                    </badge_1.Badge>
                                </table_1.TableCell>
                                <table_1.TableCell>{eventDate.toLocaleDateString('tr-TR')}</table_1.TableCell>
                                <table_1.TableCell>{event.isOnline ? "Online" : event.location.city}</table_1.TableCell>
                                <table_1.TableCell>
                                    <div className="flex flex-col gap-1.5">
                                        <progress_1.Progress value={progress} className="h-2"/>
                                        <span className="text-xs text-muted-foreground">{ticketsSold} / {capacity}</span>
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
                                                <link_1.default href={`/admin/events/${event.id}`}>Düzenle</link_1.default>
                                            </dropdown_menu_1.DropdownMenuItem>
                                            <dropdown_menu_1.DropdownMenuItem>
                                               <lucide_react_1.BarChart2 className="mr-2 h-4 w-4"/> Analitik
                                            </dropdown_menu_1.DropdownMenuItem>
                                            <dropdown_menu_1.DropdownMenuSeparator />
                                            <dropdown_menu_1.DropdownMenuItem className="text-destructive focus:text-destructive">
                                                Sil
                                            </dropdown_menu_1.DropdownMenuItem>
                                        </dropdown_menu_1.DropdownMenuContent>
                                    </dropdown_menu_1.DropdownMenu>
                                </table_1.TableCell>
                            </table_1.TableRow>);
        })}
                </table_1.TableBody>
            </table_1.Table>
             <card_1.CardFooter className="pt-6">
                <pagination_1.Pagination>
                    <pagination_1.PaginationContent>
                        <pagination_1.PaginationItem><pagination_1.PaginationPrevious href="#"/></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationLink href="#">1</pagination_1.PaginationLink></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationLink href="#" isActive>2</pagination_1.PaginationLink></pagination_1.PaginationItem>
                        <pagination_1.PaginationItem><pagination_1.PaginationNext href="#"/></pagination_1.PaginationItem>
                    </pagination_1.PaginationContent>
                </pagination_1.Pagination>
            </card_1.CardFooter>
        </>);
};
function EventsDashboardPage() {
    const [events, setEvents] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)({
        upcomingEvents: 0,
        totalTicketSales: 0,
        totalParticipants: 0,
        monthlyRevenue: 0,
        revenueChange: 0
    });
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Fetch events and stats from backend
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Fetching data from backend...');
                // Fetch events
                console.log('Fetching events...');
                const backendEvents = await eventsService_1.default.getAllEvents();
                console.log('Received events:', backendEvents.length);
                // Map backend events to frontend format
                const frontendEvents = backendEvents.map(event => ({
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    category: 'Etkinlik', // Default category since it's not in backend model
                    date: event.startDate,
                    imageUrl: 'https://picsum.photos/seed/event1/800/450', // Default image
                    isOnline: false, // Default value
                    location: {
                        venue: event.location,
                        address: event.location,
                        city: 'İstanbul', // Default city
                        country: 'Türkiye' // Default country
                    },
                    organizer: {
                        id: 'org-01', // Default organizer
                        name: 'Aluplan Digital', // Default organizer
                        avatarUrl: 'https://i.pravatar.cc/150?u=aluplan' // Default avatar
                    },
                    isFavorite: false, // Default value
                    grantsCertificate: true, // Default value
                    certificateTitle: `${event.title} Katılım Sertifikası`, // Default certificate title
                    attendees: [], // Empty for now
                    assessments: [] // Empty for now
                }));
                setEvents(frontendEvents);
                // Fetch dashboard stats
                console.log('Fetching dashboard stats...');
                const dashboardStats = await eventsService_1.default.getDashboardStats();
                console.log('Received dashboard stats:', dashboardStats);
                setStats(dashboardStats);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching data:', err);
                console.error('Error name:', err.name);
                console.error('Error message:', err.message);
                console.error('Error stack:', err.stack);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                }
                setError('Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
    const pastEvents = events.filter(e => new Date(e.date) < new Date());
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    return (<div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Etkinlik Paneli</h1>
                    <p className="text-muted-foreground">Etkinliklerinize genel bir bakış atın ve yönetin.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <button_1.Button variant="outline">
                        <lucide_react_1.FileUp className="mr-2 h-4 w-4"/>
                        İçe Aktar
                    </button_1.Button>
                    <button_1.Button asChild>
                        <link_1.default href="/admin/events/new">
                            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/>
                            Yeni Etkinlik Oluştur
                        </link_1.default>
                    </button_1.Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Yaklaşan Etkinlikler</card_1.CardTitle>
                        <lucide_react_1.CalendarDays className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Bilet Satışı</card_1.CardTitle>
                        <lucide_react_1.Ticket className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{stats.totalTicketSales.toLocaleString()}</div>
                         <p className="text-xs text-muted-foreground">Tüm etkinlikler</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Katılımcı</card_1.CardTitle>
                        <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{stats.totalParticipants.toLocaleString()}</div>
                         <p className="text-xs text-muted-foreground">Geçmiş etkinlikler</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Bu Ayki Gelir</card_1.CardTitle>
                        <lucide_react_1.Ticket className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">₺{stats.monthlyRevenue.toLocaleString()}</div>
                         <p className="text-xs text-muted-foreground">Geçen aya göre +{stats.revenueChange}%</p>
                    </card_1.CardContent>
                </card_1.Card>
            </div>

            <card_1.Card>
                <tabs_1.Tabs defaultValue="all">
                     <card_1.CardHeader>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                             <tabs_1.TabsList>
                                <tabs_1.TabsTrigger value="all">Tüm Etkinlikler</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="upcoming">Yaklaşan</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="past">Geçmiş</tabs_1.TabsTrigger>
                                <tabs_1.TabsTrigger value="drafts">Taslaklar</tabs_1.TabsTrigger>
                            </tabs_1.TabsList>
                            <div className="relative md:w-1/3">
                                <lucide_react_1.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <input_1.Input placeholder="Etkinlik ara..." className="pl-8 w-full"/>
                            </div>
                        </div>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <tabs_1.TabsContent value="all">
                            <EventTable eventsToShow={events}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="upcoming">
                           <EventTable eventsToShow={upcomingEvents}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="past">
                            <EventTable eventsToShow={pastEvents}/>
                        </tabs_1.TabsContent>
                        <tabs_1.TabsContent value="drafts">
                           <div className="text-center text-muted-foreground py-12">Taslak etkinlik bulunmuyor.</div>
                        </tabs_1.TabsContent>
                    </card_1.CardContent>
                </tabs_1.Tabs>
            </card_1.Card>
        </div>);
}
//# sourceMappingURL=page.js.map