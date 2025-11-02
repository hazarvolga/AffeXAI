# Field Library - Uçtan Uca Test Senaryosu

Bu döküman, Field Library sistem iyileştirmelerinin tamamını test etmek için adım adım test rehberidir.

## Test Edilen İyileştirmeler

### 1. Frontend Fixes
- ✅ Optional chaining for `metadata` property (runtime error fix)
- ✅ Metadata fallback in `handleAddFromLibrary` function
- ✅ `/api` prefix added to Field Library service
- ✅ "Tickets" module removed from Form Builder
- ✅ Form definition API response structure fixed
- ✅ FormSchema fixes (formId, formName, formNameEn)

### 2. Backend Endpoints
- Field Library CRUD operations
- Filtering (isActive, search)
- Tag management
- Authentication & Authorization

## Test Adımları

### Adım 1: Giriş Yap
1. Tarayıcıda http://localhost:9003 aç
2. Admin hesabı ile giriş yap
3. Dashboard'a yönlendirilmelisin

### Adım 2: Form Fields Sayfasını Test Et
URL: http://localhost:9003/admin/support/form-fields

**Test Edilecekler:**
- ✅ Sayfa hatasız yükleniyor
- ✅ Default ticket formu field'ları listeleniyor
- ✅ Field sayısı gösteriliyor (örn: "15 fields configured")
- ✅ Her field için:
  - Order (up/down butonları)
  - Field name & type
  - Required/Optional badge
  - Width (Full/Half/Third)
  - Agent Only badge
  - Edit & Delete butonları
- ✅ Search box çalışıyor
- ✅ Field sıralaması değiştirilebiliyor (up/down ok)

**Beklenen Sonuç:** Tüm alanlar doğru şekilde görüntüleniyor, mock data yok.

---

### Adım 3: Form Builder Dashboard'u Test Et
URL: http://localhost:9003/admin/form-builder

**Test Edilecekler:**
- ✅ Sayfa hatasız yükleniyor
- ✅ Dashboard statistics kartları:
  - Total Forms
  - Active Forms
  - Total Submissions
  - Pending Review
- ✅ Module tabs:
  - ✅ All Forms
  - ✅ Events
  - ✅ Certificates
  - ✅ CMS
  - ✅ Email Marketing
  - ❌ **Tickets module YOK (removed)**
- ✅ Quick Actions kartları:
  - Manage Forms
  - View Submissions

**Beklenen Sonuç:** "Tickets" modülü gösterilmiyor, sadece 5 modül var.

---

### Adım 4: Form Builder - Yeni Form Oluştur
URL: http://localhost:9003/admin/form-builder/forms/new

**Test Edilecekler:**

#### 4.1 Form Temel Bilgileri
- ✅ Form adı girebiliyorsun
- ✅ Description girebiliyorsun
- ✅ Module seçebiliyorsun (events, certificates, cms, email-marketing)
- ✅ Active/Inactive toggle çalışıyor

#### 4.2 Field Library Button
- ✅ "Kütüphaneden Ekle" butonu görünüyor
- ✅ Butona tıklayınca dialog açılıyor
- ✅ Dialog başlığı: "Alan Kütüphanesi"

#### 4.3 Field Library Dialog İçeriği
Dialog açıldığında:

**Kontrol Edilecekler:**
- ✅ Loading spinner gösteriliyor (yüklenirken)
- ✅ Field kartları listeleniyor
- ✅ Her kart için:
  - ✅ Field name (bold başlık)
  - ✅ Field type badge (örn: "text", "email")
  - ✅ Description (varsa)
  - ✅ Field label (küçük badge)
  - ✅ "Zorunlu" badge (field required ise)
  - ✅ "Agent Only" badge (metadata?.agentOnly === true ise)
  - ✅ Tags (varsa, max 2 gösteriliyor, +N badge)
- ✅ **ÖNEMLI:** Metadata undefined olan fieldlar için hata vermiyor

**Hata Vermemesi Gereken Durumlar:**
```javascript
// Bu durumlar artık hatasız çalışmalı:
libraryField.fieldConfig.metadata === undefined
libraryField.fieldConfig.metadata.agentOnly === undefined
```

#### 4.4 Field Ekleme
- ✅ Kütüphaneden bir field kartına tıkla
- ✅ "Başarılı" toast mesajı gösteriliyor
- ✅ Field, form builder'a ekleniyor
- ✅ Dialog kapanıyor

#### 4.5 Eklenen Field'ı Kontrol Et
- ✅ Field listede görünüyor
- ✅ Field metadata varsa doğru gösteriliyor
- ✅ Field metadata yoksa boş object olarak ekleniyor
- ✅ Field order otomatik atanıyor

---

### Adım 5: Form Preview & Save
- ✅ "Önizleme" butonu çalışıyor
- ✅ Preview doğru FormSchema ile oluşturuluyor:
  ```typescript
  {
    formId: "preview",
    formName: "Önizleme",
    formNameEn: "Preview",
    version: 1,
    fields: [...]
  }
  ```
- ✅ "Kaydet" butonu çalışıyor
- ✅ FormSchema doğru oluşturuluyor:
  ```typescript
  {
    formId: `form_${Date.now()}`,
    formName: values.name,
    formNameEn: values.name,
    version: 1,
    fields: [...]
  }
  ```

