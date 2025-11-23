/**
 * Feature Showcase Grid Block Component
 *
 * Grid layout for showcasing features with icons/images.
 * Supports 2-4 columns responsive layout.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Zap, Shield, Target, Award } from 'lucide-react';

export interface Feature {
  icon?: 'zap' | 'shield' | 'target' | 'award';
  imageUrl?: string;
  title: string;
  description: string;
}

export interface FeatureShowcaseGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const FeatureShowcaseGrid: React.FC<FeatureShowcaseGridProps> = ({
  title,
  subtitle,
  features = [
    { icon: 'zap', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: 'shield', title: 'Secure by Default', description: 'Enterprise-grade security built-in' },
    { icon: 'target', title: 'Precise Control', description: 'Fine-grained configuration options' },
    { icon: 'award', title: 'Award Winning', description: 'Recognized by industry leaders' },
  ],
  columns = 3,
  backgroundColor = 'transparent',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const getIcon = (iconName?: string) => {
    const iconClass = 'w-12 h-12';
    switch (iconName) {
      case 'zap': return <Zap className={iconClass} />;
      case 'shield': return <Shield className={iconClass} />;
      case 'target': return <Target className={iconClass} />;
      case 'award': return <Award className={iconClass} />;
      default: return <Zap className={iconClass} />;
    }
  };

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        <div className={cn('grid gap-8', gridColsClass)}>
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all">
              {feature.imageUrl ? (
                <div className="relative w-16 h-16 mb-4">
                  <Image src={feature.imageUrl} alt={feature.title} fill className="object-contain" />
                </div>
              ) : (
                <div className="text-primary mb-4">{getIcon(feature.icon)}</div>
              )}
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
