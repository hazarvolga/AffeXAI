/**
 * CMS Page Templates Seed Data
 *
 * Pre-configured page templates using prebuild blocks
 * Categories: Landing Page, Business, Education, Portfolio, Blog
 */

export const templatesData = [
  // ==================== LANDING PAGES ====================
  {
    name: 'Minimal Landing Page',
    description: 'Clean and modern landing page with hero, features, and CTA',
    category: 'Landing Page',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#ff7f1e',
        secondary: '#1e40ff',
        background: '#ffffff',
        text: '#171717',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-minimal-logo-left',
        props: {
          logoUrl: '/logo.svg',
          logoAlt: 'Company Logo',
          menuItems: [
            { label: 'Özellikler', url: '#features' },
            { label: 'Fiyatlandırma', url: '#pricing' },
            { label: 'İletişim', url: '#contact' },
          ],
          ctaButton: {
            label: 'Hemen Başla',
            url: '/signup',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Modern İş Çözümleri',
          subtitle: 'İşinizi dijital dünyada büyütün',
          description: 'Güçlü araçlar ve kolay kullanım ile işinizi bir üst seviyeye taşıyın',
          primaryButtonText: 'Ücretsiz Dene',
          primaryButtonUrl: '/trial',
          secondaryButtonText: 'Daha Fazla Bilgi',
          secondaryButtonUrl: '#features',
          backgroundImage: '/hero-bg.jpg',
        },
      },
      {
        id: 'features',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Güçlü Özellikler',
          sectionDescription: 'İhtiyacınız olan her şey bir arada',
          features: [
            {
              icon: 'zap',
              title: 'Hızlı ve Verimli',
              description: 'Saniyeler içinde işlerinizi halledi n',
            },
            {
              icon: 'shield',
              title: 'Güvenli',
              description: 'Verileriniz en yüksek güvenlik standartlarıyla korunur',
            },
            {
              icon: 'users',
              title: 'Ekip İşbirliği',
              description: 'Takımınızla sorunsuz bir şekilde çalışın',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Basit Fiyatlandırma',
          sectionDescription: 'İhtiyaçlarınıza uygun planı seçin',
          plans: [
            {
              name: 'Başlangıç',
              price: '99',
              currency: '₺',
              period: '/ay',
              features: [
                '5 Kullanıcı',
                '10 GB Depolama',
                'Temel Özellikler',
                'Email Destek',
              ],
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=starter',
            },
            {
              name: 'Profesyonel',
              price: '299',
              currency: '₺',
              period: '/ay',
              features: [
                '20 Kullanıcı',
                '100 GB Depolama',
                'Gelişmiş Özellikler',
                'Öncelikli Destek',
              ],
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=pro',
              featured: true,
            },
            {
              name: 'Kurumsal',
              price: '999',
              currency: '₺',
              period: '/ay',
              features: [
                'Sınırsız Kullanıcı',
                'Sınırsız Depolama',
                'Tüm Özellikler',
                '7/24 Destek',
              ],
              buttonText: 'İletişime Geç',
              buttonUrl: '/contact',
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Şirket Adı',
          description: 'Modern iş çözümleri ile dijital dönüşümünüzü tamamlayın',
          columns: [
            {
              title: 'Ürün',
              links: [
                { label: 'Özellikler', url: '/features' },
                { label: 'Fiyatlandırma', url: '/pricing' },
                { label: 'Güvenlik', url: '/security' },
              ],
            },
            {
              title: 'Şirket',
              links: [
                { label: 'Hakkımızda', url: '/about' },
                { label: 'Blog', url: '/blog' },
                { label: 'Kariyer', url: '/careers' },
              ],
            },
            {
              title: 'Destek',
              links: [
                { label: 'Yardım Merkezi', url: '/help' },
                { label: 'İletişim', url: '/contact' },
                { label: 'Durum', url: '/status' },
              ],
            },
          ],
          socialLinks: [
            { platform: 'twitter', url: 'https://twitter.com/company' },
            { platform: 'linkedin', url: 'https://linkedin.com/company/company' },
            { platform: 'facebook', url: 'https://facebook.com/company' },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
    },
    metadata: {
      tags: ['landing', 'minimal', 'business'],
      difficulty: 'beginner',
      estimatedSetupTime: '5 minutes',
    },
    preview: {
      thumbnail: '/templates/minimal-landing.jpg',
      screenshots: [
        '/templates/minimal-landing-1.jpg',
        '/templates/minimal-landing-2.jpg',
      ],
    },
  },

  // ==================== EDUCATION ====================
  {
    name: 'Education Platform',
    description: 'Modern eğitim platformu için öğrenci dostu tasarım',
    category: 'Education',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        background: '#ffffff',
        text: '#1f2937',
      },
      typography: {
        headingFont: 'Poppins',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/edu-logo.svg',
          logoAlt: 'Education Platform',
          menuItems: [
            { label: 'Kurslar', url: '/courses' },
            { label: 'Eğitmenler', url: '/instructors' },
            { label: 'Blog', url: '/blog' },
            { label: 'Hakkımızda', url: '/about' },
          ],
          ctaButton: {
            label: 'Giriş Yap',
            url: '/login',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-split-image-right',
        props: {
          title: 'Geleceğini İnşa Et',
          subtitle: 'Online Eğitimle Kendini Geliştir',
          description: 'Uzman eğitmenlerden, kendi hızında öğren. 1000+ kurs, sertifika programları ve daha fazlası.',
          primaryButtonText: 'Kurslara Göz At',
          primaryButtonUrl: '/courses',
          secondaryButtonText: 'Ücretsiz Deneme',
          secondaryButtonUrl: '/trial',
          imageUrl: '/education-hero.jpg',
        },
      },
      {
        id: 'features',
        type: 'features-services-two-column',
        props: {
          sectionTitle: 'Neden Bizi Seçmelisiniz?',
          sectionDescription: 'Eğitimde fark yaratan özellikler',
          services: [
            {
              icon: 'book-open',
              title: 'Kapsamlı Kurs Kütüphanesi',
              description: '50+ kategoride 1000+ kurs',
            },
            {
              icon: 'users',
              title: 'Uzman Eğitmenler',
              description: 'Alanında uzman, deneyimli eğitmenler',
            },
            {
              icon: 'certificate',
              title: 'Sertifika Programları',
              description: 'Geçerli sertifikalarla kariyerinizi güçlendirin',
            },
            {
              icon: 'headphones',
              title: '7/24 Destek',
              description: 'Her zaman yanınızdayız',
            },
          ],
        },
      },
      {
        id: 'stats',
        type: 'stats-four-column',
        props: {
          stats: [
            {
              value: '10,000+',
              label: 'Aktif Öğrenci',
              icon: 'users',
            },
            {
              value: '1,000+',
              label: 'Online Kurs',
              icon: 'book',
            },
            {
              value: '50+',
              label: 'Uzman Eğitmen',
              icon: 'award',
            },
            {
              value: '98%',
              label: 'Memnuniyet Oranı',
              icon: 'star',
            },
          ],
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-grid-three',
        props: {
          sectionTitle: 'Öğrencilerimiz Ne Diyor?',
          testimonials: [
            {
              name: 'Ahmet Yılmaz',
              role: 'Yazılım Geliştirici',
              content: 'Bu platform sayesinde kariyerimde büyük ilerleme kaydettim. Kurslar çok kapsamlı ve anlaşılır.',
              rating: 5,
              avatar: '/avatars/1.jpg',
            },
            {
              name: 'Ayşe Demir',
              role: 'Grafik Tasarımcı',
              content: 'Eğitmenler gerçekten işinin uzmanı. Projelerimde öğrendiklerimi hemen uygulayabiliyorum.',
              rating: 5,
              avatar: '/avatars/2.jpg',
            },
            {
              name: 'Mehmet Kaya',
              role: 'Dijital Pazarlama Uzmanı',
              content: 'Sertifika programları sayesinde yeni bir kariyer yoluna girdim. Teşekkürler!',
              rating: 5,
              avatar: '/avatars/3.jpg',
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Bugün Başla, Yarın Fark Yarat',
          description: '14 gün ücretsiz deneme ile tüm kurslara sınırsız erişim',
          primaryButtonText: 'Ücretsiz Başla',
          primaryButtonUrl: '/signup',
          backgroundGradient: true,
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'EduPlatform',
          description: 'Geleceğinizi inşa edin, hayallerinize ulaşın',
          newsletterTitle: 'Bültenimize Abone Olun',
          newsletterDescription: 'Yeni kurslar ve fırsatlardan haberdar olun',
          columns: [
            {
              title: 'Platform',
              links: [
                { label: 'Kurslar', url: '/courses' },
                { label: 'Eğitmenler', url: '/instructors' },
                { label: 'Sertifikalar', url: '/certificates' },
                { label: 'Fiyatlandırma', url: '/pricing' },
              ],
            },
            {
              title: 'Destek',
              links: [
                { label: 'Yardım Merkezi', url: '/help' },
                { label: 'SSS', url: '/faq' },
                { label: 'İletişim', url: '/contact' },
                { label: 'Durum', url: '/status' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1440px',
      spacing: 'relaxed',
    },
    metadata: {
      tags: ['education', 'learning', 'courses'],
      difficulty: 'intermediate',
      estimatedSetupTime: '10 minutes',
    },
  },

  // ==================== BUSINESS ====================
  {
    name: 'Corporate Business',
    description: 'Profesyonel kurumsal web sitesi şablonu',
    category: 'Business',
    isFeatured: false,
    designSystem: {
      colors: {
        primary: '#1e40af',
        secondary: '#06b6d4',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Montserrat',
        bodyFont: 'Open Sans',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/corporate-logo.svg',
          menuItems: [
            { label: 'Hizmetler', url: '/services' },
            { label: 'Çözümler', url: '/solutions' },
            { label: 'Hakkımızda', url: '/about' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Teklif Al',
            url: '/quote',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: 'İşiniz İçin Güvenilir Çözümler',
          subtitle: '20+ Yıllık Deneyim',
          description: 'Kurumsal düzeyde hizmetler ile işletmenizi geleceğe taşıyın',
          primaryButtonText: 'Hizmetlerimiz',
          primaryButtonUrl: '/services',
          secondaryButtonText: 'Bizimle İletişime Geçin',
          secondaryButtonUrl: '/contact',
        },
      },
      {
        id: 'services',
        type: 'features-services-two-column',
        props: {
          sectionTitle: 'Hizmetlerimiz',
          sectionDescription: 'Kapsamlı iş çözümleri',
          services: [
            {
              icon: 'briefcase',
              title: 'Danışmanlık',
              description: 'Uzman kadromuzla stratejik danışmanlık',
            },
            {
              icon: 'settings',
              title: 'Dijital Dönüşüm',
              description: 'İşletmenizi dijitalleştirin',
            },
            {
              icon: 'chart-bar',
              title: 'Veri Analizi',
              description: 'Verilerinizden değer yaratın',
            },
            {
              icon: 'cloud',
              title: 'Bulut Çözümleri',
              description: 'Güvenli ve ölçeklenebilir altyapı',
            },
          ],
        },
      },
      {
        id: 'about',
        type: 'content-image-side-by-side',
        props: {
          title: 'Biz Kimiz?',
          description: '2000 yılından bu yana işletmelere değer katıyoruz. 500+ mutlu müşteri, 1000+ başarılı proje.',
          imageUrl: '/about-us.jpg',
          buttonText: 'Daha Fazla Bilgi',
          buttonUrl: '/about',
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-carousel',
        props: {
          sectionTitle: 'Müşterilerimiz',
          testimonials: [
            {
              name: 'Can Öztürk',
              role: 'CEO, Tech Corp',
              content: 'Profesyonel yaklaşımları ve kaliteli hizmetleri ile işimizi çok ileri taşıdılar.',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Corporate Solutions',
          description: 'İşiniz için güvenilir çözüm ortağınız',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
    },
    metadata: {
      tags: ['business', 'corporate', 'professional'],
      difficulty: 'intermediate',
      estimatedSetupTime: '15 minutes',
    },
  },

  // ==================== PORTFOLIO ====================
  {
    name: 'Creative Portfolio',
    description: 'Yaratıcı profesyoneller için modern portföy sitesi',
    category: 'Portfolio',
    isFeatured: false,
    designSystem: {
      colors: {
        primary: '#ec4899',
        secondary: '#8b5cf6',
        background: '#0f172a',
        text: '#f1f5f9',
      },
      typography: {
        headingFont: 'Playfair Display',
        bodyFont: 'Lato',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-minimal-logo-left',
        props: {
          logoText: 'John Doe',
          menuItems: [
            { label: 'Portfolio', url: '#portfolio' },
            { label: 'About', url: '#about' },
            { label: 'Contact', url: '#contact' },
          ],
          darkMode: true,
        },
      },
      {
        id: 'hero',
        type: 'hero-fullscreen-sticky-cta',
        props: {
          title: 'Creative Designer',
          subtitle: 'Turning Ideas Into Reality',
          description: 'Graphic Design • Web Design • Branding',
          primaryButtonText: 'View Portfolio',
          primaryButtonUrl: '#portfolio',
        },
      },
      {
        id: 'portfolio',
        type: 'gallery-four-image-mosaic',
        props: {
          sectionTitle: 'Recent Works',
          images: [
            { url: '/portfolio/1.jpg', caption: 'Brand Identity' },
            { url: '/portfolio/2.jpg', caption: 'Web Design' },
            { url: '/portfolio/3.jpg', caption: 'UI/UX' },
            { url: '/portfolio/4.jpg', caption: 'Illustration' },
          ],
        },
      },
      {
        id: 'about',
        type: 'content-single-fullwidth',
        props: {
          title: 'About Me',
          content: 'I\'m a creative designer with 5+ years of experience in digital design...',
        },
      },
      {
        id: 'contact',
        type: 'content-cta-box',
        props: {
          title: 'Let\'s Work Together',
          description: 'Have a project in mind? Let\'s discuss!',
          primaryButtonText: 'Get In Touch',
          primaryButtonUrl: '/contact',
        },
      },
      {
        id: 'footer',
        type: 'footer-compact-centered',
        props: {
          companyName: 'John Doe',
          copyrightText: '© 2025 All rights reserved',
          socialLinks: [
            { platform: 'behance', url: 'https://behance.net/johndoe' },
            { platform: 'dribbble', url: 'https://dribbble.com/johndoe' },
            { platform: 'instagram', url: 'https://instagram.com/johndoe' },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1920px',
      spacing: 'relaxed',
      darkMode: true,
    },
    metadata: {
      tags: ['portfolio', 'creative', 'designer'],
      difficulty: 'beginner',
      estimatedSetupTime: '7 minutes',
    },
  },

  // ==================== BLOG ====================
  {
    name: 'Modern Blog',
    description: 'Temiz ve okunabilir blog şablonu',
    category: 'Blog',
    isFeatured: false,
    designSystem: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937',
      },
      typography: {
        headingFont: 'Merriweather',
        bodyFont: 'Lora',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-centered-logo',
        props: {
          logoText: 'My Blog',
          menuItems: [
            { label: 'Home', url: '/' },
            { label: 'Articles', url: '/articles' },
            { label: 'Categories', url: '/categories' },
            { label: 'About', url: '/about' },
          ],
        },
      },
      {
        id: 'hero',
        type: 'blog-extended-feature',
        props: {
          featuredPost: {
            title: 'The Future of Web Development',
            excerpt: 'Exploring the latest trends and technologies...',
            author: 'Jane Smith',
            date: '2025-01-01',
            imageUrl: '/blog-featured.jpg',
            category: 'Technology',
          },
        },
      },
      {
        id: 'recent-posts',
        type: 'blog-basic-list',
        props: {
          sectionTitle: 'Recent Articles',
          posts: [
            {
              title: 'Getting Started with React',
              excerpt: 'A beginner\'s guide to React...',
              author: 'Jane Smith',
              date: '2025-01-02',
            },
            {
              title: 'CSS Grid vs Flexbox',
              excerpt: 'When to use which layout system...',
              author: 'Jane Smith',
              date: '2025-01-03',
            },
          ],
        },
      },
      {
        id: 'newsletter',
        type: 'content-cta-box',
        props: {
          title: 'Subscribe to Newsletter',
          description: 'Get the latest articles delivered to your inbox',
          primaryButtonText: 'Subscribe',
          primaryButtonUrl: '/subscribe',
        },
      },
      {
        id: 'footer',
        type: 'footer-newsletter-signup',
        props: {
          companyName: 'My Blog',
          description: 'Sharing insights about web development and technology',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '800px',
      spacing: 'comfortable',
    },
    metadata: {
      tags: ['blog', 'articles', 'content'],
      difficulty: 'beginner',
      estimatedSetupTime: '5 minutes',
    },
  },

  // ==================== PRODUCT PAGE ====================
  {
    name: 'Software Product Page',
    description: 'Yazılım ürün tanıtım sayfası - özellikler, fiyatlandırma ve demo',
    category: 'Product',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/product-logo.svg',
          menuItems: [
            { label: 'Özellikler', url: '#features' },
            { label: 'Fiyatlandırma', url: '#pricing' },
            { label: 'Müşteriler', url: '#customers' },
            { label: 'Destek', url: '/support' },
          ],
          ctaButton: {
            label: 'Ücretsiz Dene',
            url: '/trial',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-split-image-right',
        props: {
          title: 'İş Süreçlerinizi Dijitalleştirin',
          subtitle: 'Allplan - Modern İnşaat Yönetim Yazılımı',
          description: 'BIM destekli mimari tasarım ve proje yönetimi çözümü',
          primaryButtonText: 'Demo Talep Et',
          primaryButtonUrl: '/demo',
          secondaryButtonText: 'Özellikleri Keşfet',
          secondaryButtonUrl: '#features',
          imageUrl: '/product-hero.jpg',
        },
      },
      {
        id: 'features',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Güçlü Özellikler',
          sectionDescription: 'İhtiyacınız olan her şey tek platformda',
          features: [
            {
              icon: 'layers',
              title: 'BIM Entegrasyonu',
              description: '3D modelleme ve Building Information Modeling desteği',
            },
            {
              icon: 'users',
              title: 'Ekip İşbirliği',
              description: 'Gerçek zamanlı çoklu kullanıcı desteği',
            },
            {
              icon: 'cloud',
              title: 'Bulut Tabanlı',
              description: 'Her yerden erişim, otomatik yedekleme',
            },
            {
              icon: 'zap',
              title: 'Hızlı Performans',
              description: 'Büyük projelerde bile yüksek performans',
            },
            {
              icon: 'shield',
              title: 'Güvenli',
              description: 'ISO 27001 sertifikalı veri güvenliği',
            },
            {
              icon: 'smartphone',
              title: 'Mobil Uygulama',
              description: 'iOS ve Android uygulamaları',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Fiyatlandırma Planları',
          sectionDescription: 'İhtiyacınıza uygun planı seçin',
          plans: [
            {
              name: 'Starter',
              price: '₺2.999/ay',
              description: 'Küçük ekipler için',
              features: [
                '5 Kullanıcı',
                '50GB Depolama',
                'Temel BIM Araçları',
                'Email Destek',
              ],
              buttonText: 'Başla',
              buttonUrl: '/trial?plan=starter',
            },
            {
              name: 'Professional',
              price: '₺7.999/ay',
              description: 'Büyüyen ekipler için',
              features: [
                '25 Kullanıcı',
                '500GB Depolama',
                'Gelişmiş BIM Araçları',
                'Öncelikli Destek',
                'API Erişimi',
              ],
              highlighted: true,
              buttonText: 'En Popüler',
              buttonUrl: '/trial?plan=professional',
            },
            {
              name: 'Enterprise',
              price: 'Özel Fiyat',
              description: 'Büyük organizasyonlar için',
              features: [
                'Sınırsız Kullanıcı',
                'Sınırsız Depolama',
                'Tüm Özellikler',
                '7/24 Destek',
                'Özel Eğitim',
                'SLA Garantisi',
              ],
              buttonText: 'İletişime Geç',
              buttonUrl: '/contact',
            },
          ],
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-grid-three',
        props: {
          sectionTitle: 'Müşteri Görüşleri',
          sectionDescription: '1000+ mutlu müşteri',
          testimonials: [
            {
              name: 'Ahmet Yılmaz',
              role: 'Proje Müdürü, ABC İnşaat',
              content: 'Projelerimizi çok daha hızlı teslim ediyoruz. BIM entegrasyonu harika!',
              rating: 5,
              imageUrl: '/testimonial-1.jpg',
            },
            {
              name: 'Ayşe Kaya',
              role: 'Mimar, XYZ Mimarlık',
              content: 'Ekip işbirliği özellikleri sayesinde uzaktan çalışma çok kolay.',
              rating: 5,
              imageUrl: '/testimonial-2.jpg',
            },
            {
              name: 'Mehmet Demir',
              role: 'CEO, DEF Müteahhitlik',
              content: 'Yatırımımızın karşılığını aldık. Müşteri desteği mükemmel.',
              rating: 5,
              imageUrl: '/testimonial-3.jpg',
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Bugün Başlayın',
          description: '30 gün ücretsiz deneme - Kredi kartı gerekmez',
          primaryButtonText: 'Ücretsiz Deneyin',
          primaryButtonUrl: '/trial',
          secondaryButtonText: 'Satış Ekibiyle Görüş',
          secondaryButtonUrl: '/contact-sales',
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          ctaTitle: 'Haberleri Kaçırmayın',
          ctaDescription: 'Ürün güncellemeleri ve ipuçları için abone olun',
          companyName: 'Allplan Solutions',
          description: 'İnşaat sektörü için modern yazılım çözümleri',
          columns: [
            {
              title: 'Ürün',
              links: [
                { label: 'Özellikler', url: '/features' },
                { label: 'Fiyatlandırma', url: '/pricing' },
                { label: 'Güvenlik', url: '/security' },
              ],
            },
            {
              title: 'Kaynaklar',
              links: [
                { label: 'Dokümantasyon', url: '/docs' },
                { label: 'API', url: '/api' },
                { label: 'Blog', url: '/blog' },
              ],
            },
            {
              title: 'Şirket',
              links: [
                { label: 'Hakkımızda', url: '/about' },
                { label: 'Kariyer', url: '/careers' },
                { label: 'İletişim', url: '/contact' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['product', 'software', 'saas', 'bim'],
      difficulty: 'intermediate',
      estimatedSetupTime: '12 minutes',
    },
  },

  // ==================== SOLUTIONS PAGE ====================
  {
    name: 'Business Solutions',
    description: 'Sektörel çözümler ve iş uygulamaları tanıtım sayfası',
    category: 'Solutions',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#0891b2',
        secondary: '#06b6d4',
        background: '#ffffff',
        text: '#0f172a',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/solutions-logo.svg',
          menuItems: [
            { label: 'Çözümler', url: '#solutions' },
            { label: 'Sektörler', url: '#industries' },
            { label: 'Başarı Hikayeleri', url: '#success' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Teklif Al',
            url: '/quote',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Her Sektör İçin Özel Çözümler',
          subtitle: 'İşinize Özel Dijital Dönüşüm',
          description: 'İnşaat, enerji, sanayi ve daha fazlası için entegre çözümler',
          primaryButtonText: 'Çözümleri Keşfet',
          primaryButtonUrl: '#solutions',
          backgroundImage: '/solutions-hero-bg.jpg',
        },
      },
      {
        id: 'solutions',
        type: 'features-services-two-column',
        props: {
          sectionTitle: 'Çözüm Portföyümüz',
          sectionDescription: 'Sektör odaklı dijital çözümler',
          services: [
            {
              icon: 'building',
              title: 'İnşaat & Altyapı',
              description: 'BIM, proje yönetimi, saha takibi, malzeme yönetimi çözümleri',
            },
            {
              icon: 'zap',
              title: 'Enerji & Utilities',
              description: 'Enerji yönetimi, izleme, raporlama ve optimizasyon sistemleri',
            },
            {
              icon: 'factory',
              title: 'Üretim & Sanayi',
              description: 'Üretim planlama, kalite kontrol, envanter yönetimi',
            },
            {
              icon: 'shopping-cart',
              title: 'Perakende',
              description: 'Mağaza yönetimi, stok takibi, müşteri deneyimi platformları',
            },
            {
              icon: 'hospital',
              title: 'Sağlık',
              description: 'Hastane bilgi sistemleri, hasta takibi, randevu yönetimi',
            },
            {
              icon: 'graduation-cap',
              title: 'Eğitim',
              description: 'Öğrenci bilgi sistemleri, online eğitim platformları',
            },
          ],
        },
      },
      {
        id: 'industries',
        type: 'stats-four-column',
        props: {
          sectionTitle: 'Rakamlarla Biz',
          stats: [
            {
              value: '15+',
              label: 'Sektör',
            },
            {
              value: '500+',
              label: 'Müşteri',
            },
            {
              value: '2000+',
              label: 'Proje',
            },
            {
              value: '%98',
              label: 'Müşteri Memnuniyeti',
            },
          ],
        },
      },
      {
        id: 'success',
        type: 'testimonial-carousel',
        props: {
          sectionTitle: 'Başarı Hikayeleri',
          sectionDescription: 'Müşterilerimizin dijital dönüşüm yolculukları',
          testimonials: [
            {
              name: 'Zeynep Arslan',
              role: 'Dijital Dönüşüm Direktörü, ABC Holding',
              content: 'Tüm şirket gruplarımızı tek platformda yönetiyoruz. Verimlilik %40 arttı.',
              rating: 5,
              company: 'ABC Holding',
              imageUrl: '/success-1.jpg',
            },
            {
              name: 'Kerem Öztürk',
              role: 'Genel Müdür, XYZ İnşaat',
              content: 'Proje süreçlerimizi tamamen dijitalleştirdik. Maliyet tasarrufu çok yüksek.',
              rating: 5,
              company: 'XYZ İnşaat',
              imageUrl: '/success-2.jpg',
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Size Özel Çözüm Oluşturalım',
          description: 'Uzman ekibimiz sektörünüze özel çözüm önerileri sunmak için hazır',
          primaryButtonText: 'Ücretsiz Danışmanlık',
          primaryButtonUrl: '/consultation',
          secondaryButtonText: 'Referansları Görüntüle',
          secondaryButtonUrl: '/case-studies',
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Affexai Solutions',
          description: 'Dijital dönüşümde güvenilir ortağınız',
          columns: [
            {
              title: 'Çözümler',
              links: [
                { label: 'İnşaat', url: '/solutions/construction' },
                { label: 'Enerji', url: '/solutions/energy' },
                { label: 'Üretim', url: '/solutions/manufacturing' },
              ],
            },
            {
              title: 'Şirket',
              links: [
                { label: 'Hakkımızda', url: '/about' },
                { label: 'Ekibimiz', url: '/team' },
                { label: 'Kariyer', url: '/careers' },
              ],
            },
            {
              title: 'Destek',
              links: [
                { label: 'Yardım Merkezi', url: '/help' },
                { label: 'İletişim', url: '/contact' },
                { label: 'SSS', url: '/faq' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['solutions', 'industry', 'enterprise', 'b2b'],
      difficulty: 'intermediate',
      estimatedSetupTime: '15 minutes',
    },
  },

  // ==================== EVENT PAGE ====================
  {
    name: 'Event & Training',
    description: 'Etkinlik, eğitim ve webinar tanıtım sayfası',
    category: 'Event',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#f59e0b',
        secondary: '#ef4444',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/event-logo.svg',
          menuItems: [
            { label: 'Etkinlikler', url: '#events' },
            { label: 'Eğitimler', url: '#trainings' },
            { label: 'Konuşmacılar', url: '#speakers' },
            { label: 'Kayıt', url: '#register' },
          ],
          ctaButton: {
            label: 'Hemen Kayıt Ol',
            url: '#register',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: 'Allplan Türkiye Zirvesi 2025',
          subtitle: '15-16 Mart 2025 • İstanbul Kongre Merkezi',
          description: 'İnşaat teknolojilerinin geleceği, BIM uygulamaları ve dijital dönüşüm',
          primaryButtonText: 'Erken Kayıt İndirimi',
          primaryButtonUrl: '#register',
          secondaryButtonText: 'Program İçeriği',
          secondaryButtonUrl: '#schedule',
        },
      },
      {
        id: 'highlights',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Etkinlik Highlights',
          features: [
            {
              icon: 'users',
              title: '50+ Konuşmacı',
              description: 'Sektör liderleri ve uzmanlardan ilham alın',
            },
            {
              icon: 'presentation',
              title: '30+ Oturum',
              description: 'Workshop, panel ve teknik sunumlar',
            },
            {
              icon: 'trophy',
              title: 'Sertifika',
              description: 'Katılım sertifikası ve 8 saat eğitim kredisi',
            },
            {
              icon: 'wifi',
              title: 'Canlı Yayın',
              description: 'Hibrit katılım - Online veya yerinde',
            },
            {
              icon: 'coffee',
              title: 'Networking',
              description: 'Kahve molaları ve networking etkinlikleri',
            },
            {
              icon: 'gift',
              title: 'Hediyeler',
              description: 'Tüm katılımcılara özel hediye paketi',
            },
          ],
        },
      },
      {
        id: 'speakers',
        type: 'testimonial-grid-three',
        props: {
          sectionTitle: 'Konuşmacılar',
          sectionDescription: 'Sektörün öncü isimleri',
          testimonials: [
            {
              name: 'Prof. Dr. Ali Yılmaz',
              role: 'BIM Uzmanı, İTÜ',
              content: 'BIM\'in Geleceği ve Yapay Zeka Entegrasyonu',
              imageUrl: '/speaker-1.jpg',
            },
            {
              name: 'Ayşe Kara',
              role: 'Proje Direktörü, Mega İnşaat',
              content: 'Büyük Ölçekli Projelerde BIM Uygulamaları',
              imageUrl: '/speaker-2.jpg',
            },
            {
              name: 'Mehmet Demir',
              role: 'CTO, TechBuild',
              content: 'Dijital İkiz Teknolojisi ile Akıllı Binalar',
              imageUrl: '/speaker-3.jpg',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Kayıt Paketleri',
          plans: [
            {
              name: 'Online',
              price: '₺499',
              description: 'Canlı yayın erişimi',
              features: [
                'Tüm oturumlara canlı erişim',
                'Kayıt erişimi (30 gün)',
                'Dijital materyal paketi',
                'Katılım sertifikası',
              ],
              buttonText: 'Online Kayıt',
              buttonUrl: '/register?type=online',
            },
            {
              name: 'Yerinde',
              price: '₺1.499',
              description: 'Fiziksel katılım',
              features: [
                'Tüm oturumlara fiziksel katılım',
                'Kayıt erişimi (90 gün)',
                'Matbu materyal paketi',
                'Networking etkinlikleri',
                'Öğle yemeği & kahve',
                'Hediye paketi',
              ],
              highlighted: true,
              buttonText: 'Yerinde Kayıt',
              buttonUrl: '/register?type=onsite',
            },
            {
              name: 'VIP',
              price: '₺2.999',
              description: 'Premium deneyim',
              features: [
                'Tüm yerinde paket özellikleri',
                'VIP lounge erişimi',
                'Özel workshop',
                'Konuşmacılarla meet & greet',
                '1 yıllık kayıt erişimi',
                'Premium hediye paketi',
              ],
              buttonText: 'VIP Kayıt',
              buttonUrl: '/register?type=vip',
            },
          ],
        },
      },
      {
        id: 'schedule',
        type: 'content-image-side-by-side',
        props: {
          title: 'Detaylı Program',
          description: '2 gün boyunca 30+ oturum, workshop ve panel. BIM, dijital ikiz, yapay zeka, sürdürülebilirlik ve daha fazlası...',
          imageUrl: '/event-schedule.jpg',
          primaryButtonText: 'Programı İndir (PDF)',
          primaryButtonUrl: '/downloads/program.pdf',
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Erken Kayıt İndirimi',
          description: '28 Şubat\'a kadar kayıt olun, %20 indirimden yararlanın',
          primaryButtonText: 'Hemen Kayıt Ol',
          primaryButtonUrl: '#register',
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          ctaTitle: 'Etkinlik Güncellemeleri',
          ctaDescription: 'Program değişiklikleri ve özel duyurular için abone olun',
          companyName: 'Allplan Events',
          description: 'İnşaat teknolojileri zirvesi',
          columns: [
            {
              title: 'Etkinlik',
              links: [
                { label: 'Program', url: '/schedule' },
                { label: 'Konuşmacılar', url: '/speakers' },
                { label: 'Mekan', url: '/venue' },
              ],
            },
            {
              title: 'Bilgi',
              links: [
                { label: 'SSS', url: '/faq' },
                { label: 'Konaklama', url: '/accommodation' },
                { label: 'Ulaşım', url: '/transportation' },
              ],
            },
            {
              title: 'İletişim',
              links: [
                { label: 'Sponsorluk', url: '/sponsor' },
                { label: 'Basın', url: '/press' },
                { label: 'İletişim', url: '/contact' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['event', 'conference', 'training', 'webinar'],
      difficulty: 'intermediate',
      estimatedSetupTime: '15 minutes',
    },
  },

  // ==================== FAZ 1: TEMEL KURUMSAL SAYFALAR ====================

  // Template 9: Contact Page
  {
    name: 'Contact Page',
    description: 'İletişim sayfası - form, harita, iletişim bilgileri, sosyal medya',
    category: 'Contact',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        background: '#ffffff',
        text: '#0f172a',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-minimal-logo-left',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Hakkımızda', url: '/about' },
            { label: 'Hizmetler', url: '/services' },
            { label: 'İletişim', url: '/contact' },
          ],
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Bize Ulaşın',
          subtitle: 'Size nasıl yardımcı olabiliriz?',
          description: 'Sorularınız, önerileriniz veya projeleriniz için bizimle iletişime geçin',
        },
      },
      {
        id: 'contact-info',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'İletişim Bilgileri',
          features: [
            {
              icon: 'map-pin',
              title: 'Adres',
              description: 'Atatürk Cad. No:123, 34000 İstanbul',
            },
            {
              icon: 'phone',
              title: 'Telefon',
              description: '+90 212 123 45 67',
            },
            {
              icon: 'mail',
              title: 'E-posta',
              description: 'info@company.com',
            },
          ],
        },
      },
      {
        id: 'contact-form',
        type: 'content-cta-box',
        props: {
          title: 'Mesaj Gönderin',
          description: 'Aşağıdaki formu doldurarak bize ulaşabilirsiniz',
          ctaButton: {
            label: 'Gönder',
            url: '#',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Şirket Adı',
          columns: [
            {
              title: 'Kurumsal',
              links: [
                { label: 'Hakkımızda', url: '/about' },
                { label: 'Ekibimiz', url: '/team' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['contact', 'form', 'location', 'support'],
      difficulty: 'beginner',
      estimatedSetupTime: '5 minutes',
    },
  },

  // Template 10: Team Page
  {
    name: 'Team Page',
    description: 'Ekip sayfası - üye kartları, pozisyonlar, sosyal linkler',
    category: 'Team',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#a78bfa',
        background: '#faf5ff',
        text: '#1f2937',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Hakkımızda', url: '/about' },
            { label: 'Ekibimiz', url: '/team' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Bize Katıl',
            url: '/careers',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: 'Ekibimizle Tanışın',
          subtitle: 'Başarının Arkasındaki İnsanlar',
          description: 'Tutkulu, yetenekli ve deneyimli ekibimiz',
          primaryButtonText: 'Açık Pozisyonlar',
          primaryButtonUrl: '/careers',
        },
      },
      {
        id: 'team-grid',
        type: 'gallery-four-image-mosaic',
        props: {
          images: [
            {
              url: '/team/member1.jpg',
              alt: 'Ali Yılmaz - CEO',
            },
            {
              url: '/team/member2.jpg',
              alt: 'Ayşe Demir - CTO',
            },
            {
              url: '/team/member3.jpg',
              alt: 'Mehmet Kaya - Product Manager',
            },
            {
              url: '/team/member4.jpg',
              alt: 'Zeynep Şahin - Lead Designer',
            },
          ],
        },
      },
      {
        id: 'values',
        type: 'features-services-two-column',
        props: {
          sectionTitle: 'Değerlerimiz',
          sectionDescription: 'Bizi biz yapan prensipler',
          services: [
            {
              icon: 'users',
              title: 'İş Birliği',
              description: 'Birlikte daha güçlüyüz',
            },
            {
              icon: 'lightbulb',
              title: 'İnovasyon',
              description: 'Sürekli öğrenme ve gelişim',
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Ekibimize Katılın',
          ctaSubtitle: 'Açık pozisyonları inceleyin',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['team', 'about', 'people', 'careers'],
      difficulty: 'beginner',
      estimatedSetupTime: '7 minutes',
    },
  },

  // Template 11: FAQ Page
  {
    name: 'FAQ Page',
    description: 'Sık Sorulan Sorular sayfası - akordeon yapısı, kategoriler',
    category: 'FAQ',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#10b981',
        secondary: '#34d399',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Ürünler', url: '/products' },
            { label: 'Destek', url: '/support' },
            { label: 'SSS', url: '/faq' },
          ],
          ctaButton: {
            label: 'İletişim',
            url: '/contact',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Sık Sorulan Sorular',
          subtitle: 'Size Yardımcı Olalım',
          description: 'Merak ettiklerinizin cevaplarını burada bulabilirsiniz',
        },
      },
      {
        id: 'faq-categories',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Kategoriler',
          features: [
            {
              icon: 'package',
              title: 'Ürün & Hizmetler',
              description: 'Ürünlerimiz ve hizmetlerimiz hakkında',
            },
            {
              icon: 'credit-card',
              title: 'Ödeme & Fatura',
              description: 'Fiyatlandırma ve ödeme seçenekleri',
            },
            {
              icon: 'settings',
              title: 'Teknik Destek',
              description: 'Teknik sorunlar ve çözümleri',
            },
          ],
        },
      },
      {
        id: 'faq-content',
        type: 'content-single-fullwidth',
        props: {
          content: 'SSS içeriği buraya gelecek (akordeon component)',
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Cevabını Bulamadınız mı?',
          description: 'Destek ekibimize ulaşın, size yardımcı olalım',
          ctaButton: {
            label: 'Destek Talebi Oluştur',
            url: '/support',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Şirket Adı',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '900px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['faq', 'support', 'help', 'questions'],
      difficulty: 'beginner',
      estimatedSetupTime: '5 minutes',
    },
  },

  // Template 12: Legal Pages
  {
    name: 'Legal Pages',
    description: 'Yasal metinler - gizlilik politikası, KVKK, kullanım şartları',
    category: 'Legal',
    isFeatured: false,
    designSystem: {
      colors: {
        primary: '#64748b',
        secondary: '#94a3b8',
        background: '#f8fafc',
        text: '#1e293b',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-minimal-logo-left',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Gizlilik', url: '/privacy' },
            { label: 'KVKK', url: '/kvkk' },
            { label: 'Kullanım Şartları', url: '/terms' },
          ],
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Gizlilik Politikası',
          subtitle: 'Son Güncelleme: 01 Ocak 2025',
          description: 'Kişisel verilerinizin korunması bizim için önemlidir',
        },
      },
      {
        id: 'content',
        type: 'content-single-fullwidth',
        props: {
          content: `
            <h2>1. Kişisel Verilerin Toplanması</h2>
            <p>Web sitemizi ziyaret ettiğinizde, belirli kişisel verileriniz toplanabilir...</p>

            <h2>2. Verilerin Kullanımı</h2>
            <p>Toplanan veriler aşağıdaki amaçlarla kullanılır...</p>

            <h2>3. Çerezler (Cookies)</h2>
            <p>Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır...</p>

            <h2>4. Veri Güvenliği</h2>
            <p>Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alıyoruz...</p>

            <h2>5. İletişim</h2>
            <p>Gizlilik politikamız hakkında sorularınız için: privacy@company.com</p>
          `,
        },
      },
      {
        id: 'footer',
        type: 'footer-compact-centered',
        props: {
          companyName: 'Şirket Adı',
          copyright: '© 2025 Şirket Adı. Tüm hakları saklıdır.',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '800px',
      spacing: 'comfortable',
      headerSticky: false,
    },
    metadata: {
      tags: ['legal', 'privacy', 'gdpr', 'kvkk', 'terms'],
      difficulty: 'beginner',
      estimatedSetupTime: '3 minutes',
    },
  },

  // Template 13: Pricing Page
  {
    name: 'Pricing Page',
    description: 'Fiyatlandırma sayfası - paket karşılaştırmaları, özellik listesi, SSS',
    category: 'Pricing',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Özellikler', url: '/features' },
            { label: 'Fiyatlandırma', url: '/pricing' },
            { label: 'Müşteriler', url: '/customers' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Ücretsiz Dene',
            url: '/trial',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Herkes İçin Uygun Fiyatlar',
          subtitle: 'Esnek Paketler',
          description: 'İhtiyacınıza göre ölçeklendirilebilir çözümler',
        },
      },
      {
        id: 'pricing-table',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Paketlerimiz',
          sectionDescription: 'Tüm paketlerde 14 gün ücretsiz deneme',
          plans: [
            {
              name: 'Başlangıç',
              price: '₺299/ay',
              description: 'Küçük ekipler için ideal',
              features: [
                '5 Kullanıcı',
                '10GB Depolama',
                'Email Destek',
                'Temel Özellikler',
              ],
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=starter',
            },
            {
              name: 'Profesyonel',
              price: '₺799/ay',
              description: 'Büyüyen işletmeler için',
              features: [
                '25 Kullanıcı',
                '100GB Depolama',
                'Öncelikli Destek',
                'Gelişmiş Özellikler',
                'API Erişimi',
              ],
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=pro',
              highlighted: true,
            },
            {
              name: 'Kurumsal',
              price: 'Özel Fiyat',
              description: 'Büyük organizasyonlar için',
              features: [
                'Sınırsız Kullanıcı',
                'Sınırsız Depolama',
                '7/24 Destek',
                'Tüm Özellikler',
                'Özel Entegrasyon',
                'SLA Garantisi',
              ],
              buttonText: 'İletişime Geç',
              buttonUrl: '/contact',
            },
          ],
        },
      },
      {
        id: 'features-comparison',
        type: 'content-single-fullwidth',
        props: {
          content: 'Detaylı özellik karşılaştırma tablosu buraya gelecek',
        },
      },
      {
        id: 'faq',
        type: 'content-cta-box',
        props: {
          title: 'Sık Sorulan Sorular',
          description: 'Fiyatlandırma hakkında merak ettikleriniz',
          ctaButton: {
            label: 'Tüm SSS',
            url: '/faq',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Hala Emin Değil misiniz?',
          ctaSubtitle: 'Ücretsiz demo talep edin',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['pricing', 'plans', 'subscription', 'comparison'],
      difficulty: 'intermediate',
      estimatedSetupTime: '8 minutes',
    },
  },

  // ==================== FAZ 2: İÇERİK & MARKETING ====================

  // Template 14: News & Announcements
  {
    name: 'News & Announcements',
    description: 'Haber ve duyurular sayfası - liste, detay, kategoriler, arama',
    category: 'News',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#dc2626',
        secondary: '#ef4444',
        background: '#ffffff',
        text: '#1f2937',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-minimal-logo-left',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Haberler', url: '/news' },
            { label: 'Duyurular', url: '/announcements' },
            { label: 'Blog', url: '/blog' },
          ],
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Haberler & Duyurular',
          subtitle: 'En Son Gelişmeler',
          description: 'Şirket haberlerimiz, ürün güncellemeleri ve sektör duyuruları',
        },
      },
      {
        id: 'featured-news',
        type: 'blog-extended-feature',
        props: {
          title: 'Yeni Ürün Lansmanı: Allplan 2025',
          excerpt: 'Mimarlık ve inşaat sektörüne özel yeni özelliklerle gelen Allplan 2025 ile tanışın...',
          image: '/news/featured.jpg',
          author: 'Haber Ekibi',
          date: '2025-01-05',
          url: '/news/allplan-2025-lansman',
        },
      },
      {
        id: 'news-list',
        type: 'blog-basic-list',
        props: {
          posts: [
            {
              title: 'BIM Summit 2025 Kayıtları Başladı',
              excerpt: '15-16 Mart tarihlerinde düzenlenecek zirvemize kayıt olun',
              date: '2025-01-03',
            },
            {
              title: 'Yeni Eğitim Merkezimiz Açıldı',
              excerpt: 'İstanbul\'da yeni eğitim merkezimiz hizmete girdi',
              date: '2025-01-01',
            },
            {
              title: 'Yılbaşı Kampanyası',
              excerpt: 'Tüm ürünlerde %20 indirim fırsatı',
              date: '2024-12-25',
            },
          ],
        },
      },
      {
        id: 'categories',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Haber Kategorileri',
          features: [
            {
              icon: 'megaphone',
              title: 'Ürün Duyuruları',
              description: 'Yeni ürünler ve güncellemeler',
            },
            {
              icon: 'calendar',
              title: 'Etkinlikler',
              description: 'Yaklaşan webinar ve etkinlikler',
            },
            {
              icon: 'award',
              title: 'Başarı Hikayeleri',
              description: 'Müşteri başarı öyküleri',
            },
          ],
        },
      },
      {
        id: 'newsletter',
        type: 'content-cta-box',
        props: {
          title: 'Haberleri E-posta ile Alın',
          description: 'Son gelişmelerden haberdar olmak için bültene abone olun',
          ctaButton: {
            label: 'Abone Ol',
            url: '/newsletter',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-newsletter-signup',
        props: {
          companyName: 'Şirket Adı',
          newsletterTitle: 'Haber Bülteni',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['news', 'announcements', 'press', 'updates'],
      difficulty: 'beginner',
      estimatedSetupTime: '6 minutes',
    },
  },

  // Template 15: Case Study
  {
    name: 'Case Study',
    description: 'Başarı hikayesi sayfası - müşteri hikayesi, sonuçlar, istatistikler',
    category: 'Case Study',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#7c3aed',
        secondary: '#a78bfa',
        background: '#ffffff',
        text: '#111827',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Çözümler', url: '/solutions' },
            { label: 'Başarı Hikayeleri', url: '/case-studies' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Demo Talep Et',
            url: '/demo',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-split-image-right',
        props: {
          title: 'İnşaat Projelerinde %40 Zaman Tasarrufu',
          subtitle: 'ABC İnşaat - Başarı Hikayesi',
          description: 'Allplan BIM çözümleri ile proje süreçlerini nasıl optimize ettiklerini keşfedin',
          primaryButtonText: 'Hikayeyi Okuyun',
          primaryButtonUrl: '#story',
          imageUrl: '/case-studies/abc-construction.jpg',
        },
      },
      {
        id: 'challenge',
        type: 'content-image-side-by-side',
        props: {
          title: 'Zorluk',
          content: 'ABC İnşaat, büyük ölçekli projelerinde koordinasyon sorunları ve zaman kayıpları yaşıyordu. Geleneksel 2D çizimler, farklı ekipler arasında iletişim problemlerine neden oluyordu.',
          imagePosition: 'left',
          image: '/case-studies/challenge.jpg',
        },
      },
      {
        id: 'solution',
        type: 'content-image-side-by-side',
        props: {
          title: 'Çözüm',
          content: 'Allplan BIM platformuna geçiş yaparak, 3D modelleme ve gerçek zamanlı iş birliği özelliklerinden yararlandılar. Tüm paydaşlar tek bir platform üzerinden çalışmaya başladı.',
          imagePosition: 'right',
          image: '/case-studies/solution.jpg',
        },
      },
      {
        id: 'results',
        type: 'stats-four-column',
        props: {
          sectionTitle: 'Sonuçlar',
          stats: [
            {
              value: '%40',
              label: 'Zaman Tasarrufu',
            },
            {
              value: '%65',
              label: 'Hata Azaltma',
            },
            {
              value: '₺2.5M',
              label: 'Maliyet Tasarrufu',
            },
            {
              value: '15',
              label: 'Tamamlanan Proje',
            },
          ],
        },
      },
      {
        id: 'testimonial',
        type: 'testimonial-carousel',
        props: {
          testimonials: [
            {
              content: 'Allplan ile projelerimizde muazzam bir verimlilik artışı gördük. Ekipler arası iletişim sorunları tamamen ortadan kalktı.',
              name: 'Ahmet Yılmaz',
              company: 'ABC İnşaat',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Sizin Başarı Hikayenizi Yazalım',
          description: 'Siz de projelerinizde verimlilik artışı sağlamak ister misiniz?',
          ctaButton: {
            label: 'Demo Talep Et',
            url: '/demo',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Daha Fazla Başarı Hikayesi',
          ctaSubtitle: 'Müşterilerimizin deneyimlerini keşfedin',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['case-study', 'success-story', 'customer', 'results'],
      difficulty: 'intermediate',
      estimatedSetupTime: '10 minutes',
    },
  },

  // Template 16: Feature Landing
  {
    name: 'Feature Landing',
    description: 'Tek özellik odaklı landing page - detaylı tanıtım, demo, SSS',
    category: 'Feature',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#0891b2',
        secondary: '#06b6d4',
        background: '#ffffff',
        text: '#0f172a',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      supportedContexts: ['public'],
    },
    blocks: [
      {
        id: 'header',
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Özellikler', url: '#features' },
            { label: 'Nasıl Çalışır', url: '#how-it-works' },
            { label: 'Fiyatlandırma', url: '#pricing' },
            { label: 'SSS', url: '#faq' },
          ],
          ctaButton: {
            label: 'Ücretsiz Başla',
            url: '/signup',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: '3D BIM Modelleme',
          subtitle: 'Projelerinizi Hayata Geçirin',
          description: 'Gerçek zamanlı 3D modelleme ile tasarım süreçlerinizi hızlandırın',
          primaryButtonText: 'Canlı Demo İzle',
          primaryButtonUrl: '/demo',
          secondaryButtonText: 'Özellikleri Keşfet',
          secondaryButtonUrl: '#features',
        },
      },
      {
        id: 'video-demo',
        type: 'content-single-fullwidth',
        props: {
          content: '<div style="aspect-ratio: 16/9; background: #f3f4f6; display: flex; align-items: center; justify-content: center;"><p>Video Demo Placeholder</p></div>',
        },
      },
      {
        id: 'features',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Güçlü Özellikler',
          sectionDescription: '3D BIM Modelleme ile neler yapabilirsiniz',
          features: [
            {
              icon: 'layers',
              title: 'Katman Yönetimi',
              description: 'Kompleks projelerde kolay navigasyon',
            },
            {
              icon: 'share-2',
              title: 'Gerçek Zamanlı İş Birliği',
              description: 'Ekibinizle aynı anda çalışın',
            },
            {
              icon: 'download',
              title: 'Çoklu Format Desteği',
              description: 'IFC, DWG, DXF ve daha fazlası',
            },
            {
              icon: 'zap',
              title: 'Otomatik Hesaplama',
              description: 'Metraj ve maliyet hesaplama',
            },
            {
              icon: 'shield',
              title: 'Hata Kontrolü',
              description: 'Otomatik çakışma tespiti',
            },
            {
              icon: 'smartphone',
              title: 'Mobil Erişim',
              description: 'Her yerden proje erişimi',
            },
          ],
        },
      },
      {
        id: 'how-it-works',
        type: 'features-services-two-column',
        props: {
          sectionTitle: 'Nasıl Çalışır?',
          sectionDescription: '3 basit adımda başlayın',
          services: [
            {
              icon: 'upload',
              title: '1. Projenizi Yükleyin',
              description: 'Mevcut CAD dosyalarınızı içe aktarın',
            },
            {
              icon: 'edit',
              title: '2. Modellemeye Başlayın',
              description: '3D araçlarla tasarım yapın',
            },
            {
              icon: 'share',
              title: '3. Paylaşın & İş Birliği Yapın',
              description: 'Ekibinizle gerçek zamanlı çalışın',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Basit Fiyatlandırma',
          plans: [
            {
              name: 'Başlangıç',
              price: '₺499/ay',
              features: ['1 Kullanıcı', '5 Proje', 'Temel Özellikler'],
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=starter',
            },
            {
              name: 'Profesyonel',
              price: '₺1.299/ay',
              features: ['5 Kullanıcı', 'Sınırsız Proje', 'Tüm Özellikler', 'Öncelikli Destek'],
              highlighted: true,
              buttonText: 'Başla',
              buttonUrl: '/signup?plan=pro',
            },
            {
              name: 'Kurumsal',
              price: 'Özel',
              features: ['Sınırsız Kullanıcı', 'Özel Entegrasyon', 'SLA'],
              buttonText: 'İletişim',
              buttonUrl: '/contact',
            },
          ],
        },
      },
      {
        id: 'faq',
        type: 'content-cta-box',
        props: {
          title: 'Sorularınız mı Var?',
          description: 'SSS bölümünde yanıtları bulun veya bize ulaşın',
          ctaButton: {
            label: 'SSS',
            url: '/faq',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Hemen Başlayın',
          ctaSubtitle: '14 gün ücretsiz deneme',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['feature', 'landing', 'product', 'demo'],
      difficulty: 'intermediate',
      estimatedSetupTime: '12 minutes',
    },
  },
];
