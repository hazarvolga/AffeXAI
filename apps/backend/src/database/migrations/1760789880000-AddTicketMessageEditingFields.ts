import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTicketMessageEditingFields1760789880000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check and add isEdited column
    const hasIsEdited = await queryRunner.hasColumn('ticket_messages', 'isEdited');
    if (!hasIsEdited) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'isEdited',
          type: 'boolean',
          default: false,
        })
      );
    }

    // Check and add editedAt column
    const hasEditedAt = await queryRunner.hasColumn('ticket_messages', 'editedAt');
    if (!hasEditedAt) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'editedAt',
          type: 'timestamp',
          isNullable: true,
        })
      );
    }

    // Check and add editedById column
    const hasEditedById = await queryRunner.hasColumn('ticket_messages', 'editedById');
    if (!hasEditedById) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'editedById',
          type: 'uuid',
          isNullable: true,
        })
      );
    }

    // Check and add originalContent column
    const hasOriginalContent = await queryRunner.hasColumn('ticket_messages', 'originalContent');
    if (!hasOriginalContent) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'originalContent',
          type: 'text',
          isNullable: true,
        })
      );
    }

    // Check and add isDeleted column
    const hasIsDeleted = await queryRunner.hasColumn('ticket_messages', 'isDeleted');
    if (!hasIsDeleted) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'isDeleted',
          type: 'boolean',
          default: false,
        })
      );
    }

    // Check and add deletedAt column
    const hasDeletedAt = await queryRunner.hasColumn('ticket_messages', 'deletedAt');
    if (!hasDeletedAt) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        })
      );
    }

    // Check and add deletedById column
    const hasDeletedById = await queryRunner.hasColumn('ticket_messages', 'deletedById');
    if (!hasDeletedById) {
      await queryRunner.addColumn(
        'ticket_messages',
        new TableColumn({
          name: 'deletedById',
          type: 'uuid',
          isNullable: true,
        })
      );
    }

    // Add foreign key for editedById if column was added
    if (!hasEditedById) {
      await queryRunner.query(`
        ALTER TABLE "ticket_messages"
        ADD CONSTRAINT "FK_ticket_messages_editedById"
        FOREIGN KEY ("editedById") REFERENCES "users"("id")
        ON DELETE SET NULL
      `);
    }

    // Add foreign key for deletedById if column was added
    if (!hasDeletedById) {
      await queryRunner.query(`
        ALTER TABLE "ticket_messages"
        ADD CONSTRAINT "FK_ticket_messages_deletedById"
        FOREIGN KEY ("deletedById") REFERENCES "users"("id")
        ON DELETE SET NULL
      `);
    }

    console.log('✅ Migration: Message editing and deletion fields added to ticket_messages table');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(`ALTER TABLE "ticket_messages" DROP CONSTRAINT IF EXISTS "FK_ticket_messages_deletedById"`);
    await queryRunner.query(`ALTER TABLE "ticket_messages" DROP CONSTRAINT IF EXISTS "FK_ticket_messages_editedById"`);

    // Drop columns
    await queryRunner.dropColumn('ticket_messages', 'deletedById');
    await queryRunner.dropColumn('ticket_messages', 'deletedAt');
    await queryRunner.dropColumn('ticket_messages', 'isDeleted');
    await queryRunner.dropColumn('ticket_messages', 'originalContent');
    await queryRunner.dropColumn('ticket_messages', 'editedById');
    await queryRunner.dropColumn('ticket_messages', 'editedAt');
    await queryRunner.dropColumn('ticket_messages', 'isEdited');

    console.log('✅ Migration: Message editing and deletion fields removed from ticket_messages table');
  }
}
