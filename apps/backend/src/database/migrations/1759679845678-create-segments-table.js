"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSegmentsTable1759679845678 = void 0;
const typeorm_1 = require("typeorm");
class CreateSegmentsTable1759679845678 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'segments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'subscriberCount',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'criteria',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'openRate',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'clickRate',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('segments');
    }
}
exports.CreateSegmentsTable1759679845678 = CreateSegmentsTable1759679845678;
//# sourceMappingURL=1759679845678-create-segments-table.js.map