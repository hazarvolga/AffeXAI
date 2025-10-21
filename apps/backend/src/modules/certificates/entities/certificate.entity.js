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
exports.Certificate = exports.CertificateStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var CertificateStatus;
(function (CertificateStatus) {
    CertificateStatus["DRAFT"] = "draft";
    CertificateStatus["ISSUED"] = "issued";
    CertificateStatus["SENT"] = "sent";
    CertificateStatus["REVOKED"] = "revoked";
})(CertificateStatus || (exports.CertificateStatus = CertificateStatus = {}));
let Certificate = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('certificates')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _recipientName_decorators;
    let _recipientName_initializers = [];
    let _recipientName_extraInitializers = [];
    let _recipientEmail_decorators;
    let _recipientEmail_initializers = [];
    let _recipientEmail_extraInitializers = [];
    let _trainingTitle_decorators;
    let _trainingTitle_initializers = [];
    let _trainingTitle_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _templateId_decorators;
    let _templateId_initializers = [];
    let _templateId_extraInitializers = [];
    let _logoUrl_decorators;
    let _logoUrl_initializers = [];
    let _logoUrl_extraInitializers = [];
    let _logoMediaId_decorators;
    let _logoMediaId_initializers = [];
    let _logoMediaId_extraInitializers = [];
    let _signatureUrl_decorators;
    let _signatureUrl_initializers = [];
    let _signatureUrl_extraInitializers = [];
    let _imageUrl_decorators;
    let _imageUrl_initializers = [];
    let _imageUrl_extraInitializers = [];
    let _pdfUrl_decorators;
    let _pdfUrl_initializers = [];
    let _pdfUrl_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _issuedAt_decorators;
    let _issuedAt_initializers = [];
    let _issuedAt_extraInitializers = [];
    let _validUntil_decorators;
    let _validUntil_initializers = [];
    let _validUntil_extraInitializers = [];
    let _sentAt_decorators;
    let _sentAt_initializers = [];
    let _sentAt_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _issueDate_decorators;
    let _issueDate_initializers = [];
    let _issueDate_extraInitializers = [];
    let _expiryDate_decorators;
    let _expiryDate_initializers = [];
    let _expiryDate_extraInitializers = [];
    let _fileUrl_decorators;
    let _fileUrl_initializers = [];
    let _fileUrl_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _eventId_decorators;
    let _eventId_initializers = [];
    let _eventId_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var Certificate = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
            _recipientName_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _recipientEmail_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _trainingTitle_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
            _templateId_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _logoUrl_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _logoMediaId_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _signatureUrl_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _imageUrl_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _pdfUrl_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: CertificateStatus,
                    default: CertificateStatus.DRAFT,
                })];
            _issuedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp' })];
            _validUntil_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _sentAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true })];
            _name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _issueDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
            _expiryDate_decorators = [(0, typeorm_1.Column)({ type: 'date', nullable: true })];
            _fileUrl_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
            _eventId_decorators = [(0, typeorm_1.Column)({ type: 'varchar', nullable: true })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _recipientName_decorators, { kind: "field", name: "recipientName", static: false, private: false, access: { has: obj => "recipientName" in obj, get: obj => obj.recipientName, set: (obj, value) => { obj.recipientName = value; } }, metadata: _metadata }, _recipientName_initializers, _recipientName_extraInitializers);
            __esDecorate(null, null, _recipientEmail_decorators, { kind: "field", name: "recipientEmail", static: false, private: false, access: { has: obj => "recipientEmail" in obj, get: obj => obj.recipientEmail, set: (obj, value) => { obj.recipientEmail = value; } }, metadata: _metadata }, _recipientEmail_initializers, _recipientEmail_extraInitializers);
            __esDecorate(null, null, _trainingTitle_decorators, { kind: "field", name: "trainingTitle", static: false, private: false, access: { has: obj => "trainingTitle" in obj, get: obj => obj.trainingTitle, set: (obj, value) => { obj.trainingTitle = value; } }, metadata: _metadata }, _trainingTitle_initializers, _trainingTitle_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _templateId_decorators, { kind: "field", name: "templateId", static: false, private: false, access: { has: obj => "templateId" in obj, get: obj => obj.templateId, set: (obj, value) => { obj.templateId = value; } }, metadata: _metadata }, _templateId_initializers, _templateId_extraInitializers);
            __esDecorate(null, null, _logoUrl_decorators, { kind: "field", name: "logoUrl", static: false, private: false, access: { has: obj => "logoUrl" in obj, get: obj => obj.logoUrl, set: (obj, value) => { obj.logoUrl = value; } }, metadata: _metadata }, _logoUrl_initializers, _logoUrl_extraInitializers);
            __esDecorate(null, null, _logoMediaId_decorators, { kind: "field", name: "logoMediaId", static: false, private: false, access: { has: obj => "logoMediaId" in obj, get: obj => obj.logoMediaId, set: (obj, value) => { obj.logoMediaId = value; } }, metadata: _metadata }, _logoMediaId_initializers, _logoMediaId_extraInitializers);
            __esDecorate(null, null, _signatureUrl_decorators, { kind: "field", name: "signatureUrl", static: false, private: false, access: { has: obj => "signatureUrl" in obj, get: obj => obj.signatureUrl, set: (obj, value) => { obj.signatureUrl = value; } }, metadata: _metadata }, _signatureUrl_initializers, _signatureUrl_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl, set: (obj, value) => { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _pdfUrl_decorators, { kind: "field", name: "pdfUrl", static: false, private: false, access: { has: obj => "pdfUrl" in obj, get: obj => obj.pdfUrl, set: (obj, value) => { obj.pdfUrl = value; } }, metadata: _metadata }, _pdfUrl_initializers, _pdfUrl_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _issuedAt_decorators, { kind: "field", name: "issuedAt", static: false, private: false, access: { has: obj => "issuedAt" in obj, get: obj => obj.issuedAt, set: (obj, value) => { obj.issuedAt = value; } }, metadata: _metadata }, _issuedAt_initializers, _issuedAt_extraInitializers);
            __esDecorate(null, null, _validUntil_decorators, { kind: "field", name: "validUntil", static: false, private: false, access: { has: obj => "validUntil" in obj, get: obj => obj.validUntil, set: (obj, value) => { obj.validUntil = value; } }, metadata: _metadata }, _validUntil_initializers, _validUntil_extraInitializers);
            __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: obj => "sentAt" in obj, get: obj => obj.sentAt, set: (obj, value) => { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _issueDate_decorators, { kind: "field", name: "issueDate", static: false, private: false, access: { has: obj => "issueDate" in obj, get: obj => obj.issueDate, set: (obj, value) => { obj.issueDate = value; } }, metadata: _metadata }, _issueDate_initializers, _issueDate_extraInitializers);
            __esDecorate(null, null, _expiryDate_decorators, { kind: "field", name: "expiryDate", static: false, private: false, access: { has: obj => "expiryDate" in obj, get: obj => obj.expiryDate, set: (obj, value) => { obj.expiryDate = value; } }, metadata: _metadata }, _expiryDate_initializers, _expiryDate_extraInitializers);
            __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: obj => "fileUrl" in obj, get: obj => obj.fileUrl, set: (obj, value) => { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _eventId_decorators, { kind: "field", name: "eventId", static: false, private: false, access: { has: obj => "eventId" in obj, get: obj => obj.eventId, set: (obj, value) => { obj.eventId = value; } }, metadata: _metadata }, _eventId_initializers, _eventId_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Certificate = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        // Recipient Information (nullable for backward compatibility)
        recipientName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _recipientName_initializers, void 0));
        recipientEmail = (__runInitializers(this, _recipientName_extraInitializers), __runInitializers(this, _recipientEmail_initializers, void 0));
        trainingTitle = (__runInitializers(this, _recipientEmail_extraInitializers), __runInitializers(this, _trainingTitle_initializers, void 0));
        description = (__runInitializers(this, _trainingTitle_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        // Template & Media
        templateId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _templateId_initializers, void 0));
        logoUrl = (__runInitializers(this, _templateId_extraInitializers), __runInitializers(this, _logoUrl_initializers, void 0));
        logoMediaId = (__runInitializers(this, _logoUrl_extraInitializers), __runInitializers(this, _logoMediaId_initializers, void 0)); // Media ID for certificate product/subject logo
        signatureUrl = (__runInitializers(this, _logoMediaId_extraInitializers), __runInitializers(this, _signatureUrl_initializers, void 0));
        imageUrl = (__runInitializers(this, _signatureUrl_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0)); // Custom image for certificate
        // PDF Storage
        pdfUrl = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _pdfUrl_initializers, void 0));
        // Status & Dates
        status = (__runInitializers(this, _pdfUrl_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        issuedAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _issuedAt_initializers, void 0));
        validUntil = (__runInitializers(this, _issuedAt_extraInitializers), __runInitializers(this, _validUntil_initializers, void 0));
        sentAt = (__runInitializers(this, _validUntil_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
        // Backward compatibility fields
        name = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _name_initializers, void 0)); // Maps to trainingTitle
        issueDate = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _issueDate_initializers, void 0)); // Maps to issuedAt
        expiryDate = (__runInitializers(this, _issueDate_extraInitializers), __runInitializers(this, _expiryDate_initializers, void 0)); // Maps to validUntil
        fileUrl = (__runInitializers(this, _expiryDate_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0)); // Maps to pdfUrl
        // Relations
        userId = (__runInitializers(this, _fileUrl_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        eventId = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _eventId_initializers, void 0));
        // Metadata
        createdAt = (__runInitializers(this, _eventId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        // Certificate number generator (computed)
        get certificateNumber() {
            const date = new Date(this.issuedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const shortId = this.id.substring(0, 8).toUpperCase();
            return `ALP-TR-${year}-${month}-${shortId}`;
        }
        // Verification URL generator
        get verificationUrl() {
            return `/education/certification?id=${this.certificateNumber}`;
        }
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return Certificate = _classThis;
})();
exports.Certificate = Certificate;
//# sourceMappingURL=certificate.entity.js.map