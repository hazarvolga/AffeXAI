"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqAiService = void 0;
const common_1 = require("@nestjs/common");
/**
 * FAQ AI Service
 * Integrates with global AI service for FAQ generation and analysis
 */
let FaqAiService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FaqAiService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqAiService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository;
        aiService;
        settingsService;
        logger = new common_1.Logger(FaqAiService.name);
        constructor(configRepository, aiService, settingsService) {
            this.configRepository = configRepository;
            this.aiService = aiService;
            this.settingsService = settingsService;
        }
        /**
         * Generate FAQ answer using global AI service
         */
        async generateFaqAnswer(request) {
            const startTime = Date.now();
            try {
                // Get AI settings for support module
                const aiSettings = await this.settingsService.getAiSettings();
                const supportSettings = aiSettings.support;
                if (!supportSettings.enabled) {
                    throw new Error('AI support is disabled in settings');
                }
                // Use global API key if single key mode is enabled
                const apiKey = aiSettings.useSingleApiKey
                    ? aiSettings.global?.apiKey
                    : supportSettings.apiKey;
                if (!apiKey) {
                    throw new Error('No AI API key configured for FAQ learning');
                }
                const prompt = this.buildFaqPrompt(request);
                const result = await this.aiService.generateCompletion(apiKey, prompt, {
                    model: supportSettings.model,
                    temperature: 0.7,
                    maxTokens: 1000,
                    systemPrompt: 'You are an expert FAQ generator. Create clear, helpful FAQ entries based on conversation patterns.'
                });
                const processingTime = Date.now() - startTime;
                // Parse AI response (expecting JSON format)
                let parsedResponse;
                try {
                    parsedResponse = JSON.parse(result.content);
                }
                catch {
                    // Fallback if not JSON
                    parsedResponse = {
                        answer: result.content,
                        confidence: 75,
                        keywords: this.extractKeywords(result.content),
                        category: 'General'
                    };
                }
                return {
                    answer: parsedResponse.answer || result.content,
                    confidence: parsedResponse.confidence || 75,
                    keywords: parsedResponse.keywords || this.extractKeywords(result.content),
                    category: parsedResponse.category || 'General',
                    processingTime,
                    metadata: {
                        aiProvider: this.getProviderFromModel(supportSettings.model),
                        model: supportSettings.model,
                        processingTime,
                        tokensUsed: result.tokensUsed
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to generate FAQ answer:', error);
                throw new Error(`FAQ generation failed: ${error.message}`);
            }
        }
        /**
         * Analyze patterns in conversation data
         */
        async analyzePatterns(request) {
            const startTime = Date.now();
            try {
                const aiSettings = await this.settingsService.getAiSettings();
                const supportSettings = aiSettings.support;
                const apiKey = aiSettings.useSingleApiKey
                    ? aiSettings.global?.apiKey
                    : supportSettings.apiKey;
                if (!apiKey) {
                    throw new Error('No AI API key configured for pattern analysis');
                }
                const prompt = this.buildPatternAnalysisPrompt(request);
                const result = await this.aiService.generateCompletion(apiKey, prompt, {
                    model: supportSettings.model,
                    temperature: 0.3, // Lower temperature for more consistent analysis
                    maxTokens: 800,
                    systemPrompt: 'You are an expert at analyzing conversation patterns and identifying frequently asked questions.'
                });
                const processingTime = Date.now() - startTime;
                // Parse AI response
                let parsedResponse;
                try {
                    parsedResponse = JSON.parse(result.content);
                }
                catch {
                    parsedResponse = {
                        patterns: [],
                        confidence: 50,
                        recommendations: ['Unable to parse AI response']
                    };
                }
                return {
                    patterns: parsedResponse.patterns || [],
                    confidence: parsedResponse.confidence || 50,
                    recommendations: parsedResponse.recommendations || [],
                    processingTime,
                    metadata: {
                        aiProvider: this.getProviderFromModel(supportSettings.model),
                        model: supportSettings.model,
                        processingTime,
                        tokensUsed: result.tokensUsed
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to analyze patterns:', error);
                throw new Error(`Pattern analysis failed: ${error.message}`);
            }
        }
        /**
         * Get current AI provider status and statistics
         */
        async getProviderStatus() {
            try {
                const aiSettings = await this.settingsService.getAiSettings();
                const supportSettings = aiSettings.support;
                const apiKey = aiSettings.useSingleApiKey
                    ? aiSettings.global?.apiKey
                    : supportSettings.apiKey;
                if (!apiKey) {
                    return {
                        provider: this.getProviderFromModel(supportSettings.model),
                        model: supportSettings.model,
                        available: false
                    };
                }
                const startTime = Date.now();
                const isAvailable = await this.aiService.testApiKey(apiKey, supportSettings.model);
                const responseTime = Date.now() - startTime;
                return {
                    provider: this.getProviderFromModel(supportSettings.model),
                    model: supportSettings.model,
                    available: isAvailable,
                    responseTime: isAvailable ? responseTime : undefined
                };
            }
            catch (error) {
                this.logger.error('Failed to get provider status:', error);
                return {
                    provider: 'unknown',
                    model: 'unknown',
                    available: false
                };
            }
        }
        /**
         * Build FAQ generation prompt
         */
        buildFaqPrompt(request) {
            return `
Generate a comprehensive FAQ entry based on the following conversation data:

Context: ${request.context}
${request.questionPattern ? `Question Pattern: ${request.questionPattern}` : ''}
${request.answerPattern ? `Answer Pattern: ${request.answerPattern}` : ''}

Please provide a JSON response with the following structure:
{
  "question": "Clear, concise question that users would ask",
  "answer": "Comprehensive, helpful answer",
  "confidence": 85,
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "category": "appropriate_category_name"
}

Make sure the FAQ entry is:
- Clear and easy to understand
- Comprehensive but concise
- Helpful for users with similar questions
- Properly categorized
    `.trim();
        }
        /**
         * Build pattern analysis prompt
         */
        buildPatternAnalysisPrompt(request) {
            return `
Analyze the following conversation data to identify patterns and potential FAQ entries:

Conversations: ${JSON.stringify(request.conversations)}
Time Range: ${request.timeRange.from} to ${request.timeRange.to}

Please provide a JSON response with:
{
  "patterns": [
    {
      "type": "question_pattern",
      "pattern": "description of the pattern",
      "frequency": 5,
      "confidence": 85,
      "examples": ["example1", "example2"]
    }
  ],
  "confidence": 80,
  "recommendations": [
    "Create FAQ for pattern X",
    "Consider improving documentation for topic Y"
  ]
}

Focus on:
- Frequently asked questions
- Common problem patterns
- Recurring themes
- User pain points
    `.trim();
        }
        /**
         * Extract keywords from text (fallback method)
         */
        extractKeywords(text) {
            const words = text.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(word => word.length > 3);
            // Simple frequency-based keyword extraction
            const wordCount = new Map();
            words.forEach(word => {
                wordCount.set(word, (wordCount.get(word) || 0) + 1);
            });
            return Array.from(wordCount.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([word]) => word);
        }
        /**
         * Improve existing FAQ answer (compatibility method)
         */
        async improveAnswer(question, answer, feedback) {
            const request = {
                context: `Question: ${question}\nCurrent Answer: ${answer}\nFeedback: ${feedback?.join(', ') || 'None'}`,
                questionPattern: question,
                answerPattern: answer
            };
            return this.generateFaqAnswer(request);
        }
        /**
         * Categorize question (compatibility method)
         */
        async categorizeQuestion(question, availableCategories) {
            const request = {
                context: `Question: ${question}\nAvailable Categories: ${availableCategories.join(', ')}`
            };
            const response = await this.generateFaqAnswer(request);
            return response.category;
        }
        /**
         * Get provider name from AI model
         */
        getProviderFromModel(model) {
            if (model.startsWith('gpt-'))
                return 'openai';
            if (model.startsWith('claude-'))
                return 'anthropic';
            return 'unknown';
        }
    };
    return FaqAiService = _classThis;
})();
exports.FaqAiService = FaqAiService;
//# sourceMappingURL=faq-ai.service.js.map