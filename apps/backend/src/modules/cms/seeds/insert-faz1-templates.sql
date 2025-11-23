-- Insert Faz 1: 5 Temel Kurumsal Sayfalar
-- Contact, Team, FAQ, Legal, Pricing

-- Template 9: Contact Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Contact Page',
  'İletişim sayfası - form, harita, iletişim bilgileri, sosyal medya',
  'Contact',
  true,
  true,
  0,
  '{"colors": {"primary": "#0ea5e9", "secondary": "#06b6d4", "background": "#ffffff", "text": "#0f172a"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Hakkımızda","url":"/about"},{"label":"Hizmetler","url":"/services"},{"label":"İletişim","url":"/contact"}]}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Bize Ulaşın","subtitle":"Size nasıl yardımcı olabiliriz?","description":"Sorularınız, önerileriniz veya projeleriniz için bizimle iletişime geçin"}},{"id":"contact-info","type":"features-icon-grid-three","props":{"sectionTitle":"İletişim Bilgileri","features":[{"icon":"map-pin","title":"Adres","description":"Atatürk Cad. No:123, 34000 İstanbul"},{"icon":"phone","title":"Telefon","description":"+90 212 123 45 67"},{"icon":"mail","title":"E-posta","description":"info@company.com"}]}},{"id":"contact-form","type":"content-cta-box","props":{"title":"Mesaj Gönderin","description":"Aşağıdaki formu doldurarak bize ulaşabilirsiniz","ctaButton":{"label":"Gönder","url":"#"}}},{"id":"footer","type":"footer-multi-column","props":{"companyName":"Şirket Adı","columns":[{"title":"Kurumsal","links":[{"label":"Hakkımızda","url":"/about"},{"label":"Ekibimiz","url":"/team"}]}]}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["contact", "form", "location", "support"], "difficulty": "beginner", "estimatedSetupTime": "5 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 10: Team Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Team Page',
  'Ekip sayfası - üye kartları, pozisyonlar, sosyal linkler',
  'Team',
  true,
  true,
  0,
  '{"colors": {"primary": "#8b5cf6", "secondary": "#a78bfa", "background": "#faf5ff", "text": "#1f2937"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Hakkımızda","url":"/about"},{"label":"Ekibimiz","url":"/team"},{"label":"İletişim","url":"/contact"}],"ctaButton":{"label":"Bize Katıl","url":"/careers"}}},{"id":"hero","type":"hero-gradient-floating-cta","props":{"title":"Ekibimizle Tanışın","subtitle":"Başarının Arkasındaki İnsanlar","description":"Tutkulu, yetenekli ve deneyimli ekibimiz","primaryButtonText":"Açık Pozisyonlar","primaryButtonUrl":"/careers"}},{"id":"team-grid","type":"gallery-four-image-mosaic","props":{"images":[{"url":"/team/member1.jpg","alt":"Ali Yılmaz - CEO"},{"url":"/team/member2.jpg","alt":"Ayşe Demir - CTO"},{"url":"/team/member3.jpg","alt":"Mehmet Kaya - Product Manager"},{"url":"/team/member4.jpg","alt":"Zeynep Şahin - Lead Designer"}]}},{"id":"values","type":"features-services-two-column","props":{"sectionTitle":"Değerlerimiz","sectionDescription":"Bizi biz yapan prensipler","services":[{"icon":"users","title":"İş Birliği","description":"Birlikte daha güçlüyüz"},{"icon":"lightbulb","title":"İnovasyon","description":"Sürekli öğrenme ve gelişim"}]}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Ekibimize Katılın","ctaSubtitle":"Açık pozisyonları inceleyin"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["team", "about", "people", "careers"], "difficulty": "beginner", "estimatedSetupTime": "7 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 11: FAQ Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'FAQ Page',
  'Sık Sorulan Sorular sayfası - akordeon yapısı, kategoriler',
  'FAQ',
  true,
  true,
  0,
  '{"colors": {"primary": "#10b981", "secondary": "#34d399", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Ürünler","url":"/products"},{"label":"Destek","url":"/support"},{"label":"SSS","url":"/faq"}],"ctaButton":{"label":"İletişim","url":"/contact"}}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Sık Sorulan Sorular","subtitle":"Size Yardımcı Olalım","description":"Merak ettiklerinizin cevaplarını burada bulabilirsiniz"}},{"id":"faq-categories","type":"features-icon-grid-three","props":{"sectionTitle":"Kategoriler","features":[{"icon":"package","title":"Ürün & Hizmetler","description":"Ürünlerimiz ve hizmetlerimiz hakkında"},{"icon":"credit-card","title":"Ödeme & Fatura","description":"Fiyatlandırma ve ödeme seçenekleri"},{"icon":"settings","title":"Teknik Destek","description":"Teknik sorunlar ve çözümleri"}]}},{"id":"faq-content","type":"content-single-fullwidth","props":{"content":"SSS içeriği buraya gelecek (akordeon component)"}},{"id":"cta","type":"content-cta-box","props":{"title":"Cevabını Bulamadınız mı?","description":"Destek ekibimize ulaşın, size yardımcı olalım","ctaButton":{"label":"Destek Talebi Oluştur","url":"/support"}}},{"id":"footer","type":"footer-multi-column","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "900px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["faq", "support", "help", "questions"], "difficulty": "beginner", "estimatedSetupTime": "5 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 12: Legal Pages
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Legal Pages',
  'Yasal metinler - gizlilik politikası, KVKK, kullanım şartları',
  'Legal',
  false,
  true,
  0,
  '{"colors": {"primary": "#64748b", "secondary": "#94a3b8", "background": "#f8fafc", "text": "#1e293b"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Gizlilik","url":"/privacy"},{"label":"KVKK","url":"/kvkk"},{"label":"Kullanım Şartları","url":"/terms"}]}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Gizlilik Politikası","subtitle":"Son Güncelleme: 01 Ocak 2025","description":"Kişisel verilerinizin korunması bizim için önemlidir"}},{"id":"content","type":"content-single-fullwidth","props":{"content":"<h2>1. Kişisel Verilerin Toplanması</h2><p>Web sitemizi ziyaret ettiğinizde, belirli kişisel verileriniz toplanabilir...</p><h2>2. Verilerin Kullanımı</h2><p>Toplanan veriler aşağıdaki amaçlarla kullanılır...</p><h2>3. Çerezler (Cookies)</h2><p>Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır...</p><h2>4. Veri Güvenliği</h2><p>Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alıyoruz...</p><h2>5. İletişim</h2><p>Gizlilik politikamız hakkında sorularınız için: privacy@company.com</p>"}},{"id":"footer","type":"footer-compact-centered","props":{"companyName":"Şirket Adı","copyright":"© 2025 Şirket Adı. Tüm hakları saklıdır."}}]'::jsonb,
  '{"maxWidth": "800px", "spacing": "comfortable", "headerSticky": false}'::jsonb,
  '{"tags": ["legal", "privacy", "gdpr", "kvkk", "terms"], "difficulty": "beginner", "estimatedSetupTime": "3 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 13: Pricing Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Pricing Page',
  'Fiyatlandırma sayfası - paket karşılaştırmaları, özellik listesi, SSS',
  'Pricing',
  true,
  true,
  0,
  '{"colors": {"primary": "#f59e0b", "secondary": "#fbbf24", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Özellikler","url":"/features"},{"label":"Fiyatlandırma","url":"/pricing"},{"label":"Müşteriler","url":"/customers"},{"label":"İletişim","url":"/contact"}],"ctaButton":{"label":"Ücretsiz Dene","url":"/trial"}}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Herkes İçin Uygun Fiyatlar","subtitle":"Esnek Paketler","description":"İhtiyacınıza göre ölçeklendirilebilir çözümler"}},{"id":"pricing-table","type":"pricing-table-three-column","props":{"sectionTitle":"Paketlerimiz","sectionDescription":"Tüm paketlerde 14 gün ücretsiz deneme","plans":[{"name":"Başlangıç","price":"₺299/ay","description":"Küçük ekipler için ideal","features":["5 Kullanıcı","10GB Depolama","Email Destek","Temel Özellikler"],"buttonText":"Başla","buttonUrl":"/signup?plan=starter"},{"name":"Profesyonel","price":"₺799/ay","description":"Büyüyen işletmeler için","features":["25 Kullanıcı","100GB Depolama","Öncelikli Destek","Gelişmiş Özellikler","API Erişimi"],"buttonText":"Başla","buttonUrl":"/signup?plan=pro","highlighted":true},{"name":"Kurumsal","price":"Özel Fiyat","description":"Büyük organizasyonlar için","features":["Sınırsız Kullanıcı","Sınırsız Depolama","7/24 Destek","Tüm Özellikler","Özel Entegrasyon","SLA Garantisi"],"buttonText":"İletişime Geç","buttonUrl":"/contact"}]}},{"id":"features-comparison","type":"content-single-fullwidth","props":{"content":"Detaylı özellik karşılaştırma tablosu buraya gelecek"}},{"id":"faq","type":"content-cta-box","props":{"title":"Sık Sorulan Sorular","description":"Fiyatlandırma hakkında merak ettikleriniz","ctaButton":{"label":"Tüm SSS","url":"/faq"}}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Hala Emin Değil misiniz?","ctaSubtitle":"Ücretsiz demo talep edin"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["pricing", "plans", "subscription", "comparison"], "difficulty": "intermediate", "estimatedSetupTime": "8 minutes"}'::jsonb,
  NOW(),
  NOW()
);
