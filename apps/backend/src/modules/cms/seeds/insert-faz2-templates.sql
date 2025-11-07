-- Insert 3 Faz 2 CMS Page Templates
-- News, Case Study, Feature Landing

-- Template 14: News & Announcements
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'News & Announcements',
  'Haber ve duyurular sayfası - liste, detay, kategoriler, arama',
  'News',
  true,
  true,
  0,
  '{"colors": {"primary": "#dc2626", "secondary": "#ef4444", "background": "#ffffff", "text": "#1f2937"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Haberler","url":"/news"},{"label":"Duyurular","url":"/announcements"},{"label":"Blog","url":"/blog"}]}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Haberler & Duyurular","subtitle":"En Son Gelişmeler","description":"Şirket haberlerimiz, ürün güncellemeleri ve sektör duyuruları"}},{"id":"featured-news","type":"blog-extended-feature","props":{"title":"Yeni Ürün Lansmanı: Allplan 2025","excerpt":"Mimarlık ve inşaat sektörüne özel yeni özelliklerle gelen Allplan 2025 ile tanışın...","image":"/news/featured.jpg","author":"Haber Ekibi","date":"2025-01-05","url":"/news/allplan-2025-lansman"}},{"id":"news-list","type":"blog-basic-list","props":{"posts":[{"title":"BIM Summit 2025 Kayıtları Başladı","excerpt":"15-16 Mart tarihlerinde düzenlenecek zirvemize kayıt olun","date":"2025-01-03"},{"title":"Yeni Eğitim Merkezimiz Açıldı","excerpt":"İstanbul''da yeni eğitim merkezimiz hizmete girdi","date":"2025-01-01"},{"title":"Yılbaşı Kampanyası","excerpt":"Tüm ürünlerde %20 indirim fırsatı","date":"2024-12-25"}]}},{"id":"categories","type":"features-icon-grid-three","props":{"sectionTitle":"Haber Kategorileri","features":[{"icon":"megaphone","title":"Ürün Duyuruları","description":"Yeni ürünler ve güncellemeler"},{"icon":"calendar","title":"Etkinlikler","description":"Yaklaşan webinar ve etkinlikler"},{"icon":"award","title":"Başarı Hikayeleri","description":"Müşteri başarı öyküleri"}]}},{"id":"newsletter","type":"content-cta-box","props":{"title":"Haberleri E-posta ile Alın","description":"Son gelişmelerden haberdar olmak için bültene abone olun","ctaButton":{"label":"Abone Ol","url":"/newsletter"}}},{"id":"footer","type":"footer-newsletter-signup","props":{"companyName":"Şirket Adı","newsletterTitle":"Haber Bülteni"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["news", "announcements", "press", "updates"], "difficulty": "beginner", "estimatedSetupTime": "6 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 15: Case Study
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Case Study',
  'Başarı hikayesi sayfası - müşteri hikayesi, sonuçlar, istatistikler',
  'Case Study',
  true,
  true,
  0,
  '{"colors": {"primary": "#7c3aed", "secondary": "#a78bfa", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Çözümler","url":"/solutions"},{"label":"Başarı Hikayeleri","url":"/case-studies"},{"label":"İletişim","url":"/contact"}],"ctaButton":{"label":"Demo Talep Et","url":"/demo"}}},{"id":"hero","type":"hero-split-image-right","props":{"title":"İnşaat Projelerinde %40 Zaman Tasarrufu","subtitle":"ABC İnşaat - Başarı Hikayesi","description":"Allplan BIM çözümleri ile proje süreçlerini nasıl optimize ettiklerini keşfedin","primaryButtonText":"Hikayeyi Okuyun","primaryButtonUrl":"#story","imageUrl":"/case-studies/abc-construction.jpg"}},{"id":"challenge","type":"content-image-side-by-side","props":{"title":"Zorluk","content":"ABC İnşaat, büyük ölçekli projelerinde koordinasyon sorunları ve zaman kayıpları yaşıyordu. Geleneksel 2D çizimler, farklı ekipler arasında iletişim problemlerine neden oluyordu.","imagePosition":"left","image":"/case-studies/challenge.jpg"}},{"id":"solution","type":"content-image-side-by-side","props":{"title":"Çözüm","content":"Allplan BIM platformuna geçiş yaparak, 3D modelleme ve gerçek zamanlı iş birliği özelliklerinden yararlandılar. Tüm paydaşlar tek bir platform üzerinden çalışmaya başladı.","imagePosition":"right","image":"/case-studies/solution.jpg"}},{"id":"results","type":"stats-four-column","props":{"sectionTitle":"Sonuçlar","stats":[{"value":"%40","label":"Zaman Tasarrufu"},{"value":"%65","label":"Hata Azaltma"},{"value":"₺2.5M","label":"Maliyet Tasarrufu"},{"value":"15","label":"Tamamlanan Proje"}]}},{"id":"testimonial","type":"testimonial-carousel","props":{"testimonials":[{"content":"Allplan ile projelerimizde muazzam bir verimlilik artışı gördük. Ekipler arası iletişim sorunları tamamen ortadan kalktı.","name":"Ahmet Yılmaz","company":"ABC İnşaat","rating":5}]}},{"id":"cta","type":"content-cta-box","props":{"title":"Sizin Başarı Hikayenizi Yazalım","description":"Siz de projelerinizde verimlilik artışı sağlamak ister misiniz?","ctaButton":{"label":"Demo Talep Et","url":"/demo"}}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Daha Fazla Başarı Hikayesi","ctaSubtitle":"Müşterilerimizin deneyimlerini keşfedin"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["case-study", "success-story", "customer", "results"], "difficulty": "intermediate", "estimatedSetupTime": "10 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 16: Feature Landing
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Feature Landing',
  'Tek özellik odaklı landing page - detaylı tanıtım, demo, SSS',
  'Feature',
  true,
  true,
  0,
  '{"colors": {"primary": "#0891b2", "secondary": "#06b6d4", "background": "#ffffff", "text": "#0f172a"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Özellikler","url":"#features"},{"label":"Nasıl Çalışır","url":"#how-it-works"},{"label":"Fiyatlandırma","url":"#pricing"},{"label":"SSS","url":"#faq"}],"ctaButton":{"label":"Ücretsiz Başla","url":"/signup"}}},{"id":"hero","type":"hero-gradient-floating-cta","props":{"title":"3D BIM Modelleme","subtitle":"Projelerinizi Hayata Geçirin","description":"Gerçek zamanlı 3D modelleme ile tasarım süreçlerinizi hızlandırın","primaryButtonText":"Canlı Demo İzle","primaryButtonUrl":"/demo","secondaryButtonText":"Özellikleri Keşfet","secondaryButtonUrl":"#features"}},{"id":"video-demo","type":"content-single-fullwidth","props":{"content":"<div style=\"aspect-ratio: 16/9; background: #f3f4f6; display: flex; align-items: center; justify-content: center;\"><p>Video Demo Placeholder</p></div>"}},{"id":"features","type":"features-icon-grid-three","props":{"sectionTitle":"Güçlü Özellikler","sectionDescription":"3D BIM Modelleme ile neler yapabilirsiniz","features":[{"icon":"layers","title":"Katman Yönetimi","description":"Kompleks projelerde kolay navigasyon"},{"icon":"share-2","title":"Gerçek Zamanlı İş Birliği","description":"Ekibinizle aynı anda çalışın"},{"icon":"download","title":"Çoklu Format Desteği","description":"IFC, DWG, DXF ve daha fazlası"},{"icon":"zap","title":"Otomatik Hesaplama","description":"Metraj ve maliyet hesaplama"},{"icon":"shield","title":"Hata Kontrolü","description":"Otomatik çakışma tespiti"},{"icon":"smartphone","title":"Mobil Erişim","description":"Her yerden proje erişimi"}]}},{"id":"how-it-works","type":"features-services-two-column","props":{"sectionTitle":"Nasıl Çalışır?","sectionDescription":"3 basit adımda başlayın","services":[{"icon":"upload","title":"1. Projenizi Yükleyin","description":"Mevcut CAD dosyalarınızı içe aktarın"},{"icon":"edit","title":"2. Modellemeye Başlayın","description":"3D araçlarla tasarım yapın"},{"icon":"share","title":"3. Paylaşın & İş Birliği Yapın","description":"Ekibinizle gerçek zamanlı çalışın"}]}},{"id":"pricing","type":"pricing-table-three-column","props":{"sectionTitle":"Basit Fiyatlandırma","plans":[{"name":"Başlangıç","price":"₺499/ay","features":["1 Kullanıcı","5 Proje","Temel Özellikler"],"buttonText":"Başla","buttonUrl":"/signup?plan=starter"},{"name":"Profesyonel","price":"₺1.299/ay","features":["5 Kullanıcı","Sınırsız Proje","Tüm Özellikler","Öncelikli Destek"],"highlighted":true,"buttonText":"Başla","buttonUrl":"/signup?plan=pro"},{"name":"Kurumsal","price":"Özel","features":["Sınırsız Kullanıcı","Özel Entegrasyon","SLA"],"buttonText":"İletişim","buttonUrl":"/contact"}]}},{"id":"faq","type":"content-cta-box","props":{"title":"Sorularınız mı Var?","description":"SSS bölümünde yanıtları bulun veya bize ulaşın","ctaButton":{"label":"SSS","url":"/faq"}}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Hemen Başlayın","ctaSubtitle":"14 gün ücretsiz deneme"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["feature", "landing", "product", "demo"], "difficulty": "intermediate", "estimatedSetupTime": "12 minutes"}'::jsonb,
  NOW(),
  NOW()
);
