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
exports.DataSubjectRequest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const gdpr_compliance_service_1 = require("../services/gdpr-compliance.service");
let DataSubjectRequest = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('data_subject_requests')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _requestType_decorators;
    let _requestType_initializers = [];
    let _requestType_extraInitializers = [];
    let _requestDate_decorators;
    let _requestDate_initializers = [];
    let _requestDate_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _completionDate_decorators;
    let _completionDate_initializers = [];
    let _completionDate_extraInitializers = [];
    let _verificationMethod_decorators;
    let _verificationMethod_initializers = [];
    let _verificationMethod_extraInitializers = [];
    let _requestDetails_decorators;
    let _requestDetails_initializers = [];
    let _requestDetails_extraInitializers = [];
    let _responseData_decorators;
    let _responseData_initializers = [];
    let _responseData_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _verificationToken_decorators;
    let _verificationToken_initializers = [];
    let _verificationToken_extraInitializers = [];
    let _verificationExpiry_decorators;
    let _verificationExpiry_initializers = [];
    let _verificationExpiry_extraInitializers = [];
    let _verified_decorators;
    let _verified_initializers = [];
    let _verified_extraInitializers = [];
    var DataSubjectRequest = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _email_decorators = [(0, typeorm_1.Column)()];
            _requestType_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.DataSubjectRequestType })];
            _requestDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: gdpr_compliance_service_1.RequestStatus })];
            _completionDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _verificationMethod_decorators = [(0, typeorm_1.Column)()];
            _requestDetails_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _responseData_decorators = [(0, typeorm_1.Column)({ type: 'json', nullable: true })];
            _notes_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _verificationToken_decorators = [(0, typeorm_1.Column)({ nullable: true })];
            _verificationExpiry_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _verified_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _requestType_decorators, { kind: "field", name: "requestType", static: false, private: false, access: { has: obj => "requestType" in obj, get: obj => obj.requestType, set: (obj, value) => { obj.requestType = value; } }, metadata: _metadata }, _requestType_initializers, _requestType_extraInitializers);
            __esDecorate(null, null, _requestDate_decorators, { kind: "field", name: "requestDate", static: false, private: false, access: { has: obj => "requestDate" in obj, get: obj => obj.requestDate, set: (obj, value) => { obj.requestDate = value; } }, metadata: _metadata }, _requestDate_initializers, _requestDate_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _completionDate_decorators, { kind: "field", name: "completionDate", static: false, private: false, access: { has: obj => "completionDate" in obj, get: obj => obj.completionDate, set: (obj, value) => { obj.completionDate = value; } }, metadata: _metadata }, _completionDate_initializers, _completionDate_extraInitializers);
            __esDecorate(null, null, _verificationMethod_decorators, { kind: "field", name: "verificationMethod", static: false, private: false, access: { has: obj => "verificationMethod" in obj, get: obj => obj.verificationMethod, set: (obj, value) => { obj.verificationMethod = value; } }, metadata: _metadata }, _verificationMethod_initializers, _verificationMethod_extraInitializers);
            __esDecorate(null, null, _requestDetails_decorators, { kind: "field", name: "requestDetails", static: false, private: false, access: { has: obj => "requestDetails" in obj, get: obj => obj.requestDetails, set: (obj, value) => { obj.requestDetails = value; } }, metadata: _metadata }, _requestDetails_initializers, _requestDetails_extraInitializers);
            __esDecorate(null, null, _responseData_decorators, { kind: "field", name: "responseData", static: false, private: false, access: { has: obj => "responseData" in obj, get: obj => obj.responseData, set: (obj, value) => { obj.responseData = value; } }, metadata: _metadata }, _responseData_initializers, _responseData_extraInitializers);
            __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(null, null, _verificationToken_decorators, { kind: "field", name: "verificationToken", static: false, private: false, access: { has: obj => "verificationToken" in obj, get: obj => obj.verificationToken, set: (obj, value) => { obj.verificationToken = value; } }, metadata: _metadata }, _verificationToken_initializers, _verificationToken_extraInitializers);
            __esDecorate(null, null, _verificationExpiry_decorators, { kind: "field", name: "verificationExpiry", static: false, private: false, access: { has: obj => "verificationExpiry" in obj, get: obj => obj.verificationExpiry, set: (obj, value) => { obj.verificationExpiry = value; } }, metadata: _metadata }, _verificationExpiry_initializers, _verificationExpiry_extraInitializers);
            __esDecorate(null, null, _verified_decorators, { kind: "field", name: "verified", static: false, private: false, access: { has: obj => "verified" in obj, get: obj => obj.verified, set: (obj, value) => { obj.verified = value; } }, metadata: _metadata }, _verified_initializers, _verified_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DataSubjectRequest = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        email = __runInitializers(this, _email_initializers, void 0);
        requestType = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _requestType_initializers, void 0));
        requestDate = (__runInitializers(this, _requestType_extraInitializers), __runInitializers(this, _requestDate_initializers, void 0));
        status = (__runInitializers(this, _requestDate_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        completionDate = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _completionDate_initializers, void 0));
        verificationMethod = (__runInitializers(this, _completionDate_extraInitializers), __runInitializers(this, _verificationMethod_initializers, void 0));
        requestDetails = (__runInitializers(this, _verificationMethod_extraInitializers), __runInitializers(this, _requestDetails_initializers, void 0));
        responseData = (__runInitializers(this, _requestDetails_extraInitializers), __runInitializers(this, _responseData_initializers, void 0));
        notes = (__runInitializers(this, _responseData_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
        verificationToken = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _verificationToken_initializers, void 0));
        verificationExpiry = (__runInitializers(this, _verificationToken_extraInitializers), __runInitializers(this, _verificationExpiry_initializers, void 0));
        verified = (__runInitializers(this, _verificationExpiry_extraInitializers), __runInitializers(this, _verified_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _verified_extraInitializers);
        }
    };
    return DataSubjectRequest = _classThis;
})();
exports.DataSubjectRequest = DataSubjectRequest;
//# sourceMappingURL=data-subject-request.entity.js.map