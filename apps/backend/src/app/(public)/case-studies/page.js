"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CaseStudiesPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const timeline_carousel_1 = require("@/components/timeline-carousel");
const timeline_data_1 = require("@/lib/timeline-data");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
function CaseStudiesPage() {
    return (<div>
            <page_hero_1.PageHero title="Başarı Hikayeleri" subtitle="Allplan çözümlerinin, Türkiye ve dünyadan prestijli projelerde nasıl fark yarattığını keşfedin."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'Başarı Hikayeleri', href: '/case-studies' }]}/>
            <timeline_carousel_1.TimelineCarousel />

            <div className="container mx-auto py-16 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold">Tüm Başarı Hikayeleri</h2>
                    <div className="flex items-center gap-4">
                        <select_1.Select defaultValue="all">
                            <select_1.SelectTrigger className="w-[180px]">
                                <select_1.SelectValue placeholder="Bölge"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                                <select_1.SelectItem value="all">Tüm Bölgeler</select_1.SelectItem>
                                <select_1.SelectItem value="global">Global</select_1.SelectItem>
                                <select_1.SelectItem value="turkey">Türkiye</select_1.SelectItem>
                            </select_1.SelectContent>
                        </select_1.Select>
                        <select_1.Select defaultValue="all">
                            <select_1.SelectTrigger className="w-[180px]">
                                <select_1.SelectValue placeholder="Disiplin"/>
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                                <select_1.SelectItem value="all">Tüm Disiplinler</select_1.SelectItem>
                                <select_1.SelectItem value="structural">Yapısal</select_1.SelectItem>
                                <select_1.SelectItem value="civil">İnşaat</select_1.SelectItem>
                                <select_1.SelectItem value="bridge">Köprü</select_1.SelectItem>
                                <select_1.SelectItem value="precast">Prekast</select_1.SelectItem>
                            </select_1.SelectContent>
                        </select_1.Select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {timeline_data_1.timelineData.map(story => (<card_1.Card key={story.id} className="overflow-hidden flex flex-col group">
                            <card_1.CardHeader className="p-0">
                                <div className="relative aspect-video">
                                    <image_1.default src={story.imageUrl} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={story.imageHint}/>
                                </div>
                            </card_1.CardHeader>
                            <card_1.CardContent className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                    <badge_1.Badge variant="secondary">{story.category}</badge_1.Badge>
                                    <div className="flex items-center gap-2">
                                        <lucide_react_1.Calendar className="h-4 w-4"/>
                                        <span>{story.date}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 flex-grow group-hover:text-primary transition-colors">
                                    <link_1.default href={story.ctaLink}>{story.title}</link_1.default>
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{story.excerpt}</p>
                            </card_1.CardContent>
                             <card_1.CardFooter className="p-6 pt-0">
                                <button_1.Button asChild className="w-full">
                                  <link_1.default href={story.ctaLink}>
                                    Devamını Oku <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                  </link_1.default>
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>))}
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map