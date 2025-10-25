# Affexai Project Memory
**Son Güncelleme**: 2025-10-25
**Amaç**: Oturum arası bilgi kaybını önlemek, yapılan iyileştirmeleri kaydetmek

---

## 🎯 Proje Genel Bakış

**Proje Adı**: Affexai
**Tür**: B2B SaaS Platform (Customer Support + AI Integration)
**Tech Stack**: NestJS (Backend), Next.js (Frontend), PostgreSQL, Redis, MinIO, Bull Queue

**Ana Modüller**:
- 👤 User Management (Multi-Role System)
- 🎫 Ticket/Support System
- 💬 Chat System (Live Chat + AI Bot)
- 📊 Analytics & Reporting
- 🎓 Events & Certificates
- 📚 Knowledge Sources (AI Training)
- 🏢 Company Management

---

## 👥 ROL SİSTEMİ (TAMAMLANDI - 2025-10-25)

### Mevcut Roller (10 adet):

#### Sistem Rolleri (isSystem: true):
1. **admin** - Tüm sistem yetkisi `["*"]`
2. **editor** - CMS, etkinlik, sertifika `["cms.*","events.*","certificates.*"]`
3. **customer** - Normal müşteri `["profile.*","events.view","certificates.view"]`
4. **support_team** - Destek yönetimi `["support.*","tickets.*","chat.*"]`
5. **viewer** - Sadece görüntüleme `["*.view"]`

#### İş Rolleri (isSystem: false):
6. **marketing_manager** - Kampanya & analitik `["marketing.*","campaigns.*","analytics.view","content.approve"]`
7. **social_media_manager** - Sosyal medya `["social.*","posts.*","engagement.*","community.*"]`
8. **content_creator** - İçerik oluşturma `["content.create","content.edit","media.upload"]`
9. **subscriber** - Haber bülteni `["newsletter.receive","content.view","events.view"]`
10. **partner** - İş ortağı `["api.access","partner.dashboard","integration.*"]`

### Multi-Role Desteği:
✅ Implementasyon tamamlandı
✅ `user_roles` junction table mevcut
✅ Primary role kavramı var (`isPrimary` field)

### Database Schema:
```sql
Table: roles
- id (UUID, PK)
- name (VARCHAR(100), UNIQUE)
- displayName (VARCHAR(100))
- description (TEXT)
- permissions (JSONB) -- Permission array
- isActive (BOOLEAN)
- isSystem (BOOLEAN) -- System roles silinmez
- createdAt, updatedAt (TIMESTAMP)

Table: user_roles (Many-to-Many)
- userId (UUID, FK)
- roleId (UUID, FK)
- isPrimary (BOOLEAN) -- Ana rol
- createdAt, updatedAt
```

### Permissions Pattern:
```
Format: "module.action" veya "module.*" veya "*"
Örnek: ["support.view", "support.create", "tickets.*", "*"]
```

---

## 📚 KNOWLEDGE SOURCES (YARIM KALDI - 2025-10-25)

### Durum:
⚠️ Backend kodu yazıldı ama test edilmedi
⚠️ PDF upload endpoint `/knowledge-sources/upload` eklendi
⚠️ Frontend integration tamamlandı ama çalışmıyor
❌ Database'e kayıt atılmıyor (4 döküman eklenmeye çalışıldı, 0 kaydedildi)

### Sorunlar:
1. Backend process eski kodla çalışıyor olabilir
2. Upload endpoint test edilmedi
3. Statistics kartları 0 gösteriyor

### Database Schema:
```sql
Table: company_knowledge_sources
- id, title, description
- sourceType (document|url|text)
- status (pending|processing|active|failed|archived)
- filePath, fileName, fileType, fileSize (documents için)
- url, lastScrapedAt (URLs için)
- extractedContent, summary, tags, keywords
- metadata (JSONB)
- usageCount, helpfulCount, averageRelevanceScore
- enableForFaqLearning, enableForChat (BOOLEAN)
- uploadedById (UUID FK -> users)
- archivedAt, archivedById
- createdAt, updatedAt
```

