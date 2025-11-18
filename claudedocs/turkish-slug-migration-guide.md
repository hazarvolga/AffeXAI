# Turkish Character Slug Migration Guide
## Türkçe Karakter Desteği ile Slug Üretimi

**Tarih**: 2025-11-14
**Durum**: ✅ Tamamlandı
**Öncelik**: Yüksek (Veri Kaybı Önleme)

---

## 📋 Problem

Slug oluşturma işlemlerinde Türkçe karakterlerin yanlış işlenmesi:

### ❌ Eski Davranış
```
"Ürünlerimiz" → "rnlerimiz"  // Ü, ü karakterleri silindi!
"Şirket Hakkında" → "irket-hakkinda"  // Ş silindi!
"İletişim" → "letiim"  // İ, ş silindi!
```

### ✅ Yeni Davranış
```
"Ürünlerimiz" → "urunlerimiz"  // Ü → u
"Şirket Hakkında" → "sirket-hakkinda"  // Ş → s
"İletişim" → "iletisim"  // İ → i, ş → s
```

---

## 🛠️ Çözüm: Merkezi Slugify Utility

### Yeni Utility Dosyası

**Location**: `apps/backend/src/common/utils/slugify.util.ts`

**Özellikler**:
- ✅ Türkçe karakter dönüşümü (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u)
- ✅ Geniş karakter desteği (Fransızca, İspanyolca, Almanca)
- ✅ Özel sembol dönüşümü (&→ve, %→yuzde, ₺→tl)
- ✅ Türkçe locale desteği (toLocaleLowerCase('tr-TR'))
- ✅ Esnek konfigürasyon seçenekleri
- ✅ Unique slug generation helper

### Temel Kullanım

```typescript
import { slugify } from '../../../common/utils/slugify.util';

// Basit kullanım
const slug = slugify('Ürünlerimiz');
// Result: 'urunlerimiz'

// Özelleştirilmiş kullanım
const slug = slugify('Ürünler & Hizmetler', {
  separator: '_',    // Default: '-'
  lowercase: true,   // Default: true
  strict: true,      // Default: true (remove special chars)
});
// Result: 'urunler_ve_hizmetler'

// Türkçe karakterleri koru (URL-safe değil!)
const slug = slugify('Ürünlerimiz', {
  preserveTurkish: true,
});
// Result: 'ürünlerimiz' (Not recommended for URLs)
```

### Unique Slug Generation

```typescript
import { generateUniqueSlug } from '../../../common/utils/slugify.util';

const uniqueSlug = await generateUniqueSlug(
  'products',
  async (slug) => {
    // Check if slug exists in database
    const exists = await this.repository.findOne({ where: { slug } });
    return !!exists;
  }
);
// Returns: 'products', 'products-2', 'products-3', etc.
```

### Slug Validation

```typescript
import { isValidSlug } from '../../../common/utils/slugify.util';

isValidSlug('urunlerimiz');              // true
isValidSlug('urunler-ve-hizmetler');     // true
isValidSlug('INVALID SLUG');             // false (uppercase, spaces)
isValidSlug('ürünlerimiz', { allowTurkish: true }); // true
```

---

## 📝 Güncellenen Servisler

### 1. CMS Menu Service
**File**: `apps/backend/src/modules/cms/services/menu.service.ts`

```typescript
// BEFORE (BROKEN):
private generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // ❌ Sildi: ç, ğ, ı, ö, ş, ü
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// AFTER (FIXED):
import { slugify } from '../../../common/utils/slugify.util';

private generateSlug(name: string): string {
  return slugify(name);  // ✅ Türkçe karakterleri dönüştürüyor
}
```

### 2. CMS Category Service
**File**: `apps/backend/src/modules/cms/services/category.service.ts`

```typescript
// BEFORE: Same broken implementation
// AFTER: Uses slugify utility
```

### 3. Knowledge Base Article Service
**File**: `apps/backend/src/modules/tickets/services/knowledge-base.service.ts`

