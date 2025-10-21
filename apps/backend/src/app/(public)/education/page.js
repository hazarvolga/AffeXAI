"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EducationPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const education_support_section_1 = require("@/components/education-support-section");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const highlights = [
    {
        title: "Eğitim & Danışmanlık",
        description: "Allplan yetkinliğinizi en üst düzeye çıkarmak için tasarlanmış eğitim programları ve danışmanlık hizmetleri.",
        href: "/education/training",
        icon: lucide_react_1.GraduationCap,
    },
    {
        title: "Sertifika Sorgulama",
        description: "Allplan sertifikalarınızın geçerliliğini anında doğrulayın ve profesyonel yetkinliğinizi kanıtlayın.",
        href: "/education/certification",
        icon: lucide_react_1.BookOpen,
    },
    {
        title: "Destek Merkezi",
        description: "Karşılaştığınız tüm sorunlar için teknik ekibimizden hızlı ve etkili destek alın.",
        href: "/downloads",
        icon: lucide_react_1.LifeBuoy,
    }
];
function EducationPage() {
    return (<div>
            <page_hero_1.PageHero title="Eğitim & Destek" subtitle="Bilgi birikiminizi artırın, kaynaklarımıza erişin ve ihtiyacınız olan desteği alın. Aluplan Digital olarak, başarınız için gerekli tüm araçları sağlıyoruz."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'Eğitim & Destek', href: '/education' }]}/>

            <div className="container mx-auto py-16 px-4">
                 <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {highlights.map(item => (<link_1.default href={item.href} key={item.title}>
                            <card_1.Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all">
                                <card_1.CardHeader className="flex flex-row items-center gap-4">
                                    <item.icon className="h-10 w-10 text-primary"/>
                                    <card_1.CardTitle>{item.title}</card_1.CardTitle>
                                </card_1.CardHeader>
                                <card_1.CardContent>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </card_1.CardContent>
                            </card_1.Card>
                        </link_1.default>))}
                 </div>
            </div>

            <education_support_section_1.EducationSupportSection />
        </div>);
}
//# sourceMappingURL=page.js.map