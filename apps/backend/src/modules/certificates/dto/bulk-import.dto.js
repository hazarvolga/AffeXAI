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
exports.BulkImportCertificateDto = void 0;
const class_validator_1 = require("class-validator");
let BulkImportCertificateDto = (() => {
    let _userEmail_decorators;
    let _userEmail_initializers = [];
    let _userEmail_extraInitializers = [];
    let _certificateName_decorators;
    let _certificateName_initializers = [];
    let _certificateName_extraInitializers = [];
    let _issueDate_decorators;
    let _issueDate_initializers = [];
    let _issueDate_extraInitializers = [];
    let _expiryDate_decorators;
    let _expiryDate_initializers = [];
    let _expiryDate_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    return class BulkImportCertificateDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userEmail_decorators = [(0, class_validator_1.IsEmail)()];
            _certificateName_decorators = [(0, class_validator_1.IsString)()];
            _issueDate_decorators = [(0, class_validator_1.IsDateString)()];
            _expiryDate_decorators = [(0, class_validator_1.IsDateString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _filePath_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _userEmail_decorators, { kind: "field", name: "userEmail", static: false, private: false, access: { has: obj => "userEmail" in obj, get: obj => obj.userEmail, set: (obj, value) => { obj.userEmail = value; } }, metadata: _metadata }, _userEmail_initializers, _userEmail_extraInitializers);
            __esDecorate(null, null, _certificateName_decorators, { kind: "field", name: "certificateName", static: false, private: false, access: { has: obj => "certificateName" in obj, get: obj => obj.certificateName, set: (obj, value) => { obj.certificateName = value; } }, metadata: _metadata }, _certificateName_initializers, _certificateName_extraInitializers);
            __esDecorate(null, null, _issueDate_decorators, { kind: "field", name: "issueDate", static: false, private: false, access: { has: obj => "issueDate" in obj, get: obj => obj.issueDate, set: (obj, value) => { obj.issueDate = value; } }, metadata: _metadata }, _issueDate_initializers, _issueDate_extraInitializers);
            __esDecorate(null, null, _expiryDate_decorators, { kind: "field", name: "expiryDate", static: false, private: false, access: { has: obj => "expiryDate" in obj, get: obj => obj.expiryDate, set: (obj, value) => { obj.expiryDate = value; } }, metadata: _metadata }, _expiryDate_initializers, _expiryDate_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        userEmail = __runInitializers(this, _userEmail_initializers, void 0);
        certificateName = (__runInitializers(this, _userEmail_extraInitializers), __runInitializers(this, _certificateName_initializers, void 0));
        issueDate = (__runInitializers(this, _certificateName_extraInitializers), __runInitializers(this, _issueDate_initializers, void 0));
        expiryDate = (__runInitializers(this, _issueDate_extraInitializers), __runInitializers(this, _expiryDate_initializers, void 0));
        description = (__runInitializers(this, _expiryDate_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        filePath = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        constructor() {
            __runInitializers(this, _filePath_extraInitializers);
        }
    };
})();
exports.BulkImportCertificateDto = BulkImportCertificateDto;
//# sourceMappingURL=bulk-import.dto.js.map