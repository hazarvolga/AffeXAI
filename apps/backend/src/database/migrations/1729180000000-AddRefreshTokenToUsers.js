"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRefreshTokenToUsers1729180000000 = void 0;
const typeorm_1 = require("typeorm");
class AddRefreshTokenToUsers1729180000000 {
    async up(queryRunner) {
        // Check if refreshToken column exists
        const refreshTokenExists = await queryRunner.hasColumn('users', 'refreshToken');
        if (!refreshTokenExists) {
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'refreshToken',
                type: 'text',
                isNullable: true,
            }));
        }
        // Check if refreshTokenExpires column exists
        const refreshTokenExpiresExists = await queryRunner.hasColumn('users', 'refreshTokenExpires');
        if (!refreshTokenExpiresExists) {
            await queryRunner.addColumn('users', new typeorm_1.TableColumn({
                name: 'refreshTokenExpires',
                type: 'timestamp',
                isNullable: true,
            }));
        }
        console.log('✅ Migration: refreshToken columns verified/added to users table');
    }
    async down(queryRunner) {
        // Remove refreshTokenExpires column
        await queryRunner.dropColumn('users', 'refreshTokenExpires');
        // Remove refreshToken column
        await queryRunner.dropColumn('users', 'refreshToken');
        console.log('✅ Migration: Removed refreshToken and refreshTokenExpires columns from users table');
    }
}
exports.AddRefreshTokenToUsers1729180000000 = AddRefreshTokenToUsers1729180000000;
//# sourceMappingURL=1729180000000-AddRefreshTokenToUsers.js.map