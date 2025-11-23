import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { TicketStatus } from '../../modules/tickets/enums/ticket-status.enum';
import { TicketPriority } from '../../modules/tickets/enums/ticket-priority.enum';

async function seedTickets() {
  try {
    // ⚠️ SECURITY: Only run in development environment
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Cannot run seed in production environment');
      process.exit(1);
    }

    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    // 1. Check if we have any users
    console.log('👥 Checking users...');
    const users = await queryRunner.query('SELECT id FROM users LIMIT 5');
    
    if (users.length === 0) {
      console.log('❌ No users found. Please run user seeder first.');
      await queryRunner.release();
      await AppDataSource.destroy();
      process.exit(1);
    }

    // 2. Get support team user for assignment
    console.log('👤 Finding support user...');
    const supportUser = await queryRunner.query(
      "SELECT id FROM users WHERE email = 'support@aluplan.com'"
    );

    if (supportUser.length === 0) {
      console.log('❌ Support user not found. Please run user seeder first.');
      await queryRunner.release();
      await AppDataSource.destroy();
      process.exit(1);
    }

    const supportUserId = supportUser[0].id;
    console.log(`✅ Found support user: ${supportUserId}`);

    // 3. Get customer user
    console.log('👤 Finding customer user...');
    const customerUser = await queryRunner.query(
      "SELECT id FROM users WHERE email = 'customer@aluplan.com'"
    );

    if (customerUser.length === 0) {
      console.log('❌ Customer user not found. Please run user seeder first.');
      await queryRunner.release();
      await AppDataSource.destroy();
      process.exit(1);
    }

    const customerUserId = customerUser[0].id;
    console.log(`✅ Found customer user: ${customerUserId}`);

    // 4. Check and seed ticket categories
    console.log('📋 Checking ticket categories...');
    const categoriesCount = await queryRunner.query('SELECT COUNT(*) FROM ticket_categories');
    
    if (parseInt(categoriesCount[0].count) === 0) {
      console.log('🔧 Seeding ticket categories...');
      await queryRunner.query(`
        INSERT INTO ticket_categories (id, name, description, "parentId", "isActive", "createdAt", "updatedAt")
        VALUES
        (gen_random_uuid(), 'Teknik Destek', 'Yazılım, donanım ve ağ sorunları.', null, true, NOW(), NOW()),
        (gen_random_uuid(), 'Lisanslama', 'Lisans anahtarı aktivasyonu ve yönetimi.', null, true, NOW(), NOW()),
        (gen_random_uuid(), 'Faturalama', 'Ödeme, fatura ve abonelikle ilgili sorular.', null, true, NOW(), NOW()),
        (gen_random_uuid(), 'Genel', 'Eğitim, danışmanlık ve diğer genel sorular.', null, true, NOW(), NOW())
      `);
      console.log('✅ Ticket categories seeded successfully');
    } else {
      console.log('✅ Ticket categories already exist');
    }

    // 5. Get a category for tickets
    console.log('📋 Getting ticket category...');
    const category = await queryRunner.query(
      "SELECT id FROM ticket_categories WHERE name = 'Teknik Destek'"
    );

    if (category.length === 0) {
      console.log('❌ Technical category not found.');
      await queryRunner.release();
      await AppDataSource.destroy();
      process.exit(1);
    }

    const categoryId = category[0].id;
    console.log(`✅ Found category: ${categoryId}`);

    // 6. Check and seed sample tickets
    console.log('🎫 Checking tickets...');
    
    // Always add sample tickets for testing
    console.log('🔧 Seeding sample tickets...');
    
    // Create sample tickets
    const tickets = [
      {
        subject: 'Lisans anahtarım çalışmıyor',
        description: 'Yeni satın aldığım Allplan 2024 lisans anahtarını girdiğimde "geçersiz anahtar" hatası alıyorum. Yardımcı olabilir misiniz?',
        priority: TicketPriority.HIGH,
        status: TicketStatus.OPEN,
        userId: customerUserId,
        assignedToId: supportUserId,
        categoryId: categoryId
      },
      {
        subject: 'Faturamı nasıl indirebilirim?',
        description: 'Geçen haftaki danışmanlık hizmeti için faturama ihtiyacım var ama portalda bulamadım.',
        priority: TicketPriority.MEDIUM,
        status: TicketStatus.RESOLVED,
        userId: customerUserId,
        assignedToId: supportUserId,
        categoryId: categoryId
      },
      {
        subject: 'PythonPart oluşturma hakkında soru',
        description: 'Kendi özel PythonPart\'larımı oluşturmak için nereden başlayabilirim? Bununla ilgili bir döküman var mı?',
        priority: TicketPriority.LOW,
        status: TicketStatus.OPEN,
        userId: customerUserId,
        assignedToId: supportUserId,
        categoryId: categoryId
      }
    ];

    for (const ticket of tickets) {
      // Check if ticket already exists
      const existingTicket = await queryRunner.query(
        'SELECT id FROM tickets WHERE subject = $1',
        [ticket.subject]
      );

      if (existingTicket.length === 0) {
        // Insert ticket
        const result = await queryRunner.query(`
          INSERT INTO tickets (
            id, subject, description, "priority", status, "userId", "assignedToId", "categoryId",
            "createdAt", "updatedAt", "slaFirstResponseDueAt", "slaResolutionDueAt"
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7,
            NOW(), NOW(), NOW() + INTERVAL '24 hours', NOW() + INTERVAL '168 hours'
          ) RETURNING id
        `, [
          ticket.subject,
          ticket.description,
          ticket.priority,
          ticket.status,
          ticket.userId,
          ticket.assignedToId,
          ticket.categoryId
        ]);

        const ticketId = result[0].id;
        console.log(`   ✅ Created ticket: ${ticketId} - ${ticket.subject}`);

        // Add initial message
        await queryRunner.query(`
          INSERT INTO ticket_messages (
            id, "ticketId", "authorId", content, "isInternal", "createdAt"
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, false, NOW()
          )
        `, [ticketId, ticket.userId, ticket.description]);

        console.log(`   📩 Added initial message for ticket: ${ticketId}`);
      } else {
        console.log(`   ℹ️  Ticket "${ticket.subject}" already exists`);
      }
    }

    console.log('✅ Sample tickets seeded successfully');

    await queryRunner.release();
    await AppDataSource.destroy();

    console.log('\n🎉 Ticket seeding completed successfully!\n');

  } catch (error) {
    console.error('❌ Error seeding tickets:', error);
    process.exit(1);
  }
}

seedTickets();