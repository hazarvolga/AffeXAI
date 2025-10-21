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
exports.EmailSettingsMaskedDto = exports.EmailSettingsDto = exports.SMTPConfigDto = exports.SESConfigDto = exports.MailgunConfigDto = exports.PostmarkConfigDto = exports.SendGridConfigDto = exports.ResendConfigDto = exports.RateLimitDto = exports.TrackingSettingsDto = exports.MarketingEmailDto = exports.TransactionalEmailDto = exports.EmailProvider = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var EmailProvider;
(function (EmailProvider) {
    EmailProvider["RESEND"] = "resend";
    EmailProvider["SENDGRID"] = "sendgrid";
    EmailProvider["POSTMARK"] = "postmark";
    EmailProvider["MAILGUN"] = "mailgun";
    EmailProvider["SES"] = "ses";
    EmailProvider["SMTP"] = "smtp";
})(EmailProvider || (exports.EmailProvider = EmailProvider = {}));
let TransactionalEmailDto = (() => {
    let _domain_decorators;
    let _domain_initializers = [];
    let _domain_extraInitializers = [];
    let _fromName_decorators;
    let _fromName_initializers = [];
    let _fromName_extraInitializers = [];
    let _fromEmail_decorators;
    let _fromEmail_initializers = [];
    let _fromEmail_extraInitializers = [];
    let _replyToEmail_decorators;
    let _replyToEmail_initializers = [];
    let _replyToEmail_extraInitializers = [];
    return class TransactionalEmailDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _domain_decorators = [(0, class_validator_1.IsString)()];
            _fromName_decorators = [(0, class_validator_1.IsString)()];
            _fromEmail_decorators = [(0, class_validator_1.IsEmail)()];
            _replyToEmail_decorators = [(0, class_validator_1.IsEmail)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: obj => "domain" in obj, get: obj => obj.domain, set: (obj, value) => { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
            __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: obj => "fromName" in obj, get: obj => obj.fromName, set: (obj, value) => { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
            __esDecorate(null, null, _fromEmail_decorators, { kind: "field", name: "fromEmail", static: false, private: false, access: { has: obj => "fromEmail" in obj, get: obj => obj.fromEmail, set: (obj, value) => { obj.fromEmail = value; } }, metadata: _metadata }, _fromEmail_initializers, _fromEmail_extraInitializers);
            __esDecorate(null, null, _replyToEmail_decorators, { kind: "field", name: "replyToEmail", static: false, private: false, access: { has: obj => "replyToEmail" in obj, get: obj => obj.replyToEmail, set: (obj, value) => { obj.replyToEmail = value; } }, metadata: _metadata }, _replyToEmail_initializers, _replyToEmail_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        domain = __runInitializers(this, _domain_initializers, void 0);
        fromName = (__runInitializers(this, _domain_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
        fromEmail = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _fromEmail_initializers, void 0));
        replyToEmail = (__runInitializers(this, _fromEmail_extraInitializers), __runInitializers(this, _replyToEmail_initializers, void 0));
        constructor() {
            __runInitializers(this, _replyToEmail_extraInitializers);
        }
    };
})();
exports.TransactionalEmailDto = TransactionalEmailDto;
let MarketingEmailDto = (() => {
    let _domain_decorators;
    let _domain_initializers = [];
    let _domain_extraInitializers = [];
    let _fromName_decorators;
    let _fromName_initializers = [];
    let _fromName_extraInitializers = [];
    let _fromEmail_decorators;
    let _fromEmail_initializers = [];
    let _fromEmail_extraInitializers = [];
    let _replyToEmail_decorators;
    let _replyToEmail_initializers = [];
    let _replyToEmail_extraInitializers = [];
    return class MarketingEmailDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _domain_decorators = [(0, class_validator_1.IsString)()];
            _fromName_decorators = [(0, class_validator_1.IsString)()];
            _fromEmail_decorators = [(0, class_validator_1.IsEmail)()];
            _replyToEmail_decorators = [(0, class_validator_1.IsEmail)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: obj => "domain" in obj, get: obj => obj.domain, set: (obj, value) => { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
            __esDecorate(null, null, _fromName_decorators, { kind: "field", name: "fromName", static: false, private: false, access: { has: obj => "fromName" in obj, get: obj => obj.fromName, set: (obj, value) => { obj.fromName = value; } }, metadata: _metadata }, _fromName_initializers, _fromName_extraInitializers);
            __esDecorate(null, null, _fromEmail_decorators, { kind: "field", name: "fromEmail", static: false, private: false, access: { has: obj => "fromEmail" in obj, get: obj => obj.fromEmail, set: (obj, value) => { obj.fromEmail = value; } }, metadata: _metadata }, _fromEmail_initializers, _fromEmail_extraInitializers);
            __esDecorate(null, null, _replyToEmail_decorators, { kind: "field", name: "replyToEmail", static: false, private: false, access: { has: obj => "replyToEmail" in obj, get: obj => obj.replyToEmail, set: (obj, value) => { obj.replyToEmail = value; } }, metadata: _metadata }, _replyToEmail_initializers, _replyToEmail_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        domain = __runInitializers(this, _domain_initializers, void 0);
        fromName = (__runInitializers(this, _domain_extraInitializers), __runInitializers(this, _fromName_initializers, void 0));
        fromEmail = (__runInitializers(this, _fromName_extraInitializers), __runInitializers(this, _fromEmail_initializers, void 0));
        replyToEmail = (__runInitializers(this, _fromEmail_extraInitializers), __runInitializers(this, _replyToEmail_initializers, void 0));
        constructor() {
            __runInitializers(this, _replyToEmail_extraInitializers);
        }
    };
})();
exports.MarketingEmailDto = MarketingEmailDto;
let TrackingSettingsDto = (() => {
    let _clickTracking_decorators;
    let _clickTracking_initializers = [];
    let _clickTracking_extraInitializers = [];
    let _openTracking_decorators;
    let _openTracking_initializers = [];
    let _openTracking_extraInitializers = [];
    return class TrackingSettingsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _clickTracking_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _openTracking_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _clickTracking_decorators, { kind: "field", name: "clickTracking", static: false, private: false, access: { has: obj => "clickTracking" in obj, get: obj => obj.clickTracking, set: (obj, value) => { obj.clickTracking = value; } }, metadata: _metadata }, _clickTracking_initializers, _clickTracking_extraInitializers);
            __esDecorate(null, null, _openTracking_decorators, { kind: "field", name: "openTracking", static: false, private: false, access: { has: obj => "openTracking" in obj, get: obj => obj.openTracking, set: (obj, value) => { obj.openTracking = value; } }, metadata: _metadata }, _openTracking_initializers, _openTracking_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        clickTracking = __runInitializers(this, _clickTracking_initializers, void 0);
        openTracking = (__runInitializers(this, _clickTracking_extraInitializers), __runInitializers(this, _openTracking_initializers, void 0));
        constructor() {
            __runInitializers(this, _openTracking_extraInitializers);
        }
    };
})();
exports.TrackingSettingsDto = TrackingSettingsDto;
let RateLimitDto = (() => {
    let _transactional_decorators;
    let _transactional_initializers = [];
    let _transactional_extraInitializers = [];
    let _marketing_decorators;
    let _marketing_initializers = [];
    let _marketing_extraInitializers = [];
    return class RateLimitDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transactional_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(10000)];
            _marketing_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(10000)];
            __esDecorate(null, null, _transactional_decorators, { kind: "field", name: "transactional", static: false, private: false, access: { has: obj => "transactional" in obj, get: obj => obj.transactional, set: (obj, value) => { obj.transactional = value; } }, metadata: _metadata }, _transactional_initializers, _transactional_extraInitializers);
            __esDecorate(null, null, _marketing_decorators, { kind: "field", name: "marketing", static: false, private: false, access: { has: obj => "marketing" in obj, get: obj => obj.marketing, set: (obj, value) => { obj.marketing = value; } }, metadata: _metadata }, _marketing_initializers, _marketing_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        transactional = __runInitializers(this, _transactional_initializers, void 0);
        marketing = (__runInitializers(this, _transactional_extraInitializers), __runInitializers(this, _marketing_initializers, void 0));
        constructor() {
            __runInitializers(this, _marketing_extraInitializers);
        }
    };
})();
exports.RateLimitDto = RateLimitDto;
let ResendConfigDto = (() => {
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    return class ResendConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _apiKey_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _apiKey_initializers, void 0); // Will be encrypted
        constructor() {
            __runInitializers(this, _apiKey_extraInitializers);
        }
    };
})();
exports.ResendConfigDto = ResendConfigDto;
let SendGridConfigDto = (() => {
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    return class SendGridConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _apiKey_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _apiKey_initializers, void 0); // Will be encrypted
        constructor() {
            __runInitializers(this, _apiKey_extraInitializers);
        }
    };
})();
exports.SendGridConfigDto = SendGridConfigDto;
let PostmarkConfigDto = (() => {
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    return class PostmarkConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _apiKey_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _apiKey_initializers, void 0); // Will be encrypted
        constructor() {
            __runInitializers(this, _apiKey_extraInitializers);
        }
    };
})();
exports.PostmarkConfigDto = PostmarkConfigDto;
let MailgunConfigDto = (() => {
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    let _domain_decorators;
    let _domain_initializers = [];
    let _domain_extraInitializers = [];
    return class MailgunConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _apiKey_decorators = [(0, class_validator_1.IsString)()];
            _domain_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: obj => "domain" in obj, get: obj => obj.domain, set: (obj, value) => { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _apiKey_initializers, void 0); // Will be encrypted
        domain = (__runInitializers(this, _apiKey_extraInitializers), __runInitializers(this, _domain_initializers, void 0));
        constructor() {
            __runInitializers(this, _domain_extraInitializers);
        }
    };
})();
exports.MailgunConfigDto = MailgunConfigDto;
let SESConfigDto = (() => {
    let _accessKey_decorators;
    let _accessKey_initializers = [];
    let _accessKey_extraInitializers = [];
    let _secretKey_decorators;
    let _secretKey_initializers = [];
    let _secretKey_extraInitializers = [];
    let _region_decorators;
    let _region_initializers = [];
    let _region_extraInitializers = [];
    return class SESConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _accessKey_decorators = [(0, class_validator_1.IsString)()];
            _secretKey_decorators = [(0, class_validator_1.IsString)()];
            _region_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _accessKey_decorators, { kind: "field", name: "accessKey", static: false, private: false, access: { has: obj => "accessKey" in obj, get: obj => obj.accessKey, set: (obj, value) => { obj.accessKey = value; } }, metadata: _metadata }, _accessKey_initializers, _accessKey_extraInitializers);
            __esDecorate(null, null, _secretKey_decorators, { kind: "field", name: "secretKey", static: false, private: false, access: { has: obj => "secretKey" in obj, get: obj => obj.secretKey, set: (obj, value) => { obj.secretKey = value; } }, metadata: _metadata }, _secretKey_initializers, _secretKey_extraInitializers);
            __esDecorate(null, null, _region_decorators, { kind: "field", name: "region", static: false, private: false, access: { has: obj => "region" in obj, get: obj => obj.region, set: (obj, value) => { obj.region = value; } }, metadata: _metadata }, _region_initializers, _region_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        accessKey = __runInitializers(this, _accessKey_initializers, void 0); // Will be encrypted
        secretKey = (__runInitializers(this, _accessKey_extraInitializers), __runInitializers(this, _secretKey_initializers, void 0)); // Will be encrypted
        region = (__runInitializers(this, _secretKey_extraInitializers), __runInitializers(this, _region_initializers, void 0));
        constructor() {
            __runInitializers(this, _region_extraInitializers);
        }
    };
})();
exports.SESConfigDto = SESConfigDto;
let SMTPConfigDto = (() => {
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _port_decorators;
    let _port_initializers = [];
    let _port_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    let _secure_decorators;
    let _secure_initializers = [];
    let _secure_extraInitializers = [];
    return class SMTPConfigDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _host_decorators = [(0, class_validator_1.IsString)()];
            _port_decorators = [(0, class_validator_1.IsNumber)()];
            _user_decorators = [(0, class_validator_1.IsString)()];
            _password_decorators = [(0, class_validator_1.IsString)()];
            _secure_decorators = [(0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _host_decorators, { kind: "field", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(null, null, _port_decorators, { kind: "field", name: "port", static: false, private: false, access: { has: obj => "port" in obj, get: obj => obj.port, set: (obj, value) => { obj.port = value; } }, metadata: _metadata }, _port_initializers, _port_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _secure_decorators, { kind: "field", name: "secure", static: false, private: false, access: { has: obj => "secure" in obj, get: obj => obj.secure, set: (obj, value) => { obj.secure = value; } }, metadata: _metadata }, _secure_initializers, _secure_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        host = __runInitializers(this, _host_initializers, void 0);
        port = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _port_initializers, void 0));
        user = (__runInitializers(this, _port_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        password = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _password_initializers, void 0)); // Will be encrypted
        secure = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _secure_initializers, void 0));
        constructor() {
            __runInitializers(this, _secure_extraInitializers);
        }
    };
})();
exports.SMTPConfigDto = SMTPConfigDto;
let EmailSettingsDto = (() => {
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _transactional_decorators;
    let _transactional_initializers = [];
    let _transactional_extraInitializers = [];
    let _marketing_decorators;
    let _marketing_initializers = [];
    let _marketing_extraInitializers = [];
    let _tracking_decorators;
    let _tracking_initializers = [];
    let _tracking_extraInitializers = [];
    let _rateLimit_decorators;
    let _rateLimit_initializers = [];
    let _rateLimit_extraInitializers = [];
    let _resend_decorators;
    let _resend_initializers = [];
    let _resend_extraInitializers = [];
    let _sendgrid_decorators;
    let _sendgrid_initializers = [];
    let _sendgrid_extraInitializers = [];
    let _postmark_decorators;
    let _postmark_initializers = [];
    let _postmark_extraInitializers = [];
    let _mailgun_decorators;
    let _mailgun_initializers = [];
    let _mailgun_extraInitializers = [];
    let _ses_decorators;
    let _ses_initializers = [];
    let _ses_extraInitializers = [];
    let _smtp_decorators;
    let _smtp_initializers = [];
    let _smtp_extraInitializers = [];
    return class EmailSettingsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _provider_decorators = [(0, class_validator_1.IsEnum)(EmailProvider)];
            _transactional_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => TransactionalEmailDto)];
            _marketing_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => MarketingEmailDto)];
            _tracking_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => TrackingSettingsDto)];
            _rateLimit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => RateLimitDto)];
            _resend_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => ResendConfigDto)];
            _sendgrid_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => SendGridConfigDto)];
            _postmark_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => PostmarkConfigDto)];
            _mailgun_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => MailgunConfigDto)];
            _ses_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => SESConfigDto)];
            _smtp_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => SMTPConfigDto)];
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _transactional_decorators, { kind: "field", name: "transactional", static: false, private: false, access: { has: obj => "transactional" in obj, get: obj => obj.transactional, set: (obj, value) => { obj.transactional = value; } }, metadata: _metadata }, _transactional_initializers, _transactional_extraInitializers);
            __esDecorate(null, null, _marketing_decorators, { kind: "field", name: "marketing", static: false, private: false, access: { has: obj => "marketing" in obj, get: obj => obj.marketing, set: (obj, value) => { obj.marketing = value; } }, metadata: _metadata }, _marketing_initializers, _marketing_extraInitializers);
            __esDecorate(null, null, _tracking_decorators, { kind: "field", name: "tracking", static: false, private: false, access: { has: obj => "tracking" in obj, get: obj => obj.tracking, set: (obj, value) => { obj.tracking = value; } }, metadata: _metadata }, _tracking_initializers, _tracking_extraInitializers);
            __esDecorate(null, null, _rateLimit_decorators, { kind: "field", name: "rateLimit", static: false, private: false, access: { has: obj => "rateLimit" in obj, get: obj => obj.rateLimit, set: (obj, value) => { obj.rateLimit = value; } }, metadata: _metadata }, _rateLimit_initializers, _rateLimit_extraInitializers);
            __esDecorate(null, null, _resend_decorators, { kind: "field", name: "resend", static: false, private: false, access: { has: obj => "resend" in obj, get: obj => obj.resend, set: (obj, value) => { obj.resend = value; } }, metadata: _metadata }, _resend_initializers, _resend_extraInitializers);
            __esDecorate(null, null, _sendgrid_decorators, { kind: "field", name: "sendgrid", static: false, private: false, access: { has: obj => "sendgrid" in obj, get: obj => obj.sendgrid, set: (obj, value) => { obj.sendgrid = value; } }, metadata: _metadata }, _sendgrid_initializers, _sendgrid_extraInitializers);
            __esDecorate(null, null, _postmark_decorators, { kind: "field", name: "postmark", static: false, private: false, access: { has: obj => "postmark" in obj, get: obj => obj.postmark, set: (obj, value) => { obj.postmark = value; } }, metadata: _metadata }, _postmark_initializers, _postmark_extraInitializers);
            __esDecorate(null, null, _mailgun_decorators, { kind: "field", name: "mailgun", static: false, private: false, access: { has: obj => "mailgun" in obj, get: obj => obj.mailgun, set: (obj, value) => { obj.mailgun = value; } }, metadata: _metadata }, _mailgun_initializers, _mailgun_extraInitializers);
            __esDecorate(null, null, _ses_decorators, { kind: "field", name: "ses", static: false, private: false, access: { has: obj => "ses" in obj, get: obj => obj.ses, set: (obj, value) => { obj.ses = value; } }, metadata: _metadata }, _ses_initializers, _ses_extraInitializers);
            __esDecorate(null, null, _smtp_decorators, { kind: "field", name: "smtp", static: false, private: false, access: { has: obj => "smtp" in obj, get: obj => obj.smtp, set: (obj, value) => { obj.smtp = value; } }, metadata: _metadata }, _smtp_initializers, _smtp_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        provider = __runInitializers(this, _provider_initializers, void 0);
        transactional = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _transactional_initializers, void 0));
        marketing = (__runInitializers(this, _transactional_extraInitializers), __runInitializers(this, _marketing_initializers, void 0));
        tracking = (__runInitializers(this, _marketing_extraInitializers), __runInitializers(this, _tracking_initializers, void 0));
        rateLimit = (__runInitializers(this, _tracking_extraInitializers), __runInitializers(this, _rateLimit_initializers, void 0));
        // Provider-specific configs (only one will be used based on provider selection)
        resend = (__runInitializers(this, _rateLimit_extraInitializers), __runInitializers(this, _resend_initializers, void 0));
        sendgrid = (__runInitializers(this, _resend_extraInitializers), __runInitializers(this, _sendgrid_initializers, void 0));
        postmark = (__runInitializers(this, _sendgrid_extraInitializers), __runInitializers(this, _postmark_initializers, void 0));
        mailgun = (__runInitializers(this, _postmark_extraInitializers), __runInitializers(this, _mailgun_initializers, void 0));
        ses = (__runInitializers(this, _mailgun_extraInitializers), __runInitializers(this, _ses_initializers, void 0));
        smtp = (__runInitializers(this, _ses_extraInitializers), __runInitializers(this, _smtp_initializers, void 0));
        constructor() {
            __runInitializers(this, _smtp_extraInitializers);
        }
    };
})();
exports.EmailSettingsDto = EmailSettingsDto;
/**
 * Masked version for client (API keys hidden)
 */
