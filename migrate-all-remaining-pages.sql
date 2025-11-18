-- ============================================
-- MIGRATION: 6 Remaining Parent Pages to CMS
-- ============================================

-- =====  2. products/building-infrastructure =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Bina & Altyapı Ürünleri',
  'products/building-infrastructure',
  'Mimari, mühendislik ve altyapı projeleri için uzmanlaşmış BIM çözümleri.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'products/building-infrastructure');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/building-infrastructure'), 'block',
'{"blockId":"hero-with-background-image","title":"Bina & Altyapı Ürünleri","subtitle":"Mimari, mühendislik ve altyapı projeleri için uzmanlaşmış BIM çözümleri.","backgroundImage":"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop","imageHint":"modern infrastructure"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/building-infrastructure'), 'block',
'{"blockId":"special-feature-card-single","icon":"🏢","iconType":"emoji","iconBackground":true,"title":"Allplan AEC","content":"Mimarlık, mühendislik ve inşaat sektörü için entegre BIM platformu.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/building-infrastructure/allplan-aec","enableHoverEffect":true}',
1, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/building-infrastructure'), 'block',
'{"blockId":"special-feature-card-single","icon":"🌉","iconType":"emoji","iconBackground":true,"title":"Allplan Bridge","content":"Köprü tasarımı ve mühendisliği için uzmanlaşmış çözüm.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/building-infrastructure/allplan-bridge","enableHoverEffect":true}',
2, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/building-infrastructure'), 'block',
'{"blockId":"special-feature-card-single","icon":"⚡","iconType":"emoji","iconBackground":true,"title":"AX3000","content":"Yapı fiziği ve enerji analizi için güçlü araçlar.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/building-infrastructure/ax3000","enableHoverEffect":true}',
3, NOW(), NOW());

-- ===== 3. products/collaboration =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'İşbirliği Ürünleri',
  'products/collaboration',
  'BIM işbirliği ve proje yönetimi için bulut tabanlı çözümler.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'products/collaboration');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/collaboration'), 'block',
'{"blockId":"hero-with-background-image","title":"İşbirliği Ürünleri","subtitle":"BIM işbirliği ve proje yönetimi için bulut tabanlı çözümler.","backgroundImage":"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop","imageHint":"team collaboration"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/collaboration'), 'block',
'{"blockId":"special-feature-card-single","icon":"☁️","iconType":"emoji","iconBackground":true,"title":"Bimplus","content":"Bulut tabanlı BIM işbirliği ve proje yönetimi platformu.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/collaboration/bimplus","enableHoverEffect":true}',
1, NOW(), NOW());

-- ===== 4. products/construction-planning =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'İnşaat Planlama Ürünleri',
  'products/construction-planning',
  'İnşaat süreçlerini optimize etmek için gelişmiş yazılımlar.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'products/construction-planning');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/construction-planning'), 'block',
'{"blockId":"hero-with-background-image","title":"İnşaat Planlama Ürünleri","subtitle":"İnşaat süreçlerini optimize etmek için gelişmiş yazılımlar.","backgroundImage":"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop","imageHint":"construction planning"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/construction-planning'), 'block',
'{"blockId":"special-feature-card-single","icon":"📋","iconType":"emoji","iconBackground":true,"title":"TIM (Task Information Modeling)","content":"İnşaat süreçlerini optimize etmek için görev tabanlı modelleme.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/construction-planning/tim","enableHoverEffect":true}',
1, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'products/construction-planning'), 'block',
'{"blockId":"special-feature-card-single","icon":"🔩","iconType":"emoji","iconBackground":true,"title":"SDS/2","content":"Çelik yapı detaylandırma ve fabrikasyon için yazılım.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/products/construction-planning/sds2","enableHoverEffect":true}',
2, NOW(), NOW());

-- ===== 5. solutions/building-design =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Bina Tasarımı Çözümleri',
  'solutions/building-design',
  'Mimari, strüktürel mühendislik ve MEP için entegre çözümler.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'solutions/building-design');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/building-design'), 'block',
'{"blockId":"hero-with-background-image","title":"Bina Tasarımı Çözümleri","subtitle":"Mimari, strüktürel mühendislik ve MEP için entegre çözümler.","backgroundImage":"https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop","imageHint":"building design"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/building-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"🏢","iconType":"emoji","iconBackground":true,"title":"Mimari Tasarım","content":"Yenilikçi ve sürdürülebilir mimari çözümler.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/building-design/architecture","enableHoverEffect":true}',
1, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/building-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"🏗️","iconType":"emoji","iconBackground":true,"title":"Yapısal Mühendislik","content":"Güvenli ve verimli yapısal tasarım çözümleri.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/building-design/structural-engineering","enableHoverEffect":true}',
2, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/building-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"⚡","iconType":"emoji","iconBackground":true,"title":"MEP (Mekanik, Elektrik, Tesisat)","content":"Entegre bina sistemleri ve tesisatı için çözümler.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/building-design/mep","enableHoverEffect":true}',
3, NOW(), NOW());

