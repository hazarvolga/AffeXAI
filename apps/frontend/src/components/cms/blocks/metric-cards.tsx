/**
 * Metric Cards Block Component
 *
 * Individual metric cards with icons and trend indicators.
 * Modern card-based layout for key performance indicators.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, ArrowRight, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export interface MetricCard {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  icon?: 'users' | 'dollar-sign' | 'shopping-cart' | 'activity';
  color?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface MetricCardsProps {
  title?: string;
  subtitle?: string;
  cards?: MetricCard[];
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
  showTrends?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  title,
  subtitle = 'Performans Göstergeleri',
  cards = [
    {
      title: 'Toplam Kullanıcı',
      value: '24,567',
      change: '+12.5%',
      changeType: 'positive',
      description: 'Son 30 günde',
      icon: 'users',
      color: '#3b82f6',
      linkText: 'Detayları Gör',
      linkUrl: '#',
    },
    {
      title: 'Gelir',
      value: '₺1.2M',
      change: '+8.3%',
      changeType: 'positive',
      description: 'Bu ay',
      icon: 'dollar-sign',
      color: '#22c55e',
      linkText: 'Rapor',
      linkUrl: '#',
    },
    {
      title: 'Siparişler',
      value: '3,842',
      change: '-3.2%',
      changeType: 'negative',
      description: 'Bu hafta',
      icon: 'shopping-cart',
      color: '#f59e0b',
      linkText: 'Listele',
      linkUrl: '#',
    },
    {
      title: 'Dönüşüm Oranı',
      value: '%4.8',
      change: '+1.2%',
      changeType: 'positive',
      description: 'Son 7 gün',
      icon: 'activity',
      color: '#a855f7',
      linkText: 'Analiz',
      linkUrl: '#',
    },
  ],
  columns = 4,
  showIcons = true,
  showTrends = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const getIcon = (iconName?: string, color?: string) => {
    const iconClass = 'w-6 h-6';
    const iconColor = color || '#ff7f1e';

    switch (iconName) {
      case 'users':
        return <Users className={iconClass} style={{ color: iconColor }} />;
      case 'dollar-sign':
        return <DollarSign className={iconClass} style={{ color: iconColor }} />;
      case 'shopping-cart':
        return <ShoppingCart className={iconClass} style={{ color: iconColor }} />;
      case 'activity':
        return <Activity className={iconClass} style={{ color: iconColor }} />;
      default:
        return <Activity className={iconClass} style={{ color: iconColor }} />;
    }
  };

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

        {/* Metric Cards Grid */}
        <div className={cn('grid gap-6', gridColsClass)}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                  <h3 className="text-3xl font-bold">{card.value}</h3>
                </div>
                {showIcons && card.icon && (
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: card.color ? `${card.color}20` : '#ff7f1e20' }}
                  >
                    {getIcon(card.icon, card.color)}
                  </div>
                )}
              </div>

              {/* Trend & Description */}
              <div className="flex items-center justify-between mb-4">
                {showTrends && card.change && (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-sm font-semibold',
                      card.changeType === 'positive' && 'text-green-600',
                      card.changeType === 'negative' && 'text-red-600',
                      card.changeType === 'neutral' && 'text-muted-foreground'
                    )}
                  >
                    {card.changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
                    {card.changeType === 'negative' && <TrendingDown className="w-4 h-4" />}
                    {card.change}
                  </div>
                )}
                {card.description && (
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                )}
              </div>

              {/* Link */}
              {card.linkText && card.linkUrl && (
                <a
                  href={card.linkUrl}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  {card.linkText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
