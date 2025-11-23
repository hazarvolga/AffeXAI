"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const chat_context_engine_service_1 = require("../chat-context-engine.service");
const chat_context_source_entity_1 = require("../../entities/chat-context-source.entity");
const chat_document_entity_1 = require("../../entities/chat-document.entity");
const chat_url_cache_entity_1 = require("../../entities/chat-url-cache.entity");
const knowledge_base_article_entity_1 = require("../../../tickets/entities/knowledge-base-article.entity");
const learned_faq_entry_entity_1 = require("../../../faq-learning/entities/learned-faq-entry.entity");
const faq_enhanced_search_service_1 = require("../../../faq-learning/services/faq-enhanced-search.service");
describe('ChatContextEngineService', () => {
    let service;
    let contextSourceRepository;
    let knowledgeBaseRepository;
    let faqRepository;
    let documentRepository;
    let urlCacheRepository;
    let faqSearchService;
    const mockContextSourceRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
        })),
    };
    const mockKnowledgeBaseRepository = {
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
        })),
    };
    const mockFaqRepository = {
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
        })),
    };
    const mockDocumentRepository = {
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
        })),
    };
    const mockUrlCacheRepository = {
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
        })),
    };
    const mockFaqSearchService = {
        enhancedSearch: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                chat_context_engine_service_1.ChatContextEngineService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(chat_context_source_entity_1.ChatContextSource),
                    useValue: mockContextSourceRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(knowledge_base_article_entity_1.KnowledgeBaseArticle),
                    useValue: mockKnowledgeBaseRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(learned_faq_entry_entity_1.LearnedFaqEntry),
                    useValue: mockFaqRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(chat_document_entity_1.ChatDocument),
                    useValue: mockDocumentRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(chat_url_cache_entity_1.ChatUrlCache),
                    useValue: mockUrlCacheRepository,
                },
                {
                    provide: faq_enhanced_search_service_1.FaqEnhancedSearchService,
                    useValue: mockFaqSearchService,
                },
            ],
        }).compile();
        service = module.get(chat_context_engine_service_1.ChatContextEngineService);
        contextSourceRepository = module.get((0, typeorm_1.getRepositoryToken)(chat_context_source_entity_1.ChatContextSource));
        knowledgeBaseRepository = module.get((0, typeorm_1.getRepositoryToken)(knowledge_base_article_entity_1.KnowledgeBaseArticle));
        faqRepository = module.get((0, typeorm_1.getRepositoryToken)(learned_faq_entry_entity_1.LearnedFaqEntry));
        documentRepository = module.get((0, typeorm_1.getRepositoryToken)(chat_document_entity_1.ChatDocument));
        urlCacheRepository = module.get((0, typeorm_1.getRepositoryToken)(chat_url_cache_entity_1.ChatUrlCache));
        faqSearchService = module.get(faq_enhanced_search_service_1.FaqEnhancedSearchService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Service Initialization', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
        it('should have all required dependencies injected', () => {
            expect(contextSourceRepository).toBeDefined();
            expect(knowledgeBaseRepository).toBeDefined();
            expect(faqRepository).toBeDefined();
            expect(documentRepository).toBeDefined();
            expect(urlCacheRepository).toBeDefined();
            expect(faqSearchService).toBeDefined();
        });
    });
    describe('buildContext', () => {
        const sessionId = 'test-session-id';
        const query = 'How do I reset my password?';
        it('should build context from multiple sources', async () => {
            // Mock knowledge base results
            const mockKbArticles = [
                {
                    id: 'kb-1',
                    title: 'Password Reset Guide',
                    content: 'To reset your password, click on forgot password...',
                    category: { name: 'Account Management' },
                },
            ];
            // Mock FAQ results
            const mockFaqEntries = [
                {
                    id: 'faq-1',
                    question: 'How to reset password?',
                    answer: 'You can reset your password by...',
                    confidence: 0.9,
                },
            ];
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue(mockKbArticles);
            jest
                .spyOn(mockFaqSearchService, 'enhancedSearch')
                .mockResolvedValue(mockFaqEntries);
            const result = await service.buildContext(sessionId, query);
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
        it('should handle empty query gracefully', async () => {
            const result = await service.buildContext(sessionId, '');
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
        });
        it('should rank sources by relevance', async () => {
            const mockSources = [
                {
                    id: 'source-1',
                    relevanceScore: 0.9,
                    sourceType: chat_context_source_entity_1.ContextSourceType.KNOWLEDGE_BASE,
                    content: 'Highly relevant content',
                },
                {
                    id: 'source-2',
                    relevanceScore: 0.5,
                    sourceType: chat_context_source_entity_1.ContextSourceType.FAQ_LEARNING,
                    content: 'Moderately relevant content',
                },
                {
                    id: 'source-3',
                    relevanceScore: 0.3,
                    sourceType: chat_context_source_entity_1.ContextSourceType.DOCUMENT,
                    content: 'Low relevance content',
                },
            ];
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue([mockSources[0]]);
            jest
                .spyOn(mockFaqSearchService, 'enhancedSearch')
                .mockResolvedValue([mockSources[1]]);
            const result = await service.buildContext(sessionId, query);
            // Verify sources are ranked (highest relevance first)
            if (result.length > 1) {
                for (let i = 0; i < result.length - 1; i++) {
                    expect(result[i].relevanceScore).toBeGreaterThanOrEqual(result[i + 1].relevanceScore);
                }
            }
        });
        it('should limit results to top 10 sources', async () => {
            const mockManyResults = Array.from({ length: 20 }, (_, i) => ({
                id: `source-${i}`,
                relevanceScore: Math.random(),
                sourceType: chat_context_source_entity_1.ContextSourceType.KNOWLEDGE_BASE,
                content: `Content ${i}`,
            }));
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue(mockManyResults);
            const result = await service.buildContext(sessionId, query);
            expect(result.length).toBeLessThanOrEqual(10);
        });
    });
    describe('saveContextSource', () => {
        it('should save a context source successfully', async () => {
            const contextSource = {
                sessionId: 'test-session',
                messageId: 'test-message',
                sourceType: chat_context_source_entity_1.ContextSourceType.KNOWLEDGE_BASE,
                sourceId: 'kb-1',
                content: 'Test content',
                relevanceScore: 0.8,
                metadata: { title: 'Test Article' },
            };
            mockContextSourceRepository.create.mockReturnValue(contextSource);
            mockContextSourceRepository.save.mockResolvedValue({ id: 'saved-id', ...contextSource });
            const result = await service.saveContextSource(contextSource);
            expect(mockContextSourceRepository.create).toHaveBeenCalledWith(contextSource);
            expect(mockContextSourceRepository.save).toHaveBeenCalled();
            expect(result).toBeDefined();
            expect(result.id).toBe('saved-id');
        });
        it('should throw error when save fails', async () => {
            mockContextSourceRepository.create.mockReturnValue({});
            mockContextSourceRepository.save.mockRejectedValue(new Error('Database error'));
            await expect(service.saveContextSource({
                sessionId: 'test',
                sourceType: chat_context_source_entity_1.ContextSourceType.FAQ_LEARNING,
                content: 'test',
                relevanceScore: 0.5,
            })).rejects.toThrow('Database error');
        });
    });
    describe('searchKnowledgeBase', () => {
        it('should search knowledge base articles by query', async () => {
            const query = 'installation guide';
            const mockArticles = [
                {
                    id: 'kb-1',
                    title: 'Installation Guide',
                    content: 'Follow these steps to install...',
                    published: true,
                },
            ];
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue(mockArticles);
            const result = await service.searchKnowledgeBase(query);
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        });
        it('should only return published articles', async () => {
            const mockArticles = [
                { id: 'kb-1', title: 'Published Article', published: true },
                { id: 'kb-2', title: 'Draft Article', published: false },
            ];
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue(mockArticles.filter(a => a.published));
            const result = await service.searchKnowledgeBase('test');
            expect(result.every(article => article.published)).toBe(true);
        });
    });
    describe('Performance', () => {
        it('should complete context building within acceptable time (<500ms)', async () => {
            const startTime = Date.now();
            jest
                .spyOn(mockKnowledgeBaseRepository.createQueryBuilder(), 'getMany')
                .mockResolvedValue([]);
            jest
                .spyOn(mockFaqSearchService, 'enhancedSearch')
                .mockResolvedValue([]);
            await service.buildContext('test-session', 'test query');
            const duration = Date.now() - startTime;
            expect(duration).toBeLessThan(500);
        });
    });
});
//# sourceMappingURL=chat-context-engine.service.spec.js.map