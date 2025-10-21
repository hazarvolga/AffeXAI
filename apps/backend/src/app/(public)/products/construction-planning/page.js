"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConstructionPlanningPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const softwareList = [
    {
        title: "Allplan Precast - Prekast Detaylandırma",
        description: "Prefabrik beton elemanların tasarımı, detaylandırılması ve imalat verilerinin oluşturulması için lider çözüm.",
        href: "/products/allplan/precast",
        icon: lucide_react_1.Factory,
        image: "https://picsum.photos/seed/precast-planning/800/450",
        imageHint: "precast concrete elements",
    },
    {
        title: "Tim - Prekast İş Planlaması",
        description: "Prefabrik üretim tesisleri için özel olarak geliştirilmiş, iş akışı ve kaynak planlaması sağlayan ERP çözümü.",
        href: "/products/construction-planning/tim",
        icon: lucide_react_1.GanttChart,
        image: "https://picsum.photos/seed/tim-planning/800/450",
        imageHint: "factory production planning",
    },
    {
        title: "SDS/2 - Çelik Detaylandırma ve İmalatı",
        description: "Çelik yapıların 3B modellemesi, bağlantı tasarımı ve imalat otomasyonu için akıllı ve güçlü bir yazılım.",
        href: "/products/construction-planning/sds2",
        icon: lucide_react_1.Construction,
        image: "https://picsum.photos/seed/sds2-planning/800/450",
        imageHint: "steel structure modeling",
    }
];
function ConstructionPlanningPage() {
    return (<div>
            <page_hero_1.PageHero title="İnşaat Planlama Yazılımları" subtitle="İnşaat süreçlerinizi optimize eden, detaylandırma ve imalatı kolaylaştıran özel yazılımlar."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'İnşaat Planlama Yazılımları', href: '/products/construction-planning' }
        ]}/>
            <div className="container mx-auto py-16 px-4">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Tasarım Ofisinden Şantiyeye Kusursuz Akış</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        İnşaat planlama çözümlerimiz, proje verimliliğini artırmak, hataları azaltmak ve imalat süreçlerini otomatikleştirmek için tasarlanmıştır.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {softwareList.map((software) => (<card_1.Card key={software.title} className="flex flex-col group overflow-hidden">
                            <div className="relative aspect-video">
                                <image_1.default src={software.image} alt={software.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={software.imageHint}/>
                            </div>
                            <card_1.CardHeader>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-lg mt-1">
                                        <software.icon className="h-6 w-6 text-primary"/>
                                    </div>
                                    <div>
                                        <card_1.CardTitle>{software.title}</card_1.CardTitle>
                                    </div>
                                </div>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow">
                                <card_1.CardDescription>{software.description}</card_1.CardDescription>
                            </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button asChild className="w-full">
                                    <link_1.default href={software.href}>
                                        Daha Fazla Bilgi
                                        <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                    </link_1.default>
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>))}
                </div>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map