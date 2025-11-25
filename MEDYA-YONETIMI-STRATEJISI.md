# 📁 Medya Yönetimi ve Depolama Stratejisi

**Proje**: Affexai - Enterprise Customer Portal
**Tarih**: 2025-11-25
**Durum**: Production-ready strategy

---

## 🎯 HEDEF

**Geliştirme ve deploy sırasında yüklenen tüm medya dosyalarının (görseller, PDF'ler, dökümanlar) kalıcı olarak saklanması ve asla kaybolmaması.**

---

## 📊 MEVCUT DURUM ANALİZİ

### ✅ Şu Anda Yapılanlar:

**1. S3 Service Mevcut** ([apps/backend/src/modules/media/s3.service.ts](apps/backend/src/modules/media/s3.service.ts))
- AWS S3 SDK kullanılıyor (`@aws-sdk/client-s3`)
- MinIO desteği var (development için)
- Upload, delete, signed URL özellikleri mevcut

**2. Kullanım Alanları**:
- ✅ Chat document upload (PDF, Word, Excel)
- ✅ Email marketing file upload (subscriber imports)
- ✅ CMS media management (planned)
- ✅ Certificate PDF generation
- ✅ User profile pictures (planned)

**3. Development Environment**:
```env
S3_ENDPOINT=http://localhost:9007
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=affexai-files
NEXT_PUBLIC_S3_PUBLIC_URL=http://localhost:9007/affexai-files
```

### ❌ Eksik Olanlar / Riskler:

1. **Production S3 config yok** - AWS credentials eksik
2. **Backup stratejisi yok** - S3 bucket backup planı yok
3. **CDN entegrasyonu yok** - CloudFront veya benzeri yok
4. **Versioning yok** - Dosya versiyonlama aktif değil
5. **Lifecycle policies yok** - Eski dosyaların arşivleme stratejisi yok
6. **Database-S3 sync eksik** - DB'deki kayıtlar ile S3'teki dosyaların senkronizasyonu garanti değil

---

## 🏗️ ÖNERİLEN MİMARİ

### Option 1: AWS S3 (Önerilen - Production Ready)

```
┌─────────────────────────────────────────────────────────┐
│                   Production Setup                       │
└─────────────────────────────────────────────────────────┘

Frontend (Next.js)                Backend (NestJS)
      │                                  │
      │ (1) Upload Request              │
      ├─────────────────────────────────►│
      │                                  │
      │                           (2) Generate           AWS S3 Bucket
      │                           pre-signed URL    ┌──────────────────┐
      │                                  ├──────────►│  affexai-prod   │
      │◄─────────────────────────────────┤          │                 │
      │ (3) Pre-signed URL               │          │  - Versioning   │
      │                                  │          │  - Encryption   │
      │ (4) Direct upload to S3          │          │  - Lifecycle    │
      ├──────────────────────────────────┼──────────►│  - Replication  │
      │                                  │          └──────────────────┘
      │ (5) Success, save metadata       │                    │
      ├─────────────────────────────────►│                    │
      │                                  │                    │
      │                           (6) Save DB record          │
      │                                  │                    │
      │                                                       │
      │                                                       ▼
      │                                              CloudFront CDN
      │                                         (Global Distribution)
      │                                                       │
      │ (7) Serve files via CDN                              │
      │◄──────────────────────────────────────────────────────┘
```

**Avantajlar**:
- ✅ 99.999999999% (11 nines) dayanıklılık
- ✅ Sınırsız depolama
- ✅ Global CDN entegrasyonu (CloudFront)
- ✅ Otomatik backup ve versioning
- ✅ Encryption at rest & in transit
- ✅ IAM-based güvenlik
- ✅ Cost-effective (pay as you go)

**Maliyetler** (Örnek - us-east-1):
- Storage: $0.023/GB/month (ilk 50 TB)
- PUT requests: $0.005/1000 requests
- GET requests: $0.0004/1000 requests
- Data transfer: $0.09/GB (out to internet)
- **Tahmini maliyet**: ~$10-50/month (10-100 GB storage)

---

### Option 2: Cloudflare R2 (Alternatif - Daha Ucuz)

**Avantajlar**:
- ✅ S3-compatible API (kod değişikliği minimal)
- ✅ **ZERO egress fees** (data transfer ücretsiz!)
- ✅ Cloudflare CDN entegrasyonu
- ✅ $0.015/GB/month (S3'ten %35 daha ucuz)

**Maliyetler**:
- Storage: $0.015/GB/month
- Class A ops (write): $4.50/million
- Class B ops (read): $0.36/million
- **NO DATA TRANSFER FEES** 🎉
- **Tahmini maliyet**: ~$5-20/month (10-100 GB storage)

**Kod değişikliği**:
```typescript
// Sadece endpoint değişir
S3_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
S3_REGION=auto
// Credentials Cloudflare'den alınır
```

---

### Option 3: MinIO Self-Hosted (Budget Friendly)

**Avantajlar**:
- ✅ S3-compatible API
- ✅ Tam kontrol
- ✅ Tek seferlik maliyet (server)
- ✅ GDPR compliance (data in your hands)

**Dezavantajlar**:
- ❌ Kendi backup'ınızı yönetmelisiniz
- ❌ CDN entegrasyonu manuel
- ❌ Scaling manuel
- ❌ Bakım ve monitoring sorumluluğu sizde

**Kullanım Senaryosu**: Küçük-orta ölçek, budget kısıtlı, GDPR önemli

---

## 🚀 PRODUCTION DEPLOYMENT STRATEJİSİ

### 1️⃣ AWS S3 Production Setup (Önerilen)

#### A. AWS Console Üzerinden Hazırlık

```bash
# 1. S3 Bucket oluştur
Bucket name: affexai-production-media
Region: eu-central-1 (Frankfurt - GDPR compliant)
Block public access: OFF (public read için)

# 2. Versioning aktif et
Properties → Versioning → Enable

# 3. Encryption aktif et
Properties → Default encryption → AES-256

# 4. Lifecycle policy oluştur
Management → Lifecycle rules → Create rule
Name: archive-old-files
Transitions:
  - After 90 days → Glacier Instant Retrieval
  - After 365 days → Glacier Deep Archive

# 5. Replication kuralı (optional - kritik için)
Management → Replication → Create rule
Destination: affexai-backup-media (farklı region)

# 6. CloudFront distribution oluştur
CloudFront → Create distribution
Origin: affexai-production-media.s3.eu-central-1.amazonaws.com
Cache behavior: Cache based on query strings
SSL certificate: Use ACM certificate
```

#### B. IAM User ve Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::affexai-production-media/*",
        "arn:aws:s3:::affexai-production-media"
      ]
    }
  ]
}
```

**IAM User oluştur**:
```
Username: affexai-backend-service
Access type: Programmatic access
Attach policy: affexai-s3-access (yukarıdaki policy)
```

#### C. Backend Environment Variables

**Production `.env`**:
```env
# AWS S3 Production
S3_ENDPOINT=https://s3.eu-central-1.amazonaws.com
S3_REGION=eu-central-1
S3_BUCKET_NAME=affexai-production-media
S3_ACCESS_KEY=AKIA******************  # IAM user access key
S3_SECRET_KEY=****************************************  # IAM user secret key

