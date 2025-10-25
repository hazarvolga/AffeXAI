# Knowledge Sources - Requirements Document

## Introduction

Bu özellik, mevcut AI chatbot ve FAQ learning sistemine kalıcı bir **bilgi kaynağı deposu** ekleyecektir. Şirketlerin ürünleriyle ilgili dökümanları (PDF, Word, Excel, PowerPoint, TXT, MD) ve web URL'lerini yükleyerek, tüm müşterilere tutarlı ve doğru bilgi sağlanmasını hedefler.

**Mevcut Sistem vs Yeni Sistem:**
- **Mevcut:** Session bazlı → Her chat oturumunda dosya yükle → Sadece o oturumda kullanılır
- **Yeni:** Global Knowledge Sources → Admin/Editor yükler → TÜM kullanıcılar ve FAQ learning yararlanır

## Glossary

- **Knowledge_Source**: Şirket bilgi kaynağı (döküman veya URL)
- **Company_Knowledge**: Tüm şirket bilgi kaynaklarının kolektif deposu
- **Knowledge_Context**: Chat veya FAQ için bilgi kaynaklarından oluşturulan bağlam
- **Document_Processing**: Dökümanlardan metin çıkarma ve indeksleme süreci
- **URL_Scraping**: Web sayfalarından içerik çıkarma
- **Semantic_Search**: Vektör benzerliği ile ilgili içerik bulma
- **Source_Citation**: AI yanıtlarında bilgi kaynağı referansı gösterme
- **FAQ_Integration**: Bilgi kaynaklarının FAQ learning sistemine entegrasyonu

## Requirements

### Requirement 1: Document Upload and Management

**User Story:** As an admin or editor, I want to upload company documents to the knowledge base, so that AI can use this information to answer customer questions consistently.

#### Acceptance Criteria

1. WHEN an admin uploads a document, THE system SHALL support PDF, DOCX, XLSX, PPTX, TXT, and MD formats
2. WHEN file upload is initiated, THE system SHALL validate file type and size (<10MB)
3. WHEN file is valid, THE system SHALL process it asynchronously using BullMQ
4. THE system SHALL extract text content from all supported file formats
5. WHEN processing completes, THE admin SHALL see processing status (pending, processing, active, failed)
6. THE system SHALL save extracted content with metadata (file name, size, type, page count, word count)
7. WHEN document is active, THE system SHALL include it in AI chat and FAQ learning contexts

### Requirement 2: URL Management and Web Scraping

**User Story:** As an admin or editor, I want to add web URLs as knowledge sources, so that documentation from our website can be used by AI automatically.

#### Acceptance Criteria

1. WHEN an admin adds a URL, THE system SHALL validate URL format and accessibility
2. WHEN URL is valid, THE system SHALL scrape content asynchronously
3. THE system SHALL extract title, main content, and metadata from web pages
4. THE system SHALL respect robots.txt rules and implement rate limiting
5. WHEN scraping completes, THE URL content SHALL be cached with expiration
6. THE system SHALL support manual URL refresh (re-scraping)
7. THE system SHALL handle scraping errors gracefully (404, timeout, blocked)

### Requirement 3: Text-Based Knowledge Entry

**User Story:** As an admin, I want to manually enter text-based knowledge, so that I can quickly add important information without uploading files.

#### Acceptance Criteria

1. WHEN admin selects "Add Text Source", THE system SHALL provide a rich text editor
2. WHEN text is entered, THE admin SHALL provide title and optional description
3. THE system SHALL support markdown formatting
4. WHEN saved, THE text SHALL be immediately available as a knowledge source
5. THE admin SHALL be able to edit text sources after creation

### Requirement 4: Knowledge Source Search and Filtering

**User Story:** As an admin, I want to search and filter knowledge sources, so that I can manage large numbers of documents efficiently.

#### Acceptance Criteria

1. THE admin UI SHALL provide full-text search across title, description, and content
2. THE system SHALL support filtering by source type (document, URL, text)
3. THE system SHALL support filtering by status (active, processing, failed, archived)
4. THE system SHALL support filtering by tags
5. THE system SHALL support sorting by date, usage count, relevance score
6. THE search SHALL return results within 1 second

### Requirement 5: Knowledge Source Metadata and Tagging

**User Story:** As an admin, I want to add metadata and tags to knowledge sources, so that they can be organized and discovered easily.

#### Acceptance Criteria

