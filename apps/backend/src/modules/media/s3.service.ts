import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client | null = null;
  private readonly bucketName: string | null = null;
  private readonly isConfigured: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const bucketName = this.configService.get<string>('S3_BUCKET_NAME');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('S3_SECRET_KEY');

    // Check if S3 is fully configured
    if (!bucketName || !endpoint || !accessKeyId || !secretAccessKey) {
      this.logger.warn(
        '⚠️ S3 configuration is incomplete. File upload features will be disabled. ' +
        'Missing: ' +
        (!bucketName ? 'S3_BUCKET_NAME ' : '') +
        (!endpoint ? 'S3_ENDPOINT ' : '') +
        (!accessKeyId ? 'S3_ACCESS_KEY ' : '') +
        (!secretAccessKey ? 'S3_SECRET_KEY ' : ''),
      );
      return;
    }

    try {
      this.bucketName = bucketName;
      this.s3Client = new S3Client({
        endpoint,
        region: this.configService.get<string>('S3_REGION', 'us-east-1'),
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        forcePathStyle: true, // Needed for MinIO
      });
      this.isConfigured = true;
      this.logger.log('✅ S3 Service configured successfully');
    } catch (error) {
      this.logger.error('❌ Failed to configure S3 Service:', error.message);
    }
  }

  async uploadFile(
    fileName: string,
    fileBuffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      this.logger.warn('S3 is not configured, file upload skipped');
      throw new Error('S3 service is not configured. Please configure S3 environment variables.');
    }

    try {
      const key = `${Date.now()}-${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);

      // Return the URL to access the file
      const fileUrl = `${this.configService.get<string>('S3_ENDPOINT')}/${this.bucketName}/${key}`;
      this.logger.log(`File uploaded successfully: ${fileUrl}`);

      return fileUrl;
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      this.logger.warn('S3 is not configured, file deletion skipped');
      throw new Error('S3 service is not configured. Please configure S3 environment variables.');
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      this.logger.log(`File deleted successfully: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      throw error;
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      this.logger.warn('S3 is not configured, signed URL generation skipped');
      throw new Error('S3 service is not configured. Please configure S3 environment variables.');
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });

      return signedUrl;
    } catch (error) {
      this.logger.error(`Failed to generate signed URL: ${error.message}`);
      throw error;
    }
  }

  // Helper method to check if S3 is configured
  isS3Configured(): boolean {
    return this.isConfigured;
  }
}