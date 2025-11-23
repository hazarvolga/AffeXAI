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
exports.CertificatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const certificates_service_1 = require("./certificates.service");
const certificates_v2_service_1 = require("./certificates-v2.service");
const pdf_generator_service_1 = require("./pdf-generator.service");
const certificate_email_service_1 = require("./certificate-email.service");
const bulk_certificate_service_1 = require("./bulk-certificate.service");
const certificates_controller_1 = require("./certificates.controller");
const certificate_entity_1 = require("./entities/certificate.entity");
const certificate_template_entity_1 = require("./entities/certificate-template.entity");
const users_module_1 = require("../users/users.module");
const media_module_1 = require("../media/media.module");
const platform_integration_module_1 = require("../platform-integration/platform-integration.module");
let CertificatesModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([certificate_entity_1.Certificate, certificate_template_entity_1.CertificateTemplate]),
                users_module_1.UsersModule,
                media_module_1.MediaModule,
                platform_integration_module_1.PlatformIntegrationModule,
            ],
            controllers: [certificates_controller_1.CertificatesController],
            providers: [
                certificates_service_1.CertificatesService, // Keep old service for backward compatibility
                certificates_v2_service_1.CertificatesServiceV2, // New enhanced service
                bulk_certificate_service_1.BulkCertificateService, // Bulk operations for events
                pdf_generator_service_1.PdfGeneratorService,
                certificate_email_service_1.CertificateEmailService,
            ],
            exports: [certificates_service_1.CertificatesService, certificates_v2_service_1.CertificatesServiceV2, bulk_certificate_service_1.BulkCertificateService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CertificatesModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CertificatesModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return CertificatesModule = _classThis;
})();
exports.CertificatesModule = CertificatesModule;
//# sourceMappingURL=certificates.module.js.map