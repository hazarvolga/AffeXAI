import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTokenVersionToUser1729333333333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add tokenVersion column to users table
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'tokenVersion',
        type: 'int',
        default: 1,
        isNullable: false,
      })
    );

    console.log('✅ Added tokenVersion column to users table');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove tokenVersion column
    await queryRunner.dropColumn('users', 'tokenVersion');

    console.log('✅ Removed tokenVersion column from users table');
  }
}
