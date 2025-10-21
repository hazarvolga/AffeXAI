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
exports.EmailCampaignController = void 0;
const common_1 = require("@nestjs/common");
let EmailCampaignController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-campaigns')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _sendCampaign_decorators;
    let _getCampaignStats_decorators;
    let _scheduleCampaign_decorators;
    let _cancelSchedule_decorators;
    let _rescheduleCampaign_decorators;
    let _getScheduledCampaigns_decorators;
    let _getSchedulingStats_decorators;
    var EmailCampaignController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)()];
            _findAll_decorators = [(0, common_1.Get)()];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _update_decorators = [(0, common_1.Patch)(':id')];
            _remove_decorators = [(0, common_1.Delete)(':id')];
            _sendCampaign_decorators = [(0, common_1.Post)(':id/send')];
            _getCampaignStats_decorators = [(0, common_1.Get)(':id/stats')];
            _scheduleCampaign_decorators = [(0, common_1.Post)(':id/schedule')];
            _cancelSchedule_decorators = [(0, common_1.Post)(':id/cancel-schedule')];
            _rescheduleCampaign_decorators = [(0, common_1.Post)(':id/reschedule')];
            _getScheduledCampaigns_decorators = [(0, common_1.Get)('scheduled/list')];
            _getSchedulingStats_decorators = [(0, common_1.Get)('scheduled/stats')];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendCampaign_decorators, { kind: "method", name: "sendCampaign", static: false, private: false, access: { has: obj => "sendCampaign" in obj, get: obj => obj.sendCampaign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCampaignStats_decorators, { kind: "method", name: "getCampaignStats", static: false, private: false, access: { has: obj => "getCampaignStats" in obj, get: obj => obj.getCampaignStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _scheduleCampaign_decorators, { kind: "method", name: "scheduleCampaign", static: false, private: false, access: { has: obj => "scheduleCampaign" in obj, get: obj => obj.scheduleCampaign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cancelSchedule_decorators, { kind: "method", name: "cancelSchedule", static: false, private: false, access: { has: obj => "cancelSchedule" in obj, get: obj => obj.cancelSchedule }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _rescheduleCampaign_decorators, { kind: "method", name: "rescheduleCampaign", static: false, private: false, access: { has: obj => "rescheduleCampaign" in obj, get: obj => obj.rescheduleCampaign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getScheduledCampaigns_decorators, { kind: "method", name: "getScheduledCampaigns", static: false, private: false, access: { has: obj => "getScheduledCampaigns" in obj, get: obj => obj.getScheduledCampaigns }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSchedulingStats_decorators, { kind: "method", name: "getSchedulingStats", static: false, private: false, access: { has: obj => "getSchedulingStats" in obj, get: obj => obj.getSchedulingStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailCampaignController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        campaignService = __runInitializers(this, _instanceExtraInitializers);
        schedulerService;
        constructor(campaignService, schedulerService) {
            this.campaignService = campaignService;
            this.schedulerService = schedulerService;
        }
        async create(createCampaignDto) {
            return await this.campaignService.create(createCampaignDto);
        }
        async findAll() {
            return await this.campaignService.findAll();
        }
        async findOne(id) {
            return await this.campaignService.findOne(id);
        }
        async update(id, updateCampaignDto) {
            return await this.campaignService.update(id, updateCampaignDto);
        }
        async remove(id) {
            return await this.campaignService.remove(id);
        }
        async sendCampaign(id) {
            await this.campaignService.sendCampaign(id);
            return { message: 'Campaign queued for sending' };
        }
        async getCampaignStats(id) {
            return await this.campaignService.getCampaignStats(id);
        }
        async scheduleCampaign(id, body) {
            const scheduledAt = new Date(body.scheduledAt);
            return await this.schedulerService.scheduleCampaign(id, scheduledAt);
        }
        async cancelSchedule(id) {
            return await this.schedulerService.cancelScheduledCampaign(id);
        }
        async rescheduleCampaign(id, body) {
            const newScheduledAt = new Date(body.scheduledAt);
            return await this.schedulerService.rescheduleCampaign(id, newScheduledAt);
        }
        async getScheduledCampaigns() {
            return await this.schedulerService.getScheduledCampaigns();
        }
        async getSchedulingStats() {
            return await this.schedulerService.getSchedulingStats();
        }
    };
    return EmailCampaignController = _classThis;
})();
exports.EmailCampaignController = EmailCampaignController;
//# sourceMappingURL=email-campaign.controller.js.map