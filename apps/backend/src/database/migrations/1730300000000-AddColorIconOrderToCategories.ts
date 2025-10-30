import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColorIconOrderToCategories1730300000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add color column
    await queryRunner.addColumn(
      'ticket_categories',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        length: '7',
        isNullable: true,
        comment: 'Hex color code for category display (e.g., #FF5733)',
      }),
    );

    // Add icon column
    await queryRunner.addColumn(
      'ticket_categories',
      new TableColumn({
        name: 'icon',
        type: 'varchar',
        length: '50',
        isNullable: true,
        comment: 'Lucide icon name for category display (e.g., FolderTree, Bug)',
      }),
    );

    // Add order column
    await queryRunner.addColumn(
      'ticket_categories',
      new TableColumn({
        name: 'order',
        type: 'integer',
        default: 0,
        comment: 'Display order for sorting categories',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ticket_categories', 'order');
    await queryRunner.dropColumn('ticket_categories', 'icon');
    await queryRunner.dropColumn('ticket_categories', 'color');
  }
}
