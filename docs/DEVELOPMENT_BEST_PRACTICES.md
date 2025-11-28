# Affexai Development Best Practices

> **Bu dokuman, gelistirme surecinde karsilasilan sorunlarin tekrar yasamanmasi icin olusturulmustur.**
> **Tarih**: 2025-11-28

---

## 1. Zombi Proses Problemi ve Cozumu

### Problem
NestJS backend ve Next.js frontend gelistirme sunuculari duzgun kapatilmadiginda "zombi proses" olarak arka planda calismaya devam eder. Bu durum:
- Port cakismalarina (Address already in use)
- Bellek sizintilarina
- CPU tuketiminin artmasina
- Beklenmedik davranislara yol acar

### Cozum: Her Oturumda Temizlik

**Oturum basinda calistirin:**
```bash
# Hizli temizlik scripti
pkill -9 -f "nest start" 2>/dev/null
pkill -9 -f "next-server" 2>/dev/null
lsof -ti:9003 | xargs kill -9 2>/dev/null
lsof -ti:9006 | xargs kill -9 2>/dev/null
echo "Portlar temizlendi!"
```

**package.json'a ekleyin:**
```json
{
  "scripts": {
    "cleanup": "pkill -9 -f 'nest start' || true && pkill -9 -f 'next-server' || true",
    "dev:clean": "npm run cleanup && npm run dev"
  }
}
```

### Oneri: scripts/cleanup.sh Olusturun
```bash
#!/bin/bash
# scripts/cleanup.sh - Gelistirme ortami temizlik scripti

echo "=== Affexai Temizlik Scripti ==="

# NestJS proseslerini durdur
pkill -9 -f "nest start" 2>/dev/null && echo "NestJS prosesleri durduruldu" || echo "NestJS prosesi yok"

# Next.js proseslerini durdur
pkill -9 -f "next-server" 2>/dev/null && echo "Next.js prosesleri durduruldu" || echo "Next.js prosesi yok"

# Portlari serbest birak
lsof -ti:9003 | xargs kill -9 2>/dev/null && echo "Port 9003 serbest birakildi" || echo "Port 9003 zaten bos"
lsof -ti:9006 | xargs kill -9 2>/dev/null && echo "Port 9006 serbest birakildi" || echo "Port 9006 zaten bos"

echo "=== Temizlik tamamlandi ==="
```

---

## 2. Veritabani Senkronizasyon Problemi

### Problem
TypeORM entity dosyalari ile gercek veritabani tablolari arasinda uyumsuzluk olusabilir:
- Yeni entity eklendi ama migration olusturulmadi
- Migration'lar siralama hatasi nedeniyle calismiyor
- Development'ta synchronize:true, production'da synchronize:false farki

### Cozum 1: Entity-Tablo Kontrolu Scripti

**scripts/check-db-sync.sh:**
```bash
#!/bin/bash
# Entity dosyalari ile DB tablolarini karsilastir

echo "=== Entity-Tablo Senkronizasyon Kontrolu ==="

# Entity dosyalarindan tablo adlarini cek
ENTITIES=$(find apps/backend/src -name "*.entity.ts" | xargs grep -l "@Entity" | wc -l)
echo "Entity dosya sayisi: $ENTITIES"

# Veritabanindaki tablo sayisi
TABLES=$(PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev -t -c \
  "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
echo "Veritabani tablo sayisi: $TABLES"

if [ "$ENTITIES" -gt "$TABLES" ]; then
  echo "UYARI: Eksik tablolar olabilir! Migration calistirin."
fi
```

### Cozum 2: TypeORM synchronize Stratejisi

**ormconfig.ts / database.config.ts:**
```typescript
// Development: synchronize: true (dikkatli kullanin!)
// Staging: synchronize: false, migrationsRun: true
// Production: synchronize: false, migrationsRun: true

const config: TypeOrmModuleOptions = {
  synchronize: process.env.NODE_ENV === 'development',
  migrationsRun: process.env.NODE_ENV !== 'development',
  logging: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'schema'] : ['error'],
};
```

### Cozum 3: Migration Workflow

```bash
# 1. Yeni entity ekledikten sonra
npm run typeorm:migration:generate -- src/database/migrations/AddNewFeature

# 2. Migration'i inceleyin
cat src/database/migrations/*-AddNewFeature.ts

# 3. Migration'i calistirin
npm run typeorm:migration:run

# 4. Schema'yi dogrulayin
npm run typeorm:schema:log
```

---

## 3. Gelistirme Ortami Checklist

