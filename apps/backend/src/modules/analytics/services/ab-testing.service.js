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
exports.ABTestingService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
let ABTestingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ABTestingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ABTestingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        abTestRepository;
        variantRepository;
        constructor(abTestRepository, variantRepository) {
            this.abTestRepository = abTestRepository;
            this.variantRepository = variantRepository;
        }
        /**
         * Create a new A/B test
         */
        async createTest(dto) {
            // Create test
            const test = this.abTestRepository.create({
                name: dto.name,
                description: dto.description || null,
                componentId: dto.componentId,
                componentType: dto.componentType,
                status: dto.status || entities_1.ABTestStatus.DRAFT,
                periodStart: new Date(dto.periodStart),
                periodEnd: dto.periodEnd ? new Date(dto.periodEnd) : null,
                conversionGoal: dto.conversionGoal,
                targetAudience: dto.targetAudience || null,
            });
            const savedTest = await this.abTestRepository.save(test);
            // Create variants
            const variants = dto.variants.map((v) => this.variantRepository.create({
                testId: savedTest.id,
                name: v.name,
                description: v.description || null,
                componentConfig: v.componentConfig,
                trafficAllocation: v.trafficAllocation,
            }));
            await this.variantRepository.save(variants);
            return this.getTestById(savedTest.id);
        }
        /**
         * Get all tests
         */
        async getAllTests(status) {
            const where = status ? { status } : {};
            return this.abTestRepository.find({
                where,
                relations: ['variants'],
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get test by ID
         */
        async getTestById(id) {
            const test = await this.abTestRepository.findOne({
                where: { id },
                relations: ['variants'],
            });
            if (!test) {
                throw new common_1.NotFoundException(`A/B Test with ID ${id} not found`);
            }
            return test;
        }
        /**
         * Update test
         */
        async updateTest(id, dto) {
            const test = await this.getTestById(id);
            if (dto.name)
                test.name = dto.name;
            if (dto.description !== undefined)
                test.description = dto.description;
            if (dto.status)
                test.status = dto.status;
            if (dto.periodEnd)
                test.periodEnd = new Date(dto.periodEnd);
            if (dto.winnerVariantId)
                test.winnerVariantId = dto.winnerVariantId;
            if (dto.confidenceLevel)
                test.confidenceLevel = dto.confidenceLevel;
            await this.abTestRepository.save(test);
            return this.getTestById(id);
        }
        /**
         * Delete test
         */
        async deleteTest(id) {
            const test = await this.getTestById(id);
            await this.abTestRepository.remove(test);
        }
        /**
         * Start test (change status to running)
         */
        async startTest(id) {
            return this.updateTest(id, { status: entities_1.ABTestStatus.RUNNING });
        }
        /**
         * Pause test
         */
        async pauseTest(id) {
            return this.updateTest(id, { status: entities_1.ABTestStatus.PAUSED });
        }
        /**
         * Complete test
         */
        async completeTest(id, winnerVariantId) {
            const updates = {
                status: entities_1.ABTestStatus.COMPLETED,
                periodEnd: new Date().toISOString(),
            };
            if (winnerVariantId) {
                updates.winnerVariantId = winnerVariantId;
            }
            return this.updateTest(id, updates);
        }
        /**
         * Track variant impression
         */
        async trackImpression(variantId) {
            await this.variantRepository.increment({ id: variantId }, 'impressions', 1);
        }
        /**
         * Track variant interaction
         */
        async trackInteraction(variantId) {
            await this.variantRepository.increment({ id: variantId }, 'interactions', 1);
        }
        /**
         * Track variant conversion
         */
        async trackConversion(variantId, engagementTime) {
            const variant = await this.variantRepository.findOne({
                where: { id: variantId },
            });
            if (!variant)
                return;
            // Increment conversion count
            variant.conversions += 1;
            // Update conversion rate
            if (variant.impressions > 0) {
                variant.conversionRate = variant.conversions / variant.impressions;
            }
            // Update average engagement time if provided
            if (engagementTime) {
                const totalTime = variant.averageEngagementTime * (variant.conversions - 1);
                variant.averageEngagementTime = (totalTime + engagementTime) / variant.conversions;
            }
            await this.variantRepository.save(variant);
            // Update test statistical significance
            await this.updateStatisticalSignificance(variant.testId);
        }
        /**
         * Calculate and update statistical significance
         */
        async updateStatisticalSignificance(testId) {
            const test = await this.getTestById(testId);
            if (test.variants.length < 2)
                return;
            // Sort variants by conversion rate
            const sortedVariants = [...test.variants].sort((a, b) => b.conversionRate - a.conversionRate);
            const best = sortedVariants[0];
            const secondBest = sortedVariants[1];
            // Simple z-test for proportions
            const p1 = best.conversionRate;
            const p2 = secondBest.conversionRate;
            const n1 = best.impressions;
            const n2 = secondBest.impressions;
            if (n1 < 30 || n2 < 30) {
                // Not enough sample size
                test.confidenceLevel = 0;
                test.sampleSize = n1 + n2;
                await this.abTestRepository.save(test);
                return;
            }
            // Pooled proportion
            const p = (best.conversions + secondBest.conversions) / (n1 + n2);
            const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));
            if (se === 0) {
                test.confidenceLevel = 0;
                test.sampleSize = n1 + n2;
                await this.abTestRepository.save(test);
                return;
            }
            // Z-score
            const z = Math.abs(p1 - p2) / se;
            // Convert z-score to confidence level (simplified)
            // z > 1.96 = 95% confidence
            // z > 2.58 = 99% confidence
            let confidenceLevel = 0;
            if (z > 2.58) {
                confidenceLevel = 99;
            }
            else if (z > 1.96) {
                confidenceLevel = 95;
            }
            else if (z > 1.645) {
                confidenceLevel = 90;
            }
            else if (z > 1.28) {
                confidenceLevel = 80;
            }
            else {
                confidenceLevel = Math.min(75, z * 50);
            }
            test.confidenceLevel = confidenceLevel;
            test.sampleSize = n1 + n2;
            await this.abTestRepository.save(test);
        }
        /**
         * Get variant for user (traffic allocation logic)
         */
        async getVariantForUser(testId) {
            const test = await this.getTestById(testId);
            if (test.status !== entities_1.ABTestStatus.RUNNING) {
                return null;
            }
            // Random number 0-100
            const random = Math.random() * 100;
            let cumulative = 0;
            // Select variant based on traffic allocation
            for (const variant of test.variants) {
                cumulative += variant.trafficAllocation;
                if (random <= cumulative) {
                    return variant;
                }
            }
            // Fallback to first variant
            return test.variants[0] || null;
        }
    };
    return ABTestingService = _classThis;
})();
exports.ABTestingService = ABTestingService;
//# sourceMappingURL=ab-testing.service.js.map