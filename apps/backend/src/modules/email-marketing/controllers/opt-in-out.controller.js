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
exports.OptInOutController = void 0;
const common_1 = require("@nestjs/common");
let OptInOutController = (() => {
    let _classDecorators = [(0, common_1.Controller)('email-marketing/subscription')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _subscribe_decorators;
    let _confirmOptIn_decorators;
    let _unsubscribeWithToken_decorators;
    let _resubscribe_decorators;
    let _updatePreferences_decorators;
    let _getPreferences_decorators;
    let _canReceiveMarketingEmails_decorators;
    let _canReceiveTransactionalEmails_decorators;
    var OptInOutController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subscribe_decorators = [(0, common_1.Post)('subscribe'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            _confirmOptIn_decorators = [(0, common_1.Get)('confirm/:token')];
            _unsubscribeWithToken_decorators = [(0, common_1.Get)('unsubscribe/:token')];
            _resubscribe_decorators = [(0, common_1.Post)('resubscribe'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
            _updatePreferences_decorators = [(0, common_1.Put)('preferences')];
            _getPreferences_decorators = [(0, common_1.Get)('preferences/:email')];
            _canReceiveMarketingEmails_decorators = [(0, common_1.Get)('can-receive-marketing/:email')];
            _canReceiveTransactionalEmails_decorators = [(0, common_1.Get)('can-receive-transactional/:email')];
            __esDecorate(this, null, _subscribe_decorators, { kind: "method", name: "subscribe", static: false, private: false, access: { has: obj => "subscribe" in obj, get: obj => obj.subscribe }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _confirmOptIn_decorators, { kind: "method", name: "confirmOptIn", static: false, private: false, access: { has: obj => "confirmOptIn" in obj, get: obj => obj.confirmOptIn }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _unsubscribeWithToken_decorators, { kind: "method", name: "unsubscribeWithToken", static: false, private: false, access: { has: obj => "unsubscribeWithToken" in obj, get: obj => obj.unsubscribeWithToken }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resubscribe_decorators, { kind: "method", name: "resubscribe", static: false, private: false, access: { has: obj => "resubscribe" in obj, get: obj => obj.resubscribe }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePreferences_decorators, { kind: "method", name: "updatePreferences", static: false, private: false, access: { has: obj => "updatePreferences" in obj, get: obj => obj.updatePreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPreferences_decorators, { kind: "method", name: "getPreferences", static: false, private: false, access: { has: obj => "getPreferences" in obj, get: obj => obj.getPreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _canReceiveMarketingEmails_decorators, { kind: "method", name: "canReceiveMarketingEmails", static: false, private: false, access: { has: obj => "canReceiveMarketingEmails" in obj, get: obj => obj.canReceiveMarketingEmails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _canReceiveTransactionalEmails_decorators, { kind: "method", name: "canReceiveTransactionalEmails", static: false, private: false, access: { has: obj => "canReceiveTransactionalEmails" in obj, get: obj => obj.canReceiveTransactionalEmails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OptInOutController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        optInOutService = __runInitializers(this, _instanceExtraInitializers);
        constructor(optInOutService) {
            this.optInOutService = optInOutService;
        }
        /**
         * Subscribe with double opt-in
         */
        async subscribe(body, req) {
            const ipAddress = req?.ip || req?.headers['x-forwarded-for'] || 'unknown';
            return this.optInOutService.subscribeWithDoubleOptIn(body.email, {
                firstName: body.firstName,
                lastName: body.lastName,
                company: body.company,
                marketingEmails: body.marketingEmails,
            }, ipAddress);
        }
        /**
         * Confirm opt-in via email token
         */
        async confirmOptIn(token, req) {
            const ipAddress = req?.ip || req?.headers['x-forwarded-for'] || 'unknown';
            return this.optInOutService.confirmOptIn(token, ipAddress);
        }
        /**
         * Unsubscribe via token (one-click)
         */
        async unsubscribeWithToken(token, reason, req) {
            const ipAddress = req?.ip || req?.headers['x-forwarded-for'] || 'unknown';
            return this.optInOutService.unsubscribeWithToken(token, reason, ipAddress);
        }
        /**
         * Re-subscribe
         */
        async resubscribe(email, req) {
            const ipAddress = req?.ip || req?.headers['x-forwarded-for'] || 'unknown';
            return this.optInOutService.resubscribe(email, ipAddress);
        }
        /**
         * Update preferences
         */
        async updatePreferences(body) {
            return this.optInOutService.updatePreferences(body.email, {
                marketingEmails: body.marketingEmails,
                emailNotifications: body.emailNotifications,
            });
        }
        /**
         * Get preferences
         */
        async getPreferences(email) {
            return this.optInOutService.getPreferences(email);
        }
        /**
         * Check if can receive marketing emails
         */
        async canReceiveMarketingEmails(email) {
            const canReceive = await this.optInOutService.canReceiveMarketingEmails(email);
            return { email, canReceive };
        }
        /**
         * Check if can receive transactional emails
         */
        async canReceiveTransactionalEmails(email) {
            const canReceive = await this.optInOutService.canReceiveTransactionalEmails(email);
            return { email, canReceive };
        }
    };
    return OptInOutController = _classThis;
})();
exports.OptInOutController = OptInOutController;
//# sourceMappingURL=opt-in-out.controller.js.map