class EmailSettingsMaskedDto {
    provider;
    transactional;
    marketing;
    tracking;
    rateLimit;
    resend; // Will show "***" instead of real key
    sendgrid;
    postmark;
    mailgun;
    ses;
    smtp;
    /**
     * Mask sensitive fields
     */
    static mask(settings) {
        const masked = { ...settings };
        if (masked.resend?.apiKey) {
            masked.resend.apiKey = '***' + masked.resend.apiKey.slice(-4);
        }
        if (masked.sendgrid?.apiKey) {
            masked.sendgrid.apiKey = '***' + masked.sendgrid.apiKey.slice(-4);
        }
        if (masked.postmark?.apiKey) {
            masked.postmark.apiKey = '***' + masked.postmark.apiKey.slice(-4);
        }
        if (masked.mailgun?.apiKey) {
            masked.mailgun.apiKey = '***' + masked.mailgun.apiKey.slice(-4);
        }
        if (masked.ses?.accessKey) {
            masked.ses.accessKey = '***' + masked.ses.accessKey.slice(-4);
        }
        if (masked.ses?.secretKey) {
            masked.ses.secretKey = '***';
        }
        if (masked.smtp?.password) {
            masked.smtp.password = '***';
        }
        return masked;
    }
}
exports.EmailSettingsMaskedDto = EmailSettingsMaskedDto;
//# sourceMappingURL=email-settings.dto.js.map