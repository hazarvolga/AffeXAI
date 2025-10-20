'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { events } from "@/lib/events-data";

export function UpcomingEvents() {
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).slice(0, 2);

    return (
        <Card className="lg:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Yaklaşan Etkinlikler</CardTitle>
                    <CardDescription>Kayıt olduğunuz veya ilginizi çekebilecek etkinlikler.</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/portal/events">Tüm Etkinlikler</Link>
                </Button>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (
                    <Link href={`/portal/events/${event.id}`} key={event.id} className="group">
                        <Card className="overflow-hidden h-full transition-all hover:border-primary">
                            <div className="relative aspect-[16/9]">
                                <Image src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />
                            </div>
                            <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.location.city}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                {upcomingEvents.length === 0 && (
                    <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4"/>
                        <h3 className="font-semibold text-lg">Yaklaşan bir etkinliğiniz bulunmuyor.</h3>
                        <p className="text-muted-foreground mb-4">Yeni etkinlikleri keşfetmeye ne dersiniz?</p>
                        <Button asChild>
                            <Link href="/portal/events/discover">Etkinlik Keşfet</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
