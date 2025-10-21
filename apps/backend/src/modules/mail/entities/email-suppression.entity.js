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
exports.EmailSuppression = void 0;
const typeorm_1 = require("typeorm");
const webhook_event_interface_1 = require("../interfaces/webhook-event.interface");
/**
 * Email suppression list
 * Bounce, complaint, unsubscribe olan email'leri saklar
 * Bu listede olan emaillere email gönderilmez
 *
 * Note: Index'ler migration'da oluşturulur (1760427888000-CreateEmailSuppressionTable.ts)
 */
let EmailSuppression = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('email_suppressions')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _reason_decorators;
    let _reason_initializers = [];
    let _reason_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _eventType_decorators;
    let _eventType_initializers = [];
    let _eventType_extraInitializers = [];
    let _bounceReason_decorators;
    let _bounceReason_initializers = [];
    let _bounceReason_extraInitializers = [];
    let _suppressedAt_decorators;
    let _suppressedAt_initializers = [];
    let _suppressedAt_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    var EmailSuppression = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
            _email_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
            _reason_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
            _provider_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50 })];
            _eventType_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: webhook_event_interface_1.EmailWebhookEventType,
                })];
            _bounceReason_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: webhook_event_interface_1.BounceReason,
                    nullable: true,
                })];
            _suppressedAt_decorators = [(0, typeorm_1.CreateDateColumn)({ type: 'timestamp' })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: obj => "reason" in obj, get: obj => obj.reason, set: (obj, value) => { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _eventType_decorators, { kind: "field", name: "eventType", static: false, private: false, access: { has: obj => "eventType" in obj, get: obj => obj.eventType, set: (obj, value) => { obj.eventType = value; } }, metadata: _metadata }, _eventType_initializers, _eventType_extraInitializers);
            __esDecorate(null, null, _bounceReason_decorators, { kind: "field", name: "bounceReason", static: false, private: false, access: { has: obj => "bounceReason" in obj, get: obj => obj.bounceReason, set: (obj, value) => { obj.bounceReason = value; } }, metadata: _metadata }, _bounceReason_initializers, _bounceReason_extraInitializers);
            __esDecorate(null, null, _suppressedAt_decorators, { kind: "field", name: "suppressedAt", static: false, private: false, access: { has: obj => "suppressedAt" in obj, get: obj => obj.suppressedAt, set: (obj, value) => { obj.suppressedAt = value; } }, metadata: _metadata }, _suppressedAt_initializers, _suppressedAt_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EmailSuppression = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        email = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        reason = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
        provider = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        eventType = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _eventType_initializers, void 0));
        bounceReason = (__runInitializers(this, _eventType_extraInitializers), __runInitializers(this, _bounceReason_initializers, void 0));
        suppressedAt = (__runInitializers(this, _bounceReason_extraInitializers), __runInitializers(this, _suppressedAt_initializers, void 0));
        metadata = (__runInitializers(this, _suppressedAt_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
    return EmailSuppression = _classThis;
})();
exports.EmailSuppression = EmailSuppression;
//# sourceMappingURL=email-suppression.entity.js.map