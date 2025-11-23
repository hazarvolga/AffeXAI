/**
 * CTA Banner Block Component
 *
 * Eye-catching call-to-action banner with multiple style variants.
 * Perfect for conversion-focused sections.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export type CtaBannerVariant = 'solid' | 'gradient' | 'outline' | 'minimal';

export interface CtaBannerProps {
  title?: string;
  description?: string;
  variant?: CtaBannerVariant;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  showIcon?: boolean;
  features?: string[];
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title = 'Hemen Başlayın',
  description = 'Bugün kaydolun ve işinizi bir üst seviyeye taşıyın. 14 gün ücretsiz deneme, kredi kartı gerekmez.',
  variant = 'gradient',
  primaryButtonText = 'Ücretsiz Deneyin',
  primaryButtonUrl = '#',
  secondaryButtonText = 'Daha Fazla Bilgi',
  secondaryButtonUrl = '#',
  showIcon = true,
  features = [],
  imageUrl,
  backgroundColor,
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'solid':
        return 'bg-primary text-primary-foreground';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'minimal':
        return 'bg-secondary/10';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const hasFeatures = features && features.length > 0;

  return (
    <section
      className={cn('w-full', cssClasses)}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'rounded-2xl p-8 md:p-12 lg:p-16',
            !backgroundColor && getVariantClasses()
          )}
        >
          <div className={cn(
            'grid gap-8',
            imageUrl ? 'grid-cols-1 lg:grid-cols-2 items-center' : 'max-w-4xl mx-auto text-center'
          )}>
            {/* Content */}
            <div className={cn(!imageUrl && 'mx-auto')}>
              {title && (
                <h2 className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
                  imageUrl && 'text-left'
                )}>
                  {title}
                </h2>
              )}

              {description && (
                <p className={cn(
                  'text-lg md:text-xl mb-6 opacity-90',
                  imageUrl && 'text-left'
                )}>
                  {description}
                </p>
              )}

              {/* Features List */}
              {hasFeatures && (
                <div className={cn(
                  'mb-6 space-y-2',
                  !imageUrl && 'flex flex-col items-center'
                )}>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className={cn(
                'flex flex-wrap gap-4',
                imageUrl ? 'justify-start' : 'justify-center'
              )}>
                {primaryButtonText && (
                  <Button
                    asChild
                    size="lg"
                    variant={variant === 'outline' || variant === 'minimal' ? 'default' : 'secondary'}
                    className="group"
                  >
                    <a href={primaryButtonUrl}>
                      {primaryButtonText}
                      {showIcon && (
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </a>
                  </Button>
                )}

                {secondaryButtonText && (
                  <Button
                    asChild
                    size="lg"
                    variant={variant === 'outline' || variant === 'minimal' ? 'outline' : 'ghost'}
                  >
                    <a href={secondaryButtonUrl}>
                      {secondaryButtonText}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Image */}
            {imageUrl && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
