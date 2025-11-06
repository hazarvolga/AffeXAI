-- Insert 3 Additional CMS Page Templates
-- Product, Solutions, Event

-- Template 6: Software Product Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Software Product Page',
  'Yazılım ürün tanıtım sayfası - özellikler, fiyatlandırma ve demo',
  'Product',
  true,
  true,
  0,
  '{"colors": {"primary": "#3b82f6", "secondary": "#8b5cf6", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/product-logo.svg","menuItems":[{"label":"Özellikler","url":"#features"},{"label":"Fiyatlandırma","url":"#pricing"},{"label":"Müşteriler","url":"#customers"},{"label":"Destek","url":"/support"}],"ctaButton":{"label":"Ücretsiz Dene","url":"/trial"}}},{"id":"hero","type":"hero-split-image-right","props":{"title":"İş Süreçlerinizi Dijitalleştirin","subtitle":"Allplan - Modern İnşaat Yönetim Yazılımı","description":"BIM destekli mimari tasarım ve proje yönetimi çözümü","primaryButtonText":"Demo Talep Et","primaryButtonUrl":"/demo","secondaryButtonText":"Özellikleri Keşfet","secondaryButtonUrl":"#features","imageUrl":"/product-hero.jpg"}},{"id":"features","type":"features-icon-grid-three","props":{"sectionTitle":"Güçlü Özellikler","sectionDescription":"İhtiyacınız olan her şey tek platformda","features":[{"icon":"layers","title":"BIM Entegrasyonu","description":"3D modelleme ve Building Information Modeling desteği"},{"icon":"users","title":"Ekip İşbirliği","description":"Gerçek zamanlı çoklu kullanıcı desteği"},{"icon":"cloud","title":"Bulut Tabanlı","description":"Her yerden erişim, otomatik yedekleme"}]}},{"id":"pricing","type":"pricing-table-three-column","props":{"sectionTitle":"Fiyatlandırma Planları","sectionDescription":"İhtiyacınıza uygun planı seçin","plans":[{"name":"Starter","price":"₺2.999/ay","description":"Küçük ekipler için","features":["5 Kullanıcı","50GB Depolama"],"buttonText":"Başla","buttonUrl":"/trial?plan=starter"},{"name":"Professional","price":"₺7.999/ay","highlighted":true}]}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Allplan Solutions"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["product", "software", "saas", "bim"], "difficulty": "intermediate", "estimatedSetupTime": "12 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 7: Business Solutions
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Business Solutions',
  'Sektörel çözümler ve iş uygulamaları tanıtım sayfası',
  'Solutions',
  true,
  true,
  0,
  '{"colors": {"primary": "#0891b2", "secondary": "#06b6d4", "background": "#ffffff", "text": "#0f172a"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/solutions-logo.svg","menuItems":[{"label":"Çözümler","url":"#solutions"},{"label":"Sektörler","url":"#industries"},{"label":"Başarı Hikayeleri","url":"#success"}],"ctaButton":{"label":"Teklif Al","url":"/quote"}}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Her Sektör İçin Özel Çözümler","subtitle":"İşinize Özel Dijital Dönüşüm","description":"İnşaat, enerji, sanayi ve daha fazlası için entegre çözümler","primaryButtonText":"Çözümleri Keşfet","primaryButtonUrl":"#solutions","backgroundImage":"/solutions-hero-bg.jpg"}},{"id":"solutions","type":"features-services-two-column","props":{"sectionTitle":"Çözüm Portföyümüz","sectionDescription":"Sektör odaklı dijital çözümler","services":[{"icon":"building","title":"İnşaat & Altyapı","description":"BIM, proje yönetimi, saha takibi"},{"icon":"zap","title":"Enerji & Utilities","description":"Enerji yönetimi, izleme, raporlama"}]}},{"id":"industries","type":"stats-four-column","props":{"sectionTitle":"Rakamlarla Biz","stats":[{"value":"15+","label":"Sektör"},{"value":"500+","label":"Müşteri"}]}},{"id":"footer","type":"footer-multi-column","props":{"companyName":"Affexai Solutions"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["solutions", "industry", "enterprise", "b2b"], "difficulty": "intermediate", "estimatedSetupTime": "15 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 8: Event & Training
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Event & Training',
  'Etkinlik, eğitim ve webinar tanıtım sayfası',
  'Event',
  true,
  true,
  0,
  '{"colors": {"primary": "#f59e0b", "secondary": "#ef4444", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/event-logo.svg","menuItems":[{"label":"Etkinlikler","url":"#events"},{"label":"Eğitimler","url":"#trainings"},{"label":"Konuşmacılar","url":"#speakers"},{"label":"Kayıt","url":"#register"}],"ctaButton":{"label":"Hemen Kayıt Ol","url":"#register"}}},{"id":"hero","type":"hero-gradient-floating-cta","props":{"title":"Allplan Türkiye Zirvesi 2025","subtitle":"15-16 Mart 2025 • İstanbul Kongre Merkezi","description":"İnşaat teknolojilerinin geleceği, BIM uygulamaları ve dijital dönüşüm","primaryButtonText":"Erken Kayıt İndirimi","primaryButtonUrl":"#register","secondaryButtonText":"Program İçeriği","secondaryButtonUrl":"#schedule"}},{"id":"highlights","type":"features-icon-grid-three","props":{"sectionTitle":"Etkinlik Highlights","features":[{"icon":"users","title":"50+ Konuşmacı","description":"Sektör liderleri ve uzmanlardan ilham alın"},{"icon":"presentation","title":"30+ Oturum","description":"Workshop, panel ve teknik sunumlar"},{"icon":"trophy","title":"Sertifika","description":"Katılım sertifikası ve 8 saat eğitim kredisi"}]}},{"id":"pricing","type":"pricing-table-three-column","props":{"sectionTitle":"Kayıt Paketleri","plans":[{"name":"Online","price":"₺499","description":"Canlı yayın erişimi"},{"name":"Yerinde","price":"₺1.499","highlighted":true},{"name":"VIP","price":"₺2.999"}]}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Allplan Events"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["event", "conference", "training", "webinar"], "difficulty": "intermediate", "estimatedSetupTime": "15 minutes"}'::jsonb,
  NOW(),
  NOW()
);
