# Production CMS Stratejisi

> **Durum**: Planlandı - Henüz uygulanmadı
> **Tarih**: 2025-11-28
> **Öncelik**: Yüksek

## Özet

Production (aluplan.tr) ve Local geliştirme ortamı arasında CMS verilerini güvenli bir şekilde yönetmek için "Production-First" stratejisi uygulanacak.

## Strateji: Production-First

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCTION-FIRST YAKLAŞIMI                   │
└─────────────────────────────────────────────────────────────────┘

  [Production DB - aluplan.tr]
         │
         │ CMS içerikler burada girilir
         │ (gerçek veriler)
         │
         ▼
  ┌──────────────┐     pg_dump      ┌──────────────┐
  │  Production  │ ───────────────▶ │    Local     │
  │   Database   │   (haftalık)     │   Database   │
  └──────────────┘                  └──────────────┘
                                           │
                                           │ Geliştirme burada yapılır
                                           │ (production verileriyle test)
                                           ▼
                                    ┌──────────────┐
                                    │  Code Push   │
                                    │  (sadece kod)│
                                    └──────────────┘
                                           │
                                           ▼
                                    [Production'a Deploy]
```

## Temel Prensipler

| Ne | Nerede | Nasıl |
|-----|--------|-------|
| **CMS İçerikleri** | Production (aluplan.tr) | Doğrudan admin panelinden |
| **Kod Geliştirme** | Local | Normal geliştirme süreci |
| **Veritabanı Sync** | Production → Local | Haftalık pg_dump |
| **Deploy** | Sadece kod | Git push → Coolify |

## Yapılacaklar (TODO)

### 1. Scriptler Oluşturulacak

- [ ] `scripts/sync-from-production.sh` - Production DB'yi local'e çeker
- [ ] `scripts/backup-production.sh` - Production'ın otomatik yedeğini alır
- [ ] Coolify'da otomatik yedekleme ayarı

### 2. Workflow

1. **Production'da CMS İçeriklerini Gir**
   - aluplan.tr/admin adresinden giriş
   - Sayfalar, menüler, içerikler oluştur
   - Veriler production DB'de güvenle saklanır

2. **Local Geliştirme için Production DB'yi Çek**
   ```bash
   ./scripts/sync-from-production.sh
   ```

3. **Kod Değişikliklerini Deploy Et**
   ```bash
   git push origin main
   # Coolify otomatik deploy eder
   # Sadece KOD gider, VERİ production'da kalır
   ```

## Avantajlar

- CMS verileri **asla kaybolmaz**
- Production'da içerik girerken, local'de geliştirme yapılabilir
- Deploy sadece kod gönderir, veritabanına dokunmaz
- Gerçek verilerle test yapılabilir

## Notlar

- Bu strateji henüz uygulanmadı
- Önce local'deki diğer işler tamamlanacak
- Sonra bu scriptler oluşturulacak

---

*Bu doküman planlama amaçlıdır. Uygulama için Claude'a "production sync scriptlerini oluştur" demeniz yeterli.*
