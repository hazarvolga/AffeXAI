"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqLearningService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const crypto = __importStar(require("crypto"));
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
let FaqLearningService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _scheduledLearning_decorators;
    let _resetDailyCounters_decorators;
    var FaqLearningService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _scheduledLearning_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            _resetDailyCounters_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT)];
            __esDecorate(this, null, _scheduledLearning_decorators, { kind: "method", name: "scheduledLearning", static: false, private: false, access: { has: obj => "scheduledLearning" in obj, get: obj => obj.scheduledLearning }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resetDailyCounters_decorators, { kind: "method", name: "resetDailyCounters", static: false, private: false, access: { has: obj => "resetDailyCounters" in obj, get: obj => obj.resetDailyCounters }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqLearningService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository = __runInitializers(this, _instanceExtraInitializers);
        patternRepository;
        configRepository;
        chatExtractor;
        ticketExtractor;
        dataNormalizer;
        patternRecognition;
        faqAiService;
        confidenceCalculator;
        batchProcessor;
        logger = new common_1.Logger(FaqLearningService.name);
        isProcessing = false;
        dailyProcessingCount = 0;
        lastProcessingDate = new Date().toDateString();
        constructor(faqRepository, patternRepository, configRepository, chatExtractor, ticketExtractor, dataNormalizer, patternRecognition, faqAiService, confidenceCalculator, batchProcessor) {
            this.faqRepository = faqRepository;
            this.patternRepository = patternRepository;
            this.configRepository = configRepository;
            this.chatExtractor = chatExtractor;
            this.ticketExtractor = ticketExtractor;
            this.dataNormalizer = dataNormalizer;
            this.patternRecognition = patternRecognition;
            this.faqAiService = faqAiService;
            this.confidenceCalculator = confidenceCalculator;
            this.batchProcessor = batchProcessor;
        }
        async runLearningPipeline(criteria) {
            if (this.isProcessing) {
                throw new Error('Learning pipeline is already running');
            }
            const startTime = Date.now();
            this.isProcessing = true;
            const result = {
                processedItems: 0,
                newFaqs: 0,
                updatedPatterns: 0,
                errors: [],
                processingTime: 0,
                status: 'completed'
            };
            try {
                this.logger.log('Starting FAQ learning pipeline');
                // Check daily processing limit
                const config = await this.getPipelineConfig();
                if (!await this.checkDailyLimit(config)) {
                    throw new Error('Daily processing limit reached');
                }
                // Step 1: Extract data from chat and tickets
                const extractedData = await this.extractData(criteria, config);
                result.processedItems = extractedData.length;
                if (extractedData.length === 0) {
                    this.logger.log('No new data to process');
                    return result;
                }
                // Step 2: Normalize and clean data
                const normalizedData = await this.normalizeData(extractedData);
                // Step 3: Identify patterns
                const patterns = await this.identifyPatterns(normalizedData);
                result.updatedPatterns = patterns.length;
                // Step 4: Generate FAQs
                const newFaqs = await this.generateFaqs(normalizedData, patterns);
                result.newFaqs = newFaqs.length;
                // Step 5: Save results
                await this.saveResults(newFaqs, patterns);
                // Update processing statistics
                await this.updateProcessingStats(result);
                this.logger.log(`Learning pipeline completed: ${result.newFaqs} new FAQs, ${result.updatedPatterns} patterns`);
            }
            catch (error) {
                this.logger.error('Learning pipeline failed:', error);
                result.errors.push(error.message);
                result.status = 'failed';
            }
            finally {
                result.processingTime = Date.now() - startTime;
                this.isProcessing = false;
                this.dailyProcessingCount += result.processedItems;
            }
            return result;
        }
        async scheduledLearning() {
            try {
                const config = await this.getPipelineConfig();
                if (!config.enableRealTimeProcessing) {
                    return;
                }
                // Run with default criteria for recent data
                const criteria = {
                    dateRange: {
                        from: new Date(Date.now() - 3600000), // Last hour
                        to: new Date()
                    },
                    maxResults: config.batchSize
                };
                await this.runLearningPipeline(criteria);
            }
            catch (error) {
                this.logger.error('Scheduled learning failed:', error);
            }
        }
        async resetDailyCounters() {
            const today = new Date().toDateString();
            if (this.lastProcessingDate !== today) {
                this.dailyProcessingCount = 0;
                this.lastProcessingDate = today;
                this.logger.log('Daily processing counters reset');
            }
        }
        async processRealTimeData(sourceType, sourceId) {
            try {
                const config = await this.getPipelineConfig();
                if (!config.enableRealTimeProcessing) {
                    return;
                }
                this.logger.log(`Processing real-time data: ${sourceType}:${sourceId}`);
                // Extract single item
                const criteria = {
                    maxResults: 1
                };
                let extractedData;
                if (sourceType === 'chat') {
                    extractedData = await this.chatExtractor.extract(criteria);
                }
                else {
                    extractedData = await this.ticketExtractor.extract(criteria);
                }
                const relevantData = extractedData.filter(d => d.id === sourceId);
                if (relevantData.length === 0) {
                    return;
                }
                // Process single item through pipeline
                const normalizedData = await this.normalizeData(relevantData);
                const patterns = await this.identifyPatterns(normalizedData);
                const newFaqs = await this.generateFaqs(normalizedData, patterns);
                await this.saveResults(newFaqs, patterns);
                this.logger.log(`Real-time processing completed for ${sourceType}:${sourceId}`);
            }
            catch (error) {
                this.logger.error(`Real-time processing failed for ${sourceType}:${sourceId}:`, error);
            }
        }
        async getPipelineStatus() {
            const systemStatus = await this.getSystemStatus();
            return {
                isProcessing: this.isProcessing,
                dailyProcessingCount: this.dailyProcessingCount,
                lastRun: systemStatus.lastProcessingRun,
                nextScheduledRun: new Date(Date.now() + 3600000) // Next hour
            };
        }
        async extractData(criteria, config) {
            const batchCriteria = {
                ...criteria,
                maxResults: criteria.maxResults || config.batchSize
            };
            // Extract from both sources in parallel
            const [chatData, ticketData] = await Promise.all([
                this.chatExtractor.extract(batchCriteria).catch(error => {
                    this.logger.warn('Chat extraction failed:', error);
                    return [];
                }),
                this.ticketExtractor.extract(batchCriteria).catch(error => {
                    this.logger.warn('Ticket extraction failed:', error);
                    return [];
                })
            ]);
            return [...chatData, ...ticketData];
        }
        async normalizeData(extractedData) {
            const normalizedData = [];
            for (const data of extractedData) {
                try {
                    const normalized = await this.dataNormalizer.normalize(data);
                    normalizedData.push(normalized);
                }
                catch (error) {
                    this.logger.warn(`Failed to normalize data ${data.id}:`, error);
                }
            }
            return normalizedData;
        }
        async identifyPatterns(normalizedData) {
            try {
                const patternData = normalizedData.map(d => ({
                    id: d.id || crypto.randomUUID(),
                    sourceId: d.sourceId,
                    source: d.source,
                    question: d.question,
                    answer: d.answer || '',
                    context: d.context,
                    confidence: d.confidence || 50,
                    keywords: d.keywords || [],
                    category: d.category || 'General',
                    extractedAt: d.extractedAt || new Date(),
                    sessionDuration: d.sessionDuration,
                    satisfactionScore: d.satisfactionScore,
                    metadata: {
                        timestamp: d.extractedAt || new Date(),
                        ...d.metadata
                    }
                }));
                return await this.patternRecognition.identifyPatterns(patternData);
            }
            catch (error) {
                this.logger.error('Pattern identification failed:', error);
                return [];
            }
        }
        async generateFaqs(normalizedData, patterns) {
            const faqs = [];
            const config = await this.getPipelineConfig();
            for (const data of normalizedData) {
                try {
                    // Find relevant patterns
                    const relevantPatterns = patterns.filter(p => p.sources.some(s => s.id === data.sourceId));
                    // Calculate confidence
                    const patternFrequency = relevantPatterns.length > 0 ?
                        Math.max(...relevantPatterns.map(p => p.frequency)) : 1;
                    const confidenceResult = await this.confidenceCalculator.calculateConfidence(data, patternFrequency);
                    // Generate AI answer if confidence is sufficient
                    if (confidenceResult.overallConfidence >= 50) {
                        const aiResponse = await this.faqAiService.generateFaqAnswer({
                            context: `Question: ${data.question}\nContext: ${data.context}`,
                            questionPattern: data.question,
                            category: data.category
                        });
                        const faq = new learned_faq_entry_entity_1.LearnedFaqEntry();
                        faq.question = data.question;
                        faq.answer = aiResponse.answer;
                        faq.confidence = confidenceResult.overallConfidence;
                        faq.status = confidenceResult.recommendation === 'auto_publish' && config.enableAutoPublishing ?
                            learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED : learned_faq_entry_entity_1.FaqEntryStatus.PENDING_REVIEW;
                        faq.source = data.source;
                        faq.sourceId = data.sourceId;
                        faq.category = aiResponse.category || data.category;
                        faq.keywords = aiResponse.keywords;
                        faq.metadata = {
                            ...data.metadata,
                            confidenceFactors: confidenceResult.factors,
                            aiMetadata: aiResponse.metadata
                        };
                        faqs.push(faq);
                    }
                }
                catch (error) {
                    this.logger.warn(`Failed to generate FAQ for ${data.sourceId}:`, error);
                }
            }
            return faqs;
        }
        async saveResults(faqs, patterns) {
            // Save FAQs
            if (faqs.length > 0) {
                await this.faqRepository.save(faqs);
            }
            // Save or update patterns
            for (const patternData of patterns) {
                try {
                    const existingPattern = await this.patternRepository.findOne({
                        where: { patternHash: patternData.patternHash }
                    });
                    if (existingPattern) {
                        existingPattern.frequency += 1;
                        existingPattern.sources = [...existingPattern.sources, ...patternData.sources];
                        await this.patternRepository.save(existingPattern);
                    }
                    else {
                        const newPattern = this.patternRepository.create(patternData);
                        await this.patternRepository.save(newPattern);
                    }
                }
                catch (error) {
                    this.logger.warn('Failed to save pattern:', error);
                }
            }
        }
        async checkDailyLimit(config) {
            const today = new Date().toDateString();
            if (this.lastProcessingDate !== today) {
                this.dailyProcessingCount = 0;
                this.lastProcessingDate = today;
            }
            return this.dailyProcessingCount < config.maxDailyProcessingLimit;
        }
        async getPipelineConfig() {
            try {
                const configs = await this.configRepository.find({
                    where: [
                        { configKey: 'advanced_settings' },
                        { configKey: 'data_processing' }
                    ]
                });
                const advancedSettings = configs.find(c => c.configKey === 'advanced_settings')?.configValue || {};
                const dataProcessing = configs.find(c => c.configKey === 'data_processing')?.configValue || {};
                return {
                    enableRealTimeProcessing: advancedSettings.enableRealTimeProcessing || false,
                    batchSize: dataProcessing.batchSize || 100,
                    processingInterval: dataProcessing.processingInterval || 3600,
                    maxDailyProcessingLimit: advancedSettings.maxDailyProcessingLimit || 1000,
                    enableAutoPublishing: advancedSettings.enableAutoPublishing || false
                };
            }
            catch (error) {
                this.logger.error('Failed to load pipeline config:', error);
                return {
                    enableRealTimeProcessing: false,
                    batchSize: 100,
                    processingInterval: 3600,
                    maxDailyProcessingLimit: 1000,
                    enableAutoPublishing: false
                };
            }
        }
        async updateProcessingStats(result) {
            try {
                const statusConfig = await this.configRepository.findOne({
                    where: { configKey: 'system_status' }
                });
                if (statusConfig) {
                    const currentStats = statusConfig.configValue;
                    statusConfig.configValue = {
                        ...currentStats,
                        lastProcessingRun: new Date(),
                        totalFaqsGenerated: (currentStats.totalFaqsGenerated || 0) + result.newFaqs,
                        totalPatternsIdentified: (currentStats.totalPatternsIdentified || 0) + result.updatedPatterns
                    };
                    await this.configRepository.save(statusConfig);
                }
            }
            catch (error) {
                this.logger.error('Failed to update processing stats:', error);
            }
        }
        async getSystemStatus() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'system_status' }
                });
                return config?.configValue || {};
            }
            catch (error) {
                this.logger.error('Failed to get system status:', error);
                return {};
            }
        }
        // Dashboard Statistics Methods
        async getTotalFaqCount() {
            try {
                return await this.faqRepository.count({
                    where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED }
                });
            }
            catch (error) {
                this.logger.error('Failed to get total FAQ count:', error);
                return 0;
            }
        }
        async getNewFaqsToday() {
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return await this.faqRepository.count({
                    where: {
                        createdAt: new Date(today.getTime()),
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED
                    }
                });
            }
            catch (error) {
                this.logger.error('Failed to get new FAQs today:', error);
                return 0;
            }
        }
        async getPendingReviewCount() {
            try {
                return await this.faqRepository.count({
                    where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PENDING_REVIEW }
                });
            }
            catch (error) {
                this.logger.error('Failed to get pending review count:', error);
                return 0;
            }
        }
        async getAverageConfidence() {
            try {
                const result = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('AVG(faq.confidence)', 'avg')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .getRawOne();
                return result?.avg ? Math.round(parseFloat(result.avg)) : 0;
            }
            catch (error) {
                this.logger.error('Failed to get average confidence:', error);
                return 0;
            }
        }
        async getRecentActivity(limit = 10) {
            try {
                const recentFaqs = await this.faqRepository.find({
                    order: { createdAt: 'DESC' },
                    take: limit
                });
                return recentFaqs.map(faq => ({
                    type: 'faq_generated',
                    description: `Yeni FAQ oluşturuldu: "${faq.question}"`,
                    timestamp: faq.createdAt,
                    status: faq.status === learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED ? 'success' : 'warning'
                }));
            }
            catch (error) {
                this.logger.error('Failed to get recent activity:', error);
                return [];
            }
        }
        /**
         * Get learning progress by source (last 7 days)
         */
        async getLearningProgressBySource() {
            try {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const [chatCount, ticketCount, suggestionCount] = await Promise.all([
                    this.faqRepository.count({
                        where: {
                            source: learned_faq_entry_entity_1.FaqEntrySource.CHAT,
                            createdAt: sevenDaysAgo // TypeORM MoreThanOrEqual would be used here
                        }
                    }),
                    this.faqRepository.count({
                        where: {
                            source: learned_faq_entry_entity_1.FaqEntrySource.TICKET,
                            createdAt: sevenDaysAgo
                        }
                    }),
                    this.faqRepository.count({
                        where: {
                            source: learned_faq_entry_entity_1.FaqEntrySource.USER_SUGGESTION,
                            createdAt: sevenDaysAgo
                        }
                    })
                ]);
                return {
                    fromChat: chatCount,
                    fromTickets: ticketCount,
                    fromSuggestions: suggestionCount
                };
            }
            catch (error) {
                this.logger.error('Failed to get learning progress by source:', error);
                return {
                    fromChat: 0,
                    fromTickets: 0,
                    fromSuggestions: 0
                };
            }
        }
        /**
         * Get quality metrics (confidence distribution)
         */
        async getQualityMetrics() {
            try {
                const allFaqs = await this.faqRepository.find({
                    select: ['confidence']
                });
                const highConfidence = allFaqs.filter(faq => faq.confidence >= 85).length;
                const mediumConfidence = allFaqs.filter(faq => faq.confidence >= 60 && faq.confidence < 85).length;
                const lowConfidence = allFaqs.filter(faq => faq.confidence < 60).length;
                return {
                    highConfidence,
                    mediumConfidence,
                    lowConfidence
                };
            }
            catch (error) {
                this.logger.error('Failed to get quality metrics:', error);
                return {
                    highConfidence: 0,
                    mediumConfidence: 0,
                    lowConfidence: 0
                };
            }
        }
    };
    return FaqLearningService = _classThis;
})();
exports.FaqLearningService = FaqLearningService;
//# sourceMappingURL=faq-learning.service.js.map