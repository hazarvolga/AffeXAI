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
exports.CertificatesServiceV2 = void 0;
const common_1 = require("@nestjs/common");
const certificate_entity_1 = require("./entities/certificate.entity");
const siteSettings_1 = require("../../lib/server/siteSettings");
let CertificatesServiceV2 = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CertificatesServiceV2 = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CertificatesServiceV2 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        certificatesRepository;
        templatesRepository;
        pdfGeneratorService;
        emailService;
        usersService;
        mediaService;
        eventBusService;
        logger = new common_1.Logger(CertificatesServiceV2.name);
        constructor(certificatesRepository, templatesRepository, pdfGeneratorService, emailService, usersService, mediaService, eventBusService) {
            this.certificatesRepository = certificatesRepository;
            this.templatesRepository = templatesRepository;
            this.pdfGeneratorService = pdfGeneratorService;
            this.emailService = emailService;
            this.usersService = usersService;
            this.mediaService = mediaService;
            this.eventBusService = eventBusService;
        }
        // ============ CERTIFICATE OPERATIONS ============
        async createCertificate(dto) {
            try {
                const certificate = new certificate_entity_1.Certificate();
                // New fields
                certificate.recipientName = dto.recipientName;
                certificate.recipientEmail = dto.recipientEmail;
                certificate.trainingTitle = dto.trainingTitle;
                certificate.description = dto.description || null;
                certificate.templateId = dto.templateId || null;
                certificate.logoUrl = dto.logoUrl || null;
                certificate.logoMediaId = dto.logoMediaId || null;
                certificate.signatureUrl = dto.signatureUrl || null;
                certificate.issuedAt = dto.issuedAt ? new Date(dto.issuedAt) : new Date();
                certificate.validUntil = dto.validUntil ? new Date(dto.validUntil) : null;
                certificate.status = dto.status || certificate_entity_1.CertificateStatus.DRAFT;
                // Relations
                if (dto.userId) {
                    const user = await this.usersService.findOne(dto.userId);
                    if (user) {
                        certificate.userId = dto.userId;
                        certificate.user = user;
                    }
                }
                certificate.eventId = dto.eventId || null;
                // Backward compatibility
                certificate.name = dto.name || dto.trainingTitle;
                certificate.issueDate = dto.issueDate ? new Date(dto.issueDate) : certificate.issuedAt;
                certificate.expiryDate = dto.expiryDate ? new Date(dto.expiryDate) : certificate.validUntil;
                const saved = await this.certificatesRepository.save(certificate);
                this.logger.log(`Certificate created: ${saved.id}`);
                // Publish platform event when certificate is issued (status = issued)
                if (saved.status === certificate_entity_1.CertificateStatus.ISSUED) {
                    await this.eventBusService.publishCertificateIssued(saved.id, saved.userId || 'unknown', saved.eventId || undefined);
                }
                return saved;
            }
            catch (error) {
                this.logger.error('Failed to create certificate', error);
                throw error;
            }
        }
        async findAllCertificates(userId) {
            const query = this.certificatesRepository.createQueryBuilder('certificate')
                .leftJoinAndSelect('certificate.user', 'user');
            if (userId) {
                query.where('certificate.userId = :userId', { userId });
            }
            return query.getMany();
        }
        async findOneCertificate(id) {
            const certificate = await this.certificatesRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!certificate) {
                throw new common_1.NotFoundException(`Certificate with ID ${id} not found`);
            }
            return certificate;
        }
        async updateCertificate(id, dto) {
            const certificate = await this.findOneCertificate(id);
            // Update fields if provided
            if (dto.recipientName)
                certificate.recipientName = dto.recipientName;
            if (dto.recipientEmail)
                certificate.recipientEmail = dto.recipientEmail;
            if (dto.trainingTitle)
                certificate.trainingTitle = dto.trainingTitle;
            if (dto.description !== undefined)
                certificate.description = dto.description;
            if (dto.templateId)
                certificate.templateId = dto.templateId;
            if (dto.logoUrl !== undefined)
                certificate.logoUrl = dto.logoUrl;
            if (dto.logoMediaId !== undefined)
                certificate.logoMediaId = dto.logoMediaId;
            if (dto.signatureUrl !== undefined)
                certificate.signatureUrl = dto.signatureUrl;
            if (dto.issuedAt)
                certificate.issuedAt = new Date(dto.issuedAt);
            if (dto.validUntil !== undefined) {
                certificate.validUntil = dto.validUntil ? new Date(dto.validUntil) : null;
            }
            if (dto.status)
                certificate.status = dto.status;
            // Update relations
            if (dto.userId) {
                const user = await this.usersService.findOne(dto.userId);
                if (user) {
                    certificate.userId = dto.userId;
                    certificate.user = user;
                }
            }
            // Backward compatibility
            if (dto.name)
                certificate.name = dto.name;
            if (dto.issueDate)
                certificate.issueDate = new Date(dto.issueDate);
            if (dto.expiryDate !== undefined) {
                certificate.expiryDate = dto.expiryDate ? new Date(dto.expiryDate) : null;
            }
            return this.certificatesRepository.save(certificate);
        }
        async deleteCertificate(id) {
            const certificate = await this.findOneCertificate(id);
            // Delete PDF file if exists
            if (certificate.pdfUrl) {
                await this.pdfGeneratorService.deletePdf(certificate.pdfUrl);
            }
            await this.certificatesRepository.remove(certificate);
            this.logger.log(`Certificate deleted: ${id}`);
        }
        // ============ PDF GENERATION ============
        async generatePdf(certificateId, regenerate = false) {
            const certificate = await this.findOneCertificate(certificateId);
            // Check if PDF already exists
            if (certificate.pdfUrl && !regenerate) {
                const exists = await this.pdfGeneratorService.pdfExists(certificate.pdfUrl);
                if (exists) {
                    this.logger.log(`PDF already exists: ${certificate.pdfUrl}`);
                    return certificate.pdfUrl;
                }
            }
            // Get template
            const template = await this.getTemplate(certificate.templateId || 'default');
            // Resolve logo URL from logoMediaId if present (custom logo)
            let customLogoUrl = certificate.logoUrl;
            if (certificate.logoMediaId && !customLogoUrl) {
                try {
                    const media = await this.mediaService.findOne(certificate.logoMediaId);
                    if (media) {
                        customLogoUrl = `${process.env.API_URL || 'http://localhost:9005'}${media.url}`;
                    }
                }
                catch (error) {
                    this.logger.warn(`Failed to resolve logo from mediaId ${certificate.logoMediaId}: ${error.message}`);
                }
            }
            // Get site settings data
            const companyName = (0, siteSettings_1.getCompanyName)();
            const contactInfo = (0, siteSettings_1.getContactInfo)();
            const companyLogoUrl = await (0, siteSettings_1.getEmailLogoUrl)(false); // Light version for certificate
            // Prepare certificate data
            const certificateData = {
                recipientName: certificate.recipientName,
                recipientEmail: certificate.recipientEmail,
                trainingTitle: certificate.trainingTitle,
                description: certificate.description,
                issuedAt: certificate.issuedAt.toISOString(),
                validUntil: certificate.validUntil?.toISOString(),
                logoUrl: customLogoUrl, // Keep backward compatibility
                customLogoUrl: customLogoUrl, // New: user uploaded logo
                signatureUrl: certificate.signatureUrl,
                certificateNumber: certificate.certificateNumber,
                eventId: certificate.eventId,
                // New template variables
                companyName,
                companyAddress: contactInfo?.address || '',
                companyLogoUrl, // Light version for white background
            };
            // Generate PDF
            const pdfUrl = await this.pdfGeneratorService.generateCertificatePdf(template, certificateData, certificate.id);
            // Update certificate with PDF URL
            certificate.pdfUrl = pdfUrl;
            certificate.fileUrl = pdfUrl; // Backward compatibility
            certificate.status = certificate_entity_1.CertificateStatus.ISSUED;
            await this.certificatesRepository.save(certificate);
            this.logger.log(`PDF generated for certificate: ${certificate.id}`);
            return pdfUrl;
        }
        // ============ EMAIL SENDING ============
        async sendEmail(certificateId) {
            const certificate = await this.findOneCertificate(certificateId);
            // Ensure PDF is generated
            if (!certificate.pdfUrl) {
                throw new common_1.BadRequestException('Certificate PDF must be generated before sending email');
            }
            await this.emailService.sendCertificateEmail(certificate);
            // Update status
            certificate.status = certificate_entity_1.CertificateStatus.SENT;
            certificate.sentAt = new Date();
            await this.certificatesRepository.save(certificate);
            this.logger.log(`Email sent for certificate: ${certificate.id}`);
        }
        // ============ TEMPLATE OPERATIONS ============
        async createTemplate(dto) {
            const template = this.templatesRepository.create(dto);
            return this.templatesRepository.save(template);
        }
        async findAllTemplates() {
            return this.templatesRepository.find({
                where: { isActive: true },
                order: { name: 'ASC' },
            });
        }
        async findOneTemplate(id) {
            const template = await this.templatesRepository.findOne({ where: { id } });
            if (!template) {
                throw new common_1.NotFoundException(`Template with ID ${id} not found`);
            }
            return template;
        }
        async updateTemplate(id, dto) {
            const template = await this.findOneTemplate(id);
            Object.assign(template, dto);
            return this.templatesRepository.save(template);
        }
        async deleteTemplate(id) {
            const template = await this.findOneTemplate(id);
            await this.templatesRepository.remove(template);
        }
        // ============ HELPER METHODS ============
        async getTemplate(templateId) {
            try {
                return await this.findOneTemplate(templateId);
            }
            catch {
                // If template not found, return default template
                this.logger.warn(`Template ${templateId} not found, using default`);
                const defaultTemplate = await this.templatesRepository.findOne({
                    where: { name: 'Default' },
                });
                if (!defaultTemplate) {
                    throw new common_1.NotFoundException('Default template not found. Please seed templates.');
                }
                return defaultTemplate;
            }
        }
        async generateAndSendCertificate(certificateId, options = {}) {
            // Generate PDF
            const pdfUrl = await this.generatePdf(certificateId, options.regenerate);
            // Send email if requested
            let emailSent = false;
            if (options.sendEmail) {
                await this.sendEmail(certificateId);
                emailSent = true;
            }
            return { pdfUrl, emailSent };
        }
        // ============ STATISTICS ============
        async getStatistics(userId) {
            const query = this.certificatesRepository.createQueryBuilder('certificate');
            if (userId) {
                query.where('certificate.userId = :userId', { userId });
            }
            const total = await query.getCount();
            const draft = await query.clone()
                .andWhere('certificate.status = :status', { status: certificate_entity_1.CertificateStatus.DRAFT })
                .getCount();
            const issued = await query.clone()
                .andWhere('certificate.status = :status', { status: certificate_entity_1.CertificateStatus.ISSUED })
                .getCount();
            const sent = await query.clone()
                .andWhere('certificate.status = :status', { status: certificate_entity_1.CertificateStatus.SENT })
                .getCount();
            const revoked = await query.clone()
                .andWhere('certificate.status = :status', { status: certificate_entity_1.CertificateStatus.REVOKED })
                .getCount();
            return {
                total,
                draft,
                issued,
                sent,
                revoked,
            };
        }
    };
    return CertificatesServiceV2 = _classThis;
})();
exports.CertificatesServiceV2 = CertificatesServiceV2;
//# sourceMappingURL=certificates-v2.service.js.map