"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserAiPreferencesTable1760900000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserAiPreferencesTable1760900000000 {
    async up(queryRunner) {
        // Create user_ai_preferences table
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        // Add foreign key to users table
        await queryRunner.createForeignKey('user_ai_preferences', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            name: 'fk_user_ai_preferences_user',
        }));
        // Add unique constraint: one preference per user per module
        await queryRunner.createIndex('user_ai_preferences', new typeorm_1.TableIndex({
            name: 'idx_user_module_unique',
            columnNames: ['user_id', 'module'],
            isUnique: true,
        }));
        // Add index for faster queries
        await queryRunner.createIndex('user_ai_preferences', new typeorm_1.TableIndex({
            name: 'idx_user_ai_preferences_user_id',
            columnNames: ['user_id'],
        }));
    }
    async down(queryRunner) {
        // Drop indexes first
        await queryRunner.dropIndex('user_ai_preferences', 'idx_user_ai_preferences_user_id');
        await queryRunner.dropIndex('user_ai_preferences', 'idx_user_module_unique');
        // Drop foreign key
        await queryRunner.dropForeignKey('user_ai_preferences', 'fk_user_ai_preferences_user');
        // Drop table
        await queryRunner.dropTable('user_ai_preferences');
    }
}
exports.CreateUserAiPreferencesTable1760900000000 = CreateUserAiPreferencesTable1760900000000;
//# sourceMappingURL=1760900000000-CreateUserAiPreferencesTable.js.map