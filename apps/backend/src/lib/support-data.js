"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportTickets = exports.supportCategories = void 0;
exports.supportCategories = [
    { id: 'cat-01', name: 'Teknik', description: 'Yazılım, donanım ve ağ sorunları.', ticketCount: 28, parentId: null },
    { id: 'cat-01-01', name: 'Yazılım', description: 'Uygulama kurulumu, lisanslama ve kullanım sorunları.', ticketCount: 15, parentId: 'cat-01' },
    { id: 'cat-01-02', name: 'Donanım', description: 'Cihaz uyumluluğu ve sürücü sorunları.', ticketCount: 5, parentId: 'cat-01' },
    { id: 'cat-01-03', name: 'Lisanslama', description: 'Lisans anahtarı aktivasyonu ve yönetimi.', ticketCount: 8, parentId: 'cat-01' },
    { id: 'cat-02', name: 'Faturalama', description: 'Ödeme, fatura ve abonelikle ilgili sorular.', ticketCount: 12, parentId: null },
    { id: 'cat-03', name: 'Genel', description: 'Eğitim, danışmanlık ve diğer genel sorular.', ticketCount: 45, parentId: null },
    { id: 'cat-04', name: 'Özellik Talebi', description: 'Yazılım için yeni özellik ve geliştirme talepleri.', ticketCount: 8, parentId: null },
];
exports.supportTickets = [
    {
        id: 'tkt-001',
        subject: 'Lisans anahtarım çalışmıyor',
        category: 'Teknik',
        priority: 'High',
        status: 'Open',
        createdAt: '2024-07-28T10:00:00.000Z',
        lastUpdated: '2024-07-28T10:00:00.000Z',
        user: {
            id: 'usr-portal-01',
            name: 'Ayşe Vural',
            email: 'ayse.vural@example.com',
            company: 'Vural Mimarlık',
        },
        assignee: {
            id: 'usr-002',
            name: 'Zeynep Kaya',
            avatarUrl: 'https://i.pravatar.cc/150?u=zeynep-kaya',
        },
        messages: [
            {
                author: {
                    id: 'usr-portal-01',
                    name: 'Ayşe Vural',
                    avatarUrl: 'https://i.pravatar.cc/150?u=ayse-vural',
                },
                content: 'Merhaba, yeni satın aldığım Allplan 2024 lisans anahtarını girdiğimde "geçersiz anahtar" hatası alıyorum. Yardımcı olabilir misiniz?',
                timestamp: '2024-07-28T10:00:00.000Z',
            },
        ],
    },
    {
        id: 'tkt-002',
        subject: 'Faturamı nasıl indirebilirim?',
        category: 'Faturalama',
        priority: 'Medium',
        status: 'Resolved',
        createdAt: '2024-07-27T14:30:00.000Z',
        lastUpdated: '2024-07-27T16:00:00.000Z',
        user: {
            id: 'usr-portal-02',
            name: 'Burak Çelik',
            email: 'burak.celik@example.com',
            company: 'Çelik İnşaat',
        },
        assignee: {
            id: 'usr-002',
            name: 'Zeynep Kaya',
            avatarUrl: 'https://i.pravatar.cc/150?u=zeynep-kaya',
        },
        messages: [
            {
                author: {
                    id: 'usr-portal-02',
                    name: 'Burak Çelik',
                    avatarUrl: 'https://i.pravatar.cc/150?u=burak-celik',
                },
                content: 'Geçen haftaki danışmanlık hizmeti için faturama ihtiyacım var ama portalda bulamadım.',
                timestamp: '2024-07-27T14:30:00.000Z',
            },
            {
                author: {
                    id: 'usr-002',
                    name: 'Zeynep Kaya',
                    avatarUrl: 'https://i.pravatar.cc/150?u=zeynep-kaya',
                },
                content: 'Merhaba Burak Bey, faturanız e-posta adresinize yeniden gönderilmiştir. Ayrıca portaldeki "Faturalarım" bölümünden de erişebilirsiniz. İyi çalışmalar.',
                timestamp: '2024-07-27T16:00:00.000Z',
            },
        ],
    },
    {
        id: 'tkt-003',
        subject: 'PythonPart oluşturma hakkında soru',
        category: 'Genel',
        priority: 'Low',
        status: 'In Progress',
        createdAt: '2024-07-29T09:00:00.000Z',
        lastUpdated: '2024-07-29T11:00:00.000Z',
        user: {
            id: 'usr-portal-03',
            name: 'Deniz Arslan',
            email: 'deniz.arslan@example.com',
            company: 'Arslan Proje',
        },
        assignee: {
            id: 'usr-001',
            name: 'Ahmet Yılmaz',
            avatarUrl: 'https://i.pravatar.cc/150?u=ahmet-yilmaz',
        },
        messages: [
            {
                author: {
                    id: 'usr-portal-03',
                    name: 'Deniz Arslan',
                    avatarUrl: 'https://i.pravatar.cc/150?u=deniz-arslan',
                },
                content: 'Kendi özel PythonPart\'larımı oluşturmak için nereden başlayabilirim? Bununla ilgili bir döküman var mı?',
                timestamp: '2024-07-29T09:00:00.000Z',
            },
            {
                author: {
                    id: 'usr-001',
                    name: 'Ahmet Yılmaz',
                    avatarUrl: 'https://i.pravatar.cc/150?u=ahmet-yilmaz',
                },
                content: 'Merhaba Deniz Hanım, talebiniz ilgili teknik ekibe yönlendirilmiştir. Size en kısa sürede konuyla ilgili kaynakları ve başlangıç adımlarını içeren bir e-posta gönderecekler.',
                timestamp: '2024-07-29T11:00:00.000Z',
            },
        ],
    },
];
__exportStar(require("./types"), exports);
//# sourceMappingURL=support-data.js.map