### Yapılacaklar:
- [ ] Backend restart ve test
- [ ] PDF upload test
- [ ] Statistics API test
- [ ] Frontend console logları kontrol

---

## 💬 CHAT SYSTEM

### Durum:
✅ Backend ChatModule implementasyonu var
❓ Frontend entegrasyonu belirsiz
❓ Test edilmedi

### Sıradaki: Chat bot frontend entegrasyonunu test et

---

## 🗄️ DATABASE DURUMU (2025-10-25)

**Database**: `affexai_dev`
**User**: `postgres`
**Port**: 5432

### Mevcut Tablolar:
- ✅ `roles` (10 rol)
- ✅ `users`
- ✅ `user_roles` (many-to-many)
- ✅ `company_knowledge_sources`
- ⚠️ Diğer tablolar doğrulanmadı

### Extensions:
- ✅ `uuid-ossp` (UUID generation)

---

## 🔧 BACKEND DURUMU

**Port**: 9006
**Current PID**: 81059 (son kontrol: 2025-10-25 19:43)
**Watch Mode**: Aktif

### Sorunlar:
- TypeORM migration çalıştırma hatası var
- data-source.ts ile ilgili sorun
- Eski process'ler temizlenmemiş

### Upload Directory:
- `/apps/backend/uploads/knowledge-sources` ✅ oluşturuldu

---

## 📋 BUNDAN SONRA YAPMAMIZ GEREKENLER

### Veri Kaybını Önleme Stratejisi:

#### 1. Her Önemli Değişiklikten Sonra:
```bash
# Bu dosyayı güncelle
echo "## [DATE] - [FEATURE_NAME]" >> PROJECT_MEMORY.md
echo "Status: [COMPLETED/IN_PROGRESS/BLOCKED]" >> PROJECT_MEMORY.md
echo "Details: ..." >> PROJECT_MEMORY.md
```

#### 2. Database Snapshot:
```bash
# Önemli tablolar için backup
pg_dump -h localhost -U postgres -d affexai_dev -t roles > backups/roles_$(date +%Y%m%d).sql
pg_dump -h localhost -U postgres -d affexai_dev -t users > backups/users_$(date +%Y%m%d).sql
```

#### 3. Code Checkpoint:
```bash
# Feature tamamlandığında git commit
git add .
git commit -m "feat: [feature_name] - [short_description]"
```

#### 4. Bu Dosyayı Her Session Başında Oku:
```bash
# Oturuma başlarken
cat PROJECT_MEMORY.md | grep -A 5 "YARIM KALDI\|IN_PROGRESS"
```

#### 5. Session Sonunda Güncelle:
Her çalışma sonunda bu dosyaya ekle:
- Ne yapıldı? ✅
- Ne yarım kaldı? ⚠️
- Bilinen sorunlar? ❌
- Sırada ne var? 📋

---

## 🚨 BİLİNEN SORUNLAR

1. **TypeORM Migration Hatası**
   - Error: Unable to open file data-source.ts
   - Workaround: Direkt SQL kullan

2. **Knowledge Sources Upload**
   - PDF upload çalışmıyor
   - Database'e kayıt atılmıyor

3. **Eski Backend Processes**
   - Multiple nest processes running
   - Port conflicts olabilir

---

## 📌 ÖNEMLI NOTLAR

### Database Reset Yapıldığında:
1. Roles tablosunu bu dosyadaki SQL ile yeniden oluştur
2. Admin user oluştur ve user_roles mapping'i ekle
3. Knowledge sources tablosunu oluştur

### Backend Restart:
```bash
# Eski process'leri temizle
lsof -ti:9006 | xargs kill -9

# Yeniden başlat
cd apps/backend
npm run start:dev
```

### Migration Bypass:
TypeORM migration çalışmıyorsa, migration dosyalarındaki SQL'i direkt çalıştır.

---

**Bu dosya projenin hafızasıdır. Her oturumda güncelle!**
