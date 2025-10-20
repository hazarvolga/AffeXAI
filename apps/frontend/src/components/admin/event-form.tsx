
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Event, CreateEventDto, UpdateEventDto, EventStatus, TicketType, CertificateConfig } from '@affexai/shared-types';
import { Calendar as CalendarIcon, Save, Trash2, PlusCircle, Award, Image as ImageIcon, Ticket, X, Euro } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import eventsService from "@/lib/api/eventsService";

type EventFormProps = {
    event?: Event;
    onUpdate?: () => void; // Event güncellendiğinde çağrılacak callback
};

export function EventForm({ event, onUpdate }: EventFormProps) {
    const isEditing = !!event;
    const router = useRouter();
    const { toast } = useToast();
    
    // Form state - initialize from event or defaults
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [location, setLocation] = useState(event?.location || '');
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState(event?.capacity || 100);
    const [price, setPrice] = useState(event?.price || 0);
    const [category, setCategory] = useState(event?.metadata?.category || '');
    const [isOnline, setIsOnline] = useState(event?.metadata?.isOnline || false);
    const [status, setStatus] = useState<EventStatus>(event?.status || EventStatus.DRAFT);
    
    // Certificate config state
    const [grantsCertificate, setGrantsCertificate] = useState(event?.grantsCertificate || false);
    const [certificateTitle, setCertificateTitle] = useState(event?.certificateTitle || '');
    const [certificateTemplateId, setCertificateTemplateId] = useState<string>(event?.certificateConfig?.templateId || '');
    const [certificateLogoId, setCertificateLogoId] = useState<string>(event?.certificateConfig?.logoMediaId || '');
    const [certificateDescription, setCertificateDescription] = useState(event?.certificateConfig?.description || '');
    const [certificateValidityDays, setCertificateValidityDays] = useState<number | null>(event?.certificateConfig?.validityDays || null);
    const [certificateAutoGenerate, setCertificateAutoGenerate] = useState(event?.certificateConfig?.autoGenerate || false);
    
    const [date, setDate] = useState<Date | undefined>(event?.startDate ? new Date(event.startDate) : undefined);
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>(
        event?.metadata?.ticketTypes || [{ name: 'Genel Giriş', price: '0', quantity: '100' }]
    );
    const [loading, setLoading] = useState(false);

    const handleAddTicketType = () => {
        setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
    };
    
    const handleRemoveTicketType = (indexToRemove: number) => {
        setTicketTypes(ticketTypes.filter((_, index) => index !== indexToRemove));
    };

    const handleTicketTypeChange = (index: number, field: keyof TicketType, value: string) => {
        const newTicketTypes = [...ticketTypes];
        newTicketTypes[index][field] = value;
        setTicketTypes(newTicketTypes);
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            const certificateConfig: CertificateConfig | null = grantsCertificate ? {
                enabled: true,
                templateId: certificateTemplateId || null,
                logoMediaId: certificateLogoId || null,
                description: certificateDescription || null,
                validityDays: certificateValidityDays,
                autoGenerate: certificateAutoGenerate,
            } : null;
            
            // Type-safe event data
            const eventData: CreateEventDto | UpdateEventDto = {
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
                    const result = await eventsService.update(event.id, eventData as UpdateEventDto);
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
                    } else {
                        // Callback yoksa sayfayı yenile
                        console.log('⚠️ No onUpdate callback, reloading page...');
                        window.location.reload();
                    }
                } catch (error: any) {
                    console.error('❌ Event Update Error:', {
                        message: error.message,
                        status: error.status,
                        data: error.data,
                        stack: error.stack
                    });
                    throw error; // Re-throw to be caught by outer try-catch
                }
            } else {
                await eventsService.create(eventData as CreateEventDto);
                toast({
                    title: "Başarılı",
                    description: "Etkinlik oluşturuldu",
                });
                router.push('/admin/events');
            }
        } catch (error) {
            console.error('Event save error:', error);
            toast({
                title: "Hata",
                description: "Etkinlik kaydedilirken bir hata oluştu",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Etkinlik Detayları</CardTitle>
                            <CardDescription>Etkinliğinizin adını, açıklamasını ve temel bilgilerini girin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Etkinlik Başlığı <span className="text-red-500">*</span>
                                </Label>
                                <Input 
                                    id="title" 
                                    placeholder="Örn: Allplan 2025 Lansmanı" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">
                                    Etkinlik Açıklaması <span className="text-red-500">*</span>
                                </Label>
                                <Textarea 
                                    id="description" 
                                    placeholder="Etkinliğiniz hakkında detaylı bilgi verin..." 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bilet ve Kayıt</CardTitle>
                            <CardDescription>Etkinliğiniz için bilet türlerini, fiyatlarını ve kontenjanları yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ticketTypes.map((ticket, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 border rounded-lg">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor={`ticket-name-${index}`}>Bilet Türü Adı</Label>
                                        <Input id={`ticket-name-${index}`} value={ticket.name} onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)} placeholder="Genel Giriş"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`ticket-price-${index}`}>Fiyat (TL)</Label>
                                        <Input id={`ticket-price-${index}`} type="number" value={ticket.price} onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)} placeholder="50"/>
                                    </div>
                                    <div className="flex items-end h-full gap-2">
                                        <div className="space-y-2 flex-1">
                                            <Label htmlFor={`ticket-quantity-${index}`}>Miktar</Label>
                                            <Input id={`ticket-quantity-${index}`} type="number" value={ticket.quantity} onChange={(e) => handleTicketTypeChange(index, 'quantity', e.target.value)} placeholder="100"/>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveTicketType(index)} className="shrink-0" disabled={ticketTypes.length <= 1}>
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                             <Button type="button" variant="outline" onClick={handleAddTicketType}>
                                <PlusCircle className="mr-2 h-4 w-4"/> Yeni Bilet Türü Ekle
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sertifika</CardTitle>
                            <CardDescription>Bu etkinlik sonunda katılımcılara sertifika verilip verilmeyeceğini ayarlayın.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="grantsCertificate" 
                                    checked={grantsCertificate}
                                    onCheckedChange={(checked) => setGrantsCertificate(checked as boolean)}
                                />
                                <label htmlFor="grantsCertificate" className="text-sm font-medium leading-none flex items-center gap-2">
                                    <Award className="h-4 w-4 text-primary" /> Katılımcılara Sertifika Ver
                                </label>
                            </div>
                            
                            {grantsCertificate && (
                                <div className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">
                                        ✨ Sertifika sistemi aktifleştirildi! Detaylı ayarları yapmak için etkinliği kaydettikten sonra <strong>"Sertifika Ayarları"</strong> sekmesine gidin.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Yayınlama</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Etkinliğinizin durumunu buradan yönetin.</p>
                            <Select value={status} onValueChange={(value) => setStatus(value as EventStatus)}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={EventStatus.PUBLISHED}>Yayınlandı</SelectItem>
                                    <SelectItem value={EventStatus.DRAFT}>Taslak</SelectItem>
                                    <SelectItem value={EventStatus.CANCELLED}>İptal Edildi</SelectItem>
                                    <SelectItem value={EventStatus.COMPLETED}>Tamamlandı</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" asChild><Link href="/admin/events">İptal</Link></Button>
                            <Button type="submit" disabled={loading}>
                                <Save className="mr-2 h-4 w-4"/> 
                                {loading ? 'Kaydediliyor...' : (isEditing ? 'Etkinliği Güncelle' : 'Etkinliği Kaydet')}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Organizasyon</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Kapak Resmi</Label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                                            <span>Dosya seç</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">veya sürükleyip bırak</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF (800x450px önerilir)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>
                                    Tarih ve Saat <span className="text-red-500">*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button 
                                        variant={"outline"} 
                                        className={`w-full justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP HH:mm") : <span>Bir tarih seçin</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        <div className="p-2 border-t">
                                            <Input type="time" defaultValue={date ? format(date, "HH:mm") : "10:00"}/>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>Kategori</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger><SelectValue placeholder="Bir kategori seçin"/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Webinar">Webinar</SelectItem>
                                        <SelectItem value="Workshop">Workshop</SelectItem>
                                        <SelectItem value="Lansman">Lansman</SelectItem>
                                        <SelectItem value="Zirve">Zirve</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="isOnline" 
                                    checked={isOnline}
                                    onCheckedChange={(checked) => setIsOnline(checked as boolean)}
                                />
                                <label htmlFor="isOnline" className="text-sm font-medium leading-none">
                                    Etkinlik Çevrimiçi (Online)
                                </label>
                            </div>
                            <div className="space-y-2">
                                <Label>Mekan</Label>
                                <Input 
                                    placeholder="Örn: Swissôtel The Bosphorus" 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Şehir</Label>
                                <Input 
                                    placeholder="İstanbul" 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
