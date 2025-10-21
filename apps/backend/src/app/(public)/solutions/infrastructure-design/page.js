"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InfrastructureDesignPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const disciplines = [
    {
        title: "Altyapı Mühendisliği",
        description: "Yol, su, kanalizasyon ve enerji gibi temel altyapı sistemlerinin tasarımı ve yönetimi için bütünsel çözümler.",
        href: "/solutions/infrastructure-design/infrastructure-engineering",
        icon: lucide_react_1.Network,
        image: "https://picsum.photos/seed/infra-eng/600/400",
        imageHint: "city infrastructure plan"
    },
    {
        title: "Yol & Demiryolu Tasarımı",
        description: "Hassas arazi modelleme, güzergah optimizasyonu ve sanat yapıları tasarımı ile verimli ulaşım ağları oluşturun.",
        href: "/solutions/infrastructure-design/road-railway-design",
        icon: lucide_react_1.Waypoints,
        image: "https://picsum.photos/seed/road-design/600/400",
        imageHint: "highway design software"
    },
    {
        title: "Köprü Tasarımı",
        description: "Parametrik modelleme, yapısal analiz ve detaylandırma özelliklerini birleştiren Allplan Bridge ile ikonik köprüler tasarlayın.",
        href: "/solutions/infrastructure-design/bridge-design",
        icon: lucide_react_1.Construction,
        image: "https://picsum.photos/seed/bridge-design-2/600/400",
        imageHint: "bridge architectural model"
    }
];
function InfrastructureDesignPage() {
    return (<div>
            <page_hero_1.PageHero title="Altyapı Tasarımı" subtitle="Yol, köprü, demiryolu ve genel altyapı projeleriniz için güçlü, entegre ve özel BIM çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Çözümler', href: '/solutions' },
            { name: 'Altyapı Tasarımı', href: '/solutions/infrastructure-design' }
        ]}/>
            <div className="container mx-auto py-16 px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Geleceğin Bağlantılarını Kurun</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Allplan altyapı çözümleri, en karmaşık projelerde bile verimliliği, disiplinler arası işbirliğini ve kaliteyi artırmak için tasarlanmıştır.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {disciplines.map((item) => (<card_1.Card key={item.title} className="overflow-hidden flex flex-col group">
                            <div className="relative aspect-[16/9]">
                                <image_1.default src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={item.imageHint}/>
                            </div>
                            <card_1.CardHeader>
                                <card_1.CardTitle className="flex items-start gap-3">
                                    <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                    {item.title}
                                </card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow">
                                <card_1.CardDescription>{item.description}</card_1.CardDescription>
                            </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button asChild className="w-full">
                                    <link_1.default href={item.href}>
                                        Detayları İncele
                                        <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                    </link_1.default>
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>))}
                </div>

                 <section className="text-center py-20 mt-16 bg-secondary/50 rounded-lg">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Altyapı Projeniz İçin Doğru Çözüm</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Uzman ekibimizle bir demo planlayın ve Allplan'ın projenizi nasıl bir üst seviyeye taşıyabileceğini keşfedin.
                    </p>
                     <button_1.Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                       <link_1.default href="/contact">Demo Talep Edin</link_1.default>
                    </button_1.Button>
                </section>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map