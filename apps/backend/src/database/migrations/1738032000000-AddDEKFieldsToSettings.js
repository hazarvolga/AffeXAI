"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDEKFieldsToSettings1738032000000 = void 0;
const typeorm_1 = require("typeorm");
class AddDEKFieldsToSettings1738032000000 {
    async up(queryRunner) {
        // Add encrypted_dek column to store the DEK encrypted with KEK
        await queryRunner.addColumn('settings', new typeorm_1.TableColumn({
            name: 'encrypted_dek',
            type: 'text',
            isNullable: true,
            comment: 'Data Encryption Key (DEK) encrypted with the master Key Encryption Key (KEK). Used in KEK/DEK pattern for provider-specific key encryption.',
        }));
        // Add provider column to identify which AI provider this DEK is for
        await queryRunner.addColumn('settings', new typeorm_1.TableColumn({
            name: 'provider',
            type: 'varchar',
            length: '50',
            isNullable: true,
            comment: 'AI provider identifier (openai, anthropic, google, or global). Used to cache and rotate DEKs per provider.',
        }));
        // Add dek_created_at timestamp
        await queryRunner.addColumn('settings', new typeorm_1.TableColumn({
            name: 'dek_created_at',
            type: 'timestamp',
            isNullable: true,
            comment: 'When the DEK was created/rotated. Used for key rotation policies (recommended: 30-90 days).',
        }));
        // Add dek_rotation_count for tracking rotations
        await queryRunner.addColumn('settings', new typeorm_1.TableColumn({
            name: 'dek_rotation_count',
            type: 'integer',
            default: 0,
            isNullable: false,
            comment: 'Number of times this DEK has been rotated. Helps track key age and enforce rotation policies.',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('settings', 'dek_rotation_count');
        await queryRunner.dropColumn('settings', 'dek_created_at');
        await queryRunner.dropColumn('settings', 'provider');
        await queryRunner.dropColumn('settings', 'encrypted_dek');
    }
}
exports.AddDEKFieldsToSettings1738032000000 = AddDEKFieldsToSettings1738032000000;
//# sourceMappingURL=1738032000000-AddDEKFieldsToSettings.js.map