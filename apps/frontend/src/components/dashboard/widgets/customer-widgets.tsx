'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Briefcase, PlayCircle } from "lucide-react";
import Link from "next/link";

const quickLinks = [
    { title: "Lisans Bilgilerim", icon: FileText, href: "/portal/licenses" },
    { title: "Destek Taleplerim", icon: Briefcase, href: "/portal/support" },
    { title: "Eğitim Videoları", icon: PlayCircle, href: "/portal/videos" },
    { title: "Son İndirmeler", icon: Download, href: "/portal/downloads" },
];

const recentActivity = [
    { description: "Allplan 2024 Kurulum Kılavuzu'nu indirdiniz.", time: "2 saat önce" },
    { description: "Destek talebiniz güncellendi: #78945", time: "1 gün önce" },
    { description: "'İleri Düzey Modelleme' webinar kaydını izlediniz.", time: "3 gün önce" },
];

export function CustomerQuickLinks() {
    return (
        <>
            {quickLinks.map(link => (
                <Card key={link.title} className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                        <link.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href={link.href}>Git →</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export function CustomerRecentActivity() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Son Aktiviteler (Customer)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-1.5" />
                            <div className="ml-4">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function CustomerHighlights() {
    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Öne Çıkanlar</CardTitle>
                <CardDescription>
                    Sizin için seçtiğimiz en son haberler ve güncellemeler.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-sm">Allplan 2024.1 Güncellemesi Yayınlandı</h3>
                    <p className="text-sm text-muted-foreground">Performans iyileştirmeleri ve yeni özellikler içeriyor. Hemen indirin!</p>
                    <Button variant="link" size="sm" className="p-0 h-auto mt-1">Daha Fazla Bilgi</Button>
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Yeni Webinar: Köprü Tasarımında Otomasyon</h3>
                    <p className="text-sm text-muted-foreground">Uzmanlarımızdan Allplan Bridge'in inceliklerini öğrenin. Kayıtlar başladı.</p>
                    <Button variant="link" size="sm" className="p-0 h-auto mt-1">Şimdi Kaydol</Button>
                </div>
            </CardContent>
        </Card>
    );
}