1. WHEN creating/editing a source, THE admin SHALL provide title and description
2. THE admin SHALL be able to add multiple tags (e.g., "installation", "troubleshooting", "API")
3. THE system SHALL auto-generate keywords from content
4. THE system SHALL track usage metrics (usage count, helpful count, average relevance score)
5. THE admin SHALL be able to mark sources as enabled/disabled for chat or FAQ learning independently

### Requirement 6: AI Chat Integration

**User Story:** As a customer, I want the AI chatbot to use company knowledge sources when answering my questions, so that I get accurate and consistent information.

#### Acceptance Criteria

1. WHEN a customer asks a question, THE Chat_Context_Engine SHALL search Company_Knowledge for relevant content
2. THE system SHALL rank knowledge sources by relevance score
3. WHEN AI responds, THE system SHALL include top relevant sources (max 5) in context
4. THE AI response SHALL cite which knowledge sources were used
5. THE customer SHALL be able to click source citations to view original content
6. THE system SHALL track when each source is used in responses (usage count)
7. THE system SHALL update average relevance score based on actual usage

### Requirement 7: FAQ Learning Integration

**User Story:** As a system, I want to use company knowledge sources when generating FAQ entries, so that learned FAQs are based on official company information.

#### Acceptance Criteria

1. WHEN FAQ learning generates new entries, THE system SHALL include Company_Knowledge in context
2. THE FAQ generation prompts SHALL reference relevant knowledge sources
3. THE generated FAQs SHALL cite which sources were used
4. THE system SHALL improve FAQ confidence scores when backed by knowledge sources
5. WHEN reviewing FAQ entries, THE admin SHALL see source attribution

### Requirement 8: Source Effectiveness Analytics

**User Story:** As an admin, I want to see analytics on knowledge source effectiveness, so that I can identify which sources are most valuable and which need updating.

#### Acceptance Criteria

1. THE admin dashboard SHALL display most-used knowledge sources
2. THE system SHALL show usage trends over time (charts)
3. THE system SHALL calculate effectiveness score (usage count × average relevance)
4. THE system SHALL identify unused sources (no usage in 30 days)
5. THE system SHALL alert when URLs return errors (404, timeout)
6. THE admin SHALL be able to view which FAQs were generated from each source

### Requirement 9: Bulk Operations

**User Story:** As an admin, I want to perform bulk operations on knowledge sources, so that I can manage many sources efficiently.

#### Acceptance Criteria

1. THE admin SHALL be able to select multiple sources
2. THE system SHALL support bulk actions: archive, delete, enable/disable, add tags
3. THE system SHALL confirm bulk operations before execution
4. THE system SHALL process bulk operations asynchronously
5. THE system SHALL display progress for bulk operations

### Requirement 10: Archive and Lifecycle Management

**User Story:** As an admin, I want to archive outdated knowledge sources, so that only current information is used by AI.

#### Acceptance Criteria

1. WHEN admin archives a source, THE system SHALL mark it as archived with timestamp
2. WHEN a source is archived, THE system SHALL exclude it from AI context and FAQ learning
3. THE system SHALL preserve archived sources for audit purposes
4. THE admin SHALL be able to restore archived sources
5. THE system SHALL automatically suggest archiving for sources unused for 90 days

### Requirement 11: Processing Queue and Status Tracking

**User Story:** As an admin, I want to track the processing status of uploaded documents and URLs, so that I know when sources are ready to use.

#### Acceptance Criteria

1. THE admin UI SHALL display processing queue with current jobs
2. WHEN a file/URL is processing, THE system SHALL show progress percentage
3. THE system SHALL display estimated time remaining
4. THE admin SHALL receive notification when processing completes
5. THE admin SHALL receive notification when processing fails with error details
6. THE system SHALL support retry for failed processing jobs

### Requirement 12: Customer View (Read-Only Browse)

**User Story:** As a customer, I want to browse available knowledge sources, so that I can find information myself without using chat.

#### Acceptance Criteria

1. THE customer portal SHALL have a "Bilgi Kaynakları" menu item (below Knowledge Base)
2. WHEN customer clicks, THE system SHALL display list of active sources
3. THE customer SHALL be able to search and filter sources
4. WHEN customer clicks a source, THE system SHALL display preview modal (read-only)
5. THE customer SHALL NOT be able to edit, upload, or delete sources
6. THE customer SHALL be able to give feedback ("helpful" button)

### Requirement 13: Performance and Scalability

**User Story:** As a system, I want knowledge source operations to be performant, so that the platform remains responsive with many sources.

