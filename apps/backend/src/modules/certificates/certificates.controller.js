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
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let CertificatesController = (() => {
    let _classDecorators = [(0, common_1.Controller)('certificates')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createV2_decorators;
    let _findAllV2_decorators;
    let _getStatistics_decorators;
    let _findOneV2_decorators;
    let _updateV2_decorators;
    let _removeV2_decorators;
    let _generatePdfV2_decorators;
    let _sendEmailV2_decorators;
    let _generateAndSendV2_decorators;
    let _createTemplate_decorators;
    let _findAllTemplates_decorators;
    let _findOneTemplate_decorators;
    let _updateTemplate_decorators;
    let _removeTemplate_decorators;
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _generatePdf_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _bulkImport_decorators;
    var CertificatesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createV2_decorators = [(0, common_1.Post)('v2')];
            _findAllV2_decorators = [(0, common_1.Get)('v2')];
            _getStatistics_decorators = [(0, common_1.Get)('v2/statistics')];
            _findOneV2_decorators = [(0, common_1.Get)('v2/:id')];
            _updateV2_decorators = [(0, common_1.Patch)('v2/:id')];
            _removeV2_decorators = [(0, common_1.Delete)('v2/:id')];
            _generatePdfV2_decorators = [(0, common_1.Post)('v2/:id/generate-pdf')];
            _sendEmailV2_decorators = [(0, common_1.Post)('v2/:id/send-email')];
            _generateAndSendV2_decorators = [(0, common_1.Post)('v2/:id/generate-and-send')];
            _createTemplate_decorators = [(0, common_1.Post)('templates')];
            _findAllTemplates_decorators = [(0, common_1.Get)('templates')];
            _findOneTemplate_decorators = [(0, common_1.Get)('templates/:id')];
            _updateTemplate_decorators = [(0, common_1.Patch)('templates/:id')];
            _removeTemplate_decorators = [(0, common_1.Delete)('templates/:id')];
            _create_decorators = [(0, common_1.Post)(), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
            _findAll_decorators = [(0, common_1.Get)()];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _generatePdf_decorators = [(0, common_1.Get)(':id/pdf')];
            _update_decorators = [(0, common_1.Patch)(':id'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
            _remove_decorators = [(0, common_1.Delete)(':id')];
            _bulkImport_decorators = [(0, common_1.Post)('bulk-import')];
            __esDecorate(this, null, _createV2_decorators, { kind: "method", name: "createV2", static: false, private: false, access: { has: obj => "createV2" in obj, get: obj => obj.createV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAllV2_decorators, { kind: "method", name: "findAllV2", static: false, private: false, access: { has: obj => "findAllV2" in obj, get: obj => obj.findAllV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: obj => "getStatistics" in obj, get: obj => obj.getStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOneV2_decorators, { kind: "method", name: "findOneV2", static: false, private: false, access: { has: obj => "findOneV2" in obj, get: obj => obj.findOneV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateV2_decorators, { kind: "method", name: "updateV2", static: false, private: false, access: { has: obj => "updateV2" in obj, get: obj => obj.updateV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeV2_decorators, { kind: "method", name: "removeV2", static: false, private: false, access: { has: obj => "removeV2" in obj, get: obj => obj.removeV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generatePdfV2_decorators, { kind: "method", name: "generatePdfV2", static: false, private: false, access: { has: obj => "generatePdfV2" in obj, get: obj => obj.generatePdfV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _sendEmailV2_decorators, { kind: "method", name: "sendEmailV2", static: false, private: false, access: { has: obj => "sendEmailV2" in obj, get: obj => obj.sendEmailV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateAndSendV2_decorators, { kind: "method", name: "generateAndSendV2", static: false, private: false, access: { has: obj => "generateAndSendV2" in obj, get: obj => obj.generateAndSendV2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createTemplate_decorators, { kind: "method", name: "createTemplate", static: false, private: false, access: { has: obj => "createTemplate" in obj, get: obj => obj.createTemplate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAllTemplates_decorators, { kind: "method", name: "findAllTemplates", static: false, private: false, access: { has: obj => "findAllTemplates" in obj, get: obj => obj.findAllTemplates }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOneTemplate_decorators, { kind: "method", name: "findOneTemplate", static: false, private: false, access: { has: obj => "findOneTemplate" in obj, get: obj => obj.findOneTemplate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateTemplate_decorators, { kind: "method", name: "updateTemplate", static: false, private: false, access: { has: obj => "updateTemplate" in obj, get: obj => obj.updateTemplate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeTemplate_decorators, { kind: "method", name: "removeTemplate", static: false, private: false, access: { has: obj => "removeTemplate" in obj, get: obj => obj.removeTemplate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generatePdf_decorators, { kind: "method", name: "generatePdf", static: false, private: false, access: { has: obj => "generatePdf" in obj, get: obj => obj.generatePdf }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkImport_decorators, { kind: "method", name: "bulkImport", static: false, private: false, access: { has: obj => "bulkImport" in obj, get: obj => obj.bulkImport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CertificatesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        certificatesService = __runInitializers(this, _instanceExtraInitializers);
        certificatesServiceV2;
        constructor(certificatesService, certificatesServiceV2) {
            this.certificatesService = certificatesService;
            this.certificatesServiceV2 = certificatesServiceV2;
        }
        // ============ CERTIFICATE ENDPOINTS (V2) ============
        createV2(dto) {
            return this.certificatesServiceV2.createCertificate(dto);
        }
        findAllV2(userId) {
            return this.certificatesServiceV2.findAllCertificates(userId);
        }
        getStatistics(userId) {
            return this.certificatesServiceV2.getStatistics(userId);
        }
        findOneV2(id) {
            return this.certificatesServiceV2.findOneCertificate(id);
        }
        updateV2(id, dto) {
            return this.certificatesServiceV2.updateCertificate(id, dto);
        }
        removeV2(id) {
            return this.certificatesServiceV2.deleteCertificate(id);
        }
        async generatePdfV2(id, dto = {}) {
            const pdfUrl = await this.certificatesServiceV2.generatePdf(id, dto.regenerate);
            return { pdfUrl };
        }
        async sendEmailV2(id) {
            await this.certificatesServiceV2.sendEmail(id);
            return { message: 'Email sent successfully' };
        }
        async generateAndSendV2(id, dto) {
            const result = await this.certificatesServiceV2.generateAndSendCertificate(id, {
                sendEmail: dto.sendEmail,
                regenerate: dto.regenerate,
            });
            return result;
        }
        // ============ TEMPLATE ENDPOINTS ============
        createTemplate(dto) {
            return this.certificatesServiceV2.createTemplate(dto);
        }
        findAllTemplates() {
            return this.certificatesServiceV2.findAllTemplates();
        }
        findOneTemplate(id) {
            return this.certificatesServiceV2.findOneTemplate(id);
        }
        updateTemplate(id, dto) {
            return this.certificatesServiceV2.updateTemplate(id, dto);
        }
        removeTemplate(id) {
            return this.certificatesServiceV2.deleteTemplate(id);
        }
        // ============ OLD ENDPOINTS (Backward Compatibility) ============
        create(file, createCertificateDto) {
            return this.certificatesService.create(file, createCertificateDto);
        }
        findAll(userId) {
            return this.certificatesService.findAll(userId);
        }
        findOne(id) {
            return this.certificatesService.findOne(id);
        }
        async generatePdf(id) {
            try {
                const fileUrl = await this.certificatesService.generateCertificatePdf(id);
                return { fileUrl };
            }
            catch (error) {
                throw error;
            }
        }
        update(id, file, updateCertificateDto) {
            return this.certificatesService.update(id, file, updateCertificateDto);
        }
        remove(id) {
            return this.certificatesService.remove(id);
        }
        async bulkImport(certificates) {
            return this.certificatesService.bulkImport(certificates);
        }
    };
    return CertificatesController = _classThis;
})();
exports.CertificatesController = CertificatesController;
//# sourceMappingURL=certificates.controller.js.map