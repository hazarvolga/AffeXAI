"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketCSATController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../../auth/decorators/public.decorator");
/**
 * CSAT Controller
 * Manages customer satisfaction surveys
 */
let TicketCSATController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket CSAT'), (0, common_1.Controller)('tickets/csat')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getSurvey_decorators;
    let _submitSurvey_decorators;
    let _requestSurvey_decorators;
    let _getStatistics_decorators;
    let _getRecentFeedback_decorators;
    var TicketCSATController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSurvey_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Get)('survey/:token'), (0, swagger_1.ApiOperation)({ summary: 'Get CSAT survey by token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey found' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Survey not found' })];
            _submitSurvey_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('survey/:token/submit'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Submit CSAT survey response' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey submitted successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid survey data' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Survey not found' })];
            _requestSurvey_decorators = [(0, common_1.Post)(':ticketId/request'), (0, swagger_1.ApiOperation)({ summary: 'Request CSAT survey for ticket' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Survey requested successfully' })];
            _getStatistics_decorators = [(0, common_1.Get)('statistics'), (0, swagger_1.ApiOperation)({ summary: 'Get CSAT statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved' })];
            _getRecentFeedback_decorators = [(0, common_1.Get)('feedback/recent'), (0, swagger_1.ApiOperation)({ summary: 'Get recent CSAT feedback' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback retrieved' })];
            __esDecorate(this, null, _getSurvey_decorators, { kind: "method", name: "getSurvey", static: false, private: false, access: { has: obj => "getSurvey" in obj, get: obj => obj.getSurvey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _submitSurvey_decorators, { kind: "method", name: "submitSurvey", static: false, private: false, access: { has: obj => "submitSurvey" in obj, get: obj => obj.submitSurvey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _requestSurvey_decorators, { kind: "method", name: "requestSurvey", static: false, private: false, access: { has: obj => "requestSurvey" in obj, get: obj => obj.requestSurvey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: obj => "getStatistics" in obj, get: obj => obj.getStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRecentFeedback_decorators, { kind: "method", name: "getRecentFeedback", static: false, private: false, access: { has: obj => "getRecentFeedback" in obj, get: obj => obj.getRecentFeedback }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketCSATController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        csatService = __runInitializers(this, _instanceExtraInitializers);
        constructor(csatService) {
            this.csatService = csatService;
        }
        /**
         * Get survey by token (public endpoint)
         */
        async getSurvey(token) {
            return await this.csatService.getSurveyByToken(token);
        }
        /**
         * Submit CSAT survey (public endpoint)
         */
        async submitSurvey(token, surveyData, ipAddress, userAgent) {
            return await this.csatService.submitSurvey(token, {
                ...surveyData,
                ipAddress,
                userAgent,
            });
        }
        /**
         * Request survey for a ticket (admin only)
         */
        async requestSurvey(ticketId) {
            return await this.csatService.requestSurvey(ticketId);
        }
        /**
         * Get CSAT statistics
         */
        async getStatistics(startDate, endDate, agentId) {
            return await this.csatService.getStatistics(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, agentId);
        }
        /**
         * Get recent feedback
         */
        async getRecentFeedback(limit) {
            return await this.csatService.getRecentFeedback(limit ? parseInt(limit, 10) : 10);
        }
    };
    return TicketCSATController = _classThis;
})();
exports.TicketCSATController = TicketCSATController;
//# sourceMappingURL=ticket-csat.controller.js.map