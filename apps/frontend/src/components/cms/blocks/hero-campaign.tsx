/**
 * Hero Campaign Block Component
 *
 * Bold hero optimized for marketing campaigns.
 * Features urgency elements, strong CTAs, and conversion focus.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

export interface CampaignHighlight {
  icon?: string; // Lucide icon name (e.g., 'Clock', 'Zap', 'TrendingUp')
  text: string;
}

export interface HeroCampaignProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  highlights?: CampaignHighlight[];
  imageUrl?: string;
  videoUrl?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  urgencyText?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const HeroCampaign: React.FC<HeroCampaignProps> = ({
  badge = '🎉 Özel Kampanya',
  title = 'Sınırlı Süreli Teklif',
  subtitle = '%50 İndirim',
  description = 'İlk 100 müşteriye özel fırsat. Bu fırsatı kaçırmayın!',
  highlights = [
    { icon: 'clock', text: '48 Saat Kaldı' },
    { icon: 'zap', text: 'Anında Aktivasyon' },
    { icon: 'trending-up', text: '100+ Kişi Katıldı' },
  ],
  imageUrl,
  videoUrl,
  primaryButtonText = 'Hemen Katıl',
  primaryButtonUrl = '#',
  secondaryButtonText = 'Detayları Gör',
  secondaryButtonUrl = '#',
  urgencyText = 'Kampanya 2 gün içinde sona eriyor!',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '6rem',
  paddingBottom = '6rem',
  cssClasses = '',
}) => {
  const getIcon = (iconName?: string) => {
    if (iconName) {
      const IconComponent = (LucideIcons as any)[iconName];
      if (IconComponent) {
        return <IconComponent className="w-5 h-5" />;
      }
    }
    // Fallback to Zap icon
    return <LucideIcons.Zap className="w-5 h-5" />;
  };

  return (
    <section
      className={cn(
        'w-full',
        backgroundColor === 'transparent' && 'bg-gradient-to-br from-primary/5 via-background to-secondary/5',
        cssClasses
      )}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Badge */}
            {badge && (
              <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
                {badge}
              </Badge>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl font-bold text-primary mb-2">
                {subtitle}
              </p>
            )}

            {/* Title */}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {description}
              </p>
            )}

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border"
                  >
                    <div className="text-primary">
                      {getIcon(highlight.icon)}
                    </div>
                    <span className="font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {primaryButtonText && (
                <Button asChild size="lg" className="min-w-[180px] text-lg">
                  <a href={primaryButtonUrl}>{primaryButtonText}</a>
                </Button>
              )}
              {secondaryButtonText && (
                <Button asChild variant="outline" size="lg" className="min-w-[180px] text-lg">
                  <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                </Button>
              )}
            </div>

            {/* Urgency Text */}
            {urgencyText && (
              <p className="text-sm text-destructive font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {urgencyText}
              </p>
            )}
          </div>

          {/* Media */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            {videoUrl ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ) : imageUrl ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={title || 'Campaign'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Zap className="w-24 h-24 text-primary/40" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
