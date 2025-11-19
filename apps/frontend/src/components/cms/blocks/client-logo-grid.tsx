/**
 * Client Logo Grid Block Component
 *
 * Display client/partner logos in a grid layout.
 * Social proof element for corporate pages.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ClientLogo {
  name: string;
  logoUrl: string;
  website?: string;
  grayscale?: boolean;
}

export interface ClientLogoGridProps {
  title?: string;
  subtitle?: string;
  logos?: ClientLogo[];
  columns?: 3 | 4 | 5 | 6;
  grayscaleDefault?: boolean;
  hoverEffect?: boolean;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({
  title = 'Güvenilen Markalar',
  subtitle = 'Dünya çapında lider şirketlerle çalışıyoruz',
  logos = [
    { name: 'Client 1', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+1' },
    { name: 'Client 2', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+2' },
    { name: 'Client 3', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+3' },
    { name: 'Client 4', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+4' },
    { name: 'Client 5', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+5' },
    { name: 'Client 6', logoUrl: 'https://via.placeholder.com/200x80/e5e7eb/6b7280?text=Client+6' },
  ],
  columns = 5,
  grayscaleDefault = true,
  hoverEffect = true,
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

  const LogoWrapper = ({ logo, children }: { logo: ClientLogo; children: React.ReactNode }) => {
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

        {/* Logo Grid */}
        <div className={cn('grid gap-8', gridColsClass)}>
          {logos.map((logo, index) => (
            <LogoWrapper key={index} logo={logo}>
              <div
                className={cn(
                  'flex items-center justify-center p-6 rounded-lg border border-border bg-background transition-all',
                  hoverEffect && 'hover:border-primary/50 hover:shadow-md'
                )}
              >
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
              </div>
            </LogoWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
