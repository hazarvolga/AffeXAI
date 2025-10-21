"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSubscriberRole1700000000000 = void 0;
class AddSubscriberRole1700000000000 {
    async up(queryRunner) {
        // Add Subscriber role
        await queryRunner.query(`
      INSERT INTO roles (id, name, "displayName", description, permissions, "isActive", "isSystem", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        'subscriber',
        'Subscriber',
        'Email abonesi - Newsletter ve pazarlama emaillerini alır',
        '["email.receive", "profile.manage", "preferences.manage"]'::jsonb,
        true,
        true,
        NOW(),
        NOW()
      )
      ON CONFLICT (name) DO NOTHING;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DELETE FROM roles WHERE name = 'subscriber';
    `);
    }
}
exports.AddSubscriberRole1700000000000 = AddSubscriberRole1700000000000;
//# sourceMappingURL=add-subscriber-role.migration.js.map