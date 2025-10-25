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
exports.TicketDataExtractorService = void 0;
const common_1 = require("@nestjs/common");
/**
 * Ticket Data Extractor Service
 * Extracts learning data from resolved tickets
 * Currently simplified - will be enhanced when ticket system is fully integrated
 */
let TicketDataExtractorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketDataExtractorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketDataExtractorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        dataNormalizer;
        logger = new common_1.Logger(TicketDataExtractorService.name);
        constructor(dataNormalizer) {
            this.dataNormalizer = dataNormalizer;
        }
        /**
         * Extract learning data from resolved tickets
         * Currently returns mock data - will be implemented when ticket system is ready
         */
        async extract(criteria) {
            this.logger.log('Extracting data from tickets (mock implementation)');
            // Mock implementation for now
            const mockData = [
                {
                    id: 'ticket-1',
                    source: 'ticket',
                    sourceId: 'ticket-123',
                    question: 'How do I reset my password?',
                    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
                    context: 'User was unable to login and needed password reset instructions.',
                    confidence: 85,
                    keywords: ['password', 'reset', 'login', 'forgot'],
                    category: 'Authentication',
                    extractedAt: new Date(),
                    sessionDuration: 1800,
                    satisfactionScore: 5,
                    metadata: {
                        timestamp: new Date(),
                        ticketId: 'ticket-123',
                        resolutionTime: 1800, // 30 minutes
                        satisfactionScore: 5,
                        agentId: 'agent-1',
                        createdAt: new Date().toISOString(),
                        resolvedAt: new Date().toISOString(),
                        category: 'Authentication'
                    }
                },
                {
                    id: 'ticket-2',
                    source: 'ticket',
                    sourceId: 'ticket-124',
                    question: 'How do I update my profile information?',
                    answer: 'Go to Settings > Profile and click Edit to update your information.',
                    context: 'User wanted to change their email address and phone number.',
                    confidence: 90,
                    keywords: ['profile', 'update', 'settings', 'edit'],
                    category: 'Account Management',
                    extractedAt: new Date(),
                    sessionDuration: 900,
                    satisfactionScore: 4,
                    metadata: {
                        timestamp: new Date(),
                        ticketId: 'ticket-124',
                        resolutionTime: 900, // 15 minutes
                        satisfactionScore: 4,
                        agentId: 'agent-2',
                        createdAt: new Date().toISOString(),
                        resolvedAt: new Date().toISOString(),
                        category: 'Account Management'
                    }
                }
            ];
            // Apply criteria filtering
            let filteredData = mockData;
            if (criteria.minResolutionTime) {
                filteredData = filteredData.filter(data => (data.metadata?.resolutionTime || 0) >= criteria.minResolutionTime);
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
            this.logger.log(`Extracted ${filteredData.length} ticket data entries`);
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
         * Extract data from specific ticket IDs
         */
        async extractFromIds(ticketIds, criteria) {
            this.logger.log(`Extracting data from specific tickets: ${ticketIds.join(', ')}`);
            // For now, filter mock data by IDs - will be implemented when ticket system is ready
            const allData = await this.extract(criteria);
            return allData.filter(data => ticketIds.includes(data.sourceId));
        }
        /**
         * Get extraction statistics
         */
        async getExtractionStats() {
            // Mock stats for now
            return {
                totalTickets: 150,
                resolvedTickets: 120,
                extractableTickets: 85,
                lastExtraction: new Date()
            };
        }
    };
    return TicketDataExtractorService = _classThis;
})();
exports.TicketDataExtractorService = TicketDataExtractorService;
//# sourceMappingURL=ticket-data-extractor.service.js.map