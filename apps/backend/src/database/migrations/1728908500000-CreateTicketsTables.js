"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTicketsTables1728908500000 = void 0;
const typeorm_1 = require("typeorm");
class CreateTicketsTables1728908500000 {
    async up(queryRunner) {
        // Create ticket_categories table first (no dependencies)
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ticket_categories',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'parentId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'ticketCount',
                    type: 'integer',
                    default: 0,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // Add self-referencing foreign key for parent category
        await queryRunner.createForeignKey('ticket_categories', new typeorm_1.TableForeignKey({
            columnNames: ['parentId'],
            referencedTableName: 'ticket_categories',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        // Create ticket status enum
        await queryRunner.query(`
      CREATE TYPE ticket_status_enum AS ENUM (
        'new',
        'open',
        'pending_customer',
        'pending_internal',
        'resolved',
        'closed',
        'cancelled'
      );
    `);
        // Create ticket priority enum
        await queryRunner.query(`
      CREATE TYPE ticket_priority_enum AS ENUM (
        'low',
        'medium',
        'high',
        'urgent'
      );
    `);
        // Create tickets table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tickets',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'subject',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'categoryId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'ticket_status_enum',
                    default: "'new'",
                },
                {
                    name: 'priority',
                    type: 'ticket_priority_enum',
                    default: "'medium'",
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
                {
                    name: 'assignedToId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'companyName',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'firstResponseAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'resolvedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'closedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // Add foreign keys for tickets table
        await queryRunner.createForeignKey('tickets', new typeorm_1.TableForeignKey({
            columnNames: ['categoryId'],
            referencedTableName: 'ticket_categories',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        await queryRunner.createForeignKey('tickets', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('tickets', new typeorm_1.TableForeignKey({
            columnNames: ['assignedToId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
        // Create ticket_messages table
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ticket_messages',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'ticketId',
                    type: 'uuid',
                },
                {
                    name: 'authorId',
                    type: 'uuid',
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'isInternal',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'attachmentIds',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // Add foreign keys for ticket_messages table
        await queryRunner.createForeignKey('ticket_messages', new typeorm_1.TableForeignKey({
            columnNames: ['ticketId'],
            referencedTableName: 'tickets',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('ticket_messages', new typeorm_1.TableForeignKey({
            columnNames: ['authorId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        // Create indexes for better query performance
        await queryRunner.query(`
      CREATE INDEX idx_tickets_status ON tickets(status);
      CREATE INDEX idx_tickets_priority ON tickets(priority);
      CREATE INDEX idx_tickets_user_id ON tickets("userId");
      CREATE INDEX idx_tickets_assigned_to_id ON tickets("assignedToId");
      CREATE INDEX idx_tickets_category_id ON tickets("categoryId");
      CREATE INDEX idx_tickets_created_at ON tickets("createdAt");
      CREATE INDEX idx_ticket_messages_ticket_id ON ticket_messages("ticketId");
      CREATE INDEX idx_ticket_messages_author_id ON ticket_messages("authorId");
    `);
    }
    async down(queryRunner) {
        // Drop indexes
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_tickets_status;
      DROP INDEX IF EXISTS idx_tickets_priority;
      DROP INDEX IF EXISTS idx_tickets_user_id;
      DROP INDEX IF EXISTS idx_tickets_assigned_to_id;
      DROP INDEX IF EXISTS idx_tickets_category_id;
      DROP INDEX IF EXISTS idx_tickets_created_at;
      DROP INDEX IF EXISTS idx_ticket_messages_ticket_id;
      DROP INDEX IF EXISTS idx_ticket_messages_author_id;
    `);
        // Drop tables (in reverse order due to foreign keys)
        await queryRunner.dropTable('ticket_messages', true);
        await queryRunner.dropTable('tickets', true);
        await queryRunner.dropTable('ticket_categories', true);
        // Drop enums
        await queryRunner.query(`DROP TYPE IF EXISTS ticket_status_enum;`);
        await queryRunner.query(`DROP TYPE IF EXISTS ticket_priority_enum;`);
    }
}
exports.CreateTicketsTables1728908500000 = CreateTicketsTables1728908500000;
//# sourceMappingURL=1728908500000-CreateTicketsTables.js.map