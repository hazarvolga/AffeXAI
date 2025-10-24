# AI Chatbox ve Chat Context Analizi

**Tarih**: 2025-10-24  
**Durum**: Eksik Implementasyon Analizi  
**Hedef**: Portal Support New sayfasında AI destekli chatbox

---

## 📊 Mevcut Durum Analizi

### ✅ Mevcut Yapılar:

#### 1. **AI Analiz Sistemi** (Çalışıyor)
- **Lokasyon**: `/portal/support/new`
- **Teknoloji**: Google Genkit + Gemini 2.5 Flash
- **Özellik**: Support ticket analizi ve öneri sistemi
- **Durum**: ✅ Aktif ve çalışıyor

```typescript
// apps/frontend/src/ai/flows/support-ticket-analysis.ts
export async function analyzeSupportTicket(input: {
  problemDescription: string;
  category: string;
}): Promise<{
  summary: string;
  priority: 'Düşük' | 'Normal' | 'Yüksek';
  suggestion: string;
}>
```

#### 2. **Knowledge Base Sistemi** (Tam)
- **Admin**: `/admin/support/knowledge-base` ✅
- **Portal**: `/portal/kb` ✅
- **Backend**: `KnowledgeBaseService` ✅
- **Entities**: `KnowledgeBaseArticle`, `KnowledgeBaseCategory` ✅

#### 3. **FAQ Learning Sistemi** (Tam)
- **Admin**: `/admin/support/faq-learning` ✅
- **Backend**: `FaqLearningService` ✅
- **Entities**: `LearnedFaqEntry`, `LearningPattern` ✅

#### 4. **Chat Infrastructure** (Kısmi)
- **Entities**: `ChatSession`, `ChatMessage` ✅
- **Backend Services**: Eksik ❌
- **Frontend Chat UI**: Eksik ❌

### ❌ Eksik Yapılar:

#### 1. **AI Destekli Chatbox** (Portal)
- **Lokasyon**: `/portal/support/new` sayfasında olması gereken
- **Özellik**: Real-time AI chat desteği
- **Durum**: ❌ Mevcut değil

#### 2. **Chat Context Sistemi**
- **Bilgi Kaynakları**: 
  - Knowledge Base articles ✅ (mevcut)
  - FAQ Learning entries ✅ (mevcut)  
  - Word/TXT/MD/PDF dosyaları ❌ (eksik)
  - URL scraping ❌ (eksik)
- **Context Engine**: ❌ Eksik

#### 3. **Multi-Provider AI Integration**
- **Mevcut**: Sadece Genkit (Google Gemini)
- **Hedef**: AI Settings'teki provider'ları kullanma
- **Durum**: ❌ Entegrasyon eksik

---

## 🏗️ Gerekli Implementasyon

### Phase 1: Chat Context Engine (Backend)

#### A. Document Processing Service
```typescript
// apps/backend/src/modules/chat/services/document-processor.service.ts
@Injectable()
export class DocumentProcessorService {
  async processDocument(file: Buffer, type: 'pdf' | 'docx' | 'txt' | 'md'): Promise<{
    content: string;
    metadata: any;
  }>;
  
  async processUrl(url: string): Promise<{
    content: string;
    title: string;
    metadata: any;
  }>;
}
```

#### B. Chat Context Service
```typescript
// apps/backend/src/modules/chat/services/chat-context.service.ts
@Injectable()
export class ChatContextService {
  async buildContext(query: string): Promise<{
    knowledgeBase: KnowledgeBaseArticle[];
    faqEntries: LearnedFaqEntry[];
    documents: ProcessedDocument[];
    relevanceScore: number;
  }>;
  
  async searchRelevantContent(query: string, limit: number): Promise<ContextItem[]>;
}
```

#### C. AI Chat Service
```typescript
// apps/backend/src/modules/chat/services/ai-chat.service.ts
@Injectable()
export class AiChatService {
  async generateResponse(
    message: string,
    context: ChatContext,
    sessionId: string
  ): Promise<{
    response: string;
    sources: ContextSource[];
    confidence: number;
  }>;
}
```

### Phase 2: Chat UI Components (Frontend)

#### A. Chat Context Provider
```typescript
// apps/frontend/src/components/chat/ChatContextProvider.tsx
export const ChatContextProvider = ({ children }) => {
  // Context management
  // File upload handling
  // URL processing
  // Knowledge base integration
};
```

