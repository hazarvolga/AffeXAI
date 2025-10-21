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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AnalyticsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnalyticsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnalyticsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        campaignRepository;
        subscriberRepository;
        emailLogRepository;
        constructor(campaignRepository, subscriberRepository, emailLogRepository) {
            this.campaignRepository = campaignRepository;
            this.subscriberRepository = subscriberRepository;
            this.emailLogRepository = emailLogRepository;
        }
        async getDashboardData(startDate, endDate, period = 'month') {
            const dateRange = this.getDateRange(startDate, endDate);
            const [overview, campaignAnalytics, subscriberGrowth, emailEngagement, revenueMetrics, topCampaigns, abTestSummary,] = await Promise.all([
                this.getOverviewMetrics(startDate, endDate),
                this.getCampaignAnalytics(startDate, endDate, 50),
                this.getSubscriberGrowth(startDate, endDate, period),
                this.getEmailEngagement(startDate, endDate, period),
                this.getRevenueMetrics(startDate, endDate, period),
                this.getTopCampaigns(startDate, endDate, 10, 'score'),
                this.getAbTestSummary(startDate, endDate, 20),
            ]);
            return {
                overview,
                campaignAnalytics,
                subscriberGrowth,
                emailEngagement,
                revenueMetrics,
                topCampaigns,
                abTestSummary,
                dateRange: {
                    startDate: dateRange.start.toISOString().split('T')[0],
                    endDate: dateRange.end.toISOString().split('T')[0],
                    period,
                },
            };
        }
        async getOverviewMetrics(startDate, endDate) {
            const dateRange = this.getDateRange(startDate, endDate);
            // Get total campaigns
            const totalCampaigns = await this.campaignRepository.count();
            // Get active campaigns (sent or sending status)
            const activeCampaigns = await this.campaignRepository.count({
                where: {
                    status: 'sent',
                },
            });
            // Get total subscribers
            const totalSubscribers = await this.subscriberRepository.count({
                where: {
                    status: 'active',
                },
            });
            // Get campaigns in date range for calculations
            const campaigns = await this.campaignRepository.find({
                where: {
                    sentAt: (0, typeorm_1.Between)(dateRange.start, dateRange.end),
                },
            });
            // Calculate metrics
            const totalEmailsSent = campaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0);
            const totalOpened = campaigns.reduce((sum, c) => sum + (c.openedCount || 0), 0);
            const totalClicked = campaigns.reduce((sum, c) => sum + (c.clickedCount || 0), 0);
            const averageOpenRate = totalEmailsSent > 0 ? (totalOpened / totalEmailsSent) * 100 : 0;
            const averageClickRate = totalEmailsSent > 0 ? (totalClicked / totalEmailsSent) * 100 : 0;
            // Calculate subscriber growth rate (mock for now)
            const subscriberGrowthRate = 12.5; // This should be calculated from actual data
            // Calculate total revenue (mock for now)
            const totalRevenue = campaigns.reduce((sum, c) => sum + (c.metadata?.revenue || 0), 0);
            // Get active A/B tests count (mock for now)
            const activeAbTests = 1; // This should come from A/B test table
            return {
                totalCampaigns,
                totalSubscribers,
                totalEmailsSent,
                averageOpenRate,
                averageClickRate,
                totalRevenue,
                activeCampaigns,
                activeAbTests,
                subscriberGrowthRate,
                engagementTrend: averageOpenRate > 25 ? 'up' : averageOpenRate < 15 ? 'down' : 'stable',
            };
        }
        async getCampaignAnalytics(startDate, endDate, limit = 50) {
            const dateRange = this.getDateRange(startDate, endDate);
            const campaigns = await this.campaignRepository.find({
                where: {
                    sentAt: (0, typeorm_1.Between)(dateRange.start, dateRange.end),
                },
                order: {
                    sentAt: 'DESC',
                },
                take: limit,
            });
            return campaigns.map(campaign => {
                const sentCount = campaign.sentCount || 0;
                const openedCount = campaign.openedCount || 0;
                const clickedCount = campaign.clickedCount || 0;
                const conversionCount = campaign.metadata?.conversions || 0;
                const revenue = campaign.metadata?.revenue || 0;
                const bounceCount = campaign.metadata?.bounces || 0;
                const unsubscribeCount = campaign.metadata?.unsubscribes || 0;
                return {
                    campaignId: campaign.id,
                    campaignName: campaign.name,
                    sentCount,
                    openedCount,
                    clickedCount,
                    conversionCount,
                    revenue,
                    bounceCount,
                    unsubscribeCount,
                    openRate: sentCount > 0 ? (openedCount / sentCount) * 100 : 0,
                    clickRate: sentCount > 0 ? (clickedCount / sentCount) * 100 : 0,
                    conversionRate: sentCount > 0 ? (conversionCount / sentCount) * 100 : 0,
                    bounceRate: sentCount > 0 ? (bounceCount / sentCount) * 100 : 0,
                    unsubscribeRate: sentCount > 0 ? (unsubscribeCount / sentCount) * 100 : 0,
                    sentAt: campaign.sentAt?.toISOString() || '',
                    status: campaign.status,
                };
            });
        }
        async getSubscriberGrowth(startDate, endDate, period = 'day') {
            const dateRange = this.getDateRange(startDate, endDate);
            const intervals = this.generateDateIntervals(dateRange.start, dateRange.end, period);
            const result = [];
            for (const interval of intervals) {
                // Get subscribers created in this interval
                const newSubscribers = await this.subscriberRepository.count({
                    where: {
                        createdAt: (0, typeorm_1.Between)(interval.start, interval.end),
                    },
                });
                // Get unsubscribes in this interval
                const unsubscribes = await this.subscriberRepository.count({
                    where: {
                        status: 'unsubscribed',
                        updatedAt: (0, typeorm_1.Between)(interval.start, interval.end),
                    },
                });
                // Get total subscribers at end of interval
                const totalSubscribers = await this.subscriberRepository.count({
                    where: {
                        createdAt: (0, typeorm_1.Between)(new Date('2020-01-01'), interval.end),
                        status: 'active',
                    },
                });
                const netGrowth = newSubscribers - unsubscribes;
                const growthRate = totalSubscribers > 0 ? (netGrowth / totalSubscribers) * 100 : 0;
                result.push({
                    date: interval.start.toISOString().split('T')[0],
                    totalSubscribers,
                    newSubscribers,
                    unsubscribes,
                    netGrowth,
                    growthRate,
                });
            }
            return result;
        }
        async getEmailEngagement(startDate, endDate, period = 'day') {
            const dateRange = this.getDateRange(startDate, endDate);
            const intervals = this.generateDateIntervals(dateRange.start, dateRange.end, period);
            const result = [];
            for (const interval of intervals) {
                // Get email logs for this interval
                const emailLogs = await this.emailLogRepository.find({
                    where: {
                        sentAt: (0, typeorm_1.Between)(interval.start, interval.end),
                    },
                });
                const emailsSent = emailLogs.length;
                const uniqueOpens = emailLogs.filter(log => log.openedAt).length;
                const uniqueClicks = emailLogs.filter(log => log.clickedAt).length;
                const openRate = emailsSent > 0 ? (uniqueOpens / emailsSent) * 100 : 0;
                const clickRate = emailsSent > 0 ? (uniqueClicks / emailsSent) * 100 : 0;
                // Calculate average times (simplified calculation)
                const avgTimeToOpen = 45; // This should be calculated from actual data
                const avgTimeToClick = 15; // This should be calculated from actual data
                result.push({
                    date: interval.start.toISOString().split('T')[0],
                    emailsSent,
                    uniqueOpens,
                    uniqueClicks,
                    openRate,
                    clickRate,
                    avgTimeToOpen,
                    avgTimeToClick,
                });
            }
            return result;
        }
        async getRevenueMetrics(startDate, endDate, period = 'day') {
            const dateRange = this.getDateRange(startDate, endDate);
            const intervals = this.generateDateIntervals(dateRange.start, dateRange.end, period);
            const result = [];
            for (const interval of intervals) {
                // Get campaigns for this interval
                const campaigns = await this.campaignRepository.find({
                    where: {
                        sentAt: (0, typeorm_1.Between)(interval.start, interval.end),
                    },
                });
                const revenue = campaigns.reduce((sum, c) => sum + (c.metadata?.revenue || 0), 0);
                const conversions = campaigns.reduce((sum, c) => sum + (c.metadata?.conversions || 0), 0);
                const emailsSent = campaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0);
                const averageOrderValue = conversions > 0 ? revenue / conversions : 0;
                const revenuePerEmail = emailsSent > 0 ? revenue / emailsSent : 0;
                const conversionRate = emailsSent > 0 ? (conversions / emailsSent) * 100 : 0;
                result.push({
                    date: interval.start.toISOString().split('T')[0],
                    revenue,
                    conversions,
                    averageOrderValue,
                    revenuePerEmail,
                    conversionRate,
                });
            }
            return result;
        }
        async getTopCampaigns(startDate, endDate, limit = 10, sortBy = 'score') {
            const dateRange = this.getDateRange(startDate, endDate);
            const campaigns = await this.campaignRepository.find({
                where: {
                    sentAt: (0, typeorm_1.Between)(dateRange.start, dateRange.end),
                },
            });
            const topCampaigns = campaigns.map(campaign => {
                const sentCount = campaign.sentCount || 0;
                const openedCount = campaign.openedCount || 0;
                const clickedCount = campaign.clickedCount || 0;
                const conversionCount = campaign.metadata?.conversions || 0;
                const revenue = campaign.metadata?.revenue || 0;
                const openRate = sentCount > 0 ? (openedCount / sentCount) * 100 : 0;
                const clickRate = sentCount > 0 ? (clickedCount / sentCount) * 100 : 0;
                const conversionRate = sentCount > 0 ? (conversionCount / sentCount) * 100 : 0;
                // Calculate composite score
                const score = (openRate + clickRate + conversionRate * 10) / 3;
                return {
                    campaignId: campaign.id,
                    campaignName: campaign.name,
                    sentAt: campaign.sentAt?.toISOString() || '',
                    openRate,
                    clickRate,
                    conversionRate,
                    revenue,
                    score,
                };
            });
            // Sort by specified metric
            topCampaigns.sort((a, b) => {
                switch (sortBy) {
                    case 'openRate':
                        return b.openRate - a.openRate;
                    case 'clickRate':
                        return b.clickRate - a.clickRate;
                    case 'conversionRate':
                        return b.conversionRate - a.conversionRate;
                    case 'revenue':
                        return b.revenue - a.revenue;
                    case 'score':
                    default:
                        return b.score - a.score;
                }
            });
            return topCampaigns.slice(0, limit);
        }
        async getAbTestSummary(startDate, endDate, limit = 20) {
            // Mock A/B test data for now
            // This should be replaced with actual A/B test entity queries
            return [
                {
                    testId: 'test-001',
                    campaignName: 'Ağustos Bülteni A/B Test',
                    testType: 'subject',
                    status: 'completed',
                    winnerVariant: 'B',
                    improvementPercentage: 15.3,
                    confidenceLevel: 95,
                    createdAt: '2024-08-01T09:00:00.000Z',
                    completedAt: '2024-08-03T15:30:00.000Z',
                },
                {
                    testId: 'test-002',
                    campaignName: 'Eylül Lansman A/B Test',
                    testType: 'content',
                    status: 'running',
                    confidenceLevel: 90,
                    createdAt: '2024-09-01T10:00:00.000Z',
                },
            ];
        }
        async compareCampaigns(campaignIds, metrics) {
            const campaigns = await this.campaignRepository.findByIds(campaignIds);
            const campaignAnalytics = campaigns.map(campaign => {
                const sentCount = campaign.sentCount || 0;
                const openedCount = campaign.openedCount || 0;
                const clickedCount = campaign.clickedCount || 0;
                const conversionCount = campaign.metadata?.conversions || 0;
                const revenue = campaign.metadata?.revenue || 0;
                return {
                    campaignId: campaign.id,
                    campaignName: campaign.name,
                    sentCount,
                    openedCount,
                    clickedCount,
                    conversionCount,
                    revenue,
                    bounceCount: campaign.metadata?.bounces || 0,
                    unsubscribeCount: campaign.metadata?.unsubscribes || 0,
                    openRate: sentCount > 0 ? (openedCount / sentCount) * 100 : 0,
                    clickRate: sentCount > 0 ? (clickedCount / sentCount) * 100 : 0,
                    conversionRate: sentCount > 0 ? (conversionCount / sentCount) * 100 : 0,
                    bounceRate: sentCount > 0 ? ((campaign.metadata?.bounces || 0) / sentCount) * 100 : 0,
                    unsubscribeRate: sentCount > 0 ? ((campaign.metadata?.unsubscribes || 0) / sentCount) * 100 : 0,
                    sentAt: campaign.sentAt?.toISOString() || '',
                    status: campaign.status,
                };
            });
            // Generate comparison data
            const comparison = {};
            metrics.forEach(metric => {
                const values = campaignAnalytics.map(c => c[metric]);
                comparison[metric] = {
                    average: values.reduce((sum, val) => sum + (Number(val) || 0), 0) / values.length,
                    min: Math.min(...values.map(v => Number(v) || 0)),
                    max: Math.max(...values.map(v => Number(v) || 0)),
                };
            });
            return {
                campaigns: campaignAnalytics,
                comparison,
            };
        }
        async getDataStatus() {
            const campaignCount = await this.campaignRepository.count();
            const subscriberCount = await this.subscriberRepository.count();
            const emailLogCount = await this.emailLogRepository.count();
            const recentCampaigns = await this.campaignRepository.find({
                order: { createdAt: 'DESC' },
                take: 5,
                select: ['id', 'name', 'status', 'sentCount', 'openedCount', 'clickedCount', 'createdAt', 'sentAt'],
            });
            return {
                campaigns: campaignCount,
                subscribers: subscriberCount,
                emailLogs: emailLogCount,
                recentCampaigns,
            };
        }
        async exportData(type, format = 'csv', startDate, endDate) {
            let csvContent = '';
            switch (type) {
                case 'campaigns':
                    const campaigns = await this.getCampaignAnalytics(startDate, endDate, 1000);
                    csvContent = 'Campaign Name,Sent Count,Open Rate,Click Rate,Conversion Rate,Revenue\n';
                    campaigns.forEach(c => {
                        csvContent += `"${c.campaignName}",${c.sentCount},${c.openRate.toFixed(2)}%,${c.clickRate.toFixed(2)}%,${c.conversionRate.toFixed(2)}%,${c.revenue}\n`;
                    });
                    break;
                case 'subscribers':
                    const subscriberGrowth = await this.getSubscriberGrowth(startDate, endDate, 'day');
                    csvContent = 'Date,Total Subscribers,New Subscribers,Unsubscribes,Growth Rate\n';
                    subscriberGrowth.forEach(s => {
                        csvContent += `${s.date},${s.totalSubscribers},${s.newSubscribers},${s.unsubscribes},${s.growthRate.toFixed(2)}%\n`;
                    });
                    break;
                case 'engagement':
                    const engagement = await this.getEmailEngagement(startDate, endDate, 'day');
                    csvContent = 'Date,Emails Sent,Open Rate,Click Rate\n';
                    engagement.forEach(e => {
                        csvContent += `${e.date},${e.emailsSent},${e.openRate.toFixed(2)}%,${e.clickRate.toFixed(2)}%\n`;
                    });
                    break;
                case 'revenue':
                    const revenue = await this.getRevenueMetrics(startDate, endDate, 'day');
                    csvContent = 'Date,Revenue,Conversions,Average Order Value\n';
                    revenue.forEach(r => {
                        csvContent += `${r.date},${r.revenue},${r.conversions},${r.averageOrderValue.toFixed(2)}\n`;
                    });
                    break;
            }
            return csvContent;
        }
        getDateRange(startDate, endDate) {
            const end = endDate ? new Date(endDate) : new Date();
            const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
            return { start, end };
        }
        generateDateIntervals(start, end, period) {
            const intervals = [];
            const current = new Date(start);
            while (current < end) {
                const intervalStart = new Date(current);
                let intervalEnd;
                switch (period) {
                    case 'day':
                        intervalEnd = new Date(current.getTime() + 24 * 60 * 60 * 1000);
                        current.setDate(current.getDate() + 1);
                        break;
                    case 'week':
                        intervalEnd = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
                        current.setDate(current.getDate() + 7);
                        break;
                    case 'month':
                        intervalEnd = new Date(current.getFullYear(), current.getMonth() + 1, 1);
                        current.setMonth(current.getMonth() + 1);
                        break;
                    case 'quarter':
                        intervalEnd = new Date(current.getFullYear(), current.getMonth() + 3, 1);
                        current.setMonth(current.getMonth() + 3);
                        break;
                    case 'year':
                        intervalEnd = new Date(current.getFullYear() + 1, 0, 1);
                        current.setFullYear(current.getFullYear() + 1);
                        break;
                }
                if (intervalEnd > end) {
                    intervalEnd = new Date(end);
                }
                intervals.push({ start: intervalStart, end: intervalEnd });
            }
            return intervals;
        }
    };
    return AnalyticsService = _classThis;
})();
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map