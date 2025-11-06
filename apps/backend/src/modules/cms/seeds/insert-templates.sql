-- Insert CMS Page Templates
-- Generated from templates-data.ts

-- Template 1: Minimal Landing Page
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Minimal Landing Page',
  'Clean and modern landing page with hero section, features showcase, pricing table, and multi-column footer',
  'Landing Page',
  true,
  true,
  0,
  '{"colors": {"primary": "#ff7f1e", "secondary": "#1e40ff", "background": "#ffffff", "text": "#171717"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[
    {"id": "header", "type": "nav-minimal-logo-left", "props": {"logoUrl": "/logo.svg", "logoAlt": "Company Logo", "menuItems": [{"label": "Özellikler", "url": "#features"}, {"label": "Fiyatlandırma", "url": "#pricing"}, {"label": "İletişim", "url": "#contact"}], "ctaButton": {"label": "Hemen Başla", "url": "/signup"}}},
    {"id": "hero", "type": "hero-centered-bg-image", "props": {"title": "Modern İş Çözümleri", "subtitle": "İşinizi dijital dünyada büyütün", "ctaButton": {"label": "Ücretsiz Deneyin", "url": "/demo"}, "backgroundImage": "/images/hero-bg.jpg"}},
    {"id": "features", "type": "features-icon-grid-three", "props": {"title": "Neden Biz?", "subtitle": "İşinizi kolaylaştıran özellikler", "features": [{"icon": "rocket", "title": "Hızlı Kurulum", "description": "Dakikalar içinde başlayın"}, {"icon": "shield", "title": "Güvenli", "description": "Verileriniz güvende"}, {"icon": "chart", "title": "Analitik", "description": "Detaylı raporlar"}]}},
    {"id": "pricing", "type": "pricing-table-three-column", "props": {"title": "Fiyatlandırma", "plans": [{"name": "Başlangıç", "price": "₺99/ay", "features": ["5 Kullanıcı", "10GB Depolama", "Email Destek"]}, {"name": "Profesyonel", "price": "₺299/ay", "features": ["25 Kullanıcı", "100GB Depolama", "Öncelikli Destek"], "highlighted": true}, {"name": "Kurumsal", "price": "Özel", "features": ["Sınırsız Kullanıcı", "Sınırsız Depolama", "7/24 Destek"]}]}},
    {"id": "footer", "type": "footer-multi-column", "props": {"columns": [{"title": "Ürün", "links": [{"label": "Özellikler", "url": "/features"}, {"label": "Fiyatlandırma", "url": "/pricing"}]}, {"title": "Şirket", "links": [{"label": "Hakkımızda", "url": "/about"}, {"label": "İletişim", "url": "/contact"}]}], "copyright": "© 2025 Şirket Adı. Tüm hakları saklıdır."}}
  ]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable", "headerSticky": true}'::jsonb,
  '{"tags": ["landing", "minimal", "business"], "difficulty": "beginner", "estimatedSetupTime": "5 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 2: Education Platform
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Education Platform',
  'Comprehensive education platform with courses, stats, testimonials, and CTA sections',
  'Education',
  true,
  true,
  0,
  '{"colors": {"primary": "#4f46e5", "secondary": "#06b6d4", "background": "#f9fafb", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[
    {"id": "header", "type": "nav-sticky-transparent", "props": {"logoUrl": "/logo.svg", "menuItems": [{"label": "Kurslar", "url": "/courses"}, {"label": "Eğitmenler", "url": "/instructors"}, {"label": "Blog", "url": "/blog"}], "ctaButton": {"label": "Kaydol", "url": "/register"}}},
    {"id": "hero", "type": "hero-split-image-right", "props": {"title": "Online Eğitimde Yeni Dönem", "subtitle": "Uzman eğitmenlerden öğrenin", "ctaButton": {"label": "Kurslara Göz At", "url": "/courses"}, "image": "/images/education-hero.jpg"}},
    {"id": "services", "type": "features-services-two-column", "props": {"title": "Eğitim Programları", "services": [{"icon": "graduation-cap", "title": "Canlı Dersler", "description": "Uzman eğitmenlerle interaktif dersler"}, {"icon": "video", "title": "Kayıtlı İçerik", "description": "İstediğiniz zaman izleyin"}]}},
    {"id": "stats", "type": "stats-four-column", "props": {"stats": [{"value": "10K+", "label": "Öğrenci"}, {"value": "500+", "label": "Kurs"}, {"value": "50+", "label": "Eğitmen"}, {"value": "95%", "label": "Memnuniyet"}]}},
    {"id": "testimonials", "type": "testimonial-grid-three", "props": {"title": "Öğrenci Yorumları", "testimonials": [{"name": "Ahmet Y.", "role": "Yazılım Geliştirici", "content": "Harika bir platform!", "rating": 5}, {"name": "Ayşe K.", "role": "Veri Analisti", "content": "Çok faydalı kurslar", "rating": 5}, {"name": "Mehmet D.", "role": "Tasarımcı", "content": "Eğitmenler çok başarılı", "rating": 5}]}},
    {"id": "cta", "type": "content-cta-box", "props": {"title": "Bugün Başlayın", "description": "İlk kursunuz ücretsiz!", "ctaButton": {"label": "Hemen Kaydol", "url": "/register"}}},
    {"id": "footer", "type": "footer-extended-cta", "props": {"ctaTitle": "Haber Bülteni", "ctaSubtitle": "Yeni kurslardan haberdar olun", "columns": [{"title": "Platform", "links": [{"label": "Kurslar", "url": "/courses"}, {"label": "Blog", "url": "/blog"}]}]}}
  ]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "relaxed", "headerSticky": true}'::jsonb,
  '{"tags": ["education", "courses", "learning"], "difficulty": "intermediate", "estimatedSetupTime": "10 minutes"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 3: Corporate Business
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Corporate Business',
  'Professional corporate website with services, about section, and testimonials',
  'Business',
  false,
  true,
  0,
  '{"colors": {"primary": "#1e3a8a", "secondary": "#3b82f6", "background": "#ffffff", "text": "#1f2937"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[
    {"id": "header", "type": "nav-logo-cta", "props": {"logoUrl": "/logo.svg", "menuItems": [{"label": "Hizmetler", "url": "/services"}, {"label": "Hakkımızda", "url": "/about"}, {"label": "İletişim", "url": "/contact"}], "ctaButton": {"label": "Teklif Alın", "url": "/quote"}}},
    {"id": "hero", "type": "hero-gradient-floating-cta", "props": {"title": "Kurumsal Çözümler", "subtitle": "İşinizi dijitalleştirin", "ctaButton": {"label": "Hizmetlerimiz", "url": "/services"}}},
    {"id": "services", "type": "features-services-two-column", "props": {"title": "Hizmetlerimiz", "services": [{"icon": "code", "title": "Yazılım Geliştirme", "description": "Özel yazılım çözümleri"}, {"icon": "cloud", "title": "Bulut Hizmetleri", "description": "Güvenli bulut altyapı"}]}},
    {"id": "about", "type": "content-image-side-by-side", "props": {"title": "Hakkımızda", "content": "15 yıllık deneyim", "image": "/images/team.jpg", "imagePosition": "right"}},
    {"id": "testimonials", "type": "testimonial-carousel", "props": {"testimonials": [{"name": "Ali V.", "company": "ABC A.Ş.", "content": "Mükemmel hizmet", "rating": 5}]}},
    {"id": "footer", "type": "footer-multi-column", "props": {"columns": [{"title": "Şirket", "links": [{"label": "Hakkımızda", "url": "/about"}]}], "copyright": "© 2025 Kurumsal A.Ş."}}
  ]'::jsonb,
  '{"maxWidth": "1280px", "spacing": "comfortable"}'::jsonb,
  '{"tags": ["business", "corporate", "professional"], "difficulty": "beginner"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 4: Creative Portfolio
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Creative Portfolio',
  'Modern portfolio for creative professionals with gallery and project showcase',
  'Portfolio',
  false,
  true,
  0,
  '{"colors": {"primary": "#ec4899", "secondary": "#8b5cf6", "background": "#0f172a", "text": "#f1f5f9"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[
    {"id": "header", "type": "nav-minimal-logo-left", "props": {"logoUrl": "/logo.svg", "menuItems": [{"label": "Projeler", "url": "#projects"}, {"label": "Hakkımda", "url": "#about"}, {"label": "İletişim", "url": "#contact"}]}},
    {"id": "hero", "type": "hero-fullscreen-sticky-cta", "props": {"title": "Yaratıcı Tasarımcı", "subtitle": "Dijital deneyimler yaratıyorum", "ctaButton": {"label": "Projelerime Göz At", "url": "#projects"}}},
    {"id": "gallery", "type": "gallery-four-image-mosaic", "props": {"images": [{"url": "/images/project1.jpg", "alt": "Proje 1"}, {"url": "/images/project2.jpg", "alt": "Proje 2"}]}},
    {"id": "about", "type": "content-single-fullwidth", "props": {"content": "10 yılı aşkın tecrübem..."}},
    {"id": "cta", "type": "content-cta-box", "props": {"title": "Birlikte çalışalım", "ctaButton": {"label": "İletişime Geç", "url": "/contact"}}},
    {"id": "footer", "type": "footer-compact-centered", "props": {"copyright": "© 2025 Creative Designer", "socialLinks": [{"platform": "instagram", "url": "#"}, {"platform": "behance", "url": "#"}]}}
  ]'::jsonb,
  '{"maxWidth": "1400px", "spacing": "wide"}'::jsonb,
  '{"tags": ["portfolio", "creative", "designer"], "difficulty": "intermediate"}'::jsonb,
  NOW(),
  NOW()
);

