# DNS Configuration Guide - Resend Email Setup

**Tarih:** 14 Ekim 2025  
**Domain:** aluplan.tr  
**Email Subdomains:** tx.aluplan.tr, news.aluplan.tr

## 🎯 Hedef

Email gönderebilmek için 2 subdomain'i Resend'de verify etmemiz gerekiyor:
- **tx.aluplan.tr** → Transactional emails (sertifikalar, bildirimler)
- **news.aluplan.tr** → Marketing emails (newsletter, kampanyalar)

## 📋 Yapılacaklar Checklist

### Adım 1: Resend Dashboard'a Giriş ✅ (Şimdi)
1. https://resend.com/domains sayfasına git
2. API Key ile login ol (zaten hesabın var)
3. "Add Domain" butonuna tıkla

### Adım 2: İlk Domain Ekle - tx.aluplan.tr
1. **Domain adını gir:** `tx.aluplan.tr`
2. **Region seç:** EU (Europe) - Türkiye için daha hızlı
3. "Add Domain" butonuna tıkla
4. Resend sana DNS kayıtlarını gösterecek 👇

### Adım 3: Cloudflare DNS Kayıtlarını Ekle (tx.aluplan.tr)

Resend'in vereceği kayıtları Cloudflare'e ekleyeceksin:

#### 3.1 SPF Kaydı (Sender Policy Framework)
```
Type: TXT
Name: tx.aluplan.tr (veya sadece "tx")
Content: v=spf1 include:_spf.resend.com ~all
TTL: Auto
Proxy: DNS only (gri bulut)
```

#### 3.2 DKIM Kaydı (DomainKeys Identified Mail)
Resend sana özel bir DKIM kaydı verecek, örnek:
```
Type: CNAME
Name: resend._domainkey.tx.aluplan.tr
Content: [Resend'in vereceği değer].resend.com
TTL: Auto
Proxy: DNS only (gri bulut)
```

**ÖNEMLİ:** Resend'in gösterdiği DKIM değerini aynen kopyala!

#### 3.3 DMARC Kaydı (Domain-based Message Authentication)
```
Type: TXT
Name: _dmarc.tx.aluplan.tr
Content: v=DMARC1; p=none; rua=mailto:dmarc@aluplan.tr
TTL: Auto
Proxy: DNS only (gri bulut)
```

**Not:** İlk başta `p=none` kullan (sadece raporla). Daha sonra `p=quarantine` veya `p=reject` yapabilirsin.

### Adım 4: İkinci Domain Ekle - news.aluplan.tr

Aynı işlemleri news.aluplan.tr için tekrarla:

#### 4.1 Resend'de Domain Ekle
- Domain: `news.aluplan.tr`
- Region: EU

#### 4.2 Cloudflare DNS Kayıtları (news.aluplan.tr)

**SPF:**
```
Type: TXT
Name: news.aluplan.tr (veya sadece "news")
Content: v=spf1 include:_spf.resend.com ~all
TTL: Auto
Proxy: DNS only
```

**DKIM:**
```
Type: CNAME
Name: resend._domainkey.news.aluplan.tr
Content: [Resend'in vereceği değer].resend.com
TTL: Auto
Proxy: DNS only
```

**DMARC:**
```
Type: TXT
Name: _dmarc.news.aluplan.tr
Content: v=DMARC1; p=none; rua=mailto:dmarc@aluplan.tr
TTL: Auto
Proxy: DNS only
```

### Adım 5: Verification (Doğrulama) Bekle

1. DNS kayıtlarını ekledikten sonra Resend'de "Verify Domain" butonuna tıkla
2. DNS propagation 5-60 dakika arası sürebilir
3. Resend her 5 dakikada bir otomatik kontrol eder
4. Verified olunca ✅ yeşil onay işareti görürsün

**DNS propagation kontrol için:**
```bash
# SPF kontrolü
dig TXT tx.aluplan.tr +short

# DKIM kontrolü  
dig CNAME resend._domainkey.tx.aluplan.tr +short

# DMARC kontrolü
dig TXT _dmarc.tx.aluplan.tr +short
```

