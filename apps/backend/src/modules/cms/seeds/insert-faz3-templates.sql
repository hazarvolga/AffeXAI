-- Insert 4 Faz 3 CMS Page Templates
-- 404 Error, 500 Error, Certificate Verification, Campaign Landing

-- Template 17: 404 Error Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  '404 Error Page',
  'Sayfa bulunamadı hatası - yönlendirme linkleri, arama, ana sayfaya dön',
  'Error',
  true,
  true,
  0,
  '{"colors": {"primary": "#3b82f6", "secondary": "#60a5fa", "background": "#ffffff", "text": "#1f2937"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Ürünler","url":"/products"},{"label":"İletişim","url":"/contact"}]}},{"id":"error-content","type":"hero-centered-bg-image","props":{"title":"404 - Sayfa Bulunamadı","subtitle":"Üzgünüz, aradığınız sayfa mevcut değil","description":"Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir","primaryButtonText":"Ana Sayfaya Dön","primaryButtonUrl":"/"}},{"id":"quick-links","type":"features-icon-grid-three","props":{"sectionTitle":"Popüler Sayfalar","features":[{"icon":"home","title":"Ana Sayfa","description":"Ana sayfaya geri dönün"},{"icon":"phone","title":"İletişim","description":"Bizimle iletişime geçin"},{"icon":"help-circle","title":"Yardım Merkezi","description":"SSS ve destek"}]}},{"id":"footer","type":"footer-compact-centered","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": false}'::jsonb,
  '{"tags": ["error", "404", "not-found", "redirect"], "difficulty": "beginner", "estimatedSetupTime": "3 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 18: 500 Error Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  '500 Error Page',
  'Sunucu hatası - hata raporlama, yeniden deneme, iletişim',
  'Error',
  true,
  true,
  0,
  '{"colors": {"primary": "#ef4444", "secondary": "#f87171", "background": "#ffffff", "text": "#1f2937"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"}]}},{"id":"error-content","type":"hero-centered-bg-image","props":{"title":"500 - Sunucu Hatası","subtitle":"Bir şeyler ters gitti","description":"Sunucularımızda beklenmeyen bir hata oluştu. Teknik ekibimiz sorunu çözmek için çalışıyor.","primaryButtonText":"Sayfayı Yenile","primaryButtonUrl":"#"}},{"id":"error-info","type":"content-cta-box","props":{"title":"Sorun Devam Ediyor mu?","description":"Hata devam ederse lütfen destek ekibimize bildiriniz","ctaButton":{"label":"Destek Ekibine Ulaş","url":"/contact"}}},{"id":"footer","type":"footer-compact-centered","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": false}'::jsonb,
  '{"tags": ["error", "500", "server-error", "maintenance"], "difficulty": "beginner", "estimatedSetupTime": "3 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 19: Certificate Verification
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Certificate Verification',
  'Sertifika doğrulama sayfası - sertifika numarası kontrolü, bilgi gösterimi',
  'Verification',
  true,
  true,
  0,
  '{"colors": {"primary": "#10b981", "secondary": "#34d399", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Eğitimler","url":"/education"},{"label":"Sertifikalar","url":"/certificates"}],"ctaButton":{"label":"Giriş Yap","url":"/login"}}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Sertifika Doğrulama","subtitle":"Sertifika Geçerliliğini Kontrol Edin","description":"Sertifika numaranızı girerek sertifikanızın geçerliliğini ve detaylarını görüntüleyin"}},{"id":"verification-form","type":"content-single-fullwidth","props":{"content":"<div style=\"max-width: 600px; margin: 0 auto; padding: 2rem; background: #f9fafb; border-radius: 8px;\"><h3 style=\"margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;\">Sertifika Numaranızı Girin</h3><p style=\"margin-bottom: 1.5rem; color: #6b7280;\">Örnek: ALP-TR-2025-01-ABC123</p><input type=\"text\" placeholder=\"ALP-TR-2025-01-ABC123\" style=\"width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;\" /><button style=\"width: 100%; padding: 0.75rem; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;\">Doğrula</button></div>"}},{"id":"info","type":"features-icon-grid-three","props":{"sectionTitle":"Sertifika Sistemi","features":[{"icon":"shield-check","title":"Güvenli Doğrulama","description":"Blockchain tabanlı doğrulama sistemi"},{"icon":"file-check","title":"Anında Kontrol","description":"Gerçek zamanlı sertifika kontrolü"},{"icon":"download","title":"PDF İndirme","description":"Onaylı sertifikanızı indirin"}]}},{"id":"footer","type":"footer-multi-column","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["certificate", "verification", "validation", "education"], "difficulty": "intermediate", "estimatedSetupTime": "8 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 20: Campaign Landing
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Campaign Landing',
  'Kampanya landing page - sınırlı süre teklifi, countdown, CTA',
  'Campaign',
  true,
  true,
  0,
  '{"colors": {"primary": "#f59e0b", "secondary": "#fbbf24", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Kampanya Detayları","url":"#details"},{"label":"Nasıl Çalışır","url":"#how-it-works"}],"ctaButton":{"label":"Hemen Başla","url":"#signup"}}},{"id":"hero","type":"hero-gradient-floating-cta","props":{"title":"Sınırlı Süre Fırsatı!","subtitle":"Tüm Ürünlerde %50 İndirim","description":"Yılın en büyük kampanyasını kaçırmayın. Sadece 3 gün!","primaryButtonText":"Kampanyadan Yararlan","primaryButtonUrl":"#signup","secondaryButtonText":"Detayları İncele","secondaryButtonUrl":"#details"}},{"id":"countdown","type":"content-single-fullwidth","props":{"content":"<div style=\"text-align: center; padding: 3rem 1rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white;\"><h2 style=\"font-size: 2rem; font-weight: 700; margin-bottom: 1rem;\">Kampanya Bitimine</h2><div style=\"display: flex; justify-content: center; gap: 2rem; font-size: 2.5rem; font-weight: 700;\"><div><span id=\"days\">02</span><div style=\"font-size: 0.875rem; font-weight: 400;\">Gün</div></div><div><span id=\"hours\">18</span><div style=\"font-size: 0.875rem; font-weight: 400;\">Saat</div></div><div><span id=\"minutes\">45</span><div style=\"font-size: 0.875rem; font-weight: 400;\">Dakika</div></div><div><span id=\"seconds\">32</span><div style=\"font-size: 0.875rem; font-weight: 400;\">Saniye</div></div></div></div>"}},{"id":"benefits","type":"features-icon-grid-three","props":{"sectionTitle":"Kampanya Avantajları","features":[{"icon":"percent","title":"%50 İndirim","description":"Tüm ürün ve hizmetlerde geçerli"},{"icon":"gift","title":"Hediye Paket","description":"Premium özelliklere ücretsiz erişim"},{"icon":"zap","title":"Anında Aktivasyon","description":"Hemen kullanmaya başlayın"}]}},{"id":"pricing","type":"pricing-table-three-column","props":{"sectionTitle":"Kampanya Fiyatları","sectionDescription":"Normal fiyatların yarısına","plans":[{"name":"Temel","price":"₺499","originalPrice":"₺999","features":["5 Kullanıcı","50GB Depolama","Temel Özellikler"],"buttonText":"Satın Al","buttonUrl":"/checkout?plan=basic"},{"name":"Profesyonel","price":"₺999","originalPrice":"₺1.999","features":["20 Kullanıcı","200GB Depolama","Tüm Özellikler","Öncelikli Destek"],"highlighted":true,"buttonText":"Satın Al","buttonUrl":"/checkout?plan=pro"},{"name":"Kurumsal","price":"₺2.499","originalPrice":"₺4.999","features":["Sınırsız Kullanıcı","Sınırsız Depolama","Özel Entegrasyon","SLA"],"buttonText":"Satın Al","buttonUrl":"/checkout?plan=enterprise"}]}},{"id":"cta","type":"content-cta-box","props":{"title":"Bu Fırsatı Kaçırmayın!","description":"Kampanya 3 gün içinde sona erecek. Hemen başvurun.","ctaButton":{"label":"Kampanyadan Yararlan","url":"/signup"}}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Sorularınız mı var?","ctaSubtitle":"7/24 Canlı Destek"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["campaign", "promotion", "discount", "limited-time", "sale"], "difficulty": "intermediate", "estimatedSetupTime": "10 minutes"}'::jsonb,
  NOW(),
  NOW()
);
