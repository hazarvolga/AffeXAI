import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateBackupTables1732545000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create backups table
    await queryRunner.createTable(
      new Table({
        name: 'backups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['full', 'database', 'files', 'code'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'in_progress', 'completed', 'failed', 'uploading', 'uploaded'],
            default: "'pending'",
          },
          {
            name: 'filePath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fileSize',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'checksum',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isAutomatic',
            type: 'boolean',
            default: false,
          },
          {
            name: 'triggeredBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'errorMessage',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'uploadedTo',
            type: 'varchar',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'remoteUrls',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'startedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'completedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    // Create indexes for backups table
    await queryRunner.createIndex(
      'backups',
      new TableIndex({
        name: 'IDX_BACKUP_STATUS_CREATED',
        columnNames: ['status', 'createdAt'],
      })
    );

    await queryRunner.createIndex(
      'backups',
      new TableIndex({
        name: 'IDX_BACKUP_TYPE_STATUS',
        columnNames: ['type', 'status'],
      })
    );

    await queryRunner.createIndex(
      'backups',
      new TableIndex({
        name: 'IDX_BACKUP_STATUS',
        columnNames: ['status'],
      })
    );

    // Create backup_config table
    await queryRunner.createTable(
      new Table({
        name: 'backup_config',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'googleDriveClientId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'googleDriveClientSecret',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'googleDriveRefreshToken',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'oneDriveClientId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'oneDriveClientSecret',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'oneDriveRefreshToken',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'dropboxAccessToken',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ftpHost',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ftpPort',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'ftpUsername',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ftpPassword',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ftpPath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'awsAccessKeyId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'awsSecretAccessKey',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'awsS3Bucket',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'awsRegion',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'defaultRetentionDays',
            type: 'integer',
            default: 30,
          },
          {
            name: 'defaultUploadDestinations',
            type: 'varchar',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'automaticBackupEnabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'automaticBackupCron',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('backup_config');
    await queryRunner.dropTable('backups');
  }
}
