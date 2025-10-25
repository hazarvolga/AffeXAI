"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_ai_service_1 = require("../src/modules/chat/services/chat-ai.service");
const chat_ai_settings_service_1 = require("../src/modules/chat/services/chat-ai-settings.service");
const ai_service_1 = require("../src/modules/ai/ai.service");
const settings_service_1 = require("../src/modules/settings/settings.service");
const chat_context_engine_service_1 = require("../src/modules/chat/services/chat-context-engine.service");
const ai_settings_dto_1 = require("../src/modules/settings/dto/ai-settings.dto");
describe('ChatAiService Integration', () => {
    let chatAiService;
    let chatAiSettingsService;
    let mockAiService;
    let mockSettingsService;
    let mockContextEngine;
    beforeEach(async () => {
        // Create mocks
        mockAiService = {
            generateCompletion: jest.fn(),
            testApiKey: jest.fn(),
            clearClientCache: jest.fn(),
            getSupportedModels: jest.fn(),
        };
        mockSettingsService = {
            getAiApiKeyForModule: jest.fn(),
            getAiModelForModule: jest.fn(),
            getAiSettings: jest.fn(),
        };
        mockContextEngine = {
            buildContext: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                chat_ai_service_1.ChatAiService,
                chat_ai_settings_service_1.ChatAiSettingsService,
                {
                    provide: ai_service_1.AiService,
                    useValue: mockAiService,
                },
                {
                    provide: settings_service_1.SettingsService,
                    useValue: mockSettingsService,
                },
                {
                    provide: chat_context_engine_service_1.ChatContextEngineService,
                    useValue: mockContextEngine,
                },
            ],
        }).compile();
        chatAiService = module.get(chat_ai_service_1.ChatAiService);
        chatAiSettingsService = module.get(chat_ai_settings_service_1.ChatAiSettingsService);
    });
    describe('generateChatResponse', () => {
        it('should generate AI response with context integration', async () => {
            // Arrange
            const mockApiKey = 'test-api-key';
            const mockModel = ai_settings_dto_1.AiModel.GPT_4_TURBO;
            const mockProvider = ai_settings_dto_1.AiProvider.OPENAI;
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(mockApiKey);
            mockSettingsService.getAiModelForModule.mockResolvedValue(mockModel);
            mockContextEngine.buildContext.mockResolvedValue({
                sources: [
                    {
                        id: '1',
                        type: 'knowledge_base',
                        title: 'Test Article',
                        content: 'Test content',
                        relevanceScore: 0.8,
                        metadata: {}
                    }
                ],
                totalRelevanceScore: 0.8,
                searchQuery: 'test query',
                processingTime: 100
            });
            mockAiService.generateCompletion.mockResolvedValue({
                content: 'Test AI response with [1] citation',
                model: mockModel,
                provider: mockProvider,
                tokensUsed: 50,
                finishReason: 'stop'
            });
            // Act
            const result = await chatAiService.generateChatResponse('test prompt', {
                includeContext: true,
                sessionId: 'test-session-id'
            });
            // Assert
            expect(result.content).toBe('Test AI response with [1] citation');
            expect(result.contextUsed).toBeDefined();
            expect(result.contextSources).toHaveLength(1);
            expect(result.confidenceScore).toBeGreaterThan(0);
            expect(result.citations).toContain('Test Article');
            expect(mockContextEngine.buildContext).toHaveBeenCalledWith('test prompt', 'test-session-id', undefined);
        });
        it('should handle AI generation without context', async () => {
            // Arrange
            const mockApiKey = 'test-api-key';
            const mockModel = ai_settings_dto_1.AiModel.GPT_4_TURBO;
            const mockProvider = ai_settings_dto_1.AiProvider.OPENAI;
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(mockApiKey);
            mockSettingsService.getAiModelForModule.mockResolvedValue(mockModel);
            mockAiService.generateCompletion.mockResolvedValue({
                content: 'Test AI response without context',
                model: mockModel,
                provider: mockProvider,
                tokensUsed: 30,
                finishReason: 'stop'
            });
            // Act
            const result = await chatAiService.generateChatResponse('test prompt', {
                includeContext: false
            });
            // Assert
            expect(result.content).toBe('Test AI response without context');
            expect(result.contextUsed).toBeUndefined();
            expect(result.contextSources).toBeUndefined();
            expect(mockContextEngine.buildContext).not.toHaveBeenCalled();
        });
    });
    describe('testChatAiConfiguration', () => {
        it('should test AI configuration successfully', async () => {
            // Arrange
            const mockApiKey = 'test-api-key';
            const mockModel = ai_settings_dto_1.AiModel.GPT_4_TURBO;
            const mockProvider = ai_settings_dto_1.AiProvider.OPENAI;
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(mockApiKey);
            mockSettingsService.getAiModelForModule.mockResolvedValue(mockModel);
            mockAiService.generateCompletion.mockResolvedValue({
                content: 'Test successful',
                model: mockModel,
                provider: mockProvider,
                tokensUsed: 10,
                finishReason: 'stop'
            });
            // Act
            const result = await chatAiService.testChatAiConfiguration();
            // Assert
            expect(result.success).toBe(true);
            expect(result.provider).toBe(mockProvider);
            expect(result.model).toBe(mockModel);
            expect(result.streamingSupported).toBe(true); // OpenAI supports streaming
            expect(result.responseTime).toBeGreaterThan(0);
        });
        it('should handle configuration test failure', async () => {
            // Arrange
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(null);
            // Act
            const result = await chatAiService.testChatAiConfiguration();
            // Assert
            expect(result.success).toBe(false);
            expect(result.error).toContain('AI API key not configured');
        });
    });
});
describe('ChatAiSettingsService', () => {
    let chatAiSettingsService;
    let mockSettingsService;
    let mockAiService;
    beforeEach(async () => {
        mockSettingsService = {
            getAiApiKeyForModule: jest.fn(),
            getAiModelForModule: jest.fn(),
            getAiSettings: jest.fn(),
            updateAiSettings: jest.fn(),
        };
        mockAiService = {
            testApiKey: jest.fn(),
            clearClientCache: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                chat_ai_settings_service_1.ChatAiSettingsService,
                {
                    provide: settings_service_1.SettingsService,
                    useValue: mockSettingsService,
                },
                {
                    provide: ai_service_1.AiService,
                    useValue: mockAiService,
                },
            ],
        }).compile();
        chatAiSettingsService = module.get(chat_ai_settings_service_1.ChatAiSettingsService);
    });
    describe('getChatAiConfiguration', () => {
        it('should get support-specific configuration', async () => {
            // Arrange
            const mockApiKey = 'support-api-key';
            const mockModel = ai_settings_dto_1.AiModel.GPT_4_TURBO;
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(mockApiKey);
            mockSettingsService.getAiModelForModule.mockResolvedValue(mockModel);
            // Act
            const result = await chatAiSettingsService.getChatAiConfiguration();
            // Assert
            expect(result.apiKey).toBe(mockApiKey);
            expect(result.model).toBe(mockModel);
            expect(result.provider).toBe(ai_settings_dto_1.AiProvider.OPENAI);
            expect(result.enabled).toBe(true);
            expect(result.priority).toBe(1);
        });
        it('should fallback to global configuration', async () => {
            // Arrange
            mockSettingsService.getAiApiKeyForModule.mockResolvedValue(null);
            mockSettingsService.getAiSettings.mockResolvedValue({
                useSingleApiKey: true,
                global: {
                    apiKey: 'global-api-key',
                    model: ai_settings_dto_1.AiModel.CLAUDE_3_5_SONNET,
                    enabled: true,
                    provider: ai_settings_dto_1.AiProvider.ANTHROPIC
                },
                support: { enabled: false },
                emailMarketing: { enabled: false },
                social: { enabled: false },
                analytics: { enabled: false }
            });
            // Act
            const result = await chatAiSettingsService.getChatAiConfiguration();
            // Assert
            expect(result.apiKey).toBe('global-api-key');
            expect(result.model).toBe(ai_settings_dto_1.AiModel.CLAUDE_3_5_SONNET);
            expect(result.provider).toBe(ai_settings_dto_1.AiProvider.ANTHROPIC);
            expect(result.priority).toBe(2);
        });
    });
    describe('getFailoverConfiguration', () => {
        it('should build failover configuration', async () => {
            // Arrange
            mockSettingsService.getAiModelForModule.mockResolvedValue(ai_settings_dto_1.AiModel.GPT_4_TURBO);
            mockSettingsService.getAiSettings.mockResolvedValue({
                useSingleApiKey: true,
                global: {
                    apiKey: 'global-key',
                    model: ai_settings_dto_1.AiModel.CLAUDE_3_5_SONNET,
                    enabled: true,
                    provider: ai_settings_dto_1.AiProvider.ANTHROPIC
                },
                support: { enabled: true },
                emailMarketing: {
                    enabled: true,
                    apiKey: 'email-key',
                    model: ai_settings_dto_1.AiModel.GEMINI_PRO
                },
                social: { enabled: false },
                analytics: { enabled: false }
            });
            // Act
            const result = await chatAiSettingsService.getFailoverConfiguration();
            // Assert
            expect(result.primaryProvider).toBe(ai_settings_dto_1.AiProvider.OPENAI);
            expect(result.fallbackProviders).toContain(ai_settings_dto_1.AiProvider.ANTHROPIC);
            expect(result.fallbackProviders).toContain(ai_settings_dto_1.AiProvider.GOOGLE);
            expect(result.maxFailuresBeforeFailover).toBe(3);
        });
    });
});
//# sourceMappingURL=chat-ai-integration.test.js.map