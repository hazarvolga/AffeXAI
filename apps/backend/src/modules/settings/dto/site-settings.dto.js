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
exports.SiteSettingsDto = exports.SeoDto = exports.SocialMediaDto = exports.ContactDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ContactDto = (() => {
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _phone_decorators;
    let _phone_initializers = [];
    let _phone_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    return class ContactDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _address_decorators = [(0, class_validator_1.IsString)()];
            _phone_decorators = [(0, class_validator_1.IsString)()];
            _email_decorators = [(0, class_validator_1.IsEmail)()];
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: obj => "phone" in obj, get: obj => obj.phone, set: (obj, value) => { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        address = __runInitializers(this, _address_initializers, void 0);
        phone = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
        email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        constructor() {
            __runInitializers(this, _email_extraInitializers);
        }
    };
})();
exports.ContactDto = ContactDto;
let SocialMediaDto = (() => {
    let _facebook_decorators;
    let _facebook_initializers = [];
    let _facebook_extraInitializers = [];
    let _linkedin_decorators;
    let _linkedin_initializers = [];
    let _linkedin_extraInitializers = [];
    let _twitter_decorators;
    let _twitter_initializers = [];
    let _twitter_extraInitializers = [];
    let _youtube_decorators;
    let _youtube_initializers = [];
    let _youtube_extraInitializers = [];
    let _instagram_decorators;
    let _instagram_initializers = [];
    let _instagram_extraInitializers = [];
    let _pinterest_decorators;
    let _pinterest_initializers = [];
    let _pinterest_extraInitializers = [];
    let _tiktok_decorators;
    let _tiktok_initializers = [];
    let _tiktok_extraInitializers = [];
    return class SocialMediaDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _facebook_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _linkedin_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _twitter_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _youtube_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _instagram_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _pinterest_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tiktok_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _facebook_decorators, { kind: "field", name: "facebook", static: false, private: false, access: { has: obj => "facebook" in obj, get: obj => obj.facebook, set: (obj, value) => { obj.facebook = value; } }, metadata: _metadata }, _facebook_initializers, _facebook_extraInitializers);
            __esDecorate(null, null, _linkedin_decorators, { kind: "field", name: "linkedin", static: false, private: false, access: { has: obj => "linkedin" in obj, get: obj => obj.linkedin, set: (obj, value) => { obj.linkedin = value; } }, metadata: _metadata }, _linkedin_initializers, _linkedin_extraInitializers);
            __esDecorate(null, null, _twitter_decorators, { kind: "field", name: "twitter", static: false, private: false, access: { has: obj => "twitter" in obj, get: obj => obj.twitter, set: (obj, value) => { obj.twitter = value; } }, metadata: _metadata }, _twitter_initializers, _twitter_extraInitializers);
            __esDecorate(null, null, _youtube_decorators, { kind: "field", name: "youtube", static: false, private: false, access: { has: obj => "youtube" in obj, get: obj => obj.youtube, set: (obj, value) => { obj.youtube = value; } }, metadata: _metadata }, _youtube_initializers, _youtube_extraInitializers);
            __esDecorate(null, null, _instagram_decorators, { kind: "field", name: "instagram", static: false, private: false, access: { has: obj => "instagram" in obj, get: obj => obj.instagram, set: (obj, value) => { obj.instagram = value; } }, metadata: _metadata }, _instagram_initializers, _instagram_extraInitializers);
            __esDecorate(null, null, _pinterest_decorators, { kind: "field", name: "pinterest", static: false, private: false, access: { has: obj => "pinterest" in obj, get: obj => obj.pinterest, set: (obj, value) => { obj.pinterest = value; } }, metadata: _metadata }, _pinterest_initializers, _pinterest_extraInitializers);
            __esDecorate(null, null, _tiktok_decorators, { kind: "field", name: "tiktok", static: false, private: false, access: { has: obj => "tiktok" in obj, get: obj => obj.tiktok, set: (obj, value) => { obj.tiktok = value; } }, metadata: _metadata }, _tiktok_initializers, _tiktok_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        facebook = __runInitializers(this, _facebook_initializers, void 0);
        linkedin = (__runInitializers(this, _facebook_extraInitializers), __runInitializers(this, _linkedin_initializers, void 0));
        twitter = (__runInitializers(this, _linkedin_extraInitializers), __runInitializers(this, _twitter_initializers, void 0));
        youtube = (__runInitializers(this, _twitter_extraInitializers), __runInitializers(this, _youtube_initializers, void 0));
        instagram = (__runInitializers(this, _youtube_extraInitializers), __runInitializers(this, _instagram_initializers, void 0));
        pinterest = (__runInitializers(this, _instagram_extraInitializers), __runInitializers(this, _pinterest_initializers, void 0));
        tiktok = (__runInitializers(this, _pinterest_extraInitializers), __runInitializers(this, _tiktok_initializers, void 0));
        constructor() {
            __runInitializers(this, _tiktok_extraInitializers);
        }
    };
})();
exports.SocialMediaDto = SocialMediaDto;
let SeoDto = (() => {
    let _defaultTitle_decorators;
    let _defaultTitle_initializers = [];
    let _defaultTitle_extraInitializers = [];
    let _defaultDescription_decorators;
    let _defaultDescription_initializers = [];
    let _defaultDescription_extraInitializers = [];
    return class SeoDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _defaultTitle_decorators = [(0, class_validator_1.IsString)()];
            _defaultDescription_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _defaultTitle_decorators, { kind: "field", name: "defaultTitle", static: false, private: false, access: { has: obj => "defaultTitle" in obj, get: obj => obj.defaultTitle, set: (obj, value) => { obj.defaultTitle = value; } }, metadata: _metadata }, _defaultTitle_initializers, _defaultTitle_extraInitializers);
            __esDecorate(null, null, _defaultDescription_decorators, { kind: "field", name: "defaultDescription", static: false, private: false, access: { has: obj => "defaultDescription" in obj, get: obj => obj.defaultDescription, set: (obj, value) => { obj.defaultDescription = value; } }, metadata: _metadata }, _defaultDescription_initializers, _defaultDescription_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        defaultTitle = __runInitializers(this, _defaultTitle_initializers, void 0);
        defaultDescription = (__runInitializers(this, _defaultTitle_extraInitializers), __runInitializers(this, _defaultDescription_initializers, void 0));
        constructor() {
            __runInitializers(this, _defaultDescription_extraInitializers);
        }
    };
})();
exports.SeoDto = SeoDto;
let SiteSettingsDto = (() => {
    let _companyName_decorators;
    let _companyName_initializers = [];
    let _companyName_extraInitializers = [];
    let _logoUrl_decorators;
    let _logoUrl_initializers = [];
    let _logoUrl_extraInitializers = [];
    let _logoDarkUrl_decorators;
    let _logoDarkUrl_initializers = [];
    let _logoDarkUrl_extraInitializers = [];
    let _contact_decorators;
    let _contact_initializers = [];
    let _contact_extraInitializers = [];
    let _socialMedia_decorators;
    let _socialMedia_initializers = [];
    let _socialMedia_extraInitializers = [];
    let _seo_decorators;
    let _seo_initializers = [];
    let _seo_extraInitializers = [];
    return class SiteSettingsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _companyName_decorators = [(0, class_validator_1.IsString)()];
            _logoUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _logoDarkUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _contact_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => ContactDto)];
            _socialMedia_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => SocialMediaDto)];
            _seo_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => SeoDto)];
            __esDecorate(null, null, _companyName_decorators, { kind: "field", name: "companyName", static: false, private: false, access: { has: obj => "companyName" in obj, get: obj => obj.companyName, set: (obj, value) => { obj.companyName = value; } }, metadata: _metadata }, _companyName_initializers, _companyName_extraInitializers);
            __esDecorate(null, null, _logoUrl_decorators, { kind: "field", name: "logoUrl", static: false, private: false, access: { has: obj => "logoUrl" in obj, get: obj => obj.logoUrl, set: (obj, value) => { obj.logoUrl = value; } }, metadata: _metadata }, _logoUrl_initializers, _logoUrl_extraInitializers);
            __esDecorate(null, null, _logoDarkUrl_decorators, { kind: "field", name: "logoDarkUrl", static: false, private: false, access: { has: obj => "logoDarkUrl" in obj, get: obj => obj.logoDarkUrl, set: (obj, value) => { obj.logoDarkUrl = value; } }, metadata: _metadata }, _logoDarkUrl_initializers, _logoDarkUrl_extraInitializers);
            __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: obj => "contact" in obj, get: obj => obj.contact, set: (obj, value) => { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
            __esDecorate(null, null, _socialMedia_decorators, { kind: "field", name: "socialMedia", static: false, private: false, access: { has: obj => "socialMedia" in obj, get: obj => obj.socialMedia, set: (obj, value) => { obj.socialMedia = value; } }, metadata: _metadata }, _socialMedia_initializers, _socialMedia_extraInitializers);
            __esDecorate(null, null, _seo_decorators, { kind: "field", name: "seo", static: false, private: false, access: { has: obj => "seo" in obj, get: obj => obj.seo, set: (obj, value) => { obj.seo = value; } }, metadata: _metadata }, _seo_initializers, _seo_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        companyName = __runInitializers(this, _companyName_initializers, void 0);
        logoUrl = (__runInitializers(this, _companyName_extraInitializers), __runInitializers(this, _logoUrl_initializers, void 0));
        logoDarkUrl = (__runInitializers(this, _logoUrl_extraInitializers), __runInitializers(this, _logoDarkUrl_initializers, void 0));
        contact = (__runInitializers(this, _logoDarkUrl_extraInitializers), __runInitializers(this, _contact_initializers, void 0));
        socialMedia = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _socialMedia_initializers, void 0));
        seo = (__runInitializers(this, _socialMedia_extraInitializers), __runInitializers(this, _seo_initializers, void 0));
        constructor() {
            __runInitializers(this, _seo_extraInitializers);
        }
    };
})();
exports.SiteSettingsDto = SiteSettingsDto;
//# sourceMappingURL=site-settings.dto.js.map