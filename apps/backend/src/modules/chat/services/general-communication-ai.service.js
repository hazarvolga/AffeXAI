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
exports.GeneralCommunicationAiService = void 0;
const common_1 = require("@nestjs/common");
let GeneralCommunicationAiService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GeneralCommunicationAiService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GeneralCommunicationAiService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        aiService;
        generalContextService;
        chatAiSettings;
        logger = new common_1.Logger(GeneralCommunicationAiService.name);
        constructor(aiService, generalContextService, chatAiSettings) {
            this.aiService = aiService;
            this.generalContextService = generalContextService;
            this.chatAiSettings = chatAiSettings;
        }
        /**
         * Generate AI response for general communication queries
         */
        async generateGeneralResponse(query, sessionId, options = {}) {
            const startTime = Date.now();
            this.logger.log(`Generating general communication response for query: "${query}"`);
            const { includeContextSources = true, maxResponseLength = 800, tone = 'friendly', language = 'tr' } = options;
            try {
                // Build context for the query
                let contextResult = null;
                if (includeContextSources) {
                    contextResult = await this.generalContextService.buildGeneralContext(query, sessionId, {
                        maxSources: 6,
                        minRelevanceScore: 0.2,
                        focusOnPlatformInfo: true
                    });
                }
                // Determine response type based on query analysis
                const responseType = this.analyzeQueryType(query);
                // Check if escalation to support is needed
                const needsEscalation = this.shouldEscalateToSupport(query, contextResult);
                if (needsEscalation.shouldEscalate) {
                    return {
                        content: this.generateEscalationResponse(query, needsEscalation.reason, language),
                        confidence: 0.9,
                        responseType: 'escalation-suggested',
                        escalationReason: needsEscalation.reason,
                        contextSources: contextResult?.sources || []
                    };
                }
                // Generate AI prompt based on context and query type
                const prompt = this.buildGeneralCommunicationPrompt(query, contextResult, responseType, { tone, language, maxResponseLength });
                // Get AI configuration
                const aiConfig = await this.chatAiSettings.getActiveConfiguration();
                // Get AI response
                const aiResponseResult = await this.aiService.generateCompletion(aiConfig.apiKey, prompt, {
                    model: aiConfig.model,
                    maxTokens: Math.ceil(maxResponseLength * 1.5), // Account for token vs character difference
                    temperature: 0.7,
                    systemPrompt: this.getSystemMessage(language, tone)
                });
                // Calculate confidence based on context quality and response type
                const confidence = this.calculateResponseConfidence(contextResult, responseType, aiResponseResult.content);
                // Extract suggested actions if any
                const suggestedActions = this.extractSuggestedActions(aiResponseResult.content, language);
                const processingTime = Date.now() - startTime;
                this.logger.log(`General response generated in ${processingTime}ms with confidence: ${confidence}`);
                return {
                    content: aiResponseResult.content,
                    confidence,
                    responseType,
                    suggestedActions,
                    contextSources: contextResult?.sources || []
                };
            }
            catch (error) {
                this.logger.error(`Error generating general response: ${error.message}`, error.stack);
                // Return fallback response
                return {
                    content: this.getFallbackResponse(language),
                    confidence: 0.3,
                    responseType: 'clarification-needed',
                    suggestedActions: [
                        language === 'tr'
                            ? 'Sorunuzu daha detaylı açıklayabilir misiniz?'
                            : 'Could you please provide more details about your question?'
                    ]
                };
            }
        }
        /**
         * Analyze query type to determine appropriate response strategy
         */
        analyzeQueryType(query) {
            const queryLower = query.toLowerCase();
            // Check for informational queries
            const informationalPatterns = [
                /nedir|ne demek|what is|what does/i,
                /nasıl çalışır|how does.*work/i,
                /platform.*nedir|what.*platform/i,
                /özellik.*nedir|what.*feature/i
            ];
            if (informationalPatterns.some(pattern => pattern.test(query))) {
                return 'informational';
            }
            // Check for guidance-seeking queries
            const guidancePatterns = [
                /nasıl|how to|how do/i,
                /adım|step|rehber|guide/i,
                /kullanım|usage|use/i,
                /başlangıç|getting started/i
            ];
            if (guidancePatterns.some(pattern => pattern.test(query))) {
                return 'guidance';
            }
            // Check for unclear or complex queries
            if (query.length < 10 || query.split(' ').length < 3) {
                return 'clarification-needed';
            }
            // Default to informational
            return 'informational';
        }
        /**
         * Determine if query should be escalated to support
         */
        shouldEscalateToSupport(query, contextResult) {
            const queryLower = query.toLowerCase();
            // Technical problem indicators
            const technicalProblemPatterns = [
                /çalışmıyor|not working|broken/i,
                /hata|error|bug/i,
                /sorun|problem|issue/i,
                /yavaş|slow|performance/i,
                /erişemiyorum|can't access|cannot access/i,
                /giriş yapamıyorum|can't login|cannot login/i
            ];
            if (technicalProblemPatterns.some(pattern => pattern.test(query))) {
                return {
                    shouldEscalate: true,
                    reason: 'technical-problem'
                };
            }
            // Account/billing related queries
            const accountPatterns = [
                /hesap|account/i,
                /fatura|billing|payment/i,
                /ödeme|subscription/i,
                /iptal|cancel/i,
                /upgrade|downgrade/i
            ];
            if (accountPatterns.some(pattern => pattern.test(query))) {
                return {
                    shouldEscalate: true,
                    reason: 'account-billing'
                };
            }
            // Low context relevance might indicate complex issue
            if (contextResult && contextResult.totalRelevanceScore < 1.0 && contextResult.sources.length < 2) {
                return {
                    shouldEscalate: true,
                    reason: 'insufficient-context'
                };
            }
            // Urgent language indicators
            const urgentPatterns = [
                /acil|urgent|emergency/i,
                /hemen|immediately|asap/i,
                /kritik|critical/i
            ];
            if (urgentPatterns.some(pattern => pattern.test(query))) {
                return {
                    shouldEscalate: true,
                    reason: 'urgent-request'
                };
            }
            return { shouldEscalate: false };
        }
        /**
         * Build AI prompt for general communication
         */
        buildGeneralCommunicationPrompt(query, contextResult, responseType, options) {
            const { tone, language, maxResponseLength } = options;
            let prompt = '';
            // Add context information if available
            if (contextResult && contextResult.sources.length > 0) {
                prompt += language === 'tr'
                    ? 'Aşağıdaki bilgi kaynaklarını kullanarak kullanıcının sorusunu yanıtla:\n\n'
                    : 'Use the following information sources to answer the user\'s question:\n\n';
                contextResult.sources.forEach((source, index) => {
                    prompt += `${index + 1}. **${source.title}**\n`;
                    prompt += `   Kategori: ${source.category}\n`;
                    prompt += `   İçerik: ${source.content}\n`;
                    if (source.url) {
                        prompt += `   Link: ${source.url}\n`;
                    }
                    prompt += '\n';
                });
                prompt += '---\n\n';
            }
            // Add response type specific instructions
            switch (responseType) {
                case 'informational':
                    prompt += language === 'tr'
                        ? 'Kullanıcı bilgi arıyor. Açık, anlaşılır ve kapsamlı bir açıklama yap.\n'
                        : 'The user is seeking information. Provide a clear, understandable, and comprehensive explanation.\n';
                    break;
                case 'guidance':
                    prompt += language === 'tr'
                        ? 'Kullanıcı rehberlik arıyor. Adım adım talimatlar ve pratik öneriler ver.\n'
                        : 'The user is seeking guidance. Provide step-by-step instructions and practical suggestions.\n';
                    break;
                case 'clarification-needed':
                    prompt += language === 'tr'
                        ? 'Soru belirsiz. Açıklama iste ve genel yardım önerileri sun.\n'
                        : 'The question is unclear. Ask for clarification and provide general help suggestions.\n';
                    break;
            }
            // Add tone and style instructions
            const toneInstructions = {
                friendly: language === 'tr'
                    ? 'Samimi ve dostane bir ton kullan. Kullanıcıyı destekleyici bir şekilde karşıla.'
                    : 'Use a warm and friendly tone. Be supportive and welcoming to the user.',
                professional: language === 'tr'
                    ? 'Profesyonel ama erişilebilir bir ton kullan. Resmi olmaktan kaçın.'
                    : 'Use a professional but accessible tone. Avoid being overly formal.',
                helpful: language === 'tr'
                    ? 'Yardımsever ve çözüm odaklı bir yaklaşım benimse.'
                    : 'Adopt a helpful and solution-focused approach.'
            };
            prompt += `\n${toneInstructions[tone]}\n\n`;
            // Add length constraint
            prompt += language === 'tr'
                ? `Yanıtını ${maxResponseLength} karakter ile sınırla.\n\n`
                : `Limit your response to ${maxResponseLength} characters.\n\n`;
            // Add the user's question
            prompt += language === 'tr'
                ? `Kullanıcı Sorusu: "${query}"\n\nYanıt:`
                : `User Question: "${query}"\n\nResponse:`;
            return prompt;
        }
        /**
         * Get system message for AI
         */
        getSystemMessage(language, tone) {
            if (language === 'tr') {
                return `Sen Affex AI platformunun genel iletişim asistanısın. Kullanıcılara platform hakkında bilgi verme, rehberlik etme ve genel sorularını yanıtlama konusunda uzmanısın. 

Görevlerin:
- Platform özelliklerini açıklamak
- Kullanım rehberleri sunmak  
- Genel sorulara yanıt vermek
- Gerektiğinde destek ekibine yönlendirmek

${tone === 'friendly' ? 'Samimi ve dostane ol.' : tone === 'professional' ? 'Profesyonel ama erişilebilir ol.' : 'Yardımsever ve çözüm odaklı ol.'}

Teknik sorunlar, hesap/fatura konuları veya acil durumlar için kullanıcıyı destek ekibine yönlendir.`;
            }
            else {
                return `You are the general communication assistant for the Affex AI platform. You specialize in providing information about the platform, offering guidance, and answering general questions.

Your responsibilities:
- Explain platform features
- Provide usage guides
- Answer general questions
- Escalate to support team when necessary

${tone === 'friendly' ? 'Be warm and friendly.' : tone === 'professional' ? 'Be professional but accessible.' : 'Be helpful and solution-focused.'}

For technical problems, account/billing issues, or urgent matters, direct users to the support team.`;
            }
        }
        /**
         * Calculate response confidence based on context quality
         */
        calculateResponseConfidence(contextResult, responseType, aiResponse) {
            let confidence = 0.5; // Base confidence
            // Context quality factor
            if (contextResult) {
                const avgRelevance = contextResult.sources.length > 0
                    ? contextResult.totalRelevanceScore / contextResult.sources.length
                    : 0;
                confidence += avgRelevance * 0.3;
            }
            // Response type factor
            const typeConfidence = {
                'informational': 0.8,
                'guidance': 0.7,
                'escalation-suggested': 0.9,
                'clarification-needed': 0.4
            };
            confidence = Math.max(confidence, typeConfidence[responseType]);
            // Response quality indicators
            if (aiResponse.length > 100 && aiResponse.length < 1000) {
                confidence += 0.1; // Good length
            }
            if (aiResponse.includes('adım') || aiResponse.includes('step')) {
                confidence += 0.05; // Contains actionable steps
            }
            // Normalize to 0-1 range
            return Math.min(1, Math.max(0, confidence));
        }
        /**
         * Extract suggested actions from AI response
         */
        extractSuggestedActions(aiResponse, language) {
            const actions = [];
            // Look for numbered lists or bullet points
            const listPatterns = [
                /\d+\.\s*([^\n]+)/g,
                /[-•]\s*([^\n]+)/g
            ];
            for (const pattern of listPatterns) {
                const matches = aiResponse.match(pattern);
                if (matches) {
                    actions.push(...matches.slice(0, 3)); // Limit to 3 actions
                    break;
                }
            }
            // If no structured actions found, look for imperative sentences
            if (actions.length === 0) {
                const imperativePatterns = language === 'tr'
                    ? [/([A-ZÇĞIÖŞÜ][^.!?]*(?:yapın|edin|alın|gidin|tıklayın|seçin)[^.!?]*[.!?])/g]
                    : [/([A-Z][^.!?]*(?:click|go|select|choose|try|check)[^.!?]*[.!?])/g];
                for (const pattern of imperativePatterns) {
                    const matches = aiResponse.match(pattern);
                    if (matches) {
                        actions.push(...matches.slice(0, 2));
                        break;
                    }
                }
            }
            return actions;
        }
        /**
         * Generate escalation response
         */
        generateEscalationResponse(query, reason, language) {
            const templates = {
                tr: {
                    'technical-problem': 'Teknik bir sorun yaşıyor gibi görünüyorsunuz. Bu konuda size daha iyi yardımcı olabilmek için destek ekibimizle iletişime geçmenizi öneririm. Destek ekibimiz teknik sorunları çözmede uzmanlaşmıştır ve size hızlı bir çözüm sunabilir.',
                    'account-billing': 'Hesap veya fatura ile ilgili sorularınız için destek ekibimizle iletişime geçmeniz gerekiyor. Bu tür konular kişisel bilgiler içerdiği için güvenlik nedeniyle destek ekibimiz tarafından ele alınmaktadır.',
                    'insufficient-context': 'Sorununuz hakkında yeterli bilgiye sahip değilim. Size daha iyi yardımcı olabilmek için destek ekibimizle iletişime geçmenizi öneririm. Onlar sorununuzu daha detaylı inceleyebilir.',
                    'urgent-request': 'Acil bir durumla karşılaştığınızı anlıyorum. Bu tür durumlar için destek ekibimizle hemen iletişime geçmenizi şiddetle öneririm. Onlar size öncelikli olarak yardımcı olacaklardır.'
                },
                en: {
                    'technical-problem': 'It seems you\'re experiencing a technical issue. I recommend contacting our support team for better assistance with this matter. Our support team specializes in resolving technical problems and can provide you with a quick solution.',
                    'account-billing': 'For account or billing related questions, you need to contact our support team. These types of issues involve personal information and are handled by our support team for security reasons.',
                    'insufficient-context': 'I don\'t have enough information about your issue. I recommend contacting our support team for better assistance. They can examine your problem in more detail.',
                    'urgent-request': 'I understand you\'re facing an urgent situation. For such cases, I strongly recommend contacting our support team immediately. They will assist you with priority.'
                }
            };
            const template = templates[language]?.[reason]
                || templates[language]['insufficient-context'];
            const escalationSuffix = language === 'tr'
                ? '\n\nDestek ekibimizle iletişime geçmek için "Destek Ekibiyle İletişim" butonuna tıklayabilirsiniz.'
                : '\n\nYou can click the "Contact Support Team" button to get in touch with our support team.';
            return template + escalationSuffix;
        }
        /**
         * Get fallback response when AI generation fails
         */
        getFallbackResponse(language) {
            return language === 'tr'
                ? 'Üzgünüm, şu anda sorununuza uygun bir yanıt oluşturamıyorum. Lütfen sorunuzu daha detaylı açıklayın veya destek ekibimizle iletişime geçin.'
                : 'I\'m sorry, I cannot generate an appropriate response to your question right now. Please provide more details about your question or contact our support team.';
        }
        /**
         * Get conversation starters for general communication
         */
        async getConversationStarters(language = 'tr') {
            const starters = {
                tr: [
                    'Platform nasıl çalışır?',
                    'Hangi özellikler mevcut?',
                    'Nasıl başlayabilirim?',
                    'Hesabımı nasıl yönetebilirim?',
                    'Fiyatlandırma nasıl?',
                    'Mobil uygulama var mı?'
                ],
                en: [
                    'How does the platform work?',
                    'What features are available?',
                    'How can I get started?',
                    'How can I manage my account?',
                    'How does pricing work?',
                    'Is there a mobile app?'
                ]
            };
            return starters[language] || starters.tr;
        }
    };
    return GeneralCommunicationAiService = _classThis;
})();
exports.GeneralCommunicationAiService = GeneralCommunicationAiService;
//# sourceMappingURL=general-communication-ai.service.js.map