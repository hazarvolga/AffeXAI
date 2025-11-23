# Knowledge Sources - MVP Implementation Tasks

**Target:** 10-12 working days
**Priority:** High
**Status:** Not Started

---

## MVP Scope

✅ **Included in MVP:**
- Document upload (PDF, Word, Excel, TXT, MD)
- URL scraping
- Text-based knowledge entry
- Chat context integration
- FAQ learning integration
- Basic admin UI (CRUD, upload, list)
- Search and filtering
- Usage tracking

❌ **Excluded from MVP** (Future enhancements):
- PowerPoint support
- Vector semantic search
- Analytics dashboard
- Customer browse view
- Bulk operations
- Advanced reporting

---

## Phase 1: Backend Foundation (3-4 days)

### Task 1.1: Entity and Migration
**Time:** 3-4 hours

- [ ] Create `CompanyKnowledgeSource` entity
  - Define all fields (title, description, sourceType, status, etc.)
  - Add relations (uploadedBy, archivedBy)
  - Include metadata JSONB field
  - Add feature flags (enableForChat, enableForFaqLearning)

- [ ] Create TypeORM migration
  - Create `company_knowledge_sources` table
  - Add indexes (status+createdAt, sourceType, uploadedById, tags)
  - Add full-text search index (GIN on extracted_content)
  - Enable pgvector extension (for future)

- [ ] Create enums
  - `KnowledgeSourceType` (document, url, text)
  - `KnowledgeSourceStatus` (pending, processing, active, failed, archived)

**Validation:**
```bash
npm run typeorm:migration:generate -- -n CreateCompanyKnowledgeSources
npm run typeorm:migration:run
```

---

### Task 1.2: DTOs and Validation
**Time:** 2-3 hours

- [ ] Create `CreateDocumentDto`
  - title, description, tags
  - File validation rules

- [ ] Create `CreateUrlDto`
  - title, description, url, tags
  - URL format validation

- [ ] Create `CreateTextDto`
  - title, description, content, tags

- [ ] Create `UpdateKnowledgeSourceDto`
  - Partial update fields

- [ ] Create `SearchKnowledgeSourcesDto`
  - query, sourceType, status, tags
  - pagination (page, limit)
  - sorting (createdAt, usageCount, relevanceScore)

**Validation:**
- All DTOs use class-validator decorators
- @IsNotEmpty, @MaxLength, @IsUrl, etc.

---

### Task 1.3: Core Service Implementation
**Time:** 6-8 hours

- [ ] `CompanyKnowledgeSourceService`
  - `create()` - Create knowledge source
  - `findAll()` - List with pagination
  - `findOne()` - Get by ID
  - `update()` - Update source
  - `archive()` - Soft delete
  - `delete()` - Hard delete (admin only)
  - `search()` - Full-text search
  - `incrementUsageCount()` - Track usage
  - `updateRelevanceScore()` - Update score

**Test Coverage:**
- Unit tests for all service methods
- Mock repository interactions

---

### Task 1.4: File Processing Service
**Time:** 4-5 hours

- [ ] `KnowledgeSourceProcessorService`
  - Reuse existing `DocumentProcessorService` from chat module
  - Add orchestration for document processing
  - Add error handling and retry logic
  - Update source status (pending → processing → active/failed)

- [ ] Support file formats:
  - PDF (pdf-parse)
  - DOCX (mammoth)
  - XLSX (xlsx)
  - TXT (fs.readFile)
  - MD (fs.readFile with markdown parsing)

- [ ] Extract metadata:
  - File size, page count, word count
  - Auto-generate keywords (simple frequency analysis)

**Validation:**
- Test with sample files
- Verify extracted content accuracy

---

### Task 1.5: URL Processing Service
**Time:** 3-4 hours

- [ ] `KnowledgeSourceProcessorService` - URL methods
  - Reuse existing `UrlProcessorService` from chat module
  - Add URL validation
  - Respect robots.txt
  - Extract title, main content, metadata
  - Handle errors (404, timeout, access denied)

- [ ] Caching strategy:
  - Cache scraped content
  - Set expiration (7 days default)
  - Support manual refresh

**Validation:**
- Test with various URL types
- Verify error handling

---

### Task 1.6: BullMQ Job Queue Setup
**Time:** 3-4 hours

- [ ] Create `knowledge-source-processing` queue

