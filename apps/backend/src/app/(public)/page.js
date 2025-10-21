"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const placeholder_images_json_1 = __importDefault(require("@/lib/placeholder-images.json"));
const hero_carousel_1 = require("@/components/hero-carousel");
const solutions_carousel_1 = require("@/components/solutions-carousel");
const products_carousel_1 = require("@/components/products-carousel");
const education_support_section_1 = require("@/components/education-support-section");
const certificate_verification_section_1 = require("@/components/certificate-verification-section");
const resources_section_1 = require("@/components/resources-section");
const newsletter_section_1 = require("@/components/newsletter-section");
const card_1 = require("@/components/ui/card");
const tabs_1 = require("@/components/ui/tabs");
const ParallaxSpacer = ({ imageUrl, imageHint, title, subtitle, buttonText, buttonLink }) => (<section className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="absolute inset-0 bg-black/50"/>
        <div className="container mx-auto px-4 relative text-center text-white z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">{title}</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
                {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
                <button_1.Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <link_1.default href={buttonLink}>
                        {buttonText} <lucide_react_1.ArrowRight className="ml-2 h-5 w-5"/>
                    </link_1.default>
                </button_1.Button>
                <lucide_react_1.ChevronDown className="h-8 w-8 animate-bounce mt-4"/>
            </div>
        </div>
    </section>);
function Home() {
    const whyAluplanImage = placeholder_images_json_1.default.placeholderImages.find(p => p.id === 'why-aluplan');
    const parallaxProductsImage = placeholder_images_json_1.default.placeholderImages.find(p => p.id === 'hero-products');
    const parallaxEducationImage = placeholder_images_json_1.default.placeholderImages.find(p => p.id === 'hero-success');
    const parallaxResourcesImage = placeholder_images_json_1.default.placeholderImages.find(p => p.id === 'hero-civil');
    const workflowItems = {
        design: [
            { id: 'concept', title: '1. Kavramsal Tasarım', contentTitle: 'Fikirlerin ve konseptlerin doğuşu.', text: "Projenin ilk adımı olan bu aşamada, temel fikirler geliştirilir, eskizler oluşturulur ve Allplan'in esnek modelleme araçlarıyla ilk 3B kütle modelleri hayata geçirilir.", image: "https://picsum.photos/seed/workflow1/800/600", imageHint: "concept design sketch" },
            { id: 'schematic', title: '2. Avan Proje', contentTitle: 'Temel planların oluşturulması.', text: "Kavramsal tasarımın detaylandırıldığı, temel planların, kesitlerin ve görünüşlerin oluşturulduğu aşamadır. Malzeme ve sistem seçimleri yapılır.", image: "https://picsum.photos/seed/workflow2/800/600", imageHint: "schematic design blueprint" },
            { id: 'detailed', title: '3. Uygulama Projesi', contentTitle: 'Disiplinlerin entegrasyonu.', text: "Tüm disiplinlerin (mimari, statik, MEP) entegre edildiği, inşaat için gerekli tüm çizim ve bilgilerin üretildiği detaylı proje aşamasıdır.", image: "https://picsum.photos/seed/workflow3/800/600", imageHint: "detailed construction drawing" },
            { id: 'detailing', title: '4. Detaylandırma', contentTitle: 'İmalata yönelik çizimler.', text: "Özellikle donatı ve çelik birleşim detayları gibi imalata yönelik çizimlerin yüksek hassasiyetle oluşturulduğu kritik bir aşamadır.", image: "https://picsum.photos/seed/workflow4/800/600", imageHint: "rebar detailing software" },
            { id: 'reporting', title: '5. Metraj ve Raporlama', contentTitle: 'Otomatik metraj ve raporlar.', text: "Allplan'in akıllı BIM modelinden tek tıkla kesin ve tutarlı metraj, mahal listeleri ve diğer raporlar otomatik olarak oluşturulur.", image: "https://picsum.photos/seed/workflow5/800/600", imageHint: "bill of quantities report" },
            { id: 'visualization', title: '6. Görselleştirme', contentTitle: 'Etkileyici sunumlar.', text: "Entegre render motoru ve animasyon araçları ile projelerinizi paydaşlara ve müşterilere en etkileyici şekilde sunun.", image: "https://picsum.photos/seed/workflow6/800/600", imageHint: "architectural rendering software" },
        ],
        analysis: [
            { id: 'structural', title: '1. Yapısal Analiz', contentTitle: 'Güvenli ve verimli tasarımlar.', text: 'Allplan, önde gelen yapısal analiz yazılımlarıyla entegre çalışarak model verilerinin çift yönlü transferini sağlar.', image: 'https://picsum.photos/seed/analysis1/800/600', imageHint: 'structural analysis software' },
            { id: 'energy', title: '2. Enerji Analizi', contentTitle: 'Sürdürülebilir bina performansı.', text: "AX3000 gibi partner çözümlerle entegrasyon sayesinde, binalarınızın enerji performansını daha tasarım aşamasındayken analiz edin.", image: 'https://picsum.photos/seed/analysis2/800/600', imageHint: 'energy analysis graph' },
            { id: 'clash', title: '3. Çakışma Kontrolü', contentTitle: 'İnşaat öncesi problem çözümü.', text: "Bimplus platformu üzerinden tüm disiplinlerin modellerini bir araya getirerek, olası çakışmaları inşaat başlamadan önce tespit edin.", image: 'https://picsum.photos/seed/analysis3/800/600', imageHint: 'clash detection software' },
        ],
        construction: [
            { id: 'planning', title: '1. Şantiye Planlaması', contentTitle: 'Verimli şantiye yönetimi.', text: 'BIM modeli verileriyle şantiye lojistiğini, vinç yerleşimini ve malzeme akışını planlayarak verimliliği artırın.', image: 'https://picsum.photos/seed/construction1/800/600', imageHint: 'construction site planning' },
            { id: 'prefabrication', title: '2. Prefabrikasyon', contentTitle: 'Otomatikleştirilmiş üretim.', text: "Allplan Precast ile prefabrik elemanların tasarımından imalatına kadar tüm süreci otomatikleştirin.", image: 'https://picsum.photos/seed/construction2/800/600', imageHint: 'precast concrete production' },
            { id: 'simulation', title: '3. 4D/5D Simülasyon', contentTitle: 'Süreç ve maliyet optimizasyonu.', text: "İş programını (4D) ve maliyet bilgilerini (5D) BIM modelinize entegre ederek inşaat sürecini görsel olarak simüle edin.", image: 'https://picsum.photos/seed/construction3/800/600', imageHint: '4d simulation BIM' },
        ],
        management: [
            { id: 'facility', title: '1. Tesis Yönetimi', contentTitle: 'İşletme ve bakım süreçleri.', text: 'İnşaat sonunda oluşturulan "As-Built" BIM modeli, bina işletme ve bakım süreçleri için değerli bir veri kaynağına dönüşür.', image: 'https://picsum.photos/seed/management1/800/600', imageHint: 'facility management software' },
            { id: 'asset', title: '2. Varlık Yönetimi', contentTitle: 'Merkezi varlık bilgileri.', text: "BIM modelinizdeki her bir varlığın bilgilerini (garanti süreleri, bakım talimatları vb.) merkezi olarak yönetin.", image: 'https://picsum.photos/seed/management2/800/600', imageHint: 'asset management dashboard' },
            { id: 'digital-twin', title: '3. Dijital İkiz', contentTitle: 'Gerçek zamanlı performans.', text: "Yapınızın canlı, sensör verileriyle beslenen bir dijital ikizini oluşturarak gerçek zamanlı performans izlemesi yapın.", image: 'https://picsum.photos/seed/management3/800/600', imageHint: 'digital twin building' },
        ]
    };
    return (<div className="flex flex-col">
      {/* Hero Section */}
      <hero_carousel_1.HeroCarousel />

      {/* Certificate Verification Section */}
      <certificate_verification_section_1.CertificateVerificationSection />

      {/* Solutions Carousel Section */}
      <solutions_carousel_1.SolutionsCarousel />

      {/* Parallax Spacer 1 */}
      {parallaxProductsImage && <ParallaxSpacer imageUrl={parallaxProductsImage.imageUrl} imageHint={parallaxProductsImage.imageHint} title="Ürünlerimizi Keşfedin" subtitle="İhtiyaçlarınıza özel olarak tasarlanmış, sektör lideri Allplan ve iş ortağı ürünlerini keşfedin." buttonText="Tüm Ürünler" buttonLink="#products"/>}

      {/* Products Carousel Section */}
      <div id="products"><products_carousel_1.ProductsCarousel /></div>

      {/* Parallax Spacer 2 */}
       {parallaxEducationImage && <ParallaxSpacer imageUrl={parallaxEducationImage.imageUrl} imageHint={parallaxEducationImage.imageHint} title="Bilginizi Genişletin" subtitle="Bilgi birikiminizi artırın, kaynaklarımıza erişin ve ihtiyacınız olan desteği alın." buttonText="Eğitim & Destek" buttonLink="#education"/>}

      {/* Education & Support Section */}
      <div id="education"><education_support_section_1.EducationSupportSection /></div>
      
       {/* Parallax Spacer 3 */}
       {parallaxResourcesImage && <ParallaxSpacer imageUrl={parallaxResourcesImage.imageUrl} imageHint={parallaxResourcesImage.imageHint} title="Kaynak Merkezimiz" subtitle="Sektördeki bilgiyi keşfedin, becerilerinizi geliştirin ve projelerinizi ileriye taşıyın." buttonText="Tüm Kaynaklar" buttonLink="#resources"/>}

      {/* Resources Section */}
      <div id="resources"><resources_section_1.ResourcesSection /></div>


      {/* Why Aluplan Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            {whyAluplanImage && (<div className="relative aspect-[3/2]">
                  <image_1.default src={whyAluplanImage.imageUrl} alt="İşbirliği içinde çalışan mimar ve mühendisler" fill className="rounded-lg shadow-2xl object-cover" data-ai-hint={whyAluplanImage.imageHint}/>
              </div>)}
            <div className="py-4">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Neden Aluplan Digital?</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Sektördeki 20 yılı aşkın tecrübemizle, projenizin her aşamasında yanınızdayız.
                </p>
                <ul className="mt-8 space-y-4">
                    <li className="flex items-start gap-3">
                        <lucide_react_1.CircleCheckBig className="h-6 w-6 text-accent flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold">Uzman Kadro</h3>
                            <p className="text-muted-foreground">Allplan ve endüstri standartları konusunda derin bilgiye sahip uzman ekibimizle destek.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <lucide_react_1.CircleCheckBig className="h-6 w-6 text-accent flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold">Entegre Çözümler</h3>
                            <p className="text-muted-foreground">Tasarım, mühendislik ve inşaatı birleştiren bütünsel bir yaklaşım.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <lucide_react_1.CircleCheckBig className="h-6 w-6 text-accent flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold">Sürekli Eğitim</h3>
                            <p className="text-muted-foreground">Webinarlar, sertifika programları ve özel eğitimlerle yetkinliğinizi artırın.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* Workflow Section */}
       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">İş Akışı</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Entegre iş akışlarımızla projelerinizi nasıl bir üst seviyeye taşıdığımızı keşfedin.
                </p>
            </div>
            <tabs_1.Tabs defaultValue="design" className="w-full">
                <tabs_1.TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <tabs_1.TabsTrigger value="design">1. Tasarım</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="analysis">2. Analiz</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="construction">3. İnşaat</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="management">4. Yönetim</tabs_1.TabsTrigger>
                </tabs_1.TabsList>
                <tabs_1.TabsContent value="design">
                    <card_1.Card className="mt-6">
                        <card_1.CardContent className="p-0">
                            <tabs_1.Tabs defaultValue={workflowItems.design[0].id} orientation="vertical" className="grid md:grid-cols-4">
                                <tabs_1.TabsList className="flex flex-col h-auto rounded-none bg-secondary/50 p-2 items-stretch">
                                    {workflowItems.design.map(item => (<tabs_1.TabsTrigger key={item.id} value={item.id} className="justify-start py-4">{item.title}</tabs_1.TabsTrigger>))}
                                </tabs_1.TabsList>
                                <div className="md:col-span-3 p-8">
                                    {workflowItems.design.map(item => (<tabs_1.TabsContent key={item.id} value={item.id}>
                                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <image_1.default src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{item.contentTitle}</h3>
                                                    <p className="mt-2 text-muted-foreground">{item.text}</p>
                                                </div>
                                            </div>
                                        </tabs_1.TabsContent>))}
                                </div>
                            </tabs_1.Tabs>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
                 <tabs_1.TabsContent value="analysis">
                    <card_1.Card className="mt-6">
                        <card_1.CardContent className="p-0">
                            <tabs_1.Tabs defaultValue={workflowItems.analysis[0].id} orientation="vertical" className="grid md:grid-cols-4">
                                <tabs_1.TabsList className="flex flex-col h-auto rounded-none bg-secondary/50 p-2 items-stretch">
                                    {workflowItems.analysis.map(item => (<tabs_1.TabsTrigger key={item.id} value={item.id} className="justify-start py-4">{item.title}</tabs_1.TabsTrigger>))}
                                </tabs_1.TabsList>
                                <div className="md:col-span-3 p-8">
                                    {workflowItems.analysis.map(item => (<tabs_1.TabsContent key={item.id} value={item.id}>
                                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <image_1.default src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{item.contentTitle}</h3>
                                                    <p className="mt-2 text-muted-foreground">{item.text}</p>
                                                </div>
                                            </div>
                                        </tabs_1.TabsContent>))}
                                </div>
                            </tabs_1.Tabs>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
                 <tabs_1.TabsContent value="construction">
                    <card_1.Card className="mt-6">
                        <card_1.CardContent className="p-0">
                            <tabs_1.Tabs defaultValue={workflowItems.construction[0].id} orientation="vertical" className="grid md:grid-cols-4">
                                <tabs_1.TabsList className="flex flex-col h-auto rounded-none bg-secondary/50 p-2 items-stretch">
                                    {workflowItems.construction.map(item => (<tabs_1.TabsTrigger key={item.id} value={item.id} className="justify-start py-4">{item.title}</tabs_1.TabsTrigger>))}
                                </tabs_1.TabsList>
                                <div className="md:col-span-3 p-8">
                                    {workflowItems.construction.map(item => (<tabs_1.TabsContent key={item.id} value={item.id}>
                                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <image_1.default src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{item.contentTitle}</h3>
                                                    <p className="mt-2 text-muted-foreground">{item.text}</p>
                                                </div>
                                            </div>
                                        </tabs_1.TabsContent>))}
                                </div>
                            </tabs_1.Tabs>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
                <tabs_1.TabsContent value="management">
                    <card_1.Card className="mt-6">
                        <card_1.CardContent className="p-0">
                            <tabs_1.Tabs defaultValue={workflowItems.management[0].id} orientation="vertical" className="grid md:grid-cols-4">
                                <tabs_1.TabsList className="flex flex-col h-auto rounded-none bg-secondary/50 p-2 items-stretch">
                                    {workflowItems.management.map(item => (<tabs_1.TabsTrigger key={item.id} value={item.id} className="justify-start py-4">{item.title}</tabs_1.TabsTrigger>))}
                                </tabs_1.TabsList>
                                <div className="md:col-span-3 p-8">
                                    {workflowItems.management.map(item => (<tabs_1.TabsContent key={item.id} value={item.id}>
                                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <image_1.default src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.imageHint}/>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{item.contentTitle}</h3>
                                                    <p className="mt-2 text-muted-foreground">{item.text}</p>
                                                </div>
                                            </div>
                                        </tabs_1.TabsContent>))}
                                </div>
                            </tabs_1.Tabs>
                        </card_1.CardContent>
                    </card_1.Card>
                </tabs_1.TabsContent>
            </tabs_1.Tabs>
        </div>
    </section>

      {/* Newsletter Section */}
      <newsletter_section_1.NewsletterSection />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Projenizi Hayata Geçirmeye Hazır mısınız?</h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                  Uzman ekibimizle tanışın ve dijital dönüşüm yolculuğunuzda size nasıl yardımcı olabileceğimizi öğrenin.
              </p>
              <div className="mt-8">
                  <button_1.Button size="lg" variant="outline" asChild className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      <link_1.default href="/contact">Bize Ulaşın</link_1.default>
                  </button_1.Button>
              </div>
          </div>
      </section>
    </div>);
}
//# sourceMappingURL=page.js.map