-- ===== 6. solutions/infrastructure-design =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Altyapı Tasarımı Çözümleri',
  'solutions/infrastructure-design',
  'Yol, köprü ve altyapı projeleri için güçlü modelleme araçları.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'solutions/infrastructure-design');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/infrastructure-design'), 'block',
'{"blockId":"hero-with-background-image","title":"Altyapı Tasarımı Çözümleri","subtitle":"Yol, köprü ve altyapı projeleri için güçlü modelleme araçları.","backgroundImage":"https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1600&auto=format&fit=crop","imageHint":"infrastructure design"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/infrastructure-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"🌐","iconType":"emoji","iconBackground":true,"title":"Altyapı Mühendisliği","content":"Kentsel altyapı projeleri için kapsamlı çözümler.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/infrastructure-design/infrastructure-engineering","enableHoverEffect":true}',
1, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/infrastructure-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"🛣️","iconType":"emoji","iconBackground":true,"title":"Yol ve Demiryolu Tasarımı","content":"Karayolu ve raylı sistem altyapısı için gelişmiş araçlar.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/infrastructure-design/road-railway-design","enableHoverEffect":true}',
2, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/infrastructure-design'), 'block',
'{"blockId":"special-feature-card-single","icon":"🌉","iconType":"emoji","iconBackground":true,"title":"Köprü Tasarımı","content":"Parametrik köprü modelleme ve mühendislik çözümleri.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/infrastructure-design/bridge-design","enableHoverEffect":true}',
3, NOW(), NOW());

-- ===== 7. solutions/construction-planning =====
INSERT INTO cms_pages (id, title, slug, description, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'İnşaat Planlaması Çözümleri',
  'solutions/construction-planning',
  'Prefabrik üretimden çelik detaylandırmaya kadar inşaatın her aşamasını optimize edin.',
  'published',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

DELETE FROM cms_components WHERE page_id = (SELECT id FROM cms_pages WHERE slug = 'solutions/construction-planning');

INSERT INTO cms_components (id, page_id, type, props, order_index, created_at, updated_at)
VALUES
(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/construction-planning'), 'block',
'{"blockId":"hero-with-background-image","title":"İnşaat Planlaması Çözümleri","subtitle":"Prefabrik üretimden çelik detaylandırmaya kadar inşaatın her aşamasını optimize edin.","backgroundImage":"https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=1600&auto=format&fit=crop","imageHint":"construction planning"}',
0, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/construction-planning'), 'block',
'{"blockId":"special-feature-card-single","icon":"🏭","iconType":"emoji","iconBackground":true,"title":"Prekast Üretim","content":"Prefabrik beton üretim süreçleri için otomasyon.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/construction-planning/precast-production","enableHoverEffect":true}',
1, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/construction-planning'), 'block',
'{"blockId":"special-feature-card-single","icon":"🔩","iconType":"emoji","iconBackground":true,"title":"Çelik Detaylandırma","content":"Çelik yapı fabrikasyonu için detaylı modelleme.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/construction-planning/steel-detailing","enableHoverEffect":true}',
2, NOW(), NOW()),

(gen_random_uuid(), (SELECT id FROM cms_pages WHERE slug = 'solutions/construction-planning'), 'block',
'{"blockId":"special-feature-card-single","icon":"🏗️","iconType":"emoji","iconBackground":true,"title":"Şantiye Planlama","content":"İnşaat sahası organizasyonu ve lojistik planlaması.","enableButton":true,"buttonText":"Detayları İncele","buttonHref":"/solutions/construction-planning/site-planning","enableHoverEffect":true}',
3, NOW(), NOW());

-- ===== Migration Complete =====
SELECT
  'Migration Complete!' as status,
  COUNT(*) as total_pages_migrated
FROM cms_pages
WHERE slug IN (
  'products/allplan',
  'products/building-infrastructure',
  'products/collaboration',
  'products/construction-planning',
  'solutions/building-design',
  'solutions/infrastructure-design',
  'solutions/construction-planning'
);

SELECT
  p.slug,
  p.title,
  COUNT(c.id) as component_count
FROM cms_pages p
LEFT JOIN cms_components c ON c.page_id = p.id
WHERE p.slug IN (
  'products/allplan',
  'products/building-infrastructure',
  'products/collaboration',
  'products/construction-planning',
  'solutions/building-design',
  'solutions/infrastructure-design',
  'solutions/construction-planning'
)
GROUP BY p.id, p.slug, p.title
ORDER BY p.slug;
