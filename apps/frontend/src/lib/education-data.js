"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationData = void 0;
const lucide_react_1 = require("lucide-react");
exports.educationData = {
    tabs: [
        { id: 'training', title: 'Eğitim & Danışmanlık', icon: lucide_react_1.GraduationCap },
        { id: 'downloads', title: 'İndirme Merkezi', icon: lucide_react_1.Download },
        { id: 'support', title: 'Destek', icon: lucide_react_1.LifeBuoy },
        { id: 'videos', title: 'Videolar', icon: lucide_react_1.Video },
        { id: 'students', title: 'Öğrenciler İçin', icon: lucide_react_1.GraduationCapIcon },
        { id: 'documents', title: 'Dökümanlar', icon: lucide_react_1.Files },
    ],
    content: {
        training: [
            { title: 'Allplan Temel Eğitimi', date: 'Her Ayın İlk Haftası', description: 'Allplan\'a yeni başlayanlar için kapsamlı başlangıç eğitimi.', ctaText: 'Kayıt Ol', ctaLink: '#' },
            { title: 'İleri Düzey Mimari Modelleme', date: '15.08.2024', description: 'Karmaşık geometriler ve organik formlar üzerine yoğunlaşmış atölye çalışması.', ctaText: 'Detaylar', ctaLink: '#' },
            { title: 'Köprü Tasarımı ve Analizi', date: '22.08.2024', description: 'Allplan Bridge ile parametrik köprü tasarımı ve analizi eğitimi.', ctaText: 'Kayıt Ol', ctaLink: '#' },
            { title: 'Kurumsal Danışmanlık', date: 'Sürekli', description: 'Firmanızın ihtiyaçlarına özel BIM süreçleri ve Allplan optimizasyonu.', ctaText: 'Bilgi Al', ctaLink: '#' },
        ],
        downloads: [
            { title: 'Allplan 2024 Sürüm Notları', category: 'Sürüm Notları', ctaLink: '#' },
            { title: 'Mimarlar için Kısayol Tuşları', category: 'Yardımcı Döküman', ctaLink: '#' },
            { title: 'Allplan PythonParts Kılavuzu', category: 'Geliştirici', ctaLink: '#' },
            { title: 'BIM Koordinasyon Kontrol Listesi', category: 'BIM', ctaLink: '#' },
        ],
        support: [
            { id: 'customer-access', title: 'Müşteri Erişimi', description: 'Lisans ve abonelik bilgilerinize erişin.', ctaText: 'Giriş Yap', ctaLink: '#', icon: lucide_react_1.UserCheck },
            { id: 'remote-access', title: 'Uzaktan Erişim', description: 'Destek ekibimize uzaktan erişim izni verin.', ctaText: 'Bağlan', ctaLink: '#', icon: lucide_react_1.Tv },
            { id: 'support-ticket', title: 'Destek Talebi', description: 'Teknik destek ekibimizle iletişime geçin.', ctaText: 'Talep Aç', ctaLink: '#', icon: lucide_react_1.LifeBuoy },
        ],
        videos: [
            { title: 'Allplan 2024 Yenilikleri', description: 'Yeni sürümdeki öne çıkan özellikleri keşfedin.', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/vid1/400/225' },
            { title: 'Bimplus ile Proje İşbirliği', description: 'Bulut tabanlı işbirliği platformunun gücünü görün.', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/vid2/400/225' },
            { title: 'Parametrik Tasarım İpuçları', description: 'Allplan\'da parametrik modelleme teknikleri.', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/vid3/400/225' },
            { title: 'Prekast Detaylandırma Otomasyonu', description: 'Üretim süreçlerinizi nasıl hızlandırabilirsiniz?', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/vid4/400/225' },
        ],
        students: [
            { title: 'Öğrenci Lisansı', description: 'Allplan\'ı eğitim hayatınız boyunca ücretsiz kullanın.', ctaText: 'Başvur', ctaLink: '#' },
            { title: 'Kampüs Etkinlikleri', description: 'Üniversitenizde düzenlediğimiz atölye ve seminerlere katılın.', ctaText: 'Takvimi Gör', ctaLink: '#' },
        ],
        documents: [
            { title: 'Allplan Kurulum Kılavuzu', category: 'Kurulum', ctaLink: '#' },
            { title: 'Yapısal Analiz Entegrasyonu', category: 'Teknik Döküman', ctaLink: '#' },
            { title: 'IFC Veri Alışverişi Rehberi', category: 'BIM', ctaLink: '#' },
        ],
    }
};
//# sourceMappingURL=education-data.js.map