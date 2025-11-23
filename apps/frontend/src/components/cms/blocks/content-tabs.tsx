/**
 * Content Tabs Block Component
 *
 * Tabbed content display with rich media support.
 * Organize multiple content pieces in a compact space.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ContentTab {
  id: string;
  label: string;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
}

export interface ContentTabsProps {
  title?: string;
  subtitle?: string;
  tabs?: ContentTab[];
  defaultTab?: string;
  tabsPosition?: 'top' | 'left';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  title = 'Keşfedin',
  subtitle = 'Özellikler',
  tabs = [
    {
      id: 'features',
      label: 'Özellikler',
      title: 'Güçlü Özellikler',
      description: 'İşinizi kolaylaştıracak kapsamlı özellikler.',
      features: ['Gerçek zamanlı analitik', 'Takım işbirliği', 'Güvenli veri saklama', 'Mobil uygulama'],
      imageUrl: 'https://picsum.photos/seed/features/800/600',
    },
    {
      id: 'integrations',
      label: 'Entegrasyonlar',
      title: 'Sorunsuz Entegrasyonlar',
      description: 'Favori araçlarınızla bağlantı kurun.',
      features: ['Slack entegrasyonu', 'Google Workspace', 'Microsoft Teams', 'Zapier'],
      imageUrl: 'https://picsum.photos/seed/integrations/800/600',
    },
    {
      id: 'security',
      label: 'Güvenlik',
      title: 'Kurumsal Güvenlik',
      description: 'Verileriniz en üst düzey güvenlikle korunur.',
      features: ['256-bit şifreleme', 'İki faktörlü kimlik doğrulama', 'SOC 2 Tip II uyumlu', 'Düzenli yedeklemeler'],
      imageUrl: 'https://picsum.photos/seed/security/800/600',
    },
  ],
  defaultTab,
  tabsPosition = 'top',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

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
          <div className="max-w-3xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={cn(tabsPosition === 'left' && 'flex gap-8')}
          >
            {/* Tabs List */}
            <TabsList
              className={cn(
                'w-full',
                tabsPosition === 'top'
                  ? 'grid h-auto mb-8'
                  : 'flex-col h-auto min-w-[200px]',
                tabsPosition === 'top' && `grid-cols-${Math.min(tabs.length, 4)}`
              )}
              style={
                tabsPosition === 'top'
                  ? { gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }
                  : undefined
              }
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    'text-base py-3',
                    tabsPosition === 'left' && 'justify-start w-full'
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content */}
            <div className="flex-1">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className={cn(tab.imageUrl || tab.videoUrl ? 'order-1' : '')}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{tab.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{tab.description}</p>

                      {/* Additional Content */}
                      {tab.content && (
                        <div className="prose dark:prose-invert mb-6">
                          <p>{tab.content}</p>
                        </div>
                      )}

                      {/* Features List */}
                      {tab.features && tab.features.length > 0 && (
                        <ul className="space-y-3">
                          {tab.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Media */}
                    {(tab.imageUrl || tab.videoUrl) && (
                      <div className={cn('order-2', tab.imageUrl && 'relative aspect-[4/3] rounded-lg overflow-hidden')}>
                        {tab.imageUrl && (
                          <Image
                            src={tab.imageUrl}
                            alt={tab.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        )}
                        {tab.videoUrl && (
                          <div className="relative aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src={tab.videoUrl}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
