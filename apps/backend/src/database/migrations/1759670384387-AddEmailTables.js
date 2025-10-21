"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailTables1759670384387 = void 0;
const typeorm_1 = require("typeorm");
class AddEmailTables1759670384387 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'email_campaigns',
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
                },
                {
                    name: 'subject',
                    type: 'varchar',
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'draft'`,
                },
                {
                    name: 'scheduled_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'sent_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'total_recipients',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'sent_count',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'opened_count',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'clicked_count',
                    type: 'int',
                    default: 0,
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
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'email_logs',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'campaign_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'recipient_email',
                    type: 'varchar',
                },
                {
                    name: 'recipient_id',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'sent_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'opened_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'clicked_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'tracking_id',
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
        await queryRunner.createForeignKey('email_logs', new typeorm_1.TableForeignKey({
            columnNames: ['campaign_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'email_campaigns',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('email_logs');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('campaign_id') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('email_logs', foreignKey);
            }
        }
        await queryRunner.dropTable('email_logs');
        await queryRunner.dropTable('email_campaigns');
    }
}
exports.AddEmailTables1759670384387 = AddEmailTables1759670384387;
//# sourceMappingURL=1759670384387-AddEmailTables.js.map