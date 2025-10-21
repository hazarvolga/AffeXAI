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
exports.CompleteProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let CustomerDataDto = (() => {
    let _customerNumber_decorators;
    let _customerNumber_initializers = [];
    let _customerNumber_extraInitializers = [];
    let _companyName_decorators;
    let _companyName_initializers = [];
    let _companyName_extraInitializers = [];
    let _taxNumber_decorators;
    let _taxNumber_initializers = [];
    let _taxNumber_extraInitializers = [];
    let _companyPhone_decorators;
    let _companyPhone_initializers = [];
    let _companyPhone_extraInitializers = [];
    let _companyAddress_decorators;
    let _companyAddress_initializers = [];
    let _companyAddress_extraInitializers = [];
    let _companyCity_decorators;
    let _companyCity_initializers = [];
    let _companyCity_extraInitializers = [];
    return class CustomerDataDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _customerNumber_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Customer number' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _companyName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Company name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _taxNumber_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Tax number' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _companyPhone_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Company phone' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _companyAddress_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Company address' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _companyCity_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Company city' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _customerNumber_decorators, { kind: "field", name: "customerNumber", static: false, private: false, access: { has: obj => "customerNumber" in obj, get: obj => obj.customerNumber, set: (obj, value) => { obj.customerNumber = value; } }, metadata: _metadata }, _customerNumber_initializers, _customerNumber_extraInitializers);
            __esDecorate(null, null, _companyName_decorators, { kind: "field", name: "companyName", static: false, private: false, access: { has: obj => "companyName" in obj, get: obj => obj.companyName, set: (obj, value) => { obj.companyName = value; } }, metadata: _metadata }, _companyName_initializers, _companyName_extraInitializers);
            __esDecorate(null, null, _taxNumber_decorators, { kind: "field", name: "taxNumber", static: false, private: false, access: { has: obj => "taxNumber" in obj, get: obj => obj.taxNumber, set: (obj, value) => { obj.taxNumber = value; } }, metadata: _metadata }, _taxNumber_initializers, _taxNumber_extraInitializers);
            __esDecorate(null, null, _companyPhone_decorators, { kind: "field", name: "companyPhone", static: false, private: false, access: { has: obj => "companyPhone" in obj, get: obj => obj.companyPhone, set: (obj, value) => { obj.companyPhone = value; } }, metadata: _metadata }, _companyPhone_initializers, _companyPhone_extraInitializers);
            __esDecorate(null, null, _companyAddress_decorators, { kind: "field", name: "companyAddress", static: false, private: false, access: { has: obj => "companyAddress" in obj, get: obj => obj.companyAddress, set: (obj, value) => { obj.companyAddress = value; } }, metadata: _metadata }, _companyAddress_initializers, _companyAddress_extraInitializers);
            __esDecorate(null, null, _companyCity_decorators, { kind: "field", name: "companyCity", static: false, private: false, access: { has: obj => "companyCity" in obj, get: obj => obj.companyCity, set: (obj, value) => { obj.companyCity = value; } }, metadata: _metadata }, _companyCity_initializers, _companyCity_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        customerNumber = __runInitializers(this, _customerNumber_initializers, void 0);
        companyName = (__runInitializers(this, _customerNumber_extraInitializers), __runInitializers(this, _companyName_initializers, void 0));
        taxNumber = (__runInitializers(this, _companyName_extraInitializers), __runInitializers(this, _taxNumber_initializers, void 0));
        companyPhone = (__runInitializers(this, _taxNumber_extraInitializers), __runInitializers(this, _companyPhone_initializers, void 0));
        companyAddress = (__runInitializers(this, _companyPhone_extraInitializers), __runInitializers(this, _companyAddress_initializers, void 0));
        companyCity = (__runInitializers(this, _companyAddress_extraInitializers), __runInitializers(this, _companyCity_initializers, void 0));
        constructor() {
            __runInitializers(this, _companyCity_extraInitializers);
        }
    };
})();
let StudentDataDto = (() => {
    let _schoolName_decorators;
    let _schoolName_initializers = [];
    let _schoolName_extraInitializers = [];
    let _studentId_decorators;
    let _studentId_initializers = [];
    let _studentId_extraInitializers = [];
    return class StudentDataDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _schoolName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'School name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _studentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Student ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _schoolName_decorators, { kind: "field", name: "schoolName", static: false, private: false, access: { has: obj => "schoolName" in obj, get: obj => obj.schoolName, set: (obj, value) => { obj.schoolName = value; } }, metadata: _metadata }, _schoolName_initializers, _schoolName_extraInitializers);
            __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: obj => "studentId" in obj, get: obj => obj.studentId, set: (obj, value) => { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        schoolName = __runInitializers(this, _schoolName_initializers, void 0);
        studentId = (__runInitializers(this, _schoolName_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
        constructor() {
            __runInitializers(this, _studentId_extraInitializers);
        }
    };
})();
let NewsletterPreferencesDto = (() => {
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _productUpdates_decorators;
    let _productUpdates_initializers = [];
    let _productUpdates_extraInitializers = [];
    let _eventUpdates_decorators;
    let _eventUpdates_initializers = [];
    let _eventUpdates_extraInitializers = [];
    return class NewsletterPreferencesDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Email newsletter subscription' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _productUpdates_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Product updates subscription' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _eventUpdates_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Event updates subscription' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _productUpdates_decorators, { kind: "field", name: "productUpdates", static: false, private: false, access: { has: obj => "productUpdates" in obj, get: obj => obj.productUpdates, set: (obj, value) => { obj.productUpdates = value; } }, metadata: _metadata }, _productUpdates_initializers, _productUpdates_extraInitializers);
            __esDecorate(null, null, _eventUpdates_decorators, { kind: "field", name: "eventUpdates", static: false, private: false, access: { has: obj => "eventUpdates" in obj, get: obj => obj.eventUpdates, set: (obj, value) => { obj.eventUpdates = value; } }, metadata: _metadata }, _eventUpdates_initializers, _eventUpdates_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        email = __runInitializers(this, _email_initializers, void 0);
        productUpdates = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _productUpdates_initializers, void 0));
        eventUpdates = (__runInitializers(this, _productUpdates_extraInitializers), __runInitializers(this, _eventUpdates_initializers, void 0));
        constructor() {
            __runInitializers(this, _eventUpdates_extraInitializers);
        }
    };
})();
let CompleteProfileDto = (() => {
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _firstName_extraInitializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _lastName_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _customerData_decorators;
    let _customerData_initializers = [];
    let _customerData_extraInitializers = [];
    let _studentData_decorators;
    let _studentData_initializers = [];
    let _studentData_extraInitializers = [];
    let _newsletterPreferences_decorators;
    let _newsletterPreferences_initializers = [];
    let _newsletterPreferences_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    return class CompleteProfileDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'First name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _lastName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Last name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Phone number' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _customerData_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Customer data', type: CustomerDataDto }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => CustomerDataDto)];
            _studentData_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Student data', type: StudentDataDto }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => StudentDataDto)];
            _newsletterPreferences_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Newsletter preferences', type: NewsletterPreferencesDto }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => NewsletterPreferencesDto)];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional metadata' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _customerData_decorators, { kind: "field", name: "customerData", static: false, private: false, access: { has: obj => "customerData" in obj, get: obj => obj.customerData, set: (obj, value) => { obj.customerData = value; } }, metadata: _metadata }, _customerData_initializers, _customerData_extraInitializers);
            __esDecorate(null, null, _studentData_decorators, { kind: "field", name: "studentData", static: false, private: false, access: { has: obj => "studentData" in obj, get: obj => obj.studentData, set: (obj, value) => { obj.studentData = value; } }, metadata: _metadata }, _studentData_initializers, _studentData_extraInitializers);
            __esDecorate(null, null, _newsletterPreferences_decorators, { kind: "field", name: "newsletterPreferences", static: false, private: false, access: { has: obj => "newsletterPreferences" in obj, get: obj => obj.newsletterPreferences, set: (obj, value) => { obj.newsletterPreferences = value; } }, metadata: _metadata }, _newsletterPreferences_initializers, _newsletterPreferences_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        firstName = __runInitializers(this, _firstName_initializers, void 0);
        lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
        phone = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
        customerData = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _customerData_initializers, void 0));
        studentData = (__runInitializers(this, _customerData_extraInitializers), __runInitializers(this, _studentData_initializers, void 0));
        newsletterPreferences = (__runInitializers(this, _studentData_extraInitializers), __runInitializers(this, _newsletterPreferences_initializers, void 0));
        metadata = (__runInitializers(this, _newsletterPreferences_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        constructor() {
            __runInitializers(this, _metadata_extraInitializers);
        }
    };
})();
exports.CompleteProfileDto = CompleteProfileDto;
//# sourceMappingURL=complete-profile.dto.js.map