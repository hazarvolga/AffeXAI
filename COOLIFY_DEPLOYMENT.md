# 🚀 Affexai Coolify Deployment Rehberi

Bu dokümantasyon, Affexai projesinin Coolify üzerinde nasıl deploy edileceğini adım adım açıklar.

## 📋 Ön Gereksinimler

- ✅ Coolify kurulu ve çalışır durumda
- ✅ GitHub repository: https://github.com/hazarvolga/AffeXAI
- ✅ Sunucu bilgileri:
  - IP: `80.225.231.62`
  - Coolify Panel: https://coolify.aluplan.tr/
  - SSH Key: `/Users/hazarekiz/Projects/v06/Affexai/AffexAI-Oracle-Servers/instance-aluplan-one/ssh-key-2025-09-24.key`

## 🎯 Deployment Stratejisi

Affexai bir **monorepo** yapısına sahip (NestJS backend + Next.js frontend). En iyi yaklaşım **Docker Compose** kullanmaktır.

### Servisler:

1. **PostgreSQL** - Veritabanı
2. **Redis** - Cache
3. **Backend (NestJS)** - API servisi (Port 3001)
4. **Frontend (Next.js)** - Web uygulaması (Port 3000)

---

## 📦 Adım 1: Coolify'da Yeni Proje Oluşturma

### 1.1 Coolify Panel'e Giriş

1. https://coolify.aluplan.tr/ adresine git
2. Giriş yap
3. **Projects** → **+ New Project** tıkla

### 1.2 Git Repository Bağlama

1. **Source** bölümünde **GitHub** seç
2. Repository URL: `https://github.com/hazarvolga/AffeXAI`
3. Branch: `master` (veya `main`)
4. **Docker Compose** seçeneğini işaretle

### 1.3 Docker Compose Dosyasını Belirle

- **Docker Compose Path**: `docker-compose.production.yml`
- Coolify bu dosyayı otomatik olarak algılayacak

---

## 🔧 Adım 2: Environment Variables Yapılandırması

Coolify'ın **Environment** bölümünde aşağıdaki değişkenleri ekleyin:

### 2.1 Database (PostgreSQL)

```env
DATABASE_NAME=affexai
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<güvenli_şifre_buraya>
```

💡 **Güvenli şifre oluşturmak için:**
```bash
openssl rand -base64 32
```

### 2.2 Redis

```env
REDIS_PASSWORD=<güvenli_redis_şifresi>
```

### 2.3 JWT & Security

```env
JWT_SECRET=<32_karakter_üzeri_güvenli_key>
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d
```

### 2.4 AI Providers (Opsiyonel - İhtiyacınıza göre)

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini
GOOGLE_AI_API_KEY=AIza...
GOOGLE_GENAI_API_KEY=AIza...
```

### 2.5 AWS S3 (Dosya Depolama)

```env
AWS_ACCESS_KEY_ID=<aws_access_key>
AWS_SECRET_ACCESS_KEY=<aws_secret_key>
AWS_S3_BUCKET=affexai-uploads
AWS_REGION=us-east-1
```

### 2.6 Email (Resend)

```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@aluplan.tr
EMAIL_FROM_NAME=Affexai
```

### 2.7 Frontend Public Variables

⚠️ **ÇOK ÖNEMLİ**: Bu değişkenler **build zamanında** ayarlanmalı!

Coolify'da **Build Arguments** bölümüne ekleyin:

```env
NEXT_PUBLIC_API_URL=https://api.aluplan.tr
NEXT_PUBLIC_SOCKET_URL=https://api.aluplan.tr
NEXT_PUBLIC_APP_URL=https://aluplan.tr
```

### 2.8 CORS Configuration

```env
CORS_ORIGIN=https://aluplan.tr
```

---

## 🌐 Adım 3: Domain Yapılandırması

### 3.1 Backend Domain

1. Coolify'da **backend** servisini seç
2. **Domains** bölümüne git
3. Domain ekle: `api.aluplan.tr`
4. **SSL/TLS** otomatik olarak Let's Encrypt ile etkinleşir

### 3.2 Frontend Domain

1. **frontend** servisini seç
2. Domain ekle: `aluplan.tr` (veya `www.aluplan.tr`)
3. SSL/TLS otomatik etkinleşir

### 3.3 DNS Ayarları

Domain registrar'ınızda (örn: Cloudflare, GoDaddy) A kayıtlarını ekleyin:

```
A    api.aluplan.tr     80.225.231.62
A    aluplan.tr         80.225.231.62
A    www.aluplan.tr     80.225.231.62
```

---

## 🗄️ Adım 4: Database Migration

İlk deployment'tan sonra veritabanı migration'larını çalıştırmanız gerekiyor.

### 4.1 Backend Container'a Bağlanma

Coolify'da **backend** servisine git ve **Terminal** aç:

```bash
# Migration'ları çalıştır
npm run typeorm:migration:run

