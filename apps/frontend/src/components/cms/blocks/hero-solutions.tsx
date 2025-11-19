/**
 * Hero Solutions Block Component
 *
 * A professional hero section designed for B2B solutions pages.
 * Features a 5/7 grid split (desktop), media on left, content on right.
 *
 * Design System:
 * - Desktop: 12-column grid (5 cols media / 7 cols text)
 * - Tablet: Stacked layout (media top)
 * - Mobile: Single column
 * - Corporate color tokens for trust
 * - High whitespace for premium quality
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface HeroSolutionsProps {
  // Content
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;

  // Features/Benefits (bullet points)
  features?: Array<{
    text: string;
    icon?: string;
  }>;

  // Media
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string; // Optional video embed

  // CTAs
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;

  // Trust elements
  trustBadge?: {
    text: string;
    icon?: string;
  };

  // Style
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const HeroSolutions: React.FC<HeroSolutionsProps> = ({
  eyebrow = 'Çözümlerimiz',
  title = 'İşinizi Dijital Dönüşümle Güçlendirin',
  subtitle = 'Kurumsal Düzeyde İş Çözümleri',
  description = 'Modern teknoloji ve uzman ekibimizle işinizi bir sonraki seviyeye taşıyın. Kanıtlanmış çözümlerimiz ile verimliliğinizi artırın.',
  features = [
    { text: 'Kurumsal Ölçeklenebilirlik', icon: 'check' },
    { text: '7/24 Uzman Destek', icon: 'check' },
    { text: 'Güvenli & Uyumlu', icon: 'check' },
  ],
  imageUrl = 'https://picsum.photos/seed/hero-solutions/800/600',
  imageAlt = 'Çözüm Görseli',
  videoUrl,
  primaryButtonText = 'Demo Talep Et',
  primaryButtonUrl = '/demo',
  secondaryButtonText = 'Daha Fazla Bilgi',
  secondaryButtonUrl = '#features',
  trustBadge,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '6rem',
  paddingBottom = '6rem',
  cssClasses = '',
}) => {
  return (
    <section
      className={cn(
        'w-full',
        backgroundColor === 'transparent' && 'bg-background',
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
        {/* 12-column grid: 5 cols media / 7 cols content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Media Column (5/12 on desktop) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {videoUrl ? (
                <div className="w-full h-full">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
                />
              )}

              {/* Optional overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Trust Badge (optional) */}
            {trustBadge && (
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                {trustBadge.icon && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                )}
                <span className="font-medium">{trustBadge.text}</span>
              </div>
            )}
          </div>

          {/* Content Column (7/12 on desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">

            {/* Eyebrow */}
            {eyebrow && (
              <Badge variant="secondary" className="text-sm font-semibold">
                {eyebrow}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl font-semibold text-muted-foreground">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            {/* Features/Benefits List */}
            {features && features.length > 0 && (
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {primaryButtonText && primaryButtonUrl && (
                <Button
                  asChild
                  size="lg"
                  className="text-base font-semibold px-8"
                >
                  <Link href={primaryButtonUrl}>
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}

              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base font-semibold px-8"
                >
                  <Link href={secondaryButtonUrl}>
                    {secondaryButtonText}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
