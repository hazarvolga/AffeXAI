/**
 * Timeline Vertical Block Component
 *
 * Vertical timeline for all screen sizes.
 * Optimized for mobile, works great on all devices.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export interface TimelineVerticalEvent {
  date: string;
  title: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineVerticalProps {
  title?: string;
  subtitle?: string;
  events?: TimelineVerticalEvent[];
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const TimelineVertical: React.FC<TimelineVerticalProps> = ({
  title = 'Timeline',
  subtitle,
  events = [],
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const getStatusIcon = (status?: string) => {
    if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (status === 'current') return <Clock className="w-5 h-5 text-primary animate-pulse" />;
    return <Circle className="w-5 h-5 text-muted-foreground" />;
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
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-[21px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-border" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className="relative flex md:justify-center">
                <div className="flex md:w-full md:items-center gap-6">
                  <div className={cn(
                    "flex-shrink-0 relative z-10 w-[44px] h-[44px] rounded-full border-2 bg-background flex items-center justify-center",
                    event.status === 'current' ? 'border-primary ring-4 ring-primary/20' : 'border-border'
                  )}>
                    {getStatusIcon(event.status)}
                  </div>

                  <div className="flex-1 md:w-[calc(50%-44px)]">
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-sm font-bold text-primary mb-2">{event.date}</div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      {event.description && <p className="text-muted-foreground">{event.description}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
