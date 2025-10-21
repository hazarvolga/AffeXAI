"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrainingPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const trainingPrograms = [
    {
        title: "Allplan Temel Eğitimi (Mimari)",
        description: "Allplan'a yeni başlayan mimarlar ve öğrenciler için 2B çizim, 3B modelleme ve pafta hazırlama konularını içeren temel eğitim.",
        duration: "3 Gün (24 Saat)",
        level: "Başlangıç",
        image: "https://picsum.photos/seed/training1/600/400",
        imageHint: "architecture blueprint",
    },
    {
        title: "Allplan İleri Düzey (Yapısal)",
        description: "Deneyimli inşaat mühendisleri için parametrik donatı modelleme, PythonParts kullanımı ve Bimplus entegrasyonu.",
        duration: "2 Gün (16 Saat)",
        level: "İleri",
        image: "https://picsum.photos/seed/training2/600/400",
        imageHint: "structural engineering model"
    },
    {
        title: "Allplan Bridge Eğitimi",
        description: "Köprü mühendislerine özel, parametrik modelleme, analiz ve detaylandırma konularını kapsayan kapsamlı eğitim.",
        duration: "4 Gün (32 Saat)",
        level: "Orta / İleri",
        image: "https://picsum.photos/seed/training3/600/400",
        imageHint: "bridge design software"
    },
    {
        title: "Kurumsal BIM Danışmanlığı",
        description: "Firmanızın ihtiyaçlarına özel BIM süreçleri oluşturma, standartlar geliştirme ve proje bazlı danışmanlık hizmetleri.",
        duration: "Değişken",
        level: "Tüm Seviyeler",
        image: "https://picsum.photos/seed/training4/600/400",
        imageHint: "business meeting collaboration"
    }
];
function TrainingPage() {
    return (<div>
            <page_hero_1.PageHero title="Eğitim & Danışmanlık" subtitle="Allplan yetkinliğinizi en üst düzeye çıkarmak için tasarlanmış eğitim programları ve danışmanlık hizmetleri."/>
            <breadcrumb_1.Breadcrumb items={[
            { name: 'Eğitim & Destek', href: '/education' },
            { name: 'Eğitim & Danışmanlık', href: '/education/training' }
        ]}/>
            <div className="container mx-auto py-16 px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold">Size Uygun Programı Seçin</h2>
                    <p className="text-lg text-muted-foreground mt-4">
                        İster yeni başlıyor olun, ister uzmanlığınızı derinleştirmek isteyin, kariyer hedeflerinize uygun bir eğitim programımız mutlaka vardır.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {trainingPrograms.map((program) => (<card_1.Card key={program.title} className="overflow-hidden flex flex-col group">
                            <div className="relative aspect-[16/9]">
                                <image_1.default src={program.image} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={program.imageHint}/>
                            </div>
                            <card_1.CardHeader>
                                <card_1.CardTitle>{program.title}</card_1.CardTitle>
                                <card_1.CardDescription>{program.description}</card_1.CardDescription>
                            </card_1.CardHeader>
                            <card_1.CardContent className="flex-grow">
                                <div className="flex justify-between text-sm text-muted-foreground border-t pt-4">
                                    <div className="flex items-center gap-2">
                                        <lucide_react_1.Clock className="h-4 w-4"/>
                                        <span>{program.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <lucide_react_1.User className="h-4 w-4"/>
                                        <span>{program.level}</span>
                                    </div>
                                </div>
                            </card_1.CardContent>
                            <card_1.CardFooter>
                                <button_1.Button asChild className="w-full">
                                    <link_1.default href="/contact">
                                        Bilgi Al & Kayıt Ol
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