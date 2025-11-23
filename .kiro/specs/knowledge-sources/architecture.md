# Knowledge Sources - Architecture Design

**Version:** 1.0 (MVP)
**Last Updated:** 2025-10-25

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Integration Points](#integration-points)
6. [Data Flow](#data-flow)
7. [API Endpoints](#api-endpoints)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 15)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ Admin UI         │  │ Customer Portal  │  │ Knowledge     │ │
│  │ - Upload Files   │  │ - Browse Sources │  │ Sources List  │ │
│  │ - Manage Sources │  │ - Search         │  │ - Filtering   │ │
│  │ - Analytics      │  │ - Preview        │  │ - Tagging     │ │
│  └──────────────────┘  └──────────────────┘  └───────────────┘ │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST API
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (NestJS 11)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Knowledge Sources Module                     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Controllers:                                             │  │
│  │  - CompanyKnowledgeSourceController (CRUD, Upload)        │  │
│  │  - KnowledgeSourceAnalyticsController (Stats, Reports)   │  │
│  │                                                            │  │
│  │  Services:                                                 │  │
│  │  - CompanyKnowledgeSourceService (Business Logic)         │  │
│  │  - KnowledgeSourceProcessorService (Orchestration)        │  │
│  │  - KnowledgeSourceContextService (Search & Ranking)       │  │
│  │  - FaqLearningKnowledgeSourceService (FAQ Integration)    │  │
│  │  - KnowledgeSourceAnalyticsService (Usage Tracking)       │  │
│  │                                                            │  │
│  │  Entities:                                                 │  │
│  │  - CompanyKnowledgeSource (Main entity)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Integration with Existing Modules                 │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Chat Module:                                             │  │
│  │  - ChatContextEngineService (updated)                     │  │
│  │  - Searches company_knowledge_sources table               │  │
│  │                                                            │  │
│  │  FAQ Learning Module:                                     │  │
│  │  - FaqGeneratorService (updated)                          │  │
│  │  - Includes knowledge sources in pattern recognition      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ↓                             ↓
┌──────────────────┐          ┌──────────────────┐
│   PostgreSQL     │          │  Redis + BullMQ  │
│   - Main DB      │          │  - Job Queue     │
│   - pgvector     │          │  - Processing    │
└──────────────────┘          └──────────────────┘
```

---

## Database Schema

### Primary Entity: `company_knowledge_sources`

```typescript
@Entity('company_knowledge_sources')
@Index(['status', 'createdAt'])
@Index(['sourceType'])
@Index(['uploadedById'])
export class CompanyKnowledgeSource extends BaseEntity {
  // Basic Info
  @Column({ length: 500 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: KnowledgeSourceType,
    // 'document', 'url', 'text'
  })
  sourceType: KnowledgeSourceType;

  @Column({
    type: 'enum',
    enum: KnowledgeSourceStatus,
    default: KnowledgeSourceStatus.PENDING,
    // 'pending', 'processing', 'active', 'failed', 'archived'
  })
  status: KnowledgeSourceStatus;

  // Document Fields (for sourceType='document')
  @Column({ length: 1000, nullable: true })
  filePath: string; // S3 or local path

  @Column({ length: 100, nullable: true })
  fileName: string;

  @Column({ length: 50, nullable: true })
  fileType: string; // 'pdf', 'docx', 'xlsx', 'pptx', 'txt', 'md'

  @Column('bigint', { nullable: true })
  fileSize: number; // bytes

  // URL Fields (for sourceType='url')
  @Column({ length: 2000, nullable: true })
  url: string;

  @Column({ nullable: true })
  lastScrapedAt: Date;

  @Column('int', { default: 0 })
  scrapeFailCount: number;

  // Content
  @Column('text')
  extractedContent: string; // Processed text

  @Column('text', { nullable: true })
  summary: string; // AI-generated summary

  @Column('simple-array', { nullable: true })
  tags: string[]; // ['installation', 'api', 'troubleshooting']

  @Column('simple-array', { nullable: true })
  keywords: string[]; // Auto-extracted keywords

  // Vector Embedding (Future - pgvector)
  @Column('vector', { nullable: true })
  embedding: number[]; // For semantic search

  // Metadata
  @Column('jsonb', { default: {} })
  metadata: {
    pageCount?: number;
    wordCount?: number;
    language?: string;
    author?: string;
    createdDate?: Date;
    extractedImages?: number;
    linkCount?: number;
  };

  // Usage Tracking
  @Column('int', { default: 0 })
  usageCount: number; // Times used in AI responses

  @Column('int', { default: 0 })
  helpfulCount: number; // Customer feedback

  @Column('float', { default: 0.0 })
  averageRelevanceScore: number; // 0.0 - 1.0

  // Feature Flags
  @Column('boolean', { default: true })
  enableForFaqLearning: boolean;

  @Column('boolean', { default: true })
  enableForChat: boolean;

  // Relations
  @Column('uuid')
  uploadedById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy: User;

  // Archiving
  @Column({ nullable: true })
  archivedAt: Date;

  @Column('uuid', { nullable: true })
  archivedById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'archivedById' })
  archivedBy: User;

  // Timestamps (from BaseEntity)
  // createdAt, updatedAt, deletedAt
}
```

### Database Migration

```typescript
// YYYYMMDDHHMMSS-create-company-knowledge-sources.ts

export class CreateCompanyKnowledgeSources1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable pgvector extension (future)
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

    // Create table
    await queryRunner.query(`
      CREATE TABLE company_knowledge_sources (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(500) NOT NULL,
        description TEXT,
        source_type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',

        file_path VARCHAR(1000),
        file_name VARCHAR(100),
        file_type VARCHAR(50),
        file_size BIGINT,

        url VARCHAR(2000),
        last_scraped_at TIMESTAMP,
        scrape_fail_count INTEGER DEFAULT 0,

        extracted_content TEXT NOT NULL,
        summary TEXT,
        tags TEXT[],
        keywords TEXT[],
        embedding vector(1536), -- OpenAI ada-002 dimension

        metadata JSONB DEFAULT '{}',

        usage_count INTEGER DEFAULT 0,
        helpful_count INTEGER DEFAULT 0,
        average_relevance_score FLOAT DEFAULT 0.0,

        enable_for_faq_learning BOOLEAN DEFAULT TRUE,
        enable_for_chat BOOLEAN DEFAULT TRUE,

        uploaded_by_id UUID NOT NULL,
        archived_at TIMESTAMP,
        archived_by_id UUID,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP,

        FOREIGN KEY (uploaded_by_id) REFERENCES users(id),
        FOREIGN KEY (archived_by_id) REFERENCES users(id)
      );
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_status_created
      ON company_knowledge_sources(status, created_at DESC);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_source_type
      ON company_knowledge_sources(source_type);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_uploaded_by
      ON company_knowledge_sources(uploaded_by_id);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_tags
      ON company_knowledge_sources USING GIN(tags);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_keywords
      ON company_knowledge_sources USING GIN(keywords);
    `);

    // Full-text search index
    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_content_search
      ON company_knowledge_sources
      USING GIN(to_tsvector('english', extracted_content));
    `);

    // Vector similarity index (future - for semantic search)
    await queryRunner.query(`
      CREATE INDEX idx_company_knowledge_sources_embedding
      ON company_knowledge_sources
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE company_knowledge_sources`);
  }
}
```

---

## Backend Architecture

### Module Structure

```
apps/backend/src/modules/knowledge-sources/
├── knowledge-sources.module.ts
├── entities/
│   ├── company-knowledge-source.entity.ts
│   └── enums/
│       ├── knowledge-source-type.enum.ts
│       └── knowledge-source-status.enum.ts
├── dto/
│   ├── create-knowledge-source.dto.ts
│   ├── update-knowledge-source.dto.ts
│   ├── search-knowledge-sources.dto.ts
│   └── knowledge-source-analytics.dto.ts
├── services/
│   ├── company-knowledge-source.service.ts
│   ├── knowledge-source-processor.service.ts
│   ├── knowledge-source-context.service.ts
│   ├── faq-learning-knowledge-source.service.ts
│   └── knowledge-source-analytics.service.ts
├── controllers/
│   ├── company-knowledge-source.controller.ts
│   └── knowledge-source-analytics.controller.ts
├── jobs/
│   ├── document-processing.job.ts
│   └── url-scraping.job.ts
└── __tests__/
    ├── services/
    └── controllers/
```

### Key Services

#### 1. **CompanyKnowledgeSourceService**

```typescript
@Injectable()
export class CompanyKnowledgeSourceService {
  constructor(
    @InjectRepository(CompanyKnowledgeSource)
    private knowledgeSourceRepository: Repository<CompanyKnowledgeSource>,
    private knowledgeSourceProcessor: KnowledgeSourceProcessorService,
  ) {}

  // CRUD operations
  async create(dto: CreateKnowledgeSourceDto, user: User): Promise<CompanyKnowledgeSource>;
  async findAll(query: SearchKnowledgeSourcesDto): Promise<PaginatedResult<CompanyKnowledgeSource>>;
  async findOne(id: string): Promise<CompanyKnowledgeSource>;
  async update(id: string, dto: UpdateKnowledgeSourceDto): Promise<CompanyKnowledgeSource>;
  async archive(id: string, user: User): Promise<void>;
  async delete(id: string): Promise<void>;

  // File upload
  async uploadDocument(file: Express.Multer.File, dto: CreateDocumentDto, user: User): Promise<CompanyKnowledgeSource>;

  // URL management
  async addUrl(dto: CreateUrlDto, user: User): Promise<CompanyKnowledgeSource>;
  async refreshUrl(id: string): Promise<CompanyKnowledgeSource>;

  // Search
  async search(query: string, filters?: SearchFilters): Promise<CompanyKnowledgeSource[]>;
  async fullTextSearch(query: string): Promise<CompanyKnowledgeSource[]>;

  // Usage tracking
  async incrementUsageCount(id: string): Promise<void>;
  async updateRelevanceScore(id: string, score: number): Promise<void>;
}
```

#### 2. **KnowledgeSourceProcessorService**

```typescript
@Injectable()
export class KnowledgeSourceProcessorService {
  constructor(
    @InjectQueue('knowledge-source-processing') private processingQueue: Queue,
    private documentProcessor: DocumentProcessorService, // Existing from chat module
    private urlProcessor: UrlProcessorService, // Existing from chat module
  ) {}

  // Orchestration
  async processDocument(sourceId: string, filePath: string): Promise<void>;
  async processUrl(sourceId: string, url: string): Promise<void>;
  async processText(sourceId: string, content: string): Promise<void>;

  // Job management
  async getProcessingStatus(sourceId: string): Promise<ProcessingStatus>;
  async retryFailed(sourceId: string): Promise<void>;
}
```

#### 3. **KnowledgeSourceContextService**

```typescript
@Injectable()
export class KnowledgeSourceContextService {
  constructor(
    @InjectRepository(CompanyKnowledgeSource)
    private knowledgeSourceRepository: Repository<CompanyKnowledgeSource>,
  ) {}

  // Context building for AI
  async searchForContext(query: string, limit = 5): Promise<ContextSource[]>;
  async semanticSearch(queryEmbedding: number[], limit = 5): Promise<CompanyKnowledgeSource[]>;
  async rankByRelevance(sources: CompanyKnowledgeSource[], query: string): Promise<RankedSource[]>;

  // Relevance scoring
  calculateRelevanceScore(source: CompanyKnowledgeSource, query: string): number;
}
```

#### 4. **FaqLearningKnowledgeSourceService**

```typescript
@Injectable()
export class FaqLearningKnowledgeSourceService {
  constructor(
    @InjectRepository(CompanyKnowledgeSource)
    private knowledgeSourceRepository: Repository<CompanyKnowledgeSource>,
  ) {}

  // FAQ integration
  async extractRelevantKnowledge(patterns: LearningPattern[]): Promise<KnowledgeContext[]>;
  async findSourcesForFaqGeneration(question: string): Promise<CompanyKnowledgeSource[]>;
  async attributeSourceToFaq(faqId: string, sourceIds: string[]): Promise<void>;
}
```

---

## Frontend Architecture

### Component Structure

```
apps/frontend/src/
├── app/
│   └── (portal)/
│       └── portal/
│           └── knowledge-sources/
│               ├── page.tsx (Main list page)
│               ├── new/
│               │   └── page.tsx (Upload/create page)
│               ├── [id]/
│               │   └── page.tsx (Detail/edit page)
│               └── analytics/
│                   └── page.tsx (Analytics dashboard)
├── components/
│   └── knowledge-sources/
│       ├── KnowledgeSourceList.tsx
│       ├── KnowledgeSourceCard.tsx
│       ├── KnowledgeSourceTable.tsx
│       ├── KnowledgeSourceDetail.tsx
│       ├── UploadDialog.tsx
│       ├── AddUrlDialog.tsx
│       ├── AddTextDialog.tsx
│       ├── ProcessingProgress.tsx
│       ├── SearchFilters.tsx
│       ├── TagManagement.tsx
│       ├── UsageStatsCard.tsx
│       └── SourcePreviewModal.tsx
└── services/
    └── knowledge-sources.service.ts
```

### Key Components

#### **KnowledgeSourcesPage** (`page.tsx`)

```tsx
export default function KnowledgeSourcesPage() {
  const [sources, setSources] = useState<KnowledgeSource[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filters, setFilters] = useState<SearchFilters>({});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bilgi Kaynakları"
        description="Şirket dökümanlarınızı ve web kaynaklarınızı yönetin"
        action={
          <UploadDropdown>
            <DropdownItem onClick={() => openUploadDialog()}>Dosya Yükle</DropdownItem>
            <DropdownItem onClick={() => openUrlDialog()}>URL Ekle</DropdownItem>
            <DropdownItem onClick={() => openTextDialog()}>Metin Ekle</DropdownItem>
          </UploadDropdown>
        }
      />

      <SearchFilters filters={filters} onChange={setFilters} />

      <ViewToggle mode={viewMode} onChange={setViewMode} />

      {viewMode === 'table' ? (
        <KnowledgeSourceTable sources={sources} />
      ) : (
        <KnowledgeSourceGrid sources={sources} />
      )}
    </div>
  );
}
```

---

## Integration Points

### 1. **Chat Context Engine Integration**

```typescript
// apps/backend/src/modules/chat/services/chat-context-engine.service.ts

@Injectable()
export class ChatContextEngineService {
  constructor(
    private knowledgeSourceContext: KnowledgeSourceContextService, // NEW
    // ... existing dependencies
  ) {}

  async buildContext(sessionId: string, query: string): Promise<ContextSource[]> {
    const sources: ContextSource[] = [];

    // Existing sources
    const kbSources = await this.searchKnowledgeBase(query);
    const faqSources = await this.searchFaqLearning(query);
    const documentSources = await this.searchSessionDocuments(sessionId, query);
    const urlSources = await this.searchSessionUrls(sessionId, query);

    // 🆕 NEW: Company Knowledge Sources
    const companyKnowledgeSources = await this.knowledgeSourceContext
      .searchForContext(query, 5);

    sources.push(...kbSources, ...faqSources, ...documentSources, ...urlSources, ...companyKnowledgeSources);

    // Rank and return top 10
    return this.rankByRelevance(sources, query).slice(0, 10);
  }
}
```

### 2. **FAQ Learning Integration**

```typescript
// apps/backend/src/modules/faq-learning/services/faq-generator.service.ts

@Injectable()
export class FaqGeneratorService {
  constructor(
    private faqLearningKnowledgeSource: FaqLearningKnowledgeSourceService, // NEW
    // ... existing dependencies
  ) {}

  async generateFaqFromPatterns(patterns: LearningPattern[]): Promise<LearnedFaqEntry> {
    const chatData = await this.chatDataExtractor.extract();
    const ticketData = await this.ticketDataExtractor.extract();

    // 🆕 NEW: Extract relevant knowledge from company sources
    const companyKnowledge = await this.faqLearningKnowledgeSource
      .extractRelevantKnowledge(patterns);

    // Include in AI generation
    const faq = await this.faqAiService.generate({
      patterns,
      chatData,
      ticketData,
      companyKnowledge, // 🆕 Additional context
    });

    return faq;
  }
}
```

---

## Data Flow

### Document Upload Flow

```
1. Admin uploads file via UI
   ↓
2. Frontend validates file (type, size)
   ↓
3. POST /api/knowledge-sources/document
   ↓
4. Controller receives file (multer)
   ↓
5. Service creates CompanyKnowledgeSource (status: pending)
   ↓
6. Job added to BullMQ queue
   ↓
7. Worker processes file:
   - Extract text (pdf-parse, mammoth, xlsx)
   - Extract metadata
   - Generate keywords
   - Update status: processing → active
   ↓
8. WebSocket event: 'knowledge-source-ready'
   ↓
9. Frontend updates UI
```

### AI Chat Context Flow

```
1. Customer sends message in chat
   ↓
2. ChatContextEngine.buildContext(query)
   ↓
3. Parallel search:
   - Knowledge Base articles
   - FAQ Learning entries
   - Session documents/URLs
   - 🆕 Company Knowledge Sources
   ↓
4. KnowledgeSourceContext.searchForContext(query)
   ↓
5. Full-text search + relevance ranking
   ↓
6. Return top 5 sources
   ↓
7. Merge all sources, rank by relevance
   ↓
8. Pass to AI with context
   ↓
9. AI generates response with citations
   ↓
10. Increment usageCount for used sources
```

---

## API Endpoints

### Knowledge Source CRUD

```typescript
// Create
POST   /api/knowledge-sources/document
POST   /api/knowledge-sources/url
POST   /api/knowledge-sources/text

// Read
GET    /api/knowledge-sources
GET    /api/knowledge-sources/:id
GET    /api/knowledge-sources/search?q=<query>

// Update
PATCH  /api/knowledge-sources/:id
POST   /api/knowledge-sources/:id/reprocess

// Delete/Archive
DELETE /api/knowledge-sources/:id
POST   /api/knowledge-sources/:id/archive
POST   /api/knowledge-sources/:id/restore

// Bulk Operations
POST   /api/knowledge-sources/bulk/archive
POST   /api/knowledge-sources/bulk/delete
POST   /api/knowledge-sources/bulk/tags

// Analytics
GET    /api/knowledge-sources/analytics/usage
GET    /api/knowledge-sources/analytics/effectiveness
GET    /api/knowledge-sources/:id/usage-stats
```

---

**Architecture Document Prepared By:** Claude (AI Agent)
**Last Updated:** 2025-10-25
**Version:** 1.0 (MVP)
