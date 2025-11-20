/**
 * Icon Grid Block Component
 *
 * Grid of icons with labels and descriptions.
 * Perfect for showcasing benefits, features, or services.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Zap,
  Shield,
  Users,
  Award,
  Heart,
  TrendingUp,
  Lock,
  Globe,
  Smartphone,
  Cloud,
  MessageCircle,
  Settings,
} from 'lucide-react';

export interface IconGridItem {
  icon: 'zap' | 'shield' | 'users' | 'award' | 'heart' | 'trending-up' | 'lock' | 'globe' | 'smartphone' | 'cloud' | 'message-circle' | 'settings';
  title: string;
  description: string;
  color?: string;
}

export interface IconGridProps {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: IconGridItem[];
  columns?: 2 | 3 | 4 | 6;
  iconSize?: 'sm' | 'md' | 'lg';
  variant?: 'simple' | 'card' | 'bordered';
  showNumbers?: boolean;
  numberStyle?: 'circle' | 'square' | 'plain';
  numberColor?: string;
  startNumber?: number;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const IconGrid: React.FC<IconGridProps> = ({
  title = 'Neden Bizi Seçmelisiniz?',
  subtitle = 'Avantajlarımız',
  description = 'Modern iş dünyasının ihtiyaçlarına özel çözümler sunuyoruz.',
  items = [
    { icon: 'zap', title: 'Hızlı Performans', description: 'Yıldırım hızında sayfa yükleme ve işlem süreleri.', color: '#ff7f1e' },
    { icon: 'shield', title: 'Güvenli Altyapı', description: 'Verileriniz en üst düzey güvenlik standartlarıyla korunur.', color: '#3b82f6' },
    { icon: 'users', title: 'Takım İşbirliği', description: 'Ekibinizle gerçek zamanlı çalışın ve üretkenliği artırın.', color: '#22c55e' },
    { icon: 'award', title: 'Ödüllü Destek', description: '7/24 profesyonel müşteri desteği hizmetinizde.', color: '#a855f7' },
    { icon: 'trending-up', title: 'Sürekli Büyüme', description: 'İşinizle birlikte büyüyen ölçeklenebilir çözümler.', color: '#f59e0b' },
    { icon: 'globe', title: 'Global Erişim', description: 'Dünyanın her yerinden erişilebilir platform.', color: '#06b6d4' },
  ],
  columns = 3,
  iconSize = 'md',
  variant = 'simple',
  showNumbers = false,
  numberStyle = 'circle',
  numberColor = '#ff7f1e',
  startNumber = 1,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }[columns];

  const iconSizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[iconSize];

  const getIcon = (iconName: string, color?: string) => {
    const iconProps = {
      className: iconSizeClass,
      style: { color: color || '#ff7f1e' },
    };

    switch (iconName) {
      case 'zap':
        return <Zap {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'trending-up':
        return <TrendingUp {...iconProps} />;
      case 'lock':
        return <Lock {...iconProps} />;
      case 'globe':
        return <Globe {...iconProps} />;
      case 'smartphone':
        return <Smartphone {...iconProps} />;
      case 'cloud':
        return <Cloud {...iconProps} />;
      case 'message-circle':
        return <MessageCircle {...iconProps} />;
      case 'settings':
        return <Settings {...iconProps} />;
      default:
        return <Zap {...iconProps} />;
    }
  };

  const renderNumber = (index: number) => {
    const number = String(startNumber + index).padStart(2, '0');

    const baseClasses = 'font-bold';
    const styleClasses = {
      circle: 'w-12 h-12 rounded-full flex items-center justify-center text-white',
      square: 'w-12 h-12 rounded-lg flex items-center justify-center text-white',
      plain: 'text-4xl',
    }[numberStyle];

    if (numberStyle === 'plain') {
      return (
        <span
          className={cn(baseClasses, styleClasses, 'opacity-30')}
          style={{ color: numberColor }}
        >
          {number}
        </span>
      );
    }

    return (
      <div
        className={cn(baseClasses, styleClasses)}
        style={{ backgroundColor: numberColor }}
      >
        {number}
      </div>
    );
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

        {/* Icon Grid */}
        <div className={cn('grid gap-8', gridColsClass)}>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'text-center relative',
                variant === 'card' && 'bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow',
                variant === 'bordered' && 'border border-border rounded-lg p-6'
              )}
            >
              {/* Number (Optional) */}
              {showNumbers && (
                <div className="flex justify-center mb-4">
                  {renderNumber(index)}
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full',
                    variant === 'simple' ? 'bg-transparent' : 'bg-primary/10 p-4'
                  )}
                >
                  {getIcon(item.icon, item.color)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
