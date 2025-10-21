"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventForm = EventForm;
const card_1 = require("@/components/ui/card");
const label_1 = require("@/components/ui/label");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const checkbox_1 = require("@/components/ui/checkbox");
const shared_types_1 = require("@affexai/shared-types");
const lucide_react_1 = require("lucide-react");
const popover_1 = require("../ui/popover");
const calendar_1 = require("../ui/calendar");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const use_toast_1 = require("@/hooks/use-toast");
const eventsService_1 = __importDefault(require("@/lib/api/eventsService"));
function EventForm({ event, onUpdate }) {
    const isEditing = !!event;
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    // Form state - initialize from event or defaults
    const [title, setTitle] = (0, react_1.useState)(event?.title || '');
    const [description, setDescription] = (0, react_1.useState)(event?.description || '');
    const [location, setLocation] = (0, react_1.useState)(event?.location || '');
    const [city, setCity] = (0, react_1.useState)('');
    const [capacity, setCapacity] = (0, react_1.useState)(event?.capacity || 100);
    const [price, setPrice] = (0, react_1.useState)(event?.price || 0);
    const [category, setCategory] = (0, react_1.useState)(event?.metadata?.category || '');
    const [isOnline, setIsOnline] = (0, react_1.useState)(event?.metadata?.isOnline || false);
    const [status, setStatus] = (0, react_1.useState)(event?.status || shared_types_1.EventStatus.DRAFT);
    // Certificate config state
    const [grantsCertificate, setGrantsCertificate] = (0, react_1.useState)(event?.grantsCertificate || false);
    const [certificateTitle, setCertificateTitle] = (0, react_1.useState)(event?.certificateTitle || '');
    const [certificateTemplateId, setCertificateTemplateId] = (0, react_1.useState)(event?.certificateConfig?.templateId || '');
    const [certificateLogoId, setCertificateLogoId] = (0, react_1.useState)(event?.certificateConfig?.logoMediaId || '');
    const [certificateDescription, setCertificateDescription] = (0, react_1.useState)(event?.certificateConfig?.description || '');
    const [certificateValidityDays, setCertificateValidityDays] = (0, react_1.useState)(event?.certificateConfig?.validityDays || null);
    const [certificateAutoGenerate, setCertificateAutoGenerate] = (0, react_1.useState)(event?.certificateConfig?.autoGenerate || false);
    const [date, setDate] = (0, react_1.useState)(event?.startDate ? new Date(event.startDate) : undefined);
    const [ticketTypes, setTicketTypes] = (0, react_1.useState)(event?.metadata?.ticketTypes || [{ name: 'Genel Giriş', price: '0', quantity: '100' }]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleAddTicketType = () => {
        setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
    };
    const handleRemoveTicketType = (indexToRemove) => {
        setTicketTypes(ticketTypes.filter((_, index) => index !== indexToRemove));
    };
    const handleTicketTypeChange = (index, field, value) => {
        const newTicketTypes = [...ticketTypes];
        newTicketTypes[index][field] = value;
        setTicketTypes(newTicketTypes);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Sadece başlık ve açıklama zorunlu
        if (!title || !description) {
            toast({
                title: "Hata",
                description: "Başlık ve açıklama alanları zorunludur",
                variant: "destructive",
            });
            return;
        }
        // Tarih kontrolü
        if (!date) {
            toast({
                title: "Hata",
                description: "Lütfen etkinlik tarihini seçin",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        try {
            // Location'ı city ile birleştir, yoksa sadece location kullan
            const fullLocation = city ? `${location}, ${city}` : location;
            // Build certificate config
            const certificateConfig = grantsCertificate ? {
                enabled: true,
                templateId: certificateTemplateId || null,
                logoMediaId: certificateLogoId || null,
                description: certificateDescription || null,
                validityDays: certificateValidityDays,
                autoGenerate: certificateAutoGenerate,
            } : null;
            // Type-safe event data
            const eventData = {
                title,
                description,
                location: fullLocation || 'Belirtilmedi',
                capacity: Number(capacity),
                price: Number(price),
                status,
                startDate: date.toISOString(),
                endDate: date.toISOString(), // Aynı gün bitişi varsayıyoruz
                grantsCertificate,
                certificateTitle: grantsCertificate ? certificateTitle : null,
                certificateConfig,
                metadata: {
                    category,
                    isOnline,
                    ticketTypes,
                },
            };
            console.log('📤 Event Payload:', JSON.stringify(eventData, null, 2));
            if (isEditing && event) {
                try {
                    const result = await eventsService_1.default.update(event.id, eventData);
                    console.log('✅ Event Updated Successfully:', result);
                    toast({
                        title: "Başarılı",
                        description: "Etkinlik güncellendi",
                    });
                    // Parent component'e haber ver ki event'i yeniden fetch etsin
                    console.log('🔄 Calling onUpdate callback, onUpdate exists:', !!onUpdate);
                    if (onUpdate) {
                        onUpdate();
                        console.log('✅ onUpdate callback executed');
                    }
                    else {
                        // Callback yoksa sayfayı yenile
                        console.log('⚠️ No onUpdate callback, reloading page...');
                        window.location.reload();
                    }
                }
                catch (error) {
                    console.error('❌ Event Update Error:', {
                        message: error.message,
                        status: error.status,
                        data: error.data,
                        stack: error.stack
                    });
                    throw error; // Re-throw to be caught by outer try-catch
                }
            }
            else {
                await eventsService_1.default.create(eventData);
                toast({
                    title: "Başarılı",
                    description: "Etkinlik oluşturuldu",
                });
                router.push('/admin/events');
            }
        }
        catch (error) {
            console.error('Event save error:', error);
            toast({
                title: "Hata",
                description: "Etkinlik kaydedilirken bir hata oluştu",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Etkinlik Detayları</card_1.CardTitle>
                            <card_1.CardDescription>Etkinliğinizin adını, açıklamasını ve temel bilgilerini girin.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label_1.Label htmlFor="title">
                                    Etkinlik Başlığı <span className="text-red-500">*</span>
                                </label_1.Label>
                                <input_1.Input id="title" placeholder="Örn: Allplan 2025 Lansmanı" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label htmlFor="description">
                                    Etkinlik Açıklaması <span className="text-red-500">*</span>
                                </label_1.Label>
                                <textarea_1.Textarea id="description" placeholder="Etkinliğiniz hakkında detaylı bilgi verin..." value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[150px]" required/>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>

                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Bilet ve Kayıt</card_1.CardTitle>
                            <card_1.CardDescription>Etkinliğiniz için bilet türlerini, fiyatlarını ve kontenjanları yönetin.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                            {ticketTypes.map((ticket, index) => (<div key={index} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 border rounded-lg">
                                    <div className="space-y-2 md:col-span-2">
                                        <label_1.Label htmlFor={`ticket-name-${index}`}>Bilet Türü Adı</label_1.Label>
                                        <input_1.Input id={`ticket-name-${index}`} value={ticket.name} onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)} placeholder="Genel Giriş"/>
                                    </div>
                                    <div className="space-y-2">
                                        <label_1.Label htmlFor={`ticket-price-${index}`}>Fiyat (TL)</label_1.Label>
                                        <input_1.Input id={`ticket-price-${index}`} type="number" value={ticket.price} onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)} placeholder="50"/>
                                    </div>
                                    <div className="flex items-end h-full gap-2">
                                        <div className="space-y-2 flex-1">
                                            <label_1.Label htmlFor={`ticket-quantity-${index}`}>Miktar</label_1.Label>
                                            <input_1.Input id={`ticket-quantity-${index}`} type="number" value={ticket.quantity} onChange={(e) => handleTicketTypeChange(index, 'quantity', e.target.value)} placeholder="100"/>
                                        </div>
                                        <button_1.Button variant="ghost" size="icon" onClick={() => handleRemoveTicketType(index)} className="shrink-0" disabled={ticketTypes.length <= 1}>
                                            <lucide_react_1.X className="h-4 w-4"/>
                                        </button_1.Button>
                                    </div>
                                </div>))}
                             <button_1.Button type="button" variant="outline" onClick={handleAddTicketType}>
                                <lucide_react_1.PlusCircle className="mr-2 h-4 w-4"/> Yeni Bilet Türü Ekle
                            </button_1.Button>
                        </card_1.CardContent>
                    </card_1.Card>

                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Sertifika</card_1.CardTitle>
                            <card_1.CardDescription>Bu etkinlik sonunda katılımcılara sertifika verilip verilmeyeceğini ayarlayın.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-4">
                           <div className="flex items-center space-x-2">
                                <checkbox_1.Checkbox id="grantsCertificate" checked={grantsCertificate} onCheckedChange={(checked) => setGrantsCertificate(checked)}/>
                                <label htmlFor="grantsCertificate" className="text-sm font-medium leading-none flex items-center gap-2">
                                    <lucide_react_1.Award className="h-4 w-4 text-primary"/> Katılımcılara Sertifika Ver
                                </label>
                            </div>
                            
                            {grantsCertificate && (<div className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">
                                        ✨ Sertifika sistemi aktifleştirildi! Detaylı ayarları yapmak için etkinliği kaydettikten sonra <strong>"Sertifika Ayarları"</strong> sekmesine gidin.
                                    </p>
                                </div>)}
                        </card_1.CardContent>
                    </card_1.Card>

                </div>
                <div className="lg:col-span-1 space-y-8">
                     <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Yayınlama</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Etkinliğinizin durumunu buradan yönetin.</p>
                            <select_1.Select value={status} onValueChange={(value) => setStatus(value)}>
                                <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectItem value={shared_types_1.EventStatus.PUBLISHED}>Yayınlandı</select_1.SelectItem>
                                    <select_1.SelectItem value={shared_types_1.EventStatus.DRAFT}>Taslak</select_1.SelectItem>
                                    <select_1.SelectItem value={shared_types_1.EventStatus.CANCELLED}>İptal Edildi</select_1.SelectItem>
                                    <select_1.SelectItem value={shared_types_1.EventStatus.COMPLETED}>Tamamlandı</select_1.SelectItem>
                                </select_1.SelectContent>
                            </select_1.Select>
                        </card_1.CardContent>
                        <card_1.CardFooter className="flex justify-between">
                            <button_1.Button variant="outline" asChild><link_1.default href="/admin/events">İptal</link_1.default></button_1.Button>
                            <button_1.Button type="submit" disabled={loading}>
                                <lucide_react_1.Save className="mr-2 h-4 w-4"/> 
                                {loading ? 'Kaydediliyor...' : (isEditing ? 'Etkinliği Güncelle' : 'Etkinliği Kaydet')}
                            </button_1.Button>
                        </card_1.CardFooter>
                    </card_1.Card>

                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Organizasyon</card_1.CardTitle>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label_1.Label>Kapak Resmi</label_1.Label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                                    <div className="text-center">
                                        <lucide_react_1.Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                                            <span>Dosya seç</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                            </label>
                                            <p className="pl-1">veya sürükleyip bırak</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF (800x450px önerilir)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>
                                    Tarih ve Saat <span className="text-red-500">*</span>
                                </label_1.Label>
                                <popover_1.Popover>
                                    <popover_1.PopoverTrigger asChild>
                                    <button_1.Button variant={"outline"} className={`w-full justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}>
                                        <lucide_react_1.Calendar className="mr-2 h-4 w-4"/>
                                        {date ? (0, date_fns_1.format)(date, "PPP HH:mm") : <span>Bir tarih seçin</span>}
                                    </button_1.Button>
                                    </popover_1.PopoverTrigger>
                                    <popover_1.PopoverContent className="w-auto p-0">
                                        <calendar_1.Calendar mode="single" selected={date} onSelect={setDate} initialFocus/>
                                        <div className="p-2 border-t">
                                            <input_1.Input type="time" defaultValue={date ? (0, date_fns_1.format)(date, "HH:mm") : "10:00"}/>
                                        </div>
                                    </popover_1.PopoverContent>
                                </popover_1.Popover>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>Kategori</label_1.Label>
                                <select_1.Select value={category} onValueChange={setCategory}>
                                    <select_1.SelectTrigger><select_1.SelectValue placeholder="Bir kategori seçin"/></select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                        <select_1.SelectItem value="Webinar">Webinar</select_1.SelectItem>
                                        <select_1.SelectItem value="Workshop">Workshop</select_1.SelectItem>
                                        <select_1.SelectItem value="Lansman">Lansman</select_1.SelectItem>
                                        <select_1.SelectItem value="Zirve">Zirve</select_1.SelectItem>
                                    </select_1.SelectContent>
                                </select_1.Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <checkbox_1.Checkbox id="isOnline" checked={isOnline} onCheckedChange={(checked) => setIsOnline(checked)}/>
                                <label htmlFor="isOnline" className="text-sm font-medium leading-none">
                                    Etkinlik Çevrimiçi (Online)
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>Mekan</label_1.Label>
                                <input_1.Input placeholder="Örn: Swissôtel The Bosphorus" value={location} onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>Şehir</label_1.Label>
                                <input_1.Input placeholder="İstanbul" value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>
                </div>
            </div>
        </form>);
}
//# sourceMappingURL=event-form.js.map