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
exports.EmailCampaignService = void 0;
const common_1 = require("@nestjs/common");
let EmailCampaignService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmailCampaignService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailCampaignService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        campaignRepository;
        emailQueue;
        cacheService;
        eventBusService;
        logger = new common_1.Logger(EmailCampaignService.name);
        constructor(campaignRepository, emailQueue, cacheService, eventBusService) {
            this.campaignRepository = campaignRepository;
            this.emailQueue = emailQueue;
            this.cacheService = cacheService;
            this.eventBusService = eventBusService;
        }
        async create(createCampaignDto) {
            const campaign = this.campaignRepository.create(createCampaignDto);
            const savedCampaign = await this.campaignRepository.save(campaign);
            // Clear cache for findAll
            await this.cacheService.del('email-campaigns:all');
            return savedCampaign;
        }
        async findAll() {
            const cached = await this.cacheService.get('email-campaigns:all');
            if (cached) {
                return cached;
            }
            const campaigns = await this.campaignRepository.find({
                order: { createdAt: 'DESC' },
            });
            await this.cacheService.set('email-campaigns:all', campaigns, 30); // 30 seconds TTL
            return campaigns;
        }
        async findOne(id) {
            const cached = await this.cacheService.get(`email-campaigns:${id}`);
            if (cached) {
                return cached;
            }
            const campaign = await this.campaignRepository.findOne({ where: { id } });
            if (!campaign) {
                throw new Error('Campaign not found');
            }
            await this.cacheService.set(`email-campaigns:${id}`, campaign, 60); // 60 seconds TTL
            return campaign;
        }
        async update(id, updateCampaignDto) {
            await this.campaignRepository.update(id, updateCampaignDto);
            const campaign = await this.campaignRepository.findOne({ where: { id } });
            if (!campaign) {
                throw new Error('Campaign not found');
            }
            // Clear cache for this campaign and all campaigns
            await this.cacheService.del(`email-campaigns:${id}`);
            await this.cacheService.del('email-campaigns:all');
            return campaign;
        }
        async remove(id) {
            await this.campaignRepository.delete(id);
            // Clear cache for this campaign and all campaigns
            await this.cacheService.del(`email-campaigns:${id}`);
            await this.cacheService.del('email-campaigns:all');
        }
        async sendCampaign(id) {
            const campaign = await this.findOne(id);
            if (!campaign) {
                throw new Error('Campaign not found');
            }
            // Update campaign status
            campaign.status = 'sending';
            campaign.sentAt = new Date();
            await this.campaignRepository.save(campaign);
            // Clear cache for this campaign
            await this.cacheService.del(`email-campaigns:${id}`);
            // Add job to queue for each recipient
            // For demo purposes, we'll simulate some recipients
            const recipients = [
                'user1@example.com',
                'user2@example.com',
                'user3@example.com',
            ];
            campaign.totalRecipients = recipients.length;
            await this.campaignRepository.save(campaign);
            for (const recipient of recipients) {
                await this.emailQueue.add('sendCampaignEmail', {
                    to: recipient,
                    subject: campaign.subject,
                    body: campaign.content,
                    campaignId: campaign.id,
                    recipientId: recipient,
                });
            }
            // Publish platform event
            await this.eventBusService.publishCampaignSent(campaign.id, recipients.length, 'system');
            this.logger.log(`Campaign ${id} queued for sending to ${recipients.length} recipients`);
        }
        async incrementSentCount(campaignId) {
            await this.campaignRepository.increment({ id: campaignId }, 'sentCount', 1);
            // Clear cache for this campaign
            await this.cacheService.del(`email-campaigns:${campaignId}`);
        }
        async incrementOpenedCount(campaignId) {
            await this.campaignRepository.increment({ id: campaignId }, 'openedCount', 1);
            // Clear cache for this campaign
            await this.cacheService.del(`email-campaigns:${campaignId}`);
        }
        async incrementClickedCount(campaignId) {
            await this.campaignRepository.increment({ id: campaignId }, 'clickedCount', 1);
            // Clear cache for this campaign
            await this.cacheService.del(`email-campaigns:${campaignId}`);
        }
        async getCampaignStats(id) {
            const campaign = await this.findOne(id);
            if (!campaign) {
                throw new Error('Campaign not found');
            }
            return {
                id: campaign.id,
                name: campaign.name,
                status: campaign.status,
                totalRecipients: campaign.totalRecipients,
                sentCount: campaign.sentCount,
                openedCount: campaign.openedCount,
                clickedCount: campaign.clickedCount,
                completionRate: campaign.totalRecipients > 0
                    ? Math.round((campaign.sentCount / campaign.totalRecipients) * 100)
                    : 0,
            };
        }
    };
    return EmailCampaignService = _classThis;
})();
exports.EmailCampaignService = EmailCampaignService;
//# sourceMappingURL=email-campaign.service.js.map