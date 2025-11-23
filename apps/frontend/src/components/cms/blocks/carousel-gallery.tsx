/**
 * Carousel Gallery Block Component
 *
 * Image/media gallery with carousel functionality.
 * Full-width carousel for case studies, portfolios.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Expand } from 'lucide-react';

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface CarouselGalleryProps {
  title?: string;
  images?: GalleryImage[];
  aspectRatio?: 'video' | 'square' | 'portrait';
  showThumbnails?: boolean;
  backgroundColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const CarouselGallery: React.FC<CarouselGalleryProps> = ({
  title,
  images = [
    { url: 'https://picsum.photos/seed/gallery1/1200/800', alt: 'Gallery Image 1' },
    { url: 'https://picsum.photos/seed/gallery2/1200/800', alt: 'Gallery Image 2' },
    { url: 'https://picsum.photos/seed/gallery3/1200/800', alt: 'Gallery Image 3' },
  ],
  aspectRatio = 'video',
  showThumbnails = true,
  backgroundColor = 'transparent',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  }[aspectRatio];

  React.useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const onSelect = () => {
      const newIndex = mainApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      thumbApi.scrollTo(newIndex);
    };

    mainApi.on('select', onSelect);
    return () => {
      mainApi.off('select', onSelect);
    };
  }, [mainApi, thumbApi]);

  return (
    <section
      className={cn('w-full', backgroundColor === 'transparent' && 'bg-background', cssClasses)}
      style={{ backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined, paddingTop, paddingBottom }}
    >
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}

        {/* Main Carousel */}
        <Carousel setApi={setMainApi} opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className={cn('relative rounded-xl overflow-hidden shadow-2xl', aspectRatioClass)}>
                  <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 90vw" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white text-lg font-medium">{image.caption}</p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="mt-6">
            <Carousel setApi={setThumbApi} opts={{ align: 'start', containScroll: 'keepSnaps', dragFree: true }}>
              <CarouselContent className="-ml-4">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                    <button
                      onClick={() => mainApi?.scrollTo(index)}
                      className={cn(
                        'relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all border-2',
                        selectedIndex === index ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-primary/50'
                      )}
                    >
                      <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="200px" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};
