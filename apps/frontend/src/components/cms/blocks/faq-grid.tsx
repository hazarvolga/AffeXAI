/**
 * FAQ Grid Block Component
 *
 * Grid layout for frequently asked questions.
 * Simple, scannable format without accordion functionality.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

export interface FaqGridItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqGridProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs?: FaqGridItem[];
  columns?: 1 | 2 | 3;
  showIcons?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const FaqGrid: React.FC<FaqGridProps> = ({
  title = 'Sık Sorulan Sorular',
  subtitle = 'SSS',
  description = 'En çok merak edilen soruların cevaplarını burada bulabilirsiniz.',
  faqs = [
    {
      question: 'Ürününüz nasıl çalışır?',
      answer: 'Ürünümüz bulut tabanlı bir platform olarak çalışır. Kullanıcı dostu arayüzü ile dakikalar içinde başlayabilir, ekibinizle işbirliği yapabilir ve iş süreçlerinizi optimize edebilirsiniz.',
      category: 'Genel',
    },
    {
      question: 'Ücretsiz deneme süresi var mı?',
      answer: '14 günlük ücretsiz deneme süresi sunuyoruz. Kredi kartı bilgisi gerektirmez ve istediğiniz zaman iptal edebilirsiniz.',
      category: 'Fiyatlandırma',
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka kartı ve havale ile ödeme kabul ediyoruz. Tüm ödemeleriniz SSL ile güvence altındadır.',
      category: 'Fiyatlandırma',
    },
    {
      question: 'Verilerim güvende mi?',
      answer: 'Evet, verileriniz 256-bit şifreleme ile korunur, düzenli olarak yedeklenir ve SOC 2 standartlarına uygun olarak saklanır.',
      category: 'Güvenlik',
    },
    {
      question: 'Destek hizmeti sunuyor musunuz?',
      answer: '7/24 canlı destek, e-posta ve telefon desteği sunuyoruz. Ayrıca kapsamlı dokümantasyon ve video eğitimlere erişebilirsiniz.',
      category: 'Destek',
    },
    {
      question: 'Planımı daha sonra yükseltebilir miyim?',
      answer: 'Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler anında geçerli olur.',
      category: 'Fiyatlandırma',
    },
  ],
  columns = 2,
  showIcons = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

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

        {/* FAQ Grid */}
        <div className={cn('grid gap-8', gridColsClass)}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* Icon & Category */}
              <div className="flex items-start gap-3 mb-4">
                {showIcons && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className="flex-1">
                  {faq.category && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded mb-2">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                </div>
              </div>

              {/* Answer */}
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
