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
exports.CampaignSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
/**
 * Campaign Scheduler Service
 * Handles scheduled campaign execution using cron jobs
 */
let CampaignSchedulerService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _processScheduledCampaigns_decorators;
    var CampaignSchedulerService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _processScheduledCampaigns_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE)];
            __esDecorate(this, null, _processScheduledCampaigns_decorators, { kind: "method", name: "processScheduledCampaigns", static: false, private: false, access: { has: obj => "processScheduledCampaigns" in obj, get: obj => obj.processScheduledCampaigns }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CampaignSchedulerService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        campaignRepository = __runInitializers(this, _instanceExtraInitializers);
        emailCampaignService;
        logger = new common_1.Logger(CampaignSchedulerService.name);
        constructor(campaignRepository, emailCampaignService) {
            this.campaignRepository = campaignRepository;
            this.emailCampaignService = emailCampaignService;
        }
        /**
         * Schedule a campaign for future sending
         */
        async scheduleCampaign(campaignId, scheduledAt) {
            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });
            if (!campaign) {
                throw new Error(`Campaign not found: ${campaignId}`);
            }
            if (campaign.status !== 'draft') {
                throw new Error(`Cannot schedule campaign with status: ${campaign.status}`);
            }
            if (scheduledAt <= new Date()) {
                throw new Error('Scheduled time must be in the future');
            }
            // Update campaign with scheduled time and status
            campaign.scheduledAt = scheduledAt;
            campaign.status = 'scheduled';
            const updatedCampaign = await this.campaignRepository.save(campaign);
            this.logger.log(`Campaign ${campaignId} scheduled for ${scheduledAt.toISOString()}`);
            return updatedCampaign;
        }
        /**
         * Cancel a scheduled campaign
         */
        async cancelScheduledCampaign(campaignId) {
            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });
            if (!campaign) {
                throw new Error(`Campaign not found: ${campaignId}`);
            }
            if (campaign.status !== 'scheduled') {
                throw new Error(`Cannot cancel campaign with status: ${campaign.status}`);
            }
            // Reset campaign to draft status
            campaign.scheduledAt = undefined;
            campaign.status = 'draft';
            const updatedCampaign = await this.campaignRepository.save(campaign);
            this.logger.log(`Campaign ${campaignId} schedule cancelled`);
            return updatedCampaign;
        }
        /**
         * Reschedule a campaign
         */
        async rescheduleCampaign(campaignId, newScheduledAt) {
            const campaign = await this.campaignRepository.findOne({
                where: { id: campaignId },
            });
            if (!campaign) {
                throw new Error(`Campaign not found: ${campaignId}`);
            }
            if (campaign.status !== 'scheduled') {
                throw new Error(`Cannot reschedule campaign with status: ${campaign.status}`);
            }
            if (newScheduledAt <= new Date()) {
                throw new Error('New scheduled time must be in the future');
            }
            campaign.scheduledAt = newScheduledAt;
            const updatedCampaign = await this.campaignRepository.save(campaign);
            this.logger.log(`Campaign ${campaignId} rescheduled to ${newScheduledAt.toISOString()}`);
            return updatedCampaign;
        }
        /**
         * Get all scheduled campaigns
         */
        async getScheduledCampaigns() {
            return this.campaignRepository.find({
                where: {
                    status: 'scheduled',
                },
                order: {
                    scheduledAt: 'ASC',
                },
            });
        }
        /**
         * Get campaigns ready to be sent (scheduled time has passed)
         */
        async getCampaignsReadyToSend() {
            const now = new Date();
            return this.campaignRepository.find({
                where: {
                    status: 'scheduled',
                    scheduledAt: (0, typeorm_1.LessThanOrEqual)(now),
                },
                order: {
                    scheduledAt: 'ASC',
                },
            });
        }
        /**
         * Cron job to check and send scheduled campaigns
         * Runs every minute to check for campaigns ready to send
         */
        async processScheduledCampaigns() {
            this.logger.debug('Checking for scheduled campaigns ready to send...');
            try {
                const campaignsToSend = await this.getCampaignsReadyToSend();
                if (campaignsToSend.length === 0) {
                    this.logger.debug('No scheduled campaigns ready to send');
                    return;
                }
                this.logger.log(`Found ${campaignsToSend.length} campaigns ready to send`);
                for (const campaign of campaignsToSend) {
                    try {
                        this.logger.log(`Sending scheduled campaign: ${campaign.id} (${campaign.name})`);
                        // Send the campaign using the existing service
                        await this.emailCampaignService.sendCampaign(campaign.id);
                        this.logger.log(`Successfully sent scheduled campaign: ${campaign.id}`);
                    }
                    catch (error) {
                        this.logger.error(`Failed to send scheduled campaign ${campaign.id}: ${error.message}`, error.stack);
                        // Mark campaign as failed
                        campaign.status = 'failed';
                        campaign.metadata = {
                            ...campaign.metadata,
                            error: error.message,
                            failedAt: new Date().toISOString(),
                        };
                        await this.campaignRepository.save(campaign);
                    }
                }
            }
            catch (error) {
                this.logger.error('Error processing scheduled campaigns:', error.stack);
            }
        }
        /**
         * Get campaign scheduling statistics
         */
        async getSchedulingStats() {
            const now = new Date();
            const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const [totalScheduled, readyToSend, upcomingToday, upcomingThisWeek] = await Promise.all([
                this.campaignRepository.count({
                    where: { status: 'scheduled' },
                }),
                this.campaignRepository.count({
                    where: {
                        status: 'scheduled',
                        scheduledAt: (0, typeorm_1.LessThanOrEqual)(now),
                    },
                }),
                this.campaignRepository.count({
                    where: {
                        status: 'scheduled',
                        scheduledAt: (0, typeorm_1.LessThanOrEqual)(todayEnd),
                    },
                }),
                this.campaignRepository.count({
                    where: {
                        status: 'scheduled',
                        scheduledAt: (0, typeorm_1.LessThanOrEqual)(weekEnd),
                    },
                }),
            ]);
            return {
                totalScheduled,
                readyToSend,
                upcomingToday,
                upcomingThisWeek,
            };
        }
        /**
         * Validate scheduling time
         */
        validateScheduleTime(scheduledAt) {
            const now = new Date();
            const minScheduleTime = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
            const maxScheduleTime = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
            if (scheduledAt <= minScheduleTime) {
                return {
                    valid: false,
                    error: 'Campaign must be scheduled at least 5 minutes in the future',
                };
            }
            if (scheduledAt > maxScheduleTime) {
                return {
                    valid: false,
                    error: 'Campaign cannot be scheduled more than 1 year in advance',
                };
            }
            return { valid: true };
        }
    };
    return CampaignSchedulerService = _classThis;
})();
exports.CampaignSchedulerService = CampaignSchedulerService;
//# sourceMappingURL=campaign-scheduler.service.js.map