#### Acceptance Criteria

1. THE context search SHALL complete within 500ms for up to 1000 sources
2. THE file processing SHALL complete within 30 seconds for <5MB files
3. THE URL scraping SHALL complete within 10 seconds for normal web pages
4. THE system SHALL support pagination for large result sets (100+ sources)
5. THE system SHALL use database indexes for common queries
6. THE system SHALL cache frequently accessed sources

### Requirement 14: Security and Access Control

**User Story:** As a system admin, I want knowledge sources to have proper access control, so that only authorized users can manage them.

#### Acceptance Criteria

1. ONLY Admin and Editor roles SHALL upload/edit/delete sources
2. ONLY Admin role SHALL archive sources permanently
3. Support Team SHALL have read-only access to sources
4. Customers SHALL have browse-only access through portal
5. THE system SHALL log all create/update/delete operations for audit
6. THE system SHALL validate uploaded files for security (no executables, no malicious content)

### Requirement 15: Vector Embeddings (Future Enhancement)

**User Story:** As a system, I want to use vector embeddings for semantic search, so that AI can find contextually similar content even with different wording.

#### Acceptance Criteria

1. THE system SHALL generate embeddings for document content using AI models
2. THE system SHALL store embeddings in PostgreSQL with pgvector extension
3. THE semantic search SHALL use cosine similarity for ranking
4. THE system SHALL re-generate embeddings when content is updated
5. THE search SHALL combine keyword matching with semantic similarity

---

## Non-Functional Requirements

### Performance
- Context search: <500ms
- File processing: <30s for <5MB files
- URL scraping: <10s
- Concurrent uploads: Support 10+ simultaneous uploads

### Scalability
- Support 1000+ knowledge sources per organization
- Handle 100+ concurrent AI chat sessions
- Process 50+ documents/URLs per day

### Reliability
- 99.9% uptime for knowledge source access
- Automatic retry for failed processing jobs
- Graceful degradation when sources unavailable

### Security
- File type validation (whitelist)
- File size limits (10MB)
- Malware scanning for uploads
- SQL injection prevention
- XSS prevention in content display

### Usability
- Drag-and-drop file upload
- Real-time processing progress
- Clear error messages
- Mobile-responsive UI

---

## Success Metrics

### Business Metrics
- 20% improvement in AI chatbot accuracy
- 15% reduction in support tickets
- 30% increase in FAQ quality scores
- 50% of AI responses backed by knowledge sources

### Technical Metrics
- 95%+ successful file processing rate
- 90%+ successful URL scraping rate
- <3s average AI response time (with knowledge sources)
- <1s search response time

### User Satisfaction
- 4.5/5 admin satisfaction with management UI
- 4.0/5 customer satisfaction with AI accuracy
- 80%+ of customers find knowledge sources helpful

---

## Dependencies

### External Services
- BullMQ (job processing)
- OpenAI/Anthropic/Google AI (embeddings - future)
- PostgreSQL with pgvector (vector search - future)

### Internal Modules
- Chat Module (context integration)
- FAQ Learning Module (pattern extraction)
- Settings Module (global configuration)

### Libraries
- pdf-parse (PDF processing)
- mammoth (Word processing)
- xlsx (Excel processing)
- officegen or pptx-parser (PowerPoint - future MVP)
- cheerio (web scraping)
- puppeteer (advanced scraping - if needed)

---

## Constraints

### Technical Constraints
- File size limit: 10MB (configurable)
- Supported file types: PDF, DOCX, XLSX, TXT, MD (PPTX in future)
- Max 1000 sources per organization (initial)
- URL scraping respects robots.txt

### Business Constraints
- Admin/Editor only for upload
- Customer read-only access
- English and Turkish language support

### Time Constraints
- MVP: 10-12 days
- Full feature set: 4-6 weeks

---

## Glossary of Technical Terms

- **BullMQ**: Redis-based job queue for background processing
- **pgvector**: PostgreSQL extension for vector similarity search
- **Cosine Similarity**: Metric for measuring vector similarity (0-1)
- **Embedding**: Numerical vector representation of text content
- **Context Window**: Maximum amount of text AI can process at once
- **Semantic Search**: Search based on meaning, not just keywords
- **Source Attribution**: Showing which sources AI used in response
- **Relevance Score**: 0-1 score indicating how relevant a source is to query

---

**Requirements Prepared By:** Claude (AI Agent)
**Last Updated:** 2025-10-25
**Version:** 1.0 (MVP)
