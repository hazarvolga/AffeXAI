"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMediaTable1759671342074 = void 0;
const typeorm_1 = require("typeorm");
class AddMediaTable1759671342074 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'media',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'file_name',
                    type: 'varchar',
                },
                {
                    name: 'original_name',
                    type: 'varchar',
                },
                {
                    name: 'mime_type',
                    type: 'varchar',
                },
                {
                    name: 'size',
                    type: 'int',
                },
                {
                    name: 'url',
                    type: 'varchar',
                },
                {
                    name: 'key',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
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
        await queryRunner.dropTable('media');
    }
}
exports.AddMediaTable1759671342074 = AddMediaTable1759671342074;
//# sourceMappingURL=1759671342074-AddMediaTable.js.map