### Adım 6: İlk Test Email Gönder

Domain verify edildikten sonra:

```bash
curl -X POST http://localhost:9005/api/mail/send-test \
  -H "Content-Type: application/json" \
  -d '{
    "to": "hazarvolga@gmail.com",
    "subject": "🎉 Aluplan Email Infrastructure - Test Successful",
    "message": "Email gönderimi başarıyla çalışıyor! tx.aluplan.tr domain verified."
  }'
```

Başarılı olursa:
```json
{
  "success": true,
  "messageId": "xxxxx-xxxxx-xxxxx",
  "timestamp": "2025-10-14T..."
}
```

## 🔍 Troubleshooting

### "Domain not verified" hatası
- DNS kayıtlarının doğru eklendiğini kontrol et
- DNS propagation için 1 saat bekle
- Cloudflare'de "Proxy" kapalı olmalı (gri bulut)

### SPF kaydı hatalı
- `v=spf1` ile başlamalı
- `include:_spf.resend.com` olmalı (underscore önemli!)
- `~all` veya `-all` ile bitmeli

### DKIM kaydı bulunamıyor
- CNAME tipinde olmalı
- Name: tam subdomain (resend._domainkey.tx.aluplan.tr)
- Resend'in verdiği değeri aynen kopyala

### Email spam'e düşüyor
- DMARC kaydını kontrol et
- Domain reputation'ı warm-up yap (Phase 13)
- Bounce rate'i düşük tut (%5'in altı)

## 📊 Verification Status Kontrolü

Backend'den domain status'unu kontrol edebilirsin:

```typescript
// Yeni endpoint ekleyebiliriz (opsiyonel)
GET /api/mail/domain-status

Response:
{
  "domains": [
    {
      "name": "tx.aluplan.tr",
      "status": "verified",
      "records": {
        "spf": "valid",
        "dkim": "valid", 
        "dmarc": "valid"
      }
    },
    {
      "name": "news.aluplan.tr",
      "status": "pending",
      "records": {...}
    }
  ]
}
```

## 🎯 Success Criteria

Phase 12 tamamlanmış sayılır:
- ✅ tx.aluplan.tr verified
- ✅ news.aluplan.tr verified
- ✅ SPF, DKIM, DMARC kayıtları valid
- ✅ İlk test email başarıyla gönderildi
- ✅ Email spam'e düşmedi (inbox'ta görünüyor)

## 📝 Notlar

### Domain Seçimi
- **tx.** (transactional) → Yüksek delivery rate, düşük bounce
- **news.** (newsletter) → Marketing emails, unsubscribe link zorunlu
- Ana domain (aluplan.tr) email göndermek için kullanılmaz

### Güvenlik
- API key'i asla commit etme (.env)
- DMARC raporlarını düzenli kontrol et
- Bounce/complaint rate'i izle

### Maliyet
- Resend Free Plan: 3,000 email/ay
- Paid Plan: $20/ay, 50,000 email
- Bizim kullanım: ~1,000-2,000 email/ay (free yeterli)

## 🔗 Faydalı Linkler

- Resend Dashboard: https://resend.com/domains
- Cloudflare DNS: https://dash.cloudflare.com
- SPF Checker: https://mxtoolbox.com/spf.aspx
- DKIM Checker: https://mxtoolbox.com/dkim.aspx
- DMARC Checker: https://mxtoolbox.com/dmarc.aspx
- Mail Tester: https://www.mail-tester.com

---

## ⏭️ Sonraki Adımlar

Phase 12 tamamlandıktan sonra:

**Phase 3:** Existing services integration
- CertificateEmailService → MailService
- EmailProcessor → Bulk send

**Phase 13:** Email warm-up
- Günlük 10 email → 50 → 100 → 500
- 7 günlük warm-up planı

Hazırsan başlayalım! 🚀
