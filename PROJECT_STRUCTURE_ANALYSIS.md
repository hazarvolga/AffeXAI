# Affexai Proje Yapısı Analizi

**Tarih:** 24 Ekim 2025  
**Proje:** Affexai - FAQ Learning System  
**Analiz Kapsamı:** Backend & Frontend Kod Yapısı

---

## 📁 GENEL PROJE YAPISI

```
Affexai/
├── apps/
│   ├── backend/          # NestJS Backend (Port: 9006)
│   └── frontend/         # Next.js Frontend (Port: 9003)
├── packages/
│   └── shared-types/     # Paylaşılan TypeScript tipleri
├── docker/               # Docker compose konfigürasyonları
└── .kiro/
    └── specs/            # Özellik spesifikasyonları
        ├── dynamic-kb-categories/
        ├── kb-dynamic-categories/
        └── self-learning-faq/
```

---

## 🔧 BACKEND YAPISI (NestJS)

### Genel Mimari
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL (Port: 5434)
- **ORM:** TypeORM
- **Cache:** Redis (Port: 6380)
- **Storage:** MinIO/S3 (Port: 9007)
- **API Port:** 9006

### Modül Yapısı

```
apps/backend/src/
├── modules/
│   ├── faq-learning/           # ⭐ FAQ Learning Sistemi
│   │   ├── controllers/
│   │   │   ├── faq-learning.controller.ts
│   │   │   ├── review-management.controller.ts
│   │   │   ├── ai-provider.controller.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── monitoring.controller.ts
│   │   ├── services/
│   │   │   ├── faq-learning.service.ts
│   │   │   ├── faq-ai.service.ts
│   │   │   ├── review-queue.service.ts
│   │   │   ├── pattern-recognition.service.ts
│   │   │   ├── batch-processor.service.ts
│   │   │   ├── confidence-calculator.service.ts
│   │   │   ├── feedback-processor.service.ts
│   │   │   ├── faq-generator.service.ts
│   │   │   ├── chat-faq-integration.service.ts
│   │   │   ├── knowledge-base-integrator.service.ts
│   │   │   ├── real-time-processor.service.ts
│   │   │   ├── scheduled-learning-jobs.service.ts
│   │   │   ├── learning-analytics.service.ts
│   │   │   ├── monitoring-alerting.service.ts
│   │   │   ├── audit-logging.service.ts
│   │   │   ├── data-privacy.service.ts
│   │   │   ├── data-normalizer.service.ts
│   │   │   ├── chat-data-extractor.service.ts
│   │   │   ├── ticket-data-extractor.service.ts
│   │   │   └── ai-providers/
│   │   │       ├── openai.provider.ts
│   │   │       └── anthropic.provider.ts
│   │   ├── entities/
│   │   │   ├── learned-faq-entry.entity.ts
│   │   │   ├── learning-pattern.entity.ts
│   │   │   └── faq-learning-config.entity.ts
│   │   ├── interfaces/
│   │   │   ├── ai-provider.interface.ts
│   │   │   ├── faq-ai.interface.ts
│   │   │   ├── pattern-recognition.interface.ts
│   │   │   ├── confidence-calculation.interface.ts
│   │   │   └── data-extraction.interface.ts
│   │   └── faq-learning.module.ts
│   │
│   ├── tickets/                # Destek Sistemi
│   │   ├── controllers/
│   │   │   ├── tickets.controller.ts
│   │   │   ├── knowledge-base.controller.ts
│   │   │   └── knowledge-base-category.controller.ts
│   │   ├── services/
│   │   │   ├── tickets.service.ts
│   │   │   ├── chat-ai.service.ts
│   │   │   ├── knowledge-base.service.ts
│   │   │   └── knowledge-base-category.service.ts
│   │   └── entities/
│   │       └── knowledge-base-category.entity.ts
│   │
│   ├── auth/                   # Kimlik Doğrulama
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── permissions.guard.ts
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   └── auth.service.ts
│   │
│   ├── users/                  # Kullanıcı Yönetimi
│   │   ├── enums/
│   │   │   └── user-role.enum.ts
│   │   └── users.service.ts
│   │
│   ├── roles/                  # Rol Yönetimi
│   ├── certificates/           # Sertifika Sistemi
│   ├── cms/                    # İçerik Yönetimi
│   ├── email-marketing/        # E-posta Pazarlama
│   ├── events/                 # Etkinlik Yönetimi
│   ├── mail/                   # Mail Servisi
│   ├── media/                  # Medya Yönetimi
│   ├── notifications/          # Bildirimler
│   ├── analytics/              # Analitik
│   ├── platform-integration/   # Platform Entegrasyonları
│   ├── settings/               # Ayarlar
│   ├── shared/                 # Paylaşılan Servisler
│   └── user-ai-preferences/    # AI Tercihleri
│
├── database/
│   ├── entities/               # Veritabanı Entity'leri
│   ├── migrations/             # Veritabanı Migration'ları
│   │   ├── 1761200000000-CreateFaqLearningTables.ts
│   │   ├── 1761200000001-SeedFaqLearningConfig.ts
│   │   ├── 1761134726000-CreateKnowledgeBaseCategoriesTable.ts
│   │   └── 1761134727000-CreateKnowledgeBaseArticlesTable.ts
│   └── seeds/                  # Seed Data
│       └── seed-users-roles.ts
│
├── config/                     # Konfigürasyon
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── redis.config.ts
│   └── bull.config.ts
│
└── lib/                        # Yardımcı Kütüphaneler
    └── permissions.ts
```

