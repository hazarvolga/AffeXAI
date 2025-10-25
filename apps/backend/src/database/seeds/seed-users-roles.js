"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const data_source_1 = require("../data-source");
async function seedData() {
    try {
        // ⚠️ SECURITY: Only run in development environment
        if (process.env.NODE_ENV === 'production') {
            console.log('❌ Cannot run seed in production environment');
            console.log('💡 Please use the admin panel to create users in production');
            process.exit(1);
        }
        await data_source_1.AppDataSource.initialize();
        console.log('✅ Database connected');
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        // 1. Check and seed roles
        console.log('📋 Checking roles...');
        const rolesCount = await queryRunner.query('SELECT COUNT(*) FROM roles');
        if (parseInt(rolesCount[0].count) === 0) {
            console.log('🔧 Seeding roles...');
            await queryRunner.query(`
        INSERT INTO roles (id, name, "displayName", description, permissions, "isActive", "isSystem", "createdAt", "updatedAt")
        VALUES
        -- Admin Role
        (
            'a1b2c3d4-e5f6-4789-abcd-000000000001',
            'admin',
            'Admin',
            'Tüm sistem üzerinde tam yetkiye sahip.',
            '["users.view","users.create","users.update","users.delete","roles.view","roles.manage","events.view","events.create","events.update","events.delete","events.participants","certificates.view","certificates.create","certificates.update","certificates.revoke","support.view","support.respond","support.assign","marketing.manage","marketing.campaigns","cms.pages.view","cms.pages.create","cms.pages.update","cms.pages.delete","cms.menus.manage","system.settings","system.logs"]'::jsonb,
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
            '["events.view","events.create","events.update","events.delete","events.participants","certificates.view","certificates.create","certificates.update","certificates.revoke","cms.pages.view","cms.pages.create","cms.pages.update","cms.pages.delete","cms.menus.manage"]'::jsonb,
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
            '["support.view","support.respond","support.assign"]'::jsonb,
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
            '["users.view","roles.view","events.view","certificates.view","cms.pages.view"]'::jsonb,
            true,
            true,
            NOW(),
            NOW()
        ),
        -- Student Role
        (
            'a1b2c3d4-e5f6-4789-abcd-000000000006',
            'student',
            'Student',
            'Öğrenci rolü - eğitim içeriklerine erişim.',
            '["events.view","certificates.view","courses.view"]'::jsonb,
            true,
            true,
            NOW(),
            NOW()
        ),
        -- Subscriber Role
        (
            'a1b2c3d4-e5f6-4789-abcd-000000000007',
            'subscriber',
            'Subscriber',
            'Abone rolü - bülten ve pazarlama içeriklerine erişim.',
            '["newsletter.view","marketing.receive"]'::jsonb,
            true,
            true,
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO NOTHING
      `);
            console.log('✅ Roles seeded successfully');
        }
        else {
            console.log('✅ Roles already exist');
        }
        // 2. Check and seed admin user
        console.log('👤 Checking admin user...');
        const adminExists = await queryRunner.query("SELECT * FROM users WHERE email = 'admin@aluplan.com'");
        if (adminExists.length === 0) {
            console.log('🔧 Creating admin user...');
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            await queryRunner.query(`
        INSERT INTO users (
          id, 
          email, 
          password, 
          "firstName", 
          "lastName", 
          "roleId", 
          "isActive", 
          "emailVerified", 
          "emailVerifiedAt",
          "createdAt", 
          "updatedAt"
        ) VALUES (
          gen_random_uuid(),
          'admin@aluplan.com',
          $1,
          'Admin',
          'User',
          'a1b2c3d4-e5f6-4789-abcd-000000000001',
          true,
          true,
          NOW(),
          NOW(),
          NOW()
        )
      `, [hashedPassword]);
            console.log('✅ Admin user created successfully');
            console.log('   Email: admin@aluplan.com');
            console.log('   Password: Admin123!');
        }
        else {
            console.log('✅ Admin user already exists');
            // Update password to ensure it's correct
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            await queryRunner.query("UPDATE users SET password = $1 WHERE email = 'admin@aluplan.com'", [hashedPassword]);
            console.log('✅ Admin password updated');
        }
        // 3. Check and seed test users
        console.log('👥 Checking test users...');
        const testUsers = [
            {
                email: 'editor@aluplan.com',
                password: 'Editor123!',
                firstName: 'Editor',
                lastName: 'User',
                roleId: 'a1b2c3d4-e5f6-4789-abcd-000000000002', // editor
            },
            {
                email: 'customer@aluplan.com',
                password: 'Customer123!',
                firstName: 'Customer',
                lastName: 'User',
                roleId: 'a1b2c3d4-e5f6-4789-abcd-000000000003', // customer
            },
            {
                email: 'support@aluplan.com',
                password: 'Support123!',
                firstName: 'Support',
                lastName: 'User',
                roleId: 'a1b2c3d4-e5f6-4789-abcd-000000000004', // support
            },
            {
                email: 'viewer@aluplan.com',
                password: 'Viewer123!',
                firstName: 'Viewer',
                lastName: 'User',
                roleId: 'a1b2c3d4-e5f6-4789-abcd-000000000005', // viewer
            },
        ];
        for (const user of testUsers) {
            const exists = await queryRunner.query('SELECT * FROM users WHERE email = $1', [user.email]);
            if (exists.length === 0) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await queryRunner.query(`
          INSERT INTO users (
            id, 
            email, 
            password, 
            "firstName", 
            "lastName", 
            "roleId", 
            "isActive", 
            "emailVerified", 
            "emailVerifiedAt",
            "createdAt", 
            "updatedAt"
          ) VALUES (
            gen_random_uuid(),
            $1,
            $2,
            $3,
            $4,
            $5,
            true,
            true,
            NOW(),
            NOW(),
            NOW()
          )
        `, [user.email, hashedPassword, user.firstName, user.lastName, user.roleId]);
                console.log(`   ✅ Created ${user.email}`);
            }
            else {
                console.log(`   ℹ️  ${user.email} already exists`);
            }
        }
        await queryRunner.release();
        await data_source_1.AppDataSource.destroy();
        console.log('\n🎉 Seeding completed successfully!\n');
        console.log('Test Accounts:');
        console.log('─────────────────────────────────────');
        console.log('Admin:    admin@aluplan.com / Admin123!');
        console.log('Editor:   editor@aluplan.com / Editor123!');
        console.log('Customer: customer@aluplan.com / Customer123!');
        console.log('Support:  support@aluplan.com / Support123!');
        console.log('Viewer:   viewer@aluplan.com / Viewer123!');
        console.log('─────────────────────────────────────\n');
    }
    catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
}
seedData();
//# sourceMappingURL=seed-users-roles.js.map