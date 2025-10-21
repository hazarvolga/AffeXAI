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
exports.AbTestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const email_campaign_variant_entity_1 = require("../entities/email-campaign-variant.entity");
/**
 * A/B Test Service
 * Manages creation, execution, and analysis of email campaign A/B tests
 */
let AbTestService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _autoSelectWinners_decorators;
    var AbTestService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _autoSelectWinners_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            __esDecorate(this, null, _autoSelectWinners_decorators, { kind: "method", name: "autoSelectWinners", static: false, private: false, access: { has: obj => "autoSelectWinners" in obj, get: obj => obj.autoSelectWinners }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AbTestService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        campaignRepo = __runInitializers(this, _instanceExtraInitializers);
        variantRepo;
        subscriberRepo;
        statsService;
        logger = new common_1.Logger(AbTestService.name);
        constructor(campaignRepo, variantRepo, subscriberRepo, statsService) {
            this.campaignRepo = campaignRepo;
            this.variantRepo = variantRepo;
            this.subscriberRepo = subscriberRepo;
            this.statsService = statsService;
        }
        /**
         * Create a new A/B test for a campaign
         */
        async createAbTest(dto) {
            this.logger.log(`Creating A/B test for campaign ${dto.campaignId}`);
            // 1. Validate campaign exists and is not already an A/B test
            const campaign = await this.campaignRepo.findOne({
                where: { id: dto.campaignId },
                relations: ['variants'],
            });
            if (!campaign) {
                throw new common_1.NotFoundException(`Campaign with ID ${dto.campaignId} not found`);
            }
            if (campaign.isAbTest && campaign.variants?.length > 0) {
                throw new common_1.BadRequestException('Campaign already has an A/B test configured');
            }
            // 2. Validate split percentages sum to 100
            const totalSplit = dto.variants.reduce((sum, v) => sum + v.splitPercentage, 0);
            if (Math.abs(totalSplit - 100) > 0.01) {
                throw new common_1.BadRequestException(`Split percentages must sum to 100% (current total: ${totalSplit.toFixed(2)}%)`);
            }
            // 3. Validate variant labels are unique
            const labels = dto.variants.map((v) => v.label);
            const uniqueLabels = new Set(labels);
            if (labels.length !== uniqueLabels.size) {
                throw new common_1.BadRequestException('Variant labels must be unique');
            }
            // 4. Validate variant labels are valid (A-E)
            const validLabels = ['A', 'B', 'C', 'D', 'E'];
            const invalidLabels = labels.filter((l) => !validLabels.includes(l));
            if (invalidLabels.length > 0) {
                throw new common_1.BadRequestException(`Invalid variant labels: ${invalidLabels.join(', ')}. Must be A-E.`);
            }
            // 5. Update campaign with A/B test configuration
            campaign.isAbTest = true;
            campaign.testType = dto.testType;
            campaign.winnerCriteria = dto.winnerCriteria;
            campaign.autoSelectWinner = dto.autoSelectWinner;
            campaign.testDuration = dto.testDuration;
            campaign.confidenceLevel = dto.confidenceLevel;
            campaign.minSampleSize = dto.minSampleSize;
            campaign.testStatus = 'draft';
            await this.campaignRepo.save(campaign);
            // 6. Create variants
            const variants = dto.variants.map((variantDto) => this.variantRepo.create({
                campaignId: campaign.id,
                variantLabel: variantDto.label,
                subject: variantDto.subject || campaign.subject,
                content: variantDto.content || campaign.content,
                fromName: variantDto.fromName,
                sendTimeOffset: variantDto.sendTimeOffset || 0,
                splitPercentage: variantDto.splitPercentage,
                status: email_campaign_variant_entity_1.VariantStatus.DRAFT,
            }));
            await this.variantRepo.save(variants);
            this.logger.log(`Created A/B test with ${variants.length} variants for campaign ${campaign.id}`);
            // 7. Return campaign with variants
            const result = await this.campaignRepo.findOne({
                where: { id: campaign.id },
                relations: ['variants'],
            });
            if (!result) {
                throw new Error(`Campaign ${campaign.id} not found after creation`);
            }
            return result;
        }
        /**
         * Update a variant's content
         */
        async updateVariant(campaignId, variantId, dto) {
            const variant = await this.variantRepo.findOne({
                where: { id: variantId, campaignId },
            });
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            // Only allow updates if variant is still in draft/testing status
            if (variant.status === email_campaign_variant_entity_1.VariantStatus.WINNER || variant.status === email_campaign_variant_entity_1.VariantStatus.LOSER) {
                throw new common_1.BadRequestException('Cannot update variant after test is completed');
            }
            // Update fields
            if (dto.subject !== undefined)
                variant.subject = dto.subject;
            if (dto.content !== undefined)
                variant.content = dto.content;
            if (dto.fromName !== undefined)
                variant.fromName = dto.fromName;
            if (dto.splitPercentage !== undefined) {
                variant.splitPercentage = dto.splitPercentage;
                // TODO: Validate total split percentage still equals 100%
                // This would require loading all variants and checking the sum
            }
            return this.variantRepo.save(variant);
        }
        /**
         * Get A/B test results with statistical analysis
         */
        async getAbTestResults(campaignId) {
            const campaign = await this.campaignRepo.findOne({
                where: { id: campaignId },
                relations: ['variants'],
            });
            if (!campaign || !campaign.isAbTest) {
                throw new common_1.NotFoundException('A/B test not found for this campaign');
            }
            if (!campaign.variants || campaign.variants.length === 0) {
                throw new common_1.BadRequestException('No variants found for this A/B test');
            }
            // Calculate rates for each variant (will be done in entity lifecycle hooks)
            const variantsWithStats = campaign.variants.map((v) => {
                v.calculateRates(); // Ensure rates are up-to-date
                return {
                    id: v.id,
                    label: v.variantLabel,
                    status: v.status,
                    subject: v.subject,
                    content: v.content,
                    fromName: v.fromName,
                    splitPercentage: v.splitPercentage,
                    sentCount: v.sentCount,
                    openedCount: v.openedCount,
                    clickedCount: v.clickedCount,
                    conversionCount: v.conversionCount,
                    revenue: v.revenue,
                    bounceCount: v.bounceCount,
                    unsubscribeCount: v.unsubscribeCount,
                    openRate: v.openRate || 0,
                    clickRate: v.clickRate || 0,
                    conversionRate: v.conversionRate || 0,
                };
            });
            // Determine which metric to use for statistical analysis
            const metricMap = {
                open_rate: 'open',
                click_rate: 'click',
                conversion_rate: 'conversion',
                revenue: 'conversion', // Use conversion count for revenue-based tests
            };
            const metric = metricMap[campaign.winnerCriteria] || 'open';
            // Perform statistical analysis
            const statistics = this.statsService.calculateChiSquare(campaign.variants, metric);
            // Check if minimum sample size reached
            const hasMinSample = this.statsService.hasMinimumSampleSize(campaign.variants, campaign.minSampleSize);
            // Calculate confidence intervals for each variant
            const confidenceIntervals = campaign.variants.map((v) => ({
                label: v.variantLabel,
                interval: this.statsService.calculateConfidenceInterval(v, metric, campaign.confidenceLevel),
            }));
            // Check if test duration has elapsed
            const testDurationElapsed = campaign.sentAt
                ? this.statsService.hasTestDurationElapsed(campaign.sentAt, campaign.testDuration)
                : false;
            // Determine if we can declare a winner
            const canDeclareWinner = hasMinSample && statistics.isSignificant && testDurationElapsed;
            return {
                campaign: {
                    id: campaign.id,
                    name: campaign.name,
                    testType: campaign.testType,
                    winnerCriteria: campaign.winnerCriteria,
                    testStatus: campaign.testStatus,
                    autoSelectWinner: campaign.autoSelectWinner,
                    winnerSelectionDate: campaign.winnerSelectionDate,
                    selectedWinnerId: campaign.selectedWinnerId,
                    testDuration: campaign.testDuration,
                    confidenceLevel: campaign.confidenceLevel,
                    minSampleSize: campaign.minSampleSize,
                    sentAt: campaign.sentAt,
                },
                variants: variantsWithStats,
                statistics: {
                    ...statistics,
                    hasMinimumSample: hasMinSample,
                    testDurationElapsed,
                    canDeclareWinner,
                },
                confidenceIntervals,
            };
        }
        /**
         * Manually select a winner for the A/B test
         */
        async selectWinner(campaignId, variantId) {
            this.logger.log(`Selecting winner for campaign ${campaignId}: variant ${variantId}`);
            const campaign = await this.campaignRepo.findOne({
                where: { id: campaignId },
                relations: ['variants'],
            });
            if (!campaign || !campaign.isAbTest) {
                throw new common_1.NotFoundException('A/B test not found');
            }
            const winner = campaign.variants.find((v) => v.id === variantId);
            if (!winner) {
                throw new common_1.NotFoundException('Variant not found');
            }
            // Update variant statuses
            for (const variant of campaign.variants) {
                variant.status = variant.id === variantId ? email_campaign_variant_entity_1.VariantStatus.WINNER : email_campaign_variant_entity_1.VariantStatus.LOSER;
                await this.variantRepo.save(variant);
            }
            // Update campaign with winner
            campaign.selectedWinnerId = variantId;
            campaign.winnerSelectionDate = new Date();
            campaign.testStatus = 'completed';
            // Apply winner's content to campaign
            campaign.subject = winner.subject;
            campaign.content = winner.content;
            await this.campaignRepo.save(campaign);
            this.logger.log(`Winner selected for campaign ${campaign.id}: Variant ${winner.variantLabel}`);
            return campaign;
        }
        /**
         * Send A/B test - distribute variants to subscribers
         */
        async sendAbTest(dto) {
            this.logger.log(`Sending A/B test for campaign ${dto.campaignId}`);
            const campaign = await this.campaignRepo.findOne({
                where: { id: dto.campaignId },
                relations: ['variants'],
            });
            if (!campaign || !campaign.isAbTest) {
                throw new common_1.NotFoundException('A/B test not found');
            }
            if (!campaign.variants || campaign.variants.length === 0) {
                throw new common_1.BadRequestException('No variants configured for this A/B test');
            }
            // Get subscribers
            let subscribers;
            if (dto.subscriberIds && dto.subscriberIds.length > 0) {
                // Use specified subscribers
                subscribers = await this.subscriberRepo.find({
                    where: { id: (0, typeorm_1.In)(dto.subscriberIds), status: 'active' },
                });
            }
            else if (dto.segmentIds && dto.segmentIds.length > 0) {
                // Use subscribers from segments
                // TODO: Implement segment-based subscriber retrieval
                throw new common_1.BadRequestException('Segment-based sending not yet implemented');
            }
            else {
                // Use all active subscribers
                subscribers = await this.subscriberRepo.find({
                    where: { status: 'active' },
                });
            }
            if (subscribers.length === 0) {
                throw new common_1.BadRequestException('No active subscribers found');
            }
            // Shuffle subscribers for randomization
            const shuffled = this.shuffleArray([...subscribers]);
            // Distribute subscribers to variants based on split percentage
            const distributions = this.distributeToVariants(shuffled, campaign.variants);
            // Update variant statuses to TESTING
            for (const variant of campaign.variants) {
                variant.status = email_campaign_variant_entity_1.VariantStatus.TESTING;
                await this.variantRepo.save(variant);
            }
            // Update campaign status
            campaign.testStatus = 'testing';
            campaign.sentAt = new Date();
            await this.campaignRepo.save(campaign);
            this.logger.log(`A/B test started for campaign ${campaign.id}. Total recipients: ${subscribers.length}`);
            // Return distribution summary
            return {
                message: 'A/B test sending initiated',
                totalRecipients: subscribers.length,
                distributions: distributions.map((d) => ({
                    variantLabel: d.variant.variantLabel,
                    variantId: d.variant.id,
                    recipientCount: d.subscribers.length,
                    splitPercentage: d.variant.splitPercentage,
                })),
                campaign: {
                    id: campaign.id,
                    name: campaign.name,
                    testStatus: campaign.testStatus,
                    sentAt: campaign.sentAt,
                },
            };
            // Note: Actual email sending would be handled by email queue/service
            // This method just sets up the test and distribution
        }
        /**
         * Auto-select winner based on statistical significance
         * Runs as a cron job every hour
         */
        async autoSelectWinners() {
            this.logger.debug('Running auto-select winners cron job');
            // Find all testing campaigns with auto-select enabled
            const testingCampaigns = await this.campaignRepo.find({
                where: {
                    isAbTest: true,
                    autoSelectWinner: true,
                    testStatus: 'testing',
                },
                relations: ['variants'],
            });
            if (testingCampaigns.length === 0) {
                this.logger.debug('No campaigns ready for auto-select');
                return;
            }
            this.logger.log(`Found ${testingCampaigns.length} campaigns to check for auto-select`);
            for (const campaign of testingCampaigns) {
                try {
                    // Check if test duration has passed
                    if (!campaign.sentAt)
                        continue;
                    const testDurationElapsed = this.statsService.hasTestDurationElapsed(campaign.sentAt, campaign.testDuration);
                    if (!testDurationElapsed) {
                        this.logger.debug(`Campaign ${campaign.id}: Test duration not yet elapsed`);
                        continue;
                    }
                    // Get test results
                    const results = await this.getAbTestResults(campaign.id);
                    // Auto-select if we can declare a winner
                    if (results.statistics.canDeclareWinner && results.statistics.winner) {
                        const winnerVariant = campaign.variants.find((v) => v.variantLabel === results.statistics.winner);
                        if (winnerVariant) {
                            await this.selectWinner(campaign.id, winnerVariant.id);
                            this.logger.log(`Auto-selected winner for campaign ${campaign.id}: Variant ${results.statistics.winner}`);
                        }
                    }
                    else {
                        this.logger.debug(`Campaign ${campaign.id}: Cannot declare winner yet. ` +
                            `Significant: ${results.statistics.isSignificant}, ` +
                            `Min sample: ${results.statistics.hasMinimumSample}`);
                    }
                }
                catch (error) {
                    this.logger.error(`Error auto-selecting winner for campaign ${campaign.id}:`, error);
                }
            }
        }
        /**
         * Get A/B test summary for a campaign
         */
        async getAbTestSummary(campaignId) {
            const campaign = await this.campaignRepo.findOne({
                where: { id: campaignId },
                relations: ['variants', 'selectedWinner'],
            });
            if (!campaign || !campaign.isAbTest) {
                throw new common_1.NotFoundException('A/B test not found');
            }
            return {
                id: campaign.id,
                name: campaign.name,
                testType: campaign.testType,
                winnerCriteria: campaign.winnerCriteria,
                testStatus: campaign.testStatus,
                variantCount: campaign.variants?.length || 0,
                hasWinner: campaign.hasWinner(),
                winner: campaign.selectedWinner
                    ? {
                        id: campaign.selectedWinner.id,
                        label: campaign.selectedWinner.variantLabel,
                        subject: campaign.selectedWinner.subject,
                    }
                    : null,
                winnerSelectionDate: campaign.winnerSelectionDate,
                sentAt: campaign.sentAt,
                testDuration: campaign.testDuration,
            };
        }
        /**
         * Delete an A/B test (and all its variants)
         */
        async deleteAbTest(campaignId) {
            const campaign = await this.campaignRepo.findOne({
                where: { id: campaignId },
                relations: ['variants'],
            });
            if (!campaign || !campaign.isAbTest) {
                throw new common_1.NotFoundException('A/B test not found');
            }
            // Cannot delete if test is already sent
            if (campaign.testStatus === 'testing' || campaign.testStatus === 'completed') {
                throw new common_1.BadRequestException('Cannot delete A/B test that has been sent');
            }
            // Delete variants (cascade will handle this, but being explicit)
            await this.variantRepo.remove(campaign.variants);
            // Reset campaign A/B test fields
            campaign.isAbTest = false;
            campaign.testType = '';
            campaign.winnerCriteria = '';
            campaign.autoSelectWinner = true;
            campaign.winnerSelectionDate = new Date();
            campaign.selectedWinnerId = '';
            campaign.testDuration = 0;
            campaign.testStatus = 'draft';
            await this.campaignRepo.save(campaign);
            this.logger.log(`Deleted A/B test for campaign ${campaignId}`);
        }
        /**
         * Distribute subscribers to variants based on split percentages
         */
        distributeToVariants(subscribers, variants) {
            const distributions = [];
            let currentIndex = 0;
            // Sort variants by label to ensure consistent distribution
            const sortedVariants = [...variants].sort((a, b) => a.variantLabel.localeCompare(b.variantLabel));
            for (let i = 0; i < sortedVariants.length; i++) {
                const variant = sortedVariants[i];
                let count;
                // For the last variant, assign all remaining subscribers
                if (i === sortedVariants.length - 1) {
                    count = subscribers.length - currentIndex;
                }
                else {
                    count = Math.floor(subscribers.length * (variant.splitPercentage / 100));
                }
                const assigned = subscribers.slice(currentIndex, currentIndex + count);
                currentIndex += count;
                distributions.push({ variant, subscribers: assigned });
            }
            return distributions;
        }
        /**
         * Fisher-Yates shuffle algorithm for randomization
         */
        shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
    };
    return AbTestService = _classThis;
})();
exports.AbTestService = AbTestService;
//# sourceMappingURL=ab-test.service.js.map