import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSubscriberDetails17171717171718 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('subscribers');
        
        // Check and add firstName column
        if (!table?.findColumnByName('firstName')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'firstName',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }

        // Check and add lastName column
        if (!table?.findColumnByName('lastName')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'lastName',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }

        // Check and add company column
        if (!table?.findColumnByName('company')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'company',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }

        // Check and add phone column
        if (!table?.findColumnByName('phone')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'phone',
                type: 'varchar',
                isNullable: true,
                length: '20',
            }));
        }

        // Check and add customerStatus column
        if (!table?.findColumnByName('customerStatus')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'customerStatus',
                type: 'varchar',
                isNullable: true,
                length: '50',
            }));
        }

        // Check and add subscriptionType column
        if (!table?.findColumnByName('subscriptionType')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'subscriptionType',
                type: 'varchar',
                isNullable: true,
                length: '100',
            }));
        }

        // Check and add mailerCheckResult column
        if (!table?.findColumnByName('mailerCheckResult')) {
            await queryRunner.addColumn('subscribers', new TableColumn({
                name: 'mailerCheckResult',
                type: 'varchar',
                isNullable: true,
                length: '20',
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('subscribers');
        
        if (table?.findColumnByName('mailerCheckResult')) {
            await queryRunner.dropColumn('subscribers', 'mailerCheckResult');
        }
        
        if (table?.findColumnByName('subscriptionType')) {
            await queryRunner.dropColumn('subscribers', 'subscriptionType');
        }
        
        if (table?.findColumnByName('customerStatus')) {
            await queryRunner.dropColumn('subscribers', 'customerStatus');
        }
        
        if (table?.findColumnByName('phone')) {
            await queryRunner.dropColumn('subscribers', 'phone');
        }
        
        if (table?.findColumnByName('company')) {
            await queryRunner.dropColumn('subscribers', 'company');
        }
        
        if (table?.findColumnByName('lastName')) {
            await queryRunner.dropColumn('subscribers', 'lastName');
        }
        
        if (table?.findColumnByName('firstName')) {
            await queryRunner.dropColumn('subscribers', 'firstName');
        }
    }
}