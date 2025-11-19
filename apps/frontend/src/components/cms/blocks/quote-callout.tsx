/**
 * Quote Callout Block Component
 *
 * Prominent quote or testimonial callout.
 * Eye-catching design for highlighting customer feedback or important statements.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

export type QuoteVariant = 'centered' | 'split' | 'minimal' | 'boxed';

export interface QuoteCalloutProps {
  quote: string;
  author?: string;
  authorTitle?: string;
  authorImage?: string;
  companyLogo?: string;
  variant?: QuoteVariant;
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const QuoteCallout: React.FC<QuoteCalloutProps> = ({
  quote = 'Bu platform sayesinde işimizi dönüştürdük. Müşteri memnuniyeti %40 arttı, operasyonel maliyetlerimiz yarı yarıya azaldı.',
  author = 'Mehmet Öztürk',
  authorTitle = 'CEO & Kurucu',
  authorImage = 'https://i.pravatar.cc/150?img=33',
  companyLogo,
  variant = 'centered',
  size = 'md',
  accentColor = '#ff7f1e',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const quoteSizeClass = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl lg:text-4xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
  }[size];

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-primary/5', cssClasses)}
      style={{
        backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
        color: textColor !== 'inherit' ? textColor : undefined,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Centered Variant */}
        {variant === 'centered' && (
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-16 h-16 mx-auto mb-8 opacity-20" style={{ color: accentColor }} />
            <blockquote className={cn('font-serif leading-relaxed mb-8', quoteSizeClass)}>
              "{quote}"
            </blockquote>
            {(author || companyLogo) && (
              <div className="flex flex-col items-center gap-4">
                {authorImage && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={authorImage} alt={author || 'Author'} fill className="object-cover" sizes="64px" />
                  </div>
                )}
                <div>
                  {author && <p className="font-semibold text-lg">{author}</p>}
                  {authorTitle && <p className="text-muted-foreground">{authorTitle}</p>}
                </div>
                {companyLogo && (
                  <div className="relative w-32 h-12 mt-2">
                    <Image src={companyLogo} alt="Company" fill className="object-contain" sizes="128px" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Split Variant */}
        {variant === 'split' && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Quote className="w-12 h-12 mb-6 opacity-30" style={{ color: accentColor }} />
              <blockquote className={cn('font-serif leading-relaxed', quoteSizeClass)}>
                "{quote}"
              </blockquote>
            </div>
            <div className="flex flex-col gap-6">
              {authorImage && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image src={authorImage} alt={author || 'Author'} fill className="object-cover" sizes="96px" />
                </div>
              )}
              <div>
                {author && <p className="font-semibold text-2xl mb-1">{author}</p>}
                {authorTitle && <p className="text-lg text-muted-foreground mb-4">{authorTitle}</p>}
                {companyLogo && (
                  <div className="relative w-40 h-16">
                    <Image src={companyLogo} alt="Company" fill className="object-contain object-left" sizes="160px" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Minimal Variant */}
        {variant === 'minimal' && (
          <div className="max-w-3xl mx-auto">
            <div
              className="h-1 w-20 mb-6"
              style={{ backgroundColor: accentColor }}
            />
            <blockquote className={cn('font-serif leading-relaxed mb-6', quoteSizeClass)}>
              "{quote}"
            </blockquote>
            {author && (
              <p className="text-lg">
                <span className="font-semibold">{author}</span>
                {authorTitle && <span className="text-muted-foreground"> — {authorTitle}</span>}
              </p>
            )}
          </div>
        )}

        {/* Boxed Variant */}
        {variant === 'boxed' && (
          <div className="max-w-4xl mx-auto">
            <div
              className="bg-background border-l-4 rounded-lg p-8 md:p-12 shadow-xl"
              style={{ borderLeftColor: accentColor }}
            >
              <Quote className="w-12 h-12 mb-6 opacity-20" style={{ color: accentColor }} />
              <blockquote className={cn('font-serif leading-relaxed mb-8', quoteSizeClass)}>
                "{quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                {authorImage && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image src={authorImage} alt={author || 'Author'} fill className="object-cover" sizes="56px" />
                  </div>
                )}
                <div className="flex-1">
                  {author && <p className="font-semibold text-lg">{author}</p>}
                  {authorTitle && <p className="text-muted-foreground">{authorTitle}</p>}
                </div>
                {companyLogo && (
                  <div className="relative w-24 h-10">
                    <Image src={companyLogo} alt="Company" fill className="object-contain" sizes="96px" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
