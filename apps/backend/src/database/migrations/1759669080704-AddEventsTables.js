"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventsTables1759669080704 = void 0;
const typeorm_1 = require("typeorm");
class AddEventsTables1759669080704 {
    async up(queryRunner) {
        // Create events table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'events',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'startDate',
                    type: 'timestamp',
                },
                {
                    name: 'endDate',
                    type: 'timestamp',
                },
                {
                    name: 'location',
                    type: 'varchar',
                },
                {
                    name: 'capacity',
                    type: 'int',
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: "'draft'",
                },
                {
                    name: 'createdById',
                    type: 'uuid',
                    isNullable: true,
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
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
        // Create event_registrations table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'event_registrations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
                {
                    name: 'eventId',
                    type: 'uuid',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: "'pending'",
                },
                {
                    name: 'amountPaid',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'paymentDetails',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'checkedInAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'additionalInfo',
                    type: 'jsonb',
                    isNullable: true,
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
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
        // Add foreign key constraints
        await queryRunner.createForeignKey('events', new typeorm_1.TableForeignKey({
            columnNames: ['createdById'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            name: 'FK_events_createdBy'
        }));
        await queryRunner.createForeignKey('event_registrations', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            name: 'FK_event_registrations_user'
        }));
        await queryRunner.createForeignKey('event_registrations', new typeorm_1.TableForeignKey({
            columnNames: ['eventId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'events',
            onDelete: 'CASCADE',
            name: 'FK_event_registrations_event'
        }));
    }
    async down(queryRunner) {
        // Drop foreign key constraints
        const table = await queryRunner.getTable('event_registrations');
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('event_registrations', foreignKey);
            }
        }
        const eventsTable = await queryRunner.getTable('events');
        if (eventsTable) {
            const foreignKeys = eventsTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('events', foreignKey);
            }
        }
        // Drop tables
        await queryRunner.dropTable('event_registrations', true);
        await queryRunner.dropTable('events', true);
    }
}
exports.AddEventsTables1759669080704 = AddEventsTables1759669080704;
//# sourceMappingURL=1759669080704-AddEventsTables.js.map