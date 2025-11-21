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
    description: 'Clean enterprise-level corporate website template with professional aesthetics',
    category: 'Business',
    isFeatured: false,
    designSystem: {
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
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
            { label: 'About', url: '#about' },
            { label: 'Values', url: '#values' },
            { label: 'History', url: '#history' },
            { label: 'Contact', url: '/contact' },
          ],
          ctaButton: {
            label: 'Get in Touch',
            url: '/contact',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-corporate',
        props: {
          title: 'Building Excellence Since 2000',
          subtitle: '20+ Years of Trust',
          description: 'Enterprise-level services driving businesses forward. International standards, proven results.',
          stats: [
            { value: '20+', label: 'Years Experience' },
            { value: '500+', label: 'Satisfied Clients' },
            { value: '1000+', label: 'Successful Projects' },
          ],
          imageUrl: '/corporate-hero.jpg',
          videoUrl: '/corporate-video.mp4',
          showVideoButton: true,
          imagePosition: 'right',
          primaryButtonText: 'Our Services',
          primaryButtonUrl: '#values',
          secondaryButtonText: 'Learn More',
          secondaryButtonUrl: '#about',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        },
      },
      {
        id: 'mission-vision',
        type: 'content-two-column-split',
        props: {
          leftColumn: {
            title: 'Our Mission',
            content: 'To empower organizations with innovative solutions that drive sustainable growth and digital transformation. We are committed to delivering excellence through every project, partnership, and innovation.',
            icon: 'target',
          },
          rightColumn: {
            title: 'Our Vision',
            content: 'To be the global leader in enterprise solutions, recognized for innovation, integrity, and exceptional service. We envision a future where technology seamlessly enhances business operations worldwide.',
            icon: 'eye',
          },
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'values',
        type: 'features-icon-grid-four',
        props: {
          sectionTitle: 'Our Core Values',
          sectionDescription: 'Principles that guide every decision we make',
          features: [
            {
              icon: 'integrity',
              title: 'Integrity',
              description: 'Transparency and honesty in all our dealings',
            },
            {
              icon: 'innovation',
              title: 'Innovation',
              description: 'Continuous improvement and creative thinking',
            },
            {
              icon: 'excellence',
              title: 'Excellence',
              description: 'Uncompromising quality in everything we do',
            },
            {
              icon: 'collaboration',
              title: 'Collaboration',
              description: 'Partnership approach with clients and teams',
            },
          ],
        },
      },
      {
        id: 'history',
        type: 'timeline-horizontal',
        props: {
          title: 'Company Milestones',
          subtitle: 'Two decades of growth and achievement',
          events: [
            { date: '2000', title: 'Foundation', description: 'Started in Istanbul with a team of 5', status: 'completed' },
            { date: '2005', title: 'First 100 Clients', description: 'Expanded our client portfolio', status: 'completed' },
            { date: '2010', title: 'International Expansion', description: 'Entered European markets', status: 'completed' },
            { date: '2015', title: 'Digital Transformation', description: 'Launched cloud-based solutions', status: 'completed' },
            { date: '2020', title: '500+ Clients', description: 'Became industry leader', status: 'current' },
            { date: '2025', title: 'Global Growth', description: 'Expanding to Asia and Americas', status: 'upcoming' },
          ],
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'client-logos',
        type: 'client-logo-grid',
        props: {
          title: 'Trusted by Industry Leaders',
          subtitle: 'Fortune 500 companies choose us as their partner',
          columns: 6,
          logos: [
            { name: 'Client 1', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+1' },
            { name: 'Client 2', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+2' },
            { name: 'Client 3', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+3' },
            { name: 'Client 4', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+4' },
            { name: 'Client 5', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+5' },
            { name: 'Client 6', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+6' },
          ],
          grayscaleDefault: true,
          hoverEffect: true,
          paddingTop: '3rem',
          paddingBottom: '3rem',
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-carousel',
        props: {
          title: 'Client Testimonials',
          subtitle: 'What our partners say about us',
          testimonials: [
            {
              quote: 'Professional approach and quality service took our business to the next level. Our digital transformation was managed flawlessly.',
              author: {
                name: 'Robert Anderson',
                role: 'CEO',
                company: 'Tech Corp International',
                avatar: '/testimonial-1.jpg',
              },
              rating: 5,
              logo: '/logos/tech-corp.svg',
            },
            {
              quote: 'Our trusted partner for years. Their customer satisfaction and solution-focused approach is commendable.',
              author: {
                name: 'Jennifer Martinez',
                role: 'CTO',
                company: 'Innovation Labs',
                avatar: '/testimonial-2.jpg',
              },
              rating: 5,
              logo: '/logos/innovation-labs.svg',
            },
            {
              quote: 'Exceptional service quality and commitment to excellence. They understand corporate needs perfectly.',
              author: {
                name: 'David Thompson',
                role: 'VP Operations',
                company: 'Global Enterprises',
                avatar: '/testimonial-3.jpg',
              },
              rating: 5,
              logo: '/logos/global-enterprises.svg',
            },
          ],
          autoPlay: true,
          autoPlayInterval: 5000,
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Partner with Excellence',
          description: 'Let our experienced team help transform your business for the digital age',
          primaryButtonText: 'Schedule Consultation',
          primaryButtonUrl: '/consultation',
          secondaryButtonText: 'Download Brochure',
          secondaryButtonUrl: '/brochure.pdf',
          backgroundGradient: false,
          backgroundColor: '#f1f5f9',
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Corporate Solutions',
          description: 'Your trusted solution partner in business',
          columns: [
            {
              title: 'Company',
              links: [
                { label: 'About Us', url: '/about' },
                { label: 'Leadership', url: '/leadership' },
                { label: 'Careers', url: '/careers' },
                { label: 'Press', url: '/press' },
              ],
            },
            {
              title: 'Services',
              links: [
                { label: 'Consulting', url: '/consulting' },
                { label: 'Digital Transformation', url: '/transformation' },
                { label: 'Cloud Solutions', url: '/cloud' },
                { label: 'Support', url: '/support' },
              ],
            },
            {
              title: 'Contact',
              links: [
                { label: 'Get in Touch', url: '/contact' },
                { label: 'Locations', url: '/locations' },
                { label: 'Support Center', url: '/support' },
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
      tags: ['business', 'corporate', 'professional', 'enterprise'],
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
    description: 'Comprehensive business solutions page with modular block architecture',
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
            { label: 'Solutions', url: '#solutions' },
            { label: 'Features', url: '#features' },
            { label: 'Success Stories', url: '#success' },
            { label: 'Contact', url: '/contact' },
          ],
          ctaButton: {
            label: 'Get Started',
            url: '/demo',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-solutions',
        props: {
          eyebrow: 'Business Solutions',
          title: 'Transform Your Business with Comprehensive Solutions',
          subtitle: 'Enterprise-Grade Tools for Modern Companies',
          description: 'Modular, scalable solutions designed to accelerate your digital transformation. Proven methodologies backed by industry expertise.',
          features: [
            { text: 'Industry-Specific Solutions', icon: 'target' },
            { text: 'Rapid Integration, Minimal Disruption', icon: 'zap' },
            { text: '24/7 Expert Support', icon: 'headset' },
            { text: 'ISO 27001 Certified Security', icon: 'shield-check' },
          ],
          imageUrl: '/solutions-hero.jpg',
          primaryButtonText: 'Explore Solutions',
          primaryButtonUrl: '#solutions',
          secondaryButtonText: 'Request Demo',
          secondaryButtonUrl: '/demo',
          trustBadge: { text: 'ISO 27001 Certified', icon: 'badge-check' },
          paddingTop: '6rem',
          paddingBottom: '6rem',
        },
      },
      {
        id: 'features',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Core Capabilities',
          sectionDescription: 'Complete feature set for business transformation',
          features: [
            {
              icon: 'chart-bar',
              title: 'Advanced Analytics',
              description: 'Real-time insights and predictive analytics for data-driven decisions',
            },
            {
              icon: 'users',
              title: 'Team Collaboration',
              description: 'Seamless collaboration tools for distributed teams',
            },
            {
              icon: 'shield',
              title: 'Enterprise Security',
              description: 'Bank-grade encryption and compliance management',
            },
            {
              icon: 'zap',
              title: 'Automation Engine',
              description: 'Workflow automation to eliminate repetitive tasks',
            },
            {
              icon: 'cloud',
              title: 'Cloud Infrastructure',
              description: 'Scalable, reliable cloud platform with 99.9% uptime',
            },
            {
              icon: 'settings',
              title: 'Customization',
              description: 'Flexible configuration to match your workflows',
            },
            {
              icon: 'mobile',
              title: 'Mobile Access',
              description: 'Full-featured mobile apps for iOS and Android',
            },
            {
              icon: 'integration',
              title: 'API Integration',
              description: 'Connect with 1000+ third-party applications',
            },
            {
              icon: 'support',
              title: 'Premium Support',
              description: 'Dedicated account manager and priority assistance',
            },
          ],
        },
      },
      {
        id: 'service-cards',
        type: 'services-three-column-icon',
        props: {
          sectionTitle: 'Solution Portfolio',
          sectionDescription: 'Industry-focused digital solutions',
          services: [
            {
              icon: 'building',
              title: 'Construction & Infrastructure',
              description: 'BIM integration, project management, site tracking, material management',
              features: ['3D Modeling', 'Progress Tracking', 'Resource Planning'],
            },
            {
              icon: 'zap',
              title: 'Energy & Utilities',
              description: 'Energy management, monitoring, reporting and optimization systems',
              features: ['Smart Metering', 'Load Forecasting', 'Grid Management'],
            },
            {
              icon: 'factory',
              title: 'Manufacturing',
              description: 'Production planning, quality control, inventory management',
              features: ['MES Integration', 'Quality Analytics', 'Supply Chain'],
            },
          ],
        },
      },
      {
        id: 'stats',
        type: 'stats-four-column',
        props: {
          sectionTitle: 'Trusted by Industry Leaders',
          stats: [
            {
              value: '500+',
              label: 'Enterprise Clients',
              icon: 'building',
            },
            {
              value: '2000+',
              label: 'Projects Delivered',
              icon: 'check-circle',
            },
            {
              value: '98%',
              label: 'Customer Satisfaction',
              icon: 'star',
            },
            {
              value: '15+',
              label: 'Industry Sectors',
              icon: 'briefcase',
            },
          ],
        },
      },
      {
        id: 'solution-details',
        type: 'accordion',
        props: {
          title: 'Complete Solution Breakdown',
          subtitle: 'Explore our comprehensive feature set',
          items: [
            {
              title: 'Platform Architecture',
              content: 'Built on modern microservices architecture with containerized deployment. Supports horizontal scaling, load balancing, and automatic failover for maximum reliability.',
            },
            {
              title: 'Integration Capabilities',
              content: 'RESTful APIs, GraphQL, and webhooks for seamless integration. Pre-built connectors for Salesforce, SAP, Oracle, Microsoft Dynamics, and 1000+ more applications.',
            },
            {
              title: 'Security & Compliance',
              content: 'ISO 27001, SOC 2 Type II, GDPR compliant. Advanced encryption, role-based access control, audit logging, and continuous security monitoring.',
            },
            {
              title: 'Support & Training',
              content: '24/7 technical support, dedicated account management, comprehensive documentation, video tutorials, and on-site training programs.',
            },
          ],
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-carousel',
        props: {
          title: 'Customer Success Stories',
          subtitle: 'Digital Transformation Journeys',
          testimonials: [
            {
              quote: 'We consolidated all our business units on one platform. Efficiency increased by 40%, operational costs decreased significantly.',
              author: {
                name: 'Sarah Johnson',
                role: 'Chief Digital Officer',
                company: 'Global Manufacturing Corp',
                avatar: '/success-1.jpg',
              },
              rating: 5,
              logo: '/logos/global-manufacturing.svg',
            },
            {
              quote: 'Complete digital transformation of our project processes. Cost savings are substantial, and we deliver projects on time, every time.',
              author: {
                name: 'Michael Chen',
                role: 'CEO',
                company: 'Construction Innovations Ltd',
                avatar: '/success-2.jpg',
              },
              rating: 5,
              logo: '/logos/construction-innovations.svg',
            },
            {
              quote: 'Customer satisfaction reached 98%. System is intuitive and integration was seamless. Best investment we\'ve made.',
              author: {
                name: 'Emma Williams',
                role: 'CTO',
                company: 'Tech Solutions Inc',
                avatar: '/success-3.jpg',
              },
              rating: 5,
              logo: '/logos/tech-solutions.svg',
            },
          ],
          autoPlay: true,
          autoPlayInterval: 6000,
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Ready to Transform Your Business?',
          description: 'Our expert team is ready to design a custom solution for your industry',
          primaryButtonText: 'Schedule Consultation',
          primaryButtonUrl: '/consultation',
          secondaryButtonText: 'View Case Studies',
          secondaryButtonUrl: '/case-studies',
          backgroundGradient: true,
        },
      },
      {
        id: 'footer',
        type: 'footer-multi-column',
        props: {
          companyName: 'Affexai Solutions',
          description: 'Your trusted partner in digital transformation',
          columns: [
            {
              title: 'Solutions',
              links: [
                { label: 'Construction', url: '/solutions/construction' },
                { label: 'Energy', url: '/solutions/energy' },
                { label: 'Manufacturing', url: '/solutions/manufacturing' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', url: '/about' },
                { label: 'Team', url: '/team' },
                { label: 'Careers', url: '/careers' },
              ],
            },
            {
              title: 'Support',
              links: [
                { label: 'Help Center', url: '/help' },
                { label: 'Contact', url: '/contact' },
                { label: 'FAQ', url: '/faq' },
              ],
            },
          ],
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1440px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['solutions', 'business', 'enterprise', 'b2b', 'transformation'],
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
        type: 'hero-case-study',
        props: {
          projectTitle: 'İnşaat Projelerinde %40 Zaman Tasarrufu',
          clientName: 'ABC İnşaat',
          clientLogo: '/logos/abc-construction.svg',
          industry: 'İnşaat & Altyapı',
          date: '2024 Q1',
          keyMetrics: [
            { value: '%40', label: 'Zaman Tasarrufu', change: '+40%' },
            { value: '%65', label: 'Hata Azaltma', change: '+65%' },
            { value: '₺2.5M', label: 'Maliyet Tasarrufu', change: '+45%' },
          ],
          featuredImage: '/case-studies/abc-construction.jpg',
          tags: ['BIM', 'Dijital Dönüşüm', 'Proje Yönetimi'],
          primaryButtonText: 'Hikayeyi Okuyun',
          primaryButtonUrl: '#story',
          paddingTop: '6rem',
          paddingBottom: '6rem',
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
        id: 'project-gallery',
        type: 'carousel-gallery',
        props: {
          title: 'Proje Görselleri',
          images: [
            { url: '/case-studies/project-1.jpg', alt: '3D BIM Modeli', caption: 'Detaylı 3D BIM modeli ile tüm projeyi görselleştirdik' },
            { url: '/case-studies/project-2.jpg', alt: 'Koordinasyon Toplantısı', caption: 'Ekipler arası gerçek zamanlı iş birliği' },
            { url: '/case-studies/project-3.jpg', alt: 'Tamamlanan Proje', caption: 'Zamanında ve bütçe dahilinde tamamlanan proje' },
            { url: '/case-studies/project-4.jpg', alt: 'Analiz Dashboard', caption: 'Proje metrikleri ve performans analizi' },
          ],
          aspectRatio: 'video',
          showThumbnails: true,
          paddingTop: '4rem',
          paddingBottom: '4rem',
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
          title: 'Müşteri Görüşü',
          subtitle: 'Proje Ekibinden',
          testimonials: [
            {
              quote: 'Allplan ile projelerimizde muazzam bir verimlilik artışı gördük. Ekipler arası iletişim sorunları tamamen ortadan kalktı. Artık tüm ekipler tek platformda çalışıyor.',
              author: {
                name: 'Ahmet Yılmaz',
                role: 'Proje Müdürü',
                company: 'ABC İnşaat',
                avatar: '/testimonials/ahmet-yilmaz.jpg',
              },
              rating: 5,
              logo: '/logos/abc-construction.svg',
            },
          ],
          autoPlay: false,
          paddingTop: '5rem',
          paddingBottom: '5rem',
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

  // ==================== FAZ 3: ÖZEL SAYFALAR ====================

  // Template 17: 404 Error Page
  {
    name: '404 Error Page',
    description: 'Sayfa bulunamadı hatası - yönlendirme linkleri, arama, ana sayfaya dön',
    category: 'Error',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
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
            { label: 'Ürünler', url: '/products' },
            { label: 'İletişim', url: '/contact' },
          ],
        },
      },
      {
        id: 'error-content',
        type: 'hero-centered-bg-image',
        props: {
          title: '404 - Sayfa Bulunamadı',
          subtitle: 'Üzgünüz, aradığınız sayfa mevcut değil',
          description: 'Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir',
          primaryButtonText: 'Ana Sayfaya Dön',
          primaryButtonUrl: '/',
        },
      },
      {
        id: 'quick-links',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Popüler Sayfalar',
          features: [
            {
              icon: 'home',
              title: 'Ana Sayfa',
              description: 'Ana sayfaya geri dönün',
            },
            {
              icon: 'phone',
              title: 'İletişim',
              description: 'Bizimle iletişime geçin',
            },
            {
              icon: 'help-circle',
              title: 'Yardım Merkezi',
              description: 'SSS ve destek',
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-compact-centered',
        props: {
          companyName: 'Şirket Adı',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: false,
    },
    metadata: {
      tags: ['error', '404', 'not-found', 'redirect'],
      difficulty: 'beginner',
      estimatedSetupTime: '3 minutes',
    },
  },

  // Template 18: 500 Error Page
  {
    name: '500 Error Page',
    description: 'Sunucu hatası - hata raporlama, yeniden deneme, iletişim',
    category: 'Error',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#ef4444',
        secondary: '#f87171',
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
          ],
        },
      },
      {
        id: 'error-content',
        type: 'hero-centered-bg-image',
        props: {
          title: '500 - Sunucu Hatası',
          subtitle: 'Bir şeyler ters gitti',
          description: 'Sunucularımızda beklenmeyen bir hata oluştu. Teknik ekibimiz sorunu çözmek için çalışıyor.',
          primaryButtonText: 'Sayfayı Yenile',
          primaryButtonUrl: '#',
        },
      },
      {
        id: 'error-info',
        type: 'content-cta-box',
        props: {
          title: 'Sorun Devam Ediyor mu?',
          description: 'Hata devam ederse lütfen destek ekibimize bildiriniz',
          ctaButton: {
            label: 'Destek Ekibine Ulaş',
            url: '/contact',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-compact-centered',
        props: {
          companyName: 'Şirket Adı',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: false,
    },
    metadata: {
      tags: ['error', '500', 'server-error', 'maintenance'],
      difficulty: 'beginner',
      estimatedSetupTime: '3 minutes',
    },
  },

  // Template 19: Certificate Verification
  {
    name: 'Certificate Verification',
    description: 'Sertifika doğrulama sayfası - sertifika numarası kontrolü, bilgi gösterimi',
    category: 'Verification',
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
        type: 'nav-logo-cta',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Ana Sayfa', url: '/' },
            { label: 'Eğitimler', url: '/education' },
            { label: 'Sertifikalar', url: '/certificates' },
          ],
          ctaButton: {
            label: 'Giriş Yap',
            url: '/login',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Sertifika Doğrulama',
          subtitle: 'Sertifika Geçerliliğini Kontrol Edin',
          description: 'Sertifika numaranızı girerek sertifikanızın geçerliliğini ve detaylarını görüntüleyin',
        },
      },
      {
        id: 'verification-form',
        type: 'content-single-fullwidth',
        props: {
          content:
            '<div style="max-width: 600px; margin: 0 auto; padding: 2rem; background: #f9fafb; border-radius: 8px;"><h3 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;">Sertifika Numaranızı Girin</h3><p style="margin-bottom: 1.5rem; color: #6b7280;">Örnek: ALP-TR-2025-01-ABC123</p><input type="text" placeholder="ALP-TR-2025-01-ABC123" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;" /><button style="width: 100%; padding: 0.75rem; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Doğrula</button></div>',
        },
      },
      {
        id: 'info',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Sertifika Sistemi',
          features: [
            {
              icon: 'shield-check',
              title: 'Güvenli Doğrulama',
              description: 'Blockchain tabanlı doğrulama sistemi',
            },
            {
              icon: 'file-check',
              title: 'Anında Kontrol',
              description: 'Gerçek zamanlı sertifika kontrolü',
            },
            {
              icon: 'download',
              title: 'PDF İndirme',
              description: 'Onaylı sertifikanızı indirin',
            },
          ],
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
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['certificate', 'verification', 'validation', 'education'],
      difficulty: 'intermediate',
      estimatedSetupTime: '8 minutes',
    },
  },

  // Template 20: Campaign Landing
  {
    name: 'Campaign Landing',
    description: 'Kampanya landing page - sınırlı süre teklifi, countdown, CTA',
    category: 'Campaign',
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
        type: 'nav-sticky-transparent',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Kampanya Detayları', url: '#details' },
            { label: 'Nasıl Çalışır', url: '#how-it-works' },
          ],
          ctaButton: {
            label: 'Hemen Başla',
            url: '#signup',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: 'Sınırlı Süre Fırsatı!',
          subtitle: 'Tüm Ürünlerde %50 İndirim',
          description: 'Yılın en büyük kampanyasını kaçırmayın. Sadece 3 gün!',
          primaryButtonText: 'Kampanyadan Yararlan',
          primaryButtonUrl: '#signup',
          secondaryButtonText: 'Detayları İncele',
          secondaryButtonUrl: '#details',
        },
      },
      {
        id: 'countdown',
        type: 'content-single-fullwidth',
        props: {
          content:
            '<div style="text-align: center; padding: 3rem 1rem; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white;"><h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Kampanya Bitimine</h2><div style="display: flex; justify-content: center; gap: 2rem; font-size: 2.5rem; font-weight: 700;"><div><span id="days">02</span><div style="font-size: 0.875rem; font-weight: 400;">Gün</div></div><div><span id="hours">18</span><div style="font-size: 0.875rem; font-weight: 400;">Saat</div></div><div><span id="minutes">45</span><div style="font-size: 0.875rem; font-weight: 400;">Dakika</div></div><div><span id="seconds">32</span><div style="font-size: 0.875rem; font-weight: 400;">Saniye</div></div></div></div>',
        },
      },
      {
        id: 'benefits',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Kampanya Avantajları',
          features: [
            {
              icon: 'percent',
              title: '%50 İndirim',
              description: 'Tüm ürün ve hizmetlerde geçerli',
            },
            {
              icon: 'gift',
              title: 'Hediye Paket',
              description: 'Premium özelliklere ücretsiz erişim',
            },
            {
              icon: 'zap',
              title: 'Anında Aktivasyon',
              description: 'Hemen kullanmaya başlayın',
            },
          ],
        },
      },
      {
        id: 'pricing',
        type: 'pricing-table-three-column',
        props: {
          sectionTitle: 'Kampanya Fiyatları',
          sectionDescription: 'Normal fiyatların yarısına',
          plans: [
            {
              name: 'Temel',
              price: '₺499',
              originalPrice: '₺999',
              features: ['5 Kullanıcı', '50GB Depolama', 'Temel Özellikler'],
              buttonText: 'Satın Al',
              buttonUrl: '/checkout?plan=basic',
            },
            {
              name: 'Profesyonel',
              price: '₺999',
              originalPrice: '₺1.999',
              features: ['20 Kullanıcı', '200GB Depolama', 'Tüm Özellikler', 'Öncelikli Destek'],
              highlighted: true,
              buttonText: 'Satın Al',
              buttonUrl: '/checkout?plan=pro',
            },
            {
              name: 'Kurumsal',
              price: '₺2.499',
              originalPrice: '₺4.999',
              features: ['Sınırsız Kullanıcı', 'Sınırsız Depolama', 'Özel Entegrasyon', 'SLA'],
              buttonText: 'Satın Al',
              buttonUrl: '/checkout?plan=enterprise',
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Bu Fırsatı Kaçırmayın!',
          description: 'Kampanya 3 gün içinde sona erecek. Hemen başvurun.',
          ctaButton: {
            label: 'Kampanyadan Yararlan',
            url: '/signup',
          },
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Sorularınız mı var?',
          ctaSubtitle: '7/24 Canlı Destek',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['campaign', 'promotion', 'discount', 'limited-time', 'sale'],
      difficulty: 'intermediate',
      estimatedSetupTime: '10 minutes',
    },
  },

  // ==================== FAZ 4: E-TİCARET ====================

  // Template 21: Product Category
  {
    name: 'Product Category',
    description: 'Ürün kategori sayfası - ürün listesi, filtreleme, sıralama, sepete ekle',
    category: 'E-Commerce',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#8b5cf6',
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
            { label: 'Ürünler', url: '/products' },
            { label: 'Kategoriler', url: '/categories' },
            { label: 'İletişim', url: '/contact' },
          ],
          ctaButton: {
            label: 'Sepetim',
            url: '/cart',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'BIM Yazılımları',
          subtitle: 'Profesyonel İnşaat Çözümleri',
          description: 'Mimarlık ve inşaat sektörü için en gelişmiş BIM yazılımları',
        },
      },
      {
        id: 'products',
        type: 'gallery-four-image-mosaic',
        props: {
          images: [
            {
              src: '/products/allplan-architecture.jpg',
              alt: 'Allplan Architecture',
              caption: 'Allplan Architecture',
              price: '₺12.999',
            },
            {
              src: '/products/allplan-engineering.jpg',
              alt: 'Allplan Engineering',
              caption: 'Allplan Engineering',
              price: '₺15.999',
            },
            {
              src: '/products/allplan-bridge.jpg',
              alt: 'Allplan Bridge',
              caption: 'Allplan Bridge',
              price: '₺18.999',
            },
            {
              src: '/products/allplan-precast.jpg',
              alt: 'Allplan Precast',
              caption: 'Allplan Precast',
              price: '₺14.999',
            },
          ],
        },
      },
      {
        id: 'features',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Neden Allplan?',
          features: [
            {
              icon: 'shield-check',
              title: 'Güvenli Ödeme',
              description: '256-bit SSL şifreleme',
            },
            {
              icon: 'truck',
              title: 'Hızlı Teslimat',
              description: 'Dijital ürünler anında',
            },
            {
              icon: 'headphones',
              title: '7/24 Destek',
              description: 'Uzman destek ekibi',
            },
          ],
        },
      },
      {
        id: 'cta',
        type: 'content-cta-box',
        props: {
          title: 'Demo Talep Edin',
          description: 'Ürünlerimizi denemek ister misiniz?',
          ctaButton: {
            label: 'Ücretsiz Demo',
            url: '/demo',
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
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['e-commerce', 'product-category', 'shopping', 'catalog'],
      difficulty: 'intermediate',
      estimatedSetupTime: '10 minutes',
    },
  },

  // Template 22: E-Commerce Landing
  {
    name: 'E-Commerce Landing',
    description: 'E-ticaret ana sayfa - öne çıkan ürünler, kampanyalar, kategoriler',
    category: 'E-Commerce',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#ec4899',
        secondary: '#f472b6',
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
            { label: 'Ürünler', url: '/products' },
            { label: 'Kampanyalar', url: '/deals' },
            { label: 'Kategoriler', url: '/categories' },
            { label: 'Hakkımızda', url: '/about' },
          ],
          ctaButton: {
            label: 'Sepetim',
            url: '/cart',
          },
        },
      },
      {
        id: 'hero',
        type: 'hero-gradient-floating-cta',
        props: {
          title: 'Yeni Sezon İndirimde!',
          subtitle: 'Tüm BIM Yazılımlarında',
          description: '%30 İndirim + Ücretsiz Eğitim',
          primaryButtonText: 'Alışverişe Başla',
          primaryButtonUrl: '/products',
          secondaryButtonText: 'Kampanyalar',
          secondaryButtonUrl: '/deals',
        },
      },
      {
        id: 'categories',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Kategoriler',
          features: [
            {
              icon: 'building',
              title: 'Mimarlık',
              description: 'Mimari tasarım yazılımları',
            },
            {
              icon: 'settings',
              title: 'Mühendislik',
              description: 'Yapı mühendisliği çözümleri',
            },
            {
              icon: 'layers',
              title: 'Altyapı',
              description: 'Köprü ve altyapı projeleri',
            },
          ],
        },
      },
      {
        id: 'featured-products',
        type: 'gallery-four-image-mosaic',
        props: {
          images: [
            {
              src: '/products/featured-1.jpg',
              alt: 'Öne Çıkan Ürün 1',
              caption: 'Allplan 2025',
            },
            {
              src: '/products/featured-2.jpg',
              alt: 'Öne Çıkan Ürün 2',
              caption: 'BIM Tools Pro',
            },
            {
              src: '/products/featured-3.jpg',
              alt: 'Öne Çıkan Ürün 3',
              caption: 'Project Manager',
            },
            {
              src: '/products/featured-4.jpg',
              alt: 'Öne Çıkan Ürün 4',
              caption: 'Visualization Suite',
            },
          ],
        },
      },
      {
        id: 'stats',
        type: 'stats-four-column',
        props: {
          sectionTitle: 'Rakamlarla E-Mağazamız',
          stats: [
            {
              value: '50+',
              label: 'Ürün',
            },
            {
              value: '10K+',
              label: 'Mutlu Müşteri',
            },
            {
              value: '98%',
              label: 'Memnuniyet',
            },
            {
              value: '24/7',
              label: 'Destek',
            },
          ],
        },
      },
      {
        id: 'testimonials',
        type: 'testimonial-carousel',
        props: {
          testimonials: [
            {
              content: 'Harika ürünler, hızlı teslimat ve mükemmel müşteri hizmeti!',
              name: 'Mehmet Demir',
              company: 'Demir İnşaat',
              rating: 5,
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-extended-cta',
        props: {
          companyName: 'Şirket Adı',
          ctaTitle: 'Bültene Abone Ol',
          ctaSubtitle: 'Kampanyalardan ilk sen haberdar ol',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'relaxed',
      headerSticky: true,
    },
    metadata: {
      tags: ['e-commerce', 'shopping', 'store', 'products', 'deals'],
      difficulty: 'intermediate',
      estimatedSetupTime: '12 minutes',
    },
  },

  // Template 23: Cart & Checkout
  {
    name: 'Cart & Checkout',
    description: 'Sepet ve ödeme sayfası - ürün listesi, toplam tutar, ödeme formu',
    category: 'E-Commerce',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#0891b2',
        secondary: '#06b6d4',
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
        type: 'nav-minimal-logo-left',
        props: {
          logoUrl: '/logo.svg',
          menuItems: [
            { label: 'Alışverişe Devam Et', url: '/products' },
          ],
        },
      },
      {
        id: 'hero',
        type: 'hero-centered-bg-image',
        props: {
          title: 'Sepetim',
          subtitle: 'Alışverişi Tamamla',
          description: 'Güvenli ödeme ile siparişini hemen tamamla',
        },
      },
      {
        id: 'cart-content',
        type: 'content-single-fullwidth',
        props: {
          content:
            '<div style="max-width: 900px; margin: 0 auto;"><div style="background: #f9fafb; padding: 2rem; border-radius: 8px; margin-bottom: 2rem;"><h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem;">Sepetinizdeki Ürünler</h3><div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;"><div style="display: flex; justify-content: space-between; align-items: center;"><div><h4 style="font-weight: 600;">Allplan Architecture 2025</h4><p style="color: #6b7280; font-size: 0.875rem;">1 Yıllık Lisans</p></div><div style="text-align: right;"><p style="font-weight: 600; font-size: 1.125rem;">₺12.999</p></div></div></div><div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;"><div style="display: flex; justify-content: space-between; align-items: center;"><div><h4 style="font-weight: 600;">BIM Tools Pro</h4><p style="color: #6b7280; font-size: 0.875rem;">Eklenti Paketi</p></div><div style="text-align: right;"><p style="font-weight: 600; font-size: 1.125rem;">₺2.499</p></div></div></div><div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid #e5e7eb;"><div><h3 style="font-size: 1.25rem; font-weight: 700;">Toplam</h3></div><div><p style="font-size: 1.5rem; font-weight: 700; color: #0891b2;">₺15.498</p></div></div></div><div style="background: #ecfeff; padding: 2rem; border-radius: 8px; border: 2px solid #06b6d4;"><h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Güvenli Ödeme</h3><p style="margin-bottom: 1.5rem; color: #0f172a;">256-bit SSL şifreleme ile korunan ödeme</p><button style="width: 100%; padding: 1rem; background: #0891b2; color: white; border: none; border-radius: 6px; font-size: 1.125rem; font-weight: 600; cursor: pointer;">Ödemeye Geç</button></div></div>',
        },
      },
      {
        id: 'security',
        type: 'features-icon-grid-three',
        props: {
          sectionTitle: 'Güvenli Alışveriş',
          features: [
            {
              icon: 'lock',
              title: 'SSL Sertifikası',
              description: '256-bit şifreleme',
            },
            {
              icon: 'shield-check',
              title: 'Güvenli Ödeme',
              description: 'PCI DSS uyumlu',
            },
            {
              icon: 'refresh-cw',
              title: '14 Gün İade',
              description: 'Koşulsuz iade garantisi',
            },
          ],
        },
      },
      {
        id: 'footer',
        type: 'footer-compact-centered',
        props: {
          companyName: 'Şirket Adı',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      headerSticky: false,
    },
    metadata: {
      tags: ['e-commerce', 'cart', 'checkout', 'payment', 'shopping-cart'],
      difficulty: 'advanced',
      estimatedSetupTime: '15 minutes',
    },
  },

  // ==================== INDUSTRY SOLUTION ====================
  {
    name: 'Industry Solution',
    description: 'Sektörel çözüm sayfası - iş akışları, özellikler ve çözüm kartları ile',
    category: 'Solutions',
    isFeatured: true,
    designSystem: {
      colors: {
        primary: '#ff7f1e',
        secondary: '#3b82f6',
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
        id: 'hero',
        type: 'hero-minimal',
        props: {
          title: 'Sektörünüze Özel Çözümler',
          subtitle: 'Dijital Dönüşüm',
          description: 'Modern teknolojilerle işinizi geleceğe taşıyın. Sektörünüze özel geliştirdiğimiz çözümlerle verimliliğinizi artırın.',
          primaryButtonText: 'Hemen Başlayın',
          primaryButtonUrl: '/contact',
          secondaryButtonText: 'Demo İste',
          secondaryButtonUrl: '/demo',
          backgroundImage: '/industry-hero-bg.jpg',
        },
      },
      {
        id: 'workflow-tabs',
        type: 'workflow-tabs',
        props: {
          title: 'İş Akışı Süreçleri',
          subtitle: 'Adım Adım',
          description: 'Proje yaşam döngüsünün tüm aşamalarını keşfedin ve iş akışlarınızı optimize edin.',
          enableScroll: true,
          accentColor: 'primary',
          tabVariant: 'outlined',
          mainTabs: [
            {
              id: 'phase-1',
              label: 'Faz 1: Planlama',
              icon: '📋',
              subTabs: [
                {
                  id: 'sub-1-1',
                  label: 'İhtiyaç Analizi',
                  icon: '🔍',
                  title: 'Detaylı İhtiyaç Analizi',
                  description: 'Projenizin gereksinimlerini analiz ediyor ve en uygun çözümleri belirliyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                  dialogContent: {
                    title: 'İhtiyaç Analizi - Detaylı Bilgi',
                    content: '<p>İhtiyaç analizi sürecinde, işletmenizin mevcut durumunu detaylı bir şekilde inceliyoruz. Ekibimiz, sizinle birebir görüşmeler yaparak iş süreçlerinizi anlamaya çalışır ve dijital dönüşüm için gereken adımları belirler.</p><ul><li>Mevcut durum analizi</li><li>Hedef belirleme</li><li>Kaynak planlaması</li><li>Risk değerlendirmesi</li></ul>',
                    imageUrl: 'https://via.placeholder.com/800x400',
                    ctaText: 'Daha Fazla Bilgi',
                    ctaUrl: '/ihtiyac-analizi',
                  },
                },
                {
                  id: 'sub-1-2',
                  label: 'Proje Planlama',
                  icon: '📐',
                  title: 'Stratejik Planlama',
                  description: 'Detaylı proje planı ve zaman çizelgesi oluşturuyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                  dialogContent: {
                    title: 'Proje Planlama Süreci',
                    content: '<p>Stratejik proje planlama aşamasında, belirlenen ihtiyaçlar doğrultusunda detaylı bir yol haritası çıkarıyoruz. Bu süreçte Gantt şemaları, kaynak tahsisi ve milestone belirleme işlemlerini gerçekleştiriyoruz.</p>',
                    imageUrl: 'https://via.placeholder.com/800x400',
                    ctaText: 'Planlama Hakkında',
                    ctaUrl: '/proje-planlama',
                  },
                },
              ],
            },
            {
              id: 'phase-2',
              label: 'Faz 2: Tasarım',
              icon: '🎨',
              subTabs: [
                {
                  id: 'sub-2-1',
                  label: 'Konsept Tasarım',
                  icon: '💡',
                  title: 'Yaratıcı Konsept Geliştirme',
                  description: 'İlk tasarım fikirlerini hızlıca görselleştirin ve paydaşlarla paylaşın.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
                {
                  id: 'sub-2-2',
                  label: 'Detay Tasarım',
                  icon: '✏️',
                  title: 'Detaylı Tasarım Çalışması',
                  description: 'Tasarımınızı detaylandırın ve teknik spesifikasyonları oluşturun.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
              ],
            },
            {
              id: 'phase-3',
              label: 'Faz 3: Geliştirme',
              icon: '⚙️',
              subTabs: [
                {
                  id: 'sub-3-1',
                  label: 'Yazılım Geliştirme',
                  icon: '💻',
                  title: 'Modern Yazılım Geliştirme',
                  description: 'En güncel teknolojilerle yazılım çözümlerinizi geliştiriyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
                {
                  id: 'sub-3-2',
                  label: 'Test & QA',
                  icon: '✅',
                  title: 'Kapsamlı Test Süreçleri',
                  description: 'Tüm sistemlerinizi detaylı testlerden geçiriyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
              ],
            },
            {
              id: 'phase-4',
              label: 'Faz 4: Devreye Alma',
              icon: '🚀',
              subTabs: [
                {
                  id: 'sub-4-1',
                  label: 'Deployment',
                  icon: '📦',
                  title: 'Güvenli Devreye Alma',
                  description: 'Sistemlerinizi güvenli bir şekilde canlı ortama aktarıyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
                {
                  id: 'sub-4-2',
                  label: 'Eğitim & Destek',
                  icon: '🎓',
                  title: '7/24 Destek Hizmeti',
                  description: 'Ekibinizi eğitiyor ve sürekli destek sağlıyoruz.',
                  mediaType: 'none',
                  mediaUrl: '',
                },
              ],
            },
          ],
          backgroundColor: 'transparent',
          textColor: 'inherit',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'features-grid',
        type: 'icon-grid',
        props: {
          title: '12 Neden Bizi Seçmelisiniz',
          subtitle: 'Avantajlarımız',
          description: 'Modern iş dünyasının ihtiyaçlarına özel çözümler sunuyoruz.',
          showNumbers: true,
          numberStyle: 'circle',
          numberColor: '#ff7f1e',
          startNumber: 1,
          columns: 3,
          iconSize: 'md',
          variant: 'card',
          items: [
            { icon: 'zap', title: 'Hızlı Performans', description: 'Yıldırım hızında işlem süreleri ile verimliliğinizi artırın.', color: '#ff7f1e' },
            { icon: 'shield', title: 'Güvenli Altyapı', description: 'Verileriniz en üst düzey güvenlik standartlarıyla korunur.', color: '#3b82f6' },
            { icon: 'users', title: 'Takım İşbirliği', description: 'Ekibinizle gerçek zamanlı çalışın ve işbirliğini güçlendirin.', color: '#22c55e' },
            { icon: 'award', title: 'Ödüllü Destek', description: '7/24 profesyonel müşteri desteği hizmetinizde.', color: '#a855f7' },
            { icon: 'trending-up', title: 'Sürekli Büyüme', description: 'İşinizle birlikte büyüyen ölçeklenebilir çözümler.', color: '#f59e0b' },
            { icon: 'globe', title: 'Global Erişim', description: 'Dünyanın her yerinden erişilebilir platform.', color: '#06b6d4' },
            { icon: 'lock', title: 'Veri Güvenliği', description: 'ISO 27001 sertifikalı güvenlik standartları.', color: '#ef4444' },
            { icon: 'cloud', title: 'Bulut Teknolojisi', description: 'Ölçeklenebilir bulut altyapısı ile sınırsız kapasite.', color: '#8b5cf6' },
            { icon: 'smartphone', title: 'Mobil Uyumlu', description: 'Her cihazdan sorunsuz erişim imkanı.', color: '#ec4899' },
            { icon: 'settings', title: 'Özelleştirilebilir', description: 'İhtiyaçlarınıza göre tamamen özelleştirilebilir sistem.', color: '#14b8a6' },
            { icon: 'message-circle', title: 'Anlık İletişim', description: 'Gerçek zamanlı mesajlaşma ve bildirimler.', color: '#f97316' },
            { icon: 'heart', title: 'Müşteri Memnuniyeti', description: '%98 müşteri memnuniyeti oranı ile lideriz.', color: '#e11d48' },
          ],
          backgroundColor: '#f9fafb',
          textColor: 'inherit',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'solution-cards',
        type: 'service-grid',
        props: {
          title: 'Çözüm Paketlerimiz',
          subtitle: 'Hizmetlerimiz',
          description: 'İşinizi büyütmek için kapsamlı hizmet portföyümüzü keşfedin.',
          columns: 3,
          showIcons: true,
          cardStyle: 'elevated',
          services: [
            {
              title: 'Mimarlık & Tasarım',
              description: 'BIM ve 3D modelleme ile projelerinizi hayata geçirin. Gelişmiş tasarım araçları ile yaratıcılığınızı sınırsız hale getirin.',
              icon: '🏗️',
              linkText: 'Keşfet',
              linkUrl: '/cozumler/mimarlik',
              color: '#3b82f6',
            },
            {
              title: 'Proje Yönetimi',
              description: 'Ekip işbirliği, zaman çizelgeleri ve kaynak yönetimi ile projelerinizi zamanında teslim edin.',
              icon: '📊',
              linkText: 'Keşfet',
              linkUrl: '/cozumler/proje-yonetimi',
              color: '#8b5cf6',
            },
            {
              title: 'Analiz & Raporlama',
              description: 'Gerçek zamanlı veri analitiği ve detaylı raporlama ile bilinçli kararlar alın.',
              icon: '📈',
              linkText: 'Keşfet',
              linkUrl: '/cozumler/analiz',
              color: '#06b6d4',
            },
          ],
          backgroundColor: 'transparent',
          textColor: 'inherit',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'case-study',
        type: 'quote-callout',
        props: {
          quote: 'Bu platform sayesinde proje süreçlerimizi %60 hızlandırdık. Ekip işbirliği ve veri paylaşımı artık çok daha kolay.',
          author: 'Ahmet Yılmaz',
          authorTitle: 'Proje Müdürü, ABC İnşaat',
          authorImage: 'https://i.pravatar.cc/150?img=12',
          companyLogo: '/company-logos/abc-insaat.png',
          variant: 'boxed',
          size: 'lg',
          accentColor: '#ff7f1e',
          backgroundColor: '#f9fafb',
          textColor: 'inherit',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
      },
      {
        id: 'cta-section',
        type: 'cta-banner',
        props: {
          title: 'Hemen Başlayın',
          description: 'Ücretsiz demo ile çözümlerimizi keşfedin ve işinizi dönüştürün.',
          primaryButtonText: 'Ücretsiz Demo',
          primaryButtonUrl: '/demo',
          secondaryButtonText: 'İletişime Geçin',
          secondaryButtonUrl: '/contact',
          variant: 'centered',
          backgroundColor: '#ff7f1e',
          buttonVariant: 'outline',
        },
      },
    ],
    layoutOptions: {
      maxWidth: '1440px',
      spacing: 'comfortable',
      headerSticky: true,
    },
    metadata: {
      tags: ['industry', 'solution', 'workflow', 'bim', 'architecture', 'engineering'],
      difficulty: 'intermediate',
      estimatedSetupTime: '10 minutes',
    },
  },
];
