"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const http_client_1 = require("./http-client");
/**
 * Analytics Service
 * Handles email marketing analytics and reporting
 */
class AnalyticsService {
    endpoint = '/email-marketing/analytics';
    useMockData = false; // Set to false when backend is ready
    /**
     * Generate mock dashboard data
     */
    generateMockDashboardData() {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        // Generate mock subscriber growth data
        const subscriberGrowth = [];
        for (let i = 30; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const baseSubscribers = 1000 + (30 - i) * 15;
            subscriberGrowth.push({
                date: date.toISOString().split('T')[0],
                totalSubscribers: baseSubscribers + Math.floor(Math.random() * 50),
                newSubscribers: Math.floor(Math.random() * 25) + 5,
                unsubscribes: Math.floor(Math.random() * 8) + 1,
                netGrowth: Math.floor(Math.random() * 20) + 3,
                growthRate: Math.random() * 5 + 1,
            });
        }
        // Generate mock email engagement data
        const emailEngagement = [];
        for (let i = 30; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            emailEngagement.push({
                date: date.toISOString().split('T')[0],
                emailsSent: Math.floor(Math.random() * 500) + 100,
                uniqueOpens: Math.floor(Math.random() * 300) + 50,
                uniqueClicks: Math.floor(Math.random() * 100) + 10,
                openRate: Math.random() * 30 + 15,
                clickRate: Math.random() * 8 + 2,
                avgTimeToOpen: Math.floor(Math.random() * 120) + 30,
                avgTimeToClick: Math.floor(Math.random() * 60) + 10,
            });
        }
        // Generate mock revenue data
        const revenueMetrics = [];
        for (let i = 30; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const revenue = Math.random() * 5000 + 1000;
            const conversions = Math.floor(Math.random() * 50) + 10;
            revenueMetrics.push({
                date: date.toISOString().split('T')[0],
                revenue,
                conversions,
                averageOrderValue: revenue / conversions,
                revenuePerEmail: revenue / (Math.floor(Math.random() * 500) + 100),
                conversionRate: Math.random() * 5 + 1,
            });
        }
        // Generate mock campaign analytics
        const campaignAnalytics = [
            {
                campaignId: 'camp-001',
                campaignName: 'Ağustos 2024 Bülteni',
                sentCount: 1250,
                openedCount: 320,
                clickedCount: 52,
                conversionCount: 8,
                revenue: 2400,
                bounceCount: 15,
                unsubscribeCount: 3,
                openRate: 25.6,
                clickRate: 4.16,
                conversionRate: 0.64,
                bounceRate: 1.2,
                unsubscribeRate: 0.24,
                sentAt: '2024-08-01T10:00:00.000Z',
                status: 'sent',
            },
            {
                campaignId: 'camp-002',
                campaignName: 'Eylül Lansman Daveti',
                sentCount: 890,
                openedCount: 267,
                clickedCount: 89,
                conversionCount: 15,
                revenue: 4500,
                bounceCount: 8,
                unsubscribeCount: 2,
                openRate: 30.0,
                clickRate: 10.0,
                conversionRate: 1.69,
                bounceRate: 0.9,
                unsubscribeRate: 0.22,
                sentAt: '2024-09-01T10:00:00.000Z',
                status: 'sent',
            },
        ];
        // Generate top campaigns
        const topCampaigns = campaignAnalytics.map(c => ({
            campaignId: c.campaignId,
            campaignName: c.campaignName,
            sentAt: c.sentAt,
            openRate: c.openRate,
            clickRate: c.clickRate,
            conversionRate: c.conversionRate,
            revenue: c.revenue,
            score: (c.openRate + c.clickRate + c.conversionRate * 10) / 3,
        }));
        // Generate A/B test summary
        const abTestSummary = [
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
        return {
            overview: {
                totalCampaigns: 15,
                totalSubscribers: 1547,
                totalEmailsSent: 18750,
                averageOpenRate: 27.8,
                averageClickRate: 7.1,
                totalRevenue: 45600,
                activeCampaigns: 3,
                activeAbTests: 1,
                subscriberGrowthRate: 12.5,
                engagementTrend: 'up',
            },
            campaignAnalytics,
            subscriberGrowth,
            emailEngagement,
            revenueMetrics,
            topCampaigns,
            abTestSummary,
            dateRange: {
                startDate: thirtyDaysAgo.toISOString().split('T')[0],
                endDate: now.toISOString().split('T')[0],
                period: 'day',
            },
        };
    }
    /**
     * Get complete dashboard data
     */
    async getDashboardData(startDate, endDate, period = 'month') {
        if (this.useMockData) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            return this.generateMockDashboardData();
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('period', period);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/dashboard?${params.toString()}`);
    }
    /**
     * Get overview metrics
     */
    async getOverviewMetrics(startDate, endDate) {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().overview;
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/overview?${params.toString()}`);
    }
    /**
     * Get campaign analytics
     */
    async getCampaignAnalytics(startDate, endDate, limit = 50) {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().campaignAnalytics.slice(0, limit);
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('limit', limit.toString());
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/campaigns?${params.toString()}`);
    }
    /**
     * Get subscriber growth data
     */
    async getSubscriberGrowth(startDate, endDate, period = 'day') {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().subscriberGrowth;
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('period', period);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/subscriber-growth?${params.toString()}`);
    }
    /**
     * Get email engagement metrics
     */
    async getEmailEngagement(startDate, endDate, period = 'day') {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().emailEngagement;
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('period', period);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/engagement?${params.toString()}`);
    }
    /**
     * Get revenue metrics
     */
    async getRevenueMetrics(startDate, endDate, period = 'day') {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().revenueMetrics;
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('period', period);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/revenue?${params.toString()}`);
    }
    /**
     * Get top performing campaigns
     */
    async getTopCampaigns(startDate, endDate, limit = 10, sortBy = 'score') {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const campaigns = this.generateMockDashboardData().topCampaigns;
            return campaigns.slice(0, limit);
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('limit', limit.toString());
        params.append('sortBy', sortBy);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/top-campaigns?${params.toString()}`);
    }
    /**
     * Get A/B test summary
     */
    async getAbTestSummary(startDate, endDate, limit = 20) {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return this.generateMockDashboardData().abTestSummary.slice(0, limit);
        }
        const params = new URLSearchParams();
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        params.append('limit', limit.toString());
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/ab-tests?${params.toString()}`);
    }
    /**
     * Get campaign performance comparison
     */
    async compareCampaigns(campaignIds, metrics = ['openRate', 'clickRate', 'conversionRate']) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/compare-campaigns`, { campaignIds, metrics });
    }
    /**
     * Export analytics data
     */
    async exportData(type, format = 'csv', startDate, endDate) {
        if (this.useMockData) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Generate mock CSV data
            let csvContent = '';
            const mockData = this.generateMockDashboardData();
            switch (type) {
                case 'campaigns':
                    csvContent = 'Campaign Name,Sent Count,Open Rate,Click Rate,Conversion Rate,Revenue\n';
                    mockData.campaignAnalytics.forEach(c => {
                        csvContent += `${c.campaignName},${c.sentCount},${c.openRate}%,${c.clickRate}%,${c.conversionRate}%,${c.revenue}\n`;
                    });
                    break;
                case 'subscribers':
                    csvContent = 'Date,Total Subscribers,New Subscribers,Unsubscribes,Growth Rate\n';
                    mockData.subscriberGrowth.forEach(s => {
                        csvContent += `${s.date},${s.totalSubscribers},${s.newSubscribers},${s.unsubscribes},${s.growthRate}%\n`;
                    });
                    break;
                case 'engagement':
                    csvContent = 'Date,Emails Sent,Open Rate,Click Rate\n';
                    mockData.emailEngagement.forEach(e => {
                        csvContent += `${e.date},${e.emailsSent},${e.openRate}%,${e.clickRate}%\n`;
                    });
                    break;
                case 'revenue':
                    csvContent = 'Date,Revenue,Conversions,Average Order Value\n';
                    mockData.revenueMetrics.forEach(r => {
                        csvContent += `${r.date},${r.revenue},${r.conversions},${r.averageOrderValue}\n`;
                    });
                    break;
            }
            return new Blob([csvContent], { type: 'text/csv' });
        }
        const params = new URLSearchParams();
        params.append('type', type);
        params.append('format', format);
        if (startDate)
            params.append('startDate', startDate);
        if (endDate)
            params.append('endDate', endDate);
        const response = await http_client_1.httpClient.getAxiosInstance().get(`${this.endpoint}/export?${params.toString()}`, { responseType: 'blob' });
        return response.data;
    }
}
exports.analyticsService = new AnalyticsService();
exports.default = exports.analyticsService;
//# sourceMappingURL=analyticsService.js.map