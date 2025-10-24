# FAQ Learning Entegrasyon - Hızlı Başlangıç Rehberi

**Tarih:** 24 Ekim 2025  
**Hedef:** FAQ Learning sayfalarını API'ye bağlama  
**Tahmini Süre:** 8-11 saat

---

## ✅ RESTORE POINT DURUMU

```bash
# Database kontrolü
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev -c "
SELECT COUNT(*) as users FROM users;
SELECT COUNT(*) as roles FROM roles;
SELECT COUNT(*) as user_roles FROM user_roles;"

# Beklenen: users=8, roles=10, user_roles=8
```

**Durum:** ✅ Restore point çalışıyor  
**Backend:** ✅ Port 9006'da aktif  
**Frontend:** ✅ Port 9003'te aktif  
**Dashboard:** ✅ API entegrasyonu tamamlandı

---

## 🎯 YAPILACAKLAR ÖZETİ

### Tamamlandı (58%)
- ✅ Dashboard API entegrasyonu
- ✅ FAQ Learning Service oluşturuldu
- ✅ Backend endpoint'lerin çoğu hazır

### Yapılacak (42%)
1. ⏳ **AI Provider Controller syntax düzeltmeleri** (30 dk)
2. ⏳ **Review Queue entegrasyonu** (1 saat)
3. ⏳ **AI Provider Service oluştur** (1 saat)
4. ⏳ **Providers sayfası entegrasyonu** (2 saat)
5. ⏳ **Settings service metodları** (30 dk)
6. ⏳ **Settings sayfası entegrasyonu** (2 saat)
7. ⏳ **Test ve doğrulama** (2-3 saat)

---

## 🚀 ADIM ADIM UYGULAMA

### ADIM 1: AI Provider Controller Düzeltmeleri (30 dk)

**Dosya:** `apps/backend/src/modules/faq-learning/controllers/ai-provider.controller.ts`

**Sorun:** Line 48'de syntax hatası
```typescript
// YANLIŞ (Line 48):
message: string: string;

// DOĞRU:
message: string;
```

**Komutlar:**
```bash
cd apps/backend

# Dosyayı düzelt
code src/modules/faq-learning/controllers/ai-provider.controller.ts

# Build test
npm run build

# Başarılı olursa devam et
npm run start:dev
```

**Test:**
```bash
# Login
curl -X POST http://localhost:9006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aluplan.com","password":"Admin123!"}' \
  | jq -r '.access_token'

# Token'ı kaydet
TOKEN="<yukarıdaki_token>"

# Provider status test
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/ai-providers/status
```

---

### ADIM 2: Review Queue Entegrasyonu (1 saat)

**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/review/page.tsx`

**Değiştirilecek 3 Fonksiyon:**

#### 2.1 loadReviewQueue
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
    console.error('Error:', error);
    setReviewItems([]);
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.2 handleReview
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
    await loadReviewQueue();
  } catch (error) {
    console.error('Review failed:', error);
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.3 handleBulkAction
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
  } finally {
    setIsLoading(false);
  }
};
```

#### 2.4 Mock Verileri Kaldır
```typescript
// Bu satırları SİL:
const mockReviewItems = [
  // ... tüm mock data
];

// useEffect'i güncelle:
useEffect(() => {
  loadReviewQueue();
}, [currentPage, filters]);
```

**Test:**
```bash
# Frontend'i başlat
cd apps/frontend
npm run dev

# Browser'da test et:
# 1. http://localhost:9003/login
# 2. admin@aluplan.com / Admin123!
# 3. http://localhost:9003/admin/support/faq-learning/review
# 4. FAQ listesinin API'den geldiğini kontrol et
```

---

### ADIM 3: AI Provider Service Oluştur (1 saat)

**Yeni Dosya:** `apps/frontend/src/services/ai-provider.service.ts`

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

  static async getProviders(): Promise<AiProvider[]> {
    const response = await httpClient.get<{
      providers: any[];
    }>(`${this.BASE_URL}/status`);
    
    return response.providers.map(p => ({
      ...p,
      lastChecked: new Date(p.lastChecked)
    }));
  }

  static async updateConfig(
    providerId: string,
    config: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      timeout?: number;
    }
  ): Promise<{ success: boolean; message: string }> {
    return await httpClient.put(`${this.BASE_URL}/config`, {
      provider: providerId,
      config
    });
  }

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

  static async setDefault(providerId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return await httpClient.post(`${this.BASE_URL}/${providerId}/set-default`, {});
  }

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

