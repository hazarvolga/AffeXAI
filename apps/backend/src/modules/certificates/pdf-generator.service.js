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
exports.PdfGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = __importStar(require("puppeteer"));
const Handlebars = __importStar(require("handlebars"));
const fs_1 = require("fs");
const path_1 = require("path");
let PdfGeneratorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PdfGeneratorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PdfGeneratorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(PdfGeneratorService.name);
        uploadsDir = (0, path_1.join)(process.cwd(), 'uploads', 'certificates');
        constructor() {
            // Ensure uploads directory exists
            this.ensureUploadDirectory();
        }
        async ensureUploadDirectory() {
            try {
                await fs_1.promises.mkdir(this.uploadsDir, { recursive: true });
                this.logger.log(`Certificates upload directory ready: ${this.uploadsDir}`);
            }
            catch (error) {
                this.logger.error('Failed to create uploads directory', error);
            }
        }
        /**
         * Generate PDF from HTML template and certificate data
         */
        async generateCertificatePdf(template, data, certificateId) {
            try {
                this.logger.log(`Generating PDF for certificate ${certificateId}`);
                // 1. Compile Handlebars template
                const compiledTemplate = Handlebars.compile(template.htmlContent);
                // 2. Prepare data with formatted dates
                const formattedIssuedAt = this.formatDate(data.issuedAt);
                // Fetch company information from site settings
                let companyName = 'AFFEX Technology Solutions';
                let companyAddress = 'Example Street 123\n34000 Istanbul\nTurkey';
                try {
                    const settingsResponse = await fetch('http://localhost:9005/api/settings/site');
                    if (settingsResponse.ok) {
                        const settings = await settingsResponse.json();
                        companyName = settings.companyName || companyName;
                        companyAddress = settings.contact?.address || companyAddress;
                    }
                }
                catch (error) {
                    this.logger.warn('Failed to fetch site settings, using defaults', error);
                }
                const templateData = {
                    ...data,
                    issuedAt: formattedIssuedAt,
                    issueDate: formattedIssuedAt, // Backward compatibility for templates
                    validUntil: data.validUntil ? this.formatDate(data.validUntil) : undefined,
                    companyName,
                    companyAddress,
                    customLogoUrl: data.customLogoUrl,
                    companyLogoUrl: data.companyLogoUrl,
                };
                // Debug: Log template data to verify logo URLs
                this.logger.log('Template data:', JSON.stringify({
                    customLogoUrl: templateData.customLogoUrl,
                    companyLogoUrl: templateData.companyLogoUrl,
                    logoUrl: templateData.logoUrl,
                }, null, 2));
                const html = compiledTemplate(templateData);
                // 3. Generate PDF with Puppeteer
                const browser = await puppeteer.launch({
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-gpu',
                    ],
                });
                const page = await browser.newPage();
                // Set content and wait for resources
                await page.setContent(html, {
                    waitUntil: 'networkidle0',
                    timeout: 30000,
                });
                // Generate PDF buffer
                const pdfBuffer = await page.pdf({
                    format: template.pageFormat || 'A4',
                    landscape: template.orientation === 'landscape',
                    printBackground: true,
                    margin: {
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    },
                });
                await browser.close();
                // 4. Save PDF to file system
                const filename = `certificate-${certificateId}-${Date.now()}.pdf`;
                const filePath = (0, path_1.join)(this.uploadsDir, filename);
                await fs_1.promises.writeFile(filePath, pdfBuffer);
                // 5. Return URL (adjust based on your storage strategy)
                const pdfUrl = `/uploads/certificates/${filename}`;
                this.logger.log(`PDF generated successfully: ${pdfUrl}`);
                return pdfUrl;
                // Alternative: Upload to S3
                // const s3Url = await this.uploadToS3(pdfBuffer, filename);
                // return s3Url;
            }
            catch (error) {
                this.logger.error('PDF generation failed', error);
                throw new Error(`PDF generation failed: ${error.message}`);
            }
        }
        /**
         * Upload PDF to AWS S3 (optional)
         */
        // private async uploadToS3(buffer: Buffer, filename: string): Promise<string> {
        //   const s3 = new AWS.S3();
        //   const params = {
        //     Bucket: process.env.AWS_S3_BUCKET || 'your-bucket',
        //     Key: `certificates/${filename}`,
        //     Body: buffer,
        //     ContentType: 'application/pdf',
        //     ACL: 'public-read',
        //   };
        //
        //   const result = await s3.upload(params).promise();
        //   return result.Location;
        // }
        /**
         * Format date for template
         */
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return date.toLocaleDateString('tr-TR', options);
        }
        /**
         * Delete PDF file
         */
        async deletePdf(pdfUrl) {
            try {
                const filename = pdfUrl.split('/').pop();
                if (!filename) {
                    throw new Error('Invalid PDF URL');
                }
                const filePath = (0, path_1.join)(this.uploadsDir, filename);
                await fs_1.promises.unlink(filePath);
                this.logger.log(`PDF deleted: ${filename}`);
            }
            catch (error) {
                this.logger.error('Failed to delete PDF', error);
            }
        }
        /**
         * Check if PDF exists
         */
        async pdfExists(pdfUrl) {
            try {
                const filename = pdfUrl.split('/').pop();
                if (!filename) {
                    return false;
                }
                const filePath = (0, path_1.join)(this.uploadsDir, filename);
                await fs_1.promises.access(filePath);
                return true;
            }
            catch {
                return false;
            }
        }
    };
    return PdfGeneratorService = _classThis;
})();
exports.PdfGeneratorService = PdfGeneratorService;
//# sourceMappingURL=pdf-generator.service.js.map