"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BuildingInfrastructurePage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const softwareList = [
    {
        title: "Allplan - AEC Endüstrisi için BIM",
        description: "Mimari, mühendislik ve inşaat (AEC) profesyonelleri için entegre, disiplinler arası bir BIM platformu.",
        href: "/products/building-infrastructure/allplan-aec",
        icon: lucide_react_1.Building2,
        image: "https://picsum.photos/seed/aec-software/800/450",
        imageHint: "bim model building",
    },
    {
        title: "Allplan Bridge - Köprü Tasarımı",
        description: "Parametrik modelleme, yapısal analiz ve detaylandırma özelliklerini bir araya getiren eksiksiz köprü mühendisliği çözümü.",
        href: "/products/building-infrastructure/allplan-bridge",
        icon: lucide_react_1.Construction,
        image: "https://picsum.photos/seed/bridge-software/800/450",
        imageHint: "bridge design software",
    },
    {
        title: "AX3000 - Enerji Simülasyonu",
        description: "Binaların enerji verimliliğini analiz etmek ve TGA (HVAC) sistemlerini tasarlamak için kullanılan güçlü bir araç.",
        href: "/products/building-infrastructure/ax3000",
        icon: lucide_react_1.Thermometer,
        image: "https://picsum.photos/seed/hvac-software/800/450",
        imageHint: "hvac system blueprint",
    }
];
function BuildingInfrastructurePage() {
    return (<div>
            <page_hero_1.PageHero title="Bina ve Altyapı Yazılımları" subtitle="Bina ve altyapı projelerinizin her aşaması için güçlü, entegre ve özel yazılım çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Bina ve Altyapı Yazılımları', href: '/products/building-infrastructure' }
        ]}/>
            <div className="container mx-auto py-16 px-4">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Projelerinizi Geleceğe Taşıyın</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Allplan ve iş ortağı çözümleri, en karmaşık bina ve altyapı projelerinde bile verimliliği, işbirliğini ve kaliteyi artırmak için tasarlanmıştır.
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