### FAQ Learning Backend Özellikleri

#### Controllers (API Endpoints)
1. **faq-learning.controller.ts** - Ana FAQ Learning endpoint'leri
   - Dashboard istatistikleri
   - Pipeline kontrol (start/stop)
   - Batch işlemler
   - Analitik
   - Konfigürasyon yönetimi
   - AI provider yönetimi

2. **review-management.controller.ts** - İnceleme yönetimi
   - Review queue
   - FAQ onaylama/reddetme
   - Bulk review işlemleri
   - Review istatistikleri
   - Review history

3. **ai-provider.controller.ts** - AI Provider yönetimi
   - Provider status
   - Provider switching
   - Provider testing
   - Model yönetimi
   - Kullanım istatistikleri
   - Health check

4. **analytics.controller.ts** - Analitik endpoint'leri
5. **monitoring.controller.ts** - İzleme endpoint'leri

#### Services (İş Mantığı)
1. **Core Services:**
   - `faq-learning.service.ts` - Ana FAQ learning mantığı
   - `faq-ai.service.ts` - AI entegrasyonu
   - `review-queue.service.ts` - İnceleme kuyruğu yönetimi

2. **AI & Pattern Recognition:**
   - `pattern-recognition.service.ts` - Pattern tanıma
   - `confidence-calculator.service.ts` - Güven skoru hesaplama
   - `faq-generator.service.ts` - FAQ oluşturma

3. **Data Processing:**
   - `batch-processor.service.ts` - Toplu işlemler
   - `data-normalizer.service.ts` - Veri normalizasyonu
   - `chat-data-extractor.service.ts` - Chat verisi çıkarma
   - `ticket-data-extractor.service.ts` - Ticket verisi çıkarma

4. **Integration:**
   - `chat-faq-integration.service.ts` - Chat entegrasyonu
   - `knowledge-base-integrator.service.ts` - KB entegrasyonu
   - `real-time-processor.service.ts` - Gerçek zamanlı işleme

5. **Analytics & Monitoring:**
   - `learning-analytics.service.ts` - Öğrenme analitikleri
   - `monitoring-alerting.service.ts` - İzleme ve uyarılar
   - `audit-logging.service.ts` - Denetim logları

6. **AI Providers:**
   - `openai.provider.ts` - OpenAI entegrasyonu
   - `anthropic.provider.ts` - Anthropic entegrasyonu

#### Entities (Veritabanı Modelleri)
1. **learned_faq_entries** - Öğrenilen FAQ'lar
   - question, answer, confidence
   - status (pending_review, approved, rejected, published)
   - source (chat, ticket)
   - metadata (keywords, category, etc.)

2. **learning_patterns** - Öğrenme pattern'leri
   - pattern_type, pattern_data
   - confidence_score, usage_count

3. **faq_learning_config** - Konfigürasyon
   - config_key, config_value
   - category, description

---

## 🎨 FRONTEND YAPISI (Next.js)

### Genel Mimari
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **API Client:** Custom HTTP Client
- **Port:** 9003

### Sayfa Yapısı

