/**
 * Stats Metrics Grid Block Component
 *
 * Flexible stats grid with icons, change indicators, and descriptions.
 * Supports 2-6 columns responsive layout.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Users, Target, Zap, Award } from 'lucide-react';

export interface StatMetric {
  value: string;
  label: string;
  change?: string; // e.g., "+45%" or "-12%"
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  icon?: 'users' | 'target' | 'zap' | 'award' | 'trending-up' | 'trending-down';
}

export interface StatsMetricsGridProps {
  title?: string;
  subtitle?: string;
  metrics?: StatMetric[];
  columns?: 2 | 3 | 4 | 5 | 6;
  showIcons?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const StatsMetricsGrid: React.FC<StatsMetricsGridProps> = ({
  title,
  subtitle,
  metrics = [
    { value: '10K+', label: 'Active Users', change: '+23%', changeType: 'positive', icon: 'users' },
    { value: '98%', label: 'Customer Satisfaction', change: '+5%', changeType: 'positive', icon: 'award' },
    { value: '50M+', label: 'API Requests', change: '+120%', changeType: 'positive', icon: 'zap' },
    { value: '24/7', label: 'Support Available', icon: 'target' },
  ],
  columns = 4,
  showIcons = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  }[columns];

  const getIcon = (iconName?: string) => {
    const iconClass = 'w-8 h-8';
    switch (iconName) {
      case 'users':
        return <Users className={iconClass} />;
      case 'target':
        return <Target className={iconClass} />;
      case 'zap':
        return <Zap className={iconClass} />;
      case 'award':
        return <Award className={iconClass} />;
      case 'trending-up':
        return <TrendingUp className={iconClass} />;
      case 'trending-down':
        return <TrendingDown className={iconClass} />;
      default:
        return <Target className={iconClass} />;
    }
  };

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
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Metrics Grid */}
        <div className={cn('grid gap-8', gridColsClass)}>
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all"
            >
              {/* Icon */}
              {showIcons && metric.icon && (
                <div className="flex justify-center mb-4 text-primary">
                  {getIcon(metric.icon)}
                </div>
              )}

              {/* Value */}
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {metric.value}
              </div>

              {/* Change Indicator */}
              {metric.change && (
                <div
                  className={cn(
                    'text-sm font-semibold mb-2 flex items-center justify-center gap-1',
                    metric.changeType === 'positive' && 'text-green-600',
                    metric.changeType === 'negative' && 'text-red-600',
                    metric.changeType === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  {metric.changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
                  {metric.changeType === 'negative' && <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              )}

              {/* Label */}
              <div className="text-base font-medium text-muted-foreground mb-1">
                {metric.label}
              </div>

              {/* Description */}
              {metric.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {metric.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