---

### Adım 6: Forms List Sayfasını Test Et
URL: http://localhost:9003/admin/support/forms

**Test Edilecekler:**
- ✅ Formlar listeleniyor
- ✅ **Console log kontrol:** `📋 Forms received: Array`
- ✅ **Console log kontrol:** `📊 Forms count: X`
- ✅ Form sayısı doğru gösteriliyor
- ✅ Her form için:
  - Form name
  - Version number
  - Field count
  - Active/Inactive badge
  - Created date
  - Edit/Delete butonları

**API Response Kontrolü:**
```javascript
// TicketFormService.getAllFormDefinitions() şunu döndürmeli:
TicketFormDefinition[] // Array of forms

// Backend response structure:
{
  success: true,
  data: {
    items: [...],
    total: X
  }
}

// Frontend mapping:
response?.data?.items || []
```

---

### Adım 7: Edit Form Test
1. Bir formu düzenle
2. Formdan field sil
3. Kütüphaneden yeni field ekle
4. Kaydet
5. Listeye geri dön
6. Değişikliklerin yansıdığını kontrol et

---

## Hata Senaryoları (Düzeltilmesi Gerekenler)

### ❌ Senaryo 1: Metadata Undefined Hatası
**Test:**
1. Metadata'sı olmayan bir field kütüphaneye ekle
2. Form builder'da "Kütüphaneden Ekle" tıkla
3. Bu field'ı seç

**Beklenen:** Hata vermemeli ✅
**Önceki Durum:** `TypeError: can't access property "agentOnly", libraryField.fieldConfig.metadata is undefined`
**Düzeltme:** Optional chaining (`?.`) ve fallback (`|| {}`) eklendi

### ❌ Senaryo 2: FormSchema Missing Properties
**Test:**
1. Yeni form oluştur
2. Kaydet

**Beklenen:** TypeScript hatası vermemeli ✅
**Önceki Durum:** `Property 'formId' is missing in type`
**Düzeltme:** formId, formName, formNameEn otomatik ekleniyor

### ❌ Senaryo 3: Forms Not Loading
**Test:**
1. Forms list sayfasını aç

**Beklenen:** Formlar listelenmeli ✅
**Önceki Durum:** `Forms received: Array []` (boş array)
**Düzeltme:** `response?.data?.items || []` mapping düzeltildi

---

## API Test Komutları (cURL)

### 1. Login
```bash
curl -X POST http://localhost:9006/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}'
```

### 2. Get All Field Library Entries
```bash
curl -X GET "http://localhost:9006/api/ticket-field-library?limit=100" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Filter Active Fields
```bash
curl -X GET "http://localhost:9006/api/ticket-field-library?isActive=true&limit=100" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Search Fields
```bash
curl -X GET "http://localhost:9006/api/ticket-field-library?search=email" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Get All Tags
```bash
curl -X GET "http://localhost:9006/api/ticket-field-library/tags" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Create Field
```bash
curl -X POST http://localhost:9006/api/ticket-field-library \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Field",
    "description": "Test description",
    "fieldConfig": {
      "id": "test_field",
      "name": "testField",
      "label": "Test Label",
      "type": "text",
      "required": false,
      "metadata": {
        "order": 0,
        "width": "full"
      }
    },
    "tags": ["test"],
    "isActive": true
  }'
```

---

## Test Checklist

### Frontend Tests
- [ ] Form Fields page loads without errors
- [ ] Field ordering works (up/down buttons)
- [ ] Form Builder dashboard shows correct modules (no Tickets)
- [ ] "Kütüphaneden Ekle" button visible
- [ ] Field Library dialog opens
- [ ] Field Library cards display correctly
- [ ] No error when metadata is undefined
- [ ] Adding field from library works
- [ ] Form preview works
- [ ] Form save works with correct FormSchema
- [ ] Forms list displays correctly

### Backend Tests
- [ ] GET /api/ticket-field-library returns fields
- [ ] GET /api/ticket-field-library?isActive=true filters correctly
- [ ] GET /api/ticket-field-library?search=X searches correctly
- [ ] GET /api/ticket-field-library/tags returns unique tags
- [ ] POST /api/ticket-field-library creates field
- [ ] GET /api/ticket-field-library/:id returns field details
- [ ] DELETE /api/ticket-field-library/:id deletes field

### Integration Tests
- [ ] Field Library integrates with Form Builder
- [ ] Added fields save correctly
- [ ] Form definitions API works
- [ ] No console errors on any page

---

## Başarı Kriterleri

✅ **Tüm sayfalar hatasız yükleniyor**
✅ **Field Library dialog metadata hatası düzeltildi**
✅ **FormSchema properties düzeltildi**
✅ **Tickets module kaldırıldı**
✅ **Form definitions API düzeltildi**
✅ **Field ordering çalışıyor**
✅ **Console'da hata yok**

---

## Notlar

- Admin kullanıcı bilgileri: Projede mevcut admin kullanıcıyı kullan
- PostgreSQL Docker container çalışıyor olmalı
- Backend port: 9006
- Frontend port: 9003
- Test sonuçlarını kaydet ve sorunları raporla

---

**Son Güncelleme:** 2025-11-02
**Test Edilen Versiyon:** Form Builder v1.0 (Field Library integration)
