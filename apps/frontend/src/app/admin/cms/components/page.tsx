'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { ArrowLeft, Search, Layout, Image, Type, Grid, Navigation, Star, Eye } from 'lucide-react';
import { allBlockConfigs } from '@/components/cms/blocks/block-configs';
import { BlockRenderer } from '@/components/cms/editor/block-renderer';
import { EditorProvider } from '@/components/cms/editor/editor-context';

// Kategori ikonları ve açıklamaları
const categoryInfo: Record<string, { icon: any; description: string; color: string }> = {
  Navigation: {
    icon: Navigation,
    description: 'Navigasyon ve menü bileşenleri',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  Hero: {
    icon: Star,
    description: 'Sayfa başlığı ve hero bölümleri',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  Content: {
    icon: Type,
    description: 'İçerik ve metin bileşenleri',
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  Gallery: {
    icon: Image,
    description: 'Görsel galeri bileşenleri',
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  },
  Element: {
    icon: Layout,
    description: 'Temel UI elementleri',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  },
  Footer: {
    icon: Layout,
    description: 'Footer ve alt bölüm bileşenleri',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
  },
  'Blog/RSS': {
    icon: Type,
    description: 'Blog ve RSS bileşenleri',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  },
  Social: {
    icon: Star,
    description: 'Sosyal medya bileşenleri',
    color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
  },
  Testimonial: {
    icon: Star,
    description: 'Referans ve testimonial bileşenleri',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  },
  Features: {
    icon: Grid,
    description: 'Özellik ve feature bileşenleri',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  },
  Stats: {
    icon: Grid,
    description: 'İstatistik ve sayı bileşenleri',
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  },
  Pricing: {
    icon: Grid,
    description: 'Fiyatlandırma bileşenleri',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  },
  'E-commerce': {
    icon: Grid,
    description: 'E-ticaret bileşenleri',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
  },
  Special: {
    icon: Star,
    description: 'Özel bileşenler',
    color: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300',
  },
  Review: {
    icon: Star,
    description: 'Değerlendirme ve review bileşenleri',
    color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  },
  Progress: {
    icon: Layout,
    description: 'İlerleme çubuğu bileşenleri',
    color: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300',
  },
};

// Bileşen kategorisi çıkarma fonksiyonu
const extractCategory = (blockId: string): string => {
  const prefixes: Record<string, string> = {
    'nav-': 'Navigation',
    'hero-': 'Hero',
    'content-': 'Content',
    'element-': 'Element',
    'special-': 'Special',
    'ecommerce-': 'E-commerce',
    'gallery-': 'Gallery',
    'footer-': 'Footer',
    'blog-': 'Blog/RSS',
    'social-': 'Social',
    'testimonial-': 'Testimonial',
    'features-': 'Features',
    'stats-': 'Stats',
    'pricing-': 'Pricing',
    'rating-': 'Review',
    'review-': 'Review',
    'progress-': 'Progress',
  };

  for (const [prefix, category] of Object.entries(prefixes)) {
    if (blockId.startsWith(prefix)) {
      return category;
    }
  }
  return 'Other';
};

// Bileşen ismi formatla
const formatBlockName = (blockId: string): string => {
  return blockId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Bileşen özelliklerini analiz et
const analyzeBlockProperties = (config: any) => {
  let propertyCount = 0;
  let hasImages = false;
  let hasArrays = false;

  for (const [key, prop] of Object.entries(config as Record<string, any>)) {
    propertyCount++;
    if (prop.type === 'image' || key.toLowerCase().includes('image') || key.toLowerCase().includes('media')) {
      hasImages = true;
    }
    if (prop.type === 'list') {
      hasArrays = true;
    }
  }

  return { propertyCount, hasImages, hasArrays };
};

const ComponentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlock, setSelectedBlock] = useState<{ id: string; config: any; category: string } | null>(null);

  // Tüm bileşenleri kategorilere göre grupla
  const blocksByCategory: Record<string, Array<{ id: string; config: any }>> = {};

  Object.entries(allBlockConfigs).forEach(([blockId, config]) => {
    const category = extractCategory(blockId);
    if (!blocksByCategory[category]) {
      blocksByCategory[category] = [];
    }
    blocksByCategory[category].push({ id: blockId, config });
  });

  // Kategorileri sırala
  const sortedCategories = Object.keys(blocksByCategory).sort();

  // Filtreleme
  const filteredBlocks = Object.entries(blocksByCategory).reduce(
    (acc, [category, blocks]) => {
      if (selectedCategory !== 'all' && category !== selectedCategory) {
        return acc;
      }

      const filtered = blocks.filter((block) => {
        const blockName = formatBlockName(block.id);
        return (
          blockName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          block.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, Array<{ id: string; config: any }>>
  );

  // İstatistikler
  const totalBlocks = Object.values(blocksByCategory).reduce((sum, blocks) => sum + blocks.length, 0);
  const totalCategories = sortedCategories.length;
  const filteredCount = Object.values(filteredBlocks).reduce((sum, blocks) => sum + blocks.length, 0);

  // İlk bileşeni otomatik seç
  React.useEffect(() => {
    if (!selectedBlock && filteredCount > 0) {
      const firstCategory = Object.keys(filteredBlocks)[0];
      const firstBlock = filteredBlocks[firstCategory][0];
      setSelectedBlock({
        id: firstBlock.id,
        config: firstBlock.config,
        category: firstCategory,
      });
    }
  }, [filteredBlocks, filteredCount]);

  // Varsayılan props oluştur
  const generateDefaultProps = (config: any, blockId: string) => {
    const props: any = {};
    
    Object.entries(config).forEach(([key, value]: [string, any]) => {
      if (value.defaultValue !== undefined) {
        props[key] = value.defaultValue;
      } else if (value.type === 'list' && value.itemSchema) {
        // Array için örnek veri oluştur
        const itemCount = blockId.includes('three') ? 3 : blockId.includes('four') ? 4 : 2;
        props[key] = Array.from({ length: itemCount }, (_, index) => {
          const item: any = {};
          Object.entries(value.itemSchema).forEach(([itemKey, itemValue]: [string, any]) => {
            item[itemKey] = itemValue.defaultValue || '';
          });
          return item;
        });
      }
    });
    
    return props;
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/cms">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            CMS Paneline Dön
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">İçerik Bileşenleri</h1>
        <p className="text-muted-foreground">
          Kullanılabilir {totalBlocks} bileşeni {totalCategories} kategoride keşfedin
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalBlocks}</div>
            <p className="text-xs text-muted-foreground">Toplam Bileşen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">Kategori</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{filteredCount}</div>
            <p className="text-xs text-muted-foreground">Filtrelenmiş Sonuç</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">MediaPicker Desteği</p>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve Filtreler */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Bileşen ara... (örn: hero, gallery, navigation)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md bg-background"
            >
              <option value="all">Tüm Kategoriler</option>
              {sortedCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({blocksByCategory[cat].length})
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Bileşen Listesi - İki Sütunlu Yapı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Sütun - Bileşen Listesi */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bileşen Listesi</CardTitle>
              <p className="text-sm text-muted-foreground">
                Bir bileşene tıklayarak önizlemesini görüntüleyin
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="p-4 space-y-2">
                  {Object.entries(filteredBlocks).map(([category, blocks]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center gap-2 px-2 py-1 bg-muted/50 rounded-md">
                        {(() => {
                          const categoryData = categoryInfo[category] || categoryInfo.Element;
                          const IconComponent = categoryData.icon;
                          return <IconComponent className="w-4 h-4" />;
                        })()}
                        <span className="font-semibold text-sm">{category}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {blocks.length}
                        </Badge>
                      </div>
                      {blocks.map((block) => {
                        const { propertyCount, hasImages, hasArrays } = analyzeBlockProperties(block.config);
                        const isSelected = selectedBlock?.id === block.id;

                        return (
                          <button
                            key={block.id}
                            onClick={() =>
                              setSelectedBlock({
                                id: block.id,
                                config: block.config,
                                category: category,
                              })
                            }
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-1 truncate">
                                  {formatBlockName(block.id)}
                                </h4>
                                <code className="text-xs text-muted-foreground break-all">
                                  {block.id}
                                </code>
                              </div>
                              {isSelected && (
                                <Eye className="w-4 h-4 text-primary flex-shrink-0 ml-2" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {propertyCount}
                              </Badge>
                              {hasImages && <Image className="w-3 h-3 text-muted-foreground" />}
                              {hasArrays && <Grid className="w-3 h-3 text-muted-foreground" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Sütun - Bileşen Önizleme */}
        <div className="lg:sticky lg:top-4 h-fit">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Önizleme</CardTitle>
                  {selectedBlock && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatBlockName(selectedBlock.id)}
                    </p>
                  )}
                </div>
                {selectedBlock && (() => {
                  const categoryData = categoryInfo[selectedBlock.category] || categoryInfo.Element;
                  return (
                    <Badge variant="secondary" className={categoryData.color}>
                      {selectedBlock.category}
                    </Badge>
                  );
                })()}
              </div>
            </CardHeader>
            <CardContent>
              {selectedBlock ? (
                <div className="space-y-4">
                  {/* Bileşen Bilgileri */}
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Block ID:</span>
                        <code className="block text-xs mt-1 bg-background px-2 py-1 rounded">
                          {selectedBlock.id}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Özellikler:</span>
                        <div className="mt-1">
                          {(() => {
                            const { propertyCount, hasImages, hasArrays } = analyzeBlockProperties(
                              selectedBlock.config
                            );
                            return (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{propertyCount}</Badge>
                                {hasImages && (
                                  <Badge variant="outline" className="gap-1">
                                    <Image className="w-3 h-3" />
                                    Media
                                  </Badge>
                                )}
                                {hasArrays && (
                                  <Badge variant="outline" className="gap-1">
                                    <Grid className="w-3 h-3" />
                                    Array
                                  </Badge>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Canlı Önizleme */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-xs font-medium">Canlı Önizleme</span>
                      <Badge variant="secondary" className="text-xs">Demo</Badge>
                    </div>
                    <div className="bg-background">
                      <ScrollArea className="h-[450px]">
                        <div className="p-4">
                          {(() => {
                            try {
                              const defaultProps = generateDefaultProps(selectedBlock.config, selectedBlock.id);
                              return (
                                <EditorProvider onComponentUpdate={() => {}}>
                                  <BlockRenderer
                                    blockId={selectedBlock.id}
                                    props={defaultProps}
                                  />
                                </EditorProvider>
                              );
                            } catch (error) {
                              return (
                                <div className="p-8 text-center text-muted-foreground">
                                  <Layout className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                  <p className="text-sm">Bu bileşen için önizleme hazırlanıyor...</p>
                                  <code className="text-xs mt-2 block">{selectedBlock.id}</code>
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Önizlemek için soldaki listeden bir bileşen seçin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sonuç Bulunamadı */}
      {filteredCount === 0 && (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sonuç Bulunamadı</h3>
            <p className="text-muted-foreground">
              Arama kriterlerinize uygun bileşen bulunamadı. Lütfen farklı bir arama deneyin.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComponentsPage;
