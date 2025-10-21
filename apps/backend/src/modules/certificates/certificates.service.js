"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const certificate_entity_1 = require("./entities/certificate.entity");
const fs_1 = require("fs");
const path_1 = require("path");
let CertificatesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CertificatesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CertificatesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        certificatesRepository;
        usersService;
        logger = new common_1.Logger(CertificatesService.name);
        constructor(certificatesRepository, usersService) {
            this.certificatesRepository = certificatesRepository;
            this.usersService = usersService;
        }
        async create(file, createCertificateDto) {
            // Dosya URL'sini oluştur (gerçek uygulamada dosya yükleme servisi kullanılmalı)
            const fileUrl = file
                ? `${process.env.MEDIA_BASE_URL || 'http://localhost:9004/media'}/${file.filename}`
                : '';
            const certificate = new certificate_entity_1.Certificate();
            certificate.name = createCertificateDto.name || 'Sertifika Adı Belirtilmemiş';
            certificate.description = createCertificateDto.description || null;
            certificate.issueDate = new Date(createCertificateDto.issueDate || new Date());
            certificate.expiryDate = createCertificateDto.expiryDate ? new Date(createCertificateDto.expiryDate) : null;
            certificate.fileUrl = fileUrl || null;
            certificate.templateId = createCertificateDto.templateId || null;
            // Kullanıcıyı bul
            if (createCertificateDto.userId) {
                const user = await this.usersService.findOne(createCertificateDto.userId);
                if (user) {
                    certificate.userId = createCertificateDto.userId;
                    certificate.user = user;
                }
            }
            return this.certificatesRepository.save(certificate);
        }
        async findAll(userId) {
            if (userId) {
                return this.certificatesRepository.find({
                    where: { userId },
                    relations: ['user'],
                });
            }
            return this.certificatesRepository.find({ relations: ['user'] });
        }
        async findOne(id) {
            const certificate = await this.certificatesRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!certificate) {
                throw new common_1.NotFoundException(`Certificate with ID ${id} not found`);
            }
            return certificate;
        }
        async update(id, file, updateCertificateDto) {
            const certificate = await this.findOne(id);
            // Dosya varsa URL'yi güncelle
            if (file) {
                certificate.fileUrl = `${process.env.MEDIA_BASE_URL || 'http://localhost:9004/media'}/${file.filename}`;
            }
            // Kullanıcı ID'si varsa kullanıcıyı güncelle
            if (updateCertificateDto.userId) {
                const user = await this.usersService.findOne(updateCertificateDto.userId);
                if (!user) {
                    throw new common_1.NotFoundException(`User with ID ${updateCertificateDto.userId} not found`);
                }
                certificate.user = user;
                certificate.userId = updateCertificateDto.userId;
            }
            // Update other fields
            if (updateCertificateDto.name) {
                certificate.name = updateCertificateDto.name;
            }
            if (updateCertificateDto.description !== undefined) {
                certificate.description = updateCertificateDto.description || '';
            }
            if (updateCertificateDto.issueDate) {
                certificate.issueDate = new Date(updateCertificateDto.issueDate);
            }
            if (updateCertificateDto.expiryDate !== undefined) {
                certificate.expiryDate = updateCertificateDto.expiryDate ? new Date(updateCertificateDto.expiryDate) : null;
            }
            if (updateCertificateDto.templateId !== undefined) {
                certificate.templateId = updateCertificateDto.templateId || 'default';
            }
            return this.certificatesRepository.save(certificate);
        }
        async remove(id) {
            const certificate = await this.findOne(id);
            await this.certificatesRepository.remove(certificate);
        }
        // Toplu içe aktarma metodu
        async bulkImport(certificates) {
            let success = 0;
            let failed = 0;
            const errors = [];
            for (const certDto of certificates) {
                try {
                    // Kullanıcıyı e-posta ile bul
                    const user = await this.usersService.findByEmail(certDto.userEmail);
                    if (!user) {
                        errors.push(`User with email ${certDto.userEmail} not found`);
                        failed++;
                        continue;
                    }
                    // Sertifika oluştur
                    const certificate = new certificate_entity_1.Certificate();
                    certificate.name = certDto.certificateName;
                    certificate.description = certDto.description || '';
                    certificate.issueDate = new Date(certDto.issueDate);
                    certificate.expiryDate = certDto.expiryDate ? new Date(certDto.expiryDate) : null;
                    certificate.fileUrl = certDto.filePath || '';
                    certificate.userId = user.id;
                    certificate.user = user;
                    await this.certificatesRepository.save(certificate);
                    success++;
                }
                catch (error) {
                    errors.push(`Failed to import certificate for ${certDto.userEmail}: ${error.message}`);
                    failed++;
                }
            }
            this.logger.log(`Bulk import completed: ${success} succeeded, ${failed} failed`);
            return { success, failed, errors };
        }
        // PDF Generation method
        async generateCertificatePdf(id) {
            try {
                const certificate = await this.findOne(id);
                // Dynamically import PDFKit to avoid issues with types
                const PDFDocument = (await Promise.resolve().then(() => __importStar(require('pdfkit')))).default;
                // Create a document with better styling
                const doc = new PDFDocument({
                    size: 'A4',
                    margin: 50
                });
                // Generate file path
                const fileName = `certificate-${id}.pdf`;
                const filePath = (0, path_1.join)(process.cwd(), 'uploads', fileName);
                // Create write stream
                const stream = (0, fs_1.createWriteStream)(filePath);
                doc.pipe(stream);
                // Select design based on template ID
                const templateId = certificate.templateId || 'default';
                // Apply design based on template
                switch (templateId) {
                    case 'premium':
                        this.applyPremiumDesign(doc, certificate);
                        break;
                    case 'executive':
                        this.applyExecutiveDesign(doc, certificate);
                        break;
                    case 'default':
                    default:
                        this.applyDefaultDesign(doc, certificate);
                        break;
                }
                // Finalize PDF file
                doc.end();
                // Wait for the file to be written
                return new Promise((resolve, reject) => {
                    stream.on('finish', () => {
                        const fileUrl = `${process.env.MEDIA_BASE_URL || 'http://localhost:9004/media'}/${fileName}`;
                        resolve(fileUrl);
                    });
                    stream.on('error', reject);
                });
            }
            catch (error) {
                // Log the error for debugging
                this.logger.error(`Error generating PDF for certificate ${id}:`, error);
                // Re-throw the error so it can be handled by the controller
                throw error;
            }
        }
        // Default certificate design
        applyDefaultDesign(doc, certificate) {
            // Add company header
            doc.fontSize(28).fillColor('#003366').text('ALLPLAN', { align: 'center' });
            doc.fontSize(14).fillColor('#666666').text('BIM Solutions', { align: 'center' });
            doc.moveDown();
            // Add decorative line
            doc.moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor('#003366')
                .lineWidth(2)
                .stroke();
            doc.moveDown();
            // Add certificate title
            doc.fontSize(32).fillColor('#000000').text('SERTİFİKA', { align: 'center' });
            doc.moveDown();
            doc.fontSize(18).text('CERTIFICATE OF COMPLETION', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            // Add recipient information
            doc.fontSize(16).fillColor('#000000').text('Bu belge ile', { align: 'center' });
            doc.moveDown();
            // Check if user data is available
            if (certificate.user && certificate.user.firstName && certificate.user.lastName) {
                doc.fontSize(24).text(`${certificate.user.firstName} ${certificate.user.lastName}`, { align: 'center' });
            }
            else {
                doc.fontSize(24).text('[Alıcı Bilgisi Bulunamadı]', { align: 'center' });
            }
            doc.moveDown();
            doc.fontSize(16).text('isimli kişi', { align: 'center' });
            doc.moveDown();
            // Check if certificate name is available
            if (certificate.name) {
                doc.fontSize(20).text(`${certificate.name}`, { align: 'center' });
            }
            else {
                doc.fontSize(20).text('[Eğitim Adı Belirtilmemiş]', { align: 'center' });
            }
            doc.moveDown();
            doc.moveDown();
            doc.fontSize(16).text('eğitimini başarıyla tamamlamıştır.', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            // Add dates
            if (certificate.issueDate) {
                const issueDate = new Date(certificate.issueDate);
                if (!isNaN(issueDate.getTime())) {
                    doc.fontSize(14).text(`Veriliş Tarihi: ${issueDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.fontSize(14).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            else {
                doc.fontSize(14).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
            }
            if (certificate.expiryDate) {
                const expiryDate = new Date(certificate.expiryDate);
                if (!isNaN(expiryDate.getTime())) {
                    doc.text(`Geçerlilik Tarihi: ${expiryDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.text('Geçerlilik Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add certificate ID
            doc.fontSize(12).text(`Sertifika No: ${certificate.id}`, { align: 'center' });
            doc.moveDown();
            // Add company contact information
            doc.fontSize(10).text('Allplan Turkey | info@allplan.com.tr | www.allplan.com.tr', { align: 'center' });
        }
        // Premium certificate design
        applyPremiumDesign(doc, certificate) {
            // Add decorative border
            doc.rect(40, 40, 515, 750).strokeColor('#003366').lineWidth(2).stroke();
            doc.rect(45, 45, 505, 740).strokeColor('#666666').lineWidth(1).stroke();
            // Add company header with larger font
            doc.fontSize(36).fillColor('#003366').text('ALLPLAN', { align: 'center' });
            doc.fontSize(16).fillColor('#666666').text('BIM Solutions', { align: 'center' });
            doc.moveDown();
            // Add decorative line
            doc.moveTo(100, doc.y)
                .lineTo(500, doc.y)
                .strokeColor('#003366')
                .lineWidth(3)
                .stroke();
            doc.moveDown();
            doc.moveDown();
            // Add certificate title
            doc.fontSize(40).fillColor('#000000').text('SERTİFİKA', { align: 'center' });
            doc.moveDown();
            doc.fontSize(20).text('CERTIFICATE OF COMPLETION', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add decorative element
            doc.circle(300, doc.y, 20).strokeColor('#003366').lineWidth(2).stroke();
            doc.moveDown();
            doc.moveDown();
            // Add recipient information
            doc.fontSize(18).fillColor('#000000').text('Bu belge ile', { align: 'center' });
            doc.moveDown();
            // Check if user data is available
            if (certificate.user && certificate.user.firstName && certificate.user.lastName) {
                doc.fontSize(28).text(`${certificate.user.firstName} ${certificate.user.lastName}`, { align: 'center' });
            }
            else {
                doc.fontSize(28).text('[Alıcı Bilgisi Bulunamadı]', { align: 'center' });
            }
            doc.moveDown();
            doc.fontSize(18).text('isimli kişi', { align: 'center' });
            doc.moveDown();
            // Check if certificate name is available
            if (certificate.name) {
                doc.fontSize(24).text(`${certificate.name}`, { align: 'center' });
            }
            else {
                doc.fontSize(24).text('[Eğitim Adı Belirtilmemiş]', { align: 'center' });
            }
            doc.moveDown();
            doc.moveDown();
            doc.fontSize(18).text('eğitimini başarıyla tamamlamıştır.', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            // Add dates
            if (certificate.issueDate) {
                const issueDate = new Date(certificate.issueDate);
                if (!isNaN(issueDate.getTime())) {
                    doc.fontSize(16).text(`Veriliş Tarihi: ${issueDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.fontSize(16).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            else {
                doc.fontSize(16).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
            }
            if (certificate.expiryDate) {
                const expiryDate = new Date(certificate.expiryDate);
                if (!isNaN(expiryDate.getTime())) {
                    doc.fontSize(16).text(`Geçerlilik Tarihi: ${expiryDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.fontSize(16).text('Geçerlilik Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add certificate ID
            doc.fontSize(14).text(`Sertifika No: ${certificate.id}`, { align: 'center' });
            doc.moveDown();
            // Add company contact information
            doc.fontSize(12).text('Allplan Turkey | info@allplan.com.tr | www.allplan.com.tr', { align: 'center' });
        }
        // Executive certificate design
        applyExecutiveDesign(doc, certificate) {
            // Add background color
            doc.rect(0, 0, 600, 850).fillColor('#f8f9fa').fill();
            // Add company header
            doc.fontSize(40).fillColor('#003366').text('ALLPLAN', { align: 'center' });
            doc.fontSize(18).fillColor('#666666').text('BIM Solutions', { align: 'center' });
            doc.moveDown();
            // Add decorative line
            doc.moveTo(100, doc.y)
                .lineTo(500, doc.y)
                .strokeColor('#003366')
                .lineWidth(4)
                .stroke();
            doc.moveDown();
            doc.moveDown();
            // Add certificate title
            doc.fontSize(48).fillColor('#000000').text('SERTİFİKA', { align: 'center' });
            doc.moveDown();
            doc.fontSize(24).text('CERTIFICATE OF COMPLETION', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add decorative seal
            doc.circle(300, doc.y, 40).strokeColor('#003366').lineWidth(3).stroke();
            doc.fontSize(16).fillColor('#003366').text('ONAY', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add recipient information
            doc.fontSize(20).fillColor('#000000').text('Bu belge ile', { align: 'center' });
            doc.moveDown();
            // Check if user data is available
            if (certificate.user && certificate.user.firstName && certificate.user.lastName) {
                doc.fontSize(32).text(`${certificate.user.firstName} ${certificate.user.lastName}`, { align: 'center' });
            }
            else {
                doc.fontSize(32).text('[Alıcı Bilgisi Bulunamadı]', { align: 'center' });
            }
            doc.moveDown();
            doc.fontSize(20).text('isimli kişi', { align: 'center' });
            doc.moveDown();
            // Check if certificate name is available
            if (certificate.name) {
                doc.fontSize(28).text(`${certificate.name}`, { align: 'center' });
            }
            else {
                doc.fontSize(28).text('[Eğitim Adı Belirtilmemiş]', { align: 'center' });
            }
            doc.moveDown();
            doc.moveDown();
            doc.fontSize(20).text('eğitimini başarıyla tamamlamıştır.', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            // Add dates
            if (certificate.issueDate) {
                const issueDate = new Date(certificate.issueDate);
                if (!isNaN(issueDate.getTime())) {
                    doc.fontSize(18).text(`Veriliş Tarihi: ${issueDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.fontSize(18).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            else {
                doc.fontSize(18).text('Veriliş Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
            }
            if (certificate.expiryDate) {
                const expiryDate = new Date(certificate.expiryDate);
                if (!isNaN(expiryDate.getTime())) {
                    doc.fontSize(18).text(`Geçerlilik Tarihi: ${expiryDate.toLocaleDateString('tr-TR')}`, { align: 'center' });
                }
                else {
                    doc.fontSize(18).text('Geçerlilik Tarihi: [Tarih Belirtilmemiş]', { align: 'center' });
                }
            }
            doc.moveDown();
            doc.moveDown();
            doc.moveDown();
            // Add signature line
            doc.moveTo(200, doc.y)
                .lineTo(400, doc.y)
                .strokeColor('#000000')
                .lineWidth(1)
                .stroke();
            doc.fontSize(14).text('Yetkili İmza', { align: 'center' });
            doc.moveDown();
            doc.moveDown();
            // Add certificate ID
            doc.fontSize(14).text(`Sertifika No: ${certificate.id}`, { align: 'center' });
            doc.moveDown();
            // Add company contact information
            doc.fontSize(12).text('Allplan Turkey | info@allplan.com.tr | www.allplan.com.tr', { align: 'center' });
        }
    };
    return CertificatesService = _classThis;
})();
exports.CertificatesService = CertificatesService;
//# sourceMappingURL=certificates.service.js.map