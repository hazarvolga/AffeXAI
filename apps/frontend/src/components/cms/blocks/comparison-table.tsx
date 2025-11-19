/**
 * Comparison Table Block Component
 *
 * Side-by-side comparison table for products/services.
 * Perfect for helping users make informed decisions.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export interface ComparisonFeature {
  name: string;
  description?: string;
}

export interface ComparisonColumn {
  name: string;
  badge?: string;
  price?: string;
  period?: string;
  description?: string;
  features: { [key: string]: boolean | string };
  highlighted?: boolean;
  buttonText?: string;
  buttonUrl?: string;
}

export interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: ComparisonFeature[];
  columns?: ComparisonColumn[];
  showPricing?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title = 'Planları Karşılaştır',
  subtitle = 'Karşılaştırma',
  description = 'Size en uygun planı seçin. Tüm planlar 14 günlük ücretsiz deneme ile gelir.',
  features = [
    { name: 'Kullanıcı Sayısı', description: 'Maksimum kullanıcı limiti' },
    { name: 'Depolama Alanı', description: 'Toplam dosya depolama kapasitesi' },
    { name: 'API Erişimi', description: 'RESTful API entegrasyonu' },
    { name: 'Öncelikli Destek', description: '24/7 canlı destek' },
    { name: 'Özel Raporlar', description: 'Gelişmiş analitik raporlar' },
  ],
  columns = [
    {
      name: 'Temel',
      price: '₺99',
      period: '/ay',
      description: 'Küçük ekipler için',
      features: {
        'Kullanıcı Sayısı': '5',
        'Depolama Alanı': '10 GB',
        'API Erişimi': true,
        'Öncelikli Destek': false,
        'Özel Raporlar': false,
      },
      buttonText: 'Başla',
      buttonUrl: '#',
    },
    {
      name: 'Profesyonel',
      badge: 'Popüler',
      price: '₺299',
      period: '/ay',
      description: 'Büyüyen şirketler için',
      features: {
        'Kullanıcı Sayısı': '20',
        'Depolama Alanı': '100 GB',
        'API Erişimi': true,
        'Öncelikli Destek': true,
        'Özel Raporlar': true,
      },
      highlighted: true,
      buttonText: 'Başla',
      buttonUrl: '#',
    },
    {
      name: 'Kurumsal',
      price: 'Özel',
      description: 'Büyük organizasyonlar için',
      features: {
        'Kullanıcı Sayısı': 'Sınırsız',
        'Depolama Alanı': 'Sınırsız',
        'API Erişimi': true,
        'Öncelikli Destek': true,
        'Özel Raporlar': true,
      },
      buttonText: 'İletişime Geç',
      buttonUrl: '#',
    },
  ],
  showPricing = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
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

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left align-bottom border-b-2 border-border">
                  <span className="text-sm font-semibold text-muted-foreground">Özellikler</span>
                </th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      'p-4 text-center align-bottom border-b-2',
                      column.highlighted ? 'border-primary bg-primary/5' : 'border-border'
                    )}
                  >
                    <div className="min-w-[180px]">
                      {column.badge && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full mb-2">
                          {column.badge}
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-2">{column.name}</h3>
                      {showPricing && column.price && (
                        <div className="mb-2">
                          <span className="text-3xl font-bold">{column.price}</span>
                          {column.period && (
                            <span className="text-sm text-muted-foreground">{column.period}</span>
                          )}
                        </div>
                      )}
                      {column.description && (
                        <p className="text-sm text-muted-foreground mb-4">{column.description}</p>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className={cn(featureIndex % 2 === 0 && 'bg-secondary/5')}
                >
                  <td className="p-4 border-b border-border">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      {feature.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </td>
                  {columns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={cn(
                        'p-4 text-center border-b',
                        column.highlighted ? 'border-primary/20 bg-primary/5' : 'border-border'
                      )}
                    >
                      {renderFeatureValue(column.features[feature.name])}
                    </td>
                  ))}
                </tr>
              ))}
              {/* CTA Row */}
              <tr>
                <td className="p-4"></td>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={cn(
                      'p-4 text-center',
                      column.highlighted && 'bg-primary/5'
                    )}
                  >
                    {column.buttonText && (
                      <Button
                        asChild
                        variant={column.highlighted ? 'default' : 'outline'}
                        size="lg"
                        className="w-full"
                      >
                        <a href={column.buttonUrl}>{column.buttonText}</a>
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