**Komutlar:**
```bash
cd apps/frontend

# Dosyayı oluştur
touch src/services/ai-provider.service.ts

# Yukarıdaki kodu yapıştır
code src/services/ai-provider.service.ts
```

---

### ADIM 4: Providers Sayfası Entegrasyonu (2 saat)

**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/providers/page.tsx`

**Değişiklikler:**

#### 4.1 Mock Verileri Kaldır
```typescript
// SİL:
const mockProviders = [
  // ... tüm mock data
];
```

#### 4.2 State ve Load Fonksiyonu Ekle
```typescript
const [providers, setProviders] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);

const loadProviders = async () => {
  setIsLoading(true);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    const data = await AiProviderService.getProviders();
    setProviders(data);
  } catch (error) {
    console.error('Error:', error);
    setProviders([]);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  loadProviders();
}, []);
```

#### 4.3 Test Provider Fonksiyonu
```typescript
const handleTestProvider = async (providerId: string) => {
  setTestingProvider(providerId);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    const result = await AiProviderService.testProvider(providerId, testPrompt);
    setTestResults(prev => ({ ...prev, [providerId]: result }));
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    setTestingProvider(null);
  }
};
```

#### 4.4 Config Update Fonksiyonu
```typescript
const handleSaveConfig = async () => {
  if (!editingProvider) return;
  setIsSaving(true);
  try {
    const { AiProviderService } = await import('@/services/ai-provider.service');
    await AiProviderService.updateConfig(editingProvider.id, editedConfig);
    setIsConfigModalOpen(false);
    await loadProviders();
  } catch (error) {
    console.error('Config update failed:', error);
  } finally {
    setIsSaving(false);
  }
};
```

---

### ADIM 5: Settings Service Metodları (30 dk)

**Dosya:** `apps/frontend/src/services/faq-learning.service.ts`

**Eklenecek Metodlar:**

```typescript
// FaqLearningService class'ına ekle:

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

static async updateConfig(config: {
  configKey: string;
  configValue: any;
  description?: string;
  category?: string;
}): Promise<{ success: boolean; message: string }> {
  return await httpClient.put(`${this.BASE_URL}/config`, config);
}

static async resetConfigSection(sectionKey: string): Promise<{
  success: boolean;
  message: string;
}> {
  return await httpClient.post(`${this.BASE_URL}/config/reset/${sectionKey}`, {});
}
```

---

### ADIM 6: Settings Sayfası Entegrasyonu (2 saat)

**Dosya:** `apps/frontend/src/app/admin/support/faq-learning/settings/page.tsx`

**Değişiklikler:**

#### 6.1 Mock Config Kaldır ve Load Fonksiyonu
```typescript
// SİL:
const mockConfigSections = [
  // ... tüm mock data
];

// EKLE:
const [configSections, setConfigSections] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);

const loadConfig = async () => {
  setIsLoading(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    const data = await FaqLearningService.getConfig();
    
    // Group by category
    const grouped = groupConfigsByCategory(data.configurations);
    setConfigSections(grouped);
  } catch (error) {
    console.error('Error:', error);
    setConfigSections([]);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  loadConfig();
}, []);
```

#### 6.2 Save Config Fonksiyonu
```typescript
const handleSaveConfig = async () => {
  setIsSaving(true);
  try {
    const { FaqLearningService } = await import('@/services/faq-learning.service');
    
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
    alert('Ayarlar kaydedildi');
  } catch (error) {
    console.error('Save failed:', error);
  } finally {
    setIsSaving(false);
  }
};
```

---

## 🧪 TEST KONTROL LİSTESİ

### Backend Testleri
```bash
# 1. Build test
cd apps/backend
npm run build

# 2. Server başlat
npm run start:dev

# 3. Login ve token al
curl -X POST http://localhost:9006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aluplan.com","password":"Admin123!"}' \
  | jq -r '.access_token'

