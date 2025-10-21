"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrateExistingUserRoles1729333333334 = void 0;
class MigrateExistingUserRoles1729333333334 {
    async up(queryRunner) {
        console.log('🔄 Migrating existing user roles to user_roles table...');
        // Get all users with roleId
        const users = await queryRunner.query(`
      SELECT id, "roleId"
      FROM users
      WHERE "roleId" IS NOT NULL
    `);
        console.log(`📊 Found ${users.length} users with existing roleId`);
        // Insert into user_roles table
        for (const user of users) {
            try {
                // Check if entry already exists
                const existing = await queryRunner.query(`
          SELECT id FROM user_roles
          WHERE "userId" = $1 AND "roleId" = $2
        `, [user.id, user.roleId]);
                if (existing.length === 0) {
                    await queryRunner.query(`
            INSERT INTO user_roles ("userId", "roleId", "isPrimary", "assignedAt")
            VALUES ($1, $2, true, NOW())
          `, [user.id, user.roleId]);
                    console.log(`✅ Migrated role for user ${user.id}`);
                }
                else {
                    console.log(`⏭️  User ${user.id} already has role assignment`);
                }
            }
            catch (error) {
                console.error(`❌ Failed to migrate role for user ${user.id}:`, error);
            }
        }
        console.log('✅ Migration completed successfully');
    }
    async down(queryRunner) {
        console.log('🔄 Reverting user roles migration...');
        // Delete all user_roles entries that were migrated
        await queryRunner.query(`
      DELETE FROM user_roles
      WHERE "assignedBy" IS NULL
    `);
        console.log('✅ Migration reverted');
    }
}
exports.MigrateExistingUserRoles1729333333334 = MigrateExistingUserRoles1729333333334;
//# sourceMappingURL=1729333333334-MigrateExistingUserRoles.js.map