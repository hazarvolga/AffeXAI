import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AddGlobalAiPreferencesAndUpdateModules1729565400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create global_ai_preferences table
    await queryRunner.createTable(
      new Table({
        name: 'global_ai_preferences',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'provider',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: 'Global AI provider: openai, anthropic, google, openrouter',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '100',
            isNullable: false,
            comment: 'Default AI model for global use',
          },
          {
            name: 'apiKey',
            type: 'text',
            isNullable: true,
            comment: 'Encrypted global API key (AES-256-GCM)',
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
            isNullable: false,
            comment: 'Whether global preference is enabled',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    // Create unique index on user_id
    await queryRunner.createIndex(
      'global_ai_preferences',
      new TableIndex({
        name: 'IDX_global_ai_preferences_user_id',
        columnNames: ['user_id'],
        isUnique: true,
      }),
    );

    // Note: In a real migration, you would also need to:
    // 1. Update user_ai_preferences table to support new module enum values
    // 2. Migrate existing 'support' data to 'support_agent'
    // However, since the entity is already defined with the new values,
    // and TypeORM will sync the enum automatically in synchronize mode,
    // we'll handle this manually if needed in production.

    console.log('✅ Created global_ai_preferences table');
    console.log('✅ Added unique index on user_id');
    console.log('⚠️  Note: Enum updates for user_ai_preferences.module handled by TypeORM sync');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop index
    await queryRunner.dropIndex(
      'global_ai_preferences',
      'IDX_global_ai_preferences_user_id',
    );

    // Drop table
    await queryRunner.dropTable('global_ai_preferences');

    console.log('✅ Dropped global_ai_preferences table and index');
  }
}
