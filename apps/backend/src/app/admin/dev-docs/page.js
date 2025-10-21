"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeveloperDocsPage;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const alert_1 = require("@/components/ui/alert");
const DocSection = ({ title, icon: Icon, children }) => (<card_1.Card>
        <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-3 text-xl">
                <Icon className="h-6 w-6 text-primary"/>
                {title}
            </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            {children}
        </card_1.CardContent>
    </card_1.Card>);
const CodeBlock = ({ children }) => (<pre className="bg-muted p-4 rounded-lg text-sm text-foreground overflow-x-auto">
        <code>
            {children}
        </code>
    </pre>);
function DeveloperDocsPage() {
    return (<div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Geliştirici Dokümantasyonu</h1>
                <p className="text-muted-foreground mt-1">
                    Bu doküman, projenin mevcut yapısını, mimarisini ve geliştirme standartlarını açıklamaktadır.
                </p>
            </div>
            
            <alert_1.Alert variant="destructive">
                <lucide_react_1.AlertCircle className="h-4 w-4"/>
                <alert_1.AlertTitle>Bilinen Sorun: AI Dosya Oluşturma</alert_1.AlertTitle>
                <alert_1.AlertDescription>
                    Geliştirme sürecinde, AI'nin bazen istenen dosya içeriklerini oluşturmada veya güncellemede başarısız olduğu gözlemlenmiştir. Özellikle, bir dosyanın içeriğinin boş gelmesi veya defalarca istenmesine rağmen eski veriyi döndürmesi (Örn: <code>roles-data.ts</code>) gibi durumlarla karşılaşılmıştır. Bir dosya değişikliği talebinden sonra, hedeflenen dosyanın içeriğinin beklendiği gibi güncellendiğini manuel olarak doğrulamak önemlidir.
                </alert_1.AlertDescription>
            </alert_1.Alert>

            <DocSection title="Giriş" icon={lucide_react_1.FileCode}>
                 <p><strong>Project Overview</strong></p>
    <p>This project is a full-featured web platform designed to manage content, users, events, email marketing, certifications, support requests, and social media operations. It provides both a public-facing website and a robust admin panel with modular architecture, role-based access, and AI-assisted features.</p>
    <p><strong>Key Features</strong></p>
    <ul>
    <li><strong>Public Website:</strong> Hero carousels, solution/product listings, case studies, knowledge base, downloads, training and certification pages.</li>
    <li><strong>Admin Panel:</strong> Centralized management of users, roles, events, CMS pages &amp; menus, certificates, newsletters, social media, support tickets, and site settings.</li>
    <li><strong>User Portal:</strong> Role-based dashboards for Admin, Editor, Customer, Marketing, and Support Teams; event participation, certificate tracking, knowledge base, and support requests.</li>
    <li><strong>Email Marketing Module:</strong> Campaign creation, subscriber management, templates, groups, and segments, with live previews and CSV import/export.</li>
    <li><strong>Events Module:</strong> Event creation, editing, participant management, and social sharing.</li>
    <li><strong>CMS Module:</strong> Page and menu management, SEO settings, content revision, and category management.</li>
    <li><strong>Support Module:</strong> Ticket management, category hierarchies, AI-assisted ticket suggestions, and two-step ticket creation.</li>
    <li><strong>Social Media Module:</strong> Content calendar, post management, and AI-assisted multi-step post creation.</li>
    <li><strong>Certificates Module:</strong> Creation, editing, verification, and status tracking of certificates.</li>
    <li><strong>AI-Assisted Content Generation:</strong> Automatic content creation for pages, emails, and social posts.</li>
    <li><strong>Advanced Analytics:</strong> Dashboards for campaigns, subscribers, pages, events, and tickets.</li>
    <li><strong>Bulk Operations:</strong> Import/export for pages, categories, subscribers, and tickets.</li>
    <li><strong>Revision History:</strong> Tracking changes across all CRUD operations for audit and rollback purposes.</li>
    </ul>
    <p><strong>Technical Highlights</strong></p>
    <ul>
    <li><strong>Modular Architecture:</strong> Each module is self-contained, making it easy to maintain and extend.</li>
    <li><strong>Role-Based Access Control:</strong> Admin, Editor, Marketing, Support, Viewer, and Customer roles with fine-grained permissions.</li>
    <li><strong>Dynamic Data Mocking:</strong> lib/*-data.ts files provide simulated content for development and testing.</li>
    <li><strong>Persistent Settings:</strong> Site-wide configurations are saved via lib/site-settings-data.ts.</li>
    <li><strong>Extensible AI Workflows:</strong> AI modules in ai/flows/*.ts integrate seamlessly with content creation and support workflows.</li>
    </ul>
    <p>This platform is designed to provide developers with a clear, scalable structure for building, testing, and extending features, ensuring rapid development while maintaining consistent UX and data integrity.</p>
            </DocSection>

            <DocSection title="Route" icon={lucide_react_1.Share2}>
                <CodeBlock>
        {`src/app
|-- (public)/  (Siteyi ziyaret eden herkesin erişebildiği sayfalar)
|   |-- / (Ana Sayfa): Hero Carousel, Çözüm ve Ürün Karuselleri, parallax bölümleri, statik içerik ve CTA'lar.
|   |-- /case-studies: Başarı hikayeleri listesi ve filtreleme seçenekleri.
|   |-- /contact: İletişim formu ve iletişim bilgileri.
|   |-- /downloads: SSS (Accordion), kaynaklar (ResourcesSection) ve müşteri erişim linkleri.
|   |-- /education: Eğitim, sertifika ve destek merkezine yönlendiren kartlar.
|   |   |-- /certification: Sertifika sorgulama formu ve sonuç alanı.
|   |   |-- /training: Eğitim programlarını listeleyen kartlar.
|   |-- /privacy: Gizlilik politikası metni.
|   |-- /products: Ürün kategorilerini listeleyen kartlar.
|   |   |-- /allplan: Allplan ürün ailesinin alt versiyonlarını listeleyen kartlar.
|   |   |   |-- /basic, /civil, /concept, vb.: İlgili Allplan sürümü için boş içerik sayfası.
|   |   |-- /building-infrastructure: Bina/Altyapı ürünlerini (Allplan AEC, Bridge, AX3000) listeleyen kartlar.
|   |   |-- /collaboration: İşbirliği yazılımlarını (Bimplus, Allplan Share) detaylı kartlar içinde listeler.
|   |   |-- /construction-planning: İnşaat planlama yazılımlarını (Precast, Tim, SDS/2) listeleyen kartlar.
|   |-- /solutions: Çözüm kategorilerini ve alt başlıklarını listeleyen kartlar.
|   |   |-- /building-design: Mimari, Yapısal ve MEP disiplinlerini ve özelliklerini detaylandıran kartlar ve bölümler.
|   |   |-- /infrastructure-design: Altyapı, yol ve köprü tasarımı çözümlerini listeleyen kartlar.
|   |   |-- /add-on-modules, /collaboration, vb.: İlgili çözüm için boş içerik sayfası.
|   |-- /terms: Kullanım koşulları metni.
|-- admin/  (Yönetim Paneli)
|   |-- / (Dashboard): KPI kartları, hızlı erişim kartları ve haftalık trendleri gösteren bir çizgi grafiği.
|   |-- /blueprint: Proje mimarisinin JSON formatında gösterildiği bir kod bloğu.
|   |-- /certificates: Sertifika istatistik kartları, durumlarına göre sekmeler (Tabs) ve sertifikaları listeleyen bir tablo (Table).
|   |   |-- /new: Yeni sertifika oluşturma formu (CertificateForm).
|   |   |-- /[certificateId]: Mevcut sertifikayı düzenleme formu (CertificateForm).
|   |-- /cms/menus: Menüleri (Tabs) ve sürükle-bırak arayüzü ile menü öğelerini yönetme arayüzü.
|   |-- /cms/pages: Sayfa istatistik kartları ve sayfaları listeleyen bir tablo (Table).
|   |   |-- /new: Yeni sayfa oluşturma formu.
|   |   |-- /[pageId]: Sayfa içeriği, SEO ayarları ve sosyal medya paylaşımlarını içeren sekmeli (Tabs) bir düzenleme arayüzü.
|   |-- /dev-docs: Proje yapısı, mimarisi ve standartlarını açıklayan dokümantasyon kartları (DocSection).
|   |-- /events: Etkinlik istatistik kartları ve durumlarına göre (tümü, yaklaşan, geçmiş, taslak) sekmeler ve etkinlikleri listeleyen bir tablo.
|   |   |-- /new: Yeni etkinlik oluşturma formu (EventForm).
|   |   |-- /[eventId]: Etkinlik düzenleme, katılımcı yönetimi ve sosyal medya paylaşımı için sekmeli (Tabs) bir arayüz.
|   |-- /logs: Sistemdeki tüm aktiviteleri listeleyen bir tablo (Table).
|   |-- /newsletter: Abone ve kampanya istatistiklerini gösteren grafikler (Charts), ve ilgili bölümleri yönetmek için açılır/kapanır (Collapsible) kartlar.
|   |   |-- /campaigns/[campaignId]: Kampanya detayları, istatistikleri ve e-posta içeriği önizlemesi.
|   |   |-- /campaigns/new: Zengin metin editörü (placeholder) ile yeni e-posta kampanyası oluşturma formu.
|   |   |-- /groups/[groupId]: Belirli bir gruba ait aboneleri listeleyen tablo.
|   |   |-- /segments/[segmentId]: Belirli bir segmente ait aboneleri listeleyen tablo.
|   |   |-- /subscribers/import: Aboneleri CSV ile içe aktarmak için çok adımlı bir arayüz.
|   |   |-- /templates/[templateId]/edit: E-posta şablonunun kodunu gösteren salt okunur bir editör.
|   |   |-- /templates/[templateId]/preview: React Email ile oluşturulmuş e-posta şablonunun canlı önizlemesi.
|   |-- /notifications: Tüm sistem ve kullanıcı bildirimlerini listeleyen bir arayüz.
|   |-- /settings/site: Şirket, AI, E-posta, Sosyal Medya ve Analitik ayarlarını içeren sekmeli (Tabs) bir form.
|   |-- /social-media: İçerik takvimi (Calendar), son gönderiler tablosu ve bağlı hesapların listesi.
|   |   |-- /composer: AI destekli, çok adımlı bir sosyal medya gönderisi oluşturma arayüzü.
|   |-- /support: Destek talebi istatistik kartları ve son talepleri listeleyen bir tablo.
|   |   |-- /new: Manuel olarak yeni bir destek talebi oluşturma formu.
|   |   |-- /categories: Destek kategorilerini hiyerarşik bir yapıda listeleyen ve yöneten bir tablo.
|   |   |-- /[ticketId]: Talep detayları, mesajlaşma geçmişi ve yönetim araçlarını içeren üç sütunlu bir düzen.
|   |-- /users: Kullanıcı ve rol istatistik kartları, kullanıcıları ve rolleri listeleyen tablolar.
|   |   |-- /new: Yeni kullanıcı ekleme formu (UserForm).
|   |   |-- /roles: Rollerin ve izinlerin detaylı matrisini gösteren bir sayfa.
|   |   |   |-- /create-new-role: Yeni rol oluşturma ve izin atama formu.
|   |   |   |-- /[roleId]: Mevcut rolü düzenleme formu (RoleForm).
|   |   |-- /[userId]: Mevcut kullanıcıyı düzenleme formu (UserForm).
|   |-- (auth)/: Kimlik doğrulama sayfaları için ortak layout.
|   |   |-- /forgot-password, /login, /signup: Standart kimlik doğrulama formları.
|-- portal/  (Kullanıcı Portalı)
|   |-- / (Giriş): /portal/dashboard'a yönlendirme yapar.
|   |-- /assessments/[assessmentId]: Etkinlik sonrası test veya anket sorularını gösteren kartlar.
|   |-- /certificates: Kullanıcının sahip olduğu sertifikaları listeleyen kartlar.
|   |-- /dashboard: Rol bazlı dashboard'a yönlendirme yapar (/portal/dashboard/customer varsayılan).
|   |   |-- /admin, /customer, vb.: İlgili role özel dashboard bileşenini gösterir.
|   |-- /events: Kullanıcının katıldığı veya favorilediği etkinlikleri sekmeler (Tabs) altında listeleyen kartlar.
|   |   |-- /discover: Tüm etkinlikleri filtreleme ve arama seçenekleriyle birlikte gösterir.
|   |   |-- /[eventId]: Etkinlik detayları, bilet alma seçenekleri ve ilgili değerlendirmeleri gösterir.
|   |-- /kb: Bilgi bankası kategorileri, popüler ve son makaleleri listeleyen kartlar.
|   |   |-- /[articleSlug]: Makale içeriğini, yazar bilgilerini ve ilgili makaleleri gösterir.
|   |-- /login: Kullanıcı portalı için giriş formu.
|   |-- /profile: Kullanıcı profili ve şifre değiştirme formları.
|   |-- /support: Kullanıcının kendi destek taleplerini listeleyen bir tablo.
|   |   |-- /new: AI analizi içeren, iki adımlı yeni destek talebi oluşturma formu.
|   |   |-- /[ticketId]: Kullanıcının kendi destek talebinin detaylarını ve mesaj geçmişini gösterir.`}
                </CodeBlock>
            </DocSection>

            <DocSection title="Proje Teslim Dokümanı" icon={lucide_react_1.FileText}>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr><th className="p-2 border-b">Bölüm</th><th className="p-2 border-b">Açıklama</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 align-top font-semibold">1. Projeye Genel Bakış</td>
                                <td className="p-2">
                                    <p>This project is a Next.js web application consisting of three main layers:</p>
                                    <ul>
                                        <li><strong>Public Website:</strong> Accessible to all visitors, showcasing products, solutions, case studies, downloads, and educational resources.</li>
                                        <li><strong>Admin Panel:</strong> A role-based management interface that allows administrators to manage content, events, certificates, newsletters, users, and system settings.</li>
                                        <li><strong>User Portal:</strong> Personalized dashboards and tools for authenticated users, including events, certificates, knowledge base, and support.</li>
                                    </ul>
                                </td>
                            </tr>
                             <tr>
                                <td className="p-2 align-top font-semibold">2. Sistem Mimarisi</td>
                                <td className="p-2">
                                    <ul>
                                        <li>Yönlendirme için Next.js App Router kullanılır.</li>
                                        <li>Bileşenler <code>admin/</code>, <code>portal/</code>, <code>common/</code>, <code>layout/</code>, ve <code>ui/</code> klasörlerinde düzenlenmiştir.</li>
                                        <li>Veriler şu anda <code>lib/</code> altındaki statik <code>.ts</code> dosyalarından alınmaktadır ve gelecekte API entegrasyonu planlanmaktadır.</li>
                                        <li><strong>AI Desteği:</strong> <code>ai/flows/</code> klasörü, AI özelliklerini (ör. destek talebi analizi) entegre eder.</li>
                                        <li><strong>E-postalar:</strong> React Email şablonları, işlem ve pazarlama iletişimleri için <code>/emails</code> altında saklanır.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 align-top font-semibold">3. Genel Web Sitesi Detayları</td>
                                <td className="p-2">
                                     <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-muted/50">
                                                <tr><th className="p-2">Sayfa</th><th className="p-2">Amaç</th><th className="p-2">Özellikler</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td className="p-2">/ (Ana Sayfa)</td><td className="p-2">Markayı ve ürünleri tanıtır.</td><td className="p-2">Hero Carousel, ürün/çözüm karuselleri, parallax bölümleri, CTA'lar.</td></tr>
                                                <tr><td className="p-2">/case-studies</td><td className="p-2">Müşteri başarı hikayelerini sergiler.</td><td className="p-2">Filtrelenebilir başarı hikayesi listesi.</td></tr>
                                                <tr><td className="p-2">/contact</td><td className="p-2">İletişim kanalı sağlar.</td><td className="p-2">İletişim formu + şirket bilgileri.</td></tr>
                                                <tr><td className="p-2">/downloads</td><td className="p-2">Kaynaklar ve SSS sağlar.</td><td className="p-2">SSS için akordeon, kaynak listesi, müşteri erişim linkleri.</td></tr>
                                                <tr><td className="p-2">/education</td><td className="p-2">Öğrenim ve sertifikasyon merkezi.</td><td className="p-2">Navigasyon kartları.</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                              <tr>
                                <td className="p-2 align-top font-semibold">4. Yönetim Paneli Detayları</td>
                                <td className="p-2">
                                     <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-muted/50">
                                                <tr><th className="p-2">Sayfa</th><th className="p-2">Amaç</th><th className="p-2">Özellikler</th></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td className="p-2">/ (Dashboard)</td><td className="p-2">Üst düzey genel bakış.</td><td className="p-2">KPI kartları, hızlı erişim kısayolları, haftalık trend grafiği.</td></tr>
                                                <tr><td className="p-2">/certificates</td><td className="p-2">Sertifikaları yönet.</td><td className="p-2">İstatistik kartları, duruma göre sekmeli görünümler, sertifika tablosu.</td></tr>
                                                <tr><td className="p-2">/cms/pages</td><td className="p-2">CMS sayfalarını yönet.</td><td className="p-2">İstatistik kartları + sayfalar tablosu.</td></tr>
                                                <tr><td className="p-2">/events</td><td className="p-2">Etkinlikleri yönet.</td><td className="p-2">İstatistik kartları, filtrelenmiş sekmeler, etkinlik tablosu.</td></tr>
                                                 <tr><td className="p-2">/newsletter</td><td className="p-2">Bülten ve kampanyalar.</td><td className="p-2">İstatistik grafikleri, daraltılabilir bölümler.</td></tr>
                                                  <tr><td className="p-2">/social-media</td><td className="p-2">Sosyal gönderileri yönet.</td><td className="p-2">Takvim, son gönderiler tablosu, bağlı hesaplar.</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                             <tr>
                                <td className="p-2 align-top font-semibold">5. Kullanıcı Portalı Detayları</td>
                                <td className="p-2">
                                    <p>Kullanıcıların kendi verilerini (etkinlikler, sertifikalar, destek talepleri) yönetebildiği kişiselleştirilmiş alan.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocSection>
            
            <DocSection title="Admin Dashboard (/admin)" icon={lucide_react_1.LayoutDashboard}>
                <p>
                    Admin panelinin ana sayfası (<code>/admin</code>), tüm uygulama genelindeki temel performans göstergelerine (KPI) üst düzey bir genel bakış sunar. Bu panel, yöneticilere finansal durumu, kullanıcı büyümesini, pazarlama çabalarını ve operasyonel metrikleri hızlıca değerlendirme imkanı tanımak için tasarlanmıştır.
                </p>
                <p>Dashboard üç ana bölümden oluşur:</p>
                <ul>
                    <li>
                        <strong>KPI Kartları:</strong> Sayfanın üst kısmında, en kritik metrikleri gösteren bir kartlar grubu bulunur. Bunlar:
                        <ul>
                            <li><strong>Toplam Gelir:</strong> Finansal performansı gösterir.</li>
                            <li><strong>Yeni Kullanıcılar:</strong> Kullanıcı tabanındaki büyümeyi izler.</li>
                            <li><strong>AI İçerik Üretimi:</strong> AI modüllerinin ne kadar aktif kullanıldığını belirtir.</li>
                            <li><strong>Email Performansı:</strong> E-posta kampanyalarının ortalama açılma oranını gösterir.</li>
                            <li><strong>Sosyal Etkileşim:</strong> Sosyal medya faaliyetlerinin etkisini özetler.</li>
                            <li><strong>Açık Destek Talebi:</strong> Destek ekibinin mevcut yükünü gösterir.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Hızlı Erişim Kartları:</strong> "Yaklaşan Etkinlikler", "Email Kampanyaları" ve "Sosyal Medya" gibi önemli modüllere hızlı bir özet ve link sunan üçlü kart grubu.
                    </li>
                    <li>
                        <strong>Haftalık Trend Grafiği:</strong> Yeni kullanıcı sayısı, üretilen AI içeriği ve gelir gibi metriklerin haftalık değişimini gösteren bir çizgi grafiği.
                    </li>
                </ul>
            </DocSection>
            
             <DocSection title="Styling ve Tema Yönetimi" icon={lucide_react_1.Palette}>
                <p>
                    Uygulamanın genel görünümü TailwindCSS ve ShadCN'in tema altyapısı kullanılarak yönetilmektedir. Renkler ve diğer tasarım elemanları, CSS değişkenleri ile tanımlanmıştır.
                </p>
                <ul>
                    <li><strong>Tema Tanımlamaları:</strong> <code>src/app/globals.css</code> dosyasında <code>:root</code> ve <code>.dark</code> seçicileri altında HSL formatında renk değişkenleri tanımlanmıştır. Bu, açık ve koyu mod arasında kolay geçiş sağlar.</li>
                    <li><strong>Tailwind Entegrasyonu:</strong> <code>tailwind.config.ts</code> dosyası, bu CSS değişkenlerini Tailwind'in renk paletiyle (<code>primary</code>, <code>secondary</code>, <code>accent</code> vb.) eşleştirir.</li>
                    <li><strong>Kullanım:</strong> Bileşenlerde renk belirtirken doğrudan renk kodları (örn: <code>text-red-500</code>) yerine, tema renkleri (örn: <code>bg-primary</code>, <code>text-destructive</code>) kullanılmalıdır. Bu, tema değişikliklerinin tüm uygulamaya tutarlı bir şekilde yansımasını sağlar.</li>
                </ul>
            </DocSection>

            <DocSection title="Site Ayarları" icon={lucide_react_1.Settings}>
                <p>
                    <code>/admin/settings/site</code> sayfası, tüm site genelinde kullanılacak temel ve merkezi verileri yönetmek için tasarlanmıştır. Bu panel, projenin "tek doğru kaynak" (single source of truth) ilkesiyle yönetilmesini sağlar ve birden çok sekmeye ayrılmıştır.
                </p>
                <ul>
                    <li><strong>Merkezi Veri Kaynağı & Kaydetme:</strong> Ayarların varsayılan verileri <code>src/lib/site-settings-data.ts</code> dosyasında tutulur. Sayfadaki değişiklikler, <code>actions.ts</code> içindeki <code>saveSiteSettings</code> Server Action'ı kullanılarak doğrudan bu dosyaya yazılır. Bu, değişikliklerin tüm siteye kalıcı olarak yansımasını sağlar. Sitenin Header ve Footer gibi genel bileşenleri, verileri bu dosyadan okur.</li>
                    <li>
                        <strong>Company Sekmesi:</strong> Kurumsal kimlik, iletişim ve genel SEO ayarlarını içerir.
                    </li>
                     <li>
                        <strong>AI Sekmesi:</strong> AI modülleri için API anahtarı ve model tipi seçimini merkezi olarak yönetir.
                    </li>
                     <li>
                        <strong>Email Settings Sekmesi:</strong> E-posta gönderim servisi seçimi, API anahtarları ve şablon testi gibi özellikleri barındırır.
                    </li>
                     <li>
                        <strong>Social Media Sekmesi:</strong> Sosyal medya hesap linklerini, varsayılan platformu ve API anahtarlarını yönetir.
                    </li>
                      <li>
                        <strong>Analytics Sekmesi:</strong> Analitik servis entegrasyonları için takip kodları ve ayarları içerir.
                    </li>
                </ul>
            </DocSection>

            <DocSection title="Veri ve Durum Yönetimi (Simülasyon)" icon={lucide_react_1.Database}>
                <p>
                    Mevcut sürümde, bir backend ve veritabanı bağlantısı **simüle edilmektedir** (Site Ayarları hariç). Gerçek bir API geliştirilene kadar, çoğu veri <code>src/lib/</code> klasörü altındaki <code>.ts</code> dosyalarından statik olarak çekilmektedir.
                </p>
                <ul>
                    <li><code>src/lib/events-data.ts</code>: Etkinlikler ve katılımcı verileri.</li>
                    <li><code>src/lib/support-data.ts</code>: Destek talepleri ve kategorileri.</li>
                    <li><code>src/lib/certificate-data.ts</code>: Sertifika verileri.</li>
                    <li><code>src/lib/cms-data.ts</code>: CMS sayfaları.</li>
                    <li><code>src/lib/social-media-data.ts</code>: Sosyal medya gönderileri.</li>
                    <li><code>src/lib/menu-data.ts</code>: Navigasyon menüleri.</li>
                    <li><code>src/lib/roles-data.ts</code>: Kullanıcı rolleri ve izinleri.</li>
                    <li><code>src/lib/newsletter-data.ts</code>: E-posta aboneleri, kampanyalar, gruplar ve segmentler.</li>
                </ul>
                <p>
                    Gelecekteki bir backend geliştiricisi, bu dosyalardaki veri yapılarını (<code>src/lib/types.ts</code> içinde tanımlanmıştır) referans alarak veritabanı şemalarını ve API endpoint'lerini oluşturabilir.
                </p>
            </DocSection>
            
            <DocSection title="Sertifika Yönetimi" icon={lucide_react_1.Award}>
                <p>
                    Uygulama, eğitimler veya etkinlikler sonucunda katılımcılara verilen sertifikaları yönetmek için kapsamlı bir modül içerir.
                </p>
                <ul>
                    <li><strong>Admin Paneli (`/admin/certificates`):</strong> Yöneticilerin tüm sertifikaları listelediği, aradığı, filtrelediği ve yönettiği ana merkezdir.</li>
                    <li><strong>Oluşturma ve Düzenleme:</strong> Manuel veya toplu sertifika oluşturma ve mevcut sertifikaları düzenleme işlevleri.</li>
                    <li><strong>Herkese Açık Doğrulama (`/education/certification`):</strong> Son kullanıcıların bir sertifika numarasını girerek sertifikanın geçerliliğini kontrol edebildiği public bir sayfadır.</li>
                </ul>
            </DocSection>
            
            <DocSection title="Sertifika Üretimi: Yapısal Yaklaşım ve Araçlar" icon={lucide_react_1.Award}>
                <h4>1. Yapısal Yaklaşım</h4>
                <h5>a) Veriler</h5>
                <p>
                    Sertifika üretimi için ihtiyacınız olan tipik bilgiler şunlardır: kullanıcı adı/katılımcı adı, etkinlik veya kurs adı, sertifika tarihi, sertifika ID/doğrulama kodu, imza veya logo. Bunları bir JSON olarak saklayabilir ve tek bir "sertifika objesi" olarak yönetebilirsiniz.
                </p>
                <CodeBlock>
        {`{
  "name": "John Doe",
  "event": "React Masterclass",
  "date": "2025-09-22",
  "certificateId": "CERT123456"
}`}
                </CodeBlock>
                
                <h5>b) PDF Oluşturma</h5>
                <h6>Frontend Yöntemleri (React)</h6>
                <p><strong>react-pdf:</strong> PDF’yi tamamen React komponentleri ile oluşturabilirsiniz. Tasarım tamamen esnektir.</p>
                <CodeBlock>
        {`import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 20, textAlign: 'center' },
});

const Certificate = ({ name, event }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Certificate of Completion</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={{ textAlign: 'center' }}>has completed {event}</Text>
    </Page>
  </Document>
);`}
                </CodeBlock>
                 <p><strong>Avantaj:</strong> Tamamen frontend odaklı, PDF’i kullanıcıya direkt indirtebilirsiniz.</p>
                 <p><strong>html2canvas + jsPDF:</strong> React bileşeni olarak tasarladığınız sertifika HTML’ini canvas’a çevirip PDF oluşturabilirsiniz.</p>
                 <p><strong>Avantaj:</strong> Tasarım tamamen CSS ile yapılabilir.</p>
                 <p><strong>Dezavantaj:</strong> Büyük resimlerde kalite kaybı olabilir.</p>

                <h6>Backend Yöntemleri</h6>
                <p>Node.js üzerinde <code>PDFKit</code> veya <code>Puppeteer</code> ile HTML'den PDF dönüşümü yapabilirsiniz.</p>
                <p><strong>Avantaj:</strong> Sertifikaları toplu üretip e-posta ile göndermek kolaydır. Backend çözümü ile logolara, imzalara ve özel fontlara daha rahat erişebilirsiniz.</p>

                <h5>c) Tasarım / Şık PDF</h5>
                <p><code>react-pdf</code> ile modern ve şık tasarımlar yapılabilir. Sertifikada bulunması gereken tipik öğeler:</p>
                <ul>
                    <li>Başlık: “Certificate of Completion”</li>
                    <li>Kullanıcı adı (büyük fontta)</li>
                    <li>Etkinlik / kurs adı (italik veya farklı fontta)</li>
                    <li>Tarih ve sertifika ID</li>
                    <li>Kurum logosu ve imza</li>
                </ul>
                <p><strong>Örnek tasarım ipuçları:</strong> Arka plana watermark veya gradient, kenarlıklar/çerçeve, font ağırlıkları ve renklerle hiyerarşi.</p>

                <h4>2. Süreç / Workflow</h4>
                <ol>
                    <li>Kullanıcı etkinliği tamamlar &rarr; event completion kaydı backend’e düşer.</li>
                    <li>Sertifika verisi hazırlanır (JSON).</li>
                    <li>Sertifika şablonu (PDF component) bu veri ile doldurulur.</li>
                    <li>PDF oluşturulur &rarr; kullanıcıya indirilir veya e-posta ile gönderilir.</li>
                    <li>(Opsiyonel) PDF’in doğrulanabilir olması için sertifika ID veya QR kod eklenebilir.</li>
                </ol>

                <h4>3. Önerilen Araçlar / Kütüphaneler</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Amaç</th>
                            <th>Araç / Kütüphane</th>
                            <th>Frontend / Backend</th>
                            <th>Notlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PDF oluşturma</td>
                            <td>react-pdf</td>
                            <td>Frontend</td>
                            <td>Component tabanlı, tasarım esnek.</td>
                        </tr>
                        <tr>
                            <td>HTML → PDF</td>
                            <td>jsPDF + html2canvas</td>
                            <td>Frontend</td>
                            <td>Mevcut HTML tasarımını PDF’e çevirir.</td>
                        </tr>
                        <tr>
                            <td>PDF üretimi</td>
                            <td>PDFKit</td>
                            <td>Backend (Node.js)</td>
                            <td>Daha programatik ve toplu üretim.</td>
                        </tr>
                        <tr>
                            <td>HTML → PDF (resim)</td>
                            <td>Puppeteer</td>
                            <td>Backend</td>
                            <td>Browser tabanlı render, tasarım çok esnek.</td>
                        </tr>
                    </tbody>
                </table>
                
                <h4>💡 İpucu</h4>
                <p>Frontend’de kullanıcıya anlık indirilebilir PDF vermek için <code>react-pdf</code> veya <code>jsPDF</code> en pratik yöntemdir.</p>
                <p>Eğer toplu sertifika üretimi veya otomatik e-posta gönderimi düşünüyorsanız, backend’de <code>Puppeteer</code> veya <code>PDFKit</code> ile üretmek daha güvenli ve ölçeklenebilirdir.</p>
            </DocSection>

            <DocSection title="AI Entegrasyonu (Genkit)" icon={lucide_react_1.Bot}>
                <p>
                    Yapay zeka özellikleri, Google'ın <strong>Genkit</strong> kütüphanesi kullanılarak geliştirilmiştir. Tüm AI mantığı <code>src/ai/</code> klasöründe yer alır.
                </p>
                <ul>
                    <li><strong>Konfigürasyon:</strong> <code>src/ai/genkit.ts</code> dosyasında temel Genkit konfigürasyonu ve kullanılacak model tanımlanmıştır.</li>
                    <li><strong>AI Akışları (Flows):</strong> <code>src/ai/flows/</code> altında, belirli görevleri yerine getiren AI "akışları" bulunur. Örnek: <code>support-ticket-analysis.ts</code>.</li>
                    <li><strong>Kullanım:</strong> Bu akışlar, "Server Action" olarak tasarlanmış ve ilgili sayfalardan (örn: <code>src/app/portal/support/new/actions.ts</code>) çağrılmaktadır.</li>
                </ul>
            </DocSection>
            
            <DocSection title="Email Marketing Modülü" icon={lucide_react_1.Mail}>
                <CodeBlock>
        {`Email Marketing Module — Developer Documentation

Overview

Modülün amacı: Kampanya yönetimi, abonelik sistemi, segmentasyon ve şablon bazlı e-posta gönderimleri.

Kullanıcı rollerine göre izinler (örn. Marketing Team → tam erişim, Viewer → salt okunur).

Data Model

Subscribers Table: ID, email, status (active, bounced, unsubscribed), import batch ID.

Groups Table: GroupId, Name, Subscribers[].

Segments Table: SegmentId, Filter rules (JSON), Subscribers[].

Campaigns Table: CampaignId, Subject, Body, TemplateId, Stats (open, click, bounce).

Templates Table: TemplateId, Content (React Email / MJML), Metadata.

API Endpoints (örnek)

POST /api/newsletter/subscribers/import → CSV upload & validation

GET /api/newsletter/subscribers → Pagination + filters

POST /api/newsletter/campaigns → Yeni kampanya oluştur

POST /api/newsletter/campaigns/:id/send → Gönderimi başlat

GET /api/newsletter/stats/:id → Açılma / tıklanma oranları

Import & Validation Flow

CSV upload

Email validation (regex + third-party API check)

Duplicate kontrolü

Soft/hard bounce management

Template System

Kullanılan teknoloji (React Email )

Preview mekanizması (/templates/[templateId]/preview)

Kod editörü (/templates/[templateId]/edit)

Campaign Workflow

Taslak oluşturma

Test mail gönderme

Segment / group seçme

Planlama (scheduled send)

Gönderim (bulk processing, queue management)

Raporlama (open rate, click rate, bounce, unsubscribe tracking)

Third-Party Integrations

SMTP provider / Resend / AWS SES entegrasyonu

Webhook’lar (örn. unsubscribe, bounce events)

Error Handling & Logging

Failed imports

SMTP errors

Invalid templates

Log tablosu ile entegrasyon (/logs)

Security & Compliance

GDPR / KVKK için unsubscribe linkleri zorunlu

Double opt-in mekanizması

Rate-limiting ve abuse prevention`}
                </CodeBlock>
            </DocSection>
            
            <DocSection title="Sosyal Medya Modülü" icon={lucide_react_1.Share2}>
                <CodeBlock>
        {`Sosyal Medya Modülü İçin Önerilen Yapı
|-- /social-media
|   |-- /dashboard
|   |   |-- Calendar (içerik takvimi)
|   |   |-- Recent posts (tablo)
|   |   |-- Connected accounts (list)
|
|   |-- /composer
|   |   |-- Step 1: AI prompt (topic, tone, platform)
|   |   |-- Step 2: Content editor (multi-platform preview: Twitter, LinkedIn, Instagram)
|   |   |-- Step 3: Media upload (image/video)
|   |   |-- Step 4: Scheduling options (immediate, scheduled, recurring)
|   |   |-- Step 5: Approval flow (review → publish)
|
|   |-- /accounts
|   |   |-- LinkedIn / Twitter / Instagram OAuth bağlantıları
|   |   |-- Bağlantı durumları, token yenileme
|
|   |-- /analytics
|   |   |-- Post performance (impressions, clicks, engagement)
|   |   |-- Account-level stats (follower growth, reach)
|   |   |-- Export reports (PDF/CSV)
|
|   |-- /library
|   |   |-- Asset manager (images, videos, templates)
|   |   |-- Saved captions & hashtags
|
|   |-- /settings
|       |-- Publishing rules (posting times, limits)
|       |-- Approval workflows (multi-user team collaboration)

🔑 Kritik Özellikler

İçerik Takvimi (Calendar)

Post’ları sürükle-bırak ile yeniden planlama

Platforma göre filtreleme (LinkedIn, Instagram vs.)

Composer (AI destekli içerik üretim)

Platforma göre karakter sınırlarını gözetmeli

AI önerisi + manuel düzenleme

Görsel/video ekleme

Multi-platform preview

Bağlı Hesaplar (Accounts)

OAuth ile sosyal medya API bağlantıları

Token yönetimi ve yenileme

Hangi kullanıcının hangi hesaplara erişim izni olduğu

Analitik (Analytics)

Post bazlı: tıklama, etkileşim, erişim

Hesap bazlı: takipçi artışı, aylık özetler

Export seçenekleri

Kütüphane (Library)

Görsel/video depolama

Hazır şablonlar

Hashtag grupları

Ayarlar (Settings)

Otomatik paylaşım kuralları (ör. “Pazar günü paylaşım yok”)

Onay süreçleri (ör. Marketing Team yazıyor, Admin onaylıyor)`}
                </CodeBlock>
            </DocSection>
            <DocSection title="Support Module" icon={lucide_react_1.LifeBuoy}>
                <CodeBlock>
        {`    |-- /support
|   |-- /dashboard
|   |   |-- KPI cards (open tickets, resolved today, avg. response time)
|   |   |-- Recent activity feed
|
|   |-- /tickets
|   |   |-- List view (filter by status, priority, category, assigned agent)
|   |   |-- Kanban board (optional: status-based columns)
|   |   |-- /new (ticket creation form)
|   |   |-- /[ticketId]
|   |       |-- 3-column layout:
|   |           |-- Column 1: Ticket details (status, priority, SLA, tags)
|   |           |-- Column 2: Conversation history (chat/messages, attachments)
|   |           |-- Column 3: Agent tools (assign, escalate, merge, close)
|
|   |-- /categories
|   |   |-- Hierarchical list (category → subcategory)
|   |   |-- Category-level stats (tickets per category)
|
|   |-- /sla
|   |   |-- SLA rules (response time, resolution time)
|   |   |-- SLA performance reports
|
|   |-- /canned-responses
|   |   |-- Library of reusable reply templates
|   |   |-- AI-suggested responses (future integration)
|
|   |-- /faq
|   |   |-- Knowledge base articles (linked to tickets)
|   |   |-- /[articleId]: Article editor (with SEO + categories)
|
|   |-- /analytics
|   |   |-- Charts: average resolution time, satisfaction scores
|   |   |-- Agent performance leaderboard
|   |   |-- Export reports (CSV, PDF)
|
|   |-- /settings
|       |-- Ticket workflows (status flow: new → in progress → resolved → closed)
|       |-- Notification rules (email, in-app, Slack, etc.)
|       |-- Permissions (which roles can manage tickets, categories, SLA, etc.)
📑 Developer Docs İçin Eklenmesi Gereken Başlıklar
Overview

Support module amacı

Admin paneldeki genel yapı (dashboard + tickets + analytics)

Portal kullanıcılarının göreceği kısımlar (kendi talepleri, yeni talep açma, geçmişi görme)

Tickets

Ticket CRUD (create, read, update, delete) akışı

Ticket status & priority alanları

Assign/Escalate/Merge gibi aksiyonlar

Conversation history + attachments

Categories

Hierarchical kategori yapısı

Kategorilerin ticket formlarıyla ilişkisi

SLA Management

SLA kural tanımlama (örn. “Yüksek öncelik → 2 saat içinde yanıt”)

SLA ihlali uyarıları

Canned Responses

Hazır yanıt şablonları

AI destekli öneriler (future scope)

Knowledge Base Integration

FAQ / KB makaleleri ticket formuna bağlama

Self-service destek senaryosu

Analytics & Reporting

KPI kartları, agent performansı, müşteri memnuniyeti

Rapor export seçenekleri

Settings & Workflows

Ticket durum akışı (workflow customization)

Notification ayarları

Rol bazlı izinler`}
                </CodeBlock>
            </DocSection>

            <DocSection title="Event Module" icon={lucide_react_1.Calendar}>
                <CodeBlock>
        {`Event Module
1. Overview

Event module, etkinliklerin oluşturulması, yönetilmesi, katılımcıların takibi ve sosyal medya entegrasyonu için kullanılır.

Admin paneli: Etkinlik oluşturma, düzenleme, istatistik izleme.

Portal kullanıcıları: Etkinlikleri keşfetme, kayıt olma, bilet alma (gelecek aşama).

2. Pages & Structure
/events
   - Dashboard view: 
       • KPI cards (total events, upcoming, past, drafts)  
       • Tabs: All | Upcoming | Past | Drafts  
       • Event table (sortable, filterable)  

   /new
       • EventForm: title, description, date/time, location, category, tags, speakers, media (images, video links)  

   /[eventId]
       • Tabs:  
           - Details: event info form  
           - Participants: list of registered users (table with filters)  
           - Social Media: scheduled posts, AI composer (future scope)  
           - Settings: visibility, status (draft/published), capacity, ticketing options (future scope)  

3. Components

EventCard: Used in lists, displays title, date, location, status.

EventTable: Paginated table with sorting/filtering for events.

EventForm: Create/update form with validation.

StatsCards: Small KPI cards for counts.

Tabs: Switch between event categories (All, Upcoming, Past, Drafts).

ParticipantTable: Lists registered users with columns (Name, Email, Status, Ticket Type).

SocialMediaComposer (future): AI-powered multi-step post creation.

4. Role-Based Access

Admin: Full CRUD (create, edit, delete, publish).

Editor/Marketing team: Edit event details, manage social media.

Support team: Manage participants, resolve ticketing issues.

Viewer/Customer: Read-only (via portal module).

5. UI/Visual Elements

KPI Cards (Upcoming events count, Registered participants, etc.).

Graphs (future): Trend of registrations per event.

Tables: Events list, Participants list.

Tabs: Event status categories, sub-sections in Event detail.

6. Interactive Elements

Buttons: Create event, publish/unpublish, export participants.

Forms: EventForm, filters in tables.

Toggles: Event visibility (draft vs published).

Dropdowns: Sort/filter options (date, category, status).

7. Data Sources

lib/events-data.ts → mock/simulated data for now.

API (future) → CRUD for events + participants.

site-settings-data.ts → global configs (timezone, event categories).

8. Future Extensions

Ticketing system (payment integration).

Event reminders (email/SMS notifications).

Social media auto-posting.

Analytics dashboard (conversion rates, attendance vs registration).
`}
                </CodeBlock>
            </DocSection>
            
            <DocSection title="CMS Module" icon={lucide_react_1.FileText}>
                <CodeBlock>
        {`CMS Module
1. Overview

CMS (Content Management System) modülü, web sitesindeki sayfaların ve menülerin yönetilmesini sağlar.

Admin paneli: Sayfa ve menü oluşturma, düzenleme, istatistik takibi.

Editor: İçerik ekleme/düzenleme.

Viewer: Salt okunur, erişim izni verildiği durumlarda içerik inceleme.

2. Pages & Structure
/cms
   /menus
       • Menüler için yönetim paneli
       • Drag-and-drop arayüz ile menü öğelerini sıralama
       • Menü öğesi ekleme, silme, düzenleme

   /pages
       • Dashboard view: 
           - Sayfa istatistik kartları (toplam sayfa, yayınlanan, en çok ziyaret edilen, son düzenlenen)
           - Sayfaları listeleyen tablo (Table)
       /new
           • PageForm: başlık, içerik, SEO meta bilgileri, URL, kategori
       /[pageId]
           • Tabs:
               - Content: Sayfa içeriği editörü (WYSIWYG/Markdown)
               - SEO: Meta başlık, açıklama, anahtar kelimeler
               - Social Media: Paylaşım önizlemesi ve paylaşım ayarları

3. Components

PageTable: Sayfa listesi tablosu, filtreleme ve sıralama özellikleri.

PageForm: Yeni veya mevcut sayfa oluşturma/düzenleme formu.

MenuTabs: Menü yönetim sekmeleri.

DragAndDropMenuList: Menü öğelerini sürükle-bırak ile düzenleme.

StatsCards: Sayfa istatistiklerini görselleştiren kartlar.

4. Role-Based Access

Admin: Tam CRUD (create, read, update, delete) ve menü yönetimi.

Editor: Sayfa ve içerik düzenleme, menüde sınırlı değişiklik.

Viewer: Salt okunur, istatistikleri görüntüleme.

5. UI/Visual Elements

KPI Cards: Toplam sayfa, yayınlanan, en çok ziyaret edilen, son düzenlenen.

Tables: Sayfa listesi, filtrelenebilir ve sıralanabilir.

Tabs: Sayfa düzenleme sırasında içerik, SEO, sosyal medya sekmeleri.

6. Interactive Elements

Buttons: Yeni sayfa oluştur, kaydet, menü öğesi ekle/sil/düzenle.

Forms: PageForm (başlık, içerik, SEO bilgileri).

Drag-and-drop: Menü sıralama ve yönetimi.

Search/Filter: Tablo satırlarını arama ve filtreleme.

7. Data Sources

lib/cms-data.ts → Sayfa ve menü mock verileri.

site-settings-data.ts → Global site ayarları (tema, URL yapısı).

API (future) → Sayfa CRUD işlemleri, menü yönetimi, içerik önbellekleme.

8. Future Extensions

Versiyon kontrolü ve geçmiş değişikliklerin görüntülenmesi.

Çoklu dil desteği (i18n).

Gelişmiş içerik blokları (Video, Form, Carousel).

Workflow ve onay mekanizması (Editor → Admin approve).
Category Management 

Purpose:

Web sitesi sayfalarını ve içeriklerini kategori bazında organize etmek.

Filtreleme, arama ve içerik ilişkilendirme için kullanılır.

Structure:

/cms/categories
    • List view: Tüm kategorileri gösteren tablo (CategoryTable)
    • /new: Yeni kategori oluşturma formu (CategoryForm)
    • /[categoryId]: Mevcut kategoriyi düzenleme formu (CategoryForm)


Components:

CategoryTable: Kategorileri listeleyen ve filtreleyen tablo.

CategoryForm: Kategori adı, açıklama, üst kategori seçimi gibi alanları içeren form.

Role-Based Access:

Admin: Tam CRUD yetkisi.

Editor: Salt okunur veya sınırlı ekleme/düzenleme.

Viewer: Görüntüleme yetkisi yok veya salt okunur.

UI/Visual Elements:

KPI Cards (opsiyonel): Toplam kategori, aktif/pasif kategoriler.

Table: Kategori listesi, alt kategori hiyerarşisi gösterimi.

Interactive Elements:

Buttons: Yeni kategori oluştur, kaydet, sil.

Drag-and-drop (opsiyonel): Alt kategorileri sıralama veya taşımak için.

Search/Filter: Kategorilerde arama ve filtreleme.

Data Sources:

lib/cms-data.ts → Kategori mock verileri.

API (future) → Kategori CRUD işlemleri.
`}
                </CodeBlock>
            </DocSection>

            <DocSection title="Özet" icon={lucide_react_1.Layers}>
                <CodeBlock>
                    {`# Project Developer Documentation - Full Version

This document provides detailed information for developers on all modules, pages, components, UI elements, interactive actions, role-based access, and data sources.

---

## 1. CMS Module

### 1.1 Menus Management
**Path:** \`/cms/menus\`  
**Purpose:** Manage website navigation menus using tabs and drag-and-drop interface.  

| Component         | Description                                    | Data Source       | Role Access           |
|------------------|-----------------------------------------------|-----------------|--------------------|
| \`MenuTabs\`        | Tabbed menu categories                         | \`lib/cms-data.ts\` | Admin/Editor        |
| \`DraggableMenuList\` | Drag-and-drop menu ordering                    | \`lib/cms-data.ts\` | Admin               |

**Interactive Elements:**  
- Add/Edit/Delete buttons  
- Drag-and-drop reordering  

**UI Notes:** Display menu hierarchy visually with icons. Support inline editing.

---

### 1.2 Pages Management
**Path:** \`/cms/pages\`  
**Subpaths:** \`/new\`, \`/[pageId]\`  
**Purpose:** Create, edit, and manage site pages with SEO and social media settings.  

| Component         | Description                                    | Data Source       | Role Access           |
|------------------|-----------------------------------------------|-----------------|--------------------|
| \`PageStatsCards\`  | Show page metrics: total, published, most visited | \`lib/cms-data.ts\` | Admin/Editor        |
| \`PageTable\`       | List of pages with status, URL, last updated  | \`lib/cms-data.ts\` | Admin/Editor        |
| \`PageForm\`        | Form for creating/editing pages                | \`lib/cms-data.ts\` | Admin/Editor        |

**Interactive Elements:**  
- Tabs for Content / SEO / Social Media  
- Input fields, Textareas, Rich text editor  
- Save/Publish/Delete buttons  

**UI Notes:** Use tabs for different page sections. Highlight unsaved changes.

---

### 1.3 Categories Management
**Path:** \`/cms/categories\`  
**Subpaths:** \`/new\`, \`/[categoryId]\`  
**Purpose:** Organize pages into hierarchical categories.  

| Component       | Description                         | Data Source       | Role Access |
|----------------|------------------------------------|-----------------|-------------|
| \`CategoryTable\` | Hierarchical table of categories   | \`lib/cms-data.ts\` | Admin/Editor |
| \`CategoryForm\`  | Create/Edit category details       | \`lib/cms-data.ts\` | Admin/Editor |

**Interactive Elements:**  
- Buttons: New/Edit/Delete  
- Optional drag-and-drop hierarchy  
- Filters & Search  

**UI Notes:** Show category depth visually; allow inline name edits.

---

## 2. Email Marketing Module

### 2.1 Subscribers Management
**Path:** \`/newsletter/subscribers\`  

| Component                | Description                         | Data Source       | Role Access |
|--------------------------|------------------------------------|-----------------|-------------|
| \`SubscriberTable\`         | Lists all subscribers with status  | \`lib/newsletter-data.ts\` | Admin/Marketing |
| \`ImportSubscribersWizard\` | Multi-step CSV import wizard       | \`lib/newsletter-data.ts\` | Admin/Marketing |

**Interactive Elements:**  
- Add Subscriber  
- Import CSV  
- Filters/Search  

**UI Notes:** Show import progress and validation errors clearly.

---

### 2.2 Campaigns Management
**Path:** \`/newsletter/campaigns\`  
**Subpaths:** \`/new\`, \`/[campaignId]\`  

| Component            | Description                         | Data Source       | Role Access |
|---------------------|------------------------------------|-----------------|-------------|
| \`CampaignForm\`       | Create/Edit campaigns               | \`lib/newsletter-data.ts\` | Admin/Marketing |
| \`CampaignStatsCharts\`| Open and click rates                | \`lib/newsletter-data.ts\` | Admin/Marketing |
| \`CampaignPreview\`    | Live preview of email template      | \`lib/newsletter-data.ts\` | Admin/Marketing |

**UI Notes:** Collapsible sections for content, audience, and scheduling.

---

### 2.3 Groups & Segments Management
**Path:** \`/newsletter/groups\`, \`/newsletter/segments\`  

| Component       | Description                       | Data Source       | Role Access |
|----------------|----------------------------------|-----------------|-------------|
| \`GroupTable\`    | List of groups & subscriber counts | \`lib/newsletter-data.ts\` | Admin/Marketing |
| \`SegmentTable\`  | List of segments                  | \`lib/newsletter-data.ts\` | Admin/Marketing |

**UI Notes:** Include search, sort, and filters for large datasets.

---

### 2.4 Templates Management
**Path:** \`/newsletter/templates\`  
**Subpaths:** \`/[templateId]/edit\`, \`/[templateId]/preview\`  

| Component       | Description                         | Data Source       | Role Access |
|----------------|------------------------------------|-----------------|-------------|
| \`TemplateEditor\` | Code editor for email template      | \`lib/newsletter-data.ts\` | Admin/Marketing |
| \`TemplatePreview\`| Live render with React Email       | \`lib/newsletter-data.ts\` | Admin/Marketing |

---

## 3. Event Module

**Path:** \`/events\`  
**Subpaths:** \`/new\`, \`/[eventId]\`  

| Component       | Description                         | Data Source       | Role Access |
|----------------|------------------------------------|-----------------|-------------|
| \`EventTable\`    | Lists events with status           | \`lib/events-data.ts\` | Admin/Editor/Viewer |
| \`EventForm\`     | Create/Edit event                  | \`lib/events-data.ts\` | Admin/Editor |

**UI Notes:**  
- Tabs for All/Upcoming/Past/Draft events  
- Progress bars for ticket sales  
- Event detail page: attendees, social media share, editing tabs

---

## 4. Support Module

**Path:** \`/support\`  
**Subpaths:** \`/new\`, \`/categories\`, \`/[ticketId]\`  

| Component      | Description                         | Data Source       | Role Access |
|---------------|------------------------------------|-----------------|-------------|
| \`TicketTable\`  | List all tickets                   | \`lib/support-data.ts\` | Admin/Support |
| \`TicketForm\`   | Create/Edit ticket                  | \`lib/support-data.ts\` | Admin/Support |
| \`CategoryTable\`| Hierarchical categories             | \`lib/support-data.ts\` | Admin/Support |
| \`CategoryForm\` | Edit category                       | \`lib/support-data.ts\` | Admin/Support |

**UI Notes:**  
- Ticket page: 3-column layout (details, messages, management)  
- Support form: 2-step with AI suggestions  
- Filters, Search, Priorities clearly visualized  

---

## 5. Certificates Module

**Path:** \`/certificates\`  
**Subpaths:** \`/new\`, \`/[certificateId]\`  

| Component        | Description                         | Data Source       | Role Access |
|-----------------|------------------------------------|-----------------|-------------|
| \`CertificateTable\` | Lists certificates with status     | \`lib/certificate-data.ts\` | Admin/Editor |
| \`CertificateForm\`  | Create/Edit certificate            | \`lib/certificate-data.ts\` | Admin/Editor |

**UI Notes:** Tabs for statuses (All, Pending, Generated, Revoked), bulk import.

---

## 6. Social Media Module

**Path:** \`/social-media\`  
**Subpaths:** \`/composer\`  

| Component           | Description                         | Data Source       | Role Access |
|-------------------|------------------------------------|-----------------|-------------|
| \`ContentCalendar\`   | Monthly/Weekly/Daily post calendar  | \`lib/social-media-data.ts\` | Admin/Marketing |
| \`RecentPostsTable\`  | List of recent posts with status    | \`lib/social-media-data.ts\` | Admin/Marketing |
| \`SocialComposer\`    | AI-assisted multi-step post creation | \`lib/social-media-data.ts\` | Admin/Marketing |

**UI Notes:**  
- Multi-step post creation with AI suggestions  
- Calendar drag-and-drop to reschedule  
- Account filter for multiple social profiles

---

## 7. Recommended Developer Practices

- Enforce role-based access in all modules.  
- Use tables with pagination, search, and sorting.  
- Highlight unsaved changes in forms.  
- Persist drag-and-drop reordering through API.  
- Follow a modular component structure.  
- Prepare for future backend API integration.

---

## 8. Future Enhancements / Planned Features

These are the planned improvements and AI-assisted features for the project modules:

- **AI-Assisted Content Generation:**  
  - Pages: Auto-generate page content based on templates or user input.  
  - Emails: Smart campaign content suggestions using AI.  
  - Social Posts: Multi-step AI suggestions for social media posts.

- **Bulk Import/Export:**  
  - Pages, Categories, Subscribers, Tickets: CSV/JSON import and export workflows for easier management.  

- **Revision History / Audit Trails:**  
  - Track all CRUD operations for Pages, Categories, Subscribers, Tickets, Events, and other entities.  
  - Ability to restore previous versions.

- **Advanced Analytics Dashboards:**  
  - Provide insights across all modules: Campaigns, Subscribers, Pages, Events, Tickets.  
  - Include interactive charts, filters, and trend visualizations.

- **Optional:** Future integration with external AI/content APIs, automated reporting, and enhanced role-based permissions for analytics.`}
                </CodeBlock>
            </DocSection>

        </div>);
}
//# sourceMappingURL=page.js.map