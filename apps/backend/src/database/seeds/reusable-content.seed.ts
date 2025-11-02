import { DataSource } from 'typeorm';
import { ReusableComponent } from '../../modules/cms/entities/reusable-component.entity';
import { ReusableSection } from '../../modules/cms/entities/reusable-section.entity';

export async function seedReusableContent(dataSource: DataSource) {
  const componentRepository = dataSource.getRepository(ReusableComponent);
  const sectionRepository = dataSource.getRepository(ReusableSection);

  console.log('🌱 Seeding reusable components and sections...');

  // ===== COMPONENTS =====
  const components = [
    // 1. Hero Section Background
    {
      name: 'Hero Section Background - Gradient Blue',
      slug: 'hero-bg-gradient-blue',
      description: 'Ana sayfa için gradient mavi arka planlı hero section. Modern ve dinamik görünüm.',
      componentType: 'container',
      blockType: 'hero',
      blockCategory: 'layout',
      props: {
        height: '600px',
        backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overlay: 'rgba(0,0,0,0.3)',
        contentAlignment: 'center',
        contentMaxWidth: '800px',
        padding: '80px 20px',
      },
      tags: ['hero', 'gradient', 'modern', 'homepage', 'blue'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Hero+Gradient',
      isPublic: true,
      isFeatured: true,
      usageCount: 5,
    },

    // 2. Product Card
    {
      name: 'Product Card - Modern Design',
      slug: 'product-card-modern',
      description: 'E-ticaret siteleri için modern ürün kartı. Hover animasyonu ve sepete ekle butonu içerir.',
      componentType: 'card',
      blockType: 'product',
      blockCategory: 'ecommerce',
      props: {
        layout: 'vertical',
        imageHeight: '300px',
        imageRatio: '1:1',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        titleSize: '24px',
        titleWeight: '600',
        priceColor: '#ff7f1e',
        priceSize: '20px',
        buttonStyle: 'primary',
        buttonText: 'Sepete Ekle',
        hoverEffect: 'lift',
        showRating: true,
        showDiscount: true,
      },
      tags: ['product', 'ecommerce', 'card', 'modern', 'animated'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Product+Card',
      isPublic: true,
      isFeatured: true,
      usageCount: 12,
    },

    // 3. CTA Button Primary
    {
      name: 'CTA Button - Primary Orange',
      slug: 'cta-button-primary',
      description: 'Ana CTA butonu. Turuncu renk, hover animasyonu ve ikon desteği.',
      componentType: 'button',
      blockType: 'cta',
      blockCategory: 'element',
      props: {
        backgroundColor: '#ff7f1e',
        hoverColor: '#e66a0c',
        textColor: '#ffffff',
        fontSize: '16px',
        fontWeight: '600',
        padding: '12px 32px',
        borderRadius: '8px',
        icon: 'arrow-right',
        iconPosition: 'right',
        animation: 'scale',
        boxShadow: '0 4px 6px rgba(255, 127, 30, 0.3)',
      },
      tags: ['button', 'cta', 'primary', 'orange', 'animated'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ff7f1e/ffffff?text=CTA+Button',
      isPublic: true,
      isFeatured: true,
      usageCount: 25,
    },

    // 4. Newsletter Form
    {
      name: 'Newsletter Form - Footer',
      slug: 'newsletter-form-footer',
      description: 'Footer için newsletter kayıt formu. GDPR uyumlu, inline layout.',
      componentType: 'form',
      blockType: 'newsletter',
      blockCategory: 'form',
      props: {
        formWidth: '500px',
        inputHeight: '48px',
        inputBorder: '1px solid #e5e7eb',
        inputBorderRadius: '8px',
        inputPlaceholder: 'E-posta adresinizi girin',
        buttonText: 'Abone Ol',
        buttonColor: '#ff7f1e',
        buttonHoverColor: '#e66a0c',
        layout: 'inline',
        successMessage: 'Başarıyla abone oldunuz! 🎉',
        errorMessage: 'Geçerli bir e-posta adresi girin',
        gdprCheckbox: true,
        gdprText: 'KVKK metnini okudum ve kabul ediyorum',
      },
      tags: ['form', 'newsletter', 'footer', 'gdpr', 'inline'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/f9fafb/333333?text=Newsletter+Form',
      isPublic: true,
      isFeatured: true,
      usageCount: 8,
    },

    // 5. Testimonial Card
    {
      name: 'Testimonial Card - With Avatar',
      slug: 'testimonial-card-avatar',
      description: 'Müşteri yorumu kartı. Avatar, yıldız rating ve alıntı ikonu içerir.',
      componentType: 'card',
      blockType: 'testimonial',
      blockCategory: 'content',
      props: {
        avatarSize: '64px',
        avatarPosition: 'top',
        quoteIconSize: '32px',
        quoteIconColor: '#ff7f1e',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        borderLeft: '4px solid #ff7f1e',
        padding: '32px',
        borderRadius: '12px',
        authorNameSize: '18px',
        authorNameWeight: '600',
        authorTitleSize: '14px',
        authorTitleColor: '#6b7280',
        ratingStars: 5,
        ratingColor: '#fbbf24',
      },
      tags: ['testimonial', 'card', 'review', 'avatar', 'rating'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/f9fafb/333333?text=Testimonial+Card',
      isPublic: true,
      isFeatured: true,
      usageCount: 6,
    },

    // 6. Feature Icon Card
    {
      name: 'Feature Card - Icon Top',
      slug: 'feature-card-icon-top',
      description: 'Özellik kartı. Üstte ikon, başlık ve açıklama içerir.',
      componentType: 'card',
      blockType: 'feature',
      blockCategory: 'content',
      props: {
        iconSize: '48px',
        iconColor: '#ff7f1e',
        iconStyle: 'outline',
        iconPosition: 'top',
        titleSize: '20px',
        titleWeight: '600',
        descriptionSize: '16px',
        textAlign: 'center',
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        hoverEffect: 'lift',
      },
      tags: ['feature', 'card', 'icon', 'modern'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Feature+Card',
      isPublic: true,
      isFeatured: false,
      usageCount: 10,
    },

    // 7. Pricing Card
    {
      name: 'Pricing Card - Standard',
      slug: 'pricing-card-standard',
      description: 'Fiyatlandırma kartı. Özellik listesi, fiyat ve CTA butonu içerir.',
      componentType: 'card',
      blockType: 'pricing',
      blockCategory: 'ecommerce',
      props: {
        layout: 'vertical',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '2px solid #e5e7eb',
        padding: '40px',
        planNameSize: '24px',
        planNameWeight: '700',
        priceSize: '48px',
        priceWeight: '700',
        priceColor: '#ff7f1e',
        currencySymbol: '₺',
        billingPeriod: '/ay',
        featuresIconColor: '#22c55e',
        featuresIconSize: '20px',
        ctaButtonStyle: 'primary',
        ctaButtonText: 'Başlayın',
        highlightBadge: false,
      },
      tags: ['pricing', 'card', 'subscription', 'ecommerce'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Pricing+Card',
      isPublic: true,
      isFeatured: false,
      usageCount: 4,
    },

    // 8. Team Member Card
    {
      name: 'Team Member Card - Circle Avatar',
      slug: 'team-member-card-circle',
      description: 'Takım üyesi kartı. Yuvarlak avatar, sosyal medya linkleri.',
      componentType: 'card',
      blockType: 'team',
      blockCategory: 'content',
      props: {
        imageShape: 'circle',
        imageSize: '150px',
        imageBorder: '4px solid #ff7f1e',
        nameSize: '20px',
        nameWeight: '600',
        roleSize: '16px',
        roleColor: '#6b7280',
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '16px',
        textAlign: 'center',
        socialLinks: ['linkedin', 'twitter', 'email'],
        socialIconSize: '24px',
        socialIconColor: '#6b7280',
        hoverEffect: 'lift',
      },
      tags: ['team', 'about', 'card', 'avatar', 'social'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Team+Card',
      isPublic: true,
      isFeatured: false,
      usageCount: 3,
    },

    // 9. Stats Counter
    {
      name: 'Stats Counter - Animated',
      slug: 'stats-counter-animated',
      description: 'İstatistik sayacı. Animasyonlu sayı artışı ve ikon içerir.',
      componentType: 'block',
      blockType: 'stats',
      blockCategory: 'content',
      props: {
        numberSize: '48px',
        numberWeight: '700',
        numberColor: '#ff7f1e',
        labelSize: '16px',
        labelColor: '#6b7280',
        iconSize: '32px',
        iconColor: '#ff7f1e',
        iconPosition: 'top',
        layout: 'vertical',
        textAlign: 'center',
        animation: 'countUp',
        animationDuration: '2s',
      },
      tags: ['stats', 'counter', 'animated', 'numbers'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Stats+Counter',
      isPublic: true,
      isFeatured: false,
      usageCount: 7,
    },

    // 10. Contact Form
    {
      name: 'Contact Form - Standard',
      slug: 'contact-form-standard',
      description: 'İletişim formu. Ad, email, mesaj alanları ve submit butonu.',
      componentType: 'form',
      blockType: 'contact',
      blockCategory: 'form',
      props: {
        layout: 'vertical',
        inputHeight: '48px',
        inputBorder: '1px solid #e5e7eb',
        inputBorderRadius: '8px',
        inputPadding: '12px 16px',
        textareaHeight: '150px',
        labelSize: '14px',
        labelWeight: '500',
        buttonText: 'Gönder',
        buttonColor: '#ff7f1e',
        buttonHoverColor: '#e66a0c',
        requiredFields: ['name', 'email', 'message'],
        successMessage: 'Mesajınız başarıyla gönderildi!',
        errorMessage: 'Lütfen tüm alanları doldurun',
      },
      tags: ['form', 'contact', 'standard', 'vertical'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Contact+Form',
      isPublic: true,
      isFeatured: false,
      usageCount: 5,
    },
  ];

  // Insert components
  for (const componentData of components) {
    const existing = await componentRepository.findOne({
      where: { slug: componentData.slug },
    });

    if (!existing) {
      const component = componentRepository.create(componentData);
      await componentRepository.save(component);
      console.log(`✅ Created component: ${component.name}`);
    } else {
      console.log(`⏭️  Component already exists: ${componentData.name}`);
    }
  }

  // ===== SECTIONS =====
  const sections = [
    // 1. Complete Hero Section
    {
      name: 'Complete Hero Section - Landing Page',
      slug: 'complete-hero-landing',
      description: 'Tam özellikli hero section. Background, başlık, alt başlık, 2 CTA butonu içerir.',
      sectionType: 'hero',
      components: [
        { componentSlug: 'hero-bg-gradient-blue', order: 1 },
        { componentSlug: 'cta-button-primary', order: 2 },
      ],
      layout: {
        type: 'stack',
        gap: '32px',
        alignment: 'center',
      },
      tags: ['hero', 'landing', 'complete', 'gradient'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Hero+Section',
      isPublic: true,
      isFeatured: true,
      usageCount: 8,
    },

    // 2. Product Grid Section
    {
      name: 'Product Grid - 3 Column',
      slug: 'product-grid-3col',
      description: '3 sütunlu ürün grid section. Modern product card\'lar ile.',
      sectionType: 'product-grid',
      components: [
        { componentSlug: 'product-card-modern', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 3,
        gap: '32px',
        responsive: true,
      },
      tags: ['product', 'grid', 'ecommerce', '3-column'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Product+Grid',
      isPublic: true,
      isFeatured: true,
      usageCount: 6,
    },

    // 3. Features Section
    {
      name: 'Features Section - 3 Column',
      slug: 'features-section-3col',
      description: '3 sütunlu özellikler section. İkon üstte, başlık ve açıklama içerir.',
      sectionType: 'features',
      components: [
        { componentSlug: 'feature-card-icon-top', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 3,
        gap: '40px',
        responsive: true,
      },
      tags: ['features', 'grid', 'landing', '3-column'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Features+Section',
      isPublic: true,
      isFeatured: true,
      usageCount: 10,
    },

    // 4. Testimonials Section
    {
      name: 'Testimonials Section - 2 Column',
      slug: 'testimonials-2col',
      description: '2 sütunlu müşteri yorumları section.',
      sectionType: 'testimonials',
      components: [
        { componentSlug: 'testimonial-card-avatar', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 2,
        gap: '32px',
        responsive: true,
      },
      tags: ['testimonials', 'reviews', 'grid', '2-column'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/f9fafb/333333?text=Testimonials',
      isPublic: true,
      isFeatured: false,
      usageCount: 4,
    },

    // 5. Pricing Section
    {
      name: 'Pricing Section - 3 Tier',
      slug: 'pricing-section-3tier',
      description: '3 farklı fiyatlandırma kartı ile pricing section.',
      sectionType: 'pricing',
      components: [
        { componentSlug: 'pricing-card-standard', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 3,
        gap: '32px',
        responsive: true,
      },
      tags: ['pricing', 'subscription', 'landing', '3-tier'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Pricing+Section',
      isPublic: true,
      isFeatured: true,
      usageCount: 5,
    },

    // 6. Team Section
    {
      name: 'Team Section - 4 Column',
      slug: 'team-section-4col',
      description: '4 sütunlu takım üyeleri section.',
      sectionType: 'team',
      components: [
        { componentSlug: 'team-member-card-circle', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 4,
        gap: '32px',
        responsive: true,
      },
      tags: ['team', 'about', 'grid', '4-column'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Team+Section',
      isPublic: true,
      isFeatured: false,
      usageCount: 3,
    },

    // 7. Stats Section
    {
      name: 'Stats Section - 4 Column',
      slug: 'stats-section-4col',
      description: '4 sütunlu istatistik section. Animasyonlu sayılar.',
      sectionType: 'stats',
      components: [
        { componentSlug: 'stats-counter-animated', order: 1 },
      ],
      layout: {
        type: 'grid',
        columns: 4,
        gap: '48px',
        responsive: true,
      },
      tags: ['stats', 'numbers', 'animated', '4-column'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/ffffff/333333?text=Stats+Section',
      isPublic: true,
      isFeatured: false,
      usageCount: 7,
    },

    // 8. Footer Section
    {
      name: 'Footer Section - Newsletter + Social',
      slug: 'footer-newsletter-social',
      description: 'Footer section. Newsletter formu ve sosyal medya linkleri.',
      sectionType: 'footer',
      components: [
        { componentSlug: 'newsletter-form-footer', order: 1 },
      ],
      layout: {
        type: 'stack',
        gap: '48px',
        alignment: 'center',
        backgroundColor: '#1f2937',
        padding: '64px 20px',
      },
      tags: ['footer', 'newsletter', 'social', 'dark'],
      thumbnailUrl: 'https://via.placeholder.com/400x300/1f2937/ffffff?text=Footer+Section',
      isPublic: true,
      isFeatured: true,
      usageCount: 9,
    },
  ];

  // Insert sections with component relations
  for (const sectionData of sections) {
    const existing = await sectionRepository.findOne({
      where: { slug: sectionData.slug },
    });

    if (!existing) {
      // Get component IDs from slugs
      const componentIds: string[] = [];
      for (const comp of sectionData.components) {
        const component = await componentRepository.findOne({
          where: { slug: comp.componentSlug },
        });
        if (component) {
          componentIds.push(component.id);
        }
      }

      // Create section without components first
      const section = sectionRepository.create({
        name: sectionData.name,
        slug: sectionData.slug,
        description: sectionData.description,
        sectionType: sectionData.sectionType,
        layoutOptions: sectionData.layout, // Map layout to layoutOptions (entity field name)
        tags: sectionData.tags,
        thumbnailUrl: sectionData.thumbnailUrl,
        isPublic: sectionData.isPublic,
        isFeatured: sectionData.isFeatured,
        usageCount: sectionData.usageCount,
      });

      await sectionRepository.save(section);
      console.log(`✅ Created section: ${section.name}`);
    } else {
      console.log(`⏭️  Section already exists: ${sectionData.name}`);
    }
  }

  console.log('✅ Reusable content seeding completed!');
}
