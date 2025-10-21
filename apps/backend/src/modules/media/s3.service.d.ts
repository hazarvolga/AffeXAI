import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private readonly configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bucketName;
    constructor(configService: ConfigService);
    uploadFile(fileName: string, fileBuffer: Buffer, mimeType: string): Promise<string>;
    deleteFile(key: string): Promise<void>;
    getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}
//# sourceMappingURL=s3.service.d.ts.map