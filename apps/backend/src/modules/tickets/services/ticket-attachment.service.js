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
exports.TicketAttachmentService = void 0;
const common_1 = require("@nestjs/common");
const shared_types_1 = require("@affexai/shared-types");
const uuid_1 = require("uuid");
let TicketAttachmentService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketAttachmentService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAttachmentService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        mediaService;
        logger = new common_1.Logger(TicketAttachmentService.name);
        constructor(mediaService) {
            this.mediaService = mediaService;
        }
        /**
         * Handle ticket attachment upload
         */
        async uploadAttachment(file, uploaderId) {
            try {
                // Validate file
                this.validateFile(file);
                // Determine media type based on MIME type
                const mediaType = this.determineMediaType(file.mimetype);
                // Create media entity
                const media = await this.mediaService.create({
                    filename: `${(0, uuid_1.v4)()}-${file.originalname}`,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    url: `/uploads/tickets/${(0, uuid_1.v4)()}-${file.originalname}`,
                    type: mediaType,
                    storageType: shared_types_1.StorageType.LOCAL,
                    title: file.originalname,
                    description: `Ticket attachment uploaded by ${uploaderId}`,
                    isActive: true,
                });
                const attachment = {
                    id: media.id,
                    filename: media.filename,
                    originalName: media.originalName,
                    mimeType: media.mimeType,
                    size: media.size,
                    url: media.url,
                    type: media.type,
                    uploadedAt: new Date(),
                };
                this.logger.log(`Ticket attachment uploaded: ${file.originalname} (${file.size} bytes)`);
                return attachment;
            }
            catch (error) {
                this.logger.error(`Failed to upload ticket attachment: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get attachment by ID
         */
        async getAttachment(id) {
            try {
                const media = await this.mediaService.findOne(id);
                if (!media) {
                    return null;
                }
                return {
                    id: media.id,
                    filename: media.filename,
                    originalName: media.originalName,
                    mimeType: media.mimeType,
                    size: media.size,
                    url: media.url,
                    type: media.type,
                    uploadedAt: media.createdAt,
                };
            }
            catch (error) {
                this.logger.error(`Failed to get ticket attachment: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Validate uploaded file
         */
        validateFile(file) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            // Check file size (max 10MB for ticket attachments)
            if (file.size > 10 * 1024 * 1024) {
                throw new common_1.BadRequestException('File size exceeds maximum allowed size of 10MB');
            }
            // Check file type
            const allowedTypes = [
                // Images
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                // Documents
                'text/plain',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                // Text files
                'text/csv',
                'text/markdown',
            ];
            if (!allowedTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`File type ${file.mimetype} is not allowed for ticket attachments`);
            }
        }
        /**
         * Determine media type based on MIME type
         */
        determineMediaType(mimeType) {
            if (mimeType.startsWith('image/')) {
                return shared_types_1.MediaType.IMAGE;
            }
            if (mimeType.startsWith('video/')) {
                return shared_types_1.MediaType.VIDEO;
            }
            if (mimeType.startsWith('audio/')) {
                return shared_types_1.MediaType.AUDIO;
            }
            return shared_types_1.MediaType.DOCUMENT;
        }
    };
    return TicketAttachmentService = _classThis;
})();
exports.TicketAttachmentService = TicketAttachmentService;
//# sourceMappingURL=ticket-attachment.service.js.map