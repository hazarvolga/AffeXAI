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
exports.CreateSubscriberDto = void 0;
const class_validator_1 = require("class-validator");
const shared_types_1 = require("@affexai/shared-types");
let CreateSubscriberDto = (() => {
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    let _segments_decorators;
    let _segments_initializers = [];
    let _segments_extraInitializers = [];
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _firstName_extraInitializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _lastName_extraInitializers = [];
    let _company_decorators;
    let _company_initializers = [];
    let _company_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _customerStatus_decorators;
    let _customerStatus_initializers = [];
    let _customerStatus_extraInitializers = [];
    let _subscriptionType_decorators;
    let _subscriptionType_initializers = [];
    let _subscriptionType_extraInitializers = [];
    let _mailerCheckResult_decorators;
    let _mailerCheckResult_initializers = [];
    let _mailerCheckResult_extraInitializers = [];
    let _location_decorators;
    let _location_initializers = [];
    let _location_extraInitializers = [];
    let _sent_decorators;
    let _sent_initializers = [];
    let _sent_extraInitializers = [];
    let _opens_decorators;
    let _opens_initializers = [];
    let _opens_extraInitializers = [];
    let _clicks_decorators;
    let _clicks_initializers = [];
    let _clicks_extraInitializers = [];
    return class CreateSubscriberDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            _status_decorators = [(0, class_validator_1.IsEnum)(shared_types_1.SubscriberStatus), (0, class_validator_1.IsOptional)()];
            _groups_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)()];
            _segments_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)()];
            _firstName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _lastName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _company_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _phone_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _customerStatus_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _subscriptionType_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _mailerCheckResult_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _location_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _sent_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _opens_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _clicks_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _groups_decorators, { kind: "field", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(null, null, _segments_decorators, { kind: "field", name: "segments", static: false, private: false, access: { has: obj => "segments" in obj, get: obj => obj.segments, set: (obj, value) => { obj.segments = value; } }, metadata: _metadata }, _segments_initializers, _segments_extraInitializers);
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: obj => "company" in obj, get: obj => obj.company, set: (obj, value) => { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _customerStatus_decorators, { kind: "field", name: "customerStatus", static: false, private: false, access: { has: obj => "customerStatus" in obj, get: obj => obj.customerStatus, set: (obj, value) => { obj.customerStatus = value; } }, metadata: _metadata }, _customerStatus_initializers, _customerStatus_extraInitializers);
            __esDecorate(null, null, _subscriptionType_decorators, { kind: "field", name: "subscriptionType", static: false, private: false, access: { has: obj => "subscriptionType" in obj, get: obj => obj.subscriptionType, set: (obj, value) => { obj.subscriptionType = value; } }, metadata: _metadata }, _subscriptionType_initializers, _subscriptionType_extraInitializers);
            __esDecorate(null, null, _mailerCheckResult_decorators, { kind: "field", name: "mailerCheckResult", static: false, private: false, access: { has: obj => "mailerCheckResult" in obj, get: obj => obj.mailerCheckResult, set: (obj, value) => { obj.mailerCheckResult = value; } }, metadata: _metadata }, _mailerCheckResult_initializers, _mailerCheckResult_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: obj => "location" in obj, get: obj => obj.location, set: (obj, value) => { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _sent_decorators, { kind: "field", name: "sent", static: false, private: false, access: { has: obj => "sent" in obj, get: obj => obj.sent, set: (obj, value) => { obj.sent = value; } }, metadata: _metadata }, _sent_initializers, _sent_extraInitializers);
            __esDecorate(null, null, _opens_decorators, { kind: "field", name: "opens", static: false, private: false, access: { has: obj => "opens" in obj, get: obj => obj.opens, set: (obj, value) => { obj.opens = value; } }, metadata: _metadata }, _opens_initializers, _opens_extraInitializers);
            __esDecorate(null, null, _clicks_decorators, { kind: "field", name: "clicks", static: false, private: false, access: { has: obj => "clicks" in obj, get: obj => obj.clicks, set: (obj, value) => { obj.clicks = value; } }, metadata: _metadata }, _clicks_initializers, _clicks_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        email = __runInitializers(this, _email_initializers, void 0);
        status = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        groups = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
        segments = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _segments_initializers, void 0));
        firstName = (__runInitializers(this, _segments_extraInitializers), __runInitializers(this, _firstName_initializers, void 0));
        lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
        company = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _company_initializers, void 0));
        phone = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
        customerStatus = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _customerStatus_initializers, void 0));
        subscriptionType = (__runInitializers(this, _customerStatus_extraInitializers), __runInitializers(this, _subscriptionType_initializers, void 0));
        mailerCheckResult = (__runInitializers(this, _subscriptionType_extraInitializers), __runInitializers(this, _mailerCheckResult_initializers, void 0));
        location = (__runInitializers(this, _mailerCheckResult_extraInitializers), __runInitializers(this, _location_initializers, void 0));
        sent = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _sent_initializers, void 0));
        opens = (__runInitializers(this, _sent_extraInitializers), __runInitializers(this, _opens_initializers, void 0));
        clicks = (__runInitializers(this, _opens_extraInitializers), __runInitializers(this, _clicks_initializers, void 0));
        constructor() {
            __runInitializers(this, _clicks_extraInitializers);
        }
    };
})();
exports.CreateSubscriberDto = CreateSubscriberDto;
//# sourceMappingURL=create-subscriber.dto.js.map