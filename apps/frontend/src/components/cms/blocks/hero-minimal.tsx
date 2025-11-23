/**
 * Hero Minimal Block Component
 *
 * Ultra-clean minimal hero with centered content.
 * Used for minimal landing pages with single CTA focus.
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface HeroMinimalProps {
  title?: string;
  subtitle?: string;
  description?: string;
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

export const HeroMinimal: React.FC<HeroMinimalProps> = ({
  title = 'Clean & Simple',
  subtitle = 'Minimal Design',
  description = 'Focus on what matters most. No distractions, just pure content.',
  primaryButtonText = 'Get Started',
  primaryButtonUrl = '#',
  secondaryButtonText,
  secondaryButtonUrl = '#',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '8rem',
  paddingBottom = '8rem',
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
        <div className="max-w-3xl mx-auto text-center">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">
              {subtitle}
            </p>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* CTAs */}
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          )}
        </div>
      </div>
    </section>
  );
};
