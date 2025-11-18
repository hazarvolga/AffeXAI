import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Page } from '../../modules/cms/entities/page.entity';
import { Component } from '../../modules/cms/entities/component.entity';
import { Category } from '../../modules/cms/entities/category.entity';
import { Menu } from '../../modules/cms/entities/menu.entity';
import { MenuItem } from '../../modules/cms/entities/menu-item.entity';

config({ path: '.env' });

// Database configuration
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5434'),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'affexai_dev',
  entities: [Page, Component, Category, Menu, MenuItem],
  synchronize: false,
});

async function seedParentPages() {
  console.log('🚀 Starting parent pages migration...\n');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established\n');

    const pageRepository = AppDataSource.getRepository(Page);
    const componentRepository = AppDataSource.getRepository(Component);

    // ===== 1. Products/Allplan =====
    console.log('📄 1. Migrating products/allplan...');
    let allplanPage = await pageRepository.findOne({
      where: { slug: 'products/allplan' },
    });

    if (!allplanPage) {
      allplanPage = pageRepository.create({
        title: 'Allplan Ürün Ailesi',
        slug: 'products/allplan',
        description:
          'Tasarım, mühendislik ve inşaat için her ihtiyaca yönelik kapsamlı BIM çözümleri.',
        status: 'published',
        layoutOptions: { showHeader: true, showFooter: true },
      });
      await pageRepository.save(allplanPage);
    }

    // Delete existing components for this page
    await componentRepository.delete({ page: { id: allplanPage.id } });

    // Add components
    const allplanComponents = [
      {
        type: 'block' as const,
        props: {
          blockId: 'hero-with-background-image',
          title: 'Allplan Ürün Ailesi',
          subtitle:
            'Tasarım, mühendislik ve inşaat için her ihtiyaca yönelik kapsamlı BIM çözümleri.',
          backgroundImage:
            'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop',
          imageHint: 'modern building architecture',
        },
        orderIndex: 0,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'content-section-with-title',
          title: 'Projeniz İçin Doğru Allplan Seçin',
          content:
            'Allplan, temel 2B çizimden en karmaşık BIM projelerine kadar her ölçekteki ihtiyaca cevap veren esnek bir ürün yelpazesi sunar.',
          alignment: 'center',
          maxWidth: '3xl',
        },
        orderIndex: 1,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '📐',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Basic',
          content:
            'Temel 2B çizim ve 3B modelleme ihtiyaçlarınız için güçlü ve ekonomik bir başlangıç.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/basic',
          enableHoverEffect: true,
        },
        orderIndex: 2,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '✏️',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Concept',
          content:
            'Kavramsal tasarım, hızlı görselleştirme ve sunum için ideal araçlar sunar.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/concept',
          enableHoverEffect: true,
        },
        orderIndex: 3,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🏗️',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Professional',
          content:
            'Mimarlar ve mühendisler için tüm profesyonel araçları içeren kapsamlı BIM çözümü.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/professional',
          enableHoverEffect: true,
        },
        orderIndex: 4,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🏆',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Ultimate',
          content:
            'Tüm Allplan özelliklerini ve modüllerini içeren, en üst düzey projeler için nihai paket.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/ultimate',
          enableHoverEffect: true,
        },
        orderIndex: 5,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🛣️',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Civil',
          content:
            'İnşaat mühendisliği ve altyapı projeleri için özel olarak tasarlanmış çözümler sunar.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/civil',
          enableHoverEffect: true,
        },
        orderIndex: 6,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🏭',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Precast',
          content:
            'Prefabrik elemanların tasarımı, detaylandırılması ve üretimi için otomasyon sağlar.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonVariant: 'default',
          buttonHref: '/products/allplan/precast',
          enableHoverEffect: true,
        },
        orderIndex: 7,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'content-with-call-to-action',
          title: 'Hangi Paketin Size Uygun Olduğundan Emin Değil Misiniz?',
          content:
            'Paketleri karşılaştırarak özelliklerini detaylıca inceleyin veya uzman ekibimizden projenize özel öneriler alın.',
          primaryButtonText: 'Satış Temsilcisine Ulaşın',
          primaryButtonHref: '/contact',
          secondaryButtonText: 'Paketleri Karşılaştır',
          backgroundColor: 'secondary',
        },
        orderIndex: 8,
      },
    ];

    for (const compData of allplanComponents) {
      const component = componentRepository.create({
        ...compData,
        page: allplanPage,
      });
      await componentRepository.save(component);
    }

    console.log(`✅ products/allplan migrated (${allplanComponents.length} components)\n`);

    // ===== 2. Products/Building-Infrastructure =====
    console.log('📄 2. Migrating products/building-infrastructure...');
    let buildingInfraPage = await pageRepository.findOne({
      where: { slug: 'products/building-infrastructure' },
    });

    if (!buildingInfraPage) {
      buildingInfraPage = pageRepository.create({
        title: 'Bina & Altyapı Ürünleri',
        slug: 'products/building-infrastructure',
        description:
          'Mimari, mühendislik ve altyapı projeleri için uzmanlaşmış BIM çözümleri.',
        status: 'published',
        layoutOptions: { showHeader: true, showFooter: true },
      });
      await pageRepository.save(buildingInfraPage);
    }

    await componentRepository.delete({ page: { id: buildingInfraPage.id } });

    const buildingInfraComponents = [
      {
        type: 'block' as const,
        props: {
          blockId: 'hero-with-background-image',
          title: 'Bina & Altyapı Ürünleri',
          subtitle:
            'Mimari, mühendislik ve altyapı projeleri için uzmanlaşmış BIM çözümleri.',
          backgroundImage:
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
          imageHint: 'modern infrastructure',
        },
        orderIndex: 0,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🏢',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan AEC',
          content:
            'Mimarlık, mühendislik ve inşaat sektörü için entegre BIM platformu.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonHref: '/products/building-infrastructure/allplan-aec',
          enableHoverEffect: true,
        },
        orderIndex: 1,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '🌉',
          iconType: 'emoji',
          iconBackground: true,
          title: 'Allplan Bridge',
          content: 'Köprü tasarımı ve mühendisliği için uzmanlaşmış çözüm.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonHref: '/products/building-infrastructure/allplan-bridge',
          enableHoverEffect: true,
        },
        orderIndex: 2,
      },
      {
        type: 'block' as const,
        props: {
          blockId: 'special-feature-card-single',
          icon: '⚡',
          iconType: 'emoji',
          iconBackground: true,
          title: 'AX3000',
          content: 'Yapı fiziği ve enerji analizi için güçlü araçlar.',
          enableButton: true,
          buttonText: 'Detayları İncele',
          buttonHref: '/products/building-infrastructure/ax3000',
          enableHoverEffect: true,
        },
        orderIndex: 3,
      },
    ];

    for (const compData of buildingInfraComponents) {
      const component = componentRepository.create({
        ...compData,
        page: buildingInfraPage,
      });
      await componentRepository.save(component);
    }

    console.log(
      `✅ products/building-infrastructure migrated (${buildingInfraComponents.length} components)\n`,
    );

    // ===== 3-7. Continue with remaining pages... =====
    // (Similar pattern - I'll add them all in the next iteration)

    console.log('\n🎉 Migration complete!');
    console.log('\nView pages at:');
    console.log('  ✓ http://localhost:9003/products/allplan');
    console.log('  ✓ http://localhost:9003/products/building-infrastructure');
    console.log('  (+ 5 more pages to be added...)\n');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('✅ Database connection closed');
    }
  }
}

// Run migration
seedParentPages()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
