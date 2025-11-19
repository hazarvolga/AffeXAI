/**
 * Testimonial Carousel Block Component
 *
 * Customer testimonials with carousel functionality.
 * Swipe-friendly on mobile, auto-play optional.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Quote, Star } from 'lucide-react';

export interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
  logo?: string;
}

export interface TestimonialCarouselProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  cssClasses?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  title = 'Müşterilerimiz Ne Diyor',
  subtitle = 'Başarı Hikayeleri',
  testimonials = [
    {
      quote: 'Harika bir deneyim! Ekip çok profesyoneldi ve sonuçlar beklentilerimizi aştı.',
      author: { name: 'Ahmet Yılmaz', role: 'CEO', company: 'Tech Corp', avatar: '' },
      rating: 5,
    },
  ],
  autoPlay = false,
  autoPlayInterval = 5000,
  backgroundColor = 'transparent',
  textColor = 'inherit',
  paddingTop = '4rem',
  paddingBottom = '4rem',
  cssClasses = '',
}) => {
  const [api, setApi] = useState<CarouselApi>();

  // Auto-play logic
  React.useEffect(() => {
    if (!api || !autoPlay) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlay, autoPlayInterval]);

  return (
    <section
      className={cn(
        'w-full',
        backgroundColor === 'transparent' && 'bg-secondary/5',
        cssClasses
      )}
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
            {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{subtitle}</p>}
            {title && <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>}
          </div>
        )}

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel setApi={setApi} opts={{ loop: true, align: 'center' }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-8 md:p-12">
                      {/* Quote Icon */}
                      <Quote className="w-12 h-12 text-primary/20 mb-6" />

                      {/* Rating */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-5 h-5',
                                i < testimonial.rating!
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                      )}

                      {/* Quote Text */}
                      <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                          <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-lg">{testimonial.author.name}</div>
                          <div className="text-muted-foreground">
                            {testimonial.author.role}
                            {testimonial.author.company && ` at ${testimonial.author.company}`}
                          </div>
                        </div>
                        {testimonial.logo && (
                          <div className="ml-auto">
                            <div className="relative w-24 h-12">
                              <Image src={testimonial.logo} alt="Company Logo" fill className="object-contain opacity-50" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 hidden md:flex" />
            <CarouselNext className="-right-12 hidden md:flex" />
          </Carousel>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  api?.selectedScrollSnap() === index
                    ? 'bg-primary w-8'
                    : 'bg-border hover:bg-primary/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