# CloudFront CDN (public URL)
NEXT_PUBLIC_S3_PUBLIC_URL=https://d123456789abcd.cloudfront.net
```

**Staging `.env`**:
```env
# AWS S3 Staging
S3_ENDPOINT=https://s3.eu-central-1.amazonaws.com
S3_REGION=eu-central-1
S3_BUCKET_NAME=affexai-staging-media
S3_ACCESS_KEY=AKIA******************
S3_SECRET_KEY=****************************************
NEXT_PUBLIC_S3_PUBLIC_URL=https://d987654321zyxw.cloudfront.net
```

**Development (MinIO - mevcut)**:
```env
S3_ENDPOINT=http://localhost:9007
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=affexai-files
NEXT_PUBLIC_S3_PUBLIC_URL=http://localhost:9007/affexai-files
```

---

### 2️⃣ Database ve S3 Senkronizasyonu

**Problem**: DB'de kayıt var ama S3'te dosya silinmiş olabilir (veya tersi)

**Çözüm**: Media tracking tablosu ve scheduled job

#### A. Media Tracking Entity Oluştur

**Dosya**: `apps/backend/src/modules/media/entities/media-file.entity.ts`

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('media_files')
@Index(['s3Key', 'isDeleted'])
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  s3Key: string; // S3'teki dosya key'i (örn: "1732550000-image.png")

  @Column()
  originalFilename: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bigint' })
  fileSize: number; // bytes

  @Column()
  s3Url: string; // Full URL (CloudFront veya S3)

  @Column({ type: 'varchar', nullable: true })
  cdnUrl: string | null; // CloudFront URL (varsa)

  @Column({ type: 'varchar', nullable: true })
  uploadedBy: string | null; // User ID

  @Column({ type: 'varchar', nullable: true })
  relatedEntity: string | null; // 'chat_document', 'cms_image', 'certificate', vb.

  @Column({ type: 'varchar', nullable: true })
  relatedEntityId: string | null; // İlgili entity'nin ID'si

  @Column({ type: 'boolean', default: false })
  @Index()
  isDeleted: boolean; // Soft delete flag

  @Column({ type: 'timestamp', nullable: true })
  lastVerifiedAt: Date | null; // Son S3 verification tarihi

  @Column({ type: 'boolean', default: true })
  existsInS3: boolean; // S3'te dosya var mı? (verification sonucu)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null; // Soft delete timestamp
}
```

