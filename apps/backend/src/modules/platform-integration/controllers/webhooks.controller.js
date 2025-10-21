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
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
/**
 * Webhooks Controller
 *
 * CRUD operations for webhooks and webhook testing.
 */
let WebhooksController = (() => {
    let _classDecorators = [(0, common_1.Controller)('automation/webhooks')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAll_decorators;
    let _findActive_decorators;
    let _findOne_decorators;
    let _create_decorators;
    let _update_decorators;
    let _delete_decorators;
    let _test_decorators;
    let _getStats_decorators;
    let _getOverallStats_decorators;
    var WebhooksController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)()];
            _findActive_decorators = [(0, common_1.Get)('active')];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _create_decorators = [(0, common_1.Post)()];
            _update_decorators = [(0, common_1.Put)(':id')];
            _delete_decorators = [(0, common_1.Delete)(':id')];
            _test_decorators = [(0, common_1.Post)(':id/test')];
            _getStats_decorators = [(0, common_1.Get)(':id/stats')];
            _getOverallStats_decorators = [(0, common_1.Get)('stats/overall')];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findActive_decorators, { kind: "method", name: "findActive", static: false, private: false, access: { has: obj => "findActive" in obj, get: obj => obj.findActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _test_decorators, { kind: "method", name: "test", static: false, private: false, access: { has: obj => "test" in obj, get: obj => obj.test }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getOverallStats_decorators, { kind: "method", name: "getOverallStats", static: false, private: false, access: { has: obj => "getOverallStats" in obj, get: obj => obj.getOverallStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WebhooksController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        webhookService = __runInitializers(this, _instanceExtraInitializers);
        constructor(webhookService) {
            this.webhookService = webhookService;
        }
        /**
         * Get all webhooks
         */
        async findAll() {
            return this.webhookService.findAll();
        }
        /**
         * Get active webhooks
         */
        async findActive() {
            return this.webhookService.findActive();
        }
        /**
         * Get webhook by ID
         */
        async findOne(id) {
            return this.webhookService.findOne(id);
        }
        /**
         * Create new webhook
         */
        async create(data) {
            return this.webhookService.create(data);
        }
        /**
         * Update webhook
         */
        async update(id, data) {
            return this.webhookService.update(id, data);
        }
        /**
         * Delete webhook (soft delete)
         */
        async delete(id) {
            await this.webhookService.delete(id);
            return { success: true };
        }
        /**
         * Test webhook connection
         */
        async test(id) {
            return this.webhookService.testWebhook(id);
        }
        /**
         * Get webhook statistics
         */
        async getStats(id) {
            return this.webhookService.getWebhookStats(id);
        }
        /**
         * Get overall webhook statistics
         */
        async getOverallStats() {
            return this.webhookService.getOverallStats();
        }
    };
    return WebhooksController = _classThis;
})();
exports.WebhooksController = WebhooksController;
//# sourceMappingURL=webhooks.controller.js.map