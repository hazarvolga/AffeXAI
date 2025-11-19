/**
 * Text Columns Block Component
 *
 * Multi-column text layout for content organization.
 * Perfect for terms, policies, editorial content, or feature lists.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TextColumn {
  title?: string;
  content: string;
  icon?: string;
}

export interface TextColumnsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: TextColumn[];
  columnCount?: 2 | 3 | 4;
  showDividers?: boolean;
  alignText?: 'left' | 'center' | 'justify';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const TextColumns: React.FC<TextColumnsProps> = ({
  title,
  subtitle = 'Bilgi',
  description,
  columns = [
    {
      title: 'Kolay Kullanım',
      content:
        'Sezgisel arayüzümüz sayesinde ekibiniz hızla adapte olur. Teknik bilgiye gerek kalmadan dakikalar içinde işe başlayabilirsiniz. Adım adım rehberlerimiz ve interaktif eğitim modüllerimiz ile öğrenme sürecini hızlandırın.',
      icon: '✨',
    },
    {
      title: 'Güvenli Altyapı',
      content:
        'Verileriniz en üst düzey güvenlik standartlarıyla korunur. ISO 27001 sertifikalı veri merkezleri, end-to-end şifreleme ve düzenli güvenlik denetimleriyle gönül rahatlığı sağlıyoruz. Otomatik yedekleme sistemi ile verileriniz her zaman güvende.',
      icon: '🔒',
    },
    {
      title: '7/24 Destek',
      content:
        'Profesyonel destek ekibimiz her zaman yanınızda. Canlı sohbet, e-posta ve telefon kanallarıyla ulaşabilirsiniz. Ortalama 15 dakika içinde yanıt alırsınız. Premium müşterilerimize özel hesap yöneticisi ataması yapıyoruz.',
      icon: '💬',
    },
  ],
  columnCount = 3,
  showDividers = false,
  alignText = 'left',
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
  }[columnCount];

  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    justify: 'text-justify',
  }[alignText];

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

        {/* Text Columns */}
        <div
          className={cn(
            'grid gap-8',
            gridColsClass,
            showDividers && 'divide-x-0 md:divide-x divide-border'
          )}
        >
          {columns.map((column, index) => (
            <div
              key={index}
              className={cn('px-0 md:px-6 first:pl-0 last:pr-0', textAlignClass)}
            >
              {/* Icon */}
              {column.icon && (
                <div className="text-4xl mb-4">
                  {column.icon}
                </div>
              )}

              {/* Column Title */}
              {column.title && (
                <h3 className="text-xl font-bold mb-4 text-foreground">{column.title}</h3>
              )}

              {/* Column Content */}
              <div
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: column.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