#### B. Enhanced S3 Service (Tracking ile)

**Dosya**: `apps/backend/src/modules/media/s3.service.ts` (güncellenmiş)

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaFile } from './entities/media-file.entity';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand, // Dosya varlığını kontrol için
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client | null = null;
  private readonly bucketName: string | null = null;
  private readonly isConfigured: boolean = false;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MediaFile)
    private readonly mediaFileRepository: Repository<MediaFile>,
  ) {
    // ... existing initialization ...
  }

  /**
   * Upload file with database tracking
   */
  async uploadFile(
    fileName: string,
    fileBuffer: Buffer,
    mimeType: string,
    uploadedBy?: string,
    relatedEntity?: string,
    relatedEntityId?: string,
  ): Promise<{ url: string; mediaFile: MediaFile }> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      throw new Error('S3 service is not configured');
    }

    try {
      const key = `${Date.now()}-${fileName}`;

      // 1. Upload to S3
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);

      // 2. Get URLs
      const s3Url = `${this.configService.get<string>('S3_ENDPOINT')}/${this.bucketName}/${key}`;
      const cdnUrl = this.configService.get<string>('NEXT_PUBLIC_S3_PUBLIC_URL')
        ? `${this.configService.get<string>('NEXT_PUBLIC_S3_PUBLIC_URL')}/${key}`
        : null;

      // 3. Save to database for tracking
      const mediaFile = this.mediaFileRepository.create({
        s3Key: key,
        originalFilename: fileName,
        mimeType,
        fileSize: fileBuffer.length,
        s3Url,
        cdnUrl,
        uploadedBy,
        relatedEntity,
        relatedEntityId,
        lastVerifiedAt: new Date(),
        existsInS3: true,
      });

      await this.mediaFileRepository.save(mediaFile);

      this.logger.log(`File uploaded and tracked: ${key}`);

      return { url: cdnUrl || s3Url, mediaFile };
    } catch (error) {
      this.logger.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete file with database tracking
   */
  async deleteFile(key: string, hardDelete: boolean = false): Promise<void> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      throw new Error('S3 service is not configured');
    }

    try {
      // 1. Find in database
      const mediaFile = await this.mediaFileRepository.findOne({
        where: { s3Key: key, isDeleted: false },
      });

      if (!mediaFile) {
        this.logger.warn(`Media file not found in database: ${key}`);
      }

      if (hardDelete) {
        // Hard delete: Remove from S3 and database
        const command = new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        });

        await this.s3Client.send(command);

        if (mediaFile) {
          await this.mediaFileRepository.remove(mediaFile);
        }

        this.logger.log(`File hard deleted: ${key}`);
      } else {
        // Soft delete: Mark as deleted in database, keep in S3
        if (mediaFile) {
          mediaFile.isDeleted = true;
          mediaFile.deletedAt = new Date();
          await this.mediaFileRepository.save(mediaFile);
        }

        this.logger.log(`File soft deleted: ${key}`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify file exists in S3
   */
  async verifyFileExists(key: string): Promise<boolean> {
    if (!this.isConfigured || !this.s3Client || !this.bucketName) {
      return false;
    }

    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Sync database with S3 (scheduled job)
   */
  async syncDatabaseWithS3(): Promise<{ checked: number; missing: number; fixed: number }> {
    const mediaFiles = await this.mediaFileRepository.find({
      where: { isDeleted: false },
    });

    let checked = 0;
    let missing = 0;
    let fixed = 0;

    for (const file of mediaFiles) {
      checked++;

      const exists = await this.verifyFileExists(file.s3Key);

      if (!exists && file.existsInS3) {
        // Dosya S3'te yok ama DB'de var olarak işaretli
        file.existsInS3 = false;
        await this.mediaFileRepository.save(file);
        missing++;
        this.logger.warn(`File missing in S3: ${file.s3Key}`);
      } else if (exists && !file.existsInS3) {
        // Dosya S3'te var ama DB'de yok olarak işaretli
        file.existsInS3 = true;
        file.lastVerifiedAt = new Date();
        await this.mediaFileRepository.save(file);
        fixed++;
        this.logger.log(`File status fixed: ${file.s3Key}`);
      } else if (exists) {
        // Her şey yolunda, sadece verification tarihini güncelle
        file.lastVerifiedAt = new Date();
        await this.mediaFileRepository.save(file);
      }
    }

    this.logger.log(
      `S3 sync completed: ${checked} checked, ${missing} missing, ${fixed} fixed`,
    );

    return { checked, missing, fixed };
  }

  // ... existing methods (getSignedUrl, etc.) ...
}
```

#### C. Scheduled Sync Job

**Dosya**: `apps/backend/src/modules/media/media-sync.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { S3Service } from './s3.service';

@Injectable()
export class MediaSyncService {
  private readonly logger = new Logger(MediaSyncService.name);

  constructor(private readonly s3Service: S3Service) {}

  /**
   * Her gece 3:00'te S3 ve database senkronizasyonu yap
   */
  @Cron('0 3 * * *', {
    name: 'media-s3-sync',
    timeZone: 'Europe/Istanbul',
  })
  async handleMediaSync() {
    this.logger.log('Starting scheduled media-S3 sync...');

    try {
      const result = await this.s3Service.syncDatabaseWithS3();

      this.logger.log(
        `Media sync completed: ${result.checked} files checked, ` +
        `${result.missing} missing in S3, ${result.fixed} status fixed`,
      );

      // Eğer çok fazla eksik dosya varsa alert gönder
      if (result.missing > 10) {
        this.logger.error(
          `⚠️ WARNING: ${result.missing} files are missing in S3! ` +
          `This may indicate a backup/restore issue.`,
        );
        // TODO: Send email alert or Slack notification
      }
    } catch (error) {
      this.logger.error(`Media sync failed: ${error.message}`, error.stack);
    }
  }
}
```

---

### 3️⃣ Backup ve Disaster Recovery Stratejisi

#### A. AWS S3 Cross-Region Replication

**Setup** (AWS Console):
```
Primary bucket: affexai-production-media (eu-central-1)
Replica bucket: affexai-backup-media (us-east-1)

Replication rule:
- Replicate all objects
- Destination storage class: Standard-IA (daha ucuz)
- Replication time control: Enabled (15 dakikada replica)
```

**Avantajlar**:
- ✅ Otomatik real-time backup
- ✅ Farklı region (disaster recovery)
- ✅ Versioning ile birlikte çalışır
- ✅ Yanlışlıkla silmelere karşı koruma

#### B. Automated Backup Script (Alternative)

**Dosya**: `scripts/backup-s3-to-local.sh`

```bash
#!/bin/bash
# S3 Bucket'ı yerel sunucuya backup al

BUCKET_NAME="affexai-production-media"
BACKUP_DIR="/backups/s3-media"
DATE=$(date +%Y-%m-%d)

echo "Starting S3 backup: $BUCKET_NAME -> $BACKUP_DIR/$DATE"

# AWS CLI ile tüm bucket'ı sync et
aws s3 sync s3://$BUCKET_NAME $BACKUP_DIR/$DATE \
  --region eu-central-1 \
  --storage-class STANDARD_IA

echo "Backup completed!"

# 90 günden eski backup'ları sil
find $BACKUP_DIR -type d -mtime +90 -exec rm -rf {} \;
```

**Cron job** (her gece):
```cron
0 2 * * * /path/to/scripts/backup-s3-to-local.sh >> /var/log/s3-backup.log 2>&1
```

---

### 4️⃣ Migration Stratejisi (Development → Production)

#### A. MinIO'dan AWS S3'e Migrate

**Script**: `scripts/migrate-minio-to-s3.ts`

```typescript
import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

async function migrateMinioToS3() {
  // MinIO client (source)
  const minioClient = new S3Client({
    endpoint: 'http://localhost:9007',
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'minioadmin',
      secretAccessKey: 'minioadmin',
    },
    forcePathStyle: true,
  });

  // AWS S3 client (destination)
  const s3Client = new S3Client({
    endpoint: 'https://s3.eu-central-1.amazonaws.com',
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const sourceBucket = 'affexai-files';
  const destBucket = 'affexai-production-media';

  console.log(`Starting migration: ${sourceBucket} -> ${destBucket}`);

  // List all objects in MinIO
  const listCommand = new ListObjectsV2Command({
    Bucket: sourceBucket,
  });

  const { Contents } = await minioClient.send(listCommand);

  if (!Contents || Contents.length === 0) {
    console.log('No files to migrate');
    return;
  }

  console.log(`Found ${Contents.length} files to migrate`);

  let migrated = 0;
  let failed = 0;

  for (const object of Contents) {
    try {
      console.log(`Migrating: ${object.Key}`);

      // Get from MinIO
      const getCommand = new GetObjectCommand({
        Bucket: sourceBucket,
        Key: object.Key!,
      });

      const { Body, ContentType } = await minioClient.send(getCommand);

      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of Body as Readable) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      // Put to S3
      const putCommand = new PutObjectCommand({
        Bucket: destBucket,
        Key: object.Key!,
        Body: buffer,
        ContentType,
      });

      await s3Client.send(putCommand);

      migrated++;
      console.log(`✅ Migrated: ${object.Key}`);
    } catch (error) {
      failed++;
      console.error(`❌ Failed: ${object.Key}`, error.message);
    }
  }

  console.log(`\nMigration completed: ${migrated} migrated, ${failed} failed`);
}

migrateMinioToS3().catch(console.error);
```

**Kullanım**:
```bash
cd apps/backend
npx ts-node ../../scripts/migrate-minio-to-s3.ts
```

---

## 📝 DOCKER COMPOSE İYİLEŞTİRMELERİ

**Dosya**: `docker/docker-compose.yml` (güncellenmiş)

```yaml
version: '3.8'

services:
  # ... postgres, redis ...

  minio:
    image: minio/minio:latest
    container_name: affexai-minio
    ports:
      - "9007:9000"  # API
      - "9008:9001"  # Console
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    volumes:
      - minio-data:/data  # ⚠️ IMPORTANT: Persistent volume
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  minio-data:  # ⚠️ IMPORTANT: MinIO volume - veriler burada saklanır
    driver: local
```

**Host Backup** (Optional - MinIO data'yı local'e backup):
```yaml
    volumes:
      - ./data/minio:/data  # Local directory'e mount et
```

Bu şekilde `docker/data/minio/` klasörü local makinede olur, container silinse bile veriler kaybolmaz.

---

## 🔒 GÜVENLİK ÖNERİLERİ

### 1. S3 Bucket Policies

**Public read için** (sadece gerekli dosyalar):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::affexai-production-media/public/*"
    }
  ]
}
```

**Folder yapısı**:
```
affexai-production-media/
  ├── public/          # Public accessible (CMS images, logos)
  │   ├── cms/
  │   ├── products/
  │   └── logos/
  ├── private/         # Private (user documents, PDFs)
  │   ├── chat-documents/
  │   ├── certificates/
  │   └── user-uploads/
  └── temp/            # Temporary (auto-delete after 7 days)
```

### 2. CORS Configuration

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": [
      "https://affexai.com",
      "https://www.affexai.com",
      "https://admin.affexai.com"
    ],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 3. Encryption

- ✅ Server-side encryption (AES-256)
- ✅ HTTPS-only access
- ✅ Pre-signed URLs for private files (1 hour expiry)

---

## 💰 MALIYET ANALİZİ

### Senaryo 1: Küçük Proje (10 GB storage, 1000 requests/month)

**AWS S3**:
- Storage: 10 GB × $0.023 = $0.23/month
- PUT: 1000 × $0.005/1000 = $0.005/month
- GET: 10,000 × $0.0004/1000 = $0.004/month
- Data transfer: 50 GB × $0.09 = $4.50/month
- **Total: ~$5/month**

**Cloudflare R2**:
- Storage: 10 GB × $0.015 = $0.15/month
- Class A: 1000 × $4.50/1M = $0.0045/month
- Class B: 10,000 × $0.36/1M = $0.0036/month
- Data transfer: **$0** (FREE!)
- **Total: ~$0.16/month** 🎉

### Senaryo 2: Orta Proje (100 GB storage, 100K requests/month)

**AWS S3**:
- Storage: 100 GB × $0.023 = $2.30/month
- Requests: ~$0.50/month
- Data transfer: 500 GB × $0.09 = $45/month
- **Total: ~$48/month**

**Cloudflare R2**:
- Storage: 100 GB × $0.015 = $1.50/month
- Requests: ~$0.45/month
- Data transfer: **$0**
- **Total: ~$2/month** 🎉

**SONUÇ**: Cloudflare R2, data transfer nedeniyle AWS S3'ten 10-20x daha ucuz!

---

## ✅ CHECKLIST: PRODUCTION HAZIRLIĞI

### Development → Staging → Production Migration

- [ ] **1. AWS/Cloudflare account setup**
  - [ ] S3 bucket oluştur (production + staging)
  - [ ] IAM user ve credentials oluştur
  - [ ] Bucket policies ayarla
  - [ ] CORS configuration

- [ ] **2. Backend configuration**
  - [ ] Production `.env` dosyası hazırla (S3 credentials)
  - [ ] Staging `.env` dosyası hazırla
  - [ ] MediaFile entity oluştur (database tracking)
  - [ ] S3Service güncelle (tracking ile)
  - [ ] MediaSyncService ekle (scheduled job)
  - [ ] Migration script hazırla (MinIO → S3)

- [ ] **3. Database migration**
  - [ ] `media_files` tablosu migration'ı oluştur
  - [ ] Production DB'de migration'ı çalıştır
  - [ ] Existing S3 files için bulk insert (eğer varsa)

- [ ] **4. Data migration**
  - [ ] MinIO'daki mevcut dosyaları S3'e migrate et
  - [ ] Database kayıtlarını güncelle (yeni URLs)
  - [ ] Verification job çalıştır

- [ ] **5. CDN setup** (optional ama önerilen)
  - [ ] CloudFront distribution oluştur
  - [ ] SSL certificate (ACM)
  - [ ] Cache policies
  - [ ] Origin access identity

- [ ] **6. Backup stratejisi**
  - [ ] S3 versioning aktif
  - [ ] Cross-region replication (optional)
  - [ ] Lifecycle policies
  - [ ] Backup script (optional)

- [ ] **7. Monitoring & alerts**
  - [ ] S3 bucket metrics (CloudWatch)
  - [ ] MediaSyncService logs
  - [ ] Alert for missing files (>10)
  - [ ] Cost alerts (AWS Budgets)

- [ ] **8. Testing**
  - [ ] Upload test (backend → S3)
  - [ ] Download test (CDN URL)
  - [ ] Delete test (soft + hard)
  - [ ] Verification job test
  - [ ] Load test (100+ concurrent uploads)

---

## 🚨 FELAKET KURTARMA (DISASTER RECOVERY)

### Senaryo 1: S3 Bucket Yanlışlıkla Silindi

**Çözüm**: Cross-region replication aktifse:
1. Replica bucket'tan restore et
2. Bucket policy'leri yeniden kur
3. CloudFront distribution'ı güncelle

**Prevention**:
- ✅ MFA Delete aktif et (kritik bucket için)
- ✅ IAM permissions sıkı tut (sadece backend service)
- ✅ Versioning + Lifecycle policies

### Senaryo 2: Database Corrupt Oldu, Media Kayıtları Kayboldu

**Çözüm**:
1. S3'teki tüm dosyaları listele (AWS CLI)
2. Database'i en son backup'tan restore et
3. MediaSyncService çalıştır (S3 → DB senkronizasyonu)

```bash
# S3'teki tüm dosyaları listele
aws s3 ls s3://affexai-production-media --recursive > s3-files.txt

# Database'e bulk insert script çalıştır
node scripts/rebuild-media-table-from-s3.js
```

### Senaryo 3: Provider Değişikliği (AWS → Cloudflare R2)

**Migration plan**:
1. R2 bucket oluştur
2. AWS S3'ten R2'ye migration script çalıştır (rclone)
3. Backend'de endpoint'i değiştir
4. Parallel çalıştır (1 hafta AWS + R2 ikisi de aktif)
5. Verification sonrası AWS'i kapat

**rclone kullanımı**:
```bash
rclone sync s3:affexai-production-media r2:affexai-production-media \
  --progress \
  --checksum \
  --log-file=migration.log
```

---

## 📚 EK KAYNAKLAR

### AWS S3 Best Practices
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/best-practices.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html

### Cloudflare R2
- https://developers.cloudflare.com/r2/
- https://blog.cloudflare.com/introducing-r2/

### MinIO Documentation
- https://min.io/docs/minio/linux/index.html

---

## 🎯 ÖNERİ: Hemen Yapılması Gerekenler

1. ✅ **MediaFile entity oluştur** - Database tracking için
2. ✅ **S3Service güncelle** - Tracking ile entegre et
3. ✅ **Production S3 bucket kur** - AWS veya Cloudflare R2
4. ✅ **MinIO → S3 migration script** - Mevcut dosyaları taşı
5. ✅ **MediaSyncService ekle** - Otomatik senkronizasyon
6. ✅ **Backup stratejisi kur** - Cross-region replication veya scheduled backup

**Öncelik**: High - Production'a geçmeden önce mutlaka yapılmalı!

---

**Hazırlayan**: Claude Code (AI Assistant)
**Tarih**: 2025-11-25
**Versiyon**: 1.0
