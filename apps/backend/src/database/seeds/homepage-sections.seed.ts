import { DataSource } from 'typeorm';
import { ReusableComponent } from '../../modules/cms/entities/reusable-component.entity';

export async function seedHomepageSections(dataSource: DataSource) {
  console.log('🏠 Seeding homepage section components...');

  const componentRepository = dataSource.getRepository(ReusableComponent);

  // Check if components already exist
  const existingCount = await componentRepository.count({
    where: [
      { blockId: 'thumbnail-carousel' },
      { blockId: 'tabbed-grid' },
      { blockId: 'hero-tabbed-carousel' },
      { blockId: 'education-multi-layout' },
    ],
  });

  if (existingCount > 0) {
    console.log('⚠️  Homepage section components already exist, skipping...');
    return;
  }

  const components: Partial<ReusableComponent>[] = [
    {
      name: 'Solutions Carousel',
      description: 'Thumbnail navigation carousel for Solutions section (can also be used for Products)',
      componentType: 'block',
      blockType: 'carousel',
      blockCategory: 'homepage',
      blockId: 'thumbnail-carousel',
      props: {
        sectionTitle: 'Çözümlerimiz',
        sectionDescription: 'İnşaat sektörüne özel çözümlerimizi keşfedin',
        bgColor: 'bg-background',
        paddingY: 'py-16 md:py-24',
        imagePosition: 'left',
        slides: [
          {
            id: 'building-solutions',
            category: 'YAPI',
            categoryBgColor: 'bg-primary/10',
            title: 'Yapı Çözümleri',
            description: 'Mimari tasarımdan yapısal analize kadar tüm yapı süreçleriniz için güçlü çözümler',
            imageUrl: '/images/solutions/building.jpg',
            imageHint: 'Yapı çözümleri',
            iconName: 'Building',
            iconColor: 'text-primary',
            items: [
              { title: 'Mimari Tasarım', href: '/solutions/architecture' },
              { title: 'Yapısal Analiz', href: '/solutions/structural' },
              { title: 'MEP Sistemler', href: '/solutions/mep' },
            ],
          },
        ],
      },
      tags: ['homepage', 'carousel', 'solutions', 'products'],
      isPublic: true,
      isFeatured: true,
    },
    {
      name: 'Resources Tabs Grid',
      description: 'Tab-based grid layout for Resources section with multiple categories',
      componentType: 'block',
      blockType: 'tabs',
      blockCategory: 'homepage',
      blockId: 'tabbed-grid',
      props: {
        sectionTitle: 'Kaynaklar',
        sectionDescription: 'Başarınız için ihtiyacınız olan her şey',
        bgColor: 'bg-background',
        paddingY: 'py-16 md:py-24',
        cardGap: 'gap-6',
        tabs: [
          {
            id: 'downloads',
            title: 'İndirilenler',
            iconName: 'Download',
            items: [
              {
                title: 'Teknik Dokümanlar',
                description: 'Ürünlerimiz için detaylı teknik dokümanlar',
                ctaText: 'İncele',
                ctaLink: '/resources/technical-docs',
                cardBgColor: 'bg-card',
              },
            ],
          },
        ],
      },
      tags: ['homepage', 'tabs', 'grid', 'resources'],
      isPublic: true,
      isFeatured: true,
    },
    {
      name: 'Hero Carousel with Tabs',
      description: 'Main hero section with tab-switching carousel and autoplay',
      componentType: 'block',
      blockType: 'hero',
      blockCategory: 'homepage',
      blockId: 'hero-tabbed-carousel',
      props: {
        autoplayDelay: 5000,
        heroHeight: 'h-[600px] md:h-[700px]',
        overlayColor: 'bg-black/40',
        tabs: [
          {
            id: 'solutions-tab',
            title: 'Çözümler',
            slides: [
              {
                image: '/images/hero/solutions-1.jpg',
                imageHint: 'Yapı çözümleri',
                headline: 'İnşaat Sektörüne Özel Çözümler',
                headlineFontSize: 'text-4xl md:text-5xl lg:text-6xl',
                subheadline: 'Mimari tasarımdan yapısal analize kadar tüm ihtiyaçlarınız için güçlü araçlar',
                ctaText: 'Keşfet',
                ctaLink: '/solutions',
                ctaBgColor: 'bg-primary',
              },
            ],
          },
        ],
      },
      tags: ['homepage', 'hero', 'carousel', 'tabs'],
      isPublic: true,
      isFeatured: true,
    },
    {
      name: 'Education & Support Multi-Layout',
      description: 'Flexible education section supporting 6 different layouts (carousel, grid-2col, grid-3col)',
      componentType: 'block',
      blockType: 'education',
      blockCategory: 'homepage',
      blockId: 'education-multi-layout',
      props: {
        sectionTitle: 'Eğitim & Destek',
        sectionDescription: 'Bilginizi geliştirin ve ihtiyacınız olan desteği alın',
        bgColor: 'bg-background',
        paddingY: 'py-16 md:py-24',
        itemGap: 'gap-6',
        tabs: [
          {
            id: 'training',
            title: 'Eğitimler',
            iconName: 'BookOpen',
            layoutType: 'carousel',
            autoplay: false,
            items: [
              {
                title: 'Allplan Temel Eğitim',
                description: 'Allplan yazılımına başlangıç seviyesi eğitim',
                date: '15 Mart 2025',
                category: 'Başlangıç',
                ctaText: 'Kayıt Ol',
                ctaLink: '/education/training/basic',
                ctaBgColor: 'bg-primary',
                iconName: 'GraduationCap',
                iconColor: 'text-primary',
                cardBgColor: 'bg-card',
              },
            ],
          },
        ],
      },
      tags: ['homepage', 'education', 'support', 'multi-layout', 'tabs'],
      isPublic: true,
      isFeatured: true,
    },
  ];

  await componentRepository.save(components);

  console.log('✅ Homepage section components seeded successfully!');
  console.log(`   - ${components.length} components created`);
  console.log('   - Block IDs: thumbnail-carousel, tabbed-grid, hero-tabbed-carousel, education-multi-layout');
}
