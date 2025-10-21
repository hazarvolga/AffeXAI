"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSubscriberLocation1759678923456 = void 0;
const typeorm_1 = require("typeorm");
class AddSubscriberLocation1759678923456 {
    async up(queryRunner) {
        const table = await queryRunner.getTable('subscribers');
        // Check and add location column
        if (!table?.findColumnByName('location')) {
            await queryRunner.addColumn('subscribers', new typeorm_1.TableColumn({
                name: 'location',
                type: 'varchar',
                isNullable: true,
                length: '10',
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('subscribers');
        if (table?.findColumnByName('location')) {
            await queryRunner.dropColumn('subscribers', 'location');
        }
    }
}
exports.AddSubscriberLocation1759678923456 = AddSubscriberLocation1759678923456;
//# sourceMappingURL=1759678923456-add-subscriber-location.js.map