/**
 * Video Embed Section Block Component
 *
 * Video embed with optional text content and multiple providers.
 * Supports YouTube, Vimeo, and custom video URLs.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export type VideoProvider = 'youtube' | 'vimeo' | 'custom';

export interface VideoEmbedSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  videoProvider?: VideoProvider;
  videoUrl?: string;
  thumbnailUrl?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  autoplay?: boolean;
  showControls?: boolean;
  layout?: 'full-width' | 'centered' | 'split-left' | 'split-right';
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const VideoEmbedSection: React.FC<VideoEmbedSectionProps> = ({
  title = 'Ürün Tanıtım Videosu',
  subtitle = 'İzle & Öğren',
  description = 'Ürünümüzün nasıl çalıştığını ve size nasıl fayda sağlayabileceğini keşfedin.',
  videoProvider = 'youtube',
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  thumbnailUrl,
  aspectRatio = '16/9',
  autoplay = false,
  showControls = true,
  layout = 'centered',
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '5rem',
  paddingBottom = '5rem',
  cssClasses = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from URL
  const getVideoId = () => {
    if (videoProvider === 'youtube') {
      const match = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      return match ? match[1] : '';
    } else if (videoProvider === 'vimeo') {
      const match = videoUrl.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : '';
    }
    return videoUrl;
  };

  const videoId = getVideoId();

  // Generate embed URL
  const getEmbedUrl = () => {
    if (videoProvider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${showControls ? 1 : 0}`;
    } else if (videoProvider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${showControls ? 1 : 0}`;
    }
    return videoUrl;
  };

  const getThumbnail = () => {
    if (thumbnailUrl) return thumbnailUrl;
    if (videoProvider === 'youtube') {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return 'https://via.placeholder.com/1280x720/1a1a1a/666666?text=Video';
  };

  const aspectRatioClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspectRatio];

  const isSplitLayout = layout === 'split-left' || layout === 'split-right';

  const VideoPlayer = () => (
    <div className={cn('relative rounded-lg overflow-hidden', aspectRatioClass)}>
      {!isPlaying ? (
        <>
          <img
            src={getThumbnail()}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group"
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </button>
        </>
      ) : (
        <iframe
          src={getEmbedUrl()}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );

  const TextContent = () => (
    <div className={cn(isSplitLayout ? '' : 'text-center mb-8')}>
      {subtitle && (
        <p className={cn(
          'text-sm font-semibold uppercase tracking-wider text-primary mb-2',
          isSplitLayout && 'text-left'
        )}>
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className={cn(
          'text-3xl md:text-4xl font-bold mb-4',
          isSplitLayout && 'text-left'
        )}>
          {title}
        </h2>
      )}
      {description && (
        <p className={cn(
          'text-lg text-muted-foreground',
          isSplitLayout && 'text-left'
        )}>
          {description}
        </p>
      )}
    </div>
  );

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
        {layout === 'full-width' && (
          <>
            <div className="max-w-3xl mx-auto mb-8">
              <TextContent />
            </div>
            <VideoPlayer />
          </>
        )}

        {layout === 'centered' && (
          <div className="max-w-4xl mx-auto">
            <TextContent />
            <VideoPlayer />
          </div>
        )}

        {isSplitLayout && (
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
            layout === 'split-right' && 'lg:flex-row-reverse'
          )}>
            <div className={cn(layout === 'split-right' && 'lg:order-2')}>
              <TextContent />
            </div>
            <div className={cn(layout === 'split-right' && 'lg:order-1')}>
              <VideoPlayer />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
