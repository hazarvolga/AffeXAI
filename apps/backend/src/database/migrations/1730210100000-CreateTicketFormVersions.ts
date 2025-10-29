import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTicketFormVersions1730210100000 implements MigrationInterface {
  name = 'CreateTicketFormVersions1730210100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ticket_form_versions table
    await queryRunner.createTable(
      new Table({
        name: 'ticket_form_versions',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'formDefinitionId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'schema',
            type: 'jsonb',
            isNullable: false,
            comment: 'JSON schema snapshot for this version',
          },
          {
            name: 'changeLog',
            type: 'text',
            isNullable: true,
            comment: 'Description of changes in this version',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Create foreign key to ticket_form_definitions
    await queryRunner.createForeignKey(
      'ticket_form_versions',
      new TableForeignKey({
        columnNames: ['formDefinitionId'],
        referencedTableName: 'ticket_form_definitions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Create foreign key to users table
    await queryRunner.createForeignKey(
      'ticket_form_versions',
      new TableForeignKey({
        columnNames: ['createdBy'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Create index on formDefinitionId for faster lookups
    await queryRunner.createIndex(
      'ticket_form_versions',
      new TableIndex({
        name: 'IDX_ticket_form_versions_form_definition_id',
        columnNames: ['formDefinitionId'],
      }),
    );

    // Create composite index for formDefinitionId + version (unique)
    await queryRunner.createIndex(
      'ticket_form_versions',
      new TableIndex({
        name: 'IDX_ticket_form_versions_form_version_unique',
        columnNames: ['formDefinitionId', 'version'],
        isUnique: true,
      }),
    );

    // Create index on createdAt for sorting
    await queryRunner.createIndex(
      'ticket_form_versions',
      new TableIndex({
        name: 'IDX_ticket_form_versions_created_at',
        columnNames: ['createdAt'],
      }),
    );

    // Create GIN index for JSONB schema searches
    await queryRunner.query(`
      CREATE INDEX "IDX_ticket_form_versions_schema"
      ON "ticket_form_versions" USING GIN (schema)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.dropIndex('ticket_form_versions', 'IDX_ticket_form_versions_schema');
    await queryRunner.dropIndex('ticket_form_versions', 'IDX_ticket_form_versions_created_at');
    await queryRunner.dropIndex('ticket_form_versions', 'IDX_ticket_form_versions_form_version_unique');
    await queryRunner.dropIndex('ticket_form_versions', 'IDX_ticket_form_versions_form_definition_id');

    // Drop foreign keys
    const table = await queryRunner.getTable('ticket_form_versions');
    const formDefinitionFk = table?.foreignKeys.find(fk => fk.columnNames.indexOf('formDefinitionId') !== -1);
    const createdByFk = table?.foreignKeys.find(fk => fk.columnNames.indexOf('createdBy') !== -1);

    if (formDefinitionFk) {
      await queryRunner.dropForeignKey('ticket_form_versions', formDefinitionFk);
    }
    if (createdByFk) {
      await queryRunner.dropForeignKey('ticket_form_versions', createdByFk);
    }

    // Drop table
    await queryRunner.dropTable('ticket_form_versions');
  }
}
