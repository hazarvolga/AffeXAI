import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSegmentsTable1759679845678 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'segments',
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
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'subscriberCount',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'criteria',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'openRate',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'clickRate',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    default: 0,
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
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('segments');
    }
}