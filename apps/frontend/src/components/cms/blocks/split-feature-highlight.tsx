/**
 * Split Feature Highlight Block Component
 *
 * Showcase key feature with split-screen layout.
 * Alternating image/text sections for visual interest.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface FeatureHighlight {
  title: string;
  description: string;
  features?: string[];
  imageUrl: string;
  imagePosition: 'left' | 'right';
  buttonText?: string;
  buttonUrl?: string;
}

export interface SplitFeatureHighlightProps {
  title?: string;
  subtitle?: string;
  highlights?: FeatureHighlight[];
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const SplitFeatureHighlight: React.FC<SplitFeatureHighlightProps> = ({
  title = 'Güçlü Özellikler',
  subtitle = 'Neler Sunuyoruz',
  highlights = [
    {
      title: 'Gerçek Zamanlı İşbirliği',
      description: 'Ekibinizle aynı anda çalışın. Değişiklikleri anında görün, yorumlar ekleyin ve sorunsuz bir şekilde işbirliği yapın.',
      features: ['Canlı düzenleme', 'Yorum sistemi', 'Versiyon kontrolü', 'Takım çalışma alanları'],
      imageUrl: 'https://picsum.photos/seed/collab/800/600',
      imagePosition: 'right',
      buttonText: 'Daha Fazla Bilgi',
      buttonUrl: '#',
    },
    {
      title: 'Güçlü Analitik',
      description: 'Veriye dayalı kararlar alın. Kapsamlı analizler ve raporlarla işinizin nabzını tutun.',
      features: ['Özelleştirilebilir dashboardlar', 'Gerçek zamanlı metrikler', 'Dışa aktarma', 'API entegrasyonu'],
      imageUrl: 'https://picsum.photos/seed/analytics/800/600',
      imagePosition: 'left',
      buttonText: 'Keşfet',
      buttonUrl: '#',
    },
    {
      title: 'Kurumsal Güvenlik',
      description: 'Verileriniz en üst düzey güvenlikle korunur. SOC 2 uyumlu altyapı ile huzurlu olun.',
      features: ['256-bit şifreleme', 'İki faktörlü kimlik', 'GDPR uyumlu', 'Düzenli yedeklemeler'],
      imageUrl: 'https://picsum.photos/seed/security/800/600',
      imagePosition: 'right',
      buttonText: 'Güvenlik Detayları',
      buttonUrl: '#',
    },
  ],
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
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-3xl mx-auto text-center mb-16">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Feature Highlights */}
        <div className="space-y-24">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div
                className={cn(
                  'relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl',
                  highlight.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
                )}
              >
                <Image
                  src={highlight.imageUrl}
                  alt={highlight.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  highlight.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                )}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {highlight.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {highlight.description}
                </p>

                {/* Features List */}
                {highlight.features && highlight.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {highlight.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                {highlight.buttonText && (
                  <Button asChild size="lg" className="group">
                    <a href={highlight.buttonUrl}>
                      {highlight.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