```
apps/frontend/src/
├── app/
│   ├── admin/
│   │   └── support/
│   │       └── faq-learning/           # ⭐ FAQ Learning Sayfaları
│   │           ├── page.tsx            # Dashboard (✅ API entegreli)
│   │           ├── review/
│   │           │   └── page.tsx        # Review Queue (⏳ 70%)
│   │           ├── providers/
│   │           │   └── page.tsx        # AI Providers (⏳ 35%)
│   │           └── settings/
│   │               └── page.tsx        # Settings (⏳ 28%)
│   │
│   ├── help/                           # Yardım Sayfaları
│   │   ├── page.tsx                    # Ana yardım sayfası
│   │   └── category/
│   │       └── [categoryId]/
│   │           └── page.tsx            # Kategori detay
│   │
│   └── portal/                         # Kullanıcı Portalı
│
├── services/                           # API Servisleri
│   ├── faq-learning.service.ts         # ⭐ FAQ Learning API (✅ Hazır)
│   └── ai-provider.service.ts          # AI Provider API (⏳ Oluşturulacak)
│
├── components/
│   ├── admin/
│   │   └── collapsible-sidebar.tsx     # Admin sidebar
│   ├── knowledge-base/
│   │   ├── CategoryManagement.tsx
│   │   ├── CategoryForm.tsx
│   │   └── CategoryList.tsx
│   └── chat/
│       └── chat-box.tsx                # Chat bileşeni
│
└── lib/
    ├── api/
    │   └── http-client.ts              # HTTP istemcisi
    └── permissions.ts                  # Yetki kontrolü
```

### FAQ Learning Frontend Özellikleri

#### Sayfalar

1. **Dashboard (`/admin/support/faq-learning/page.tsx`)** ✅ 100%
   - **Durum:** API entegrasyonu tamamlandı
   - **Özellikler:**
     - Gerçek zamanlı istatistikler
     - Provider durumları
     - Son aktiviteler
     - Pipeline kontrol butonları
     - 30 saniyede bir otomatik refresh
   - **API Calls:**
     - `FaqLearningService.getDashboardStats()`
     - `FaqLearningService.startPipeline()`
     - `FaqLearningService.stopPipeline()`

2. **Review Queue (`/admin/support/faq-learning/review/page.tsx`)** ⏳ 70%
   - **Durum:** Service hazır, 3 fonksiyon güncellemesi gerekli
   - **Özellikler:**
     - FAQ listesi (şu an mock)
     - Filtreleme ve arama
     - Pagination
     - Review modal (approve/reject/edit)
     - Bulk actions
   - **Yapılacaklar:**
     - `loadReviewQueue()` - API çağrısı ekle
     - `handleReview()` - API çağrısı ekle
     - `handleBulkAction()` - API çağrısı ekle
     - Mock verileri kaldır

3. **Providers (`/admin/support/faq-learning/providers/page.tsx`)** ⏳ 35%
   - **Durum:** Backend hazır, frontend service eksik
   - **Özellikler:**
     - Provider listesi (şu an mock)
     - Provider status
     - Test functionality
     - Config modal
     - Set default provider
   - **Yapılacaklar:**
     - `AiProviderService` oluştur
     - Mock verileri kaldır
     - API entegrasyonu yap

4. **Settings (`/admin/support/faq-learning/settings/page.tsx`)** ⏳ 28%
   - **Durum:** Backend hazır, frontend service eksik
   - **Özellikler:**
     - 7 kategori konfigürasyon (şu an mock)
     - Threshold ayarları
     - Pattern recognition ayarları
     - Processing ayarları
     - Quality ayarları
   - **Yapılacaklar:**
     - Config metodlarını service'e ekle
     - Mock verileri kaldır
     - API entegrasyonu yap

#### Services

1. **faq-learning.service.ts** ✅ Hazır
   ```typescript
   class FaqLearningService {
     // Dashboard
     getDashboardStats()
     startPipeline()
     stopPipeline()
     getPipelineStatus()
     getHealthStatus()
     
     // Review Queue
     getReviewQueue(filters)
     reviewFaq(faqId, action, data)
     bulkReview(faqIds, action, reason)
     getReviewStats()
   }
   ```

2. **ai-provider.service.ts** ⏳ Oluşturulacak
   ```typescript
   class AiProviderService {
     // Providers
     getProviders()
     updateConfig(providerId, config)
     testProvider(providerId, testPrompt)
     setDefault(providerId)
     testAllProviders(testPrompt)
     switchProvider(providerId)
   }
   ```

---

## 🔗 API ENDPOINT'LER

### FAQ Learning Endpoints

#### Dashboard & Pipeline
```
GET    /api/faq-learning/dashboard          # Dashboard verileri
POST   /api/faq-learning/pipeline/start     # Pipeline başlat
POST   /api/faq-learning/pipeline/stop      # Pipeline durdur
GET    /api/faq-learning/status              # Pipeline durumu
GET    /api/faq-learning/health              # Sistem sağlığı
```