#### B. AI Chatbox Component
```typescript
// apps/frontend/src/components/chat/AiChatbox.tsx
export const AiChatbox = () => {
  // Real-time messaging
  // Context-aware responses
  // Source citations
  // File upload support
};
```

#### C. Integration with Support New Page
```typescript
// apps/frontend/src/app/portal/support/new/page.tsx
// Add chatbox alongside existing form
<div className="grid lg:grid-cols-2 gap-8">
  <div>
    {/* Existing form */}
  </div>
  <div>
    <AiChatbox />
  </div>
</div>
```

### Phase 3: Multi-Provider Integration

#### A. Connect to AI Settings
```typescript
// Use AI Settings API keys instead of hardcoded Genkit
const aiSettings = await settingsService.getAiSettings();
const supportConfig = aiSettings.support;

// Use selected provider/model
const response = await aiService.generateCompletion(
  supportConfig.apiKey || aiSettings.global?.apiKey,
  prompt,
  {
    model: supportConfig.model,
    provider: supportConfig.provider
  }
);
```

---

## 🎯 Önerilen Mimari

### Chat Context Flow
```
User Message
     ↓
Context Builder
     ├─ Knowledge Base Search
     ├─ FAQ Learning Search  
     ├─ Document Search
     └─ URL Content (if provided)
     ↓
AI Service (Multi-Provider)
     ├─ OpenAI GPT-4o
     ├─ Anthropic Claude
     ├─ Google Gemini
     ├─ OpenRouter Models
     └─ Local AI
     ↓
Response + Sources
     ↓
Chat UI (Real-time)
```

### Database Schema
```sql
-- Chat sessions for context tracking
CREATE TABLE chat_contexts (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id),
  context_type VARCHAR(50), -- 'knowledge_base', 'faq', 'document', 'url'
  source_id UUID,
  content TEXT,
  relevance_score FLOAT,
  created_at TIMESTAMP
);

-- Document storage for uploaded files
CREATE TABLE chat_documents (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id),
  filename VARCHAR(255),
  file_type VARCHAR(10),
  content TEXT, -- Extracted text content
  metadata JSONB,
  created_at TIMESTAMP
);
```

---

## 📋 Implementation Checklist

### Backend (2-3 gün)
- [ ] Create `modules/chat` directory structure
- [ ] Implement `DocumentProcessorService` (PDF, DOCX, TXT, MD parsing)
- [ ] Implement `UrlScrapingService` for web content
- [ ] Implement `ChatContextService` for context building
- [ ] Implement `AiChatService` with multi-provider support
- [ ] Create chat-related entities and DTOs
- [ ] Add chat endpoints to controllers
- [ ] Integrate with existing AI Settings system

### Frontend (2-3 gün)
- [ ] Create `components/chat` directory
- [ ] Implement `AiChatbox` component with real-time messaging
- [ ] Implement file upload for documents
- [ ] Implement URL input for web content
- [ ] Add context visualization (sources, relevance)
- [ ] Integrate with `/portal/support/new` page
- [ ] Add chat history and session management
- [ ] Implement responsive design for mobile

### Integration (1 gün)
- [ ] Connect chat system to AI Settings
- [ ] Test all AI providers in chat context
- [ ] Test document processing pipeline
- [ ] Test knowledge base integration
- [ ] Test FAQ learning integration
- [ ] End-to-end testing

---

## 🚀 Sonuç

**Mevcut Durum**: 
- ✅ AI analiz sistemi çalışıyor (Genkit)
- ✅ Knowledge Base tam
- ✅ FAQ Learning tam
- ❌ **AI Chatbox eksik**
- ❌ **Chat Context sistemi eksik**

**Gerekli İş**: ~5-6 günlük development ile tam AI destekli chatbox sistemi kurulabilir.

**Öncelik Sırası**:
1. Chat Context Engine (backend)
2. AI Chatbox UI (frontend)  
3. Multi-provider entegrasyonu
4. Document processing
5. Testing ve polish

Bu implementasyon tamamlandığında kullanıcılar:
- Real-time AI chat desteği alabilecek
- Dosya yükleyip içeriği hakkında soru sorabilecek
- URL paylaşıp web içeriği analiz ettirebilecek
- Knowledge Base ve FAQ'lardan otomatik öneri alabilecek
- Farklı AI provider'ları kullanabilecek (OpenAI, Claude, Gemini, vs.)