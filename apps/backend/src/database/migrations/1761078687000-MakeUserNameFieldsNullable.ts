import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserNameFieldsNullable1761078687000 implements MigrationInterface {
  name = 'MakeUserNameFieldsNullable1761078687000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Make firstName and lastName columns nullable
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert: Make firstName and lastName columns NOT NULL again
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`);
  }
}
