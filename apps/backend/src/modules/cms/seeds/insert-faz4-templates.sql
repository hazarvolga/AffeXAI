-- Insert 3 Faz 4 CMS Page Templates
-- Product Category, E-Commerce Landing, Cart & Checkout

-- Template 21: Product Category
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Product Category',
  'Ürün kategori sayfası - ürün listesi, filtreleme, sıralama, sepete ekle',
  'E-Commerce',
  true,
  true,
  0,
  '{"colors": {"primary": "#8b5cf6", "secondary": "#a78bfa", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-logo-cta","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ürünler","url":"/products"},{"label":"Kategoriler","url":"/categories"},{"label":"İletişim","url":"/contact"}],"ctaButton":{"label":"Sepetim","url":"/cart"}}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"BIM Yazılımları","subtitle":"Profesyonel İnşaat Çözümleri","description":"Mimarlık ve inşaat sektörü için en gelişmiş BIM yazılımları"}},{"id":"products","type":"gallery-four-image-mosaic","props":{"images":[{"src":"/products/allplan-architecture.jpg","alt":"Allplan Architecture","caption":"Allplan Architecture","price":"₺12.999"},{"src":"/products/allplan-engineering.jpg","alt":"Allplan Engineering","caption":"Allplan Engineering","price":"₺15.999"},{"src":"/products/allplan-precast.jpg","alt":"Allplan Precast","caption":"Allplan Precast","price":"₺9.999"},{"src":"/products/allplan-bridge.jpg","alt":"Allplan Bridge","caption":"Allplan Bridge","price":"₺18.999"}]}},{"id":"features","type":"features-icon-grid-three","props":{"sectionTitle":"Özellikler","features":[{"icon":"filter","title":"Gelişmiş Filtreleme","description":"Kategori, fiyat, özellik bazlı filtreleme"},{"icon":"sort-desc","title":"Akıllı Sıralama","description":"Fiyat, popülerlik, yenilik"},{"icon":"shopping-cart","title":"Hızlı Sepet","description":"Tek tıkla sepete ekle"}]}},{"id":"cta","type":"content-cta-box","props":{"title":"Aradığınızı Bulamadınız mı?","description":"Ürün danışmanlarımız size yardımcı olabilir","ctaButton":{"label":"İletişime Geç","url":"/contact"}}},{"id":"footer","type":"footer-multi-column","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["e-commerce", "product-category", "shopping", "catalog"], "difficulty": "intermediate", "estimatedSetupTime": "10 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 22: E-Commerce Landing
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'E-Commerce Landing',
  'E-ticaret ana sayfa - öne çıkan ürünler, kategoriler, kampanyalar',
  'E-Commerce',
  true,
  true,
  0,
  '{"colors": {"primary": "#ec4899", "secondary": "#f472b6", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-sticky-transparent","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ürünler","url":"/products"},{"label":"Kampanyalar","url":"/campaigns"},{"label":"Hakkımızda","url":"/about"}],"ctaButton":{"label":"Sepetim","url":"/cart"}}},{"id":"hero","type":"hero-gradient-floating-cta","props":{"title":"İnşaat Yazılımlarında Lider","subtitle":"Allplan Ürünlerinde %30 İndirim","description":"Mimarlık ve mühendislik yazılımlarında profesyonel çözümler","primaryButtonText":"Alışverişe Başla","primaryButtonUrl":"/products","secondaryButtonText":"Kampanyalar","secondaryButtonUrl":"/campaigns"}},{"id":"featured","type":"gallery-four-image-mosaic","props":{"sectionTitle":"Öne Çıkan Ürünler","images":[{"src":"/products/featured1.jpg","alt":"Allplan Architecture","caption":"Allplan Architecture","price":"₺12.999"},{"src":"/products/featured2.jpg","alt":"Allplan Engineering","caption":"Allplan Engineering","price":"₺15.999"},{"src":"/products/featured3.jpg","alt":"Solibri","caption":"Solibri Model Checker","price":"₺8.999"},{"src":"/products/featured4.jpg","alt":"Lumion","caption":"Lumion Rendering","price":"₺11.999"}]}},{"id":"categories","type":"features-icon-grid-three","props":{"sectionTitle":"Kategoriler","features":[{"icon":"building","title":"Mimarlık","description":"BIM, modelleme, tasarım"},{"icon":"hammer","title":"Mühendislik","description":"Statik, altyapı, köprü"},{"icon":"package","title":"Prefabrik","description":"Panel, otomasyon, üretim"}]}},{"id":"stats","type":"stats-four-column","props":{"sectionTitle":"Neden Biz?","stats":[{"value":"5000+","label":"Mutlu Müşteri"},{"value":"15+","label":"Yıllık Deneyim"},{"value":"24/7","label":"Teknik Destek"},{"value":"100%","label":"Memnuniyet"}]}},{"id":"cta","type":"content-cta-box","props":{"title":"İlk Alışverişinizde %10 İndirim","description":"Hemen kayıt olun ve indirim kuponu kazanın","ctaButton":{"label":"Kayıt Ol","url":"/signup"}}},{"id":"footer","type":"footer-extended-cta","props":{"companyName":"Şirket Adı","ctaTitle":"Sorularınız mı var?","ctaSubtitle":"7/24 Canlı Destek"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["e-commerce", "landing", "shopping", "products", "store"], "difficulty": "intermediate", "estimatedSetupTime": "12 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 23: Cart & Checkout
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Cart & Checkout',
  'Sepet ve ödeme sayfası - ürün özeti, fatura bilgileri, ödeme yöntemleri',
  'E-Commerce',
  true,
  true,
  0,
  '{"colors": {"primary": "#10b981", "secondary": "#34d399", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}, "supportedContexts": ["public"]}'::jsonb,
  '[{"id":"header","type":"nav-minimal-logo-left","props":{"logoUrl":"/logo.svg","menuItems":[{"label":"Ana Sayfa","url":"/"},{"label":"Ürünler","url":"/products"}]}},{"id":"hero","type":"hero-centered-bg-image","props":{"title":"Sepetim","subtitle":"Siparişinizi Tamamlayın","description":"Güvenli ödeme ile hızlı teslimat"}},{"id":"cart-summary","type":"content-single-fullwidth","props":{"content":"<div style=\"max-width: 900px; margin: 0 auto; padding: 2rem; background: #f9fafb; border-radius: 8px;\"><h3 style=\"margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 600;\">Sepet Özeti</h3><div style=\"margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;\"><div style=\"display: flex; justify-content: space-between; align-items: center;\"><div><h4 style=\"font-weight: 600;\">Allplan Architecture 2025</h4><p style=\"color: #6b7280; font-size: 0.875rem;\">Lisans: 1 yıl</p></div><div style=\"text-align: right;\"><p style=\"font-weight: 600; font-size: 1.125rem;\">₺12.999</p></div></div></div><div style=\"margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid #e5e7eb;\"><div style=\"display: flex; justify-content: space-between; margin-bottom: 0.5rem;\"><span>Ara Toplam:</span><span>₺12.999</span></div><div style=\"display: flex; justify-content: space-between; margin-bottom: 0.5rem;\"><span>KDV (%20):</span><span>₺2.600</span></div><div style=\"display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #e5e7eb; font-size: 1.25rem; font-weight: 700;\"><span>Toplam:</span><span style=\"color: #10b981;\">₺15.599</span></div></div></div>"}},{"id":"checkout-form","type":"content-single-fullwidth","props":{"content":"<div style=\"max-width: 900px; margin: 2rem auto; padding: 2rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px;\"><h3 style=\"margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 600;\">Fatura Bilgileri</h3><form><div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;\"><input type=\"text\" placeholder=\"Ad\" style=\"padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;\" /><input type=\"text\" placeholder=\"Soyad\" style=\"padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;\" /></div><input type=\"email\" placeholder=\"E-posta\" style=\"width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;\" /><input type=\"tel\" placeholder=\"Telefon\" style=\"width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;\" /><textarea placeholder=\"Adres\" rows=\"3\" style=\"width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1.5rem;\"></textarea><h3 style=\"margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;\">Ödeme Yöntemi</h3><div style=\"display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;\"><label style=\"padding: 1rem; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; text-align: center;\"><input type=\"radio\" name=\"payment\" value=\"credit-card\" style=\"margin-right: 0.5rem;\" />Kredi Kartı</label><label style=\"padding: 1rem; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; text-align: center;\"><input type=\"radio\" name=\"payment\" value=\"bank-transfer\" style=\"margin-right: 0.5rem;\" />Havale/EFT</label><label style=\"padding: 1rem; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; text-align: center;\"><input type=\"radio\" name=\"payment\" value=\"paypal\" style=\"margin-right: 0.5rem;\" />PayPal</label></div><button type=\"submit\" style=\"width: 100%; padding: 1rem; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 1.125rem; font-weight: 600; cursor: pointer;\">Siparişi Tamamla</button></form></div>"}},{"id":"trust","type":"features-icon-grid-three","props":{"sectionTitle":"Güvenli Alışveriş","features":[{"icon":"shield-check","title":"SSL Güvenliği","description":"256-bit şifreleme ile güvenli ödeme"},{"icon":"lock","title":"Gizlilik","description":"Kişisel verileriniz korunur"},{"icon":"award","title":"Garanti","description":"14 gün koşulsuz iade"}]}},{"id":"footer","type":"footer-compact-centered","props":{"companyName":"Şirket Adı"}}]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": false}'::jsonb,
  '{"tags": ["e-commerce", "cart", "checkout", "payment"], "difficulty": "advanced", "estimatedSetupTime": "15 minutes"}'::jsonb,
  NOW(),
  NOW()
);
