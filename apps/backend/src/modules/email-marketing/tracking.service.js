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
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
/**
 * Email Tracking Service
 * Handles email open and click tracking functionality
 */
let TrackingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TrackingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TrackingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        emailLogRepository;
        campaignRepository;
        subscriberRepository;
        emailOpenHistoryRepository;
        configService;
        baseUrl;
        constructor(emailLogRepository, campaignRepository, subscriberRepository, emailOpenHistoryRepository, configService) {
            this.emailLogRepository = emailLogRepository;
            this.campaignRepository = campaignRepository;
            this.subscriberRepository = subscriberRepository;
            this.emailOpenHistoryRepository = emailOpenHistoryRepository;
            this.configService = configService;
            this.baseUrl = this.configService.get('BASE_URL', 'http://localhost:9005');
        }
        /**
         * Generate tracking data for an email
         */
        async generateTrackingData(campaignId, recipientEmail) {
            // Find or create email log entry
            let emailLog = await this.emailLogRepository.findOne({
                where: {
                    campaignId,
                    recipientEmail,
                },
            });
            if (!emailLog) {
                emailLog = this.emailLogRepository.create({
                    id: (0, uuid_1.v4)(),
                    campaignId,
                    recipientEmail,
                    status: 'pending',
                    metadata: {},
                });
                await this.emailLogRepository.save(emailLog);
            }
            const trackingId = emailLog.id;
            const pixelUrl = `${this.baseUrl}/api/email-marketing/track/open/${trackingId}`;
            const linkWrapper = (originalUrl) => {
                const encodedUrl = encodeURIComponent(originalUrl);
                return `${this.baseUrl}/api/email-marketing/track/click/${trackingId}?url=${encodedUrl}`;
            };
            return {
                trackingId,
                pixelUrl,
                linkWrapper,
            };
        }
        /**
         * Track email open event
         */
        async trackEmailOpen(trackingId, metadata) {
            const emailLog = await this.emailLogRepository.findOne({
                where: { id: trackingId },
                relations: ['campaign'],
            });
            if (!emailLog) {
                throw new Error(`Email log not found for tracking ID: ${trackingId}`);
            }
            // Only track first open (unique opens)
            if (!emailLog.openedAt) {
                emailLog.openedAt = metadata.timestamp;
                emailLog.metadata = {
                    ...emailLog.metadata,
                    openTracking: {
                        userAgent: metadata.userAgent,
                        ipAddress: metadata.ipAddress,
                        firstOpenedAt: metadata.timestamp,
                    },
                };
                await this.emailLogRepository.save(emailLog);
                // Update campaign statistics
                await this.updateCampaignStats(emailLog.campaignId, 'opened');
                // Update subscriber statistics
                await this.updateSubscriberStats(emailLog.recipientEmail, 'opens');
                // Find subscriber by email to get ID
                const subscriber = await this.subscriberRepository.findOne({
                    where: { email: emailLog.recipientEmail },
                });
                // Record open history for Send Time Optimization
                if (subscriber) {
                    const openTime = new Date(metadata.timestamp);
                    const openHistory = this.emailOpenHistoryRepository.create({
                        subscriberId: subscriber.id,
                        campaignId: emailLog.campaignId,
                        openedAt: openTime,
                        hourOfDay: openTime.getHours(),
                        dayOfWeek: openTime.getDay(),
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        deviceType: this.detectDeviceType(metadata.userAgent),
                        emailClient: this.detectEmailClient(metadata.userAgent),
                        ipAddress: metadata.ipAddress,
                    });
                    await this.emailOpenHistoryRepository.save(openHistory);
                }
            }
        }
        /**
         * Track email click event
         */
        async trackEmailClick(trackingId, metadata) {
            const emailLog = await this.emailLogRepository.findOne({
                where: { id: trackingId },
                relations: ['campaign'],
            });
            if (!emailLog) {
                throw new Error(`Email log not found for tracking ID: ${trackingId}`);
            }
            // Track click (can have multiple clicks)
            if (!emailLog.clickedAt) {
                emailLog.clickedAt = metadata.timestamp;
            }
            // Add click to metadata
            const clicks = emailLog.metadata?.clicks || [];
            clicks.push({
                clickedAt: metadata.timestamp,
                originalUrl: metadata.originalUrl,
                userAgent: metadata.userAgent,
                ipAddress: metadata.ipAddress,
            });
            emailLog.metadata = {
                ...emailLog.metadata,
                clicks,
                lastClickedAt: metadata.timestamp,
            };
            await this.emailLogRepository.save(emailLog);
            // Update campaign statistics (only count first click for unique clicks)
            if (emailLog.clickedAt === metadata.timestamp) {
                await this.updateCampaignStats(emailLog.campaignId, 'clicked');
            }
            // Update subscriber statistics
            await this.updateSubscriberStats(emailLog.recipientEmail, 'clicks');
        }
        /**
         * Get tracking statistics for a campaign
         */
        async getTrackingStats(campaignId) {
            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });
            if (!campaign) {
                throw new Error(`Campaign not found: ${campaignId}`);
            }
            // Get all email logs for this campaign
            const emailLogs = await this.emailLogRepository.find({
                where: { campaignId },
                order: { createdAt: 'DESC' },
            });
            const totalSent = emailLogs.length;
            const totalOpened = emailLogs.filter(log => log.openedAt).length;
            const totalClicked = emailLogs.filter(log => log.clickedAt).length;
            const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
            const clickRate = totalSent > 0 ? (totalClicked / totalSent) * 100 : 0;
            // Recent opens (last 10)
            const recentOpens = emailLogs
                .filter(log => log.openedAt)
                .slice(0, 10)
                .map(log => ({
                recipientEmail: log.recipientEmail,
                openedAt: log.openedAt,
                userAgent: log.metadata?.openTracking?.userAgent,
                ipAddress: log.metadata?.openTracking?.ipAddress,
            }));
            // Recent clicks (last 10)
            const recentClicks = emailLogs
                .filter(log => log.clickedAt)
                .slice(0, 10)
                .map(log => ({
                recipientEmail: log.recipientEmail,
                clickedAt: log.clickedAt,
                originalUrl: log.metadata?.clicks?.[0]?.originalUrl,
                userAgent: log.metadata?.clicks?.[0]?.userAgent,
                ipAddress: log.metadata?.clicks?.[0]?.ipAddress,
            }));
            return {
                campaignId,
                totalSent,
                totalOpened,
                totalClicked,
                openRate: Math.round(openRate * 100) / 100,
                clickRate: Math.round(clickRate * 100) / 100,
                uniqueOpens: totalOpened,
                uniqueClicks: totalClicked,
                recentOpens,
                recentClicks,
            };
        }
        /**
         * Update campaign statistics
         */
        async updateCampaignStats(campaignId, metric) {
            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });
            if (campaign) {
                if (metric === 'opened') {
                    campaign.openedCount = (campaign.openedCount || 0) + 1;
                }
                else if (metric === 'clicked') {
                    campaign.clickedCount = (campaign.clickedCount || 0) + 1;
                }
                await this.campaignRepository.save(campaign);
            }
        }
        /**
         * Update subscriber statistics
         */
        async updateSubscriberStats(email, metric) {
            const subscriber = await this.subscriberRepository.findOne({
                where: { email },
            });
            if (subscriber) {
                if (metric === 'opens') {
                    subscriber.opens = (subscriber.opens || 0) + 1;
                }
                else if (metric === 'clicks') {
                    subscriber.clicks = (subscriber.clicks || 0) + 1;
                }
                await this.subscriberRepository.save(subscriber);
            }
        }
        /**
         * Process email content to add tracking
         */
        async processEmailContent(htmlContent, campaignId, recipientEmail) {
            const trackingData = await this.generateTrackingData(campaignId, recipientEmail);
            // Add tracking pixel before closing body tag
            const trackingPixel = `<img src="${trackingData.pixelUrl}" width="1" height="1" style="display:none;" alt="" />`;
            let processedContent = htmlContent.replace('</body>', `${trackingPixel}</body>`);
            // If no body tag, add pixel at the end
            if (!processedContent.includes('</body>')) {
                processedContent += trackingPixel;
            }
            // Wrap all links with tracking
            processedContent = processedContent.replace(/href="([^"]+)"/g, (match, url) => {
                // Skip tracking URLs and mailto links
                if (url.includes('/track/') || url.startsWith('mailto:') || url.startsWith('#')) {
                    return match;
                }
                return `href="${trackingData.linkWrapper(url)}"`;
            });
            return processedContent;
        }
        /**
         * Detect device type from user agent
         */
        detectDeviceType(userAgent) {
            if (!userAgent)
                return 'unknown';
            const ua = userAgent.toLowerCase();
            if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
                return 'mobile';
            }
            if (ua.includes('tablet') || ua.includes('ipad')) {
                return 'tablet';
            }
            return 'desktop';
        }
        /**
         * Detect email client from user agent
         */
        detectEmailClient(userAgent) {
            if (!userAgent)
                return 'unknown';
            const ua = userAgent.toLowerCase();
            // Common email clients
            if (ua.includes('outlook'))
                return 'Outlook';
            if (ua.includes('thunderbird'))
                return 'Thunderbird';
            if (ua.includes('apple mail'))
                return 'Apple Mail';
            // Webmail clients
            if (ua.includes('gmail'))
                return 'Gmail';
            if (ua.includes('yahoo'))
                return 'Yahoo Mail';
            if (ua.includes('hotmail') || ua.includes('live.com'))
                return 'Outlook.com';
            // Mobile clients
            if (ua.includes('android') && ua.includes('mail'))
                return 'Android Mail';
            if (ua.includes('iphone') && ua.includes('mail'))
                return 'iOS Mail';
            return 'Other';
        }
    };
    return TrackingService = _classThis;
})();
exports.TrackingService = TrackingService;
//# sourceMappingURL=tracking.service.js.map