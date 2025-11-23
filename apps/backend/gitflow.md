Git Flow (Submodule yapısına göre)
📦 Yapı
/fullstack-app        ← Ana repo (Next.js + submodule referansı)
│
├── frontend/         ← Next.js uygulaması
│
└── backend/          ← Nest.js backend (submodule, ayrı repo)


Ana repo, backend’in belirli bir commit’ine referans tutar.
Dolayısıyla, her iki repository için ayrı branch yönetimi yapılır ama senkron ilerlerler.

🧭 1. Branch Yapısı
Ana Repo (Frontend)
Branch	Amaç
main	Production kodu, release versiyonları
develop	Aktif geliştirme ortamı
feature/*	Yeni özellikler (frontend)
hotfix/*	Production hataları için düzeltmeler
release/*	Yayın öncesi stabilize branch
Backend (Submodule)
Branch	Amaç
main	Production API kodu
develop	Yeni API geliştirmeleri
feature/*	Yeni endpoint veya servis eklemeleri
hotfix/*	API bug düzeltmeleri
release/*	Backend release hazırlıkları

🧩 Her iki repo da kendi Git flow’unu takip eder,
ama backend güncellendiğinde ana repo’nun backend submodule pointer’ı da güncellenir.

🧰 2. Geliştirme Akışı
🔹 A. Yeni Özellik (Feature)

Ana repo:

git checkout develop
git pull
git checkout -b feature/add-certificate-ui


Backend:

cd backend
git checkout develop
git pull
git checkout -b feature/add-certificate-endpoint


Backend kodunu geliştir, commit ve push:

git add .
git commit -m "feat: add certificate generation endpoint"
git push origin feature/add-certificate-endpoint


Ana repo’ya dön:

cd ..
git add backend
git commit -m "chore: update backend submodule for certificate endpoint"
git push origin feature/add-certificate-ui

🔹 B. Merge Süreci

Backend’de feature/* → develop merge edilir.

Ana repo backend submodule pointer’ını günceller:

git submodule update --remote backend
git add backend
git commit -m "chore: sync backend develop"
git push


Böylece frontend artık backend’in son halini referans alır.

🧪 3. Test Ortamı

develop branch’leri hem frontend hem backend tarafında CI/CD pipeline’larıyla staging ortamına deploy edilir.

Staging ortamı backend’in güncel submodule commit’ini kullanır.

🚀 4. Release Süreci
Adımlar:

Backend Release Hazırlığı

cd backend
git checkout develop
git pull
git checkout -b release/v1.2.0
git merge develop
git tag -a v1.2.0 -m "Backend release v1.2.0"
git push origin v1.2.0


Ana Repo Güncelleme

cd ..
git checkout develop
git pull
git add backend
git commit -m "chore: update backend submodule to v1.2.0"
git push


Frontend Release Hazırlığı

git checkout -b release/v1.2.0
git merge develop
git tag -a v1.2.0 -m "Frontend release v1.2.0"
git push origin v1.2.0


Bu noktada hem frontend hem backend v1.2.0 olarak tag’lenmiş olur
ve production’a deploy edilebilir.

🛠️ 5. Hotfix Süreci

Production ortamında bir hata bulunduğunda:

Ana repo:

git checkout main
git checkout -b hotfix/fix-header-bug


Backend gerekiyorsa:

cd backend
git checkout main
git checkout -b hotfix/fix-api-response


Düzeltme yapıldıktan sonra her iki repoda main branch’e merge edilir.

Backend submodule pointer’ı ana repo’da güncellenir.

Her iki tarafta da yeni tag (v1.2.1) oluşturulur.

🧩 6. CI/CD Önerisi (Opsiyonel)

Ana repo pipeline’ı içinde:

steps:
  - name: Checkout submodules
    run: git submodule update --init --recursive

  - name: Install & Build Frontend
    run: cd frontend && npm install && npm run build

  - name: Deploy Frontend
    run: npm run deploy


Backend kendi repo’sunda bağımsız CI/CD ile deploy edilir (örn. api.yourapp.com).

🧭 Özet (Basitleştirilmiş Akış)
feature → develop → release → main


Her iki repo ayrı, ama:

Feature geliştirmelerinde paralel çalışır.

Backend değişiklikleri submodule pointer’ı ile senkronize edilir.

Release ve tag’ler uyumlu versiyonlanır.