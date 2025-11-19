/**
 * Feature Comparison Block Component
 *
 * Visual comparison between two offerings or before/after scenarios.
 * Split-screen design with checkmarks and cross marks.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ComparisonSide {
  title: string;
  subtitle?: string;
  features: string[];
  negativeFeatures?: string[];
  badge?: string;
  buttonText?: string;
  buttonUrl?: string;
  color?: string;
}

export interface FeatureComparisonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  leftSide?: ComparisonSide;
  rightSide?: ComparisonSide;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const FeatureComparison: React.FC<FeatureComparisonProps> = ({
  title = 'Neden Biz?',
  subtitle = 'Karşılaştırma',
  description = 'Rakiplerimizle karşılaştırıldığında sunduğumuz avantajları görün.',
  leftSide = {
    title: 'Diğer Çözümler',
    subtitle: 'Geleneksel Yaklaşım',
    features: ['Temel özellikler', 'E-posta desteği'],
    negativeFeatures: ['Sınırlı entegrasyonlar', 'Manuel süreçler', 'Yavaş güncelleme'],
    color: '#6b7280',
  },
  rightSide = {
    title: 'Bizim Çözümümüz',
    subtitle: 'Modern Yaklaşım',
    badge: 'Önerilen',
    features: [
      'Tüm premium özellikler',
      '7/24 canlı destek',
      'Sınırsız entegrasyonlar',
      'Otomatik iş akışları',
      'Anlık güncellemeler',
      'AI destekli öneriler',
    ],
    buttonText: 'Hemen Başla',
    buttonUrl: '#',
    color: '#ff7f1e',
  },
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const renderSide = (side: ComparisonSide, isRight: boolean) => (
    <div
      className={cn(
        'flex-1 p-8 md:p-12 rounded-2xl relative',
        isRight ? 'bg-primary/5 border-2 border-primary' : 'bg-secondary/10 border border-border'
      )}
    >
      {/* Badge */}
      {side.badge && (
        <span className="inline-block px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-full mb-4">
          {side.badge}
        </span>
      )}

      {/* Title */}
      {side.subtitle && (
        <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">
          {side.subtitle}
        </p>
      )}
      <h3
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: isRight ? side.color : undefined }}
      >
        {side.title}
      </h3>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {side.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: isRight ? side.color : '#22c55e' }}
            />
            <span className="text-base">{feature}</span>
          </li>
        ))}
        {side.negativeFeatures?.map((feature, index) => (
          <li key={`neg-${index}`} className="flex items-start gap-3 opacity-60">
            <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <span className="text-base line-through">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {side.buttonText && (
        <Button
          asChild
          size="lg"
          variant={isRight ? 'default' : 'outline'}
          className="w-full"
        >
          <a href={side.buttonUrl}>{side.buttonText}</a>
        </Button>
      )}
    </div>
  );

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
        {/* Header */}
        {(title || subtitle || description) && (
          <div className="max-w-3xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        {/* Comparison Sides */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative">
            {/* VS Badge (Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-lg shadow-lg">
              VS
            </div>

            {/* Left Side */}
            {renderSide(leftSide, false)}

            {/* Right Side */}
            {renderSide(rightSide, true)}
          </div>
        </div>
      </div>
    </section>
  );
};
