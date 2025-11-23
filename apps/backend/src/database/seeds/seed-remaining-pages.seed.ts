import { DataSource } from 'typeorm';
import { Page } from '../../modules/cms/entities/page.entity';
import { Component } from '../../modules/cms/entities/component.entity';
import { PageStatus, ComponentType } from '@affexai/shared-types';

/**
 * Seed remaining CMS pages (Products, Contact, About, Support)
 * with simple, editable blocks based on backup content
 */
export async function seedRemainingPages(dataSource: DataSource) {
  console.log('📄 Seeding remaining CMS pages with editable blocks...\n');

  const pageRepository = dataSource.getRepository(Page);
  const componentRepository = dataSource.getRepository(Component);

  // Products Page Seed
  console.log('📦 Seeding Products page...');
  const productsPage = await pageRepository.findOne({ where: { slug: 'products' } });

  if (productsPage) {
    // Clear existing components
    await componentRepository.delete({ pageId: productsPage.id });

    const productsComponents = [
      // Hero section
      {
        pageId: productsPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'hero-with-image-and-text-overlay',
          title: 'Ürünlerimiz',
          subtitle: 'İnşaat ve mimarlık sektörüne özel BIM çözümleri',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920',
          ctaText: 'Tüm Ürünleri Keşfet',
          ctaLink: '#products',
          titleVariant: 'heading1',
          titleAlign: 'center',
          titleColor: 'primary',
          overlayOpacity: 0.5,
        },
        orderIndex: 0,
      },
      // Products grid
      {
        pageId: productsPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-section-with-title',
          title: 'Allplan Ürün Ailesi',
          subtitle: 'Her ihtiyaca özel çözümler',
          content: 'Allplan yazılım ailesi ile mimari tasarımdan yapı mühendisliğine, proje yönetiminden veri yönetimine kadar tüm ihtiyaçlarınızı karşılayın.',
          titleVariant: 'heading2',
          titleAlign: 'center',
          titleColor: 'primary',
          cssClasses: 'py-16 md:py-24',
        },
        orderIndex: 1,
      },
      // CTA section
      {
        pageId: productsPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-with-call-to-action',
          title: 'Demo Talep Edin',
          content: 'Ürünlerimizi canlı demo ile tanımak ister misiniz? Hemen iletişime geçin.',
          ctaText: 'Demo İsteği Gönder',
          ctaLink: '/contact',
          cssClasses: 'bg-primary/5 py-12',
        },
        orderIndex: 2,
      },
    ];

    await componentRepository.save(productsComponents);
    console.log(`✅ Products page seeded with ${productsComponents.length} components`);
  }

  // Contact Page Seed
  console.log('📧 Seeding Contact page...');
  const contactPage = await pageRepository.findOne({ where: { slug: 'contact' } });

  if (contactPage) {
    // Clear existing components
    await componentRepository.delete({ pageId: contactPage.id });

    const contactComponents = [
      // Hero section
      {
        pageId: contactPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'hero-with-background-image',
          title: 'İletişim',
          subtitle: 'Uzman ekibimizle tanışın ve dijital dönüşüm yolculuğunuzda size nasıl yardımcı olabileceğimizi öğrenin.',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920',
          titleVariant: 'heading1',
          titleAlign: 'center',
          titleColor: 'primary',
          overlayOpacity: 0.4,
          cssClasses: 'py-24',
        },
        orderIndex: 0,
      },
      // Contact info
      {
        pageId: contactPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-section-with-title',
          title: 'İletişim Bilgilerimiz',
          content: 'E-posta: info@aluplan.com.tr\nTelefon: +90 216 123 45 67\nAdres: Örnek Mah. Teknoloji Cad. No:123, Ataşehir/İstanbul',
          titleVariant: 'heading2',
          titleAlign: 'center',
          titleColor: 'primary',
          cssClasses: 'py-16 md:py-24 whitespace-pre-line',
        },
        orderIndex: 1,
      },
      // Contact form CTA
      {
        pageId: contactPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-with-call-to-action',
          title: 'Bize Mesaj Gönderin',
          content: 'Sorularınız mı var? Proje için teklif mi almak istiyorsunuz? Hemen iletişime geçin!',
          ctaText: 'İletişim Formu',
          ctaLink: '/portal/support/new',
          cssClasses: 'bg-secondary/10 py-12',
        },
        orderIndex: 2,
      },
    ];

    await componentRepository.save(contactComponents);
    console.log(`✅ Contact page seeded with ${contactComponents.length} components`);
  }

  // About Page Seed
  console.log('ℹ️  Seeding About page...');
  const aboutPage = await pageRepository.findOne({ where: { slug: 'about' } });

  if (aboutPage) {
    // Clear existing components
    await componentRepository.delete({ pageId: aboutPage.id });

    const aboutComponents = [
      // Hero section
      {
        pageId: aboutPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'hero-with-image-and-text-overlay',
          title: 'Hakkımızda',
          subtitle: 'Türkiye\'nin öncü BIM çözüm ortağı',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920',
          ctaText: 'Hikayemizi Keşfet',
          ctaLink: '#story',
          titleVariant: 'heading1',
          titleAlign: 'center',
          titleColor: 'primary',
          overlayOpacity: 0.5,
        },
        orderIndex: 0,
      },
      // Mission
      {
        pageId: aboutPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-section-with-title',
          title: 'Misyonumuz',
          subtitle: 'İnşaat sektörünü dijital dönüşümle güçlendirmek',
          content: 'Affexai olarak, Allplan ürünleri ile Türkiye\'nin inşaat ve mimarlık sektörüne en iyi BIM çözümlerini sunuyoruz. Müşterilerimizin projelerini başarıyla tamamlamaları için gerekli teknolojiyi, eğitimi ve desteği sağlıyoruz.',
          titleVariant: 'heading2',
          titleAlign: 'center',
          titleColor: 'primary',
          cssClasses: 'py-16 md:py-24',
        },
        orderIndex: 1,
      },
      // Values
      {
        pageId: aboutPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'special-feature-trio',
          title: 'Değerlerimiz',
          titleAlign: 'center',
          titleColor: 'primary',
          titleVariant: 'heading2',
          items: [
            {
              icon: '🎯',
              title: 'Müşteri Odaklılık',
              content: 'Müşterilerimizin başarısı bizim önceliğimizdir',
            },
            {
              icon: '💡',
              title: 'Yenilikçilik',
              content: 'En güncel teknolojileri takip eder ve sunarız',
            },
            {
              icon: '🤝',
              title: 'Güvenilirlik',
              content: 'Uzun vadeli iş ortaklıkları kurarız',
            },
          ],
        },
        orderIndex: 2,
      },
    ];

    await componentRepository.save(aboutComponents);
    console.log(`✅ About page seeded with ${aboutComponents.length} components`);
  }

  // Support Page Seed
  console.log('🆘 Seeding Support page...');
  const supportPage = await pageRepository.findOne({ where: { slug: 'support' } });

  if (supportPage) {
    // Clear existing components
    await componentRepository.delete({ pageId: supportPage.id });

    const supportComponents = [
      // Hero section
      {
        pageId: supportPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'hero-with-background-image',
          title: 'Destek',
          subtitle: 'Size yardımcı olmak için buradayız',
          backgroundImageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1920',
          ctaText: 'Destek Talebi Oluştur',
          ctaLink: '/portal/support/new',
          titleVariant: 'heading1',
          titleAlign: 'center',
          titleColor: 'primary',
          overlayOpacity: 0.5,
          cssClasses: 'py-24',
        },
        orderIndex: 0,
      },
      // Support options
      {
        pageId: supportPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'special-feature-trio',
          title: 'Destek Seçeneklerimiz',
          titleAlign: 'center',
          titleColor: 'primary',
          titleVariant: 'heading2',
          items: [
            {
              icon: '🎫',
              title: 'Destek Talebi',
              content: 'Teknik destek için ticket sistemi üzerinden bize ulaşın',
            },
            {
              icon: '📚',
              title: 'Bilgi Bankası',
              content: 'Sık sorulan sorular ve detaylı kılavuzlar',
            },
            {
              icon: '🎓',
              title: 'Eğitimler',
              content: 'Online ve yüz yüze eğitim programlarımız',
            },
          ],
        },
        orderIndex: 1,
      },
      // CTA
      {
        pageId: supportPage.id,
        type: ComponentType.BLOCK,
        props: {
          blockId: 'content-with-call-to-action',
          title: 'Hemen Yardım Alın',
          content: 'Teknik bir sorun mu yaşıyorsunuz? Destek ekibimiz size yardımcı olmaya hazır.',
          ctaText: 'Ticket Oluştur',
          ctaLink: '/portal/support/new',
          cssClasses: 'bg-primary/5 py-12',
        },
        orderIndex: 2,
      },
    ];

    await componentRepository.save(supportComponents);
    console.log(`✅ Support page seeded with ${supportComponents.length} components`);
  }

  console.log('\n✨ All remaining pages seeded successfully!');
  console.log('📝 Note: All blocks are editable via CMS editor');
  console.log('🎨 You can now customize content, add more blocks, and adjust layouts');
}
