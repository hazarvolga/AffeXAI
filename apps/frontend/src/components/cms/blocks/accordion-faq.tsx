/**
 * Accordion FAQ Block Component
 *
 * Collapsible FAQ accordion with search and categories.
 * Perfect for knowledge bases and support pages.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AccordionFaqProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs?: FaqItem[];
  showSearch?: boolean;
  showCategories?: boolean;
  defaultOpenIndex?: number;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const AccordionFaq: React.FC<AccordionFaqProps> = ({
  title = 'Sık Sorulan Sorular',
  subtitle = 'SSS',
  description = 'Merak ettiğiniz her şey burada. Sorunuza cevap bulamadıysanız bizimle iletişime geçin.',
  faqs = [
    { question: 'Ürününüz nasıl çalışır?', answer: 'Ürünümüz bulut tabanlı bir platform olarak çalışır ve kullanıcı dostu arayüzü ile kolayca kullanılabilir.', category: 'Genel' },
    { question: 'Ücretsiz deneme süresi var mı?', answer: 'Evet, 14 günlük ücretsiz deneme süresi sunuyoruz. Kredi kartı bilgisi gerektirmez.', category: 'Fiyatlandırma' },
    { question: 'Destek hizmeti sunuyor musunuz?', answer: 'Evet, 7/24 canlı destek hizmeti sunuyoruz. E-posta ve telefon desteği de mevcuttur.', category: 'Destek' },
    { question: 'Verilerim güvende mi?', answer: 'Evet, verileriniz şifrelenmiş olarak saklanır ve düzenli yedekleme yapılır.', category: 'Güvenlik' },
  ],
  showSearch = true,
  showCategories = true,
  defaultOpenIndex = -1,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category).filter(Boolean)));

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          {(title || subtitle || description) && (
            <div className="text-center mb-12">
              {subtitle && (
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  {subtitle}
                </p>
              )}
              {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
              {description && <p className="text-lg text-muted-foreground">{description}</p>}
            </div>
          )}

          {/* Search */}
          {showSearch && (
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Soru ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Categories */}
          {showCategories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  !selectedCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                Tümü
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Accordion */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Sonuç bulunamadı. Lütfen farklı bir arama yapın.
              </p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg bg-background overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-semibold text-lg pr-4">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform flex-shrink-0',
                        openIndex === index && 'transform rotate-180'
                      )}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
