/**
 * Hero Split Content Block Component
 *
 * 50/50 split hero with content and visual.
 * Flexible image position (left/right).
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export interface HeroSplitContentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const HeroSplitContent: React.FC<HeroSplitContentProps> = ({
  title = 'Build Better Products',
  subtitle = 'Product Development',
  description = 'Everything you need to create amazing products. Built for modern teams.',
  features = [
    'Real-time collaboration',
    'Advanced analytics',
    'Secure by default',
    '24/7 support',
  ],
  imageUrl = 'https://picsum.photos/seed/split-hero/800/800',
  imagePosition = 'right',
  primaryButtonText = 'Get Started',
  primaryButtonUrl = '#',
  secondaryButtonText = 'Learn More',
  secondaryButtonUrl = '#',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '6rem',
  paddingBottom = '6rem',
  cssClasses = '',
}) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={cn('order-2', imagePosition === 'left' && 'lg:order-2', imagePosition === 'right' && 'lg:order-1')}>
            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
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

            {/* Features */}
            {features && features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryButtonText && (
                <Button asChild size="lg" className="min-w-[160px]">
                  <a href={primaryButtonUrl}>{primaryButtonText}</a>
                </Button>
              )}
              {secondaryButtonText && (
                <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                  <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                </Button>
              )}
            </div>
          </div>

          {/* Image */}
          <div className={cn('order-1', imagePosition === 'left' && 'lg:order-1', imagePosition === 'right' && 'lg:order-2')}>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={title || 'Hero'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
