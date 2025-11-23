/**
 * Timeline Horizontal Block Component
 *
 * Horizontal timeline for corporate history, event schedules, roadmaps.
 * Desktop: Left-to-right flow | Mobile: Converts to vertical scroll
 *
 * Design System:
 * - Desktop: Horizontal scroll/steps
 * - Mobile: Converts to vertical timeline
 * - Minimal design with connector lines
 * - Support for dates, titles, descriptions
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: string;
}

export interface TimelineHorizontalProps {
  // Content
  title?: string;
  subtitle?: string;
  events?: TimelineEvent[];

  // Display Options
  showConnectors?: boolean;
  compactMode?: boolean;

  // Style
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const TimelineHorizontal: React.FC<TimelineHorizontalProps> = ({
  title = 'Kurumsal Tarihçemiz',
  subtitle = 'Yıllara Göre Gelişimimiz',
  events = [
    {
      date: '2000',
      title: 'Kuruluş',
      description: 'Şirketimiz 5 kişilik ekiple kuruldu',
      status: 'completed',
    },
    {
      date: '2010',
      title: 'Uluslararası Genişleme',
      description: 'İlk yurtdışı ofisimizi açtık',
      status: 'completed',
    },
    {
      date: '2020',
      title: 'Dijital Dönüşüm',
      description: 'Bulut tabanlı çözümlere geçiş',
      status: 'completed',
    },
    {
      date: '2024',
      title: 'Yapay Zeka Entegrasyonu',
      description: 'AI destekli yeni ürünler',
      status: 'current',
    },
    {
      date: '2025',
      title: 'Küresel Liderlik',
      description: 'Sektörde 1 numara olmak',
      status: 'upcoming',
    },
  ],
  showConnectors = true,
  compactMode = false,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  accentColor,
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const getStatusIcon = (status?: string) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-primary" />;
    }
    if (status === 'current') {
      return <Circle className="w-5 h-5 text-primary fill-primary" />;
    }
    return <Circle className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusColor = (status?: string) => {
    if (status === 'completed') return 'border-primary bg-primary/10';
    if (status === 'current') return 'border-primary bg-primary/20 ring-4 ring-primary/20';
    return 'border-border bg-background';
  };

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
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Timeline - Desktop: Horizontal Scroll */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector Line */}
            {showConnectors && (
              <div className="absolute top-[52px] left-0 right-0 h-[2px] bg-border" />
            )}

            {/* Events */}
            <div className="grid grid-flow-col auto-cols-fr gap-0">
              {events.map((event, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Icon/Dot */}
                  <div
                    className={cn(
                      'relative z-10 w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center transition-all',
                      getStatusColor(event.status)
                    )}
                  >
                    {getStatusIcon(event.status)}
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center px-4">
                    <div className="text-sm font-bold text-primary mb-2">
                      {event.date}
                    </div>
                    <h3 className={cn(
                      'font-bold mb-2',
                      compactMode ? 'text-base' : 'text-lg'
                    )}>
                      {event.title}
                    </h3>
                    {!compactMode && event.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile: Vertical */}
        <div className="lg:hidden">
          <div className="relative space-y-8">
            {/* Connector Line */}
            {showConnectors && (
              <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-border" />
            )}

            {/* Events */}
            {events.map((event, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Icon/Dot */}
                <div
                  className={cn(
                    'flex-shrink-0 relative z-10 w-[44px] h-[44px] rounded-full border-2 flex items-center justify-center transition-all',
                    getStatusColor(event.status)
                  )}
                >
                  {getStatusIcon(event.status)}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="text-sm font-bold text-primary mb-1">
                    {event.date}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
