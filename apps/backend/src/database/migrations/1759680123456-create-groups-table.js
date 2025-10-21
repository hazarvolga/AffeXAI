"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupsTable1759680123456 = void 0;
const typeorm_1 = require("typeorm");
class CreateGroupsTable1759680123456 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'groups',
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
        await queryRunner.dropTable('groups');
    }
}
exports.CreateGroupsTable1759680123456 = CreateGroupsTable1759680123456;
//# sourceMappingURL=1759680123456-create-groups-table.js.map