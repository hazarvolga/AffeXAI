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
exports.SendTimeOptimizationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let SendTimeOptimizationController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-marketing/optimization'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getSubscriberOptimalTime_decorators;
    let _calculateCampaignOptimalTime_decorators;
    let _getGlobalOptimalTime_decorators;
    let _getSegmentRecommendations_decorators;
    var SendTimeOptimizationController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getSubscriberOptimalTime_decorators = [(0, common_1.Get)('subscriber/:subscriberId')];
            _calculateCampaignOptimalTime_decorators = [(0, common_1.Post)('campaign/calculate')];
            _getGlobalOptimalTime_decorators = [(0, common_1.Get)('global-stats')];
            _getSegmentRecommendations_decorators = [(0, common_1.Get)('segment/:segmentId/recommendations')];
            __esDecorate(this, null, _getSubscriberOptimalTime_decorators, { kind: "method", name: "getSubscriberOptimalTime", static: false, private: false, access: { has: obj => "getSubscriberOptimalTime" in obj, get: obj => obj.getSubscriberOptimalTime }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _calculateCampaignOptimalTime_decorators, { kind: "method", name: "calculateCampaignOptimalTime", static: false, private: false, access: { has: obj => "calculateCampaignOptimalTime" in obj, get: obj => obj.calculateCampaignOptimalTime }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getGlobalOptimalTime_decorators, { kind: "method", name: "getGlobalOptimalTime", static: false, private: false, access: { has: obj => "getGlobalOptimalTime" in obj, get: obj => obj.getGlobalOptimalTime }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSegmentRecommendations_decorators, { kind: "method", name: "getSegmentRecommendations", static: false, private: false, access: { has: obj => "getSegmentRecommendations" in obj, get: obj => obj.getSegmentRecommendations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SendTimeOptimizationController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        optimizationService = __runInitializers(this, _instanceExtraInitializers);
        constructor(optimizationService) {
            this.optimizationService = optimizationService;
        }
        /**
         * Get optimal send time for a specific subscriber
         */
        async getSubscriberOptimalTime(subscriberId) {
            const result = await this.optimizationService.calculateOptimalTimeForSubscriber(subscriberId);
            return {
                subscriberId: result.subscriberId,
                optimalTime: {
                    hour: result.optimalHour,
                    dayOfWeek: result.optimalDayOfWeek,
                    dayName: this.getDayName(result.optimalDayOfWeek),
                    formatted: `${this.getDayName(result.optimalDayOfWeek)} ${result.optimalHour}:00`,
                },
                confidence: Math.round(result.confidence * 100),
                timezone: result.timezone,
                basedOnDataPoints: result.basedOnDataPoints,
                recommendation: this.getRecommendation(result.confidence),
            };
        }
        /**
         * Get optimal send times for a campaign
         */
        async calculateCampaignOptimalTime(body) {
            const result = await this.optimizationService.calculateOptimalTimeForCampaign(body.subscriberIds);
            return {
                campaignId: body.campaignId,
                globalOptimalTime: result.globalTime,
                individualOptimization: {
                    enabled: true,
                    subscriberCount: body.subscriberIds.length,
                    optimizedCount: result.individualTimes.size,
                },
                estimatedImpact: {
                    openRateIncrease: '15-25%',
                    clickRateIncrease: '10-15%',
                },
            };
        }
        /**
         * Get global optimal send time statistics
         */
        async getGlobalOptimalTime() {
            const result = await this.optimizationService.calculateGlobalOptimalTime();
            return {
                globalOptimal: {
                    hour: result.hour,
                    dayOfWeek: result.dayOfWeek,
                    dayName: this.getDayName(result.dayOfWeek),
                    formatted: `${this.getDayName(result.dayOfWeek)} ${result.hour}:00`,
                    averageOpenRate: Math.round(result.averageOpenRate * 100),
                },
                insights: [
                    {
                        type: 'best_time',
                        message: `En yüksek açılma oranı ${this.getDayName(result.dayOfWeek)} günü saat ${result.hour}:00'da`,
                    },
                    {
                        type: 'time_zone',
                        message: 'Farklı zaman dilimlerindeki aboneler için otomatik ayarlama yapılıyor',
                    },
                    {
                        type: 'personalization',
                        message: 'Her abone için kişiselleştirilmiş gönderim zamanı hesaplanıyor',
                    },
                ],
            };
        }
        /**
         * Get recommendations for a segment
         */
        async getSegmentRecommendations(segmentId) {
            const result = await this.optimizationService.getSegmentOptimalTimes(segmentId);
            return {
                segmentId,
                recommendations: result.recommendations,
                aiPowered: true,
                lastUpdated: new Date(),
            };
        }
        /**
         * Helper to get day name
         */
        getDayName(dayNumber) {
            const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
            return days[dayNumber];
        }
        /**
         * Get recommendation based on confidence
         */
        getRecommendation(confidence) {
            if (confidence >= 0.8) {
                return 'Yüksek güvenilirlik - Kişiselleştirilmiş zamanlama önerilir';
            }
            else if (confidence >= 0.5) {
                return 'Orta güvenilirlik - Segment bazlı zamanlama önerilir';
            }
            else {
                return 'Düşük güvenilirlik - Global zamanlama önerilir';
            }
        }
    };
    return SendTimeOptimizationController = _classThis;
})();
exports.SendTimeOptimizationController = SendTimeOptimizationController;
//# sourceMappingURL=send-time-optimization.controller.js.map