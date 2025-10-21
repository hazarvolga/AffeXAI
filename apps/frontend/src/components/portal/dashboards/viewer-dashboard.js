"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewerDashboard;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const social_media_data_1 = require("@/lib/social-media-data");
const events_data_1 = require("@/lib/events-data");
const newsletter_data_1 = require("@/lib/newsletter-data");
const badge_1 = require("@/components/ui/badge");
const scroll_area_1 = require("@/components/ui/scroll-area");
function ViewerDashboard() {
    const sortedSocialPosts = social_media_data_1.socialPosts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
    const latestPost = sortedSocialPosts[0];
    const pastPosts = sortedSocialPosts.slice(1);
    const sortedCampaigns = newsletter_data_1.campaigns.filter(c => c.status === 'gönderildi').sort((a, b) => new Date(b.sentAt || 0).getTime() - new Date(a.sentAt || 0).getTime());
    const latestCampaign = sortedCampaigns[0];
    const pastCampaigns = sortedCampaigns.slice(1);
    const upcomingEvent = events_data_1.events.find(e => new Date(e.date) > new Date());
    const pastEvents = events_data_1.events.filter(e => new Date(e.date) < new Date()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const PlatformIcon = latestPost ? (0, social_media_data_1.getPlatformIcon)(latestPost.accountId.split('-')[1]) : lucide_react_1.Share2;
    return (<>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">İzleyici Paneli (Salt Okunur)</h2>
                    <p className="text-muted-foreground">
                        Sistemdeki son aktivitelere genel bir bakış.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {/* Latest Social Post */}
                <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Share2 className="h-5 w-5 text-primary"/> Son Sosyal Medya Gönderisi</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                        {latestPost ? (<div className="space-y-3">
                                <div className="flex items-center gap-2">
                                     <PlatformIcon className="h-4 w-4 text-muted-foreground"/>
                                     <span className="text-sm font-semibold">{latestPost.accountId.split('-')[1].toUpperCase()}</span>
                                     <badge_1.Badge variant="outline">{new Date(latestPost.publishedAt).toLocaleDateString('tr-TR')}</badge_1.Badge>
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-4">{latestPost.content}</p>
                            </div>) : (<p className="text-muted-foreground text-sm">Gösterilecek gönderi yok.</p>)}
                    </card_1.CardContent>
                </card_1.Card>
                
                {/* Latest Email Campaign */}
                 <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Mail className="h-5 w-5 text-primary"/> Son Email Kampanyası</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                        {latestCampaign ? (<div className="space-y-3">
                                <div className="flex items-center gap-2">
                                     <badge_1.Badge variant="secondary">{new Date(latestCampaign.sentAt).toLocaleDateString('tr-TR')}</badge_1.Badge>
                                </div>
                                <h3 className="font-semibold">{latestCampaign.title}</h3>
                                <p className="text-muted-foreground text-sm">"{latestCampaign.subject}"</p>
                            </div>) : (<p className="text-muted-foreground text-sm">Gösterilecek kampanya yok.</p>)}
                    </card_1.CardContent>
                </card_1.Card>

                {/* Upcoming Event */}
                <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Calendar className="h-5 w-5 text-primary"/> Yaklaşan Etkinlik</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                         {upcomingEvent ? (<div className="space-y-3">
                                <div className="flex items-center gap-2">
                                     <badge_1.Badge>{upcomingEvent.category}</badge_1.Badge>
                                      <badge_1.Badge variant="outline">{new Date(upcomingEvent.date).toLocaleDateString('tr-TR')}</badge_1.Badge>
                                </div>
                                <h3 className="font-semibold">{upcomingEvent.title}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2">{upcomingEvent.description}</p>
                            </div>) : (<p className="text-muted-foreground text-sm">Yaklaşan etkinlik yok.</p>)}
                    </card_1.CardContent>
                </card_1.Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                 <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Share2 className="h-5 w-5 text-primary"/> Geçmiş Sosyal Medya Gönderileri</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                       <scroll_area_1.ScrollArea className="h-64">
                            <div className="space-y-4">
                                {pastPosts.map(post => {
            const PostIcon = (0, social_media_data_1.getPlatformIcon)(post.accountId.split('-')[1]);
            return (<div key={post.id}>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <PostIcon className="h-3 w-3"/>
                                                <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                            <p className="text-sm line-clamp-2">{post.content}</p>
                                        </div>);
        })}
                                {pastPosts.length === 0 && <p className="text-sm text-muted-foreground">Gösterilecek geçmiş gönderi yok.</p>}
                           </div>
                       </scroll_area_1.ScrollArea>
                    </card_1.CardContent>
                </card_1.Card>
                <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Mail className="h-5 w-5 text-primary"/> Geçmiş Email Kampanyaları</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                         <scroll_area_1.ScrollArea className="h-64">
                            <div className="space-y-4">
                                {pastCampaigns.map(campaign => (<div key={campaign.id}>
                                        <p className="text-xs text-muted-foreground">{new Date(campaign.sentAt).toLocaleDateString('tr-TR')}</p>
                                        <p className="font-semibold text-sm">{campaign.title}</p>
                                        <p className="text-xs text-muted-foreground">"{campaign.subject}"</p>
                                    </div>))}
                                {pastCampaigns.length === 0 && <p className="text-sm text-muted-foreground">Gösterilecek geçmiş kampanya yok.</p>}
                            </div>
                         </scroll_area_1.ScrollArea>
                    </card_1.CardContent>
                </card_1.Card>
                 <card_1.Card className="flex flex-col">
                    <card_1.CardHeader>
                        <card_1.CardTitle className="flex items-center gap-2"><lucide_react_1.Calendar className="h-5 w-5 text-primary"/> Geçmiş Etkinlikler</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="flex-grow">
                         <scroll_area_1.ScrollArea className="h-64">
                            <div className="space-y-4">
                                {pastEvents.map(event => (<div key={event.id}>
                                        <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString('tr-TR')}</p>
                                        <p className="font-semibold text-sm">{event.title}</p>
                                    </div>))}
                                {pastEvents.length === 0 && <p className="text-sm text-muted-foreground">Gösterilecek geçmiş etkinlik yok.</p>}
                            </div>
                         </scroll_area_1.ScrollArea>
                    </card_1.CardContent>
                </card_1.Card>
            </div>
        </>);
}
//# sourceMappingURL=viewer-dashboard.js.map