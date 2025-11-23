/**
 * Category Tabs Block Component
 *
 * Tab-based filtering for blog posts, articles, news.
 * Used for content categorization and filtering.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  date: string;
  readTime?: string;
  url: string;
}

export interface CategoryTab {
  id: string;
  label: string;
  articles: Article[];
}

export interface CategoryTabsProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryTab[];
  defaultCategory?: string;
  showAllTab?: boolean;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  title = 'Blog',
  subtitle = 'Son Yazılar ve Haberler',
  categories = [
    {
      id: 'all',
      label: 'Tümü',
      articles: [
        {
          id: '1',
          title: 'Dijital Dönüşümde İlk Adımlar',
          excerpt: 'İşletmenizin dijital dönüşüm yolculuğuna nasıl başlayacağınızı öğrenin.',
          imageUrl: 'https://picsum.photos/seed/blog1/800/600',
          category: 'Teknoloji',
          date: '2024-03-15',
          readTime: '5 dk',
          url: '/blog/dijital-donusum',
        },
      ],
    },
  ],
  defaultCategory,
  showAllTab = true,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || categories[0]?.id);

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-background', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, color: textColor !== 'inherit' ? textColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12">
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="max-w-6xl mx-auto">
          <TabsList className="w-full justify-start overflow-x-auto h-auto flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-base px-6 py-3">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <Link key={article.id} href={article.url}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      {article.imageUrl && (
                        <div className="relative aspect-[16/9]">
                          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{article.category}</Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(article.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                            {article.readTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {category.articles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Bu kategoride henüz içerik bulunmuyor.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
