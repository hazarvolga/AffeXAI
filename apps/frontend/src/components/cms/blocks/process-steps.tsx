/**
 * Process Steps Block Component
 *
 * Visual step-by-step process display with multiple layout options.
 * Perfect for onboarding flows and instructional content.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export type ProcessLayout = 'horizontal' | 'vertical' | 'grid';

export interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: ProcessStep[];
  layout?: ProcessLayout;
  showConnectors?: boolean;
  highlightColor?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title = 'Nasıl Çalışır?',
  subtitle = 'Süreç',
  description = 'Başlamak için basit 4 adımı takip edin.',
  steps = [
    { number: '1', title: 'Kaydolun', description: 'Ücretsiz hesap oluşturun, kredi kartı gerekmez.' },
    { number: '2', title: 'Kurulum Yapın', description: 'Kolay kurulum sihirbazı ile dakikalar içinde başlayın.' },
    { number: '3', title: 'Ekibinizi Davet Edin', description: 'Takım arkadaşlarınızı ekleyin ve işbirliğine başlayın.' },
    { number: '4', title: 'Başarıya Ulaşın', description: 'Sonuçları görün ve hedeflerinize ulaşın.' },
  ],
  layout = 'horizontal',
  showConnectors = true,
  highlightColor = '#ff7f1e',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[Math.min(steps.length, 4)];

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-secondary/5', cssClasses)}
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
          <div className="max-w-3xl mx-auto text-center mb-16">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        {/* Horizontal Layout */}
        {layout === 'horizontal' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector */}
                  {showConnectors && index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-border">
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="relative bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                      style={{ backgroundColor: highlightColor }}
                    >
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vertical Layout */}
        {layout === 'vertical' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Left: Number Circle */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: highlightColor }}
                  >
                    {step.number}
                  </div>
                  {/* Connector Line */}
                  {showConnectors && index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-border mx-auto mt-4" />
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div className={cn('grid gap-8', gridCols)}>
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4"
                  style={{ backgroundColor: highlightColor }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                <CheckCircle2 className="w-6 h-6 text-primary mt-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