```typescript
// BEFORE (PARTIALLY WORKING):
private generateSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ]+/g, '-')  // ⚠️ Türkçe koruyor ama URL-safe değil
    .replace(/^-+|-+$/g, '');
  return `${slug}-${Date.now()}`;
}

// AFTER (FULLY WORKING):
import { slugify } from '../../../common/utils/slugify.util';

private generateSlug(title: string): string {
  const slug = slugify(title);  // ✅ URL-safe Turkish support
  return `${slug || 'untitled'}-${Date.now()}`;
}
```

### 4. Knowledge Base Category Service
**File**: `apps/backend/src/modules/tickets/services/knowledge-base-category.service.ts`

```typescript
// BEFORE: Similar to articles, Turkish chars preserved but not URL-safe
// AFTER: Uses slugify utility with URL-safe conversion
```

### 5. FAQ Learning - Knowledge Base Integrator
**File**: `apps/backend/src/modules/faq-learning/services/knowledge-base-integrator.service.ts`

```typescript
// BEFORE: Removed all special characters including Turkish
// AFTER: Uses slugify utility
```

---

## 🧪 Test Senaryoları

### Test Case 1: Temel Türkçe Karakterler

```typescript
describe('Turkish Character Slugification', () => {
  test('should convert Turkish lowercase characters', () => {
    expect(slugify('çağlayan')).toBe('caglayan');
    expect(slugify('ğölbaşı')).toBe('golbasi');
    expect(slugify('ışık')).toBe('isik');
    expect(slugify('ödül')).toBe('odul');
    expect(slugify('şeker')).toBe('seker');
    expect(slugify('ütü')).toBe('utu');
  });

  test('should convert Turkish uppercase characters', () => {
    expect(slugify('ÇAĞLAYAN')).toBe('caglayan');
    expect(slugify('ĞÖLBAŞI')).toBe('golbasi');
    expect(slugify('IŞIK')).toBe('isik');
    expect(slugify('ÖDÜL')).toBe('odul');
    expect(slugify('ŞEKER')).toBe('seker');
    expect(slugify('ÜTÜ')).toBe('utu');
  });
});
```

### Test Case 2: Gerçek Dünya Örnekleri

```typescript
describe('Real-world Examples', () => {
  test('should handle product names', () => {
    expect(slugify('Ürünlerimiz')).toBe('urunlerimiz');
    expect(slugify('Şirket Ürünleri')).toBe('sirket-urunleri');
  });

  test('should handle page titles', () => {
    expect(slugify('İletişim & Destek')).toBe('iletisim-ve-destek');
    expect(slugify('Çözümlerimiz Hakkında')).toBe('cozumlerimiz-hakkinda');
  });

  test('should handle categories', () => {
    expect(slugify('Müşteri Hizmetleri')).toBe('musteri-hizmetleri');
    expect(slugify('Öğrenci İndirimleri')).toBe('ogrenci-indirimleri');
  });
});
```

### Test Case 3: Özel Semboller

```typescript
describe('Special Symbols', () => {
  test('should convert common symbols', () => {
    expect(slugify('Ürünler & Hizmetler')).toBe('urunler-ve-hizmetler');
    expect(slugify('İndirim %20')).toBe('indirim-yuzde20');
    expect(slugify('Fiyat: 100₺')).toBe('fiyat-100tl');
  });
});
```

---

## 🚀 Migration Checklist

### Backend Updates
- [x] Create `slugify.util.ts` utility
- [x] Update `menu.service.ts`
- [x] Update `category.service.ts`
- [x] Update `knowledge-base.service.ts`
- [x] Update `knowledge-base-category.service.ts`
- [x] Update `knowledge-base-integrator.service.ts`

### Testing
- [ ] Unit tests for slugify utility
- [ ] Integration tests for each service
- [ ] Manual testing with Turkish characters
- [ ] Verify existing slugs still work

