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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Event = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('events')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _startDate_decorators;
    let _startDate_initializers = [];
    let _startDate_extraInitializers = [];
    let _endDate_decorators;
    let _endDate_initializers = [];
    let _endDate_extraInitializers = [];
    let _location_decorators;
    let _location_initializers = [];
    let _location_extraInitializers = [];
    let _capacity_decorators;
    let _capacity_initializers = [];
    let _capacity_extraInitializers = [];
    let _price_decorators;
    let _price_initializers = [];
    let _price_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _certificateConfig_decorators;
    let _certificateConfig_initializers = [];
    let _certificateConfig_extraInitializers = [];
    let _grantsCertificate_decorators;
    let _grantsCertificate_initializers = [];
    let _grantsCertificate_extraInitializers = [];
    let _certificateTitle_decorators;
    let _certificateTitle_initializers = [];
    let _certificateTitle_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    let _registrations_decorators;
    let _registrations_initializers = [];
    let _registrations_extraInitializers = [];
    var Event = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _title_decorators = [(0, typeorm_1.Column)()];
            _description_decorators = [(0, typeorm_1.Column)('text')];
            _startDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _endDate_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _location_decorators = [(0, typeorm_1.Column)()];
            _capacity_decorators = [(0, typeorm_1.Column)('int')];
            _price_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })];
            _metadata_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _certificateConfig_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _grantsCertificate_decorators = [(0, typeorm_1.Column)({ default: false })];
            _certificateTitle_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({ default: 'draft' })];
            _createdBy_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id, { nullable: true })];
            _registrations_decorators = [(0, typeorm_1.OneToMany)('EventRegistration', 'event')];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: obj => "startDate" in obj, get: obj => obj.startDate, set: (obj, value) => { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: obj => "endDate" in obj, get: obj => obj.endDate, set: (obj, value) => { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: obj => "location" in obj, get: obj => obj.location, set: (obj, value) => { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _capacity_decorators, { kind: "field", name: "capacity", static: false, private: false, access: { has: obj => "capacity" in obj, get: obj => obj.capacity, set: (obj, value) => { obj.capacity = value; } }, metadata: _metadata }, _capacity_initializers, _capacity_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: obj => "price" in obj, get: obj => obj.price, set: (obj, value) => { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _certificateConfig_decorators, { kind: "field", name: "certificateConfig", static: false, private: false, access: { has: obj => "certificateConfig" in obj, get: obj => obj.certificateConfig, set: (obj, value) => { obj.certificateConfig = value; } }, metadata: _metadata }, _certificateConfig_initializers, _certificateConfig_extraInitializers);
            __esDecorate(null, null, _grantsCertificate_decorators, { kind: "field", name: "grantsCertificate", static: false, private: false, access: { has: obj => "grantsCertificate" in obj, get: obj => obj.grantsCertificate, set: (obj, value) => { obj.grantsCertificate = value; } }, metadata: _metadata }, _grantsCertificate_initializers, _grantsCertificate_extraInitializers);
            __esDecorate(null, null, _certificateTitle_decorators, { kind: "field", name: "certificateTitle", static: false, private: false, access: { has: obj => "certificateTitle" in obj, get: obj => obj.certificateTitle, set: (obj, value) => { obj.certificateTitle = value; } }, metadata: _metadata }, _certificateTitle_initializers, _certificateTitle_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, null, _registrations_decorators, { kind: "field", name: "registrations", static: false, private: false, access: { has: obj => "registrations" in obj, get: obj => obj.registrations, set: (obj, value) => { obj.registrations = value; } }, metadata: _metadata }, _registrations_initializers, _registrations_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Event = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        title = __runInitializers(this, _title_initializers, void 0);
        description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        startDate = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
        endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
        location = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _location_initializers, void 0));
        capacity = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _capacity_initializers, void 0));
        price = (__runInitializers(this, _capacity_extraInitializers), __runInitializers(this, _price_initializers, void 0));
        metadata = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        certificateConfig = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _certificateConfig_initializers, void 0));
        grantsCertificate = (__runInitializers(this, _certificateConfig_extraInitializers), __runInitializers(this, _grantsCertificate_initializers, void 0));
        certificateTitle = (__runInitializers(this, _grantsCertificate_extraInitializers), __runInitializers(this, _certificateTitle_initializers, void 0));
        status = (__runInitializers(this, _certificateTitle_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        createdBy = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
        registrations = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _registrations_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _registrations_extraInitializers);
        }
    };
    return Event = _classThis;
})();
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map