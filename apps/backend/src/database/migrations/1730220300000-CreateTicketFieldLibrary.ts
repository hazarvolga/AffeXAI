import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateTicketFieldLibrary1730220300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ticket_field_library table
    await queryRunner.createTable(
      new Table({
        name: 'ticket_field_library',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'fieldConfig',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'isSystemField',
            type: 'boolean',
            default: false,
          },
          {
            name: 'tags',
            type: 'varchar',
            isArray: true,
            default: "'{}'",
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
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updatedBy',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Create indexes
    await queryRunner.createIndex(
      'ticket_field_library',
      new TableIndex({
        name: 'IDX_ticket_field_library_name',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createIndex(
      'ticket_field_library',
      new TableIndex({
        name: 'IDX_ticket_field_library_is_active',
        columnNames: ['isActive'],
      }),
    );

    // Create foreign keys
    await queryRunner.createForeignKey(
      'ticket_field_library',
      new TableForeignKey({
        name: 'FK_ticket_field_library_created_by',
        columnNames: ['createdBy'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'ticket_field_library',
      new TableForeignKey({
        name: 'FK_ticket_field_library_updated_by',
        columnNames: ['updatedBy'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.dropForeignKey('ticket_field_library', 'FK_ticket_field_library_updated_by');
    await queryRunner.dropForeignKey('ticket_field_library', 'FK_ticket_field_library_created_by');

    // Drop indexes
    await queryRunner.dropIndex('ticket_field_library', 'IDX_ticket_field_library_is_active');
    await queryRunner.dropIndex('ticket_field_library', 'IDX_ticket_field_library_name');

    // Drop table
    await queryRunner.dropTable('ticket_field_library');
  }
}