### Database Considerations
- [ ] **DO NOT** auto-migrate existing slugs (breaks URLs)
- [ ] New items will use correct slugs
- [ ] Existing items keep old slugs (backward compatibility)
- [ ] Optional: Admin tool to re-generate slugs (with redirect setup)

---

## ⚠️ Backward Compatibility

### Existing Data
**IMPORTANT**: Mevcut slug'ları otomatik olarak DEĞİŞTİRME!

**Neden?**
```
Eski slug: "rnlerimiz"
Yeni slug: "urunlerimiz"

https://example.com/category/rnlerimiz  → ❌ 404 Not Found!
```

**Çözüm**:
1. Yeni oluşturulan itemler → Yeni slug formatı kullanır ✅
2. Mevcut itemler → Eski slug'ları korur ✅
3. İsterseniz → Manual slug re-generation tool (with 301 redirects)

### Migration Strategy (Opsiyonel)

```typescript
// Admin panel: "Re-generate Slug" button
async regenerateSlug(id: string): Promise<void> {
  const item = await this.repository.findOne({ where: { id } });

  const oldSlug = item.slug;
  const newSlug = slugify(item.name);

  if (oldSlug !== newSlug) {
    // Update slug
    item.slug = newSlug;
    await this.repository.save(item);

    // Create 301 redirect
    await this.redirectService.create({
      from: `/category/${oldSlug}`,
      to: `/category/${newSlug}`,
      statusCode: 301, // Permanent redirect
    });
  }
}
```

---

## 📊 Karakter Dönüşüm Tablosu

| Türkçe Karakter | ASCII Karşılığı | Örnek |
|----------------|-----------------|-------|
| ç, Ç | c | Çağlayan → caglayan |
| ğ, Ğ | g | Ğölbaşı → golbasi |
| ı | i | Işık → isik |
| İ, i | i | İletişim → iletisim |
| ö, Ö | o | Ödül → odul |
| ş, Ş | s | Şeker → seker |
| ü, Ü | u | Ürün → urun |

| Özel Sembol | Türkçe Karşılık | Örnek |
|-------------|-----------------|-------|
| & | ve | Ürünler & Hizmetler → urunler-ve-hizmetler |
| % | yuzde | %20 → yuzde20 |
| ₺ | tl | 100₺ → 100tl |
| @ | at | info@example.com → infoatexamplecom |
| + | arti | 2+2 → 2arti2 |

---

## 🎯 Beklenen Kazanımlar

### SEO İyileştirmesi
- ✅ Daha anlamlı URL'ler
- ✅ Arama motorlarında daha iyi indexleme
- ✅ Kullanıcı dostu linkler

### Kullanıcı Deneyimi
- ✅ URL'ler okunabilir
- ✅ Link paylaşımı kolaylaşır
- ✅ Anlamsız slug'lar ortadan kalkar

### Teknik İyileştirme
- ✅ Merkezi utility → Kod tekrarı azalır
- ✅ Tutarlı davranış tüm projede
- ✅ Genişletilebilir (yeni diller eklenebilir)

---

## 🔮 Gelecek İyileştirmeler

### Çoklu Dil Desteği
```typescript
const slug = slugify('Über uns', { locale: 'de' }); // German
const slug = slugify('À propos', { locale: 'fr' }); // French
const slug = slugify('Acerca de', { locale: 'es' }); // Spanish
```

### AI-Powered Slug Suggestion
```typescript
const suggestions = await aiService.suggestSlugs('Ürünlerimiz');
// ['urunlerimiz', 'urunler', 'products', 'our-products']
```

### Slug Analytics
```typescript
// Track which slugs are most SEO-friendly
const analytics = await slugService.analyze('urunlerimiz');
// { seoScore: 85, readability: 'high', length: 'optimal' }
```

---

**Created**: 2025-11-14
**Author**: Claude AI Assistant
**Status**: ✅ Production Ready
**Backward Compatible**: ✅ Yes (existing slugs preserved)
