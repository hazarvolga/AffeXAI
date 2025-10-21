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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const shared_types_1 = require("@affexai/shared-types");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
let MediaController = (() => {
    let _classDecorators = [(0, common_1.Controller)('media')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _uploadFile_decorators;
    var MediaController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)()];
            _findAll_decorators = [(0, common_1.Get)()];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _update_decorators = [(0, common_1.Patch)(':id')];
            _remove_decorators = [(0, common_1.Delete)(':id')];
            _uploadFile_decorators = [(0, common_1.Post)('upload'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                    storage: (0, multer_1.diskStorage)({
                        destination: (req, file, cb) => {
                            // Use absolute path to ensure files are saved in correct location
                            const uploadPath = (0, path_1.join)(process.cwd(), 'uploads');
                            cb(null, uploadPath);
                        },
                        filename: (req, file, cb) => {
                            // Generate SEO-friendly filename: original-name-uuid.ext
                            const uniqueSuffix = (0, uuid_1.v4)().split('-')[0]; // Use first part of UUID (8 chars)
                            const ext = (0, path_1.extname)(file.originalname);
                            const basename = file.originalname.replace(ext, '');
                            // Slugify: lowercase, replace spaces/special chars with dash, remove turkish chars
                            const slug = basename
                                .toLowerCase()
                                .replace(/ğ/g, 'g')
                                .replace(/ü/g, 'u')
                                .replace(/ş/g, 's')
                                .replace(/ı/g, 'i')
                                .replace(/ö/g, 'o')
                                .replace(/ç/g, 'c')
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
                            const filename = `${slug}-${uniqueSuffix}${ext}`;
                            cb(null, filename);
                        },
                    }),
                    fileFilter: (req, file, cb) => {
                        // Accept images only
                        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
                            return cb(new Error('Only image files are allowed!'), false);
                        }
                        cb(null, true);
                    },
                    limits: {
                        fileSize: 5 * 1024 * 1024, // 5MB limit
                    },
                }))];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uploadFile_decorators, { kind: "method", name: "uploadFile", static: false, private: false, access: { has: obj => "uploadFile" in obj, get: obj => obj.uploadFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MediaController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        mediaService = __runInitializers(this, _instanceExtraInitializers);
        configService;
        constructor(mediaService, configService) {
            this.mediaService = mediaService;
            this.configService = configService;
        }
        create(createMediaDto) {
            return this.mediaService.create(createMediaDto);
        }
        findAll(type) {
            if (type) {
                return this.mediaService.findByType(type);
            }
            return this.mediaService.findAll();
        }
        findOne(id) {
            return this.mediaService.findOne(id);
        }
        update(id, updateMediaDto) {
            return this.mediaService.update(id, updateMediaDto);
        }
        remove(id) {
            return this.mediaService.remove(id);
        }
        async uploadFile(file) {
            if (!file) {
                throw new common_1.NotFoundException('File not found');
            }
            // Construct the base URL directly
            const protocol = process.env.APP_PROTOCOL || 'http';
            const host = process.env.APP_HOST || 'localhost';
            const port = process.env.PORT || '9005';
            const baseUrl = `${protocol}://${host}:${port}`;
            const createMediaDto = {
                filename: file.filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                url: `${baseUrl}/uploads/${file.filename}`,
                type: shared_types_1.MediaType.IMAGE, // Default to image for now
                storageType: shared_types_1.StorageType.LOCAL,
                isActive: true,
            };
            return this.mediaService.create(createMediaDto);
        }
    };
    return MediaController = _classThis;
})();
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map