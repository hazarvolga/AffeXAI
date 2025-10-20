import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSubscriberLocation1759678923456 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('subscribers');
        
        // Check and add location column
        if (!table?.findColumnByName('location')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'location',
                type: 'varchar',
                isNullable: true,
                length: '10',
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('subscribers');
        
        if (table?.findColumnByName('location')) {
            await queryRunner.dropColumn('subscribers', 'location');
        }
    }
}