"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTokenVersionToUser1729333333333 = void 0;
const typeorm_1 = require("typeorm");
class AddTokenVersionToUser1729333333333 {
    async up(queryRunner) {
        // Add tokenVersion column to users table
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'tokenVersion',
            type: 'int',
            default: 1,
            isNullable: false,
        }));
        console.log('✅ Added tokenVersion column to users table');
    }
    async down(queryRunner) {
        // Remove tokenVersion column
        await queryRunner.dropColumn('users', 'tokenVersion');
        console.log('✅ Removed tokenVersion column from users table');
    }
}
exports.AddTokenVersionToUser1729333333333 = AddTokenVersionToUser1729333333333;
//# sourceMappingURL=1729333333333-AddTokenVersionToUser.js.map