-- Template 5: Modern Blog
INSERT INTO page_templates (
  id, name, description, category, "isFeatured", "isActive", "usageCount",
  "designSystem", blocks, "layoutOptions", metadata, "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid(),
  'Modern Blog',
  'Clean blog layout with featured posts, article list, and newsletter signup',
  'Blog',
  false,
  true,
  0,
  '{"colors": {"primary": "#059669", "secondary": "#10b981", "background": "#ffffff", "text": "#111827"}, "typography": {"headingFont": "Inter", "bodyFont": "Inter"}}'::jsonb,
  '[
    {"id": "header", "type": "nav-centered-logo", "props": {"logoUrl": "/logo.svg", "menuItems": [{"label": "Ana Sayfa", "url": "/"}, {"label": "Makaleler", "url": "/blog"}, {"label": "Kategoriler", "url": "/categories"}, {"label": "Hakkımda", "url": "/about"}]}},
    {"id": "featured", "type": "blog-extended-feature", "props": {"title": "En Yeni Makale Başlığı", "excerpt": "Makale özeti buraya gelecek...", "author": "Yazar Adı", "date": "2025-01-05", "image": "/images/featured-post.jpg", "url": "/blog/post-slug"}},
    {"id": "posts", "type": "blog-basic-list", "props": {"posts": [{"title": "Makale 1", "excerpt": "Özet...", "date": "2025-01-04"}, {"title": "Makale 2", "excerpt": "Özet...", "date": "2025-01-03"}]}},
    {"id": "newsletter", "type": "content-cta-box", "props": {"title": "Bültenimize Abone Olun", "description": "Yeni makalelerden haberdar olun", "ctaButton": {"label": "Abone Ol", "url": "/newsletter"}}},
    {"id": "footer", "type": "footer-newsletter-signup", "props": {"newsletterTitle": "Blog Bülteni", "columns": [{"title": "Keşfet", "links": [{"label": "Tüm Makaleler", "url": "/blog"}]}]}}
  ]'::jsonb,
  '{"maxWidth": "900px", "spacing": "comfortable"}'::jsonb,
  '{"tags": ["blog", "content", "articles"], "difficulty": "beginner"}'::jsonb,
  NOW(),
  NOW()
);