# Seed data (isteğe bağlı)
npm run seed:users
npm run seed:tickets
```

### 4.2 Alternatif: SSH ile Bağlanma

```bash
# Sunucuya SSH bağlantısı
ssh -i /Users/hazarekiz/Projects/v06/Affexai/AffexAI-Oracle-Servers/instance-aluplan-one/ssh-key-2025-09-24.key ubuntu@80.225.231.62

# Backend container'ını bul
docker ps | grep backend

# Container'a gir
docker exec -it <container_id> sh

# Migration çalıştır
npm run typeorm:migration:run
```

---

## 🚀 Adım 5: Deployment Başlatma

### 5.1 İlk Deployment

1. Coolify'da **Deploy** butonuna tıkla
2. Build loglarını takip et
3. 4 servisin de başarıyla çalıştığını doğrula:
   - ✅ postgres (health check geçmeli)
   - ✅ redis (health check geçmeli)
   - ✅ backend (health check geçmeli)
   - ✅ frontend (health check geçmeli)

### 5.2 Health Check Doğrulama

```bash
# Backend health check
curl https://api.aluplan.tr/health

# Frontend health check
curl https://aluplan.tr

# Beklenen cevap: HTTP 200 OK
```

---

## 📊 Adım 6: İzleme ve Loglar

### 6.1 Coolify Dashboard

- **Logs**: Her servisin real-time loglarını görün
- **Metrics**: CPU, RAM, Network kullanımı
- **Health Checks**: Servis sağlık durumları

### 6.2 Log İzleme

Coolify'da her servis için **Logs** sekmesinden:

- **Backend Logs**: API istekleri, hatalar
- **Frontend Logs**: Build hataları, runtime errors
- **PostgreSQL Logs**: Database sorguları
- **Redis Logs**: Cache işlemleri

---

## 🔄 Güncelleme ve Yeniden Deployment

### Otomatik Deployment (Webhook)

1. Coolify'da **Webhooks** bölümüne git
2. GitHub webhook URL'sini kopyala
3. GitHub repository'de **Settings** → **Webhooks** → **Add webhook**
4. Webhook URL'sini yapıştır
5. **Events**: `push` olayını seç

Artık her `git push` işleminde Coolify otomatik deploy edecek!

### Manuel Deployment

Coolify'da **Redeploy** butonuna tıklayın.

---

## 🛡️ Güvenlik Önerileri

### 1. Environment Variables

- ✅ Tüm secret değerleri Coolify'ın Environment bölümünde saklayın
- ❌ `.env` dosyasını repository'e commit etmeyin
- ✅ Güçlü şifreler kullanın (min 32 karakter)

### 2. Database

```env
# Güvenli PostgreSQL şifresi
DATABASE_PASSWORD=$(openssl rand -base64 32)
```

### 3. JWT Secret

```env
# Güvenli JWT secret
JWT_SECRET=$(openssl rand -base64 64)
```

### 4. CORS

```env
# Sadece kendi domain'inizden isteklere izin verin
CORS_ORIGIN=https://aluplan.tr
```

### 5. Rate Limiting

Backend'de zaten aktif, production'da ayarları kontrol edin.

---

## 🐛 Sorun Giderme

### Backend Başlamıyor

**Sebep**: Database bağlantı hatası

**Çözüm**:
1. PostgreSQL container'ının çalıştığını doğrulayın
2. `DATABASE_HOST=postgres` olduğundan emin olun (service name)
3. Database credentials'ları kontrol edin

### Frontend Build Hatası

**Sebep**: `NEXT_PUBLIC_*` environment variables eksik

**Çözüm**:
1. Coolify'da **Build Arguments** bölümünü kontrol edin
2. `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL` eklenmiş mi?
3. **Rebuild** edin

### Migration Hataları

**Sebep**: Database schema uyumsuzluğu

**Çözüm**:
```bash
# Backend container'a gir
docker exec -it <backend_container_id> sh

