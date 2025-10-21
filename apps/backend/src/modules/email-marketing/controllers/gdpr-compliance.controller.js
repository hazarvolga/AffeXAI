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
exports.GdprComplianceController = exports.BulkComplianceValidationDto = exports.DataSubjectRequestDto = exports.WithdrawConsentDto = exports.TrackConsentDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
class TrackConsentDto {
    email;
    consentType;
    consentMethod;
    legalBasis;
    dataProcessingPurposes;
    retentionPeriod;
    ipAddress;
    userAgent;
    metadata;
}
exports.TrackConsentDto = TrackConsentDto;
class WithdrawConsentDto {
    email;
    consentType;
    reason;
}
exports.WithdrawConsentDto = WithdrawConsentDto;
class DataSubjectRequestDto {
    email;
    requestType;
    verificationMethod;
    requestDetails;
}
exports.DataSubjectRequestDto = DataSubjectRequestDto;
class BulkComplianceValidationDto {
    operation;
    subscriberData;
    exportFilters;
    complianceOptions;
}
exports.BulkComplianceValidationDto = BulkComplianceValidationDto;
let GdprComplianceController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('GDPR Compliance'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Controller)('email-marketing/gdpr')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _trackConsent_decorators;
    let _withdrawConsent_decorators;
    let _checkConsent_decorators;
    let _handleAccessRequest_decorators;
    let _handleErasureRequest_decorators;
    let _handlePortabilityRequest_decorators;
    let _generateComplianceReport_decorators;
    let _performDataRetentionCleanup_decorators;
    let _validateBulkOperationCompliance_decorators;
    let _previewAnonymization_decorators;
    let _immediateGdprErasure_decorators;
    var GdprComplianceController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _trackConsent_decorators = [(0, common_1.Post)('consent/track'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Track consent for GDPR compliance' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Consent tracked successfully' })];
            _withdrawConsent_decorators = [(0, common_1.Post)('consent/withdraw'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Withdraw consent' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Consent withdrawn successfully' })];
            _checkConsent_decorators = [(0, common_1.Get)('consent/check/:email'), (0, swagger_1.ApiOperation)({ summary: 'Check consent status for subscriber' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Consent status retrieved' })];
            _handleAccessRequest_decorators = [(0, common_1.Post)('data-subject-request/access'), (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED), (0, swagger_1.ApiOperation)({ summary: 'Handle data subject access request (Article 15)' }), (0, swagger_1.ApiResponse)({ status: 202, description: 'Access request initiated' })];
            _handleErasureRequest_decorators = [(0, common_1.Post)('data-subject-request/erasure'), (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED), (0, swagger_1.ApiOperation)({ summary: 'Handle right to be forgotten request (Article 17)' }), (0, swagger_1.ApiResponse)({ status: 202, description: 'Erasure request initiated' })];
            _handlePortabilityRequest_decorators = [(0, common_1.Post)('data-subject-request/portability'), (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED), (0, swagger_1.ApiOperation)({ summary: 'Handle data portability request (Article 20)' }), (0, swagger_1.ApiResponse)({ status: 202, description: 'Portability request initiated' })];
            _generateComplianceReport_decorators = [(0, common_1.Get)('compliance-report'), (0, swagger_1.ApiOperation)({ summary: 'Generate GDPR compliance report' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Compliance report generated' })];
            _performDataRetentionCleanup_decorators = [(0, common_1.Post)('data-retention/cleanup'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Perform automated data retention cleanup' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Data retention cleanup completed' })];
            _validateBulkOperationCompliance_decorators = [(0, common_1.Post)('bulk-operations/validate-compliance'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Validate bulk operation for GDPR compliance' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Compliance validation completed' })];
            _previewAnonymization_decorators = [(0, common_1.Get)('anonymization/preview'), (0, swagger_1.ApiOperation)({ summary: 'Preview data anonymization' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Anonymization preview generated' })];
            _immediateGdprErasure_decorators = [(0, common_1.Delete)('subscriber/:email/gdpr-erasure'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Immediate GDPR erasure (admin only)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscriber data erased' })];
            __esDecorate(this, null, _trackConsent_decorators, { kind: "method", name: "trackConsent", static: false, private: false, access: { has: obj => "trackConsent" in obj, get: obj => obj.trackConsent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _withdrawConsent_decorators, { kind: "method", name: "withdrawConsent", static: false, private: false, access: { has: obj => "withdrawConsent" in obj, get: obj => obj.withdrawConsent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _checkConsent_decorators, { kind: "method", name: "checkConsent", static: false, private: false, access: { has: obj => "checkConsent" in obj, get: obj => obj.checkConsent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleAccessRequest_decorators, { kind: "method", name: "handleAccessRequest", static: false, private: false, access: { has: obj => "handleAccessRequest" in obj, get: obj => obj.handleAccessRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleErasureRequest_decorators, { kind: "method", name: "handleErasureRequest", static: false, private: false, access: { has: obj => "handleErasureRequest" in obj, get: obj => obj.handleErasureRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handlePortabilityRequest_decorators, { kind: "method", name: "handlePortabilityRequest", static: false, private: false, access: { has: obj => "handlePortabilityRequest" in obj, get: obj => obj.handlePortabilityRequest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _generateComplianceReport_decorators, { kind: "method", name: "generateComplianceReport", static: false, private: false, access: { has: obj => "generateComplianceReport" in obj, get: obj => obj.generateComplianceReport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _performDataRetentionCleanup_decorators, { kind: "method", name: "performDataRetentionCleanup", static: false, private: false, access: { has: obj => "performDataRetentionCleanup" in obj, get: obj => obj.performDataRetentionCleanup }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _validateBulkOperationCompliance_decorators, { kind: "method", name: "validateBulkOperationCompliance", static: false, private: false, access: { has: obj => "validateBulkOperationCompliance" in obj, get: obj => obj.validateBulkOperationCompliance }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewAnonymization_decorators, { kind: "method", name: "previewAnonymization", static: false, private: false, access: { has: obj => "previewAnonymization" in obj, get: obj => obj.previewAnonymization }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _immediateGdprErasure_decorators, { kind: "method", name: "immediateGdprErasure", static: false, private: false, access: { has: obj => "immediateGdprErasure" in obj, get: obj => obj.immediateGdprErasure }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GdprComplianceController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        gdprService = __runInitializers(this, _instanceExtraInitializers);
        bulkComplianceService;
        logger = new common_1.Logger(GdprComplianceController.name);
        constructor(gdprService, bulkComplianceService) {
            this.gdprService = gdprService;
            this.bulkComplianceService = bulkComplianceService;
        }
        async trackConsent(dto) {
            try {
                const consentRecord = await this.gdprService.trackConsent(dto.email, dto.consentType, dto.consentMethod, dto.legalBasis, {
                    dataProcessingPurposes: dto.dataProcessingPurposes,
                    retentionPeriod: dto.retentionPeriod,
                    ipAddress: dto.ipAddress,
                    userAgent: dto.userAgent,
                    metadata: dto.metadata
                });
                return {
                    success: true,
                    message: 'Consent tracked successfully',
                    data: consentRecord
                };
            }
            catch (error) {
                this.logger.error('Failed to track consent:', error);
                throw error;
            }
        }
        async withdrawConsent(dto) {
            try {
                await this.gdprService.withdrawConsent(dto.email, dto.consentType, dto.reason);
                return {
                    success: true,
                    message: 'Consent withdrawn successfully'
                };
            }
            catch (error) {
                this.logger.error('Failed to withdraw consent:', error);
                throw error;
            }
        }
        async checkConsent(email, consentType, purpose) {
            try {
                const hasConsent = await this.gdprService.hasValidConsent(email, consentType, purpose);
                return {
                    success: true,
                    data: {
                        email,
                        consentType,
                        purpose,
                        hasValidConsent: hasConsent
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to check consent:', error);
                throw error;
            }
        }
        async handleAccessRequest(dto) {
            try {
                const request = await this.gdprService.handleAccessRequest(dto.email);
                return {
                    success: true,
                    message: 'Access request processed',
                    data: {
                        requestId: request.id,
                        status: request.status,
                        responseData: request.responseData
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to handle access request:', error);
                throw error;
            }
        }
        async handleErasureRequest(dto) {
            try {
                const request = await this.gdprService.handleErasureRequest(dto.email, dto.retainStatistics);
                return {
                    success: true,
                    message: 'Erasure request processed',
                    data: {
                        requestId: request.id,
                        status: request.status
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to handle erasure request:', error);
                throw error;
            }
        }
        async handlePortabilityRequest(dto) {
            try {
                const request = await this.gdprService.handlePortabilityRequest(dto.email);
                return {
                    success: true,
                    message: 'Data portability request processed',
                    data: {
                        requestId: request.id,
                        status: request.status,
                        portableData: request.responseData
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to handle portability request:', error);
                throw error;
            }
        }
        async generateComplianceReport() {
            try {
                const report = await this.gdprService.generateComplianceReport();
                return {
                    success: true,
                    data: report
                };
            }
            catch (error) {
                this.logger.error('Failed to generate compliance report:', error);
                throw error;
            }
        }
        async performDataRetentionCleanup() {
            try {
                const result = await this.gdprService.performDataRetentionCleanup();
                return {
                    success: true,
                    message: 'Data retention cleanup completed',
                    data: result
                };
            }
            catch (error) {
                this.logger.error('Failed to perform data retention cleanup:', error);
                throw error;
            }
        }
        async validateBulkOperationCompliance(dto) {
            try {
                let validationResult;
                if (dto.operation === 'import') {
                    validationResult = await this.bulkComplianceService.validateBulkImportCompliance(dto.subscriberData || [], dto.complianceOptions);
                }
                else {
                    validationResult = await this.bulkComplianceService.validateBulkExportCompliance(dto.exportFilters || {}, dto.complianceOptions);
                }
                return {
                    success: true,
                    data: validationResult
                };
            }
            catch (error) {
                this.logger.error('Failed to validate bulk operation compliance:', error);
                throw error;
            }
        }
        async previewAnonymization(emails, method = 'hash') {
            try {
                const emailList = emails.split(',').map(e => e.trim());
                // This is a simplified preview - in reality, you'd fetch actual subscriber data
                const previewData = emailList.map(email => {
                    switch (method) {
                        case 'hash':
                            return { original: email, anonymized: `hash_${email.substring(0, 3)}***` };
                        case 'pseudonymize':
                            return { original: email, anonymized: `pseudo_${email.substring(0, 3)}***` };
                        case 'generalize':
                            return { original: email, anonymized: `***@${email.split('@')[1] || '***'}` };
                        case 'suppress':
                            return { original: email, anonymized: '[REDACTED]' };
                        default:
                            return { original: email, anonymized: email };
                    }
                });
                return {
                    success: true,
                    data: {
                        method,
                        preview: previewData
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to generate anonymization preview:', error);
                throw error;
            }
        }
        async immediateGdprErasure(email, retainStatistics = true) {
            try {
                const request = await this.gdprService.handleErasureRequest(email, retainStatistics);
                return {
                    success: true,
                    message: 'GDPR erasure completed',
                    data: {
                        requestId: request.id,
                        status: request.status,
                        retainedStatistics: retainStatistics
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to perform immediate GDPR erasure:', error);
                throw error;
            }
        }
    };
    return GdprComplianceController = _classThis;
})();
exports.GdprComplianceController = GdprComplianceController;
//# sourceMappingURL=gdpr-compliance.controller.js.map