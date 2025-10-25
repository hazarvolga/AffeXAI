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
exports.BatchProcessorService = void 0;
const common_1 = require("@nestjs/common");
let BatchProcessorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BatchProcessorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BatchProcessorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository;
        chatExtractor;
        ticketExtractor;
        dataNormalizer;
        logger = new common_1.Logger(BatchProcessorService.name);
        constructor(configRepository, chatExtractor, ticketExtractor, dataNormalizer) {
            this.configRepository = configRepository;
            this.chatExtractor = chatExtractor;
            this.ticketExtractor = ticketExtractor;
            this.dataNormalizer = dataNormalizer;
        }
        /**
         * Process data in batches for learning
         */
        async processBatch(options = {}) {
            const startTime = Date.now();
            const errors = [];
            this.logger.log('Starting batch processing for FAQ learning');
            try {
                // Get configuration
                const config = await this.getProcessingConfig();
                const batchSize = options.batchSize || config.batchSize || 100;
                const maxConcurrency = options.maxConcurrency || 3;
                // Prepare extraction criteria
                const criteria = await this.buildExtractionCriteria(options.criteria);
                let chatDataExtracted = 0;
                let ticketDataExtracted = 0;
                const allExtractedData = [];
                // Process chat data if enabled
                if (options.includeChat !== false) {
                    try {
                        this.logger.log('Processing chat data...');
                        const chatData = await this.processChatDataInBatches(criteria, batchSize, maxConcurrency);
                        chatDataExtracted = chatData.length;
                        allExtractedData.push(...chatData);
                        this.logger.log(`Extracted ${chatDataExtracted} items from chat data`);
                    }
                    catch (error) {
                        const errorMsg = `Chat data processing failed: ${error.message}`;
                        this.logger.error(errorMsg);
                        errors.push(errorMsg);
                    }
                }
                // Process ticket data if enabled
                if (options.includeTickets !== false) {
                    try {
                        this.logger.log('Processing ticket data...');
                        const ticketData = await this.processTicketDataInBatches(criteria, batchSize, maxConcurrency);
                        ticketDataExtracted = ticketData.length;
                        allExtractedData.push(...ticketData);
                        this.logger.log(`Extracted ${ticketDataExtracted} items from ticket data`);
                    }
                    catch (error) {
                        const errorMsg = `Ticket data processing failed: ${error.message}`;
                        this.logger.error(errorMsg);
                        errors.push(errorMsg);
                    }
                }
                // Calculate statistics
                const totalExtracted = allExtractedData.length;
                const averageConfidence = totalExtracted > 0
                    ? allExtractedData.reduce((sum, item) => sum + item.confidence, 0) / totalExtracted
                    : 0;
                const processingTimeMs = Date.now() - startTime;
                const result = {
                    totalProcessed: chatDataExtracted + ticketDataExtracted,
                    chatDataExtracted,
                    ticketDataExtracted,
                    totalExtracted,
                    averageConfidence: Math.round(averageConfidence),
                    processingTimeMs,
                    errors,
                };
                this.logger.log(`Batch processing completed in ${processingTimeMs}ms`, result);
                // Update processing statistics
                await this.updateProcessingStats(result);
                return result;
            }
            catch (error) {
                const errorMsg = `Batch processing failed: ${error.message}`;
                this.logger.error(errorMsg);
                errors.push(errorMsg);
                return {
                    totalProcessed: 0,
                    chatDataExtracted: 0,
                    ticketDataExtracted: 0,
                    totalExtracted: 0,
                    averageConfidence: 0,
                    processingTimeMs: Date.now() - startTime,
                    errors,
                };
            }
        }
        /**
         * Process specific source IDs in batch
         */
        async processSpecificSources(chatSessionIds = [], ticketIds = [], criteria) {
            const startTime = Date.now();
            const errors = [];
            try {
                const extractionCriteria = await this.buildExtractionCriteria(criteria);
                const allExtractedData = [];
                // Process specific chat sessions
                let chatDataExtracted = 0;
                if (chatSessionIds.length > 0) {
                    try {
                        const chatData = await this.chatExtractor.extract(extractionCriteria);
                        chatDataExtracted = chatData.length;
                        allExtractedData.push(...chatData);
                    }
                    catch (error) {
                        errors.push(`Chat processing failed: ${error.message}`);
                    }
                }
                // Process specific tickets
                let ticketDataExtracted = 0;
                if (ticketIds.length > 0) {
                    try {
                        const ticketData = await this.ticketExtractor.extractFromIds(ticketIds, extractionCriteria);
                        ticketDataExtracted = ticketData.length;
                        allExtractedData.push(...ticketData);
                    }
                    catch (error) {
                        errors.push(`Ticket processing failed: ${error.message}`);
                    }
                }
                const totalExtracted = allExtractedData.length;
                const averageConfidence = totalExtracted > 0
                    ? allExtractedData.reduce((sum, item) => sum + item.confidence, 0) / totalExtracted
                    : 0;
                return {
                    totalProcessed: chatSessionIds.length + ticketIds.length,
                    chatDataExtracted,
                    ticketDataExtracted,
                    totalExtracted,
                    averageConfidence: Math.round(averageConfidence),
                    processingTimeMs: Date.now() - startTime,
                    errors,
                };
            }
            catch (error) {
                return {
                    totalProcessed: 0,
                    chatDataExtracted: 0,
                    ticketDataExtracted: 0,
                    totalExtracted: 0,
                    averageConfidence: 0,
                    processingTimeMs: Date.now() - startTime,
                    errors: [error.message],
                };
            }
        }
        /**
         * Get processing configuration
         */
        async getProcessingConfig() {
            const configs = await this.configRepository.find({
                where: { isActive: true }
            });
            const configMap = configs.reduce((acc, config) => {
                acc[config.configKey] = config.configValue;
                return acc;
            }, {});
            return {
                batchSize: configMap.data_processing?.batchSize || 100,
                maxConcurrency: configMap.data_processing?.maxConcurrency || 3,
                ...configMap
            };
        }
        /**
         * Build extraction criteria from config and options
         */
        async buildExtractionCriteria(criteria) {
            const config = await this.getProcessingConfig();
            return {
                minSessionDuration: config.source_preferences?.chatSessionMinDuration || 300,
                minResolutionTime: config.source_preferences?.ticketMinResolutionTime || 1800,
                requiredSatisfactionScore: config.source_preferences?.requiredSatisfactionScore || 4,
                excludedCategories: config.categorization?.excludedCategories || [],
                maxAge: config.advanced_settings?.retentionPeriodDays || 365,
                ...criteria, // Override with provided criteria
            };
        }
        /**
         * Process chat data in batches with concurrency control
         */
        async processChatDataInBatches(criteria, batchSize, maxConcurrency) {
            // For now, process all at once - in production, implement proper batching
            return this.chatExtractor.extract(criteria);
        }
        /**
         * Process ticket data in batches with concurrency control
         */
        async processTicketDataInBatches(criteria, batchSize, maxConcurrency) {
            // For now, process all at once - in production, implement proper batching
            return this.ticketExtractor.extract(criteria);
        }
        /**
         * Update processing statistics in config
         */
        async updateProcessingStats(result) {
            try {
                const statusConfig = await this.configRepository.findOne({
                    where: { configKey: 'system_status' }
                });
                if (statusConfig) {
                    const currentStats = statusConfig.configValue;
                    statusConfig.configValue = {
                        ...currentStats,
                        lastProcessingRun: new Date().toISOString(),
                        totalFaqsGenerated: (currentStats.totalFaqsGenerated || 0) + result.totalExtracted,
                        lastProcessingResult: {
                            totalExtracted: result.totalExtracted,
                            averageConfidence: result.averageConfidence,
                            processingTimeMs: result.processingTimeMs,
                            errors: result.errors.length,
                        }
                    };
                    await this.configRepository.save(statusConfig);
                }
            }
            catch (error) {
                this.logger.error('Failed to update processing stats:', error);
            }
        }
        /**
         * Get processing status and statistics
         */
        async getProcessingStatus() {
            try {
                const statusConfig = await this.configRepository.findOne({
                    where: { configKey: 'system_status' }
                });
                if (!statusConfig) {
                    return {
                        isEnabled: false,
                        lastRun: null,
                        totalProcessed: 0,
                        lastResult: null,
                    };
                }
                const stats = statusConfig.configValue;
                return {
                    isEnabled: stats.isLearningEnabled || false,
                    lastRun: stats.lastProcessingRun ? new Date(stats.lastProcessingRun) : null,
                    totalProcessed: stats.totalFaqsGenerated || 0,
                    lastResult: stats.lastProcessingResult || null,
                };
            }
            catch (error) {
                this.logger.error('Failed to get processing status:', error);
                return {
                    isEnabled: false,
                    lastRun: null,
                    totalProcessed: 0,
                    lastResult: null,
                };
            }
        }
    };
    return BatchProcessorService = _classThis;
})();
exports.BatchProcessorService = BatchProcessorService;
//# sourceMappingURL=batch-processor.service.js.map