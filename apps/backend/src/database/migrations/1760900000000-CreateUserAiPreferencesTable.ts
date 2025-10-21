import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateUserAiPreferencesTable1760900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user_ai_preferences table
    await queryRunner.createTable(
      new Table({
        name: 'user_ai_preferences',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'module',
            type: 'varchar',
            length: '50',
            comment: 'AI module: email, social, support, analytics',
          },
          {
            name: 'provider',
            type: 'varchar',
            length: '50',
            comment: 'AI provider: openai, anthropic, google',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '100',
            comment: 'Specific model: gpt-4, claude-3-sonnet, gemini-pro',
          },
          {
            name: 'api_key',
            type: 'text',
            isNullable: true,
            comment: 'Encrypted API key (user-specific, optional)',
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Add foreign key to users table
    await queryRunner.createForeignKey(
      'user_ai_preferences',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'fk_user_ai_preferences_user',
      }),
    );

    // Add unique constraint: one preference per user per module
    await queryRunner.createIndex(
      'user_ai_preferences',
      new TableIndex({
        name: 'idx_user_module_unique',
        columnNames: ['user_id', 'module'],
        isUnique: true,
      }),
    );

    // Add index for faster queries
    await queryRunner.createIndex(
      'user_ai_preferences',
      new TableIndex({
        name: 'idx_user_ai_preferences_user_id',
        columnNames: ['user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes first
    await queryRunner.dropIndex('user_ai_preferences', 'idx_user_ai_preferences_user_id');
    await queryRunner.dropIndex('user_ai_preferences', 'idx_user_module_unique');

    // Drop foreign key
    await queryRunner.dropForeignKey('user_ai_preferences', 'fk_user_ai_preferences_user');

    // Drop table
    await queryRunner.dropTable('user_ai_preferences');
  }
}
