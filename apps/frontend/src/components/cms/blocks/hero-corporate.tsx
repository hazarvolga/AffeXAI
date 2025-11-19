/**
 * Hero Corporate Block Component
 *
 * Enterprise-level hero section for corporate business pages.
 * Features a clean 6/6 split layout with minimal design.
 *
 * Design System:
 * - Desktop: 6/6 column split (equal width)
 * - Tablet: Stacked layout
 * - Mobile: Single column
 * - Neutral grayscale + single accent primary
 * - Minimal shadow tokens
 * - Executive tone typography (large, confident)
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Play } from 'lucide-react';

export interface HeroCorporateProps {
  // Content
  title?: string;
  subtitle?: string;
  description?: string;

  // Stats/Metrics (optional)
  stats?: Array<{
    value: string;
    label: string;
  }>;

  // Media
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';

  // Video (optional)
  videoUrl?: string;
  showVideoButton?: boolean;

  // CTAs
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;

  // Style
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const HeroCorporate: React.FC<HeroCorporateProps> = ({
  title = 'Güvenilir İş Ortağınız',
  subtitle = 'Kurumsal Mükemmellik',
  description = '25 yılı aşkın deneyimimizle, işletmenizin dijital dönüşüm yolculuğunda yanınızdayız. Güvenilir çözümler, ölçülebilir sonuçlar.',
  stats = [
    { value: '500+', label: 'Kurumsal Müşteri' },
    { value: '25', label: 'Yıllık Deneyim' },
    { value: '%98', label: 'Müşteri Memnuniyeti' },
  ],
  imageUrl = 'https://picsum.photos/seed/hero-corporate/800/600',
  imageAlt = 'Kurumsal Görsel',
  imagePosition = 'right',
  videoUrl,
  showVideoButton = false,
  primaryButtonText = 'Bizimle İletişime Geçin',
  primaryButtonUrl = '/contact',
  secondaryButtonText = 'Hakkımızda',
  secondaryButtonUrl = '/about',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '8rem',
  paddingBottom = '8rem',
  cssClasses = '',
}) => {
  const [showVideo, setShowVideo] = React.useState(false);

  const mediaContent = (
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
      {showVideo && videoUrl ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Video Play Button Overlay */}
          {showVideoButton && videoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );

  const contentColumn = (
    <div className="space-y-6">
      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {subtitle}
        </p>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-6 pt-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
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
            variant="ghost"
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
  );

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
        {/* 6/6 Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {mediaContent}
              {contentColumn}
            </>
          ) : (
            <>
              {contentColumn}
              {mediaContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
