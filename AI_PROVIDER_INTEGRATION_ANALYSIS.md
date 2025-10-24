# AI Provider Entegrasyonu - Analiz ve Plan

## 📊 Mevcut Durum Analizi

### Kullanıcı AI Tercihleri Sistemi

Sistemde **iki seviyeli AI provider yönetimi** var:

#### 1. **Global AI Preference** (Önerilen - Basit Kullanım)
- Tek API key ile tüm modüller için geçerli
- Kullanıcı bir kez ayarlar, her yerde kullanılır
- Tablo: `global_ai_preferences`
- Endpoint: `/user-ai-preferences/global/preference`

#### 2. **Module-Specific AI Preference** (İleri Kullanım)
- Her modül için farklı AI provider seçilebilir
- Modül bazında özelleştirme
- Tablo: `user_ai_preferences`
- Endpoint: `/user-ai-preferences`

### Desteklenen Modüller

```typescript
enum AiModule {
  EMAIL = 'email',                      // Email Marketing
  SOCIAL = 'social',                    // Social Media Management
  SUPPORT_AGENT = 'support_agent',      // Destek Merkezi - Agent AI
  SUPPORT_CHATBOT = 'support_chatbot',  // Web Sitesi - Chatbot
  ANALYTICS = 'analytics',              // Analytics & Reporting
  FAQ_AUTO_RESPONSE = 'faq_auto_response' // ⭐ Otomatik FAQ Oluşturma
}
```

### Desteklenen AI Providers

```typescript
enum AiProvider {
  OPENAI = 'openai',           // GPT-4, GPT-3.5
  ANTHROPIC = 'anthropic',     // Claude 3.5, Claude 3
  GOOGLE = 'google',           // Gemini Pro, Flash
  OPENROUTER = 'openrouter'    // 100+ models
}
```

---

## 🎯 FAQ Learning Sistemi İçin Gereksinimler

### Mevcut Durum (FAQ Learning)

FAQ Learning sistemi şu anda **kendi AI provider yönetimi** yapıyor:
- `apps/backend/src/modules/faq-learning/services/ai-providers/`
  - `openai.provider.ts`
  - `anthropic.provider.ts`
- `apps/backend/src/modules/faq-learning/services/faq-ai.service.ts`

**Sorun:** Kullanıcı tercihleri ile entegre değil!

### Hedef Durum

FAQ Learning sistemi **kullanıcı AI tercihlerini** kullanmalı:

1. **Kullanıcı global ayar yaptıysa** → Global provider kullan
2. **Kullanıcı FAQ modülü için özel ayar yaptıysa** → Modül-specific provider kullan
3. **Hiçbir ayar yoksa** → Sistem default provider kullan (fallback)

---

## 🔧 Entegrasyon Planı

### Faz 1: Backend Entegrasyonu

#### 1.1. FAQ AI Service Güncelleme

`faq-ai.service.ts` dosyasını güncelleyerek kullanıcı tercihlerini kullan:

```typescript
// apps/backend/src/modules/faq-learning/services/faq-ai.service.ts

import { UserAiPreferencesService } from '../../user-ai-preferences/services/user-ai-preferences.service';

@Injectable()
export class FaqAiService {
  constructor(
    private readonly userAiPreferencesService: UserAiPreferencesService,
    // ... existing providers
  ) {}

  /**
   * Get AI provider for user
   * Priority: Module-specific > Global > System default
   */
  async getProviderForUser(userId: string): Promise<{
    provider: string;
    model: string;
    apiKey: string;
  }> {
    // 1. Check module-specific preference
    const modulePreference = await this.userAiPreferencesService
      .getUserPreferenceForModule(userId, 'faq_auto_response');
    
    if (modulePreference && modulePreference.enabled && modulePreference.apiKey) {
      return {
        provider: modulePreference.provider,
        model: modulePreference.model,
        apiKey: modulePreference.apiKey
      };
    }

    // 2. Check global preference
    const globalPreference = await this.userAiPreferencesService
      .getGlobalPreference(userId);
    
    if (globalPreference && globalPreference.enabled && globalPreference.apiKey) {
      return {
        provider: globalPreference.provider,
        model: globalPreference.model,
        apiKey: globalPreference.apiKey
      };
    }

    // 3. Fallback to system default (from config)
    return {
      provider: process.env.DEFAULT_AI_PROVIDER || 'openai',
      model: process.env.DEFAULT_AI_MODEL || 'gpt-4o',
      apiKey: process.env.DEFAULT_AI_API_KEY || ''
    };
  }

  /**
   * Generate FAQ using user's preferred AI
   */
  async generateFaq(userId: string, prompt: string): Promise<string> {
    const { provider, model, apiKey } = await this.getProviderForUser(userId);
    
    // Use appropriate provider
    switch (provider) {
      case 'openai':
        return this.openaiProvider.generate(prompt, model, apiKey);
      case 'anthropic':
        return this.anthropicProvider.generate(prompt, model, apiKey);
      case 'google':
        return this.googleProvider.generate(prompt, model, apiKey);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
```

#### 1.2. Controller Güncelleme

FAQ Learning controller'larına `userId` parametresi ekle:

```typescript
// apps/backend/src/modules/faq-learning/controllers/faq-learning.controller.ts

@Post('start')
@Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
async startLearning(
  @Req() req: any,
  @Body() dto: StartLearningDto
): Promise<any> {
  const userId = req.user.id; // Get user ID from JWT
  
  // Pass userId to service
  const result = await this.faqLearningService.runLearningPipeline(
    criteria,
    userId // NEW: Pass user ID
  );
  
  return { success: true, result };
}
```

#### 1.3. Module Dependency Ekleme