TOKEN="<token>"

# 4. Dashboard test
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/faq-learning/dashboard

# 5. Review queue test
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:9006/api/review/queue?page=1&limit=10"

# 6. Provider status test
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/ai-providers/status

# 7. Config test
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:9006/api/faq-learning/config
```

### Frontend Testleri
```
1. Login
   ✓ http://localhost:9003/login
   ✓ admin@aluplan.com / Admin123!

2. Dashboard
   ✓ http://localhost:9003/admin/support/faq-learning
   ✓ Stats gösteriliyor
   ✓ Start/Stop butonları çalışıyor

3. Review Queue
   ✓ http://localhost:9003/admin/support/faq-learning/review
   ✓ FAQ listesi API'den geliyor
   ✓ Filtreleme çalışıyor
   ✓ Review modal açılıyor
   ✓ Approve/Reject çalışıyor

4. Providers
   ✓ http://localhost:9003/admin/support/faq-learning/providers
   ✓ Provider listesi API'den geliyor
   ✓ Test butonu çalışıyor
   ✓ Config modal açılıyor

5. Settings
   ✓ http://localhost:9003/admin/support/faq-learning/settings
   ✓ Config sections API'den geliyor
   ✓ Save butonu çalışıyor
   ✓ Reset çalışıyor
```

---

## 🐛 SORUN GİDERME

### Backend Başlamıyor
```bash
# Port kontrolü
lsof -i :9006
kill -9 <PID>

# Dependencies
cd apps/backend
rm -rf node_modules
npm install

# Build
npm run build
```

### Frontend Başlamıyor
```bash
# Port kontrolü
lsof -i :9003

# Dependencies
cd apps/frontend
rm -rf node_modules .next
npm install
```

### API Çağrıları Çalışmıyor
```bash
# Backend log kontrol
tail -f apps/backend/backend.log

# Browser console kontrol
# F12 > Network tab

# CORS hatası varsa backend .env kontrol:
CORS_ORIGINS=http://localhost:9003
```

### Database Bağlantı Hatası
```bash
# Database kontrolü
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev -c "SELECT 1"

# Docker kontrol
docker ps | grep postgres

# Restart
docker-compose restart postgres
```

---

## 📊 İLERLEME TAKİBİ

### Checklist

- [ ] **Adım 1:** AI Provider Controller düzeltildi (30 dk)
- [ ] **Adım 2:** Review Queue entegre edildi (1 saat)
- [ ] **Adım 3:** AI Provider Service oluşturuldu (1 saat)
- [ ] **Adım 4:** Providers sayfası entegre edildi (2 saat)
- [ ] **Adım 5:** Settings service metodları eklendi (30 dk)
- [ ] **Adım 6:** Settings sayfası entegre edildi (2 saat)
- [ ] **Test:** Tüm sayfalar test edildi (2 saat)

### Milestone'lar

- [x] **M1:** Dashboard API entegrasyonu (100%)
- [ ] **M2:** Review Queue entegrasyonu (70% → 100%)
- [ ] **M3:** Providers entegrasyonu (23% → 100%)
- [ ] **M4:** Settings entegrasyonu (20% → 100%)
- [ ] **M5:** Tüm testler tamamlandı (0% → 100%)

---

## 📞 YARDIM

### Dokümantasyon
- `FAQ_LEARNING_INTEGRATION_TODO.md` - Detaylı TODO listesi
- `PROJECT_STRUCTURE_ANALYSIS.md` - Proje yapısı analizi
- `FAQ_LEARNING_API_INTEGRATION_PLAN.md` - API entegrasyon planı
- `RESTORE_POINT_2025_10_24.md` - Restore point

### Test Kullanıcıları
```
Admin:    admin@aluplan.com    / Admin123!
Support:  support@aluplan.com  / Support123!
```

### Önemli Komutlar
```bash
# Backend
cd apps/backend && npm run start:dev

# Frontend
cd apps/frontend && npm run dev

# Database
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev

# Logs
tail -f apps/backend/backend.log
```

---

**Başarılar! 🚀**

**Son Güncelleme:** 24 Ekim 2025  
**Hazırlayan:** Kiro AI Assistant
