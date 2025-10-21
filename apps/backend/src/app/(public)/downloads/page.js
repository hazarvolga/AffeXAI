"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DownloadsPage;
const page_hero_1 = require("@/components/common/page-hero");
const breadcrumb_1 = require("@/components/common/breadcrumb");
const resources_section_1 = require("@/components/resources-section");
const accordion_1 = require("@/components/ui/accordion");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const faqItems = [
    {
        question: "Allplan için sistem gereksinimleri nelerdir?",
        answer: "Allplan'ın güncel sürümü için önerilen sistem gereksinimleri: Windows 10/11 (64-bit), en az 16 GB RAM, 2 GB VRAM'li DirectX 11 uyumlu ekran kartı ve 50 GB boş disk alanı. Detaylı bilgi için teknik bilgi sayfamızı ziyaret edebilirsiniz."
    },
    {
        question: "Öğrenci lisansına nasıl başvurabilirim?",
        answer: "Allplan Campus portalı üzerinden öğrenci belgenizle birlikte ücretsiz öğrenci lisansı başvurusunda bulunabilirsiniz. Lisansınız bir yıl geçerlidir ve her yıl yenilenebilir."
    },
    {
        question: "Teknik destek nasıl alabilirim?",
        answer: "Müşteri portalımız üzerinden destek talebi oluşturabilir veya acil durumlar için destek hattımızı arayabilirsiniz. Ekibimiz en kısa sürede size yardımcı olacaktır."
    }
];
const customerLinks = [
    { title: "Allplan Connect", description: "Kullanıcı portalı, forumlar ve kaynaklar.", href: "#" },
    { title: "Bimplus Login", description: "Bulut tabanlı işbirliği platformuna erişin.", href: "#" },
    { title: "Allplan Exchange Login", description: "Proje verilerinizi güvenle paylaşın.", href: "#" },
];
function DownloadsPage() {
    return (<div>
            <page_hero_1.PageHero title="İndirme Merkezi & Destek" subtitle="Gerekli tüm kaynaklara, dokümanlara ve destek kanallarına buradan ulaşın."/>
            <breadcrumb_1.Breadcrumb items={[{ name: 'İndirme Merkezi', href: '/downloads' }]}/>
            
            <section id="faq" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 max-w-4xl">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Sıkça Sorulan Sorular (SSS)</h2>
                        <p className="text-muted-foreground mt-2">Aklınıza takılan soruların yanıtlarını burada bulabilirsiniz.</p>
                    </div>
                    <accordion_1.Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (<accordion_1.AccordionItem key={index} value={`item-${index}`}>
                                <accordion_1.AccordionTrigger>{item.question}</accordion_1.AccordionTrigger>
                                <accordion_1.AccordionContent>{item.answer}</accordion_1.AccordionContent>
                            </accordion_1.AccordionItem>))}
                    </accordion_1.Accordion>
                </div>
            </section>

            <resources_section_1.ResourcesSection />

            <section id="customer" className="py-16">
                 <div className="container mx-auto px-4">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Müşteri Erişimi</h2>
                        <p className="text-muted-foreground mt-2">Lisans, abonelik ve proje yönetimi portallarınıza buradan ulaşın.</p>
                    </div>
                     <div className="grid md:grid-cols-3 gap-8">
                         {customerLinks.map(link => (<card_1.Card key={link.title} className="text-center">
                                 <card_1.CardHeader>
                                     <card_1.CardTitle>{link.title}</card_1.CardTitle>
                                     <card_1.CardDescription>{link.description}</card_1.CardDescription>
                                 </card_1.CardHeader>
                                 <card_1.CardContent>
                                     <button_1.Button asChild>
                                         <link_1.default href={link.href}>Giriş Yap <lucide_react_1.ExternalLink className="ml-2 h-4 w-4"/></link_1.default>
                                     </button_1.Button>
                                 </card_1.CardContent>
                             </card_1.Card>))}
                     </div>
                 </div>
            </section>
        </div>);
}
//# sourceMappingURL=page.js.map