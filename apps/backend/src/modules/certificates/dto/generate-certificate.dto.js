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
exports.GenerateCertificateDto = void 0;
const class_validator_1 = require("class-validator");
let GenerateCertificateDto = (() => {
    let _certificateId_decorators;
    let _certificateId_initializers = [];
    let _certificateId_extraInitializers = [];
    let _sendEmail_decorators;
    let _sendEmail_initializers = [];
    let _sendEmail_extraInitializers = [];
    let _regenerate_decorators;
    let _regenerate_initializers = [];
    let _regenerate_extraInitializers = [];
    return class GenerateCertificateDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _certificateId_decorators = [(0, class_validator_1.IsUUID)()];
            _sendEmail_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _regenerate_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _certificateId_decorators, { kind: "field", name: "certificateId", static: false, private: false, access: { has: obj => "certificateId" in obj, get: obj => obj.certificateId, set: (obj, value) => { obj.certificateId = value; } }, metadata: _metadata }, _certificateId_initializers, _certificateId_extraInitializers);
            __esDecorate(null, null, _sendEmail_decorators, { kind: "field", name: "sendEmail", static: false, private: false, access: { has: obj => "sendEmail" in obj, get: obj => obj.sendEmail, set: (obj, value) => { obj.sendEmail = value; } }, metadata: _metadata }, _sendEmail_initializers, _sendEmail_extraInitializers);
            __esDecorate(null, null, _regenerate_decorators, { kind: "field", name: "regenerate", static: false, private: false, access: { has: obj => "regenerate" in obj, get: obj => obj.regenerate, set: (obj, value) => { obj.regenerate = value; } }, metadata: _metadata }, _regenerate_initializers, _regenerate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        certificateId = __runInitializers(this, _certificateId_initializers, void 0);
        sendEmail = (__runInitializers(this, _certificateId_extraInitializers), __runInitializers(this, _sendEmail_initializers, void 0));
        regenerate = (__runInitializers(this, _sendEmail_extraInitializers), __runInitializers(this, _regenerate_initializers, void 0)); // Force regenerate even if PDF exists
        constructor() {
            __runInitializers(this, _regenerate_extraInitializers);
        }
    };
})();
exports.GenerateCertificateDto = GenerateCertificateDto;
//# sourceMappingURL=generate-certificate.dto.js.map