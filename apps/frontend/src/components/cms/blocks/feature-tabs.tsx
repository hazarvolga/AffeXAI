/**
 * Feature Tabs Block Component
 *
 * Tabbed interface for organizing features into categories.
 * Used in feature landing pages, product pages.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export interface FeatureTab {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
  imageAlt?: string;
}

export interface FeatureTabsProps {
  title?: string;
  subtitle?: string;
  tabs?: FeatureTab[];
  defaultTab?: string;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const FeatureTabs: React.FC<FeatureTabsProps> = ({
  title = 'Özellikler',
  subtitle = 'Güçlü Araçlar, Tek Platformda',
  tabs = [
    {
      id: 'analytics',
      label: 'Analitik',
      title: 'Gelişmiş Analitik Araçları',
      description: 'İşinizi verilerle yönetin. Gerçek zamanlı raporlar ve görselleştirmeler.',
      features: ['Gerçek zamanlı dashboard', 'Özelleştirilebilir raporlar', 'Veri görselleştirme', 'API entegrasyonu'],
      imageUrl: 'https://picsum.photos/seed/analytics/800/600',
      imageAlt: 'Analytics Dashboard',
    },
    {
      id: 'automation',
      label: 'Otomasyon',
      title: 'İş Süreçlerini Otomatikleştirin',
      description: 'Tekrarlayan görevleri otomatikleştirerek zamandan tasarruf edin.',
      features: ['Workflow oluşturucu', 'Zamanlayıcı', 'E-posta otomasyonu', 'Bildirimler'],
      imageUrl: 'https://picsum.photos/seed/automation/800/600',
      imageAlt: 'Automation Tools',
    },
    {
      id: 'collaboration',
      label: 'İşbirliği',
      title: 'Ekip İşbirliği Araçları',
      description: 'Ekibinizle sorunsuz bir şekilde çalışın. Gerçek zamanlı işbirliği.',
      features: ['Takım çalışma alanları', 'Sohbet & yorum', 'Dosya paylaşımı', 'Versiyon kontrolü'],
      imageUrl: 'https://picsum.photos/seed/collaboration/800/600',
      imageAlt: 'Collaboration Features',
    },
  ],
  defaultTab,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-background', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, color: textColor !== 'inherit' ? textColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="w-full grid h-auto" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-base py-3">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className="p-8 md:p-12 order-2 lg:order-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{tab.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{tab.description}</p>

                      <ul className="space-y-3">
                        {tab.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    {tab.imageUrl && (
                      <div className="relative aspect-[4/3] rounded-r-lg overflow-hidden order-1 lg:order-2">
                        <Image src={tab.imageUrl} alt={tab.imageAlt || tab.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
