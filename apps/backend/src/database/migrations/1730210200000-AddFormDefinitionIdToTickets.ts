import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddFormDefinitionIdToTickets1730210200000 implements MigrationInterface {
  name = 'AddFormDefinitionIdToTickets1730210200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add formDefinitionId column to tickets table
    await queryRunner.addColumn(
      'tickets',
      new TableColumn({
        name: 'formDefinitionId',
        type: 'uuid',
        isNullable: true,
        comment: 'Reference to the form definition used to create this ticket',
      }),
    );

    // Create foreign key to ticket_form_definitions
    await queryRunner.createForeignKey(
      'tickets',
      new TableForeignKey({
        columnNames: ['formDefinitionId'],
        referencedTableName: 'ticket_form_definitions',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Create index for faster lookups
    await queryRunner.query(`
      CREATE INDEX "IDX_tickets_form_definition_id"
      ON "tickets" ("formDefinitionId")
    `);

    // Set default form for existing tickets (if any exist)
    await queryRunner.query(`
      UPDATE tickets
      SET "formDefinitionId" = (
        SELECT id FROM ticket_form_definitions WHERE "isDefault" = true LIMIT 1
      )
      WHERE "formDefinitionId" IS NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop index
    await queryRunner.query(`DROP INDEX "IDX_tickets_form_definition_id"`);

    // Drop foreign key
    const table = await queryRunner.getTable('tickets');
    const foreignKey = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf('formDefinitionId') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('tickets', foreignKey);
    }

    // Drop column
    await queryRunner.dropColumn('tickets', 'formDefinitionId');
  }
}
