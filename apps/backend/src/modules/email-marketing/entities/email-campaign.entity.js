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
exports.EmailCampaign = void 0;
const typeorm_1 = require("typeorm");
const email_log_entity_1 = require("./email-log.entity");
const email_campaign_variant_entity_1 = require("./email-campaign-variant.entity");
let EmailCampaign = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_campaigns')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _scheduledAt_decorators;
    let _scheduledAt_initializers = [];
    let _scheduledAt_extraInitializers = [];
    let _sentAt_decorators;
    let _sentAt_initializers = [];
    let _sentAt_extraInitializers = [];
    let _totalRecipients_decorators;
    let _totalRecipients_initializers = [];
    let _totalRecipients_extraInitializers = [];
    let _sentCount_decorators;
    let _sentCount_initializers = [];
    let _sentCount_extraInitializers = [];
    let _openedCount_decorators;
    let _openedCount_initializers = [];
    let _openedCount_extraInitializers = [];
    let _clickedCount_decorators;
    let _clickedCount_initializers = [];
    let _clickedCount_extraInitializers = [];
    let _bounceCount_decorators;
    let _bounceCount_initializers = [];
    let _bounceCount_extraInitializers = [];
    let _isAbTest_decorators;
    let _isAbTest_initializers = [];
    let _isAbTest_extraInitializers = [];
    let _testType_decorators;
    let _testType_initializers = [];
    let _testType_extraInitializers = [];
    let _winnerCriteria_decorators;
    let _winnerCriteria_initializers = [];
    let _winnerCriteria_extraInitializers = [];
    let _autoSelectWinner_decorators;
    let _autoSelectWinner_initializers = [];
    let _autoSelectWinner_extraInitializers = [];
    let _winnerSelectionDate_decorators;
    let _winnerSelectionDate_initializers = [];
    let _winnerSelectionDate_extraInitializers = [];
    let _selectedWinnerId_decorators;
    let _selectedWinnerId_initializers = [];
    let _selectedWinnerId_extraInitializers = [];
    let _selectedWinner_decorators;
    let _selectedWinner_initializers = [];
    let _selectedWinner_extraInitializers = [];
    let _testDuration_decorators;
    let _testDuration_initializers = [];
    let _testDuration_extraInitializers = [];
    let _confidenceLevel_decorators;
    let _confidenceLevel_initializers = [];
    let _confidenceLevel_extraInitializers = [];
    let _minSampleSize_decorators;
    let _minSampleSize_initializers = [];
    let _minSampleSize_extraInitializers = [];
    let _testStatus_decorators;
    let _testStatus_initializers = [];
    let _testStatus_extraInitializers = [];
    let _variants_decorators;
    let _variants_initializers = [];
    let _variants_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    let _logs_decorators;
    let _logs_initializers = [];
    let _logs_extraInitializers = [];
    var EmailCampaign = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _name_decorators = [(0, typeorm_1.Column)()];
            _subject_decorators = [(0, typeorm_1.Column)()];
            _content_decorators = [(0, typeorm_1.Column)('text')];
            _status_decorators = [(0, typeorm_1.Column)({ default: 'draft' })];
            _scheduledAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _sentAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _totalRecipients_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _sentCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _openedCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _clickedCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _bounceCount_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
            _isAbTest_decorators = [(0, typeorm_1.Column)({ default: false })];
            _testType_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 50, comment: 'subject, content, send_time, from_name, combined' })];
            _winnerCriteria_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 50, comment: 'open_rate, click_rate, conversion_rate, revenue' })];
            _autoSelectWinner_decorators = [(0, typeorm_1.Column)({ default: true })];
            _winnerSelectionDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _selectedWinnerId_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _selectedWinner_decorators = [(0, typeorm_1.ManyToOne)(() => email_campaign_variant_entity_1.EmailCampaignVariant, { nullable: true, onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'selectedWinnerId' })];
            _testDuration_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true, comment: 'Duration in hours' })];
            _confidenceLevel_decorators = [(0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 95.0, comment: '95%, 99%, etc.' })];
            _minSampleSize_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 100, comment: 'Minimum sends per variant' })];
            _testStatus_decorators = [(0, typeorm_1.Column)({ nullable: true, length: 20, default: 'draft', comment: 'draft, testing, completed, winner_sent' })];
            _variants_decorators = [(0, typeorm_1.OneToMany)(() => email_campaign_variant_entity_1.EmailCampaignVariant, (variant) => variant.campaign)];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            _logs_decorators = [(0, typeorm_1.OneToMany)(() => email_log_entity_1.EmailLog, log => log.campaign)];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _scheduledAt_decorators, { kind: "field", name: "scheduledAt", static: false, private: false, access: { has: obj => "scheduledAt" in obj, get: obj => obj.scheduledAt, set: (obj, value) => { obj.scheduledAt = value; } }, metadata: _metadata }, _scheduledAt_initializers, _scheduledAt_extraInitializers);
            __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: obj => "sentAt" in obj, get: obj => obj.sentAt, set: (obj, value) => { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
            __esDecorate(null, null, _totalRecipients_decorators, { kind: "field", name: "totalRecipients", static: false, private: false, access: { has: obj => "totalRecipients" in obj, get: obj => obj.totalRecipients, set: (obj, value) => { obj.totalRecipients = value; } }, metadata: _metadata }, _totalRecipients_initializers, _totalRecipients_extraInitializers);
            __esDecorate(null, null, _sentCount_decorators, { kind: "field", name: "sentCount", static: false, private: false, access: { has: obj => "sentCount" in obj, get: obj => obj.sentCount, set: (obj, value) => { obj.sentCount = value; } }, metadata: _metadata }, _sentCount_initializers, _sentCount_extraInitializers);
            __esDecorate(null, null, _openedCount_decorators, { kind: "field", name: "openedCount", static: false, private: false, access: { has: obj => "openedCount" in obj, get: obj => obj.openedCount, set: (obj, value) => { obj.openedCount = value; } }, metadata: _metadata }, _openedCount_initializers, _openedCount_extraInitializers);
            __esDecorate(null, null, _clickedCount_decorators, { kind: "field", name: "clickedCount", static: false, private: false, access: { has: obj => "clickedCount" in obj, get: obj => obj.clickedCount, set: (obj, value) => { obj.clickedCount = value; } }, metadata: _metadata }, _clickedCount_initializers, _clickedCount_extraInitializers);
            __esDecorate(null, null, _bounceCount_decorators, { kind: "field", name: "bounceCount", static: false, private: false, access: { has: obj => "bounceCount" in obj, get: obj => obj.bounceCount, set: (obj, value) => { obj.bounceCount = value; } }, metadata: _metadata }, _bounceCount_initializers, _bounceCount_extraInitializers);
            __esDecorate(null, null, _isAbTest_decorators, { kind: "field", name: "isAbTest", static: false, private: false, access: { has: obj => "isAbTest" in obj, get: obj => obj.isAbTest, set: (obj, value) => { obj.isAbTest = value; } }, metadata: _metadata }, _isAbTest_initializers, _isAbTest_extraInitializers);
            __esDecorate(null, null, _testType_decorators, { kind: "field", name: "testType", static: false, private: false, access: { has: obj => "testType" in obj, get: obj => obj.testType, set: (obj, value) => { obj.testType = value; } }, metadata: _metadata }, _testType_initializers, _testType_extraInitializers);
            __esDecorate(null, null, _winnerCriteria_decorators, { kind: "field", name: "winnerCriteria", static: false, private: false, access: { has: obj => "winnerCriteria" in obj, get: obj => obj.winnerCriteria, set: (obj, value) => { obj.winnerCriteria = value; } }, metadata: _metadata }, _winnerCriteria_initializers, _winnerCriteria_extraInitializers);
            __esDecorate(null, null, _autoSelectWinner_decorators, { kind: "field", name: "autoSelectWinner", static: false, private: false, access: { has: obj => "autoSelectWinner" in obj, get: obj => obj.autoSelectWinner, set: (obj, value) => { obj.autoSelectWinner = value; } }, metadata: _metadata }, _autoSelectWinner_initializers, _autoSelectWinner_extraInitializers);
            __esDecorate(null, null, _winnerSelectionDate_decorators, { kind: "field", name: "winnerSelectionDate", static: false, private: false, access: { has: obj => "winnerSelectionDate" in obj, get: obj => obj.winnerSelectionDate, set: (obj, value) => { obj.winnerSelectionDate = value; } }, metadata: _metadata }, _winnerSelectionDate_initializers, _winnerSelectionDate_extraInitializers);
            __esDecorate(null, null, _selectedWinnerId_decorators, { kind: "field", name: "selectedWinnerId", static: false, private: false, access: { has: obj => "selectedWinnerId" in obj, get: obj => obj.selectedWinnerId, set: (obj, value) => { obj.selectedWinnerId = value; } }, metadata: _metadata }, _selectedWinnerId_initializers, _selectedWinnerId_extraInitializers);
            __esDecorate(null, null, _selectedWinner_decorators, { kind: "field", name: "selectedWinner", static: false, private: false, access: { has: obj => "selectedWinner" in obj, get: obj => obj.selectedWinner, set: (obj, value) => { obj.selectedWinner = value; } }, metadata: _metadata }, _selectedWinner_initializers, _selectedWinner_extraInitializers);
            __esDecorate(null, null, _testDuration_decorators, { kind: "field", name: "testDuration", static: false, private: false, access: { has: obj => "testDuration" in obj, get: obj => obj.testDuration, set: (obj, value) => { obj.testDuration = value; } }, metadata: _metadata }, _testDuration_initializers, _testDuration_extraInitializers);
            __esDecorate(null, null, _confidenceLevel_decorators, { kind: "field", name: "confidenceLevel", static: false, private: false, access: { has: obj => "confidenceLevel" in obj, get: obj => obj.confidenceLevel, set: (obj, value) => { obj.confidenceLevel = value; } }, metadata: _metadata }, _confidenceLevel_initializers, _confidenceLevel_extraInitializers);
            __esDecorate(null, null, _minSampleSize_decorators, { kind: "field", name: "minSampleSize", static: false, private: false, access: { has: obj => "minSampleSize" in obj, get: obj => obj.minSampleSize, set: (obj, value) => { obj.minSampleSize = value; } }, metadata: _metadata }, _minSampleSize_initializers, _minSampleSize_extraInitializers);
            __esDecorate(null, null, _testStatus_decorators, { kind: "field", name: "testStatus", static: false, private: false, access: { has: obj => "testStatus" in obj, get: obj => obj.testStatus, set: (obj, value) => { obj.testStatus = value; } }, metadata: _metadata }, _testStatus_initializers, _testStatus_extraInitializers);
            __esDecorate(null, null, _variants_decorators, { kind: "field", name: "variants", static: false, private: false, access: { has: obj => "variants" in obj, get: obj => obj.variants, set: (obj, value) => { obj.variants = value; } }, metadata: _metadata }, _variants_initializers, _variants_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _logs_decorators, { kind: "field", name: "logs", static: false, private: false, access: { has: obj => "logs" in obj, get: obj => obj.logs, set: (obj, value) => { obj.logs = value; } }, metadata: _metadata }, _logs_initializers, _logs_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailCampaign = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        subject = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        status = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        scheduledAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _scheduledAt_initializers, void 0));
        sentAt = (__runInitializers(this, _scheduledAt_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
        totalRecipients = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _totalRecipients_initializers, void 0));
        sentCount = (__runInitializers(this, _totalRecipients_extraInitializers), __runInitializers(this, _sentCount_initializers, void 0));
        openedCount = (__runInitializers(this, _sentCount_extraInitializers), __runInitializers(this, _openedCount_initializers, void 0));
        clickedCount = (__runInitializers(this, _openedCount_extraInitializers), __runInitializers(this, _clickedCount_initializers, void 0));
        bounceCount = (__runInitializers(this, _clickedCount_extraInitializers), __runInitializers(this, _bounceCount_initializers, void 0));
        // A/B Testing fields
        isAbTest = (__runInitializers(this, _bounceCount_extraInitializers), __runInitializers(this, _isAbTest_initializers, void 0));
        testType = (__runInitializers(this, _isAbTest_extraInitializers), __runInitializers(this, _testType_initializers, void 0));
        winnerCriteria = (__runInitializers(this, _testType_extraInitializers), __runInitializers(this, _winnerCriteria_initializers, void 0));
        autoSelectWinner = (__runInitializers(this, _winnerCriteria_extraInitializers), __runInitializers(this, _autoSelectWinner_initializers, void 0));
        winnerSelectionDate = (__runInitializers(this, _autoSelectWinner_extraInitializers), __runInitializers(this, _winnerSelectionDate_initializers, void 0));
        selectedWinnerId = (__runInitializers(this, _winnerSelectionDate_extraInitializers), __runInitializers(this, _selectedWinnerId_initializers, void 0));
        selectedWinner = (__runInitializers(this, _selectedWinnerId_extraInitializers), __runInitializers(this, _selectedWinner_initializers, void 0));
        testDuration = (__runInitializers(this, _selectedWinner_extraInitializers), __runInitializers(this, _testDuration_initializers, void 0));
        confidenceLevel = (__runInitializers(this, _testDuration_extraInitializers), __runInitializers(this, _confidenceLevel_initializers, void 0));
        minSampleSize = (__runInitializers(this, _confidenceLevel_extraInitializers), __runInitializers(this, _minSampleSize_initializers, void 0));
        testStatus = (__runInitializers(this, _minSampleSize_extraInitializers), __runInitializers(this, _testStatus_initializers, void 0));
        variants = (__runInitializers(this, _testStatus_extraInitializers), __runInitializers(this, _variants_initializers, void 0));
        metadata = (__runInitializers(this, _variants_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        createdAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        logs = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _logs_initializers, void 0));
        /**
         * Check if campaign is an A/B test
         */
        isAbTestCampaign() {
            return this.isAbTest === true;
        }
        /**
         * Check if A/B test has a winner
         */
        hasWinner() {
            return this.selectedWinnerId !== null && this.selectedWinnerId !== undefined;
        }
        /**
         * Check if A/B test is completed
         */
        isTestCompleted() {
            return this.testStatus === 'completed';
        }
        /**
         * Get the winning variant
         */
        getWinner() {
            if (!this.hasWinner() || !this.variants) {
                return null;
            }
            return this.variants.find(v => v.id === this.selectedWinnerId) || null;
        }
        constructor() {
            __runInitializers(this, _logs_extraInitializers);
        }
    };
    return EmailCampaign = _classThis;
})();
exports.EmailCampaign = EmailCampaign;
//# sourceMappingURL=email-campaign.entity.js.map