-- Email Block Library Seed Data
-- 35+ blocks across 7 categories
-- Compatible with MJML email builder

-- STRUCTURE BLOCKS (6 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('one_column', 'structure', '1 Sütun', 'Tek sütunlu düzen', 'Layout', '{}', '{}', true, 1),
('two_column', 'structure', '2 Sütun', 'İki eşit sütunlu düzen', 'Columns', '{"leftWidth": "50%", "rightWidth": "50%"}', '{}', true, 2),
('three_column', 'structure', '3 Sütun', 'Üç eşit sütunlu düzen', 'Columns', '{"columnWidth": "33.33%"}', '{}', true, 3),
('two_column_sidebar', 'structure', '2 Sütun (Sidebar)', 'Ana içerik + kenar çubuğu', 'Sidebar', '{"mainWidth": "66.66%", "sidebarWidth": "33.33%"}', '{}', true, 4),
('spacer', 'structure', 'Boşluk', 'Dikey boşluk ekle', 'Space', '{"height": "20px"}', '{}', true, 5),
('divider', 'structure', 'Ayırıcı Çizgi', 'Yatay ayırıcı çizgi', 'Minus', '{}', '{"borderColor": "#dddddd", "borderWidth": "1px"}', true, 6);

-- CONTENT BLOCKS (5 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('heading', 'content', 'Başlık', 'H1, H2, H3 başlıklar', 'Heading', '{"text": "Başlık Metni", "level": "h1", "align": "left"}', '{"fontSize": "24px", "fontWeight": "bold", "color": "#333333"}', true, 10),
('text', 'content', 'Metin', 'Paragraf metni', 'Type', '{"text": "Paragraf metni buraya yazılacak", "align": "left"}', '{"fontSize": "14px", "color": "#333333", "lineHeight": "1.6"}', true, 11),
('button', 'content', 'Buton', 'CTA butonu', 'MousePointer', '{"text": "Tıklayın", "href": "#", "align": "center"}', '{"backgroundColor": "#0066cc", "color": "#ffffff", "borderRadius": "4px", "padding": "12px 24px"}', true, 12),
('list', 'content', 'Liste', 'Madde işaretli liste', 'List', '{"items": ["Madde 1", "Madde 2", "Madde 3"], "listType": "bullet"}', '{"fontSize": "14px", "color": "#333333"}', true, 13),
('quote', 'content', 'Alıntı', 'Alıntı bloğu', 'Quote', '{"text": "Alıntı metni", "author": "Yazar"}', '{"fontSize": "16px", "fontStyle": "italic", "borderLeft": "4px solid #0066cc", "paddingLeft": "16px"}', true, 14);

-- MEDIA BLOCKS (5 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('image', 'media', 'Resim', 'Tek resim', 'Image', '{"src": "https://via.placeholder.com/600x400", "alt": "Resim", "href": "", "align": "center"}', '{"width": "100%"}', true, 20),
('image_text', 'media', 'Resim + Metin', 'Yanyana resim ve metin', 'ImagePlus', '{"src": "https://via.placeholder.com/300x200", "alt": "Resim", "text": "Açıklama metni", "imagePosition": "left"}', '{"imageWidth": "40%", "textWidth": "60%"}', true, 21),
('image_group', 'media', 'Resim Grubu', 'Galeri düzeni', 'Images', '{"images": [{"src": "https://via.placeholder.com/200x200", "alt": "Resim 1"}, {"src": "https://via.placeholder.com/200x200", "alt": "Resim 2"}]}', '{"columns": 2}', true, 22),
('video', 'media', 'Video', 'Video embed (thumbnail + link)', 'Video', '{"thumbnailSrc": "https://via.placeholder.com/600x400", "videoUrl": "https://youtube.com/watch?v=xxx", "alt": "Video"}', '{}', true, 23),
('icon', 'media', 'İkon', 'İkon görseli', 'Star', '{"src": "https://via.placeholder.com/64x64", "alt": "İkon", "size": "64px"}', '{}', true, 24);

-- SOCIAL BLOCKS (3 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('social_links', 'social', 'Sosyal Medya Linkleri', 'Facebook, Twitter, Instagram ikonları', 'Share2', '{"links": [{"platform": "facebook", "url": "#"}, {"platform": "twitter", "url": "#"}, {"platform": "instagram", "url": "#"}]}', '{"iconSize": "32px"}', true, 30),
('social_share', 'social', 'Paylaş Butonları', 'Email içeriğini paylaşma butonları', 'Forward', '{"shareText": "Bu içeriği paylaş"}', '{}', true, 31),
('social_follow', 'social', 'Takip Et', 'Sosyal medya takip et çağrısı', 'UserPlus', '{"platform": "twitter", "handle": "@username", "followText": "Bizi takip edin"}', '{}', true, 32);

-- ECOMMERCE BLOCKS (4 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('product', 'ecommerce', 'Ürün Kartı', 'Tek ürün gösterimi', 'ShoppingCart', '{"name": "Ürün Adı", "price": "₺199", "image": "https://via.placeholder.com/300x300", "description": "Ürün açıklaması", "buttonText": "Satın Al", "buttonUrl": "#"}', '{}', true, 40),
('product_grid', 'ecommerce', 'Ürün Grid', 'Birden fazla ürün grid düzeni', 'Grid', '{"products": [{"name": "Ürün 1", "price": "₺199", "image": "https://via.placeholder.com/200x200"}, {"name": "Ürün 2", "price": "₺299", "image": "https://via.placeholder.com/200x200"}]}', '{"columns": 2}', true, 41),
('pricing_table', 'ecommerce', 'Fiyatlandırma Tablosu', 'Fiyat planları', 'DollarSign', '{"plans": [{"name": "Başlangıç", "price": "₺99/ay", "features": ["Özellik 1", "Özellik 2"]}]}', '{}', true, 42),
('coupon', 'ecommerce', 'Kupon Kodu', 'İndirim kuponu gösterimi', 'Ticket', '{"code": "INDIRIM20", "discount": "20% İndirim", "expiryText": "30 Haziran''a kadar geçerli"}', '{"backgroundColor": "#ffeb3b", "borderStyle": "dashed"}', true, 43);

-- INTERACTIVE BLOCKS (4 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('countdown', 'interactive', 'Geri Sayım', 'Zamanlayıcı (statik görsel)', 'Clock', '{"endDate": "2025-12-31", "text": "Kampanya bitiyor!"}', '{"fontSize": "24px", "fontWeight": "bold"}', true, 50),
('rating', 'interactive', 'Yıldız Puanı', 'Ürün/hizmet değerlendirmesi', 'Star', '{"rating": 5, "maxRating": 5, "showNumber": true}', '{"starColor": "#ffc107"}', true, 51),
('progress_bar', 'interactive', 'İlerleme Çubuğu', 'Hedef/başarı göstergesi', 'TrendingUp', '{"progress": 75, "total": 100, "label": "Hedefe %75 ulaştınız"}', '{"backgroundColor": "#e0e0e0", "fillColor": "#4caf50", "height": "20px"}', true, 52),
('accordion', 'interactive', 'Akordeon', 'SSS için genişleyebilir içerik', 'ChevronDown', '{"items": [{"title": "Soru 1", "content": "Cevap 1"}, {"title": "Soru 2", "content": "Cevap 2"}]}', '{}', true, 53);

-- SPECIAL BLOCKS (8 blocks)
INSERT INTO email_block_library (type, category, label, description, icon, default_properties, default_styles, is_active, sort_order) VALUES
('header', 'special', 'Email Başlığı', 'Logo + navigasyon başlık', 'Layout', '{"logoSrc": "https://via.placeholder.com/150x50", "logoAlt": "Logo", "showNav": true, "navLinks": [{"text": "Ana Sayfa", "url": "#"}, {"text": "Hakkımızda", "url": "#"}]}', '{"backgroundColor": "#ffffff", "padding": "20px"}', true, 60),
('footer', 'special', 'Email Altbilgisi', 'İletişim + sosyal + yasal', 'Layout', '{"companyName": "Şirket Adı", "address": "Adres", "unsubscribeText": "Abonelikten çık", "showSocial": true}', '{"backgroundColor": "#f5f5f5", "padding": "20px", "fontSize": "12px", "color": "#666666"}', true, 61),
('html_code', 'special', 'Özel HTML', 'Manuel HTML kodu', 'Code', '{"html": "<p>Özel HTML buraya</p>"}', '{}', true, 62),
('navigation', 'special', 'Navigasyon Menüsü', 'Yatay menü', 'Menu', '{"links": [{"text": "Link 1", "url": "#"}, {"text": "Link 2", "url": "#"}, {"text": "Link 3", "url": "#"}]}', '{"align": "center"}', true, 63),
('menu', 'special', 'Hamburger Menü', 'Mobil uyumlu menü', 'Menu', '{"links": [{"text": "Menü 1", "url": "#"}, {"text": "Menü 2", "url": "#"}]}', '{}', true, 64),
('logo', 'special', 'Logo', 'Şirket logosu', 'Image', '{"src": "https://via.placeholder.com/200x60", "alt": "Logo", "href": "/", "align": "center"}', '{"width": "200px"}', true, 65),
('survey', 'special', 'Anket/Oylama', 'Basit anket sorusu', 'MessageSquare', '{"question": "Ne düşünüyorsunuz?", "options": [{"text": "Mükemmel", "url": "#"}, {"text": "İyi", "url": "#"}, {"text": "Orta", "url": "#"}]}', '{}', true, 66),
('form', 'special', 'Form Alanı', 'Email içi basit form', 'FileText', '{"fields": [{"type": "text", "label": "İsim", "placeholder": "İsminizi girin"}], "buttonText": "Gönder", "actionUrl": "#"}', '{}', true, 67);

-- Verify insertion
SELECT category, COUNT(*) as block_count
FROM email_block_library
GROUP BY category
ORDER BY category;

SELECT COUNT(*) as total_blocks FROM email_block_library;
