# FAQ Learning API Entegrasyon - TODO Listesi

**Tarih:** 24 Ekim 2025  
**Durum:** Restore Point Doğrulandı ✅  
**Proje:** Affexai - FAQ Learning System Integration

---

## 📊 Restore Point Durumu

✅ **Database:** 8 kullanıcı, 10 rol, 8 user_roles kaydı mevcut  
✅ **Backend:** Port 9006'da çalışıyor  
✅ **Frontend:** Port 9003'te çalışıyor  
✅ **Dashboard:** API entegrasyonu tamamlandı ve çalışıyor  
⚠️ **Review/Providers/Settings:** Mock veri kullanıyor (entegrasyon gerekli)

---

## 🎯 Genel Bakış

### Tamamlanan İşler (58%)
- ✅ Dashboard sayfası API entegrasyonu (100%)
- ✅ Frontend FAQ Learning Service oluşturuldu
- ✅ Backend endpoint'lerin çoğu hazır
- ✅ Database tabloları ve migration'lar hazır

### Yapılması Gerekenler (42%)
- ⏳ Review Queue sayfası entegrasyonu (70% - sadece 3 fonksiyon güncellemesi gerekli)
- ⏳ AI Providers sayfası entegrasyonu (35% - service ve sayfa güncellemesi gerekli)
- ⏳ Settings sayfası entegrasyonu (28% - service ve sayfa güncellemesi gerekli)
- ⏳ Backend'de eksik endpoint'ler (birkaç endpoint eksik)

---

## 📋 BACKEND GÖREVLER

### 1. Backend Eksik Endpoint'leri Tamamla (Öncelik: YÜKSEK)
**Tahmini Süre:** 2 saat

#### 1.1 AI Provider Controller Düzeltmeleri
**Dosya:** `apps/backend/src/modules/faq-learning/controllers/ai-provider.controller.ts`

**Sorunlar:**
- ❌ Syntax hataları var (line 48: `message: string: string;` - çift `:` hatası)
- ❌ TypeScript compilation hataları (186 adet)
- ❌ `setDefaultProvider()` endpoint eksik
- ❌ `testAllProviders()` endpoint eksik

**Yapılacaklar:**
```typescript
// 1. Line 48'deki syntax hatasını düzelt:
// YANLIŞ: message: string: string;
// DOĞRU: message: string;

// 2. Eksik endpoint'leri ekle:
@Post(':id/set-default')
@Roles(UserRole.ADMIN)
async setDefaultProvider(@Param('id') providerId: string) {
  // Implementation
}

@Post('test-all')
@Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
async testAllProviders(@Body() dto: { testPrompt?: string }) {
  // Implementation
}
```

#### 1.2 FAQ Learning Controller Eksikleri
**Dosya:** `apps/backend/src/modules/faq-learning/controllers/faq-learning.controller.ts`

**Yapılacaklar:**
```typescript
// Config reset endpoint ekle:
@Post('config/reset/:sectionKey')
@Roles(UserRole.ADMIN)
async resetConfigSection(@Param('sectionKey') sectionKey: string) {
  // Reset specific config section to defaults
  return {
    success: true,
    message: `Configuration section ${sectionKey} reset to defaults`
  };
}
```

#### 1.3 Review Management Controller Eksikleri
**Dosya:** `apps/backend/src/modules/faq-learning/controllers/review-management.controller.ts`

**Durum:** ✅ Tüm endpoint'ler mevcut (bulk-review dahil)

---

## 📱 FRONTEND GÖREVLER

