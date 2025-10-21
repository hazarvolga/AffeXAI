"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSubscriberDetails17171717171718 = void 0;
const typeorm_1 = require("typeorm");
class AddSubscriberDetails17171717171718 {
    async up(queryRunner) {
        const table = await queryRunner.getTable('subscribers');
        // Check and add firstName column
        if (!table?.findColumnByName('firstName')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'firstName',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }
        // Check and add lastName column
        if (!table?.findColumnByName('lastName')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'lastName',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }
        // Check and add company column
        if (!table?.findColumnByName('company')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'company',
                type: 'varchar',
                isNullable: true,
                length: '255',
            }));
        }
        // Check and add phone column
        if (!table?.findColumnByName('phone')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'phone',
                type: 'varchar',
                isNullable: true,
                length: '20',
            }));
        }
        // Check and add customerStatus column
        if (!table?.findColumnByName('customerStatus')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'customerStatus',
                type: 'varchar',
                isNullable: true,
                length: '50',
            }));
        }
        // Check and add subscriptionType column
        if (!table?.findColumnByName('subscriptionType')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'subscriptionType',
                type: 'varchar',
                isNullable: true,
                length: '100',
            }));
        }
        // Check and add mailerCheckResult column
        if (!table?.findColumnByName('mailerCheckResult')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'mailerCheckResult',
                type: 'varchar',
                isNullable: true,
                length: '20',
            }));
        }
    }
    async down(queryRunner) {
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
exports.AddSubscriberDetails17171717171718 = AddSubscriberDetails17171717171718;
//# sourceMappingURL=17171717171718-add-subscriber-details.js.map