- [ ] Create job processors:
  - `DocumentProcessingJob` - Process uploaded files
  - `UrlScrapingJob` - Scrape and process URLs

- [ ] Implement job status tracking:
  - Progress updates (0-100%)
  - Error logging
  - Retry strategy (max 3 attempts)

- [ ] WebSocket events:
  - `knowledge-source-processing` (progress update)
  - `knowledge-source-ready` (completed)
  - `knowledge-source-failed` (error)

**Validation:**
```bash
# Check BullMQ dashboard
http://localhost:3001/api/queues
```

---

### Task 1.7: Controller Implementation
**Time:** 4-5 hours

- [ ] `CompanyKnowledgeSourceController`
  - POST `/document` - Upload file (multer)
  - POST `/url` - Add URL
  - POST `/text` - Add text
  - GET `/` - List sources (with filters)
  - GET `/:id` - Get source details
  - PATCH `/:id` - Update source
  - DELETE `/:id` - Archive source
  - POST `/:id/reprocess` - Re-process file/URL
  - GET `/:id/usage` - Get usage stats

- [ ] Add guards:
  - `JwtAuthGuard` - Authentication
  - `RolesGuard` - Admin/Editor only

- [ ] Add file upload interceptor:
  - File size limit: 10MB
  - Allowed types: pdf, docx, xlsx, txt, md

**Validation:**
- Test all endpoints with Postman/Thunder Client
- Verify role-based access control

---

## Phase 2: Context Engine Integration (2-3 days)

### Task 2.1: Knowledge Source Context Service
**Time:** 4-5 hours

- [ ] Create `KnowledgeSourceContextService`
  - `searchForContext(query, limit)` - Search for relevant sources
  - `rankByRelevance(sources, query)` - Rank by relevance
  - `calculateRelevanceScore(source, query)` - Simple scoring algorithm

- [ ] Implement search logic:
  - Full-text search on extracted_content
  - Filter by status=active
  - Filter by enableForChat=true
  - Order by relevance score

- [ ] Relevance scoring:
  - Keyword matching in title (weight: 3x)
  - Keyword matching in content (weight: 1x)
  - Tag matching (weight: 2x)
  - Normalize score to 0-1

**Validation:**
- Test search with various queries
- Verify relevance ranking

---

### Task 2.2: Chat Context Engine Update
**Time:** 3-4 hours

- [ ] Update `ChatContextEngineService`
  - Inject `KnowledgeSourceContextService`
  - Add knowledge source search to `buildContext()`
  - Merge company knowledge with existing sources
  - Track usage when source is used

- [ ] Update context source tracking:
  - Save company knowledge source references
  - Link to chat messages
  - Increment usage count

**Validation:**
- Test chat with knowledge sources
- Verify sources appear in AI responses
- Check usage count increments

---

### Task 2.3: FAQ Learning Integration
**Time:** 3-4 hours

- [ ] Create `FaqLearningKnowledgeSourceService`
  - `extractRelevantKnowledge(patterns)` - Find sources for FAQ generation
  - `findSourcesForFaqGeneration(question)` - Search sources
  - `attributeSourceToFaq(faqId, sourceIds)` - Link sources to FAQs

- [ ] Update `FaqGeneratorService`
  - Inject `FaqLearningKnowledgeSourceService`
  - Include knowledge sources in FAQ generation context
  - Add source attribution to generated FAQs

**Validation:**
- Generate FAQ entries with knowledge sources
- Verify source attribution

---

### Task 2.4: WebSocket Events
**Time:** 2 hours

- [ ] Add WebSocket events to `ChatGateway`
  - `knowledge-source-processing` - Progress updates
  - `knowledge-source-ready` - Processing complete
  - `knowledge-source-failed` - Processing error

- [ ] Emit events from processor service

**Validation:**
- Monitor WebSocket events in browser console
- Verify real-time updates

---

## Phase 3: Admin UI (3-4 days)

### Task 3.1: Knowledge Sources List Page
**Time:** 5-6 hours

- [ ] Create `/portal/knowledge-sources/page.tsx`
  - Page header with title and upload button
  - Search bar
  - Filter panel (type, status, tags)
  - View toggle (table/grid)

- [ ] Create `KnowledgeSourceTable` component
  - Columns: title, type, status, uploaded by, created at, actions
  - Row actions: view, edit, archive, reprocess
  - Pagination
  - Sorting

