/**
 * Social Proof Stats Block Component
 *
 * Display impressive statistics with animated counters.
 * Perfect for building credibility and trust.
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Star, Award } from 'lucide-react';

export interface ProofStat {
  value: string;
  label: string;
  suffix?: string;
  icon?: 'trending-up' | 'users' | 'star' | 'award';
  color?: string;
}

export interface SocialProofStatsProps {
  title?: string;
  subtitle?: string;
  stats?: ProofStat[];
  layout?: 'horizontal' | 'grid';
  showIcons?: boolean;
  animateOnScroll?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const SocialProofStats: React.FC<SocialProofStatsProps> = ({
  title,
  subtitle = 'Rakamlarla Başarımız',
  stats = [
    { value: '10000', label: 'Mutlu Müşteri', suffix: '+', icon: 'users', color: '#ff7f1e' },
    { value: '98', label: 'Müşteri Memnuniyeti', suffix: '%', icon: 'star', color: '#22c55e' },
    { value: '500', label: 'Başarılı Proje', suffix: '+', icon: 'award', color: '#3b82f6' },
    { value: '24', label: 'Kesintisiz Destek', suffix: '/7', icon: 'trending-up', color: '#a855f7' },
  ],
  layout = 'horizontal',
  showIcons = true,
  animateOnScroll = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!animateOnScroll) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animateOnScroll, hasAnimated]);

  const getIcon = (iconName?: string, color?: string) => {
    const iconClass = 'w-8 h-8';
    const iconColor = color || '#ff7f1e';

    switch (iconName) {
      case 'users':
        return <Users className={iconClass} style={{ color: iconColor }} />;
      case 'star':
        return <Star className={iconClass} style={{ color: iconColor }} />;
      case 'award':
        return <Award className={iconClass} style={{ color: iconColor }} />;
      case 'trending-up':
        return <TrendingUp className={iconClass} style={{ color: iconColor }} />;
      default:
        return <TrendingUp className={iconClass} style={{ color: iconColor }} />;
    }
  };

  const AnimatedNumber = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState('0');
    const numericValue = parseInt(value.replace(/\D/g, ''));

    useEffect(() => {
      if (!hasAnimated) return;

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), numericValue);
        setDisplayValue(current.toString());

        if (step >= steps) {
          clearInterval(timer);
          setDisplayValue(value);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [hasAnimated, numericValue, value]);

    return (
      <span>
        {displayValue}
        {suffix}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-primary text-primary-foreground', cssClasses)}
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
              <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-90">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Stats */}
        <div
          className={cn(
            layout === 'horizontal'
              ? 'flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                'text-center',
                layout === 'grid' && 'p-6 rounded-lg bg-background/10 backdrop-blur-sm'
              )}
            >
              {/* Icon */}
              {showIcons && stat.icon && (
                <div className="flex justify-center mb-4">
                  {getIcon(stat.icon, stat.color)}
                </div>
              )}

              {/* Value */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-sm md:text-base opacity-90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
