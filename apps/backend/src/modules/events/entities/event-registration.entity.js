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
exports.EventRegistration = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
let EventRegistration = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('event_registrations')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _event_decorators;
    let _event_initializers = [];
    let _event_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _amountPaid_decorators;
    let _amountPaid_initializers = [];
    let _amountPaid_extraInitializers = [];
    let _paymentDetails_decorators;
    let _paymentDetails_initializers = [];
    let _paymentDetails_extraInitializers = [];
    let _checkedInAt_decorators;
    let _checkedInAt_initializers = [];
    let _checkedInAt_extraInitializers = [];
    let _additionalInfo_decorators;
    let _additionalInfo_initializers = [];
    let _additionalInfo_extraInitializers = [];
    var EventRegistration = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _user_decorators = [(0, typeorm_1.ManyToOne)('User', 'id')];
            _event_decorators = [(0, typeorm_1.ManyToOne)('Event', 'id')];
            _status_decorators = [(0, typeorm_1.Column)({ default: 'pending' })];
            _amountPaid_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
            _paymentDetails_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _checkedInAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _additionalInfo_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: obj => "amountPaid" in obj, get: obj => obj.amountPaid, set: (obj, value) => { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
            __esDecorate(null, null, _paymentDetails_decorators, { kind: "field", name: "paymentDetails", static: false, private: false, access: { has: obj => "paymentDetails" in obj, get: obj => obj.paymentDetails, set: (obj, value) => { obj.paymentDetails = value; } }, metadata: _metadata }, _paymentDetails_initializers, _paymentDetails_extraInitializers);
            __esDecorate(null, null, _checkedInAt_decorators, { kind: "field", name: "checkedInAt", static: false, private: false, access: { has: obj => "checkedInAt" in obj, get: obj => obj.checkedInAt, set: (obj, value) => { obj.checkedInAt = value; } }, metadata: _metadata }, _checkedInAt_initializers, _checkedInAt_extraInitializers);
            __esDecorate(null, null, _additionalInfo_decorators, { kind: "field", name: "additionalInfo", static: false, private: false, access: { has: obj => "additionalInfo" in obj, get: obj => obj.additionalInfo, set: (obj, value) => { obj.additionalInfo = value; } }, metadata: _metadata }, _additionalInfo_initializers, _additionalInfo_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EventRegistration = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        user = __runInitializers(this, _user_initializers, void 0);
        event = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _event_initializers, void 0));
        status = (__runInitializers(this, _event_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        amountPaid = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
        paymentDetails = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentDetails_initializers, void 0));
        checkedInAt = (__runInitializers(this, _paymentDetails_extraInitializers), __runInitializers(this, _checkedInAt_initializers, void 0));
        additionalInfo = (__runInitializers(this, _checkedInAt_extraInitializers), __runInitializers(this, _additionalInfo_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _additionalInfo_extraInitializers);
        }
    };
    return EventRegistration = _classThis;
})();
exports.EventRegistration = EventRegistration;
//# sourceMappingURL=event-registration.entity.js.map