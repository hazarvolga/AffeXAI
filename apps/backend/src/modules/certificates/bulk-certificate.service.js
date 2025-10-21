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
exports.BulkCertificateService = void 0;
const common_1 = require("@nestjs/common");
const certificate_entity_1 = require("./entities/certificate.entity");
let BulkCertificateService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BulkCertificateService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkCertificateService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        certificateRepository;
        constructor(certificateRepository) {
            this.certificateRepository = certificateRepository;
        }
        /**
         * Generate certificates for multiple participants based on event configuration
         */
        async generateForEvent(eventId, eventTitle, config, participants) {
            if (!participants || participants.length === 0) {
                throw new common_1.BadRequestException('No participants provided');
            }
            if (!config.templateId) {
                throw new common_1.BadRequestException('Certificate template is required');
            }
            // Calculate validity date if needed
            const validUntil = config.validityDays
                ? new Date(Date.now() + config.validityDays * 24 * 60 * 60 * 1000)
                : null;
            // Create certificate data for each participant
            const certificatesData = participants.map((participant) => ({
                recipientName: participant.recipientName,
                recipientEmail: participant.recipientEmail,
                trainingTitle: eventTitle,
                description: config.description || `${eventTitle} etkinliğine katılım sertifikasıdır.`,
                templateId: config.templateId,
                logoMediaId: config.logoMediaId,
                userId: participant.userId || null,
                eventId: eventId,
                issuedAt: new Date(),
                validUntil: validUntil,
                status: certificate_entity_1.CertificateStatus.ISSUED,
            }));
            // Bulk insert
            const certificates = this.certificateRepository.create(certificatesData);
            const savedCertificates = await this.certificateRepository.save(certificates);
            return savedCertificates;
        }
        /**
         * Generate certificate for single participant
         */
        async generateSingle(eventId, eventTitle, config, participant) {
            const certificates = await this.generateForEvent(eventId, eventTitle, config, [participant]);
            return certificates[0];
        }
        /**
         * Check if certificate already exists for participant in event
         */
        async certificateExists(eventId, recipientEmail) {
            const count = await this.certificateRepository.count({
                where: {
                    eventId,
                    recipientEmail,
                },
            });
            return count > 0;
        }
        /**
         * Get all certificates for an event
         */
        async getCertificatesForEvent(eventId) {
            return this.certificateRepository.find({
                where: { eventId },
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get certificate statistics for event
         */
        async getEventCertificateStats(eventId) {
            const certificates = await this.getCertificatesForEvent(eventId);
            return {
                total: certificates.length,
                issued: certificates.filter(c => c.status === certificate_entity_1.CertificateStatus.ISSUED).length,
                sent: certificates.filter(c => c.status === certificate_entity_1.CertificateStatus.SENT).length,
                draft: certificates.filter(c => c.status === certificate_entity_1.CertificateStatus.DRAFT).length,
            };
        }
    };
    return BulkCertificateService = _classThis;
})();
exports.BulkCertificateService = BulkCertificateService;
//# sourceMappingURL=bulk-certificate.service.js.map