### 2. Review Queue Sayfası Entegrasyonu (Öncelik: YÜKSEK)
**Tahmini Süre:** 1 saat  
**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/review/page.tsx`

**Durum:** Service hazır, sadece 3 fonksiyon güncellemesi gerekli

#### 2.1 loadReviewQueue Fonksiyonunu Güncelle
```typescript
const loadReviewQueue = async () => {
  setIsLoading(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    const data = await FaqLearningService.getReviewQueue({
      status: filters.status ? [filters.status] : undefined,
      page: currentPage,
      limit: 10
    });
    setReviewItems(data.items as any);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error('Error loading review queue:', error);
    setReviewItems([]);
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.2 handleReview Fonksiyonunu Güncelle
```typescript
const handleReview = async () => {
  if (!currentItem) return;
  
  setIsLoading(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    await FaqLearningService.reviewFaq(currentItem.id, reviewAction, {
      reason: reviewReason,
      editedAnswer: reviewAction === 'edit' ? editedAnswer : undefined,
      editedCategory: reviewAction === 'edit' ? editedCategory : undefined,
      editedKeywords: reviewAction === 'edit' ? editedKeywords : undefined
    });
    
    setIsReviewModalOpen(false);
    setCurrentItem(null);
    await loadReviewQueue();
  } catch (error) {
    console.error('Review failed:', error);
    alert('Review işlemi başarısız oldu');
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.3 handleBulkAction Fonksiyonunu Güncelle
```typescript
const handleBulkAction = async (action: 'approve' | 'reject') => {
  if (selectedItems.length === 0) return;
  
  setIsLoading(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    await FaqLearningService.bulkReview(selectedItems, action);
    
    setSelectedItems([]);
    await loadReviewQueue();
  } catch (error) {
    console.error('Bulk action failed:', error);
    alert('Toplu işlem başarısız oldu');
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.4 Mock Verileri Kaldır
```typescript
// Bu satırları SİL:
const mockReviewItems = [
  {
    id: '1',
    question: 'Allplan lisansımı nasıl yenileyebilirim?',
    // ... rest of mock data
  },
  // ...
];

// useEffect'te mock data yerine API çağrısı kullan:
useEffect(() => {
  loadReviewQueue();
}, [currentPage, filters]);
```

---

### 3. AI Providers Service Oluştur (Öncelik: ORTA)
**Tahmini Süre:** 1 saat  
**Dosya:** `apps/frontend/src/services/ai-provider.service.ts` (YENİ)

#### 3.1 Service Dosyası Oluştur
```typescript
/**
 * AI Provider Service
 * Handles all API calls for AI Provider management
 */

import { httpClient } from '@/lib/api/http-client';

export interface AiProvider {
  id: string;
  name: string;
  displayName: string;
  available: boolean;
  isDefault: boolean;
  config: {
    model: string;
    temperature: number;
    maxTokens: number;
    timeout: number;
  };
  performance: {
    averageResponseTime: number;
    successRate: number;
    totalRequests: number;
  };
  limits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  lastChecked: Date;
}

export class AiProviderService {
  private static readonly BASE_URL = '/ai-providers';

  /**
   * Get all AI providers
   */
  static async getProviders(): Promise<AiProvider[]> {
    const response = await httpClient.get<{
      providers: any[];
    }>(`${this.BASE_URL}/status`);
    
    return response.providers.map(p => ({
      ...p,
      lastChecked: new Date(p.lastChecked)
    }));
  }

  /**
   * Update provider configuration
   */
  static async updateConfig(
    providerId: string,
    config: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      timeout?: number;
    }
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return await httpClient.put(`${this.BASE_URL}/config`, {
      provider: providerId,
      config
    });
  }

  /**
   * Test a specific provider
   */
  static async testProvider(
    providerId: string,
    testPrompt?: string
  ): Promise<{
    success: boolean;
    available: boolean;
    responseTime?: number;
    error?: string;
  }> {
    return await httpClient.post(`${this.BASE_URL}/test`, {
      provider: providerId,
      testPrompt
    });
  }

  /**
   * Set default provider
   */
  static async setDefault(providerId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return await httpClient.post(`${this.BASE_URL}/${providerId}/set-default`, {});
  }

  /**
   * Test all providers
   */
  static async testAllProviders(testPrompt?: string): Promise<{
    results: Array<{
      provider: string;
      success: boolean;
      responseTime?: number;
      error?: string;
    }>;
  }> {
    return await httpClient.post(`${this.BASE_URL}/test-all`, {
      testPrompt
    });
  }

  /**
   * Switch to a different provider
   */
  static async switchProvider(providerId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return await httpClient.post(`${this.BASE_URL}/switch`, {
      provider: providerId
    });
  }
}
```

---

### 4. Providers Sayfası Entegrasyonu (Öncelik: ORTA)
**Tahmini Süre:** 2 saat  
**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/providers/page.tsx`

#### 4.1 Mock Verileri Kaldır ve API Entegrasyonu
```typescript
// Mock providers'ı SİL
const mockProviders = [
  // ...
];

// State'leri güncelle
const [providers, setProviders] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);

// Load providers fonksiyonu ekle
const loadProviders = async () => {
  setIsLoading(true);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    const data = await AiProviderService.getProviders();
    setProviders(data);
  } catch (error) {
    console.error('Error loading providers:', error);
    setProviders([]);
  } finally {
    setIsLoading(false);
  }
};

// useEffect ekle
useEffect(() => {
  loadProviders();
}, []);
```

#### 4.2 Test Provider Fonksiyonunu Güncelle
```typescript
const handleTestProvider = async (providerId: string) => {
  setTestingProvider(providerId);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    const result = await AiProviderService.testProvider(providerId, testPrompt);
    
    setTestResults(prev => ({
      ...prev,
      [providerId]: result
    }));
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    setTestingProvider(null);
  }
};
```

#### 4.3 Config Update Fonksiyonunu Güncelle
```typescript
const handleSaveConfig = async () => {
  if (!editingProvider) return;
  
  setIsSaving(true);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    await AiProviderService.updateConfig(editingProvider.id, editedConfig);
    
    setIsConfigModalOpen(false);
    setEditingProvider(null);
    await loadProviders();
  } catch (error) {
    console.error('Config update failed:', error);
    alert('Konfigürasyon güncellenemedi');
  } finally {
    setIsSaving(false);
  }
};
```

#### 4.4 Set Default Fonksiyonunu Ekle
```typescript
const handleSetDefault = async (providerId: string) => {
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    await AiProviderService.setDefault(providerId);
    await loadProviders();
  } catch (error) {
    console.error('Set default failed:', error);
    alert('Varsayılan provider ayarlanamadı');
  }
};
```

---

### 5. Settings Service Metodları Ekle (Öncelik: ORTA)
**Tahmini Süre:** 30 dakika  
**Dosya:** `apps/frontend/src/services/faq-learning.service.ts`

#### 5.1 Config Metodlarını Ekle
```typescript
// FaqLearningService class'ına ekle:

