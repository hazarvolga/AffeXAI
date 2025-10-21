"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarketingDashboard;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const newsletter_data_1 = require("@/lib/newsletter-data");
const social_media_data_1 = require("@/lib/social-media-data");
const progress_1 = require("@/components/ui/progress");
function MarketingDashboard() {
    const scheduledCampaigns = newsletter_data_1.campaigns.filter(c => c.status === 'planlandı');
    const recentSubscribers = newsletter_data_1.subscribers.filter(s => new Date(s.subscribedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    const scheduledPosts = social_media_data_1.socialPosts.filter(p => p.status === 'Planlandı').length;
    const latestCampaign = newsletter_data_1.campaigns.find(c => c.status === 'gönderildi');
    return (<>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pazarlama Ekibi Paneli</h2>
                    <p className="text-muted-foreground">
                        Kampanyaları, bültenleri ve sosyal medya etkileşimlerini yönetin.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Toplam Abone</card_1.CardTitle>
                        <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{newsletter_data_1.subscribers.length}</div>
                        <p className="text-xs text-muted-foreground">+{recentSubscribers} son 7 gün</p>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Planlanmış Kampanyalar</card_1.CardTitle>
                        <lucide_react_1.Mail className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{scheduledCampaigns.length}</div>
                        <p className="text-xs text-muted-foreground">E-posta kampanyaları</p>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Planlanmış Gönderiler</card_1.CardTitle>
                        <lucide_react_1.Share2 className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{scheduledPosts}</div>
                        <p className="text-xs text-muted-foreground">Sosyal medya gönderileri</p>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card>
                    <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <card_1.CardTitle className="text-sm font-medium">Son Kampanya Etkileşimi</card_1.CardTitle>
                        <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
                    </card_1.CardHeader>
                    <card_1.CardContent>
                        <div className="text-2xl font-bold">{latestCampaign?.openRate || 0}%</div>
                        <p className="text-xs text-muted-foreground">"{latestCampaign?.title}" açılma oranı</p>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
                <card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Hızlı Eylemler</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="grid gap-4 sm:grid-cols-2">
                         <button_1.Button asChild size="lg" className="h-auto py-4 text-left justify-start">
                            <link_1.default href="/admin/newsletter/campaigns/new">
                                <lucide_react_1.PlusCircle className="mr-3 h-5 w-5"/>
                                <div>
                                    <p className="font-bold">Yeni Kampanya</p>
                                    <p className="font-normal text-xs">E-posta kampanyası oluştur.</p>
                                </div>
                            </link_1.default>
                        </button_1.Button>
                        <button_1.Button asChild size="lg" className="h-auto py-4 text-left justify-start">
                            <link_1.default href="/admin/social-media/composer">
                                <lucide_react_1.PlusCircle className="mr-3 h-5 w-5"/>
                                 <div>
                                    <p className="font-bold">Yeni Gönderi</p>
                                    <p className="font-normal text-xs">Sosyal medya gönderisi planla.</p>
                                </div>
                            </link_1.default>
                        </button_1.Button>
                    </card_1.CardContent>
                </card_1.Card>
                {latestCampaign && (<card_1.Card>
                    <card_1.CardHeader>
                        <card_1.CardTitle>Son Kampanya: {latestCampaign.title}</card_1.CardTitle>
                        <card_1.CardDescription>"{latestCampaign.subject}"</card_1.CardDescription>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm"><span>Açılma Oranı</span> <span>{latestCampaign.openRate}%</span></div>
                             <progress_1.Progress value={latestCampaign.openRate}/>
                        </div>
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm"><span>Tıklanma Oranı</span> <span>{latestCampaign.clickRate}%</span></div>
                             <progress_1.Progress value={latestCampaign.clickRate}/>
                        </div>
                    </card_1.CardContent>
                    <card_1.CardFooter>
                        <button_1.Button variant="outline" asChild>
                            <link_1.default href={`/admin/newsletter/campaigns/${latestCampaign.id}`}>Detaylı Raporu Gör</link_1.default>
                        </button_1.Button>
                    </card_1.CardFooter>
                </card_1.Card>)}
            </div>
        </>);
}
//# sourceMappingURL=marketing-dashboard.js.map