- [ ] Create `KnowledgeSourceCard` component (grid view)
  - Source icon (file/url/text)
  - Title, description (truncated)
  - Status badge
  - Usage stats
  - Action menu

**Validation:**
- Navigate to page
- Verify data loads
- Test filtering and sorting

---

### Task 3.2: Upload Dialogs
**Time:** 6-7 hours

- [ ] Create `UploadDialog` component
  - Drag-and-drop zone (react-dropzone)
  - File type validation (client-side)
  - File size validation (10MB limit)
  - Title and description inputs
  - Tag input (multi-select)
  - Upload progress bar
  - Error handling

- [ ] Create `AddUrlDialog` component
  - URL input with validation
  - Title, description (optional)
  - Tag input
  - Preview button (optional)
  - Submit button

- [ ] Create `AddTextDialog` component
  - Rich text editor (simple markdown)
  - Title, description
  - Tag input
  - Preview mode

**Validation:**
- Test file upload with various formats
- Test URL submission
- Test text entry
- Verify error messages

---

### Task 3.3: Processing Progress Component
**Time:** 3 hours

- [ ] Create `ProcessingProgress` component
  - Progress bar (0-100%)
  - Status text (Uploading, Processing, Extracting content)
  - Cancel button (optional)
  - Error display

- [ ] WebSocket integration:
  - Listen for `knowledge-source-processing` events
  - Update progress in real-time
  - Show success/error messages

**Validation:**
- Upload file and watch progress
- Verify real-time updates

---

### Task 3.4: Detail and Edit View
**Time:** 4-5 hours

- [ ] Create `/portal/knowledge-sources/[id]/page.tsx`
  - Source metadata display
  - Content preview (first 500 chars)
  - Tags display and editing
  - Enable/disable toggles (chat, FAQ learning)
  - Reprocess button
  - Archive button

- [ ] Create `KnowledgeSourceDetail` component
  - Metadata card
  - Content card (with "Show more")
  - Usage stats card
  - Action buttons

**Validation:**
- View source details
- Edit metadata
- Toggle feature flags
- Reprocess source

---

### Task 3.5: Search and Filtering
**Time:** 3-4 hours

- [ ] Create `SearchFilters` component
  - Full-text search input (debounced)
  - Source type filter (document/url/text)
  - Status filter (active/processing/failed/archived)
  - Tag filter (multi-select)
  - Date range filter (optional)
  - Clear filters button

- [ ] Implement search logic:
  - Client-side filtering (for small datasets)
  - API call for server-side search (for large datasets)

**Validation:**
- Test search functionality
- Test each filter
- Verify results update correctly

---

### Task 3.6: Tag Management
**Time:** 2-3 hours

- [ ] Create `TagInput` component
  - Autocomplete from existing tags
  - Create new tags inline
  - Remove tags
  - Tag color coding (optional)

- [ ] Create `TagManagement` page (optional)
  - List all tags
  - Rename tags
  - Merge tags
  - Delete unused tags

**Validation:**
- Add tags to sources
- Autocomplete works
- Tags saved correctly

---

## Phase 4: Testing and Polish (2 days)

### Task 4.1: Unit Tests
**Time:** 4 hours

- [ ] Service tests
  - `CompanyKnowledgeSourceService.spec.ts`
  - `KnowledgeSourceProcessorService.spec.ts`
  - `KnowledgeSourceContextService.spec.ts`

- [ ] Controller tests
  - `CompanyKnowledgeSourceController.spec.ts`

**Coverage Target:** >80%

---

### Task 4.2: Integration Tests
**Time:** 3 hours

- [ ] End-to-end upload flow
  - Upload document → Process → Active → Search → Used in chat

- [ ] URL scraping flow
  - Add URL → Scrape → Cache → Search → Used in FAQ

- [ ] Chat integration
  - Customer question → Knowledge source context → AI response

**Validation:**
- All flows complete successfully
- No errors in logs

---

### Task 4.3: Error Handling
**Time:** 2-3 hours

- [ ] Add comprehensive error handling:
  - File upload errors (size, type, network)
  - Processing errors (corrupt file, extraction failed)
  - URL errors (404, timeout, robots.txt blocked)
  - Search errors (query too complex)

- [ ] User-friendly error messages:
  - Clear, actionable messages
  - Suggestions for resolution

