"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllplanPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const allplanVersions = [
    {
        title: "Allplan Basic",
        description: "Temel 2B çizim ve 3B modelleme ihtiyaçlarınız için güçlü ve ekonomik bir başlangıç.",
        href: "/products/allplan/basic",
        image: "https://picsum.photos/seed/allplan-basic/600/400",
        imageHint: "2d blueprint drawing"
    },
    {
        title: "Allplan Concept",
        description: "Kavramsal tasarım, hızlı görselleştirme ve sunum için ideal araçlar sunar.",
        href: "/products/allplan/concept",
        image: "https://picsum.photos/seed/allplan-concept/600/400",
        imageHint: "architectural sketch 3d"
    },
    {
        title: "Allplan Professional",
        description: "Mimarlar ve mühendisler için tüm profesyonel araçları içeren kapsamlı BIM çözümü.",
        href: "/products/allplan/professional",
        image: "https://picsum.photos/seed/allplan-pro/600/400",
        imageHint: "detailed architectural model"
    },
    {
        title: "Allplan Ultimate",
        description: "Tüm Allplan özelliklerini ve modüllerini içeren, en üst düzey projeler için nihai paket.",
        href: "/products/allplan/ultimate",
        image: "https://picsum.photos/seed/allplan-ultimate/600/400",
        imageHint: "complex building structure"
    },
    {
        title: "Allplan Civil",
        description: "İnşaat mühendisliği ve altyapı projeleri için özel olarak tasarlanmış çözümler sunar.",
        href: "/products/allplan/civil",
        image: "https://picsum.photos/seed/allplan-civil/600/400",
        imageHint: "road infrastructure design"
    },
    {
        title: "Allplan Precast",
        description: "Prefabrik elemanların tasarımı, detaylandırılması ve üretimi için otomasyon sağlar.",
        href: "/products/allplan/precast",
        image: "https://picsum.photos/seed/allplan-precast/600/400",
        imageHint: "precast concrete elements"
    }
];
function AllplanPage() {
    return (<div>
            <page_hero_1.PageHero title="Allplan Ürün Ailesi" subtitle="Tasarım, mühendislik ve inşaat için her ihtiyaca yönelik kapsamlı BIM çözümleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Ürünler', href: '/products' },
            { name: 'Allplan', href: '/products/allplan' }
        ]}/>
            <div className="container mx-auto py-16 px-4">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Projeniz İçin Doğru Allplan'ı Seçin</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        Allplan, temel 2B çizimden en karmaşık BIM projelerine kadar her ölçekteki ihtiyaca cevap veren esnek bir ürün yelpazesi sunar.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allplanVersions.map((version) => (<card_1.Card key={version.title} className="overflow-hidden flex flex-col group">
                             <div className="relative aspect-[16/9]">
                                <image_1.default src={version.image} alt={version.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={version.imageHint}/>
                            </div>
                            <card_1.CardHeader>
                                <card_1.CardTitle>{version.title}</card_1.CardTitle>
                                <card_1.CardDescription>{version.description}</card_1.CardDescription>
                            </card_1.CardHeader>
                             <card_1.CardContent className="flex-grow">
                                {/* Can add more details like feature list here */}
                             </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button asChild className="w-full">
                                    <link_1.default href={version.href}>
                                        Detayları İncele
                                        <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>
                                    </link_1.default>
                                </button_1.Button>
                            </card_1.CardFooter>
                        </card_1.Card>))}
                </div>

                <section className="text-center py-20 mt-16 bg-secondary/50 rounded-lg">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Hangi Paketin Size Uygun Olduğundan Emin Değil Misiniz?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Paketleri karşılaştırarak özelliklerini detaylıca inceleyin veya uzman ekibimizden projenize özel öneriler alın.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button_1.Button size="lg" variant="outline">
                            <lucide_react_1.Package className="mr-2"/> Paketleri Karşılaştır
                        </button_1.Button>
                         <button_1.Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                           <link_1.default href="/contact">Satış Temsilcisine Ulaşın</link_1.default>
                        </button_1.Button>
                    </div>
                </section>
            </div>
        </div>);
}
//# sourceMappingURL=page.js.map