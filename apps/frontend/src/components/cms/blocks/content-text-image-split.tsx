/**
 * Content Text Image Split Block Component
 *
 * Flexible content section with text and image side-by-side.
 * Supports left/right image positioning and feature lists.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export interface ContentTextImageSplitProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ContentTextImageSplit: React.FC<ContentTextImageSplitProps> = ({
  title = 'Why Choose Us',
  subtitle = 'Our Strengths',
  description = 'We provide comprehensive solutions tailored to your business needs. Experience the difference with our proven approach.',
  features = [
    'Industry-leading expertise',
    'Custom solutions',
    'Dedicated support team',
    'Proven track record',
  ],
  imageUrl = 'https://picsum.photos/seed/content-split/800/600',
  imagePosition = 'right',
  buttonText = 'Learn More',
  buttonUrl = '#',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="text-lg text-muted-foreground mb-6">
                {description}
              </p>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            {buttonText && (
              <Button asChild size="lg">
                <a href={buttonUrl}>{buttonText}</a>
              </Button>
            )}
          </div>

          {/* Image */}
          <div className={cn('order-1', imagePosition === 'left' && 'lg:order-1', imagePosition === 'right' && 'lg:order-2')}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={title || 'Content'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
