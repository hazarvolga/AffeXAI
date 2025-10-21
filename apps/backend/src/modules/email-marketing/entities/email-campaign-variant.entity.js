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
exports.EmailCampaignVariant = exports.VariantStatus = void 0;
const typeorm_1 = require("typeorm");
const email_campaign_entity_1 = require("./email-campaign.entity");
var VariantStatus;
(function (VariantStatus) {
    VariantStatus["DRAFT"] = "draft";
    VariantStatus["TESTING"] = "testing";
    VariantStatus["WINNER"] = "winner";
    VariantStatus["LOSER"] = "loser";
})(VariantStatus || (exports.VariantStatus = VariantStatus = {}));
/**
 * Email Campaign Variant Entity
 * Represents different versions of an email campaign for A/B testing
 */
let EmailCampaignVariant = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_campaign_variants')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _campaignId_decorators;
    let _campaignId_initializers = [];
    let _campaignId_extraInitializers = [];
    let _campaign_decorators;
    let _campaign_initializers = [];
    let _campaign_extraInitializers = [];
    let _variantLabel_decorators;
    let _variantLabel_initializers = [];
    let _variantLabel_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _fromName_decorators;
    let _fromName_initializers = [];
    let _fromName_extraInitializers = [];
    let _sendTimeOffset_decorators;
    let _sendTimeOffset_initializers = [];
    let _sendTimeOffset_extraInitializers = [];
    let _splitPercentage_decorators;
    let _splitPercentage_initializers = [];
    let _splitPercentage_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _sentCount_decorators;
    let _sentCount_initializers = [];
    let _sentCount_extraInitializers = [];
    let _openedCount_decorators;
    let _openedCount_initializers = [];
    let _openedCount_extraInitializers = [];
    let _clickedCount_decorators;
    let _clickedCount_initializers = [];
    let _clickedCount_extraInitializers = [];
    let _conversionCount_decorators;
    let _conversionCount_initializers = [];
    let _conversionCount_extraInitializers = [];
    let _revenue_decorators;
    let _revenue_initializers = [];
    let _revenue_extraInitializers = [];
    let _bounceCount_decorators;
    let _bounceCount_initializers = [];
    let _bounceCount_extraInitializers = [];
    let _unsubscribeCount_decorators;
    let _unsubscribeCount_initializers = [];
    let _unsubscribeCount_extraInitializers = [];
    let _openRate_decorators;
    let _openRate_initializers = [];
    let _openRate_extraInitializers = [];
    let _clickRate_decorators;
    let _clickRate_initializers = [];
    let _clickRate_extraInitializers = [];
    let _conversionRate_decorators;
    let _conversionRate_initializers = [];
    let _conversionRate_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _calculateRates_decorators;
    var EmailCampaignVariant = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _campaignId_decorators = [(0, typeorm_1.Column)('uuid')];
            _campaign_decorators = [(0, typeorm_1.ManyToOne)(() => email_campaign_entity_1.EmailCampaign, (campaign) => campaign.variants, {
                    onDelete: 'CASCADE',
                }), (0, typeorm_1.JoinColumn)({ name: 'campaignId' })];
            _variantLabel_decorators = [(0, typeorm_1.Column)({ length: 1, comment: 'A, B, C, D, or E' })];
            _subject_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 255 })];
            _content_decorators = [(0, typeorm_1.Column)('text', { nullable: true })];
            _fromName_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 100 })];
            _sendTimeOffset_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true, comment: 'Minutes offset from base send time' })];
            _splitPercentage_decorators = [(0, typeorm_1.Column)('decimal', {
                    precision: 5,
                    scale: 2,
                    comment: 'Percentage of recipients (0-100)',
                })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 20,
                    default: VariantStatus.TESTING,
                    comment: 'testing, winner, loser, draft',
                })];
            _sentCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _openedCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _clickedCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _conversionCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _revenue_decorators = [(0, typeorm_1.Column)('decimal', { precision: 12, scale: 2, default: 0 })];
            _bounceCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _unsubscribeCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _openRate_decorators = [(0, typeorm_1.Column)('decimal', {
                    precision: 5,
                    scale: 2,
                    nullable: true,
                    comment: 'Calculated: (openedCount / sentCount) * 100',
                })];
            _clickRate_decorators = [(0, typeorm_1.Column)('decimal', {
                    precision: 5,
                    scale: 2,
                    nullable: true,
                    comment: 'Calculated: (clickedCount / openedCount) * 100',
                })];
            _conversionRate_decorators = [(0, typeorm_1.Column)('decimal', {
                    precision: 5,
                    scale: 2,
                    nullable: true,
                    comment: 'Calculated: (conversionCount / clickedCount) * 100',
                })];
            _metadata_decorators = [(0, typeorm_1.Column)('jsonb', { nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            _calculateRates_decorators = [(0, typeorm_1.BeforeInsert)(), (0, typeorm_1.BeforeUpdate)()];
            __esDecorate(this, null, _calculateRates_decorators, { kind: "method", name: "calculateRates", static: false, private: false, access: { has: obj => "calculateRates" in obj, get: obj => obj.calculateRates }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _campaignId_decorators, { kind: "field", name: "campaignId", static: false, private: false, access: { has: obj => "campaignId" in obj, get: obj => obj.campaignId, set: (obj, value) => { obj.campaignId = value; } }, metadata: _metadata }, _campaignId_initializers, _campaignId_extraInitializers);
            __esDecorate(null, null, _campaign_decorators, { kind: "field", name: "campaign", static: false, private: false, access: { has: obj => "campaign" in obj, get: obj => obj.campaign, set: (obj, value) => { obj.campaign = value; } }, metadata: _metadata }, _campaign_initializers, _campaign_extraInitializers);
            __esDecorate(null, null, _variantLabel_decorators, { kind: "field", name: "variantLabel", static: false, private: false, access: { has: obj => "variantLabel" in obj, get: obj => obj.variantLabel, set: (obj, value) => { obj.variantLabel = value; } }, metadata: _metadata }, _variantLabel_initializers, _variantLabel_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: obj => "fromName" in obj, get: obj => obj.fromName, set: (obj, value) => { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
            __esDecorate(null, null, _sendTimeOffset_decorators, { kind: "field", name: "sendTimeOffset", static: false, private: false, access: { has: obj => "sendTimeOffset" in obj, get: obj => obj.sendTimeOffset, set: (obj, value) => { obj.sendTimeOffset = value; } }, metadata: _metadata }, _sendTimeOffset_initializers, _sendTimeOffset_extraInitializers);
            __esDecorate(null, null, _splitPercentage_decorators, { kind: "field", name: "splitPercentage", static: false, private: false, access: { has: obj => "splitPercentage" in obj, get: obj => obj.splitPercentage, set: (obj, value) => { obj.splitPercentage = value; } }, metadata: _metadata }, _splitPercentage_initializers, _splitPercentage_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _sentCount_decorators, { kind: "field", name: "sentCount", static: false, private: false, access: { has: obj => "sentCount" in obj, get: obj => obj.sentCount, set: (obj, value) => { obj.sentCount = value; } }, metadata: _metadata }, _sentCount_initializers, _sentCount_extraInitializers);
            __esDecorate(null, null, _openedCount_decorators, { kind: "field", name: "openedCount", static: false, private: false, access: { has: obj => "openedCount" in obj, get: obj => obj.openedCount, set: (obj, value) => { obj.openedCount = value; } }, metadata: _metadata }, _openedCount_initializers, _openedCount_extraInitializers);
            __esDecorate(null, null, _clickedCount_decorators, { kind: "field", name: "clickedCount", static: false, private: false, access: { has: obj => "clickedCount" in obj, get: obj => obj.clickedCount, set: (obj, value) => { obj.clickedCount = value; } }, metadata: _metadata }, _clickedCount_initializers, _clickedCount_extraInitializers);
            __esDecorate(null, null, _conversionCount_decorators, { kind: "field", name: "conversionCount", static: false, private: false, access: { has: obj => "conversionCount" in obj, get: obj => obj.conversionCount, set: (obj, value) => { obj.conversionCount = value; } }, metadata: _metadata }, _conversionCount_initializers, _conversionCount_extraInitializers);
            __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: obj => "revenue" in obj, get: obj => obj.revenue, set: (obj, value) => { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
            __esDecorate(null, null, _bounceCount_decorators, { kind: "field", name: "bounceCount", static: false, private: false, access: { has: obj => "bounceCount" in obj, get: obj => obj.bounceCount, set: (obj, value) => { obj.bounceCount = value; } }, metadata: _metadata }, _bounceCount_initializers, _bounceCount_extraInitializers);
            __esDecorate(null, null, _unsubscribeCount_decorators, { kind: "field", name: "unsubscribeCount", static: false, private: false, access: { has: obj => "unsubscribeCount" in obj, get: obj => obj.unsubscribeCount, set: (obj, value) => { obj.unsubscribeCount = value; } }, metadata: _metadata }, _unsubscribeCount_initializers, _unsubscribeCount_extraInitializers);
            __esDecorate(null, null, _openRate_decorators, { kind: "field", name: "openRate", static: false, private: false, access: { has: obj => "openRate" in obj, get: obj => obj.openRate, set: (obj, value) => { obj.openRate = value; } }, metadata: _metadata }, _openRate_initializers, _openRate_extraInitializers);
            __esDecorate(null, null, _clickRate_decorators, { kind: "field", name: "clickRate", static: false, private: false, access: { has: obj => "clickRate" in obj, get: obj => obj.clickRate, set: (obj, value) => { obj.clickRate = value; } }, metadata: _metadata }, _clickRate_initializers, _clickRate_extraInitializers);
            __esDecorate(null, null, _conversionRate_decorators, { kind: "field", name: "conversionRate", static: false, private: false, access: { has: obj => "conversionRate" in obj, get: obj => obj.conversionRate, set: (obj, value) => { obj.conversionRate = value; } }, metadata: _metadata }, _conversionRate_initializers, _conversionRate_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailCampaignVariant = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
        campaignId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _campaignId_initializers, void 0));
        campaign = (__runInitializers(this, _campaignId_extraInitializers), __runInitializers(this, _campaign_initializers, void 0));
        variantLabel = (__runInitializers(this, _campaign_extraInitializers), __runInitializers(this, _variantLabel_initializers, void 0));
        // Content fields
        subject = (__runInitializers(this, _variantLabel_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        fromName = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
        sendTimeOffset = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _sendTimeOffset_initializers, void 0));
        // Configuration
        splitPercentage = (__runInitializers(this, _sendTimeOffset_extraInitializers), __runInitializers(this, _splitPercentage_initializers, void 0));
        status = (__runInitializers(this, _splitPercentage_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        // Performance metrics
        sentCount = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _sentCount_initializers, void 0));
        openedCount = (__runInitializers(this, _sentCount_extraInitializers), __runInitializers(this, _openedCount_initializers, void 0));
        clickedCount = (__runInitializers(this, _openedCount_extraInitializers), __runInitializers(this, _clickedCount_initializers, void 0));
        conversionCount = (__runInitializers(this, _clickedCount_extraInitializers), __runInitializers(this, _conversionCount_initializers, void 0));
        revenue = (__runInitializers(this, _conversionCount_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
        bounceCount = (__runInitializers(this, _revenue_extraInitializers), __runInitializers(this, _bounceCount_initializers, void 0));
        unsubscribeCount = (__runInitializers(this, _bounceCount_extraInitializers), __runInitializers(this, _unsubscribeCount_initializers, void 0));
        // Calculated rates (stored for performance)
        openRate = (__runInitializers(this, _unsubscribeCount_extraInitializers), __runInitializers(this, _openRate_initializers, void 0));
        clickRate = (__runInitializers(this, _openRate_extraInitializers), __runInitializers(this, _clickRate_initializers, void 0));
        conversionRate = (__runInitializers(this, _clickRate_extraInitializers), __runInitializers(this, _conversionRate_initializers, void 0));
        // Metadata
        metadata = (__runInitializers(this, _conversionRate_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        // Lifecycle hooks to calculate rates
        calculateRates() {
            // Open rate: opens / sent
            if (this.sentCount > 0) {
                this.openRate = Number(((this.openedCount / this.sentCount) * 100).toFixed(2));
            }
            else {
                this.openRate = 0;
            }
            // Click rate: clicks / opens
            if (this.openedCount > 0) {
                this.clickRate = Number(((this.clickedCount / this.openedCount) * 100).toFixed(2));
            }
            else {
                this.clickRate = 0;
            }
            // Conversion rate: conversions / clicks
            if (this.clickedCount > 0) {
                this.conversionRate = Number(((this.conversionCount / this.clickedCount) * 100).toFixed(2));
            }
            else {
                this.conversionRate = 0;
            }
        }
        /**
         * Get the rate for a specific metric
         */
        getRate(metric) {
            switch (metric) {
                case 'open':
                    return this.openRate || 0;
                case 'click':
                    return this.clickRate || 0;
                case 'conversion':
                    return this.conversionRate || 0;
                default:
                    return 0;
            }
        }
        /**
         * Increment a metric count
         */
        incrementMetric(metric) {
            switch (metric) {
                case 'sent':
                    this.sentCount++;
                    break;
                case 'opened':
                    this.openedCount++;
                    break;
                case 'clicked':
                    this.clickedCount++;
                    break;
                case 'conversion':
                    this.conversionCount++;
                    break;
                case 'bounce':
                    this.bounceCount++;
                    break;
                case 'unsubscribe':
                    this.unsubscribeCount++;
                    break;
            }
            this.calculateRates();
        }
        /**
         * Check if variant is the winner
         */
        isWinner() {
            return this.status === VariantStatus.WINNER;
        }
        /**
         * Check if variant has minimum sample size
         */
        hasMinimumSample(minSize) {
            return this.sentCount >= minSize;
        }
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return EmailCampaignVariant = _classThis;
})();
exports.EmailCampaignVariant = EmailCampaignVariant;
//# sourceMappingURL=email-campaign-variant.entity.js.map