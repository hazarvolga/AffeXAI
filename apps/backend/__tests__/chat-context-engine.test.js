"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const chat_context_engine_service_1 = require("../src/modules/chat/services/chat-context-engine.service");
const chat_context_source_entity_1 = require("../src/modules/chat/entities/chat-context-source.entity");
const chat_document_entity_1 = require("../src/modules/chat/entities/chat-document.entity");
const knowledge_base_article_entity_1 = require("../src/modules/tickets/entities/knowledge-base-article.entity");
const learned_faq_entry_entity_1 = require("../src/modules/faq-learning/entities/learned-faq-entry.entity");
const learning_pattern_entity_1 = require("../src/modules/faq-learning/entities/learning-pattern.entity");
const faq_enhanced_search_service_1 = require("../src/modules/faq-learning/services/faq-enhanced-search.service");
describe('ChatContextEngineService', () => {
    let service;
    let contextSourceRepository;
    let documentRepository;
    let knowledgeBaseRepository;
    let faqRepository;
    let patternRepository;
    let faqEnhancedSearchService;
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            addOrderBy: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([]),
            getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
        })),
    };
    const mockFaqEnhancedSearchService = {
        search: jest.fn().mockResolvedValue({
            results: [],
            total: 0,
            page: 1,
            limit: 10,
            query: '',
            suggestions: [],
            relatedFaqs: [],
            processingTime: 0
        }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                chat_context_engine_service_1.ChatContextEngineService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(chat_context_source_entity_1.ChatContextSource),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(chat_document_entity_1.ChatDocument),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(knowledge_base_article_entity_1.KnowledgeBaseArticle),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(learned_faq_entry_entity_1.LearnedFaqEntry),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(learning_pattern_entity_1.LearningPattern),
                    useValue: mockRepository,
                },
                {
                    provide: faq_enhanced_search_service_1.FaqEnhancedSearchService,
                    useValue: mockFaqEnhancedSearchService,
                },
            ],
        }).compile();
        service = module.get(chat_context_engine_service_1.ChatContextEngineService);
        contextSourceRepository = module.get((0, typeorm_1.getRepositoryToken)(chat_context_source_entity_1.ChatContextSource));
        documentRepository = module.get((0, typeorm_1.getRepositoryToken)(chat_document_entity_1.ChatDocument));
        knowledgeBaseRepository = module.get((0, typeorm_1.getRepositoryToken)(knowledge_base_article_entity_1.KnowledgeBaseArticle));
        faqRepository = module.get((0, typeorm_1.getRepositoryToken)(learned_faq_entry_entity_1.LearnedFaqEntry));
        patternRepository = module.get((0, typeorm_1.getRepositoryToken)(learning_pattern_entity_1.LearningPattern));
        faqEnhancedSearchService = module.get(faq_enhanced_search_service_1.FaqEnhancedSearchService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('buildContext', () => {
        it('should build context from multiple sources', async () => {
            const query = 'test query';
            const sessionId = 'test-session-id';
            // Mock empty results for all sources
            jest.spyOn(service, 'searchKnowledgeBase').mockResolvedValue([]);
            jest.spyOn(service, 'searchFaqLearning').mockResolvedValue([]);
            jest.spyOn(service, 'searchDocuments').mockResolvedValue([]);
            const result = await service.buildContext(query, sessionId);
            expect(result).toBeDefined();
            expect(result.sources).toEqual([]);
            expect(result.searchQuery).toBe(query);
            expect(result.totalRelevanceScore).toBe(0);
            expect(result.processingTime).toBeGreaterThan(0);
        });
        it('should filter sources by minimum relevance score', async () => {
            const query = 'test query';
            const sessionId = 'test-session-id';
            const minRelevanceScore = 0.5;
            // Mock results with different relevance scores
            const mockKbResults = [{
                    article: { id: '1', title: 'Test Article', content: 'Test content' },
                    relevanceScore: 0.3, // Below threshold
                    matchedContent: 'Test content'
                }];
            const mockFaqResults = [{
                    faqEntry: { id: '2', question: 'Test Question', answer: 'Test answer' },
                    relevanceScore: 0.7, // Above threshold
                    matchedContent: 'Test answer',
                    confidence: 80
                }];
            jest.spyOn(service, 'searchKnowledgeBase').mockResolvedValue(mockKbResults);
            jest.spyOn(service, 'searchFaqLearning').mockResolvedValue(mockFaqResults);
            jest.spyOn(service, 'searchDocuments').mockResolvedValue([]);
            const result = await service.buildContext(query, sessionId, { minRelevanceScore });
            expect(result.sources).toHaveLength(1);
            expect(result.sources[0].relevanceScore).toBeGreaterThanOrEqual(minRelevanceScore);
        });
    });
    describe('searchKnowledgeBase', () => {
        it('should search knowledge base articles', async () => {
            const query = 'test query';
            const mockArticles = [
                {
                    id: '1',
                    title: 'Test Article',
                    content: 'Test content with test query',
                    summary: 'Test summary',
                    tags: ['test'],
                    viewCount: 10,
                    helpfulCount: 5,
                    notHelpfulCount: 1,
                    searchScore: 80
                }
            ];
            const mockQueryBuilder = {
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                addOrderBy: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockArticles),
            };
            jest.spyOn(knowledgeBaseRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
            const results = await service.searchKnowledgeBase(query, 5);
            expect(results).toBeDefined();
            expect(results).toHaveLength(1);
            expect(results[0].article.id).toBe('1');
            expect(results[0].relevanceScore).toBeGreaterThan(0);
        });
    });
    describe('searchFaqLearning', () => {
        it('should use enhanced search service', async () => {
            const query = 'test query';
            const mockSearchResponse = {
                results: [{
                        id: '1',
                        type: 'faq',
                        title: 'Test Question',
                        content: 'Test answer',
                        snippet: 'Test snippet',
                        relevanceScore: 85,
                        confidence: 80,
                        category: 'test',
                        tags: ['test'],
                        url: '/help/faq/1',
                        metadata: {
                            usageCount: 5,
                            helpfulCount: 3,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    }],
                total: 1,
                page: 1,
                limit: 5,
                query,
                suggestions: [],
                relatedFaqs: [],
                processingTime: 10
            };
            const mockFaqEntry = {
                id: '1',
                question: 'Test Question',
                answer: 'Test answer',
                confidence: 80
            };
            mockFaqEnhancedSearchService.search.mockResolvedValue(mockSearchResponse);
            jest.spyOn(faqRepository, 'findOne').mockResolvedValue(mockFaqEntry);
            const results = await service.searchFaqLearning(query, 5);
            expect(results).toBeDefined();
            expect(results).toHaveLength(1);
            expect(results[0].faqEntry.id).toBe('1');
            expect(results[0].relevanceScore).toBe(0.85); // Normalized from 85 to 0.85
        });
    });
    describe('searchDocuments', () => {
        it('should search documents in session', async () => {
            const query = 'test query';
            const sessionId = 'test-session-id';
            const mockDocuments = [
                {
                    id: '1',
                    filename: 'test.pdf',
                    fileType: 'pdf',
                    fileSize: 1024,
                    extractedContent: 'This is test content with test query',
                    createdAt: new Date()
                }
            ];
            const mockQueryBuilder = {
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                addOrderBy: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockDocuments),
            };
            jest.spyOn(documentRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
            const results = await service.searchDocuments(query, sessionId, 3);
            expect(results).toBeDefined();
            expect(results).toHaveLength(1);
            expect(results[0].document.id).toBe('1');
            expect(results[0].relevanceScore).toBeGreaterThan(0);
        });
    });
    describe('getContextStatistics', () => {
        it('should return context statistics', async () => {
            const mockSources = [
                {
                    sourceType: 'knowledge_base',
                    relevanceScore: 0.8,
                    metadata: { category: 'Technical' }
                },
                {
                    sourceType: 'faq_learning',
                    relevanceScore: 0.6,
                    metadata: { category: 'General' }
                }
            ];
            const mockQueryBuilder = {
                where: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockSources),
            };
            jest.spyOn(contextSourceRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder);
            const stats = await service.getContextStatistics();
            expect(stats).toBeDefined();
            expect(stats.totalSources).toBe(2);
            expect(stats.averageRelevanceScore).toBe(0.7);
            expect(stats.sourcesByType).toBeDefined();
            expect(stats.topCategories).toBeDefined();
        });
    });
});
//# sourceMappingURL=chat-context-engine.test.js.map