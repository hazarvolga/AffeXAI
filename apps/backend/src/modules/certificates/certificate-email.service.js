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
exports.CertificateEmailService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const mail_service_interface_1 = require("../mail/interfaces/mail-service.interface");
let CertificateEmailService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CertificateEmailService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CertificateEmailService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        mailService;
        logger = new common_1.Logger(CertificateEmailService.name);
        constructor(mailService) {
            this.mailService = mailService;
            this.logger.log('Certificate email service initialized with MailService');
        }
        /**
         * Send certificate email with PDF attachment
         */
        async sendCertificateEmail(certificate) {
            try {
                if (!certificate.pdfUrl) {
                    throw new Error('Certificate PDF not generated yet');
                }
                if (!certificate.recipientEmail) {
                    throw new Error('Recipient email is required');
                }
                // Read PDF file as buffer
                const pdfPath = this.getPdfFilePath(certificate.pdfUrl);
                const pdfBuffer = (0, fs_1.readFileSync)(pdfPath);
                // Send via MailService
                const result = await this.mailService.sendMail({
                    to: {
                        email: certificate.recipientEmail,
                        name: certificate.recipientName || undefined,
                    },
                    subject: `Sertifikanız: ${certificate.trainingTitle || 'Sertifika'}`,
                    html: this.generateEmailHtml(certificate),
                    channel: mail_service_interface_1.MailChannel.CERTIFICATE,
                    priority: mail_service_interface_1.MailPriority.HIGH,
                    attachments: [
                        {
                            filename: `sertifika-${certificate.certificateNumber}.pdf`,
                            content: pdfBuffer,
                            contentType: 'application/pdf',
                        },
                    ],
                    tags: ['certificate', certificate.certificateNumber],
                });
                if (!result.success) {
                    throw new Error(result.error || 'Email sending failed');
                }
                this.logger.log(`Certificate email sent to ${certificate.recipientEmail}, messageId: ${result.messageId}`);
            }
            catch (error) {
                this.logger.error('Failed to send certificate email', error);
                throw new Error(`Email sending failed: ${error.message}`);
            }
        }
        /**
         * Generate email HTML content
         */
        generateEmailHtml(certificate) {
            return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .certificate-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
          }
          .button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 Tebrikler ${certificate.recipientName}!</h1>
        </div>
        <div class="content">
          <p>Merhaba ${certificate.recipientName},</p>
          
          <p><strong>${certificate.trainingTitle}</strong> eğitimini başarıyla tamamladığınız için sizi kutlarız!</p>
          
          <div class="certificate-info">
            <h3>Sertifika Bilgileri</h3>
            <ul>
              <li><strong>Sertifika No:</strong> ${certificate.certificateNumber}</li>
              <li><strong>Eğitim:</strong> ${certificate.trainingTitle}</li>
              <li><strong>Veriliş Tarihi:</strong> ${new Date(certificate.issuedAt).toLocaleDateString('tr-TR')}</li>
              ${certificate.validUntil ? `<li><strong>Geçerlilik:</strong> ${new Date(certificate.validUntil).toLocaleDateString('tr-TR')} tarihine kadar</li>` : ''}
            </ul>
          </div>

          ${certificate.description ? `<p><em>${certificate.description}</em></p>` : ''}
          
          <p>Sertifikanız bu e-postaya eklenmiştir. Ayrıca hesap panelinizden her zaman erişebilirsiniz.</p>
          
          <center>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:9002'}${certificate.verificationUrl}" class="button">
              Sertifikayı Doğrula
            </a>
          </center>

          <p>Bu sertifika, kariyerinizde ve profesyonel gelişiminizde önemli bir adım olacaktır.</p>
          
          <p>Başarılarınızın devamını dileriz!</p>

          <div class="footer">
            <p><strong>Aluplan Eğitim Platformu</strong></p>
            <p>Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayınız.</p>
            <p>© ${new Date().getFullYear()} Aluplan. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </body>
      </html>
    `;
        }
        /**
         * Get PDF file path from URL
         */
        getPdfFilePath(pdfUrl) {
            // If URL is relative, convert to absolute file path
            if (pdfUrl.startsWith('/uploads/')) {
                return (0, path_1.join)(process.cwd(), pdfUrl.substring(1));
            }
            // If it's already an absolute path or external URL, return as is
            return pdfUrl;
        }
        /**
         * Test email configuration
         */
        async testConnection() {
            try {
                const isConnected = await this.mailService.testConnection();
                if (isConnected) {
                    this.logger.log('Mail service connection verified');
                }
                else {
                    this.logger.error('Mail service connection failed');
                }
                return isConnected;
            }
            catch (error) {
                this.logger.error('Mail service connection test failed', error);
                return false;
            }
        }
    };
    return CertificateEmailService = _classThis;
})();
exports.CertificateEmailService = CertificateEmailService;
//# sourceMappingURL=certificate-email.service.js.map