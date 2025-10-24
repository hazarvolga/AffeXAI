# AI Support Chatbox Components

Bu dizin, AI destekli destek chatbox sistemi için gerekli React bileşenlerini içerir.

## Bileşenler

### ChatBox
Ana chatbox bileşeni. Real-time mesajlaşma, dosya yükleme, URL işleme ve bağlam görselleştirme özelliklerini içerir.

**Özellikler:**
- Modern, responsive tasarım
- Real-time WebSocket bağlantısı
- Mesaj geçmişi ve oturum yönetimi
- Dosya yükleme ve URL işleme arayüzleri
- Minimize/maximize/kapatma kontrolleri
- Mobil uyumlu düzen

**Kullanım:**
```tsx
import { ChatBox } from '@/components/support/chatbox';

<ChatBox 
  sessionType="support" // veya "general"
  onSessionCreate={(session) => console.log(session)}
  onMessageSent={(message) => console.log(message)}
/>
```

### ChatMessage
Tek bir chat mesajını görüntüleyen bileşen. Farklı mesaj türlerini ve bağlam kaynaklarını destekler.

**Özellikler:**
- Gönderen türüne göre farklı görünüm (user, ai, support)
- Mesaj türü desteği (text, file, url, system)
- Bağlam kaynağı görselleştirme
- Mesaj kopyalama özelliği
- Zaman damgası ve metadata gösterimi

### FileUploadArea
Dosya yükleme arayüzü. Sürükle & bırak desteği ve dosya işleme durumu gösterimi.

**Özellikler:**
- Sürükle & bırak arayüzü
- Çoklu dosya desteği
- Dosya türü ve boyut doğrulama
- Yükleme ilerleme göstergesi
- Desteklenen formatlar: PDF, DOCX, XLSX, TXT, MD, JPEG, PNG, GIF

**Desteklenen Dosya Türleri:**
- PDF belgeler
- Word belgeleri (DOCX)
- Excel elektronik tabloları (XLSX)
- Metin dosyaları (TXT, MD)
- Resim dosyaları (JPEG, PNG, GIF)

### UrlInputArea
URL girme ve işleme arayüzü. Web sayfası içeriğini analiz eder ve önizleme sağlar.

**Özellikler:**
- URL doğrulama
- İçerik önizleme
- İşleme durumu göstergesi
- Hata yönetimi
- Desteklenen siteler için özel önizlemeler

### TypingIndicator
Yazma göstergesi bileşeni. Kullanıcı veya AI yazarken animasyonlu gösterge.

**Özellikler:**
- Animasyonlu yazma göstergesi
- Kullanıcı türü desteği (AI, support)
- Özelleştirilebilir kullanıcı adı

### ContextSourceVisualization
AI yanıtlarında kullanılan bağlam kaynaklarını görselleştiren bileşen.

**Özellikler:**
- Kaynak türü göstergeleri (KB, FAQ, Document, URL)
- Alaka düzeyi skorları
- Genişletilebilir kaynak detayları
- Tıklanabilir alıntılar
- Dış bağlantı desteği

**Desteklenen Kaynak Türleri:**
- Knowledge Base makaleleri
- FAQ Learning girişleri
- Yüklenen belgeler
- Web sayfaları

## Hooks

### useChatSocket
WebSocket bağlantısını yöneten React hook'u.

**Özellikler:**
- Otomatik bağlantı yönetimi
- Yeniden bağlanma mantığı
- Real-time event handling
- Dosya yükleme ve URL işleme desteği
- Yazma göstergeleri

**Kullanım:**
```tsx
import { useChatSocket } from '@/hooks/use-chat-socket';

const {
  isConnected,
  sendMessage,
  uploadFile,
  processUrl,
  startTyping,
  stopTyping
} = useChatSocket({
  onMessageReceived: (message) => console.log(message),
  onAiResponseStart: (sessionId) => console.log('AI started'),
  onAiResponseComplete: (message) => console.log('AI completed')
});
```

## Kurulum ve Kullanım

1. **Bağımlılıklar**: Tüm gerekli UI bileşenleri ve socket.io-client zaten mevcut.

2. **WebSocket Sunucusu**: Backend'de WebSocket sunucusunun çalışıyor olması gerekir.

3. **Çevre Değişkenleri**:
   ```env
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

4. **Temel Kullanım**:
   ```tsx
   import { ChatBox } from '@/components/support/chatbox';
   
   export default function SupportPage() {
     return (
       <div>
         {/* Sayfa içeriği */}
         <ChatBox sessionType="support" />
       </div>
     );
   }
   ```

## Demo

Chatbox bileşenlerini test etmek için demo sayfasını ziyaret edin:
`/portal/support/chatbox-demo`

Demo sayfası şu özellikleri test etmenizi sağlar:
- Real-time mesajlaşma simülasyonu
- Dosya yükleme ve işleme durumu
- URL analizi ve önizleme
- Bağlam kaynağı görselleştirme
- Farklı oturum türleri (destek/genel)
- Responsive tasarım ve mobil uyumluluk

## Geliştirme Notları

- Tüm bileşenler TypeScript ile yazılmıştır
- Tailwind CSS ve shadcn/ui bileşenleri kullanılmıştır
- WebSocket bağlantısı otomatik olarak yönetilir
- Mobil uyumluluk için responsive tasarım uygulanmıştır
- Erişilebilirlik standartlarına uygun geliştirilmiştir

## Gelecek Geliştirmeler

- Ses mesajı desteği
- Emoji ve GIF desteği
- Mesaj arama özelliği
- Tema özelleştirme seçenekleri
- Çoklu dil desteği