/**
 * Service Grid Block Component
 *
 * Grid of service offerings with icons and descriptions.
 * Ideal for showcasing services, features, or product categories.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Service {
  title: string;
  description: string;
  icon?: string;
  linkText?: string;
  linkUrl?: string;
  color?: string;
}

export interface ServiceGridProps {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: Service[];
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  cardStyle?: 'default' | 'bordered' | 'elevated' | 'minimal';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  title = 'Hizmetlerimiz',
  subtitle = 'Çözümlerimiz',
  description = 'İşinizi büyütmek için kapsamlı hizmet portföyümüzü keşfedin.',
  services = [
    {
      title: 'Danışmanlık',
      description: 'Stratejik danışmanlık hizmetleri ile işinizi bir üst seviyeye taşıyın.',
      icon: '💼',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#3b82f6',
    },
    {
      title: 'Uygulama Geliştirme',
      description: 'Modern teknolojilerle özel yazılım çözümleri geliştiriyoruz.',
      icon: '⚡',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#8b5cf6',
    },
    {
      title: 'Bulut Hizmetleri',
      description: 'Güvenli ve ölçeklenebilir bulut altyapı çözümleri sunuyoruz.',
      icon: '☁️',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#06b6d4',
    },
    {
      title: 'Veri Analitiği',
      description: 'Verilerinizi anlamlandırın ve stratejik kararlar alın.',
      icon: '📊',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#10b981',
    },
    {
      title: 'Siber Güvenlik',
      description: 'Kapsamlı güvenlik çözümleri ile verilerinizi koruyun.',
      icon: '🔒',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#ef4444',
    },
    {
      title: 'Eğitim & Destek',
      description: 'Ekibinizi güçlendirin ve sürekli destek alın.',
      icon: '🎓',
      linkText: 'Detaylar',
      linkUrl: '#',
      color: '#f59e0b',
    },
  ],
  columns = 3,
  showIcons = true,
  cardStyle = 'default',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const getCardClasses = () => {
    const baseClasses = 'group relative transition-all duration-300';

    switch (cardStyle) {
      case 'bordered':
        return cn(baseClasses, 'border-2 border-border rounded-lg p-6 hover:border-primary');
      case 'elevated':
        return cn(baseClasses, 'bg-card rounded-lg p-6 shadow-md hover:shadow-xl');
      case 'minimal':
        return cn(baseClasses, 'p-6');
      case 'default':
      default:
        return cn(baseClasses, 'bg-card border border-border rounded-lg p-6 hover:shadow-lg');
    }
  };

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-background', cssClasses)}
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

        {/* Services Grid */}
        <div className={cn('grid gap-6', gridColsClass)}>
          {services.map((service, index) => (
            <div key={index} className={getCardClasses()}>
              {/* Icon */}
              {showIcons && service.icon && (
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: service.color ? `${service.color}20` : '#ff7f1e20',
                  }}
                >
                  {service.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4">{service.description}</p>

              {/* Link */}
              {service.linkText && service.linkUrl && (
                <a
                  href={service.linkUrl}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group-hover:gap-3 transition-all"
                >
                  {service.linkText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              {/* Accent Border (for minimal style) */}
              {cardStyle === 'minimal' && (
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: service.color || '#ff7f1e' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
