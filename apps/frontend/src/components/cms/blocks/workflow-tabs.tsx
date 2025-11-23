/**
 * Workflow Tabs Block Component
 *
 * Advanced nested tabs system for showcasing multi-phase workflows.
 * Features horizontal main tabs with vertical sub-tabs and dialog modals.
 * Perfect for industry solutions, education modules, and process documentation.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export interface WorkflowDialogContent {
  title: string;
  content: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface WorkflowSubTab {
  id: string;
  label: string;
  icon?: string; // Deprecated: use mediaType and mediaUrl instead
  title: string;
  description: string;
  // Media options (replaces icon)
  mediaType?: 'image' | 'video' | 'youtube' | 'none';
  mediaUrl?: string; // Can be upload URL, direct URL, or YouTube link
  dialogContent?: WorkflowDialogContent;
}

export interface WorkflowMainTab {
  id: string;
  label: string;
  icon?: string;
  subTabs: WorkflowSubTab[];
}

export interface WorkflowTabsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mainTabs?: WorkflowMainTab[];
  enableScroll?: boolean;
  defaultMainTab?: string;
  defaultSubTab?: string;
  accentColor?: 'primary' | 'success' | 'warning' | 'error';
  tabVariant?: 'solid' | 'outlined' | 'minimal';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const WorkflowTabs: React.FC<WorkflowTabsProps> = ({
  title = 'İş Akışı',
  subtitle = 'Süreç',
  description = 'Proje yaşam döngüsünün tüm aşamalarını keşfedin.',
  mainTabs = [
    {
      id: 'phase-1',
      label: 'Faz 1: Konsept Tasarım',
      icon: '🎨',
      subTabs: [
        {
          id: 'sub-1-1',
          label: 'İlk Tasarım Fikirleri',
          icon: '💡',
          title: 'Konsept Geliştirme',
          description: 'İlk tasarım fikirlerini hızlıca görselleştirin ve paydaşlarla paylaşın.',
          dialogContent: {
            title: 'İlk Tasarım Fikirleri - Detaylar',
            content: 'Konsept tasarım aşamasında, mimarlar ve tasarımcılar fikirlerini hızlıca 3D modellere dönüştürebilir...',
            imageUrl: 'https://via.placeholder.com/800x400',
            ctaText: 'Daha Fazla Bilgi',
            ctaUrl: '#',
          },
        },
        {
          id: 'sub-1-2',
          label: 'BIM Entegrasyonu',
          icon: '🏗️',
          title: 'Yapı Bilgi Modellemesi',
          description: 'Erken aşamada BIM standardlarına uygun çalışmaya başlayın.',
        },
      ],
    },
    {
      id: 'phase-2',
      label: 'Faz 2: Tasarım Geliştirme',
      icon: '📐',
      subTabs: [
        {
          id: 'sub-2-1',
          label: 'Detay Geliştirme',
          icon: '🔍',
          title: 'Detaylı Modelleme',
          description: 'Tasarımınızı detaylandırın ve yapısal analiz yapın.',
        },
      ],
    },
  ],
  enableScroll = true,
  defaultMainTab,
  defaultSubTab,
  accentColor = 'primary',
  tabVariant = 'outlined',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const [activeMainTab, setActiveMainTab] = useState(
    defaultMainTab || mainTabs[0]?.id || ''
  );
  const [activeSubTab, setActiveSubTab] = useState(defaultSubTab || '');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<WorkflowDialogContent | null>(null);

  const currentMainTab = mainTabs.find((tab) => tab.id === activeMainTab);
  const currentSubTabs = currentMainTab?.subTabs || [];

  // Auto-select first sub-tab when main tab changes
  React.useEffect(() => {
    if (currentSubTabs.length > 0 && !currentSubTabs.find((st) => st.id === activeSubTab)) {
      setActiveSubTab(currentSubTabs[0].id);
    }
  }, [activeMainTab, currentSubTabs, activeSubTab]);

  const openDialog = (content: WorkflowDialogContent) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  // Accent color classes
  const accentClasses = {
    primary: {
      border: 'border-primary',
      bg: 'bg-primary',
      text: 'text-primary',
      hover: 'hover:bg-primary/10',
    },
    success: {
      border: 'border-green-600',
      bg: 'bg-green-600',
      text: 'text-green-600',
      hover: 'hover:bg-green-50',
    },
    warning: {
      border: 'border-yellow-600',
      bg: 'bg-yellow-600',
      text: 'text-yellow-600',
      hover: 'hover:bg-yellow-50',
    },
    error: {
      border: 'border-red-600',
      bg: 'bg-red-600',
      text: 'text-red-600',
      hover: 'hover:bg-red-50',
    },
  }[accentColor];

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

        {/* Main Tabs - Horizontal (Scrollable) */}
        <div className="mb-8">
          <ScrollArea className={cn('w-full', enableScroll && mainTabs.length > 4 && 'whitespace-nowrap')}>
            <div className="flex gap-2 border-b border-border pb-2">
              {mainTabs.map((mainTab) => (
                <button
                  key={mainTab.id}
                  onClick={() => setActiveMainTab(mainTab.id)}
                  className={cn(
                    'px-6 py-3 rounded-t-lg font-semibold transition-all whitespace-nowrap',
                    'border-b-2',
                    activeMainTab === mainTab.id
                      ? cn(
                          accentClasses.border,
                          accentClasses.text,
                          tabVariant === 'solid' && cn(accentClasses.bg, 'text-white'),
                          tabVariant === 'outlined' && 'bg-background',
                          tabVariant === 'minimal' && 'bg-transparent'
                        )
                      : cn(
                          'border-transparent text-muted-foreground',
                          accentClasses.hover
                        )
                  )}
                >
                  {mainTab.icon && <span className="mr-2">{mainTab.icon}</span>}
                  {mainTab.label}
                </button>
              ))}
            </div>
            {enableScroll && mainTabs.length > 4 && <ScrollBar orientation="horizontal" />}
          </ScrollArea>
        </div>

        {/* Sub-Tabs - Vertical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Sub Tab List */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              {currentSubTabs.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setActiveSubTab(subTab.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg transition-all',
                    'border',
                    activeSubTab === subTab.id
                      ? cn(
                          accentClasses.border,
                          accentClasses.bg,
                          'text-white'
                        )
                      : cn(
                          'border-border bg-background text-foreground',
                          accentClasses.hover
                        )
                  )}
                >
                  {subTab.icon && <span className="mr-2">{subTab.icon}</span>}
                  <span className="font-medium">{subTab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Active Sub Tab Details */}
          <div className="lg:col-span-9">
            {currentSubTabs
              .filter((subTab) => subTab.id === activeSubTab)
              .map((subTab) => {
                const hasMedia = subTab.mediaType && subTab.mediaType !== 'none' && subTab.mediaUrl;
                const youtubeId = subTab.mediaType === 'youtube' && subTab.mediaUrl
                  ? getYouTubeVideoId(subTab.mediaUrl)
                  : null;

                return (
                  <div
                    key={subTab.id}
                    className="bg-card border border-border rounded-xl p-8 shadow-sm"
                  >
                    {/* Media Content - TOP (if media is provided) */}
                    {hasMedia && (
                      <div className="mb-6">
                        {/* Image */}
                        {subTab.mediaType === 'image' && subTab.mediaUrl && (
                          <div className="relative w-full h-64 rounded-lg overflow-hidden">
                            <Image
                              src={subTab.mediaUrl}
                              alt={subTab.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            />
                          </div>
                        )}

                        {/* Video */}
                        {subTab.mediaType === 'video' && subTab.mediaUrl && (
                          <div className="relative w-full rounded-lg overflow-hidden">
                            <video
                              src={subTab.mediaUrl}
                              controls
                              className="w-full h-auto"
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}

                        {/* YouTube Video */}
                        {subTab.mediaType === 'youtube' && youtubeId && (
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeId}`}
                              title={subTab.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Sub Tab Header with Legacy Icon (if no media) */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        {!hasMedia && subTab.icon && (
                          <span className="text-4xl mb-4 inline-block">{subTab.icon}</span>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{subTab.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {subTab.description}
                        </p>
                      </div>

                      {/* Plus Button for Dialog */}
                      {subTab.dialogContent && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openDialog(subTab.dialogContent!)}
                          className={cn(
                            'rounded-full w-12 h-12 flex-shrink-0 ml-4',
                            accentClasses.border,
                            accentClasses.text,
                            accentClasses.hover
                          )}
                        >
                          <Plus className="w-6 h-6" />
                        </Button>
                      )}
                    </div>

                    {/* Read More Link */}
                    {subTab.dialogContent && (
                      <button
                        onClick={() => openDialog(subTab.dialogContent!)}
                        className={cn(
                          'text-sm font-semibold flex items-center gap-2',
                          accentClasses.text,
                          'hover:underline'
                        )}
                      >
                        Devamını Oku
                        <span className="text-lg">→</span>
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Dialog Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {dialogContent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{dialogContent.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Detaylı bilgi içeriği
                </DialogDescription>
              </DialogHeader>

              {/* Dialog Image */}
              {dialogContent.imageUrl && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={dialogContent.imageUrl}
                    alt={dialogContent.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Dialog Content */}
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: dialogContent.content }} />
              </div>

              {/* Dialog CTA */}
              {dialogContent.ctaText && dialogContent.ctaUrl && (
                <div className="mt-6 flex justify-end">
                  <Button asChild className={accentClasses.bg}>
                    <a href={dialogContent.ctaUrl} target="_blank" rel="noopener noreferrer">
                      {dialogContent.ctaText}
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