#### Review Management
```
GET    /api/review/queue                     # Review kuyruğu
POST   /api/review/:faqId/review             # FAQ inceleme
POST   /api/review/bulk-review               # Toplu inceleme
GET    /api/review/queue/stats               # İnceleme istatistikleri
GET    /api/review/:faqId/history            # İnceleme geçmişi
```

#### AI Providers
```
GET    /api/ai-providers/status              # Provider durumları
POST   /api/ai-providers/switch              # Provider değiştir
POST   /api/ai-providers/test                # Provider test
POST   /api/ai-providers/:id/set-default     # Varsayılan ayarla (⏳ Eksik)
POST   /api/ai-providers/test-all            # Tümünü test (⏳ Eksik)
PUT    /api/ai-providers/config              # Config güncelle
GET    /api/ai-providers/models              # Mevcut modeller
GET    /api/ai-providers/usage-stats         # Kullanım istatistikleri
POST   /api/ai-providers/health-check        # Health check
```

#### Configuration
```
GET    /api/faq-learning/config              # Tüm konfigürasyon
PUT    /api/faq-learning/config              # Konfigürasyon güncelle
POST   /api/faq-learning/config/reset/:key   # Section sıfırla (⏳ Eksik)
```

#### Analytics
```
GET    /api/faq-learning/analytics           # Analitik verileri
```

---

## 🗄️ VERİTABANI YAPISI

### FAQ Learning Tabloları

#### learned_faq_entries
```sql
CREATE TABLE learned_faq_entries (
  id UUID PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  confidence DECIMAL(5,2),
  status VARCHAR(50),  -- pending_review, approved, rejected, published
  source VARCHAR(50),  -- chat, ticket
  source_id VARCHAR(255),
  category VARCHAR(255),
  keywords TEXT[],
  usage_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by UUID,
  published_at TIMESTAMP
);
```

