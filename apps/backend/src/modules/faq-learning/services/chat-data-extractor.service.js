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
exports.ChatDataExtractorService = void 0;
const common_1 = require("@nestjs/common");
/**
 * Chat Data Extractor Service
 * Extracts learning data from successful chat sessions
 * Currently simplified - will be enhanced when chat system is fully integrated
 */
let ChatDataExtractorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatDataExtractorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatDataExtractorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        dataNormalizer;
        logger = new common_1.Logger(ChatDataExtractorService.name);
        constructor(dataNormalizer) {
            this.dataNormalizer = dataNormalizer;
        }
        /**
         * Extract learning data from successful chat sessions
         * Currently returns mock data - will be implemented when chat system is ready
         */
        async extract(criteria) {
            this.logger.log('Extracting data from chat sessions (mock implementation)');
            // Mock implementation for now
            const mockData = [
                {
                    id: 'chat-1',
                    source: 'chat',
                    sourceId: 'session-456',
                    question: 'How do I export my data?',
                    answer: 'You can export your data by going to Settings > Data Export and selecting the format you need.',
                    context: 'User wanted to download their account data in CSV format.',
                    confidence: 88,
                    keywords: ['export', 'data', 'download', 'csv'],
                    category: 'Data Management',
                    extractedAt: new Date(),
                    sessionDuration: 1200, // 20 minutes
                    satisfactionScore: 5,
                    metadata: {
                        timestamp: new Date(),
                        sessionId: 'session-456',
                        messageCount: 8,
                        agentId: 'agent-3',
                        startedAt: new Date().toISOString(),
                        endedAt: new Date().toISOString(),
                        sessionDuration: 1200,
                        satisfactionScore: 5,
                        category: 'Data Management'
                    }
                },
                {
                    id: 'chat-2',
                    source: 'chat',
                    sourceId: 'session-457',
                    question: 'Can I change my subscription plan?',
                    answer: 'Yes, you can upgrade or downgrade your plan anytime from the Billing section in your account.',
                    context: 'User wanted to upgrade from basic to premium plan.',
                    confidence: 92,
                    keywords: ['subscription', 'plan', 'upgrade', 'billing'],
                    category: 'Billing',
                    extractedAt: new Date(),
                    sessionDuration: 800, // 13 minutes
                    satisfactionScore: 4,
                    metadata: {
                        timestamp: new Date(),
                        sessionId: 'session-457',
                        messageCount: 6,
                        agentId: 'agent-1',
                        startedAt: new Date().toISOString(),
                        endedAt: new Date().toISOString(),
                        sessionDuration: 800,
                        satisfactionScore: 4,
                        category: 'Billing'
                    }
                }
            ];
            // Apply criteria filtering
            let filteredData = mockData;
            if (criteria.minSessionDuration) {
                filteredData = filteredData.filter(data => data.sessionDuration >= criteria.minSessionDuration);
            }
            if (criteria.requiredSatisfactionScore) {
                filteredData = filteredData.filter(data => data.satisfactionScore >= criteria.requiredSatisfactionScore);
            }
            if (criteria.excludedCategories?.length) {
                filteredData = filteredData.filter(data => !criteria.excludedCategories.includes(data.category));
            }
            if (criteria.maxResults) {
                filteredData = filteredData.slice(0, criteria.maxResults);
            }
            this.logger.log(`Extracted ${filteredData.length} chat data entries`);
            return filteredData;
        }
        /**
         * Validate extracted data
         */
        validateData(data) {
            return !!(data.id &&
                data.sourceId &&
                data.source &&
                data.question &&
                data.answer &&
                data.confidence >= 0 &&
                data.confidence <= 100 &&
                data.metadata?.timestamp);
        }
        /**
         * Get extraction statistics
         */
        async getExtractionStats() {
            // Mock stats for now
            return {
                totalSessions: 200,
                successfulSessions: 165,
                extractableSessions: 120,
                lastExtraction: new Date()
            };
        }
    };
    return ChatDataExtractorService = _classThis;
})();
exports.ChatDataExtractorService = ChatDataExtractorService;
//# sourceMappingURL=chat-data-extractor.service.js.map