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
exports.CreateMediaDto = void 0;
const class_validator_1 = require("class-validator");
const shared_types_1 = require("@affexai/shared-types");
let CreateMediaDto = (() => {
    let _filename_decorators;
    let _filename_initializers = [];
    let _filename_extraInitializers = [];
    let _originalName_decorators;
    let _originalName_initializers = [];
    let _originalName_extraInitializers = [];
    let _mimeType_decorators;
    let _mimeType_initializers = [];
    let _mimeType_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _thumbnailUrl_decorators;
    let _thumbnailUrl_initializers = [];
    let _thumbnailUrl_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _storageType_decorators;
    let _storageType_initializers = [];
    let _storageType_extraInitializers = [];
    let _altText_decorators;
    let _altText_initializers = [];
    let _altText_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    return class CreateMediaDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _filename_decorators = [(0, class_validator_1.IsString)()];
            _originalName_decorators = [(0, class_validator_1.IsString)()];
            _mimeType_decorators = [(0, class_validator_1.IsString)()];
            _size_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
            _url_decorators = [(0, class_validator_1.IsString)()];
            _thumbnailUrl_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _type_decorators = [(0, class_validator_1.IsEnum)(shared_types_1.MediaType), (0, class_validator_1.IsOptional)()];
            _storageType_decorators = [(0, class_validator_1.IsEnum)(shared_types_1.StorageType), (0, class_validator_1.IsOptional)()];
            _altText_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _title_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: obj => "filename" in obj, get: obj => obj.filename, set: (obj, value) => { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _originalName_decorators, { kind: "field", name: "originalName", static: false, private: false, access: { has: obj => "originalName" in obj, get: obj => obj.originalName, set: (obj, value) => { obj.originalName = value; } }, metadata: _metadata }, _originalName_initializers, _originalName_extraInitializers);
            __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: obj => "mimeType" in obj, get: obj => obj.mimeType, set: (obj, value) => { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
            __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _thumbnailUrl_decorators, { kind: "field", name: "thumbnailUrl", static: false, private: false, access: { has: obj => "thumbnailUrl" in obj, get: obj => obj.thumbnailUrl, set: (obj, value) => { obj.thumbnailUrl = value; } }, metadata: _metadata }, _thumbnailUrl_initializers, _thumbnailUrl_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _storageType_decorators, { kind: "field", name: "storageType", static: false, private: false, access: { has: obj => "storageType" in obj, get: obj => obj.storageType, set: (obj, value) => { obj.storageType = value; } }, metadata: _metadata }, _storageType_initializers, _storageType_extraInitializers);
            __esDecorate(null, null, _altText_decorators, { kind: "field", name: "altText", static: false, private: false, access: { has: obj => "altText" in obj, get: obj => obj.altText, set: (obj, value) => { obj.altText = value; } }, metadata: _metadata }, _altText_initializers, _altText_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        filename = __runInitializers(this, _filename_initializers, void 0);
        originalName = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _originalName_initializers, void 0));
        mimeType = (__runInitializers(this, _originalName_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
        size = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _size_initializers, void 0));
        url = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _url_initializers, void 0));
        thumbnailUrl = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _thumbnailUrl_initializers, void 0));
        type = (__runInitializers(this, _thumbnailUrl_extraInitializers), __runInitializers(this, _type_initializers, void 0));
        storageType = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _storageType_initializers, void 0));
        altText = (__runInitializers(this, _storageType_extraInitializers), __runInitializers(this, _altText_initializers, void 0));
        title = (__runInitializers(this, _altText_extraInitializers), __runInitializers(this, _title_initializers, void 0));
        description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        constructor() {
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
exports.CreateMediaDto = CreateMediaDto;
//# sourceMappingURL=create-media.dto.js.map