#### learning_patterns
```sql
CREATE TABLE learning_patterns (
  id UUID PRIMARY KEY,
  pattern_type VARCHAR(100),
  pattern_data JSONB,
  confidence_score DECIMAL(5,2),
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### faq_learning_config
```sql
CREATE TABLE faq_learning_config (
  id UUID PRIMARY KEY,
  config_key VARCHAR(255) UNIQUE,
  config_value JSONB,
  description TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Knowledge Base Tabloları

#### knowledge_base_categories
```sql
CREATE TABLE knowledge_base_categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  icon VARCHAR(100),
  parent_id UUID,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### knowledge_base_articles
```sql
CREATE TABLE knowledge_base_articles (
  id UUID PRIMARY KEY,
  category_id UUID,
  title VARCHAR(500),
  content TEXT,
  summary TEXT,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🔐 YETKİLENDİRME SİSTEMİ

### Roller (10 Adet)
```typescript
enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  CUSTOMER = 'customer',
  SUPPORT = 'support',
  SUPPORT_MANAGER = 'support_manager',  // Alias
  SUPPORT_AGENT = 'support_agent',      // Alias
  VIEWER = 'viewer',
  STUDENT = 'student',
  SUBSCRIBER = 'subscriber',
  MARKETING_MANAGER = 'marketing_manager',
  SOCIAL_MEDIA_MANAGER = 'social_media_manager',
  CONTENT_MANAGER = 'content_manager'
}
```

### FAQ Learning Yetkileri

| Endpoint | Admin | Support Manager | Support Agent | Diğer |
|----------|-------|-----------------|---------------|-------|
| Dashboard | ✅ | ✅ | ✅ | ❌ |
| Start/Stop Pipeline | ✅ | ✅ | ❌ | ❌ |
| Review Queue | ✅ | ✅ | ✅ | ❌ |
| Review FAQ | ✅ | ✅ | ✅ | ❌ |
| Bulk Review | ✅ | ✅ | ❌ | ❌ |
| AI Provider Config | ✅ | ❌ | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ |

---

## 🔄 VERİ AKIŞI

### FAQ Learning Pipeline

```
1. Data Extraction
   ├── Chat Data Extractor
   │   └── Extract conversations from chat system
   └── Ticket Data Extractor
       └── Extract resolved tickets

2. Data Normalization
   └── Normalize and clean extracted data

3. Pattern Recognition
   └── Identify common questions and patterns

4. FAQ Generation (AI)
   ├── OpenAI Provider
   ├── Anthropic Provider
   └── Generate FAQ with confidence score

5. Confidence Calculation
   └── Calculate confidence based on multiple factors

6. Review Queue
   ├── Pending Review (confidence < threshold)
   └── Auto-Publish (confidence >= threshold)

7. Knowledge Base Integration
   └── Publish approved FAQs to KB
```

### Review Workflow

```
FAQ Entry (pending_review)
   ↓
Review Queue
   ↓
Reviewer Action
   ├── Approve → Status: approved
   ├── Reject → Status: rejected
   ├── Edit → Update & Status: approved
   └── Publish → Status: published → KB
```

---

## 🧩 ENTEGRASYON NOKTALARI

### 1. Chat System ↔ FAQ Learning
- Chat conversations → Data extraction
- FAQ suggestions → Chat responses
- Real-time learning from chat

### 2. Ticket System ↔ FAQ Learning
- Resolved tickets → Data extraction
- FAQ suggestions → Ticket responses
- Pattern recognition from tickets

### 3. Knowledge Base ↔ FAQ Learning
- Approved FAQs → KB articles
- KB search → FAQ suggestions
- Category mapping

### 4. AI Providers ↔ FAQ Learning
- OpenAI → FAQ generation
- Anthropic → FAQ generation
- Provider switching
- Model selection

---

## 📊 PERFORMANS VE ÖLÇEKLENEBİLİRLİK

### Caching Strategy
- **Redis:** Session, API responses
- **Database:** Query optimization, indexes
- **Frontend:** SWR, React Query (potansiyel)

### Batch Processing
- **Scheduled Jobs:** Cron jobs for periodic learning
- **Queue System:** Bull/BullMQ for async processing
- **Rate Limiting:** API rate limits

### Monitoring
- **Health Checks:** System health endpoints
- **Logging:** Audit logs, error logs
- **Analytics:** Usage statistics, performance metrics

---

## 🔧 GELIŞTIRME ORTAMI

### Backend
```bash
# Development
npm run start:dev

# Build
npm run build

# Test
npm run test

# Migration
npm run migration:run
npm run migration:revert

# Seed
npm run seed:users
```

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start
```

### Database
```bash
# Connect
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev

# Backup
pg_dump -h localhost -p 5434 -U postgres affexai_dev > backup.sql

# Restore
psql -h localhost -p 5434 -U postgres affexai_dev < backup.sql
```

---

## 📝 KOD KALİTESİ VE STANDARTLAR

### TypeScript
- Strict mode enabled
- Type safety enforced
- Interface-based design

### Code Organization
- **Backend:** Module-based (NestJS)
- **Frontend:** Feature-based (Next.js App Router)
- **Shared:** Monorepo with shared types

### Naming Conventions
- **Files:** kebab-case (user-service.ts)
- **Classes:** PascalCase (UserService)
- **Functions:** camelCase (getUserById)
- **Constants:** UPPER_SNAKE_CASE (API_BASE_URL)

### Error Handling
- **Backend:** HttpException with proper status codes
- **Frontend:** Try-catch with user-friendly messages
- **Logging:** Structured logging with context

---

## 🚀 DEPLOYMENT

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Seed data loaded
- [ ] API keys configured
- [ ] CORS settings updated
- [ ] SSL certificates installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented

### Environment Variables
```env
# Backend
DATABASE_URL=postgresql://...
JWT_SECRET=...
REDIS_HOST=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# Frontend
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_APP_URL=...
```

---

## 📚 DOKÜMANTASYON

### Mevcut Dökümanlar
- `FAQ_LEARNING_API_INTEGRATION_PLAN.md` - API entegrasyon planı
- `FAQ_INTEGRATION_SUMMARY.md` - Entegrasyon özeti
- `RESTORE_POINT_2025_10_24.md` - Restore point
- `AI_PROVIDER_INTEGRATION_ANALYSIS.md` - AI provider analizi
- `ROLE_PERMISSION_ANALYSIS.md` - Rol ve yetki analizi
- `.kiro/specs/self-learning-faq/` - Özellik spesifikasyonları
  - `requirements.md` - Gereksinimler
  - `design.md` - Tasarım
  - `tasks.md` - Görevler
  - `API_DOCUMENTATION.md` - API dokümantasyonu
  - `ADMIN_GUIDE.md` - Admin rehberi
  - `DEPLOYMENT_GUIDE.md` - Deployment rehberi

---

## 🎯 ÖNEMLİ NOTLAR

### Güvenlik
- JWT token authentication
- Role-based access control (RBAC)
- API key management
- SQL injection prevention (TypeORM)
- XSS protection

### Performans
- Database indexing
- Query optimization
- Caching strategy
- Lazy loading
- Code splitting

### Bakım
- Regular dependency updates
- Database backups
- Log rotation
- Performance monitoring
- Error tracking

---

**Son Güncelleme:** 24 Ekim 2025  
**Hazırlayan:** Kiro AI Assistant  
**Durum:** Aktif Geliştirme
