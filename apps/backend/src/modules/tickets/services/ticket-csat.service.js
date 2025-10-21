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
exports.TicketCSATService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let TicketCSATService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketCSATService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketCSATService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        csatRepository;
        ticketRepository;
        emailService;
        logger = new common_1.Logger(TicketCSATService.name);
        constructor(csatRepository, ticketRepository, emailService) {
            this.csatRepository = csatRepository;
            this.ticketRepository = ticketRepository;
            this.emailService = emailService;
        }
        /**
         * Request CSAT survey for a resolved ticket
         */
        async requestSurvey(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
                relations: ['customer', 'assignedAgent'],
            });
            if (!ticket) {
                throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
            }
            // Check if survey already exists
            const existingSurvey = await this.csatRepository.findOne({
                where: { ticketId },
            });
            if (existingSurvey) {
                this.logger.warn(`CSAT survey already exists for ticket ${ticketId}`);
                return existingSurvey;
            }
            // Generate unique survey token
            const surveyToken = this.generateSurveyToken();
            // Create CSAT record
            const csat = this.csatRepository.create({
                ticketId,
                customerId: ticket.userId, // userId is the ticket creator (customer)
                surveyToken,
                surveyRequestedAt: new Date(),
                rating: 0, // Placeholder, will be updated when customer responds
            });
            await this.csatRepository.save(csat);
            // Send survey email
            await this.emailService.sendTicketResolved(ticket, surveyToken);
            this.logger.log(`CSAT survey requested for ticket ${ticketId}, token: ${surveyToken}`);
            return csat;
        }
        /**
         * Submit CSAT survey response
         */
        async submitSurvey(token, surveyData) {
            // Find survey by token
            const csat = await this.csatRepository.findOne({
                where: { surveyToken: token },
                relations: ['ticket', 'customer'],
            });
            if (!csat) {
                throw new common_1.NotFoundException('Survey not found or invalid token');
            }
            // Check if already completed
            if (csat.surveyCompletedAt) {
                throw new common_1.BadRequestException('Survey already completed');
            }
            // Validate rating
            if (!surveyData.rating || surveyData.rating < 1 || surveyData.rating > 5) {
                throw new common_1.BadRequestException('Rating must be between 1 and 5');
            }
            // Update CSAT record
            csat.rating = surveyData.rating;
            csat.feedback = surveyData.feedback || '';
            csat.responses = surveyData.responses || {};
            csat.ipAddress = surveyData.ipAddress || '';
            csat.userAgent = surveyData.userAgent || '';
            csat.surveyCompletedAt = new Date();
            await this.csatRepository.save(csat);
            this.logger.log(`CSAT survey completed for ticket ${csat.ticketId}, rating: ${csat.rating}`);
            return csat;
        }
        /**
         * Get CSAT survey by token (for public access)
         */
        async getSurveyByToken(token) {
            const csat = await this.csatRepository.findOne({
                where: { surveyToken: token },
                relations: ['ticket'],
            });
            if (!csat) {
                throw new common_1.NotFoundException('Survey not found');
            }
            return csat;
        }
        /**
         * Get CSAT statistics for analytics
         */
        async getStatistics(startDate, endDate, agentId) {
            const queryBuilder = this.csatRepository
                .createQueryBuilder('csat')
                .leftJoin('csat.ticket', 'ticket')
                .where('csat.surveyCompletedAt IS NOT NULL');
            // Date range filter
            if (startDate) {
                queryBuilder.andWhere('csat.surveyCompletedAt >= :startDate', { startDate });
            }
            if (endDate) {
                queryBuilder.andWhere('csat.surveyCompletedAt <= :endDate', { endDate });
            }
            // Agent filter
            if (agentId) {
                queryBuilder.andWhere('ticket.assignedAgentId = :agentId', { agentId });
            }
            const responses = await queryBuilder.getMany();
            const totalRequested = await this.csatRepository.count({
                where: startDate || endDate || agentId ? {} : undefined, // Apply same filters
            });
            // Calculate statistics
            const totalResponses = responses.length;
            const averageRating = totalResponses > 0
                ? responses.reduce((sum, r) => sum + r.rating, 0) / totalResponses
                : 0;
            // Rating distribution
            const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
                rating,
                count: responses.filter((r) => r.rating === rating).length,
            }));
            // Response rate
            const responseRate = totalRequested > 0 ? (totalResponses / totalRequested) * 100 : 0;
            // Satisfaction score (% of 4-5 star ratings)
            const satisfiedCount = responses.filter((r) => r.rating >= 4).length;
            const satisfactionScore = totalResponses > 0 ? (satisfiedCount / totalResponses) * 100 : 0;
            // Promoter score (5 stars = promoters, 1-3 = detractors)
            const promoters = responses.filter((r) => r.rating === 5).length;
            const detractors = responses.filter((r) => r.rating <= 3).length;
            const promoterScore = totalResponses > 0
                ? ((promoters - detractors) / totalResponses) * 100
                : 0;
            return {
                totalResponses,
                averageRating: Math.round(averageRating * 10) / 10,
                ratingDistribution,
                responseRate: Math.round(responseRate * 10) / 10,
                satisfactionScore: Math.round(satisfactionScore * 10) / 10,
                promoterScore: Math.round(promoterScore * 10) / 10,
            };
        }
        /**
         * Get recent CSAT feedback
         */
        async getRecentFeedback(limit = 10) {
            return await this.csatRepository.find({
                where: { surveyCompletedAt: undefined },
                order: { surveyCompletedAt: 'DESC' },
                take: limit,
                relations: ['ticket', 'customer'],
            });
        }
        /**
         * Generate unique survey token
         */
        generateSurveyToken() {
            return (0, crypto_1.randomBytes)(32).toString('hex');
        }
    };
    return TicketCSATService = _classThis;
})();
exports.TicketCSATService = TicketCSATService;
//# sourceMappingURL=ticket-csat.service.js.map