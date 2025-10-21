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
exports.SLATrackingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for SLA tracking information
 */
let SLATrackingDto = (() => {
    let _slaFirstResponseDueAt_decorators;
    let _slaFirstResponseDueAt_initializers = [];
    let _slaFirstResponseDueAt_extraInitializers = [];
    let _slaResolutionDueAt_decorators;
    let _slaResolutionDueAt_initializers = [];
    let _slaResolutionDueAt_extraInitializers = [];
    let _isSLABreached_decorators;
    let _isSLABreached_initializers = [];
    let _isSLABreached_extraInitializers = [];
    let _responseTimeHours_decorators;
    let _responseTimeHours_initializers = [];
    let _responseTimeHours_extraInitializers = [];
    let _resolutionTimeHours_decorators;
    let _resolutionTimeHours_initializers = [];
    let _resolutionTimeHours_extraInitializers = [];
    return class SLATrackingDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _slaFirstResponseDueAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Deadline for first response',
                    example: '2024-01-01T12:00:00.000Z',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _slaResolutionDueAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Deadline for resolution',
                    example: '2024-01-05T12:00:00.000Z',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _isSLABreached_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether SLA has been breached',
                    example: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _responseTimeHours_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Actual response time in hours',
                    example: 2,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _resolutionTimeHours_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Actual resolution time in hours',
                    example: 24,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _slaFirstResponseDueAt_decorators, { kind: "field", name: "slaFirstResponseDueAt", static: false, private: false, access: { has: obj => "slaFirstResponseDueAt" in obj, get: obj => obj.slaFirstResponseDueAt, set: (obj, value) => { obj.slaFirstResponseDueAt = value; } }, metadata: _metadata }, _slaFirstResponseDueAt_initializers, _slaFirstResponseDueAt_extraInitializers);
            __esDecorate(null, null, _slaResolutionDueAt_decorators, { kind: "field", name: "slaResolutionDueAt", static: false, private: false, access: { has: obj => "slaResolutionDueAt" in obj, get: obj => obj.slaResolutionDueAt, set: (obj, value) => { obj.slaResolutionDueAt = value; } }, metadata: _metadata }, _slaResolutionDueAt_initializers, _slaResolutionDueAt_extraInitializers);
            __esDecorate(null, null, _isSLABreached_decorators, { kind: "field", name: "isSLABreached", static: false, private: false, access: { has: obj => "isSLABreached" in obj, get: obj => obj.isSLABreached, set: (obj, value) => { obj.isSLABreached = value; } }, metadata: _metadata }, _isSLABreached_initializers, _isSLABreached_extraInitializers);
            __esDecorate(null, null, _responseTimeHours_decorators, { kind: "field", name: "responseTimeHours", static: false, private: false, access: { has: obj => "responseTimeHours" in obj, get: obj => obj.responseTimeHours, set: (obj, value) => { obj.responseTimeHours = value; } }, metadata: _metadata }, _responseTimeHours_initializers, _responseTimeHours_extraInitializers);
            __esDecorate(null, null, _resolutionTimeHours_decorators, { kind: "field", name: "resolutionTimeHours", static: false, private: false, access: { has: obj => "resolutionTimeHours" in obj, get: obj => obj.resolutionTimeHours, set: (obj, value) => { obj.resolutionTimeHours = value; } }, metadata: _metadata }, _resolutionTimeHours_initializers, _resolutionTimeHours_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        slaFirstResponseDueAt = __runInitializers(this, _slaFirstResponseDueAt_initializers, void 0);
        slaResolutionDueAt = (__runInitializers(this, _slaFirstResponseDueAt_extraInitializers), __runInitializers(this, _slaResolutionDueAt_initializers, void 0));
        isSLABreached = (__runInitializers(this, _slaResolutionDueAt_extraInitializers), __runInitializers(this, _isSLABreached_initializers, void 0));
        responseTimeHours = (__runInitializers(this, _isSLABreached_extraInitializers), __runInitializers(this, _responseTimeHours_initializers, void 0));
        resolutionTimeHours = (__runInitializers(this, _responseTimeHours_extraInitializers), __runInitializers(this, _resolutionTimeHours_initializers, void 0));
        constructor() {
            __runInitializers(this, _resolutionTimeHours_extraInitializers);
        }
    };
})();
exports.SLATrackingDto = SLATrackingDto;
//# sourceMappingURL=sla-tracking.dto.js.map