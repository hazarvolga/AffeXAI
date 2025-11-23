/**
 * Partner Showcase Block Component
 *
 * Featured partner/client showcase with testimonials or case studies.
 * Includes logos, quotes, and optional statistics.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

export interface Partner {
  name: string;
  logo: string;
  quote?: string;
  author?: string;
  authorTitle?: string;
  authorImage?: string;
  stats?: { label: string; value: string }[];
  website?: string;
}

export interface PartnerShowcaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  partners?: Partner[];
  layout?: 'grid' | 'featured' | 'carousel';
  showQuotes?: boolean;
  showStats?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({
  title = 'Güvenilir Ortaklarımız',
  subtitle = 'Ortaklar',
  description = 'Dünya çapında lider şirketlerle birlikte çalışıyoruz.',
  partners = [
    {
      name: 'TechCorp',
      logo: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=TechCorp',
      quote: 'Bu platform sayesinde verimliliğimizi %300 artırdık. Ekibimiz artık gerçekten önemli işlere odaklanabiliyor.',
      author: 'Ahmet Yılmaz',
      authorTitle: 'CEO, TechCorp',
      authorImage: 'https://i.pravatar.cc/150?img=12',
      stats: [
        { label: 'Verimlilik Artışı', value: '%300' },
        { label: 'Zaman Tasarrufu', value: '15 saat/hafta' },
      ],
      website: 'https://techcorp.example.com',
    },
    {
      name: 'DesignHub',
      logo: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=DesignHub',
      quote: 'Müşteri memnuniyetimiz hiç olmadığı kadar yüksek. Harika bir çözüm!',
      author: 'Ayşe Demir',
      authorTitle: 'Kurucu, DesignHub',
      authorImage: 'https://i.pravatar.cc/150?img=45',
      stats: [
        { label: 'Müşteri Memnuniyeti', value: '%98' },
        { label: 'Yıllık Büyüme', value: '%150' },
      ],
      website: 'https://designhub.example.com',
    },
  ],
  layout = 'grid',
  showQuotes = true,
  showStats = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle || description) && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        {/* Partners */}
        <div
          className={cn(
            'max-w-6xl mx-auto',
            layout === 'grid' && 'grid grid-cols-1 md:grid-cols-2 gap-8'
          )}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className={cn(
                'bg-background border border-border rounded-2xl p-8 md:p-10',
                layout === 'featured' && index === 0 && 'col-span-2',
                layout !== 'grid' && 'mb-8'
              )}
            >
              {/* Logo */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-40 h-16">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain object-left"
                    sizes="200px"
                  />
                </div>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Web Sitesi →
                  </a>
                )}
              </div>

              {/* Quote */}
              {showQuotes && partner.quote && (
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-lg md:text-xl leading-relaxed italic">"{partner.quote}"</p>
                </div>
              )}

              {/* Author */}
              {partner.author && (
                <div className="flex items-center gap-4 mb-6">
                  {partner.authorImage && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={partner.authorImage}
                        alt={partner.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{partner.author}</p>
                    {partner.authorTitle && (
                      <p className="text-sm text-muted-foreground">{partner.authorTitle}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              {showStats && partner.stats && partner.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  {partner.stats.map((stat, statIndex) => (
                    <div key={statIndex}>
                      <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
