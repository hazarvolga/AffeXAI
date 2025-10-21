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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var S3Service = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            S3Service = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configService;
        logger = new common_1.Logger(S3Service.name);
        s3Client;
        bucketName;
        constructor(configService) {
            this.configService = configService;
            const bucketName = this.configService.get('S3_BUCKET_NAME');
            if (!bucketName) {
                throw new Error('S3_BUCKET_NAME is not defined in environment variables');
            }
            this.bucketName = bucketName;
            const endpoint = this.configService.get('S3_ENDPOINT');
            const accessKeyId = this.configService.get('S3_ACCESS_KEY');
            const secretAccessKey = this.configService.get('S3_SECRET_KEY');
            if (!endpoint || !accessKeyId || !secretAccessKey) {
                throw new Error('S3 configuration is incomplete in environment variables');
            }
            this.s3Client = new client_s3_1.S3Client({
                endpoint,
                region: this.configService.get('S3_REGION', 'us-east-1'),
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
                forcePathStyle: true, // Needed for MinIO
            });
        }
        async uploadFile(fileName, fileBuffer, mimeType) {
            try {
                const key = `${Date.now()}-${fileName}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    Body: fileBuffer,
                    ContentType: mimeType,
                });
                await this.s3Client.send(command);
                // Return the URL to access the file
                const fileUrl = `${this.configService.get('S3_ENDPOINT')}/${this.bucketName}/${key}`;
                this.logger.log(`File uploaded successfully: ${fileUrl}`);
                return fileUrl;
            }
            catch (error) {
                this.logger.error(`Failed to upload file: ${error.message}`);
                throw error;
            }
        }
        async deleteFile(key) {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });
                await this.s3Client.send(command);
                this.logger.log(`File deleted successfully: ${key}`);
            }
            catch (error) {
                this.logger.error(`Failed to delete file: ${error.message}`);
                throw error;
            }
        }
        async getSignedUrl(key, expiresIn = 3600) {
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                });
                const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                    expiresIn,
                });
                return signedUrl;
            }
            catch (error) {
                this.logger.error(`Failed to generate signed URL: ${error.message}`);
                throw error;
            }
        }
    };
    return S3Service = _classThis;
})();
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map