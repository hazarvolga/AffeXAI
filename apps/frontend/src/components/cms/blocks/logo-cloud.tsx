/**
 * Logo Cloud Block Component
 *
 * Showcase client/partner logos in various layouts.
 * Includes marquee animation option for social proof.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Logo {
  name: string;
  logoUrl: string;
  website?: string;
  grayscale?: boolean;
}

export type LogoCloudLayout = 'grid' | 'marquee' | 'centered';

export interface LogoCloudProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  layout?: LogoCloudLayout;
  columns?: 3 | 4 | 5 | 6;
  grayscaleDefault?: boolean;
  hoverEffect?: boolean;
  marqueeSpeed?: 'slow' | 'normal' | 'fast';
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  title = 'Güvenilir Markalar',
  subtitle = 'Dünya çapında lider şirketlerle çalışıyoruz',
  logos = [
    { name: 'Client 1', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+1' },
    { name: 'Client 2', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+2' },
    { name: 'Client 3', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+3' },
    { name: 'Client 4', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+4' },
    { name: 'Client 5', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+5' },
    { name: 'Client 6', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+6' },
  ],
  layout = 'grid',
  columns = 5,
  grayscaleDefault = true,
  hoverEffect = true,
  marqueeSpeed = 'normal',
  backgroundColor = 'transparent',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }[columns];

  const marqueeSpeedClass = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast',
  }[marqueeSpeed];

  const LogoWrapper = ({ logo, children }: { logo: Logo; children: React.ReactNode }) => {
    const content = children;

    if (logo.website) {
      return (
        <Link href={logo.website} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </Link>
      );
    }

    return <div>{content}</div>;
  };

  const LogoImage = ({ logo }: { logo: Logo }) => (
    <div className="relative w-full h-16">
      <Image
        src={logo.logoUrl}
        alt={logo.name}
        fill
        className={cn(
          'object-contain transition-all',
          (grayscaleDefault || logo.grayscale) && 'grayscale opacity-60',
          hoverEffect && 'hover:grayscale-0 hover:opacity-100'
        )}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
      />
    </div>
  );

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{subtitle}</p>}
            {title && <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div className={cn('grid gap-8', gridColsClass)}>
            {logos.map((logo, index) => (
              <LogoWrapper key={index} logo={logo}>
                <div
                  className={cn(
                    'flex items-center justify-center p-6 rounded-lg border border-border bg-background transition-all',
                    hoverEffect && 'hover:border-primary/50 hover:shadow-md'
                  )}
                >
                  <LogoImage logo={logo} />
                </div>
              </LogoWrapper>
            ))}
          </div>
        )}

        {/* Marquee Layout */}
        {layout === 'marquee' && (
          <div className="relative overflow-hidden">
            <div className={cn('flex gap-12', marqueeSpeedClass)}>
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 flex items-center justify-center p-4"
                >
                  <LogoImage logo={logo} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Centered Layout */}
        {layout === 'centered' && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <LogoWrapper key={index} logo={logo}>
                <div className="w-32 md:w-40">
                  <LogoImage logo={logo} />
                </div>
              </LogoWrapper>
            ))}
          </div>
        )}
      </div>

      {/* Marquee Animation Styles */}
      {layout === 'marquee' && (
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee-slow {
            animation: marquee 60s linear infinite;
          }
          .animate-marquee-fast {
            animation: marquee 15s linear infinite;
          }
        `}</style>
      )}
    </section>
  );
};
