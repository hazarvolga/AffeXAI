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
const lucide_react_1 = require("lucide-react");
const popover_1 = require("../ui/popover");
const calendar_1 = require("../ui/calendar");
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const initialTicketTypes = [
    { name: 'Genel Giriş', price: '50', quantity: '100' },
    { name: 'VIP', price: '150', quantity: '20' },
];
function EventForm({ event }) {
    const isEditing = !!event;
    const [date, setDate] = (0, react_1.useState)(event ? new Date(event.date) : undefined);
    const [ticketTypes, setTicketTypes] = (0, react_1.useState)(isEditing ? initialTicketTypes : [{ name: 'Genel Giriş', price: '0', quantity: '100' }]);
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
    return (<form className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <card_1.Card>
                        <card_1.CardHeader>
                            <card_1.CardTitle>Etkinlik Detayları</card_1.CardTitle>
                            <card_1.CardDescription>Etkinliğinizin adını, açıklamasını ve temel bilgilerini girin.</card_1.CardDescription>
                        </card_1.CardHeader>
                        <card_1.CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label_1.Label htmlFor="title">Etkinlik Başlığı</label_1.Label>
                                <input_1.Input id="title" placeholder="Örn: Allplan 2025 Lansmanı" defaultValue={event?.title}/>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label htmlFor="description">Etkinlik Açıklaması</label_1.Label>
                                <textarea_1.Textarea id="description" placeholder="Etkinliğiniz hakkında detaylı bilgi verin..." defaultValue={event?.description} className="min-h-[150px]"/>
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
                                <checkbox_1.Checkbox id="grantsCertificate" defaultChecked={event?.grantsCertificate}/>
                                <label htmlFor="grantsCertificate" className="text-sm font-medium leading-none flex items-center gap-2">
                                <lucide_react_1.Award className="h-4 w-4 text-primary"/> Katılımcılara Sertifika Ver
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label htmlFor="certificateTitle">Verilecek Sertifika Adı</label_1.Label>
                                <input_1.Input id="certificateTitle" placeholder="Örn: Allplan Katılım Sertifikası" defaultValue={event?.certificateTitle}/>
                            </div>
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
                            <select_1.Select defaultValue={isEditing ? 'published' : 'draft'}>
                                <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                <select_1.SelectContent>
                                    <select_1.SelectItem value="published">Yayınlandı</select_1.SelectItem>
                                    <select_1.SelectItem value="draft">Taslak</select_1.SelectItem>
                                    <select_1.SelectItem value="archived">Arşivlendi</select_1.SelectItem>
                                </select_1.SelectContent>
                            </select_1.Select>
                        </card_1.CardContent>
                        <card_1.CardFooter className="flex justify-between">
                            <button_1.Button variant="outline" asChild><link_1.default href="/admin/events">İptal</link_1.default></button_1.Button>
                            <button_1.Button><lucide_react_1.Save className="mr-2 h-4 w-4"/> {isEditing ? 'Etkinliği Güncelle' : 'Etkinliği Kaydet'}</button_1.Button>
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
                                <label_1.Label>Tarih ve Saat</label_1.Label>
                                <popover_1.Popover>
                                    <popover_1.PopoverTrigger asChild>
                                    <button_1.Button variant={"outline"} className="w-full justify-start text-left font-normal">
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
                                <select_1.Select defaultValue={event?.category}>
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
                                <checkbox_1.Checkbox id="isOnline" defaultChecked={event?.isOnline}/>
                                <label htmlFor="isOnline" className="text-sm font-medium leading-none">
                                    Etkinlik Çevrimiçi (Online)
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>Mekan</label_1.Label>
                                <input_1.Input placeholder="Örn: Swissôtel The Bosphorus" defaultValue={event?.location.venue}/>
                            </div>
                            <div className="space-y-2">
                                <label_1.Label>Şehir</label_1.Label>
                                <input_1.Input placeholder="İstanbul" defaultValue={event?.location.city}/>
                            </div>
                        </card_1.CardContent>
                    </card_1.Card>
                </div>
            </div>
        </form>);
}
//# sourceMappingURL=event-form.js.map