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
exports.TicketCSAT = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const ticket_entity_1 = require("./ticket.entity");
/**
 * TicketCSAT Entity
 * Customer Satisfaction survey responses for resolved tickets
 */
let TicketCSAT = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ticket_csat')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _ticketId_decorators;
    let _ticketId_initializers = [];
    let _ticketId_extraInitializers = [];
    let _ticket_decorators;
    let _ticket_initializers = [];
    let _ticket_extraInitializers = [];
    let _customerId_decorators;
    let _customerId_initializers = [];
    let _customerId_extraInitializers = [];
    let _customer_decorators;
    let _customer_initializers = [];
    let _customer_extraInitializers = [];
    let _rating_decorators;
    let _rating_initializers = [];
    let _rating_extraInitializers = [];
    let _feedback_decorators;
    let _feedback_initializers = [];
    let _feedback_extraInitializers = [];
    let _surveyToken_decorators;
    let _surveyToken_initializers = [];
    let _surveyToken_extraInitializers = [];
    let _surveyRequestedAt_decorators;
    let _surveyRequestedAt_initializers = [];
    let _surveyRequestedAt_extraInitializers = [];
    let _surveyCompletedAt_decorators;
    let _surveyCompletedAt_initializers = [];
    let _surveyCompletedAt_extraInitializers = [];
    let _ipAddress_decorators;
    let _ipAddress_initializers = [];
    let _ipAddress_extraInitializers = [];
    let _userAgent_decorators;
    let _userAgent_initializers = [];
    let _userAgent_extraInitializers = [];
    let _responses_decorators;
    let _responses_initializers = [];
    let _responses_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    var TicketCSAT = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _ticketId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _ticket_decorators = [(0, typeorm_1.ManyToOne)(() => ticket_entity_1.Ticket, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'ticketId' })];
            _customerId_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
            _customer_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User), (0, typeorm_1.JoinColumn)({ name: 'customerId' })];
            _rating_decorators = [(0, typeorm_1.Column)({ type: 'integer' })];
            _feedback_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _surveyToken_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true })];
            _surveyRequestedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _surveyCompletedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _ipAddress_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true })];
            _userAgent_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true })];
            _responses_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _ticketId_decorators, { kind: "field", name: "ticketId", static: false, private: false, access: { has: obj => "ticketId" in obj, get: obj => obj.ticketId, set: (obj, value) => { obj.ticketId = value; } }, metadata: _metadata }, _ticketId_initializers, _ticketId_extraInitializers);
            __esDecorate(null, null, _ticket_decorators, { kind: "field", name: "ticket", static: false, private: false, access: { has: obj => "ticket" in obj, get: obj => obj.ticket, set: (obj, value) => { obj.ticket = value; } }, metadata: _metadata }, _ticket_initializers, _ticket_extraInitializers);
            __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: obj => "customerId" in obj, get: obj => obj.customerId, set: (obj, value) => { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
            __esDecorate(null, null, _customer_decorators, { kind: "field", name: "customer", static: false, private: false, access: { has: obj => "customer" in obj, get: obj => obj.customer, set: (obj, value) => { obj.customer = value; } }, metadata: _metadata }, _customer_initializers, _customer_extraInitializers);
            __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: obj => "rating" in obj, get: obj => obj.rating, set: (obj, value) => { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
            __esDecorate(null, null, _feedback_decorators, { kind: "field", name: "feedback", static: false, private: false, access: { has: obj => "feedback" in obj, get: obj => obj.feedback, set: (obj, value) => { obj.feedback = value; } }, metadata: _metadata }, _feedback_initializers, _feedback_extraInitializers);
            __esDecorate(null, null, _surveyToken_decorators, { kind: "field", name: "surveyToken", static: false, private: false, access: { has: obj => "surveyToken" in obj, get: obj => obj.surveyToken, set: (obj, value) => { obj.surveyToken = value; } }, metadata: _metadata }, _surveyToken_initializers, _surveyToken_extraInitializers);
            __esDecorate(null, null, _surveyRequestedAt_decorators, { kind: "field", name: "surveyRequestedAt", static: false, private: false, access: { has: obj => "surveyRequestedAt" in obj, get: obj => obj.surveyRequestedAt, set: (obj, value) => { obj.surveyRequestedAt = value; } }, metadata: _metadata }, _surveyRequestedAt_initializers, _surveyRequestedAt_extraInitializers);
            __esDecorate(null, null, _surveyCompletedAt_decorators, { kind: "field", name: "surveyCompletedAt", static: false, private: false, access: { has: obj => "surveyCompletedAt" in obj, get: obj => obj.surveyCompletedAt, set: (obj, value) => { obj.surveyCompletedAt = value; } }, metadata: _metadata }, _surveyCompletedAt_initializers, _surveyCompletedAt_extraInitializers);
            __esDecorate(null, null, _ipAddress_decorators, { kind: "field", name: "ipAddress", static: false, private: false, access: { has: obj => "ipAddress" in obj, get: obj => obj.ipAddress, set: (obj, value) => { obj.ipAddress = value; } }, metadata: _metadata }, _ipAddress_initializers, _ipAddress_extraInitializers);
            __esDecorate(null, null, _userAgent_decorators, { kind: "field", name: "userAgent", static: false, private: false, access: { has: obj => "userAgent" in obj, get: obj => obj.userAgent, set: (obj, value) => { obj.userAgent = value; } }, metadata: _metadata }, _userAgent_initializers, _userAgent_extraInitializers);
            __esDecorate(null, null, _responses_decorators, { kind: "field", name: "responses", static: false, private: false, access: { has: obj => "responses" in obj, get: obj => obj.responses, set: (obj, value) => { obj.responses = value; } }, metadata: _metadata }, _responses_initializers, _responses_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketCSAT = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        ticketId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ticketId_initializers, void 0));
        ticket = (__runInitializers(this, _ticketId_extraInitializers), __runInitializers(this, _ticket_initializers, void 0));
        customerId = (__runInitializers(this, _ticket_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
        customer = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _customer_initializers, void 0));
        // Rating (1-5 stars)
        rating = (__runInitializers(this, _customer_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
        // Optional text feedback
        feedback = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _feedback_initializers, void 0));
        // Survey metadata
        surveyToken = (__runInitializers(this, _feedback_extraInitializers), __runInitializers(this, _surveyToken_initializers, void 0)); // Unique token for public access
        surveyRequestedAt = (__runInitializers(this, _surveyToken_extraInitializers), __runInitializers(this, _surveyRequestedAt_initializers, void 0)); // When survey was sent
        surveyCompletedAt = (__runInitializers(this, _surveyRequestedAt_extraInitializers), __runInitializers(this, _surveyCompletedAt_initializers, void 0)); // When customer responded
        ipAddress = (__runInitializers(this, _surveyCompletedAt_extraInitializers), __runInitializers(this, _ipAddress_initializers, void 0)); // For spam prevention
        userAgent = (__runInitializers(this, _ipAddress_extraInitializers), __runInitializers(this, _userAgent_initializers, void 0)); // Browser info
        // Survey questions (extensible)
        responses = (__runInitializers(this, _userAgent_extraInitializers), __runInitializers(this, _responses_initializers, void 0)); // Additional question responses
        createdAt = (__runInitializers(this, _responses_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
    return TicketCSAT = _classThis;
})();
exports.TicketCSAT = TicketCSAT;
//# sourceMappingURL=ticket-csat.entity.js.map