/**
 * Get all configuration sections
 */
static async getConfig(): Promise<{
  configurations: Array<{
    key: string;
    value: any;
    description?: string;
    category?: string;
    isActive: boolean;
    updatedAt: Date;
  }>;
}> {
  const response = await httpClient.get<{
    configurations: any[];
  }>(`${this.BASE_URL}/config`);
  
  return {
    configurations: response.configurations.map(c => ({
      ...c,
      updatedAt: new Date(c.updatedAt)
    }))
  };
}

/**
 * Update configuration
 */
static async updateConfig(config: {
  configKey: string;
  configValue: any;
  description?: string;
  category?: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  return await httpClient.put(`${this.BASE_URL}/config`, config);
}

/**
 * Reset configuration section to defaults
 */
static async resetConfigSection(sectionKey: string): Promise<{
  success: boolean;
  message: string;
}> {
  return await httpClient.post(`${this.BASE_URL}/config/reset/${sectionKey}`, {});
}
```

---

### 6. Settings Sayfası Entegrasyonu (Öncelik: ORTA)
**Tahmini Süre:** 2 saat  
**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/settings/page.tsx`

#### 6.1 Mock Config'i Kaldır ve API Entegrasyonu
```typescript
// Mock configSections'ı SİL
const mockConfigSections = [
  // ...
];

// State'leri güncelle
const [configSections, setConfigSections] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);

// Load config fonksiyonu ekle
const loadConfig = async () => {
  setIsLoading(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    const data = await FaqLearningService.getConfig();
    
    // Group configurations by category
    const grouped = groupConfigsByCategory(data.configurations);
    setConfigSections(grouped);
  } catch (error) {
    console.error('Error loading config:', error);
    setConfigSections([]);
  } finally {
    setIsLoading(false);
  }
};

// useEffect ekle
useEffect(() => {
  loadConfig();
}, []);
```

#### 6.2 Save Config Fonksiyonunu Güncelle
```typescript
const handleSaveConfig = async () => {
  setIsSaving(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    
    // Save each modified config
    for (const section of configSections) {
      for (const setting of section.settings) {
        if (setting.modified) {
          await FaqLearningService.updateConfig({
            configKey: setting.key,
            configValue: setting.value,
            description: setting.description,
            category: section.key
          });
        }
      }
    }
    
    await loadConfig();
    alert('Ayarlar başarıyla kaydedildi');
  } catch (error) {
    console.error('Save failed:', error);
    alert('Ayarlar kaydedilemedi');
  } finally {
    setIsSaving(false);
  }
};
```

#### 6.3 Reset Section Fonksiyonunu Güncelle
```typescript
const handleResetSection = async (sectionKey: string) => {
  if (!confirm(`${sectionKey} bölümünü varsayılan ayarlara sıfırlamak istediğinizden emin misiniz?`)) {
    return;
  }
  
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    await FaqLearningService.resetConfigSection(sectionKey);
    await loadConfig();
  } catch (error) {
    console.error('Reset failed:', error);
    alert('Sıfırlama başarısız oldu');
  }
};
```

---

## 🧪 TEST GÖREVLER

### 7. Backend Endpoint Testleri (Öncelik: ORTA)
**Tahmini Süre:** 1 saat

#### 7.1 AI Provider Controller'ı Düzelt ve Test Et
```bash
# 1. Syntax hatalarını düzelt
cd apps/backend
npm run build

# 2. Server'ı başlat
npm run start:dev

# 3. Test et
TOKEN="<access_token>"

# Provider status
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/ai-providers/status

# Test provider
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","testPrompt":"Test"}' \
  http://localhost:9006/api/ai-providers/test

# Set default
curl -X POST -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/ai-providers/openai/set-default
```

#### 7.2 Review Queue Endpoint'lerini Test Et
```bash
# Get review queue
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:9006/api/review/queue?page=1&limit=10"

# Review FAQ
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"approve","reason":"Looks good"}' \
  http://localhost:9006/api/review/<faq-id>/review

# Bulk review
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"faqIds":["id1","id2"],"action":"approve"}' \
  http://localhost:9006/api/review/bulk-review
```

#### 7.3 Config Endpoint'lerini Test Et
```bash
# Get config
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/faq-learning/config

# Update config
curl -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"configKey":"test","configValue":"value"}' \
  http://localhost:9006/api/faq-learning/config

# Reset section
curl -X POST -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/faq-learning/config/reset/thresholds
```

### 8. Frontend Integration Testleri (Öncelik: ORTA)
**Tahmini Süre:** 1 saat

#### 8.1 Review Queue Sayfası Testi
```
1. Login yap: admin@aluplan.com / Admin123!
2. Review Queue'ya git: /admin/support/faq-learning/review
3. Kontrol et:
   ✓ FAQ listesi API'den geliyor mu?
   ✓ Filtreleme çalışıyor mu?
   ✓ Pagination çalışıyor mu?
   ✓ Review modal açılıyor mu?
   ✓ Approve/Reject/Edit çalışıyor mu?
   ✓ Bulk actions çalışıyor mu?
```

#### 8.2 Providers Sayfası Testi
```
1. Providers sayfasına git: /admin/support/faq-learning/providers
2. Kontrol et:
   ✓ Provider listesi API'den geliyor mu?
   ✓ Status gösteriliyor mu?
   ✓ Test butonu çalışıyor mu?
   ✓ Config modal açılıyor mu?
   ✓ Config save çalışıyor mu?
   ✓ Set default çalışıyor mu?
```

#### 8.3 Settings Sayfası Testi
```
1. Settings sayfasına git: /admin/support/faq-learning/settings
2. Kontrol et:
   ✓ Config sections API'den geliyor mu?
   ✓ Settings değiştiriliyor mu?
   ✓ Save butonu çalışıyor mu?
   ✓ Reset section çalışıyor mu?
   ✓ Değişiklikler kaydediliyor mu?
```

---

## 🐛 BİLİNEN SORUNLAR VE ÇÖZÜMLER

### Sorun 1: AI Provider Controller Syntax Hataları
**Durum:** 186 TypeScript hatası  
**Sebep:** Line 48'de `message: string: string;` (çift `:`)  
**Çözüm:**
```typescript
// YANLIŞ:
message: string: string;

// DOĞRU:
message: string;
```

### Sorun 2: Provider Availability False Dönüyor
**Durum:** Tüm provider'lar "available: false"  
**Sebep:** API key'ler ayarlanmamış  
**Çözüm:**
```bash
# .env dosyasına ekle:
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
```

### Sorun 3: Review Queue Mock Data
**Durum:** Sayfa mock veri gösteriyor  
**Sebep:** API çağrıları yapılmıyor  
**Çözüm:** Yukarıdaki 2.1-2.4 adımlarını uygula

### Sorun 4: Timestamp Conversion
**Durum:** Date string'leri Date object'e çevrilmiyor  
**Sebep:** API response'ları string dönüyor  
**Çözüm:** Service'lerde `new Date()` ile convert et (zaten yapılmış)

---

## 📊 İLERLEME TAKİBİ

### Genel İlerleme: 58%

| Bileşen | Backend | Frontend Service | Sayfa Entegrasyonu | Test | Toplam |
|---------|---------|------------------|-------------------|------|--------|
| Dashboard | ✅ 100% | ✅ 100% | ✅ 100% | ✅ 100% | **100%** |
| Review Queue | ✅ 100% | ✅ 100% | ⏳ 40% | ⏳ 0% | **70%** |
| Providers | ⚠️ 90% | ⏳ 0% | ⏳ 0% | ⏳ 0% | **23%** |
| Settings | ✅ 80% | ⏳ 0% | ⏳ 0% | ⏳ 0% | **20%** |

### Milestone'lar

- [x] **Milestone 1:** Dashboard API entegrasyonu (100%)
- [ ] **Milestone 2:** Review Queue entegrasyonu (70%)
- [ ] **Milestone 3:** Providers entegrasyonu (23%)
- [ ] **Milestone 4:** Settings entegrasyonu (20%)
- [ ] **Milestone 5:** Tüm testler tamamlandı (0%)

---

## ⏱️ TAHMİNİ SÜRELER

### Hızlı Kazanımlar (2-3 saat)
1. ✅ AI Provider Controller syntax hatalarını düzelt (30 dk)
2. ✅ Review Queue 3 fonksiyon güncellemesi (1 saat)
3. ✅ AI Provider Service oluştur (1 saat)

### Orta Vadeli (4-5 saat)
4. ⏳ Providers sayfası entegrasyonu (2 saat)
5. ⏳ Settings service metodları (30 dk)
6. ⏳ Settings sayfası entegrasyonu (2 saat)

### Test ve Doğrulama (2-3 saat)
7. ⏳ Backend endpoint testleri (1 saat)
8. ⏳ Frontend integration testleri (1 saat)
9. ⏳ End-to-end testler (1 saat)

**TOPLAM TAHMİNİ SÜRE:** 8-11 saat

---

## 🚀 BAŞLANGIÇ SIRASI (ÖNERİLEN)

### Gün 1 - Hızlı Kazanımlar (3 saat)
```
09:00-09:30  ✅ AI Provider Controller syntax düzeltmeleri
09:30-10:30  ✅ Review Queue entegrasyonu
10:30-11:30  ✅ AI Provider Service oluştur
11:30-12:00  ✅ Test ve doğrulama
```

### Gün 2 - Providers Entegrasyonu (3 saat)
```
09:00-11:00  ⏳ Providers sayfası entegrasyonu
11:00-11:30  ⏳ Settings service metodları
11:30-12:00  ⏳ Test ve doğrulama
```

### Gün 3 - Settings ve Final (3 saat)
```
09:00-11:00  ⏳ Settings sayfası entegrasyonu
11:00-11:30  ⏳ Tüm sayfaları test et
11:30-12:00  ⏳ Dokümantasyon güncelle
```

---

## ✅ BAŞARI KRİTERLERİ

### Backend
- [ ] Tüm endpoint'ler çalışıyor
- [ ] Syntax hataları yok
- [ ] TypeScript compilation başarılı
- [ ] API testleri geçiyor

### Frontend
- [ ] Tüm mock veriler kaldırıldı
- [ ] API çağrıları çalışıyor
- [ ] Error handling implement edildi
- [ ] Loading states çalışıyor
- [ ] Kullanıcı aksiyonları çalışıyor

### Integration
- [ ] Dashboard real-time data gösteriyor
- [ ] Review queue çalışıyor
- [ ] Provider management çalışıyor
- [ ] Configuration save/load çalışıyor
- [ ] Bulk operations çalışıyor

---

## 📞 YARDIM VE KAYNAKLAR

### Dokümantasyon
- `FAQ_LEARNING_API_INTEGRATION_PLAN.md` - Detaylı plan
- `FAQ_INTEGRATION_SUMMARY.md` - Hızlı özet
- `RESTORE_POINT_2025_10_24.md` - Restore point
- `AI_PROVIDER_INTEGRATION_ANALYSIS.md` - AI provider analizi

### Önemli Dosyalar
**Backend:**
- `apps/backend/src/modules/faq-learning/controllers/`
- `apps/backend/src/modules/faq-learning/services/`

**Frontend:**
- `apps/frontend/src/services/faq-learning.service.ts`
- `apps/frontend/src/app/admin/support/faq-learning/`

### Test Kullanıcıları
```
Admin:    admin@aluplan.com    / Admin123!
Support:  support@aluplan.com  / Support123!
```

### Komutlar
```bash
# Backend
cd apps/backend
npm run build
npm run start:dev

# Frontend
cd apps/frontend
npm run dev

# Database
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev

# Logs
tail -f apps/backend/backend.log
```

---

**Son Güncelleme:** 24 Ekim 2025  
**Hazırlayan:** Kiro AI Assistant  
**Durum:** Aktif - Restore Point Doğrulandı ✅
