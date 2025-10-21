"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const recharts_1 = require("recharts");
const social_media_data_1 = require("@/lib/social-media-data");
const events_data_1 = require("@/lib/events-data");
const newsletter_data_1 = require("@/lib/newsletter-data");
const kpiCards = [
    { title: "Toplam Gelir", value: "₺45,231", change: "+20.1%", icon: lucide_react_1.DollarSign },
    { title: "Yeni Kullanıcılar", value: "+2,350", change: "+180.1%", icon: lucide_react_1.Users },
    { title: "AI İçerik Üretimi", value: "128", change: "Son 7 gün", icon: lucide_react_1.Bot },
    { title: "Email Performansı", value: "25.5%", change: "Açılma Oranı", icon: lucide_react_1.MailOpen },
    { title: "Sosyal Etkileşim", value: "1.2K", change: "+12% hafta", icon: lucide_react_1.ThumbsUp },
    { title: "Açık Destek Talebi", value: "14", change: "2 acil", icon: lucide_react_1.LifeBuoy },
];
const trendData = [
    { date: "Pzt", users: 20, aiContent: 5, revenue: 200 },
    { date: "Sal", users: 35, aiContent: 8, revenue: 350 },
    { date: "Çar", users: 30, aiContent: 6, revenue: 300 },
    { date: "Per", users: 45, aiContent: 12, revenue: 450 },
    { date: "Cum", users: 40, aiContent: 10, revenue: 400 },
    { date: "Cmt", users: 55, aiContent: 15, revenue: 550 },
    { date: "Paz", users: 60, aiContent: 18, revenue: 600 },
];
function DashboardPage() {
    const upcomingEvent = events_data_1.events.find(e => new Date(e.date) >= new Date());
    const sentCampaigns = newsletter_data_1.campaigns.filter(c => c.status === 'gönderildi').length;
    const scheduledCampaigns = newsletter_data_1.campaigns.filter(c => c.status === 'planlandı').length;
    const connectedSocialAccounts = social_media_data_1.socialAccounts.filter(a => a.isConnected).length;
    return (<div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {kpiCards.map(card => (<card_1.Card key={card.title}>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">{card.title}</card_1.CardTitle>
                        <card.icon className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p className="text-xs text-muted-foreground">{card.change}</p>
                    </card_1.CardContent>
                </card_1.Card>))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2 text-lg"><lucide_react_1.Calendar className="h-5 w-5"/> Yaklaşan Etkinlikler</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                    {upcomingEvent ? (<div>
                            <p className="font-semibold">{upcomingEvent.title}</p>
                            <p className="text-sm text-muted-foreground">{new Date(upcomingEvent.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                        </div>) : (<p className="text-muted-foreground">Planlanmış etkinlik yok.</p>)}
                </card_1.CardContent>
                 <card_1.CardFooter className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Toplam {events_data_1.events.length} etkinlik</p>
                    <button_1.Button asChild size="sm" variant="outline">
                       <link_1.default href="/admin/events">Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/></link_1.default>
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2 text-lg"><lucide_react_1.Send className="h-5 w-5"/> Email Kampanyaları</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="flex justify-around">
                    <div className="text-center"><p className="text-2xl font-bold">{sentCampaigns}</p><p className="text-xs text-muted-foreground">Gönderildi</p></div>
                    <div className="text-center"><p className="text-2xl font-bold">{scheduledCampaigns}</p><p className="text-xs text-muted-foreground">Planlandı</p></div>
                </card_1.CardContent>
                 <card_1.CardFooter className="flex justify-end">
                    <button_1.Button asChild size="sm" variant="outline">
                       <link_1.default href="/admin/newsletter">Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/></link_1.default>
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
            <card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2 text-lg"><lucide_react_1.Share2 className="h-5 w-5"/> Sosyal Medya</card_1.CardTitle>
                </card_1.CardHeader>
                 <card_1.CardContent className="flex items-center gap-4">
                    <div className="flex -space-x-2 overflow-hidden">
                       {social_media_data_1.socialAccounts.map(account => {
            const Icon = (0, social_media_data_1.getPlatformIcon)(account.platform);
            return <div key={account.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center"><Icon className="h-4 w-4 text-muted-foreground"/></div>;
        })}
                    </div>
                    <p className="text-sm text-muted-foreground">{connectedSocialAccounts} / {social_media_data_1.socialAccounts.length} hesap bağlı.</p>
                 </card_1.CardContent>
                  <card_1.CardFooter className="flex justify-end">
                    <button_1.Button asChild size="sm" variant="outline">
                       <link_1.default href="/admin/social-media">Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/></link_1.default>
                    </button_1.Button>
                </card_1.CardFooter>
            </card_1.Card>
            <div className="lg:col-span-3">
                 <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Haftalık Trendler</card_1.CardTitle>
                        <card_1.CardDescription>Yeni kullanıcı, AI içerik üretimi ve gelir trendleri.</card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="pl-2">
                        <recharts_1.ResponsiveContainer width="100%" height={350}>
                            <recharts_1.LineChart data={trendData}>
                            <recharts_1.CartesianGrid strokeDasharray="3 3"/>
                            <recharts_1.XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <recharts_1.YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${'₺'}${value}`}/>
                                <recharts_1.Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}/>
                                <recharts_1.Legend />
                                <recharts_1.Line type="monotone" dataKey="users" name="Yeni Kullanıcılar" stroke="hsl(var(--primary))" strokeWidth={2}/>
                                <recharts_1.Line type="monotone" dataKey="aiContent" name="AI İçerikleri" stroke="hsl(var(--chart-2))" strokeWidth={2}/>
                                <recharts_1.Line type="monotone" dataKey="revenue" name="Gelir (₺)" stroke="hsl(var(--chart-4))" strokeWidth={2}/>
                            </recharts_1.LineChart>
                        </recharts_1.ResponsiveContainer>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
        </div>
    </div>);
}
//# sourceMappingURL=page.js.map