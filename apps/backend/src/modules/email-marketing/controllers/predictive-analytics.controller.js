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
exports.PredictiveAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
let PredictiveAnalyticsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-marketing/analytics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _predictCampaignPerformance_decorators;
    let _getSubscriberEngagement_decorators;
    let _getChurnRisk_decorators;
    let _getAIInsights_decorators;
    let _getDashboardMetrics_decorators;
    var PredictiveAnalyticsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _predictCampaignPerformance_decorators = [(0, common_1.Post)('predict/campaign')];
            _getSubscriberEngagement_decorators = [(0, common_1.Get)('engagement/subscriber/:subscriberId')];
            _getChurnRisk_decorators = [(0, common_1.Get)('churn-risk/subscriber/:subscriberId')];
            _getAIInsights_decorators = [(0, common_1.Get)('insights')];
            _getDashboardMetrics_decorators = [(0, common_1.Get)('dashboard')];
            __esDecorate(this, null, _predictCampaignPerformance_decorators, { kind: "method", name: "predictCampaignPerformance", static: false, private: false, access: { has: obj => "predictCampaignPerformance" in obj, get: obj => obj.predictCampaignPerformance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSubscriberEngagement_decorators, { kind: "method", name: "getSubscriberEngagement", static: false, private: false, access: { has: obj => "getSubscriberEngagement" in obj, get: obj => obj.getSubscriberEngagement }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getChurnRisk_decorators, { kind: "method", name: "getChurnRisk", static: false, private: false, access: { has: obj => "getChurnRisk" in obj, get: obj => obj.getChurnRisk }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAIInsights_decorators, { kind: "method", name: "getAIInsights", static: false, private: false, access: { has: obj => "getAIInsights" in obj, get: obj => obj.getAIInsights }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getDashboardMetrics_decorators, { kind: "method", name: "getDashboardMetrics", static: false, private: false, access: { has: obj => "getDashboardMetrics" in obj, get: obj => obj.getDashboardMetrics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PredictiveAnalyticsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        analyticsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(analyticsService) {
            this.analyticsService = analyticsService;
        }
        /**
         * Get campaign performance prediction
         */
        async predictCampaignPerformance(body) {
            const prediction = await this.analyticsService.predictCampaignPerformance(body.campaignId, body.subscriberIds);
            return {
                prediction,
                summary: {
                    expectedReach: body.subscriberIds.length,
                    expectedOpens: Math.round(body.subscriberIds.length * prediction.expectedOpenRate),
                    expectedClicks: Math.round(body.subscriberIds.length * prediction.expectedClickRate),
                    performanceLevel: this.getPerformanceLevel(prediction.performanceScore),
                },
                visualization: {
                    openRateChart: {
                        current: Math.round(prediction.expectedOpenRate * 100),
                        industry: 25, // Industry average
                    },
                    clickRateChart: {
                        current: Math.round(prediction.expectedClickRate * 100),
                        industry: 3, // Industry average
                    },
                },
            };
        }
        /**
         * Get subscriber engagement score
         */
        async getSubscriberEngagement(subscriberId) {
            const engagement = await this.analyticsService.calculateEngagementScore(subscriberId);
            return {
                ...engagement,
                visual: {
                    scoreColor: this.getScoreColor(engagement.score),
                    categoryIcon: this.getCategoryIcon(engagement.category),
                    trend: this.getEngagementTrend(engagement.score),
                },
                recommendations: this.getEngagementRecommendations(engagement.category),
            };
        }
        /**
         * Get churn risk analysis
         */
        async getChurnRisk(subscriberId) {
            const risk = await this.analyticsService.calculateChurnRisk(subscriberId);
            return {
                ...risk,
                visual: {
                    riskColor: this.getRiskColor(risk.riskLevel),
                    daysUntilChurn: Math.round((risk.predictedChurnDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                },
                urgency: this.getUrgencyLevel(risk.riskLevel),
            };
        }
        /**
         * Get AI-powered insights
         */
        async getAIInsights(campaignId) {
            const insights = await this.analyticsService.generateAIInsights(campaignId);
            return {
                insights,
                summary: {
                    totalInsights: insights.length,
                    actionableInsights: insights.filter(i => i.actionable).length,
                    highImpactInsights: insights.filter(i => i.impact === 'high').length,
                },
                categories: {
                    trends: insights.filter(i => i.type === 'trend'),
                    warnings: insights.filter(i => i.type === 'warning'),
                    opportunities: insights.filter(i => i.type === 'opportunity'),
                    anomalies: insights.filter(i => i.type === 'anomaly'),
                },
            };
        }
        /**
         * Get dashboard metrics
         */
        async getDashboardMetrics() {
            const metrics = await this.analyticsService.getDashboardMetrics();
            return {
                ...metrics,
                visual: {
                    engagementGauge: {
                        value: metrics.averageEngagementScore,
                        color: this.getScoreColor(metrics.averageEngagementScore),
                        label: this.getEngagementLabel(metrics.averageEngagementScore),
                    },
                    riskAlert: {
                        show: metrics.atRiskSubscribers > 20,
                        message: `%${metrics.atRiskSubscribers} abone risk altında`,
                        severity: metrics.atRiskSubscribers > 30 ? 'high' : 'medium',
                    },
                    growthIndicator: {
                        value: metrics.predictedMonthlyGrowth,
                        isPositive: metrics.predictedMonthlyGrowth > 0,
                        percentage: Math.round((metrics.predictedMonthlyGrowth / 1000) * 100),
                    },
                },
                recommendations: this.getDashboardRecommendations(metrics),
            };
        }
        /**
         * Helper methods
         */
        getPerformanceLevel(score) {
            if (score >= 80)
                return 'Mükemmel';
            if (score >= 60)
                return 'İyi';
            if (score >= 40)
                return 'Orta';
            if (score >= 20)
                return 'Düşük';
            return 'Kritik';
        }
        getScoreColor(score) {
            if (score >= 70)
                return '#10b981'; // Green
            if (score >= 40)
                return '#f59e0b'; // Yellow
            return '#ef4444'; // Red
        }
        getCategoryIcon(category) {
            switch (category) {
                case 'highly-engaged':
                    return '🌟';
                case 'moderately-engaged':
                    return '✨';
                case 'at-risk':
                    return '⚠️';
                case 'inactive':
                    return '😴';
                default:
                    return '📊';
            }
        }
        getEngagementTrend(score) {
            if (score >= 70)
                return 'trending_up';
            if (score >= 40)
                return 'trending_flat';
            return 'trending_down';
        }
        getEngagementRecommendations(category) {
            switch (category) {
                case 'highly-engaged':
                    return [
                        'VIP programına dahil edin',
                        'Özel içerik ve teklifler gönderin',
                        'Referans programına davet edin',
                    ];
                case 'moderately-engaged':
                    return [
                        'Engagement artırıcı içerik gönderin',
                        'Anket ile geri bildirim toplayın',
                        'Kişiselleştirilmiş öneriler sunun',
                    ];
                case 'at-risk':
                    return [
                        'Re-engagement kampanyası başlatın',
                        'Email sıklığını azaltın',
                        'Tercih merkezi sunun',
                    ];
                case 'inactive':
                    return [
                        'Win-back kampanyası gönderin',
                        'Son bir şans emaili gönderin',
                        'Listeden çıkarmayı düşünün',
                    ];
                default:
                    return [];
            }
        }
        getRiskColor(riskLevel) {
            switch (riskLevel) {
                case 'critical':
                    return '#dc2626'; // Dark red
                case 'high':
                    return '#ef4444'; // Red
                case 'medium':
                    return '#f59e0b'; // Yellow
                case 'low':
                    return '#10b981'; // Green
                default:
                    return '#6b7280'; // Gray
            }
        }
        getUrgencyLevel(riskLevel) {
            switch (riskLevel) {
                case 'critical':
                    return 'Acil Aksiyon Gerekli';
                case 'high':
                    return 'Yüksek Öncelik';
                case 'medium':
                    return 'Orta Öncelik';
                case 'low':
                    return 'Düşük Öncelik';
                default:
                    return 'Belirsiz';
            }
        }
        getEngagementLabel(score) {
            if (score >= 70)
                return 'Mükemmel Etkileşim';
            if (score >= 50)
                return 'İyi Etkileşim';
            if (score >= 30)
                return 'Orta Etkileşim';
            return 'Düşük Etkileşim';
        }
        getDashboardRecommendations(metrics) {
            const recommendations = [];
            if (metrics.averageEngagementScore < 50) {
                recommendations.push('Genel engagement stratejinizi gözden geçirin');
            }
            if (metrics.atRiskSubscribers > 20) {
                recommendations.push('Risk altındaki aboneler için özel kampanya başlatın');
            }
            if (metrics.predictedMonthlyGrowth < 100) {
                recommendations.push('Yeni abone kazanım stratejileri geliştirin');
            }
            metrics.insights.forEach((insight) => {
                if (insight.actionable && insight.suggestedAction) {
                    recommendations.push(insight.suggestedAction);
                }
            });
            return recommendations.slice(0, 5); // Top 5 recommendations
        }
    };
    return PredictiveAnalyticsController = _classThis;
})();
exports.PredictiveAnalyticsController = PredictiveAnalyticsController;
//# sourceMappingURL=predictive-analytics.controller.js.map