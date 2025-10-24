# FAQ Learning Sayfaları - API Entegrasyon Planı

## 📋 Genel Durum

Tüm FAQ Learning sayfalarında mock veriler kullanılıyor. Backend API'leri mevcut ancak frontend'den çağrılmıyor.

## 🎯 Entegre Edilmesi Gereken Sayfalar

### 1. Dashboard (`/admin/support/faq-learning/page.tsx`)

**Mock Veriler:**
- `stats`: totalFaqs, newFaqsToday, pendingReview, averageConfidence, processingStatus
- `providers`: AI sağlayıcı durumları
- `recentActivity`: Son aktiviteler
- Öğrenme ilerlemesi (Chat/Ticket/Kullanıcı önerileri)
- Kalite metrikleri (Yüksek/Orta/Düşük güven dağılımı)

**Gerekli API Endpoints:**
```typescript
GET /api/faq-learning/dashboard
Response: {
  stats: DashboardStats,
  providers: ProviderStatus[],
  recentActivity: RecentActivity[]
}

POST /api/faq-learning/pipeline/start
POST /api/faq-learning/pipeline/stop
```

**Backend Controller:** `faq-learning.controller.ts`
- ✅ `getDashboardStats()` - Mevcut
- ❌ `startPipeline()` - Eksik
- ❌ `stopPipeline()` - Eksik

---

### 2. Review Queue (`/admin/support/faq-learning/review/page.tsx`)

**Mock Veriler:**
- `reviewItems`: İnceleme bekleyen FAQ listesi (2 adet mock)
- Stats: İnceleme bekleyen, onaylanan, ortalama güven
- Filtreleme ve pagination

**Gerekli API Endpoints:**
```typescript
GET /api/faq-learning/review/queue?page=1&status=pending_review&search=...
Response: {
  items: FaqReviewItem[],
  total: number,
  page: number,
  totalPages: number
}

POST /api/faq-learning/review/:id/approve
POST /api/faq-learning/review/:id/reject
POST /api/faq-learning/review/:id/edit
POST /api/faq-learning/review/bulk-action
```

**Backend Controller:** `review-management.controller.ts`
- ✅ `getReviewQueue()` - Mevcut
- ✅ `approveFaq()` - Mevcut
- ✅ `rejectFaq()` - Mevcut
- ✅ `updateFaq()` - Mevcut
- ❌ `bulkAction()` - Eksik

---

### 3. AI Providers (`/admin/support/faq-learning/providers/page.tsx`)

**Mock Veriler:**
- `providers`: OpenAI, Anthropic, Google AI (3 adet mock)
- Her provider için: status, config, performance, limits
- Test sonuçları

**Gerekli API Endpoints:**
```typescript
GET /api/faq-learning/providers
Response: AiProvider[]

PUT /api/faq-learning/providers/:id/config
Body: { apiKey, model, temperature, maxTokens, timeout }

POST /api/faq-learning/providers/:id/test
Body: { testPrompt }
Response: TestResult

POST /api/faq-learning/providers/:id/set-default

POST /api/faq-learning/providers/test-all
Body: { testPrompt }
Response: TestResult[]
```

**Backend Controller:** `ai-provider.controller.ts`
- ✅ `getProviders()` - Mevcut
- ✅ `updateProviderConfig()` - Mevcut
- ✅ `testProvider()` - Mevcut
- ❌ `setDefaultProvider()` - Eksik
- ❌ `testAllProviders()` - Eksik

---

### 4. Settings (`/admin/support/faq-learning/settings/page.tsx`)

**Mock Veriler:**
- 7 kategori konfigürasyon (thresholds, recognition, processing, quality, sources, categories, advanced)
- Her kategori için birden fazla ayar

**Gerekli API Endpoints:**
```typescript
GET /api/faq-learning/config
Response: ConfigSection[]

PUT /api/faq-learning/config
Body: ConfigSection[]

POST /api/faq-learning/config/reset/:sectionKey
```

**Backend Controller:** `faq-learning.controller.ts`
- ✅ `getConfig()` - Mevcut
- ✅ `updateConfig()` - Mevcut
- ❌ `resetConfigSection()` - Eksik

---

## 🔧 İmplementasyon Adımları

### Faz 1: Backend API Tamamlama (Öncelik: Yüksek)

1. **Eksik Endpoint'leri Ekle**
   - `startPipeline()` ve `stopPipeline()` - faq-learning.controller.ts
   - `bulkAction()` - review-management.controller.ts
   - `setDefaultProvider()` ve `testAllProviders()` - ai-provider.controller.ts
   - `resetConfigSection()` - faq-learning.controller.ts

2. **Mevcut Endpoint'leri Test Et**
   - Dashboard stats endpoint'ini test et
   - Review queue endpoint'ini test et
   - Provider management endpoint'lerini test et
   - Config endpoint'lerini test et

### Faz 2: Frontend API Service Oluşturma (Öncelik: Yüksek)