### Her Oturum Basinda
- [ ] `npm run cleanup` veya `./scripts/cleanup.sh` calistir
- [ ] Docker servisleri kontrol et: `docker ps`
- [ ] Port durumunu kontrol et: `lsof -i :9003,9006`
- [ ] Git durumunu kontrol et: `git status`

### Yeni Entity/Tablo Eklerken
- [ ] Entity dosyasini olustur
- [ ] Migration olustur: `npm run typeorm:migration:generate`
- [ ] Migration'i incele ve onayla
- [ ] Migration'i calistir: `npm run typeorm:migration:run`
- [ ] Backend'i yeniden baslat
- [ ] API'yi test et

### Commit Oncesi
- [ ] Tum testler gecti mi? `npm run test`
- [ ] Lint hatalari yok mu? `npm run lint`
- [ ] TypeScript hatalari yok mu? `npm run typecheck`
- [ ] Veritabani senkronize mi?

---

## 4. Onerilen Proje Yapilandirmasi

### VS Code Settings (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true
  }
}
```

### Git Hooks (husky + lint-staged)
```bash
npm install -D husky lint-staged
npx husky install

# pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**package.json:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## 5. Veritabani Yedekleme Stratejisi

### Gunluk Backup (Cron Job)
```bash
# /etc/cron.d/affexai-backup
0 2 * * * /path/to/scripts/backup-db.sh
```

**scripts/backup-db.sh:**
```bash
#!/bin/bash
BACKUP_DIR="/backups/affexai"
DATE=$(date +%Y-%m-%d_%H%M%S)
FILENAME="affexai_backup_${DATE}.sql"

mkdir -p $BACKUP_DIR

PGPASSWORD=postgres pg_dump -h localhost -p 5434 -U postgres -d affexai_dev > "$BACKUP_DIR/$FILENAME"

# 7 gunluk backup'lari tut
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

echo "Backup olusturuldu: $FILENAME"
```

### Onemli Veriler Icin Seed Dosyalari
```bash
# CMS verilerini kaydet
npm run seed:export -- --table=cms_pages --output=seeds/cms-pages.json

# Geri yukle
npm run seed:import -- --file=seeds/cms-pages.json
```

---

## 6. Monitoring ve Logging

### Sistem Log Kullanimi
```typescript
// Backend'de error logging
import { AppLoggerService } from '@/common/logging/app-logger.service';

try {
  // operation
} catch (error) {
  await this.appLoggerService.logError(
    LogContext.SYSTEM,
    'Operation failed',
    error,
    { userId, operation: 'create-ticket' }
  );
  throw error;
}
```

### Log Sorgulama
```sql
-- Son 24 saatteki hatalar
SELECT * FROM system_logs
WHERE level = 'ERROR'
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Modul bazli hata dagilimi
SELECT context, COUNT(*) as count
FROM system_logs
WHERE level = 'ERROR'
GROUP BY context
ORDER BY count DESC;
```

---

## 7. Hizli Referans Komutlari

```bash
# Temizlik
npm run cleanup

# Gelistirme
npm run dev                    # Her iki uygulamayi baslat
npm run dev:backend            # Sadece backend
npm run dev:frontend           # Sadece frontend

# Veritabani
npm run typeorm:migration:run  # Migration'lari calistir
npm run typeorm:migration:show # Bekleyen migration'lari goster

# Docker
docker compose up -d           # Servisleri baslat
docker compose down            # Servisleri durdur
docker compose logs -f postgres # Postgres loglarini izle

# Test
npm run test                   # Tum testleri calistir
npm run test:e2e               # E2E testleri

# Build
npm run build                  # Production build
npm run typecheck              # TypeScript kontrolu
```

---

## 8. Acil Durum Proseduru

### Veritabani Bosaldiysa
```bash
# 1. En son backup'i bul
ls -la /backups/affexai/

# 2. Backup'i geri yukle
PGPASSWORD=postgres psql -h localhost -p 5434 -U postgres -d affexai_dev < backup.sql

# 3. Admin kullanici olustur
npm run seed:admin
```

### Port Cakismasi Varsa
```bash
# Hangi proses portu kullaniyor?
lsof -i :9006

# Prosesi durdur
kill -9 <PID>
```

### Servis Baslat/Durdur
```bash
# Docker servisleri
docker compose restart postgres
docker compose restart redis

# Node prosesleri
pkill -9 -f "nest start"
pkill -9 -f "next-server"
```

---

**Son Guncelleme**: 2025-11-28
**Hazirlayan**: Claude Code AI
