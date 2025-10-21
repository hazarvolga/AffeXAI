"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendUsersTableAndCreateRoles1728910000000 = void 0;
class ExtendUsersTableAndCreateRoles1728910000000 {
    async up(queryRunner) {
        // Seed default system roles (table already created by synchronize)
        await queryRunner.query(`
            INSERT INTO roles (id, name, "displayName", description, permissions, "isActive", "isSystem", "createdAt", "updatedAt")
            VALUES
            -- Admin Role
            (
                'a1b2c3d4-e5f6-4789-abcd-000000000001',
                'admin',
                'Admin',
                'Tüm sistem üzerinde tam yetkiye sahip.',
                '["users.view","users.create","users.edit","users.delete","roles.view","roles.manage","events.view","events.create","events.edit","events.delete","events.manage_attendees","certificates.view","certificates.create","certificates.edit","certificates.revoke","support.view_all","support.assign","support.reply","marketing.manage_campaigns","marketing.manage_newsletters","marketing.manage_social","cms.view","cms.create","cms.edit","cms.delete","cms.manage_menus","settings.manage"]'::jsonb,
                true,
                true,
                NOW(),
                NOW()
            ),
            -- Editor Role
            (
                'a1b2c3d4-e5f6-4789-abcd-000000000002',
                'editor',
                'Editor',
                'İçerik (CMS), etkinlik ve sertifika yönetimi yapabilir.',
                '["events.view","events.create","events.edit","events.delete","events.manage_attendees","certificates.view","certificates.create","certificates.edit","certificates.revoke","cms.view","cms.create","cms.edit","cms.delete","cms.manage_menus"]'::jsonb,
                true,
                true,
                NOW(),
                NOW()
            ),
            -- Customer Role
            (
                'a1b2c3d4-e5f6-4789-abcd-000000000003',
                'customer',
                'Customer',
                'Normal müşteri kullanıcı.',
                '["events.view","certificates.view"]'::jsonb,
                true,
                true,
                NOW(),
                NOW()
            ),
            -- Support Team Role
            (
                'a1b2c3d4-e5f6-4789-abcd-000000000004',
                'support',
                'Support Team',
                'Destek taleplerini yönetir ve yanıtlar.',
                '["support.view_all","support.assign","support.reply"]'::jsonb,
                true,
                true,
                NOW(),
                NOW()
            ),
            -- Viewer Role
            (
                'a1b2c3d4-e5f6-4789-abcd-000000000005',
                'viewer',
                'Viewer',
                'Sadece görüntüleme yetkisi.',
                '["users.view","events.view","certificates.view"]'::jsonb,
                true,
                true,
                NOW(),
                NOW()
            )
        `);
        // Update existing users' role field to roleId (map string roles to role IDs)
        await queryRunner.query(`
            UPDATE users SET "roleId" = (
                CASE 
                    WHEN role = 'Admin' THEN 'a1b2c3d4-e5f6-4789-abcd-000000000001'::uuid
                    WHEN role = 'Editor' THEN 'a1b2c3d4-e5f6-4789-abcd-000000000002'::uuid
                    WHEN role = 'Customer' THEN 'a1b2c3d4-e5f6-4789-abcd-000000000003'::uuid
                    WHEN role = 'Support Team' THEN 'a1b2c3d4-e5f6-4789-abcd-000000000004'::uuid
                    WHEN role = 'Viewer' THEN 'a1b2c3d4-e5f6-4789-abcd-000000000005'::uuid
                    ELSE 'a1b2c3d4-e5f6-4789-abcd-000000000003'::uuid -- Default to Customer
                END
            )
            WHERE "roleId" IS NULL
        `);
    }
    async down(queryRunner) {
        // Reset users roleId
        await queryRunner.query(`UPDATE users SET "roleId" = NULL`);
        // Delete seeded roles
        await queryRunner.query(`
            DELETE FROM roles WHERE id IN (
                'a1b2c3d4-e5f6-4789-abcd-000000000001',
                'a1b2c3d4-e5f6-4789-abcd-000000000002',
                'a1b2c3d4-e5f6-4789-abcd-000000000003',
                'a1b2c3d4-e5f6-4789-abcd-000000000004',
                'a1b2c3d4-e5f6-4789-abcd-000000000005'
            )
        `);
    }
}
exports.ExtendUsersTableAndCreateRoles1728910000000 = ExtendUsersTableAndCreateRoles1728910000000;
//# sourceMappingURL=1728910000000-ExtendUsersTableAndCreateRoles.js.map