1. **API Service Dosyası Oluştur**
   ```typescript
   // apps/frontend/src/services/faq-learning.service.ts
   export class FaqLearningService {
     // Dashboard
     getDashboardStats()
     startPipeline()
     stopPipeline()
     
     // Review
     getReviewQueue(filters)
     approveFaq(id, reason)
     rejectFaq(id, reason)
     editFaq(id, data)
     bulkAction(action, ids)
     
     // Providers
     getProviders()
     updateProviderConfig(id, config)
     testProvider(id, prompt)
     testAllProviders(prompt)
     setDefaultProvider(id)
     
     // Config
     getConfig()
     updateConfig(config)
     resetConfigSection(sectionKey)
   }
   ```

### Faz 3: Frontend Sayfa Güncellemeleri (Öncelik: Orta)

1. **Dashboard Sayfası**
   - Mock data yerine `FaqLearningService.getDashboardStats()` kullan
   - Pipeline kontrol butonlarını API'ye bağla
   - Real-time refresh için polling ekle

2. **Review Queue Sayfası**
   - Mock data yerine `FaqLearningService.getReviewQueue()` kullan
   - Review actions'ları API'ye bağla
   - Bulk actions'ı implement et
   - Pagination ve filtering'i API'ye bağla

3. **Providers Sayfası**
   - Mock data yerine `FaqLearningService.getProviders()` kullan
   - Config modal'ı API'ye bağla
   - Test functionality'sini API'ye bağla
   - Default provider seçimini API'ye bağla

4. **Settings Sayfası**
   - Mock data yerine `FaqLearningService.getConfig()` kullan
   - Save functionality'sini API'ye bağla
   - Reset functionality'sini API'ye bağla

### Faz 4: Error Handling ve Loading States (Öncelik: Orta)

1. **Error Handling**
   - API hatalarını yakala ve kullanıcıya göster
   - Retry mekanizması ekle
   - Fallback UI'lar ekle

2. **Loading States**
   - Skeleton loaders ekle
   - Progress indicators ekle
   - Optimistic updates ekle

### Faz 5: Testing ve Validation (Öncelik: Düşük)

1. **Integration Tests**
   - Her endpoint için test yaz
   - Error scenarios'ları test et
   - Edge cases'leri test et

2. **E2E Tests**
   - Kullanıcı akışlarını test et
   - Form validations'ları test et

---

## 📊 Öncelik Matrisi

| Sayfa | Mock Veri Miktarı | API Hazırlık | Öncelik | Tahmini Süre |
|-------|-------------------|--------------|---------|--------------|
| Dashboard | Yüksek | %80 | 🔴 Yüksek | 4 saat |
| Review Queue | Orta | %90 | 🔴 Yüksek | 3 saat |
| Providers | Yüksek | %70 | 🟡 Orta | 5 saat |
| Settings | Çok Yüksek | %80 | 🟡 Orta | 4 saat |

**Toplam Tahmini Süre:** 16 saat

---

## 🚀 Hızlı Başlangıç

### 1. Backend Eksik Endpoint'leri Ekle (2 saat)
```bash
# faq-learning.controller.ts'e ekle
@Post('pipeline/start')
@Post('pipeline/stop')

# review-management.controller.ts'e ekle
@Post('review/bulk-action')

# ai-provider.controller.ts'e ekle
@Post('providers/:id/set-default')
@Post('providers/test-all')

# faq-learning.controller.ts'e ekle
@Post('config/reset/:sectionKey')
```

### 2. Frontend Service Oluştur (1 saat)
```bash
# Service dosyası oluştur
touch apps/frontend/src/services/faq-learning.service.ts
```

### 3. Dashboard'u Entegre Et (4 saat)
- API service'i import et
- Mock data'yı kaldır
- API calls ekle
- Error handling ekle

---

## ✅ Başarı Kriterleri

- [ ] Tüm mock veriler kaldırıldı
- [ ] Tüm API endpoint'leri çalışıyor
- [ ] Error handling implement edildi
- [ ] Loading states eklendi
- [ ] Real-time data refresh çalışıyor
- [ ] Kullanıcı aksiyonları (approve, reject, edit) çalışıyor
- [ ] Bulk operations çalışıyor
- [ ] Provider management çalışıyor
- [ ] Configuration management çalışıyor

---

## 📝 Notlar

1. **Authentication:** Tüm API çağrılarında JWT token kullanılmalı
2. **Error Messages:** Türkçe hata mesajları kullanılmalı
3. **Loading States:** Her API çağrısı için loading state olmalı
4. **Caching:** Dashboard stats için 30 saniye cache kullanılabilir
5. **Real-time:** WebSocket veya polling ile real-time updates eklenebilir

---

## 🔗 İlgili Dosyalar

**Backend:**
- `apps/backend/src/modules/faq-learning/controllers/faq-learning.controller.ts`
- `apps/backend/src/modules/faq-learning/controllers/review-management.controller.ts`
- `apps/backend/src/modules/faq-learning/controllers/ai-provider.controller.ts`

**Frontend:**
- `apps/frontend/src/app/admin/support/faq-learning/page.tsx`
- `apps/frontend/src/app/admin/support/faq-learning/review/page.tsx`
- `apps/frontend/src/app/admin/support/faq-learning/providers/page.tsx`
- `apps/frontend/src/app/admin/support/faq-learning/settings/page.tsx`

**Yeni Oluşturulacak:**
- `apps/frontend/src/services/faq-learning.service.ts`
