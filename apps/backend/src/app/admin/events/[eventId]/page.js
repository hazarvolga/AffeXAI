"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditEventPage;
const event_form_1 = require("@/components/admin/event-form");
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_2 = require("lucide-react");
const tabs_1 = require("@/components/ui/tabs");
const social_media_manager_1 = require("@/components/admin/social-media/social-media-manager");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const eventsService_1 = __importDefault(require("@/lib/api/eventsService"));
const react_2 = require("react");
function EditEventPage({ params }) {
    // Unwrap the params promise using React.use()
    const unwrappedParams = (0, react_2.use)(params);
    const { eventId } = unwrappedParams;
    const [event, setEvent] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const hasFetchedEvent = (0, react_1.useRef)(false);
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        // Prevent multiple fetches
        if (hasFetchedEvent.current)
            return;
        hasFetchedEvent.current = true;
        const fetchEvent = async () => {
            try {
                setLoading(true);
                // Fetch event from backend
                const backendEvent = await eventsService_1.default.getEventById(eventId);
                // Map backend event to frontend format
                const frontendEvent = {
                    id: backendEvent.id,
                    title: backendEvent.title,
                    description: backendEvent.description,
                    category: 'Etkinlik', // Default category since it's not in backend model
                    date: backendEvent.startDate,
                    imageUrl: 'https://picsum.photos/seed/event1/800/450', // Default image
                    isOnline: false, // Default value
                    location: {
                        venue: backendEvent.location,
                        address: backendEvent.location,
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
                    certificateTitle: `${backendEvent.title} Katılım Sertifikası`, // Default certificate title
                    attendees: [], // Empty for now
                    assessments: [] // Empty for now
                };
                setEvent(frontendEvent);
                setError(null);
            }
            catch (err) {
                console.error('Error fetching event:', err);
                if (err.response?.status === 404) {
                    (0, navigation_1.notFound)();
                }
                else {
                    setError('Etkinlik bilgileri yüklenirken bir hata oluştu.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, []); // Empty dependency array since we're using useRef to prevent multiple calls
    if (loading) {
        return <div className="flex justify-center items-center h-64">Yükleniyor...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-12">{error}</div>;
    }
    if (!event) {
        (0, navigation_1.notFound)();
        return null;
    }
    return (<div className="space-y-8">
             <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Etkinlik Yönetimi: {event.title}</h1>
                <p className="text-muted-foreground">Etkinlik detaylarını düzenleyin, katılımcıları ve değerlendirmeleri yönetin.</p>
            </div>

            <tabs_1.Tabs defaultValue="edit">
                <tabs_1.TabsList className="grid w-full grid-cols-4">
                    <tabs_1.TabsTrigger value="edit">Etkinliği Düzenle</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="attendees">Katılımcılar ({event.attendees?.length || 0})</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="assessments">Değerlendirmeler ({event.assessments?.length || 0})</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="social">Sosyal Medyada Paylaş</tabs_1.TabsTrigger>
                </tabs_1.TabsList>
                <tabs_1.TabsContent value="edit" className="mt-6">
                     <event_form_1.EventForm event={event}/>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="attendees" className="mt-6">
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Katılımcı Yönetimi</card_1.CardTitle>
                            <card_1.CardDescription>
                                "{event.title}" etkinliğine kayıtlı katılımcıların listesi.
                            </card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <table_1.Table>
                                <table_1.TableHeader>
                                    <table_1.TableRow>
                                        <table_1.TableHead>Ad Soyad</table_1.TableHead>
                                        <table_1.TableHead>E-posta</table_1.TableHead>
                                        <table_1.TableHead>Bilet ID</table_1.TableHead>
                                        <table_1.TableHead>Sertifika Durumu</table_1.TableHead>
                                        <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                                    </table_1.TableRow>
                                </table_1.TableHeader>
                                <table_1.TableBody>
                                    {event.attendees?.map((attendee) => (<table_1.TableRow key={attendee.id}>
                                            <table_1.TableCell className="font-medium">{attendee.name}</table_1.TableCell>
                                            <table_1.TableCell>{attendee.email}</table_1.TableCell>
                                            <table_1.TableCell className="font-mono text-xs">{attendee.ticketId}</table_1.TableCell>
                                            <table_1.TableCell>
                                                {attendee.certificateId ? (<badge_1.Badge variant="default" className="bg-green-600 flex items-center w-fit gap-1">
                                                        <lucide_react_1.Check className="h-3 w-3"/> Verildi
                                                    </badge_1.Badge>) : (<badge_1.Badge variant="outline" className="flex items-center w-fit gap-1">
                                                        <lucide_react_1.X className="h-3 w-3"/> Verilmedi
                                                    </badge_1.Badge>)}
                                            </table_1.TableCell>
                                            <table_1.TableCell className="text-right">
                                                {!attendee.certificateId && event.grantsCertificate && (<button_1.Button asChild size="sm">
                                                        <link_1.default href={`/admin/certificates/new?userName=${encodeURIComponent(attendee.name)}&userEmail=${encodeURIComponent(attendee.email)}&certificateName=${encodeURIComponent(event.certificateTitle || '')}&eventId=${event.id}`}>
                                                            <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Sertifika Oluştur
                                                        </link_1.default>
                                                    </button_1.Button>)}
                                            </table_1.TableCell>
                                        </table_1.TableRow>))}
                                    {(event.attendees?.length === 0 || !event.attendees) && (<table_1.TableRow>
                                            <table_1.TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                                Bu etkinlik için henüz kayıtlı katılımcı bulunmuyor.
                                            </table_1.TableCell>
                                        </table_1.TableRow>)}
                                </table_1.TableBody>
                            </table_1.Table>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
                 <tabs_1.TabsContent value="assessments" className="mt-6">
                     <card_1.Card>
                        <card_1.CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <card_1.CardTitle>Değerlendirmeler</card_1.CardTitle>
                                <card_1.CardDescription>
                                    Etkinlik için oluşturulan sınavlar ve anketler.
                                </card_1.CardDescription>
                            </div>
                            <button_1.Button variant="outline" type="button">
                                <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Yeni Değerlendirme Ekle
                            </button_1.Button>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <table_1.Table>
                                <table_1.TableHeader>
                                    <table_1.TableRow>
                                        <table_1.TableHead>Başlık</table_1.TableHead>
                                        <table_1.TableHead>Türü</table_1.TableHead>
                                        <table_1.TableHead>Soru Sayısı</table_1.TableHead>
                                        <table_1.TableHead className="text-right">Eylemler</table_1.TableHead>
                                    </table_1.TableRow>
                                </table_1.TableHeader>
                                <table_1.TableBody>
                                    {event.assessments?.map((assessment) => (<table_1.TableRow key={assessment.id}>
                                            <table_1.TableCell className="font-medium">{assessment.title}</table_1.TableCell>
                                            <table_1.TableCell>
                                                <badge_1.Badge variant="secondary">{assessment.type === 'quiz' ? 'Quiz' : 'Anket'}</badge_1.Badge>
                                            </table_1.TableCell>
                                            <table_1.TableCell>{assessment.questions?.length || 0}</table_1.TableCell>
                                            <table_1.TableCell className="text-right">
                                                <dropdown_menu_1.DropdownMenu>
                                                    <dropdown_menu_1.DropdownMenuTrigger asChild>
                                                    <button_1.Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <lucide_react_2.MoreHorizontal className="h-4 w-4"/>
                                                        <span className="sr-only">Toggle menu</span>
                                                    </button_1.Button>
                                                    </dropdown_menu_1.DropdownMenuTrigger>
                                                    <dropdown_menu_1.DropdownMenuContent align="end">
                                                    <dropdown_menu_1.DropdownMenuItem>
                                                        <lucide_react_1.Edit className="mr-2 h-4 w-4"/> Düzenle
                                                    </dropdown_menu_1.DropdownMenuItem>
                                                    <dropdown_menu_1.DropdownMenuItem>
                                                        <lucide_react_1.FileText className="mr-2 h-4 w-4"/> Sonuçları Gör
                                                    </dropdown_menu_1.DropdownMenuItem>
                                                    <dropdown_menu_1.DropdownMenuItem className="text-destructive">
                                                        <lucide_react_1.Trash2 className="mr-2 h-4 w-4"/> Sil
                                                    </dropdown_menu_1.DropdownMenuItem>
                                                    </dropdown_menu_1.DropdownMenuContent>
                                                </dropdown_menu_1.DropdownMenu>
                                            </table_1.TableCell>
                                        </table_1.TableRow>))}
                                    {(!event.assessments || event.assessments.length === 0) && (<table_1.TableRow>
                                            <table_1.TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                                                Bu etkinlik için henüz değerlendirme oluşturulmamış.
                                            </table_1.TableCell>
                                        </table_1.TableRow>)}
                                </table_1.TableBody>
                            </table_1.Table>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="social" className="mt-6">
                    <social_media_manager_1.SocialMediaManager />
                </tabs_1.TabsContent>
            </tabs_1.Tabs>
        </div>);
}
//# sourceMappingURL=page.js.map