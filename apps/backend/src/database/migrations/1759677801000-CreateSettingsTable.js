"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingsTable1759677801000 = void 0;
const typeorm_1 = require("typeorm");
class CreateSettingsTable1759677801000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'settings',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'category',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'key',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'value',
                    type: 'text',
                    isNullable: true,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('settings');
    }
}
exports.CreateSettingsTable1759677801000 = CreateSettingsTable1759677801000;
//# sourceMappingURL=1759677801000-CreateSettingsTable.js.map