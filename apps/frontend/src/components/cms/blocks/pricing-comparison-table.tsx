/**
 * Pricing Comparison Table Block Component
 *
 * Flexible pricing table with feature comparison.
 * Supports 2-4 pricing tiers with highlight option.
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export interface PricingFeature {
  name: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description?: string;
  price: string;
  period?: string;
  badge?: string;
  features: PricingFeature[];
  buttonText: string;
  buttonUrl: string;
  highlighted?: boolean;
}

export interface PricingComparisonTableProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const PricingComparisonTable: React.FC<PricingComparisonTableProps> = ({
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the plan that fits your needs',
  tiers = [
    {
      name: 'Starter',
      description: 'Perfect for individuals',
      price: '$9',
      period: '/month',
      features: [
        { name: 'Up to 10 projects', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Priority support', included: false },
        { name: 'Advanced features', included: false },
      ],
      buttonText: 'Get Started',
      buttonUrl: '#',
    },
    {
      name: 'Professional',
      description: 'For growing teams',
      price: '$29',
      period: '/month',
      badge: 'Popular',
      highlighted: true,
      features: [
        { name: 'Unlimited projects', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced features', included: true },
        { name: 'Custom integrations', included: false },
      ],
      buttonText: 'Start Free Trial',
      buttonUrl: '#',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      features: [
        { name: 'Unlimited everything', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'On-premise deployment', included: true },
      ],
      buttonText: 'Contact Sales',
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
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                {subtitle}
              </p>
            )}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Pricing Tiers */}
        <div className={cn(
          'grid gap-8 max-w-6xl mx-auto',
          tiers.length === 2 && 'grid-cols-1 md:grid-cols-2',
          tiers.length === 3 && 'grid-cols-1 md:grid-cols-3',
          tiers.length === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        )}>
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                'relative p-8 rounded-xl border bg-card transition-all',
                tier.highlighted
                  ? 'border-primary shadow-xl scale-105 md:scale-110'
                  : 'border-border hover:border-primary/50 hover:shadow-lg'
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <Badge className="absolute top-4 right-4" variant="default">
                  {tier.badge}
                </Badge>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                {tier.description && (
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="w-full mb-6"
                variant={tier.highlighted ? 'default' : 'outline'}
              >
                <a href={tier.buttonUrl}>{tier.buttonText}</a>
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