# Migration durumunu kontrol et
npm run typeorm:migration:show

# Eksik migration'ları çalıştır
npm run typeorm:migration:run
```

### Redis Bağlantı Hatası

**Sebep**: Redis şifresi yanlış

**Çözüm**:
1. `REDIS_PASSWORD` environment variable'ını kontrol edin
2. Redis container loglarını inceleyin

### 502 Bad Gateway

**Sebep**: Backend health check başarısız

**Çözüm**:
1. Backend container loglarını kontrol edin
2. `/health` endpoint'inin çalıştığını doğrulayın:
   ```bash
   curl http://backend:3001/health
   ```
3. Database ve Redis bağlantılarını kontrol edin

---

## 📈 Performans Optimizasyonu

### 1. Database Indexler

Migration'larda zaten eklenmiş, ancak kontrol edin:

```sql
-- Örnek index'ler
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_users_email ON users(email);
```

### 2. Redis Cache

Backend'de zaten aktif, production'da cache TTL ayarlarını optimize edin.

### 3. CDN (Opsiyonel)

Statik dosyalar için Cloudflare CDN kullanabilirsiniz:

1. Cloudflare'de domain'i ekleyin
2. DNS kayıtlarını Cloudflare'e yönlendirin
3. Cache Rules ayarlayın

---

## 🎯 Production Checklist

Deployment'tan önce kontrol edin:

- [ ] Tüm environment variables ayarlandı mı?
- [ ] Database credentials güvenli mi?
- [ ] JWT secret değiştirildi mi?
- [ ] CORS origin doğru domain'e ayarlı mı?
- [ ] SSL/TLS sertifikaları aktif mi?
- [ ] Health check'ler geçiyor mu?
- [ ] Migration'lar çalıştırıldı mı?
- [ ] Backup stratejisi planlandı mı?
- [ ] Log monitoring aktif mi?
- [ ] Domain DNS kayıtları doğru mu?

---

## 📞 Yardım ve Destek

### Logları İnceleme

```bash
# Tüm servislerin logları
docker-compose -f docker-compose.production.yml logs -f

# Sadece backend
docker-compose -f docker-compose.production.yml logs -f backend

# Sadece frontend
docker-compose -f docker-compose.production.yml logs -f frontend
```

### Container Durumunu Kontrol Etme

```bash
# Çalışan container'lar
docker ps

# Container resource kullanımı
docker stats
```

### Database Backup

```bash
# PostgreSQL backup
docker exec <postgres_container_id> pg_dump -U postgres affexai > backup.sql

# Restore
docker exec -i <postgres_container_id> psql -U postgres affexai < backup.sql
```

---

## 🎉 Başarıyla Deployment!

Tebrikler! Affexai artık production'da çalışıyor:

- 🌐 Frontend: https://aluplan.tr
- 🔌 Backend API: https://api.aluplan.tr
- 📊 Coolify Panel: https://coolify.aluplan.tr/

---

**Son Güncelleme**: 2025-11-21
**Versiyon**: 1.0.0
**Bakım**: Affexai Development Team
