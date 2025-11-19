/**
 * Hero Case Study Block Component
 *
 * Narrative-focused hero for case study pages.
 * Features client info, project title, and key metrics prominently.
 *
 * Design System:
 * - Desktop: Full-width with centered content
 * - Key metrics highlighted in grid
 * - Client logo/badge placement
 * - Documentary/professional tone
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Building2, Calendar } from 'lucide-react';

export interface HeroCaseStudyProps {
  // Project Info
  projectTitle?: string;
  clientName?: string;
  clientLogo?: string;
  industry?: string;
  projectDate?: string;

  // Key Metrics (headline numbers)
  keyMetrics?: Array<{
    value: string;
    label: string;
    change?: string; // e.g., "+45%" for improvement metrics
  }>;

  // Featured Image
  featuredImage?: string;
  featuredImageAlt?: string;

  // Tags/Categories
  tags?: string[];

  // Quick Summary
  summary?: string;

  // CTA
  downloadPdfUrl?: string;
  contactUrl?: string;

  // Style
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const HeroCaseStudy: React.FC<HeroCaseStudyProps> = ({
  projectTitle = 'Dijital Dönüşüm Başarı Hikayesi',
  clientName = 'Müşteri Adı',
  clientLogo,
  industry = 'Teknoloji',
  projectDate = '2024',
  keyMetrics = [
    { value: '%45', label: 'Verimlilik Artışı', change: '+45%' },
    { value: '6 Ay', label: 'Proje Süresi' },
    { value: '₺2.5M', label: 'Maliyet Tasarrufu' },
  ],
  featuredImage = 'https://picsum.photos/seed/case-study/1200/600',
  featuredImageAlt = 'Proje Görseli',
  tags = ['Dijital Dönüşüm', 'ERP', 'Bulut Çözümleri'],
  summary = 'İşletmenin operasyonel verimliliğini %45 artıran kapsamlı dijital dönüşüm projesi. Kurumsal kaynak planlaması ve bulut altyapısı entegrasyonu.',
  downloadPdfUrl = '/case-study.pdf',
  contactUrl = '/contact',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '6rem',
  paddingBottom = '4rem',
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
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Header: Client Info & Meta */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Client */}
            <div className="flex items-center gap-4">
              {clientLogo && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-border shadow-sm">
                  <Image
                    src={clientLogo}
                    alt={clientName}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{projectDate}</span>
                  <span>•</span>
                  <span>{industry}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Project Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {projectTitle}
          </h1>

          {/* Summary */}
          {summary && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {summary}
            </p>
          )}

          {/* Key Metrics Grid */}
          {keyMetrics && keyMetrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              {keyMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="text-center md:text-left p-6 rounded-lg bg-secondary/10 border border-border"
                >
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {metric.value}
                    </div>
                    {metric.change && (
                      <div className="text-sm font-semibold text-green-600">
                        {metric.change}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={featuredImage}
                alt={featuredImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {downloadPdfUrl && (
              <Button
                asChild
                size="lg"
                className="text-base font-semibold px-8"
              >
                <Link href={downloadPdfUrl} target="_blank">
                  PDF İndir
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}

            {contactUrl && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base font-semibold px-8"
              >
                <Link href={contactUrl}>
                  Bizimle İletişime Geçin
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