```typescript
// apps/backend/src/modules/faq-learning/faq-learning.module.ts

import { UserAiPreferencesModule } from '../user-ai-preferences/user-ai-preferences.module';

@Module({
  imports: [
    UserAiPreferencesModule, // NEW: Import user preferences module
    // ... existing imports
  ],
  // ...
})
export class FaqLearningModule {}
```

---

### Faz 2: Frontend Entegrasyonu

#### 2.1. AI Provider Sayfasını Güncelle

`/admin/support/faq-learning/providers/page.tsx` sayfasını kaldır veya redirect et:

```typescript
// apps/frontend/src/app/admin/support/faq-learning/providers/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowRight, Settings } from 'lucide-react';

export default function FaqProvidersRedirect() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-4">
            <p className="font-medium">
              AI Provider ayarları artık kişisel tercihler sayfasında yönetiliyor.
            </p>
            <p className="text-sm text-muted-foreground">
              FAQ Otomatik Oluşturma modülü için AI provider seçimi yapabilir,
              global ayar kullanabilir veya her modül için özel ayar yapabilirsiniz.
            </p>
            <Button onClick={() => router.push('/admin/profile/ai-preferences')}>
              <Settings className="h-4 w-4 mr-2" />
              AI Tercihlerine Git
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

#### 2.2. Dashboard'a AI Provider Durumu Ekle

Dashboard'da kullanıcının AI tercihlerini göster:

```typescript
// apps/frontend/src/app/admin/support/faq-learning/page.tsx

// Add to dashboard
<Card>
  <CardHeader>
    <CardTitle>AI Provider Durumu</CardTitle>
    <CardDescription>
      FAQ oluşturma için kullanılan AI provider
    </CardDescription>
  </CardHeader>
  <CardContent>
    {userAiPreference ? (
      <div className="space-y-2">
        <Badge variant="default">
          {userAiPreference.provider} - {userAiPreference.model}
        </Badge>
        <p className="text-sm text-muted-foreground">
          {userAiPreference.isGlobal 
            ? '🌐 Global ayar kullanılıyor' 
            : '⚙️ Özel ayar kullanılıyor'}
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/admin/profile/ai-preferences')}
        >
          <Settings className="h-4 w-4 mr-2" />
          AI Ayarlarını Değiştir
        </Button>
      </div>
    ) : (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          AI provider ayarlanmamış. FAQ oluşturma çalışmayacak.
          <Button 
            variant="link" 
            onClick={() => router.push('/admin/profile/ai-preferences')}
          >
            Şimdi Ayarla
          </Button>
        </AlertDescription>
      </Alert>
    )}
  </CardContent>
</Card>
```

---

### Faz 3: Migration ve Veri Taşıma

Eğer FAQ Learning sisteminde mevcut provider ayarları varsa, bunları user preferences'a taşı:

```typescript
// Migration script
async function migrateExistingProviders() {
  // Get all FAQ learning configs
  const configs = await faqLearningConfigRepo.find();
  
  for (const config of configs) {
    if (config.provider && config.apiKey) {
      // Create user preference
      await userAiPreferencesService.upsertPreference(config.userId, {
        module: 'faq_auto_response',
        provider: config.provider,
        model: config.model,
        apiKey: config.apiKey,
        enabled: true
      });
    }
  }
}
```

---

## ✅ Avantajlar

### Kullanıcı Perspektifi

1. **Tek Yerden Yönetim:** Tüm AI ayarları tek sayfada
2. **Esneklik:** Global veya modül-specific seçim
3. **Maliyet Kontrolü:** Her modül için farklı model seçebilme
4. **Güvenlik:** API key'ler şifreli saklanıyor

### Geliştirici Perspektifi

1. **Kod Tekrarı Yok:** Merkezi AI provider yönetimi
2. **Bakım Kolaylığı:** Tek bir sistem
3. **Tutarlılık:** Tüm modüller aynı yapıyı kullanıyor
4. **Genişletilebilirlik:** Yeni modül eklemek kolay

---

## 📋 İmplementasyon Checklist

### Backend
- [ ] `FaqAiService`'e `UserAiPreferencesService` inject et
- [ ] `getProviderForUser()` metodunu implement et
- [ ] `generateFaq()` metodunu user preferences kullanacak şekilde güncelle
- [ ] Controller'lara `userId` parametresi ekle
- [ ] `FaqLearningModule`'e `UserAiPreferencesModule` import et
- [ ] Mevcut provider config'leri migrate et

### Frontend
- [ ] Providers sayfasını redirect sayfasına çevir
- [ ] Dashboard'a AI provider durumu ekle
- [ ] Settings sayfasından provider ayarlarını kaldır
- [ ] AI Preferences sayfasına FAQ modülü eklendiğini doğrula

### Testing
- [ ] Global preference ile FAQ oluşturma test et
- [ ] Module-specific preference ile FAQ oluşturma test et
- [ ] Fallback (no preference) durumunu test et
- [ ] Provider switch test et
- [ ] API key validation test et

---

## 🚀 Tahmini Süre

- **Backend Entegrasyonu:** 3 saat
- **Frontend Güncellemeleri:** 2 saat
- **Testing ve Bug Fixes:** 2 saat
- **Toplam:** 7 saat

---

## 💡 Öneriler

1. **Önce Backend:** Backend entegrasyonunu tamamla, sonra frontend'e geç
2. **Fallback Önemli:** System default provider mutlaka olmalı
3. **Error Handling:** API key geçersizse kullanıcıya net mesaj göster
4. **Monitoring:** Hangi provider'ın ne kadar kullanıldığını logla
5. **Documentation:** Kullanıcılara AI preferences kullanımını anlat
