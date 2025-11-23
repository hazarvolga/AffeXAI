"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSystemLogsTable1737891000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateSystemLogsTable1737891000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'system_logs',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'level',
                    type: 'varchar',
                    length: '10',
                    comment: 'ERROR, WARN, INFO, DEBUG',
                },
                {
                    name: 'context',
                    type: 'varchar',
                    length: '100',
                    comment: 'AI, Database, Auth, Ticket, etc.',
                },
                {
                    name: 'message',
                    type: 'text',
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                    comment: 'Additional contextual data',
                },
                {
                    name: 'stack_trace',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'user_id',
                    type: 'integer',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'NOW()',
                },
            ],
        }), true);
        // Create indexes for performance
        await queryRunner.createIndex('system_logs', new typeorm_1.TableIndex({
            name: 'IDX_system_logs_level',
            columnNames: ['level'],
        }));
        await queryRunner.createIndex('system_logs', new typeorm_1.TableIndex({
            name: 'IDX_system_logs_context',
            columnNames: ['context'],
        }));
        await queryRunner.createIndex('system_logs', new typeorm_1.TableIndex({
            name: 'IDX_system_logs_created_at',
            columnNames: ['created_at'],
        }));
        await queryRunner.createIndex('system_logs', new typeorm_1.TableIndex({
            name: 'IDX_system_logs_user_id',
            columnNames: ['user_id'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('system_logs');
    }
}
exports.CreateSystemLogsTable1737891000000 = CreateSystemLogsTable1737891000000;
//# sourceMappingURL=1737891000000-CreateSystemLogsTable.js.map