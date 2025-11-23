/**
 * Image Text Overlap Block Component
 *
 * Creative layout with overlapping image and text card.
 * Creates visual depth and modern aesthetic.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export type OverlapPosition = 'left' | 'right' | 'top' | 'bottom';

export interface ImageTextOverlapProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  overlapPosition?: OverlapPosition;
  cardBackgroundColor?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ImageTextOverlap: React.FC<ImageTextOverlapProps> = ({
  title = 'Yenilikçi Çözümler',
  subtitle = 'İnovasyon',
  description = 'Modern ve etkili çözümlerle işinizi bir adım öteye taşıyoruz. Teknoloji ve yaratıcılığı birleştirerek benzersiz deneyimler sunuyoruz.',
  features = [
    'Modern tasarım anlayışı',
    'Kullanıcı odaklı yaklaşım',
    'Yüksek performans',
    'Ölçeklenebilir altyapı',
  ],
  imageUrl = 'https://picsum.photos/seed/overlap/800/1000',
  overlapPosition = 'right',
  cardBackgroundColor = '#ffffff',
  buttonText = 'Daha Fazla Bilgi',
  buttonUrl = '#',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '6rem',
  paddingBottom = '6rem',
  cssClasses = '',
}) => {
  const isVertical = overlapPosition === 'top' || overlapPosition === 'bottom';
  const isHorizontal = overlapPosition === 'left' || overlapPosition === 'right';

  return (
    <section
      className={cn('w-full overflow-hidden', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Horizontal Overlap (Left/Right) */}
          {isHorizontal && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
              {/* Image */}
              <div
                className={cn(
                  'relative aspect-[3/4] lg:aspect-[4/5]',
                  overlapPosition === 'right' ? 'order-1' : 'order-2'
                )}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text Card */}
              <div
                className={cn(
                  'relative z-10 p-8 md:p-12 rounded-2xl shadow-2xl',
                  overlapPosition === 'right' ? 'order-2 lg:-ml-20' : 'order-1 lg:-mr-20'
                )}
                style={{ backgroundColor: cardBackgroundColor }}
              >
                {subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                    {subtitle}
                  </p>
                )}
                {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                {description && <p className="text-lg text-muted-foreground mb-6">{description}</p>}

                {/* Features */}
                {features && features.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                {buttonText && (
                  <Button asChild size="lg">
                    <a href={buttonUrl}>{buttonText}</a>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Vertical Overlap (Top/Bottom) */}
          {isVertical && (
            <div className="relative">
              {/* Image */}
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="100vw"
                />
              </div>

              {/* Text Card */}
              <div
                className={cn(
                  'relative z-10 max-w-2xl mx-auto p-8 md:p-12 rounded-2xl shadow-2xl',
                  overlapPosition === 'top' ? '-mb-20 lg:-mb-32' : '-mt-20 lg:-mt-32'
                )}
                style={{ backgroundColor: cardBackgroundColor }}
              >
                {subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 text-center">
                    {subtitle}
                  </p>
                )}
                {title && (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{title}</h2>
                )}
                {description && (
                  <p className="text-lg text-muted-foreground mb-6 text-center">{description}</p>
                )}

                {/* Features */}
                {features && features.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Button */}
                {buttonText && (
                  <div className="text-center">
                    <Button asChild size="lg">
                      <a href={buttonUrl}>{buttonText}</a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
