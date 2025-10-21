"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNotificationsTable1759671927949 = void 0;
const typeorm_1 = require("typeorm");
class AddNotificationsTable1759671927949 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notifications',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'message',
                    type: 'varchar',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'is_read',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
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
        await queryRunner.createForeignKey('notifications', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('notifications');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('notifications', foreignKey);
            }
        }
        await queryRunner.dropTable('notifications');
    }
}
exports.AddNotificationsTable1759671927949 = AddNotificationsTable1759671927949;
//# sourceMappingURL=1759671927949-AddNotificationsTable.js.map