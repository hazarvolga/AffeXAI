"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingEvents = UpcomingEvents;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const events_data_1 = require("@/lib/events-data");
function UpcomingEvents() {
    const upcomingEvents = events_data_1.events.filter(e => new Date(e.date) > new Date()).slice(0, 2);
    return (<card_1.Card className="lg:col-span-7">
            <card_1.CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <card_1.CardTitle>Yaklaşan Etkinlikler</card_1.CardTitle>
                    <card_1.CardDescription>Kayıt olduğunuz veya ilginizi çekebilecek etkinlikler.</card_1.CardDescription>
                </div>
                <button_1.Button asChild variant="outline" size="sm">
                    <link_1.default href="/portal/events">Tüm Etkinlikler</link_1.default>
                </button_1.Button>
            </card_1.CardHeader>
            <card_1.CardContent className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (<link_1.default href={`/portal/events/${event.id}`} key={event.id} className="group">
                        <card_1.Card className="overflow-hidden h-full transition-all hover:border-primary">
                            <div className="relative aspect-[16/9]">
                                <image_1.default src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105"/>
                            </div>
                            <card_1.CardContent className="p-4">
                                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.location.city}</p>
                            </card_1.CardContent>
                        </card_1.Card>
                    </link_1.default>))}
                {upcomingEvents.length === 0 && (<div className="md:col-span-2 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                        <lucide_react_1.Calendar className="h-12 w-12 text-muted-foreground mb-4"/>
                        <h3 className="font-semibold text-lg">Yaklaşan bir etkinliğiniz bulunmuyor.</h3>
                        <p className="text-muted-foreground mb-4">Yeni etkinlikleri keşfetmeye ne dersiniz?</p>
                        <button_1.Button asChild>
                            <link_1.default href="/portal/events/discover">Etkinlik Keşfet</link_1.default>
                        </button_1.Button>
                    </div>)}
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=shared-widgets.js.map