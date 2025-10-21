"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailVerificationFields1729000000001 = void 0;
const typeorm_1 = require("typeorm");
class AddEmailVerificationFields1729000000001 {
    async up(queryRunner) {
        const table = await queryRunner.getTable('users');
        // Add emailVerificationToken column if not exists
        const hasToken = table?.columns.find(c => c.name === 'emailVerificationToken');
        if (!hasToken) {
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'emailVerificationToken',
                type: 'text',
                isNullable: true,
            }));
        }
        // Add emailVerificationExpires column if not exists
        const hasExpires = table?.columns.find(c => c.name === 'emailVerificationExpires');
        if (!hasExpires) {
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'emailVerificationExpires',
                type: 'timestamp',
                isNullable: true,
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('users');
        // Drop emailVerificationExpires if exists
        const hasExpires = table?.columns.find(c => c.name === 'emailVerificationExpires');
        if (hasExpires) {
            await queryRunner.dropColumn('users', 'emailVerificationExpires');
        }
        // Drop emailVerificationToken if exists
        const hasToken = table?.columns.find(c => c.name === 'emailVerificationToken');
        if (hasToken) {
            await queryRunner.dropColumn('users', 'emailVerificationToken');
        }
    }
}
exports.AddEmailVerificationFields1729000000001 = AddEmailVerificationFields1729000000001;
//# sourceMappingURL=1729000000001-AddEmailVerificationFields.js.map