**Validation:**
- Test error scenarios
- Verify error messages

---

### Task 4.4: Performance Optimization
**Time:** 2-3 hours

- [ ] Database query optimization:
  - Add missing indexes
  - Use query builder for complex queries
  - Implement pagination

- [ ] Caching:
  - Cache frequently accessed sources
  - Cache search results (5 min TTL)

- [ ] File processing:
  - Optimize file reading (streams)
  - Limit concurrent processing jobs

**Validation:**
- Load test with 100+ sources
- Measure response times
- Verify <500ms context search

---

### Task 4.5: Documentation
**Time:** 2 hours

- [ ] API documentation (Swagger)
  - Document all endpoints
  - Add request/response examples

- [ ] User guide
  - How to upload documents
  - How to add URLs
  - How to use tags
  - Best practices

- [ ] Developer guide
  - Architecture overview
  - Database schema
  - Adding new file formats

**Location:**
- `apps/backend/docs/KNOWLEDGE_SOURCES_API.md`
- `claudedocs/KNOWLEDGE_SOURCES_USER_GUIDE.md`

---

## Phase 5: Deployment (1 day)

### Task 5.1: Environment Configuration
**Time:** 1-2 hours

- [ ] Add environment variables:
  - `KNOWLEDGE_SOURCE_UPLOAD_PATH`
  - `KNOWLEDGE_SOURCE_MAX_FILE_SIZE`
  - `KNOWLEDGE_SOURCE_URL_TIMEOUT`

- [ ] Update `.env.example`

---

### Task 5.2: Database Migration
**Time:** 1 hour

- [ ] Run migration in staging
- [ ] Verify indexes created
- [ ] Test with sample data

**Commands:**
```bash
npm run typeorm:migration:run
```

---

### Task 5.3: Deployment Checklist
**Time:** 2 hours

- [ ] Pre-deployment:
  - [ ] All tests passing
  - [ ] Code reviewed
  - [ ] Database migration tested
  - [ ] Environment variables configured

- [ ] Deployment:
  - [ ] Deploy backend
  - [ ] Deploy frontend
  - [ ] Run database migration
  - [ ] Verify BullMQ queue

- [ ] Post-deployment:
  - [ ] Smoke test (upload file, add URL)
  - [ ] Test chat integration
  - [ ] Monitor logs for errors
  - [ ] Verify performance metrics

---

## Success Criteria

### Functional
- ✅ Admin can upload PDF, DOCX, XLSX, TXT, MD files
- ✅ Admin can add URLs for scraping
- ✅ Admin can add text-based knowledge
- ✅ Files processed within 30 seconds
- ✅ URLs scraped within 10 seconds
- ✅ Knowledge sources appear in AI chat context
- ✅ Knowledge sources used in FAQ generation
- ✅ Search returns relevant results <1s

### Technical
- ✅ 95%+ file processing success rate
- ✅ 90%+ URL scraping success rate
- ✅ Context search <500ms
- ✅ Zero security vulnerabilities
- ✅ Test coverage >80%

### User Experience
- ✅ Intuitive upload interface
- ✅ Real-time processing progress
- ✅ Clear error messages
- ✅ Mobile-responsive admin UI

---

## Risk Mitigation

### Risk 1: File Processing Failures
**Mitigation:**
- Comprehensive error handling
- Retry mechanism (max 3)
- Clear error messages with suggestions

### Risk 2: URL Scraping Blocked
**Mitigation:**
- robots.txt compliance
- Rate limiting
- Timeout handling
- Manual content entry fallback

### Risk 3: Performance Issues
**Mitigation:**
- Database indexes
- Query optimization
- Caching strategy
- Pagination

### Risk 4: Context Relevance
**Mitigation:**
- Tunable relevance scoring
- Admin feedback mechanism
- Usage tracking for improvement

---

## Post-MVP Enhancements

**Future Roadmap** (after MVP validation):
1. PowerPoint support (2-3 days)
2. Vector semantic search with pgvector (4-5 days)
3. Analytics dashboard (3-4 days)
4. Customer browse view (2-3 days)
5. Bulk operations (2 days)
6. Advanced reporting (3 days)

---

**MVP Task List Prepared By:** Claude (AI Agent)
**Last Updated:** 2025-10-25
**Estimated Duration:** 10-12 working days
